import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";
import { toast } from "sonner";
import { translateText } from "@/utils/translateText";
import { useState, useEffect } from "react";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
];

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isTranslating, setIsTranslating] = useState(false);

  const changeLanguage = async (lng: string) => {
    if (lng === i18n.language || isTranslating) return;
    
    setIsTranslating(true);
    try {
      await i18n.changeLanguage(lng);
      
      // Trigger translation of current page content
      const event = new CustomEvent('languageChange', { detail: { language: lng } });
      window.dispatchEvent(event);
      
      const selectedLang = languages.find(l => l.code === lng);
      const successMessage = lng === 'en' 
        ? 'Language switched to English' 
        : await translateText('Language switched successfully', lng);
      
      toast.success(successMessage);
    } catch (error) {
      console.error('Language change error:', error);
      toast.error('Failed to change language');
    } finally {
      setIsTranslating(false);
    }
  };

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Select value={i18n.language} onValueChange={changeLanguage} disabled={isTranslating}>
        <SelectTrigger className="w-[120px] h-8">
          <SelectValue>
            {isTranslating ? "..." : currentLanguage.native}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{lang.native}</span>
                <span className="text-xs text-muted-foreground">{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};