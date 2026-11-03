import { fullName } from "@/lib/site";

const words = ["Эмоции", "Юмор", "Атмосфера", fullName, "Без конкурсов из 2007"];

/** Лента-разделитель между hero и галереей. */
export default function Marquee() {
  const row = (
    <>
      {[...words, ...words].map((w, i) => (
        <span key={i} className="flex items-center gap-8 pr-8">
          <span className="display text-[clamp(1.6rem,4vw,3.4rem)]">{w}</span>
          <span aria-hidden className="size-3 rotate-45 bg-black" />
        </span>
      ))}
    </>
  );
  return (
    <div aria-hidden className="relative z-10 overflow-hidden bg-acid py-5 text-black">
      <div className="marquee-track flex">
        {row}
        {row}
      </div>
    </div>
  );
}
