import { useLayoutEffect, useRef } from 'react';
import { getVendor } from '../vendor/runtime.js';

const animation = getVendor(89970);
const scrollPlugin = getVendor(33809);
animation.default.registerPlugin(scrollPlugin.ScrollTrigger);

// Original seven-column, center-out scroll transition, shared by all sections.
export default function SectionWipe({ variant = 'lime', className = '' }) {
  const root = useRef(null);
  useLayoutEffect(() => {
    const context = animation.default.context(() => {
      const columns = animation.default.utils.toArray('.box');
      animation.default.set(columns, { scaleY: 0 });
      animation.default.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 100%',
          end: 'bottom top',
          scrub: true,
        },
      }).to(columns, {
        scaleY: 1,
        stagger: { from: 'center', amount: 0.1 },
      });
    }, root);
    return () => context.revert();
  }, []);

  const color = variant === 'black' ? 'bg-black' : variant === 'ivory' ? 'bg-brand-ivory' : 'bg-brand-gold';
  return (
    <div ref={root} aria-hidden="true" data-section-wipe={variant} className={`h-[40vh] w-full flex pointer-events-none ${className}`}>
      {Array.from({ length: 7 }, (_, index) => <div key={index} className={`box mt-[1vh] flex-1 ${color} origin-bottom`} />)}
    </div>
  );
}
