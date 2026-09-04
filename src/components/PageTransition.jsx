// Recovered from 9e48e928d7bd48d8.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as routing from "../routing/Router.jsx";
const animation = getVendor(89970);
export default ({ children: e }) => {
  let s = (0, routing.useRouter)(),
    l = (0, routing.usePathname)(),
    o = (0, React.useRef)(null),
    i = (0, React.useRef)([]),
    u = (0, React.useRef)(!1),
    c = (0, React.useCallback)((e) => {
      u.current || ((u.current = !0), m(e));
    }, []),
    d = (0, React.useCallback)(
      (e) => {
        if (u.current) return void e.preventDefault();
        if (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          0 !== e.button ||
          "_blank" === e.currentTarget.target
        )
          return;
        let t = new URL(e.currentTarget.href).pathname;
        t === l || t === window.location.pathname
          ? e.preventDefault()
          : (e.preventDefault(), c(t));
      },
      [l, c],
    ),
    f = (0, React.useCallback)(() => {
      (i.current.forEach((e) => {
        e && (e.style.transformOrigin = "top");
      }),
        animation.gsap.to(i.current, {
          scaleY: 0,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: {
            from: "edges",
            amount: 0.1,
          },
          onComplete: () => {
            ((u.current = !1),
              o.current && (o.current.style.pointerEvents = "none"));
          },
        }));
    }, []);
  ((0, React.useEffect)(() => {
    let e = (e) => {
      let t = e.detail?.url;
      t && t !== l && t !== window.location.pathname && c(t);
    };
    return (
      window.addEventListener("navigate-with-transition", e),
      () => {
        window.removeEventListener("navigate-with-transition", e);
      }
    );
  }, [l, c]),
    (0, React.useEffect)(() => {
      ((u.current = !1),
        i.current.forEach((e) => {
          e && (e.style.transformOrigin = "bottom");
        }),
        animation.gsap.set(i.current, {
          scaleY: 1,
        }));
      let e = setTimeout(() => {
          f();
        }, 100),
        t = () => {
          let e = document.querySelectorAll('a[href^="/"]');
          return (
            e.forEach((e) => {
              e.addEventListener("click", d);
            }),
            e
          );
        },
        r = t(),
        n = new MutationObserver(() => {
          t();
        });
      return (
        n.observe(document.body, {
          childList: !0,
          subtree: !0,
        }),
        () => {
          (clearTimeout(e),
            r.forEach((e) => {
              e.removeEventListener("click", d);
            }),
            n.disconnect());
        }
      );
    }, [l, d, f]));
  let m = (e) => {
    if (e === window.location.pathname) {
      u.current = !1;
      return;
    }
    (o.current && (o.current.style.pointerEvents = "auto"),
      i.current.forEach((e) => {
        e && (e.style.transformOrigin = "bottom");
      }),
      animation.gsap.fromTo(
        i.current,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: {
            from: "center",
            amount: 0.1,
          },
          onComplete: () => {
            s.push(e);
          },
        },
      ));
  };
  return (
    <jsxRuntime.Fragment>
      <div
        ref={o}
        className="esa-viewport-overlay flex pointer-events-auto"
        style={{
          zIndex: 9999,
        }}
      >
        <div
          ref={(e) => (i.current[0] = e)}
          className="flex-1 bg-brand-gold"
          style={{
            transformOrigin: "bottom",
          }}
        />
        <div
          ref={(e) => (i.current[1] = e)}
          className="flex-1 bg-brand-gold"
          style={{
            transformOrigin: "bottom",
          }}
        />
        <div
          ref={(e) => (i.current[2] = e)}
          className="flex-1 bg-brand-gold"
          style={{
            transformOrigin: "bottom",
          }}
        />
        <div
          ref={(e) => (i.current[3] = e)}
          className="flex-1 bg-brand-gold"
          style={{
            transformOrigin: "bottom",
          }}
        />
        <div
          ref={(e) => (i.current[4] = e)}
          className="flex-1 bg-brand-gold"
          style={{
            transformOrigin: "bottom",
          }}
        />
        <div
          ref={(e) => (i.current[5] = e)}
          className="flex-1 bg-brand-gold"
          style={{
            transformOrigin: "bottom",
          }}
        />
        <div
          ref={(e) => (i.current[6] = e)}
          className="flex-1 bg-brand-gold"
          style={{
            transformOrigin: "bottom",
          }}
        />
      </div>
      {e}
    </jsxRuntime.Fragment>
  );
};
