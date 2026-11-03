"use client";

import { useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { lifePhotos } from "@/lib/content";
import { Eyebrow, Lines, FadeUp } from "./ui";

const layout = [
  { cls: "col-span-7 md:col-span-4 md:row-span-2", rot: -2, y: [40, -40] },
  { cls: "col-span-5 md:col-span-3", rot: 3, y: [80, -20] },
  { cls: "col-span-5 md:col-span-3 md:row-span-2", rot: -3, y: [0, -80] },
  { cls: "col-span-7 md:col-span-2", rot: 2, y: [60, -30] },
  { cls: "col-span-6 md:col-span-3", rot: -1, y: [30, -50] },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section id="about" aria-label="Моя личность" className="overflow-hidden bg-ink px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow n="05">Человек за микрофоном</Eyebrow>
        <Lines
          as="p"
          className="display mt-8 max-w-[18ch] text-[clamp(1.9rem,5.6vw,5.8rem)] !leading-[0.98] !tracking-[-0.035em]"
          lines={["«Я не хочу быть просто", "человеком с микрофоном", <span key="x">на вашей <span className="accent-serif text-acid">свадьбе.</span></span>]}
        />
        <FadeUp className="mt-8 max-w-xl text-xl leading-snug text-milk/80 md:text-2xl" delay={0.1}>
          Мне важно стать человеком, которому вы доверите этот день».
        </FadeUp>

        <div ref={ref} className="mt-20 grid auto-rows-[160px] grid-cols-12 gap-3 md:auto-rows-[200px] md:gap-5">
          {lifePhotos.map((p, i) => {
            const L = layout[i % layout.length];
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : L.y);
            return (
              <motion.figure key={p.src} style={{ y, rotate: L.rot }} className={`group relative overflow-hidden rounded-sm ${L.cls}`}>
                <Image src={asset(p.src)} alt={p.cap} fill sizes="(min-width:768px) 30vw, 60vw" className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                <figcaption className="label absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1.5 text-[0.6rem] backdrop-blur">{p.cap}</figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
