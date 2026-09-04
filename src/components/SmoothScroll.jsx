// Recovered from 9e48e928d7bd48d8.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
const animation = getVendor(89970);
const scrollPlugin = getVendor(33809);
import * as React from "react";
const dependency92599 = getVendor(92599);
var l = (0, React.createContext)(null),
  o = new (class {
    constructor(e) {
      this.state = e;
    }
    listeners = [];
    set(e) {
      for (let t of ((this.state = e), this.listeners)) t(this.state);
    }
    subscribe(e) {
      return (
        (this.listeners = [...this.listeners, e]),
        () => {
          this.listeners = this.listeners.filter((t) => t !== e);
        }
      );
    }
    get() {
      return this.state;
    }
  })(null),
  OriginalComponentI = (0, React.forwardRef)(
    (
      { children: e, root: r = !1, options: n = {}, autoRaf: i = !0, ...u },
      c,
    ) => {
      let d = (0, React.useRef)(null),
        f = (0, React.useRef)(null),
        [m, h] = (0, React.useState)(void 0);
      ((0, React.useImperativeHandle)(
        c,
        () => ({
          wrapper: d.current,
          content: f.current,
          lenis: m,
        }),
        [m],
      ),
        (0, React.useEffect)(() => {
          let e = new dependency92599.default({
            ...n,
            ...(d.current &&
              f.current && {
                wrapper: d.current,
                content: f.current,
              }),
            autoRaf: n?.autoRaf ?? i,
          });
          return (
            h(e),
            () => {
              (e.destroy(), h(void 0));
            }
          );
        }, [
          r,
          JSON.stringify({
            ...n,
            wrapper: null,
            content: null,
          }),
        ]));
      let p = (0, React.useRef)([]),
        g = (0, React.useCallback)((e, t) => {
          (p.current.push({
            callback: e,
            priority: t,
          }),
            p.current.sort((e, t) => e.priority - t.priority));
        }, []),
        w = (0, React.useCallback)((e) => {
          p.current = p.current.filter((t) => t.callback !== e);
        }, []);
      return ((0, React.useEffect)(() => {
        if (r && m)
          return (
            o.set({
              lenis: m,
              addCallback: g,
              removeCallback: w,
            }),
            () => o.set(null)
          );
      }, [r, m, g, w]),
      (0, React.useEffect)(() => {
        if (!m) return;
        let e = (e) => {
          for (let t = 0; t < p.current.length; t++) p.current[t]?.callback(e);
        };
        return (
          m.on("scroll", e),
          () => {
            m.off("scroll", e);
          }
        );
      }, [m]),
      e) ? (
        <l.Provider
          value={{
            lenis: m,
            addCallback: g,
            removeCallback: w,
          }}
        >
          {r && "asChild" !== r ? (
            e
          ) : (
            <div ref={d} {...u}>
              <div ref={f}>{e}</div>
            </div>
          )}
        </l.Provider>
      ) : null;
    },
  );
export default () => {
  let e = (0, React.useRef)(null);
  return (
    (0, React.useEffect)(() => {
      function t(t) {
        e.current?.lenis?.raf(1e3 * t);
      }
      return (
        animation.default.ticker.add(t),
        scrollPlugin.ScrollTrigger.refresh(),
        () => animation.default.ticker.remove(t)
      );
    }, []),
    (
      <OriginalComponentI
        root={!0}
        options={{
          autoRaf: !1,
          duration: 1.2,
          touchMultiplier: 2,
          smoothTouch: !0,
        }}
        ref={e}
      />
    )
  );
};
