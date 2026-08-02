import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "am";

type Dict = Record<string, { en: string; am: string }>;

const dict: Dict = {
  "school.name": { en: "Al Imam Hassan Quran Institute", am: "አል ኢማም ሃሰን ቁርአን መድረሳ" },
  "school.short": { en: "Al Imam Hassan", am: "አል ኢማም ሃሰን" },
  "school.kicker": { en: "Quran Madrasa", am: "ቁርአን መድረሳ" },
  "nav.home": { en: "Home", am: "መነሻ" },
  "nav.about": { en: "About", am: "ስለ እኛ" },
  "nav.programs": { en: "Programs", am: "የትምህርት ደረጃዎች" },
  "nav.faq": { en: "FAQ", am: "ጥያቄና መልስ" },
  "nav.contact": { en: "Contact", am: "አግኙን" },
  "nav.portal": { en: "Staff Portal", am: "የሰራተኞች መግቢያ" },
  "hero.eyebrow": {
    en: "Established 2003 E.C. · Kolfe, Addis Ababa",
    am: "በ2003 ዓ/ም የተመሰረተ · ኮልፌ፣ አዲስ አበባ",
  },
  "hero.title": {
    en: "Deen knowledge alongside school, for every age.",
    am: "ት/ታቸውን ሳያቋርጡ የዲን ትምህርት፣ ለሁሉም እድሜ።",
  },
  "hero.sub": {
    en: "Quran, Hadith, Fiqh and Tawheed taught from age 4 up to university level — and beyond, with dedicated classes for youth, mothers and fathers.",
    am: "ቁርአን፣ ሃዲስ፣ ፊቅህ እና ተውሂድ ከ4 ዓመት ጀምሮ እስከ ዩኒቨርሲቲ ደረጃ — እንዲሁም ለወጣቶች፣ ለእናቶች እና ለአባቶች የተዘጋጁ ደርሶች።",
  },
  "hero.cta1": { en: "Register a student", am: "ተማሪ ያስመዝግቡ" },
  "hero.cta2": { en: "See our levels", am: "ደረጃዎቻችንን ይመልከቱ" },
  "stats.students": { en: "Learning from age 4", am: "ከ4 ዓመት ጀምሮ" },
  "stats.teachers": { en: "Levels offered", am: "የትምህርት ደረጃዎች" },
  "stats.huffaz": { en: "Subject areas beyond Quran", am: "ከቁርአን ባሻገር የደርስ አይነቶች" },
  "stats.years": { en: "Founded (E.C.)", am: "የተመሰረተበት ዓ/ም" },
  "programs.title": { en: "Our Levels & Classes", am: "የትምህርት ደረጃዎቻችን" },
  "programs.sub": {
    en: "A path that starts at age 4 and never closes — children, youth, mothers and fathers all have a place.",
    am: "ከ4 ዓመት የሚጀምር እና የማይቋረጥ ጉዞ — ህጻናት፣ ወጣቶች፣ እናቶች እና አባቶች ሁሉም ቦታ አላቸው።",
  },
  "p1.title": { en: "KG Level", am: "የኪጂ ሌቭል" },
  "p1.body": {
    en: "The first steps for young children from age 4: letters, short surahs and good manners in a gentle setting.",
    am: "ከ4 ዓመት ለሚጀምሩ ህጻናት የመጀመሪያ እርምጃ፦ ሆሄያት፣ አጫጭር ሱራዎች እና መልካም አኽላቅ በተመቻቸ አኳኋን።",
  },
  "p2.title": { en: "Primary Level", am: "የፕራይመሪ ሌቭል" },
  "p2.body": {
    en: "Quran reading and memorization together with the basics of Tawheed, Fiqh and Hadith, using kitabs prepared for their age.",
    am: "የቁርአን ንባብና ሂፍዝ ከተውሂድ፣ ፊቅህ እና ሃዲስ መሰረታዊያን ጋር፣ ለእድሜያቸው በተዘጋጁ ኪታቦች።",
  },
  "p3.title": { en: "Secondary Level", am: "የሰከንደሪ ሌቭል" },
  "p3.body": {
    en: "Deeper study of the Islamic sciences for students who are continuing their regular schooling at the same time.",
    am: "መደበኛ ት/ታቸውን እየተከታተሉ ላሉ ተማሪዎች የጠለቀ የዒልም ትምህርት።",
  },
  "p4.title": { en: "Tertiary Level", am: "የቴሪዠሪ ሌቭል" },
  "p4.body": {
    en: "For university-age students: advanced kitabs across Quran, Hadith, Fiqh and Tawheed.",
    am: "ለዩኒቨርሲቲ እድሜ ተማሪዎች፦ በቁርአን፣ ሃዲስ፣ ፊቅህ እና ተውሂድ የላቁ ኪታቦች።",
  },
  "p5.title": { en: "Youth Classes", am: "የወጣቶች ደርስ" },
  "p5.body": {
    en: "Regular darsi for young men and women, connecting knowledge with daily life and character.",
    am: "ለወጣት ወንዶችና ሴቶች መደበኛ ደርስ፣ እውቀትን ከዕለት ተዕለት ኑሮና ከአኽላቅ ጋር የሚያገናኝ።",
  },
  "p6.title": { en: "Mothers & Fathers", am: "የእናቶች እና የአባቶች ደርስ" },
  "p6.body": {
    en: "Open darsi for parents with no age limit — learning never stops in this madrasa.",
    am: "ለወላጆች ያለ እድሜ ገደብ የሚሰጥ ደርስ — በዚህ መድረሳ ትምህርት አይቋረጥም።",
  },
  "p7.title": { en: "Advanced Level (planned)", am: "የአድቫንስ ሌቭል (በእቅድ ላይ)" },
  "p7.body": {
    en: "An advanced track is being prepared to graduate qualified alim and alimah students.",
    am: "ብቁ ዓሊም/ዓሊማህ ለማፍራት የአድቫንስ ሌቭል ለማስጀመር በእቅድ ላይ ነን።",
  },
  "about.title": { en: "About the Madrasa", am: "ስለ መድረሳችን" },
  "about.lead": {
    en: "Founded in 2003 E.C. by 5 to 8 members of the Al Imam Hassan mosque community, so that children could gain deen knowledge without interrupting their regular schooling.",
    am: "በ2003 ዓ/ም በአል ኢማም ሃሰን መስጂድ የመቃሚ ሰዎች (ከ5 እስከ 8 የሚሆኑ) የተመሰረተ ሲሆን፣ ልጆች ት/ታቸውን ሳያቋርጡ የዲን ትምህርት እንዲያገኙ ታስቦ ነው።",
  },
  "about.p1": {
    en: "The madrasa was built on a simple intention: give children a grounding that keeps the old foundation and still walks with the times, from childhood until they enter university — Quran, Hadith, Fiqh, Tawheed and the other branches of ilm.",
    am: "መድረሳው የተመሰረተው የድሮውን መሰረት ያደረገ እና ከዘመኑ ጋር የሚሄድ የዲን ትምህርት ለመስጠት በማሰብ ነው። ልጆች ከህጻንነታቸው ጀምሮ ዩኒቨርሲቲ እስኪገቡ ድረስ ከቁርአን፣ ከሃዲስ፣ ከፊቅህ፣ ከተውሂድ እና ከመሳሰሉት የዒልም ዘርፎች እንዲቀስሙ ነው።",
  },
  "about.p2": {
    en: "The early years brought real difficulties: finding enough ustadhs, paying them fairly, and sourcing kitabs suited to each level. By the permission of Allah we worked within our means — training our own ustadhs and preparing kitabs matched to each age and stage.",
    am: "በምስረታው ወቅት በቂ ኡስታዞችን የማግኘት፣ ለኡስታዞች በቂ ደሞዝ የመክፈል እና ለልጆች በየደረጃቸው የሚመጥን ኪታብ የማግኘት ችግሮች ተከስተው ነበር። በአላህ ፍቃድ በቻልነው ልክ ኡስታዞችን በማምረት እና በየእድሜያቸው ልክ ኪታብ በማዘጋጀት ችግሩ ተፈቷል።",
  },
  "about.p3": {
    en: "What sets us apart is that every age group has a class of its own — from four-year-olds to fathers and mothers — with more than five kinds of darsi taught beyond the Quran itself.",
    am: "መድረሳችንን ከሌሎች ልዩ የሚያደርገው ለሁሉም የእድሜ ክልል ትምህርት ማዘጋጀታችን ነው — ከ4 ዓመት ህጻናት እስከ አባቶችና እናቶች — እንዲሁም ከቁርአን ባሻገር ከአምስት በላይ የደርስ አይነቶች መስጠታችን።",
  },
  "about.missionT": { en: "Our Mission", am: "ተልዕኮ" },
  "about.missionB": {
    en: "To give quality education that combines Islamic character (akhlaq) with modern scientific knowledge, so our students succeed in both the akhirah and the dunya.",
    am: "ኢስላማዊ ስነ-ምግባርን (አኽላቅ) ከዘመናዊ ሳይንሳዊ እውቀት ጋር በማቀናጀት፣ ተማሪዎቻችን በአኺራም ሆነ በዱንያ ስኬታማ እንዲሆኑ የሚያስችል ጥራት ያለው ትምህርት መስጠት።",
  },
  "about.visionT": { en: "Our Vision", am: "ራዕይ" },
  "about.visionB": {
    en: "To raise generations proud of their deen, rich in both religious and modern knowledge, and a light for the world — excellent alim and alimah.",
    am: "በዲናቸው የሚኮሩ፣ በዲናዊ እና በዘመናዊ እውቀት የበለጸጉና ለዓለም ብርሃን የሚሆኑ ምርጥ ዓሊም/ዓሊማህ የሆኑ ትውልዶችን ማፍራት።",
  },
  "about.valuesT": { en: "Core Values", am: "እሴቶቻችን" },
  "about.valuesB": {
    en: "Raising a generation that joins knowledge with akhlaq; upholding Islamic values in word and deed; passing on what we have learned to those it has not reached.",
    am: "እውቀትን ከአኽላቅ ጋር ያጣመረ ትውልድ መፍጠር፤ በንግግር እና በተግባር የእስልምናን እሴቶች ማስጠበቅ፤ የተማርነውን እውቀት ላልደረሳቸው ማድረስ።",
  },
  "faq.title": { en: "Frequently Asked Questions", am: "ተደጋግመው የሚጠየቁ ጥያቄዎች" },
  "faq.sub": {
    en: "What families ask us most before registering.",
    am: "ወላጆች ከምዝገባ በፊት በብዛት የሚጠይቁን።",
  },
  "faq.q1": { en: "From what age do you accept children?", am: "ልጆችን ከስንት ዓመት ጀምሮ ትቀበላላችሁ?" },
  "faq.a1": {
    en: "Children are accepted from age 4 in the KG level. For the mothers' and fathers' classes there is no age limit at all.",
    am: "ህጻናት ከ4 ዓመት ጀምሮ በኪጂ ሌቭል ይቀበላሉ። የእናቶች እና የአባቶች ደርስ ደግሞ የእድሜ ገደብ የለውም።",
  },
  "faq.q2": { en: "Will it clash with regular school?", am: "ከመደበኛ ትምህርት ጋር ይጋጫል?" },
  "faq.a2": {
    en: "No. The madrasa was founded exactly so that children can study their deen without interrupting their regular schooling.",
    am: "አይጋጭም። መድረሳው የተመሰረተው ልጆች ት/ታቸውን ሳያቋርጡ የዲን ትምህርት እንዲማሩ ታስቦ ነው።",
  },
  "faq.q3": { en: "What subjects are taught?", am: "ምን ምን ትምህርቶች ይሰጣሉ?" },
  "faq.a3": {
    en: "Quran, Hadith, Fiqh, Tawheed and other branches of ilm — more than five kinds of darsi beyond the Quran itself.",
    am: "ቁርአን፣ ሃዲስ፣ ፊቅህ፣ ተውሂድ እና ሌሎች የዒልም ዘርፎች — ከቁርአን ባሻገር ከአምስት በላይ የደርስ አይነቶች።",
  },
  "faq.q4": { en: "Which levels are available?", am: "የትኞቹ ደረጃዎች አሉ?" },
  "faq.a4": {
    en: "KG, Primary, Secondary and Tertiary levels, plus classes for youth, mothers and fathers. An advanced level is planned.",
    am: "የኪጂ፣ የፕራይመሪ፣ የሰከንደሪ እና የቴሪዠሪ ሌቭል፣ እንዲሁም የወጣቶች፣ የእናቶች እና የአባቶች ደርስ። የአድቫንስ ሌቭል በእቅድ ላይ ነው።",
  },
  "faq.q5": { en: "Are the kitabs suited to each level?", am: "ኪታቦቹ ለየደረጃው የተመጠኑ ናቸው?" },
  "faq.a5": {
    en: "Yes. Finding suitable kitabs was one of our earliest challenges, so we prepared kitabs matched to each age and level ourselves.",
    am: "አዎ። ተስማሚ ኪታብ ማግኘት ከመጀመሪያዎቹ ችግሮቻችን ስለነበር በየእድሜውና በየደረጃው የሚመጥን ኪታብ ራሳችን አዘጋጅተናል።",
  },
  "faq.q6": { en: "When are the classes given?", am: "ትምህርቱ መቼ ይሰጣል?" },
  "faq.a6": {
    en: "Office and class hours are 2:00 – 12:30 local time. Contact the administration for the timetable of a specific level.",
    am: "የቢሮና የትምህርት ሰዓት ከ2:00 – 12:30 (በአካባቢ ሰዓት) ነው። የአንድ ደረጃን መርሃ ግብር ለማወቅ አስተዳደሩን ያግኙ።",
  },
  "contact.title": { en: "Contact Us", am: "አግኙን" },
  "contact.sub": {
    en: "Visit us at the Imam Hassan mosque or send a message and the administration will get back to you.",
    am: "በኢማም ሃሰን መስጂድ ይጎብኙን ወይም መልእክት ይላኩልን፤ አስተዳደሩ ምላሽ ይሰጥዎታል።",
  },
  "contact.address": { en: "Address", am: "አድራሻ" },
  "contact.addressV": {
    en: "Kolfe, Atena Tera — Imam Hassan Mosque, Addis Ababa",
    am: "ኮልፌ፣ አጠና ተራ — ኢማም ሃሰን መስጂድ፣ አዲስ አበባ",
  },
  "contact.hours": { en: "Office hours", am: "የቢሮ ሰዓት" },
  "contact.hoursV": { en: "2:00 – 12:30 (local time)", am: "2:00 – 12:30 (በአካባቢ ሰዓት)" },
  "contact.place": { en: "Where we are", am: "የምንገኝበት" },
  "contact.placeV": {
    en: "Inside the Al Imam Hassan mosque compound",
    am: "በአል ኢማም ሃሰን መስጂድ ግቢ ውስጥ",
  },
  "contact.reg": { en: "Registration", am: "ምዝገባ" },
  "contact.regV": {
    en: "Register in person at the madrasa office during office hours",
    am: "በቢሮ ሰዓት በአካል በመድረሳው ቢሮ መመዝገብ ይቻላል",
  },
  "form.name": { en: "Full name", am: "ሙሉ ስም" },
  "form.email": { en: "Email address", am: "ኢሜይል" },
  "form.message": { en: "Message", am: "መልእክት" },
  "form.send": { en: "Send message", am: "መልእክት ላክ" },
  "form.note": {
    en: "Message delivery is not wired up yet — the backend is in progress.",
    am: "መልእክት መላኪያው ገና አልተገናኘም — የኋላ ስርዓቱ በስራ ላይ ነው።",
  },
  "portal.title": { en: "Staff Portal", am: "የሰራተኞች መግቢያ" },
  "portal.sub": {
    en: "For ustadhs and administration only. Sign in to manage classes, attendance and student progress.",
    am: "ለኡስታዞች እና ለአስተዳደር ብቻ። ክፍሎችን፣ የተማሪ ተገኝነትን እና እድገትን ለማስተዳደር ይግቡ።",
  },
  "portal.id": { en: "Staff ID or email", am: "የሰራተኛ መለያ ወይም ኢሜይል" },
  "portal.password": { en: "Password", am: "የይለፍ ቃል" },
  "portal.signin": { en: "Sign in", am: "ግባ" },
  "portal.pending": {
    en: "Authentication is not connected yet — the backend team is building it.",
    am: "የመግቢያ ማረጋገጫው ገና አልተገናኘም — የኋላ ስርዓት ቡድኑ እየሰራው ነው።",
  },
  "portal.back": { en: "Back to website", am: "ወደ ድረ-ገጹ ተመለስ" },
  "cta.title": { en: "Registration is open for new students", am: "ለአዲስ ተማሪዎች ምዝገባ ክፍት ነው" },
  "cta.sub": {
    en: "Places in each class are limited so every student gets individual attention.",
    am: "በእያንዳንዱ ክፍል ቦታው ውስን ነው፤ ይህም እያንዳንዱ ተማሪ ተገቢውን ትኩረት እንዲያገኝ ነው።",
  },
  "footer.tag": {
    en: "Teaching the Book of Allah and the Islamic sciences in Kolfe since 2003 E.C.",
    am: "ከ2003 ዓ/ም ጀምሮ በኮልፌ የአላህን ኪታብ እና የዲን ዕውቀት እያስተማርን።",
  },
  "footer.links": { en: "Pages", am: "ገጾች" },
  "footer.rights": { en: "All rights reserved.", am: "መብቱ በህግ የተጠበቀ ነው።" },
  "theme.toggle": { en: "Toggle theme", am: "ገጽታ ቀይር" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; dir: "ltr" | "rtl" };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "am" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
  }, []);

  const dir = "ltr" as const;

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
