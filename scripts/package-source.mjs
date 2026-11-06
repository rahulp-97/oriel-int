/**
 * Create a dependency-free ZIP of the intended starter source.
 * Stable paths, permissions, ordering and timestamps keep the output reproducible.
 * Add newly approved public assets to PUBLIC_FILES when the project changes.
 */
import { lstat, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const PROJECT_DIRECTORY = 'avenor-atlas-spa';
const OUTPUT_NAME = 'avenor-atlas-react.zip';
const ROOT_FILES = [
  'package.json', 'package-lock.json', 'npm-shrinkwrap.json',
  'index.html', 'README.md', '.env.example', '.gitignore',
  'vite.config.js', 'vite.config.mjs', 'jsconfig.json',
  'eslint.config.js', 'eslint.config.mjs',
];
const PUBLIC_FILES = ['public/favicon.svg', 'public/assets/port-aerial.webp'];
const SOURCE_DIRECTORIES = ['src', 'scripts'];
const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.cjs', '.css', '.json']);
const EXCLUDED_DIRECTORIES = new Set([
  'node_modules', 'dist', '.git', '.openai', '.sites-runtime',
  '.cache', 'coverage', 'screenshots', 'test-results',
]);
const REQUIRED_FILES = [
  'package.json', 'index.html', 'README.md',
  'src/main.jsx', 'src/App.jsx', 'src/config/business.js',
];
const UINT32_MAX = 0xffffffff;
const UTF8_FLAG = 0x0800;
const ZIP_METHOD_DEFLATE = 8;
const DOS_DATE_1980_01_01 = 0x0021;

const crcTable = Uint32Array.from({ length: 256 }, (_, initial) => {
  let value = initial;
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value >>> 1) ^ ((value & 1) ? 0xedb88320 : 0);
  }
  return value >>> 0;
});

function crc32(buffer) {
  let value = UINT32_MAX;
  for (const byte of buffer) value = (value >>> 8) ^ crcTable[(value ^ byte) & 0xff];
  return (value ^ UINT32_MAX) >>> 0;
}

function portablePath(path) {
  return path.split(sep).join('/');
}

async function regularFile(path, required = false) {
  try {
    const info = await lstat(path);
    // Do not follow links into files outside the selected source tree.
    if (info.isSymbolicLink()) throw new Error(`Refusing symbolic link: ${relative(ROOT, path)}`);
    if (!info.isFile()) throw new Error(`Expected a regular file: ${relative(ROOT, path)}`);
    return true;
  } catch (error) {
    if (!required && error.code === 'ENOENT') return false;
    throw error;
  }
}

async function collectSource(directory) {
  const absolute = join(ROOT, directory);
  try {
    const info = await lstat(absolute);
    if (info.isSymbolicLink()) throw new Error(`Refusing symbolic link: ${directory}`);
    if (!info.isDirectory()) throw new Error(`Expected a directory: ${directory}`);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
  const selected = [];
  for (const entry of await readdir(absolute, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || EXCLUDED_DIRECTORIES.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Refusing symbolic link: ${portablePath(path)}`);
    if (entry.isDirectory()) selected.push(...await collectSource(path));
    else if (entry.isFile() && SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase())) selected.push(path);
  }
  return selected;
}

function localHeader(name, input, compressed, checksum) {
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(UTF8_FLAG, 6);
  header.writeUInt16LE(ZIP_METHOD_DEFLATE, 8);
  header.writeUInt16LE(DOS_DATE_1980_01_01, 12);
  header.writeUInt32LE(checksum, 14);
  header.writeUInt32LE(compressed.length, 18);
  header.writeUInt32LE(input.length, 22);
  header.writeUInt16LE(name.length, 26);
  return header;
}

function directoryHeader(name, input, compressed, checksum, offset) {
  const header = Buffer.alloc(46);
  header.writeUInt32LE(0x02014b50, 0);
  header.writeUInt16LE(0x0314, 4); // Unix origin, ZIP version 2.0.
  header.writeUInt16LE(20, 6);
  header.writeUInt16LE(UTF8_FLAG, 8);
  header.writeUInt16LE(ZIP_METHOD_DEFLATE, 10);
  header.writeUInt16LE(DOS_DATE_1980_01_01, 14);
  header.writeUInt32LE(checksum, 16);
  header.writeUInt32LE(compressed.length, 20);
  header.writeUInt32LE(input.length, 24);
  header.writeUInt16LE(name.length, 28);
  header.writeUInt32LE((0o100644 << 16) >>> 0, 38);
  header.writeUInt32LE(offset, 42);
  return header;
}

async function main() {
  for (const file of [...REQUIRED_FILES, ...PUBLIC_FILES]) await regularFile(join(ROOT, file), true);
  const candidates = [...ROOT_FILES, ...PUBLIC_FILES];
  for (const directory of SOURCE_DIRECTORIES) candidates.push(...await collectSource(directory));
  const selected = [];
  for (const candidate of new Set(candidates.map(portablePath))) {
    if (await regularFile(join(ROOT, candidate))) selected.push(candidate);
  }
  selected.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  if (selected.length > 0xffff) throw new Error('Too many files for this ZIP format.');

  const localRecords = [];
  const directoryRecords = [];
  let localSize = 0;
  let directorySize = 0;
  for (const path of selected) {
    const name = Buffer.from(`${PROJECT_DIRECTORY}/${path}`, 'utf8');
    if (name.length > 0xffff) throw new Error(`ZIP path is too long: ${path}`);
    const input = await readFile(join(ROOT, path));
    const compressed = deflateRawSync(input, { level: 9 });
    if (input.length > UINT32_MAX || compressed.length > UINT32_MAX) {
      throw new Error(`File is too large for this ZIP format: ${path}`);
    }
    const checksum = crc32(input);
    const local = localHeader(name, input, compressed, checksum);
    const central = directoryHeader(name, input, compressed, checksum, localSize);
    localRecords.push(local, name, compressed);
    directoryRecords.push(central, name);
    localSize += local.length + name.length + compressed.length;
    directorySize += central.length + name.length;
    if (localSize + directorySize + 22 > UINT32_MAX) throw new Error('Archive exceeds the supported ZIP size.');
  }

  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(selected.length, 8);
  end.writeUInt16LE(selected.length, 10);
  end.writeUInt32LE(directorySize, 12);
  end.writeUInt32LE(localSize, 16);
  const archive = Buffer.concat([...localRecords, ...directoryRecords, end]);
  const destination = join(ROOT, 'public', OUTPUT_NAME);
  const temporary = `${destination}.tmp`;
  await mkdir(dirname(destination), { recursive: true });
  try {
    await writeFile(temporary, archive);
    await rename(temporary, destination);
  } catch (error) {
    await rm(temporary, { force: true });
    throw error;
  }
  console.log(`Created public/${OUTPUT_NAME} (${selected.length} files, ${archive.length.toLocaleString('en-US')} bytes).`);
}

main().catch(error => {
  console.error(`Source ZIP was not created: ${error.message}`);
  process.exitCode = 1;
});
