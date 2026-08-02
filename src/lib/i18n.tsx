import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

const dict: Dict = {
  "school.name": { en: "Nur Al-Bayan Quran Institute", ar: "معهد نور البيان للقرآن" },
  "school.short": { en: "Nur Al-Bayan", ar: "نور البيان" },
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "عن المعهد" },
  "nav.programs": { en: "Programs", ar: "البرامج" },
  "nav.faq": { en: "FAQ", ar: "الأسئلة الشائعة" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.portal": { en: "Staff Portal", ar: "بوابة الموظفين" },
  "hero.eyebrow": { en: "Established 1996 · Licensed Quran Institute", ar: "تأسس عام ١٩٩٦ · معهد قرآني معتمد" },
  "hero.title": { en: "Memorize. Understand. Live the Quran.", ar: "احفظ. افهم. اعمل بالقرآن." },
  "hero.sub": {
    en: "A complete Quran school for hifz, tajweed and Islamic studies — guided by certified teachers with authentic isnad.",
    ar: "مدرسة قرآنية متكاملة للحفظ والتجويد والعلوم الشرعية بإشراف معلمين مجازين بسند متصل.",
  },
  "hero.cta1": { en: "Apply for admission", ar: "التقديم للتسجيل" },
  "hero.cta2": { en: "Explore programs", ar: "استعرض البرامج" },
  "stats.students": { en: "Students enrolled", ar: "طالب مسجل" },
  "stats.teachers": { en: "Certified teachers", ar: "معلم مجاز" },
  "stats.huffaz": { en: "Graduated huffaz", ar: "حافظ متخرج" },
  "stats.years": { en: "Years of service", ar: "سنة من العطاء" },
  "programs.title": { en: "Our Programs", ar: "برامجنا" },
  "programs.sub": {
    en: "Structured tracks for every age and level, from first letters to full ijazah.",
    ar: "مسارات منظمة لكل عمر ومستوى، من الحروف الأولى إلى الإجازة الكاملة.",
  },
  "p1.title": { en: "Hifz Track", ar: "مسار الحفظ" },
  "p1.body": {
    en: "Full memorization of the Quran with daily revision circles and progress tracking.",
    ar: "حفظ القرآن كاملاً مع حلقات مراجعة يومية ومتابعة دقيقة للتقدم.",
  },
  "p2.title": { en: "Tajweed & Recitation", ar: "التجويد والتلاوة" },
  "p2.body": {
    en: "Rules of tajweed applied practically until recitation is fluent and correct.",
    ar: "أحكام التجويد تطبيقاً عملياً حتى تستقيم التلاوة وتصح.",
  },
  "p3.title": { en: "Islamic Studies", ar: "العلوم الشرعية" },
  "p3.body": {
    en: "Aqeedah, fiqh, seerah and Arabic language taught alongside the Quran.",
    ar: "العقيدة والفقه والسيرة واللغة العربية إلى جانب القرآن.",
  },
  "p4.title": { en: "Kids Foundation", ar: "تأسيس الصغار" },
  "p4.body": {
    en: "Playful, gentle Nur Al-Bayan method for readers aged 5 to 9.",
    ar: "منهج نور البيان بأسلوب محبب وميسر للأعمار ٥ إلى ٩ سنوات.",
  },
  "about.title": { en: "About the Institute", ar: "عن المعهد" },
  "about.lead": {
    en: "We are a community Quran school built around one idea: every student deserves a teacher who knows their name, their level and their goal.",
    ar: "نحن مدرسة قرآنية مجتمعية قامت على فكرة واحدة: كل طالب يستحق معلماً يعرف اسمه ومستواه وهدفه.",
  },
  "about.p1": {
    en: "Founded in 1996 in a single classroom, the institute today serves hundreds of students across morning, evening and weekend circles. Our teachers hold connected isnad in recitation and are trained in modern classroom practice.",
    ar: "تأسس المعهد عام ١٩٩٦ في فصل واحد، ويخدم اليوم مئات الطلاب في حلقات صباحية ومسائية ونهاية الأسبوع. معلمونا يحملون أسانيد متصلة في الرواية ومدربون على أساليب التعليم الحديثة.",
  },
  "about.p2": {
    en: "Alongside memorization we care for character: punctuality, respect, cleanliness and service. Families receive regular reports so learning continues at home.",
    ar: "وإلى جانب الحفظ نعتني بالأخلاق: الالتزام والاحترام والنظافة وخدمة الناس. وتتلقى الأسر تقارير دورية ليستمر التعلم في البيت.",
  },
  "about.missionT": { en: "Our Mission", ar: "رسالتنا" },
  "about.missionB": {
    en: "To raise a generation that recites the Quran correctly, understands its meanings and acts upon it.",
    ar: "تخريج جيل يتلو القرآن صحيحاً ويفهم معانيه ويعمل به.",
  },
  "about.visionT": { en: "Our Vision", ar: "رؤيتنا" },
  "about.visionB": {
    en: "A reference Quran institute known for teaching quality, sincerity and organized administration.",
    ar: "معهد قرآني مرجعي يُعرف بجودة التعليم والإخلاص والإدارة المنظمة.",
  },
  "about.valuesT": { en: "Our Values", ar: "قيمنا" },
  "about.valuesB": {
    en: "Ikhlas, discipline, mercy with students, and continuous improvement.",
    ar: "الإخلاص والانتظام والرحمة بالطلاب والتطوير المستمر.",
  },
  "faq.title": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  "faq.sub": {
    en: "Answers to what families ask us most before enrolling.",
    ar: "إجابات لأكثر ما تسأل عنه الأسر قبل التسجيل.",
  },
  "faq.q1": { en: "What is the minimum age for enrollment?", ar: "ما هو أقل سن للتسجيل؟" },
  "faq.a1": {
    en: "We accept students from age 5 in the Kids Foundation track, and from age 10 in the Hifz track. Adult evening circles have no age limit.",
    ar: "نقبل الطلاب من عمر ٥ سنوات في مسار تأسيس الصغار، ومن عمر ١٠ سنوات في مسار الحفظ. وحلقات الكبار المسائية بلا حد للعمر.",
  },
  "faq.q2": { en: "What are the class timings?", ar: "ما هي أوقات الحلقات؟" },
  "faq.a2": {
    en: "Morning circles run 8:00–11:30, evening circles 16:30–19:00, and weekend intensives on Saturday mornings.",
    ar: "الحلقات الصباحية من ٨:٠٠ إلى ١١:٣٠، والمسائية من ٤:٣٠ إلى ٧:٠٠، ودورات مكثفة صباح السبت.",
  },
  "faq.q3": { en: "Are the fees affordable, and is aid available?", ar: "هل الرسوم ميسّرة وهل يوجد دعم؟" },
  "faq.a3": {
    en: "Fees are kept low and partial or full scholarships are available for orphans and low-income families after review.",
    ar: "الرسوم منخفضة، ويتوفر إعفاء جزئي أو كامل لليتامى والأسر محدودة الدخل بعد الدراسة.",
  },
  "faq.q4": { en: "Do you teach girls and boys separately?", ar: "هل يُدرَّس الأولاد والبنات بشكل منفصل؟" },
  "faq.a4": {
    en: "Yes. Separate wings and separate teaching staff are provided for boys and girls.",
    ar: "نعم، هناك أقسام منفصلة وكوادر تعليمية منفصلة للأولاد والبنات.",
  },
  "faq.q5": { en: "How do parents follow their child's progress?", ar: "كيف يتابع الأهل تقدم أبنائهم؟" },
  "faq.a5": {
    en: "Teachers record daily memorization and revision. Parents receive a weekly summary and a termly report card.",
    ar: "يسجل المعلمون الحفظ والمراجعة يومياً، ويتلقى الأهل ملخصاً أسبوعياً وشهادة تقييم كل فصل.",
  },
  "faq.q6": { en: "Do you issue an ijazah certificate?", ar: "هل تصدرون شهادة إجازة؟" },
  "faq.a6": {
    en: "Yes, after completing memorization and passing a full recitation examination before a certified sheikh.",
    ar: "نعم، بعد إتمام الحفظ والنجاح في اختبار عرض كامل أمام شيخ مجاز.",
  },
  "contact.title": { en: "Contact Us", ar: "اتصل بنا" },
  "contact.sub": {
    en: "Visit us, call, or send a message and the administration will reply within one working day.",
    ar: "زرنا أو اتصل أو أرسل رسالة وسترد الإدارة خلال يوم عمل واحد.",
  },
  "contact.address": { en: "Address", ar: "العنوان" },
  "contact.addressV": { en: "12 Al-Nahda Street, Old District", ar: "١٢ شارع النهضة، الحي القديم" },
  "contact.phone": { en: "Phone", ar: "الهاتف" },
  "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
  "contact.hours": { en: "Office hours", ar: "ساعات العمل" },
  "contact.hoursV": { en: "Sun–Thu, 8:00 – 16:00", ar: "الأحد–الخميس، ٨:٠٠ – ٤:٠٠" },
  "form.name": { en: "Full name", ar: "الاسم الكامل" },
  "form.email": { en: "Email address", ar: "البريد الإلكتروني" },
  "form.message": { en: "Message", ar: "الرسالة" },
  "form.send": { en: "Send message", ar: "إرسال الرسالة" },
  "form.note": {
    en: "Message delivery is not wired up yet — the backend is in progress.",
    ar: "إرسال الرسائل غير مفعّل بعد — الجزء الخلفي قيد الإنشاء.",
  },
  "portal.title": { en: "Staff Portal", ar: "بوابة الموظفين" },
  "portal.sub": {
    en: "For teachers and administration only. Sign in to manage circles, attendance and student progress.",
    ar: "للمعلمين والإدارة فقط. سجّل الدخول لإدارة الحلقات والحضور وتقدم الطلاب.",
  },
  "portal.id": { en: "Staff ID or email", ar: "الرقم الوظيفي أو البريد" },
  "portal.password": { en: "Password", ar: "كلمة المرور" },
  "portal.signin": { en: "Sign in", ar: "تسجيل الدخول" },
  "portal.pending": {
    en: "Authentication is not connected yet — the backend team is building it.",
    ar: "المصادقة غير متصلة بعد — فريق الخلفية يعمل عليها.",
  },
  "portal.back": { en: "Back to website", ar: "العودة إلى الموقع" },
  "cta.title": { en: "Admissions are open for the new term", ar: "التسجيل مفتوح للفصل الجديد" },
  "cta.sub": {
    en: "Places in each circle are limited so every student gets individual attention.",
    ar: "المقاعد محدودة في كل حلقة ليحصل كل طالب على عناية فردية.",
  },
  "footer.tag": {
    en: "Teaching the Book of Allah with care since 1996.",
    ar: "نعلّم كتاب الله بعناية منذ عام ١٩٩٦.",
  },
  "footer.links": { en: "Pages", ar: "الصفحات" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },
  "theme.toggle": { en: "Toggle theme", ar: "تبديل المظهر" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; dir: "ltr" | "rtl" };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "ar" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, dir, t: (k) => dict[k]?.[lang] ?? k }),
    [lang, setLang, dir],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
