// Recovered from 817b6ec40b4f6783.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import { brand, brandRgba } from "../theme.js";
let n = [
  [
    [3, 3],
    [2, 3],
    [3, 2],
    [3, 4],
    [4, 3],
    [1, 3],
    [2, 2],
    [2, 4],
    [3, 1],
    [3, 5],
    [4, 2],
    [4, 4],
    [5, 3],
    [0, 3],
    [1, 2],
    [1, 4],
    [5, 2],
    [5, 4],
    [6, 3],
  ],
  [
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [4, 2],
    [4, 3],
    [4, 4],
    [5, 2],
    [5, 3],
    [1, 3],
    [1, 4],
  ],
  [
    [1, 2],
    [1, 3],
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [4, 2],
    [4, 3],
    [5, 2],
    [5, 3],
    [5, 4],
    [6, 3],
    [6, 4],
  ],
  [
    [1, 4],
    [1, 5],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 2],
    [3, 3],
    [3, 4],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [5, 2],
    [5, 3],
    [6, 2],
  ],
  [
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [2, 3],
    [2, 4],
    [4, 3],
    [4, 4],
    [1, 4],
    [1, 5],
    [5, 4],
    [5, 5],
    [0, 5],
    [6, 5],
  ],
  [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 1],
    [2, 5],
    [3, 1],
    [3, 5],
    [4, 1],
    [4, 5],
    [5, 2],
    [5, 3],
    [5, 4],
  ],
  [
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 3],
    [6, 3],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 4],
    [3, 5],
    [3, 6],
  ],
  [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 3],
    [3, 4],
    [4, 3],
  ],
  [
    [1, 1],
    [1, 2],
    [2, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4],
    [4, 5],
    [5, 3],
    [5, 4],
    [6, 2],
    [6, 3],
  ],
  [
    [1, 2],
    [1, 4],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5],
    [4, 2],
    [4, 3],
    [4, 4],
    [5, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
    [2, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 4],
    [4, 5],
    [5, 5],
    [5, 6],
  ],
  [
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 2],
    [3, 3],
    [3, 4],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
];
export default ({ variant: e = 3 }) => {
  let i = (0, React.useRef)(null),
    o = (0, React.useRef)(null),
    a = (0, React.useRef)(-3),
    s = (0, React.useRef)(null),
    l = (0, React.useRef)(new Map()),
    c = (0, React.useRef)(0),
    u = 20 * Math.sqrt(3),
    f = Math.floor(3.5),
    d = Math.floor(3.5),
    [p] = (0, React.useState)(() =>
      e >= 0 && e < n.length ? e : Math.floor(Math.random() * n.length),
    ),
    {
      hexagons: h,
      hexDistances: g,
      maxDistance: v,
      canvasWidth: m,
      canvasHeight: y,
    } = (0, React.useMemo)(() => {
      let e = [],
        t = new Set(),
        r = new Map();
      for (let [e, r] of n[p])
        e >= 0 && e < 7 && r >= 0 && r < 7 && t.add(`${e}-${r}`);
      for (let e of t) {
        let [t, n] = e.split("-").map(Number),
          i = Math.abs(t - f) + Math.abs(n - d);
        r.set(e, i);
      }
      for (let n = 0; n < 7; n++)
        for (let i = 0; i < 7; i++) {
          let o = `${n}-${i}`;
          if (!t.has(o)) continue;
          let a = n % 2 == 1 ? u / 2 : 0,
            s = i * u + a + u / 2 + 5,
            l = 30 * n + 20 + 5,
            c = [];
          for (let e = 0; e < 6; e++) {
            let t = (Math.PI / 3) * e - Math.PI / 2;
            c.push({
              x: s + 20 * Math.cos(t),
              y: l + 20 * Math.sin(t),
            });
          }
          e.push({
            key: o,
            x: s,
            y: l,
            vertices: c,
            distance: r.get(o),
          });
        }
      let i = Math.max(...Array.from(r.values()));
      return {
        hexagons: e,
        hexDistances: r,
        maxDistance: i,
        canvasWidth: 7 * u + u / 2 + 10,
        canvasHeight: 240,
      };
    }, [p]),
    x = (0, React.useCallback)(
      (e, t, r) => {
        let n = Math.abs(e - r.x),
          i = Math.abs(t - r.y);
        return !(n > 20) && !(i > 20) && n + 0.5 * i < 20;
      },
      [20],
    ),
    b = (e) => 1 - Math.pow(1 - e, 3),
    w = (e) => -(Math.cos(Math.PI * e) - 1) / 2,
    T = (0, React.useCallback)(
      (e, t, r, n, i) => {
        e.save();
        let { fillAmount: o, borderProgress: a, glowIntensity: s } = r;
        if (s > 0 || n) {
          let r = n ? 0.8 : s,
            i = e.createRadialGradient(t.x, t.y, 0, t.x, t.y, 36);
          (i.addColorStop(0, brandRgba(brand.gold, 0.5 * r)),
            i.addColorStop(0.4, brandRgba(brand.gold, 0.2 * r)),
            i.addColorStop(1, brandRgba(brand.gold, 0)),
            e.beginPath(),
            e.arc(t.x, t.y, 36, 0, 2 * Math.PI),
            (e.fillStyle = i),
            e.fill());
        }
        (e.beginPath(), e.moveTo(t.vertices[0].x, t.vertices[0].y));
        for (let r = 1; r < 6; r++) e.lineTo(t.vertices[r].x, t.vertices[r].y);
        if (
          (e.closePath(),
          (e.strokeStyle = brandRgba(brand.gold, 0.25)),
          (e.lineWidth = 1.5),
          e.stroke(),
          o > 0 || n)
        ) {
          (e.beginPath(), e.moveTo(t.vertices[0].x, t.vertices[0].y));
          for (let r = 1; r < 6; r++)
            e.lineTo(t.vertices[r].x, t.vertices[r].y);
          e.closePath();
          let r = n ? Math.max(o, 0.7) : o,
            i = e.createLinearGradient(t.x - 20, t.y - 20, t.x + 20, t.y + 20);
          (i.addColorStop(0, brandRgba(brand.gold, 0.9 * r)),
            i.addColorStop(0.5, brandRgba(brand.light, r)),
            i.addColorStop(1, brandRgba(brand.gold, 0.7 * r)),
            (e.fillStyle = i),
            e.fill());
        }
        if (a > 0) {
          (e.beginPath(), (e.lineCap = "round"), (e.lineJoin = "round"));
          let r = 6 * a,
            o = !1;
          for (let n = 0; n < 6 && r > 0; n++) {
            let i = t.vertices[n],
              a = t.vertices[(n + 1) % 6];
            if (r >= 1)
              (o || (e.moveTo(i.x, i.y), (o = !0)),
                e.lineTo(a.x, a.y),
                (r -= 1));
            else {
              let t = r,
                n = i.x + (a.x - i.x) * t,
                s = i.y + (a.y - i.y) * t;
              (o || (e.moveTo(i.x, i.y), (o = !0)), e.lineTo(n, s), (r = 0));
            }
          }
          let s = e.createLinearGradient(t.x - 20, t.y, t.x + 20, t.y),
            l = 0.7 + 0.3 * Math.sin(5 * i + t.distance);
          (s.addColorStop(0, brandRgba(brand.gold, a * l)),
            s.addColorStop(0.5, brandRgba(brand.light, a)),
            s.addColorStop(1, brandRgba(brand.gold, a * l)),
            (e.strokeStyle = s),
            (e.lineWidth = n ? 3.5 : 3),
            e.stroke());
        }
        if (o > 0.5) {
          e.beginPath();
          for (let r = 0; r < 6; r++) {
            let n = t.x + (t.vertices[r].x - t.x) * 0.65,
              i = t.y + (t.vertices[r].y - t.y) * 0.65;
            0 === r ? e.moveTo(n, i) : e.lineTo(n, i);
          }
          (e.closePath(),
            (e.strokeStyle = `rgba(255, 255, 255, ${0.25 * o})`),
            (e.lineWidth = 0.5),
            e.stroke());
        }
        e.restore();
      },
      [20],
    );
  (0, React.useEffect)(() => {
    let e = i.current;
    if (!e) return;
    let t = e.getContext("2d"),
      r = 0;
    for (let e of h)
      l.current.has(e.key) ||
        l.current.set(e.key, {
          fillAmount: 0,
          targetFill: 0,
          borderProgress: 0,
          targetBorder: 0,
          glowIntensity: 0,
        });
    let n = (i) => {
      if (((o.current = requestAnimationFrame(n)), !(i - r < 16))) {
        for (let [n, o] of ((r = i),
        (c.current = i / 1e3),
        t.clearRect(0, 0, e.width, e.height),
        (a.current += 0.08),
        a.current > v + 2.5 + 3 && (a.current = -3.5),
        g)) {
          let e = l.current.get(n);
          if (!e) continue;
          let t = o - a.current;
          if (
            (t > -2.5 && t < 1.25
              ? (e.targetBorder = w(
                  Math.max(0, Math.min(1, 1.5 * (1 - Math.abs(t) / 2.5))),
                ))
              : t <= -2.5
                ? (e.targetBorder = Math.max(0, e.targetBorder - 0.2))
                : (e.targetBorder = 0),
            t > -2 && t < 0.75)
          ) {
            let r = 1 - Math.abs(t + 0.5) / 2.5;
            ((e.targetFill = b(Math.max(0, Math.min(1, r)))),
              (e.glowIntensity = 0.7 * r));
          } else
            ((e.targetFill = 0),
              (e.glowIntensity = Math.max(0, e.glowIntensity - 0.08)));
          ((e.fillAmount += (e.targetFill - e.fillAmount) * 0.25),
            (e.borderProgress += (e.targetBorder - e.borderProgress) * 0.35),
            e.fillAmount < 0.01 && (e.fillAmount = 0),
            e.borderProgress < 0.01 && (e.borderProgress = 0));
        }
        for (let e of h) {
          let r = l.current.get(e.key) || {
              fillAmount: 0,
              borderProgress: 0,
              glowIntensity: 0,
            },
            n = s.current === e.key;
          T(t, e, r, n, c.current);
        }
      }
    };
    return (
      (o.current = requestAnimationFrame(n)),
      () => {
        o.current && cancelAnimationFrame(o.current);
      }
    );
  }, [h, g, v, T]);
  let C = (0, React.useCallback)(
      (e) => {
        let t = i.current;
        if (!t) return;
        let r = t.getBoundingClientRect(),
          n = t.width / r.width,
          o = t.height / r.height,
          a = (e.clientX - r.left) * n,
          l = (e.clientY - r.top) * o,
          c = null;
        for (let e of h)
          if (x(a, l, e)) {
            c = e.key;
            break;
          }
        ((s.current = c), (t.style.cursor = c ? "pointer" : "default"));
      },
      [h, x],
    ),
    _ = (0, React.useCallback)(() => {
      s.current = null;
    }, []);
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <canvas
        ref={i}
        width={m}
        height={y}
        className="w-full h-full"
        style={{
          objectFit: "contain",
        }}
        onMouseMove={C}
        onMouseLeave={_}
      />
    </div>
  );
};
