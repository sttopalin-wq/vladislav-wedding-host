import { fullName } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink px-5 pb-28 pt-10 md:px-10 md:pb-10">
      <div className="mx-auto max-w-[1600px]">
        <p aria-hidden className="display select-none text-[clamp(2.6rem,11.5vw,12rem)] text-transparent [-webkit-text-stroke:1px_rgba(242,239,232,.25)]">
          {fullName}
        </p>
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-milk/10 pt-6 text-xs text-ash md:flex-row">
          <span>© {new Date().getFullYear()} {fullName}. Ведущий свадеб.</span>
          <a href="#top" className="label hover:text-acid">Наверх ↑</a>
        </div>
      </div>
    </footer>
  );
}
