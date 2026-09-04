// Recovered from ff7a83a176508cf6.js; original layout, values and behavior preserved.
import { getVendor } from "../vendor/runtime.js";
import * as jsxRuntime from "react/jsx-runtime";
import * as links from "../routing/Router.jsx";
import * as AnimatedButton from "../components/AnimatedButton.jsx";
import * as React from "react";
React;
let OriginalComponentO = ({ className: e }) => (
  <svg viewBox="0 0 100 100" className={e}>
    <polygon
      points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
      fill="none"
      stroke="currentColor"
      className="text-brand-gold"
      strokeWidth="1"
    />
  </svg>
);
export default () => (
  <section className="relative w-full h-screen flex items-center justify-center px-[3vw] max-md:px-[6vw] overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <OriginalComponentO className="absolute top-[10%] left-[5%] w-[8vw] text-zinc-500/20" />
      <OriginalComponentO className="absolute top-[5%] left-[12%] w-[5vw] text-zinc-500/15" />
      <OriginalComponentO className="absolute top-[20%] right-[10%] w-[12vw] text-zinc-500/10" />
      <OriginalComponentO className="absolute top-[15%] right-[5%] w-[6vw] text-zinc-500/20" />
      <OriginalComponentO className="absolute bottom-[25%] left-[8%] w-[10vw] text-zinc-500/15" />
      <OriginalComponentO className="absolute bottom-[15%] left-[15%] w-[4vw] text-zinc-500/25" />
      <OriginalComponentO className="absolute bottom-[10%] right-[15%] w-[9vw] text-zinc-500/10" />
      <OriginalComponentO className="absolute bottom-[20%] right-[8%] w-[5vw] text-zinc-500/20" />
      <OriginalComponentO className="absolute top-[40%] left-[3%] w-[6vw] text-zinc-500/15" />
      <OriginalComponentO className="absolute top-[50%] right-[3%] w-[7vw] text-zinc-500/15" />
      <OriginalComponentO className="absolute bottom-[5%] left-[40%] w-[4vw] text-zinc-500/20" />
      <OriginalComponentO className="absolute top-[8%] right-[40%] w-[5vw] text-zinc-500/15" />
    </div>
    <div className="relative z-10 flex flex-col items-center">
      <h1 className="font-display text-[25vw] max-md:text-[40vw] leading-[0.8] tracking-tight">
        {"404"}
      </h1>
      <p className="font-sans text-[1.2vw] max-md:text-[4vw] text-zinc-400 max-w-[30vw] max-md:max-w-[80vw] text-center leading-relaxed mt-8">
        {"Pagina cautata nu exista sau a fost mutata."}
      </p>
      <div className="mt-12">
        <links.default href="/">
          <AnimatedButton.default>{"Inapoi acasa"}</AnimatedButton.default>
        </links.default>
      </div>
    </div>
  </section>
);
