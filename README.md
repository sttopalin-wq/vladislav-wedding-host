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
- Заявки: скопировать `.env.example` в `.env.local` и указать Telegram-бота — тогда заявки придут в чат. Без этого пишутся в лог сервера.
