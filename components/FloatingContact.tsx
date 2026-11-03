"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck } from "lucide-react";

/** Фиксированная кнопка связи: появляется после hero и прячется, когда видна форма. */
export default function FloatingContact() {
  const [past, setPast] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const on = () => setPast(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const el = document.getElementById("contact");
    const io = el ? new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), { threshold: 0.15 }) : null;
    if (el && io) io.observe(el);
    return () => {
      window.removeEventListener("scroll", on);
      io?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {past && !atForm && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
          className="label fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-3 rounded-full bg-acid px-6 py-4 text-black shadow-[0_10px_40px_-10px_rgba(228,255,26,.5)] md:bottom-8 md:left-auto md:right-8"
        >
          <CalendarCheck className="size-4" aria-hidden />
          Проверить дату
        </motion.a>
      )}
    </AnimatePresence>
  );
}
