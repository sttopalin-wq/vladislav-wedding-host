"use client";

import { useState, type FormEvent } from "react";
import { Check, Send, MessageCircle, Phone, Loader2 } from "lucide-react";
import { Lines, FadeUp, Cta } from "./ui";
import { link } from "@/lib/site";

const Insta = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={p.className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
  </svg>
);

type State = "idle" | "sending" | "done" | "error";

const field =
  "peer w-full border-0 border-b border-milk/25 bg-transparent px-0 py-4 text-xl text-milk outline-none transition-colors focus:border-acid md:text-2xl";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="label text-ash">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setErr("");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Не удалось отправить");
      setState("done");
      form.reset();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Ошибка отправки");
      setState("error");
    }
  }

  const tg = link("telegram");
  const wa = link("whatsapp");
  const ig = link("instagram");
  const ph = link("phone");
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section id="contact" aria-label="Проверить свободную дату" className="relative overflow-hidden bg-ink px-5 pb-16 pt-28 md:px-10 md:pt-48">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 size-[40rem] rounded-full bg-acid/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1600px]">
        <Lines
          as="h2"
          className="display text-[clamp(2.4rem,8.6vw,8.8rem)]"
          lines={["У вас уже есть дата.", <span key="b" className="text-acid">Давайте сделаем</span>, <span key="c" className="text-acid">её особенной</span>]}
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <FadeUp>
            {state === "done" ? (
              <div role="status" className="flex min-h-[360px] flex-col items-start justify-center gap-5 border border-acid/40 p-8">
                <span className="flex size-14 items-center justify-center rounded-full bg-acid text-black">
                  <Check className="size-7" />
                </span>
                <p className="display text-4xl md:text-5xl">Заявка отправлена</p>
                <p className="max-w-md text-lg text-milk/70">Я свяжусь с вами, как только увижу заявку, и мы проверим вашу дату.</p>
                <button type="button" onClick={() => setState("idle")} className="label text-acid underline underline-offset-4">
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate={false} className="grid gap-x-10 gap-y-6 md:grid-cols-2">
                <Field id="name" label="Ваше имя">
                  <input id="name" name="name" required autoComplete="name" placeholder="Как к вам обращаться" className={field} />
                </Field>
                <Field id="date" label="Дата свадьбы">
                  <input id="date" name="date" type="date" required min={today} className={`${field} [color-scheme:dark]`} />
                </Field>
                <Field id="city" label="Город">
                  <input id="city" name="city" required autoComplete="address-level2" placeholder="Где пройдёт свадьба" className={field} />
                </Field>
                <Field id="guests" label="Количество гостей">
                  <input id="guests" name="guests" type="number" inputMode="numeric" min={1} max={2000} required placeholder="Примерно" className={field} />
                </Field>
                <div className="md:col-span-2">
                  <Field id="contact-field" label="Телефон или Telegram">
                    <input id="contact-field" name="contact" required autoComplete="tel" placeholder="+7 … или @username" className={field} />
                  </Field>
                </div>
                {/* ловушка для ботов */}
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                <div className="md:col-span-2">
                  <Cta type="submit" disabled={state === "sending"} className="mt-4 w-full md:w-auto md:min-w-[22rem]">
                    {state === "sending" ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin" /> Отправляю
                      </span>
                    ) : (
                      "Проверить свободную дату"
                    )}
                  </Cta>
                  {state === "error" && (
                    <p role="alert" className="mt-4 text-sm text-red-400">
                      {err}. Попробуйте ещё раз или напишите напрямую.
                    </p>
                  )}
                  <p className="mt-4 text-xs text-ash">Отправляя заявку, вы соглашаетесь на обработку контактных данных для связи.</p>
                </div>
              </form>
            )}
          </FadeUp>

          <FadeUp delay={0.15} className="flex flex-col gap-3 lg:pt-6">
            <p className="label text-ash">Или напишите напрямую</p>
            {[
              { l: "Instagram", i: <Insta className="size-5" />, x: ig },
              { l: "Telegram", i: <Send className="size-5" />, x: tg },
              { l: "WhatsApp", i: <MessageCircle className="size-5" />, x: wa },
              { l: "Позвонить", i: <Phone className="size-5" />, x: ph },
            ].map(({ l, i, x }) => (
              <a
                key={l}
                href={x.href}
                {...(x.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center justify-between border-b border-milk/15 py-5 text-2xl font-bold uppercase tracking-tight transition-colors hover:text-acid md:text-3xl"
              >
                <span className="flex items-center gap-4">
                  {i}
                  {l}
                </span>
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
