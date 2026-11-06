import React from 'react';
import { Link } from 'react-router-dom';
import business from '../config/business';

function AtlasMark() {
  return (
    <svg viewBox="0 0 38 42" fill="none" aria-hidden="true">
      <path d="M3 37 19 5l16 32M10 23h18M6 31h26" stroke="currentColor" strokeWidth="1.8" />
      <path d="m19 5 8 32" stroke="currentColor" strokeWidth=".8" />
    </svg>
  );
}

export default function Brand() {
  return (
    <Link to="/" className="atlas-brand" aria-label={`${business.name} home`}>
      <AtlasMark />
      <span>{business.wordmark}<small>{business.descriptor}</small></span>
    </Link>
  );
}
