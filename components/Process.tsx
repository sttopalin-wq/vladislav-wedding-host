"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "motion/react";
import { steps } from "@/lib/content";
import { Eyebrow, Lines } from "./ui";

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 65%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length * 0.999)))));

  return (
    <section id="process" aria-label="Как мы будем работать" className="bg-graphite px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow n="04">Процесс</Eyebrow>
          <Lines as="h2" lines={["Как мы", "будем", "работать"]} className="display mt-6 text-[clamp(2.8rem,8vw,8rem)]" />
          <p className="mt-8 max-w-sm text-lg text-milk/65">От первого разговора до вашего дня — пять простых шагов.</p>
        </div>

        <ol ref={ref} className="relative pl-10 md:pl-16">
          <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-milk/15 md:left-[19px]" />
          <motion.span aria-hidden style={{ scaleY: line }} className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-acid md:left-[19px]" />
          {steps.map((s, i) => {
            const on = i <= active;
            return (
              <li key={s.t} className="relative pb-20 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute -left-10 top-3 flex size-6 items-center justify-center rounded-full border transition-all duration-500 md:-left-16 md:size-10 ${on ? "scale-100 border-acid bg-acid" : "border-milk/30 bg-graphite"}`}
                >
                  <span className={`size-1.5 rounded-full ${on ? "bg-black" : "bg-milk/30"}`} />
                </span>
                <p className={`label transition-colors duration-500 ${on ? "text-acid" : "text-ash"}`}>Шаг 0{i + 1}</p>
                <h3 className={`display mt-2 text-[clamp(2.2rem,6vw,5.5rem)] transition-colors duration-500 ${on ? "text-milk" : "text-milk/25"}`}>{s.t}</h3>
                <p className={`mt-3 text-lg transition-colors duration-500 md:text-xl ${on ? "text-milk/75" : "text-milk/25"}`}>{s.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
