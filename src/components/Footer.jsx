import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import business from '../config/business';
import Brand from './Brand';
import SectionLink from './SectionLink';

export default function Footer() {
  return (
    <footer className="atlas-footer atlas-shell">
      <Brand />
      <p>{business.tagline}</p>
      <div className="atlas-footer-links">
        <Link to="/contact">Contact <ArrowUpRight size={13} aria-hidden="true" /></Link>
        <SectionLink section="atlas-top">Back to the top <ArrowUpRight size={13} aria-hidden="true" /></SectionLink>
      </div>
    </footer>
  );
}
