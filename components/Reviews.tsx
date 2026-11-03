import { Eyebrow, Lines } from "./ui";
import { MessageSquareQuote, Video, Image as Img } from "lucide-react";

/**
 * Отзывы — только визуальные заглушки. Реальные цитаты и имена пар
 * добавляйте здесь, когда они будут получены с разрешения авторов.
 */
const slots = [
  { icon: Video, t: "Видео-отзыв пары", h: "aspect-[3/4]" },
  { icon: Img, t: "Скриншот сообщения", h: "aspect-square" },
  { icon: MessageSquareQuote, t: "Текстовый отзыв", h: "aspect-[4/5]" },
];

export default function Reviews() {
  return (
    <section id="reviews" aria-label="Отзывы" className="bg-graphite px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <Eyebrow n="06">Отзывы</Eyebrow>
        <Lines as="h2" lines={["Слова", "молодожёнов"]} className="display mt-6 text-[clamp(2.8rem,9vw,9rem)]" />
        <div className="mt-14 grid items-end gap-4 md:grid-cols-3">
          {slots.map(({ icon: Icon, t, h }) => (
            <div key={t} className={`relative flex ${h} flex-col items-center justify-center gap-4 rounded-sm border border-dashed border-milk/20 bg-ink/40 p-6 text-center`}>
              <Icon className="size-8 text-acid" aria-hidden />
              <p className="label text-milk/70">{t}</p>
              <p className="max-w-[22ch] text-sm text-ash">Здесь появится настоящий отзыв пары после согласования.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
