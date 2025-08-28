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
    
    // Digital ID & Blockchain
    "digitalId.title": "Digital Tourist ID",
    "digitalId.valid": "Valid ID",
    "digitalId.expired": "Expired ID", 
    "digitalId.showQR": "Show QR Code",
    "digitalId.download": "Download",
    "digitalId.generated": "Digital ID Generated",
    "digitalId.verified": "Blockchain Verified",
    
    // Voice SOS
    "voiceSos.title": "Voice SOS System",
    "voiceSos.recording": "Recording...",
    "voiceSos.transcription": "Live Transcription",
    "voiceSos.startRecording": "Voice SOS",
    "voiceSos.stopRecording": "Stop & Send SOS",
    "voiceSos.quickSos": "Quick SOS",
    "voiceSos.processing": "Processing speech...",
    "voiceSos.speakLanguage": "Speak in Hindi or English",
    "voiceSos.clearlyDescribe": "Clearly describe your emergency",
    "voiceSos.bothSent": "Both audio and text will be sent",
    
    // Authority Scanner
    "authority.title": "Authority ID Scanner",
    "authority.startScan": "Start Camera Scan",
    "authority.uploadImage": "Upload Image",
    "authority.scannerActive": "Scanner Active",
    "authority.alignQR": "Align QR code within frame",
    "authority.validId": "VALID TOURIST ID", 
    "authority.invalidId": "INVALID ID",
    "authority.scanAnother": "Scan Another",
    "authority.callEmergency": "Call Emergency",
    
    // Anomaly Alerts
    "anomaly.title": "Anomaly Detection",
    "anomaly.activeAlerts": "Active Anomaly Alerts",
    "anomaly.noAnomalies": "No Active Anomalies",
    "anomaly.allSafe": "All tourists are within safe parameters",
    "anomaly.handledAlerts": "Handled Alerts",
    "anomaly.acknowledge": "Acknowledge",
    "anomaly.inactivity": "Inactivity Alert",
    "anomaly.geofence": "Geofence Violation",
    "anomaly.movement": "Unusual Movement",
    
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
    
    // Digital ID & Blockchain
    "digitalId.title": "डिजिटल टूरिस्ट आईडी",
    "digitalId.valid": "वैध आईडी",
    "digitalId.expired": "समाप्त आईडी",
    "digitalId.showQR": "QR कोड दिखाएं",
    "digitalId.download": "डाउनलोड",
    "digitalId.generated": "डिजिटल आईडी जेनरेट हुई",
    "digitalId.verified": "ब्लॉकचेन सत्यापित",
    
    // Voice SOS
    "voiceSos.title": "वॉइस SOS सिस्टम",
    "voiceSos.recording": "रिकॉर्डिंग...",
    "voiceSos.transcription": "लाइव ट्रांसक्रिप्शन",
    "voiceSos.startRecording": "वॉइस SOS",
    "voiceSos.stopRecording": "रुकें और SOS भेजें",
    "voiceSos.quickSos": "त्वरित SOS",
    "voiceSos.processing": "भाषण प्रसंस्करण...",
    "voiceSos.speakLanguage": "हिंदी या अंग्रेजी में बोलें",
    "voiceSos.clearlyDescribe": "स्पष्ट रूप से अपनी आपातकालीन स्थिति बताएं",
    "voiceSos.bothSent": "ऑडियो और टेक्स्ट दोनों भेजे जाएंगे",
    
    // Authority Scanner
    "authority.title": "अधिकारी आईडी स्कैनर",
    "authority.startScan": "कैमरा स्कैन शुरू करें",
    "authority.uploadImage": "छवि अपलोड करें",
    "authority.scannerActive": "स्कैनर सक्रिय",
    "authority.alignQR": "फ्रेम में QR कोड संरेखित करें",
    "authority.validId": "वैध टूरिस्ट आईडी",
    "authority.invalidId": "अवैध आईडी",
    "authority.scanAnother": "दूसरा स्कैन करें",
    "authority.callEmergency": "आपातकाल कॉल करें",
    
    // Anomaly Alerts
    "anomaly.title": "असामान्यता पहचान",
    "anomaly.activeAlerts": "सक्रिय असामान्यता अलर्ट",
    "anomaly.noAnomalies": "कोई सक्रिय असामान्यता नहीं",
    "anomaly.allSafe": "सभी पर्यटक सुरक्षित पैरामीटर में हैं",
    "anomaly.handledAlerts": "संभाले गए अलर्ट",
    "anomaly.acknowledge": "स्वीकार करें",
    "anomaly.inactivity": "निष्क्रियता अलर्ट",
    "anomaly.geofence": "भू-बाड़ उल्लंघन",
    "anomaly.movement": "असामान्य गति",
    
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