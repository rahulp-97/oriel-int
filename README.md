# Avenor Atlas — React website starter

Atlas is a standalone ReactJS website for an import–export business, developed from the original dark Atlas design concept. It combines a forest-ink background, warm ivory typography, brushed-gold details, and an original orbital illustration. The homepage introduces the business through sourcing, products, trade services, and a clear inquiry invitation.

This project uses **JavaScript, JSX, React, Vite, and `react-router-dom`**. It is a client-rendered single-page application: the homepage, product details, and contact workflow are views within one application. Production hosting serves static files. Server-side rendering and an application backend are not included.

**Avenor Global is placeholder branding.** Product categories, services, and company copy are demonstration content. They do not establish a real company's history, stock, trading coverage, credentials, or capabilities.

## Get started

Use Node.js 22 or later and npm. Open a terminal in the extracted project directory and run:

```bash
npm install
npm run dev
```

Open the local address printed by Vite. Changes to the source update the development preview.

Create the static build with:

```bash
npm run build
```

The output is `dist/`. Review that build locally with:

```bash
npm run preview
```

The included functionality does not require API keys, a database, or environment variables. Fonts are bundled through Fontsource, and the original website image is included in `public/assets/`.

## Routes and navigation

| View | Browser URL suffix |
| --- | --- |
| Homepage | `/#/` |
| Contact and inquiry brief | `/#/contact` |
| Product detail | `/#/products/:slug` |

A bare `/` also opens the homepage. Replace `:slug` with an actual product slug from the site's content; it is a route parameter, not a literal product address. Use the product links in the interface to reach the configured detail views.

The app uses `HashRouter`. Its route is stored after `#`, so a static host receives the page path without that route fragment. This keeps direct links and refreshes practical on static hosting without requiring a separate server route for every product. See the [official HashRouter documentation](https://reactrouter.com/api/declarative-routers/HashRouter).

Homepage section links and routed links have different purposes. Use the existing `SectionLink` component for navigation into a homepage section, including from another route. Use React Router links for product and contact views. Preserve the existing IDs when changing section headings.

## Personalise your business

Start in `src/config/business.js`, which centralises the demonstration identity and contact configuration. Replace the company name, wordmark, descriptor, tagline, description, address, and contact fields with your own information. The browser title and runtime description follow this configuration; also update the initial metadata in `index.html`.

An email address is optional. Configure a valid business email if you want the inquiry review to offer an email-draft action. Leave unavailable contact information empty rather than publishing invented details.

Then update the homepage and product content in `src/`: replace the sample categories, descriptions, specifications, and service language with what your business actually supplies. Add your own photographs when available, and update image alternative text to describe them. Update `index.html` and `public/favicon.svg` for the browser title, site description, theme colour, and favicon.

Atlas's visual direction uses forest ink `#131b17`, warm ivory `#eeeade`, and brushed gold `#c9b58b`, with Manrope and Cormorant Garamond. Its custom orbital graphic represents global connection; it is decorative, not a map of verified offices or shipping routes. Keep the spacious typography and restrained palette when adding content so the design remains coherent.

## Inquiry brief workflow

The contact view creates a useful inquiry brief locally:

1. Complete the form and resolve its validation messages.
2. Review the entered details before taking the next action.
3. Download a plain-text `.txt` brief to keep or share yourself.
4. If a business email is configured, optionally open a draft in your email application.

The form does not automatically send a message or save an inquiry to a server. The review and text download are generated in the browser. Opening an email draft delegates to the visitor's email application, where the visitor reviews and sends it. Browser or device email configuration determines whether a `mailto:` action opens successfully.

For automatic inquiry delivery, add a real backend or form service and change the interface to reflect the actual delivery result. The current workflow should continue to be presented as preparation, review, and download until that integration exists.

## Source guide

| Location | Responsibility |
| --- | --- |
| `src/main.jsx` | React entry point and application mounting |
| `src/App.jsx` | Router, shared application structure, and route selection |
| `src/config/business.js` | Central business identity and contact configuration |
| `src/components/` | Reusable interface pieces, including section navigation |
| `src/pages/` | Page views, including `Contact.jsx` |
| `src/styles/` | Shared base and contact styles, plus theme styling where present |
| `public/assets/port-aerial.webp` | Original generated shipping image |
| `public/favicon.svg` | Browser icon |
| `scripts/package-source.mjs` | Reproducible source ZIP generation |
| `package.json` | Dependencies and npm commands |

Concept-specific content and styles remain in `src/`. Follow a component's imports to find the data or stylesheet it uses. Keep reusable business details in the configuration rather than repeating them through individual pages.

## Package and publish

Generate a fresh downloadable source archive with:

```bash
npm run package:source
```

This creates `public/avenor-atlas-react.zip`, containing a top-level `avenor-atlas-spa/` folder. The script uses Node's built-in filesystem and compression modules, with no additional archive dependency. It sorts entries and uses fixed timestamps for reproducible packaging from unchanged inputs.

The archive includes selected source files, documentation, configuration examples, dependency manifests, the packaging script, favicon, and approved image assets. It excludes `node_modules`, build output, Git and hosting state, real `.env` files, screenshots, and existing ZIPs. If you add a public asset, add its intended path to `PUBLIC_FILES` in the packaging script.

Run `npm run package:source` **before** `npm run build` when the deployed website should include the current downloadable source. Publish the contents of `dist/` to your static host. The supplied paths assume hosting at the domain root; review asset paths and Vite's base setting before using a subdirectory.

## Original assets

The layout, styling, orbital illustration, and brand treatment were authored for this design. The aerial container-ship image was originally generated with OpenAI's built-in image generation tool without external reference images, then converted to WebP. It is illustrative imagery, not evidence of company-owned vessels or completed shipments. React, router, icons, and typefaces retain their respective package identities and notices.
