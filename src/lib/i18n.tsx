import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "am" | "ar";

type Dict = Record<string, { en: string; am: string; ar: string }>;

const dict: Dict = {
  "school.name": {
    en: "Al Imam Hassan Quran Institute",
    am: "አል ኢማም ሃሰን ቁርአን መድረሳ",
    ar: "معهد الإمام حسن لتعليم القرآن",
  },
  "school.short": { en: "Al Imam Hassan", am: "አል ኢማም ሃሰን", ar: "الإمام حسن" },
  "school.kicker": { en: "Quran Madrasa", am: "ቁርአን መድረሳ", ar: "مدرسة قرآنية" },
  "nav.home": { en: "Home", am: "መነሻ", ar: "الرئيسية" },
  "nav.about": { en: "About", am: "ስለ እኛ", ar: "من نحن" },
  "nav.programs": { en: "Programs", am: "የትምህርት ደረጃዎች", ar: "المستويات" },
  "nav.faq": { en: "FAQ", am: "ጥያቄና መልስ", ar: "أسئلة شائعة" },
  "nav.contact": { en: "Contact", am: "አግኙን", ar: "اتصل بنا" },
  "nav.portal": { en: "Staff Portal", am: "የሰራተኞች መግቢያ", ar: "بوابة الموظفين" },
  "hero.eyebrow": {
    en: "Established 2003 E.C. · Kolfe, Addis Ababa",
    am: "በ2003 ዓ/ም የተመሰረተ · ኮልፌ፣ አዲስ አበባ",
    ar: "تأسس عام ٢٠٠٣ للتقويم الإثيوبي · كولفي، أديس أبابا",
  },
  "hero.title": {
    en: "Deen knowledge alongside school, for every age.",
    am: "ት/ታቸውን ሳያቋርጡ የዲን ትምህርት፣ ለሁሉም እድሜ።",
    ar: "علم الدين إلى جانب الدراسة، لكل الأعمار.",
  },
  "hero.sub": {
    en: "Quran, Hadith, Fiqh and Tawheed taught from age 4 up to university level — and beyond, with dedicated classes for youth, mothers and fathers.",
    am: "ቁርአን፣ ሃዲስ፣ ፊቅህ እና ተውሂድ ከ4 ዓመት ጀምሮ እስከ ዩኒቨርሲቲ ደረጃ — እንዲሁም ለወጣቶች፣ ለእናቶች እና ለአባቶች የተዘጋጁ ደርሶች።",
    ar: "القرآن والحديث والفقه والتوحيد من سن الرابعة حتى المرحلة الجامعية، مع دروس خاصة للشباب والأمهات والآباء.",
  },
  "hero.cta1": { en: "Visit the madrasa", am: "መድረሳውን ይጎብኙ", ar: "زوروا المدرسة" },
  "hero.cta2": { en: "See our levels", am: "ደረጃዎቻችንን ይመልከቱ", ar: "تعرّف على مستوياتنا" },
  "stats.students": { en: "Learning from age 4", am: "ከ4 ዓመት ጀምሮ", ar: "التعلّم من سن الرابعة" },
  "stats.teachers": { en: "Levels offered", am: "የትምህርት ደረጃዎች", ar: "المستويات المتاحة" },
  "stats.huffaz": {
    en: "Subject areas beyond Quran",
    am: "ከቁርአን ባሻገር የደርስ አይነቶች",
    ar: "مواد إضافية غير القرآن",
  },
  "stats.years": { en: "Founded (E.C.)", am: "የተመሰረተበት ዓ/ም", ar: "سنة التأسيس" },
  "programs.title": { en: "Our Levels & Classes", am: "የትምህርት ደረጃዎቻችን", ar: "مستوياتنا ودروسنا" },
  "programs.sub": {
    en: "A path that starts at age 4 and never closes — children, youth, mothers and fathers all have a place.",
    am: "ከ4 ዓመት የሚጀምር እና የማይቋረጥ ጉዞ — ህጻናት፣ ወጣቶች፣ እናቶች እና አባቶች ሁሉም ቦታ አላቸው።",
    ar: "مسيرة تبدأ من سن الرابعة ولا تنتهي — للأطفال والشباب والأمهات والآباء مكان عندنا.",
  },
  "p1.title": { en: "KG Level", am: "የኪጂ ሌቭል", ar: "مستوى الروضة" },
  "p1.body": {
    en: "The first steps for young children from age 4: letters, short surahs and good manners in a gentle setting.",
    am: "ከ4 ዓመት ለሚጀምሩ ህጻናት የመጀመሪያ እርምጃ፦ ሆሄያት፣ አጫጭር ሱራዎች እና መልካም አኽላቅ በተመቻቸ አኳኋን።",
    ar: "الخطوات الأولى للأطفال من سن الرابعة: الحروف وقصار السور والأخلاق الحسنة في بيئة لطيفة.",
  },
  "p2.title": { en: "Primary Level", am: "የፕራይመሪ ሌቭል", ar: "المستوى الابتدائي" },
  "p2.body": {
    en: "Quran reading and memorization together with the basics of Tawheed, Fiqh and Hadith, using kitabs prepared for their age.",
    am: "የቁርአን ንባብና ሂፍዝ ከተውሂድ፣ ፊቅህ እና ሃዲስ መሰረታዊያን ጋር፣ ለእድሜያቸው በተዘጋጁ ኪታቦች።",
    ar: "قراءة القرآن وحفظه مع أساسيات التوحيد والفقه والحديث بكتب مُعدّة لأعمارهم.",
  },
  "p3.title": { en: "Secondary Level", am: "የሰከንደሪ ሌቭል", ar: "المستوى الثانوي" },
  "p3.body": {
    en: "Deeper study of the Islamic sciences for students who are continuing their regular schooling at the same time.",
    am: "መደበኛ ት/ታቸውን እየተከታተሉ ላሉ ተማሪዎች የጠለቀ የዒልም ትምህርት።",
    ar: "دراسة أعمق للعلوم الشرعية للطلاب الذين يواصلون دراستهم النظامية في الوقت نفسه.",
  },
  "p4.title": { en: "Tertiary Level", am: "የቴሪዠሪ ሌቭል", ar: "المستوى الجامعي" },
  "p4.body": {
    en: "For university-age students: advanced kitabs across Quran, Hadith, Fiqh and Tawheed.",
    am: "ለዩኒቨርሲቲ እድሜ ተማሪዎች፦ በቁርአን፣ ሃዲስ፣ ፊቅህ እና ተውሂድ የላቁ ኪታቦች።",
    ar: "لطلاب المرحلة الجامعية: كتب متقدمة في القرآن والحديث والفقه والتوحيد.",
  },
  "p5.title": { en: "Youth Classes", am: "የወጣቶች ደርስ", ar: "دروس الشباب" },
  "p5.body": {
    en: "Regular darsi for young men and women, connecting knowledge with daily life and character.",
    am: "ለወጣት ወንዶችና ሴቶች መደበኛ ደርስ፣ እውቀትን ከዕለት ተዕለት ኑሮና ከአኽላቅ ጋር የሚያገናኝ።",
    ar: "دروس منتظمة للشباب والشابات تربط العلم بالحياة اليومية والأخلاق.",
  },
  "p6.title": { en: "Mothers & Fathers", am: "የእናቶች እና የአባቶች ደርስ", ar: "دروس الأمهات والآباء" },
  "p6.body": {
    en: "Open darsi for parents with no age limit — learning never stops in this madrasa.",
    am: "ለወላጆች ያለ እድሜ ገደብ የሚሰጥ ደርስ — በዚህ መድረሳ ትምህርት አይቋረጥም።",
    ar: "دروس مفتوحة للآباء بلا حد للعمر — التعلّم لا يتوقف في هذه المدرسة.",
  },
  "p7.title": { en: "Advanced Level (planned)", am: "የአድቫንስ ሌቭል (በእቅድ ላይ)", ar: "المستوى المتقدم (قيد الإعداد)" },
  "p7.body": {
    en: "An advanced track is being prepared to graduate qualified alim and alimah students.",
    am: "ብቁ ዓሊም/ዓሊማህ ለማፍራት የአድቫንስ ሌቭል ለማስጀመር በእቅድ ላይ ነን።",
    ar: "يجري إعداد مسار متقدم لتخريج علماء وعالمات مؤهلين.",
  },
  "about.title": { en: "About the Madrasa", am: "ስለ መድረሳችን", ar: "عن المدرسة" },
  "about.lead": {
    en: "Founded in 2003 E.C. by 5 to 8 members of the Al Imam Hassan mosque community, so that children could gain deen knowledge without interrupting their regular schooling.",
    am: "በ2003 ዓ/ም በአል ኢማም ሃሰን መስጂድ የመቃሚ ሰዎች (ከ5 እስከ 8 የሚሆኑ) የተመሰረተ ሲሆን፣ ልጆች ት/ታቸውን ሳያቋርጡ የዲን ትምህርት እንዲያገኙ ታስቦ ነው።",
    ar: "تأسست عام ٢٠٠٣ للتقويم الإثيوبي على يد خمسة إلى ثمانية من روّاد مسجد الإمام حسن، ليتعلّم الأطفال دينهم دون انقطاع عن دراستهم النظامية.",
  },
  "about.p1": {
    en: "The madrasa was built on a simple intention: give children a grounding that keeps the old foundation and still walks with the times, from childhood until they enter university — Quran, Hadith, Fiqh, Tawheed and the other branches of ilm.",
    am: "መድረሳው የተመሰረተው የድሮውን መሰረት ያደረገ እና ከዘመኑ ጋር የሚሄድ የዲን ትምህርት ለመስጠት በማሰብ ነው። ልጆች ከህጻንነታቸው ጀምሮ ዩኒቨርሲቲ እስኪገቡ ድረስ ከቁርአን፣ ከሃዲስ፣ ከፊቅህ፣ ከተውሂድ እና ከመሳሰሉት የዒልም ዘርፎች እንዲቀስሙ ነው።",
    ar: "قامت المدرسة على نية بسيطة: تأسيس الأطفال على الأصول القديمة مع مواكبة العصر، من الصغر حتى الجامعة — قرآناً وحديثاً وفقهاً وتوحيداً وسائر فروع العلم.",
  },
  "about.p2": {
    en: "The early years brought real difficulties: finding enough ustadhs, paying them fairly, and sourcing kitabs suited to each level. By the permission of Allah we worked within our means — training our own ustadhs and preparing kitabs matched to each age and stage.",
    am: "በምስረታው ወቅት በቂ ኡስታዞችን የማግኘት፣ ለኡስታዞች በቂ ደሞዝ የመክፈል እና ለልጆች በየደረጃቸው የሚመጥን ኪታብ የማግኘት ችግሮች ተከስተው ነበር። በአላህ ፍቃድ በቻልነው ልክ ኡስታዞችን በማምረት እና በየእድሜያቸው ልክ ኪታብ በማዘጋጀት ችግሩ ተፈቷል።",
    ar: "واجهت السنوات الأولى صعوبات حقيقية: توفير الأساتذة، ومكافأتهم بما يستحقون، وإيجاد كتب مناسبة لكل مستوى. وبإذن الله عملنا بما تيسّر — فأعددنا أساتذتنا وهيّأنا كتباً تناسب كل عمر ومرحلة.",
  },
  "about.p3": {
    en: "What sets us apart is that every age group has a class of its own — from four-year-olds to fathers and mothers — with more than five kinds of darsi taught beyond the Quran itself.",
    am: "መድረሳችንን ከሌሎች ልዩ የሚያደርገው ለሁሉም የእድሜ ክልል ትምህርት ማዘጋጀታችን ነው — ከ4 ዓመት ህጻናት እስከ አባቶችና እናቶች — እንዲሁም ከቁርአን ባሻገር ከአምስት በላይ የደርስ አይነቶች መስጠታችን።",
    ar: "ما يميّزنا أن لكل فئة عمرية صفّها الخاص — من أبناء الرابعة حتى الآباء والأمهات — مع أكثر من خمسة أنواع من الدروس إلى جانب القرآن.",
  },
  "about.missionT": { en: "Our Mission", am: "ተልዕኮ", ar: "رسالتنا" },
  "about.missionB": {
    en: "To give quality education that combines Islamic character (akhlaq) with modern scientific knowledge, so our students succeed in both the akhirah and the dunya.",
    am: "ኢስላማዊ ስነ-ምግባርን (አኽላቅ) ከዘመናዊ ሳይንሳዊ እውቀት ጋር በማቀናጀት፣ ተማሪዎቻችን በአኺራም ሆነ በዱንያ ስኬታማ እንዲሆኑ የሚያስችል ጥራት ያለው ትምህርት መስጠት።",
    ar: "تقديم تعليم عالي الجودة يجمع بين الأخلاق الإسلامية والمعرفة العلمية الحديثة، ليفلح طلابنا في الآخرة والدنيا.",
  },
  "about.visionT": { en: "Our Vision", am: "ራዕይ", ar: "رؤيتنا" },
  "about.visionB": {
    en: "To raise generations proud of their deen, rich in both religious and modern knowledge, and a light for the world — excellent alim and alimah.",
    am: "በዲናቸው የሚኮሩ፣ በዲናዊ እና በዘመናዊ እውቀት የበለጸጉና ለዓለም ብርሃን የሚሆኑ ምርጥ ዓሊም/ዓሊማህ የሆኑ ትውልዶችን ማፍራት።",
    ar: "تنشئة أجيال تعتزّ بدينها، غنية بالعلم الشرعي والحديث، ونوراً للعالم — علماء وعالمات متميزين.",
  },
  "about.valuesT": { en: "Core Values", am: "እሴቶቻችን", ar: "قيمنا" },
  "about.valuesB": {
    en: "Raising a generation that joins knowledge with akhlaq; upholding Islamic values in word and deed; passing on what we have learned to those it has not reached.",
    am: "እውቀትን ከአኽላቅ ጋር ያጣመረ ትውልድ መፍጠር፤ በንግግር እና በተግባር የእስልምናን እሴቶች ማስጠበቅ፤ የተማርነውን እውቀት ላልደረሳቸው ማድረስ።",
    ar: "تنشئة جيل يجمع العلم بالأخلاق؛ والتمسّك بالقيم الإسلامية قولاً وعملاً؛ وتبليغ ما تعلّمناه لمن لم يبلغه.",
  },
  "faq.title": { en: "Frequently Asked Questions", am: "ተደጋግመው የሚጠየቁ ጥያቄዎች", ar: "الأسئلة الشائعة" },
  "faq.sub": {
    en: "What families ask us most before registering.",
    am: "ወላጆች ከምዝገባ በፊት በብዛት የሚጠይቁን።",
    ar: "أكثر ما تسأل عنه الأسر قبل التسجيل.",
  },
  "faq.q1": {
    en: "From what age do you accept children?",
    am: "ልጆችን ከስንት ዓመት ጀምሮ ትቀበላላችሁ?",
    ar: "من أي عمر تقبلون الأطفال؟",
  },
  "faq.a1": {
    en: "Children are accepted from age 4 in the KG level. For the mothers' and fathers' classes there is no age limit at all.",
    am: "ህጻናት ከ4 ዓመት ጀምሮ በኪጂ ሌቭል ይቀበላሉ። የእናቶች እና የአባቶች ደርስ ደግሞ የእድሜ ገደብ የለውም።",
    ar: "نقبل الأطفال من سن الرابعة في مستوى الروضة، أما دروس الأمهات والآباء فلا حدّ لعمرها.",
  },
  "faq.q2": {
    en: "Will it clash with regular school?",
    am: "ከመደበኛ ትምህርት ጋር ይጋጫል?",
    ar: "هل يتعارض مع الدراسة النظامية؟",
  },
  "faq.a2": {
    en: "No. The madrasa was founded exactly so that children can study their deen without interrupting their regular schooling.",
    am: "አይጋጭም። መድረሳው የተመሰረተው ልጆች ት/ታቸውን ሳያቋርጡ የዲን ትምህርት እንዲማሩ ታስቦ ነው።",
    ar: "لا. فقد أُسست المدرسة أصلاً ليتعلّم الأطفال دينهم دون انقطاع عن دراستهم النظامية.",
  },
  "faq.q3": { en: "What subjects are taught?", am: "ምን ምን ትምህርቶች ይሰጣሉ?", ar: "ما المواد التي تُدرَّس؟" },
  "faq.a3": {
    en: "Quran, Hadith, Fiqh, Tawheed and other branches of ilm — more than five kinds of darsi beyond the Quran itself.",
    am: "ቁርአን፣ ሃዲስ፣ ፊቅህ፣ ተውሂድ እና ሌሎች የዒልም ዘርፎች — ከቁርአን ባሻገር ከአምስት በላይ የደርስ አይነቶች።",
    ar: "القرآن والحديث والفقه والتوحيد وفروع أخرى من العلم — أكثر من خمسة أنواع من الدروس إلى جانب القرآن.",
  },
  "faq.q4": { en: "Which levels are available?", am: "የትኞቹ ደረጃዎች አሉ?", ar: "ما المستويات المتاحة؟" },
  "faq.a4": {
    en: "KG, Primary, Secondary and Tertiary levels, plus classes for youth, mothers and fathers. An advanced level is planned.",
    am: "የኪጂ፣ የፕራይመሪ፣ የሰከንደሪ እና የቴሪዠሪ ሌቭል፣ እንዲሁም የወጣቶች፣ የእናቶች እና የአባቶች ደርስ። የአድቫንስ ሌቭል በእቅድ ላይ ነው።",
    ar: "الروضة والابتدائي والثانوي والجامعي، إضافة إلى دروس الشباب والأمهات والآباء، ومستوى متقدم قيد الإعداد.",
  },
  "faq.q5": {
    en: "Are the kitabs suited to each level?",
    am: "ኪታቦቹ ለየደረጃው የተመጠኑ ናቸው?",
    ar: "هل الكتب مناسبة لكل مستوى؟",
  },
  "faq.a5": {
    en: "Yes. Finding suitable kitabs was one of our earliest challenges, so we prepared kitabs matched to each age and level ourselves.",
    am: "አዎ። ተስማሚ ኪታብ ማግኘት ከመጀመሪያዎቹ ችግሮቻችን ስለነበር በየእድሜውና በየደረጃው የሚመጥን ኪታብ ራሳችን አዘጋጅተናል።",
    ar: "نعم. كان إيجاد الكتب المناسبة من أوائل تحدياتنا، فأعددنا بأنفسنا كتباً تناسب كل عمر ومستوى.",
  },
  "faq.q6": { en: "When are the classes given?", am: "ትምህርቱ መቼ ይሰጣል?", ar: "متى تُعقد الدروس؟" },
  "faq.a6": {
    en: "Office and class hours are 2:00 – 12:30 local time. Contact the administration for the timetable of a specific level.",
    am: "የቢሮና የትምህርት ሰዓት ከ2:00 – 12:30 (በአካባቢ ሰዓት) ነው። የአንድ ደረጃን መርሃ ግብር ለማወቅ አስተዳደሩን ያግኙ።",
    ar: "ساعات المكتب والدروس من ٢:٠٠ إلى ١٢:٣٠ بالتوقيت المحلي. للاطلاع على جدول مستوى معيّن تواصلوا مع الإدارة.",
  },
  "contact.title": { en: "Contact Us", am: "አግኙን", ar: "اتصل بنا" },
  "contact.sub": {
    en: "Visit us at the Imam Hassan mosque during office hours — the administration will be glad to meet you.",
    am: "በኢማም ሃሰን መስጂድ በቢሮ ሰዓት ይጎብኙን — አስተዳደሩ በደስታ ይቀበልዎታል።",
    ar: "زوروا مسجد الإمام حسن خلال ساعات العمل — يسرّ الإدارة استقبالكم.",
  },
  "contact.address": { en: "Address", am: "አድራሻ", ar: "العنوان" },
  "contact.addressV": {
    en: "Kolfe, Atena Tera — Imam Hassan Mosque, Addis Ababa",
    am: "ኮልፌ፣ አጠና ተራ — ኢማም ሃሰን መስጂድ፣ አዲስ አበባ",
    ar: "كولفي، أطينا تيرا — مسجد الإمام حسن، أديس أبابا",
  },
  "contact.hours": { en: "Office hours", am: "የቢሮ ሰዓት", ar: "ساعات العمل" },
  "contact.hoursV": {
    en: "2:00 – 12:30 (local time)",
    am: "2:00 – 12:30 (በአካባቢ ሰዓት)",
    ar: "٢:٠٠ – ١٢:٣٠ (بالتوقيت المحلي)",
  },
  "contact.place": { en: "Where we are", am: "የምንገኝበት", ar: "موقعنا" },
  "contact.placeV": {
    en: "Inside the Al Imam Hassan mosque compound",
    am: "በአል ኢማም ሃሰን መስጂድ ግቢ ውስጥ",
    ar: "داخل حرم مسجد الإمام حسن",
  },
  "contact.reg": { en: "Registration", am: "ምዝገባ", ar: "التسجيل" },
  "contact.regV": {
    en: "Register in person at the madrasa office during office hours",
    am: "በቢሮ ሰዓት በአካል በመድረሳው ቢሮ መመዝገብ ይቻላል",
    ar: "التسجيل حضورياً في مكتب المدرسة خلال ساعات العمل",
  },
  "portal.title": { en: "Staff Portal", am: "የሰራተኞች መግቢያ", ar: "بوابة الموظفين" },
  "portal.sub": {
    en: "For ustadhs and administration only. Sign in to manage classes, attendance and student progress.",
    am: "ለኡስታዞች እና ለአስተዳደር ብቻ። ክፍሎችን፣ የተማሪ ተገኝነትን እና እድገትን ለማስተዳደር ይግቡ።",
    ar: "للأساتذة والإدارة فقط. سجّل الدخول لإدارة الصفوف والحضور وتقدّم الطلاب.",
  },
  "portal.id": { en: "Staff ID or email", am: "የሰራተኛ መለያ ወይም ኢሜይል", ar: "معرّف الموظف أو البريد الإلكتروني" },
  "portal.password": { en: "Password", am: "የይለፍ ቃል", ar: "كلمة المرور" },
  "portal.signin": { en: "Sign in", am: "ግባ", ar: "تسجيل الدخول" },
  "portal.pending": {
    en: "Authentication is not connected yet — the backend team is building it.",
    am: "የመግቢያ ማረጋገጫው ገና አልተገናኘም — የኋላ ስርዓት ቡድኑ እየሰራው ነው።",
    ar: "لم يتم ربط نظام الدخول بعد — فريق الخادم يعمل عليه.",
  },
  "portal.back": { en: "Back to website", am: "ወደ ድረ-ገጹ ተመለስ", ar: "العودة إلى الموقع" },
  "cta.title": { en: "Come and see us in person", am: "በአካል ጎብኙን", ar: "تفضّلوا بزيارتنا" },
  "cta.sub": {
    en: "The administration welcomes families at the madrasa office during office hours.",
    am: "አስተዳደሩ በቢሮ ሰዓት ቤተሰቦችን በመድረሳው ቢሮ ይቀበላል።",
    ar: "ترحّب الإدارة بالأسر في مكتب المدرسة خلال ساعات العمل.",
  },
  "footer.tag": {
    en: "Teaching the Book of Allah and the Islamic sciences in Kolfe since 2003 E.C.",
    am: "ከ2003 ዓ/ም ጀምሮ በኮልፌ የአላህን ኪታብ እና የዲን ዕውቀት እያስተማርን።",
    ar: "نعلّم كتاب الله والعلوم الشرعية في كولفي منذ عام ٢٠٠٣ للتقويم الإثيوبي.",
  },
  "footer.links": { en: "Pages", am: "ገጾች", ar: "الصفحات" },
  "footer.rights": { en: "All rights reserved.", am: "መብቱ በህግ የተጠበቀ ነው።", ar: "جميع الحقوق محفوظة." },
  "theme.toggle": { en: "Toggle theme", am: "ገጽታ ቀይር", ar: "تبديل المظهر" },
};

export const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "am", label: "አማርኛ" },
  { code: "ar", label: "العربية" },
];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string; dir: "ltr" | "rtl" };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "am" || stored === "en" || stored === "ar") setLangState(stored);
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

export function nextLang(current: Lang): Lang {
  const i = languages.findIndex((l) => l.code === current);
  return languages[(i + 1) % languages.length].code;
}
