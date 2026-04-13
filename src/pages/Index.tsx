import { useState } from "react";
import Icon from "@/components/ui/icon";

const POLICE_IMG = "https://cdn.poehali.dev/projects/a0240a83-f56c-4d98-8cd9-7794f9252c9a/files/82aed888-575b-4258-a7df-9892593297d7.jpg";

type Tab = "home" | "courses" | "profile" | "settings";

interface Message {
  id: number;
  from: "police" | "user";
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  { emoji: "🚔", text: "Могут ли остановить без причины?" },
  { emoji: "📋", text: "Как проходит проверка документов?" },
  { emoji: "🔍", text: "Права при обыске или досмотре" },
  { emoji: "📞", text: "Когда полиция обязана приехать?" },
  { emoji: "🙅", text: "Можно ли отказаться от дачи показаний?" },
  { emoji: "⏱️", text: "Сколько можно держать в отделе?" },
  { emoji: "📝", text: "Как подать жалобу на сотрудника?" },
  { emoji: "🛡️", text: "Что делать при незаконном задержании?" },
  { emoji: "🚗", text: "Права при остановке на дороге" },
  { emoji: "💬", text: "Обязан ли я называть свои данные?" },
];

const COURSES = [
  {
    id: 1,
    icon: "⚖️",
    title: "Основы права",
    desc: "Базовые понятия и принципы",
    lessons: 12,
    progress: 60,
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    icon: "🚗",
    title: "ПДД и права водителя",
    desc: "Всё о правах автомобилистов",
    lessons: 8,
    progress: 30,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 3,
    icon: "🏠",
    title: "Жилищное право",
    desc: "Аренда, ипотека, споры",
    lessons: 10,
    progress: 0,
    color: "from-emerald-500 to-teal-700",
  },
  {
    id: 4,
    icon: "👔",
    title: "Трудовое право",
    desc: "Права работника и работодателя",
    lessons: 9,
    progress: 0,
    color: "from-violet-500 to-purple-700",
  },
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
      text: "Здравствуйте! Я Алексей Капитанов — ваш цифровой участковый. Чем могу помочь?",
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
        "Могут ли остановить без причины?": "Полиция вправе остановить вас только при наличии оснований: подозрение в преступлении, ориентировка, проверка по делу или нарушение общественного порядка. Беспричинная остановка — нарушение закона.",
        "Как проходит проверка документов?": "Сотрудник обязан представиться и назвать причину проверки. Вы предъявляете паспорт или удостоверение. Задерживать вас только для проверки документов нельзя — это должно быть на месте.",
        "Права при обыске или досмотре": "Личный досмотр проводится только лицом одного пола и при понятых. Обыск — только с постановлением суда. Вы вправе позвонить адвокату и отказаться подписывать протокол с нарушениями.",
        "Когда полиция обязана приехать?": "Полиция обязана реагировать на любое сообщение о преступлении или угрозе безопасности. Срок реагирования в городе — до 10 минут, в сельской местности — до 30 минут.",
        "Можно ли отказаться от дачи показаний?": "Да! Статья 51 Конституции РФ даёт право не свидетельствовать против себя и близких родственников. Вы можете хранить молчание до прибытия адвоката.",
        "Сколько можно держать в отделе?": "Без составления протокола — не более 3 часов. По протоколу задержания — до 48 часов. Дольше — только по решению суда. Вы вправе уведомить родственников.",
        "Как подать жалобу на сотрудника?": "Жалобу можно подать: начальнику отдела полиции, в прокуратуру, в Следственный комитет или через портал ГосУслуги. Укажите ФИО сотрудника, дату, место и суть нарушения.",
        "Что делать при незаконном задержании?": "Спокойно сообщите, что задержание незаконно. Позвоните адвокату или родственникам. Запишите имя и звание сотрудника. Не оказывайте сопротивления — это отдельная статья.",
        "Права при остановке на дороге": "Инспектор обязан представиться, назвать причину остановки. Вы вправе снимать на видео. Выходить из машины нужно только по законному требованию. Ключи и телефон отдавать не обязаны.",
        "Обязан ли я называть свои данные?": "Да, при законном требовании сотрудника полиции вы обязаны назвать ФИО и показать документы. Отказ может быть квалифицирован как неповиновение законному требованию (ст. 19.3 КоАП).",
      };
      const reply = responses[msgText] || "Хороший вопрос! Уточните детали ситуации, и я постараюсь дать точный ответ по законодательству.";
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: "police", text: reply, time: getTime() }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen max-w-sm mx-auto bg-background overflow-hidden">
      {/* Status bar */}
      <div className="bg-[hsl(var(--primary))] text-white flex justify-between items-center px-5 pt-3 pb-1 text-xs font-medium">
        <span>9:41</span>
        <span className="font-oswald tracking-wide text-sm">ВСЁ О ДЕЯТЕЛЬНОСТИ ПОЛИЦИИ</span>
        <div className="flex gap-1 items-center">
          <Icon name="Signal" size={12} />
          <Icon name="Wifi" size={12} />
          <Icon name="Battery" size={12} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {tab === "home" && (
          <HomeScreen
            messages={messages}
            isTyping={isTyping}
            input=""
            setInput={() => {}}
            sendMessage={sendMessage}
            quickQuestions={QUICK_QUESTIONS}
          />
        )}
        {tab === "courses" && <CoursesScreen courses={COURSES} />}
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
            { id: "home", icon: "MessageCircle", label: "Диалог" },
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
              src={POLICE_IMG}
              alt="Офицер"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[hsl(var(--primary))]" />
          </div>
          <div>
            <div className="font-semibold text-base">Алексей Капитанов</div>
            <div className="text-blue-200 text-xs">Ваш Цифровой участковый</div>
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
                src={POLICE_IMG}
                alt="police"
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
              src={POLICE_IMG}
              alt="police"
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

function CoursesScreen({ courses }: { courses: typeof COURSES }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-[hsl(var(--primary))] px-4 py-5 text-white">
        <div className="font-oswald text-2xl tracking-wide">КУРСЫ ПРАВА</div>
        <div className="text-blue-200 text-sm mt-0.5">Изучай законы шаг за шагом</div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        {courses.map((course, i) => (
          <div
            key={course.id}
            onClick={() => setSelected(selected === course.id ? null : course.id)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border animate-fade-in cursor-pointer active:scale-[0.98] transition-all"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <div className={`bg-gradient-to-r ${course.color} p-4 flex items-center gap-3`}>
              <span className="text-3xl">{course.icon}</span>
              <div className="flex-1">
                <div className="text-white font-semibold">{course.title}</div>
                <div className="text-white/70 text-xs">{course.desc}</div>
              </div>
              <div className="text-white/80 text-xs">{course.lessons} уроков</div>
            </div>
            <div className="px-4 py-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Прогресс</span>
                <span className="font-semibold text-foreground">{course.progress}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${course.color} rounded-full transition-all`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              {selected === course.id && (
                <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                  <button className="w-full bg-[hsl(var(--primary))] text-white rounded-xl py-2.5 text-sm font-semibold">
                    {course.progress > 0 ? "Продолжить обучение" : "Начать курс"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
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
        <div className="text-blue-200 text-sm mt-0.5">Управление приложением</div>
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
            <div className="text-4xl mb-2">⚖️</div>
            <div className="font-oswald text-xl text-[hsl(var(--primary))] tracking-wide">
              ВСЁ О ДЕЯТЕЛЬНОСТИ ПОЛИЦИИ
            </div>
            <div className="text-xs text-muted-foreground mt-1">Версия 1.0.0</div>
            <div className="text-xs text-muted-foreground mt-3">Разработано для граждан России</div>
            <div className="text-xs text-muted-foreground">© 2026 ПравоДруг</div>
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