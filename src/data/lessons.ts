import { FLNLesson } from '../types';

export const INITIAL_LESSONS: FLNLesson[] = [
  {
    id: "LESSON-MATH-01",
    title: "Counting 1 to 10 (1 से 10 तक गिनती)",
    subject: "Mathematics",
    topic: "Counting",
    class: "Class 1",
    icon: "🔢",
    learning_outcome: "Learner recognizes numbers 1–10 and counts objects with 1-to-1 correspondence.",
    nipun_outcome_id: "FLN-MATH-NUM-01",
    teacher_script_hindi: "बच्चों, आज हम 1 से 10 तक गिनना सीखेंगे। इन वस्तुओं को गिनो।",
    santhali_translation: "Babumay ko, teheñ do 1 khon 10 dhabi' lekha bon seṛayea. Nowa jinis ko lekhaye pe.",
    santhali_script: "ᱵᱟᱹᱵᱩ-ᱢᱟᱹᱭ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱫᱚ ᱑ ᱠᱷᱚᱱ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱥᱮᱬᱟᱭᱟ᱾ ᱱᱚᱶᱟ ᱡᱤᱱᱤᱥ ᱠᱚ ᱞᱮᱠᱷᱟᱭ ᱯᱮ᱾",
    santhali_phonetic: "बाबू-मई को, तेहें दो 1 खोन 10 धाबिज लेखा बोन सेड़ाया। नोवा जिनिस को लेखाय पे।",
    activity_type: "counting",
    activity: {
      title: "Apple Counter (सेब गिनो)",
      prompt_hindi: "स्क्रीन पर सेबों को ध्यान से गिनो।",
      prompt_santhali: "Screen re seb ko dhian kate lekhaye pe.",
      items_visual: ["🍎", "🍎", "🍎", "🍎", "🍎"],
      question_hindi: "यहाँ कितने सेब हैं?",
      question_santhali: "Nonde tinak' seb menak'a?",
      options: [
        { id: "opt-1", label_hindi: "3 (तीन)", label_santhali: "᱓ (ᱯᱮ / Pe)", isCorrect: false },
        { id: "opt-2", label_hindi: "5 (पाँच)", label_santhali: "᱕ (ᱢᱚᱬᱮ / Mōṛē)", isCorrect: true },
        { id: "opt-3", label_hindi: "4 (चार)", label_santhali: "᱔ (ᱯᱩᱱ / Pun)", isCorrect: false },
        { id: "opt-4", label_hindi: "6 (छह)", label_santhali: "᱖ (ᱛᱩᱨᱩᱭ / Turui)", isCorrect: false }
      ],
      explanation_hindi: "बहुत अच्छा! यहाँ कुल 5 सेब हैं। संथाली में 5 को 'मोड़े' (ᱢᱚᱬᱮ) कहते हैं।",
      explanation_santhali: "Aḍi napay! Nonde mot 5-goteć seb menak'a (ᱢᱚᱬᱮ)᱾"
    },
    practice_exercises: [
      {
        id: "P1",
        hindi: "3 आम गिनो।",
        santhali: "3-goteć uli lekhaye me.",
        santhali_script: "᱓ ᱜᱚᱴᱮᱡ ᱩᱞᱤ ᱞᱮᱠᱷᱟᱭ ᱢᱮ᱾",
        visual: "🥭 🥭 🥭"
      },
      {
        id: "P2",
        hindi: "4 चिड़िया गिनो।",
        santhali: "4-goteć cheṇe lekhaye me.",
        santhali_script: "᱔ ᱜᱚᱴᱮᱡ ᱪᱮᱬᱮ ᱞᱮᱠᱷᱟᱭ ᱢᱮ᱾",
        visual: "🐦 🐦 🐦 🐦"
      },
      {
        id: "P3",
        hindi: "2 फूल गिनो।",
        santhali: "2-goteć baha lekhaye me.",
        santhali_script: "᱒ ᱜᱚᱴᱮᱡ ᱵᱟᱦᱟ ᱞᱮᱠᱷᱟᱭ ᱢᱮ᱾",
        visual: "🌸 🌸"
      }
    ],
    assessment: {
      question_hindi: "कितने तारे हैं? ⭐️ ⭐️ ⭐️",
      question_santhali: "Tinak' ipil menak'koa? ⭐️ ⭐️ ⭐️",
      options: [
        { id: "a1", text_hindi: "2 (दो)", text_santhali: "ᱵᱟᱨ (Bar)", isCorrect: false },
        { id: "a2", text_hindi: "3 (तीन)", text_santhali: "ᱯᱮ (Pe)", isCorrect: true },
        { id: "a3", text_hindi: "4 (चार)", text_santhali: "ᱯᱩᱱ (Pun)", isCorrect: false }
      ],
      hint: "संथाली में 3 को 'ᱯᱮ (Pe)' कहते हैं।"
    }
  },
  {
    id: "LESSON-MATH-02",
    title: "Comparison: Big and Small (बड़ा और छोटा)",
    subject: "Mathematics",
    topic: "Comparison",
    class: "Class 1",
    icon: "🐘",
    learning_outcome: "Learner compares relative sizes of two objects and identifies larger (Maraṅ) vs smaller (Huḍiñ).",
    nipun_outcome_id: "FLN-MATH-CMP-01",
    teacher_script_hindi: "बच्चों, चित्रों को देखो और बताओ कौन बड़ा है और कौन छोटा है।",
    santhali_translation: "Babumay ko, chitra ɲel pe ar lai pe okoeag maraṅa ar okoeag huḍiña.",
    santhali_script: "ᱵᱟᱹᱵᱩ-ᱢᱟᱹᱭ ᱠᱚ, ᱪᱤᱛᱟᱹᱨ ᱧᱮᱞ ᱯᱮ ᱟᱨ ᱞᱟᱹᱭ ᱯᱮ ᱚᱠᱚᱭᱟᱜ ᱢᱟᱨᱟᱝ-ᱟ ᱟᱨ ᱚᱠᱚᱭᱟᱜ ᱦᱩᱰᱤᱧ-ᱟ᱾",
    santhali_phonetic: "बाबू-मई को, चितर ञेल पे आर लई पे ओकोयाग मारांग-आ आर ओकोयाग हुड़िंञ-आ।",
    activity_type: "comparison",
    activity: {
      title: "Size Comparison (आकार की तुलना)",
      prompt_hindi: "हाथी 🐘 और बकरी 🐐 को देखो।",
      prompt_santhali: "Hati ar merom ɲel kin me.",
      items_visual: ["🐘 (हाथी / Hati)", "🐐 (बकरी / Merom)"],
      question_hindi: "कौन बड़ा है?",
      question_santhali: "Okoeag maraṅa?",
      options: [
        { id: "c1", label_hindi: "हाथी (बड़ा)", label_santhali: "ᱦᱟᱹᱛᱤ (ᱢᱟᱨᱟᱝ / Maraṅ)", isCorrect: true },
        { id: "c2", label_hindi: "बकरी (छोटा)", label_santhali: "ᱢᱮᱨᱚᱢ (ᱦᱩᱰᱤᱧ / Huḍiñ)", isCorrect: false }
      ],
      explanation_hindi: "बिल्कुल सही! हाथी बड़ा (ᱢᱟᱨᱟᱝ) है और बकरी छोटी (ᱦᱩᱰᱤᱧ) है।",
      explanation_santhali: "Sahi! Hati do maraṅgea ar merom do huḍiñgea."
    },
    practice_exercises: [
      {
        id: "CP1",
        hindi: "बड़ा पेड़ खोजो।",
        santhali: "Maraṅ dare panja me.",
        santhali_script: "ᱢᱟᱨᱟᱝ ᱫᱟᱨᱮ ᱯᱟᱧᱡᱟᱭ ᱢᱮ᱾",
        visual: "🌳 (बड़ा) vs 🌱 (छोटा)"
      },
      {
        id: "CP2",
        hindi: "छोटी गेंद खोजो।",
        santhali: "Huḍiñ ball panja me.",
        santhali_script: "ᱦᱩᱰᱤᱧ ᱵᱚᱞ ᱯᱟᱧᱡᱟᱭ ᱢᱮ᱾",
        visual: "⚽ (बड़ा) vs 🎾 (छोटा)"
      }
    ],
    assessment: {
      question_hindi: "संथाली में 'बड़ा' को क्या कहते हैं?",
      question_santhali: "Santhali te 'Bada' do ched mena?",
      options: [
        { id: "cmp-a1", text_hindi: "मरांग (Maraṅ)", text_santhali: "ᱢᱟᱨᱟᱝ", isCorrect: true },
        { id: "cmp-a2", text_hindi: "हुड़िंज (Huḍiñ)", text_santhali: "ᱦᱩᱰᱤᱧ", isCorrect: false },
        { id: "cmp-a3", text_hindi: "जिलिंग (Jiliñ)", text_santhali: "ᱡᱤᱞᱤᱧ", isCorrect: false }
      ],
      hint: "बड़ा = Maraṅ (ᱢᱟᱨᱟᱝ), छोटा = Huḍiñ (ᱦᱩᱰᱤᱧ)"
    }
  },
  {
    id: "LESSON-MATH-03",
    title: "Basic 2D Shapes (मूल आकार)",
    subject: "Mathematics",
    topic: "Shapes",
    class: "Class 1",
    icon: "⭕",
    learning_outcome: "Learner identifies circle, triangle, and square shapes in everyday environment.",
    nipun_outcome_id: "FLN-MATH-SHP-01",
    teacher_script_hindi: "बच्चों, इन आकारों को पहचानो - गोल, त्रिकोण, और चौकोर।",
    santhali_translation: "Babumay ko, nowa shape ko chinhav pe - gulạt, pe-kona, ar pun-kona.",
    santhali_script: "ᱵᱟᱹᱵᱩ-ᱢᱟᱹᱭ ᱠᱚ, ᱱᱚᱶᱟ ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱪᱤᱱᱦᱟᱹᱣ ᱯᱮ - ᱜᱩᱞᱟᱹᱴ, ᱯᱮ-ᱠᱳᱬᱟ, ᱟᱨ ᱯᱩᱱ-ᱠᱳᱬᱟ᱾",
    santhali_phonetic: "बाबू-मई को, नोवा रूप को चिन्हव पे - गुलाट, पे-कोणा, आर पुन-कोणा।",
    activity_type: "shapes_colors",
    activity: {
      title: "Shape Identifier (आकार पहचान)",
      prompt_hindi: "चित्र में गोल आकार चुनो।",
      prompt_santhali: "Chitra re gulạt shape bachhao me.",
      items_visual: ["⭕ (गोल)", "🔺 (त्रिकोण)", "⬛ (चौकोर)"],
      question_hindi: "सूरज का आकार कैसा होता है?",
      question_santhali: "Bêṛa reak' shape do ceka lekana?",
      options: [
        { id: "sh-1", label_hindi: "गोल (Circle)", label_santhali: "ᱜᱩᱞᱟᱹᱴ (Gulạṭ)", isCorrect: true },
        { id: "sh-2", label_hindi: "त्रिकोण (Triangle)", label_santhali: "ᱯᱮ-ᱠᱳᱬᱟ (Pe-kona)", isCorrect: false },
        { id: "sh-3", label_hindi: "चौकोर (Square)", label_santhali: "ᱯᱩᱱ-ᱠᱳᱬᱟ (Pun-kona)", isCorrect: false }
      ],
      explanation_hindi: "शानदार! सूरज और रोटी का आकार गोल (ᱜᱩᱞᱟᱹᱴ) होता है।",
      explanation_santhali: "Aḍi bhes! Bêṛa ar roti do gulạtgea."
    },
    practice_exercises: [
      {
        id: "SHP1",
        hindi: "समोसा 🔺 तीन कोना (Pe-kona) होता है।",
        santhali: "Samosa do pe-konagea.",
        santhali_script: "ᱥᱟᱢᱳᱥᱟ ᱫᱚ ᱯᱮ-ᱠᱳᱬᱟ ᱜᱮᱭᱟ᱾",
        visual: "🔺"
      },
      {
        id: "SHP2",
        hindi: "स्लेट ⬛ चार कोना (Pun-kona) होती है।",
        santhali: "Slate do pun-konagea.",
        santhali_script: "ᱥᱞᱮᱴ ᱫᱚ ᱯᱩᱱ-ᱠᱳᱬᱟ ᱜᱮᱭᱟ᱾",
        visual: "⬛"
      }
    ],
    assessment: {
      question_hindi: "3 कोनों वाले आकार को संथाली में क्या कहते हैं?",
      question_santhali: "3 kona menak' shape do ched bon meta-a?",
      options: [
        { id: "sh-a1", text_hindi: "पे-कोणा (Pe-kona)", text_santhali: "ᱯᱮ-ᱠᱳᱬᱟ", isCorrect: true },
        { id: "sh-a2", text_hindi: "गुलाट (Gulạṭ)", text_santhali: "ᱜᱩᱞᱟᱹᱴ", isCorrect: false },
        { id: "sh-a3", text_hindi: "पुन-कोणा (Pun-kona)", text_santhali: "ᱯᱩᱱ-ᱠᱳᱬᱟ", isCorrect: false }
      ],
      hint: "3 = Pe, कोना = Kona $\\to$ Pe-kona"
    }
  },
  {
    id: "LESSON-LANG-01",
    title: "Classroom Greetings & Manners (कक्षा अभिवादन)",
    subject: "Language",
    topic: "Listening & Speaking",
    class: "Class 1",
    icon: "🤝",
    learning_outcome: "Learner greets teacher and responds respectfully in mother tongue and Hindi.",
    nipun_outcome_id: "FLN-LANG-SPK-01",
    teacher_script_hindi: "नमस्ते बच्चों! सब लोग बैठ जाओ और ध्यान से सुनो।",
    santhali_translation: "Johar babumay ko! Joto hoṛ duṛup' pe ar dhian kate anjom pe.",
    santhali_script: "ᱡᱚᱦᱟᱨ ᱵᱟᱹᱵᱩ-ᱢᱟᱹᱭ ᱠᱚ! ᱡᱚᱛᱚ ᱦᱚᱲ ᱫᱩᱲᱩᱵ ᱯᱮ ᱟᱨ ᱫᱷᱤᱭᱟᱱ ᱠᱟᱛᱮ ᱟᱧᱡᱚᱢ ᱯᱮ᱾",
    santhali_phonetic: "जोहार बाबू-मई को! जोतो होड़ दुड़ुब पे आर धियान काते आंजोम पे।",
    activity_type: "phonics",
    activity: {
      title: "Greeting Match (अभिवादन अभ्यास)",
      prompt_hindi: "शिक्षक के अभिवादन का उत्तर दो।",
      prompt_santhali: "Macho reak' johar reak' utar em pe.",
      items_visual: ["🏫 (कक्षा / Classroom)", "🤝 (अभिवादन / Johar)"],
      question_hindi: "संथाली में आदरपूर्वक 'नमस्ते' कैसे कहते हैं?",
      question_santhali: "Santhali te 'Namaste' do ceka leka bon mena?",
      options: [
        { id: "gr-1", label_hindi: "जोहार (Johar)", label_santhali: "ᱡᱚᱦᱟᱨ (Johar)", isCorrect: true },
        { id: "gr-2", label_hindi: "दुड़ुब मे (Duṛup' me)", label_santhali: "ᱫᱩᱲᱩᱵ ᱢᱮ", isCorrect: false },
        { id: "gr-3", label_hindi: "थिर ताहेन (Thir tahẽn)", label_santhali: "ᱛᱷᱤᱨ ᱛᱟᱦᱮᱸᱱ", isCorrect: false }
      ],
      explanation_hindi: "अति उत्तम! संथाली में पारंपरिक आदरसूचक अभिवादन 'जोहार' (ᱡᱚᱦᱟᱨ) है।",
      explanation_santhali: "Aḍi napay! Santhali te mukhiya johar do 'Johar' ge."
    },
    practice_exercises: [
      {
        id: "GR1",
        hindi: "खड़े हो जाओ।",
        santhali: "Tiṅgun me.",
        santhali_script: "ᱛᱤᱸᱜᱩᱱ ᱢᱮ᱾"
      },
      {
        id: "GR2",
        hindi: "अपनी किताब खोलो।",
        santhali: "Apnarag potob jhir me.",
        santhali_script: "ᱟᱯᱱᱟᱨᱟᱜ ᱯᱚᱛᱚᱵ ᱡᱷᱤᱡ ᱢᱮ᱾"
      },
      {
        id: "GR3",
        hindi: "बहुत अच्छा!",
        santhali: "Aḍi napay!",
        santhali_script: "ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ!"
      }
    ],
    assessment: {
      question_hindi: "शिक्षक के 'खड़े हो जाओ' कहने पर संथाली में क्या बोलेंगे?",
      question_santhali: "Teacher 'Khade ho jao' men khan Santhali te ceka menoka?",
      options: [
        { id: "as-gr1", text_hindi: "तिंगुन मे (Tiṅgun me)", text_santhali: "ᱛᱤᱸᱜᱩᱱ ᱢᱮ", isCorrect: true },
        { id: "as-gr2", text_hindi: "दुड़ुब मे (Duṛup' me)", text_santhali: "ᱫᱩᱲᱩᱵ ᱢᱮ", isCorrect: false }
      ],
      hint: "खड़ा होना = Tiṅgun (ᱛᱤᱸᱜᱩᱱ)"
    }
  }
];
