import { translate } from '@vitalets/google-translate-api';

export async function translateText(text: string, targetLang: string): Promise<string> {
  // Return original text if it's English or empty
  if (targetLang === 'en' || !text || !text.trim()) {
    return text;
  }

  try {
    const res = await translate(text, { to: targetLang });
    return res.text;
  } catch (err) {
    console.error("Translation error:", err);
    return text; // fallback to original
  }
}

export async function translateObject(obj: any, targetLang: string): Promise<any> {
  if (targetLang === 'en') return obj;
  
  const translated: any = {};
  
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      translated[key] = await translateText(obj[key], targetLang);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      translated[key] = await translateObject(obj[key], targetLang);
    } else {
      translated[key] = obj[key];
    }
  }
  
  return translated;
}