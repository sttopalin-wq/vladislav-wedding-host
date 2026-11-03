"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/** Построчное «маска-выезд» появление заголовка при скролле. */
export function Lines({
  lines,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        // наблюдаем за неподвижной обёрткой: сам сдвинутый текст обрезан overflow и не «виден» observer'у
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.1em] -mb-[0.1em]"
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 1, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            {l}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

export function FadeUp({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="label flex items-center gap-3 text-ash">
      {n && <span className="text-acid">{n}</span>}
      <span className="h-px w-8 bg-ash/50" />
      {children}
    </p>
  );
}

/** CTA-кнопка с «заливкой» при наведении и стрелкой. */
export function Cta({
  href,
  children,
  variant = "solid",
  external,
  className = "",
  onClick,
  type,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const ghost = variant === "ghost";
  const base =
    "group relative inline-flex items-center justify-between gap-4 overflow-hidden rounded-full px-6 py-4 label transition-colors duration-500 disabled:opacity-50";
  const tone = ghost ? "border border-milk/30 text-milk hover:border-milk" : "bg-acid text-black";
  const hoverText = ghost ? "group-hover:text-black" : "";
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full rounded-[inherit] bg-milk transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0"
      />
      <span className={`relative z-10 transition-colors duration-500 ${hoverText}`}>{children}</span>
      <ArrowUpRight aria-hidden className={`relative z-10 size-4 transition-all duration-500 group-hover:rotate-45 ${hoverText}`} />
    </>
  );
  const cls = `${base} ${tone} ${className}`;
  if (href)
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
