import React from 'react';
import { Link } from 'react-router-dom';

// Query-based section links also work correctly when the app uses HashRouter.
export default function SectionLink({ section, children, ...props }) {
  return (
    <Link to={{ pathname: '/', search: `?section=${encodeURIComponent(section)}` }} {...props}>
      {children}
    </Link>
  );
}
