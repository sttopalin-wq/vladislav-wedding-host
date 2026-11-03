export type Reel = {
  id: string;
  title: string;
  note: string;
  img: string;
  /** Положите ролик в public/media/reels и впишите путь, например "/media/reels/greeting.mp4" */
  video?: string;
  /** Класс сетки (desktop, 12 колонок) */
  span: string;
};

export const reels: Reel[] = [
  { id: "greeting", title: "Общение с гостем", note: "Живой диалог с залом — без заготовленных шуток из интернета.", img: "/media/ig-mic.jpg", span: "md:col-span-5 md:row-span-2" },
  { id: "warmup", title: "Разогрев", note: "Как зал из «сидим и смотрим» становится одной компанией.", img: "/media/ig-warmup.jpg", span: "md:col-span-3 md:row-span-1" },
  { id: "bride", title: "Речь невесты", note: "Тот самый момент в конце вечера.", img: "/media/ig-bride.jpg", span: "md:col-span-4 md:row-span-2" },
  { id: "ceremony", title: "Церемония: речь жениха", note: "Когда слова важнее эффектов.", img: "/media/ig-ceremony.jpg", span: "md:col-span-3 md:row-span-1" },
  { id: "dance", title: "Свадебный танец", note: "Какую музыку выбрать, чтобы было ваше.", img: "/media/ig-dance.jpg", span: "md:col-span-4 md:row-span-1" },
  { id: "couple", title: "Финал церемонии", note: "Кадр, ради которого всё затевалось.", img: "/media/ig-couple.jpg", span: "md:col-span-4 md:row-span-1" },
  { id: "break", title: "Ведущий во время перерыва", note: "Закулисье: что происходит, пока гости отдыхают.", img: "/media/ig-tee.jpg", span: "md:col-span-4 md:row-span-1" },
];

export const directions = [
  { n: "01", title: "Эмоции", text: "Искренние моменты, смех, слёзы радости, объятия.", img: "/media/ig-couple.jpg", pos: "50% 40%" },
  { n: "02", title: "Юмор", text: "Уместная импровизация, живое общение, никаких неловких конкурсов.", img: "/media/ig-mic.jpg", pos: "50% 30%" },
  { n: "03", title: "Атмосфера", text: "Музыка, энергия, красивые моменты и ощущение настоящего праздника.", img: "/media/ig-warmup.jpg", pos: "50% 35%" },
];

export const theses = [
  { big: ["Не буду заставлять ваших гостей", "танцевать под конкурсы", "из 2007 года"], mark: "из 2007 года", note: "Только то, что уместно для вашей пары и ваших гостей.", img: "/media/ig-dance.jpg" },
  { big: ["Не будет", "неловко"], mark: "неловко", note: "Никто не окажется в центре зала против своей воли.", img: "/media/ig-ceremony.jpg" },
  { big: ["Не будет", "скучно"], mark: "скучно", note: "Темп, музыка и общение с залом — на моей стороне.", img: "/media/ig-warmup.jpg" },
  { big: ["Будет", "по-вашему"], mark: "по-вашему", note: "Свадьба рассказывает вашу историю, а не мой шаблон.", img: "/media/ig-portrait.jpg" },
];

export const steps = [
  { t: "Знакомство", d: "Узнаём друг друга." },
  { t: "Идея", d: "Обсуждаем концепцию вашей свадьбы." },
  { t: "Подготовка", d: "Продумываем сценарий и детали." },
  { t: "Встреча", d: "Знакомимся с атмосферой и гостями." },
  { t: "Ваш день", d: "Создаём тот самый праздник." },
];

export const lifePhotos = [
  { src: "/media/ig-walk.jpg", cap: "Вне работы" },
  { src: "/media/ig-kayak.jpg", cap: "Приключения" },
  { src: "/media/ig-summer.jpg", cap: "Один день лета" },
  { src: "/media/ig-kid.jpg", cap: "Дома" },
  { src: "/media/ig-tee.jpg", cap: "Без микрофона" },
];
