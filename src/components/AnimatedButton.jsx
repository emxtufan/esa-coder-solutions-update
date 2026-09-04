// Recovered from ff7a83a176508cf6.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
const animation = getVendor(89970);
export default ({
  children: e,
  className: o = "bg-brand-gold text-black",
  onClick: s,
  ...l
}) => {
  let n = (0, React.useRef)(null),
    c = (0, React.useRef)(null),
    i = (0, React.useRef)(null),
    d = (0, React.useRef)([]),
    u = (0, React.useRef)(null);
  return (
    (0, React.useEffect)(() => {
      let e = n.current;
      if (e)
        return (
          (u.current = animation.default.matchMedia()),
          u.current.add("(prefers-reduced-motion: no-preference)", () => {
            d.current = [];
            for (let t = 0; t < 20; t++) {
              let t = document.createElement("div");
              ((t.className =
                "absolute w-1 h-1 md:w-2 md:h-2 bg-black rounded-full pointer-events-none z-10"),
                (t.style.left = "50%"),
                (t.style.top = "50%"),
                (t.style.opacity = "0"),
                (t.style.transform = "translate(-50%, -50%)"),
                e.appendChild(t),
                d.current.push(t));
            }
            return () => {
              (d.current.forEach((e) => {
                e.parentNode && e.parentNode.removeChild(e);
              }),
                (d.current = []));
            };
          }),
          () => {
            u.current && u.current.revert();
          }
        );
    }, []),
    (
      <button
        ref={n}
        className={` text-[4vw] rounded cursor-pointer md:text-[1.5vw] tracking-wide text-black font-semibold font-display uppercase px-3 py-1.5 md:px-4 md:py-2 relative ${o}`}
        style={{
          overflow: "visible",
        }}
        onMouseEnter={() => {
          let e = animation.default.matchMedia();
          (e.add("(prefers-reduced-motion: reduce)", () => {
            animation.default.to(n.current, {
              opacity: 0.8,
              duration: 0.2,
              ease: "power2.out",
            });
          }),
            e.add("(prefers-reduced-motion: no-preference)", () => {
              (animation.default.to(n.current, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
              }),
                animation.default.to(c.current, {
                  rotationX: 90,
                  y: "-100%",
                  duration: 0.4,
                  ease: "power2.out",
                  transformPerspective: 1e3,
                }),
                animation.default.fromTo(
                  i.current,
                  {
                    rotationX: -90,
                  },
                  {
                    rotationX: 0,
                    y: "0%",
                    duration: 0.4,
                    ease: "power2.out",
                    transformPerspective: 1e3,
                  },
                ),
                d.current.forEach((e, t) => {
                  let r = (t / d.current.length) * Math.PI * 2,
                    o = 80 + 40 * Math.random(),
                    s = Math.cos(r) * o,
                    l = Math.sin(r) * o;
                  (animation.default.killTweensOf(e),
                    animation.default
                      .timeline()
                      .fromTo(
                        e,
                        {
                          x: 0,
                          y: 0,
                          opacity: 0,
                          scale: 0.5,
                        },
                        {
                          x: s,
                          y: l,
                          opacity: 0.8,
                          scale: 1.5,
                          duration: 0.6 + 0.3 * Math.random(),
                          ease: "power2.out",
                        },
                      )
                      .to(e, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.3,
                        ease: "power2.in",
                      }));
                }));
            }));
        }}
        onMouseLeave={() => {
          let e = animation.default.matchMedia();
          (e.add("(prefers-reduced-motion: reduce)", () => {
            animation.default.to(n.current, {
              opacity: 1,
              duration: 0.2,
              ease: "power2.out",
            });
          }),
            e.add("(prefers-reduced-motion: no-preference)", () => {
              (animation.default.to(n.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              }),
                animation.default.to(c.current, {
                  rotationX: 0,
                  y: "0%",
                  duration: 0.4,
                  ease: "power2.out",
                }),
                animation.default.to(i.current, {
                  rotationX: 90,
                  y: "100%",
                  duration: 0.4,
                  ease: "power2.out",
                }),
                d.current.forEach((e) => {
                  (animation.default.killTweensOf(e),
                    animation.default.set(e, {
                      opacity: 0,
                      x: 0,
                      y: 0,
                      scale: 0.5,
                    }));
                }));
            }));
        }}
        onMouseDown={() => {
          let e = animation.default.matchMedia();
          (e.add("(prefers-reduced-motion: reduce)", () => {
            animation.default.to(n.current, {
              opacity: 0.6,
              duration: 0.1,
              ease: "power2.out",
            });
          }),
            e.add("(prefers-reduced-motion: no-preference)", () => {
              animation.default.to(n.current, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.out",
              });
            }));
        }}
        onMouseUp={() => {
          let e = animation.default.matchMedia();
          (e.add("(prefers-reduced-motion: reduce)", () => {
            animation.default.to(n.current, {
              opacity: 0.8,
              duration: 0.1,
              ease: "power2.out",
            });
          }),
            e.add("(prefers-reduced-motion: no-preference)", () => {
              animation.default.to(n.current, {
                scale: 1.05,
                duration: 0.1,
                ease: "power2.out",
              });
            }));
        }}
        onClick={s}
        {...l}
      >
        <span
          className="relative overflow-clip inline-block"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <span
            ref={c}
            className="inline-block"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {e}
          </span>
          <span
            ref={i}
            className="inline-block absolute top-0 left-0 translate-y-full"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {e}
          </span>
        </span>
      </button>
    )
  );
};
