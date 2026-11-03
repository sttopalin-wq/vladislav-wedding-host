"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { reels, type Reel } from "@/lib/content";
import { Eyebrow, Lines, FadeUp, Cta } from "./ui";
import { link } from "@/lib/site";

function Tile({ r, i, onOpen }: { r: Reel; i: number; onOpen: (r: Reel) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(r)}
      data-cursor="Смотреть"
      aria-label={`Открыть ролик: ${r.title}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative aspect-[3/4] overflow-hidden rounded-sm bg-graphite text-left md:aspect-auto ${r.span} ${i === 0 ? "col-span-2" : ""}`}
    >
      <motion.div layoutId={`reel-${r.id}`} className="absolute inset-0">
        <Image
          src={r.img}
          alt={r.title}
          fill
          sizes="(min-width:768px) 40vw, 50vw"
          className="object-cover grayscale-[.85] transition-all duration-[900ms] ease-out group-hover:scale-110 group-hover:grayscale-0"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
      <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-acid text-black transition-transform duration-500 group-hover:scale-125">
        <Play className="size-3.5 translate-x-px fill-current" aria-hidden />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="label text-acid">0{i + 1}</p>
        <p className="mt-1 text-lg font-bold uppercase leading-none tracking-tight md:text-2xl">{r.title}</p>
        <p className="mt-2 hidden max-h-0 overflow-hidden text-sm leading-snug text-milk/80 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100 md:block">
          {r.note}
        </p>
      </div>
    </motion.button>
  );
}

function Lightbox({ r, onClose }: { r: Reel; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={r.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md md:p-10"
      onClick={onClose}
    >
      <div className="grid max-h-full w-full max-w-6xl items-center gap-8 md:grid-cols-[auto_1fr]" onClick={(e) => e.stopPropagation()}>
        <motion.div layoutId={`reel-${r.id}`} className="relative mx-auto aspect-[3/4] h-[62svh] max-h-[80svh] overflow-hidden rounded-sm bg-graphite md:h-[80svh]">
          <Image src={r.img} alt={r.title} fill sizes="60vw" className="object-cover" />
          {r.video && <video src={r.video} className="absolute inset-0 h-full w-full object-cover" controls autoPlay playsInline />}
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.6 }} className="max-w-md">
          <p className="label text-acid">Реальный момент</p>
          <h3 className="display mt-3 text-4xl md:text-6xl">{r.title}</h3>
          <p className="mt-5 text-lg text-milk/75">{r.note}</p>
          {!r.video && process.env.NODE_ENV !== "production" && (
            <p className="mt-6 rounded border border-dashed border-ash/40 p-3 text-xs text-ash">
              DEV: добавьте файл ролика в <code>public/media/reels</code> и укажите путь в <code>lib/content.ts</code> (поле video).
            </p>
          )}
          <div className="mt-8">
            <Cta href="#contact" onClick={onClose}>
              Хочу так же
            </Cta>
          </div>
        </motion.div>
      </div>
      <button type="button" onClick={onClose} aria-label="Закрыть" className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-milk text-black hover:bg-acid md:right-8 md:top-8">
        <X className="size-5" />
      </button>
    </motion.div>
  );
}

export default function Reels() {
  const [open, setOpen] = useState<Reel | null>(null);
  const ig = link("instagram");
  return (
    <section id="reels" aria-label="Видеогалерея" className="relative bg-ink px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow n="01">Реальные мероприятия</Eyebrow>
        <Lines as="h2" lines={["Не верьте словам —", <span key="a" className="text-acid">смотрите</span>]} className="display mt-6 text-[clamp(2.8rem,9vw,9rem)]" />
        <FadeUp className="mt-6 max-w-xl text-lg text-milk/65">Кадры с настоящих свадеб. Нажмите на любой, чтобы открыть на весь экран.</FadeUp>

        <div className="mt-14 grid grid-cols-2 gap-2 md:auto-rows-[190px] md:grid-cols-12 md:gap-3">
          {reels.map((r, i) => (
            <Tile key={r.id} r={r} i={i} onOpen={setOpen} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-milk/10 pt-8 md:flex-row md:items-center">
          <p className="text-milk/60">Ещё больше — в Instagram.</p>
          <Cta href={ig.href} external={ig.external} variant="ghost">
            Смотреть Instagram
          </Cta>
        </div>
      </div>
      <AnimatePresence>{open && <Lightbox r={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
