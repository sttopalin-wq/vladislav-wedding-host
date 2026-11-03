import { NextResponse } from "next/server";

export const runtime = "nodejs";

const clean = (v: unknown, max = 120) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  // ловушка для ботов: тихо «успех»
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    name: clean(body.name),
    date: clean(body.date, 20),
    city: clean(body.city),
    guests: clean(body.guests, 6),
    contact: clean(body.contact),
  };
  if (!lead.name || !lead.date || !lead.city || !lead.guests || !lead.contact) {
    return NextResponse.json({ error: "Заполните все поля" }, { status: 422 });
  }

  const text = [
    "💍 Новая заявка с сайта",
    `Имя: ${lead.name}`,
    `Дата: ${lead.date}`,
    `Город: ${lead.city}`,
    `Гостей: ${lead.guests}`,
    `Связь: ${lead.contact}`,
  ].join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (token && chat) {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text }),
    }).catch(() => null);
    if (!r?.ok) return NextResponse.json({ error: "Сервис временно недоступен" }, { status: 502 });
  } else {
    console.log("[lead]\n" + text);
  }
  return NextResponse.json({ ok: true });
}
