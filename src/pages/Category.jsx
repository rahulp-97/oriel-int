import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Cog, Leaf, Package, Wheat } from 'lucide-react';
import SectionLink from '../components/SectionLink';
import { categories } from '../data/content';
import NotFound from './NotFound';

const categoryIcons = { wheat: Wheat, leaf: Leaf, cog: Cog, package: Package };
const categoryHeadings = {
  'food-agriculture': ['Food &', 'agriculture.'],
  'natural-materials': ['Natural', 'materials.'],
  'industrial-goods': ['Industrial', 'goods.'],
  'consumer-essentials': ['Consumer', 'essentials.'],
};

export default function Category() {
  const { slug } = useParams();
  const category = categories.find((item) => item.slug === slug);
  if (!category) return <NotFound />;

  const CategoryIcon = categoryIcons[category.icon] || Package;
  const [title, accent] = categoryHeadings[category.slug] || [category.name, ''];
  const contactPath = `/contact?category=${encodeURIComponent(category.name)}`;
  const otherCategories = categories.filter((item) => item.slug !== category.slug);

  return (
    <main className="atlas-category-page">
      <section className="atlas-category-hero atlas-shell" aria-labelledby="atlas-category-page-title">
        <SectionLink section="atlas-products" className="atlas-back-link"><ArrowLeft size={15} aria-hidden="true" /> All possibilities</SectionLink>
        <div className="atlas-category-hero-grid">
          <div>
            <p className="atlas-eyebrow"><span /> {category.code} / SELECTED POSSIBILITIES</p>
            <h1 id="atlas-category-page-title">{title}<br /><em>{accent}</em></h1>
            <p className="atlas-category-lead">{category.introduction}</p>
            <Link to={contactPath} className="atlas-button">Discuss this category <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="atlas-category-emblem" aria-hidden="true">
            <div className="atlas-category-emblem-ring"><CategoryIcon size={104} strokeWidth={.7} /><span className="atlas-category-orbit-dot" /></div>
            <span className="atlas-category-emblem-top">FROM ORIGIN</span>
            <span className="atlas-category-emblem-bottom">TO POSSIBILITY</span>
            <span className="atlas-category-emblem-number">{category.code}</span>
          </div>
        </div>
      </section>

      <section className="atlas-category-selection" aria-labelledby="atlas-category-selection-title">
        <div className="atlas-shell">
          <div className="atlas-section-heading"><p className="atlas-section-kicker">01 / PRODUCT DIRECTIONS</p><div><h2 id="atlas-category-selection-title">A starting point.<br /><em>Room to explore.</em></h2><p className="atlas-category-editorial">{category.editorial}</p></div></div>
          <div className="atlas-category-item-list">
            {category.items.map((item, index) => (
              <article key={item.name} className="atlas-category-item">
                <span className="atlas-category-item-number">0{index + 1}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <Link to={contactPath} aria-label={`Ask about ${item.name.toLowerCase()}`}><ArrowUpRight size={21} strokeWidth={1.2} aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
          <p className="atlas-category-availability">These examples are a starting point for your brief. Availability, specifications and requirements are confirmed for each inquiry.</p>
        </div>
      </section>

      <section className="atlas-category-brief atlas-shell" aria-labelledby="atlas-category-brief-title">
        <figure className="atlas-category-brief-photo atlas-port-image">
          <img src="/assets/port-aerial.webp" alt="Cargo ship and port viewed from above" loading="lazy" />
          <figcaption><span>THE DETAILS MAKE THE DIFFERENCE</span><p>Clarity from<br />the outset.</p></figcaption>
        </figure>
        <div>
          <p className="atlas-eyebrow"><span /> 02 / YOUR BUYER BRIEF</p>
          <h2 id="atlas-category-brief-title">Let’s understand<br /><em>what matters.</em></h2>
          <p className="atlas-category-brief-intro">A few considered details make a useful first conversation. Share what you know, and we can discuss the next steps.</p>
          <ul className="atlas-brief-checklist">
            {category.buyerBrief.map((detail) => <li key={detail}><Check size={16} strokeWidth={1.3} aria-hidden="true" /><span>{detail}</span></li>)}
          </ul>
          <Link to={contactPath} className="atlas-text-link atlas-category-brief-cta">Start with your requirements <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="atlas-category-related atlas-shell" aria-labelledby="atlas-category-related-title">
        <div className="atlas-related-heading"><h2 id="atlas-category-related-title">More <em>possibilities.</em></h2><SectionLink section="atlas-products" className="atlas-text-link">All categories <ArrowRight size={15} aria-hidden="true" /></SectionLink></div>
        <div className="atlas-related-list">
          {otherCategories.map((item) => <Link key={item.slug} to={`/products/${item.slug}`}><span>{item.code}</span><strong>{item.name}</strong><ArrowUpRight size={19} strokeWidth={1.3} aria-hidden="true" /></Link>)}
        </div>
      </section>
    </main>
  );
}
