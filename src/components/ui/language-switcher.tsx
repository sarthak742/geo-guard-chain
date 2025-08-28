import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { toast } from "sonner";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    toast.success(t('messages.languageChanged'));
  };

  return (
    <div className="flex items-center gap-1 rounded-md border p-1">
      <Button
        variant={i18n.language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("en")}
        className="h-8 px-2"
      >
        EN
      </Button>
      <Button
        variant={i18n.language === "hi" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("hi")}
        className="h-8 px-2"
      >
        हिं
      </Button>
    </div>
  );
};