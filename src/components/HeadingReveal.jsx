// Recovered from 817b6ec40b4f6783.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import { brand } from "../theme.js";
const animation = getVendor(89970);
const scrollTrigger = getVendor(83495);
const textPlugin = getVendor(75324);
export default ({
  children: e,
  className: i = "",
  delay: a = 0,
  variant: s = "lime",
}) => {
  let l = (0, React.useRef)(null),
    c = (0, React.useRef)(null);
  return (
    (0, React.useEffect)(() => {
      if (!l.current || !c.current) return;
      let e = l.current,
        t = c.current,
        r = "black" === s ? '#000000' : brand.gold,
        i = null,
        u = [],
        f = animation.gsap.matchMedia();
      return (
        f.add("(prefers-reduced-motion: reduce)", () => {
          animation.gsap.set(e, {
            opacity: 0,
          });
          let t = animation.gsap.timeline({
            scrollTrigger: {
              trigger: e,
              start: "top 80%",
              end: "bottom 30%",
              toggleActions: "play none none none",
            },
            delay: a,
          });
          return (
            t.to(e, {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
            }),
            () => {
              (t.scrollTrigger && t.scrollTrigger.kill(), t.kill());
            }
          );
        }),
        f.add("(prefers-reduced-motion: no-preference)", () => {
          u = (i = new textPlugin.SplitText(t, {
            type: "words",
          })).words.map((e) => {
            animation.gsap.set(e, {
              display: "inline-block",
              position: "relative",
            });
            let t = e.getBoundingClientRect(),
              i = document.createElement("div");
            return (
              (i.style.position = "absolute"),
              (i.style.top = "0"),
              (i.style.left = "50%"),
              (i.style.transform = "translateX(-50%)"),
              (i.style.zIndex = "10"),
              (i.style.width = `${1.1 * t.width}px`),
              (i.style.height = `${0.9 * t.height}px`),
              (i.style.background = r),
              (i.style.borderRadius = ".5vw"),
              (i.style.pointerEvents = "none"),
              e.appendChild(i),
              i
            );
          });
          let s = animation.gsap.timeline({
            scrollTrigger: {
              trigger: e,
              start: "top 80%",
              end: "bottom 30%",
              toggleActions: "play none none none",
            },
            delay: a,
            onComplete: () => {
              u.forEach((e) => {
                e.style.display = "none";
              });
            },
          });
          return (
            s.to(u, {
              y: () => animation.gsap.utils.random(1200, 1600),
              x: () => animation.gsap.utils.random(-150, 150),
              rotation: () => animation.gsap.utils.random(-360, 360),
              opacity: 1,
              duration: 1,
              ease: "power2.in",
              stagger: 0.02,
            }),
            () => {
              (i && i.revert(),
                s.scrollTrigger && s.scrollTrigger.kill(),
                s.kill());
            }
          );
        }),
        () => {
          f.revert();
        }
      );
    }, [a, s]),
    (
      <div ref={l} className={`fall-text ${i}`}>
        <div ref={c}>{e}</div>
      </div>
    )
  );
};
