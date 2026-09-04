import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const RouterContext = createContext(null);
export function RouterProvider({ children }) {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);
  const router = useMemo(() => ({
    push(url) {
      window.history.pushState({}, '', url);
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    replace(url) {
      window.history.replaceState({}, '', url);
      setPathname(window.location.pathname);
    },
    back() { window.history.back(); },
    prefetch() {},
  }), []);
  return <RouterContext.Provider value={{ pathname, router }}>{children}</RouterContext.Provider>;
}
export function usePathname() { return useContext(RouterContext).pathname; }
export function useRouter() { return useContext(RouterContext).router; }
export default function Link({ href, children, prefetch, replace, scroll, ...props }) {
  return <a href={typeof href === 'string' ? href : href.pathname} {...props}>{children}</a>;
}
