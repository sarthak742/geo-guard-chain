import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslatableContent {
  [key: string]: string;
}

export const useTranslateContent = (originalContent: TranslatableContent) => {
  const { i18n } = useTranslation();
  const [translatedContent, setTranslatedContent] = useState<TranslatableContent>(originalContent);
  const [isTranslating, setIsTranslating] = useState(false);

  const translateContentRecursive = useCallback(async (content: TranslatableContent, targetLang: string): Promise<TranslatableContent> => {
    // Static translations only - return original content
    return content;
  }, []);

  const translateContent = useCallback(async (targetLang: string) => {
    if (targetLang === 'en') {
      setTranslatedContent(originalContent);
      return;
    }

    setIsTranslating(true);
    try {
      const translated = await translateContentRecursive(originalContent, targetLang);
      setTranslatedContent(translated);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedContent(originalContent);
    } finally {
      setIsTranslating(false);
    }
  }, [originalContent, translateContentRecursive]);

  useEffect(() => {
    translateContent(i18n.language);
  }, [i18n.language, translateContent]);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      translateContent(event.detail.language);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [translateContent]);

  return { translatedContent, isTranslating };
};