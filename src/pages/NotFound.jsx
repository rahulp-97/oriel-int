import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import OrbitalGlobe from '../components/OrbitalGlobe';

export default function NotFound() {
  return (
    <main className="atlas-not-found atlas-shell">
      <div className="atlas-not-found-copy">
        <p className="atlas-eyebrow"><span /> 404 / A DIFFERENT DIRECTION</p>
        <h1>This route is<br /><em>yet to be explored.</em></h1>
        <p>The page you’re looking for isn’t here. Return to the beginning, or start a conversation about where you’d like to go next.</p>
        <div className="atlas-hero-actions"><Link to="/" className="atlas-button"><ArrowLeft size={16} aria-hidden="true" /> Back to home</Link><Link to="/contact" className="atlas-text-link">Let’s connect <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </div>
      <div className="atlas-not-found-orbital"><OrbitalGlobe /></div>
    </main>
  );
}
