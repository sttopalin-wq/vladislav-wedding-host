# Сайт ведущего свадеб

Next.js 16 · TypeScript · Tailwind 4 · Motion · Lucide · Lenis

```
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Что заменить на реальное
- `lib/site.ts` — фамилия (сверить), город, ссылки Instagram / Telegram / WhatsApp, телефон. Пустая ссылка = кнопка ведёт к форме.
- `public/media/hero.mp4` — видео для главного экрана (подхватится само).
- `lib/content.ts` — ролики галереи: положить файлы в `public/media/reels/` и вписать `video`.
- `public/media/ig-*.jpg` — временные кадры, нарезанные из скриншота Instagram (низкое разрешение). Заменить оригиналами под теми же именами.
- `components/Reviews.tsx` — вставить настоящие отзывы, когда будут.
- Заявки: статический сайт без сервера. Укажите `NEXT_PUBLIC_LEAD_ENDPOINT` (Formspree и т.п.) — тогда форма шлёт туда. Без него форма копирует заявку и открывает Telegram/WhatsApp из `lib/site.ts`.
