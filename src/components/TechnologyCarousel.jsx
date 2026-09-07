import { useLayoutEffect, useRef } from 'react';
import { getVendor } from '../vendor/runtime.js';
import { technologies } from '../assets/technology-icons.js';
import './TechnologyCarousel.css';

const { gsap } = getVendor(89970);
const { ScrollTrigger } = getVendor(83495);
gsap.registerPlugin(ScrollTrigger);

export default function TechnologyCarousel() {
  const root = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const primary = track.current.querySelector('[data-primary]');
    let reduced = media.matches;
    let visible = false;
    let cycle = 0;
    let frame = null;
    let lastTime = 0;
    const offset = { x: 0 };
    const wrapped = () => cycle ? ((offset.x % cycle) + cycle) % cycle : 0;
    const paint = () => {
      track.current.style.transform = reduced ? '' : 'translate3d(' + (-cycle - wrapped()) + 'px,0,0)';
    };
    const canMove = () => visible && !document.hidden && !reduced && cycle > 0;
    const tick = (now) => {
      frame = null;
      if (!canMove()) return;
      offset.x += 38 * Math.min(now - lastTime, 64) / 1000;
      lastTime = now;
      paint();
      frame = requestAnimationFrame(tick);
    };
    const refreshLoop = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      if (canMove()) { lastTime = performance.now(); frame = requestAnimationFrame(tick); }
    };
    const resize = () => {
      const progress = cycle ? offset.x / cycle : 0;
      cycle = primary.getBoundingClientRect().width;
      offset.x = progress * cycle;
      paint();
      refreshLoop();
    };
    const updateMotion = () => {
      reduced = media.matches;
      viewport.current.dataset.motion = reduced ? 'static' : 'running';
      resize();
    };
    updateMotion();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', refreshLoop);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refreshLoop();
    }, { threshold: 0.05 });
    observer.observe(root.current);
    const sizes = new ResizeObserver(resize);
    sizes.observe(primary);
    sizes.observe(viewport.current);

    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(viewport.current, { clipPath: 'inset(0 0 100% 0)' }, {
        clipPath: 'inset(0 0 0% 0)', duration: 0.95, ease: 'power3.inOut',
        scrollTrigger: { trigger: root.current, start: 'top 90%', once: true },
        clearProps: 'clipPath',
      });
    }, root);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      motion.revert();
      observer.disconnect();
      sizes.disconnect();
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', refreshLoop);
    };
  }, []);

  return (
    <div ref={root} id="esa-technologies" className="esa-tech-carousel" role="region" aria-label="Tehnologii folosite in proiecte">
      <div ref={viewport} className="esa-tech-viewport" role="group"
        aria-label="React, Next.js, JavaScript, Express, Python si Shopify">
        <div ref={track} id="esa-tech-track" className="esa-tech-track">
          {[0, 1, 2].map(copy => <div className="esa-tech-group" key={copy} data-primary={copy === 1 ? '' : undefined} aria-hidden={copy !== 1 ? true : undefined}>
            {technologies.map(({ name, paths }) => (
              <div className="esa-tech-item" key={name}>
                <svg className="esa-tech-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">{paths.map((d, i) => <path d={d} key={i} />)}</svg>
                <span className="esa-tech-name">{name}</span>
              </div>
            ))}
          </div>)}
        </div>
      </div>
    </div>
  );
}
