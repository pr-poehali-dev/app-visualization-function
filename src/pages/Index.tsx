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
  { id: 1, emoji: "💼", title: "Незаконное увольнение", tag: "Трудовое право", color: "from-violet-500 to-purple-700", content: "Уволить вас могут только по основаниям из ТК РФ. Если нарушен порядок — увольнение незаконно. Вы вправе обратиться в суд в течение 1 месяца и потребовать восстановления на работе и компенсации." },
  { id: 2, emoji: "💰", title: "Задержка зарплаты", tag: "Трудовое право", color: "from-purple-500 to-indigo-700", content: "Работодатель обязан платить зарплату дважды в месяц. При задержке свыше 15 дней вы вправе приостановить работу, письменно уведомив работодателя. За каждый день просрочки начисляется компенсация 1/150 ключевой ставки ЦБ." },
  { id: 3, emoji: "🛒", title: "Возврат товара", tag: "Права потребителя", color: "from-orange-400 to-rose-600", content: "Качественный товар можно вернуть в течение 14 дней, если сохранён товарный вид. Некачественный — в течение гарантийного срока. Продавец обязан вернуть деньги или заменить товар в течение 10 дней." },
  { id: 4, emoji: "🔧", title: "Гарантийный ремонт", tag: "Права потребителя", color: "from-rose-500 to-pink-700", content: "В период гарантии ремонт — за счёт продавца или производителя. Если ремонт затянулся дольше 45 дней — вы вправе требовать замены товара. Время ремонта продлевает гарантийный срок." },
  { id: 5, emoji: "🚗", title: "Права при остановке ГИБДД", tag: "ПДД и водители", color: "from-sky-500 to-blue-700", content: "Инспектор обязан представиться и назвать причину остановки. Вы вправе снимать разговор на видео. Выходить из машины нужно только по законному требованию. Ключи и телефон отдавать не обязаны." },
  { id: 6, emoji: "📸", title: "Штраф с камеры", tag: "ПДД и водители", color: "from-blue-500 to-cyan-700", content: "Штраф с камеры приходит собственнику авто. Если за рулём был другой — можно обжаловать, указав реального водителя. На обжалование — 10 дней с момента получения постановления. При оплате в 20 дней — скидка 50%." },
  { id: 7, emoji: "👨‍👩‍👧", title: "Алименты", tag: "Семейное право", color: "from-pink-500 to-fuchsia-700", content: "На одного ребёнка — 25% дохода, на двух — 33%, на троих и более — 50%. Можно договориться письменно у нотариуса или взыскать через суд. При уклонении — уголовная ответственность по ст. 157 УК РФ." },
  { id: 8, emoji: "🏠", title: "Выселение арендатора", tag: "Жильё и ЖКХ", color: "from-amber-500 to-orange-700", content: "Хозяин не вправе выселить вас без суда, если есть договор аренды. Он обязан предупредить за 3 месяца при расторжении договора. Самовольное выселение и смена замков — незаконны, можно вызвать полицию." },
  { id: 9, emoji: "💡", title: "Долг за ЖКХ", tag: "Жильё и ЖКХ", color: "from-yellow-500 to-amber-700", content: "При долге более 2 месяцев могут отключить свет или воду (кроме отопления зимой). Выселить из муниципальной квартиры — только через суд при долге свыше 6 месяцев. Из собственной квартиры за долги ЖКХ не выселят." },
  { id: 10, emoji: "🔒", title: "Персональные данные", tag: "Цифровые права", color: "from-teal-500 to-cyan-700", content: "Вы вправе потребовать удалить свои данные из любой базы. Компании обязаны получить ваше согласие на обработку данных. За утечку персональных данных — штраф до 500 млн рублей для компании." },
  { id: 11, emoji: "🤝", title: "Расписка и долг", tag: "Гражданское право", color: "from-green-500 to-emerald-700", content: "Расписка — доказательство долга в суде. Должна содержать: ФИО, сумму, дату возврата, подпись. Срок исковой давности по долгу — 3 года. При отказе платить — обращайтесь в суд за судебным приказом." },
  { id: 12, emoji: "👮", title: "Задержание полицией", tag: "Административное право", color: "from-slate-600 to-gray-800", content: "При задержании вы вправе: хранить молчание, потребовать адвоката, уведомить родственников. Максимальный срок без суда — 48 часов. Статья 51 Конституции: вы не обязаны свидетельствовать против себя." },
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
        <span className="font-oswald tracking-wide text-sm">ЯЗЫКИ ПРАВА</span>
        <div className="flex gap-1 items-center">
          <Icon name="Signal" size={12} />
          <Icon name="Wifi" size={12} />
          <Icon name="Battery" size={12} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {tab === "home" && <CoursesScreen modules={MODULES} />}
        {tab === "courses" && <CoursesPageScreen />}
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
            { id: "courses", icon: "BookOpen", label: "Курсы" },
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

const COURSES_DATA = [
  {
    id: 1,
    emoji: "📜",
    title: "Теория государства и права",
    desc: "База юридических наук",
    color: "from-green-700 to-emerald-900",
    lessons: [
      "Что такое государство и его признаки",
      "Понятие права: нормы, отрасли, источники",
      "Правовые системы мира",
      "Конституция РФ: структура и принципы",
      "Правоотношение: субъекты, объекты, содержание",
      "Правонарушение и юридическая ответственность",
      "Правовое государство и гражданское общество",
    ],
  },
  {
    id: 2,
    emoji: "🤝",
    title: "Гражданское право РФ",
    desc: "Сделки, собственность, договоры",
    color: "from-pink-500 to-rose-700",
    lessons: [
      "Субъекты гражданского права: физлица и юрлица",
      "Право собственности и его виды",
      "Сделки: понятие, формы, недействительность",
      "Договор: заключение, изменение, расторжение",
      "Обязательства и ответственность за их нарушение",
      "Наследование по закону и по завещанию",
      "Защита прав потребителей в ГК РФ",
    ],
  },
  {
    id: 3,
    emoji: "⚖️",
    title: "Уголовное право РФ",
    desc: "Преступления, наказания, защита",
    color: "from-teal-700 to-green-900",
    lessons: [
      "Понятие преступления и его признаки",
      "Состав преступления: элементы и значение",
      "Виды наказаний по УК РФ",
      "Обстоятельства, исключающие преступность",
      "Самооборона: когда она законна",
      "Уголовная ответственность несовершеннолетних",
      "Права подозреваемого и обвиняемого",
    ],
  },
  {
    id: 4,
    emoji: "🏛️",
    title: "Административное право РФ",
    desc: "Власть, штрафы, госорганы",
    color: "from-lime-700 to-green-800",
    lessons: [
      "Административное право: предмет и система",
      "Органы исполнительной власти в РФ",
      "Административное правонарушение и КоАП РФ",
      "Виды административных наказаний",
      "Производство по делам об АП: стадии",
      "Обжалование штрафов и постановлений",
      "Права гражданина при проверках госорганов",
    ],
  },
];

function CoursesPageScreen() {
  const [openCourse, setOpenCourse] = useState<number | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());

  const course = COURSES_DATA.find((c) => c.id === openCourse);

  const markLesson = (key: string) => setDone((prev) => new Set([...prev, key]));

  if (course) {
    const courseDone = course.lessons.filter((_, i) => done.has(`${course.id}-${i}`)).length;
    const pct = Math.round((courseDone / course.lessons.length) * 100);

    // Цепочка Duolingo для курсов 1 и 2
    const isDuolingo = course.id === 1 || course.id === 2;

    // Змейка: чётные узлы — левее центра, нечётные — правее
    const nodePositions = ["center", "right", "center", "left", "center", "right", "center"];

    const posClass: Record<string, string> = {
      left: "self-start ml-6",
      center: "self-center",
      right: "self-end mr-6",
    };

    return (
      <div className="h-full flex flex-col overflow-hidden">
        {/* Шапка курса */}
        <div className={`bg-gradient-to-br ${course.color} px-4 pt-5 pb-5 text-white flex-none`}>
          <button onClick={() => setOpenCourse(null)} className="flex items-center gap-1 text-white/80 text-sm mb-3">
            <Icon name="ChevronLeft" size={18} /> Все курсы
          </button>
          <div className="text-4xl mb-1">{course.emoji}</div>
          <div className="font-oswald text-2xl tracking-wide">{course.title}</div>
          <div className="text-white/70 text-sm mt-0.5 mb-3">{course.desc}</div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-sm font-bold">{pct}%</span>
          </div>
        </div>

        {isDuolingo ? (
          <div className="flex-1 overflow-y-auto py-6 px-4 bg-secondary/30">
            {/* Тема цепочки по курсу */}
            {(() => {
              const theme = course.id === 2
                ? { active: "bg-pink-500 border-pink-700", done: "bg-rose-400 border-rose-600", connector: "bg-rose-400", badge: "bg-pink-400", text: "text-rose-700" }
                : { active: "bg-[hsl(var(--primary))] border-green-800", done: "bg-emerald-500 border-emerald-700", connector: "bg-emerald-400", badge: "bg-[hsl(var(--accent))]", text: "text-emerald-700" };

              return (
            <div className="flex flex-col gap-0">
              {course.lessons.map((lesson, i) => {
                const key = `${course.id}-${i}`;
                const isDone = done.has(key);
                const isNext = courseDone === i;
                const isLocked = i > courseDone;
                const pos = nodePositions[i] ?? "center";

                return (
                  <div key={i} className={`flex flex-col ${posClass[pos]}`}>
                    {i > 0 && (
                      <div className={`w-1 h-6 rounded-full mx-auto mb-1 ${isDone ? theme.connector : "bg-border"}`} />
                    )}

                    <div className="relative flex flex-col items-center">
                      <button
                        onClick={() => isNext && markLesson(key)}
                        disabled={isLocked}
                        className={`w-20 h-20 rounded-[28px] flex flex-col items-center justify-center shadow-lg transition-all active:scale-95 border-b-4 relative
                          ${isDone ? theme.done : isNext ? `${theme.active} animate-pulse` : "bg-muted border-border opacity-60"}
                        `}
                      >
                        {isDone ? (
                          <><span className="text-2xl">⭐</span><span className="text-white text-[10px] font-bold mt-0.5">Готово</span></>
                        ) : isNext ? (
                          <><span className="text-2xl">📖</span><span className="text-white text-[10px] font-bold mt-0.5">Старт</span></>
                        ) : (
                          <><span className="text-2xl">🔒</span><span className="text-muted-foreground text-[10px] font-bold mt-0.5">Закрыт</span></>
                        )}
                        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white
                          ${isDone ? theme.badge : isNext ? theme.badge : "bg-muted-foreground/30 text-muted-foreground"} text-white`}>
                          {i + 1}
                        </div>
                      </button>

                      <div className={`mt-2 text-center max-w-[120px] text-xs font-medium leading-tight
                        ${isDone ? theme.text : isNext ? "text-foreground" : "text-muted-foreground"}`}>
                        {lesson}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Финал */}
              <div className="flex flex-col self-center items-center mt-2">
                <div className={`w-1 h-6 rounded-full ${courseDone === course.lessons.length ? theme.connector : "bg-border"}`} />
                <div className={`w-20 h-20 rounded-[28px] flex flex-col items-center justify-center border-b-4 shadow-lg
                  ${courseDone === course.lessons.length ? "bg-amber-400 border-amber-600" : "bg-muted border-border opacity-50"}`}>
                  <span className="text-3xl">🏆</span>
                  <span className={`text-[10px] font-bold mt-0.5 ${courseDone === course.lessons.length ? "text-white" : "text-muted-foreground"}`}>Финал</span>
                </div>
              </div>
            </div>
              );
            })()}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5">
            {course.lessons.map((lesson, i) => {
              const key = `${course.id}-${i}`;
              const isDone = done.has(key);
              return (
                <div key={i} className={`bg-white rounded-2xl border-2 px-4 py-3.5 flex items-center gap-3 transition-all ${isDone ? "border-emerald-300" : "border-border"}`}>
                  <button
                    onClick={() => markLesson(key)}
                    className={`w-7 h-7 rounded-full border-2 flex-none flex items-center justify-center transition-all ${isDone ? "bg-emerald-500 border-emerald-500" : "border-muted-foreground/30"}`}
                  >
                    {isDone && <Icon name="Check" size={13} className="text-white" />}
                  </button>
                  <div className="flex-1">
                    <div className={`text-sm font-medium leading-tight ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}>{lesson}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">Урок {i + 1}</div>
                  </div>
                  {!isDone && <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-none" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="bg-[hsl(var(--primary))] px-4 pt-5 pb-5 text-white flex-none">
        <div className="font-oswald text-2xl tracking-wide">КУРСЫ</div>
        <div className="text-green-200 text-sm mt-0.5">Углублённое изучение правовых тем</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {COURSES_DATA.map((c) => {
          const total = c.lessons.length;
          const completed = c.lessons.filter((_, i) => done.has(`${c.id}-${i}`)).length;
          const pct = Math.round((completed / total) * 100);
          return (
            <button
              key={c.id}
              onClick={() => setOpenCourse(c.id)}
              className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm text-left active:scale-[0.98] transition-all"
            >
              <div className={`bg-gradient-to-r ${c.color} p-4 flex items-center gap-3`}>
                <span className="text-4xl">{c.emoji}</span>
                <div className="flex-1">
                  <div className="text-white font-semibold text-base">{c.title}</div>
                  <div className="text-white/70 text-xs mt-0.5">{c.desc}</div>
                </div>
                <Icon name="ChevronRight" size={18} className="text-white/70 flex-none" />
              </div>
              <div className="px-4 py-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{completed} из {total} уроков</span>
                  <span className="font-semibold text-foreground">{pct}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${c.color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </button>
          );
        })}
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