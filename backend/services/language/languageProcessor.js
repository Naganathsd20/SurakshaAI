/**
 * SurakshaAI — Phase 5 Language Processing Service
 * Script identification, Unicode normalization, language metadata, and text preparation.
 */

const LANGUAGE_MAP = {
  hi: { code: 'hi', name: 'Hindi', native: 'हिन्दी', script: 'DEVANAGARI' },
  kn: { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', script: 'KANNADA' },
  ta: { code: 'ta', name: 'Tamil', native: 'தமிழ்', script: 'TAMIL' },
  te: { code: 'te', name: 'Telugu', native: 'తెలుగు', script: 'TELUGU' },
  mr: { code: 'mr', name: 'Marathi', native: 'मराठी', script: 'DEVANAGARI' },
  bn: { code: 'bn', name: 'Bengali', native: 'বাংলা', script: 'BENGALI' },
  en: { code: 'en', name: 'English', native: 'English', script: 'LATIN' },
  mixed: { code: 'mixed', name: 'Code-Mixed / Transliterated', native: 'Hinglish / Kanglish', script: 'LATIN' }
};

// Unicode Character Range Regexes
const SCRIPT_PATTERNS = {
  DEVANAGARI: /[\u0900-\u097F]/g,
  KANNADA: /[\u0C80-\u0CFF]/g,
  TAMIL: /[\u0B80-\u0BFF]/g,
  TELUGU: /[\u0C00-\u0C7F]/g,
  BENGALI: /[\u0980-\u09FF]/g,
  LATIN: /[a-zA-Z]/g
};

/**
 * Normalizes text for downstream NLP processing
 * Preserves original message while composition-normalizing Indic Unicode
 */
const normalizeText = (text = '') => {
  if (!text || typeof text !== 'string') return '';
  return text
    .normalize('NFC')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Identifies primary script and matches intended regional language
 */
const detectLanguageAndScript = (text = '', userSelectedLang = 'hi') => {
  const normalized = normalizeText(text);
  if (!normalized) {
    const defaultMeta = LANGUAGE_MAP[userSelectedLang] || LANGUAGE_MAP.en;
    return {
      code: defaultMeta.code,
      name: defaultMeta.name,
      selectedLanguage: userSelectedLang,
      detectedLanguage: defaultMeta.code,
      scriptType: defaultMeta.script,
      confidence: 1.0,
      isFallback: true
    };
  }

  // Count character matches per script
  const counts = {
    DEVANAGARI: (normalized.match(SCRIPT_PATTERNS.DEVANAGARI) || []).length,
    KANNADA: (normalized.match(SCRIPT_PATTERNS.KANNADA) || []).length,
    TAMIL: (normalized.match(SCRIPT_PATTERNS.TAMIL) || []).length,
    TELUGU: (normalized.match(SCRIPT_PATTERNS.TELUGU) || []).length,
    BENGALI: (normalized.match(SCRIPT_PATTERNS.BENGALI) || []).length,
    LATIN: (normalized.match(SCRIPT_PATTERNS.LATIN) || []).length
  };

  const totalLetters = Object.values(counts).reduce((a, b) => a + b, 0);

  if (totalLetters === 0) {
    const selectedMeta = LANGUAGE_MAP[userSelectedLang] || LANGUAGE_MAP.en;
    return {
      code: selectedMeta.code,
      name: selectedMeta.name,
      selectedLanguage: userSelectedLang,
      detectedLanguage: selectedMeta.code,
      scriptType: selectedMeta.script,
      confidence: 0.5,
      isFallback: true
    };
  }

  // Determine dominant script
  let dominantScript = 'LATIN';
  let maxCount = 0;

  for (const [script, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantScript = script;
    }
  }

  const confidence = Math.min(parseFloat((maxCount / totalLetters).toFixed(2)), 1.0);

  // Map dominant script to language code
  let detectedCode = 'en';
  if (dominantScript === 'DEVANAGARI') {
    detectedCode = userSelectedLang === 'mr' ? 'mr' : 'hi';
  } else if (dominantScript === 'KANNADA') {
    detectedCode = 'kn';
  } else if (dominantScript === 'TAMIL') {
    detectedCode = 'ta';
  } else if (dominantScript === 'TELUGU') {
    detectedCode = 'te';
  } else if (dominantScript === 'BENGALI') {
    detectedCode = 'bn';
  } else if (dominantScript === 'LATIN') {
    // Check if Latin text contains transliterated Indic keywords (Hinglish/Kanglish)
    const lower = normalized.toLowerCase();
    const isTransliteratedIndic = /\b(aapka|khata|block|ho jayega|turant|karein|nimma|haṇa|otpi|pāvatis|b\.\.\.|kyc|pan)\b/i.test(lower);
    if (isTransliteratedIndic && userSelectedLang !== 'en') {
      detectedCode = userSelectedLang; // Transliterated regional message
    } else {
      detectedCode = 'en';
    }
  }

  const langMeta = LANGUAGE_MAP[detectedCode] || LANGUAGE_MAP.en;

  return {
    code: langMeta.code,
    name: langMeta.name,
    selectedLanguage: userSelectedLang,
    detectedLanguage: detectedCode,
    scriptType: dominantScript,
    confidence: confidence,
    isFallback: false
  };
};

module.exports = {
  normalizeText,
  detectLanguageAndScript,
  LANGUAGE_MAP
};
