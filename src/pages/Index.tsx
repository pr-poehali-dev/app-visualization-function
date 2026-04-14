import { useState } from "react";
import Icon from "@/components/ui/icon";

const EXPERT_IMG = "https://cdn.poehali.dev/projects/a0240a83-f56c-4d98-8cd9-7794f9252c9a/files/95f876b8-b139-4cba-9428-814543e7a2cf.jpg";

type Tab = "home" | "courses" | "profile" | "settings";

interface Message {
  id: number;
  from: "police" | "user";
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  { emoji: "🏠", text: "Что такое ипотека простыми словами?" },
  { emoji: "💰", text: "Какой нужен первоначальный взнос?" },
  { emoji: "📊", text: "Как рассчитать ежемесячный платёж?" },
  { emoji: "🏦", text: "Как выбрать банк для ипотеки?" },
  { emoji: "📋", text: "Какие документы нужны для заявки?" },
  { emoji: "✅", text: "Как одобряют ипотеку?" },
  { emoji: "📉", text: "Что такое фиксированная и плавающая ставка?" },
  { emoji: "🔑", text: "Что такое рефинансирование?" },
  { emoji: "🛡️", text: "Что будет если не платить ипотеку?" },
  { emoji: "💸", text: "Как досрочно погасить ипотеку?" },
];

const MODULES = [
  { id: 1, emoji: "🏠", title: "Что такое ипотека", tag: "Основы", color: "from-green-500 to-emerald-700", content: "Ипотека — это долгосрочный кредит под залог недвижимости. Банк даёт деньги на покупку жилья, а квартира остаётся в залоге до полного погашения. Срок — от 5 до 30 лет." },
  { id: 2, emoji: "💰", title: "Первоначальный взнос", tag: "Основы", color: "from-emerald-500 to-teal-700", content: "Взнос — от 10 до 30% стоимости жилья. Чем он больше — тем ниже ставка. Можно использовать маткапитал или накопления. Минимальный взнос по льготной ипотеке — 20%." },
  { id: 3, emoji: "📊", title: "Как считается платёж", tag: "Расчёты", color: "from-teal-500 to-green-700", content: "Платёж зависит от суммы, ставки и срока. 5 млн на 20 лет под 8% = ~41 800₽/мес. Аннуитетный платёж — одинаковый каждый месяц. Дифференцированный — уменьшается со временем." },
  { id: 4, emoji: "🏦", title: "Как выбрать банк", tag: "Выбор", color: "from-green-600 to-lime-700", content: "Сравнивайте ставку, срок одобрения и условия досрочного погашения. Подайте заявки в 2–3 банка одновременно. Лучшие предложения: Сбер, ВТБ, Альфа, Дом.РФ." },
  { id: 5, emoji: "📋", title: "Документы для банка", tag: "Документы", color: "from-lime-600 to-green-700", content: "Паспорт, СНИЛС, справка 2-НДФЛ, трудовая книжка. Самозанятым — выписка из налоговой. На квартиру: договор купли-продажи, выписка из ЕГРН, техпаспорт." },
  { id: 6, emoji: "✅", title: "Одобрение ипотеки", tag: "Процесс", color: "from-emerald-600 to-green-800", content: "Банк проверяет: кредитную историю, доход, занятость и долговую нагрузку. Норма: платёж не более 40% от зарплаты. Решение — за 1–5 рабочих дней." },
  { id: 7, emoji: "📉", title: "Фиксированная vs плавающая ставка", tag: "Ставки", color: "from-green-500 to-teal-700", content: "Фиксированная — не меняется весь срок, вы знаете свой платёж. Плавающая — привязана к ключевой ставке ЦБ, может вырасти. Для большинства безопаснее фиксированная." },
  { id: 8, emoji: "🔑", title: "Рефинансирование", tag: "Льготы", color: "from-teal-600 to-emerald-800", content: "Перевод ипотеки в другой банк под более низкую ставку. Выгодно при разнице от 1,5%. Например: было 12% → стало 8% — экономия сотни тысяч рублей за весь срок." },
  { id: 9, emoji: "🛡️", title: "Просрочка и риски", tag: "Важно", color: "from-green-700 to-teal-900", content: "После первой просрочки — пени. При долге 3+ месяца — суд и продажа квартиры. Если трудности — сразу идите в банк за реструктуризацией или ипотечными каникулами." },
  { id: 10, emoji: "💸", title: "Досрочное погашение", tag: "Советы", color: "from-lime-500 to-green-700", content: "Вносите допсуммы и выбирайте сокращение срока — это выгоднее. Даже 5 000₽ сверх платежа в месяц сократит срок на несколько лет и сэкономит сотни тысяч на процентах." },
  { id: 11, emoji: "👨‍👩‍👧", title: "Семейная ипотека", tag: "Льготы", color: "from-emerald-500 to-lime-700", content: "Ставка от 6% для семей с детьми, рождёнными после 2018 года. Максимум: 12 млн для Москвы и СПб, 6 млн для регионов. Первый взнос — от 20%. Действует до 2030 года." },
  { id: 12, emoji: "🏗️", title: "Ипотека на новостройку", tag: "Виды", color: "from-green-600 to-emerald-800", content: "Банк перечисляет деньги на эскроу-счёт — застройщик получит их только после сдачи дома. Это защищает покупателя. Ставки по льготным программам — от 6–8%." },
];

function getTime() {
  return new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" });
}

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "police",
      text: "Привет! Я Марина Домова — ваш ипотечный консультант. Помогу разобраться в мире ипотеки. Выберите вопрос!",
      time: "09:00",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [notifs, setNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const sendMessage = (text?: string) => {
    const msgText = text?.trim();
    if (!msgText) return;

    const userMsg: Message = { id: Date.now(), from: "user", text: msgText, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responses: Record<string, string> = {
        "Что такое ипотека простыми словами?": "Ипотека — это кредит на покупку недвижимости, где сама квартира служит залогом. Банк даёт деньги сейчас, вы живёте в квартире и возвращаете долг частями каждый месяц — обычно от 10 до 30 лет.",
        "Какой нужен первоначальный взнос?": "Как правило, от 10 до 30% от стоимости жилья. Чем больше взнос — тем ниже ставка и меньше переплата. Минимальный взнос по льготным программам (семейная ипотека) — от 20%.",
        "Как рассчитать ежемесячный платёж?": "Платёж зависит от суммы кредита, ставки и срока. Например: 5 млн руб. на 20 лет под 8% — около 41 800₽/мес. Используйте ипотечный калькулятор на сайте любого банка для точного расчёта.",
        "Как выбрать банк для ипотеки?": "Сравнивайте: процентную ставку, срок рассмотрения заявки, наличие льготных программ и удобство мобильного приложения. Топ банков: Сбер, ВТБ, Альфа, Дом.РФ. Можно подать заявку сразу в несколько.",
        "Какие документы нужны для заявки?": "Стандартный набор: паспорт, СНИЛС, справка о доходах (2-НДФЛ или по форме банка), трудовая книжка или договор. Самозанятым — выписка из налоговой. Документы на квартиру банк запросит позже.",
        "Как одобряют ипотеку?": "Банк проверяет: кредитную историю, уровень дохода, занятость и долговую нагрузку. Идеально: официальный доход, отсутствие просрочек и платёж не более 40% от зарплаты. Решение — обычно за 1–3 дня.",
        "Что такое фиксированная и плавающая ставка?": "Фиксированная ставка не меняется весь срок — вы всегда знаете свой платёж. Плавающая привязана к ключевой ставке ЦБ: может снизиться или вырасти. Для большинства заёмщиков безопаснее выбрать фиксированную.",
        "Что такое рефинансирование?": "Рефинансирование — это перевод ипотеки в другой банк под более низкую ставку. Если ваша ставка 12%, а рынок предлагает 8% — переплата снизится на сотни тысяч рублей. Выгодно при разнице от 1,5%.",
        "Что будет если не платить ипотеку?": "После первой просрочки банк начислит пени. При длительных неплатежах (3+ месяца) — суд и выселение с продажей квартиры. Если возникли трудности — немедленно обратитесь в банк за реструктуризацией или ипотечными каникулами.",
        "Как досрочно погасить ипотеку?": "Вносите дополнительные суммы и выбирайте сокращение срока (выгоднее) или уменьшение платежа. Даже 5 000₽ в месяц сверх платежа сократит срок на несколько лет и сэкономит сотни тысяч на процентах.",
      };
      const reply = responses[msgText] || "Хороший вопрос по ипотеке! Уточните детали, и я постараюсь дать точный ответ.";
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "police", text: reply, time: getTime() }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen max-w-sm mx-auto bg-background overflow-hidden">
      {/* Status bar */}
      <div className="bg-[hsl(var(--primary))] text-white flex justify-between items-center px-5 pt-3 pb-1 text-xs font-medium">
        <span>9:41</span>
        <span className="font-oswald tracking-wide text-sm">ЧТО ТАКОЕ ИПОТЕКА</span>
        <div className="flex gap-1 items-center">
          <Icon name="Signal" size={12} />
          <Icon name="Wifi" size={12} />
          <Icon name="Battery" size={12} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {tab === "home" && <CoursesScreen modules={MODULES} />}
        {tab === "courses" && (
          <HomeScreen
            messages={messages}
            isTyping={isTyping}
            input=""
            setInput={() => {}}
            sendMessage={sendMessage}
            quickQuestions={QUICK_QUESTIONS}
          />
        )}
        {tab === "profile" && <ProfileScreen />}
        {tab === "settings" && (
          <SettingsScreen
            notifs={notifs}
            setNotifs={setNotifs}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}
      </div>

      {/* Bottom Nav */}
      <div className="glass-card border-t border-border flex items-center justify-around px-2 py-2 mobile-safe">
        {(
          [
            { id: "home", icon: "LayoutGrid", label: "Модули" },
            { id: "courses", icon: "MessageCircle", label: "Диалог" },
            { id: "profile", icon: "User", label: "Профиль" },
            { id: "settings", icon: "Settings", label: "Настройки" },
          ] as { id: Tab; icon: string; label: string }[]
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              tab === item.id ? "text-[hsl(var(--primary))]" : "text-muted-foreground"
            }`}
          >
            <Icon
              name={item.icon}
              size={22}
              className={tab === item.id ? "stroke-[2.5]" : "stroke-[1.5]"}
            />
            <span className={`text-[10px] font-medium ${tab === item.id ? "font-semibold" : ""}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeScreen({
  messages,
  isTyping,
  sendMessage,
  quickQuestions,
}: {
  messages: Message[];
  isTyping: boolean;
  input: string;
  setInput: (v: string) => void;
  sendMessage: (text?: string) => void;
  quickQuestions: { emoji: string; text: string }[];
}) {
  const hasDialog = messages.length > 1 || isTyping;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-[hsl(var(--primary))] text-white px-4 pb-4 pt-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={EXPERT_IMG}
              alt="Консультант"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[hsl(var(--primary))]" />
          </div>
          <div>
            <div className="font-semibold text-base">Марина Домова</div>
            <div className="text-green-200 text-xs">Ипотечный консультант</div>
            <div className="flex items-center gap-1 text-emerald-300 text-xs mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Онлайн
            </div>
          </div>
          <div className="ml-auto">
            <div className="bg-white/10 rounded-xl px-3 py-1.5 text-xs text-center">
              <div className="font-bold text-[hsl(var(--accent))] text-lg leading-none">24/7</div>
              <div className="text-blue-200">помощь</div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex gap-2 animate-fade-in ${msg.from === "user" ? "flex-row-reverse" : ""}`}
            style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
          >
            {msg.from === "police" && (
              <img
                src={EXPERT_IMG}
                alt="consultant"
                className="w-8 h-8 rounded-xl object-cover self-end flex-none"
              />
            )}
            <div
              className={`max-w-[78%] ${
                msg.from === "police" ? "chat-bubble-police" : "chat-bubble-user"
              } px-4 py-2.5 text-sm leading-relaxed`}
            >
              {msg.text}
              <div
                className={`text-[10px] mt-1 ${
                  msg.from === "police" ? "text-blue-200" : "text-amber-100"
                } text-right`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 items-end animate-fade-in">
            <img
              src={EXPERT_IMG}
              alt="consultant"
              className="w-8 h-8 rounded-xl object-cover flex-none"
            />
            <div className="chat-bubble-police px-4 py-3 flex gap-1.5 items-center">
              <span className="typing-dot w-2 h-2 bg-blue-200 rounded-full inline-block" />
              <span className="typing-dot w-2 h-2 bg-blue-200 rounded-full inline-block" />
              <span className="typing-dot w-2 h-2 bg-blue-200 rounded-full inline-block" />
            </div>
          </div>
        )}
      </div>

      {/* Question selector */}
      <div className="border-t border-border bg-white px-4 pt-3 pb-3">
        {!hasDialog && (
          <div className="text-xs text-muted-foreground font-medium mb-2 px-1">Выберите вопрос:</div>
        )}
        {hasDialog && (
          <div className="text-xs text-muted-foreground font-medium mb-2 px-1">Задать другой вопрос:</div>
        )}
        <div className="grid grid-cols-2 gap-2">
          {quickQuestions.map((q) => (
            <button
              key={q.text}
              onClick={() => sendMessage(q.text)}
              className="flex items-center gap-2 bg-secondary hover:bg-[hsl(var(--primary))] hover:text-white text-foreground text-xs px-3 py-2.5 rounded-xl border border-border text-left transition-all active:scale-95 group"
            >
              <span className="text-base flex-none">{q.emoji}</span>
              <span className="leading-tight">{q.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesScreen({ modules }: { modules: typeof MODULES }) {
  const [read, setRead] = useState<Set<number>>(new Set());
  const [openId, setOpenId] = useState<number | null>(null);

  const openModule = modules.find((m) => m.id === openId);
  const percent = Math.round((read.size / modules.length) * 100);

  const handleRead = (id: number) => {
    setRead((prev) => new Set([...prev, id]));
    setOpenId(null);
  };

  if (openModule) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Шапка модуля */}
        <div className={`bg-gradient-to-br ${openModule.color} px-4 pt-5 pb-6 text-white flex-none`}>
          <button
            onClick={() => setOpenId(null)}
            className="flex items-center gap-1.5 text-white/80 text-sm mb-4"
          >
            <Icon name="ChevronLeft" size={18} />
            Назад к модулям
          </button>
          <div className="text-4xl mb-2">{openModule.emoji}</div>
          <div className="font-oswald text-2xl tracking-wide leading-tight">{openModule.title}</div>
          <span className="inline-block mt-2 bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full">{openModule.tag}</span>
        </div>

        {/* Контент модуля */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-[hsl(var(--primary))] rounded-full" />
              <span className="text-sm font-semibold text-foreground">Краткое объяснение</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{openModule.content}</p>
          </div>

          {read.has(openModule.id) ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-sm font-semibold text-emerald-700">Модуль изучен!</div>
              <div className="text-xs text-emerald-600 mt-0.5">Отличная работа</div>
            </div>
          ) : (
            <button
              onClick={() => handleRead(openModule.id)}
              className="w-full bg-[hsl(var(--primary))] text-white rounded-2xl py-3.5 text-sm font-bold shadow-sm active:scale-95 transition-all"
            >
              ✓ Изучено — идём дальше
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Шапка с прогрессом */}
      <div className="bg-[hsl(var(--primary))] px-4 pt-5 pb-5 text-white flex-none">
        <div className="font-oswald text-2xl tracking-wide">МОДУЛИ</div>
        <div className="text-green-200 text-sm mt-0.5 mb-4">Выбери тему для изучения</div>

        <div className="bg-white/10 rounded-2xl p-3 flex items-center gap-4">
          {/* Круговой прогресс */}
          <div className="relative w-14 h-14 flex-none">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5" />
              <circle
                cx="28" cy="28" r="22" fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="5"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - percent / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white">{percent}%</span>
            </div>
          </div>
          <div>
            <div className="text-white font-semibold text-base">{read.size} из {modules.length}</div>
            <div className="text-green-200 text-xs">модулей пройдено</div>
            {read.size === modules.length && (
              <div className="text-[hsl(var(--accent))] text-xs font-semibold mt-0.5">🏆 Все изучены!</div>
            )}
          </div>
        </div>
      </div>

      {/* Сетка модулей */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {modules.map((m) => {
            const isRead = read.has(m.id);
            return (
              <button
                key={m.id}
                onClick={() => setOpenId(m.id)}
                className={`text-left rounded-2xl overflow-hidden border-2 transition-all active:scale-95 shadow-sm ${
                  isRead ? "border-emerald-300" : "border-border"
                }`}
              >
                <div className={`bg-gradient-to-br ${m.color} px-3 pt-4 pb-3 flex flex-col items-start`}>
                  <span className="text-3xl mb-2">{m.emoji}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${isRead ? "bg-white/30 text-white" : "bg-white/20 text-white/80"}`}>
                    {isRead ? "✓ Изучено" : m.tag}
                  </span>
                </div>
                <div className="bg-white px-3 py-2.5">
                  <div className="text-xs font-semibold text-foreground leading-tight">{m.title}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-[hsl(var(--primary))] px-4 pt-5 pb-10 text-white text-center">
        <div className="w-20 h-20 bg-white/20 rounded-3xl mx-auto mb-3 flex items-center justify-center text-4xl">
          👤
        </div>
        <div className="font-semibold text-lg">Иван Иванов</div>
        <div className="text-blue-200 text-sm">ivan@example.com</div>
      </div>

      <div className="px-4 -mt-6 flex flex-col gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border flex justify-around text-center">
          {[
            ["2", "Курса"],
            ["8", "Уроков"],
            ["45%", "Среднее"],
          ].map(([val, label]) => (
            <div key={label}>
              <div className="font-oswald text-2xl text-[hsl(var(--primary))]">{val}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {[
          { icon: "Award", label: "Мои достижения", sub: "3 значка получено" },
          { icon: "BookMarked", label: "Сохранённые материалы", sub: "5 статей" },
          { icon: "History", label: "История диалогов", sub: "12 вопросов" },
          { icon: "CreditCard", label: "Подписка", sub: "Бесплатный план" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm border border-border"
          >
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
              <Icon name={item.icon} size={20} className="text-[hsl(var(--primary))]" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.sub}</div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        ))}
      </div>
      <div className="h-6" />
    </div>
  );
}

function SettingsScreen({
  notifs,
  setNotifs,
  darkMode,
  setDarkMode,
}: {
  notifs: boolean;
  setNotifs: (v: boolean) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-[hsl(var(--primary))] px-4 py-5 text-white">
        <div className="font-oswald text-2xl tracking-wide">НАСТРОЙКИ</div>
        <div className="text-green-200 text-sm mt-0.5">Управление приложением</div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Уведомления
            </span>
          </div>
          {[
            { label: "Push-уведомления", val: notifs, set: setNotifs },
            { label: "Тёмная тема", val: darkMode, set: setDarkMode },
          ].map((item) => (
            <div key={item.label} className="px-4 py-3.5 flex items-center justify-between border-b border-border last:border-0">
              <span className="text-sm font-medium">{item.label}</span>
              <button
                onClick={() => item.set(!item.val)}
                className={`w-12 h-6 rounded-full transition-all relative ${
                  item.val ? "bg-[hsl(var(--primary))]" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    item.val ? "left-6" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Общие
            </span>
          </div>
          {[
            { icon: "Globe", label: "Язык", val: "Русский" },
            { icon: "Shield", label: "Конфиденциальность", val: "" },
            { icon: "HelpCircle", label: "Помощь и поддержка", val: "" },
          ].map((item) => (
            <div
              key={item.label}
              className="px-4 py-3.5 flex items-center gap-3 border-b border-border last:border-0"
            >
              <Icon name={item.icon} size={18} className="text-[hsl(var(--primary))]" />
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              {item.val && <span className="text-xs text-muted-foreground">{item.val}</span>}
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              О приложении
            </span>
          </div>
          <div className="px-4 py-5 text-center">
            <div className="text-4xl mb-2">🏠</div>
            <div className="font-oswald text-xl text-[hsl(var(--primary))] tracking-wide">
              ЧТО ТАКОЕ ИПОТЕКА
            </div>
            <div className="text-xs text-muted-foreground mt-1">Версия 1.0.0</div>
            <div className="text-xs text-muted-foreground mt-3">Разработано для будущих владельцев жилья</div>
            <div className="text-xs text-muted-foreground">© 2026 ИпотекаПро</div>
          </div>
        </div>

        <button className="w-full py-3.5 rounded-2xl border-2 border-destructive/30 text-destructive font-medium text-sm">
          Выйти из аккаунта
        </button>
      </div>
      <div className="h-4" />
    </div>
  );
}