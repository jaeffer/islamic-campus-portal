import type { Lang } from "@/lib/i18n";

export type Quote = {
  id: string;
  arabic: string;
  text: Record<Lang, string>;
  ref: Record<Lang, string>;
};

export const knowledgeQuotes: Quote[] = [
  {
    id: "q1",
    arabic: "وَقُلْ رَبِّ زِدْنِي عِلْمًا",
    text: {
      en: "And say: My Lord, increase me in knowledge.",
      am: "እንዲህም በል፦ ጌታዬ ሆይ፣ እውቀትን ጨምርልኝ።",
      ar: "وَقُلْ رَبِّ زِدْنِي عِلْمًا",
    },
    ref: { en: "Qur'an 20:114", am: "ቁርአን 20:114", ar: "القرآن ٢٠:١١٤" },
  },
  {
    id: "q2",
    arabic: "إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ",
    text: {
      en: "It is only those endowed with knowledge who truly fear Allah.",
      am: "ከባሮቹ አላህን በእውነት የሚፈሩት ዐዋቂዎቹ ናቸው።",
      ar: "إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ",
    },
    ref: { en: "Qur'an 35:28", am: "ቁርአን 35:28", ar: "القرآن ٣٥:٢٨" },
  },
  {
    id: "q3",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَطْلُبُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
    text: {
      en: "Whoever treads a path seeking knowledge, Allah makes easy for him a path to Paradise.",
      am: "እውቀትን ለመፈለግ መንገድ የሚይዝ ሰው፣ አላህ ወደ ጀነት የሚወስደውን መንገድ ያቀልለታል።",
      ar: "مَنْ سَلَكَ طَرِيقًا يَطْلُبُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
    },
    ref: { en: "Hadith — Muslim", am: "ሃዲስ — ሙስሊም", ar: "حديث — مسلم" },
  },
  {
    id: "q4",
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    text: {
      en: "The best of you are those who learn the Qur'an and teach it.",
      am: "ከእናንተ በላጩ ቁርአንን የተማረና ያስተማረ ነው።",
      ar: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    },
    ref: { en: "Hadith — Bukhari", am: "ሃዲስ — ቡኻሪ", ar: "حديث — البخاري" },
  },
  {
    id: "q5",
    arabic: "هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
    text: {
      en: "Are those who know equal to those who do not know?",
      am: "የሚያውቁና የማያውቁ እኩል ይሆኑን?",
      ar: "هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
    },
    ref: { en: "Qur'an 39:9", am: "ቁርአን 39:9", ar: "القرآن ٣٩:٩" },
  },
];
