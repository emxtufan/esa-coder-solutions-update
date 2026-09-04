// Recovered from 9e48e928d7bd48d8.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
const animation = getVendor(89970);
import * as links from "../routing/Router.jsx";
import * as routing from "../routing/Router.jsx";
const dependency50755 = getVendor(50755);
let t, r, n;
var a,
  s,
  l,
  o,
  i,
  u,
  c,
  d,
  f,
  m,
  w = Math.PI / 180,
  v = function () {
    return (
      u ||
      ("undefined" != typeof window &&
        (u = window.gsap) &&
        u.registerPlugin &&
        u)
    );
  },
  x = function (e) {
    return Math.round(1e4 * e) / 1e4;
  },
  y = function (e) {
    ((u = e || v()),
      c ||
        ((d = u.utils.getUnit),
        (f = u.core.getStyleSaver),
        (m = u.core.reverting || function () {}),
        (c = 1)));
  },
  b = function (e, t, r, n, a) {
    var s = e._gsap,
      l = s.get(e, t);
    ((this.p = t),
      (this.set = s.set(e, t)),
      (this.s = this.val = parseFloat(l)),
      (this.u = d(l) || 0),
      (this.vel = r || 0),
      (this.v = this.vel / a),
      n || 0 === n
        ? ((this.acc = n), (this.a = this.acc / (a * a)))
        : (this.acc = this.a = 0));
  },
  E = {
    version: "3.14.2",
    name: "physics2D",
    register: y,
    init: function (e, t, r) {
      c || y();
      var n = +t.angle || 0,
        a = +t.velocity || 0,
        s = +t.acceleration || 0,
        l = t.xProp || "x",
        o = t.yProp || "y",
        i =
          t.accelerationAngle || 0 === t.accelerationAngle
            ? +t.accelerationAngle
            : n;
      ((this.styles =
        f &&
        f(
          e,
          t.xProp && "x" !== t.xProp ? t.xProp + "," + t.yProp : "transform",
        )),
        (this.target = e),
        (this.tween = r),
        (this.step = 0),
        (this.sps = 30),
        t.gravity && ((s = +t.gravity), (i = 90)),
        (n *= w),
        (i *= w),
        (this.fr = 1 - (+t.friction || 0)),
        this._props.push(l, o),
        (this.xp = new b(e, l, Math.cos(n) * a, Math.cos(i) * s, this.sps)),
        (this.yp = new b(e, o, Math.sin(n) * a, Math.sin(i) * s, this.sps)),
        (this.skipX = this.skipY = 0));
    },
    render: function (e, t) {
      var r,
        n,
        a,
        s,
        l,
        o,
        i = t.xp,
        u = t.yp,
        c = t.tween,
        d = t.target,
        f = t.step,
        h = t.sps,
        p = t.fr,
        g = t.skipX,
        w = t.skipY,
        v = c._from ? c._dur - c._time : c._time;
      if (c._time || !m()) {
        if (1 === p)
          ((a = v * v * 0.5),
            (r = i.s + i.vel * v + i.acc * a),
            (n = u.s + u.vel * v + u.acc * a));
        else {
          for (
            v *= h,
              s = o = (0 | v) - f,
              o < 0 &&
                ((i.v = i.vel / h),
                (u.v = u.vel / h),
                (i.val = i.s),
                (u.val = u.s),
                (t.step = 0),
                (s = o = 0 | v)),
              l = (v % 1) * p;
            o--;

          )
            ((i.v += i.a),
              (u.v += u.a),
              (i.v *= p),
              (u.v *= p),
              (i.val += i.v),
              (u.val += u.v));
          ((r = i.val + i.v * l), (n = u.val + u.v * l), (t.step += s));
        }
        (g || i.set(d, i.p, x(r) + i.u), w || u.set(d, u.p, x(n) + u.u));
      } else t.styles.revert();
    },
    kill: function (e) {
      (this.xp.p === e && (this.skipX = 1),
        this.yp.p === e && (this.skipY = 1));
    },
  };
v() && u.registerPlugin(E);
var C = Object.defineProperty,
  M = Object.getOwnPropertySymbols,
  k = Object.prototype.hasOwnProperty,
  S = Object.prototype.propertyIsEnumerable,
  A = (e, t, r) =>
    t in e
      ? C(e, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: r,
        })
      : (e[t] = r),
  j = (e, t) => {
    for (var r in t || (t = {})) k.call(t, r) && A(e, r, t[r]);
    if (M) for (var r of M(t)) S.call(t, r) && A(e, r, t[r]);
    return e;
  },
  O = (e, t) => {
    var r = {};
    for (var n in e) k.call(e, n) && 0 > t.indexOf(n) && (r[n] = e[n]);
    if (null != e && M)
      for (var n of M(e)) 0 > t.indexOf(n) && S.call(e, n) && (r[n] = e[n]);
    return r;
  };
(((e) => {
  let t = class t {
    constructor(e, r, n, s) {
      if (
        ((this.version = e),
        (this.errorCorrectionLevel = r),
        (this.modules = []),
        (this.isFunction = []),
        e < t.MIN_VERSION || e > t.MAX_VERSION)
      )
        throw RangeError("Version value out of range");
      if (s < -1 || s > 7) throw RangeError("Mask value out of range");
      this.size = 4 * e + 17;
      let l = [];
      for (let e = 0; e < this.size; e++) l.push(!1);
      for (let e = 0; e < this.size; e++)
        (this.modules.push(l.slice()), this.isFunction.push(l.slice()));
      this.drawFunctionPatterns();
      const o = this.addEccAndInterleave(n);
      if ((this.drawCodewords(o), -1 == s)) {
        let e = 1e9;
        for (let t = 0; t < 8; t++) {
          (this.applyMask(t), this.drawFormatBits(t));
          const r = this.getPenaltyScore();
          (r < e && ((s = t), (e = r)), this.applyMask(t));
        }
      }
      (a(0 <= s && s <= 7),
        (this.mask = s),
        this.applyMask(s),
        this.drawFormatBits(s),
        (this.isFunction = []));
    }
    static encodeText(r, n) {
      let a = e.QrSegment.makeSegments(r);
      return t.encodeSegments(a, n);
    }
    static encodeBinary(r, n) {
      let a = e.QrSegment.makeBytes(r);
      return t.encodeSegments([a], n);
    }
    static encodeSegments(e, n, s = 1, o = 40, i = -1, u = !0) {
      let c, d;
      if (
        !(t.MIN_VERSION <= s && s <= o && o <= t.MAX_VERSION) ||
        i < -1 ||
        i > 7
      )
        throw RangeError("Invalid value");
      for (c = s; ; c++) {
        let r = 8 * t.getNumDataCodewords(c, n),
          a = l.getTotalBits(e, c);
        if (a <= r) {
          d = a;
          break;
        }
        if (c >= o) throw RangeError("Data too long");
      }
      for (let e of [t.Ecc.MEDIUM, t.Ecc.QUARTILE, t.Ecc.HIGH])
        u && d <= 8 * t.getNumDataCodewords(c, e) && (n = e);
      let f = [];
      for (let t of e)
        for (let e of (r(t.mode.modeBits, 4, f),
        r(t.numChars, t.mode.numCharCountBits(c), f),
        t.getData()))
          f.push(e);
      a(f.length == d);
      let m = 8 * t.getNumDataCodewords(c, n);
      (a(f.length <= m),
        r(0, Math.min(4, m - f.length), f),
        r(0, (8 - (f.length % 8)) % 8, f),
        a(f.length % 8 == 0));
      for (let e = 236; f.length < m; e ^= 253) r(e, 8, f);
      let h = [];
      for (; 8 * h.length < f.length; ) h.push(0);
      return (
        f.forEach((e, t) => (h[t >>> 3] |= e << (7 - (7 & t)))),
        new t(c, n, h, i)
      );
    }
    getModule(e, t) {
      return (
        0 <= e && e < this.size && 0 <= t && t < this.size && this.modules[t][e]
      );
    }
    getModules() {
      return this.modules;
    }
    drawFunctionPatterns() {
      for (let e = 0; e < this.size; e++)
        (this.setFunctionModule(6, e, e % 2 == 0),
          this.setFunctionModule(e, 6, e % 2 == 0));
      (this.drawFinderPattern(3, 3),
        this.drawFinderPattern(this.size - 4, 3),
        this.drawFinderPattern(3, this.size - 4));
      let e = this.getAlignmentPatternPositions(),
        t = e.length;
      for (let r = 0; r < t; r++)
        for (let n = 0; n < t; n++)
          (0 != r || 0 != n) &&
            (0 != r || n != t - 1) &&
            (r != t - 1 || 0 != n) &&
            this.drawAlignmentPattern(e[r], e[n]);
      (this.drawFormatBits(0), this.drawVersion());
    }
    drawFormatBits(e) {
      let t = (this.errorCorrectionLevel.formatBits << 3) | e,
        r = t;
      for (let e = 0; e < 10; e++) r = (r << 1) ^ ((r >>> 9) * 1335);
      let s = ((t << 10) | r) ^ 21522;
      a(s >>> 15 == 0);
      for (let e = 0; e <= 5; e++) this.setFunctionModule(8, e, n(s, e));
      (this.setFunctionModule(8, 7, n(s, 6)),
        this.setFunctionModule(8, 8, n(s, 7)),
        this.setFunctionModule(7, 8, n(s, 8)));
      for (let e = 9; e < 15; e++) this.setFunctionModule(14 - e, 8, n(s, e));
      for (let e = 0; e < 8; e++)
        this.setFunctionModule(this.size - 1 - e, 8, n(s, e));
      for (let e = 8; e < 15; e++)
        this.setFunctionModule(8, this.size - 15 + e, n(s, e));
      this.setFunctionModule(8, this.size - 8, !0);
    }
    drawVersion() {
      if (this.version < 7) return;
      let e = this.version;
      for (let t = 0; t < 12; t++) e = (e << 1) ^ ((e >>> 11) * 7973);
      let t = (this.version << 12) | e;
      a(t >>> 18 == 0);
      for (let e = 0; e < 18; e++) {
        let r = n(t, e),
          a = this.size - 11 + (e % 3),
          s = Math.floor(e / 3);
        (this.setFunctionModule(a, s, r), this.setFunctionModule(s, a, r));
      }
    }
    drawFinderPattern(e, t) {
      for (let r = -4; r <= 4; r++)
        for (let n = -4; n <= 4; n++) {
          let a = Math.max(Math.abs(n), Math.abs(r)),
            s = e + n,
            l = t + r;
          0 <= s &&
            s < this.size &&
            0 <= l &&
            l < this.size &&
            this.setFunctionModule(s, l, 2 != a && 4 != a);
        }
    }
    drawAlignmentPattern(e, t) {
      for (let r = -2; r <= 2; r++)
        for (let n = -2; n <= 2; n++)
          this.setFunctionModule(
            e + n,
            t + r,
            1 != Math.max(Math.abs(n), Math.abs(r)),
          );
    }
    setFunctionModule(e, t, r) {
      ((this.modules[t][e] = r), (this.isFunction[t][e] = !0));
    }
    addEccAndInterleave(e) {
      let r = this.version,
        n = this.errorCorrectionLevel;
      if (e.length != t.getNumDataCodewords(r, n))
        throw RangeError("Invalid argument");
      let s = t.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][r],
        l = t.ECC_CODEWORDS_PER_BLOCK[n.ordinal][r],
        o = Math.floor(t.getNumRawDataModules(r) / 8),
        i = s - (o % s),
        u = Math.floor(o / s),
        c = [],
        d = t.reedSolomonComputeDivisor(l);
      for (let r = 0, n = 0; r < s; r++) {
        let a = e.slice(n, n + u - l + (r < i ? 0 : 1));
        n += a.length;
        let s = t.reedSolomonComputeRemainder(a, d);
        (r < i && a.push(0), c.push(a.concat(s)));
      }
      let f = [];
      for (let e = 0; e < c[0].length; e++)
        c.forEach((t, r) => {
          (e != u - l || r >= i) && f.push(t[e]);
        });
      return (a(f.length == o), f);
    }
    drawCodewords(e) {
      if (e.length != Math.floor(t.getNumRawDataModules(this.version) / 8))
        throw RangeError("Invalid argument");
      let r = 0;
      for (let t = this.size - 1; t >= 1; t -= 2) {
        6 == t && (t = 5);
        for (let a = 0; a < this.size; a++)
          for (let s = 0; s < 2; s++) {
            let l = t - s,
              o = ((t + 1) & 2) == 0 ? this.size - 1 - a : a;
            !this.isFunction[o][l] &&
              r < 8 * e.length &&
              ((this.modules[o][l] = n(e[r >>> 3], 7 - (7 & r))), r++);
          }
      }
      a(r == 8 * e.length);
    }
    applyMask(e) {
      if (e < 0 || e > 7) throw RangeError("Mask value out of range");
      for (let t = 0; t < this.size; t++)
        for (let r = 0; r < this.size; r++) {
          let n;
          switch (e) {
            case 0:
              n = (r + t) % 2 == 0;
              break;
            case 1:
              n = t % 2 == 0;
              break;
            case 2:
              n = r % 3 == 0;
              break;
            case 3:
              n = (r + t) % 3 == 0;
              break;
            case 4:
              n = (Math.floor(r / 3) + Math.floor(t / 2)) % 2 == 0;
              break;
            case 5:
              n = ((r * t) % 2) + ((r * t) % 3) == 0;
              break;
            case 6:
              n = (((r * t) % 2) + ((r * t) % 3)) % 2 == 0;
              break;
            case 7:
              n = (((r + t) % 2) + ((r * t) % 3)) % 2 == 0;
              break;
            default:
              throw Error("Unreachable");
          }
          !this.isFunction[t][r] &&
            n &&
            (this.modules[t][r] = !this.modules[t][r]);
        }
    }
    getPenaltyScore() {
      let e = 0;
      for (let r = 0; r < this.size; r++) {
        let n = !1,
          a = 0,
          s = [0, 0, 0, 0, 0, 0, 0];
        for (let l = 0; l < this.size; l++)
          this.modules[r][l] == n
            ? 5 == ++a
              ? (e += t.PENALTY_N1)
              : a > 5 && e++
            : (this.finderPenaltyAddHistory(a, s),
              n || (e += this.finderPenaltyCountPatterns(s) * t.PENALTY_N3),
              (n = this.modules[r][l]),
              (a = 1));
        e += this.finderPenaltyTerminateAndCount(n, a, s) * t.PENALTY_N3;
      }
      for (let r = 0; r < this.size; r++) {
        let n = !1,
          a = 0,
          s = [0, 0, 0, 0, 0, 0, 0];
        for (let l = 0; l < this.size; l++)
          this.modules[l][r] == n
            ? 5 == ++a
              ? (e += t.PENALTY_N1)
              : a > 5 && e++
            : (this.finderPenaltyAddHistory(a, s),
              n || (e += this.finderPenaltyCountPatterns(s) * t.PENALTY_N3),
              (n = this.modules[l][r]),
              (a = 1));
        e += this.finderPenaltyTerminateAndCount(n, a, s) * t.PENALTY_N3;
      }
      for (let r = 0; r < this.size - 1; r++)
        for (let n = 0; n < this.size - 1; n++) {
          let a = this.modules[r][n];
          a == this.modules[r][n + 1] &&
            a == this.modules[r + 1][n] &&
            a == this.modules[r + 1][n + 1] &&
            (e += t.PENALTY_N2);
        }
      let r = 0;
      for (let e of this.modules) r = e.reduce((e, t) => e + +!!t, r);
      let n = this.size * this.size,
        s = Math.ceil(Math.abs(20 * r - 10 * n) / n) - 1;
      return (
        a(0 <= s && s <= 9),
        a(0 <= (e += s * t.PENALTY_N4) && e <= 2568888),
        e
      );
    }
    getAlignmentPatternPositions() {
      if (1 == this.version) return [];
      {
        let e = Math.floor(this.version / 7) + 2,
          t =
            32 == this.version
              ? 26
              : 2 * Math.ceil((4 * this.version + 4) / (2 * e - 2)),
          r = [6];
        for (let n = this.size - 7; r.length < e; n -= t) r.splice(1, 0, n);
        return r;
      }
    }
    static getNumRawDataModules(e) {
      if (e < t.MIN_VERSION || e > t.MAX_VERSION)
        throw RangeError("Version number out of range");
      let r = (16 * e + 128) * e + 64;
      if (e >= 2) {
        let t = Math.floor(e / 7) + 2;
        ((r -= (25 * t - 10) * t - 55), e >= 7 && (r -= 36));
      }
      return (a(208 <= r && r <= 29648), r);
    }
    static getNumDataCodewords(e, r) {
      return (
        Math.floor(t.getNumRawDataModules(e) / 8) -
        t.ECC_CODEWORDS_PER_BLOCK[r.ordinal][e] *
          t.NUM_ERROR_CORRECTION_BLOCKS[r.ordinal][e]
      );
    }
    static reedSolomonComputeDivisor(e) {
      if (e < 1 || e > 255) throw RangeError("Degree out of range");
      let r = [];
      for (let t = 0; t < e - 1; t++) r.push(0);
      r.push(1);
      let n = 1;
      for (let a = 0; a < e; a++) {
        for (let e = 0; e < r.length; e++)
          ((r[e] = t.reedSolomonMultiply(r[e], n)),
            e + 1 < r.length && (r[e] ^= r[e + 1]));
        n = t.reedSolomonMultiply(n, 2);
      }
      return r;
    }
    static reedSolomonComputeRemainder(e, r) {
      let n = r.map((e) => 0);
      for (let a of e) {
        let e = a ^ n.shift();
        (n.push(0), r.forEach((r, a) => (n[a] ^= t.reedSolomonMultiply(r, e))));
      }
      return n;
    }
    static reedSolomonMultiply(e, t) {
      if (e >>> 8 != 0 || t >>> 8 != 0) throw RangeError("Byte out of range");
      let r = 0;
      for (let n = 7; n >= 0; n--)
        r = (r << 1) ^ ((r >>> 7) * 285) ^ (((t >>> n) & 1) * e);
      return (a(r >>> 8 == 0), r);
    }
    finderPenaltyCountPatterns(e) {
      let t = e[1];
      a(t <= 3 * this.size);
      let r = t > 0 && e[2] == t && e[3] == 3 * t && e[4] == t && e[5] == t;
      return (
        (r && e[0] >= 4 * t && e[6] >= t ? 1 : 0) +
        (r && e[6] >= 4 * t && e[0] >= t ? 1 : 0)
      );
    }
    finderPenaltyTerminateAndCount(e, t, r) {
      return (
        e && (this.finderPenaltyAddHistory(t, r), (t = 0)),
        (t += this.size),
        this.finderPenaltyAddHistory(t, r),
        this.finderPenaltyCountPatterns(r)
      );
    }
    finderPenaltyAddHistory(e, t) {
      (0 == t[0] && (e += this.size), t.pop(), t.unshift(e));
    }
  };
  function r(e, t, r) {
    if (t < 0 || t > 31 || e >>> t != 0) throw RangeError("Value out of range");
    for (let n = t - 1; n >= 0; n--) r.push((e >>> n) & 1);
  }
  function n(e, t) {
    return ((e >>> t) & 1) != 0;
  }
  function a(e) {
    if (!e) throw Error("Assertion error");
  }
  ((t.MIN_VERSION = 1),
    (t.MAX_VERSION = 40),
    (t.PENALTY_N1 = 3),
    (t.PENALTY_N2 = 3),
    (t.PENALTY_N3 = 40),
    (t.PENALTY_N4 = 10),
    (t.ECC_CODEWORDS_PER_BLOCK = [
      [
        -1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28,
        30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30,
        30, 30, 30, 30, 30,
      ],
      [
        -1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28,
        26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
        28, 28, 28, 28, 28,
      ],
      [
        -1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28,
        28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30,
        30, 30, 30, 30, 30,
      ],
      [
        -1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28,
        28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
        30, 30, 30, 30, 30,
      ],
    ]),
    (t.NUM_ERROR_CORRECTION_BLOCKS = [
      [
        -1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9,
        10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25,
      ],
      [
        -1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16,
        17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45,
        47, 49,
      ],
      [
        -1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20,
        23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62,
        65, 68,
      ],
      [
        -1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25,
        25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70,
        74, 77, 81,
      ],
    ]),
    (e.QrCode = t));
  let s = class e {
    constructor(e, t, r) {
      if (((this.mode = e), (this.numChars = t), (this.bitData = r), t < 0))
        throw RangeError("Invalid argument");
      this.bitData = r.slice();
    }
    static makeBytes(t) {
      let n = [];
      for (let e of t) r(e, 8, n);
      return new e(e.Mode.BYTE, t.length, n);
    }
    static makeNumeric(t) {
      if (!e.isNumeric(t))
        throw RangeError("String contains non-numeric characters");
      let n = [];
      for (let e = 0; e < t.length; ) {
        let a = Math.min(t.length - e, 3);
        (r(parseInt(t.substring(e, e + a), 10), 3 * a + 1, n), (e += a));
      }
      return new e(e.Mode.NUMERIC, t.length, n);
    }
    static makeAlphanumeric(t) {
      let n;
      if (!e.isAlphanumeric(t))
        throw RangeError(
          "String contains unencodable characters in alphanumeric mode",
        );
      let a = [];
      for (n = 0; n + 2 <= t.length; n += 2) {
        let s = 45 * e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n));
        r((s += e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n + 1))), 11, a);
      }
      return (
        n < t.length && r(e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n)), 6, a),
        new e(e.Mode.ALPHANUMERIC, t.length, a)
      );
    }
    static makeSegments(t) {
      return "" == t
        ? []
        : e.isNumeric(t)
          ? [e.makeNumeric(t)]
          : e.isAlphanumeric(t)
            ? [e.makeAlphanumeric(t)]
            : [e.makeBytes(e.toUtf8ByteArray(t))];
    }
    static makeEci(t) {
      let n = [];
      if (t < 0) throw RangeError("ECI assignment value out of range");
      if (t < 128) r(t, 8, n);
      else if (t < 16384) (r(2, 2, n), r(t, 14, n));
      else if (t < 1e6) (r(6, 3, n), r(t, 21, n));
      else throw RangeError("ECI assignment value out of range");
      return new e(e.Mode.ECI, 0, n);
    }
    static isNumeric(t) {
      return e.NUMERIC_REGEX.test(t);
    }
    static isAlphanumeric(t) {
      return e.ALPHANUMERIC_REGEX.test(t);
    }
    getData() {
      return this.bitData.slice();
    }
    static getTotalBits(e, t) {
      let r = 0;
      for (let n of e) {
        let e = n.mode.numCharCountBits(t);
        if (n.numChars >= 1 << e) return 1 / 0;
        r += 4 + e + n.bitData.length;
      }
      return r;
    }
    static toUtf8ByteArray(e) {
      e = encodeURI(e);
      let t = [];
      for (let r = 0; r < e.length; r++)
        "%" != e.charAt(r)
          ? t.push(e.charCodeAt(r))
          : (t.push(parseInt(e.substring(r + 1, r + 3), 16)), (r += 2));
      return t;
    }
  };
  ((s.NUMERIC_REGEX = /^[0-9]*$/),
    (s.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/),
    (s.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"));
  let l = s;
  e.QrSegment = s;
})(i || (i = {})),
  (s = (a = i || (i = {})).QrCode || (a.QrCode = {})),
  ((r = class {
    constructor(e, t) {
      ((this.ordinal = e), (this.formatBits = t));
    }
  }).LOW = new r(0, 1)),
  (r.MEDIUM = new r(1, 0)),
  (r.QUARTILE = new r(2, 3)),
  (r.HIGH = new r(3, 2)),
  (s.Ecc = r),
  (o = (l = i || (i = {})).QrSegment || (l.QrSegment = {})),
  ((n = class {
    constructor(e, t) {
      ((this.modeBits = e), (this.numBitsCharCount = t));
    }
    numCharCountBits(e) {
      return this.numBitsCharCount[Math.floor((e + 7) / 17)];
    }
  }).NUMERIC = new n(1, [10, 12, 14])),
  (n.ALPHANUMERIC = new n(2, [9, 11, 13])),
  (n.BYTE = new n(4, [8, 16, 16])),
  (n.KANJI = new n(8, [8, 10, 12])),
  (n.ECI = new n(7, [0, 0, 0])),
  (o.Mode = n));
var P = i,
  I = {
    L: P.QrCode.Ecc.LOW,
    M: P.QrCode.Ecc.MEDIUM,
    Q: P.QrCode.Ecc.QUARTILE,
    H: P.QrCode.Ecc.HIGH,
  },
  T = "#FFFFFF",
  L = "#000000";
function z(e, t = 0) {
  let r = [];
  return (
    e.forEach(function (e, n) {
      let a = null;
      e.forEach(function (s, l) {
        if (!s && null !== a) {
          (r.push(`M${a + t} ${n + t}h${l - a}v1H${a + t}z`), (a = null));
          return;
        }
        if (l === e.length - 1) {
          if (!s) return;
          null === a
            ? r.push(`M${l + t},${n + t} h1v1H${l + t}z`)
            : r.push(`M${a + t},${n + t} h${l + 1 - a}v1H${a + t}z`);
          return;
        }
        s && null === a && (a = l);
      });
    }),
    r.join("")
  );
}
function _(e, t) {
  return e
    .slice()
    .map((e, r) =>
      r < t.y || r >= t.y + t.h
        ? e
        : e.map((e, r) => (r < t.x || r >= t.x + t.w) && e),
    );
}
function B({
  value: e,
  level: t,
  minVersion: r,
  includeMargin: n,
  marginSize: a,
  imageSettings: s,
  size: l,
  boostLevel: o,
}) {
  let i = React.default.useMemo(() => {
      let n = (Array.isArray(e) ? e : [e]).reduce(
        (e, t) => (e.push(...P.QrSegment.makeSegments(t)), e),
        [],
      );
      return P.QrCode.encodeSegments(n, I[t], r, void 0, void 0, o);
    }, [e, t, r, o]),
    {
      cells: u,
      margin: c,
      numCells: d,
      calculatedImageSettings: f,
    } = React.default.useMemo(() => {
      let e = i.getModules(),
        t = null != a ? Math.max(Math.floor(a), 0) : 4 * !!n,
        r = e.length + 2 * t,
        o = (function (e, t, r, n) {
          if (null == n) return null;
          let a = e.length + 2 * r,
            s = Math.floor(0.1 * t),
            l = a / t,
            o = (n.width || s) * l,
            i = (n.height || s) * l,
            u = null == n.x ? e.length / 2 - o / 2 : n.x * l,
            c = null == n.y ? e.length / 2 - i / 2 : n.y * l,
            d = null == n.opacity ? 1 : n.opacity,
            f = null;
          if (n.excavate) {
            let e = Math.floor(u),
              t = Math.floor(c),
              r = Math.ceil(o + u - e),
              n = Math.ceil(i + c - t);
            f = {
              x: e,
              y: t,
              w: r,
              h: n,
            };
          }
          return {
            x: u,
            y: c,
            h: i,
            w: o,
            excavation: f,
            opacity: d,
            crossOrigin: n.crossOrigin,
          };
        })(e, l, t, s);
      return {
        cells: e,
        margin: t,
        numCells: r,
        calculatedImageSettings: o,
      };
    }, [i, l, s, n, a]);
  return {
    qrcode: i,
    margin: c,
    cells: u,
    numCells: d,
    calculatedImageSettings: f,
  };
}
var D = (function () {
  try {
    new Path2D().addPath(new Path2D());
  } catch (e) {
    return !1;
  }
  return !0;
})();
React.default.forwardRef(function (e, t) {
  let {
      value: r,
      size: n = 128,
      level: a = "L",
      bgColor: s = T,
      fgColor: l = L,
      includeMargin: o = !1,
      minVersion: i = 1,
      boostLevel: u,
      marginSize: c,
      imageSettings: d,
    } = e,
    f = O(e, [
      "value",
      "size",
      "level",
      "bgColor",
      "fgColor",
      "includeMargin",
      "minVersion",
      "boostLevel",
      "marginSize",
      "imageSettings",
    ]),
    { style: m } = f,
    h = O(f, ["style"]),
    g = null == d ? void 0 : d.src,
    w = React.default.useRef(null),
    v = React.default.useRef(null),
    x = React.default.useCallback(
      (e) => {
        ((w.current = e), "function" == typeof t ? t(e) : t && (t.current = e));
      },
      [t],
    ),
    [y, b] = React.default.useState(!1),
    {
      margin: E,
      cells: R,
      numCells: N,
      calculatedImageSettings: C,
    } = B({
      value: r,
      level: a,
      minVersion: i,
      boostLevel: u,
      includeMargin: o,
      marginSize: c,
      imageSettings: d,
      size: n,
    });
  (React.default.useEffect(() => {
    if (null != w.current) {
      let e = w.current,
        t = e.getContext("2d");
      if (!t) return;
      let r = R,
        a = v.current,
        o =
          null != C &&
          null !== a &&
          a.complete &&
          0 !== a.naturalHeight &&
          0 !== a.naturalWidth;
      o && null != C.excavation && (r = _(R, C.excavation));
      let i = window.devicePixelRatio || 1;
      e.height = e.width = n * i;
      let u = (n / N) * i;
      (t.scale(u, u),
        (t.fillStyle = s),
        t.fillRect(0, 0, N, N),
        (t.fillStyle = l),
        D
          ? t.fill(new Path2D(z(r, E)))
          : R.forEach(function (e, r) {
              e.forEach(function (e, n) {
                e && t.fillRect(n + E, r + E, 1, 1);
              });
            }),
        C && (t.globalAlpha = C.opacity),
        o && t.drawImage(a, C.x + E, C.y + E, C.w, C.h));
    }
  }),
    React.default.useEffect(() => {
      b(!1);
    }, [g]));
  let M = j(
      {
        height: n,
        width: n,
      },
      m,
    ),
    k = null;
  return (
    null != g &&
      (k = React.default.createElement("img", {
        src: g,
        key: g,
        style: {
          display: "none",
        },
        onLoad: () => {
          b(!0);
        },
        ref: v,
        crossOrigin: null == C ? void 0 : C.crossOrigin,
      })),
    React.default.createElement(
      React.default.Fragment,
      null,
      React.default.createElement(
        "canvas",
        j(
          {
            style: M,
            height: n,
            width: n,
            ref: x,
            role: "img",
          },
          h,
        ),
      ),
      k,
    )
  );
}).displayName = "QRCodeCanvas";
var F = React.default.forwardRef(function (e, t) {
  let {
      value: r,
      size: n = 128,
      level: a = "L",
      bgColor: s = T,
      fgColor: l = L,
      includeMargin: o = !1,
      minVersion: i = 1,
      boostLevel: u,
      title: c,
      marginSize: d,
      imageSettings: f,
    } = e,
    m = O(e, [
      "value",
      "size",
      "level",
      "bgColor",
      "fgColor",
      "includeMargin",
      "minVersion",
      "boostLevel",
      "title",
      "marginSize",
      "imageSettings",
    ]),
    {
      margin: h,
      cells: g,
      numCells: w,
      calculatedImageSettings: v,
    } = B({
      value: r,
      level: a,
      minVersion: i,
      boostLevel: u,
      includeMargin: o,
      marginSize: d,
      imageSettings: f,
      size: n,
    }),
    x = g,
    y = null;
  null != f &&
    null != v &&
    (null != v.excavation && (x = _(g, v.excavation)),
    (y = React.default.createElement("image", {
      href: f.src,
      height: v.h,
      width: v.w,
      x: v.x + h,
      y: v.y + h,
      preserveAspectRatio: "none",
      opacity: v.opacity,
      crossOrigin: v.crossOrigin,
    })));
  let b = z(x, h);
  return React.default.createElement(
    "svg",
    j(
      {
        height: n,
        width: n,
        viewBox: `0 0 ${w} ${w}`,
        ref: t,
        role: "img",
      },
      m,
    ),
    !!c && React.default.createElement("title", null, c),
    React.default.createElement("path", {
      fill: s,
      d: `M0,0 h${w}v${w}H0z`,
      shapeRendering: "crispEdges",
    }),
    React.default.createElement("path", {
      fill: l,
      d: b,
      shapeRendering: "crispEdges",
    }),
    y,
  );
});
F.displayName = "QRCodeSVG";
let $ =
    "undefined" != typeof crypto &&
    crypto.randomUUID &&
    crypto.randomUUID.bind(crypto),
  H = new Uint8Array(16),
  Y = [];
for (let e = 0; e < 256; ++e) Y.push((e + 256).toString(16).slice(1));
let X = function (e, r, n) {
  if ($ && !r && !e) return $();
  var a = e,
    s = n;
  let l =
    (a = a || {}).random ??
    a.rng?.() ??
    (function () {
      if (!t) {
        if ("undefined" == typeof crypto || !crypto.getRandomValues)
          throw Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
          );
        t = crypto.getRandomValues.bind(crypto);
      }
      return t(H);
    })();
  if (l.length < 16) throw Error("Random bytes length must be >= 16");
  if (((l[6] = (15 & l[6]) | 64), (l[8] = (63 & l[8]) | 128), r)) {
    if ((s = s || 0) < 0 || s + 16 > r.length)
      throw RangeError(
        `UUID byte range ${s}:${s + 15} is out of buffer bounds`,
      );
    for (let e = 0; e < 16; ++e) r[s + e] = l[e];
    return r;
  }
  return (function (e, t = 0) {
    return (
      Y[e[t + 0]] +
      Y[e[t + 1]] +
      Y[e[t + 2]] +
      Y[e[t + 3]] +
      "-" +
      Y[e[t + 4]] +
      Y[e[t + 5]] +
      "-" +
      Y[e[t + 6]] +
      Y[e[t + 7]] +
      "-" +
      Y[e[t + 8]] +
      Y[e[t + 9]] +
      "-" +
      Y[e[t + 10]] +
      Y[e[t + 11]] +
      Y[e[t + 12]] +
      Y[e[t + 13]] +
      Y[e[t + 14]] +
      Y[e[t + 15]]
    ).toLowerCase();
  })(l);
};
animation.default.registerPlugin(E);
let Q = [
    {
      label: "Acasa",
      fullWidth: !0,
      href: "/",
    },
    {
      label: "Servicii",
    },
    {
      label: "Proces",
      fullWidth: !0,
    },
    {
      label: "Proiecte",
    },
    {
      label: "Contact",
      mobileOnly: !0,
      href: "/contact",
    },
  ],
  V = ({ children: e, className: t = "" }) => {
    let r = (0, React.useRef)(null),
      n = (0, React.useRef)(null);
    return (
      <span
        className="relative overflow-clip inline-block cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onMouseEnter={() => {
          let e = animation.default.matchMedia();
          (e.add("(prefers-reduced-motion: no-preference)", () => {
            (animation.default.to(r.current, {
              rotationX: 90,
              y: "-100%",
              duration: 0.4,
              ease: "power2.out",
              transformPerspective: 1e3,
            }),
              animation.default.fromTo(
                n.current,
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
              ));
          }),
            e.add("(prefers-reduced-motion: reduce)", () => {
              (animation.default.to(r.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out",
              }),
                animation.default.to(n.current, {
                  opacity: 1,
                  y: "0%",
                  duration: 0.2,
                  ease: "power2.out",
                }));
            }));
        }}
        onMouseLeave={() => {
          let e = animation.default.matchMedia();
          (e.add("(prefers-reduced-motion: no-preference)", () => {
            (animation.default.to(r.current, {
              rotationX: 0,
              y: "0%",
              duration: 0.4,
              ease: "power2.out",
            }),
              animation.default.to(n.current, {
                rotationX: 90,
                y: "100%",
                duration: 0.4,
                ease: "power2.out",
              }));
          }),
            e.add("(prefers-reduced-motion: reduce)", () => {
              (animation.default.to(r.current, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
              }),
                animation.default.to(n.current, {
                  opacity: 0,
                  y: "100%",
                  duration: 0.2,
                  ease: "power2.out",
                }));
            }));
        }}
      >
        <span
          ref={r}
          className={`block ${t}`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {e}
        </span>
        <span
          ref={n}
          className={`block absolute top-0 left-0 translate-y-full ${t}`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {e}
        </span>
      </span>
    );
  },
  W = ({
    label: e,
    index: t,
    itemRef: r,
    mobileOnly: n = !1,
    fullWidth: a = !1,
    onSelect: s,
    href: l,
  }) => {
    let o = (0, React.useRef)(null),
      i = (0, React.useRef)(null),
      u = (0, React.useRef)(null),
      [c, d] = (0, React.useState)(!1);
    (0, React.useEffect)(() => {
      let e = () => {
        d(window.innerWidth < 768);
      };
      return (
        e(),
        window.addEventListener("resize", e),
        () => window.removeEventListener("resize", e)
      );
    }, []);
    let f = (
      <div
        ref={u}
        className={`bg-brand-gold rounded-lg px-6 py-3 max-md:px-4 max-md:py-2.5 flex items-center justify-center ${a ? "w-full" : ""}`}
      >
        <span
          className="relative overflow-clip inline-block"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <span
            ref={o}
            className="text-black font-display text-[1.5vw] max-md:text-xl uppercase font-semibold whitespace-nowrap text-center block"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {e}
          </span>
          <span
            ref={i}
            className="text-black font-display text-[1.5vw] max-md:text-xl uppercase font-semibold whitespace-nowrap text-center block absolute top-0 left-0 translate-y-full max-md:hidden"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {e}
          </span>
        </span>
      </div>
    );
    return (
      <div
        ref={r}
        className={`cursor-pointer relative z-10 ${n ? "hidden max-md:block" : ""} ${a ? "w-full" : ""}`}
        style={{
          opacity: 0,
        }}
        onMouseEnter={() => {
          if (c) return;
          let e = animation.default.matchMedia();
          (e.add("(prefers-reduced-motion: no-preference)", () => {
            (animation.default.to(o.current, {
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
              ));
          }),
            e.add("(prefers-reduced-motion: reduce)", () => {
              (animation.default.to(o.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out",
              }),
                animation.default.to(i.current, {
                  opacity: 1,
                  y: "0%",
                  duration: 0.2,
                  ease: "power2.out",
                }));
            }));
        }}
        onMouseLeave={() => {
          if (c) return;
          let e = animation.default.matchMedia();
          (e.add("(prefers-reduced-motion: no-preference)", () => {
            (animation.default.to(o.current, {
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
              }));
          }),
            e.add("(prefers-reduced-motion: reduce)", () => {
              (animation.default.to(o.current, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
              }),
                animation.default.to(i.current, {
                  opacity: 0,
                  y: "100%",
                  duration: 0.2,
                  ease: "power2.out",
                }));
            }));
        }}
        onClick={() => {
          if ((s && s(e), !c)) return;
          let t = animation.default.matchMedia();
          (t.add("(prefers-reduced-motion: no-preference)", () => {
            animation.default.to(u.current, {
              scale: 0.95,
              duration: 0.1,
              ease: "power2.out",
              onComplete: () => {
                animation.default.to(u.current, {
                  scale: 1,
                  duration: 0.3,
                  ease: "elastic.out(1, 0.5)",
                });
              },
            });
          }),
            t.add("(prefers-reduced-motion: reduce)", () => {
              animation.default.to(u.current, {
                opacity: 0.7,
                duration: 0.1,
                ease: "power2.out",
                onComplete: () => {
                  animation.default.to(u.current, {
                    opacity: 1,
                    duration: 0.1,
                    ease: "power2.out",
                  });
                },
              });
            }));
        }}
      >
        {l ? (
          <links.default href={l} className="block w-full">
            {f}
          </links.default>
        ) : (
          f
        )}
      </div>
    );
  },
  K = React.default.forwardRef(({ sessionId: e, isConnected: t }, r) => {
    let [n, a] = (0, React.useState)("");
    return (
      (0, React.useEffect)(() => {
        if (e) {
          let t = window.location.origin;
          a(`${t}/controller/${e}`);
        }
      }, [e]),
      (
        <div
          ref={r}
          className="w-full h-full min-h-[15rem] max-md:min-h-[20rem] max-md:hidden rounded-lg flex flex-col items-center justify-center p-6 max-md:p-4"
          style={{
            opacity: 0,
            transform: "scale(0)",
          }}
        >
          <div className="bg-white rounded-lg p-4 max-md:p-3">
            {n ? (
              <F
                value={n}
                size={180}
                level="M"
                bgColor="#ffffff"
                fgColor="#000000"
                className="w-40 h-40 max-md:w-32 max-md:h-32"
              />
            ) : (
              <div className="w-40 h-40 max-md:w-32 max-md:h-32 bg-brand-surface animate-pulse rounded" />
            )}
          </div>
          <div className="mt-4 max-md:mt-3 flex items-center gap-2 max-md:gap-2">
            <div
              className={`w-2 h-2 max-md:w-2 max-md:h-2 rounded-full ${t ? "bg-brand-gold" : "bg-zinc-500"}`}
            />
            <p
              className={`font-sans text-sm max-md:text-sm ${t ? "text-brand-gold" : "text-zinc-400"}`}
            >
              {t ? "Connected" : "Control with phone"}
            </p>
          </div>
        </div>
      )
    );
  });
export default () => {
  let e = (0, routing.useRouter)(),
    t = (0, routing.usePathname)(),
    [r, n] = (0, React.useState)(!1),
    [a, s] = (0, React.useState)(null),
    [l, o] = (0, React.useState)(!1),
    [i, u] = (0, React.useState)(!1),
    [c, d] = (0, React.useState)(!1),
    [f, m] = (0, React.useState)(!1),
    w = (0, React.useRef)([]),
    v = (0, React.useRef)(null),
    x = (0, React.useRef)(null),
    y = (0, React.useRef)(null),
    b = (0, React.useRef)(null),
    E = (0, React.useRef)(null),
    C = (0, React.useRef)(!1),
    M = (0, React.useRef)(!1),
    k = (0, React.useRef)(null),
    S = (0, React.useRef)(null),
    A = (0, React.useRef)(null),
    j = (0, React.useRef)(!1);
  if (
    ((0, React.useEffect)(() => {
      let e = () => {
        m(window.innerWidth < 768);
      };
      return (
        e(),
        window.addEventListener("resize", e),
        () => window.removeEventListener("resize", e)
      );
    }, []),
    t?.startsWith("/controller"))
  )
    return null;
  let O = (0, React.useCallback)(
      (e) => {
        let { command: t, value: r } = e;
        switch (t) {
          case "scroll":
            window.scrollBy({
              top: 100 * r,
              behavior: "smooth",
            });
            break;
          case "navigate":
            let a = {
                home: "/",
                contact: "/contact",
              },
              s = {
                work: "work",
                process: "process",
                services: "services",
              };
            if (a[r])
              window.dispatchEvent(
                new CustomEvent("navigate-with-transition", {
                  detail: {
                    url: a[r],
                  },
                }),
              );
            else if (s[r]) {
              let e = document.getElementById(s[r]);
              e &&
                e.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }
            break;
          case "toggle-menu":
            C.current || ((C.current = !0), n((e) => !e));
        }
      },
      [e],
    ),
    P = (0, React.useCallback)(async (e, t = !1) => {
      if (!j.current) {
        if (
          ((j.current = !0),
          A.current && (clearTimeout(A.current), (A.current = null)),
          t && e)
        )
          try {
            await fetch("/api/pusher", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                sessionId: e,
                event: "desktop-disconnected",
                data: {
                  reason: "timeout",
                },
              }),
            });
          } catch (e) {}
        (setTimeout(() => {
          try {
            if (
              (S.current &&
                (S.current.unbind_all(),
                k.current &&
                  "connected" === k.current.connection.state &&
                  S.current.unsubscribe()),
              k.current)
            ) {
              let e = k.current.connection.state;
              "disconnected" !== e &&
                "disconnecting" !== e &&
                k.current.disconnect();
            }
          } catch (e) {}
          ((k.current = null), (S.current = null), (j.current = !1));
        }, 100),
          o(!1),
          u(!1),
          s(null));
      }
    }, []),
    I = (0, React.useCallback)(
      (e, t = !1) => {
        (A.current && clearTimeout(A.current),
          e &&
            (A.current = setTimeout(() => {
              P(e, t);
            }, 3e4)));
      },
      [P],
    );
  ((0, React.useEffect)(() => {
    if (!r || i || f) return;
    let e = X().slice(0, 8);
    (s(e), u(!0), d(!1));
    let t = new dependency50755.default("2e2a115faa09f16baa5b", {
      cluster: "ap2",
    });
    (t.connection.bind("error", (e) => {
      e?.error?.data?.code === 4004 && d(!0);
    }),
      t.connection.bind("failed", () => {
        d(!0);
      }));
    let n = t.subscribe(`session-${e}`);
    (n.bind("pusher:subscription_error", () => {
      d(!0);
    }),
      n.bind("mobile-connected", () => {
        (o(!0), I(e, !0));
      }),
      n.bind("mobile-disconnected", () => {
        (o(!1), A.current && (clearTimeout(A.current), (A.current = null)));
      }),
      n.bind("remote-command", (t) => {
        (I(e, !0), O(t));
      }),
      (k.current = t),
      (S.current = n));
  }, [r, i, O, I, f]),
    (0, React.useEffect)(() => {
      let e = () => {
        if (a && l) {
          let e = JSON.stringify({
            sessionId: a,
            event: "desktop-disconnected",
            data: {
              reason: "page-unload",
            },
          });
          navigator.sendBeacon("/api/pusher", e);
        }
      };
      return (
        window.addEventListener("beforeunload", e),
        () => {
          window.removeEventListener("beforeunload", e);
        }
      );
    }, [a, l]),
    (0, React.useEffect)(
      () => () => {
        A.current && clearTimeout(A.current);
        try {
          if ((S.current && S.current.unbind_all(), k.current)) {
            let e = k.current.connection.state;
            "disconnected" !== e &&
              "disconnecting" !== e &&
              k.current.disconnect();
          }
        } catch (e) {}
      },
      [],
    ),
    (0, React.useEffect)(() => {
      if (!M.current) {
        M.current = !0;
        return;
      }
      let e = animation.default.matchMedia();
      r
        ? (e.add("(prefers-reduced-motion: no-preference)", () => {
            animation.default.fromTo(
              x.current,
              {
                scale: 0,
                opacity: 0,
              },
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.7)",
                onComplete: () => {
                  (w.current.forEach((e) => {
                    e && animation.default.killTweensOf(e);
                  }),
                    w.current.forEach((e, t) => {
                      e &&
                        (animation.default.set(e, {
                          scale: 0,
                          opacity: 1,
                          y: 0,
                          x: 0,
                          rotation: 0,
                        }),
                        animation.default.to(e, {
                          scale: 1,
                          opacity: 1,
                          duration: 0.5,
                          delay: 0.1 * t,
                          ease: "back.out(1.7)",
                          onComplete: () => {
                            t === w.current.length - 1 && (C.current = !1);
                          },
                        }));
                    }),
                    b.current &&
                      !f &&
                      (animation.default.killTweensOf(b.current),
                      animation.default.set(b.current, {
                        scale: 0,
                        opacity: 0,
                        y: 0,
                        x: 0,
                        rotation: 0,
                      }),
                      animation.default.to(b.current, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        delay: 0.2,
                        ease: "back.out(1.7)",
                      })));
                },
              },
            );
          }),
          e.add("(prefers-reduced-motion: reduce)", () => {
            animation.default.fromTo(
              x.current,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                  (w.current.forEach((e) => {
                    e && animation.default.killTweensOf(e);
                  }),
                    w.current.forEach((e, t) => {
                      e &&
                        (animation.default.set(e, {
                          opacity: 0,
                        }),
                        animation.default.to(e, {
                          opacity: 1,
                          duration: 0.2,
                          delay: 0.05 * t,
                          ease: "power2.out",
                          onComplete: () => {
                            t === w.current.length - 1 && (C.current = !1);
                          },
                        }));
                    }),
                    b.current &&
                      !f &&
                      (animation.default.killTweensOf(b.current),
                      animation.default.set(b.current, {
                        opacity: 0,
                        scale: 1,
                      }),
                      animation.default.to(b.current, {
                        opacity: 1,
                        duration: 0.2,
                        delay: 0.1,
                        ease: "power2.out",
                      })));
                },
              },
            );
          }))
        : (e.add("(prefers-reduced-motion: no-preference)", () => {
            (w.current.forEach((e) => {
              e && animation.default.killTweensOf(e);
            }),
              x.current && animation.default.killTweensOf(x.current),
              b.current && animation.default.killTweensOf(b.current),
              w.current.forEach((e, t) => {
                e &&
                  animation.default.to(e, {
                    y: () => animation.default.utils.random(1200, 1600),
                    x: () => animation.default.utils.random(-150, 150),
                    rotation: () => animation.default.utils.random(-360, 360),
                    opacity: 0,
                    duration: 1,
                    ease: "power2.in",
                    delay: 0.02 * t,
                  });
              }),
              b.current &&
                !f &&
                animation.default.to(b.current, {
                  y: () => animation.default.utils.random(1200, 1600),
                  x: () => animation.default.utils.random(-150, 150),
                  rotation: () => animation.default.utils.random(-360, 360),
                  opacity: 0,
                  duration: 1,
                  ease: "power2.in",
                  delay: 0.1,
                }),
              animation.default.to(x.current, {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: "power2.in",
                onComplete: () => {
                  C.current = !1;
                },
              }));
          }),
          e.add("(prefers-reduced-motion: reduce)", () => {
            (w.current.forEach((e) => {
              e && animation.default.killTweensOf(e);
            }),
              x.current && animation.default.killTweensOf(x.current),
              b.current && animation.default.killTweensOf(b.current),
              w.current.forEach((e, t) => {
                e &&
                  animation.default.to(e, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.out",
                    delay: 0.02 * t,
                  });
              }),
              b.current &&
                !f &&
                animation.default.to(b.current, {
                  opacity: 0,
                  duration: 0.2,
                  ease: "power2.out",
                  delay: 0.05,
                }),
              animation.default.to(x.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                  C.current = !1;
                },
              }));
          }));
    }, [r, f]),
    (0, React.useEffect)(() => {
      let e = (e) => {
        if (!r) return;
        let t = v.current?.contains(e.target),
          a = E.current?.contains(e.target);
        t || a || C.current || ((C.current = !0), n(!1));
      };
      return (
        document.addEventListener("mousedown", e),
        document.addEventListener("touchstart", e),
        () => {
          (document.removeEventListener("mousedown", e),
            document.removeEventListener("touchstart", e));
        }
      );
    }, [r]));
  let T = (e) => {
    let a = {
      Proiecte: "work",
      Proces: "process",
      Servicii: "services",
    }[e];
    if (a)
      if ("/" !== t)
        (sessionStorage.setItem("scrollToSection", a),
          window.dispatchEvent(
            new CustomEvent("navigate-with-transition", {
              detail: {
                url: "/",
              },
            }),
          ));
      else {
        let e = document.getElementById(a);
        e &&
          e.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }
    r && !C.current && ((C.current = !0), n(!1));
  };
  return (
    <jsxRuntime.Fragment>
      <div
        ref={v}
        className={`fixed flex flex-col items-center justify-center bottom-24 max-md:bottom-20 left-1/2 -translate-x-1/2 z-140 w-[40vw] min-w-[500px] max-md:w-[90vw] max-md:min-w-0 min-h-[300px] max-md:min-h-auto transition-all duration-300 ${r ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          ref={x}
          className="absolute inset-0 bg-black rounded-[0.5vw] max-md:rounded-xl overflow-hidden"
          style={{
            transform: "scale(0)",
            opacity: 0,
            transformOrigin: "center bottom",
          }}
        />
        <div ref={y} className="relative p-6 max-md:p-4 z-10 w-full">
          <div
            className={`grid ${f ? "grid-cols-1" : "grid-cols-2"} gap-4 max-md:gap-3 w-full`}
          >
            <div className="flex flex-col items-stretch max-md:items-stretch justify-center gap-3 max-md:gap-2">
              {Q.map((e, t) => (
                <W
                  label={e.label}
                  index={t}
                  itemRef={(e) => (w.current[t] = e)}
                  mobileOnly={e.mobileOnly}
                  fullWidth={e.fullWidth}
                  onSelect={T}
                  href={e.href}
                  key={e.label}
                />
              ))}
            </div>
            {!f && (
              <div className="flex items-center justify-center">
                <K ref={b} sessionId={a} isConnected={l} />
              </div>
            )}
          </div>
        </div>
      </div>
      <nav
        ref={E}
        className="fixed bottom-6 max-md:bottom-4 left-1/2 -translate-x-1/2 w-[30vw] min-w-[400px] max-md:w-[90vw] max-md:min-w-0 bg-black rounded-[0.5vw] max-md:rounded-xl py-[.5vw] px-[1vw] max-md:py-3 max-md:px-4 flex items-center justify-between z-150"
      >
        <div
          className="flex items-center gap-[1vw] max-md:gap-3 cursor-pointer"
          onClick={() => {
            C.current || ((C.current = !0), n(!r));
          }}
        >
          <div className="bg-brand-gold rounded-[0.2vw] max-md:rounded-md p-2 max-md:p-2 flex flex-col gap-1 max-md:gap-[3px]">
            <span
              className={`w-5 max-md:w-5 h-0.5 bg-black transition-all duration-300 ${r ? "rotate-45 translate-y-1.5 max-md:translate-y-[5px]" : ""}`}
            />
            <span
              className={`w-5 max-md:w-5 h-0.5 bg-black transition-all duration-300 ${r ? "opacity-0" : ""}`}
            />
            <span
              className={`w-5 max-md:w-5 h-0.5 bg-black transition-all duration-300 ${r ? "-rotate-45 -translate-y-1.5 max-md:-translate-y-[5px]" : ""}`}
            />
          </div>
          <span className="text-white font-sans font-semibold capitalize text-[1vw] max-md:text-sm max-md:block">
            {r ? "inchide" : "meniu"}
          </span>
        </div>
        <links.default
          href="/"
          onClick={() => {
            r && !C.current && ((C.current = !0), n(!1));
          }}
        >
          <img className="esa-navbar-logo" src="/assets/esa/logo.png" alt="ESA Coder Solutions" width="2785" height="778" />
        </links.default>
        <links.default
          href="/contact"
          className="bg-brand-gold font-sans text-[1.1vw] max-md:hidden text-black rounded-[0.2vw] px-4 py-2 font-semibold"
          onClick={() => {
            r && !C.current && ((C.current = !0), n(!1));
          }}
        >
          <V className="text-black font-sans font-semibold text-[1.1vw]">
            {"Contact"}
          </V>
        </links.default>
      </nav>
    </jsxRuntime.Fragment>
  );
};
