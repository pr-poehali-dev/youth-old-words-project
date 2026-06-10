import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ──────────────────────────────────────────────────────────────────────

const WORDS = [
  { youth: "Краш", elder: "Симпатия / Влюблённость", emoji: "💘", example: "Мой краш поставил лайк — весь день счастлива!" },
  { youth: "Кринж", elder: "Стыдоба / Неловкость", emoji: "😬", example: "Смотреть старые фото — чистый кринж." },
  { youth: "Лайфхак", elder: "Полезный совет / Хитрость", emoji: "💡", example: "Лайфхак: клади телефон в рис, если намочил." },
  { youth: "Токсик", elder: "Вредный человек / Злыдень", emoji: "😤", example: "Не общайся с ним — он токсик." },
  { youth: "Чилить", elder: "Отдыхать / Ничегонеделать", emoji: "🛋️", example: "Планы на выходные — чилить дома." },
  { youth: "Флексить", elder: "Хвастаться / Форсить", emoji: "💪", example: "Купил новые кроссовки — флексит в школе." },
  { youth: "ГГ", elder: "Молодец! / Хорошая игра!", emoji: "🏆", example: "Выиграл турнир — все написали «ГГ»." },
  { youth: "Рофл", elder: "Шутка / Смех", emoji: "😂", example: "Это был просто рофл, не обижайся." },
  { youth: "Хайп", elder: "Шумиха / Ажиотаж", emoji: "🔥", example: "Вокруг этого фильма такой хайп!" },
  { youth: "Зашквар", elder: "Позор / Стыд", emoji: "🙈", example: "Прийти в старом пальто — зашквар." },
  { youth: "Бро", elder: "Друг / Приятель", emoji: "🤝", example: "Бро, ты где? Все уже ждут!" },
  { youth: "Рандом", elder: "Случайный / Незнакомец", emoji: "🎲", example: "Какой-то рандом написал в личку." },
];

const ELDER_WORDS = [
  { elder: "Авось", youth: "Может повезёт / На удачу", emoji: "🍀", example: "Авось пронесёт — поедем без зонтика." },
  { elder: "Намедни", youth: "Недавно / На днях", emoji: "📅", example: "Намедни встретил старого друга на рынке." },
  { elder: "Давеча", youth: "Вчера / Позавчера", emoji: "🕰️", example: "Давеча смотрел хороший фильм по телевизору." },
  { elder: "Кумекать", youth: "Думать / Соображать", emoji: "🧠", example: "Надо покумекать, как это починить." },
  { elder: "Шамать", youth: "Есть / Кушать", emoji: "🍲", example: "Садитесь шамать, всё уже на столе!" },
  { elder: "Чинно", youth: "Степенно / Достойно", emoji: "🎩", example: "Все сидели чинно, ждали тоста." },
  { elder: "Лихой", youth: "Крутой / Смелый", emoji: "🤠", example: "Лихой был парень — ничего не боялся." },
  { elder: "Балаган", youth: "Бардак / Цирк", emoji: "🎪", example: "Что за балаган вы тут устроили!" },
  { elder: "Ухажёр", youth: "Парень / Тот кто ухаживает", emoji: "💐", example: "К ней ухажёр приходил каждый вечер." },
  { elder: "Кумушки", youth: "Подруги-сплетницы", emoji: "👯", example: "Кумушки на лавочке всё судачат да судачат." },
  { elder: "Мотать на ус", youth: "Запоминать / Учиться", emoji: "📝", example: "Мотай на ус — потом пригодится." },
  { elder: "Голубчик", youth: "Дружище / Милый", emoji: "🕊️", example: "Голубчик, ты опять забыл позвонить!" },
];

const TIPS = [
  {
    category: "youth",
    title: "Как объяснить бабушке, что такое мессенджер",
    text: "Покажи на живом примере — отправьте друг другу голосовое сообщение. Практика лучше теории!",
    author: "Маша, 19 лет",
    avatar: "👩‍💻",
    likes: 48,
  },
  {
    category: "elder",
    title: "Как разговорить молодёжь за ужином",
    text: "Спроси, что они смотрят, и попроси показать. Искренний интерес творит чудеса.",
    author: "Татьяна Ивановна, 68 лет",
    avatar: "👵",
    likes: 63,
  },
  {
    category: "youth",
    title: "Настройка шрифта побольше на смартфоне",
    text: "Настройки → Экран → Размер текста. Сдвинь ползунок вправо — и глаза не будут уставать.",
    author: "Дима, 22 года",
    avatar: "👨‍🎓",
    likes: 91,
  },
  {
    category: "elder",
    title: "Рецепт блинов, которые любят все поколения",
    text: "Секрет моей мамы: добавь щепотку соды в тесто и дай постоять 10 минут — блины выйдут воздушные.",
    author: "Нина Петровна, 72 года",
    avatar: "👩‍🍳",
    likes: 77,
  },
];

const EVENTS = [
  {
    date: "21 июня",
    day: "Суббота",
    title: "Цифровой чай",
    desc: "Старшее поколение учится делать видеозвонки, молодёжь учится печь пирожки — в уютном зале библиотеки.",
    place: "Библиотека № 5, ул. Садовая",
    icon: "☕",
    color: "#fde8d0",
  },
  {
    date: "5 июля",
    day: "Суббота",
    title: "Прогулка поколений",
    desc: "Совместная прогулка по парку: молодёжь рассказывает о трендах, старшие — об истории города.",
    place: "Парк Победы, главный вход",
    icon: "🌳",
    color: "#d8ead8",
  },
  {
    date: "19 июля",
    day: "Пятница",
    title: "Вечер историй",
    desc: "Все желающие могут рассказать историю из своей жизни — смешную, трогательную или поучительную.",
    place: "Культурный центр «Горизонт»",
    icon: "📖",
    color: "#e8d8f0",
  },
];

const STORIES = [
  {
    name: "Виктор Степанович",
    age: "74 года",
    avatar: "👴",
    text: "Помню, как в 1975-м мы слушали «The Beatles» с соседом на одних наушниках. Сейчас мой внук открыл для меня целый мир — показал, как искать любую песню за секунды. Времена меняются, но страсть к музыке — нет.",
    year: "1975 → 2024",
    color: "#fff3e8",
  },
  {
    name: "Катя",
    age: "17 лет",
    avatar: "👧",
    text: "Бабушка научила меня вязать во время карантина. Я думала, что это скучно, но потом залипла на три часа. Сейчас веду тикток о вязании — уже 12 тысяч подписчиков. Оказывается, старое — это новое хипстерское.",
    year: "Весна 2020",
    color: "#e8f3e8",
  },
  {
    name: "Алексей",
    age: "45 лет",
    avatar: "👨",
    text: "Когда-то папа учил меня забивать гвозди, я считал это устаревшим. Теперь сам учу сына — а он снимает об этом видео для ютуба. Смотрю на их просмотры и думаю: умение из прошлого стало контентом будущего.",
    year: "Сквозь годы",
    color: "#f0e8f8",
  },
];

// ─── Notification Bell ─────────────────────────────────────────────────────────

const Bell = () => {
  const [ringing, setRinging] = useState(false);
  const [count, setCount] = useState(3);
  const [showPanel, setShowPanel] = useState(false);

  const ring = () => {
    setRinging(true);
    setTimeout(() => setRinging(false), 700);
    setShowPanel((v) => !v);
  };

  return (
    <div className="relative">
      <button
        onClick={ring}
        className="relative p-2 rounded-full hover:bg-[#f0e0d0] transition-colors"
        title="Уведомления"
      >
        <span className={ringing ? "bell-shake inline-block" : "inline-block"}>
          <Icon name="Bell" size={22} style={{ color: "var(--warm-terracotta)" }} />
        </span>
        {count > 0 && (
          <span className="absolute top-1 right-1 bg-[#c8714a] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-golos font-bold">
            {count}
          </span>
        )}
      </button>
      {showPanel && (
        <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-[#f0e0d0] z-50 animate-fade-in-up p-4">
          <p className="font-cormorant text-lg font-semibold text-[#2d2318] mb-3">Уведомления</p>
          {[
            { icon: "💡", text: "Новый совет от Нины Петровны про огород" },
            { icon: "📅", text: "Событие «Цифровой чай» через 3 дня" },
            { icon: "📖", text: "Виктор добавил историю о путешествии" },
          ].map((n, i) => (
            <div
              key={i}
              className="flex gap-3 py-2 border-b border-[#f5ede0] last:border-0 cursor-pointer hover:bg-[#faf3ea] rounded-lg px-2 transition-colors"
              onClick={() => setCount((c) => Math.max(0, c - 1))}
            >
              <span className="text-xl">{n.icon}</span>
              <p className="text-sm text-[#8a7060] leading-snug">{n.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Word Card ─────────────────────────────────────────────────────────────────

const WordCard = ({ w, i }: { w: (typeof WORDS)[0]; i: number }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="opacity-0-start animate-fade-in-up cursor-pointer"
      style={{ perspective: "800px", animationDelay: `${Math.min(i * 80, 500)}ms` }}
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        style={{
          transition: "transform 0.5s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          height: "160px",
        }}
      >
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" as const }}
          className="absolute inset-0 bg-white rounded-2xl border border-[#f0e0d0] p-5 flex flex-col justify-between card-hover shadow-sm"
        >
          <div>
            <span className="text-3xl">{w.emoji}</span>
            <p className="font-cormorant text-2xl font-semibold text-[#2d2318] mt-1">{w.youth}</p>
            <span className="tag-youth text-xs px-2 py-0.5 rounded-full font-golos font-medium">молодёжное</span>
          </div>
          <p className="text-xs text-[#8a7060] font-golos">Нажми, чтобы перевести →</p>
        </div>
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden" as const,
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-[#fdf6ee] rounded-2xl border border-[#e8d8c0] p-5 flex flex-col justify-between shadow-sm"
        >
          <div>
            <span className="tag-elder text-xs px-2 py-0.5 rounded-full font-golos font-medium">по-взрослому</span>
            <p className="font-cormorant text-xl font-semibold text-[#2d2318] mt-2">{w.elder}</p>
          </div>
          <p className="text-sm text-[#8a7060] font-golos italic">«{w.example}»</p>
        </div>
      </div>
    </div>
  );
};

const ElderWordCard = ({ w, i }: { w: (typeof ELDER_WORDS)[0]; i: number }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="opacity-0-start animate-fade-in-up cursor-pointer"
      style={{ perspective: "800px", animationDelay: `${Math.min(i * 80, 500)}ms` }}
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        style={{
          transition: "transform 0.5s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          height: "160px",
        }}
      >
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" as const }}
          className="absolute inset-0 bg-[#f0f5f0] rounded-2xl border border-[#d0e0d0] p-5 flex flex-col justify-between card-hover shadow-sm"
        >
          <div>
            <span className="text-3xl">{w.emoji}</span>
            <p className="font-cormorant text-2xl font-semibold text-[#2d2318] mt-1">{w.elder}</p>
            <span className="tag-elder text-xs px-2 py-0.5 rounded-full font-golos font-medium">из прошлого</span>
          </div>
          <p className="text-xs text-[#8a7060] font-golos">Нажми, чтобы перевести →</p>
        </div>
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden" as const,
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-[#fde8d0] rounded-2xl border border-[#f0d8b8] p-5 flex flex-col justify-between shadow-sm"
        >
          <div>
            <span className="tag-youth text-xs px-2 py-0.5 rounded-full font-golos font-medium">по-молодёжному</span>
            <p className="font-cormorant text-xl font-semibold text-[#2d2318] mt-2">{w.youth}</p>
          </div>
          <p className="text-sm text-[#8a7060] font-golos italic">«{w.example}»</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

type Tab = "home" | "dictionary" | "tips" | "events" | "stories";

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [search, setSearch] = useState("");
  const [likedTips, setLikedTips] = useState<number[]>([]);
  const [tipsFilter, setTipsFilter] = useState<"all" | "youth" | "elder">("all");
  const [dictTab, setDictTab] = useState<"youth" | "elder">("youth");
  const heroRef = useRef<HTMLDivElement>(null);

  const filteredWords = WORDS.filter(
    (w) =>
      w.youth.toLowerCase().includes(search.toLowerCase()) ||
      w.elder.toLowerCase().includes(search.toLowerCase())
  );

  const filteredElderWords = ELDER_WORDS.filter(
    (w) =>
      w.elder.toLowerCase().includes(search.toLowerCase()) ||
      w.youth.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTips =
    tipsFilter === "all" ? TIPS : TIPS.filter((t) => t.category === tipsFilter);

  const navItems: { key: Tab; label: string; icon: string }[] = [
    { key: "home", label: "Главная", icon: "Home" },
    { key: "dictionary", label: "Словарь", icon: "BookOpen" },
    { key: "tips", label: "Советы", icon: "Lightbulb" },
    { key: "events", label: "События", icon: "CalendarDays" },
    { key: "stories", label: "Истории", icon: "ScrollText" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--warm-cream)" }}>
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b border-[#eee0ce]"
        style={{ backgroundColor: "rgba(250, 246, 240, 0.92)" }}
      >
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-float">🌉</span>
            <span className="font-cormorant text-xl font-semibold text-[#2d2318]">Мост поколений</span>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              <button
                key={n.key}
                onClick={() => setTab(n.key)}
                className={`nav-link font-golos text-sm font-medium pb-0.5 ${
                  tab === n.key ? "active text-[#c8714a]" : "text-[#8a7060]"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Bell />
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex items-center justify-around px-2 pb-2 gap-1">
          {navItems.map((n) => (
            <button
              key={n.key}
              onClick={() => setTab(n.key)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors ${
                tab === n.key ? "bg-[#fde8d0]" : ""
              }`}
            >
              <Icon
                name={n.icon}
                size={18}
                style={{ color: tab === n.key ? "#c8714a" : "#8a7060" }}
              />
              <span
                className={`text-[10px] font-golos font-medium ${
                  tab === n.key ? "text-[#c8714a]" : "text-[#8a7060]"
                }`}
              >
                {n.label}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-4 py-8 pb-16">

        {/* ════════════ HOME ════════════ */}
        {tab === "home" && (
          <div>
            {/* Hero */}
            <section
              ref={heroRef}
              className="relative rounded-3xl overflow-hidden mb-10"
              style={{
                background:
                  "linear-gradient(135deg, #fde8d0 0%, #f0ede8 50%, #d8ead8 100%)",
              }}
            >
              <div className="texture-bg absolute inset-0" />
              <div className="relative grid md:grid-cols-2 gap-0 items-center">
                <div className="p-8 md:p-12">
                  <span className="inline-block bg-white/60 text-[#c8714a] font-golos text-sm font-medium px-3 py-1 rounded-full mb-4 animate-fade-in">
                    💬 Говорим на одном языке
                  </span>
                  <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-[#2d2318] leading-tight mb-4 opacity-0-start animate-fade-in-up delay-100">
                    Когда слова<br />
                    <em>сближают</em>
                  </h1>
                  <p className="font-golos text-[#8a7060] text-base leading-relaxed mb-6 opacity-0-start animate-fade-in-up delay-200">
                    Молодёжь и старшее поколение — разные слова, общее сердце. Здесь мы переводим друг друга и учимся вместе.
                  </p>
                  <div className="flex gap-3 flex-wrap opacity-0-start animate-fade-in-up delay-300">
                    <button
                      onClick={() => setTab("dictionary")}
                      className="font-golos font-semibold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-105 hover:shadow-md"
                      style={{ backgroundColor: "#c8714a" }}
                    >
                      Открыть словарь
                    </button>
                    <button
                      onClick={() => setTab("events")}
                      className="font-golos font-medium px-5 py-2.5 rounded-xl border border-[#d0c0a0] text-[#2d2318] bg-white/60 hover:bg-white transition-all"
                    >
                      Ближайшие события
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img
                    src="https://cdn.poehali.dev/projects/0045c45d-b857-4d28-85c9-c4417bb90732/files/1ab4e009-e621-4f8f-9d35-8e2b4b395862.jpg"
                    alt="Встреча поколений"
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            </section>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { num: "12", label: "слов в словаре", icon: "📚" },
                { num: "3", label: "события в июне", icon: "🗓️" },
                { num: "3", label: "истории", icon: "✨" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="opacity-0-start animate-fade-in-up bg-white rounded-2xl p-4 text-center border border-[#f0e0d0] shadow-sm"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <p className="text-2xl mb-1">{s.icon}</p>
                  <p className="font-cormorant text-3xl font-semibold text-[#c8714a]">{s.num}</p>
                  <p className="font-golos text-xs text-[#8a7060] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Word of day */}
            <section className="bg-white rounded-3xl border border-[#f0e0d0] p-6 mb-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✨</span>
                <h2 className="font-cormorant text-2xl font-semibold text-[#2d2318]">Слово дня</h2>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 bg-[#fdf3e8] rounded-2xl p-5">
                  <span className="tag-youth text-xs px-2 py-0.5 rounded-full font-golos font-medium">молодёжное</span>
                  <p className="font-cormorant text-3xl font-semibold text-[#2d2318] mt-2">Вайб</p>
                  <p className="font-golos text-sm text-[#8a7060] mt-1">«Здесь классный вайб — хочется остаться!»</p>
                </div>
                <div className="hidden md:flex text-3xl text-[#c8714a] font-cormorant px-4">→</div>
                <div className="flex-1 bg-[#f0f5f0] rounded-2xl p-5">
                  <span className="tag-elder text-xs px-2 py-0.5 rounded-full font-golos font-medium">по-взрослому</span>
                  <p className="font-cormorant text-3xl font-semibold text-[#2d2318] mt-2">Атмосфера / Настроение</p>
                  <p className="font-golos text-sm text-[#8a7060] mt-1">Общее чувство и дух места или компании</p>
                </div>
              </div>
            </section>

            {/* Section previews */}
            <div className="grid md:grid-cols-2 gap-5">
              <div
                className="rounded-3xl overflow-hidden cursor-pointer card-hover shadow-sm border border-[#f0e0d0]"
                onClick={() => setTab("tips")}
              >
                <img
                  src="https://cdn.poehali.dev/projects/0045c45d-b857-4d28-85c9-c4417bb90732/files/fda53e7d-67ae-4f07-a17b-2ce487a50484.jpg"
                  alt="Советы"
                  className="w-full h-44 object-cover"
                />
                <div className="bg-white p-5">
                  <h3 className="font-cormorant text-xl font-semibold text-[#2d2318]">💡 Советы и опыт</h3>
                  <p className="font-golos text-sm text-[#8a7060] mt-1">Молодёжь учит технологиям, старшие делятся мудростью</p>
                </div>
              </div>
              <div
                className="rounded-3xl overflow-hidden cursor-pointer card-hover shadow-sm border border-[#f0e0d0]"
                onClick={() => setTab("events")}
              >
                <img
                  src="https://cdn.poehali.dev/projects/0045c45d-b857-4d28-85c9-c4417bb90732/files/ac94e4a1-8da0-4e9a-a924-c4fcd16a8acd.jpg"
                  alt="События"
                  className="w-full h-44 object-cover"
                />
                <div className="bg-white p-5">
                  <h3 className="font-cormorant text-xl font-semibold text-[#2d2318]">📅 События и встречи</h3>
                  <p className="font-golos text-sm text-[#8a7060] mt-1">Офлайн-встречи для живого общения поколений</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════ DICTIONARY ════════════ */}
        {tab === "dictionary" && (
          <div>
            <div className="mb-6 opacity-0-start animate-fade-in-up">
              <h2 className="font-cormorant text-4xl font-semibold text-[#2d2318] mb-2">Словарь поколений</h2>
              <p className="font-golos text-[#8a7060]">Нажми на карточку, чтобы перевернуть и узнать перевод</p>
            </div>

            {/* Dict tabs */}
            <div className="flex gap-2 mb-5 opacity-0-start animate-fade-in-up delay-100">
              <button
                onClick={() => { setDictTab("youth"); setSearch(""); }}
                className={`font-golos font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  dictTab === "youth"
                    ? "text-white shadow-sm"
                    : "bg-white border border-[#e8d8c0] text-[#8a7060] hover:border-[#c8714a]"
                }`}
                style={dictTab === "youth" ? { backgroundColor: "#c8714a" } : {}}
              >
                <span>🤙</span> Словарь молодёжи
              </button>
              <button
                onClick={() => { setDictTab("elder"); setSearch(""); }}
                className={`font-golos font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  dictTab === "elder"
                    ? "text-white shadow-sm"
                    : "bg-white border border-[#e8d8c0] text-[#8a7060] hover:border-[#8aab96]"
                }`}
                style={dictTab === "elder" ? { backgroundColor: "#8aab96" } : {}}
              >
                <span>🌿</span> Словарь старших
              </button>
            </div>

            {/* Description strip */}
            <div
              className="rounded-2xl px-5 py-3 mb-5 opacity-0-start animate-fade-in-up delay-200 flex items-center gap-3"
              style={{ backgroundColor: dictTab === "youth" ? "#fde8d0" : "#d8ead8" }}
            >
              <span className="text-xl">{dictTab === "youth" ? "🤙" : "🌿"}</span>
              <p className="font-golos text-sm" style={{ color: dictTab === "youth" ? "#a04820" : "#2a5c2a" }}>
                {dictTab === "youth"
                  ? "Слова, которые используют молодые люди — с переводом для старшего поколения"
                  : "Старинные и народные слова — с объяснением для молодёжи"}
              </p>
            </div>

            <div className="relative mb-6 opacity-0-start animate-fade-in-up delay-200">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7060]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск слова..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#e8d8c0] bg-white font-golos text-[#2d2318] focus:outline-none focus:border-[#c8714a] transition-colors"
              />
            </div>

            {dictTab === "youth" && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredWords.map((w, i) => (
                    <WordCard key={w.youth} w={w} i={i} />
                  ))}
                </div>
                {filteredWords.length === 0 && (
                  <div className="text-center py-16 text-[#8a7060] font-golos">
                    <p className="text-4xl mb-3">🔍</p>
                    <p>Слово не найдено</p>
                  </div>
                )}
              </>
            )}

            {dictTab === "elder" && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredElderWords.map((w, i) => (
                    <ElderWordCard key={w.elder} w={w} i={i} />
                  ))}
                </div>
                {filteredElderWords.length === 0 && (
                  <div className="text-center py-16 text-[#8a7060] font-golos">
                    <p className="text-4xl mb-3">🔍</p>
                    <p>Слово не найдено</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ════════════ TIPS ════════════ */}
        {tab === "tips" && (
          <div>
            <div className="mb-6 opacity-0-start animate-fade-in-up">
              <h2 className="font-cormorant text-4xl font-semibold text-[#2d2318] mb-2">Советы и опыт</h2>
              <p className="font-golos text-[#8a7060]">Делимся знаниями — каждый ценен по-своему</p>
            </div>
            <div className="flex gap-2 mb-6 opacity-0-start animate-fade-in-up delay-100 flex-wrap">
              {(
                [
                  { key: "all", label: "Все советы" },
                  { key: "youth", label: "💻 От молодёжи" },
                  { key: "elder", label: "🌿 От старших" },
                ] as const
              ).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setTipsFilter(f.key)}
                  className={`font-golos text-sm font-medium px-4 py-2 rounded-xl transition-all ${
                    tipsFilter === f.key
                      ? "text-white shadow-sm"
                      : "bg-white border border-[#e8d8c0] text-[#8a7060] hover:border-[#c8714a]"
                  }`}
                  style={
                    tipsFilter === f.key ? { backgroundColor: "#c8714a" } : {}
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {filteredTips.map((tip, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-[#f0e0d0] p-6 card-hover shadow-sm opacity-0-start animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{tip.avatar}</span>
                    <div>
                      <p className="font-golos font-semibold text-[#2d2318] text-sm">{tip.author}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-golos font-medium ${
                          tip.category === "youth" ? "tag-youth" : "tag-elder"
                        }`}
                      >
                        {tip.category === "youth" ? "молодёжь" : "старшее поколение"}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-[#2d2318] mb-2">{tip.title}</h3>
                  <p className="font-golos text-[#8a7060] text-sm leading-relaxed mb-4">{tip.text}</p>
                  <button
                    onClick={() =>
                      setLikedTips((prev) =>
                        prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
                      )
                    }
                    className="flex items-center gap-1.5 text-sm font-golos font-medium transition-all hover:scale-105"
                    style={{
                      color: likedTips.includes(i) ? "#c8714a" : "#8a7060",
                    }}
                  >
                    <Icon
                      name="Heart"
                      size={16}
                      style={{
                        fill: likedTips.includes(i) ? "#c8714a" : "none",
                        color: likedTips.includes(i) ? "#c8714a" : "#8a7060",
                      }}
                    />
                    {tip.likes + (likedTips.includes(i) ? 1 : 0)} Полезно
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════ EVENTS ════════════ */}
        {tab === "events" && (
          <div>
            <div className="mb-8 opacity-0-start animate-fade-in-up">
              <h2 className="font-cormorant text-4xl font-semibold text-[#2d2318] mb-2">События и встречи</h2>
              <p className="font-golos text-[#8a7060]">Живое общение — лучший способ понять друг друга</p>
            </div>
            <div className="flex flex-col gap-5">
              {EVENTS.map((ev, i) => (
                <div
                  key={i}
                  className="opacity-0-start animate-fade-in-up bg-white rounded-3xl border border-[#f0e0d0] overflow-hidden card-hover shadow-sm"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex">
                    <div
                      className="flex flex-col items-center justify-center px-6 py-5 min-w-[90px]"
                      style={{ backgroundColor: ev.color }}
                    >
                      <span className="text-3xl mb-1">{ev.icon}</span>
                      <p className="font-cormorant text-2xl font-semibold text-[#2d2318] text-center leading-tight">
                        {ev.date.split(" ")[0]}
                      </p>
                      <p className="font-golos text-xs text-[#8a7060] text-center">{ev.date.split(" ")[1]}</p>
                      <p className="font-golos text-xs text-[#8a7060] text-center mt-0.5">{ev.day}</p>
                    </div>
                    <div className="flex-1 p-5">
                      <h3 className="font-cormorant text-xl font-semibold text-[#2d2318] mb-1">{ev.title}</h3>
                      <p className="font-golos text-sm text-[#8a7060] leading-relaxed mb-3">{ev.desc}</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#8a7060] font-golos">
                        <Icon name="MapPin" size={13} />
                        <span>{ev.place}</span>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center pr-5">
                      <button
                        className="font-golos font-semibold text-sm px-4 py-2 rounded-xl text-white transition-all hover:scale-105 hover:shadow-md"
                        style={{ backgroundColor: "#c8714a" }}
                      >
                        Записаться
                      </button>
                    </div>
                  </div>
                  <div className="px-5 pb-4 md:hidden">
                    <button
                      className="w-full font-golos font-semibold text-sm px-4 py-2 rounded-xl text-white"
                      style={{ backgroundColor: "#c8714a" }}
                    >
                      Записаться
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-[#fdf3e8] border border-[#f0ddc8] rounded-3xl p-6 text-center opacity-0-start animate-fade-in-up delay-400">
              <p className="text-3xl mb-2">🙌</p>
              <h3 className="font-cormorant text-2xl font-semibold text-[#2d2318] mb-1">Хочешь организовать встречу?</h3>
              <p className="font-golos text-sm text-[#8a7060] mb-4">Напиши нам — поможем со всем организационным</p>
              <button
                className="font-golos font-semibold text-sm px-6 py-2.5 rounded-xl text-white inline-block transition-all hover:scale-105 hover:shadow-md"
                style={{ backgroundColor: "#c8714a" }}
              >
                Предложить событие
              </button>
            </div>
          </div>
        )}

        {/* ════════════ STORIES ════════════ */}
        {tab === "stories" && (
          <div>
            <div className="mb-8 opacity-0-start animate-fade-in-up">
              <h2 className="font-cormorant text-4xl font-semibold text-[#2d2318] mb-2">Истории и воспоминания</h2>
              <p className="font-golos text-[#8a7060]">Жизнь — лучший учитель, а истории — мосты между людьми</p>
            </div>
            <div className="flex flex-col gap-6">
              {STORIES.map((story, i) => (
                <div
                  key={i}
                  className="opacity-0-start animate-fade-in-up rounded-3xl border border-[#f0e0d0] overflow-hidden shadow-sm card-hover"
                  style={{ backgroundColor: story.color, animationDelay: `${i * 150}ms` }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl bg-white shadow-sm border border-[#f0e0d0]">
                        {story.avatar}
                      </div>
                      <div>
                        <p className="font-cormorant text-xl font-semibold text-[#2d2318]">{story.name}</p>
                        <p className="font-golos text-sm text-[#8a7060]">
                          {story.age} · {story.year}
                        </p>
                      </div>
                    </div>
                    <blockquote className="font-cormorant text-xl italic text-[#2d2318] leading-relaxed border-l-4 border-[#c8714a] pl-5">
                      {story.text}
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white border border-[#f0e0d0] rounded-3xl p-6 text-center shadow-sm opacity-0-start animate-fade-in-up delay-500">
              <p className="text-3xl mb-2">📝</p>
              <h3 className="font-cormorant text-2xl font-semibold text-[#2d2318] mb-1">Есть своя история?</h3>
              <p className="font-golos text-sm text-[#8a7060] mb-4">Поделись — она может стать чьим-то мостиком к пониманию</p>
              <button
                className="font-golos font-semibold text-sm px-6 py-2.5 rounded-xl text-white inline-block transition-all hover:scale-105 hover:shadow-md"
                style={{ backgroundColor: "#c8714a" }}
              >
                Рассказать историю
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e8d8c0] py-6" style={{ backgroundColor: "var(--warm-sand)" }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-cormorant text-2xl text-[#2d2318] mb-1">🌉 Мост поколений</p>
          <p className="font-golos text-xs text-[#8a7060]">Сближаем людей через слова, истории и живое общение</p>
        </div>
      </footer>
    </div>
  );
}