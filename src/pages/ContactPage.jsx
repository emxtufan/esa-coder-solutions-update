// Recovered from 67c94eaffb36d16d.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as TextReveal from "../components/TextReveal.jsx";
import * as HeadingReveal from "../components/HeadingReveal.jsx";
import "../components/ESAContent.css";
const animation = getVendor(89970);
export default () => {
  let [e, n] = (0, React.useState)({
      Full_Name: "",
      Email: "",
      Phone_Number: "",
      Message: "",
    }),
    [o, i] = (0, React.useState)(!1),
    [c, d] = (0, React.useState)(null),
    [m, u] = (0, React.useState)(!1),
    x = (0, React.useRef)(null),
    p = (0, React.useRef)(null),
    h = (0, React.useRef)(null),
    f = (0, React.useRef)(null),
    b = (0, React.useRef)(null),
    w = (0, React.useRef)([]),
    v = (0, React.useRef)(null);
  ((0, React.useEffect)(() => {
    let e = x.current,
      t = p.current;
    if (!e || !t) return;
    let a = () => {
        let e = t.children,
          a = 0;
        for (let t = 0; t < 20; t++)
          e[t] && ((a += e[t].offsetWidth), t < 19 && (a += 64));
        a += 64;
        let s = "marqueeAnim-contact",
          l = "marquee-anim-contact",
          r = document.getElementById(l);
        r && r.remove();
        let n = `
        @keyframes ${s} {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-${a}px); }
        }
      `,
          o = document.createElement("style");
        ((o.id = l), (o.innerHTML = n), document.head.appendChild(o));
        let i = a / 100;
        ((t.style.animation = `${s} ${i}s linear infinite`),
          (t.style.willChange = "transform"));
      },
      s = setTimeout(a, 100),
      l = () => {
        (clearTimeout(s), setTimeout(a, 100));
      };
    return (
      window.addEventListener("resize", l),
      () => {
        (clearTimeout(s), window.removeEventListener("resize", l));
        let e = document.getElementById("marquee-anim-contact");
        e && e.remove();
      }
    );
  }, []),
    (0, React.useEffect)(() => {
      let e = h.current;
      if (e) {
        w.current = [];
        for (let t = 0; t < 20; t++) {
          let t = document.createElement("div");
          ((t.className =
            "absolute w-1 h-1 md:w-2 md:h-2 bg-black rounded-full pointer-events-none z-10"),
            (t.style.left = "50%"),
            (t.style.top = "50%"),
            (t.style.opacity = "0"),
            (t.style.transform = "translate(-50%, -50%)"),
            e.appendChild(t),
            w.current.push(t));
        }
        return () => {
          w.current.forEach((e) => {
            e.parentNode && e.parentNode.removeChild(e);
          });
        };
      }
    }, []),
    (0, React.useEffect)(() => {
      if (m && v.current) {
        animation.default.fromTo(
          v.current,
          {
            y: -100,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
        );
        let e = setTimeout(() => {
          animation.default.to(v.current, {
            y: -100,
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              (u(!1), d(null));
            },
          });
        }, 4e3);
        return () => clearTimeout(e);
      }
    }, [m]));
  let j = (t) => {
      n({
        ...e,
        [t.target.name]: t.target.value,
      });
    },
    g = (t) => {
      t.preventDefault();
      const message = `Buna! As vrea sa discut un proiect cu ESA Coder Solutions.\n\nNume: ${e.Full_Name}\nEmail: ${e.Email}\nTelefon: ${e.Phone_Number || 'Nespecificat'}\n\n${e.Message}`;
      window.open(`https://wa.me/40755938367?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      d("success");
      u(!0);
    },
    y = "Continua pe WhatsApp";
  return (
    <section className="esa-contact w-full min-h-screen overflow-hidden">
      {null !== c && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50" style={{width: 'min(90vw, 540px)'}}>
          <div
            ref={v}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm ${"success" === c ? "bg-brand-gold/95 text-black" : "bg-red-500/95 text-white"}`}
          >
            <div
              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${"success" === c ? "bg-black/10" : "bg-white/20"}`}
            >
              {"success" === c ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-wider font-semibold text-lg">
                {"success" === c ? "Mesaj pregatit" : "A aparut o problema"}
              </span>
              <span className="text-sm opacity-80 font-sans">
                {"success" === c
                  ? "Confirma trimiterea in WhatsApp. Daca nu s-a deschis, permite deschiderea filei si incearca din nou."
                  : "Incearca din nou sau contacteaza-ne telefonic."}
              </span>
            </div>
            <button
              onClick={() => {
                v.current &&
                  animation.default.to(v.current, {
                    y: -100,
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                      (u(!1), d(null));
                    },
                  });
              }}
              className={`ml-4 p-1 rounded-full transition-colors ${"success" === c ? "hover:bg-black/10" : "hover:bg-white/20"}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="w-full pt-[15vh] md:pt-[20vh] pb-[5vh] px-4 md:px-[5vw]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-0">
          <HeadingReveal.default>
            <h1 className="text-[16vw] md:text-[8vw] leading-[0.85] font-display font-semibold uppercase">
              {"Ai o idee?"}
              <br />
              <span className="text-brand-gold">{"Hai sa o construim."}</span>
            </h1>
          </HeadingReveal.default>
          <div className="w-fit md:hidden block">
            <TextReveal.default>
              <p className="text-base font-sans text-black/70 max-w-[300px]">
                {
                  "Spune-mi ce vrei sa obtii, unde te blochezi si ce ai deja pregatit. De aici putem stabili o directie clara."
                }
              </p>
            </TextReveal.default>
          </div>
          <div className="w-fit hidden md:block">
            <TextReveal.default>
              <p className="text-[3vw] md:text-[1.2vw] font-sans text-black/70 max-w-[300px]">
                {
                  "Spune-mi ce vrei sa obtii, unde te blochezi si ce ai deja pregatit. De aici putem stabili o directie clara."
                }
              </p>
            </TextReveal.default>
          </div>
        </div>
      </div>
      <div
        ref={x}
        className="w-full border-y border-black/10 py-4 md:py-6 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0px, black 4vw, black calc(100% - 4vw), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0px, black 4vw, black calc(100% - 4vw), transparent 100%)",
        }}
      >
        <div
          ref={p}
          className="flex whitespace-nowrap"
          style={{
            width: "max-content",
            display: "flex",
          }}
        >
          {[...Array(40)].map((e, a) => (
            <span
              className="text-xs md:text-[1vw] font-sans text-black/30 mx-4 md:mx-8 shrink-0"
              key={a}
            >
              {
                "DESIGN CU SCOP • COD CU PASIUNE • ESA CODER SOLUTIONS"
              }
            </span>
          ))}
        </div>
      </div>
      <div className="w-full px-4 md:px-[5vw] py-[10vh] md:py-[15vh]">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-[10vw]">
          <div className="lg:w-1/2">
            <div className="w-fit">
              <TextReveal.default>
                <p className="text-xs md:text-[1vw] font-sans text-black/40 uppercase tracking-widest mb-4 md:mb-8">
                  {"Sa vorbim despre proiect"}
                </p>
              </TextReveal.default>
            </div>
            <HeadingReveal.default>
              <h2 className="text-[10vw] md:text-[4vw] font-display font-semibold leading-[1.1] uppercase mb-8 md:mb-12">
                {"Nu ai nevoie de un brief perfect. Doar de un punct de plecare."}
              </h2>
            </HeadingReveal.default>
            <div className="space-y-6 md:space-y-8 mt-8 md:mt-16">
              <div>
                <div className="w-fit">
                  <TextReveal.default>
                    <p className="text-black/40 text-xs md:text-sm font-sans uppercase tracking-wider mb-1 md:mb-2">
                      {"Contact direct"}
                    </p>
                  </TextReveal.default>
                </div>
                <div className="w-fit">
                  <TextReveal.default>
                    <a
                      href="https://wa.me/40755938367"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[5vw] md:text-[2vw] font-display hover:text-brand-light transition-colors"
                    >
                      {"Discutam pe WhatsApp ↗"}
                    </a>
                  </TextReveal.default>
                </div>
              </div>
              <div>
                <div className="w-fit">
                  <TextReveal.default>
                    <p className="text-black/40 text-xs md:text-sm font-sans uppercase tracking-wider mb-1 md:mb-2">
                      {"Telefon"}
                    </p>
                  </TextReveal.default>
                </div>
                <div className="w-fit">
                  <TextReveal.default>
                    <a
                      href="tel:+40755938367"
                      className="text-[5vw] md:text-[2vw] font-display hover:text-brand-light transition-colors"
                    >
                      {"+40 755 938 367"}
                    </a>
                  </TextReveal.default>
                </div>
              </div>
              <div>
                <div className="w-fit">
                  <TextReveal.default>
                    <p className="text-black/40 text-xs md:text-sm font-sans uppercase tracking-wider mb-1 md:mb-2">
                      {"Colaborare"}
                    </p>
                  </TextReveal.default>
                </div>
                <div className="w-fit">
                  <TextReveal.default>
                    <p className="text-[5vw] md:text-[2vw] font-display">
                      {"Romania · Online"}
                    </p>
                  </TextReveal.default>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-10 md:mt-16">
              {["Site oficial ESA"].map((e) => (
                <div className="w-fit" key={e}>
                  <TextReveal.default>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://esa-coder-solutions.com/"
                      className="text-xs md:text-sm font-sans text-black/50 hover:text-brand-light transition-colors uppercase tracking-wider"
                    >
                      {e}
                    </a>
                  </TextReveal.default>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <form onSubmit={g} className="space-y-8 md:space-y-12">
              <div>
                <div className="w-fit">
                  <TextReveal.default>
                    <label className="text-black/40 text-xs md:text-sm font-sans uppercase tracking-wider block mb-3 md:mb-4">
                      {"01 — Numele tau"}
                    </label>
                  </TextReveal.default>
                </div>
                <input
                  type="text"
                  name="Full_Name"
                  value={e.Full_Name}
                  onChange={j}
                  placeholder="Nume si prenume"
                  aria-label="Nume si prenume"
                  required={!0}
                  className="w-full bg-transparent border-b border-black/20 pb-3 md:pb-4 text-[5vw] md:text-[2vw] font-display focus:outline-none focus:border-brand-gold transition-colors placeholder:text-black/20"
                />
              </div>
              <div>
                <div className="w-fit">
                  <TextReveal.default>
                    <label className="text-black/40 text-xs md:text-sm font-sans uppercase tracking-wider block mb-3 md:mb-4">
                      {"02 — Adresa de email"}
                    </label>
                  </TextReveal.default>
                </div>
                <input
                  type="email"
                  name="Email"
                  value={e.Email}
                  onChange={j}
                  placeholder="nume@companie.ro"
                  aria-label="Adresa de email"
                  required={!0}
                  className="w-full bg-transparent border-b border-black/20 pb-3 md:pb-4 text-[5vw] md:text-[2vw] font-display focus:outline-none focus:border-brand-gold transition-colors placeholder:text-black/20"
                />
              </div>
              <div>
                <div className="w-fit">
                  <TextReveal.default>
                    <label className="text-black/40 text-xs md:text-sm font-sans uppercase tracking-wider block mb-3 md:mb-4">
                      {"03 — Telefon (optional)"}
                    </label>
                  </TextReveal.default>
                </div>
                <input
                  type="tel"
                  name="Phone_Number"
                  value={e.Phone_Number}
                  onChange={j}
                  placeholder="+40..."
                  aria-label="Telefon (optional)"
                  className="w-full bg-transparent border-b border-black/20 pb-3 md:pb-4 text-[5vw] md:text-[2vw] font-display focus:outline-none focus:border-brand-gold transition-colors placeholder:text-black/20"
                />
              </div>
              <div>
                <div className="w-fit">
                  <TextReveal.default>
                    <label className="text-black/40 text-xs md:text-sm font-sans uppercase tracking-wider block mb-3 md:mb-4">
                      {"04 — Ce vrei sa construim?"}
                    </label>
                  </TextReveal.default>
                </div>
                <textarea
                  name="Message"
                  value={e.Message}
                  onChange={j}
                  placeholder="Ce vrei sa obtii? Ai deja un site, un termen orientativ sau integrari necesare?"
                  aria-label="Detalii despre proiect"
                  rows={4}
                  required={!0}
                  className="w-full bg-transparent border-b border-black/20 pb-3 md:pb-4 text-[5vw] md:text-[2vw] font-display focus:outline-none focus:border-brand-gold transition-colors placeholder:text-black/20 resize-none"
                />
              </div>
              <p className="esa-contact-help">Formularul pregateste un mesaj pe WhatsApp catre ESA. Verifici si trimiti tu mesajul acolo; acesta nu este trimis automat de site.</p>
              <div className="w-fit">
                <button
                  ref={h}
                  type="submit"
                  disabled={o}
                  className="text-[5vw] md:text-[2vw] tracking-wide text-black font-semibold font-display uppercase px-4 py-2 md:px-6 md:py-3 relative bg-brand-gold rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4 md:mt-8"
                  style={{
                    overflow: "visible",
                  }}
                  onMouseEnter={() => {
                    o ||
                      (animation.default.to(h.current, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out",
                      }),
                      animation.default.to(f.current, {
                        rotationX: 90,
                        y: "-100%",
                        duration: 0.4,
                        ease: "power2.out",
                        transformPerspective: 1e3,
                      }),
                      animation.default.fromTo(
                        b.current,
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
                      w.current.forEach((e, t) => {
                        let a = (t / w.current.length) * Math.PI * 2,
                          s = 80 + 40 * Math.random(),
                          l = Math.cos(a) * s,
                          n = Math.sin(a) * s;
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
                                x: l,
                                y: n,
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
                  }}
                  onMouseLeave={() => {
                    o ||
                      (animation.default.to(h.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                      }),
                      animation.default.to(f.current, {
                        rotationX: 0,
                        y: "0%",
                        duration: 0.4,
                        ease: "power2.out",
                      }),
                      animation.default.to(b.current, {
                        rotationX: 90,
                        y: "100%",
                        duration: 0.4,
                        ease: "power2.out",
                      }),
                      w.current.forEach((e) => {
                        (animation.default.killTweensOf(e),
                          animation.default.set(e, {
                            opacity: 0,
                            x: 0,
                            y: 0,
                            scale: 0.5,
                          }));
                      }));
                  }}
                  onMouseDown={() => {
                    o ||
                      animation.default.to(h.current, {
                        scale: 0.95,
                        duration: 0.1,
                        ease: "power2.out",
                      });
                  }}
                  onMouseUp={() => {
                    o ||
                      animation.default.to(h.current, {
                        scale: 1.05,
                        duration: 0.1,
                        ease: "power2.out",
                      });
                  }}
                >
                  <span
                    className="relative overflow-clip inline-block"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                  >
                    <span
                      ref={f}
                      className="inline-block"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {y}
                    </span>
                    <span
                      ref={b}
                      className="inline-block absolute top-0 left-0 translate-y-full"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {y}
                    </span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
