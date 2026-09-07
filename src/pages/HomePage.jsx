// Original page components recovered without redesign.
import { r_, rk, OriginalComponentTX, B } from "../vendor/scene-helpers.jsx";
// Recovered from 1892a55978d500a4.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import { hasAsset } from "../asset-availability.js";
import { ESAProfile, ESAQuestions } from "../components/ESAContent.jsx";
import SectionWipe from "../components/SectionWipe.jsx";
import { advanceHeroLogo } from "../animation/hero-logo.js";
import { brand } from "../theme.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as AnimatedButton from "../components/AnimatedButton.jsx";
import * as HeadingReveal from "../components/HeadingReveal.jsx";
const animation = getVendor(89970);
import * as TextReveal from "../components/TextReveal.jsx";
import * as GenerativeGraphic from "../components/GenerativeGraphic.jsx";
const fiberCanvas = getVendor(75056);
const fiberFrame = getVendor(49774);
const fiberHooks = getVendor(73949);
const THREE = getVendor(90072);
import * as loadingStore from "../state/loadingStore.js";
import * as links from "../routing/Router.jsx";
const scrollPlugin = getVendor(33809);
const scrollRig = getVendor(8429);
const scrollTrigger = getVendor(83495);
const textPlugin = getVendor(75324);
const draggable = getVendor(43447);
import "../components/CustomCursor.jsx";
let OriginalComponentD = () => (
    <span className="relative inline-flex items-center justify-center mr-2">
      <span className="absolute size-3 max-md:size-2 rounded-full bg-brand-gold animate-ping opacity-75" />
      <span className="relative size-2 max-md:size-1.5 rounded-full bg-brand-gold" />
    </span>
  ),
  Services = ({ circleRef }) => {
    let e = (0, React.useRef)(null);
    (0, React.useEffect)(() => {
      let t = animation.default.timeline({
        repeat: -1,
      });
      e.current &&
        t
          .to(e.current, {
            rotation: "+=90",
            duration: 2,
            ease: "none",
          })
          .to(e.current, {
            duration: 2,
          })
          .to(e.current, {
            rotation: "+=90",
            duration: 2,
            ease: "none",
          })
          .to(e.current, {
            duration: 2,
          })
          .to(e.current, {
            rotation: "+=90",
            duration: 2,
            ease: "none",
          })
          .to(e.current, {
            duration: 2,
          })
          .to(e.current, {
            rotation: "+=90",
            duration: 2,
            ease: "none",
          })
          .to(e.current, {
            duration: 2,
          });
    }, []);
    let t = Array.from(
      {
        length: 12,
      },
      (e, t) => 30 * t - 90,
    );
    return (
      <section className="overflow-y-clip relative w-full flex flex-col items-center justify-between">
        <div
          id="services"
          className="h-[20vh] md:h-[30vw] flex items-center justify-center w-full"
        >
          <HeadingReveal.default>
            <h2 className="text-[16vw] relative z-10 md:text-[10vw] leading-none font-semibold font-display uppercase text-center">
              {"De la "}
              <span className="text-brand-gold">{"idee"}</span>
              {" la cod"}
            </h2>
          </HeadingReveal.default>
        </div>
        <div className="max-md:h-[60vh] relative  md:h-screen w-full flex items-center justify-center">
          <div className="visible max-md:hidden size-[20vw] absolute right-[3vw] top-[-10vw]">
            <GenerativeGraphic.default variant={3} />
          </div>
          <div className=" w-[150vw] h-px absolute top-1/2 -translate-y-1/2 left-[-10%] bg-zinc-500/30" />
          <div className=" h-[300vh] w-px absolute top-[-70%] left-1/2 -translate-x-1/2 bg-zinc-500/30" />
          <div ref={circleRef} data-logo-dock className="relative max-md:size-[60vw] md:size-[35vw] mx-auto flex items-center justify-center">
            <div
              ref={e}
              className="absolute inset-0 rounded-full border-2 border-brand-gold border-dashed flex items-center justify-center"
            >
              {t.map((e, t) => (
                <div
                  className="absolute "
                  style={{
                    transform: `rotate(${e}deg)`,
                    width: "36vw",
                    height: "2px",
                    transformOrigin: "center",
                  }}
                  key={t}
                >
                  <div className="absolute right-0 max-md:w-[2.5vw] md:w-[1.5vw] h-full bg-brand-gold" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0">
              {[
                {
                  text: "Design",
                  position:
                    "max-md:top-0 max-md:left-0 max-md:-translate-x-1/2 max-md:-translate-y-1/2 md:top-1/2 md:left-0 md:-translate-y-1/2 md:-translate-x-full md:pr-[2vw]",
                },
                {
                  text: "Dezvoltare",
                  position:
                    "max-md:top-0 max-md:right-0 max-md:translate-x-1/2 max-md:-translate-y-1/2 md:top-[-15%] md:left-1/2 md:right-auto md:-translate-x-1/2 md:translate-y-0 md:-translate-y-full md:pb-[2vw]",
                },
                {
                  text: "Automatizari",
                  position:
                    "max-md:bottom-0 max-md:right-0 max-md:translate-x-1/2 max-md:translate-y-1/2 md:top-1/2 md:right-0 md:bottom-auto md:-translate-y-1/2 md:translate-x-full md:pl-[2vw]",
                },
                {
                  text: "E-commerce",
                  position:
                    "max-md:bottom-0 max-md:left-0 max-md:-translate-x-1/2 max-md:translate-y-1/2 md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-full md:pt-[2vw]",
                },
              ].map((e, t) => (
                <div
                  className={`absolute ${e.position} max-md:text-[6vw] md:text-[2vw] font-display uppercase font-semibold whitespace-nowrap`}
                  key={t}
                >
                  <div className="flex items-center">
                    <OriginalComponentD />
                    <TextReveal.default>
                      <p>{e.text}</p>
                    </TextReveal.default>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
var rj = THREE;
class GlowMaterial extends rj.MeshPhysicalMaterial {
  constructor(e = {}) {
    (super(e),
      (this.uniforms = {
        uHitPoint: {
          value: new rj.Vector3(0, 0, 0),
        },
        uGlowStrength: {
          value: 0,
        },
        uGlowSpread: {
          value: 0,
        },
        uTime: {
          value: 0,
        },
        uWaveProgress: {
          value: 0,
        },
        uModelCenter: {
          value: new rj.Vector3(0, 0, 0),
        },
      }));
  }
  onBeforeCompile(e) {
    ((e.uniforms.uHitPoint = this.uniforms.uHitPoint),
      (e.uniforms.uGlowStrength = this.uniforms.uGlowStrength),
      (e.uniforms.uGlowSpread = this.uniforms.uGlowSpread),
      (e.uniforms.uTime = this.uniforms.uTime),
      (e.uniforms.uWaveProgress = this.uniforms.uWaveProgress),
      (e.uniforms.uModelCenter = this.uniforms.uModelCenter),
      (e.vertexShader = e.vertexShader.replace(
        "#include <common>",
        `
      #include <common>
      varying vec3 vWorldPos;
      `,
      )),
      (e.vertexShader = e.vertexShader.replace(
        "#include <begin_vertex>",
        `
      #include <begin_vertex>
      vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      `,
      )),
      (e.fragmentShader = e.fragmentShader.replace(
        "#include <common>",
        `
      #include <common>
      uniform vec3 uHitPoint;
      uniform float uGlowStrength;
      uniform float uGlowSpread;
      uniform float uTime;
      uniform float uWaveProgress;
      uniform vec3 uModelCenter;
      varying vec3 vWorldPos;
      
      // Function to draw a line between two points
      float lineDist(vec2 p, vec2 a, vec2 b) {
        vec2 pa = p - a;
        vec2 ba = b - a;
        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        return length(pa - ba * h);
      }
      `,
      )),
      (e.fragmentShader = e.fragmentShader.replace(
        "#include <dithering_fragment>",
        `
      #include <dithering_fragment>
      
      // Calculate distance from hit point
      float distFromHit = distance(vWorldPos, uHitPoint);
      
      // Wave parameters
      float maxDist = 5.0;
      float waveWidth = 1.5;
      
      // Wave front position based on progress
      float waveFront = uWaveProgress * maxDist;
      float waveBack = waveFront - waveWidth;
      
      // Create a ring/band that expands outward from hit point
      float leadingEdge = 1.0 - smoothstep(waveFront - 0.3, waveFront, distFromHit);
      float trailingEdge = smoothstep(waveBack, waveBack + 0.3, distFromHit);
      float waveMask = leadingEdge * trailingEdge;
      
      // Create evenly spaced dot grid
      float dotSpacing = 0.15;
      vec3 gridPos = vWorldPos / dotSpacing;
      vec3 gridCenter = floor(gridPos) + 0.5;
      vec3 worldGridCenter = gridCenter * dotSpacing;
      
      // Distance from current position to nearest grid center
      float dotDist = length(fract(gridPos) - 0.5);
      
      // Create small dots (bigger radius than lines)
      float dotRadius = 0.25;
      float dot = 1.0 - smoothstep(0.0, dotRadius, dotDist);
      
      // Create grid lines connecting dots
      vec2 gridUV = fract(gridPos.xy);
      float lineWidth = 0.03;
      
      // Horizontal lines
      float hLine = 1.0 - smoothstep(0.0, lineWidth, abs(gridUV.y - 0.5));
      // Vertical lines
      float vLine = 1.0 - smoothstep(0.0, lineWidth, abs(gridUV.x - 0.5));
      
      // Combine lines
      float lines = max(hLine, vLine) * 0.5;
      
      // Combine dots and lines
      float pattern = max(dot, lines);
      
      // White dot and line color
      vec3 patternColor = vec3(1.0, 1.0, 1.0);
      
      // Apply wave mask to the pattern
      float finalMask = waveMask * uGlowStrength;
      
      gl_FragColor.rgb += patternColor * pattern * finalMask * 1.5;
      gl_FragColor.rgb = clamp(gl_FragColor.rgb, 0.0, 1.5);
      `,
      )),
      (this.userData.shader = e));
  }
}
function EnvironmentReady() {
  let { scene: e } = (0, fiberHooks.useThree)(),
    t = (0, loadingStore.useLoadingStore)((e) => e.setHDRILoaded),
    r = (0, React.useRef)(!1);
  return (
    (0, fiberFrame.useFrame)(() => {
      e.environment && !r.current && (t(!0), (r.current = !0));
    }),
    null
  );
}
function useSuppliedTexture(url) {
  // No generated/substitute textures: use the original map only when supplied.
  return r_(hasAsset(url) ? [url] : [])[0] || null;
}
function useESALogoScene() {
  const { scene } = rk("/assets/ESA_logo_1.glb");
  return React.useMemo(() => {
    const model = scene.clone(true);
    model.traverse((object) => {
      if (object.isMesh && !object.geometry.attributes.normal) {
        object.geometry = object.geometry.clone();
        object.geometry.computeVertexNormals();
      }
    });
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    model.position.sub(bounds.getCenter(new THREE.Vector3()));
    // ESA is authored in XY; the original animation expects an XZ model.
    // Match the original model's longest dimension without distorting the logo.
    const alignment = new THREE.Group();
    alignment.rotation.x = -Math.PI / 2;
    alignment.scale.setScalar(1.881714 / Math.max(size.x, size.y, size.z));
    alignment.add(model);
    const result = new THREE.Group();
    result.add(alignment);
    return result;
  }, [scene]);
}
function InteractiveLogo({ containerRef: e, scrollVelocity: t, circleRef }) {
  let r = useESALogoScene(),
    n = (0, React.useRef)();
  const rotationState = React.useRef({ angle: 0, entryAngle: null });
  let { raycaster: o, camera: s, gl: l } = (0, fiberHooks.useThree)(),
    c = (0, loadingStore.useLoadingStore)((e) => e.setModelLoaded),
    u = useSuppliedTexture("/textures/snow_01_diff_1k.jpg"),
    d = useSuppliedTexture("/textures/sparse_grass_nor_gl_1k.jpg"),
    h = (0, React.useRef)(new rj.Vector3(0, 0, 0)),
    f = (0, React.useRef)(0),
    A = (0, React.useRef)(0),
    g = (0, React.useRef)(0),
    B = (0, React.useRef)(new rj.Vector3(0, 0, 0)),
    v = (0, React.useRef)(!1),
    x = (0, React.useRef)([]),
    C = (0, React.useRef)(new rj.Vector2(0, 0)),
    y = (0, React.useRef)(!1);
  return (
    (0, React.useEffect)(() => {
      let t = e?.current;
      if (!t) return;
      let r = (e) => {
          let r = t.getBoundingClientRect();
          ((C.current.x = ((e.clientX - r.left) / r.width) * 2 - 1),
            (C.current.y = -(2 * ((e.clientY - r.top) / r.height)) + 1));
        },
        n = () => {
          y.current = !0;
        },
        i = () => {
          y.current = !1;
        };
      return (
        t.addEventListener("mousemove", r),
        t.addEventListener("mouseenter", n),
        t.addEventListener("mouseleave", i),
        () => {
          (t.removeEventListener("mousemove", r),
            t.removeEventListener("mouseenter", n),
            t.removeEventListener("mouseleave", i));
        }
      );
    }, [e]),
    (0, React.useEffect)(() => {
      r &&
        ((x.current = []),
        r.traverse((e) => {
          if (e.isMesh) {
            let t = new GlowMaterial({
              color: new rj.Color(brand.gold),
              roughness: 0.28,
              metalness: 0.82,
              clearcoat: 0.5,
              clearcoatRoughness: 0.1,
              map: u,
              normalMap: d,
            });
            ((e.material = t), x.current.push(t));
          }
        }),
        c(!0));
    }, [r, u, d, c]),
    (0, fiberFrame.useFrame)((frame, delta) => {
      if (n.current) {
        const circle = circleRef.current?.getBoundingClientRect();
        const logo = e.current?.getBoundingClientRect();
        const distance = circle && logo ? circle.top + circle.height / 2 - (logo.top + logo.height / 2) : Infinity;
        n.current.rotation.z = advanceHeroLogo(rotationState.current, Math.max(0, distance - 1), window.innerHeight * 0.35, t?.current || 0, delta);
        if (y.current) {
          o.setFromCamera(C.current, s);
          let e = [];
          n.current.traverse((t) => {
            t.isMesh && e.push(t);
          });
          let t = o.intersectObjects(e, !1);
          t.length > 0 &&
            !v.current &&
            (h.current.copy(t[0].point),
            (g.current = 0),
            (v.current = !0),
            (f.current = 1));
        }
        (v.current &&
          ((g.current += 0.012),
          g.current >= 1.5 &&
            ((v.current = !1), (f.current = 0), (g.current = 0))),
          x.current.forEach((t) => {
            (t.uniforms.uHitPoint.value.copy(h.current),
              (t.uniforms.uGlowStrength.value = f.current),
              (t.uniforms.uGlowSpread.value = A.current),
              (t.uniforms.uWaveProgress.value = g.current),
              t.uniforms.uModelCenter.value.copy(B.current),
              (t.uniforms.uTime.value = frame.clock.elapsedTime));
          }));
      }
    }),
    (<primitive ref={n} object={r} rotation-x={Math.PI / 2} scale={1.5} />)
  );
}
let Hero = () => {
  const circleRef = React.useRef(null);
  let e = (0, React.useRef)(null),
    t = (0, React.useRef)(0),
    r = (0, React.useRef)(0),
    n = (0, React.useRef)(Date.now());
  return (
    (0, React.useEffect)(() => {
      let e = () => {
          let e = Date.now(),
            i = window.scrollY,
            a = e - n.current;
          (a > 0 && (t.current = (i - r.current) / a),
            (r.current = i),
            (n.current = e));
        },
        i = setInterval(() => {
          t.current *= 0.95;
        }, 16);
      return (
        window.addEventListener("scroll", e, {
          passive: !0,
        }),
        () => {
          (window.removeEventListener("scroll", e), clearInterval(i));
        }
      );
    }, []),
    (
      <section className="relative overflow-clip w-full px-[3vw] max-md:px-[6vw]">
        <div className="h-screen relative overflow-y-clip flex items-center">
          <div className="size-[25vh] hidden max-md:block -rotate-180 absolute top-0 right-[-10vw] ">
            <GenerativeGraphic.default variant={8} />
          </div>
          <div className="visible max-md:hidden size-[20vw] absolute bottom-0 ">
            <GenerativeGraphic.default variant={2} />
          </div>
          <div className="w-px h-full absolute top-0 left-1/2 -translate-x-1/2 bg-zinc-500/30" />
          <div className="h-fit flex flex-col-reverse md:flex-row justify-between gap-[5vh] md:gap-0">
            <div className="w-full md:w-1/2">
              <div className="w-1/2 max-md:w-full ">
                <TextReveal.default delay={1}>
                  <p className="font-sans w-full text-[4vw] max-md:w-[90%] md:text-[1.3vw] font-medium">
                    {
                      "Design care atrage. Cod care functioneaza. Creez website-uri, aplicatii si automatizari pentru afaceri care au nevoie de mai mult decat o prezenta online."
                    }
                  </p>
                </TextReveal.default>
              </div>
              <links.default href="/contact">
                <AnimatedButton.default className="mt-[5vh] bg-brand-gold md:mt-[5vh]">
                  {"Hai sa discutam"}
                </AnimatedButton.default>
              </links.default>
            </div>
            <div className="w-full md:w-1/2 pl-[3vw] max-md:pl-0 text-[16vw] md:text-[8vw] leading-none font-semibold font-display uppercase">
              <HeadingReveal.default delay={1}>
                <h1>
                  {"Brandul tau "}
                  <span className="text-brand-gold">{"merita"}</span>
                  {" mai mult decat un site frumos."}
                </h1>
              </HeadingReveal.default>
            </div>
          </div>
        </div>
        <Services circleRef={circleRef} />
        <div className="absolute z-100 inset-0 w-full h-[calc(200vh+30vw)] max-md:h-[200vh] pointer-events-none">
          <div className="h-screen w-full sticky inset-0 flex items-center justify-center">
            <div
              ref={e}
              className="size-[60vw] md:size-[30vw] pointer-events-auto"
            >
              <fiberCanvas.Canvas
                className="z-100"
                camera={{
                  position: [0, 0, 5],
                  fov: 45,
                }}
              >
                <OriginalComponentTX files="/assets/brown_photostudio_02_1k.hdr" />
                <EnvironmentReady />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <React.Suspense fallback={null}>
                  <B>
                    <InteractiveLogo containerRef={e} scrollVelocity={t} circleRef={circleRef} />
                  </B>
                </React.Suspense>
              </fiberCanvas.Canvas>
            </div>
          </div>
        </div>
      </section>
    )
  );
};
animation.default.registerPlugin(scrollPlugin.ScrollTrigger);
let r$ = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,
  r0 = `
  uniform sampler2D uTexture;
  uniform sampler2D uDepthMap;
  uniform vec2 uMouse;
  uniform float uStrength;
  uniform vec2 uResolution;
  uniform float uBorderRadius;
  uniform float uReveal;
  uniform vec2 uTextureResolution;
  uniform float uDepthScale;
  uniform float uEnterBlur;
  varying vec2 vUv;
  
  // Object-fit: cover - maintains aspect ratio and covers the plane
  vec2 objectCover(vec2 uv, vec2 textureRes, vec2 planeRes) {
    vec2 s = planeRes / textureRes;
    float scale = max(s.x, s.y);
    vec2 newSize = textureRes * scale;
    vec2 offset = (planeRes - newSize) / 2.0;
    return (uv * planeRes - offset) / newSize;
  }
  
  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }
  
  // Hexagonal distance function
  float hexDist(vec2 p) {
    p = abs(p);
    return max(dot(p, normalize(vec2(1.0, 1.732))), p.y);
  }
  
  // Hexagonal grid - returns local coords and cell id
  vec4 hexCoords(vec2 uv) {
    vec2 s = vec2(1.0, 1.732);
    vec2 p = uv * 2.0;
    
    vec2 a = mod(p, s) - s * 0.5;
    vec2 b = mod(p + s * 0.5, s) - s * 0.5;
    
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    vec2 id = p - gv;
    
    return vec4(gv, id);
  }
  
  // Simple noise function
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  void main() {
    // Apply rounded corners first to check if we should discard
    vec2 pixelPos = vUv * uResolution;
    vec2 center = uResolution * 0.5;
    float dist = roundedBoxSDF(pixelPos - center, center, uBorderRadius);
    
    // Discard pixels outside the rounded rectangle (sharp edge)
    if (dist > 0.0) {
      discard;
    }
    
    // Hexagonal reveal from center with noise
    vec2 centeredUv = vUv - 0.5;
    float aspect = uResolution.x / uResolution.y;
    centeredUv.x *= aspect;
    
    // Create hexagonal grid - smaller scale = bigger hexagons
    float hexScale = 3.0;
    vec4 hex = hexCoords(centeredUv * hexScale);
    vec2 hexGv = hex.xy;
    vec2 hexId = hex.zw;
    
    // Distance from center for each hex cell (normalized)
    float cellDist = length(hexId / hexScale * 0.5);
    
    // Add noise based on hex cell id
    float noise = hash(hexId) * 0.2;
    
    // Threshold value for this cell
    float threshold = cellDist + noise;
    
    // Reveal expands from 0 to ~1.5 to cover all cells
    // When uReveal > threshold, the cell is visible
    float revealAlpha = step(threshold, uReveal * 1.5);
    
    if (revealAlpha < 0.01) {
      discard;
    }
    
    // Apply object-cover to UVs
    vec2 coverUv = objectCover(vUv, uTextureResolution, uResolution);
    
    // Sample depth and calculate offset with scaling
    // Invert the depth so far objects move more and near objects move less
    float depth = uDepthScale > 0.0 ? (1.0 - texture2D(uDepthMap, coverUv).r) * uDepthScale : 0.0;
    vec2 offset = uMouse * depth * uStrength;
    
    // Calculate the safe UV range to prevent edge bleeding
    float maxOffset = uStrength;
    vec2 safeMin = vec2(maxOffset);
    vec2 safeMax = vec2(1.0 - maxOffset);
    
    // Apply offset and clamp within safe bounds
    vec2 offsetUv = coverUv + offset;
    offsetUv = clamp(offsetUv, safeMin, safeMax);
    
    // Radial zoom blur on first hover (blur from center outward)
    vec4 color = vec4(0.0);
    
    if (uEnterBlur > 0.01) {
      const int SAMPLES = 10;
      float totalWeight = 0.0;
      vec2 blurCenter = vec2(0.5, 0.5);
      
      for (int i = 0; i < SAMPLES; i++) {
        float t = float(i) / float(SAMPLES - 1);
        // Zoom blur: samples along the line from center to current pixel
        vec2 dir = offsetUv - blurCenter;
        float blurAmount = uEnterBlur * 0.15; // Control blur intensity
        vec2 sampleUv = offsetUv - dir * t * blurAmount;
        sampleUv = clamp(sampleUv, safeMin, safeMax);
        
        // Weight samples (center samples weighted more)
        float weight = 1.0 - t * 0.5;
        color += texture2D(uTexture, sampleUv) * weight;
        totalWeight += weight;
      }
      
      color /= totalWeight;
    } else {
      color = texture2D(uTexture, offsetUv);
    }
    
    color.a *= revealAlpha;
    
    gl_FragColor = color;
  }
`,
  DepthImageScene = ({
    src: e,
    depthMap: t,
    scale: r,
    track: n,
    inViewport: o,
    ...s
  }) => {
    let [l, c] = r_(hasAsset(t) ? [e, t] : [e]),
      u = (0, React.useRef)(),
      d = (0, React.useRef)({
        x: 0,
        y: 0,
      }),
      h = (0, React.useRef)({
        x: 0,
        y: 0,
      }),
      f = (0, React.useRef)(!1),
      m = (0, React.useRef)(0),
      A = (0, React.useRef)(!1),
      B = (0, React.useRef)(0),
      v = (0, React.useRef)(!1);
    (0, React.useMemo)(() => {
      ((l.wrapS = l.wrapT = THREE.ClampToEdgeWrapping),
        (l.minFilter = THREE.LinearFilter),
        (l.magFilter = THREE.LinearFilter));
      if (c)
        ((c.wrapS = c.wrapT = THREE.ClampToEdgeWrapping),
          (c.minFilter = THREE.LinearFilter),
          (c.magFilter = THREE.LinearFilter));
    }, [l, c]);
    let x = (0, React.useMemo)(
      () => ({
        uTexture: {
          value: l,
        },
        uDepthMap: {
          value: c || null,
        },
        uMouse: {
          value: new THREE.Vector2(0, 0),
        },
        uStrength: {
          value: 0.02,
        },
        uResolution: {
          value: new THREE.Vector2(r.x, r.y),
        },
        uBorderRadius: {
          value: 0.05 * Math.min(r.x, r.y),
        },
        uReveal: {
          value: 0,
        },
        uTextureResolution: {
          value: new THREE.Vector2(l.image.width, l.image.height),
        },
        uDepthScale: {
          value: c ? 1 : 0,
        },
        uEnterBlur: {
          value: 0,
        },
      }),
      [l, c, r],
    );
    return (
      (0, React.useEffect)(() => {
        let e = n?.current;
        if (!e) return;
        let t = (t) => {
            let r = e.getBoundingClientRect(),
              n = ((t.clientX - r.left) / r.width) * 2 - 1,
              i = -(2 * ((t.clientY - r.top) / r.height)) + 1;
            ((h.current.x = n), (h.current.y = i));
          },
          r = () => {
            ((f.current = !0),
              v.current || ((v.current = !0), (B.current = 1)));
          },
          i = () => {
            ((f.current = !1),
              (h.current.x = 0),
              (h.current.y = 0),
              (v.current = !1));
          };
        return (
          e.addEventListener("mousemove", t),
          e.addEventListener("mouseenter", r),
          e.addEventListener("mouseleave", i),
          () => {
            (e.removeEventListener("mousemove", t),
              e.removeEventListener("mouseenter", r),
              e.removeEventListener("mouseleave", i));
          }
        );
      }, [n]),
      (0, React.useEffect)(() => {
        o && !A.current && (A.current = !0);
      }, [o]),
      (0, fiberFrame.useFrame)((e, t) => {
        ((d.current.x += (h.current.x - d.current.x) * 0.1),
          (d.current.y += (h.current.y - d.current.y) * 0.1),
          B.current > 0 && (B.current = Math.max(0, B.current - 3 * t)),
          A.current &&
            m.current < 1 &&
            (m.current = Math.min(m.current + 0.5 * t, 1)),
          u.current &&
            (u.current.uniforms.uMouse.value.set(d.current.x, d.current.y),
            (u.current.uniforms.uReveal.value = m.current),
            (u.current.uniforms.uEnterBlur.value = B.current)));
      }),
      (
        <group {...s}>
          <mesh scale={r}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <shaderMaterial
              ref={u}
              vertexShader={r$}
              fragmentShader={r0}
              uniforms={x}
              transparent={!0}
            />
          </mesh>
        </group>
      )
    );
  };
animation.default.registerPlugin(scrollPlugin.ScrollTrigger);
let WorkImage = ({ className: e, src: t, depthMap: r }) => {
  let n = (0, React.useRef)(null),
    o = (0, React.useRef)(null),
    s = (0, React.useRef)([]),
    [c, u] = (0, React.useState)(!1),
    d = (0, React.useRef)(!1);
  return ((0, React.useEffect)(() => {
    let e = () => {
      u(window.innerWidth < 768);
    };
    return (
      e(),
      window.addEventListener("resize", e),
      () => window.removeEventListener("resize", e)
    );
  }, []),
  (0, React.useEffect)(() => {
    if (!c || !o.current || d.current) return;
    let e = animation.default.context(() => {
      let e = s.current.filter(Boolean);
      if (0 === e.length) return;
      animation.default.set(e, {
        scale: 0,
        opacity: 0,
      });
      let t = animation.default.matchMedia();
      return (
        t.add("(prefers-reduced-motion: no-preference)", () => {
          animation.default.to(e, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: {
              amount: 0.4,
              from: "random",
            },
            ease: "power2.out",
            scrollTrigger: {
              trigger: o.current,
              start: "top 80%",
              once: !0,
              onEnter: () => {
                d.current = !0;
              },
            },
          });
        }),
        t.add("(prefers-reduced-motion: reduce)", () => {
          (animation.default.set(e, {
            scale: 1,
            opacity: 0,
          }),
            animation.default.to(e, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: o.current,
                start: "top 80%",
                once: !0,
                onEnter: () => {
                  d.current = !0;
                },
              },
            }));
        }),
        () => t.revert()
      );
    }, o);
    return () => e.revert();
  }, [c]),
  c) ? (
    <div
      ref={o}
      className={`${e} relative overflow-hidden`}
      style={{
        opacity: 1,
      }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
        }}
      >
        {[...Array(9)].map((e, r) => {
          let n = Math.floor(r / 3),
            a = r % 3;
          return (
            <div
              ref={(e) => (s.current[r] = e)}
              className="relative overflow-hidden"
              style={{
                width: "100%",
                height: "100%",
                scale: 0,
                opacity: 0,
              }}
              key={r}
            >
              <div
                className="absolute"
                style={{
                  width: "300%",
                  height: "300%",
                  left: `-${100 * a}%`,
                  top: `-${100 * n}%`,
                }}
              >
                <img
                  src={t}
                  className="w-full h-full object-cover"
                  style={{
                    display: "block",
                  }}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <jsxRuntime.Fragment>
      <img ref={n} src={t} className={e} alt="" />
      <scrollRig.UseCanvas>
        <scrollRig.ScrollScene track={n}>
          {(e) => <DepthImageScene {...e} src={t} depthMap={r} />}
        </scrollRig.ScrollScene>
      </scrollRig.UseCanvas>
    </jsxRuntime.Fragment>
  );
};
animation.default.registerPlugin(scrollPlugin.ScrollTrigger);
let FeaturedWork = () => {
  let e = (0, React.useRef)(null),
    t = (0, React.useRef)([]),
    r = (0, React.useRef)([]);
  return (
    (0, React.useEffect)(() => {
      let n = animation.default.context(() => {
        if (!e.current) return;
        let n = animation.default.timeline({
          scrollTrigger: {
            trigger: e.current,
            start: "top top",
            end: "bottom bottom",
            scrub: !0,
          },
        });
        for (let e = 0; e < 12; e++) {
          t.current[e] &&
            n.to(
              t.current[e],
              {
                backgroundColor: "rgba(255, 255, 255, 1)",
                duration: 0.05,
              },
              0.08 * e,
            );
          for (let t = 1; t <= 4; t++) {
            let i = 5 * e + t;
            r.current[i] &&
              n.to(
                r.current[i],
                {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  duration: 0.02,
                },
                0.08 * e + 0.012 * t,
              );
          }
        }
      });
      return () => {
        n.revert();
      };
    }, []),
    (
      <section className="w-full" id="work">
        <div className=" -mt-[30vh] pointer-events-none relative z-100">
          <SectionWipe />
        </div>
        <div className="esa-work-surface h-fit pb-[10vh] relative overflow-clip w-full px-0 max-md:px-[6vw]">
          <HeadingReveal.default variant="black">
            <h2 className="text-[16vw] text-center md:text-[8vw] leading-none font-semibold font-display uppercase">
              {"PROIECTE ESA"}
            </h2>
          </HeadingReveal.default>
          <div className="w-full relative mt-[10vw] px-[10vw] max-md:px-0">
            <div ref={e} className="w-full h-full absolute top-0 left-0 ">
              <div className="h-screen overflow-clip w-full sticky inset-0  flex items-center justify-center">
                <div className=" h-px w-full bg-white/50 absolute top-1/2 -translate-y-1/2 left-0" />
                <div className=" h-px w-[200vmax] -rotate-25 max-md:-rotate-45 bg-white/50 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 " />
                <div className="relative w-[40vmax] h-[40vmax]">
                  {[...Array(12)].map((e, r) => (
                    <div
                      ref={(e) => (t.current[r] = e)}
                      className="absolute w-[0.25vmax] h-[2.5vmax] bg-white/30 origin-bottom"
                      style={{
                        left: "50%",
                        top: "0",
                        transform: `translateX(-50%) rotate(${30 * r}deg)`,
                        transformOrigin: "50% 20vmax",
                      }}
                      key={r}
                    />
                  ))}
                  {[...Array(60)].map((e, t) => (
                    <div
                      ref={(e) => (r.current[t] = e)}
                      className="absolute bg-white/30 origin-bottom"
                      style={{
                        width: t % 5 == 0 ? "0px" : "0.12vmax",
                        height: t % 5 == 0 ? "0px" : "1.25vmax",
                        left: "50%",
                        top: "1vmax",
                        transform: `translateX(-50%) rotate(${6 * t}deg)`,
                        transformOrigin: "50% 19vmax",
                      }}
                      key={`small-${t}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[35vw] relative z-10 max-md:w-full mt-[5vh] md:mt-[10vh]">
              <a
                href="https://www.teamstoica.ro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vezi proiectul Team Stoica"
                className="block ourwork rounded-[2vw] md:rounded-[1vw] max-md:h-[35vh] h-[25vw] overflow-hidden"
              >
                <WorkImage
                  className="w-full h-full opacity-0"
                  src="/assets/esa/team-stoica.webp"
                  depthMap="/assets/works/depth2.png"
                />
              </a>
              <div className="mt-4 px-2 w-full flex justify-between items-center">
                <HeadingReveal.default variant="black">
                  <h3 className="text-[2vw] max-md:text-[6vw] tracking-wide font-semibold font-display">
                    {"TEAM STOICA"}
                  </h3>
                </HeadingReveal.default>
                <TextReveal.default variant="black">
                  <p className="text-[1.3vw] max-md:text-[4vw] font-sans text-black mt-1">
                    {"PROIECT ESA • 01"}
                  </p>
                </TextReveal.default>
              </div>
            </div>
            <div className="w-[35vw] relative z-10 ml-auto max-md:w-full mt-0 max-md:mt-[5vh]">
              <a
                href="https://beautyvilla.ro/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vezi proiectul Beauty Villa"
                className="block ourwork rounded-[2vw] md:rounded-[1vw] max-md:h-[35vh] h-[25vw] overflow-hidden"
              >
                <WorkImage
                  className="w-full h-full opacity-0"
                  src="/assets/esa/beauty-villa.webp"
                  depthMap="/assets/works/dep1.png"
                />
              </a>
              <div className="mt-4 px-2 w-full flex justify-between items-center">
                <HeadingReveal.default variant="black">
                  <h3 className="text-[2vw] max-md:text-[6vw] font-semibold font-display">
                    {"BEAUTY VILLA"}
                  </h3>
                </HeadingReveal.default>
                <TextReveal.default variant="black">
                  <p className="text-[1.3vw] max-md:text-[4vw] font-sans text-black mt-1">
                    {"PROIECT ESA • 02"}
                  </p>
                </TextReveal.default>
              </div>
            </div>
            <div className="w-[35vw] relative z-10 max-md:w-full mt-0 max-md:mt-[5vh]">
              <a
                href="https://event-smart-assistant.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vezi proiectul Event Smart Assistant"
                className="block ourwork rounded-[2vw] md:rounded-[1vw] max-md:h-[35vh] h-[25vw] overflow-hidden"
              >
                <WorkImage
                  className="w-full h-full opacity-0"
                  src="/assets/esa/event-smart-assistant.webp"
                  depthMap="/assets/works/dep2.png"
                />
              </a>
              <div className="mt-4 px-2 w-full flex justify-between items-center">
                <HeadingReveal.default variant="black">
                  <h3 className="text-[2vw] max-md:text-[6vw] tracking-wide font-semibold font-display">
                    {"EVENT SMART ASSISTANT"}
                  </h3>
                </HeadingReveal.default>
                <TextReveal.default variant="black">
                  <p className="text-[1.3vw] max-md:text-[4vw] font-sans text-black mt-1">
                    {"PROIECT ESA • 03"}
                  </p>
                </TextReveal.default>
              </div>
            </div>
            <div className="w-[35vw] relative z-10 ml-auto max-md:w-full mt-0 max-md:mt-[5vh]">
              <a
                href="https://xelle.ro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vezi proiectul Xelle"
                className="block ourwork rounded-[2vw] md:rounded-[1vw] max-md:h-[35vh] h-[25vw] overflow-hidden"
              >
                <WorkImage
                  className="w-full h-full opacity-0"
                  src="/assets/esa/xelle.webp"
                  depthMap="/assets/works/dep3.png"
                />
              </a>
              <div className="mt-4 px-2 w-full flex justify-between items-center">
                <HeadingReveal.default variant="black">
                  <h3 className="text-[2vw] max-md:text-[6vw] font-semibold font-display">
                    {"XELLE"}
                  </h3>
                </HeadingReveal.default>
                <TextReveal.default variant="black">
                  <p className="text-[1.3vw] max-md:text-[4vw] font-sans text-black mt-1">
                    {"PROIECT ESA • 04"}
                  </p>
                </TextReveal.default>
              </div>
            </div>
          </div>
          <div className=" w-full mt-[10vw] px-[3vw] max-md:px-0">
            <HeadingReveal.default variant="black">
              <h2 className="text-[12vw] md:text-[8vw] w-full md:w-[50%] leading-none font-semibold font-display uppercase">
                {"Fiecare proiect incepe cu o intrebare buna."}
              </h2>
            </HeadingReveal.default>
            <div className=" w-full md:w-[35%] ml-auto mt-[5vh] md:mt-0">
              <TextReveal.default variant="black">
                <p className=" text-[4vw] md:text-[1.3vw] font-sans max-md:leading-tight text-black">
                  {
                    "Ai o idee, o provocare sau o directie pe care vrei sa o explorezi? Nu trebuie sa ai toate raspunsurile. O conversatie bine pusa la punct ne ajuta sa vedem ce merita construit si care este urmatorul pas."
                  }
                </p>
              </TextReveal.default>
              <links.default href="/contact">
                <AnimatedButton.default className=" mt-[3vh] bg-black text-white">
                  {"Sa o facem realitate"}
                </AnimatedButton.default>
              </links.default>
            </div>
          </div>
          <div className=" w-full h-[10vh]" />
        </div>
      </section>
    )
  );
};
animation.default.registerPlugin(
  scrollTrigger.ScrollTrigger,
  textPlugin.SplitText,
);
let FooterLogo = ({ scaleProgress: e, scrollVelocity: t }) => {
    let r = (0, React.useRef)(),
      n = useESALogoScene(),
      o = (0, React.useRef)(0),
      s = (0, React.useMemo)(() => {
        let e = n.clone();
        return (
          e.traverse((e) => {
            e.isMesh &&
              (e.material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color(brand.gold),
                roughness: 0.28,
                metalness: 1,
              }));
          }),
          e
        );
      }, [n]);
    return (
      (0, fiberFrame.useFrame)((n, i) => {
        if (r.current) {
          let n = Math.max(0, (e.current - 0.8) / 0.2);
          r.current.scale.set(n, n, n);
          let a = Math.min(5 * Math.abs(t.current), 2);
          ((o.current += i * (0.5 + a)), (r.current.rotation.z = o.current));
        }
      }),
      (
        <primitive
          ref={r}
          object={s}
          scale={[0, 0, 0]}
          position={[0, 0, 0]}
          rotation-x={Math.PI / 2}
        />
      )
    );
  },
  FooterShader = ({ scaleProgress: e }) => {
    let t = (0, React.useRef)(),
      r = (0, React.useRef)(),
      n = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
      o = `
    varying vec2 vUv;

    mat2 rotate2D(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
    }

    vec3 hash3(vec3 p) {
      p = vec3(
        dot(p, vec3(127.1, 311.7, 74.7)),
        dot(p, vec3(269.5, 183.3, 246.1)),
        dot(p, vec3(113.5, 271.9, 124.6))
      );
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }

    float noise3d(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      vec3 u = f * f * (3.0 - 2.0 * f);

      return mix(
        mix(
          mix(dot(hash3(i + vec3(0.0, 0.0, 0.0)), f - vec3(0.0, 0.0, 0.0)),
              dot(hash3(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0)), u.x),
          mix(dot(hash3(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0)),
              dot(hash3(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0)), u.x), u.y),
        mix(
          mix(dot(hash3(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0)),
              dot(hash3(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0)), u.x),
          mix(dot(hash3(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0)),
              dot(hash3(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0)), u.x), u.y), u.z);
    }

    float fbm3d(vec3 p, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < 5; i++) {
        if (i >= octaves) break;
        value += amplitude * noise3d(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    uniform float uFrequency;
    uniform float uDistortion;
    uniform vec3 uEmissionColor;
    uniform float uEmissionMultiplier;
    uniform float uTime;

    void main() {
      vec2 centeredUv = vUv * 2.0 - 1.0;
      centeredUv *= 0.8;
      float distFromCenter = length(centeredUv);
      float angle = -log2(length(centeredUv)) + uTime * 0.5;
      vec2 rotatedUv = rotate2D(angle) * centeredUv;
      
      vec3 color = vec3(rotatedUv, uTime * 0.1);
      color.x = fbm3d(color * uFrequency + uTime * 0.2, 5) + uDistortion;
      color.y = fbm3d(color * uFrequency + 1.0 + uTime * 0.15, 5) + uDistortion;
      color.z = fbm3d(color * uFrequency + 2.0 + uTime * 0.1, 5) + uDistortion;
      
      float noiseColorLength = length(color);
      float fac = length(centeredUv) - fract(length(color + 0.32));
      fac += 0.1;
      fac *= 3.0;
      fac = clamp(fac, 0.0, 1.0);
      
      float glowFalloff = 1.0 - smoothstep(0.0, 0.5, distFromCenter);
      vec3 emission = uEmissionColor * noiseColorLength * uEmissionMultiplier * glowFalloff;
      
      vec3 black = vec3(0.0, 0.0, 0.0);
      vec3 finalColor = mix(emission, black, fac);
      float alpha = 1.0 - fac;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
      s = (0, React.useMemo)(
        () => ({
          uFrequency: {
            value: 4,
          },
          uDistortion: {
            value: 1,
          },
          uEmissionColor: {
            value: new THREE.Color(brand.gold),
          },
          uEmissionMultiplier: {
            value: 2,
          },
          uTime: {
            value: 0,
          },
        }),
        [],
      );
    return (
      (0, fiberFrame.useFrame)((n) => {
        if (
          (r.current && (r.current.uniforms.uTime.value = n.clock.elapsedTime),
          t.current)
        ) {
          let r = 3 * Math.min(e.current / 0.8, 1);
          t.current.scale.set(r, r, 1);
        }
      }),
      (
        <mesh
          ref={t}
          rotation={[0, 0, 0]}
          position={[0, 0, -2]}
          scale={[0, 0, 1]}
        >
          <planeGeometry args={[4, 4, 1, 1]} />
          <shaderMaterial
            ref={r}
            vertexShader={n}
            fragmentShader={o}
            uniforms={s}
            side={THREE.DoubleSide}
            transparent={!0}
            depthWrite={!1}
          />
        </mesh>
      )
    );
  },
  footerPhrases = [
    "Construim cu sens",
    "Design cu scop",
    "Cod cu pasiune",
    "Idei puse in practica",
    "ESA Coder Solutions",
  ],
  Footer = () => {
    let e = (0, React.useRef)(),
      t = (0, React.useRef)([]),
      r = (0, React.useRef)([]),
      n = (0, React.useRef)(0),
      o = (0, React.useRef)(0),
      [s, c] = (0, React.useState)(() => window.innerWidth < 768),
      u = (0, React.useRef)(null);
    return (
      (0, React.useEffect)(() => {
        let e = () => {
          c(window.innerWidth < 768);
        };
        return (
          e(),
          window.addEventListener("resize", e),
          () => {
            window.removeEventListener("resize", e);
          }
        );
      }, []),
      (0, React.useLayoutEffect)(() => {
        if (!e.current) return;
        // Layout above this section can change after React mounts (process cards,
        // images, FAQ panels). Keep the original scroll percentages anchored to
        // the actual section position instead of the initial document geometry.
        let refreshFrame = 0;
        let disposed = false;
        const scheduleRefresh = () => {
          if (disposed) return;
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => {
            refreshFrame = requestAnimationFrame(() => {
              if (!disposed) scrollTrigger.ScrollTrigger.refresh();
            });
          });
        };
        let i = animation.default.context(() => {
          if (
            ((r.current = t.current.map((e) =>
              e
                ? new textPlugin.SplitText(e, {
                    type: "chars",
                  })
                : null,
            )),
            r.current.forEach((t, r) => {
              if (!t) return;
              let n = t.chars;
              0 === r
                ? animation.default.set(n, {
                    opacity: 1,
                    y: 0,
                  })
                : animation.default.set(n, {
                    opacity: 0,
                    y: 50,
                  });
              let i = animation.default.timeline({
                scrollTrigger: {
                  trigger: e.current,
                  start: `${0.1 * r * 100}% top`,
                  end: `${(r + 1) * 10}% top`,
                  scrub: !0,
                },
              });
              (r > 0 &&
                i.to(
                  n,
                  {
                    opacity: 1,
                    y: 0,
                    stagger: {
                      each: 0.03,
                      from: "start",
                    },
                    duration: 0.4,
                  },
                  0,
                ),
                i.to(
                  n,
                  {
                    opacity: 0,
                    y: -50,
                    stagger: {
                      each: 0.03,
                      from: "start",
                    },
                    ease: "power2.in",
                    duration: 0.4,
                  },
                  r > 0 ? 0.6 : 0.2,
                ));
            }),
            scrollTrigger.ScrollTrigger.create({
              trigger: e.current,
              start: "50% top",
              end: "bottom bottom",
              scrub: !0,
              onUpdate: (e) => {
                ((n.current = e.progress), (o.current = e.getVelocity() / 1e3));
              },
            }),
            u.current)
          ) {
            // Reveal the supplied logo as a single image within its mask.
            let e = u.current;
            (animation.default.set(e, {
              opacity: 1,
              yPercent: 100,
            }),
              animation.default.to(e, {
                opacity: 1,
                yPercent: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  // Measure the stationary mask, not the image translated below it.
                  trigger: e.parentElement,
                  start: window.innerWidth < 768 ? "top 100%" : "top 80%",
                  end: "top 50%",
                  toggleActions: "play none none reverse",
                },
              }));
          }
        });
        const observer = new ResizeObserver(scheduleRefresh);
        const page = document.getElementById('root');
        if (page) observer.observe(page);
        window.addEventListener('load', scheduleRefresh);
        document.fonts.ready.then(scheduleRefresh);
        scheduleRefresh();
        return () => {
          disposed = true;
          cancelAnimationFrame(refreshFrame);
          observer.disconnect();
          window.removeEventListener('load', scheduleRefresh);
          // Revert only this section's timelines, never other page animations.
          i.revert();
          r.current.forEach((split) => split?.revert());
        };
      }, [s]),
      (
        <section>
          <div className="relative z-100 mt-[-35vh] pointer-events-none">
            <SectionWipe variant="black" />
          </div>
          <div ref={e} className="h-[600vh] weare w-full bg-black relative">
            <div className="h-screen w-full sticky inset-0 overflow-clip">
              <svg
                className="absolute top-[3vw] left-[3vw] w-6 h-6 text-white z-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <svg
                className="absolute top-[3vw] right-[3vw] w-6 h-6 text-white z-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <svg
                className="absolute bottom-[3vw] left-[3vw] w-6 h-6 text-white z-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <svg
                className="absolute bottom-[3vw] right-[3vw] w-6 h-6 text-white z-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <div className="h-screen w-full absolute inset-0 flex justify-center items-center z-10">
                {footerPhrases.map((e, r) => (
                  <h2
                    ref={(e) => (t.current[r] = e)}
                    className="text-[8vw] max-md:text-[12vw] leading-none font-semibold font-display uppercase text-center text-white absolute"
                    key={r}
                  >
                    {e}
                  </h2>
                ))}
              </div>
              {null !== s && (
                <div className="absolute inset-0 pointer-events-none">
                  <fiberCanvas.Canvas
                    camera={{
                      position: [0, 0, 5],
                      fov: 50,
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  >
                    <group scale={s ? 0.5 : 1}>
                      <ambientLight intensity={1} />
                      <directionalLight position={[10, 10, 5]} intensity={2} />
                      <directionalLight
                        position={[-10, -10, -5]}
                        intensity={1}
                      />
                      <FooterLogo scaleProgress={n} scrollVelocity={o} />
                      <FooterShader scaleProgress={n} />
                    </group>
                  </fiberCanvas.Canvas>
                </div>
              )}
            </div>
          </div>
          <div className="w-full bg-black pb-[10vh] pt-0 max-md:pt-[5vh] overflow-clip relative">
            <div className="esa-footer-logo-mask">
              <img ref={u} className="esa-footer-logo" src="/assets/esa/esa-coder-solutions-lockup-transparent.png" alt="ESA Coder Solutions" width="1800" height="900" />
            </div>
            <svg
              className="absolute bottom-[3vw] left-[3vw] w-6 h-6 text-white z-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <svg
              className="absolute bottom-[3vw] right-[3vw] w-6 h-6 text-white z-50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </section>
      )
    );
  };
animation.gsap.registerPlugin(scrollPlugin.ScrollTrigger, draggable.Draggable);
let ProcessCards = () => {
    let [e, t] = (0, React.useState)(0),
      [r, n] = (0, React.useState)(0),
      [s, c] = (0, React.useState)(!1),
      [d, h] = (0, React.useState)(!1),
      f = (0, React.useRef)(null),
      p = (0, React.useRef)({}),
      m = (0, React.useRef)([]),
      [A, g] = (0, React.useState)([]),
      [B, v] = (0, React.useState)([]),
      [x, C] = (0, React.useState)(!1),
      y = [
        {
          id: 1,
          heading: "Descoperim",
          content: ["• Obiective clare", "• Utilizatori", "• Cerinte reale"],
          bgColor: "bg-brand-gold ",
          textColor: "text-[#1b1b1b]",
        },
        {
          id: 2,
          heading: "Planificam",
          content: ["• Structura", "• Fluxuri", "• Etape & prioritati"],
          bgColor: "bg-[#1b1b1b]",
          textColor: "text-brand-gold ",
        },
        {
          id: 3,
          heading: "Design",
          content: ["• UX/UI", "• Design responsive", "• Interactiuni"],
          bgColor: "bg-brand-gold ",
          textColor: "text-[#1b1b1b]",
        },
        {
          id: 4,
          heading: "Dezvoltam",
          content: ["• Cod custom", "• Date & integrari", "• Motion & 3D"],
          bgColor: "bg-[#1b1b1b]",
          textColor: "text-white",
        },
        {
          id: 5,
          heading: "Testam",
          content: ["• Fluxuri reale", "• Mobil & desktop", "• Performanta"],
          bgColor: "bg-brand-gold ",
          textColor: "text-[#1b1b1b]",
        },
        {
          id: 6,
          heading: "Lansam",
          content: ["• Publicare", "• Predare clara", "• Pasii urmatori"],
          bgColor: "bg-[#1b1b1b]",
          textColor: "text-brand-gold ",
        },
      ];
    (0, React.useEffect)(() => {
      let e = () => {
        let e = window.innerWidth;
        (t(e), n(window.innerHeight), c(e < 640), h(e >= 640 && e < 1024));
      };
      return (
        e(),
        window.addEventListener("resize", e),
        () => window.removeEventListener("resize", e)
      );
    }, []);
    let w = s
        ? "clamp(130px, 40vw, 160px)"
        : d
          ? "clamp(140px, 22vw, 180px)"
          : "fit-content",
      [b, M] = (0, React.useState)([
        {
          id: 1,
          offsetX: 0,
          offsetY: 0,
          isDragging: !1,
        },
        {
          id: 2,
          offsetX: 0,
          offsetY: 0,
          isDragging: !1,
        },
        {
          id: 3,
          offsetX: 0,
          offsetY: 0,
          isDragging: !1,
        },
        {
          id: 4,
          offsetX: 0,
          offsetY: 0,
          isDragging: !1,
        },
        {
          id: 5,
          offsetX: 0,
          offsetY: 0,
          isDragging: !1,
        },
        {
          id: 6,
          offsetX: 0,
          offsetY: 0,
          isDragging: !1,
        },
      ]),
      [E, F] = (0, React.useState)({}),
      R = s || d,
      T = R
        ? [
            {
              from: 1,
              to: 2,
            },
            {
              from: 1,
              to: 4,
            },
            {
              from: 2,
              to: 3,
            },
            {
              from: 4,
              to: 3,
            },
            {
              from: 3,
              to: 5,
            },
            {
              from: 5,
              to: 6,
            },
          ]
        : [
            {
              from: 1,
              to: 2,
            },
            {
              from: 1,
              to: 3,
            },
            {
              from: 1,
              to: 4,
            },
            {
              from: 2,
              to: 3,
            },
            {
              from: 3,
              to: 4,
            },
            {
              from: 2,
              to: 5,
            },
            {
              from: 3,
              to: 5,
            },
            {
              from: 4,
              to: 5,
            },
            {
              from: 5,
              to: 6,
            },
          ];
    ((0, React.useEffect)(() => {
      if (0 === e || !f.current) return;
      let t = scrollPlugin.ScrollTrigger.create({
        trigger: f.current,
        start: "top 80%",
        once: !0,
        onEnter: () => {
          C(!0);
        },
      });
      return () => {
        t.kill();
      };
    }, [e]),
      (0, React.useEffect)(() => {
        x &&
          ([1, 2, 3, 4, 5, 6].forEach((e, t) => {
            setTimeout(() => {
              g((t) => [...t, e]);
            }, 300 * t);
          }),
          T.forEach((e, t) => {
            setTimeout(() => {
              v((e) => [...e, t]);
            }, 400 * t);
          }));
      }, [x, R]),
      (0, React.useEffect)(() => {
        if (0 !== e && f.current)
          return (
            m.current.forEach((e) => e && e.kill()),
            (m.current = []),
            Object.keys(p.current).forEach((e) => {
              let t = p.current[e];
              if (t) {
                let e = draggable.Draggable.create(t.parentElement, {
                  type: "x,y",
                  bounds: f.current,
                  onDrag: function () {
                    D();
                  },
                  onDragEnd: function () {
                    D();
                  },
                })[0];
                m.current.push(e);
              }
            }),
            () => {
              m.current.forEach((e) => e && e.kill());
            }
          );
      }, [e, A, R]));
    let D = () => {
      if (!f.current) return;
      let e = f.current.getBoundingClientRect(),
        t = {};
      (Object.keys(p.current).forEach((r) => {
        let n = p.current[r];
        if (n) {
          let i = n.getBoundingClientRect();
          t[r] = {
            x: i.left - e.left + i.width / 2,
            y: i.top - e.top + i.height / 2,
            width: i.width,
            height: i.height,
          };
        }
      }),
        F(t));
    };
    (0, React.useEffect)(() => {
      (D(), window.addEventListener("resize", D));
      let e = setTimeout(D, 100);
      return () => {
        (window.removeEventListener("resize", D), clearTimeout(e));
      };
    }, [b, e, A]);
    let I = R ? 8 : 12,
      G = (e, t, r) => {
        let n = E[e],
          i = E[r];
        if (!n || !i)
          return {
            x: 0,
            y: 0,
          };
        let a = n.width / 2,
          o = n.height / 2;
        if (R) {
          if (1 === e) {
            if (2 === r)
              return {
                x: n.x - a + I,
                y: n.y + o - I,
              };
            else if (4 === r)
              return {
                x: n.x + a - I,
                y: n.y + o - I,
              };
          }
          if (2 === e || 4 === e || 3 === e || 5 === e)
            if (t)
              return {
                x: n.x,
                y: n.y + o - I,
              };
            else
              return {
                x: n.x,
                y: n.y - o + I,
              };
          return 6 === e
            ? {
                x: n.x,
                y: n.y - o + I,
              }
            : {
                x: n.x,
                y: n.y,
              };
        }
        return 1 === e
          ? {
              x: n.x + a - I,
              y: n.y,
            }
          : t && 2 === e && 3 === r
            ? {
                x: n.x,
                y: n.y + o - I,
              }
            : t || 3 !== e || 2 !== r
              ? t && 3 === e && 4 === r
                ? {
                    x: n.x,
                    y: n.y + o - I,
                  }
                : t || 4 !== e || 3 !== r
                  ? t || (2 !== e && 3 !== e && 4 !== e) || 1 !== r
                    ? t && (2 === e || 3 === e || 4 === e) && 5 === r
                      ? {
                          x: n.x + a - I,
                          y: n.y,
                        }
                      : t || 5 !== e
                        ? t && 5 === e
                          ? {
                              x: n.x + a - I,
                              y: n.y,
                            }
                          : t || 6 !== e
                            ? {
                                x: n.x,
                                y: n.y,
                              }
                            : {
                                x: n.x - a + I,
                                y: n.y,
                              }
                        : {
                            x: n.x - a + I,
                            y: n.y,
                          }
                    : {
                        x: n.x - a + I,
                        y: n.y,
                      }
                  : {
                      x: n.x,
                      y: n.y - o + I,
                    }
              : {
                  x: n.x,
                  y: n.y - o + I,
                };
      },
      S = (e, t) => {
        let r = A.includes(e.id),
          n = y.find((t) => t.id === e.id);
        return (
          <div
            className="flex flex-col items-start justify-self-center self-center"
            style={{
              gridArea: R ? void 0 : t,
              transition: "opacity 0.8s ease-in-out",
              opacity: +!!r,
              zIndex: 20,
              position: "relative",
            }}
            key={e.id}
          >
            <h3
              className="font-semibold font-display tracking-wider text-brand-light mb-2"
              style={{
                fontSize: s
                  ? "clamp(14px, 3.5vw, 18px)"
                  : d
                    ? "clamp(16px, 2.2vw, 20px)"
                    : "clamp(18px, 1.5vw, 24px)",
              }}
            >
              {n.heading}
            </h3>
            <div
              ref={(t) => (p.current[e.id] = t)}
              className={`${n.bgColor} processcard rounded-xl shadow-lg cursor-move flex flex-col items-start justify-center font-semibold select-none border border-zinc-200 ${n.textColor}`}
              style={{
                width: w,
                height: "auto",
                padding: s
                  ? "clamp(10px, 3vw, 14px)"
                  : d
                    ? "clamp(14px, 2.5vw, 20px)"
                    : "clamp(20px, 3vw, 40px)",
                touchAction: "none",
                position: "relative",
                whiteSpace: "nowrap",
              }}
            >
              {n.content.map((e, t) => (
                <div
                  className="w-full font-sans"
                  style={{
                    fontSize: s
                      ? "clamp(10px, 2.8vw, 13px)"
                      : d
                        ? "clamp(11px, 1.8vw, 14px)"
                        : "clamp(12px, 1.1vw, 16px)",
                  }}
                  key={t}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        );
      };
    if (0 === e)
      return <section className="w-full min-h-screen relative bg-brand-surface" />;
    let H = () =>
        s
          ? "clamp(12px, 3vw, 20px)"
          : d
            ? "clamp(16px, 3vw, 24px)"
            : "clamp(24px, 4vw, 48px)",
      L = () =>
        s
          ? "clamp(16px, 6vw, 32px)"
          : d
            ? "clamp(20px, 5vw, 40px)"
            : "clamp(24px, 4vw, 48px)";
    return (
      <section
        ref={f}
        className="w-full min-h-screen relative overflow-x-clip bg-brand-surface py-8"
        style={{
          minHeight: R ? "auto" : "100vh",
          paddingTop: R ? "clamp(40px, 8vh, 80px)" : "0",
          paddingBottom: R ? "clamp(80px, 15vh, 120px)" : "0",
        }}
      >
        <div className="hidden lg:block size-[20vw] absolute right-[3vw] -bottom-[4vw]">
          <GenerativeGraphic.default variant={6} />
        </div>
        {T.map((e, t) =>
          ((e, t) => {
            let r = G(e.from, !0, e.to),
              n = G(e.to, !1, e.from);
            if (0 === r.x && 0 === r.y) return null;
            let a = Math.min(r.x, n.x) - 10,
              o = Math.min(r.y, n.y) - 10,
              s = Math.abs(n.x - r.x) + 20,
              l = Math.abs(n.y - r.y) + 20,
              c = r.x - a,
              u = r.y - o,
              d = n.x - a,
              h = n.y - o,
              f = c + (d - c) * 0.6,
              p = d - (d - c) * 0.6,
              m = B.includes(t),
              A = d - c,
              g = h - u,
              v = 1.5 * Math.sqrt(A * A + g * g);
            return (
              <svg
                className="absolute pointer-events-none"
                style={{
                  left: `${a}px`,
                  top: `${o}px`,
                  width: `${s}px`,
                  height: `${l}px`,
                  zIndex: 100,
                }}
                viewBox={`0 0 ${s} ${l}`}
                key={t}
              >
                <defs>
                  <path
                    id={`leader-line-path-${t}`}
                    d={`M ${c} ${u} C ${f} ${u} ${p} ${h} ${d} ${h}`}
                  />
                  <linearGradient
                    id={`shimmer-gradient-${t}`}
                    gradientUnits="userSpaceOnUse"
                    x1={c}
                    y1={u}
                    x2={d}
                    y2={h}
                  >
                    <stop offset="0%" stopColor="rgb(200, 200, 200)">
                      <animate
                        attributeName="stop-color"
                        values="rgb(200, 200, 200);rgb(255, 255, 255);rgb(200, 200, 200)"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${0.2 * t}s`}
                      />
                    </stop>
                    <stop offset="20%" stopColor="rgb(220, 220, 220)">
                      <animate
                        attributeName="stop-color"
                        values="rgb(220, 220, 220);rgb(200, 200, 200);rgb(255, 255, 255);rgb(220, 220, 220)"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${0.2 * t}s`}
                      />
                    </stop>
                    <stop offset="40%" stopColor="rgb(255, 255, 255)">
                      <animate
                        attributeName="stop-color"
                        values="rgb(255, 255, 255);rgb(220, 220, 220);rgb(200, 200, 200);rgb(255, 255, 255)"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${0.2 * t}s`}
                      />
                    </stop>
                    <stop offset="60%" stopColor="rgb(220, 220, 220)">
                      <animate
                        attributeName="stop-color"
                        values="rgb(220, 220, 220);rgb(255, 255, 255);rgb(220, 220, 220);rgb(200, 200, 200)"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${0.2 * t}s`}
                      />
                    </stop>
                    <stop offset="80%" stopColor="rgb(200, 200, 200)">
                      <animate
                        attributeName="stop-color"
                        values="rgb(200, 200, 200);rgb(220, 220, 220);rgb(255, 255, 255);rgb(200, 200, 200)"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${0.2 * t}s`}
                      />
                    </stop>
                    <stop offset="100%" stopColor="rgb(220, 220, 220)">
                      <animate
                        attributeName="stop-color"
                        values="rgb(220, 220, 220);rgb(200, 200, 200);rgb(220, 220, 220);rgb(255, 255, 255)"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${0.2 * t}s`}
                      />
                    </stop>
                  </linearGradient>
                  <marker
                    id={`leader-line-plug-marker-start-${t}`}
                    orient="0"
                    markerWidth="8.75"
                    markerHeight="8.75"
                    markerUnits="strokeWidth"
                    viewBox="-5 -5 10 10"
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r="4"
                      fill="rgb(222, 222, 222)"
                      stroke="rgb(255, 255, 255)"
                      strokeWidth="1"
                      style={{
                        opacity: +!!m,
                        transition: "opacity 0.2s ease-in-out",
                      }}
                    />
                  </marker>
                  <marker
                    id={`leader-line-plug-marker-end-${t}`}
                    orient="0"
                    markerWidth="8.75"
                    markerHeight="8.75"
                    markerUnits="strokeWidth"
                    viewBox="-5 -5 10 10"
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r="4"
                      fill="rgb(222, 222, 222)"
                      stroke="rgb(255, 255, 255)"
                      strokeWidth="1"
                      style={{
                        opacity: +!!m,
                        transition: "opacity 0.3s ease-in-out 0.3s",
                      }}
                    />
                  </marker>
                </defs>
                <use
                  href={`#leader-line-path-${t}`}
                  stroke={
                    m ? `url(#shimmer-gradient-${t})` : "rgb(222, 222, 222)"
                  }
                  strokeWidth="1.4"
                  fill="none"
                  markerStart={`url(#leader-line-plug-marker-start-${t})`}
                  markerEnd={`url(#leader-line-plug-marker-end-${t})`}
                  style={{
                    strokeDasharray: v,
                    strokeDashoffset: m ? 0 : v,
                    transition: "stroke-dashoffset 0.4s ease-in-out",
                  }}
                />
              </svg>
            );
          })(e, t),
        )}
        {R ? (
          <div
            className="w-full h-full flex flex-col items-center justify-center relative px-4"
            style={{
              gap: H(),
              zIndex: 50,
            }}
          >
            <div className="flex justify-center">
              {S(b.find((e) => 1 === e.id))}
            </div>
            <div
              className="flex justify-center"
              style={{
                gap: L(),
              }}
            >
              {S(b.find((e) => 2 === e.id))}
              {S(b.find((e) => 4 === e.id))}
            </div>
            <div className="flex justify-center">
              {S(b.find((e) => 3 === e.id))}
            </div>
            <div className="flex justify-center">
              {S(b.find((e) => 5 === e.id))}
            </div>
            <div className="flex justify-center">
              {S(b.find((e) => 6 === e.id))}
            </div>
          </div>
        ) : (
          <div
            className="w-full h-full grid relative"
            style={{
              gridTemplateColumns: "repeat(4, auto)",
              gridTemplateRows: "repeat(3, auto)",
              gridTemplateAreas: `
              ". card2 . ."
              "card1 card3 card5 card6"
              ". card4 . ."
            `,
              gap: H(),
              columnGap: L(),
              justifyContent: "center",
              alignContent: "center",
              zIndex: 50,
            }}
          >
            {S(
              b.find((e) => 1 === e.id),
              "card1",
            )}
            {S(
              b.find((e) => 2 === e.id),
              "card2",
            )}
            {S(
              b.find((e) => 3 === e.id),
              "card3",
            )}
            {S(
              b.find((e) => 4 === e.id),
              "card4",
            )}
            {S(
              b.find((e) => 5 === e.id),
              "card5",
            )}
            {S(
              b.find((e) => 6 === e.id),
              "card6",
            )}
          </div>
        )}
        <div
          onClick={() => {
            let e = animation.gsap.timeline({
              onUpdate: () => {
                D();
              },
              onComplete: () => {
                (m.current.forEach((e) => e && e.kill()),
                  (m.current = []),
                  Object.keys(p.current).forEach((e) => {
                    let t = p.current[e];
                    if (t && f.current) {
                      let e = draggable.Draggable.create(t.parentElement, {
                        type: "x,y",
                        bounds: f.current,
                        onDrag: function () {
                          D();
                        },
                        onDragEnd: function () {
                          D();
                        },
                      })[0];
                      m.current.push(e);
                    }
                  }),
                  D());
              },
            });
            Object.keys(p.current).forEach((t) => {
              let r = p.current[t];
              r &&
                r.parentElement &&
                e.to(
                  r.parentElement,
                  {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                  },
                  0,
                );
            });
          }}
          className="absolute z-70"
          style={{
            bottom: R ? "clamp(16px, 4vh, 32px)" : "10%",
            left: R ? "50%" : "83%",
            transform: R ? "translateX(-50%)" : "translateX(0)",
          }}
        >
          <AnimatedButton.default className="bg-brand-gold">
            {"Rearanjeaza"}
          </AnimatedButton.default>
        </div>
      </section>
    );
  },
  ProcessSection = () => (
    <section className=" w-full" id="process">
      <div className=" h-[20vh] max-md:h-[5vh] w-full relative border-b border-zinc-500/30">
        <div className="visible max-md:hidden size-[20vw] absolute left-[3vw] bottom-[1vw]">
          <GenerativeGraphic.default variant={4} />
        </div>
        <div className="h-full w-px absolute top-0 left-1/2 -translate-x-1/2 bg-zinc-500/30" />
      </div>
      <div className=" w-full relative px-[3vw] max-md:px-[6vw] pt-[20vh]">
        <div className="visible max-md:hidden size-[20vw] absolute right-[3vw] top-[6vw]">
          <GenerativeGraphic.default variant={8} />
        </div>
        <div className="visible max-md:hidden z-999 size-[20vw] absolute left-[3vw] bottom-[-16vw]">
          <GenerativeGraphic.default variant={1} />
        </div>
        <HeadingReveal.default>
          <h2 className=" text-[8vw] max-md:text-[16vw] leading-none font-semibold font-display text-white">
            {"CREDEM INTR-UN "}
            <span className="text-brand-gold">{"PROCES CLAR"}</span> <br />
            {" THAT WORKS"}
          </h2>
        </HeadingReveal.default>
        <div className=" w-full md:w-[35%] ml-auto mt-[5vh] md:mt-0">
          <TextReveal.default>
            <p className=" text-[4vw] md:text-[1.3vw] font-sans max-md:leading-tight text-brand-light">
              {
                "Nu trebuie sa vii cu totul rezolvat. Pornim de la ideea ta, clarificam cerintele si impartim proiectul in pasi usor de urmarit. Design, dezvoltare, testare si predare: fiecare etapa are un scop si un rezultat concret."
              }
            </p>
          </TextReveal.default>
          <links.default href="/contact">
            <AnimatedButton.default className=" mt-[3vh] bg-brand-gold">
              {"Discutam proiectul"}
            </AnimatedButton.default>
          </links.default>
        </div>
      </div>
      <div className=" py-[20vh] max-md:px-[3vw] max-md:py-0">
        <ProcessCards />
      </div>
      <div className=" h-[10vh] w-full" />
    </section>
  ),
  ScrollProgress = () => {
    let [e, t] = (0, React.useState)(0),
      [r, n] = (0, React.useState)(!1),
      [o, s] = (0, React.useState)(!1);
    return ((0, React.useEffect)(() => {
      s(!0);
    }, []),
    (0, React.useEffect)(() => {
      if (!o) return;
      let e = () => {
        let e = window.scrollY,
          r = document.documentElement.scrollHeight - window.innerHeight;
        t(100 * (r > 0 ? e / r : 0));
        let i = document.querySelector(".weare"),
          a = !1;
        (i &&
          i.getBoundingClientRect().top < 0.7 * window.innerHeight &&
          (a = !0),
          n(a));
      };
      return (
        window.addEventListener("scroll", e),
        e(),
        () => window.removeEventListener("scroll", e)
      );
    }, [o]),
    o) ? (
      <div className="fixed right-[2%] top-1/2 -translate-y-1/2 w-1 md:w-1.5 h-[15vh] md:h-[20vh] rounded-full bg-zinc-600/20 z-[998]">
        <div
          className="absolute left-0 w-full h-[25%] rounded-full transition-colors duration-300 bg-brand-gold"
          style={{
            top: `${0.75 * e}%`,
          }}
        />
      </div>
    ) : null;
  };
export default () => (
  (0, React.useEffect)(() => {
    let e = sessionStorage.getItem("scrollToSection");
    e &&
      (sessionStorage.removeItem("scrollToSection"),
      setTimeout(() => {
        let t = document.getElementById(e);
        t &&
          t.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 500));
  }, []),
  (
    <jsxRuntime.Fragment>
      <ScrollProgress />
      <Hero />
      <ESAProfile />
      <ProcessSection />
      <FeaturedWork />
      <ESAQuestions />
      <Footer />
    </jsxRuntime.Fragment>
  )
);
