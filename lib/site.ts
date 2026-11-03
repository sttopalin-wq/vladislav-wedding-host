/**
 * Единое место для данных ведущего. Всё, что помечено TODO, — заполнить реальными данными.
 * Пустая ссылка = кнопка ведёт к форме заявки, ничего не ломается.
 */
export const site = {
  firstName: "Владислав",
  lastName: "Логвиненко", // TODO: сверить написание фамилии с владельцем
  role: "Ведущий свадеб",
  city: "", // TODO: город работы
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  links: {
    instagram: "", // TODO: https://instagram.com/<ник>
    telegram: "", // TODO: https://t.me/<ник>
    whatsapp: "", // TODO: https://wa.me/<номер>
    phone: "", // TODO: +7...
  },
} as const;

export const fullName = `${site.firstName} ${site.lastName}`;

export function link(kind: keyof typeof site.links): { href: string; external: boolean } {
  const v = site.links[kind];
  if (!v) return { href: "#contact", external: false };
  if (kind === "phone") return { href: `tel:${v}`, external: false };
  return { href: v, external: true };
}
