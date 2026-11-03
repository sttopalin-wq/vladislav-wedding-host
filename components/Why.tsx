"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { theses } from "@/lib/content";
import { Eyebrow, Lines, FadeUp, Cta } from "./ui";

function Thesis({ t, i }: { t: (typeof theses)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const long = i === 0;
  return (
    <div ref={ref} className="group relative grid items-center gap-8 border-t border-milk/10 py-14 md:grid-cols-12 md:py-24">
      <span className="label text-acid md:col-span-1">0{i + 1}</span>
      <div className="md:col-span-8">
        <Lines
          as="h3"
          className={`display ${long ? "text-[clamp(1.9rem,5.4vw,5.6rem)]" : "text-[clamp(3rem,10vw,10rem)]"}`}
          lines={t.big.map((l) => (l === t.mark ? <span key={l} className="text-acid">{l}</span> : l))}
        />
        <FadeUp className="mt-6 max-w-md text-lg text-milk/65" delay={0.2}>{t.note}</FadeUp>
      </div>
      <motion.div style={{ y }} className="relative hidden aspect-[3/4] w-full max-w-[220px] justify-self-end overflow-hidden rounded-sm md:col-span-3 md:block">
        <Image src={t.img} alt="" fill sizes="220px" className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
      </motion.div>
    </div>
  );
}

export default function Why() {
  return (
    <section id="why" aria-label="Почему я" className="bg-ink px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow n="03">Почему я</Eyebrow>
        <div className="mt-12">
          {theses.map((t, i) => (
            <Thesis key={i} t={t} i={i} />
          ))}
        </div>
        <div className="border-t border-milk/10 pt-12">
          <Cta href="#contact" className="w-full sm:w-auto">Хочу, чтобы было по-нашему</Cta>
        </div>
      </div>
    </section>
  );
}
