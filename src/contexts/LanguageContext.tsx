import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation & Header
    "nav.dashboard": "Dashboard",
    "nav.map": "Safety Map", 
    "nav.incidents": "Report",
    "nav.admin": "Admin",
    "app.title": "Geo-Safe-Chain",
    "app.subtitle": "Tourist Safety Platform",
    
    // Tourist Dashboard
    "tourist.welcome": "Welcome",
    "tourist.digitalId": "Digital ID Verified",
    "tourist.emergency": "Emergency SOS",
    "tourist.emergencyDesc": "One-tap emergency assistance",
    "tourist.smartGuidance": "Smart Guidance",
    "tourist.recommendation": "Recommendation",
    "tourist.headsUp": "Heads Up",
    "tourist.digitalIdAction": "Digital ID",
    "tourist.safeRoutes": "Safe Routes",
    "tourist.emergencyContacts": "Emergency Contacts",
    "tourist.reportIssue": "Report Issue",
    
    // Risk & Safety
    "risk.score": "Risk Score",
    "risk.factors": "Risk Factors",
    "safety.zones": "Safety Zones",
    "safety.safe": "Safe",
    "safety.caution": "Caution", 
    "safety.restricted": "Restricted",
    
    // SOS & Alerts
    "sos.activated": "SOS ACTIVATED",
    "sos.help": "Emergency services have been notified. Help is on the way!",
    "sos.notified": "Emergency services notified",
    "sos.stayCalm": "Stay calm. Help is on the way.",
    
    // Admin Console
    "admin.title": "Admin Operations Center",
    "admin.subtitle": "Real-time incident monitoring & response",
    "admin.systemOnline": "System Online",
    "admin.activeTourists": "Active Tourists",
    "admin.openIncidents": "Open Incidents",
    "admin.avgResponse": "Avg Response",
    "admin.safetyScore": "Safety Score",
    "admin.incidentFeed": "Live Incident Feed",
    "admin.analytics": "Analytics Dashboard",
    
    // Incidents
    "incident.report": "Report Incident",
    "incident.type": "Incident Type",
    "incident.description": "Description",
    "incident.location": "Location",
    "incident.submit": "Submit Report",
    "incident.submitted": "Incident Reported",
    "incident.hash": "Blockchain hash",
    
    // Common
    "common.view": "View",
    "common.dispatch": "Dispatch", 
    "common.resolve": "Resolve",
    "common.close": "Close",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
  },
  hi: {
    // Navigation & Header
    "nav.dashboard": "डैशबोर्ड",
    "nav.map": "सुरक्षा मानचित्र",
    "nav.incidents": "रिपोर्ट",
    "nav.admin": "एडमिन",
    "app.title": "जियो-सेफ-चेन",
    "app.subtitle": "पर्यटक सुरक्षा प्लेटफॉर्म",
    
    // Tourist Dashboard
    "tourist.welcome": "स्वागत",
    "tourist.digitalId": "डिजिटल आईडी सत्यापित",
    "tourist.emergency": "आपातकालीन SOS",
    "tourist.emergencyDesc": "एक-क्लिक आपातकालीन सहायता",
    "tourist.smartGuidance": "स्मार्ट मार्गदर्शन",
    "tourist.recommendation": "सिफारिश",
    "tourist.headsUp": "सावधान",
    "tourist.digitalIdAction": "डिजिटल आईडी",
    "tourist.safeRoutes": "सुरक्षित मार्ग",
    "tourist.emergencyContacts": "आपातकालीन संपर्क",
    "tourist.reportIssue": "समस्या रिपोर्ट करें",
    
    // Risk & Safety
    "risk.score": "जोखिम स्कोर",
    "risk.factors": "जोखिम कारक",
    "safety.zones": "सुरक्षा क्षेत्र",
    "safety.safe": "सुरक्षित",
    "safety.caution": "सावधानी",
    "safety.restricted": "प्रतिबंधित",
    
    // SOS & Alerts
    "sos.activated": "SOS सक्रिय",
    "sos.help": "आपातकालीन सेवाओं को सूचित कर दिया गया है। मदद आ रही है!",
    "sos.notified": "आपातकालीन सेवाओं को सूचित किया गया",
    "sos.stayCalm": "शांत रहें। मदद आ रही है।",
    
    // Admin Console
    "admin.title": "एडमिन ऑपरेशन सेंटर",
    "admin.subtitle": "रियल-टाइम घटना निगरानी और प्रतिक्रिया",
    "admin.systemOnline": "सिस्टम ऑनलाइन",
    "admin.activeTourists": "सक्रिय पर्यटक",
    "admin.openIncidents": "खुली घटनाएं",
    "admin.avgResponse": "औसत प्रतिक्रिया",
    "admin.safetyScore": "सुरक्षा स्कोर",
    "admin.incidentFeed": "लाइव घटना फीड",
    "admin.analytics": "एनालिटिक्स डैशबोर्ड",
    
    // Incidents
    "incident.report": "घटना रिपोर्ट करें",
    "incident.type": "घटना का प्रकार",
    "incident.description": "विवरण",
    "incident.location": "स्थान",
    "incident.submit": "रिपोर्ट सबमिट करें",
    "incident.submitted": "घटना रिपोर्ट की गई",
    "incident.hash": "ब्लॉकचेन हैश",
    
    // Common
    "common.view": "देखें",
    "common.dispatch": "भेजें",
    "common.resolve": "हल करें",
    "common.close": "बंद करें",
    "common.cancel": "रद्द करें",
    "common.save": "सहेजें",
    "common.loading": "लोड हो रहा है...",
    "common.error": "त्रुटि",
    "common.success": "सफलता",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};