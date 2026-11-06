import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Brand from './Brand';
import SectionLink from './SectionLink';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="atlas-header atlas-shell" id="atlas-top">
      <Brand />
      <nav id="atlas-main-navigation" className={`atlas-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        <SectionLink section="atlas-expertise" onClick={closeMenu}>Our expertise</SectionLink>
        <SectionLink section="atlas-products" onClick={closeMenu}>Possibilities</SectionLink>
        <SectionLink section="atlas-approach" onClick={closeMenu}>Our approach</SectionLink>
        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `atlas-nav-contact${isActive ? ' is-current' : ''}`}>
          Let’s connect <ArrowUpRight size={15} aria-hidden="true" />
        </NavLink>
      </nav>
      <button ref={toggleRef} type="button" className="atlas-mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="atlas-main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
    </header>
  );
}
