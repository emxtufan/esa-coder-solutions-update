// Recovered from 9e48e928d7bd48d8.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as routing from "../routing/Router.jsx";
import * as loadingStore from "../state/loadingStore.js";
const animation = getVendor(89970);
export default () => {
  let e = (0, routing.usePathname)(),
    l = (0, React.useRef)(null),
    o = (0, React.useRef)(null),
    i = (0, React.useRef)(null),
    u = (0, React.useRef)(null),
    c = (0, React.useRef)(null),
    d = (0, React.useRef)(null),
    f = (0, React.useRef)([]),
    m = (0, loadingStore.useLoadingStore)((e) => e.isModelLoaded),
    h = (0, loadingStore.useLoadingStore)((e) => e.isHDRILoaded),
    [p, g] = (0, React.useState)(!0),
    [w, v] = (0, React.useState)(!1),
    [x, y] = (0, React.useState)(0),
    b = (0, React.useRef)(null),
    E = (0, React.useRef)(!1);
  return e?.startsWith("/controller")
    ? null
    : ((0, React.useEffect)(
        () =>
          E.current
            ? void 0
            : ((E.current = !0),
              (b.current = animation.default.to(
                {
                  value: 0,
                },
                {
                  value: 90,
                  duration: 2.5,
                  ease: "power1.inOut",
                  onUpdate: function () {
                    y(Math.round(this.targets()[0].value));
                  },
                },
              )),
              (() => {
                if (m && h) return v(!0);
                let e = setTimeout(() => {
                  v(!0);
                }, 3e3);
                return () => clearTimeout(e);
              })(),
              () => {
                b.current && b.current.kill();
              }),
        [],
      ),
      (0, React.useEffect)(() => {
        m && h && v(!0);
      }, [m, h]),
      (0, React.useEffect)(() => {
        w &&
          (b.current && b.current.kill(),
          animation.default.to(
            {
              value: x,
            },
            {
              value: 100,
              duration: 0.5,
              ease: "power2.out",
              onUpdate: function () {
                let e = Math.round(this.targets()[0].value);
                y((t) => Math.max(t, e));
              },
            },
          ));
      }, [w]),
      (0, React.useEffect)(() => {
        if (w && 100 === x) {
          let e = setTimeout(() => {
            let e = animation.default.timeline();
            if (d.current) {
              let t = d.current.querySelectorAll(".animate-text"),
                r = u.current;
              (t.length > 0 &&
                e.to(t, {
                  yPercent: -100,
                  opacity: 0,
                  duration: 0.5,
                  stagger: 0.05,
                  ease: "power3.inOut",
                }),
                r &&
                  e.to(
                    r,
                    {
                      yPercent: -100,
                      opacity: 0,
                      duration: 0.6,
                      ease: "power3.inOut",
                    },
                    "-=0.4",
                  ),
                i.current &&
                  e.to(
                    i.current,
                    {
                      scaleX: 0,
                      opacity: 0,
                      duration: 0.4,
                      ease: "power3.inOut",
                    },
                    "-=0.5",
                  ));
              let n = f.current.filter((e) => e);
              n.length > 0 &&
                e.to(
                  n,
                  {
                    scaleY: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power3.inOut",
                  },
                  "-=0.4",
                );
            }
            if (c.current) {
              let t = c.current.querySelectorAll(".box");
              t.length > 0 &&
                e.to(
                  t,
                  {
                    scaleY: 0,
                    duration: 0.6,
                    stagger: {
                      from: "edges",
                      amount: 0.15,
                    },
                    ease: "power3.inOut",
                    onComplete: () => {
                      (g(!1),
                        setTimeout(() => {
                          l.current && (l.current.style.display = "none");
                        }, 500));
                    },
                  },
                  "-=0.1",
                );
            }
          }, 300);
          return () => clearTimeout(e);
        }
      }, [w, x]),
      (
        <div
          ref={l}
          className={`esa-viewport-overlay esa-preloader z-99999 flex items-center justify-center transition-opacity duration-500 ${p ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div ref={c} className="absolute inset-0 flex">
            {[...Array(7)].map((e, r) => (
              <div className="box flex-1 bg-brand-gold origin-top" key={r} />
            ))}
          </div>
          <div
            ref={d}
            className="esa-preloader-content relative z-10 w-full h-full flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="overflow-hidden">
                <h1 className="animate-text text-[8vw] md:text-[4vw] font-display font-semibold text-black leading-none">
                  {"INCARCARE"}
                </h1>
              </div>
              <div className="text-right overflow-hidden">
                <p className="animate-text text-[3vw] md:text-[1vw] font-sans text-black/60 uppercase tracking-wider">
                  {"Un moment"}
                </p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative overflow-hidden">
                <span
                  ref={u}
                  className="text-[35vw] md:text-[25vw] font-display font-semibold text-black leading-none inline-block"
                >
                  {x.toString().padStart(2, "0")}
                </span>
                <span className="animate-text absolute top-[2vw] right-[-8vw] md:right-[-5vw] text-[8vw] md:text-[4vw] font-display text-black">
                  {"%"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[2vh]">
              <div
                ref={i}
                className="w-full h-[2px] bg-black/20 overflow-hidden origin-left"
              >
                <div
                  ref={o}
                  className="h-full bg-black transition-all duration-100 ease-out origin-left"
                  style={{
                    width: `${x}%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-end">
                <div className="overflow-hidden">
                  <p className="animate-text text-[3vw] md:text-[1vw] font-sans text-black/60 uppercase tracking-wider">
                    {"Pregatim experienta"}
                  </p>
                </div>
                <div className="text-right overflow-hidden">
                  <p className="animate-text text-[4vw] md:text-[1.5vw] font-display text-black">
                    {w ? "GATA" : "INCARCAM RESURSELE"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
};
