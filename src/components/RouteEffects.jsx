import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import business from '../config/business';

export default function RouteEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());
  const activeKey = useRef(null);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const rememberPosition = () => {
      if (activeKey.current) positions.current.set(activeKey.current, window.scrollY);
    };
    window.addEventListener('scroll', rememberPosition, { passive: true });
    return () => {
      window.removeEventListener('scroll', rememberPosition);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    // Record scrolls while a page is active, not after a shorter new page mounts.
    activeKey.current = null;
    const title = location.pathname === '/contact'
      ? 'Start a conversation'
      : location.pathname.startsWith('/products/') || location.pathname.startsWith('/collection/')
        ? 'Product possibilities'
        : 'Import & Export';
    document.title = `${business.name} — ${title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', business.description);

    const frame = requestAnimationFrame(() => {
      const savedPosition = positions.current.get(location.key);
      const section = new URLSearchParams(location.search).get('section');
      const target = location.pathname === '/' && section ? document.getElementById(section) : null;
      if (navigationType === 'POP' && savedPosition !== undefined) {
        window.scrollTo({ top: savedPosition, left: 0, behavior: 'instant' });
      } else if (target) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      activeKey.current = location.key;
      positions.current.set(location.key, window.scrollY);

      if (previousPath.current !== location.pathname) {
        const heading = document.querySelector('main h1');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
        }
      }
      previousPath.current = location.pathname;
    });

    return () => {
      activeKey.current = null;
      cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.search, location.key, navigationType]);

  return null;
}
