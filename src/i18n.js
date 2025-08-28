import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // App core
      app: {
        title: "Geo-Safe-Chain",
        subtitle: "Tourist Safety Monitoring",
        welcome: "Welcome to Smart Tourist Safety System",
        description: "Real-time safety monitoring with blockchain-powered digital identity"
      },
      
      // Navigation
      nav: {
        dashboard: "Dashboard",
        map: "Map",
        incidents: "Incidents", 
        admin: "Admin"
      },
      
      // Tourist Dashboard
      tourist: {
        welcome: "Welcome, Tourist!",
        safetyScore: "Safety Score",
        currentLocation: "Current Location",
        emergencyContacts: "Emergency Contacts",
        digitalId: "Digital Tourist ID",
        generateId: "Generate Digital ID",
        scanQr: "Scan QR Code",
        validUntil: "Valid until",
        blockchainVerified: "Blockchain Verified"
      },
      
      // Safety and SOS
      safety: {
        sos: "SOS",
        emergency: "Emergency",
        sendAlert: "Send Alert",
        voiceSos: "Voice SOS",
        quickSos: "Quick SOS",
        startRecording: "Start Recording",
        stopRecording: "Stop Recording",
        recording: "Recording...",
        transcribing: "Transcribing...",
        instructions: "Hold to record your emergency message",
        defaultMessage: "Emergency help needed!"
      },
      
      // Alerts and Incidents
      alerts: {
        anomalyDetected: "Anomaly Detected",
        inactivityAlert: "Inactivity Alert",
        locationAlert: "Location Alert",
        tourist: "Tourist",
        inactive: "has been inactive for",
        leftZone: "has left their planned zone",
        minutes: "minutes",
        viewDetails: "View Details",
        noAlerts: "No alerts at this time"
      },
      
      // Admin
      admin: {
        console: "Admin Console",
        analytics: "Analytics",
        totalTourists: "Total Tourists",
        activeAlerts: "Active Alerts", 
        safetyScore: "Average Safety Score",
        incidents: "Total Incidents"
      },
      
      // Common actions
      actions: {
        save: "Save",
        cancel: "Cancel",
        close: "Close",
        ok: "OK",
        yes: "Yes",
        no: "No",
        loading: "Loading...",
        error: "Error",
        success: "Success"
      },
      
      // Messages
      messages: {
        languageChanged: "Language switched to English",
        idGenerated: "Digital Tourist ID generated successfully",
        sosActivated: "SOS Alert sent successfully",
        scanningStarted: "Scanning started",
        scanningStopped: "Scanning stopped"
      },
      
      // Demo modes
      demo: {
        tourist: "Tourist View",
        admin: "Admin View", 
        tech: "Tech Demo",
        explanation: "Simple Explanation",
        liveDemo: "Live Demo"
      },
      
      // Technologies
      tech: {
        blockchain: "Blockchain Digital ID",
        ai: "AI Anomaly Detection",
        multilingual: "Multilingual Support",
        realtime: "Real-time Monitoring"
      }
    }
  },
  hi: {
    translation: {
      // App core
      app: {
        title: "जियो-सेफ-चेन",
        subtitle: "पर्यटक सुरक्षा निगरानी",
        welcome: "स्मार्ट पर्यटक सुरक्षा प्रणाली में आपका स्वागत है",
        description: "ब्लॉकचेन-संचालित डिजिटल पहचान के साथ रीयल-टाइम सुरक्षा निगरानी"
      },
      
      // Navigation
      nav: {
        dashboard: "डैशबोर्ड",
        map: "नक्शा",
        incidents: "घटनाएं",
        admin: "एडमिन"
      },
      
      // Tourist Dashboard
      tourist: {
        welcome: "स्वागत है, पर्यटक!",
        safetyScore: "सुरक्षा स्कोर",
        currentLocation: "वर्तमान स्थान",
        emergencyContacts: "आपातकालीन संपर्क",
        digitalId: "डिजिटल पर्यटक आईडी",
        generateId: "डिजिटल आईडी जेनरेट करें",
        scanQr: "क्यूआर कोड स्कैन करें",
        validUntil: "तक वैध",
        blockchainVerified: "ब्लॉकचेन सत्यापित"
      },
      
      // Safety and SOS
      safety: {
        sos: "एसओएस",
        emergency: "आपातकाल",
        sendAlert: "अलर्ट भेजें",
        voiceSos: "वॉयस एसओएस",
        quickSos: "त्वरित एसओएस",
        startRecording: "रिकॉर्डिंग शुरू करें",
        stopRecording: "रिकॉर्डिंग बंद करें",
        recording: "रिकॉर्डिंग...",
        transcribing: "ट्रांसक्रिप्शन...",
        instructions: "अपना आपातकालीन संदेश रिकॉर्ड करने के लिए दबाए रखें",
        defaultMessage: "आपातकालीन सहायता चाहिए!"
      },
      
      // Alerts and Incidents
      alerts: {
        anomalyDetected: "विसंगति का पता चला",
        inactivityAlert: "निष्क्रियता अलर्ट",
        locationAlert: "स्थान अलर्ट",
        tourist: "पर्यटक",
        inactive: "निष्क्रिय रहा है",
        leftZone: "ने अपना नियोजित क्षेत्र छोड़ दिया है",
        minutes: "मिनट",
        viewDetails: "विवरण देखें",
        noAlerts: "इस समय कोई अलर्ट नहीं"
      },
      
      // Admin
      admin: {
        console: "एडमिन कंसोल",
        analytics: "एनालिटिक्स",
        totalTourists: "कुल पर्यटक",
        activeAlerts: "सक्रिय अलर्ट",
        safetyScore: "औसत सुरक्षा स्कोर",
        incidents: "कुल घटनाएं"
      },
      
      // Common actions
      actions: {
        save: "सेव करें",
        cancel: "रद्द करें",
        close: "बंद करें",
        ok: "ठीक है",
        yes: "हाँ",
        no: "नहीं",
        loading: "लोड हो रहा है...",
        error: "त्रुटि",
        success: "सफलता"
      },
      
      // Messages
      messages: {
        languageChanged: "भाषा हिंदी में बदली गई",
        idGenerated: "डिजिटल पर्यटक आईडी सफलतापूर्वक जेनरेट की गई",
        sosActivated: "एसओएस अलर्ट सफलतापूर्वक भेजा गया",
        scanningStarted: "स्कैनिंग शुरू की गई",
        scanningStopped: "स्कैनिंग बंद की गई"
      },
      
      // Demo modes
      demo: {
        tourist: "पर्यटक दृश्य",
        admin: "एडमिन दृश्य",
        tech: "तकनीकी डेमो",
        explanation: "सरल व्याख्या",
        liveDemo: "लाइव डेमो"
      },
      
      // Technologies
      tech: {
        blockchain: "ब्लॉकचेन डिजिटल आईडी",
        ai: "एआई विसंगति पहचान",
        multilingual: "बहुभाषी समर्थन",
        realtime: "रीयल-टाइम निगरानी"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;