"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Кастомный курсор: только мышь, только desktop. Подпись берётся из data-cursor. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hot, setHot] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 38, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 450, damping: 38, mass: 0.4 });

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!ok) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const cur = t?.closest<HTMLElement>("[data-cursor]");
      const interactive = t?.closest("a, button, input, select, label");
      setLabel(cur?.dataset.cursor ?? "");
      setHot(Boolean(cur || interactive));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const big = Boolean(label);
  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      >
        <motion.div
          animate={{ width: big ? 92 : hot ? 46 : 14, height: big ? 92 : hot ? 46 : 14 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
      </motion.div>
      <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[101]">
        <span
          className={`label -translate-x-1/2 -translate-y-1/2 flex w-[92px] items-center justify-center text-center text-[0.6rem] text-black transition-opacity ${big ? "opacity-100" : "opacity-0"}`}
        >
          {label}
        </span>
      </motion.div>
    </>
  );
}
