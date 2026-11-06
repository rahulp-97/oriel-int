import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, ArrowRight, Plus, Minus } from 'lucide-react';
import business from '../config/business';
import OrbitalGlobe from '../components/OrbitalGlobe';
import SectionLink from '../components/SectionLink';
import { services, categories, steps } from '../data/content';

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const selectedCategory = categories[activeCategory];
  const shortName = business.wordmark.charAt(0) + business.wordmark.slice(1).toLowerCase();

  function handleCategoryKeyDown(event, index) {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % categories.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index + categories.length - 1) % categories.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = categories.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      setActiveCategory(nextIndex);
      document.getElementById(`atlas-category-tab-${nextIndex}`)?.focus();
    }
  }

  return (
    <main>
      <section className="atlas-hero atlas-shell" aria-labelledby="atlas-title">
        <div className="atlas-hero-copy">
          <div className="atlas-eyebrow"><span /> INDEPENDENT THINKING. INTERNATIONAL REACH.</div>
          <h1 id="atlas-title">Opportunity,<br /><em>without borders.</em></h1>
          <p>Connecting considered products with new possibilities. Your next chapter in global trade starts with the right partner.</p>
          <div className="atlas-hero-actions">
            <Link to="/contact" className="atlas-button">Explore a partnership <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <SectionLink section="atlas-expertise" className="atlas-text-link">Discover {shortName} <ArrowDown size={15} aria-hidden="true" /></SectionLink>
          </div>
        </div>
        <div className="atlas-orbital"><OrbitalGlobe /></div>
        <div className="atlas-hero-bottom">
          <span>FROM ORIGIN TO OPPORTUNITY</span>
          <div><span>SOURCING</span><i /><span>IMPORT</span><i /><span>EXPORT</span></div>
          <SectionLink section="atlas-expertise" aria-label="Scroll to our expertise"><ArrowDown size={17} aria-hidden="true" /></SectionLink>
        </div>
      </section>

      <section id="atlas-expertise" className="atlas-expertise" aria-labelledby="atlas-expertise-title">
        <div className="atlas-shell">
          <div className="atlas-section-heading">
            <p className="atlas-section-kicker">01 / OUR EXPERTISE</p>
            <h2 id="atlas-expertise-title">A world of ambition.<br /><em>A considered approach.</em></h2>
          </div>
          <div className="atlas-expertise-grid">
            <figure className="atlas-port-image">
              <img src="/assets/port-aerial.webp" alt="Aerial view of a cargo ship on deep teal water" loading="lazy" />
              <figcaption><span>CONNECTED BY POSSIBILITY</span><p>Every great journey<br />begins with a connection.</p></figcaption>
            </figure>
            <div className="atlas-services">
              {services.map((item, index) => {
                const isOpen = activeService === index;
                return (
                  <div className={`atlas-service ${isOpen ? 'active' : ''}`} key={item.title}>
                    <button type="button" id={`atlas-service-button-${index}`} aria-expanded={isOpen} aria-controls={`atlas-service-${index}`} onClick={() => setActiveService(isOpen ? -1 : index)}>
                      <span className="atlas-service-number">0{index + 1}</span><span>{item.title}</span>
                      {isOpen ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
                    </button>
                    <div id={`atlas-service-${index}`} hidden={!isOpen} className="atlas-service-detail" role="region" aria-labelledby={`atlas-service-button-${index}`}>
                      <span>{item.tag}</span><p>{item.description}</p><small>{item.detail}</small>
                    </div>
                  </div>
                );
              })}
              <SectionLink section="atlas-approach" className="atlas-expertise-link">A closer look at how we work <ArrowUpRight size={15} aria-hidden="true" /></SectionLink>
            </div>
          </div>
        </div>
      </section>

      <section id="atlas-products" className="atlas-products atlas-shell" aria-labelledby="atlas-products-title">
        <div className="atlas-section-heading">
          <p className="atlas-section-kicker">02 / SELECTED POSSIBILITIES</p>
          <div><h2 id="atlas-products-title">Different products.<br /><em>Shared potential.</em></h2><p className="atlas-section-description">A starting point for what we could explore together.</p></div>
        </div>
        <div className="atlas-category-list" role="tablist" aria-label="Explore example product categories">
          {categories.map((item, index) => (
            <button type="button" key={item.slug} role="tab" aria-selected={activeCategory === index} aria-controls="atlas-category-details" id={`atlas-category-tab-${index}`} className={activeCategory === index ? 'active' : ''} tabIndex={activeCategory === index ? 0 : -1} onClick={() => setActiveCategory(index)} onKeyDown={(event) => handleCategoryKeyDown(event, index)}>
              <span>{item.code}</span><span className="atlas-category-title">{item.name}</span><ArrowUpRight size={21} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div id="atlas-category-details" role="tabpanel" aria-labelledby={`atlas-category-tab-${activeCategory}`} className="atlas-category-description">
          <p>{selectedCategory.examples}</p>
          <div className="atlas-category-actions">
            <Link to={`/products/${selectedCategory.slug}`}>Explore category <ArrowUpRight size={15} aria-hidden="true" /></Link>
            <Link to={`/contact?category=${encodeURIComponent(selectedCategory.name)}`}>Discuss this category <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section id="atlas-approach" className="atlas-approach" aria-labelledby="atlas-approach-title">
        <div className="atlas-shell">
          <div className="atlas-section-heading"><p className="atlas-section-kicker">03 / THE WAY FORWARD</p><h2 id="atlas-approach-title">Clarity at every step.<br /><em>Connection at the heart.</em></h2></div>
          <div className="atlas-steps">
            {steps.map((step, index) => <article key={step.title}><div><span>0{index + 1}</span><ArrowRight size={16} aria-hidden="true" /></div><h3>{step.title}</h3><p>{step.text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="atlas-contact" className="atlas-contact atlas-shell" aria-labelledby="atlas-contact-title">
        <div><p className="atlas-eyebrow"><span /> YOUR NEXT CHAPTER</p><h2 id="atlas-contact-title">Great trade starts<br />with <em>a conversation.</em></h2><p>Where would you like to go next?</p></div>
        <Link to="/contact" aria-label="Start a conversation" className="atlas-contact-orbit"><ArrowUpRight size={45} strokeWidth={1} aria-hidden="true" /><span>LET’S CONNECT</span></Link>
      </section>
    </main>
  );
}
