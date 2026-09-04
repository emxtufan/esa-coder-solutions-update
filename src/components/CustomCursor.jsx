// Recovered from 042965c7d611aeea.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
const dependency37902 = getVendor(37902);
import * as React from "react";
const animation = getVendor(89970);
export default () => {
  let e = (0, React.useRef)(null),
    i = (0, React.useRef)(null),
    s = (0, React.useRef)({
      x: 0,
      y: 0,
    }),
    u = (0, React.useRef)(null),
    [a, l] = (0, React.useState)(!1),
    [c, f] = (0, React.useState)(!1),
    [d, h] = (0, React.useState)(!0);
  if (
    ((0, React.useEffect)(() => {
      let e = () => {
        h(window.innerWidth < 768 || "ontouchstart" in window);
      };
      return (
        e(),
        window.addEventListener("resize", e),
        () => window.removeEventListener("resize", e)
      );
    }, []),
    (0, React.useEffect)(() => {
      if (d) return;
      let t = e.current,
        r = i.current;
      if (!t || !r) return;
      let n = (e) => {
          ((s.current.x = e.clientX), (s.current.y = e.clientY));
        },
        a = (e) => {
          (e.target.closest(".processcard") && l(!0),
            e.target.closest(".ourwork") && f(!0));
        },
        c = (e) => {
          (e.target.closest(".processcard") && l(!1),
            e.target.closest(".ourwork") && f(!1));
        },
        h = () => {
          let e, n;
          ((e = t.offsetWidth / 2),
            (n = t.offsetHeight / 2),
            animation.default.to(t, {
              x: s.current.x - e,
              y: s.current.y - n,
              duration: 0.4,
              ease: "power2.out",
            }),
            animation.default.to(r, {
              x: s.current.x + 15,
              y: s.current.y - 10,
              duration: 0.4,
              ease: "power2.out",
            }),
            (u.current = requestAnimationFrame(h)));
        };
      return (
        document.addEventListener("mousemove", n, !0),
        document.addEventListener("pointermove", n, !0),
        document.addEventListener("mouseover", a, !0),
        document.addEventListener("mouseout", c, !0),
        (u.current = requestAnimationFrame(h)),
        () => {
          (document.removeEventListener("mousemove", n, !0),
            document.removeEventListener("pointermove", n, !0),
            document.removeEventListener("mouseover", a, !0),
            document.removeEventListener("mouseout", c, !0),
            u.current && cancelAnimationFrame(u.current));
        }
      );
    }, [d]),
    d)
  )
    return null;
  let p = a || c;
  return (
    <jsxRuntime.Fragment>
      <dependency37902.default id="3cf96aecc6577631">
        {
          "@keyframes blink{0%,50%{opacity:1}51%,to{opacity:0}}.cursor-text-blink.jsx-3cf96aecc6577631{animation:1s infinite blink}"
        }
      </dependency37902.default>
      <div
        ref={e}
        style={{
          width: "10px",
          height: "10px",
          left: 0,
          top: 0,
          borderRadius: "5px",
        }}
        className="jsx-3cf96aecc6577631 fixed pointer-events-none z-9999 rounded-full bg-white mix-blend-difference max-md:hidden"
      />
      <div
        ref={i}
        style={{
          left: 0,
          top: 0,
          opacity: +!!p,
          transition: p ? "none" : "opacity 0.2s ease-in-out",
        }}
        className={`jsx-3cf96aecc6577631 fixed pointer-events-none z-9999 text-white mix-blend-difference font-semibold text-sm font-sans max-md:hidden ${p ? "cursor-text-blink" : ""}`}
      >
        {a ? "DRAG" : c ? "LIVE SITE" : ""}
      </div>
    </jsxRuntime.Fragment>
  );
};
