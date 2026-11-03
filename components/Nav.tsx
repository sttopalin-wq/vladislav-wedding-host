"use client";

import { useEffect, useState } from "react";
import { fullName } from "@/lib/site";

const items = [
  { href: "#reels", t: "Видео" },
  { href: "#style", t: "Стиль" },
  { href: "#process", t: "Процесс" },
  { href: "#about", t: "Личность" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "bg-ink/70 backdrop-blur-xl" : ""}`}>
      <nav aria-label="Основная навигация" className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="label flex items-center gap-2" aria-label={`${fullName} — наверх`}>
          <span className="size-2 rounded-full bg-acid" />
          {fullName}
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {items.map((i) => (
            <li key={i.href}>
              <a href={i.href} className="label text-milk/70 transition-colors hover:text-acid">
                {i.t}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="label rounded-full bg-milk px-4 py-2.5 text-black transition-colors hover:bg-acid">
          Дата
        </a>
      </nav>
    </header>
  );
}
