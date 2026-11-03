/** Префикс для статических файлов, когда сайт лежит в подпапке (GitHub Pages). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${BASE}${p}`;
