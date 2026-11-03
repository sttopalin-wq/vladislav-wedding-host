"use client";

import { useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { directions } from "@/lib/content";
import { Eyebrow, Lines, FadeUp } from "./ui";

/** Три «сцены»: на desktop раскрываются при наведении, на мобильном — по тапу. */
export default function Directions() {
  const [active, setActive] = useState(0);
  return (
    <section id="style" aria-label="Какой будет ваша свадьба" className="bg-graphite px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow n="02">Характер вечера</Eyebrow>
        <Lines as="h2" lines={["Какой будет", <span key="a" className="accent-serif text-[1.05em] normal-case text-acid">ваша</span>, "свадьба?"]} className="display mt-6 text-[clamp(2.8rem,9vw,9rem)] [&>span:nth-child(2)]:-my-[0.05em]" />
        <FadeUp className="mt-6 max-w-xl text-lg text-milk/65">Три настроения, из которых складывается вечер. Наведите или нажмите.</FadeUp>

        <div className="mt-14 flex h-[calc(100svh-4rem)] max-h-[780px] min-h-[600px] flex-col gap-2 md:h-[72vh] md:flex-row md:gap-3">
          {directions.map((d, i) => {
            const on = active === i;
            return (
              <article
                key={d.n}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                data-cursor={on ? "" : "Открыть"}
                className={`relative min-h-0 min-w-0 overflow-hidden rounded-sm bg-ink transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${on ? "grow-[4]" : "grow-[1]"} basis-0`}
              >
                <Image
                  src={asset(d.img)}
                  alt=""
                  fill
                  sizes="(min-width:768px) 60vw, 100vw"
                  style={{ objectPosition: d.pos }}
                  className={`object-cover transition-all duration-[1200ms] ${on ? "scale-100 grayscale-0" : "scale-110 grayscale"}`}
                />
                <div className={`absolute inset-0 transition-colors duration-700 ${on ? "bg-gradient-to-t from-black/90 via-black/20 to-black/10" : "bg-black/65"}`} />
                <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
                  <span className={`display text-5xl transition-colors md:text-7xl ${on ? "text-acid" : "text-milk/50"}`}>{d.n}</span>
                  <div className="min-w-0">
                    <h3 className="display text-[clamp(2rem,4.2vw,4.5rem)] md:[writing-mode:initial]">{d.title}</h3>
                    <p className={`mt-3 max-w-sm text-base text-milk/80 transition-all duration-700 md:text-lg ${on ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>{d.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
