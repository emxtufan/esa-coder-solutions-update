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
            type: "lines",
          })).lines.map((e) => {
            (animation.gsap.set(e, {
              display: "block",
              position: "relative",
              overflow: "hidden",
            }),
              animation.gsap.set(e.children.length > 0 ? e.children : e, {
                opacity: 0,
              }));
            let t = document.createElement("div");
            return (
              (t.style.position = "absolute"),
              (t.style.top = "0"),
              (t.style.left = "0"),
              (t.style.zIndex = "10"),
              (t.style.width = "100%"),
              (t.style.height = "100%"),
              (t.style.background = r),
              (t.style.pointerEvents = "none"),
              (t.style.transformOrigin = "top center"),
              (t.style.transform = "scaleY(0)"),
              e.appendChild(t),
              {
                colorBox: t,
                line: e,
              }
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
          });
          return (
            u.forEach(({ colorBox: e, line: t }, r) => {
              let n = t.childNodes[0];
              (s.to(
                e,
                {
                  scaleY: 1,
                  duration: 0.4,
                  ease: "power2.inOut",
                },
                0.3 * r,
              ),
                s.to(
                  n,
                  {
                    opacity: 1,
                    duration: 0.01,
                  },
                  0.3 * r + 0.4,
                ),
                s.to(
                  e,
                  {
                    scaleY: 0,
                    transformOrigin: "bottom center",
                    duration: 0.4,
                    ease: "power2.inOut",
                  },
                  0.3 * r + 0.4,
                ));
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
      <div ref={l} className={`reveal-text ${i}`}>
        <div ref={c}>{e}</div>
      </div>
    )
  );
};
