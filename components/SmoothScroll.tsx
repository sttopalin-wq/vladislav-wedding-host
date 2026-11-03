"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Инерционный скролл + плавные переходы по якорям. Отключается при prefers-reduced-motion. */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });

    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    if (lenis) raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!;
      const el = id === "#top" ? document.body : document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(id === "#top" ? 0 : el, { offset: -10, duration: 1.6 });
      else el.scrollIntoView();
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);
  return null;
}
