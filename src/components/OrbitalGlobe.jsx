import React, { memo } from 'react';

// The original Atlas orbital artwork, kept intact.
function OrbitalGlobe(){
  const radius=207,cx=324,cy=306;
  function point(lon,lat){const a=lon*Math.PI/180,b=lat*Math.PI/180,tilt=-19*Math.PI/180;const x=Math.cos(b)*Math.sin(a),y=Math.sin(b),z=Math.cos(b)*Math.cos(a);const yt=y*Math.cos(tilt)-z*Math.sin(tilt),zt=y*Math.sin(tilt)+z*Math.cos(tilt);return {x:cx+radius*x,y:cy-radius*yt,z:zt};}
  function path(points,front){let d='',started=false;for(const p of points){if((front&&p.z>=0)||(!front&&p.z<0)){d+=`${started?'L':'M'}${p.x.toFixed(2)},${p.y.toFixed(2)} `;started=true;}else started=false;}return d;}
  const meridians=Array.from({length:18},(_,i)=>Array.from({length:181},(_,j)=>point(i*20,j-90)));
  const parallels=Array.from({length:11},(_,i)=>Array.from({length:361},(_,j)=>point(j,i*15-75)));
  const lines=[...meridians,...parallels];
  return <svg className="atlas-globe" viewBox="0 0 650 650" role="img" aria-label="Original golden orbital illustration symbolising global trade connections">
    <defs><radialGradient id="atlas-sphere" cx="31%" cy="25%" r="77%"><stop offset="0" stopColor="#8b8862" stopOpacity=".29"/><stop offset=".48" stopColor="#484f37" stopOpacity=".2"/><stop offset="1" stopColor="#0c1612" stopOpacity=".9"/></radialGradient><radialGradient id="atlas-halo"><stop offset="0" stopColor="#8b8d64" stopOpacity=".12"/><stop offset="1" stopColor="#131b17" stopOpacity="0"/></radialGradient><linearGradient id="atlas-orbit"><stop stopColor="#d7c49a" stopOpacity=".08"/><stop offset=".5" stopColor="#dac697" stopOpacity=".85"/><stop offset="1" stopColor="#d7c49a" stopOpacity=".1"/></linearGradient><filter id="atlas-soft-glow"><feGaussianBlur stdDeviation="5"/></filter></defs>
    <circle cx={cx} cy={cy} r="304" fill="url(#atlas-halo)"/>
    <circle cx={cx} cy={cy} r="260" fill="none" stroke="#c8b790" strokeOpacity=".11" strokeDasharray="2 7"/>
    <circle cx={cx} cy={cy} r="234" fill="none" stroke="#c8b790" strokeOpacity=".08"/>
    <ellipse cx={cx} cy={cy} rx="295" ry="80" transform="rotate(-31 324 306)" fill="none" stroke="#c8b790" strokeOpacity=".18"/>
    <circle cx={cx} cy={cy} r={radius} fill="url(#atlas-sphere)" stroke="#d5c59a" strokeOpacity=".43"/>
    {lines.map((pts,i)=><path key={`back${i}`} d={path(pts,false)} stroke="#d8c497" strokeOpacity=".055" fill="none" strokeWidth=".7"/>)}
    {lines.map((pts,i)=><path key={`front${i}`} d={path(pts,true)} stroke="#d8c497" strokeOpacity={i<18?'.24':'.36'} fill="none" strokeWidth=".8"/>)}
    <ellipse cx={cx} cy={cy} rx="291" ry="73" transform="rotate(-31 324 306)" fill="none" stroke="url(#atlas-orbit)" strokeWidth="1.4" strokeDasharray="510 650" strokeDashoffset="-40"/>
    <path d="M143 280C178 103 453 108 498 275" fill="none" stroke="#e1cba0" strokeWidth="1.6" strokeOpacity=".7"/>
    <path d="M195 440C328 513 427 256 467 201" fill="none" stroke="#ccb17a" strokeWidth="1.1" strokeOpacity=".55"/>
    {[[143,280],[498,275],[195,440],[467,201]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="11" fill="#ebd2a0" opacity=".19" filter="url(#atlas-soft-glow)"/><circle cx={x} cy={y} r="4" fill="#dbc49a"/><circle cx={x} cy={y} r="9" fill="none" stroke="#dbc49a" strokeOpacity=".32" strokeWidth=".7"/></g>)}
    <g fill="#c6bb9c" fontFamily="Manrope,sans-serif" fontSize="8" letterSpacing="2.3"><text x="91" y="265">ORIGIN</text><text x="482" y="187">OPPORTUNITY</text><text x="155" y="468">CONNECTION</text></g>
    <path d="M324 35v13M324 564v13M56 306H69M579 306h13" stroke="#b8a67d" strokeOpacity=".48"/>
    <text x="324" y="602" textAnchor="middle" fill="#7f8877" fontFamily="Manrope,sans-serif" fontSize="8" letterSpacing="3">A WORLD OF POSSIBILITY</text>
  </svg>;
}

export default memo(OrbitalGlobe);
