import { FlashcardItem } from '../types';

export const INITIAL_FLASHCARDS: FlashcardItem[] = [
  // Numbers
  {
    id: "FC-NUM-01",
    category: "Numbers",
    hindi: "एक (1)",
    santhali: "Mit'",
    santhali_script: "᱑ (ᱢᱤᱫ)",
    santhali_phonetic: "मिद",
    icon_or_emoji: "1️⃣",
    color_theme: "from-amber-500/20 to-orange-500/20",
    example_sentence_hindi: "एक आम",
    example_sentence_santhali: "Mit' uli"
  },
  {
    id: "FC-NUM-02",
    category: "Numbers",
    hindi: "दो (2)",
    santhali: "Bar",
    santhali_script: "᱒ (ᱵᱟᱨ)",
    santhali_phonetic: "बार",
    icon_or_emoji: "2️⃣",
    color_theme: "from-blue-500/20 to-indigo-500/20",
    example_sentence_hindi: "दो चिड़िया",
    example_sentence_santhali: "Bar cheṇe"
  },
  {
    id: "FC-NUM-03",
    category: "Numbers",
    hindi: "तीन (3)",
    santhali: "Pe / Peyea",
    santhali_script: "᱓ (ᱯᱮ)",
    santhali_phonetic: "पे",
    icon_or_emoji: "3️⃣",
    color_theme: "from-emerald-500/20 to-teal-500/20",
    example_sentence_hindi: "तीन पत्ते",
    example_sentence_santhali: "Pe sakam"
  },
  {
    id: "FC-NUM-04",
    category: "Numbers",
    hindi: "चार (4)",
    santhali: "Pun / Ponea",
    santhali_script: "᱔ (ᱯᱩᱱ)",
    santhali_phonetic: "पुन",
    icon_or_emoji: "4️⃣",
    color_theme: "from-rose-500/20 to-red-500/20",
    example_sentence_hindi: "चार गेंद",
    example_sentence_santhali: "Pun genda"
  },
  {
    id: "FC-NUM-05",
    category: "Numbers",
    hindi: "पाँच (5)",
    santhali: "Mōṛē",
    santhali_script: "᱕ (ᱢᱚᱬᱮ)",
    santhali_phonetic: "मोड़े",
    icon_or_emoji: "5️⃣",
    color_theme: "from-purple-500/20 to-violet-500/20",
    example_sentence_hindi: "पाँच उंगलियाँ",
    example_sentence_santhali: "Mōṛē katub"
  },
  {
    id: "FC-NUM-06",
    category: "Numbers",
    hindi: "दस (10)",
    santhali: "Gele",
    santhali_script: "᱑᱐ (ᱜᱮᱞ)",
    santhali_phonetic: "गेल",
    icon_or_emoji: "🔟",
    color_theme: "from-cyan-500/20 to-sky-500/20",
    example_sentence_hindi: "दस तारे",
    example_sentence_santhali: "Gel ipil"
  },

  // Animals
  {
    id: "FC-ANI-01",
    category: "Animals",
    hindi: "गाय",
    santhali: "Gai",
    santhali_script: "ᱜᱟᱹᱭ",
    santhali_phonetic: "गाई",
    icon_or_emoji: "🐄",
    color_theme: "from-amber-500/20 to-yellow-500/20",
    example_sentence_hindi: "गाय घास खाती है।",
    example_sentence_santhali: "Gai ghas jom-aye."
  },
  {
    id: "FC-ANI-02",
    category: "Animals",
    hindi: "कुत्ता",
    santhali: "Seta",
    santhali_script: "ᱥᱮᱛᱟ",
    santhali_phonetic: "सेता",
    icon_or_emoji: "🐕",
    color_theme: "from-orange-500/20 to-amber-500/20",
    example_sentence_hindi: "कुत्ता दौड़ रहा है।",
    example_sentence_santhali: "Seta doṛok' kanaye."
  },
  {
    id: "FC-ANI-03",
    category: "Animals",
    hindi: "बिल्ली",
    santhali: "Pusi",
    santhali_script: "ᱯᱩᱥᱤ",
    santhali_phonetic: "पुसी",
    icon_or_emoji: "🐱",
    color_theme: "from-pink-500/20 to-rose-500/20",
    example_sentence_hindi: "बिल्ली दूध पीती है।",
    example_sentence_santhali: "Pusi toa ñu-aye."
  },
  {
    id: "FC-ANI-04",
    category: "Animals",
    hindi: "बकरी",
    santhali: "Merom",
    santhali_script: "ᱢᱮᱨᱚᱢ",
    santhali_phonetic: "मेरोम",
    icon_or_emoji: "🐐",
    color_theme: "from-emerald-500/20 to-lime-500/20",
    example_sentence_hindi: "बकरी का बच्चा।",
    example_sentence_santhali: "Merom hopon."
  },
  {
    id: "FC-ANI-05",
    category: "Animals",
    hindi: "पक्षी / चिड़िया",
    santhali: "Cheṇe",
    santhali_script: "ᱪᱮᱬᱮ",
    santhali_phonetic: "चेड़े",
    icon_or_emoji: "🐦",
    color_theme: "from-sky-500/20 to-blue-500/20",
    example_sentence_hindi: "चिड़िया उड़ती है।",
    example_sentence_santhali: "Cheṇe uḍạu-aye."
  },
  {
    id: "FC-ANI-06",
    category: "Animals",
    hindi: "हाथी",
    santhali: "Hati",
    santhali_script: "ᱦᱟᱹᱛᱤ",
    santhali_phonetic: "हाती",
    icon_or_emoji: "🐘",
    color_theme: "from-slate-500/20 to-gray-500/20",
    example_sentence_hindi: "हाथी बहुत बड़ा है।",
    example_sentence_santhali: "Hati aḍi maraṅgea."
  },

  // Colors
  {
    id: "FC-COL-01",
    category: "Colors",
    hindi: "लाल",
    santhali: "Arak'",
    santhali_script: "ᱟᱨᱟᱜ",
    santhali_phonetic: "आराग",
    icon_or_emoji: "🔴",
    color_theme: "from-red-500/20 to-rose-500/20",
    example_sentence_hindi: "लाल सेब",
    example_sentence_santhali: "Arak' seb"
  },
  {
    id: "FC-COL-02",
    category: "Colors",
    hindi: "हरा",
    santhali: "Hariyar",
    santhali_script: "ᱦᱟᱹᱨᱤᱭᱟᱹᱲ",
    santhali_phonetic: "हारियाड़",
    icon_or_emoji: "🟢",
    color_theme: "from-green-500/20 to-emerald-500/20",
    example_sentence_hindi: "हरा पत्ता",
    example_sentence_santhali: "Hariyar sakam"
  },
  {
    id: "FC-COL-03",
    category: "Colors",
    hindi: "पीला",
    santhali: "Sasang",
    santhali_script: "ᱥᱟᱥᱟᱝ",
    santhali_phonetic: "सासांग",
    icon_or_emoji: "🟡",
    color_theme: "from-yellow-500/20 to-amber-500/20",
    example_sentence_hindi: "पीला केला",
    example_sentence_santhali: "Sasang kayra"
  },
  {
    id: "FC-COL-04",
    category: "Colors",
    hindi: "सफेद",
    santhali: "Puṇḍ",
    santhali_script: "ᱯᱩᱸᱰ",
    santhali_phonetic: "पुंड",
    icon_or_emoji: "⚪",
    color_theme: "from-zinc-400/20 to-stone-400/20",
    example_sentence_hindi: "सफेद फूल",
    example_sentence_santhali: "Puṇḍ baha"
  },
  {
    id: "FC-COL-05",
    category: "Colors",
    hindi: "काला",
    santhali: "Hende",
    santhali_script: "ᱦᱮᱸᱫᱮ",
    santhali_phonetic: "हेंदे",
    icon_or_emoji: "⚫",
    color_theme: "from-gray-700/20 to-neutral-800/20",
    example_sentence_hindi: "काले बाल",
    example_sentence_santhali: "Hende ub"
  },
  {
    id: "FC-COL-06",
    category: "Colors",
    hindi: "नीला",
    santhali: "Nil",
    santhali_script: "ᱱᱤᱞ",
    santhali_phonetic: "नील",
    icon_or_emoji: "🔵",
    color_theme: "from-blue-500/20 to-indigo-500/20",
    example_sentence_hindi: "नीला आसमान",
    example_sentence_santhali: "Nil serma"
  },

  // Shapes
  {
    id: "FC-SHP-01",
    category: "Shapes",
    hindi: "गोल (वृत्त)",
    santhali: "Gulạṭ / Gol",
    santhali_script: "ᱜᱩᱞᱟᱹᱴ",
    santhali_phonetic: "गुलाट",
    icon_or_emoji: "⭕",
    color_theme: "from-orange-500/20 to-amber-500/20",
    example_sentence_hindi: "सूरज गोल है।",
    example_sentence_santhali: "Bêṛa do gulạṭgea."
  },
  {
    id: "FC-SHP-02",
    category: "Shapes",
    hindi: "त्रिकोण (तीन कोना)",
    santhali: "Pe-kona",
    santhali_script: "ᱯᱮ-ᱠᱳᱬᱟ",
    santhali_phonetic: "पे-कोणा",
    icon_or_emoji: "🔺",
    color_theme: "from-rose-500/20 to-red-500/20",
    example_sentence_hindi: "समोसा त्रिकोण होता है।",
    example_sentence_santhali: "Samosa pe-kona tahẽna."
  },
  {
    id: "FC-SHP-03",
    category: "Shapes",
    hindi: "चौकोर (चार कोना)",
    santhali: "Pun-kona",
    santhali_script: "ᱯᱩᱱ-ᱠᱳᱬᱟ",
    santhali_phonetic: "पुन-कोणा",
    icon_or_emoji: "⬛",
    color_theme: "from-cyan-500/20 to-teal-500/20",
    example_sentence_hindi: "किताब चौकोर है।",
    example_sentence_santhali: "Potob pun-konagea."
  },

  // School Objects
  {
    id: "FC-SCH-01",
    category: "School Objects",
    hindi: "किताब / पुस्तक",
    santhali: "Potob",
    santhali_script: "ᱯᱚᱛᱚᱵ",
    santhali_phonetic: "पोतोब",
    icon_or_emoji: "📖",
    color_theme: "from-blue-500/20 to-sky-500/20",
    example_sentence_hindi: "किताब खोलो।",
    example_sentence_santhali: "Potob jhir me."
  },
  {
    id: "FC-SCH-02",
    category: "School Objects",
    hindi: "कलम / पेंसिल",
    santhali: "Kalam / Ol-it'",
    santhali_script: "ᱠᱚᱞᱚᱢ",
    santhali_phonetic: "कोलोम",
    icon_or_emoji: "✏️",
    color_theme: "from-amber-500/20 to-orange-500/20",
    example_sentence_hindi: "पेंसिल से लिखो।",
    example_sentence_santhali: "Kalam te ol me."
  },
  {
    id: "FC-SCH-03",
    category: "School Objects",
    hindi: "स्लेट",
    santhali: "Slate",
    santhali_script: "ᱥᱞᱮᱴ",
    santhali_phonetic: "स्लेट",
    icon_or_emoji: "📋",
    color_theme: "from-slate-500/20 to-neutral-600/20",
    example_sentence_hindi: "स्लेट साफ़ करो।",
    example_sentence_santhali: "Slate sapha me."
  },
  {
    id: "FC-SCH-04",
    category: "School Objects",
    hindi: "स्कूल / विद्यालय",
    santhali: "Asṛa / Iskul",
    santhali_script: "ᱟᱥᱲᱟ",
    santhali_phonetic: "आसड़ा",
    icon_or_emoji: "🏫",
    color_theme: "from-emerald-500/20 to-green-500/20",
    example_sentence_hindi: "हम स्कूल जा रहे हैं।",
    example_sentence_santhali: "Abo asṛa bon calak' kana."
  },

  // Everyday Objects
  {
    id: "FC-EVE-01",
    category: "Everyday Objects",
    hindi: "पानी",
    santhali: "Da'",
    santhali_script: "ᱫᱟᱜ",
    santhali_phonetic: "दाग",
    icon_or_emoji: "💧",
    color_theme: "from-sky-500/20 to-cyan-500/20",
    example_sentence_hindi: "पानी पियो।",
    example_sentence_santhali: "Da' ñu me."
  },
  {
    id: "FC-EVE-02",
    category: "Everyday Objects",
    hindi: "हाथ",
    santhali: "Ti",
    santhali_script: "ᱛᱤ",
    santhali_phonetic: "ती",
    icon_or_emoji: "✋",
    color_theme: "from-orange-500/20 to-rose-500/20",
    example_sentence_hindi: "हाथ धो लो।",
    example_sentence_santhali: "Ti arup' me."
  },
  {
    id: "FC-EVE-03",
    category: "Everyday Objects",
    hindi: "पेड़ / वृक्ष",
    santhali: "Dare",
    santhali_script: "ᱫᱟᱨᱮ",
    santhali_phonetic: "दारे",
    icon_or_emoji: "🌳",
    color_theme: "from-emerald-500/20 to-teal-500/20",
    example_sentence_hindi: "हरा पेड़।",
    example_sentence_santhali: "Hariyar dare."
  },
  {
    id: "FC-EVE-04",
    category: "Everyday Objects",
    hindi: "फूल",
    santhali: "Baha",
    santhali_script: "ᱵᱟᱦᱟ",
    santhali_phonetic: "बाहा",
    icon_or_emoji: "🌸",
    color_theme: "from-pink-500/20 to-rose-500/20",
    example_sentence_hindi: "सुंदर फूल।",
    example_sentence_santhali: "Chehra baha."
  }
];
