import { useLayoutEffect, useRef } from 'react';
import { getVendor } from '../vendor/runtime.js';
import * as HeadingReveal from './HeadingReveal.jsx';
import * as AnimatedButton from './AnimatedButton.jsx';
import Link from '../routing/Router.jsx';
import SectionWipe from './SectionWipe.jsx';
import TechnologyCarousel from './TechnologyCarousel.jsx';
import './ESAContent.css';

const { gsap } = getVendor(89970);
const { ScrollTrigger } = getVendor(83495);
gsap.registerPlugin(ScrollTrigger);

const services = [
  ['01', 'Website-uri & landing pages', 'Un mesaj clar, un design recognoscibil si un traseu firesc spre contact, rezervare sau comanda. De la prima schita la o interfata adaptata pentru desktop si mobil.', 'Structura · UX/UI · Frontend · Formulare'],
  ['02', 'E-commerce & Shopify', 'Magazine construite in jurul felului in care vinzi. Personalizare Shopify sau dezvoltare custom, cu plati, livrare si facturare conectate la operatiunile tale.', 'Shopify / Liquid · Checkout · Plati · Integrari'],
  ['03', 'Aplicatii web & CRM', 'Cand un site de prezentare nu este suficient: panouri de administrare, conturi, baze de date si fluxuri de lucru construite pentru echipa ta.', 'Frontend · Backend · Roluri · Date'],
  ['04', 'Automatizari & API', 'Mai putin transfer manual de date intre platforme. Conectez aplicatii, construiesc unelte interne si automatizez pasii repetitivi, cu validari si tratarea erorilor.', 'JavaScript · Python · API · Webhook-uri'],
  ['05', 'Creative development', 'Design cu scop. Cod cu personalitate. Animatii, micro-interactiuni si experiente 3D care sustin mesajul, fara sa faca interfata greu de folosit.', 'Motion · WebGL · 3D · Interactiuni'],
  ['06', 'Optimizare & mentenanta', 'Un produs digital are nevoie de atentie si dupa lansare. Audit tehnic, optimizarea incarcarii, SEO tehnic, actualizari si interventii stabilite in functie de proiect.', 'Performanta · SEO tehnic · Backup · Suport'],
];

export function ESAProfile() {
  const profile = useRef(null);
  useLayoutEffect(() => {
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      profile.current.querySelectorAll('.esa-service').forEach((card) => {
        const copy = card.querySelectorAll('.esa-number, .esa-service-copy p');
        gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        })
          .fromTo(card.querySelector('.esa-service-rule'), { scaleX: 0 }, {
            scaleX: 1, duration: 0.9, ease: 'power3.out',
          }, 0)
          .fromTo(copy, { opacity: 0, y: 28 }, {
            opacity: 1, y: 0, duration: 0.75, stagger: 0.09,
            ease: 'power3.out', clearProps: 'opacity,transform',
          }, 0.12);
      });
      const craft = profile.current.querySelector('.esa-craft-note');
      gsap.timeline({
        scrollTrigger: { trigger: craft, start: 'top 85%', once: true },
      })
        .fromTo(craft.querySelector('.esa-craft-label'), { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          clearProps: 'opacity,transform',
        }, 0)
        .fromTo(craft.querySelectorAll('.esa-craft-copy > p'), { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.16,
          ease: 'power3.out', clearProps: 'opacity,transform',
        }, 0.2);
    }, profile);
    return () => motion.revert();
  }, []);
  return (
    <section ref={profile} className="esa-content esa-profile" aria-labelledby="esa-profile-title">
      <p className="esa-eyebrow">ESA CODER SOLUTIONS / DEZVOLTARE CUSTOM</p>
      <div className="esa-intro-grid">
        <HeadingReveal.default>
          <h2 id="esa-profile-title" className="esa-heading">Din idee,<br /><span>in cod.</span></h2>
        </HeadingReveal.default>
        <div className="esa-intro-copy">
          <p>Un website trebuie sa arate bine. Dar munca nu se opreste la design.</p>
          <p>Prin ESA Coder Solutions, leg partea vizuala de ceea ce trebuie sa functioneze in spate: date, integrari si procese. Construiesc site-uri, magazine online si aplicatii custom pornind de la problema reala, nu de la o lista de efecte.</p>
          <p>Ai deja o directie sau doar o idee? Clarificam ce merita construit, ce poate astepta si cum ajungem la o prima versiune utila.</p>
        </div>
      </div>
      <div className="esa-services" aria-label="Servicii ESA Coder Solutions">
        {services.map(([number, title, description, deliverables]) => (
          <article className="esa-service" key={number}>
            <span className="esa-service-rule" aria-hidden="true" />
            <span className="esa-number">{number}</span>
            <HeadingReveal.default className="esa-service-title"><h3>{title}</h3></HeadingReveal.default>
            <div className="esa-service-copy"><p>{description}</p><p className="esa-deliverables">{deliverables}</p></div>
          </article>
        ))}
      </div>
      <div className="esa-method-note">
        <HeadingReveal.default className="esa-method-heading"><h3>Tehnologia urmeaza<br />proiectul, <span className="esa-method-emphasis">nu invers.</span></h3></HeadingReveal.default>
        <p>React / Next.js, JavaScript, Express, Python sau Shopify: alegerea depinde de ce construim, de integrarile necesare si de felul in care vei administra produsul.</p>
      </div>
      <TechnologyCarousel />
      <aside id="esa-custom-approach" className="esa-craft-note" aria-labelledby="esa-craft-title">
        <div>
          <p className="esa-craft-label">MODUL NOSTRU DE LUCRU</p>
          <HeadingReveal.default variant="black"><h3 id="esa-craft-title">Gandire umana.<br /><span>Dezvoltare custom.</span></h3></HeadingReveal.default>
        </div>
        <div className="esa-craft-copy">
          <p>Fiecare website este dezvoltat custom, in jurul afacerii tale. Structura, designul si functionalitatile sunt lucrate individual, cu decizii asumate de oamenii implicati in proiect.</p>
          <p>Folosim AI ca tehnologie si instrument de lucru, nu ca substitut pentru gandire, creativitate sau responsabilitate. Nu livram un site generat automat si publicat ca atare: fiecare rezultat este adaptat, verificat si finisat pentru proiectul tau.</p>
          <p className="esa-craft-signoff">AI ne sprijina. Directia ne apartine.</p>
        </div>
      </aside>
    </section>
  );
}

const questions = [
  ['De unde incepem daca am doar o idee?', 'De la o conversatie despre obiectiv, utilizatori si ceea ce nu functioneaza astazi. Nu ai nevoie de un brief perfect. Punem in ordine cerintele si stabilim impreuna prima etapa.'],
  ['Poti lucra pe un proiect deja inceput?', 'Da. Mai intai verific structura, codul, accesul si integrarile existente. Apoi iti propun ce merita pastrat, reparat sau refacut, inainte sa extindem proiectul.'],
  ['Cat costa si cat dureaza?', 'Depinde de pagini, functionalitati, continut si integrari. Estimarea vine dupa clarificarea cerintelor, cu etape si livrabile concrete. Un landing page si o platforma cu conturi si plati nu au aceeasi complexitate.'],
  ['Ce se intampla dupa lansare?', 'Predarea include explicatii despre utilizare si administrare. Putem stabili separat mentenanta, actualizarile si dezvoltarile urmatoare, in functie de ce are nevoie proiectul.'],
];

export function ESAQuestions() {
  return (
    <section id="before-start" aria-labelledby="esa-questions-title">
      <div className="-mt-[30vh] pointer-events-none relative z-100"><SectionWipe variant="ivory" /></div>
      <div className="esa-content esa-questions">
      <p className="esa-eyebrow">INAINTE SA INCEPEM</p>
      <div className="esa-intro-grid">
        <HeadingReveal.default><h2 className="esa-heading" id="esa-questions-title">Un proiect bun<br />incepe cu <span>claritate.</span></h2></HeadingReveal.default>
        <div className="esa-faq">
          {questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          <Link href="/contact"><AnimatedButton.default className="bg-brand-gold">Hai sa discutam</AnimatedButton.default></Link>
        </div>
      </div>
      <div className="esa-contact-line"><span>ESA Coder Solutions</span><a href="tel:+40755938367">+40 755 938 367</a><a href="https://esa-coder-solutions.com/#cta" target="_blank" rel="noopener noreferrer">Contact ESA ↗</a></div>
      </div>
    </section>
  );
}
