// Exact scene helpers recovered from the supplied bundle.
// Recovered from 1892a55978d500a4.js; original layout, values and behavior preserved.
import { getVendor } from "./runtime.js";
import * as React from "react";
const fiberFrame = getVendor(49774);
const fiberHooks = getVendor(73949);
const THREE = getVendor(90072);
const dependency5975 = getVendor(5975);
const dependency91037 = getVendor(91037);
const dependency971 = getVendor(971);
const threeRenderer = getVendor(8560);
let t, r;
var n;
function A() {
  return (A = Object.assign.bind()).apply(null, arguments);
}
let B = React.forwardRef(function (
  {
    children: e,
    object: t,
    disable: r,
    disableX: n,
    disableY: i,
    disableZ: o,
    left: s,
    right: l,
    top: c,
    bottom: u,
    front: d,
    back: h,
    onCentered: f,
    precise: p = !0,
    cacheKey: m = 0,
    ...B
  },
  v,
) {
  let x = React.useRef(null),
    C = React.useRef(null),
    y = React.useRef(null),
    [w] = React.useState(() => new THREE.Box3()),
    [b] = React.useState(() => new THREE.Vector3()),
    [M] = React.useState(() => new THREE.Sphere());
  return (
    React.useLayoutEffect(() => {
      (C.current.matrixWorld.identity(),
        w.setFromObject(null != t ? t : y.current, p));
      let e = w.max.x - w.min.x,
        a = w.max.y - w.min.y,
        m = w.max.z - w.min.z;
      (w.getCenter(b), w.getBoundingSphere(M));
      let A = c ? a / 2 : u ? -a / 2 : 0,
        g = s ? -e / 2 : l ? e / 2 : 0,
        B = d ? m / 2 : h ? -m / 2 : 0;
      (C.current.position.set(
        r || n ? 0 : -b.x + g,
        r || i ? 0 : -b.y + A,
        r || o ? 0 : -b.z + B,
      ),
        null == f ||
          f({
            parent: x.current.parent,
            container: x.current,
            width: e,
            height: a,
            depth: m,
            boundingBox: w,
            boundingSphere: M,
            center: b,
            verticalAlignment: A,
            horizontalAlignment: g,
            depthAlignment: B,
          }));
    }, [m, f, c, s, d, r, n, i, o, t, p, l, u, h, w, b, M]),
    React.useImperativeHandle(v, () => x.current, []),
    React.createElement(
      "group",
      A(
        {
          ref: x,
        },
        B,
      ),
      React.createElement(
        "group",
        {
          ref: C,
        },
        React.createElement(
          "group",
          {
            ref: y,
          },
          e,
        ),
      ),
    )
  );
});
var C = dependency91037,
  y = THREE;
let w = parseInt(THREE.REVISION.replace(/\D+/g, ""));
class b extends y.Mesh {
  constructor(e, t) {
    var r, n;
    const i = ((e) => e && e.isCubeTexture)(e),
      a = Math.floor(
        Math.log2(
          (null !=
          (n = i
            ? null == (r = e.image[0])
              ? void 0
              : r.width
            : e.image.width)
            ? n
            : 1024) / 4,
        ),
      ),
      o = Math.pow(2, a),
      s = 3 * Math.max(o, 112),
      l = `
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,
      c =
        [
          i ? "#define ENVMAP_TYPE_CUBE" : "",
          `#define CUBEUV_TEXEL_WIDTH ${1 / s}`,
          `#define CUBEUV_TEXEL_HEIGHT ${1 / (4 * o)}`,
          `#define CUBEUV_MAX_MIP ${a}.0`,
        ].join("\n") +
        `
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${w >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }
        `,
      u = {
        map: {
          value: e,
        },
        height: {
          value: (null == t ? void 0 : t.height) || 15,
        },
        radius: {
          value: (null == t ? void 0 : t.radius) || 100,
        },
      };
    super(
      new y.IcosahedronGeometry(1, 16),
      new y.ShaderMaterial({
        uniforms: u,
        fragmentShader: c,
        vertexShader: l,
        side: y.DoubleSide,
      }),
    );
  }
  set radius(e) {
    this.material.uniforms.radius.value = e;
  }
  get radius() {
    return this.material.uniforms.radius.value;
  }
  set height(e) {
    this.material.uniforms.height.value = e;
  }
  get height() {
    return this.material.uniforms.height.value;
  }
}
var E = THREE;
class F extends E.DataTextureLoader {
  constructor(e) {
    (super(e), (this.type = E.HalfFloatType));
  }
  parse(e) {
    let t,
      r,
      n,
      i = function (e, t) {
        switch (e) {
          case 1:
            throw Error("THREE.RGBELoader: Read Error: " + (t || ""));
          case 2:
            throw Error("THREE.RGBELoader: Write Error: " + (t || ""));
          case 3:
            throw Error("THREE.RGBELoader: Bad File Format: " + (t || ""));
          default:
            throw Error("THREE.RGBELoader: Memory Error: " + (t || ""));
        }
      },
      a = function (e, t, r) {
        t = t || 1024;
        let n = e.pos,
          i = -1,
          a = 0,
          o = "",
          s = String.fromCharCode.apply(
            null,
            new Uint16Array(e.subarray(n, n + 128)),
          );
        for (; 0 > (i = s.indexOf("\n")) && a < t && n < e.byteLength; )
          ((o += s),
            (a += s.length),
            (n += 128),
            (s += String.fromCharCode.apply(
              null,
              new Uint16Array(e.subarray(n, n + 128)),
            )));
        return -1 < i && (!1 !== r && (e.pos += a + i + 1), o + s.slice(0, i));
      },
      o = new Uint8Array(e);
    o.pos = 0;
    let s = (function (e) {
        let t,
          r,
          n = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
          o = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
          s = /^\s*FORMAT=(\S+)\s*$/,
          l = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,
          c = {
            valid: 0,
            string: "",
            comments: "",
            programtype: "RGBE",
            format: "",
            gamma: 1,
            exposure: 1,
            width: 0,
            height: 0,
          };
        for (
          (!(e.pos >= e.byteLength) && (t = a(e))) || i(1, "no header found"),
            (r = t.match(/^#\?(\S+)/)) || i(3, "bad initial token"),
            c.valid |= 1,
            c.programtype = r[1],
            c.string += t + "\n";
          !1 !== (t = a(e));

        ) {
          if (((c.string += t + "\n"), "#" === t.charAt(0))) {
            c.comments += t + "\n";
            continue;
          }
          if (
            ((r = t.match(n)) && (c.gamma = parseFloat(r[1])),
            (r = t.match(o)) && (c.exposure = parseFloat(r[1])),
            (r = t.match(s)) && ((c.valid |= 2), (c.format = r[1])),
            (r = t.match(l)) &&
              ((c.valid |= 4),
              (c.height = parseInt(r[1], 10)),
              (c.width = parseInt(r[2], 10))),
            2 & c.valid && 4 & c.valid)
          )
            break;
        }
        return (
          2 & c.valid || i(3, "missing format specifier"),
          4 & c.valid || i(3, "missing image size specifier"),
          c
        );
      })(o),
      l = s.width,
      c = s.height,
      u = (function (e, t, r) {
        if (t < 8 || t > 32767 || 2 !== e[0] || 2 !== e[1] || 128 & e[2])
          return new Uint8Array(e);
        t !== ((e[2] << 8) | e[3]) && i(3, "wrong scanline width");
        let n = new Uint8Array(4 * t * r);
        n.length || i(4, "unable to allocate buffer space");
        let a = 0,
          o = 0,
          s = 4 * t,
          l = new Uint8Array(4),
          c = new Uint8Array(s),
          u = r;
        for (; u > 0 && o < e.byteLength; ) {
          (o + 4 > e.byteLength && i(1),
            (l[0] = e[o++]),
            (l[1] = e[o++]),
            (l[2] = e[o++]),
            (l[3] = e[o++]),
            (2 != l[0] || 2 != l[1] || ((l[2] << 8) | l[3]) != t) &&
              i(3, "bad rgbe scanline format"));
          let r = 0,
            d;
          for (; r < s && o < e.byteLength; ) {
            let t = (d = e[o++]) > 128;
            if (
              (t && (d -= 128),
              (0 === d || r + d > s) && i(3, "bad scanline data"),
              t)
            ) {
              let t = e[o++];
              for (let e = 0; e < d; e++) c[r++] = t;
            } else (c.set(e.subarray(o, o + d), r), (r += d), (o += d));
          }
          for (let e = 0; e < t; e++) {
            let r = 0;
            ((n[a] = c[e + r]),
              (r += t),
              (n[a + 1] = c[e + r]),
              (r += t),
              (n[a + 2] = c[e + r]),
              (r += t),
              (n[a + 3] = c[e + r]),
              (a += 4));
          }
          u--;
        }
        return n;
      })(o.subarray(o.pos), l, c);
    switch (this.type) {
      case E.FloatType:
        let d = new Float32Array(4 * (n = u.length / 4));
        for (let e = 0; e < n; e++)
          !(function (e, t, r, n) {
            let i = Math.pow(2, e[t + 3] - 128) / 255;
            ((r[n + 0] = e[t + 0] * i),
              (r[n + 1] = e[t + 1] * i),
              (r[n + 2] = e[t + 2] * i),
              (r[n + 3] = 1));
          })(u, 4 * e, d, 4 * e);
        ((t = d), (r = E.FloatType));
        break;
      case E.HalfFloatType:
        let h = new Uint16Array(4 * (n = u.length / 4));
        for (let e = 0; e < n; e++)
          !(function (e, t, r, n) {
            let i = Math.pow(2, e[t + 3] - 128) / 255;
            ((r[n + 0] = E.DataUtils.toHalfFloat(
              Math.min(e[t + 0] * i, 65504),
            )),
              (r[n + 1] = E.DataUtils.toHalfFloat(
                Math.min(e[t + 1] * i, 65504),
              )),
              (r[n + 2] = E.DataUtils.toHalfFloat(
                Math.min(e[t + 2] * i, 65504),
              )),
              (r[n + 3] = E.DataUtils.toHalfFloat(1)));
          })(u, 4 * e, h, 4 * e);
        ((t = h), (r = E.HalfFloatType));
        break;
      default:
        throw Error("THREE.RGBELoader: Unsupported type: " + this.type);
    }
    return {
      width: l,
      height: c,
      data: t,
      header: s.string,
      gamma: s.gamma,
      exposure: s.exposure,
      type: r,
    };
  }
  setDataType(e) {
    return ((this.type = e), this);
  }
  load(e, t, r, n) {
    return super.load(
      e,
      function (e, r) {
        switch (e.type) {
          case E.FloatType:
          case E.HalfFloatType:
            ("colorSpace" in e
              ? (e.colorSpace = "srgb-linear")
              : (e.encoding = 3e3),
              (e.minFilter = E.LinearFilter),
              (e.magFilter = E.LinearFilter),
              (e.generateMipmaps = !1),
              (e.flipY = !0));
        }
        t && t(e, r);
      },
      r,
      n,
    );
  }
}
var R = THREE,
  T = {},
  D = function (e, t, r, n, i) {
    var a = new Worker(
      T[t] ||
        (T[t] = URL.createObjectURL(
          new Blob([e], {
            type: "text/javascript",
          }),
        )),
    );
    return (
      (a.onerror = function (e) {
        return i(e.error, null);
      }),
      (a.onmessage = function (e) {
        return i(null, e.data);
      }),
      a.postMessage(r, n),
      a
    );
  },
  I = Uint8Array,
  G = Uint16Array,
  S = Uint32Array,
  H = new I([
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5,
    5, 5, 5, 0, 0, 0, 0,
  ]),
  L = new I([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    11, 11, 12, 12, 13, 13, 0, 0,
  ]),
  P = new I([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
  U = function (e, t) {
    for (var r = new G(31), n = 0; n < 31; ++n) r[n] = t += 1 << e[n - 1];
    for (var i = new S(r[30]), n = 1; n < 30; ++n)
      for (var a = r[n]; a < r[n + 1]; ++a) i[a] = ((a - r[n]) << 5) | n;
    return [r, i];
  },
  O = U(H, 2),
  J = O[0],
  k = O[1];
((J[28] = 258), (k[258] = 28));
for (
  var N = U(L, 0), _ = N[0], j = N[1], K = new G(32768), X = 0;
  X < 32768;
  ++X
) {
  var Q = ((43690 & X) >>> 1) | ((21845 & X) << 1);
  ((Q =
    ((61680 & (Q = ((52428 & Q) >>> 2) | ((13107 & Q) << 2))) >>> 4) |
    ((3855 & Q) << 4)),
    (K[X] = (((65280 & Q) >>> 8) | ((255 & Q) << 8)) >>> 1));
}
for (
  var Y = function (e, t, r) {
      for (var n, i = e.length, a = 0, o = new G(t); a < i; ++a) ++o[e[a] - 1];
      var s = new G(t);
      for (a = 0; a < t; ++a) s[a] = (s[a - 1] + o[a - 1]) << 1;
      if (r) {
        n = new G(1 << t);
        var l = 15 - t;
        for (a = 0; a < i; ++a)
          if (e[a])
            for (
              var c = (a << 4) | e[a],
                u = t - e[a],
                d = s[e[a] - 1]++ << u,
                h = d | ((1 << u) - 1);
              d <= h;
              ++d
            )
              n[K[d] >>> l] = c;
      } else
        for (a = 0, n = new G(i); a < i; ++a)
          e[a] && (n[a] = K[s[e[a] - 1]++] >>> (15 - e[a]));
      return n;
    },
    W = new I(288),
    X = 0;
  X < 144;
  ++X
)
  W[X] = 8;
for (var X = 144; X < 256; ++X) W[X] = 9;
for (var X = 256; X < 280; ++X) W[X] = 7;
for (var X = 280; X < 288; ++X) W[X] = 8;
for (var V = new I(32), X = 0; X < 32; ++X) V[X] = 5;
var Z = Y(W, 9, 0),
  z = Y(W, 9, 1),
  q = Y(V, 5, 0),
  $ = Y(V, 5, 1),
  ee = function (e) {
    for (var t = e[0], r = 1; r < e.length; ++r) e[r] > t && (t = e[r]);
    return t;
  },
  et = function (e, t, r) {
    var n = (t / 8) | 0;
    return ((e[n] | (e[n + 1] << 8)) >> (7 & t)) & r;
  },
  er = function (e, t) {
    var r = (t / 8) | 0;
    return (e[r] | (e[r + 1] << 8) | (e[r + 2] << 16)) >> (7 & t);
  },
  en = function (e) {
    return ((e / 8) | 0) + (7 & e && 1);
  },
  ei = function (e, t, r) {
    ((null == t || t < 0) && (t = 0),
      (null == r || r > e.length) && (r = e.length));
    var n = new (e instanceof G ? G : e instanceof S ? S : I)(r - t);
    return (n.set(e.subarray(t, r)), n);
  },
  ea = function (e, t, r) {
    var n = e.length;
    if (!n || (r && !r.l && n < 5)) return t || new I(0);
    var i = !t || r,
      a = !r || r.i;
    (r || (r = {}), t || (t = new I(3 * n)));
    var o = function (e) {
        var r = t.length;
        if (e > r) {
          var n = new I(Math.max(2 * r, e));
          (n.set(t), (t = n));
        }
      },
      s = r.f || 0,
      l = r.p || 0,
      c = r.b || 0,
      u = r.l,
      d = r.d,
      h = r.m,
      f = r.n,
      p = 8 * n;
    do {
      if (!u) {
        r.f = s = et(e, l, 1);
        var m = et(e, l + 1, 3);
        if (((l += 3), m)) {
          if (1 == m) ((u = z), (d = $), (h = 9), (f = 5));
          else if (2 == m) {
            var A = et(e, l, 31) + 257,
              g = et(e, l + 10, 15) + 4,
              B = A + et(e, l + 5, 31) + 1;
            l += 14;
            for (var v = new I(B), x = new I(19), C = 0; C < g; ++C)
              x[P[C]] = et(e, l + 3 * C, 7);
            l += 3 * g;
            for (
              var y = ee(x), w = (1 << y) - 1, b = Y(x, y, 1), C = 0;
              C < B;

            ) {
              var M = b[et(e, l, w)];
              l += 15 & M;
              var E = M >>> 4;
              if (E < 16) v[C++] = E;
              else {
                var F = 0,
                  R = 0;
                for (
                  16 == E
                    ? ((R = 3 + et(e, l, 3)), (l += 2), (F = v[C - 1]))
                    : 17 == E
                      ? ((R = 3 + et(e, l, 7)), (l += 3))
                      : 18 == E && ((R = 11 + et(e, l, 127)), (l += 7));
                  R--;

                )
                  v[C++] = F;
              }
            }
            var T = v.subarray(0, A),
              D = v.subarray(A);
            ((h = ee(T)), (f = ee(D)), (u = Y(T, h, 1)), (d = Y(D, f, 1)));
          } else throw "invalid block type";
        } else {
          var E = en(l) + 4,
            G = e[E - 4] | (e[E - 3] << 8),
            S = E + G;
          if (S > n) {
            if (a) throw "unexpected EOF";
            break;
          }
          (i && o(c + G),
            t.set(e.subarray(E, S), c),
            (r.b = c += G),
            (r.p = l = 8 * S));
          continue;
        }
        if (l > p) {
          if (a) throw "unexpected EOF";
          break;
        }
      }
      i && o(c + 131072);
      for (var U = (1 << h) - 1, O = (1 << f) - 1, k = l; ; k = l) {
        var F = u[er(e, l) & U],
          N = F >>> 4;
        if ((l += 15 & F) > p) {
          if (a) throw "unexpected EOF";
          break;
        }
        if (!F) throw "invalid length/literal";
        if (N < 256) t[c++] = N;
        else if (256 == N) {
          ((k = l), (u = null));
          break;
        } else {
          var j = N - 254;
          if (N > 264) {
            var C = N - 257,
              K = H[C];
            ((j = et(e, l, (1 << K) - 1) + J[C]), (l += K));
          }
          var X = d[er(e, l) & O],
            Q = X >>> 4;
          if (!X) throw "invalid distance";
          l += 15 & X;
          var D = _[Q];
          if (Q > 3) {
            var K = L[Q];
            ((D += er(e, l) & ((1 << K) - 1)), (l += K));
          }
          if (l > p) {
            if (a) throw "unexpected EOF";
            break;
          }
          i && o(c + 131072);
          for (var W = c + j; c < W; c += 4)
            ((t[c] = t[c - D]),
              (t[c + 1] = t[c + 1 - D]),
              (t[c + 2] = t[c + 2 - D]),
              (t[c + 3] = t[c + 3 - D]));
          c = W;
        }
      }
      ((r.l = u),
        (r.p = k),
        (r.b = c),
        u && ((s = 1), (r.m = h), (r.d = d), (r.n = f)));
    } while (!s);
    return c == t.length ? t : ei(t, 0, c);
  },
  eo = function (e, t, r) {
    r <<= 7 & t;
    var n = (t / 8) | 0;
    ((e[n] |= r), (e[n + 1] |= r >>> 8));
  },
  es = function (e, t, r) {
    r <<= 7 & t;
    var n = (t / 8) | 0;
    ((e[n] |= r), (e[n + 1] |= r >>> 8), (e[n + 2] |= r >>> 16));
  },
  el = function (e, t) {
    for (var r = [], n = 0; n < e.length; ++n)
      e[n] &&
        r.push({
          s: n,
          f: e[n],
        });
    var i = r.length,
      a = r.slice();
    if (!i) return [em, 0];
    if (1 == i) {
      var o = new I(r[0].s + 1);
      return ((o[r[0].s] = 1), [o, 1]);
    }
    (r.sort(function (e, t) {
      return e.f - t.f;
    }),
      r.push({
        s: -1,
        f: 25001,
      }));
    var s = r[0],
      l = r[1],
      c = 0,
      u = 1,
      d = 2;
    for (
      r[0] = {
        s: -1,
        f: s.f + l.f,
        l: s,
        r: l,
      };
      u != i - 1;

    )
      ((s = r[r[c].f < r[d].f ? c++ : d++]),
        (l = r[c != u && r[c].f < r[d].f ? c++ : d++]),
        (r[u++] = {
          s: -1,
          f: s.f + l.f,
          l: s,
          r: l,
        }));
    for (var h = a[0].s, n = 1; n < i; ++n) a[n].s > h && (h = a[n].s);
    var f = new G(h + 1),
      p = ec(r[u - 1], f, 0);
    if (p > t) {
      var n = 0,
        m = 0,
        A = p - t,
        g = 1 << A;
      for (
        a.sort(function (e, t) {
          return f[t.s] - f[e.s] || e.f - t.f;
        });
        n < i;
        ++n
      ) {
        var B = a[n].s;
        if (f[B] > t) ((m += g - (1 << (p - f[B]))), (f[B] = t));
        else break;
      }
      for (m >>>= A; m > 0; ) {
        var v = a[n].s;
        f[v] < t ? (m -= 1 << (t - f[v]++ - 1)) : ++n;
      }
      for (; n >= 0 && m; --n) {
        var x = a[n].s;
        f[x] == t && (--f[x], ++m);
      }
      p = t;
    }
    return [new I(f), p];
  },
  ec = function (e, t, r) {
    return -1 == e.s
      ? Math.max(ec(e.l, t, r + 1), ec(e.r, t, r + 1))
      : (t[e.s] = r);
  },
  eu = function (e) {
    for (var t = e.length; t && !e[--t]; );
    for (
      var r = new G(++t),
        n = 0,
        i = e[0],
        a = 1,
        o = function (e) {
          r[n++] = e;
        },
        s = 1;
      s <= t;
      ++s
    )
      if (e[s] == i && s != t) ++a;
      else {
        if (!i && a > 2) {
          for (; a > 138; a -= 138) o(32754);
          a > 2 &&
            (o(a > 10 ? ((a - 11) << 5) | 28690 : ((a - 3) << 5) | 12305),
            (a = 0));
        } else if (a > 3) {
          for (o(i), --a; a > 6; a -= 6) o(8304);
          a > 2 && (o(((a - 3) << 5) | 8208), (a = 0));
        }
        for (; a--; ) o(i);
        ((a = 1), (i = e[s]));
      }
    return [r.subarray(0, n), t];
  },
  ed = function (e, t) {
    for (var r = 0, n = 0; n < t.length; ++n) r += e[n] * t[n];
    return r;
  },
  eh = function (e, t, r) {
    var n = r.length,
      i = en(t + 2);
    ((e[i] = 255 & n),
      (e[i + 1] = n >>> 8),
      (e[i + 2] = 255 ^ e[i]),
      (e[i + 3] = 255 ^ e[i + 1]));
    for (var a = 0; a < n; ++a) e[i + a + 4] = r[a];
    return (i + 4 + n) * 8;
  },
  ef = function (e, t, r, n, i, a, o, s, l, c, u) {
    (eo(t, u++, r), ++i[256]);
    for (
      var d,
        h,
        f,
        p,
        m = el(i, 15),
        A = m[0],
        g = m[1],
        B = el(a, 15),
        v = B[0],
        x = B[1],
        C = eu(A),
        y = C[0],
        w = C[1],
        b = eu(v),
        M = b[0],
        E = b[1],
        F = new G(19),
        R = 0;
      R < y.length;
      ++R
    )
      F[31 & y[R]]++;
    for (var R = 0; R < M.length; ++R) F[31 & M[R]]++;
    for (
      var T = el(F, 7), D = T[0], I = T[1], S = 19;
      S > 4 && !D[P[S - 1]];
      --S
    );
    var U = (c + 5) << 3,
      O = ed(i, W) + ed(a, V) + o,
      J =
        ed(i, A) +
        ed(a, v) +
        o +
        14 +
        3 * S +
        ed(F, D) +
        (2 * F[16] + 3 * F[17] + 7 * F[18]);
    if (U <= O && U <= J) return eh(t, u, e.subarray(l, l + c));
    if ((eo(t, u, 1 + (J < O)), (u += 2), J < O)) {
      ((d = Y(A, g, 0)), (h = A), (f = Y(v, x, 0)), (p = v));
      var k = Y(D, I, 0);
      (eo(t, u, w - 257), eo(t, u + 5, E - 1), eo(t, u + 10, S - 4), (u += 14));
      for (var R = 0; R < S; ++R) eo(t, u + 3 * R, D[P[R]]);
      u += 3 * S;
      for (var N = [y, M], _ = 0; _ < 2; ++_)
        for (var j = N[_], R = 0; R < j.length; ++R) {
          var K = 31 & j[R];
          (eo(t, u, k[K]),
            (u += D[K]),
            K > 15 && (eo(t, u, (j[R] >>> 5) & 127), (u += j[R] >>> 12)));
        }
    } else ((d = Z), (h = W), (f = q), (p = V));
    for (var R = 0; R < s; ++R)
      if (n[R] > 255) {
        var K = (n[R] >>> 18) & 31;
        (es(t, u, d[K + 257]),
          (u += h[K + 257]),
          K > 7 && (eo(t, u, (n[R] >>> 23) & 31), (u += H[K])));
        var X = 31 & n[R];
        (es(t, u, f[X]),
          (u += p[X]),
          X > 3 && (es(t, u, (n[R] >>> 5) & 8191), (u += L[X])));
      } else (es(t, u, d[n[R]]), (u += h[n[R]]));
    return (es(t, u, d[256]), u + h[256]);
  },
  ep = new S([
    65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632,
  ]),
  em = new I(0),
  eA = function (e, t, r, n, i, a) {
    var o = e.length,
      s = new I(n + o + 5 * (1 + Math.ceil(o / 7e3)) + i),
      l = s.subarray(n, s.length - i),
      c = 0;
    if (!t || o < 8)
      for (var u = 0; u <= o; u += 65535) {
        var d = u + 65535;
        d < o
          ? (c = eh(l, c, e.subarray(u, d)))
          : ((l[u] = a), (c = eh(l, c, e.subarray(u, o))));
      }
    else {
      for (
        var h = ep[t - 1],
          f = h >>> 13,
          p = 8191 & h,
          m = (1 << r) - 1,
          A = new G(32768),
          g = new G(m + 1),
          B = Math.ceil(r / 3),
          v = 2 * B,
          x = function (t) {
            return (e[t] ^ (e[t + 1] << B) ^ (e[t + 2] << v)) & m;
          },
          C = new S(25e3),
          y = new G(288),
          w = new G(32),
          b = 0,
          M = 0,
          u = 0,
          E = 0,
          F = 0,
          R = 0;
        u < o;
        ++u
      ) {
        var T = x(u),
          D = 32767 & u,
          P = g[T];
        if (((A[D] = P), (g[T] = D), F <= u)) {
          var U = o - u;
          if ((b > 7e3 || E > 24576) && U > 423) {
            ((c = ef(e, l, 0, C, y, w, M, E, R, u - R, c)),
              (E = b = M = 0),
              (R = u));
            for (var O = 0; O < 286; ++O) y[O] = 0;
            for (var O = 0; O < 30; ++O) w[O] = 0;
          }
          var J = 2,
            N = 0,
            _ = p,
            K = (D - P) & 32767;
          if (U > 2 && T == x(u - K))
            for (
              var X = Math.min(f, U) - 1,
                Q = Math.min(32767, u),
                Y = Math.min(258, U);
              K <= Q && --_ && D != P;

            ) {
              if (e[u + J] == e[u + J - K]) {
                for (var W = 0; W < Y && e[u + W] == e[u + W - K]; ++W);
                if (W > J) {
                  if (((J = W), (N = K), W > X)) break;
                  for (var V = Math.min(K, W - 2), Z = 0, O = 0; O < V; ++O) {
                    var z = (u - K + O + 32768) & 32767,
                      q = A[z],
                      $ = (z - q + 32768) & 32767;
                    $ > Z && ((Z = $), (P = z));
                  }
                }
              }
              ((P = A[(D = P)]), (K += (D - P + 32768) & 32767));
            }
          if (N) {
            C[E++] = 0x10000000 | (k[J] << 18) | j[N];
            var ee = 31 & k[J],
              et = 31 & j[N];
            ((M += H[ee] + L[et]), ++y[257 + ee], ++w[et], (F = u + J), ++b);
          } else ((C[E++] = e[u]), ++y[e[u]]);
        }
      }
      ((c = ef(e, l, a, C, y, w, M, E, R, u - R, c)),
        !a && 7 & c && (c = eh(l, c + 1, em)));
    }
    return ei(s, 0, n + en(c) + i);
  },
  eg = (function () {
    for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
      for (var r = t, n = 9; --n; ) r = (1 & r && -0x12477ce0) ^ (r >>> 1);
      e[t] = r;
    }
    return e;
  })(),
  eB = function () {
    var e = -1;
    return {
      p: function (t) {
        for (var r = e, n = 0; n < t.length; ++n)
          r = eg[(255 & r) ^ t[n]] ^ (r >>> 8);
        e = r;
      },
      d: function () {
        return ~e;
      },
    };
  },
  ev = function () {
    var e = 1,
      t = 0;
    return {
      p: function (r) {
        for (var n = e, i = t, a = r.length, o = 0; o != a; ) {
          for (var s = Math.min(o + 2655, a); o < s; ++o) i += n += r[o];
          ((n = (65535 & n) + 15 * (n >> 16)),
            (i = (65535 & i) + 15 * (i >> 16)));
        }
        ((e = n), (t = i));
      },
      d: function () {
        return (
          (e %= 65521),
          (t %= 65521),
          ((255 & e) << 24) | ((e >>> 8) << 16) | ((255 & t) << 8) | (t >>> 8)
        );
      },
    };
  },
  ex = function (e, t, r, n, i) {
    return eA(
      e,
      null == t.level ? 6 : t.level,
      null == t.mem
        ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length))))
        : 12 + t.mem,
      r,
      n,
      !i,
    );
  },
  eC = function (e, t) {
    var r = {};
    for (var n in e) r[n] = e[n];
    for (var n in t) r[n] = t[n];
    return r;
  },
  ey = function (e, t, r) {
    for (
      var n = e(),
        i = e.toString(),
        a = i
          .slice(i.indexOf("[") + 1, i.lastIndexOf("]"))
          .replace(/ /g, "")
          .split(","),
        o = 0;
      o < n.length;
      ++o
    ) {
      var s = n[o],
        l = a[o];
      if ("function" == typeof s) {
        t += ";" + l + "=";
        var c = s.toString();
        if (s.prototype) {
          if (-1 != c.indexOf("[native code]")) {
            var u = c.indexOf(" ", 8) + 1;
            t += c.slice(u, c.indexOf("(", u));
          } else
            for (var d in ((t += c), s.prototype))
              t +=
                ";" + l + ".prototype." + d + "=" + s.prototype[d].toString();
        } else t += c;
      } else r[l] = s;
    }
    return [t, r];
  },
  ew = [],
  eb = function (e) {
    var t = [];
    for (var r in e)
      (e[r] instanceof I || e[r] instanceof G || e[r] instanceof S) &&
        t.push((e[r] = new e[r].constructor(e[r])).buffer);
    return t;
  },
  eM = function (e, t, r, n) {
    if (!ew[r]) {
      for (var i, a = "", o = {}, s = e.length - 1, l = 0; l < s; ++l)
        ((a = (i = ey(e[l], a, o))[0]), (o = i[1]));
      ew[r] = ey(e[s], a, o);
    }
    var c = eC({}, ew[r][1]);
    return D(
      ew[r][0] +
        ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" +
        t.toString() +
        "}",
      r,
      c,
      eb(c),
      n,
    );
  },
  eE = function () {
    return [
      I,
      G,
      S,
      H,
      L,
      P,
      J,
      _,
      z,
      $,
      K,
      Y,
      ee,
      et,
      er,
      en,
      ei,
      ea,
      eZ,
      eD,
      eI,
    ];
  },
  eF = function () {
    return [
      I,
      G,
      S,
      H,
      L,
      P,
      k,
      j,
      Z,
      W,
      q,
      V,
      K,
      ep,
      em,
      Y,
      eo,
      es,
      el,
      ec,
      eu,
      ed,
      eh,
      ef,
      en,
      ei,
      eA,
      ex,
      eY,
      eD,
    ];
  },
  eR = function () {
    return [eJ, ek];
  },
  eT = function () {
    return [ej];
  },
  eD = function (e) {
    return postMessage(e, [e.buffer]);
  },
  eI = function (e) {
    return e && e.size && new I(e.size);
  },
  eG = function (e) {
    return (
      (e.ondata = function (e, t) {
        return postMessage([e, t], [e.buffer]);
      }),
      function (t) {
        return e.push(t.data[0], t.data[1]);
      }
    );
  },
  eS = function (e, t, r, n, i) {
    var a,
      o = eM(e, n, i, function (e, r) {
        e
          ? (o.terminate(), t.ondata.call(t, e))
          : (r[1] && o.terminate(), t.ondata.call(t, e, r[0], r[1]));
      });
    (o.postMessage(r),
      (t.push = function (e, r) {
        if (a) throw "stream finished";
        if (!t.ondata) throw "no stream handler";
        o.postMessage([e, (a = r)], [e.buffer]);
      }),
      (t.terminate = function () {
        o.terminate();
      }));
  },
  eH = function (e, t) {
    return e[t] | (e[t + 1] << 8);
  },
  eL = function (e, t) {
    return (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0;
  },
  eP = function (e, t) {
    return eL(e, t) + 0x100000000 * eL(e, t + 4);
  },
  eU = function (e, t, r) {
    for (; r; ++t) ((e[t] = r), (r >>>= 8));
  },
  eO = function (e, t) {
    var r = t.filename;
    if (
      ((e[0] = 31),
      (e[1] = 139),
      (e[2] = 8),
      (e[8] = t.level < 2 ? 4 : 2 * (9 == t.level)),
      (e[9] = 3),
      0 != t.mtime &&
        eU(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)),
      r)
    ) {
      e[3] = 8;
      for (var n = 0; n <= r.length; ++n) e[n + 10] = r.charCodeAt(n);
    }
  },
  eJ = function (e) {
    if (31 != e[0] || 139 != e[1] || 8 != e[2]) throw "invalid gzip data";
    var t = e[3],
      r = 10;
    4 & t && (r += e[10] | ((e[11] << 8) + 2));
    for (var n = ((t >> 3) & 1) + ((t >> 4) & 1); n > 0; n -= !e[r++]);
    return r + (2 & t);
  },
  ek = function (e) {
    var t = e.length;
    return (
      (e[t - 4] | (e[t - 3] << 8) | (e[t - 2] << 16) | (e[t - 1] << 24)) >>> 0
    );
  },
  eN = function (e) {
    return 10 + ((e.filename && e.filename.length + 1) || 0);
  },
  e_ = function (e, t) {
    var r = t.level,
      n = 0 == r ? 0 : r < 6 ? 1 : 9 == r ? 3 : 2;
    ((e[0] = 120), (e[1] = (n << 6) | (n ? 32 - 2 * n : 1)));
  },
  ej = function (e) {
    if ((15 & e[0]) != 8 || e[0] >>> 4 > 7 || ((e[0] << 8) | e[1]) % 31)
      throw "invalid zlib data";
    if (32 & e[1]) throw "invalid zlib data: preset dictionaries not supported";
  };
function eK(e, t) {
  return (
    t || "function" != typeof e || ((t = e), (e = {})),
    (this.ondata = t),
    e
  );
}
var eX = (function () {
    function e(e, t) {
      (t || "function" != typeof e || ((t = e), (e = {})),
        (this.ondata = t),
        (this.o = e || {}));
    }
    return (
      (e.prototype.p = function (e, t) {
        this.ondata(ex(e, this.o, 0, 0, !t), t);
      }),
      (e.prototype.push = function (e, t) {
        if (this.d) throw "stream finished";
        if (!this.ondata) throw "no stream handler";
        ((this.d = t), this.p(e, t || !1));
      }),
      e
    );
  })(),
  eQ = function (e, t) {
    eS(
      [
        eF,
        function () {
          return [eG, eX];
        },
      ],
      this,
      eK.call(this, e, t),
      function (e) {
        onmessage = eG(new eX(e.data));
      },
      6,
    );
  };
function eY(e, t) {
  return ex(e, t || {}, 0, 0);
}
var eW = (function () {
    function e(e) {
      ((this.s = {}), (this.p = new I(0)), (this.ondata = e));
    }
    return (
      (e.prototype.e = function (e) {
        if (this.d) throw "stream finished";
        if (!this.ondata) throw "no stream handler";
        var t = this.p.length,
          r = new I(t + e.length);
        (r.set(this.p), r.set(e, t), (this.p = r));
      }),
      (e.prototype.c = function (e) {
        this.d = this.s.i = e || !1;
        var t = this.s.b,
          r = ea(this.p, this.o, this.s);
        (this.ondata(ei(r, t, this.s.b), this.d),
          (this.o = ei(r, this.s.b - 32768)),
          (this.s.b = this.o.length),
          (this.p = ei(this.p, (this.s.p / 8) | 0)),
          (this.s.p &= 7));
      }),
      (e.prototype.push = function (e, t) {
        (this.e(e), this.c(t));
      }),
      e
    );
  })(),
  eV = function (e) {
    ((this.ondata = e),
      eS(
        [
          eE,
          function () {
            return [eG, eW];
          },
        ],
        this,
        0,
        function () {
          onmessage = eG(new eW());
        },
        7,
      ));
  };
function eZ(e, t) {
  return ea(e, t);
}
(function () {
  function e(e, t) {
    ((this.c = eB()), (this.l = 0), (this.v = 1), eX.call(this, e, t));
  }
  ((e.prototype.push = function (e, t) {
    eX.prototype.push.call(this, e, t);
  }),
    (e.prototype.p = function (e, t) {
      (this.c.p(e), (this.l += e.length));
      var r = ex(e, this.o, this.v && eN(this.o), t && 8, !t);
      (this.v && (eO(r, this.o), (this.v = 0)),
        t && (eU(r, r.length - 8, this.c.d()), eU(r, r.length - 4, this.l)),
        this.ondata(r, t));
    }));
})();
var ez = (function () {
    function e(e) {
      ((this.v = 1), eW.call(this, e));
    }
    return (
      (e.prototype.push = function (e, t) {
        if ((eW.prototype.e.call(this, e), this.v)) {
          var r = this.p.length > 3 ? eJ(this.p) : 4;
          if (r >= this.p.length && !t) return;
          ((this.p = this.p.subarray(r)), (this.v = 0));
        }
        if (t) {
          if (this.p.length < 8) throw "invalid gzip stream";
          this.p = this.p.subarray(0, -8);
        }
        eW.prototype.c.call(this, t);
      }),
      e
    );
  })(),
  eq = function (e) {
    ((this.ondata = e),
      eS(
        [
          eE,
          eR,
          function () {
            return [eG, eW, ez];
          },
        ],
        this,
        0,
        function () {
          onmessage = eG(new ez());
        },
        9,
      ));
  },
  e$ =
    ((function () {
      function e(e, t) {
        ((this.c = ev()), (this.v = 1), eX.call(this, e, t));
      }
      ((e.prototype.push = function (e, t) {
        eX.prototype.push.call(this, e, t);
      }),
        (e.prototype.p = function (e, t) {
          this.c.p(e);
          var r = ex(e, this.o, this.v && 2, t && 4, !t);
          (this.v && (e_(r, this.o), (this.v = 0)),
            t && eU(r, r.length - 4, this.c.d()),
            this.ondata(r, t));
        }));
    })(),
    (function () {
      function e(e) {
        ((this.v = 1), eW.call(this, e));
      }
      return (
        (e.prototype.push = function (e, t) {
          if ((eW.prototype.e.call(this, e), this.v)) {
            if (this.p.length < 2 && !t) return;
            ((this.p = this.p.subarray(2)), (this.v = 0));
          }
          if (t) {
            if (this.p.length < 4) throw "invalid zlib stream";
            this.p = this.p.subarray(0, -4);
          }
          eW.prototype.c.call(this, t);
        }),
        e
      );
    })()),
  e0 = function (e) {
    ((this.ondata = e),
      eS(
        [
          eE,
          eT,
          function () {
            return [eG, eW, e$];
          },
        ],
        this,
        0,
        function () {
          onmessage = eG(new e$());
        },
        11,
      ));
  };
function e1(e, t) {
  return ea((ej(e), e.subarray(2, -4)), t);
}
var e2 = (function () {
  function e(e) {
    ((this.G = ez), (this.I = eW), (this.Z = e$), (this.ondata = e));
  }
  return (
    (e.prototype.push = function (e, t) {
      if (!this.ondata) throw "no stream handler";
      if (this.s) this.s.push(e, t);
      else {
        if (this.p && this.p.length) {
          var r = new I(this.p.length + e.length);
          (r.set(this.p), r.set(e, this.p.length));
        } else this.p = e;
        if (this.p.length > 2) {
          var n = this,
            i = function () {
              n.ondata.apply(n, arguments);
            };
          ((this.s =
            31 == this.p[0] && 139 == this.p[1] && 8 == this.p[2]
              ? new this.G(i)
              : (15 & this.p[0]) != 8 ||
                  this.p[0] >> 4 > 7 ||
                  ((this.p[0] << 8) | this.p[1]) % 31
                ? new this.I(i)
                : new this.Z(i)),
            this.s.push(this.p, t),
            (this.p = null));
        }
      }
    }),
    e
  );
})();
(function (e) {
  ((this.G = eq), (this.I = eV), (this.Z = e0), (this.ondata = e));
}).prototype.push = function (e, t) {
  e2.prototype.push.call(this, e, t);
};
var e9 = "undefined" != typeof TextEncoder && new TextEncoder(),
  e3 = "undefined" != typeof TextDecoder && new TextDecoder(),
  e8 = 0;
try {
  (e3.decode(em, {
    stream: !0,
  }),
    (e8 = 1));
} catch (e) {}
var e5 = function (e) {
  for (var t = "", r = 0; ; ) {
    var n = e[r++],
      i = (n > 127) + (n > 223) + (n > 239);
    if (r + i > e.length) return [t, ei(e, r - 1)];
    i
      ? 3 == i
        ? (t += String.fromCharCode(
            55296 |
              ((n =
                (((15 & n) << 18) |
                  ((63 & e[r++]) << 12) |
                  ((63 & e[r++]) << 6) |
                  (63 & e[r++])) -
                65536) >>
                10),
            56320 | (1023 & n),
          ))
        : 1 & i
          ? (t += String.fromCharCode(((31 & n) << 6) | (63 & e[r++])))
          : (t += String.fromCharCode(
              ((15 & n) << 12) | ((63 & e[r++]) << 6) | (63 & e[r++]),
            ))
      : (t += String.fromCharCode(n));
  }
};
function e6(e, t) {
  if (t) {
    for (var r = new I(e.length), n = 0; n < e.length; ++n)
      r[n] = e.charCodeAt(n);
    return r;
  }
  if (e9) return e9.encode(e);
  for (
    var i = e.length,
      a = new I(e.length + (e.length >> 1)),
      o = 0,
      s = function (e) {
        a[o++] = e;
      },
      n = 0;
    n < i;
    ++n
  ) {
    if (o + 5 > a.length) {
      var l = new I(o + 8 + ((i - n) << 1));
      (l.set(a), (a = l));
    }
    var c = e.charCodeAt(n);
    c < 128 || t
      ? s(c)
      : (c < 2048
          ? s(192 | (c >> 6))
          : (c > 55295 && c < 57344
              ? (s(
                  240 |
                    ((c =
                      (65536 + (1047552 & c)) | (1023 & e.charCodeAt(++n))) >>
                      18),
                ),
                s(128 | ((c >> 12) & 63)))
              : s(224 | (c >> 12)),
            s(128 | ((c >> 6) & 63))),
        s(128 | (63 & c)));
  }
  return ei(a, 0, o);
}
(((function (e) {
  ((this.ondata = e), e8 ? (this.t = new TextDecoder()) : (this.p = em));
}).prototype.push = function (e, t) {
  if (!this.ondata) throw "no callback";
  if (((t = !!t), this.t)) {
    if (
      (this.ondata(
        this.t.decode(e, {
          stream: !0,
        }),
        t,
      ),
      t)
    ) {
      if (this.t.decode().length) throw "invalid utf-8 data";
      this.t = null;
    }
    return;
  }
  if (!this.p) throw "stream finished";
  var r = new I(this.p.length + e.length);
  (r.set(this.p), r.set(e, this.p.length));
  var n = e5(r),
    i = n[0],
    a = n[1];
  if (t) {
    if (a.length) throw "invalid utf-8 data";
    this.p = null;
  } else this.p = a;
  this.ondata(i, t);
}),
  (function (e) {
    this.ondata = e;
  }.prototype.push = function (e, t) {
    if (!this.ondata) throw "no callback";
    if (this.d) throw "stream finished";
    this.ondata(e6(e), (this.d = t || !1));
  }));
var e4 = function (e) {
    return 1 == e ? 3 : e < 6 ? 2 : +(9 == e);
  },
  e7 = function (e, t) {
    for (; 1 != eH(e, t); t += 4 + eH(e, t + 2));
    return [eP(e, t + 12), eP(e, t + 4), eP(e, t + 20)];
  },
  te = function (e) {
    var t = 0;
    if (e)
      for (var r in e) {
        var n = e[r].length;
        if (n > 65535) throw "extra field too long";
        t += n + 4;
      }
    return t;
  },
  tt = function (e, t, r, n, i, a, o, s) {
    var l = n.length,
      c = r.extra,
      u = s && s.length,
      d = te(c);
    (eU(e, t, null != o ? 0x2014b50 : 0x4034b50),
      (t += 4),
      null != o && ((e[t++] = 20), (e[t++] = r.os)),
      (e[t] = 20),
      (t += 2),
      (e[t++] = (r.flag << 1) | (null == a && 8)),
      (e[t++] = i && 8),
      (e[t++] = 255 & r.compression),
      (e[t++] = r.compression >> 8));
    var h = new Date(null == r.mtime ? Date.now() : r.mtime),
      f = h.getFullYear() - 1980;
    if (f < 0 || f > 119) throw "date not in range 1980-2099";
    if (
      (eU(
        e,
        t,
        (f << 25) |
          ((h.getMonth() + 1) << 21) |
          (h.getDate() << 16) |
          (h.getHours() << 11) |
          (h.getMinutes() << 5) |
          (h.getSeconds() >>> 1),
      ),
      (t += 4),
      null != a && (eU(e, t, r.crc), eU(e, t + 4, a), eU(e, t + 8, r.size)),
      eU(e, t + 12, l),
      eU(e, t + 14, d),
      (t += 16),
      null != o &&
        (eU(e, t, u), eU(e, t + 6, r.attrs), eU(e, t + 10, o), (t += 14)),
      e.set(n, t),
      (t += l),
      d)
    )
      for (var p in c) {
        var m = c[p],
          A = m.length;
        (eU(e, t, +p), eU(e, t + 2, A), e.set(m, t + 4), (t += 4 + A));
      }
    return (u && (e.set(s, t), (t += u)), t);
  },
  tr = function (e, t, r, n, i) {
    (eU(e, t, 0x6054b50),
      eU(e, t + 8, r),
      eU(e, t + 10, r),
      eU(e, t + 12, n),
      eU(e, t + 16, i));
  },
  tn = (function () {
    function e(e) {
      ((this.filename = e),
        (this.c = eB()),
        (this.size = 0),
        (this.compression = 0));
    }
    return (
      (e.prototype.process = function (e, t) {
        this.ondata(null, e, t);
      }),
      (e.prototype.push = function (e, t) {
        if (!this.ondata)
          throw "no callback - add to ZIP archive before pushing";
        (this.c.p(e),
          (this.size += e.length),
          t && (this.crc = this.c.d()),
          this.process(e, t || !1));
      }),
      e
    );
  })();
function ti(e, t) {
  var r = this;
  (t || (t = {}),
    tn.call(this, e),
    (this.d = new eX(t, function (e, t) {
      r.ondata(null, e, t);
    })),
    (this.compression = 8),
    (this.flag = e4(t.level)));
}
function ta(e, t) {
  var r = this;
  (t || (t = {}),
    tn.call(this, e),
    (this.d = new eQ(t, function (e, t, n) {
      r.ondata(e, t, n);
    })),
    (this.compression = 8),
    (this.flag = e4(t.level)),
    (this.terminate = this.d.terminate));
}
function to(e) {
  ((this.ondata = e), (this.u = []), (this.d = 1));
}
((ti.prototype.process = function (e, t) {
  try {
    this.d.push(e, t);
  } catch (e) {
    this.ondata(e, null, t);
  }
}),
  (ti.prototype.push = function (e, t) {
    tn.prototype.push.call(this, e, t);
  }),
  (ta.prototype.process = function (e, t) {
    this.d.push(e, t);
  }),
  (ta.prototype.push = function (e, t) {
    tn.prototype.push.call(this, e, t);
  }),
  (to.prototype.add = function (e) {
    var t = this;
    if (2 & this.d) throw "stream finished";
    var r = e6(e.filename),
      n = r.length,
      i = e.comment,
      a = i && e6(i),
      o = n != e.filename.length || (a && i.length != a.length),
      s = n + te(e.extra) + 30;
    if (n > 65535) throw "filename too long";
    var l = new I(s);
    tt(l, 0, e, r, o);
    var c = [l],
      u = function () {
        for (var e = 0, r = c; e < r.length; e++) {
          var n = r[e];
          t.ondata(null, n, !1);
        }
        c = [];
      },
      d = this.d;
    this.d = 0;
    var h = this.u.length,
      f = eC(e, {
        f: r,
        u: o,
        o: a,
        t: function () {
          e.terminate && e.terminate();
        },
        r: function () {
          if ((u(), d)) {
            var e = t.u[h + 1];
            e ? e.r() : (t.d = 1);
          }
          d = 1;
        },
      }),
      p = 0;
    ((e.ondata = function (r, n, i) {
      if (r) (t.ondata(r, n, i), t.terminate());
      else if (((p += n.length), c.push(n), i)) {
        var a = new I(16);
        (eU(a, 0, 0x8074b50),
          eU(a, 4, e.crc),
          eU(a, 8, p),
          eU(a, 12, e.size),
          c.push(a),
          (f.c = p),
          (f.b = s + p + 16),
          (f.crc = e.crc),
          (f.size = e.size),
          d && f.r(),
          (d = 1));
      } else d && u();
    }),
      this.u.push(f));
  }),
  (to.prototype.end = function () {
    var e = this;
    if (2 & this.d) {
      if (1 & this.d) throw "stream finishing";
      throw "stream finished";
    }
    (this.d
      ? this.e()
      : this.u.push({
          r: function () {
            1 & e.d && (e.u.splice(-1, 1), e.e());
          },
          t: function () {},
        }),
      (this.d = 3));
  }),
  (to.prototype.e = function () {
    for (var e = 0, t = 0, r = 0, n = 0, i = this.u; n < i.length; n++) {
      var a = i[n];
      r += 46 + a.f.length + te(a.extra) + (a.o ? a.o.length : 0);
    }
    for (var o = new I(r + 22), s = 0, l = this.u; s < l.length; s++) {
      var a = l[s];
      (tt(o, e, a, a.f, a.u, a.c, t, a.o),
        (e += 46 + a.f.length + te(a.extra) + (a.o ? a.o.length : 0)),
        (t += a.b));
    }
    (tr(o, e, this.u.length, r, t), this.ondata(null, o, !0), (this.d = 2));
  }),
  (to.prototype.terminate = function () {
    for (var e = 0, t = this.u; e < t.length; e++) t[e].t();
    this.d = 2;
  }));
var ts = (function () {
  function e() {}
  return (
    (e.prototype.push = function (e, t) {
      this.ondata(null, e, t);
    }),
    (e.compression = 0),
    e
  );
})();
function tl() {
  var e = this;
  this.i = new eW(function (t, r) {
    e.ondata(null, t, r);
  });
}
function tc(e, t) {
  var r = this;
  t < 32e4
    ? (this.i = new eW(function (e, t) {
        r.ondata(null, e, t);
      }))
    : ((this.i = new eV(function (e, t, n) {
        r.ondata(e, t, n);
      })),
      (this.terminate = this.i.terminate));
}
function tu(e) {
  ((this.onfile = e),
    (this.k = []),
    (this.o = {
      0: ts,
    }),
    (this.p = em));
}
((tl.prototype.push = function (e, t) {
  try {
    this.i.push(e, t);
  } catch (r) {
    this.ondata(r, e, t);
  }
}),
  (tl.compression = 8),
  (tc.prototype.push = function (e, t) {
    (this.i.terminate && (e = ei(e, 0)), this.i.push(e, t));
  }),
  (tc.compression = 8),
  (tu.prototype.push = function (e, t) {
    var r = this;
    if (!this.onfile) throw "no callback";
    if (!this.p) throw "stream finished";
    if (this.c > 0) {
      var n = Math.min(this.c, e.length),
        i = e.subarray(0, n);
      if (
        ((this.c -= n),
        this.d ? this.d.push(i, !this.c) : this.k[0].push(i),
        (e = e.subarray(n)).length)
      )
        return this.push(e, t);
    } else {
      var a = 0,
        o = 0,
        s = void 0,
        l = void 0;
      this.p.length
        ? e.length
          ? ((l = new I(this.p.length + e.length)).set(this.p),
            l.set(e, this.p.length))
          : (l = this.p)
        : (l = e);
      for (
        var c = l.length, u = this.c, d = u && this.d, h = this;
        o < c - 4 &&
        "break" !==
          (function () {
            var e = eL(l, o);
            if (0x4034b50 == e) {
              ((a = 1), (s = o), (h.d = null), (h.c = 0));
              var t = eH(l, o + 6),
                n = eH(l, o + 8),
                i = 8 & t,
                d = eH(l, o + 26),
                f = eH(l, o + 28);
              if (c > o + 30 + d + f) {
                var p,
                  m,
                  A = [];
                (h.k.unshift(A), (a = 2));
                var g = eL(l, o + 18),
                  B = eL(l, o + 22),
                  v = (function (e, t) {
                    if (t) {
                      for (var r = "", n = 0; n < e.length; n += 16384)
                        r += String.fromCharCode.apply(
                          null,
                          e.subarray(n, n + 16384),
                        );
                      return r;
                    }
                    if (e3) return e3.decode(e);
                    var i = e5(e),
                      a = i[0];
                    if (i[1].length) throw "invalid utf-8 data";
                    return a;
                  })(l.subarray(o + 30, (o += 30 + d)), !(2048 & t));
                (0xffffffff == g
                  ? ((g = (p = i ? [-2] : e7(l, o))[0]), (B = p[1]))
                  : i && (g = -1),
                  (o += f),
                  (h.c = g));
                var x = {
                  name: v,
                  compression: n,
                  start: function () {
                    if (!x.ondata) throw "no callback";
                    if (g) {
                      var e = r.o[n];
                      if (!e) throw "unknown compression type " + n;
                      (m = g < 0 ? new e(v) : new e(v, g, B)).ondata =
                        function (e, t, r) {
                          x.ondata(e, t, r);
                        };
                      for (var t = 0; t < A.length; t++) {
                        var i = A[t];
                        m.push(i, !1);
                      }
                      r.k[0] == A && r.c ? (r.d = m) : m.push(em, !0);
                    } else x.ondata(null, em, !0);
                  },
                  terminate: function () {
                    m && m.terminate && m.terminate();
                  },
                };
                (g >= 0 && ((x.size = g), (x.originalSize = B)), h.onfile(x));
              }
              return "break";
            }
            if (u) {
              if (0x8074b50 == e)
                return (
                  (s = o += 12 + (-2 == u && 8)),
                  (a = 3),
                  (h.c = 0),
                  "break"
                );
              else if (0x2014b50 == e)
                return ((s = o -= 4), (a = 3), (h.c = 0), "break");
            }
          })();
        ++o
      );
      if (((this.p = em), u < 0)) {
        var f = a
          ? l.subarray(
              0,
              s - 12 - (-2 == u && 8) - (0x8074b50 == eL(l, s - 16) && 4),
            )
          : l.subarray(0, o);
        d ? d.push(f, !!a) : this.k[+(2 == a)].push(f);
      }
      if (2 & a) return this.push(l.subarray(o), t);
      this.p = l.subarray(o);
    }
    if (t) {
      if (this.c) throw "invalid zip file";
      this.p = null;
    }
  }),
  (tu.prototype.register = function (e) {
    this.o[e.compression] = e;
  }));
let td = w >= 152;
class th extends R.DataTextureLoader {
  constructor(e) {
    (super(e), (this.type = R.HalfFloatType));
  }
  parse(e) {
    let t = {
      l: 0,
      c: 0,
      lc: 0,
    };
    function r(e, r, n, i, a) {
      for (; n < e; ) ((r = (r << 8) | M(i, a)), (n += 8));
      ((t.l = (r >> (n -= e)) & ((1 << e) - 1)), (t.c = r), (t.lc = n));
    }
    let n = Array(59),
      i = {
        c: 0,
        lc: 0,
      };
    function a(e, t, r, n) {
      ((e = (e << 8) | M(r, n)), (t += 8), (i.c = e), (i.lc = t));
    }
    let o = {
      c: 0,
      lc: 0,
    };
    function s(e, t, r, n, s, l, c, u, d, h) {
      if (e == t) {
        n < 8 && (a(r, n, s, c), (r = i.c), (n = i.lc));
        var f = r >> (n -= 8),
          f = new Uint8Array([f])[0];
        if (d.value + f > h) return !1;
        for (var p = u[d.value - 1]; f-- > 0; ) u[d.value++] = p;
      } else {
        if (!(d.value < h)) return !1;
        u[d.value++] = e;
      }
      ((o.c = r), (o.lc = n));
    }
    function l(e) {
      var t = 65535 & e;
      return t > 32767 ? t - 65536 : t;
    }
    let c = {
      a: 0,
      b: 0,
    };
    function u(e, t) {
      var r = l(e),
        n = l(t),
        i = r + (1 & n) + (n >> 1),
        a = i - n;
      ((c.a = i), (c.b = a));
    }
    function d(e, t) {
      var r = 65535 & t,
        n = ((65535 & e) - (r >> 1)) & 65535;
      ((c.a = (r + n - 32768) & 65535), (c.b = n));
    }
    function h(e, l, c, u, d, h) {
      var f = c.value,
        p = b(l, c),
        m = b(l, c);
      c.value += 4;
      var A = b(l, c);
      if (((c.value += 4), p < 0 || p >= 65537 || m < 0 || m >= 65537))
        throw "Something wrong with HUF_ENCSIZE";
      for (var g = Array(65537), B = Array(16384), v = 0; v < 16384; v++)
        ((B[v] = {}), (B[v].len = 0), (B[v].lit = 0), (B[v].p = null));
      var x = u - (c.value - f);
      if (
        (!(function (e, i, a, o, s, l, c) {
          for (var u = 0, d = 0; s <= l; s++) {
            if (a.value - a.value > o) return !1;
            r(6, u, d, e, a);
            var h = t.l;
            if (((u = t.c), (d = t.lc), (c[s] = h), 63 == h)) {
              if (a.value - a.value > o)
                throw "Something wrong with hufUnpackEncTable";
              r(8, u, d, e, a);
              var f = t.l + 6;
              if (((u = t.c), (d = t.lc), s + f > l + 1))
                throw "Something wrong with hufUnpackEncTable";
              for (; f--; ) c[s++] = 0;
              s--;
            } else if (h >= 59) {
              var f = h - 59 + 2;
              if (s + f > l + 1) throw "Something wrong with hufUnpackEncTable";
              for (; f--; ) c[s++] = 0;
              s--;
            }
          }
          !(function (e) {
            for (var t = 0; t <= 58; ++t) n[t] = 0;
            for (var t = 0; t < 65537; ++t) n[e[t]] += 1;
            for (var r = 0, t = 58; t > 0; --t) {
              var i = (r + n[t]) >> 1;
              ((n[t] = r), (r = i));
            }
            for (var t = 0; t < 65537; ++t) {
              var a = e[t];
              a > 0 && (e[t] = a | (n[a]++ << 6));
            }
          })(c);
        })(e, 0, c, x, p, m, g),
        A > 8 * (u - (c.value - f)))
      )
        throw "Something wrong with hufUncompress";
      (!(function (e, t, r, n) {
        for (; t <= r; t++) {
          var i = e[t] >> 6,
            a = 63 & e[t];
          if (i >> a) throw "Invalid table entry";
          if (a > 14) {
            var o = n[i >> (a - 14)];
            if (o.len) throw "Invalid table entry";
            if ((o.lit++, o.p)) {
              var s = o.p;
              o.p = Array(o.lit);
              for (var l = 0; l < o.lit - 1; ++l) o.p[l] = s[l];
            } else o.p = [,];
            o.p[o.lit - 1] = t;
          } else if (a)
            for (var c = 0, l = 1 << (14 - a); l > 0; l--) {
              var o = n[(i << (14 - a)) + c];
              if (o.len || o.p) throw "Invalid table entry";
              ((o.len = a), (o.lit = t), c++);
            }
        }
      })(g, p, m, B),
        (function (e, t, r, n, l, c, u, d, h, f) {
          for (
            var p = 0, m = 0, A = Math.trunc(l.value + (c + 7) / 8);
            l.value < A;

          )
            for (a(p, m, r, l), p = i.c, m = i.lc; m >= 14; ) {
              var g = t[(p >> (m - 14)) & 16383];
              if (g.len)
                ((m -= g.len),
                  s(g.lit, u, p, m, r, n, l, h, f, d),
                  (p = o.c),
                  (m = o.lc));
              else {
                if (!g.p) throw "hufDecode issues";
                for (B = 0; B < g.lit; B++) {
                  for (var B, v = 63 & e[g.p[B]]; m < v && l.value < A; )
                    (a(p, m, r, l), (p = i.c), (m = i.lc));
                  if (
                    m >= v &&
                    e[g.p[B]] >> 6 == ((p >> (m - v)) & ((1 << v) - 1))
                  ) {
                    ((m -= v),
                      s(g.p[B], u, p, m, r, n, l, h, f, d),
                      (p = o.c),
                      (m = o.lc));
                    break;
                  }
                }
                if (B == g.lit) throw "hufDecode issues";
              }
            }
          var x = (8 - c) & 7;
          for (p >>= x, m -= x; m > 0; ) {
            var g = t[(p << (14 - m)) & 16383];
            if (g.len)
              ((m -= g.len),
                s(g.lit, u, p, m, r, n, l, h, f, d),
                (p = o.c),
                (m = o.lc));
            else throw "hufDecode issues";
          }
        })(g, B, e, l, c, A, m, h, d, {
          value: 0,
        }));
    }
    function f(e) {
      for (var t = 1; t < e.length; t++) {
        var r = e[t - 1] + e[t] - 128;
        e[t] = r;
      }
    }
    function p(e, t) {
      for (
        var r = 0, n = Math.floor((e.length + 1) / 2), i = 0, a = e.length - 1;
        !(i > a) && ((t[i++] = e[r++]), !(i > a));

      ) {
        t[i++] = e[n++];
      }
    }
    function m(e) {
      for (var t = e.byteLength, r = [], n = 0, i = new DataView(e); t > 0; ) {
        var a = i.getInt8(n++);
        if (a < 0) {
          var o = -a;
          t -= o + 1;
          for (var s = 0; s < o; s++) r.push(i.getUint8(n++));
        } else {
          var o = a;
          t -= 2;
          for (var l = i.getUint8(n++), s = 0; s < o + 1; s++) r.push(l);
        }
      }
      return r;
    }
    function A(e) {
      return new DataView(e.array.buffer, e.offset.value, e.size);
    }
    function g(e) {
      var t = new Uint8Array(
          m(e.viewer.buffer.slice(e.offset.value, e.offset.value + e.size)),
        ),
        r = new Uint8Array(t.length);
      return (f(t), p(t, r), new DataView(r.buffer));
    }
    function B(e) {
      var t = e1(e.array.slice(e.offset.value, e.offset.value + e.size)),
        r = new Uint8Array(t.length);
      return (f(t), p(t, r), new DataView(r.buffer));
    }
    function v(e) {
      for (
        var t = e.viewer,
          r = {
            value: e.offset.value,
          },
          n = new Uint16Array(
            e.width * e.scanlineBlockSize * (e.channels * e.type),
          ),
          i = new Uint8Array(8192),
          a = 0,
          o = Array(e.channels),
          s = 0;
        s < e.channels;
        s++
      )
        ((o[s] = {}),
          (o[s].start = a),
          (o[s].end = o[s].start),
          (o[s].nx = e.width),
          (o[s].ny = e.lines),
          (o[s].size = e.type),
          (a += o[s].nx * o[s].ny * o[s].size));
      var l = G(t, r),
        f = G(t, r);
      if (f >= 8192)
        throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
      if (l <= f) for (var s = 0; s < f - l + 1; s++) i[s + l] = E(t, r);
      var p = new Uint16Array(65536),
        m = (function (e, t) {
          for (var r = 0, n = 0; n < 65536; ++n)
            (0 == n || e[n >> 3] & (1 << (7 & n))) && (t[r++] = n);
          for (var i = r - 1; r < 65536; ) t[r++] = 0;
          return i;
        })(i, p),
        A = b(t, r);
      h(e.array, t, r, A, n, a);
      for (var s = 0; s < e.channels; ++s)
        for (var g = o[s], B = 0; B < o[s].size; ++B)
          !(function (e, t, r, n, i, a, o) {
            for (var s = o < 16384, l = r > i ? i : r, h = 1; h <= l; ) h <<= 1;
            for (h >>= 1, f = h, h >>= 1; h >= 1; ) {
              for (
                var f,
                  p,
                  m,
                  A,
                  g,
                  B = 0,
                  v = 0 + a * (i - f),
                  x = a * h,
                  C = a * f,
                  y = n * h,
                  w = n * f;
                B <= v;
                B += C
              ) {
                for (var b = B, M = B + n * (r - f); b <= M; b += w) {
                  var E = b + y,
                    F = b + x,
                    R = F + y;
                  (s
                    ? (u(e[b + t], e[F + t]),
                      (p = c.a),
                      (A = c.b),
                      u(e[E + t], e[R + t]),
                      (m = c.a),
                      (g = c.b),
                      u(p, m),
                      (e[b + t] = c.a),
                      (e[E + t] = c.b),
                      u(A, g))
                    : (d(e[b + t], e[F + t]),
                      (p = c.a),
                      (A = c.b),
                      d(e[E + t], e[R + t]),
                      (m = c.a),
                      (g = c.b),
                      d(p, m),
                      (e[b + t] = c.a),
                      (e[E + t] = c.b),
                      d(A, g)),
                    (e[F + t] = c.a),
                    (e[R + t] = c.b));
                }
                if (r & h) {
                  var F = b + x;
                  (s ? u(e[b + t], e[F + t]) : d(e[b + t], e[F + t]),
                    (p = c.a),
                    (e[F + t] = c.b),
                    (e[b + t] = p));
                }
              }
              if (i & h)
                for (var b = B, M = B + n * (r - f); b <= M; b += w) {
                  var E = b + y;
                  (s ? u(e[b + t], e[E + t]) : d(e[b + t], e[E + t]),
                    (p = c.a),
                    (e[E + t] = c.b),
                    (e[b + t] = p));
                }
              ((f = h), (h >>= 1));
            }
          })(n, g.start + B, g.nx, g.size, g.ny, g.nx * g.size, m);
      for (var v = a, x = 0; x < v; ++x) n[x] = p[n[x]];
      for (
        var C = 0, y = new Uint8Array(n.buffer.byteLength), w = 0;
        w < e.lines;
        w++
      )
        for (var M = 0; M < e.channels; M++) {
          var g = o[M],
            F = g.nx * g.size,
            R = new Uint8Array(n.buffer, 2 * g.end, 2 * F);
          (y.set(R, C), (C += 2 * F), (g.end += F));
        }
      return new DataView(y.buffer);
    }
    function x(e) {
      var t = e1(e.array.slice(e.offset.value, e.offset.value + e.size));
      let r = e.lines * e.channels * e.width,
        n = 1 == e.type ? new Uint16Array(r) : new Uint32Array(r),
        i = 0,
        a = 0,
        o = [, , , ,];
      for (let r = 0; r < e.lines; r++)
        for (let r = 0; r < e.channels; r++) {
          let r = 0;
          switch (e.type) {
            case 1:
              ((o[0] = i), (o[1] = o[0] + e.width), (i = o[1] + e.width));
              for (let i = 0; i < e.width; ++i)
                ((r += (t[o[0]++] << 8) | t[o[1]++]), (n[a] = r), a++);
              break;
            case 2:
              ((o[0] = i),
                (o[1] = o[0] + e.width),
                (o[2] = o[1] + e.width),
                (i = o[2] + e.width));
              for (let i = 0; i < e.width; ++i)
                ((r +=
                  (t[o[0]++] << 24) | (t[o[1]++] << 16) | (t[o[2]++] << 8)),
                  (n[a] = r),
                  a++);
          }
        }
      return new DataView(n.buffer);
    }
    function C(e) {
      var t = e.viewer,
        r = {
          value: e.offset.value,
        },
        n = new Uint8Array(e.width * e.lines * (e.channels * e.type * 2)),
        i = {
          version: F(t, r),
          unknownUncompressedSize: F(t, r),
          unknownCompressedSize: F(t, r),
          acCompressedSize: F(t, r),
          dcCompressedSize: F(t, r),
          rleCompressedSize: F(t, r),
          rleUncompressedSize: F(t, r),
          rleRawSize: F(t, r),
          totalAcUncompressedCount: F(t, r),
          totalDcUncompressedCount: F(t, r),
          acCompression: F(t, r),
        };
      if (i.version < 2)
        throw (
          "EXRLoader.parse: " +
          U.compression +
          " version " +
          i.version +
          " is unsupported"
        );
      for (var a = [], o = G(t, r) - 2; o > 0; ) {
        var s = y(t.buffer, r),
          l = E(t, r),
          c = (l >> 2) & 3,
          u = new Int8Array([(l >> 4) - 1])[0],
          d = E(t, r);
        (a.push({
          name: s,
          index: u,
          type: d,
          compression: c,
        }),
          (o -= s.length + 3));
      }
      for (
        var f = U.channels, p = Array(e.channels), A = 0;
        A < e.channels;
        ++A
      ) {
        var g = (p[A] = {}),
          v = f[A];
        ((g.name = v.name),
          (g.compression = 0),
          (g.decoded = !1),
          (g.type = v.pixelType),
          (g.pLinear = v.pLinear),
          (g.width = e.width),
          (g.height = e.lines));
      }
      for (
        var x = {
            idx: [, , ,],
          },
          C = 0;
        C < e.channels;
        ++C
      )
        for (var g = p[C], A = 0; A < a.length; ++A) {
          var w = a[A];
          g.name == w.name &&
            ((g.compression = w.compression),
            w.index >= 0 && (x.idx[w.index] = C),
            (g.offset = C));
        }
      if (i.acCompressedSize > 0)
        switch (i.acCompression) {
          case 0:
            var b = new Uint16Array(i.totalAcUncompressedCount);
            h(e.array, t, r, i.acCompressedSize, b, i.totalAcUncompressedCount);
            break;
          case 1:
            var M = e.array.slice(
                r.value,
                r.value + i.totalAcUncompressedCount,
              ),
              T = e1(M),
              b = new Uint16Array(T.buffer);
            r.value += i.totalAcUncompressedCount;
        }
      if (i.dcCompressedSize > 0) {
        var D = new Uint16Array(
          B({
            array: e.array,
            offset: r,
            size: i.dcCompressedSize,
          }).buffer,
        );
        r.value += i.dcCompressedSize;
      }
      if (i.rleRawSize > 0) {
        var M = e.array.slice(r.value, r.value + i.rleCompressedSize),
          T = e1(M),
          S = m(T.buffer);
        r.value += i.rleCompressedSize;
      }
      for (var H = 0, L = Array(p.length), A = 0; A < L.length; ++A) L[A] = [];
      for (var P = 0; P < e.lines; ++P)
        for (var O = 0; O < p.length; ++O)
          (L[O].push(H), (H += p[O].width * e.type * 2));
      !(function (e, t, r, n, i, a) {
        var o = new DataView(a.buffer),
          s = r[e.idx[0]].width,
          l = r[e.idx[0]].height,
          c = Math.floor(s / 8),
          u = Math.ceil(s / 8),
          d = Math.ceil(l / 8),
          h = s - (u - 1) * 8,
          f = l - (d - 1) * 8,
          p = {
            value: 0,
          },
          m = [, , ,],
          A = [, , ,],
          g = [, , ,],
          B = [, , ,],
          v = [, , ,];
        for (let r = 0; r < 3; ++r)
          ((v[r] = t[e.idx[r]]),
            (m[r] = r < 1 ? 0 : m[r - 1] + u * d),
            (A[r] = new Float32Array(64)),
            (g[r] = new Uint16Array(64)),
            (B[r] = new Uint16Array(64 * u)));
        for (let t = 0; t < d; ++t) {
          var x,
            C,
            y = 8;
          t == d - 1 && (y = f);
          var w = 8;
          for (let e = 0; e < u; ++e) {
            e == u - 1 && (w = h);
            for (let e = 0; e < 3; ++e) {
              (g[e].fill(0),
                (g[e][0] = i[m[e]++]),
                (function (e, t, r) {
                  for (var n, i = 1; i < 64; )
                    (65280 == (n = t[e.value])
                      ? (i = 64)
                      : n >> 8 == 255
                        ? (i += 255 & n)
                        : ((r[i] = n), i++),
                      e.value++);
                })(p, n, g[e]),
                (x = g[e]),
                ((C = A[e])[0] = I(x[0])),
                (C[1] = I(x[1])),
                (C[2] = I(x[5])),
                (C[3] = I(x[6])),
                (C[4] = I(x[14])),
                (C[5] = I(x[15])),
                (C[6] = I(x[27])),
                (C[7] = I(x[28])),
                (C[8] = I(x[2])),
                (C[9] = I(x[4])),
                (C[10] = I(x[7])),
                (C[11] = I(x[13])),
                (C[12] = I(x[16])),
                (C[13] = I(x[26])),
                (C[14] = I(x[29])),
                (C[15] = I(x[42])),
                (C[16] = I(x[3])),
                (C[17] = I(x[8])),
                (C[18] = I(x[12])),
                (C[19] = I(x[17])),
                (C[20] = I(x[25])),
                (C[21] = I(x[30])),
                (C[22] = I(x[41])),
                (C[23] = I(x[43])),
                (C[24] = I(x[9])),
                (C[25] = I(x[11])),
                (C[26] = I(x[18])),
                (C[27] = I(x[24])),
                (C[28] = I(x[31])),
                (C[29] = I(x[40])),
                (C[30] = I(x[44])),
                (C[31] = I(x[53])),
                (C[32] = I(x[10])),
                (C[33] = I(x[19])),
                (C[34] = I(x[23])),
                (C[35] = I(x[32])),
                (C[36] = I(x[39])),
                (C[37] = I(x[45])),
                (C[38] = I(x[52])),
                (C[39] = I(x[54])),
                (C[40] = I(x[20])),
                (C[41] = I(x[22])),
                (C[42] = I(x[33])),
                (C[43] = I(x[38])),
                (C[44] = I(x[46])),
                (C[45] = I(x[51])),
                (C[46] = I(x[55])),
                (C[47] = I(x[60])),
                (C[48] = I(x[21])),
                (C[49] = I(x[34])),
                (C[50] = I(x[37])),
                (C[51] = I(x[47])),
                (C[52] = I(x[50])),
                (C[53] = I(x[56])),
                (C[54] = I(x[59])),
                (C[55] = I(x[61])),
                (C[56] = I(x[35])),
                (C[57] = I(x[36])),
                (C[58] = I(x[48])),
                (C[59] = I(x[49])),
                (C[60] = I(x[57])),
                (C[61] = I(x[58])),
                (C[62] = I(x[62])),
                (C[63] = I(x[63])),
                (function (e) {
                  let t = 0.5 * Math.cos(3.14159 / 16),
                    r = 0.5 * Math.cos(3.14159 / 8),
                    n = 0.5 * Math.cos((3 * 3.14159) / 16),
                    i = 0.5 * Math.cos((3 * 3.14159) / 8);
                  for (
                    var a = [, , , ,],
                      o = [, , , ,],
                      s = [, , , ,],
                      l = [, , , ,],
                      c = 0;
                    c < 8;
                    ++c
                  ) {
                    var u = 8 * c;
                    ((a[0] = r * e[u + 2]),
                      (a[1] = i * e[u + 2]),
                      (a[2] = r * e[u + 6]),
                      (a[3] = i * e[u + 6]),
                      (o[0] =
                        t * e[u + 1] +
                        n * e[u + 3] +
                        0.2777854612564676 * e[u + 5] +
                        0.09754573032714427 * e[u + 7]),
                      (o[1] =
                        n * e[u + 1] -
                        0.09754573032714427 * e[u + 3] -
                        t * e[u + 5] -
                        0.2777854612564676 * e[u + 7]),
                      (o[2] =
                        0.2777854612564676 * e[u + 1] -
                        t * e[u + 3] +
                        0.09754573032714427 * e[u + 5] +
                        n * e[u + 7]),
                      (o[3] =
                        0.09754573032714427 * e[u + 1] -
                        0.2777854612564676 * e[u + 3] +
                        n * e[u + 5] -
                        t * e[u + 7]),
                      (s[0] = 0.35355362513961314 * (e[u + 0] + e[u + 4])),
                      (s[3] = 0.35355362513961314 * (e[u + 0] - e[u + 4])),
                      (s[1] = a[0] + a[3]),
                      (s[2] = a[1] - a[2]),
                      (l[0] = s[0] + s[1]),
                      (l[1] = s[3] + s[2]),
                      (l[2] = s[3] - s[2]),
                      (l[3] = s[0] - s[1]),
                      (e[u + 0] = l[0] + o[0]),
                      (e[u + 1] = l[1] + o[1]),
                      (e[u + 2] = l[2] + o[2]),
                      (e[u + 3] = l[3] + o[3]),
                      (e[u + 4] = l[3] - o[3]),
                      (e[u + 5] = l[2] - o[2]),
                      (e[u + 6] = l[1] - o[1]),
                      (e[u + 7] = l[0] - o[0]));
                  }
                  for (var d = 0; d < 8; ++d)
                    ((a[0] = r * e[16 + d]),
                      (a[1] = i * e[16 + d]),
                      (a[2] = r * e[48 + d]),
                      (a[3] = i * e[48 + d]),
                      (o[0] =
                        t * e[8 + d] +
                        n * e[24 + d] +
                        0.2777854612564676 * e[40 + d] +
                        0.09754573032714427 * e[56 + d]),
                      (o[1] =
                        n * e[8 + d] -
                        0.09754573032714427 * e[24 + d] -
                        t * e[40 + d] -
                        0.2777854612564676 * e[56 + d]),
                      (o[2] =
                        0.2777854612564676 * e[8 + d] -
                        t * e[24 + d] +
                        0.09754573032714427 * e[40 + d] +
                        n * e[56 + d]),
                      (o[3] =
                        0.09754573032714427 * e[8 + d] -
                        0.2777854612564676 * e[24 + d] +
                        n * e[40 + d] -
                        t * e[56 + d]),
                      (s[0] = 0.35355362513961314 * (e[d] + e[32 + d])),
                      (s[3] = 0.35355362513961314 * (e[d] - e[32 + d])),
                      (s[1] = a[0] + a[3]),
                      (s[2] = a[1] - a[2]),
                      (l[0] = s[0] + s[1]),
                      (l[1] = s[3] + s[2]),
                      (l[2] = s[3] - s[2]),
                      (l[3] = s[0] - s[1]),
                      (e[0 + d] = l[0] + o[0]),
                      (e[8 + d] = l[1] + o[1]),
                      (e[16 + d] = l[2] + o[2]),
                      (e[24 + d] = l[3] + o[3]),
                      (e[32 + d] = l[3] - o[3]),
                      (e[40 + d] = l[2] - o[2]),
                      (e[48 + d] = l[1] - o[1]),
                      (e[56 + d] = l[0] - o[0]));
                })(A[e]));
            }
            for (var b = A, M = 0; M < 64; ++M) {
              var E = b[0][M],
                F = b[1][M],
                T = b[2][M];
              ((b[0][M] = E + 1.5747 * T),
                (b[1][M] = E - 0.1873 * F - 0.4682 * T),
                (b[2][M] = E + 1.8556 * F));
            }
            for (let t = 0; t < 3; ++t)
              !(function (e, t, r) {
                for (var n, i = 0; i < 64; ++i) {
                  t[r + i] = R.DataUtils.toHalfFloat(
                    (n = e[i]) <= 1
                      ? Math.sign(n) * Math.pow(Math.abs(n), 2.2)
                      : Math.sign(n) *
                          Math.pow(9.025013291561939, Math.abs(n) - 1),
                  );
                }
              })(A[t], B[t], 64 * e);
          }
          let a = 0;
          for (let n = 0; n < 3; ++n) {
            let i = r[e.idx[n]].type;
            for (let e = 8 * t; e < 8 * t + y; ++e) {
              a = v[n][e];
              for (let t = 0; t < c; ++t) {
                let r = 64 * t + (7 & e) * 8;
                (o.setUint16(a + 0 * i, B[n][r + 0], !0),
                  o.setUint16(a + 2 * i, B[n][r + 1], !0),
                  o.setUint16(a + 4 * i, B[n][r + 2], !0),
                  o.setUint16(a + 6 * i, B[n][r + 3], !0),
                  o.setUint16(a + 8 * i, B[n][r + 4], !0),
                  o.setUint16(a + 10 * i, B[n][r + 5], !0),
                  o.setUint16(a + 12 * i, B[n][r + 6], !0),
                  o.setUint16(a + 14 * i, B[n][r + 7], !0),
                  (a += 16 * i));
              }
            }
            if (c != u)
              for (let e = 8 * t; e < 8 * t + y; ++e) {
                let t = v[n][e] + 8 * c * 2 * i,
                  r = 64 * c + (7 & e) * 8;
                for (let e = 0; e < w; ++e)
                  o.setUint16(t + 2 * e * i, B[n][r + e], !0);
              }
          }
        }
        for (
          var D = new Uint16Array(s), o = new DataView(a.buffer), G = 0;
          G < 3;
          ++G
        ) {
          r[e.idx[G]].decoded = !0;
          var S = r[e.idx[G]].type;
          if (2 == r[G].type)
            for (var H = 0; H < l; ++H) {
              let e = v[G][H];
              for (var L = 0; L < s; ++L) D[L] = o.getUint16(e + 2 * L * S, !0);
              for (var L = 0; L < s; ++L)
                o.setFloat32(e + 2 * L * S, I(D[L]), !0);
            }
        }
      })(x, L, p, b, D, n);
      for (var A = 0; A < p.length; ++A) {
        var g = p[A];
        if (!g.decoded)
          if (2 === g.compression)
            for (var J = 0, k = 0, P = 0; P < e.lines; ++P) {
              for (var N = L[A][J], _ = 0; _ < g.width; ++_) {
                for (var j = 0; j < 2 * g.type; ++j)
                  n[N++] = S[k + j * g.width * g.height];
                k++;
              }
              J++;
            }
          else throw "EXRLoader.parse: unsupported channel compression";
      }
      return new DataView(n.buffer);
    }
    function y(e, t) {
      for (var r = new Uint8Array(e), n = 0; 0 != r[t.value + n]; ) n += 1;
      var i = new TextDecoder().decode(r.slice(t.value, t.value + n));
      return ((t.value = t.value + n + 1), i);
    }
    function w(e, t) {
      var r = e.getInt32(t.value, !0);
      return ((t.value = t.value + 4), r);
    }
    function b(e, t) {
      var r = e.getUint32(t.value, !0);
      return ((t.value = t.value + 4), r);
    }
    function M(e, t) {
      var r = e[t.value];
      return ((t.value = t.value + 1), r);
    }
    function E(e, t) {
      var r = e.getUint8(t.value);
      return ((t.value = t.value + 1), r);
    }
    let F = function (e, t) {
      let r;
      return (
        (r =
          "getBigInt64" in DataView.prototype
            ? Number(e.getBigInt64(t.value, !0))
            : e.getUint32(t.value + 4, !0) +
              Number(e.getUint32(t.value, !0) << 32)),
        (t.value += 8),
        r
      );
    };
    function T(e, t) {
      var r = e.getFloat32(t.value, !0);
      return ((t.value += 4), r);
    }
    function D(e, t) {
      return R.DataUtils.toHalfFloat(T(e, t));
    }
    function I(e) {
      var t = (31744 & e) >> 10,
        r = 1023 & e;
      return (
        (e >> 15 ? -1 : 1) *
        (t
          ? 31 === t
            ? r
              ? NaN
              : 1 / 0
            : Math.pow(2, t - 15) * (1 + r / 1024)
          : (r / 1024) * 6103515625e-14)
      );
    }
    function G(e, t) {
      var r = e.getUint16(t.value, !0);
      return ((t.value += 2), r);
    }
    function S(e, t) {
      return I(G(e, t));
    }
    let H = new DataView(e),
      L = new Uint8Array(e),
      P = {
        value: 0,
      },
      U = (function (e, t, r) {
        let n = {};
        if (0x1312f76 != e.getUint32(0, !0))
          throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
        n.version = e.getUint8(4);
        let i = e.getUint8(5);
        ((n.spec = {
          singleTile: !!(2 & i),
          longName: !!(4 & i),
          deepFormat: !!(8 & i),
          multiPart: !!(16 & i),
        }),
          (r.value = 8));
        for (var a = !0; a; ) {
          var o = y(t, r);
          if (0 == o) a = !1;
          else {
            var s = y(t, r),
              l = b(e, r),
              c = (function (e, t, r, n, i) {
                var a, o, s, l, c, u, d;
                if (
                  "string" === n ||
                  "stringvector" === n ||
                  "iccProfile" === n
                )
                  return (
                    (a = new TextDecoder().decode(
                      new Uint8Array(t).slice(r.value, r.value + i),
                    )),
                    (r.value = r.value + i),
                    a
                  );
                if ("chlist" === n)
                  return (function (e, t, r, n) {
                    for (var i = r.value, a = []; r.value < i + n - 1; ) {
                      var o = y(t, r),
                        s = w(e, r),
                        l = E(e, r);
                      r.value += 3;
                      var c = w(e, r),
                        u = w(e, r);
                      a.push({
                        name: o,
                        pixelType: s,
                        pLinear: l,
                        xSampling: c,
                        ySampling: u,
                      });
                    }
                    return ((r.value += 1), a);
                  })(e, t, r, i);
                if ("chromaticities" === n)
                  return (
                    (o = T(e, r)),
                    (s = T(e, r)),
                    (l = T(e, r)),
                    (c = T(e, r)),
                    (u = T(e, r)),
                    {
                      redX: o,
                      redY: s,
                      greenX: l,
                      greenY: c,
                      blueX: u,
                      blueY: T(e, r),
                      whiteX: T(e, r),
                      whiteY: T(e, r),
                    }
                  );
                if ("compression" === n)
                  return [
                    "NO_COMPRESSION",
                    "RLE_COMPRESSION",
                    "ZIPS_COMPRESSION",
                    "ZIP_COMPRESSION",
                    "PIZ_COMPRESSION",
                    "PXR24_COMPRESSION",
                    "B44_COMPRESSION",
                    "B44A_COMPRESSION",
                    "DWAA_COMPRESSION",
                    "DWAB_COMPRESSION",
                  ][E(e, r)];
                if ("box2i" === n)
                  return (
                    (d = b(e, r)),
                    {
                      xMin: d,
                      yMin: b(e, r),
                      xMax: b(e, r),
                      yMax: b(e, r),
                    }
                  );
                else if ("lineOrder" === n) return ["INCREASING_Y"][E(e, r)];
                else if ("float" === n) return T(e, r);
                else if ("v2f" === n) return [T(e, r), T(e, r)];
                else if ("v3f" === n) return [T(e, r), T(e, r), T(e, r)];
                else if ("int" === n) return w(e, r);
                else if ("rational" === n) return [w(e, r), b(e, r)];
                else if ("timecode" === n) return [b(e, r), b(e, r)];
                else
                  return "preview" === n
                    ? ((r.value += i), "skipped")
                    : ((r.value += i), void 0);
              })(e, t, r, s, l);
            void 0 === c
              ? console.warn(
                  `EXRLoader.parse: skipped unknown header attribute type '${s}'.`,
                )
              : (n[o] = c);
          }
        }
        if ((-5 & i) != 0)
          throw (
            console.error("EXRHeader:", n),
            "THREE.EXRLoader: provided file is currently unsupported."
          );
        return n;
      })(H, e, P),
      O = (function (e, t, r, n, i) {
        let a = {
          size: 0,
          viewer: t,
          array: r,
          offset: n,
          width: e.dataWindow.xMax - e.dataWindow.xMin + 1,
          height: e.dataWindow.yMax - e.dataWindow.yMin + 1,
          channels: e.channels.length,
          bytesPerLine: null,
          lines: null,
          inputSize: null,
          type: e.channels[0].pixelType,
          uncompress: null,
          getter: null,
          format: null,
          [td ? "colorSpace" : "encoding"]: null,
        };
        switch (e.compression) {
          case "NO_COMPRESSION":
            ((a.lines = 1), (a.uncompress = A));
            break;
          case "RLE_COMPRESSION":
            ((a.lines = 1), (a.uncompress = g));
            break;
          case "ZIPS_COMPRESSION":
            ((a.lines = 1), (a.uncompress = B));
            break;
          case "ZIP_COMPRESSION":
            ((a.lines = 16), (a.uncompress = B));
            break;
          case "PIZ_COMPRESSION":
            ((a.lines = 32), (a.uncompress = v));
            break;
          case "PXR24_COMPRESSION":
            ((a.lines = 16), (a.uncompress = x));
            break;
          case "DWAA_COMPRESSION":
            ((a.lines = 32), (a.uncompress = C));
            break;
          case "DWAB_COMPRESSION":
            ((a.lines = 256), (a.uncompress = C));
            break;
          default:
            throw "EXRLoader.parse: " + e.compression + " is unsupported";
        }
        if (((a.scanlineBlockSize = a.lines), 1 == a.type))
          switch (i) {
            case R.FloatType:
              ((a.getter = S), (a.inputSize = 2));
              break;
            case R.HalfFloatType:
              ((a.getter = G), (a.inputSize = 2));
          }
        else if (2 == a.type)
          switch (i) {
            case R.FloatType:
              ((a.getter = T), (a.inputSize = 4));
              break;
            case R.HalfFloatType:
              ((a.getter = D), (a.inputSize = 4));
          }
        else
          throw (
            "EXRLoader.parse: unsupported pixelType " +
            a.type +
            " for " +
            e.compression +
            "."
          );
        a.blockCount = (e.dataWindow.yMax + 1) / a.scanlineBlockSize;
        for (var o = 0; o < a.blockCount; o++) F(t, n);
        a.outputChannels = 3 == a.channels ? 4 : a.channels;
        let s = a.width * a.height * a.outputChannels;
        switch (i) {
          case R.FloatType:
            ((a.byteArray = new Float32Array(s)),
              a.channels < a.outputChannels && a.byteArray.fill(1, 0, s));
            break;
          case R.HalfFloatType:
            ((a.byteArray = new Uint16Array(s)),
              a.channels < a.outputChannels && a.byteArray.fill(15360, 0, s));
            break;
          default:
            console.error("THREE.EXRLoader: unsupported type: ", i);
        }
        return (
          (a.bytesPerLine = a.width * a.inputSize * a.channels),
          4 == a.outputChannels
            ? (a.format = R.RGBAFormat)
            : (a.format = R.RedFormat),
          td ? (a.colorSpace = "srgb-linear") : (a.encoding = 3e3),
          a
        );
      })(U, H, L, P, this.type),
      J = {
        value: 0,
      },
      k = {
        R: 0,
        G: 1,
        B: 2,
        A: 3,
        Y: 0,
      };
    for (let e = 0; e < O.height / O.scanlineBlockSize; e++) {
      let t = b(H, P);
      ((O.size = b(H, P)),
        (O.lines =
          t + O.scanlineBlockSize > O.height
            ? O.height - t
            : O.scanlineBlockSize));
      let r = O.size < O.lines * O.bytesPerLine ? O.uncompress(O) : A(O);
      P.value += O.size;
      for (let t = 0; t < O.scanlineBlockSize; t++) {
        let n = t + e * O.scanlineBlockSize;
        if (n >= O.height) break;
        for (let e = 0; e < O.channels; e++) {
          let i = k[U.channels[e].name];
          for (let a = 0; a < O.width; a++) {
            J.value =
              (t * (O.channels * O.width) + e * O.width + a) * O.inputSize;
            let o =
              (O.height - 1 - n) * (O.width * O.outputChannels) +
              a * O.outputChannels +
              i;
            O.byteArray[o] = O.getter(r, J);
          }
        }
      }
    }
    return {
      header: U,
      width: O.width,
      height: O.height,
      data: O.byteArray,
      format: O.format,
      [td ? "colorSpace" : "encoding"]: O[td ? "colorSpace" : "encoding"],
      type: this.type,
    };
  }
  setDataType(e) {
    return ((this.type = e), this);
  }
  load(e, t, r, n) {
    return super.load(
      e,
      function (e, r) {
        (td ? (e.colorSpace = r.colorSpace) : (e.encoding = r.encoding),
          (e.minFilter = R.LinearFilter),
          (e.magFilter = R.LinearFilter),
          (e.generateMipmaps = !1),
          (e.flipY = !1),
          t && t(e, r));
      },
      r,
      n,
    );
  }
}
let tp = (e, t, r) => {
  let n;
  switch (e) {
    case THREE.UnsignedByteType:
      n = new Uint8ClampedArray(t * r * 4);
      break;
    case THREE.HalfFloatType:
      n = new Uint16Array(t * r * 4);
      break;
    case THREE.UnsignedIntType:
      n = new Uint32Array(t * r * 4);
      break;
    case THREE.ByteType:
      n = new Int8Array(t * r * 4);
      break;
    case THREE.ShortType:
      n = new Int16Array(t * r * 4);
      break;
    case THREE.IntType:
      n = new Int32Array(t * r * 4);
      break;
    case THREE.FloatType:
      n = new Float32Array(t * r * 4);
      break;
    default:
      throw Error("Unsupported data type");
  }
  return n;
};
class tm {
  _renderer;
  _rendererIsDisposable = !1;
  _material;
  _scene;
  _camera;
  _quad;
  _renderTarget;
  _width;
  _height;
  _type;
  _colorSpace;
  _supportsReadPixels = !0;
  constructor(e) {
    ((this._width = e.width),
      (this._height = e.height),
      (this._type = e.type),
      (this._colorSpace = e.colorSpace));
    const r = {
      format: THREE.RGBAFormat,
      depthBuffer: !1,
      stencilBuffer: !1,
      type: this._type,
      colorSpace: this._colorSpace,
      anisotropy:
        e.renderTargetOptions?.anisotropy !== void 0
          ? e.renderTargetOptions?.anisotropy
          : 1,
      generateMipmaps:
        e.renderTargetOptions?.generateMipmaps !== void 0 &&
        e.renderTargetOptions?.generateMipmaps,
      magFilter:
        e.renderTargetOptions?.magFilter !== void 0
          ? e.renderTargetOptions?.magFilter
          : THREE.LinearFilter,
      minFilter:
        e.renderTargetOptions?.minFilter !== void 0
          ? e.renderTargetOptions?.minFilter
          : THREE.LinearFilter,
      samples:
        e.renderTargetOptions?.samples !== void 0
          ? e.renderTargetOptions?.samples
          : void 0,
      wrapS:
        e.renderTargetOptions?.wrapS !== void 0
          ? e.renderTargetOptions?.wrapS
          : THREE.ClampToEdgeWrapping,
      wrapT:
        e.renderTargetOptions?.wrapT !== void 0
          ? e.renderTargetOptions?.wrapT
          : THREE.ClampToEdgeWrapping,
    };
    if (
      ((this._material = e.material),
      e.renderer
        ? (this._renderer = e.renderer)
        : ((this._renderer = tm.instantiateRenderer()),
          (this._rendererIsDisposable = !0)),
      (this._scene = new THREE.Scene()),
      (this._camera = new THREE.OrthographicCamera()),
      this._camera.position.set(0, 0, 10),
      (this._camera.left = -0.5),
      (this._camera.right = 0.5),
      (this._camera.top = 0.5),
      (this._camera.bottom = -0.5),
      this._camera.updateProjectionMatrix(),
      !((e, r, n, i) => {
        if (void 0 !== t) return t;
        let a = new THREE.WebGLRenderTarget(1, 1, i);
        r.setRenderTarget(a);
        let o = new THREE.Mesh(
          new THREE.PlaneGeometry(),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
          }),
        );
        (r.render(o, n), r.setRenderTarget(null));
        let s = tp(e, a.width, a.height);
        return (
          r.readRenderTargetPixels(a, 0, 0, a.width, a.height, s),
          a.dispose(),
          o.geometry.dispose(),
          o.material.dispose(),
          (t = 0 !== s[0])
        );
      })(this._type, this._renderer, this._camera, r))
    ) {
      let e;
      (this._type === THREE.HalfFloatType &&
        (e = this._renderer.extensions.has("EXT_color_buffer_float")
          ? THREE.FloatType
          : void 0),
        void 0 !== e
          ? (console.warn(
              `This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${THREE.FloatType}`,
            ),
            (this._type = e))
          : ((this._supportsReadPixels = !1),
            console.warn(
              "This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown",
            )));
    }
    ((this._quad = new THREE.Mesh(new THREE.PlaneGeometry(), this._material)),
      this._quad.geometry.computeBoundingBox(),
      this._scene.add(this._quad),
      (this._renderTarget = new THREE.WebGLRenderTarget(
        this.width,
        this.height,
        r,
      )),
      (this._renderTarget.texture.mapping =
        e.renderTargetOptions?.mapping !== void 0
          ? e.renderTargetOptions?.mapping
          : THREE.UVMapping));
  }
  static instantiateRenderer() {
    let e = new threeRenderer.WebGLRenderer();
    return (e.setSize(128, 128), e);
  }
  render = () => {
    this._renderer.setRenderTarget(this._renderTarget);
    try {
      this._renderer.render(this._scene, this._camera);
    } catch (e) {
      throw (this._renderer.setRenderTarget(null), e);
    }
    this._renderer.setRenderTarget(null);
  };
  toArray() {
    if (!this._supportsReadPixels)
      throw Error("Can't read pixels in this browser");
    let e = tp(this._type, this._width, this._height);
    return (
      this._renderer.readRenderTargetPixels(
        this._renderTarget,
        0,
        0,
        this._width,
        this._height,
        e,
      ),
      e
    );
  }
  toDataTexture(e) {
    let t = new THREE.DataTexture(
      this.toArray(),
      this.width,
      this.height,
      THREE.RGBAFormat,
      this._type,
      e?.mapping || THREE.UVMapping,
      e?.wrapS || THREE.ClampToEdgeWrapping,
      e?.wrapT || THREE.ClampToEdgeWrapping,
      e?.magFilter || THREE.LinearFilter,
      e?.minFilter || THREE.LinearFilter,
      e?.anisotropy || 1,
      THREE.LinearSRGBColorSpace,
    );
    return (
      (t.generateMipmaps = e?.generateMipmaps !== void 0 && e?.generateMipmaps),
      t
    );
  }
  disposeOnDemandRenderer() {
    (this._renderer.setRenderTarget(null),
      this._rendererIsDisposable &&
        (this._renderer.dispose(), this._renderer.forceContextLoss()));
  }
  dispose(e) {
    (this.disposeOnDemandRenderer(),
      e && this.renderTarget.dispose(),
      this.material instanceof THREE.ShaderMaterial &&
        Object.values(this.material.uniforms).forEach((e) => {
          e.value instanceof THREE.Texture && e.value.dispose();
        }),
      Object.values(this.material).forEach((e) => {
        e instanceof THREE.Texture && e.dispose();
      }),
      this.material.dispose(),
      this._quad.geometry.dispose());
  }
  get width() {
    return this._width;
  }
  set width(e) {
    ((this._width = e), this._renderTarget.setSize(this._width, this._height));
  }
  get height() {
    return this._height;
  }
  set height(e) {
    ((this._height = e), this._renderTarget.setSize(this._width, this._height));
  }
  get renderer() {
    return this._renderer;
  }
  get renderTarget() {
    return this._renderTarget;
  }
  set renderTarget(e) {
    ((this._renderTarget = e),
      (this._width = e.width),
      (this._height = e.height));
  }
  get material() {
    return this._material;
  }
  get type() {
    return this._type;
  }
  get colorSpace() {
    return this._colorSpace;
  }
}
var tA = THREE;
class tg extends Error {}
class tB extends Error {}
let tv = (e, t, r) => {
  let n = RegExp(`${t}="([^"]*)"`, "i").exec(e);
  if (n) return n[1];
  let i = RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`, "i").exec(e);
  if (i) {
    let e = i[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);
    return e && 3 === e.length
      ? e.map((e) => e.replace(/<\/?rdf:li>/g, ""))
      : i[1].trim();
  }
  if (void 0 !== r) return r;
  throw Error(`Can't find ${t} in gainmap metadata`);
};
class tx {
  options;
  constructor(e) {
    this.options = {
      debug: !!e && void 0 !== e.debug && e.debug,
      extractFII: !e || void 0 === e.extractFII || e.extractFII,
      extractNonFII: !e || void 0 === e.extractNonFII || e.extractNonFII,
    };
  }
  extract(e) {
    return new Promise((t, r) => {
      let n,
        i = this.options.debug,
        a = new DataView(e.buffer);
      if (65496 !== a.getUint16(0)) return void r(Error("Not a valid jpeg"));
      let o = a.byteLength,
        s = 2,
        l = 0;
      for (; s < o; ) {
        if (++l > 250)
          return void r(Error(`Found no marker after ${l} loops 😵`));
        if (255 !== a.getUint8(s))
          return void r(
            Error(
              `Not a valid marker at offset 0x${s.toString(16)}, found: 0x${a.getUint8(s).toString(16)}`,
            ),
          );
        if (
          ((n = a.getUint8(s + 1)),
          i && console.log(`Marker: ${n.toString(16)}`),
          226 === n)
        ) {
          i && console.log("Found APP2 marker (0xffe2)");
          let e = s + 4;
          if (0x4d504600 === a.getUint32(e)) {
            let n,
              i = e + 4;
            if (18761 === a.getUint16(i)) n = !1;
            else {
              if (19789 !== a.getUint16(i))
                return void r(
                  Error("No valid endianness marker found in TIFF header"),
                );
              n = !0;
            }
            if (42 !== a.getUint16(i + 2, !n))
              return void r(Error("Not valid TIFF data! (no 0x002A marker)"));
            let o = a.getUint32(i + 4, !n);
            if (o < 8)
              return void r(
                Error("Not valid TIFF data! (First offset less than 8)"),
              );
            let s = i + o,
              l = a.getUint16(s, !n),
              c = s + 2,
              u = 0;
            for (let e = c; e < c + 12 * l; e += 12)
              45057 === a.getUint16(e, !n) && (u = a.getUint32(e + 8, !n));
            let d = s + 2 + 12 * l + 4,
              h = [];
            for (let e = d; e < d + 16 * u; e += 16) {
              let t = {
                MPType: a.getUint32(e, !n),
                size: a.getUint32(e + 4, !n),
                dataOffset: a.getUint32(e + 8, !n),
                dependantImages: a.getUint32(e + 12, !n),
                start: -1,
                end: -1,
                isFII: !1,
              };
              (t.dataOffset
                ? ((t.start = i + t.dataOffset), (t.isFII = !1))
                : ((t.start = 0), (t.isFII = !0)),
                (t.end = t.start + t.size),
                h.push(t));
            }
            if (this.options.extractNonFII && h.length) {
              let e = new Blob([a]),
                r = [];
              for (let t of h) {
                if (t.isFII && !this.options.extractFII) continue;
                let n = e.slice(t.start, t.end + 1, "image/jpeg");
                r.push(n);
              }
              t(r);
            }
          }
        }
        s += 2 + a.getUint16(s + 2);
      }
    });
  }
}
let tC = async (e) => {
    let t = ((e) => {
      let t,
        r = (t =
          "undefined" != typeof TextDecoder
            ? new TextDecoder().decode(e)
            : e.toString()).indexOf("<x:xmpmeta");
      for (; -1 !== r; ) {
        let e = t.indexOf("x:xmpmeta>", r),
          n = t.slice(r, e + 10);
        try {
          let e = tv(n, "hdrgm:GainMapMin", "0"),
            t = tv(n, "hdrgm:GainMapMax"),
            r = tv(n, "hdrgm:Gamma", "1"),
            i = tv(n, "hdrgm:OffsetSDR", "0.015625"),
            a = tv(n, "hdrgm:OffsetHDR", "0.015625"),
            o = /hdrgm:HDRCapacityMin="([^"]*)"/.exec(n),
            s = o ? o[1] : "0",
            l = /hdrgm:HDRCapacityMax="([^"]*)"/.exec(n);
          if (!l) throw Error("Incomplete gainmap metadata");
          let c = l[1];
          return {
            gainMapMin: Array.isArray(e)
              ? e.map((e) => parseFloat(e))
              : [parseFloat(e), parseFloat(e), parseFloat(e)],
            gainMapMax: Array.isArray(t)
              ? t.map((e) => parseFloat(e))
              : [parseFloat(t), parseFloat(t), parseFloat(t)],
            gamma: Array.isArray(r)
              ? r.map((e) => parseFloat(e))
              : [parseFloat(r), parseFloat(r), parseFloat(r)],
            offsetSdr: Array.isArray(i)
              ? i.map((e) => parseFloat(e))
              : [parseFloat(i), parseFloat(i), parseFloat(i)],
            offsetHdr: Array.isArray(a)
              ? a.map((e) => parseFloat(e))
              : [parseFloat(a), parseFloat(a), parseFloat(a)],
            hdrCapacityMin: parseFloat(s),
            hdrCapacityMax: parseFloat(c),
          };
        } catch (e) {}
        r = t.indexOf("<x:xmpmeta", e);
      }
    })(e);
    if (!t) throw new tB("Gain map XMP metadata not found");
    let r = new tx({
        extractFII: !0,
        extractNonFII: !0,
      }),
      n = await r.extract(e);
    if (2 !== n.length) throw new tg("Gain map recovery image not found");
    return {
      sdr: new Uint8Array(await n[0].arrayBuffer()),
      gainMap: new Uint8Array(await n[1].arrayBuffer()),
      metadata: t,
    };
  },
  ty = (e) =>
    new Promise((t, r) => {
      let n = document.createElement("img");
      ((n.onload = () => {
        t(n);
      }),
        (n.onerror = (e) => {
          r(e);
        }),
        (n.src = URL.createObjectURL(e)));
    });
class tw extends tA.Loader {
  _renderer;
  _renderTargetOptions;
  _internalLoadingManager;
  _config;
  constructor(e, t) {
    (super(t),
      (this._config = e),
      e.renderer && (this._renderer = e.renderer),
      (this._internalLoadingManager = new tA.LoadingManager()));
  }
  setRenderer(e) {
    return ((this._renderer = e), this);
  }
  setRenderTargetOptions(e) {
    return ((this._renderTargetOptions = e), this);
  }
  prepareQuadRenderer() {
    this._renderer ||
      console.warn(
        "WARNING: A Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.",
      );
    let e = this._config.createMaterial({
      gainMapMax: [1, 1, 1],
      gainMapMin: [0, 0, 0],
      gamma: [1, 1, 1],
      offsetHdr: [1, 1, 1],
      offsetSdr: [1, 1, 1],
      hdrCapacityMax: 1,
      hdrCapacityMin: 0,
      maxDisplayBoost: 1,
      gainMap: new tA.Texture(),
      sdr: new tA.Texture(),
    });
    return this._config.createQuadRenderer({
      width: 16,
      height: 16,
      type: tA.HalfFloatType,
      colorSpace: tA.LinearSRGBColorSpace,
      material: e,
      renderer: this._renderer,
      renderTargetOptions: this._renderTargetOptions,
    });
  }
  async processImages(e, t, r) {
    let n,
      i,
      a = t
        ? new Blob([t], {
            type: "image/jpeg",
          })
        : void 0,
      o = new Blob([e], {
        type: "image/jpeg",
      }),
      s = !1;
    if ("undefined" == typeof createImageBitmap) {
      let e = await Promise.all([a ? ty(a) : Promise.resolve(void 0), ty(o)]);
      ((i = e[0]), (n = e[1]), (s = "flipY" === r));
    } else {
      let e = await Promise.all([
        a
          ? createImageBitmap(a, {
              imageOrientation: r || "flipY",
            })
          : Promise.resolve(void 0),
        createImageBitmap(o, {
          imageOrientation: r || "flipY",
        }),
      ]);
      ((i = e[0]), (n = e[1]));
    }
    return {
      sdrImage: n,
      gainMapImage: i,
      needsFlip: s,
    };
  }
  createTextures(e, t, r) {
    let n = new tA.Texture(
      t || new ImageData(2, 2),
      tA.UVMapping,
      tA.ClampToEdgeWrapping,
      tA.ClampToEdgeWrapping,
      tA.LinearFilter,
      tA.LinearMipMapLinearFilter,
      tA.RGBAFormat,
      tA.UnsignedByteType,
      1,
      tA.LinearSRGBColorSpace,
    );
    ((n.flipY = r), (n.needsUpdate = !0));
    let i = new tA.Texture(
      e,
      tA.UVMapping,
      tA.ClampToEdgeWrapping,
      tA.ClampToEdgeWrapping,
      tA.LinearFilter,
      tA.LinearMipMapLinearFilter,
      tA.RGBAFormat,
      tA.UnsignedByteType,
      1,
      tA.SRGBColorSpace,
    );
    return (
      (i.flipY = r),
      (i.needsUpdate = !0),
      {
        gainMap: n,
        sdr: i,
      }
    );
  }
  updateQuadRenderer(e, t, r, n, i) {
    ((e.width = t.width),
      (e.height = t.height),
      (e.material.gainMap = r),
      (e.material.sdr = n),
      (e.material.gainMapMin = i.gainMapMin),
      (e.material.gainMapMax = i.gainMapMax),
      (e.material.offsetHdr = i.offsetHdr),
      (e.material.offsetSdr = i.offsetSdr),
      (e.material.gamma = i.gamma),
      (e.material.hdrCapacityMin = i.hdrCapacityMin),
      (e.material.hdrCapacityMax = i.hdrCapacityMax),
      (e.material.maxDisplayBoost = Math.pow(2, i.hdrCapacityMax)),
      (e.material.needsUpdate = !0));
  }
}
var tb = THREE;
let tM = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  tE = `
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`;
class tF extends tb.ShaderMaterial {
  _maxDisplayBoost;
  _hdrCapacityMin;
  _hdrCapacityMax;
  constructor({
    gamma: e,
    offsetHdr: t,
    offsetSdr: r,
    gainMapMin: n,
    gainMapMax: i,
    maxDisplayBoost: a,
    hdrCapacityMin: o,
    hdrCapacityMax: s,
    sdr: l,
    gainMap: c,
  }) {
    (super({
      name: "GainMapDecoderMaterial",
      vertexShader: tM,
      fragmentShader: tE,
      uniforms: {
        sdr: {
          value: l,
        },
        gainMap: {
          value: c,
        },
        gamma: {
          value: new tb.Vector3(1 / e[0], 1 / e[1], 1 / e[2]),
        },
        offsetHdr: {
          value: new tb.Vector3().fromArray(t),
        },
        offsetSdr: {
          value: new tb.Vector3().fromArray(r),
        },
        gainMapMin: {
          value: new tb.Vector3().fromArray(n),
        },
        gainMapMax: {
          value: new tb.Vector3().fromArray(i),
        },
        weightFactor: {
          value: (Math.log2(a) - o) / (s - o),
        },
      },
      blending: tb.NoBlending,
      depthTest: !1,
      depthWrite: !1,
    }),
      (this._maxDisplayBoost = a),
      (this._hdrCapacityMin = o),
      (this._hdrCapacityMax = s),
      (this.needsUpdate = !0),
      (this.uniformsNeedUpdate = !0));
  }
  get sdr() {
    return this.uniforms.sdr.value;
  }
  set sdr(e) {
    this.uniforms.sdr.value = e;
  }
  get gainMap() {
    return this.uniforms.gainMap.value;
  }
  set gainMap(e) {
    this.uniforms.gainMap.value = e;
  }
  get offsetHdr() {
    return this.uniforms.offsetHdr.value.toArray();
  }
  set offsetHdr(e) {
    this.uniforms.offsetHdr.value.fromArray(e);
  }
  get offsetSdr() {
    return this.uniforms.offsetSdr.value.toArray();
  }
  set offsetSdr(e) {
    this.uniforms.offsetSdr.value.fromArray(e);
  }
  get gainMapMin() {
    return this.uniforms.gainMapMin.value.toArray();
  }
  set gainMapMin(e) {
    this.uniforms.gainMapMin.value.fromArray(e);
  }
  get gainMapMax() {
    return this.uniforms.gainMapMax.value.toArray();
  }
  set gainMapMax(e) {
    this.uniforms.gainMapMax.value.fromArray(e);
  }
  get gamma() {
    let e = this.uniforms.gamma.value;
    return [1 / e.x, 1 / e.y, 1 / e.z];
  }
  set gamma(e) {
    let t = this.uniforms.gamma.value;
    ((t.x = 1 / e[0]), (t.y = 1 / e[1]), (t.z = 1 / e[2]));
  }
  get hdrCapacityMin() {
    return this._hdrCapacityMin;
  }
  set hdrCapacityMin(e) {
    ((this._hdrCapacityMin = e), this.calculateWeight());
  }
  get hdrCapacityMax() {
    return this._hdrCapacityMax;
  }
  set hdrCapacityMax(e) {
    ((this._hdrCapacityMax = e), this.calculateWeight());
  }
  get maxDisplayBoost() {
    return this._maxDisplayBoost;
  }
  set maxDisplayBoost(e) {
    ((this._maxDisplayBoost = Math.max(1, Math.min(65504, e))),
      this.calculateWeight());
  }
  calculateWeight() {
    let e =
      (Math.log2(this._maxDisplayBoost) - this._hdrCapacityMin) /
      (this._hdrCapacityMax - this._hdrCapacityMin);
    this.uniforms.weightFactor.value = Math.max(0, Math.min(1, e));
  }
}
((n = {
  renderer: threeRenderer.WebGLRenderer,
  createMaterial: (e) => new tF(e),
  createQuadRenderer: (e) => new tm(e),
}),
  (e) => {
    let { sdr: t, gainMap: r, renderer: i } = e;
    (t.colorSpace !== tA.SRGBColorSpace &&
      (console.warn(
        "SDR Colorspace needs to be *SRGBColorSpace*, setting it automatically",
      ),
      (t.colorSpace = tA.SRGBColorSpace)),
      (t.needsUpdate = !0),
      r.colorSpace !== tA.LinearSRGBColorSpace &&
        (console.warn(
          "Gainmap Colorspace needs to be *LinearSRGBColorSpace*, setting it automatically",
        ),
        (r.colorSpace = tA.LinearSRGBColorSpace)),
      (r.needsUpdate = !0));
    let a = n.createMaterial({
      ...e,
      sdr: t,
      gainMap: r,
    });
    return n.createQuadRenderer({
      width: t.image.width,
      height: t.image.height,
      type: tA.HalfFloatType,
      colorSpace: tA.LinearSRGBColorSpace,
      material: a,
      renderer: i,
      renderTargetOptions: e.renderTargetOptions,
    });
  });
class tR extends tw {
  constructor(e, t) {
    super(
      {
        renderer: e,
        createMaterial: (e) => new tF(e),
        createQuadRenderer: (e) => new tm(e),
      },
      t,
    );
  }
  async render(e, t, r, n) {
    let {
        sdrImage: i,
        gainMapImage: a,
        needsFlip: o,
      } = await this.processImages(r, n, "flipY"),
      { gainMap: s, sdr: l } = this.createTextures(i, a, o);
    (this.updateQuadRenderer(e, i, s, l, t), e.render());
  }
}
class tT extends tR {
  load([e, t, r], n, i, a) {
    let o,
      s,
      l,
      c = this.prepareQuadRenderer(),
      u = async () => {
        if (o && s && l) {
          try {
            await this.render(c, l, o, s);
          } catch (n) {
            (this.manager.itemError(e),
              this.manager.itemError(t),
              this.manager.itemError(r),
              "function" == typeof a && a(n),
              c.disposeOnDemandRenderer());
            return;
          }
          ("function" == typeof n && n(c),
            this.manager.itemEnd(e),
            this.manager.itemEnd(t),
            this.manager.itemEnd(r),
            c.disposeOnDemandRenderer());
        }
      },
      d = !0,
      h = 0,
      f = 0,
      p = !0,
      m = 0,
      A = 0,
      g = !0,
      B = 0,
      v = 0,
      x = () => {
        "function" == typeof i &&
          i(
            new ProgressEvent("progress", {
              lengthComputable: d && p && g,
              loaded: f + A + v,
              total: h + m + B,
            }),
          );
      };
    (this.manager.itemStart(e),
      this.manager.itemStart(t),
      this.manager.itemStart(r));
    let C = new tb.FileLoader(this._internalLoadingManager);
    (C.setResponseType("arraybuffer"),
      C.setRequestHeader(this.requestHeader),
      C.setPath(this.path),
      C.setWithCredentials(this.withCredentials),
      C.load(
        e,
        async (e) => {
          if ("string" == typeof e) throw Error("Invalid sdr buffer");
          ((o = e), await u());
        },
        (e) => {
          ((d = e.lengthComputable), (f = e.loaded), (h = e.total), x());
        },
        (t) => {
          (this.manager.itemError(e), "function" == typeof a && a(t));
        },
      ));
    let y = new tb.FileLoader(this._internalLoadingManager);
    (y.setResponseType("arraybuffer"),
      y.setRequestHeader(this.requestHeader),
      y.setPath(this.path),
      y.setWithCredentials(this.withCredentials),
      y.load(
        t,
        async (e) => {
          if ("string" == typeof e) throw Error("Invalid gainmap buffer");
          ((s = e), await u());
        },
        (e) => {
          ((p = e.lengthComputable), (A = e.loaded), (m = e.total), x());
        },
        (e) => {
          (this.manager.itemError(t), "function" == typeof a && a(e));
        },
      ));
    let w = new tb.FileLoader(this._internalLoadingManager);
    return (
      w.setRequestHeader(this.requestHeader),
      w.setPath(this.path),
      w.setWithCredentials(this.withCredentials),
      w.load(
        r,
        async (e) => {
          if ("string" != typeof e) throw Error("Invalid metadata string");
          ((l = JSON.parse(e)), await u());
        },
        (e) => {
          ((g = e.lengthComputable), (v = e.loaded), (B = e.total), x());
        },
        (e) => {
          (this.manager.itemError(r), "function" == typeof a && a(e));
        },
      ),
      c
    );
  }
}
class tD extends tR {
  load(e, t, r, n) {
    let i = this.prepareQuadRenderer(),
      a = new tb.FileLoader(this._internalLoadingManager);
    return (
      a.setResponseType("arraybuffer"),
      a.setRequestHeader(this.requestHeader),
      a.setPath(this.path),
      a.setWithCredentials(this.withCredentials),
      this.manager.itemStart(e),
      a.load(
        e,
        async (r) => {
          let a, o, s;
          if ("string" == typeof r)
            throw Error(
              "Invalid buffer, received [string], was expecting [ArrayBuffer]",
            );
          let l = new Uint8Array(r);
          try {
            let e = await tC(l);
            ((a = e.sdr), (o = e.gainMap), (s = e.metadata));
          } catch (t) {
            if (t instanceof tB || t instanceof tg)
              (console.warn(
                `Failure to reconstruct an HDR image from ${e}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`,
              ),
                (s = {
                  gainMapMin: [0, 0, 0],
                  gainMapMax: [1, 1, 1],
                  gamma: [1, 1, 1],
                  hdrCapacityMin: 0,
                  hdrCapacityMax: 1,
                  offsetHdr: [0, 0, 0],
                  offsetSdr: [0, 0, 0],
                }),
                (a = l));
            else throw t;
          }
          try {
            await this.render(i, s, a.buffer, o?.buffer);
          } catch (t) {
            (this.manager.itemError(e),
              "function" == typeof n && n(t),
              i.disposeOnDemandRenderer());
            return;
          }
          ("function" == typeof t && t(i),
            this.manager.itemEnd(e),
            i.disposeOnDemandRenderer());
        },
        r,
        (t) => {
          (this.manager.itemError(e), "function" == typeof n && n(t));
        },
      ),
      i
    );
  }
}
let tI = {
    apartment: "lebombo_1k.hdr",
    city: "potsdamer_platz_1k.hdr",
    dawn: "kiara_1_dawn_1k.hdr",
    forest: "forest_slope_1k.hdr",
    lobby: "st_fagans_interior_1k.hdr",
    night: "dikhololo_night_1k.hdr",
    park: "rooitou_park_1k.hdr",
    studio: "studio_small_03_1k.hdr",
    sunset: "venice_sunset_1k.hdr",
    warehouse: "empty_warehouse_01_1k.hdr",
  },
  tG =
    "https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/",
  tS = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"];
function tH({
  files: e = tS,
  path: t = "",
  preset: r,
  colorSpace: n,
  extensions: i,
} = {}) {
  r && (tU(r), (e = tI[r]), (t = tG));
  let o = Array.isArray(e),
    { extension: s, isCubemap: l } = tO(e),
    c = tJ(s);
  if (!c) throw Error("useEnvironment: Unrecognized file extension: " + e);
  let u = (0, fiberHooks.useThree)((e) => e.gl);
  (0, React.useLayoutEffect)(() => {
    ("webp" === s || "jpg" === s || "jpeg" === s) &&
      u.domElement.addEventListener(
        "webglcontextlost",
        function () {
          dependency971.useLoader.clear(c, o ? [e] : e);
        },
        {
          once: !0,
        },
      );
  }, [e, u.domElement]);
  let d = (0, dependency971.useLoader)(c, o ? [e] : e, (e) => {
      (("webp" === s || "jpg" === s || "jpeg" === s) && e.setRenderer(u),
        null == e.setPath || e.setPath(t),
        i && i(e));
    }),
    h = o ? d[0] : d;
  if ("jpg" === s || "jpeg" === s || "webp" === s) {
    var f;
    h = null == (f = h.renderTarget) ? void 0 : f.texture;
  }
  return (
    (h.mapping = l
      ? THREE.CubeReflectionMapping
      : THREE.EquirectangularReflectionMapping),
    (h.colorSpace = null != n ? n : l ? "srgb" : "srgb-linear"),
    h
  );
}
let tL = {
  files: tS,
  path: "",
  preset: void 0,
  extensions: void 0,
};
tH.preload = (e) => {
  let t = {
      ...tL,
      ...e,
    },
    { files: r, path: n = "" } = t,
    { preset: i, extensions: a } = t;
  i && (tU(i), (r = tI[i]), (n = tG));
  let { extension: o } = tO(r);
  if ("webp" === o || "jpg" === o || "jpeg" === o)
    throw Error("useEnvironment: Preloading gainmaps is not supported");
  let s = tJ(o);
  if (!s) throw Error("useEnvironment: Unrecognized file extension: " + r);
  dependency971.useLoader.preload(s, Array.isArray(r) ? [r] : r, (e) => {
    (null == e.setPath || e.setPath(n), a && a(e));
  });
};
let tP = {
  files: tS,
  preset: void 0,
};
function tU(e) {
  if (!(e in tI))
    throw Error("Preset must be one of: " + Object.keys(tI).join(", "));
}
function tO(e) {
  var t;
  let r = Array.isArray(e) && 6 === e.length,
    n = Array.isArray(e) && 3 === e.length && e.some((e) => e.endsWith("json")),
    i = Array.isArray(e) ? e[0] : e;
  return {
    extension: r
      ? "cube"
      : n
        ? "webp"
        : i.startsWith("data:application/exr")
          ? "exr"
          : i.startsWith("data:application/hdr")
            ? "hdr"
            : i.startsWith("data:image/jpeg")
              ? "jpg"
              : null == (t = i.split(".").pop()) ||
                  null == (t = t.split("?")) ||
                  null == (t = t.shift())
                ? void 0
                : t.toLowerCase(),
    isCubemap: r,
    isGainmap: n,
  };
}
function tJ(e) {
  return "cube" === e
    ? THREE.CubeTextureLoader
    : "hdr" === e
      ? F
      : "exr" === e
        ? th
        : "jpg" === e || "jpeg" === e
          ? tD
          : "webp" === e
            ? tT
            : null;
}
function tk(e, t, r, n, i = {}) {
  var a, o, s, l, c;
  let u;
  i = {
    backgroundBlurriness: 0,
    backgroundIntensity: 1,
    backgroundRotation: [0, 0, 0],
    environmentIntensity: 1,
    environmentRotation: [0, 0, 0],
    ...i,
  };
  let d = (u = c = t || r).current && u.current.isScene ? c.current : c,
    h = d.background,
    f = d.environment,
    p = {
      backgroundBlurriness: d.backgroundBlurriness,
      backgroundIntensity: d.backgroundIntensity,
      backgroundRotation:
        null !=
        (a =
          null == (o = d.backgroundRotation) || null == o.clone
            ? void 0
            : o.clone())
          ? a
          : [0, 0, 0],
      environmentIntensity: d.environmentIntensity,
      environmentRotation:
        null !=
        (s =
          null == (l = d.environmentRotation) || null == l.clone
            ? void 0
            : l.clone())
          ? s
          : [0, 0, 0],
    };
  return (
    "only" !== e && (d.environment = n),
    e && (d.background = n),
    (0, dependency91037.s)(d, i),
    () => {
      ("only" !== e && (d.environment = f),
        e && (d.background = h),
        (0, dependency91037.s)(d, p));
    }
  );
}
function tN({ scene: e, background: t = !1, map: r, ...n }) {
  let i = (0, fiberHooks.useThree)((e) => e.scene);
  return (
    React.useLayoutEffect(() => {
      if (r) return tk(t, e, i, r, n);
    }),
    null
  );
}
function t_({
  background: e = !1,
  scene: t,
  blur: r,
  backgroundBlurriness: n,
  backgroundIntensity: i,
  backgroundRotation: o,
  environmentIntensity: s,
  environmentRotation: l,
  ...c
}) {
  let u = tH(c),
    d = (0, fiberHooks.useThree)((e) => e.scene);
  return (
    React.useLayoutEffect(() =>
      tk(e, t, d, u, {
        backgroundBlurriness: null != r ? r : n,
        backgroundIntensity: i,
        backgroundRotation: o,
        environmentIntensity: s,
        environmentRotation: l,
      }),
    ),
    React.useEffect(
      () => () => {
        u.dispose();
      },
      [u],
    ),
    null
  );
}
function tj({
  children: e,
  near: t = 0.1,
  far: r = 1e3,
  resolution: n = 256,
  frames: i = 1,
  map: o,
  background: s = !1,
  blur: l,
  backgroundBlurriness: c,
  backgroundIntensity: u,
  backgroundRotation: d,
  environmentIntensity: h,
  environmentRotation: f,
  scene: A,
  files: B,
  path: x,
  preset: C,
  extensions: y,
}) {
  let w = (0, fiberHooks.useThree)((e) => e.gl),
    b = (0, fiberHooks.useThree)((e) => e.scene),
    M = React.useRef(null),
    [E] = React.useState(() => new THREE.Scene()),
    F = React.useMemo(() => {
      let e = new THREE.WebGLCubeRenderTarget(n);
      return ((e.texture.type = THREE.HalfFloatType), e);
    }, [n]);
  (React.useEffect(
    () => () => {
      F.dispose();
    },
    [F],
  ),
    React.useLayoutEffect(() => {
      if (1 === i) {
        let e = w.autoClear;
        ((w.autoClear = !0), M.current.update(w, E), (w.autoClear = e));
      }
      return tk(s, A, b, F.texture, {
        backgroundBlurriness: null != l ? l : c,
        backgroundIntensity: u,
        backgroundRotation: d,
        environmentIntensity: h,
        environmentRotation: f,
      });
    }, [e, E, F.texture, A, b, s, i, w]));
  let R = 1;
  return (
    (0, fiberFrame.useFrame)(() => {
      if (i === 1 / 0 || R < i) {
        let e = w.autoClear;
        ((w.autoClear = !0), M.current.update(w, E), (w.autoClear = e), R++);
      }
    }),
    React.createElement(
      React.Fragment,
      null,
      (0, dependency5975.createPortal)(
        React.createElement(
          React.Fragment,
          null,
          e,
          React.createElement("cubeCamera", {
            ref: M,
            args: [t, r, F],
          }),
          B || C
            ? React.createElement(t_, {
                background: !0,
                files: B,
                preset: C,
                path: x,
                extensions: y,
              })
            : o
              ? React.createElement(tN, {
                  background: !0,
                  map: o,
                  extensions: y,
                })
              : null,
        ),
        E,
      ),
    )
  );
}
function tK(e) {
  var t, r, n, i;
  let o = tH(e),
    s = e.map || o;
  (React.useMemo(
    () =>
      (0, C.e)({
        GroundProjectedEnvImpl: b,
      }),
    [],
  ),
    React.useEffect(
      () => () => {
        o.dispose();
      },
      [o],
    ));
  let l = React.useMemo(() => [s], [s]),
    c = null == (t = e.ground) ? void 0 : t.height,
    u = null == (r = e.ground) ? void 0 : r.radius,
    d = null != (n = null == (i = e.ground) ? void 0 : i.scale) ? n : 1e3;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      tN,
      A({}, e, {
        map: s,
      }),
    ),
    React.createElement("groundProjectedEnvImpl", {
      args: l,
      scale: d,
      height: c,
      radius: u,
    }),
  );
}
function OriginalComponentTX(e) {
  return e.ground
    ? React.createElement(tK, e)
    : e.map
      ? React.createElement(tN, e)
      : e.children
        ? React.createElement(tj, e)
        : React.createElement(t_, e);
}
tH.clear = (e) => {
  let t = {
      ...tP,
      ...e,
    },
    { files: r } = t,
    { preset: n } = t;
  n && (tU(n), (r = tI[n]));
  let { extension: i } = tO(r),
    a = tJ(i);
  if (!a) throw Error("useEnvironment: Unrecognized file extension: " + r);
  dependency971.useLoader.clear(a, Array.isArray(r) ? [r] : r);
};
var tQ = THREE;
function tY(e, t) {
  if (t === THREE.TrianglesDrawMode)
    return (
      console.warn(
        "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.",
      ),
      e
    );
  if (t !== THREE.TriangleFanDrawMode && t !== THREE.TriangleStripDrawMode)
    return (
      console.error(
        "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",
        t,
      ),
      e
    );
  {
    let r = e.getIndex();
    if (null === r) {
      let t = [],
        n = e.getAttribute("position");
      if (void 0 === n)
        return (
          console.error(
            "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.",
          ),
          e
        );
      for (let e = 0; e < n.count; e++) t.push(e);
      (e.setIndex(t), (r = e.getIndex()));
    }
    let n = r.count - 2,
      i = [];
    if (r)
      if (t === THREE.TriangleFanDrawMode)
        for (let e = 1; e <= n; e++)
          (i.push(r.getX(0)), i.push(r.getX(e)), i.push(r.getX(e + 1)));
      else
        for (let e = 0; e < n; e++)
          e % 2 == 0
            ? (i.push(r.getX(e)), i.push(r.getX(e + 1)), i.push(r.getX(e + 2)))
            : (i.push(r.getX(e + 2)), i.push(r.getX(e + 1)), i.push(r.getX(e)));
    i.length / 3 !== n &&
      console.error(
        "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.",
      );
    let a = e.clone();
    return (a.setIndex(i), a.clearGroups(), a);
  }
}
function tW(e) {
  if ("undefined" != typeof TextDecoder) return new TextDecoder().decode(e);
  let t = "";
  for (let r = 0, n = e.length; r < n; r++) t += String.fromCharCode(e[r]);
  try {
    return decodeURIComponent(escape(t));
  } catch (e) {
    return t;
  }
}
let tV = "srgb",
  tZ = "srgb-linear";
class tz extends tQ.Loader {
  constructor(e) {
    (super(e),
      (this.dracoLoader = null),
      (this.ktx2Loader = null),
      (this.meshoptDecoder = null),
      (this.pluginCallbacks = []),
      this.register(function (e) {
        return new t9(e);
      }),
      this.register(function (e) {
        return new t3(e);
      }),
      this.register(function (e) {
        return new rn(e);
      }),
      this.register(function (e) {
        return new ri(e);
      }),
      this.register(function (e) {
        return new ra(e);
      }),
      this.register(function (e) {
        return new t5(e);
      }),
      this.register(function (e) {
        return new t6(e);
      }),
      this.register(function (e) {
        return new t4(e);
      }),
      this.register(function (e) {
        return new t7(e);
      }),
      this.register(function (e) {
        return new t2(e);
      }),
      this.register(function (e) {
        return new re(e);
      }),
      this.register(function (e) {
        return new t8(e);
      }),
      this.register(function (e) {
        return new rr(e);
      }),
      this.register(function (e) {
        return new rt(e);
      }),
      this.register(function (e) {
        return new t0(e);
      }),
      this.register(function (e) {
        return new ro(e);
      }),
      this.register(function (e) {
        return new rs(e);
      }));
  }
  load(e, t, r, n) {
    let i,
      a = this;
    if ("" !== this.resourcePath) i = this.resourcePath;
    else if ("" !== this.path) {
      let t = tQ.LoaderUtils.extractUrlBase(e);
      i = tQ.LoaderUtils.resolveURL(t, this.path);
    } else i = tQ.LoaderUtils.extractUrlBase(e);
    this.manager.itemStart(e);
    let o = function (t) {
        (n ? n(t) : console.error(t),
          a.manager.itemError(e),
          a.manager.itemEnd(e));
      },
      s = new tQ.FileLoader(this.manager);
    (s.setPath(this.path),
      s.setResponseType("arraybuffer"),
      s.setRequestHeader(this.requestHeader),
      s.setWithCredentials(this.withCredentials),
      s.load(
        e,
        function (r) {
          try {
            a.parse(
              r,
              i,
              function (r) {
                (t(r), a.manager.itemEnd(e));
              },
              o,
            );
          } catch (e) {
            o(e);
          }
        },
        r,
        o,
      ));
  }
  setDRACOLoader(e) {
    return ((this.dracoLoader = e), this);
  }
  setDDSLoader() {
    throw Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".',
    );
  }
  setKTX2Loader(e) {
    return ((this.ktx2Loader = e), this);
  }
  setMeshoptDecoder(e) {
    return ((this.meshoptDecoder = e), this);
  }
  register(e) {
    return (
      -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e),
      this
    );
  }
  unregister(e) {
    return (
      -1 !== this.pluginCallbacks.indexOf(e) &&
        this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
      this
    );
  }
  parse(e, t, r, n) {
    let i,
      a = {},
      o = {};
    if ("string" == typeof e) i = JSON.parse(e);
    else if (e instanceof ArrayBuffer) {
      if (tW(new Uint8Array(e.slice(0, 4))) === rl) {
        try {
          a[t$.KHR_BINARY_GLTF] = new rc(e);
        } catch (e) {
          n && n(e);
          return;
        }
        i = JSON.parse(a[t$.KHR_BINARY_GLTF].content);
      } else i = JSON.parse(tW(new Uint8Array(e)));
    } else i = e;
    if (void 0 === i.asset || i.asset.version[0] < 2) {
      n &&
        n(
          Error(
            "THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.",
          ),
        );
      return;
    }
    let s = new rT(i, {
      path: t || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder,
    });
    s.fileLoader.setRequestHeader(this.requestHeader);
    for (let e = 0; e < this.pluginCallbacks.length; e++) {
      let t = this.pluginCallbacks[e](s);
      (t.name ||
        console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),
        (o[t.name] = t),
        (a[t.name] = !0));
    }
    if (i.extensionsUsed)
      for (let e = 0; e < i.extensionsUsed.length; ++e) {
        let t = i.extensionsUsed[e],
          r = i.extensionsRequired || [];
        switch (t) {
          case t$.KHR_MATERIALS_UNLIT:
            a[t] = new t1();
            break;
          case t$.KHR_DRACO_MESH_COMPRESSION:
            a[t] = new ru(i, this.dracoLoader);
            break;
          case t$.KHR_TEXTURE_TRANSFORM:
            a[t] = new rd();
            break;
          case t$.KHR_MESH_QUANTIZATION:
            a[t] = new rh();
            break;
          default:
            r.indexOf(t) >= 0 &&
              void 0 === o[t] &&
              console.warn('THREE.GLTFLoader: Unknown extension "' + t + '".');
        }
      }
    (s.setExtensions(a), s.setPlugins(o), s.parse(r, n));
  }
  parseAsync(e, t) {
    let r = this;
    return new Promise(function (n, i) {
      r.parse(e, t, n, i);
    });
  }
}
function tq() {
  let e = {};
  return {
    get: function (t) {
      return e[t];
    },
    add: function (t, r) {
      e[t] = r;
    },
    remove: function (t) {
      delete e[t];
    },
    removeAll: function () {
      e = {};
    },
  };
}
let t$ = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing",
};
class t0 {
  constructor(e) {
    ((this.parser = e),
      (this.name = t$.KHR_LIGHTS_PUNCTUAL),
      (this.cache = {
        refs: {},
        uses: {},
      }));
  }
  _markDefs() {
    let e = this.parser,
      t = this.parser.json.nodes || [];
    for (let r = 0, n = t.length; r < n; r++) {
      let n = t[r];
      n.extensions &&
        n.extensions[this.name] &&
        void 0 !== n.extensions[this.name].light &&
        e._addNodeRef(this.cache, n.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    let t,
      r = this.parser,
      n = "light:" + e,
      i = r.cache.get(n);
    if (i) return i;
    let a = r.json,
      o = (((a.extensions && a.extensions[this.name]) || {}).lights || [])[e],
      s = new tQ.Color(0xffffff);
    void 0 !== o.color && s.setRGB(o.color[0], o.color[1], o.color[2], tZ);
    let l = void 0 !== o.range ? o.range : 0;
    switch (o.type) {
      case "directional":
        ((t = new tQ.DirectionalLight(s)).target.position.set(0, 0, -1),
          t.add(t.target));
        break;
      case "point":
        (t = new tQ.PointLight(s)).distance = l;
        break;
      case "spot":
        (((t = new tQ.SpotLight(s)).distance = l),
          (o.spot = o.spot || {}),
          (o.spot.innerConeAngle =
            void 0 !== o.spot.innerConeAngle ? o.spot.innerConeAngle : 0),
          (o.spot.outerConeAngle =
            void 0 !== o.spot.outerConeAngle
              ? o.spot.outerConeAngle
              : Math.PI / 4),
          (t.angle = o.spot.outerConeAngle),
          (t.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle),
          t.target.position.set(0, 0, -1),
          t.add(t.target));
        break;
      default:
        throw Error("THREE.GLTFLoader: Unexpected light type: " + o.type);
    }
    return (
      t.position.set(0, 0, 0),
      (t.decay = 2),
      rM(t, o),
      void 0 !== o.intensity && (t.intensity = o.intensity),
      (t.name = r.createUniqueName(o.name || "light_" + e)),
      (i = Promise.resolve(t)),
      r.cache.add(n, i),
      i
    );
  }
  getDependency(e, t) {
    if ("light" === e) return this._loadLight(t);
  }
  createNodeAttachment(e) {
    let t = this,
      r = this.parser,
      n = r.json.nodes[e],
      i = ((n.extensions && n.extensions[this.name]) || {}).light;
    return void 0 === i
      ? null
      : this._loadLight(i).then(function (e) {
          return r._getNodeRef(t.cache, i, e);
        });
  }
}
class t1 {
  constructor() {
    this.name = t$.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return tQ.MeshBasicMaterial;
  }
  extendParams(e, t, r) {
    let n = [];
    ((e.color = new tQ.Color(1, 1, 1)), (e.opacity = 1));
    let i = t.pbrMetallicRoughness;
    if (i) {
      if (Array.isArray(i.baseColorFactor)) {
        let t = i.baseColorFactor;
        (e.color.setRGB(t[0], t[1], t[2], tZ), (e.opacity = t[3]));
      }
      void 0 !== i.baseColorTexture &&
        n.push(r.assignTexture(e, "map", i.baseColorTexture, tV));
    }
    return Promise.all(n);
  }
}
class t2 {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_EMISSIVE_STRENGTH));
  }
  extendMaterialParams(e, t) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
    let n = r.extensions[this.name].emissiveStrength;
    return (void 0 !== n && (t.emissiveIntensity = n), Promise.resolve());
  }
}
class t9 {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_CLEARCOAT));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      a = n.extensions[this.name];
    if (
      (void 0 !== a.clearcoatFactor && (t.clearcoat = a.clearcoatFactor),
      void 0 !== a.clearcoatTexture &&
        i.push(r.assignTexture(t, "clearcoatMap", a.clearcoatTexture)),
      void 0 !== a.clearcoatRoughnessFactor &&
        (t.clearcoatRoughness = a.clearcoatRoughnessFactor),
      void 0 !== a.clearcoatRoughnessTexture &&
        i.push(
          r.assignTexture(
            t,
            "clearcoatRoughnessMap",
            a.clearcoatRoughnessTexture,
          ),
        ),
      void 0 !== a.clearcoatNormalTexture &&
        (i.push(
          r.assignTexture(t, "clearcoatNormalMap", a.clearcoatNormalTexture),
        ),
        void 0 !== a.clearcoatNormalTexture.scale))
    ) {
      let e = a.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new tQ.Vector2(e, e);
    }
    return Promise.all(i);
  }
}
class t3 {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_DISPERSION));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
    let n = r.extensions[this.name];
    return (
      (t.dispersion = void 0 !== n.dispersion ? n.dispersion : 0),
      Promise.resolve()
    );
  }
}
class t8 {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_IRIDESCENCE));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      a = n.extensions[this.name];
    return (
      void 0 !== a.iridescenceFactor && (t.iridescence = a.iridescenceFactor),
      void 0 !== a.iridescenceTexture &&
        i.push(r.assignTexture(t, "iridescenceMap", a.iridescenceTexture)),
      void 0 !== a.iridescenceIor && (t.iridescenceIOR = a.iridescenceIor),
      void 0 === t.iridescenceThicknessRange &&
        (t.iridescenceThicknessRange = [100, 400]),
      void 0 !== a.iridescenceThicknessMinimum &&
        (t.iridescenceThicknessRange[0] = a.iridescenceThicknessMinimum),
      void 0 !== a.iridescenceThicknessMaximum &&
        (t.iridescenceThicknessRange[1] = a.iridescenceThicknessMaximum),
      void 0 !== a.iridescenceThicknessTexture &&
        i.push(
          r.assignTexture(
            t,
            "iridescenceThicknessMap",
            a.iridescenceThicknessTexture,
          ),
        ),
      Promise.all(i)
    );
  }
}
class t5 {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_SHEEN));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [];
    ((t.sheenColor = new tQ.Color(0, 0, 0)),
      (t.sheenRoughness = 0),
      (t.sheen = 1));
    let a = n.extensions[this.name];
    if (void 0 !== a.sheenColorFactor) {
      let e = a.sheenColorFactor;
      t.sheenColor.setRGB(e[0], e[1], e[2], tZ);
    }
    return (
      void 0 !== a.sheenRoughnessFactor &&
        (t.sheenRoughness = a.sheenRoughnessFactor),
      void 0 !== a.sheenColorTexture &&
        i.push(r.assignTexture(t, "sheenColorMap", a.sheenColorTexture, tV)),
      void 0 !== a.sheenRoughnessTexture &&
        i.push(
          r.assignTexture(t, "sheenRoughnessMap", a.sheenRoughnessTexture),
        ),
      Promise.all(i)
    );
  }
}
class t6 {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_TRANSMISSION));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      a = n.extensions[this.name];
    return (
      void 0 !== a.transmissionFactor &&
        (t.transmission = a.transmissionFactor),
      void 0 !== a.transmissionTexture &&
        i.push(r.assignTexture(t, "transmissionMap", a.transmissionTexture)),
      Promise.all(i)
    );
  }
}
class t4 {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_VOLUME));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      a = n.extensions[this.name];
    ((t.thickness = void 0 !== a.thicknessFactor ? a.thicknessFactor : 0),
      void 0 !== a.thicknessTexture &&
        i.push(r.assignTexture(t, "thicknessMap", a.thicknessTexture)),
      (t.attenuationDistance = a.attenuationDistance || 1 / 0));
    let o = a.attenuationColor || [1, 1, 1];
    return (
      (t.attenuationColor = new tQ.Color().setRGB(o[0], o[1], o[2], tZ)),
      Promise.all(i)
    );
  }
}
class t7 {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_IOR));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser.json.materials[e];
    if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
    let n = r.extensions[this.name];
    return ((t.ior = void 0 !== n.ior ? n.ior : 1.5), Promise.resolve());
  }
}
class re {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_SPECULAR));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      a = n.extensions[this.name];
    ((t.specularIntensity = void 0 !== a.specularFactor ? a.specularFactor : 1),
      void 0 !== a.specularTexture &&
        i.push(r.assignTexture(t, "specularIntensityMap", a.specularTexture)));
    let o = a.specularColorFactor || [1, 1, 1];
    return (
      (t.specularColor = new tQ.Color().setRGB(o[0], o[1], o[2], tZ)),
      void 0 !== a.specularColorTexture &&
        i.push(
          r.assignTexture(t, "specularColorMap", a.specularColorTexture, tV),
        ),
      Promise.all(i)
    );
  }
}
class rt {
  constructor(e) {
    ((this.parser = e), (this.name = t$.EXT_MATERIALS_BUMP));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      a = n.extensions[this.name];
    return (
      (t.bumpScale = void 0 !== a.bumpFactor ? a.bumpFactor : 1),
      void 0 !== a.bumpTexture &&
        i.push(r.assignTexture(t, "bumpMap", a.bumpTexture)),
      Promise.all(i)
    );
  }
}
class rr {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_MATERIALS_ANISOTROPY));
  }
  getMaterialType(e) {
    let t = this.parser.json.materials[e];
    return t.extensions && t.extensions[this.name]
      ? tQ.MeshPhysicalMaterial
      : null;
  }
  extendMaterialParams(e, t) {
    let r = this.parser,
      n = r.json.materials[e];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    let i = [],
      a = n.extensions[this.name];
    return (
      void 0 !== a.anisotropyStrength && (t.anisotropy = a.anisotropyStrength),
      void 0 !== a.anisotropyRotation &&
        (t.anisotropyRotation = a.anisotropyRotation),
      void 0 !== a.anisotropyTexture &&
        i.push(r.assignTexture(t, "anisotropyMap", a.anisotropyTexture)),
      Promise.all(i)
    );
  }
}
class rn {
  constructor(e) {
    ((this.parser = e), (this.name = t$.KHR_TEXTURE_BASISU));
  }
  loadTexture(e) {
    let t = this.parser,
      r = t.json,
      n = r.textures[e];
    if (!n.extensions || !n.extensions[this.name]) return null;
    let i = n.extensions[this.name],
      a = t.options.ktx2Loader;
    if (!a)
      if (
        !(r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
      )
        return null;
      else
        throw Error(
          "THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures",
        );
    return t.loadTextureImage(e, i.source, a);
  }
}
class ri {
  constructor(e) {
    ((this.parser = e),
      (this.name = t$.EXT_TEXTURE_WEBP),
      (this.isSupported = null));
  }
  loadTexture(e) {
    let t = this.name,
      r = this.parser,
      n = r.json,
      i = n.textures[e];
    if (!i.extensions || !i.extensions[t]) return null;
    let a = i.extensions[t],
      o = n.images[a.source],
      s = r.textureLoader;
    if (o.uri) {
      let e = r.options.manager.getHandler(o.uri);
      null !== e && (s = e);
    }
    return this.detectSupport().then(function (i) {
      if (i) return r.loadTextureImage(e, a.source, s);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw Error(
          "THREE.GLTFLoader: WebP required by asset but unsupported.",
        );
      return r.loadTexture(e);
    });
  }
  detectSupport() {
    return (
      this.isSupported ||
        (this.isSupported = new Promise(function (e) {
          let t = new Image();
          ((t.src =
            "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
            (t.onload = t.onerror =
              function () {
                e(1 === t.height);
              }));
        })),
      this.isSupported
    );
  }
}
class ra {
  constructor(e) {
    ((this.parser = e),
      (this.name = t$.EXT_TEXTURE_AVIF),
      (this.isSupported = null));
  }
  loadTexture(e) {
    let t = this.name,
      r = this.parser,
      n = r.json,
      i = n.textures[e];
    if (!i.extensions || !i.extensions[t]) return null;
    let a = i.extensions[t],
      o = n.images[a.source],
      s = r.textureLoader;
    if (o.uri) {
      let e = r.options.manager.getHandler(o.uri);
      null !== e && (s = e);
    }
    return this.detectSupport().then(function (i) {
      if (i) return r.loadTextureImage(e, a.source, s);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
        throw Error(
          "THREE.GLTFLoader: AVIF required by asset but unsupported.",
        );
      return r.loadTexture(e);
    });
  }
  detectSupport() {
    return (
      this.isSupported ||
        (this.isSupported = new Promise(function (e) {
          let t = new Image();
          ((t.src =
            "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI="),
            (t.onload = t.onerror =
              function () {
                e(1 === t.height);
              }));
        })),
      this.isSupported
    );
  }
}
class ro {
  constructor(e) {
    ((this.name = t$.EXT_MESHOPT_COMPRESSION), (this.parser = e));
  }
  loadBufferView(e) {
    let t = this.parser.json,
      r = t.bufferViews[e];
    if (!r.extensions || !r.extensions[this.name]) return null;
    {
      let e = r.extensions[this.name],
        n = this.parser.getDependency("buffer", e.buffer),
        i = this.parser.options.meshoptDecoder;
      if (!i || !i.supported)
        if (
          !(
            t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0
          )
        )
          return null;
        else
          throw Error(
            "THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files",
          );
      return n.then(function (t) {
        let r = e.byteOffset || 0,
          n = e.byteLength || 0,
          a = e.count,
          o = e.byteStride,
          s = new Uint8Array(t, r, n);
        return i.decodeGltfBufferAsync
          ? i
              .decodeGltfBufferAsync(a, o, s, e.mode, e.filter)
              .then(function (e) {
                return e.buffer;
              })
          : i.ready.then(function () {
              let t = new ArrayBuffer(a * o);
              return (
                i.decodeGltfBuffer(
                  new Uint8Array(t),
                  a,
                  o,
                  s,
                  e.mode,
                  e.filter,
                ),
                t
              );
            });
      });
    }
  }
}
class rs {
  constructor(e) {
    ((this.name = t$.EXT_MESH_GPU_INSTANCING), (this.parser = e));
  }
  createNodeMesh(e) {
    let t = this.parser.json,
      r = t.nodes[e];
    if (!r.extensions || !r.extensions[this.name] || void 0 === r.mesh)
      return null;
    for (let e of t.meshes[r.mesh].primitives)
      if (
        e.mode !== rA.TRIANGLES &&
        e.mode !== rA.TRIANGLE_STRIP &&
        e.mode !== rA.TRIANGLE_FAN &&
        void 0 !== e.mode
      )
        return null;
    let n = r.extensions[this.name].attributes,
      i = [],
      a = {};
    for (let e in n)
      i.push(
        this.parser
          .getDependency("accessor", n[e])
          .then((t) => ((a[e] = t), a[e])),
      );
    return i.length < 1
      ? null
      : (i.push(this.parser.createNodeMesh(e)),
        Promise.all(i).then((e) => {
          let t = e.pop(),
            r = t.isGroup ? t.children : [t],
            n = e[0].count,
            i = [];
          for (let e of r) {
            let t = new tQ.Matrix4(),
              r = new tQ.Vector3(),
              o = new tQ.Quaternion(),
              s = new tQ.Vector3(1, 1, 1),
              l = new tQ.InstancedMesh(e.geometry, e.material, n);
            for (let e = 0; e < n; e++)
              (a.TRANSLATION && r.fromBufferAttribute(a.TRANSLATION, e),
                a.ROTATION && o.fromBufferAttribute(a.ROTATION, e),
                a.SCALE && s.fromBufferAttribute(a.SCALE, e),
                l.setMatrixAt(e, t.compose(r, o, s)));
            for (let t in a)
              if ("_COLOR_0" === t) {
                let e = a[t];
                l.instanceColor = new tQ.InstancedBufferAttribute(
                  e.array,
                  e.itemSize,
                  e.normalized,
                );
              } else
                "TRANSLATION" !== t &&
                  "ROTATION" !== t &&
                  "SCALE" !== t &&
                  e.geometry.setAttribute(t, a[t]);
            (tQ.Object3D.prototype.copy.call(l, e),
              this.parser.assignFinalMaterial(l),
              i.push(l));
          }
          return t.isGroup ? (t.clear(), t.add(...i), t) : i[0];
        }));
  }
}
let rl = "glTF";
class rc {
  constructor(e) {
    ((this.name = t$.KHR_BINARY_GLTF),
      (this.content = null),
      (this.body = null));
    const t = new DataView(e, 0, 12);
    if (
      ((this.header = {
        magic: tW(new Uint8Array(e.slice(0, 4))),
        version: t.getUint32(4, !0),
        length: t.getUint32(8, !0),
      }),
      this.header.magic !== rl)
    )
      throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw Error("THREE.GLTFLoader: Legacy binary file detected.");
    const r = this.header.length - 12,
      n = new DataView(e, 12);
    let i = 0;
    for (; i < r; ) {
      const t = n.getUint32(i, !0);
      i += 4;
      const r = n.getUint32(i, !0);
      if (((i += 4), 0x4e4f534a === r)) {
        const r = new Uint8Array(e, 12 + i, t);
        this.content = tW(r);
      } else if (5130562 === r) {
        const r = 12 + i;
        this.body = e.slice(r, r + t);
      }
      i += t;
    }
    if (null === this.content)
      throw Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class ru {
  constructor(e, t) {
    if (!t) throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    ((this.name = t$.KHR_DRACO_MESH_COMPRESSION),
      (this.json = e),
      (this.dracoLoader = t),
      this.dracoLoader.preload());
  }
  decodePrimitive(e, t) {
    let r = this.json,
      n = this.dracoLoader,
      i = e.extensions[this.name].bufferView,
      a = e.extensions[this.name].attributes,
      o = {},
      s = {},
      l = {};
    for (let e in a) o[rC[e] || e.toLowerCase()] = a[e];
    for (let t in e.attributes) {
      let n = rC[t] || t.toLowerCase();
      if (void 0 !== a[t]) {
        let i = r.accessors[e.attributes[t]],
          a = rg[i.componentType];
        ((l[n] = a.name), (s[n] = !0 === i.normalized));
      }
    }
    return t.getDependency("bufferView", i).then(function (e) {
      return new Promise(function (t, r) {
        n.decodeDracoFile(
          e,
          function (e) {
            for (let t in e.attributes) {
              let r = e.attributes[t],
                n = s[t];
              void 0 !== n && (r.normalized = n);
            }
            t(e);
          },
          o,
          l,
          tZ,
          r,
        );
      });
    });
  }
}
class rd {
  constructor() {
    this.name = t$.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (
      ((void 0 === t.texCoord || t.texCoord === e.channel) &&
        void 0 === t.offset &&
        void 0 === t.rotation &&
        void 0 === t.scale) ||
        ((e = e.clone()),
        void 0 !== t.texCoord && (e.channel = t.texCoord),
        void 0 !== t.offset && e.offset.fromArray(t.offset),
        void 0 !== t.rotation && (e.rotation = t.rotation),
        void 0 !== t.scale && e.repeat.fromArray(t.scale),
        (e.needsUpdate = !0)),
      e
    );
  }
}
class rh {
  constructor() {
    this.name = t$.KHR_MESH_QUANTIZATION;
  }
}
class rf extends tQ.Interpolant {
  constructor(e, t, r, n) {
    super(e, t, r, n);
  }
  copySampleValue_(e) {
    let t = this.resultBuffer,
      r = this.sampleValues,
      n = this.valueSize,
      i = e * n * 3 + n;
    for (let e = 0; e !== n; e++) t[e] = r[i + e];
    return t;
  }
  interpolate_(e, t, r, n) {
    let i = this.resultBuffer,
      a = this.sampleValues,
      o = this.valueSize,
      s = 2 * o,
      l = 3 * o,
      c = n - t,
      u = (r - t) / c,
      d = u * u,
      h = d * u,
      f = e * l,
      p = f - l,
      m = -2 * h + 3 * d,
      A = h - d,
      g = 1 - m,
      B = A - d + u;
    for (let e = 0; e !== o; e++) {
      let t = a[p + e + o],
        r = a[p + e + s] * c,
        n = a[f + e + o],
        l = a[f + e] * c;
      i[e] = g * t + B * r + m * n + A * l;
    }
    return i;
  }
}
let rp = new tQ.Quaternion();
class rm extends rf {
  interpolate_(e, t, r, n) {
    let i = super.interpolate_(e, t, r, n);
    return (rp.fromArray(i).normalize().toArray(i), i);
  }
}
let rA = {
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
  },
  rg = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array,
  },
  rB = {
    9728: tQ.NearestFilter,
    9729: tQ.LinearFilter,
    9984: tQ.NearestMipmapNearestFilter,
    9985: tQ.LinearMipmapNearestFilter,
    9986: tQ.NearestMipmapLinearFilter,
    9987: tQ.LinearMipmapLinearFilter,
  },
  rv = {
    33071: tQ.ClampToEdgeWrapping,
    33648: tQ.MirroredRepeatWrapping,
    10497: tQ.RepeatWrapping,
  },
  rx = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16,
  },
  rC = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    ...(w >= 152
      ? {
          TEXCOORD_0: "uv",
          TEXCOORD_1: "uv1",
          TEXCOORD_2: "uv2",
          TEXCOORD_3: "uv3",
        }
      : {
          TEXCOORD_0: "uv",
          TEXCOORD_1: "uv2",
        }),
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex",
  },
  ry = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences",
  },
  rw = {
    CUBICSPLINE: void 0,
    LINEAR: tQ.InterpolateLinear,
    STEP: tQ.InterpolateDiscrete,
  };
function rb(e, t, r) {
  for (let n in r.extensions)
    void 0 === e[n] &&
      ((t.userData.gltfExtensions = t.userData.gltfExtensions || {}),
      (t.userData.gltfExtensions[n] = r.extensions[n]));
}
function rM(e, t) {
  void 0 !== t.extras &&
    ("object" == typeof t.extras
      ? Object.assign(e.userData, t.extras)
      : console.warn(
          "THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras,
        ));
}
function rE(e) {
  let t = "",
    r = Object.keys(e).sort();
  for (let n = 0, i = r.length; n < i; n++) t += r[n] + ":" + e[r[n]] + ";";
  return t;
}
function rF(e) {
  switch (e) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw Error(
        "THREE.GLTFLoader: Unsupported normalized accessor component type.",
      );
  }
}
let rR = new tQ.Matrix4();
class rT {
  constructor(e = {}, t = {}) {
    ((this.json = e),
      (this.extensions = {}),
      (this.plugins = {}),
      (this.options = t),
      (this.cache = new tq()),
      (this.associations = new Map()),
      (this.primitiveCache = {}),
      (this.nodeCache = {}),
      (this.meshCache = {
        refs: {},
        uses: {},
      }),
      (this.cameraCache = {
        refs: {},
        uses: {},
      }),
      (this.lightCache = {
        refs: {},
        uses: {},
      }),
      (this.sourceCache = {}),
      (this.textureCache = {}),
      (this.nodeNamesUsed = {}));
    let r = !1,
      n = !1,
      i = -1;
    ("undefined" != typeof navigator &&
      void 0 !== navigator.userAgent &&
      ((r = !0 === /^((?!chrome|android).)*safari/i.test(navigator.userAgent)),
      (i = (n = navigator.userAgent.indexOf("Firefox") > -1)
        ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]
        : -1)),
      "undefined" == typeof createImageBitmap || r || (n && i < 98)
        ? (this.textureLoader = new tQ.TextureLoader(this.options.manager))
        : (this.textureLoader = new tQ.ImageBitmapLoader(this.options.manager)),
      this.textureLoader.setCrossOrigin(this.options.crossOrigin),
      this.textureLoader.setRequestHeader(this.options.requestHeader),
      (this.fileLoader = new tQ.FileLoader(this.options.manager)),
      this.fileLoader.setResponseType("arraybuffer"),
      "use-credentials" === this.options.crossOrigin &&
        this.fileLoader.setWithCredentials(!0));
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
    let r = this,
      n = this.json,
      i = this.extensions;
    (this.cache.removeAll(),
      (this.nodeCache = {}),
      this._invokeAll(function (e) {
        return e._markDefs && e._markDefs();
      }),
      Promise.all(
        this._invokeAll(function (e) {
          return e.beforeRoot && e.beforeRoot();
        }),
      )
        .then(function () {
          return Promise.all([
            r.getDependencies("scene"),
            r.getDependencies("animation"),
            r.getDependencies("camera"),
          ]);
        })
        .then(function (t) {
          let a = {
            scene: t[0][n.scene || 0],
            scenes: t[0],
            animations: t[1],
            cameras: t[2],
            asset: n.asset,
            parser: r,
            userData: {},
          };
          return (
            rb(i, a, n),
            rM(a, n),
            Promise.all(
              r._invokeAll(function (e) {
                return e.afterRoot && e.afterRoot(a);
              }),
            ).then(function () {
              for (let e of a.scenes) e.updateMatrixWorld();
              e(a);
            })
          );
        })
        .catch(t));
  }
  _markDefs() {
    let e = this.json.nodes || [],
      t = this.json.skins || [],
      r = this.json.meshes || [];
    for (let r = 0, n = t.length; r < n; r++) {
      let n = t[r].joints;
      for (let t = 0, r = n.length; t < r; t++) e[n[t]].isBone = !0;
    }
    for (let t = 0, n = e.length; t < n; t++) {
      let n = e[t];
      (void 0 !== n.mesh &&
        (this._addNodeRef(this.meshCache, n.mesh),
        void 0 !== n.skin && (r[n.mesh].isSkinnedMesh = !0)),
        void 0 !== n.camera && this._addNodeRef(this.cameraCache, n.camera));
    }
  }
  _addNodeRef(e, t) {
    void 0 !== t &&
      (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  _getNodeRef(e, t, r) {
    if (e.refs[t] <= 1) return r;
    let n = r.clone(),
      i = (e, t) => {
        let r = this.associations.get(e);
        for (let [n, a] of (null != r && this.associations.set(t, r),
        e.children.entries()))
          i(a, t.children[n]);
      };
    return (i(r, n), (n.name += "_instance_" + e.uses[t]++), n);
  }
  _invokeOne(e) {
    let t = Object.values(this.plugins);
    t.push(this);
    for (let r = 0; r < t.length; r++) {
      let n = e(t[r]);
      if (n) return n;
    }
    return null;
  }
  _invokeAll(e) {
    let t = Object.values(this.plugins);
    t.unshift(this);
    let r = [];
    for (let n = 0; n < t.length; n++) {
      let i = e(t[n]);
      i && r.push(i);
    }
    return r;
  }
  getDependency(e, t) {
    let r = e + ":" + t,
      n = this.cache.get(r);
    if (!n) {
      switch (e) {
        case "scene":
          n = this.loadScene(t);
          break;
        case "node":
          n = this._invokeOne(function (e) {
            return e.loadNode && e.loadNode(t);
          });
          break;
        case "mesh":
          n = this._invokeOne(function (e) {
            return e.loadMesh && e.loadMesh(t);
          });
          break;
        case "accessor":
          n = this.loadAccessor(t);
          break;
        case "bufferView":
          n = this._invokeOne(function (e) {
            return e.loadBufferView && e.loadBufferView(t);
          });
          break;
        case "buffer":
          n = this.loadBuffer(t);
          break;
        case "material":
          n = this._invokeOne(function (e) {
            return e.loadMaterial && e.loadMaterial(t);
          });
          break;
        case "texture":
          n = this._invokeOne(function (e) {
            return e.loadTexture && e.loadTexture(t);
          });
          break;
        case "skin":
          n = this.loadSkin(t);
          break;
        case "animation":
          n = this._invokeOne(function (e) {
            return e.loadAnimation && e.loadAnimation(t);
          });
          break;
        case "camera":
          n = this.loadCamera(t);
          break;
        default:
          if (
            !(n = this._invokeOne(function (r) {
              return r != this && r.getDependency && r.getDependency(e, t);
            }))
          )
            throw Error("Unknown type: " + e);
      }
      this.cache.add(r, n);
    }
    return n;
  }
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      let r = this;
      ((t = Promise.all(
        (this.json[e + ("mesh" === e ? "es" : "s")] || []).map(function (t, n) {
          return r.getDependency(e, n);
        }),
      )),
        this.cache.add(e, t));
    }
    return t;
  }
  loadBuffer(e) {
    let t = this.json.buffers[e],
      r = this.fileLoader;
    if (t.type && "arraybuffer" !== t.type)
      throw Error(
        "THREE.GLTFLoader: " + t.type + " buffer type is not supported.",
      );
    if (void 0 === t.uri && 0 === e)
      return Promise.resolve(this.extensions[t$.KHR_BINARY_GLTF].body);
    let n = this.options;
    return new Promise(function (e, i) {
      r.load(tQ.LoaderUtils.resolveURL(t.uri, n.path), e, void 0, function () {
        i(Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    let t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function (e) {
      let r = t.byteLength || 0,
        n = t.byteOffset || 0;
      return e.slice(n, n + r);
    });
  }
  loadAccessor(e) {
    let t = this,
      r = this.json,
      n = this.json.accessors[e];
    if (void 0 === n.bufferView && void 0 === n.sparse) {
      let e = rx[n.type],
        t = rg[n.componentType],
        r = !0 === n.normalized,
        i = new t(n.count * e);
      return Promise.resolve(new tQ.BufferAttribute(i, e, r));
    }
    let i = [];
    return (
      void 0 !== n.bufferView
        ? i.push(this.getDependency("bufferView", n.bufferView))
        : i.push(null),
      void 0 !== n.sparse &&
        (i.push(this.getDependency("bufferView", n.sparse.indices.bufferView)),
        i.push(this.getDependency("bufferView", n.sparse.values.bufferView))),
      Promise.all(i).then(function (e) {
        let i,
          a,
          o = e[0],
          s = rx[n.type],
          l = rg[n.componentType],
          c = l.BYTES_PER_ELEMENT,
          u = c * s,
          d = n.byteOffset || 0,
          h =
            void 0 !== n.bufferView
              ? r.bufferViews[n.bufferView].byteStride
              : void 0,
          f = !0 === n.normalized;
        if (h && h !== u) {
          let e = Math.floor(d / h),
            r =
              "InterleavedBuffer:" +
              n.bufferView +
              ":" +
              n.componentType +
              ":" +
              e +
              ":" +
              n.count,
            u = t.cache.get(r);
          (u ||
            ((i = new l(o, e * h, (n.count * h) / c)),
            (u = new tQ.InterleavedBuffer(i, h / c)),
            t.cache.add(r, u)),
            (a = new tQ.InterleavedBufferAttribute(u, s, (d % h) / c, f)));
        } else
          ((i = null === o ? new l(n.count * s) : new l(o, d, n.count * s)),
            (a = new tQ.BufferAttribute(i, s, f)));
        if (void 0 !== n.sparse) {
          let t = rx.SCALAR,
            r = rg[n.sparse.indices.componentType],
            i = n.sparse.indices.byteOffset || 0,
            c = n.sparse.values.byteOffset || 0,
            u = new r(e[1], i, n.sparse.count * t),
            d = new l(e[2], c, n.sparse.count * s);
          null !== o &&
            (a = new tQ.BufferAttribute(
              a.array.slice(),
              a.itemSize,
              a.normalized,
            ));
          for (let e = 0, t = u.length; e < t; e++) {
            let t = u[e];
            if (
              (a.setX(t, d[e * s]),
              s >= 2 && a.setY(t, d[e * s + 1]),
              s >= 3 && a.setZ(t, d[e * s + 2]),
              s >= 4 && a.setW(t, d[e * s + 3]),
              s >= 5)
            )
              throw Error(
                "THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.",
              );
          }
        }
        return a;
      })
    );
  }
  loadTexture(e) {
    let t = this.json,
      r = this.options,
      n = t.textures[e].source,
      i = t.images[n],
      a = this.textureLoader;
    if (i.uri) {
      let e = r.manager.getHandler(i.uri);
      null !== e && (a = e);
    }
    return this.loadTextureImage(e, n, a);
  }
  loadTextureImage(e, t, r) {
    let n = this,
      i = this.json,
      a = i.textures[e],
      o = i.images[t],
      s = (o.uri || o.bufferView) + ":" + a.sampler;
    if (this.textureCache[s]) return this.textureCache[s];
    let l = this.loadImageSource(t, r)
      .then(function (t) {
        ((t.flipY = !1),
          (t.name = a.name || o.name || ""),
          "" === t.name &&
            "string" == typeof o.uri &&
            !1 === o.uri.startsWith("data:image/") &&
            (t.name = o.uri));
        let r = (i.samplers || {})[a.sampler] || {};
        return (
          (t.magFilter = rB[r.magFilter] || tQ.LinearFilter),
          (t.minFilter = rB[r.minFilter] || tQ.LinearMipmapLinearFilter),
          (t.wrapS = rv[r.wrapS] || tQ.RepeatWrapping),
          (t.wrapT = rv[r.wrapT] || tQ.RepeatWrapping),
          n.associations.set(t, {
            textures: e,
          }),
          t
        );
      })
      .catch(function () {
        return null;
      });
    return ((this.textureCache[s] = l), l);
  }
  loadImageSource(e, t) {
    let r = this.json,
      n = this.options;
    if (void 0 !== this.sourceCache[e])
      return this.sourceCache[e].then((e) => e.clone());
    let i = r.images[e],
      a = self.URL || self.webkitURL,
      o = i.uri || "",
      s = !1;
    if (void 0 !== i.bufferView)
      o = this.getDependency("bufferView", i.bufferView).then(function (e) {
        s = !0;
        let t = new Blob([e], {
          type: i.mimeType,
        });
        return (o = a.createObjectURL(t));
      });
    else if (void 0 === i.uri)
      throw Error(
        "THREE.GLTFLoader: Image " + e + " is missing URI and bufferView",
      );
    let l = Promise.resolve(o)
      .then(function (e) {
        return new Promise(function (r, i) {
          let a = r;
          (!0 === t.isImageBitmapLoader &&
            (a = function (e) {
              let t = new tQ.Texture(e);
              ((t.needsUpdate = !0), r(t));
            }),
            t.load(tQ.LoaderUtils.resolveURL(e, n.path), a, void 0, i));
        });
      })
      .then(function (e) {
        var t;
        return (
          !0 === s && a.revokeObjectURL(o),
          rM(e, i),
          (e.userData.mimeType =
            i.mimeType ||
            ((t = i.uri).search(/\.jpe?g($|\?)/i) > 0 ||
            0 === t.search(/^data\:image\/jpeg/)
              ? "image/jpeg"
              : t.search(/\.webp($|\?)/i) > 0 ||
                  0 === t.search(/^data\:image\/webp/)
                ? "image/webp"
                : "image/png")),
          e
        );
      })
      .catch(function (e) {
        throw (console.error("THREE.GLTFLoader: Couldn't load texture", o), e);
      });
    return ((this.sourceCache[e] = l), l);
  }
  assignTexture(e, t, r, n) {
    let i = this;
    return this.getDependency("texture", r.index).then(function (a) {
      if (!a) return null;
      if (
        (void 0 !== r.texCoord &&
          r.texCoord > 0 &&
          ((a = a.clone()).channel = r.texCoord),
        i.extensions[t$.KHR_TEXTURE_TRANSFORM])
      ) {
        let e =
          void 0 !== r.extensions
            ? r.extensions[t$.KHR_TEXTURE_TRANSFORM]
            : void 0;
        if (e) {
          let t = i.associations.get(a);
          ((a = i.extensions[t$.KHR_TEXTURE_TRANSFORM].extendTexture(a, e)),
            i.associations.set(a, t));
        }
      }
      return (
        void 0 !== n &&
          ("number" == typeof n && (n = 3001 === n ? tV : tZ),
          "colorSpace" in a
            ? (a.colorSpace = n)
            : (a.encoding = n === tV ? 3001 : 3e3)),
        (e[t] = a),
        a
      );
    });
  }
  assignFinalMaterial(e) {
    let t = e.geometry,
      r = e.material,
      n = void 0 === t.attributes.tangent,
      i = void 0 !== t.attributes.color,
      a = void 0 === t.attributes.normal;
    if (e.isPoints) {
      let e = "PointsMaterial:" + r.uuid,
        t = this.cache.get(e);
      (t ||
        ((t = new tQ.PointsMaterial()),
        tQ.Material.prototype.copy.call(t, r),
        t.color.copy(r.color),
        (t.map = r.map),
        (t.sizeAttenuation = !1),
        this.cache.add(e, t)),
        (r = t));
    } else if (e.isLine) {
      let e = "LineBasicMaterial:" + r.uuid,
        t = this.cache.get(e);
      (t ||
        ((t = new tQ.LineBasicMaterial()),
        tQ.Material.prototype.copy.call(t, r),
        t.color.copy(r.color),
        (t.map = r.map),
        this.cache.add(e, t)),
        (r = t));
    }
    if (n || i || a) {
      let e = "ClonedMaterial:" + r.uuid + ":";
      (n && (e += "derivative-tangents:"),
        i && (e += "vertex-colors:"),
        a && (e += "flat-shading:"));
      let t = this.cache.get(e);
      (t ||
        ((t = r.clone()),
        i && (t.vertexColors = !0),
        a && (t.flatShading = !0),
        n &&
          (t.normalScale && (t.normalScale.y *= -1),
          t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)),
        this.cache.add(e, t),
        this.associations.set(t, this.associations.get(r))),
        (r = t));
    }
    e.material = r;
  }
  getMaterialType() {
    return tQ.MeshStandardMaterial;
  }
  loadMaterial(e) {
    let t,
      r = this,
      n = this.json,
      i = this.extensions,
      a = n.materials[e],
      o = {},
      s = a.extensions || {},
      l = [];
    if (s[t$.KHR_MATERIALS_UNLIT]) {
      let e = i[t$.KHR_MATERIALS_UNLIT];
      ((t = e.getMaterialType()), l.push(e.extendParams(o, a, r)));
    } else {
      let n = a.pbrMetallicRoughness || {};
      if (
        ((o.color = new tQ.Color(1, 1, 1)),
        (o.opacity = 1),
        Array.isArray(n.baseColorFactor))
      ) {
        let e = n.baseColorFactor;
        (o.color.setRGB(e[0], e[1], e[2], tZ), (o.opacity = e[3]));
      }
      (void 0 !== n.baseColorTexture &&
        l.push(r.assignTexture(o, "map", n.baseColorTexture, tV)),
        (o.metalness = void 0 !== n.metallicFactor ? n.metallicFactor : 1),
        (o.roughness = void 0 !== n.roughnessFactor ? n.roughnessFactor : 1),
        void 0 !== n.metallicRoughnessTexture &&
          (l.push(
            r.assignTexture(o, "metalnessMap", n.metallicRoughnessTexture),
          ),
          l.push(
            r.assignTexture(o, "roughnessMap", n.metallicRoughnessTexture),
          )),
        (t = this._invokeOne(function (t) {
          return t.getMaterialType && t.getMaterialType(e);
        })),
        l.push(
          Promise.all(
            this._invokeAll(function (t) {
              return t.extendMaterialParams && t.extendMaterialParams(e, o);
            }),
          ),
        ));
    }
    !0 === a.doubleSided && (o.side = tQ.DoubleSide);
    let c = a.alphaMode || "OPAQUE";
    if (
      ("BLEND" === c
        ? ((o.transparent = !0), (o.depthWrite = !1))
        : ((o.transparent = !1),
          "MASK" === c &&
            (o.alphaTest = void 0 !== a.alphaCutoff ? a.alphaCutoff : 0.5)),
      void 0 !== a.normalTexture &&
        t !== tQ.MeshBasicMaterial &&
        (l.push(r.assignTexture(o, "normalMap", a.normalTexture)),
        (o.normalScale = new tQ.Vector2(1, 1)),
        void 0 !== a.normalTexture.scale))
    ) {
      let e = a.normalTexture.scale;
      o.normalScale.set(e, e);
    }
    if (
      (void 0 !== a.occlusionTexture &&
        t !== tQ.MeshBasicMaterial &&
        (l.push(r.assignTexture(o, "aoMap", a.occlusionTexture)),
        void 0 !== a.occlusionTexture.strength &&
          (o.aoMapIntensity = a.occlusionTexture.strength)),
      void 0 !== a.emissiveFactor && t !== tQ.MeshBasicMaterial)
    ) {
      let e = a.emissiveFactor;
      o.emissive = new tQ.Color().setRGB(e[0], e[1], e[2], tZ);
    }
    return (
      void 0 !== a.emissiveTexture &&
        t !== tQ.MeshBasicMaterial &&
        l.push(r.assignTexture(o, "emissiveMap", a.emissiveTexture, tV)),
      Promise.all(l).then(function () {
        let n = new t(o);
        return (
          a.name && (n.name = a.name),
          rM(n, a),
          r.associations.set(n, {
            materials: e,
          }),
          a.extensions && rb(i, n, a),
          n
        );
      })
    );
  }
  createUniqueName(e) {
    let t = tQ.PropertyBinding.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed
      ? t + "_" + ++this.nodeNamesUsed[t]
      : ((this.nodeNamesUsed[t] = 0), t);
  }
  loadGeometries(e) {
    let t = this,
      r = this.extensions,
      n = this.primitiveCache,
      i = [];
    for (let a = 0, o = e.length; a < o; a++) {
      let o = e[a],
        s = (function (e) {
          let t,
            r = e.extensions && e.extensions[t$.KHR_DRACO_MESH_COMPRESSION];
          if (
            ((t = r
              ? "draco:" +
                r.bufferView +
                ":" +
                r.indices +
                ":" +
                rE(r.attributes)
              : e.indices + ":" + rE(e.attributes) + ":" + e.mode),
            void 0 !== e.targets)
          )
            for (let r = 0, n = e.targets.length; r < n; r++)
              t += ":" + rE(e.targets[r]);
          return t;
        })(o),
        l = n[s];
      if (l) i.push(l.promise);
      else {
        let e;
        ((e =
          o.extensions && o.extensions[t$.KHR_DRACO_MESH_COMPRESSION]
            ? (function (e) {
                return r[t$.KHR_DRACO_MESH_COMPRESSION]
                  .decodePrimitive(e, t)
                  .then(function (r) {
                    return rD(r, e, t);
                  });
              })(o)
            : rD(new tQ.BufferGeometry(), o, t)),
          (n[s] = {
            primitive: o,
            promise: e,
          }),
          i.push(e));
      }
    }
    return Promise.all(i);
  }
  loadMesh(e) {
    let t = this,
      r = this.json,
      n = this.extensions,
      i = r.meshes[e],
      a = i.primitives,
      o = [];
    for (let e = 0, t = a.length; e < t; e++) {
      var s;
      let t =
        void 0 === a[e].material
          ? (void 0 === (s = this.cache).DefaultMaterial &&
              (s.DefaultMaterial = new tQ.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0,
                metalness: 1,
                roughness: 1,
                transparent: !1,
                depthTest: !0,
                side: tQ.FrontSide,
              })),
            s.DefaultMaterial)
          : this.getDependency("material", a[e].material);
      o.push(t);
    }
    return (
      o.push(t.loadGeometries(a)),
      Promise.all(o).then(function (r) {
        let o = r.slice(0, r.length - 1),
          s = r[r.length - 1],
          l = [];
        for (let r = 0, c = s.length; r < c; r++) {
          let c,
            u = s[r],
            d = a[r],
            h = o[r];
          if (
            d.mode === rA.TRIANGLES ||
            d.mode === rA.TRIANGLE_STRIP ||
            d.mode === rA.TRIANGLE_FAN ||
            void 0 === d.mode
          )
            (!0 ===
              (c =
                !0 === i.isSkinnedMesh
                  ? new tQ.SkinnedMesh(u, h)
                  : new tQ.Mesh(u, h)).isSkinnedMesh &&
              c.normalizeSkinWeights(),
              d.mode === rA.TRIANGLE_STRIP
                ? (c.geometry = tY(c.geometry, tQ.TriangleStripDrawMode))
                : d.mode === rA.TRIANGLE_FAN &&
                  (c.geometry = tY(c.geometry, tQ.TriangleFanDrawMode)));
          else if (d.mode === rA.LINES) c = new tQ.LineSegments(u, h);
          else if (d.mode === rA.LINE_STRIP) c = new tQ.Line(u, h);
          else if (d.mode === rA.LINE_LOOP) c = new tQ.LineLoop(u, h);
          else if (d.mode === rA.POINTS) c = new tQ.Points(u, h);
          else
            throw Error(
              "THREE.GLTFLoader: Primitive mode unsupported: " + d.mode,
            );
          (Object.keys(c.geometry.morphAttributes).length > 0 &&
            (function (e, t) {
              if ((e.updateMorphTargets(), void 0 !== t.weights))
                for (let r = 0, n = t.weights.length; r < n; r++)
                  e.morphTargetInfluences[r] = t.weights[r];
              if (t.extras && Array.isArray(t.extras.targetNames)) {
                let r = t.extras.targetNames;
                if (e.morphTargetInfluences.length === r.length) {
                  e.morphTargetDictionary = {};
                  for (let t = 0, n = r.length; t < n; t++)
                    e.morphTargetDictionary[r[t]] = t;
                } else
                  console.warn(
                    "THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.",
                  );
              }
            })(c, i),
            (c.name = t.createUniqueName(i.name || "mesh_" + e)),
            rM(c, i),
            d.extensions && rb(n, c, d),
            t.assignFinalMaterial(c),
            l.push(c));
        }
        for (let r = 0, n = l.length; r < n; r++)
          t.associations.set(l[r], {
            meshes: e,
            primitives: r,
          });
        if (1 === l.length) return (i.extensions && rb(n, l[0], i), l[0]);
        let c = new tQ.Group();
        (i.extensions && rb(n, c, i),
          t.associations.set(c, {
            meshes: e,
          }));
        for (let e = 0, t = l.length; e < t; e++) c.add(l[e]);
        return c;
      })
    );
  }
  loadCamera(e) {
    let t,
      r = this.json.cameras[e],
      n = r[r.type];
    return n
      ? ("perspective" === r.type
          ? (t = new tQ.PerspectiveCamera(
              tQ.MathUtils.radToDeg(n.yfov),
              n.aspectRatio || 1,
              n.znear || 1,
              n.zfar || 2e6,
            ))
          : "orthographic" === r.type &&
            (t = new tQ.OrthographicCamera(
              -n.xmag,
              n.xmag,
              n.ymag,
              -n.ymag,
              n.znear,
              n.zfar,
            )),
        r.name && (t.name = this.createUniqueName(r.name)),
        rM(t, r),
        Promise.resolve(t))
      : void console.warn("THREE.GLTFLoader: Missing camera parameters.");
  }
  loadSkin(e) {
    let t = this.json.skins[e],
      r = [];
    for (let e = 0, n = t.joints.length; e < n; e++)
      r.push(this._loadNodeShallow(t.joints[e]));
    return (
      void 0 !== t.inverseBindMatrices
        ? r.push(this.getDependency("accessor", t.inverseBindMatrices))
        : r.push(null),
      Promise.all(r).then(function (e) {
        let r = e.pop(),
          n = [],
          i = [];
        for (let a = 0, o = e.length; a < o; a++) {
          let o = e[a];
          if (o) {
            n.push(o);
            let e = new tQ.Matrix4();
            (null !== r && e.fromArray(r.array, 16 * a), i.push(e));
          } else
            console.warn(
              'THREE.GLTFLoader: Joint "%s" could not be found.',
              t.joints[a],
            );
        }
        return new tQ.Skeleton(n, i);
      })
    );
  }
  loadAnimation(e) {
    let t = this.json,
      r = this,
      n = t.animations[e],
      i = n.name ? n.name : "animation_" + e,
      a = [],
      o = [],
      s = [],
      l = [],
      c = [];
    for (let e = 0, t = n.channels.length; e < t; e++) {
      let t = n.channels[e],
        r = n.samplers[t.sampler],
        i = t.target,
        u = i.node,
        d = void 0 !== n.parameters ? n.parameters[r.input] : r.input,
        h = void 0 !== n.parameters ? n.parameters[r.output] : r.output;
      void 0 !== i.node &&
        (a.push(this.getDependency("node", u)),
        o.push(this.getDependency("accessor", d)),
        s.push(this.getDependency("accessor", h)),
        l.push(r),
        c.push(i));
    }
    return Promise.all([
      Promise.all(a),
      Promise.all(o),
      Promise.all(s),
      Promise.all(l),
      Promise.all(c),
    ]).then(function (e) {
      let t = e[0],
        n = e[1],
        a = e[2],
        o = e[3],
        s = e[4],
        l = [];
      for (let e = 0, i = t.length; e < i; e++) {
        let i = t[e],
          c = n[e],
          u = a[e],
          d = o[e],
          h = s[e];
        if (void 0 === i) continue;
        i.updateMatrix && i.updateMatrix();
        let f = r._createAnimationTracks(i, c, u, d, h);
        if (f) for (let e = 0; e < f.length; e++) l.push(f[e]);
      }
      return new tQ.AnimationClip(i, void 0, l);
    });
  }
  createNodeMesh(e) {
    let t = this.json,
      r = this,
      n = t.nodes[e];
    return void 0 === n.mesh
      ? null
      : r.getDependency("mesh", n.mesh).then(function (e) {
          let t = r._getNodeRef(r.meshCache, n.mesh, e);
          return (
            void 0 !== n.weights &&
              t.traverse(function (e) {
                if (e.isMesh)
                  for (let t = 0, r = n.weights.length; t < r; t++)
                    e.morphTargetInfluences[t] = n.weights[t];
              }),
            t
          );
        });
  }
  loadNode(e) {
    let t = this.json.nodes[e],
      r = this._loadNodeShallow(e),
      n = [],
      i = t.children || [];
    for (let e = 0, t = i.length; e < t; e++)
      n.push(this.getDependency("node", i[e]));
    let a =
      void 0 === t.skin
        ? Promise.resolve(null)
        : this.getDependency("skin", t.skin);
    return Promise.all([r, Promise.all(n), a]).then(function (e) {
      let t = e[0],
        r = e[1],
        n = e[2];
      null !== n &&
        t.traverse(function (e) {
          e.isSkinnedMesh && e.bind(n, rR);
        });
      for (let e = 0, n = r.length; e < n; e++) t.add(r[e]);
      return t;
    });
  }
  _loadNodeShallow(e) {
    let t = this.json,
      r = this.extensions,
      n = this;
    if (void 0 !== this.nodeCache[e]) return this.nodeCache[e];
    let i = t.nodes[e],
      a = i.name ? n.createUniqueName(i.name) : "",
      o = [],
      s = n._invokeOne(function (t) {
        return t.createNodeMesh && t.createNodeMesh(e);
      });
    return (
      s && o.push(s),
      void 0 !== i.camera &&
        o.push(
          n.getDependency("camera", i.camera).then(function (e) {
            return n._getNodeRef(n.cameraCache, i.camera, e);
          }),
        ),
      n
        ._invokeAll(function (t) {
          return t.createNodeAttachment && t.createNodeAttachment(e);
        })
        .forEach(function (e) {
          o.push(e);
        }),
      (this.nodeCache[e] = Promise.all(o).then(function (t) {
        let o;
        if (
          (o =
            !0 === i.isBone
              ? new tQ.Bone()
              : t.length > 1
                ? new tQ.Group()
                : 1 === t.length
                  ? t[0]
                  : new tQ.Object3D()) !== t[0]
        )
          for (let e = 0, r = t.length; e < r; e++) o.add(t[e]);
        if (
          (i.name && ((o.userData.name = i.name), (o.name = a)),
          rM(o, i),
          i.extensions && rb(r, o, i),
          void 0 !== i.matrix)
        ) {
          let e = new tQ.Matrix4();
          (e.fromArray(i.matrix), o.applyMatrix4(e));
        } else
          (void 0 !== i.translation && o.position.fromArray(i.translation),
            void 0 !== i.rotation && o.quaternion.fromArray(i.rotation),
            void 0 !== i.scale && o.scale.fromArray(i.scale));
        return (
          n.associations.has(o) || n.associations.set(o, {}),
          (n.associations.get(o).nodes = e),
          o
        );
      })),
      this.nodeCache[e]
    );
  }
  loadScene(e) {
    let t = this.extensions,
      r = this.json.scenes[e],
      n = this,
      i = new tQ.Group();
    (r.name && (i.name = n.createUniqueName(r.name)),
      rM(i, r),
      r.extensions && rb(t, i, r));
    let a = r.nodes || [],
      o = [];
    for (let e = 0, t = a.length; e < t; e++)
      o.push(n.getDependency("node", a[e]));
    return Promise.all(o).then(function (e) {
      for (let t = 0, r = e.length; t < r; t++) i.add(e[t]);
      return (
        (n.associations = ((e) => {
          let t = new Map();
          for (let [e, r] of n.associations)
            (e instanceof tQ.Material || e instanceof tQ.Texture) &&
              t.set(e, r);
          return (
            e.traverse((e) => {
              let r = n.associations.get(e);
              null != r && t.set(e, r);
            }),
            t
          );
        })(i)),
        i
      );
    });
  }
  _createAnimationTracks(e, t, r, n, i) {
    let a,
      o = [],
      s = e.name ? e.name : e.uuid,
      l = [];
    switch (
      (ry[i.path] === ry.weights
        ? e.traverse(function (e) {
            e.morphTargetInfluences && l.push(e.name ? e.name : e.uuid);
          })
        : l.push(s),
      ry[i.path])
    ) {
      case ry.weights:
        a = tQ.NumberKeyframeTrack;
        break;
      case ry.rotation:
        a = tQ.QuaternionKeyframeTrack;
        break;
      case ry.position:
      case ry.scale:
        a = tQ.VectorKeyframeTrack;
        break;
      default:
        a = 1 === r.itemSize ? tQ.NumberKeyframeTrack : tQ.VectorKeyframeTrack;
    }
    let c =
        void 0 !== n.interpolation ? rw[n.interpolation] : tQ.InterpolateLinear,
      u = this._getArrayFromAccessor(r);
    for (let e = 0, r = l.length; e < r; e++) {
      let r = new a(l[e] + "." + ry[i.path], t.array, u, c);
      ("CUBICSPLINE" === n.interpolation &&
        this._createCubicSplineTrackInterpolant(r),
        o.push(r));
    }
    return o;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      let e = rF(t.constructor),
        r = new Float32Array(t.length);
      for (let n = 0, i = t.length; n < i; n++) r[n] = t[n] * e;
      t = r;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    ((e.createInterpolant = function (e) {
      return new (this instanceof tQ.QuaternionKeyframeTrack ? rm : rf)(
        this.times,
        this.values,
        this.getValueSize() / 3,
        e,
      );
    }),
      (e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0));
  }
}
function rD(e, t, r) {
  let n = t.attributes,
    i = [];
  for (let t in n) {
    let a = rC[t] || t.toLowerCase();
    a in e.attributes ||
      i.push(
        (function (t, n) {
          return r.getDependency("accessor", t).then(function (t) {
            e.setAttribute(n, t);
          });
        })(n[t], a),
      );
  }
  if (void 0 !== t.indices && !e.index) {
    let n = r.getDependency("accessor", t.indices).then(function (t) {
      e.setIndex(t);
    });
    i.push(n);
  }
  return (
    rM(e, t),
    !(function (e, t, r) {
      let n = t.attributes,
        i = new tQ.Box3();
      if (void 0 === n.POSITION) return;
      {
        let e = r.json.accessors[n.POSITION],
          t = e.min,
          a = e.max;
        if (void 0 === t || void 0 === a)
          return console.warn(
            "THREE.GLTFLoader: Missing min/max properties for accessor POSITION.",
          );
        if (
          (i.set(
            new tQ.Vector3(t[0], t[1], t[2]),
            new tQ.Vector3(a[0], a[1], a[2]),
          ),
          e.normalized)
        ) {
          let t = rF(rg[e.componentType]);
          (i.min.multiplyScalar(t), i.max.multiplyScalar(t));
        }
      }
      let a = t.targets;
      if (void 0 !== a) {
        let e = new tQ.Vector3(),
          t = new tQ.Vector3();
        for (let n = 0, i = a.length; n < i; n++) {
          let i = a[n];
          if (void 0 !== i.POSITION) {
            let n = r.json.accessors[i.POSITION],
              a = n.min,
              o = n.max;
            if (void 0 !== a && void 0 !== o) {
              if (
                (t.setX(Math.max(Math.abs(a[0]), Math.abs(o[0]))),
                t.setY(Math.max(Math.abs(a[1]), Math.abs(o[1]))),
                t.setZ(Math.max(Math.abs(a[2]), Math.abs(o[2]))),
                n.normalized)
              ) {
                let e = rF(rg[n.componentType]);
                t.multiplyScalar(e);
              }
              e.max(t);
            } else
              console.warn(
                "THREE.GLTFLoader: Missing min/max properties for accessor POSITION.",
              );
          }
        }
        i.expandByVector(e);
      }
      e.boundingBox = i;
      let o = new tQ.Sphere();
      (i.getCenter(o.center),
        (o.radius = i.min.distanceTo(i.max) / 2),
        (e.boundingSphere = o));
    })(e, t, r),
    Promise.all(i).then(function () {
      return void 0 !== t.targets
        ? (function (e, t, r) {
            let n = !1,
              i = !1,
              a = !1;
            for (let e = 0, r = t.length; e < r; e++) {
              let r = t[e];
              if (
                (void 0 !== r.POSITION && (n = !0),
                void 0 !== r.NORMAL && (i = !0),
                void 0 !== r.COLOR_0 && (a = !0),
                n && i && a)
              )
                break;
            }
            if (!n && !i && !a) return Promise.resolve(e);
            let o = [],
              s = [],
              l = [];
            for (let c = 0, u = t.length; c < u; c++) {
              let u = t[c];
              if (n) {
                let t =
                  void 0 !== u.POSITION
                    ? r.getDependency("accessor", u.POSITION)
                    : e.attributes.position;
                o.push(t);
              }
              if (i) {
                let t =
                  void 0 !== u.NORMAL
                    ? r.getDependency("accessor", u.NORMAL)
                    : e.attributes.normal;
                s.push(t);
              }
              if (a) {
                let t =
                  void 0 !== u.COLOR_0
                    ? r.getDependency("accessor", u.COLOR_0)
                    : e.attributes.color;
                l.push(t);
              }
            }
            return Promise.all([
              Promise.all(o),
              Promise.all(s),
              Promise.all(l),
            ]).then(function (t) {
              let r = t[0],
                o = t[1],
                s = t[2];
              return (
                n && (e.morphAttributes.position = r),
                i && (e.morphAttributes.normal = o),
                a && (e.morphAttributes.color = s),
                (e.morphTargetsRelative = !0),
                e
              );
            });
          })(e, t.targets, r)
        : e;
    })
  );
}
var rI = THREE;
let rG = new WeakMap();
class rS extends rI.Loader {
  constructor(e) {
    (super(e),
      (this.decoderPath = ""),
      (this.decoderConfig = {}),
      (this.decoderBinary = null),
      (this.decoderPending = null),
      (this.workerLimit = 4),
      (this.workerPool = []),
      (this.workerNextTaskID = 1),
      (this.workerSourceURL = ""),
      (this.defaultAttributeIDs = {
        position: "POSITION",
        normal: "NORMAL",
        color: "COLOR",
        uv: "TEX_COORD",
      }),
      (this.defaultAttributeTypes = {
        position: "Float32Array",
        normal: "Float32Array",
        color: "Float32Array",
        uv: "Float32Array",
      }));
  }
  setDecoderPath(e) {
    return ((this.decoderPath = e), this);
  }
  setDecoderConfig(e) {
    return ((this.decoderConfig = e), this);
  }
  setWorkerLimit(e) {
    return ((this.workerLimit = e), this);
  }
  load(e, t, r, n) {
    let i = new rI.FileLoader(this.manager);
    (i.setPath(this.path),
      i.setResponseType("arraybuffer"),
      i.setRequestHeader(this.requestHeader),
      i.setWithCredentials(this.withCredentials),
      i.load(
        e,
        (e) => {
          let r = {
            attributeIDs: this.defaultAttributeIDs,
            attributeTypes: this.defaultAttributeTypes,
            useUniqueIDs: !1,
          };
          this.decodeGeometry(e, r).then(t).catch(n);
        },
        r,
        n,
      ));
  }
  decodeDracoFile(e, t, r, n) {
    let i = {
      attributeIDs: r || this.defaultAttributeIDs,
      attributeTypes: n || this.defaultAttributeTypes,
      useUniqueIDs: !!r,
    };
    this.decodeGeometry(e, i).then(t);
  }
  decodeGeometry(e, t) {
    let r;
    for (let e in t.attributeTypes) {
      let r = t.attributeTypes[e];
      void 0 !== r.BYTES_PER_ELEMENT && (t.attributeTypes[e] = r.name);
    }
    let n = JSON.stringify(t);
    if (rG.has(e)) {
      let t = rG.get(e);
      if (t.key === n) return t.promise;
      if (0 === e.byteLength)
        throw Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.",
        );
    }
    let i = this.workerNextTaskID++,
      a = e.byteLength,
      o = this._getWorker(i, a)
        .then(
          (n) => (
            (r = n),
            new Promise((n, a) => {
              ((r._callbacks[i] = {
                resolve: n,
                reject: a,
              }),
                r.postMessage(
                  {
                    type: "decode",
                    id: i,
                    taskConfig: t,
                    buffer: e,
                  },
                  [e],
                ));
            })
          ),
        )
        .then((e) => this._createGeometry(e.geometry));
    return (
      o
        .catch(() => !0)
        .then(() => {
          r && i && this._releaseTask(r, i);
        }),
      rG.set(e, {
        key: n,
        promise: o,
      }),
      o
    );
  }
  _createGeometry(e) {
    let t = new rI.BufferGeometry();
    e.index && t.setIndex(new rI.BufferAttribute(e.index.array, 1));
    for (let r = 0; r < e.attributes.length; r++) {
      let n = e.attributes[r],
        i = n.name,
        a = n.array,
        o = n.itemSize;
      t.setAttribute(i, new rI.BufferAttribute(a, o));
    }
    return t;
  }
  _loadLibrary(e, t) {
    let r = new rI.FileLoader(this.manager);
    return (
      r.setPath(this.decoderPath),
      r.setResponseType(t),
      r.setWithCredentials(this.withCredentials),
      new Promise((t, n) => {
        r.load(e, t, void 0, n);
      })
    );
  }
  preload() {
    return (this._initDecoder(), this);
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    let e = "object" != typeof WebAssembly || "js" === this.decoderConfig.type,
      t = [];
    return (
      e
        ? t.push(this._loadLibrary("draco_decoder.js", "text"))
        : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")),
          t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))),
      (this.decoderPending = Promise.all(t).then((t) => {
        let r = t[0];
        e || (this.decoderConfig.wasmBinary = t[1]);
        let n = rH.toString(),
          i = [
            "/* draco decoder */",
            r,
            "\n/* worker */",
            n.substring(n.indexOf("{") + 1, n.lastIndexOf("}")),
          ].join("\n");
        this.workerSourceURL = URL.createObjectURL(new Blob([i]));
      })),
      this.decoderPending
    );
  }
  _getWorker(e, t) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        let e = new Worker(this.workerSourceURL);
        ((e._callbacks = {}),
          (e._taskCosts = {}),
          (e._taskLoad = 0),
          e.postMessage({
            type: "init",
            decoderConfig: this.decoderConfig,
          }),
          (e.onmessage = function (t) {
            let r = t.data;
            switch (r.type) {
              case "decode":
                e._callbacks[r.id].resolve(r);
                break;
              case "error":
                e._callbacks[r.id].reject(r);
                break;
              default:
                console.error(
                  'THREE.DRACOLoader: Unexpected message, "' + r.type + '"',
                );
            }
          }),
          this.workerPool.push(e));
      } else
        this.workerPool.sort(function (e, t) {
          return e._taskLoad > t._taskLoad ? -1 : 1;
        });
      let r = this.workerPool[this.workerPool.length - 1];
      return ((r._taskCosts[e] = t), (r._taskLoad += t), r);
    });
  }
  _releaseTask(e, t) {
    ((e._taskLoad -= e._taskCosts[t]),
      delete e._callbacks[t],
      delete e._taskCosts[t]);
  }
  debug() {
    console.log(
      "Task load: ",
      this.workerPool.map((e) => e._taskLoad),
    );
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e)
      this.workerPool[e].terminate();
    return ((this.workerPool.length = 0), this);
  }
}
function rH() {
  let e, t;
  onmessage = function (r) {
    let n = r.data;
    switch (n.type) {
      case "init":
        ((e = n.decoderConfig),
          (t = new Promise(function (t) {
            ((e.onModuleLoaded = function (e) {
              t({
                draco: e,
              });
            }),
              DracoDecoderModule(e));
          })));
        break;
      case "decode":
        let i = n.buffer,
          a = n.taskConfig;
        t.then((e) => {
          let t = e.draco,
            r = new t.Decoder(),
            o = new t.DecoderBuffer();
          o.Init(new Int8Array(i), i.byteLength);
          try {
            let e = (function (e, t, r, n) {
                var i, a, o;
                let s,
                  l,
                  c,
                  u,
                  d,
                  h,
                  f = n.attributeIDs,
                  p = n.attributeTypes,
                  m = t.GetEncodedGeometryType(r);
                if (m === e.TRIANGULAR_MESH)
                  ((d = new e.Mesh()), (h = t.DecodeBufferToMesh(r, d)));
                else if (m === e.POINT_CLOUD)
                  ((d = new e.PointCloud()),
                    (h = t.DecodeBufferToPointCloud(r, d)));
                else
                  throw Error("THREE.DRACOLoader: Unexpected geometry type.");
                if (!h.ok() || 0 === d.ptr)
                  throw Error(
                    "THREE.DRACOLoader: Decoding failed: " + h.error_msg(),
                  );
                let A = {
                  index: null,
                  attributes: [],
                };
                for (let r in f) {
                  let i,
                    a,
                    o = self[p[r]];
                  if (n.useUniqueIDs)
                    ((a = f[r]), (i = t.GetAttributeByUniqueId(d, a)));
                  else {
                    if (-1 === (a = t.GetAttributeId(d, e[f[r]]))) continue;
                    i = t.GetAttribute(d, a);
                  }
                  A.attributes.push(
                    (function (e, t, r, n, i, a) {
                      let o = a.num_components(),
                        s = r.num_points() * o,
                        l = s * i.BYTES_PER_ELEMENT,
                        c = (function (e, t) {
                          switch (t) {
                            case Float32Array:
                              return e.DT_FLOAT32;
                            case Int8Array:
                              return e.DT_INT8;
                            case Int16Array:
                              return e.DT_INT16;
                            case Int32Array:
                              return e.DT_INT32;
                            case Uint8Array:
                              return e.DT_UINT8;
                            case Uint16Array:
                              return e.DT_UINT16;
                            case Uint32Array:
                              return e.DT_UINT32;
                          }
                        })(e, i),
                        u = e._malloc(l);
                      t.GetAttributeDataArrayForAllPoints(r, a, c, l, u);
                      let d = new i(e.HEAPF32.buffer, u, s).slice();
                      return (
                        e._free(u),
                        {
                          name: n,
                          array: d,
                          itemSize: o,
                        }
                      );
                    })(e, t, d, r, o, i),
                  );
                }
                return (
                  m === e.TRIANGULAR_MESH &&
                    ((i = e),
                    (a = t),
                    (o = d),
                    (s = 3 * o.num_faces()),
                    (l = 4 * s),
                    (c = i._malloc(l)),
                    a.GetTrianglesUInt32Array(o, l, c),
                    (u = new Uint32Array(i.HEAPF32.buffer, c, s).slice()),
                    i._free(c),
                    (A.index = {
                      array: u,
                      itemSize: 1,
                    })),
                  e.destroy(d),
                  A
                );
              })(t, r, o, a),
              i = e.attributes.map((e) => e.array.buffer);
            (e.index && i.push(e.index.array.buffer),
              self.postMessage(
                {
                  type: "decode",
                  id: n.id,
                  geometry: e,
                },
                i,
              ));
          } catch (e) {
            (console.error(e),
              self.postMessage({
                type: "error",
                id: n.id,
                error: e.message,
              }));
          } finally {
            (t.destroy(o), t.destroy(r));
          }
        });
    }
  };
}
let rL = function (e) {
    let t = new Map(),
      r = new Map(),
      n = e.clone();
    return (
      (function e(t, r, n) {
        n(t, r);
        for (let i = 0; i < t.children.length; i++)
          e(t.children[i], r.children[i], n);
      })(e, n, function (e, n) {
        (t.set(n, e), r.set(e, n));
      }),
      n.traverse(function (e) {
        if (!e.isSkinnedMesh) return;
        let n = t.get(e),
          i = n.skeleton.bones;
        ((e.skeleton = n.skeleton.clone()),
          e.bindMatrix.copy(n.bindMatrix),
          (e.skeleton.bones = i.map(function (e) {
            return r.get(e);
          })),
          e.bind(e.skeleton, e.bindMatrix));
      }),
      n
    );
  },
  rP = React.forwardRef(
    (
      {
        isChild: e = !1,
        object: t,
        children: r,
        deep: n,
        castShadow: i,
        receiveShadow: o,
        inject: s,
        keys: l,
        ...c
      },
      u,
    ) => {
      let d = {
        keys: l,
        deep: n,
        inject: s,
        castShadow: i,
        receiveShadow: o,
      };
      if (
        Array.isArray(
          (t = React.useMemo(() => {
            if (!1 === e && !Array.isArray(t)) {
              let e = !1;
              if (
                (t.traverse((t) => {
                  t.isSkinnedMesh && (e = !0);
                }),
                e)
              )
                return rL(t);
            }
            return t;
          }, [t, e])),
        )
      )
        return React.createElement(
          "group",
          A({}, c, {
            ref: u,
          }),
          t.map((e) =>
            React.createElement(
              rP,
              A(
                {
                  key: e.uuid,
                  object: e,
                },
                d,
              ),
            ),
          ),
          r,
        );
      let { children: h, ...f } = (function (
          e,
          {
            keys: t = [
              "near",
              "far",
              "color",
              "distance",
              "decay",
              "penumbra",
              "angle",
              "intensity",
              "skeleton",
              "visible",
              "castShadow",
              "receiveShadow",
              "morphTargetDictionary",
              "morphTargetInfluences",
              "name",
              "geometry",
              "material",
              "position",
              "rotation",
              "scale",
              "up",
              "userData",
              "bindMode",
              "bindMatrix",
              "bindMatrixInverse",
              "skeleton",
            ],
            deep: r,
            inject: n,
            castShadow: i,
            receiveShadow: o,
          },
        ) {
          let s = {};
          for (let r of t) s[r] = e[r];
          return (
            r &&
              (s.geometry &&
                "materialsOnly" !== r &&
                (s.geometry = s.geometry.clone()),
              s.material &&
                "geometriesOnly" !== r &&
                (s.material = s.material.clone())),
            n &&
              (s =
                "function" == typeof n
                  ? {
                      ...s,
                      children: n(e),
                    }
                  : React.isValidElement(n)
                    ? {
                        ...s,
                        children: n,
                      }
                    : {
                        ...s,
                        ...n,
                      }),
            e instanceof THREE.Mesh &&
              (i && (s.castShadow = !0), o && (s.receiveShadow = !0)),
            s
          );
        })(t, d),
        p = t.type[0].toLowerCase() + t.type.slice(1);
      return React.createElement(
        p,
        A({}, f, c, {
          ref: u,
        }),
        t.children.map((e) =>
          "Bone" === e.type
            ? React.createElement(
                "primitive",
                A(
                  {
                    key: e.uuid,
                    object: e,
                  },
                  d,
                ),
              )
            : React.createElement(
                rP,
                A(
                  {
                    key: e.uuid,
                    object: e,
                  },
                  d,
                  {
                    isChild: !0,
                  },
                ),
              ),
        ),
        r,
        h,
      );
    },
  ),
  rU = null,
  rO = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";
function rJ(e = !0, t = !0, n) {
  return (i) => {
    (n && n(i),
      e &&
        (rU || (rU = new rS()),
        rU.setDecoderPath("string" == typeof e ? e : rO),
        i.setDRACOLoader(rU)),
      t &&
        i.setMeshoptDecoder(
          (() => {
            let e;
            if (r) return r;
            let t = new Uint8Array([
                0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0,
                5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0,
                252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11,
              ]),
              n = new Uint8Array([
                32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13, 33,
                12, 16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22, 14, 255,
                66, 24, 54, 136, 107, 18, 23, 192, 26, 114, 118, 132, 17, 77,
                101, 130, 144, 27, 87, 131, 44, 45, 74, 156, 154, 70, 167,
              ]);
            if ("object" != typeof WebAssembly)
              return {
                supported: !1,
              };
            let i =
              "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";
            WebAssembly.validate(t) &&
              (i =
                "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");
            let a = WebAssembly.instantiate(
              (function (e) {
                let t = new Uint8Array(e.length);
                for (let r = 0; r < e.length; ++r) {
                  let n = e.charCodeAt(r);
                  t[r] =
                    n > 96
                      ? n - 71
                      : n > 64
                        ? n - 65
                        : n > 47
                          ? n + 4
                          : n > 46
                            ? 63
                            : 62;
                }
                let r = 0;
                for (let i = 0; i < e.length; ++i)
                  t[r++] = t[i] < 60 ? n[t[i]] : (t[i] - 60) * 64 + t[++i];
                return t.buffer.slice(0, r);
              })(i),
              {},
            ).then((t) => {
              (e = t.instance).exports.__wasm_call_ctors();
            });
            function o(t, r, n, i, a, o) {
              let s = e.exports.sbrk,
                l = (n + 3) & -4,
                c = s(l * i),
                u = s(a.length),
                d = new Uint8Array(e.exports.memory.buffer);
              d.set(a, u);
              let h = t(c, n, i, u, a.length);
              if (
                (0 === h && o && o(c, l, i),
                r.set(d.subarray(c, c + n * i)),
                s(c - s(0)),
                0 !== h)
              )
                throw Error(`Malformed buffer data: ${h}`);
            }
            let s = {
                0: "",
                1: "meshopt_decodeFilterOct",
                2: "meshopt_decodeFilterQuat",
                3: "meshopt_decodeFilterExp",
                NONE: "",
                OCTAHEDRAL: "meshopt_decodeFilterOct",
                QUATERNION: "meshopt_decodeFilterQuat",
                EXPONENTIAL: "meshopt_decodeFilterExp",
              },
              l = {
                0: "meshopt_decodeVertexBuffer",
                1: "meshopt_decodeIndexBuffer",
                2: "meshopt_decodeIndexSequence",
                ATTRIBUTES: "meshopt_decodeVertexBuffer",
                TRIANGLES: "meshopt_decodeIndexBuffer",
                INDICES: "meshopt_decodeIndexSequence",
              };
            return (r = {
              ready: a,
              supported: !0,
              decodeVertexBuffer(t, r, n, i, a) {
                o(
                  e.exports.meshopt_decodeVertexBuffer,
                  t,
                  r,
                  n,
                  i,
                  e.exports[s[a]],
                );
              },
              decodeIndexBuffer(t, r, n, i) {
                o(e.exports.meshopt_decodeIndexBuffer, t, r, n, i);
              },
              decodeIndexSequence(t, r, n, i) {
                o(e.exports.meshopt_decodeIndexSequence, t, r, n, i);
              },
              decodeGltfBuffer(t, r, n, i, a, c) {
                o(e.exports[l[a]], t, r, n, i, e.exports[s[c]]);
              },
            });
          })(),
        ));
  };
}
let rk = (e, t, r, n) => (0, dependency971.useLoader)(tz, e, rJ(t, r, n));
((rk.preload = (e, t, r, n) =>
  dependency971.useLoader.preload(tz, e, rJ(t, r, n))),
  (rk.clear = (e) => dependency971.useLoader.clear(tz, e)),
  (rk.setDecoderPath = (e) => {
    rO = e;
  }));
let rN = (e) => e === Object(e) && !Array.isArray(e) && "function" != typeof e;
function r_(e, t) {
  let r = (0, fiberHooks.useThree)((e) => e.gl),
    n = (0, dependency971.useLoader)(
      THREE.TextureLoader,
      rN(e) ? Object.values(e) : e,
    );
  return (
    (0, React.useLayoutEffect)(() => {
      null == t || t(n);
    }, [t]),
    (0, React.useEffect)(() => {
      if ("initTexture" in r) {
        let e = [];
        (Array.isArray(n)
          ? (e = n)
          : n instanceof THREE.Texture
            ? (e = [n])
            : rN(n) && (e = Object.values(n)),
          e.forEach((e) => {
            e instanceof THREE.Texture && r.initTexture(e);
          }));
      }
    }, [r, n]),
    (0, React.useMemo)(() => {
      if (!rN(e)) return n;
      {
        let t = {},
          r = 0;
        for (let i in e) t[i] = n[r++];
        return t;
      }
    }, [e, n])
  );
}
((r_.preload = (e) => dependency971.useLoader.preload(THREE.TextureLoader, e)),
  (r_.clear = (e) => dependency971.useLoader.clear(THREE.TextureLoader, e)));
export { r_, rk, OriginalComponentTX, B };
