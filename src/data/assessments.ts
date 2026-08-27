import { AssessmentQuestion } from '../types';

export const INITIAL_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "ASSESS-01",
    category: "Counting",
    type: "counting",
    question_hindi: "चित्र में कितने सेब हैं? गिनो और सही संख्या चुनो।",
    question_santhali: "Chitra re tinak' seb menak'a? Lekhaye me ar sahi number bachhao me.",
    santhali_script: "ᱪᱤᱛᱟᱹᱨ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱥᱮᱵᱽ ᱢᱮᱱᱟᱜ-ᱟ? ᱞᱮᱠᱷᱟᱭ ᱢᱮ ᱟᱨ ᱥᱟᱹᱦᱤ ᱮᱞ ᱵᱟᱪᱷᱟᱣ ᱢᱮ᱾",
    visual_items: ["🍎", "🍎", "🍎"],
    options: [
      { id: "opt-1", text_hindi: "2 (दो)", text_santhali: "ᱵᱟᱨ (Bar)", text_olchiki: "᱒", isCorrect: false },
      { id: "opt-2", text_hindi: "3 (तीन)", text_santhali: "ᱯᱮ (Pe)", text_olchiki: "᱓", isCorrect: true },
      { id: "opt-3", text_hindi: "4 (चार)", text_santhali: "ᱯᱩᱱ (Pun)", text_olchiki: "᱔", isCorrect: false }
    ],
    explanation_hindi: "सही उत्तर 3 (तीन) है। संथाली में इसे 'ᱯᱮ (Pe)' कहते हैं।",
    explanation_santhali: "Sahi utar do 3 kana. Santhali te 'Pe' (ᱯᱮ) bon meta-a."
  },
  {
    id: "ASSESS-02",
    category: "Animals",
    type: "mcq",
    question_hindi: "गाय 🐄 को संथाली में क्या कहते हैं?",
    question_santhali: "Gai do Santhali te ched bon meta-a?",
    santhali_script: "ᱜᱟᱹᱭ ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱵᱚᱱ ᱢᱮᱛᱟᱭᱟ?",
    visual_items: ["🐄"],
    options: [
      { id: "a2-1", text_hindi: "गाई (Gai)", text_santhali: "ᱜᱟᱹᱭ (Gai)", text_olchiki: "ᱜᱟᱹᱭ", isCorrect: true },
      { id: "a2-2", text_hindi: "सेता (Seta)", text_santhali: "ᱥᱮᱛᱟ (Seta)", text_olchiki: "ᱥᱮᱛᱟ", isCorrect: false },
      { id: "a2-3", text_hindi: "मेरोम (Merom)", text_santhali: "ᱢᱮᱨᱚᱢ (Merom)", text_olchiki: "ᱢᱮᱨᱚᱢ", isCorrect: false }
    ],
    explanation_hindi: "गाय को संथाली में 'गाई' (ᱜᱟᱹᱭ) कहते हैं। सेता कुत्ते को और मेरोम बकरी को कहते हैं।",
    explanation_santhali: "Gai do 'Gai' ge bon meta-a. Seta do dog ar Merom do goat."
  },
  {
    id: "ASSESS-03",
    category: "Shapes",
    type: "shapes",
    question_hindi: "इनमें से 'गोल' (Circle / ᱜᱩᱞᱟᱹᱴ) आकार कौन सा है?",
    question_santhali: "Nowa mud re 'Gulạt' (Round) shape do okoeag kana?",
    santhali_script: "ᱱᱚᱶᱟ ᱢᱩᱫᱽ ᱨᱮ 'ᱜᱩᱞᱟᱹᱴ' ᱪᱤᱛᱟᱹᱨ ᱫᱚ ᱚᱠᱚᱭᱟᱜ ᱠᱟᱱᱟ?",
    visual_items: ["⭕", "🔺", "⬛"],
    options: [
      { id: "a3-1", text_hindi: "पहला (Circle ⭕)", text_santhali: "ᱜᱩᱞᱟᱹᱴ (Gulạt)", visual: "⭕", isCorrect: true },
      { id: "a3-2", text_hindi: "दूसरा (Triangle 🔺)", text_santhali: "ᱯᱮ-ᱠᱳᱬᱟ (Pe-kona)", visual: "🔺", isCorrect: false },
      { id: "a3-3", text_hindi: "तीसरा (Square ⬛)", text_santhali: "ᱯᱩᱱ-ᱠᱳᱬᱟ (Pun-kona)", visual: "⬛", isCorrect: false }
    ],
    explanation_hindi: "गोल को संथाली में 'गुलाट' (ᱜᱩᱞᱟᱹᱴ) कहते हैं।",
    explanation_santhali: "Gulạt do round/circle shape kana."
  },
  {
    id: "ASSESS-04",
    category: "Colors",
    type: "colors",
    question_hindi: "पत्ते 🍃 का रंग 'हरा' होता है। संथाली में हरे रंग को क्या कहते हैं?",
    question_santhali: "Sakam reak' color do 'Hara' tahẽna. Santhali te ched bon meta-a?",
    santhali_script: "ᱥᱟᱠᱟᱢ ᱨᱮᱭᱟᱜ ᱨᱚᱝ ᱫᱚ 'ᱦᱟᱹᱨᱤᱭᱟᱹᱲ' ᱛᱟᱦᱮᱸᱱᱟ᱾",
    visual_items: ["🍃", "🟢"],
    options: [
      { id: "a4-1", text_hindi: "आराग (Arak' - लाल)", text_santhali: "ᱟᱨᱟᱜ (Arak')", isCorrect: false },
      { id: "a4-2", text_hindi: "हारियाड़ (Hariyar - हरा)", text_santhali: "ᱦᱟᱹᱨᱤᱭᱟᱹᱲ (Hariyar)", isCorrect: true },
      { id: "a4-3", text_hindi: "सासांग (Sasang - पीला)", text_santhali: "ᱥᱟᱥᱟᱝ (Sasang)", isCorrect: false }
    ],
    explanation_hindi: "हरे रंग को संथाली में 'हारियाड़' (ᱦᱟᱹᱨᱤᱭᱟᱹᱲ) कहते हैं।",
    explanation_santhali: "Green color do Santhali te 'Hariyar' (ᱦᱟᱹᱨᱤᱭᱟᱹᱲ) bon meta-a."
  },
  {
    id: "ASSESS-05",
    category: "Comparison",
    type: "comparison",
    question_hindi: "हाथी 🐘 और बिल्ली 🐱 में कौन 'बड़ा' (Maraṅ) है?",
    question_santhali: "Hati ar Pusi mud re okoeag 'Maraṅa'?",
    santhali_script: "ᱦᱟᱹᱛᱤ ᱟᱨ ᱯᱩᱥᱤ ᱢᱩᱫᱽ ᱨᱮ ᱚᱠᱚᱭᱟᱜ 'ᱢᱟᱨᱟᱝ-ᱟ'?",
    visual_items: ["🐘", "🐱"],
    options: [
      { id: "a5-1", text_hindi: "हाथी (Elephant 🐘)", text_santhali: "ᱦᱟᱹᱛᱤ (Hati)", isCorrect: true },
      { id: "a5-2", text_hindi: "बिल्ली (Cat 🐱)", text_santhali: "ᱯᱩᱥᱤ (Pusi)", isCorrect: false }
    ],
    explanation_hindi: "हाथी बड़ा (ᱢᱟᱨᱟᱝ) है और बिल्ली छोटी (ᱦᱩᱰᱤᱧ) है।",
    explanation_santhali: "Hati do maraṅgea."
  }
];
