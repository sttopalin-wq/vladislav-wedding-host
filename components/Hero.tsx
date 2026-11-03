"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Cta } from "./ui";
import { fullName, site } from "@/lib/site";

/** Положите ролик в public/media/hero.mp4 — он появится поверх кадра автоматически. */
const HERO_VIDEO = asset("/media/hero.mp4");

const line = (text: string, i: number, extra = "") => (
  <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
    <motion.span
      className={`block ${extra}`}
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.span>
  </span>
);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [videoOk, setVideoOk] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, reduce ? 1.08 : 1.25]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" aria-label="Главный экран" className="relative h-[100svh] min-h-[680px] overflow-hidden bg-ink">
      {/* фон: размытый кадр + затемнение */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <Image src={asset("/media/ig-mic.jpg")} alt="" fill priority sizes="100vw" className="scale-110 object-cover opacity-45 blur-2xl grayscale-[.4]" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(7,7,7,.75)_70%),linear-gradient(to_bottom,rgba(7,7,7,.5),transparent_30%,rgba(7,7,7,.95))]" />
      <div className="grain absolute inset-0 overflow-hidden" aria-hidden />

      {/* кадр-«экран» справа */}
      <motion.div
        style={{ y: cardY }}
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[-8%] top-[16%] z-[1] aspect-[3/4] w-[62vw] max-w-[520px] overflow-hidden rounded-sm md:right-[6vw] md:top-[14%] md:w-[28vw]"
      >
        <Image src={asset("/media/ig-mic-hero.jpg")} alt={`${fullName} с микрофоном на свадьбе`} fill priority sizes="(min-width:768px) 30vw, 60vw" className="object-cover" />
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoOk ? "opacity-100" : "opacity-0"}`}
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onCanPlay={() => setVideoOk(true)}
          onError={() => setVideoOk(false)}
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-milk/15" />
        <span className="label absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[0.6rem] backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-acid" /> Live
        </span>
      </motion.div>

      {/* типографика */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-28 pt-28 md:px-10 md:pb-32"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="label mb-6 flex items-center gap-3 text-milk/70"
        >
          <span className="h-px w-10 bg-acid" />
          {site.role}
          {site.city && ` · ${site.city}`}
        </motion.p>

        <h1 className="display text-[clamp(2.7rem,9.6vw,9.5rem)]">
          {line("Ваша свадьба.", 0)}
          {line("Ваша история.", 1)}
          <span className="mt-[0.18em] block overflow-hidden">
            <motion.span
              className="accent-serif block text-[0.5em] leading-[1.02] text-acid"
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              Моя задача — сделать её легендарной
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-md">
            <p className="label mb-3 text-acid">{fullName}</p>
            <p className="text-lg leading-snug text-milk/80 md:text-xl">Современные свадьбы с характером, эмоциями и атмосферой.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Cta href="#contact">Обсудить мою дату</Cta>
            <Cta href="#reels" variant="ghost">
              Посмотреть, как это бывает
            </Cta>
          </div>
        </motion.div>
      </motion.div>

      <a href="#reels" aria-label="Прокрутить вниз" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-milk/50 hover:text-acid md:block">
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </section>
  );
}
