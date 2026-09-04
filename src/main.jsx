import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, usePathname } from './routing/Router.jsx';
import HomePage from './pages/HomePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Preloader from './components/Preloader.jsx';
import PageTransition from './components/PageTransition.jsx';
import GlobalScene from './components/GlobalScene.jsx';
import Navigation from './components/Navigation.jsx';
import {applyBrandTheme} from './theme.js';
import './brand.css';

applyBrandTheme(document.documentElement);

function App() {
  const pathname = usePathname();
  return <>
    <Preloader />
    <PageTransition>
      <GlobalScene />
      {pathname === '/' ? <HomePage /> : pathname === '/contact' ? <ContactPage /> : <NotFoundPage />}
      <Navigation />
    </PageTransition>
  </>;
}

// SplitText must measure the provided fonts, not a fallback during first paint.
Promise.all([
  document.fonts.load('400 16px "Bebas Neue"', 'ESA AaAaIiSsTt'),
  document.fonts.load('500 16px "Inter Tight"', 'ESA AaAaIiSsTt'),
  document.fonts.load('400 16px "Plus Jakarta Sans"', 'ESA AaAaIiSsTt'),
]).then(() => {
  createRoot(document.getElementById('root')).render(<RouterProvider><App /></RouterProvider>);
});
