import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight, Check, Download, Mail, MapPin, Phone, RotateCcw } from 'lucide-react';
import business from '../config/business';
import '../styles/contact.css';

const initialFields = {
  name: '', email: '', company: '', interest: '', category: '',
  origin: '', destination: '', quantity: '', timing: '', message: '',
};

function makeBrief(fields) {
  return [
    `${business.name.toUpperCase()} — TRADE ENQUIRY`,
    '',
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company && `Company: ${fields.company}`,
    `Interest: ${fields.interest}`,
    fields.category && `Category: ${fields.category}`,
    fields.origin && `Origin: ${fields.origin}`,
    fields.destination && `Destination: ${fields.destination}`,
    fields.quantity && `Quantity: ${fields.quantity}`,
    fields.timing && `Timing: ${fields.timing}`,
    '',
    'REQUIREMENT',
    fields.message,
    '',
    'Prepared by the visitor. This brief has not been submitted automatically.',
  ].filter(line => line !== false).join('\n');
}

export default function Contact({ categories = [] }) {
  const [params] = useSearchParams();
  const suggested = params.get('category') || '';
  const [fields, setFields] = useState(() => ({
    ...initialFields,
    category: categories.includes(suggested) ? suggested : '',
  }));
  const [errors, setErrors] = useState({});
  const [review, setReview] = useState(false);
  const [notice, setNotice] = useState('');
  const form = useRef(null);
  const reviewHeading = useRef(null);

  useEffect(() => {
    if (categories.includes(suggested)) {
      setFields(current => ({ ...current, category: suggested }));
    }
  }, [suggested]);

  function update(event) {
    const { name, value } = event.target;
    setFields(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: '' }));
  }

  function submit(event) {
    event.preventDefault();
    const clean = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, value.trim()]));
    const nextErrors = {};
    if (!clean.name) nextErrors.name = 'Please enter your name.';
    if (!clean.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) || form.current?.elements.namedItem('email')?.validity.typeMismatch) nextErrors.email = 'Please enter a valid email address.';
    if (!clean.interest) nextErrors.interest = 'Please choose an area of interest.';
    if (!clean.message) nextErrors.message = 'Please describe your requirement.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.current?.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setFields(clean);
    setNotice('');
    setReview(true);
    requestAnimationFrame(() => {
      reviewHeading.current?.focus({ preventScroll: true });
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      reviewHeading.current?.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  function download() {
    const blob = new Blob([makeBrief(fields)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const slug = business.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'trade';
    anchor.href = url;
    anchor.download = `${slug}-enquiry.txt`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Your download is ready. Nothing has been sent.');
  }

  function edit() {
    setReview(false);
    setNotice('');
    requestAnimationFrame(() => form.current?.elements.namedItem('name')?.focus());
  }

  const emailLink = business.email
    ? `mailto:${business.email}?subject=${encodeURIComponent(`Trade enquiry — ${fields.interest}`)}&body=${encodeURIComponent(makeBrief(fields))}`
    : '';

  const inputProps = name => ({
    name,
    value: fields[name],
    onChange: update,
    'aria-label': ({ name: 'Your name *', email: 'Email address *', interest: 'I’m interested in *', message: 'Tell us about your requirement *' })[name],
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `error-${name}` : undefined,
  });

  return (
    <main className="trade-contact-page">
      <div className="trade-container">
        <Link className="trade-back-link" to="/"><ArrowLeft size={15} /> Back to the beginning</Link>
        <div className="trade-contact-layout">
          <div className="trade-contact-intro">
            <p className="trade-kicker"><span /> A NEW POSSIBILITY</p>
            <h1>Your next chapter<br />starts <em>here.</em></h1>
            <p className="trade-contact-description">Tell us what you’re looking to source, import, or export. Bring the details together in one considered brief.</p>
            <div className="trade-contact-guide">
              <span className="trade-guide-label">A GOOD CONVERSATION BEGINS WITH</span>
              <p><span>01</span> The product you have in mind</p>
              <p><span>02</span> Where it begins. Where it goes.</p>
              <p><span>03</span> The details that matter to you</p>
            </div>
            {(business.email || business.phone || business.address) && (
              <div className="trade-contact-details">
                {business.email && <a href={`mailto:${business.email}`}><Mail size={15} /> {business.email}</a>}
                {business.phone && <a href={`tel:${business.phone.replace(/[^+\d]/g, '')}`}><Phone size={15} /> {business.phone}</a>}
                {business.address && <p><MapPin size={15} /> {business.address}</p>}
              </div>
            )}
            <p className="trade-personal-note">A clear brief.<br /><em>A world of possibility.</em></p>
          </div>

          <section className="trade-form-panel" aria-label={review ? 'Review your enquiry' : 'Prepare an enquiry'}>
            {review ? (
              <div className="trade-review">
                <span className="trade-review-check"><Check size={22} strokeWidth={1.5} /></span>
                <span className="trade-form-kicker">READY FOR THE NEXT STEP</span>
                <h2 ref={reviewHeading} tabIndex={-1}>Your enquiry,<br /><em>considered.</em></h2>
                <p className="trade-review-description">Review your details and download your enquiry to share. Nothing has been sent.</p>
                <dl className="trade-summary">
                  <div><dt>Name</dt><dd>{fields.name}</dd></div>
                  <div><dt>Email</dt><dd>{fields.email}</dd></div>
                  {fields.company && <div><dt>Company</dt><dd>{fields.company}</dd></div>}
                  <div><dt>Interest</dt><dd>{fields.interest}</dd></div>
                  {fields.category && <div><dt>Category</dt><dd>{fields.category}</dd></div>}
                  {(fields.origin || fields.destination) && <div><dt>Journey</dt><dd>{fields.origin || 'To be discussed'} <span aria-label="to">→</span> {fields.destination || 'To be discussed'}</dd></div>}
                  {fields.quantity && <div><dt>Quantity</dt><dd>{fields.quantity}</dd></div>}
                  {fields.timing && <div><dt>Timing</dt><dd>{fields.timing}</dd></div>}
                  <div className="trade-summary-message"><dt>Your requirement</dt><dd>{fields.message}</dd></div>
                </dl>
                <button type="button" className="trade-primary-button" onClick={download}>Download enquiry <Download size={17} /></button>
                {emailLink && <a className="trade-email-button" href={emailLink}>Open an email draft <Mail size={16} /></a>}
                <div className="trade-review-bottom"><button type="button" onClick={edit}><RotateCcw size={13} /> Edit details</button><Link to="/">Return home <ArrowUpRight size={14} /></Link></div>
                <p className="trade-form-notice" role="status" aria-live="polite">{notice}</p>
                {emailLink && <p className="trade-form-note">Your email app opens a draft for you to review and send.</p>}
              </div>
            ) : (
              <form ref={form} onSubmit={submit} noValidate>
                <div className="trade-form-heading"><span className="trade-form-kicker">YOUR ENQUIRY</span><span>Fields marked * are required</span></div>
                <div className="trade-form-row">
                  <label htmlFor="trade-name">Your name *<input id="trade-name" autoComplete="name" placeholder="Your full name" maxLength={120} required {...inputProps('name')} />{errors.name && <small id="error-name" className="trade-field-error">{errors.name}</small>}</label>
                  <label htmlFor="trade-email">Email address *<input id="trade-email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={180} required {...inputProps('email')} />{errors.email && <small id="error-email" className="trade-field-error">{errors.email}</small>}</label>
                </div>
                <div className="trade-form-row">
                  <label htmlFor="trade-company">Company<input id="trade-company" autoComplete="organization" placeholder="Your company" maxLength={160} {...inputProps('company')} /></label>
                  <label htmlFor="trade-interest">I’m interested in *<select id="trade-interest" required {...inputProps('interest')}><option value="">Select an area</option><option>Importing products</option><option>Exporting products</option><option>Sourcing support</option><option>A trade partnership</option></select>{errors.interest && <small id="error-interest" className="trade-field-error">{errors.interest}</small>}</label>
                </div>
                <label htmlFor="trade-category">Product category<select id="trade-category" {...inputProps('category')}><option value="">Choose a category (optional)</option>{categories.map(name => <option key={name}>{name}</option>)}<option>Other / to be discussed</option></select></label>
                <div className="trade-form-divider"><span>THE JOURNEY</span><span>Share what you know so far</span></div>
                <div className="trade-form-row">
                  <label htmlFor="trade-origin">Origin<input id="trade-origin" placeholder="Country or region" maxLength={120} {...inputProps('origin')} /></label>
                  <label htmlFor="trade-destination">Destination<input id="trade-destination" placeholder="Country or region" maxLength={120} {...inputProps('destination')} /></label>
                </div>
                <div className="trade-form-row">
                  <label htmlFor="trade-quantity">Quantity<input id="trade-quantity" placeholder="Approximate amount or volume" maxLength={120} {...inputProps('quantity')} /></label>
                  <label htmlFor="trade-timing">Expected timing<select id="trade-timing" {...inputProps('timing')}><option value="">Select a timeframe (optional)</option><option>Exploring options</option><option>Within one month</option><option>One to three months</option><option>More than three months</option></select></label>
                </div>
                <label htmlFor="trade-message">Tell us about your requirement *<textarea id="trade-message" placeholder="Product specifications, quality expectations, packaging, or anything else you would like to discuss…" rows={4} maxLength={2400} required {...inputProps('message')} />{errors.message && <small id="error-message" className="trade-field-error">{errors.message}</small>}</label>
                <button className="trade-primary-button" type="submit">Review my enquiry <ArrowRight size={18} /></button>
                <p className="trade-form-note">Your details stay in this page. Review and download your enquiry before sharing it.{business.email ? ' You can also open a draft in your email app.' : ''}</p>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
