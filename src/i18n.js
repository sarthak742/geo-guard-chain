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
        blockchainVerified: "Blockchain Verified",
        reportIncident: "Report Incident",
        submitReport: "Submit Report"
      },
      
      // Safety and SOS
      safety: {
        sos: "🚨 SOS",
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
        dashboard: "Admin Dashboard",
        console: "Admin Console",
        analytics: "Analytics",
        totalTourists: "Total Tourists",
        activeAlerts: "Active Alerts", 
        safetyScore: "Average Safety Score",
        incidents: "Total Incidents",
        incidentFeed: "Incident Feed",
        futureIntegrations: "Future Integrations",
        threatLevels: {
          high: "High",
          medium: "Medium", 
          low: "Low",
          medical: "Medical"
        }
      },
      
      // Live Demo
      liveDemo: {
        title: "Live Tourist Demo",
        enterRedZone: "Enter Red Zone",
        sendSOS: "Send SOS",
        dispatch: "Dispatch",
        resolve: "Resolve",
        statusUpdates: {
          enteringDanger: "Tourist entering danger zone",
          sosTriggered: "SOS alert triggered",
          helpDispatched: "Help dispatched to location",
          incidentResolved: "Incident resolved successfully"
        }
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
        blockchainVerified: "ब्लॉकचेन सत्यापित",
        reportIncident: "घटना की रिपोर्ट करें",
        submitReport: "रिपोर्ट जमा करें"
      },
      
      // Safety and SOS
      safety: {
        sos: "🚨 एसओएस",
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
        dashboard: "एडमिन डैशबोर्ड",
        console: "एडमिन कंसोल",
        analytics: "एनालिटिक्स",
        totalTourists: "कुल पर्यटक",
        activeAlerts: "सक्रिय अलर्ट",
        safetyScore: "औसत सुरक्षा स्कोर",
        incidents: "कुल घटनाएं",
        incidentFeed: "घटना फ़ीड",
        futureIntegrations: "भविष्य के एकीकरण",
        threatLevels: {
          high: "उच्च",
          medium: "मध्यम",
          low: "कम",
          medical: "चिकित्सा"
        }
      },
      
      // Live Demo
      liveDemo: {
        title: "लाइव पर्यटक डेमो",
        enterRedZone: "रेड जोन में प्रवेश",
        sendSOS: "एसओएस भेजें",
        dispatch: "भेजना",
        resolve: "हल करना",
        statusUpdates: {
          enteringDanger: "पर्यटक खतरे के क्षेत्र में प्रवेश कर रहा है",
          sosTriggered: "एसओएस अलर्ट ट्रिगर हुआ",
          helpDispatched: "स्थान पर सहायता भेजी गई",
          incidentResolved: "घटना सफलतापूर्वक हल हो गई"
        }
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
  },
  ta: {
    translation: {
      app: {
        title: "ஜியோ-சேஃப்-செயின்",
        subtitle: "சுற்றுலா பாதுகாப்பு கண்காணிப்பு",
        welcome: "ஸ்மார்ட் சுற்றுலா பாதுகாப்பு அமைப்புக்கு வரவேற்கிறோம்",
        description: "பிளாக்செயின்-இயங்கும் டிஜிட்டல் அடையாளத்துடன் நிகழ்நேர பாதுகாப்பு கண்காணிப்பு"
      },
      nav: {
        dashboard: "டாஷ்போர்ட்",
        map: "வரைபடம்",
        incidents: "சம்பவங்கள்",
        admin: "நிர்வாகி"
      },
      tourist: {
        welcome: "வரவேற்கிறோம், சுற்றுலாப் பயணி!",
        safetyScore: "பாதுகாப்பு மதிப்பெண்",
        currentLocation: "தற்போதைய இடம்",
        emergencyContacts: "அவசர தொடர்புகள்",
        digitalId: "டிஜிட்டல் சுற்றுலா அடையாள அட்டை",
        generateId: "டிஜிட்டல் அடையாள அட்டையை உருவாக்கு",
        scanQr: "QR கோட்டை ஸ்கேன் செய்",
        validUntil: "வரை செல்லுபடியாகும்",
        blockchainVerified: "பிளாக்செயின் சரிபார்க்கப்பட்டது",
        reportIncident: "சம்பவத்தை புகாரளி",
        submitReport: "அறிக்கையை சமர்பிக்கவும்"
      },
      safety: {
        sos: "🚨 எஸ்ஓஎஸ்",
        emergency: "அவசரநிலை",
        sendAlert: "எச்சரிக்கை அனுப்பு",
        voiceSos: "குரல் எஸ்ஓஎஸ்",
        quickSos: "விரைவு எஸ்ஓஎஸ்",
        startRecording: "பதிவு தொடங்கு",
        stopRecording: "பதிவு நிறுத்து",
        recording: "பதிவு செய்கிறது...",
        transcribing: "எழுத்துருவாக்கம்...",
        instructions: "உங்கள் அவசர செய்தியை பதிவு செய்ய அழுத்திப் பிடிக்கவும்",
        defaultMessage: "அவசர உதவி தேவை!"
      },
      admin: {
        dashboard: "நிர்வாக டாஷ்போர்ட்",
        console: "நிர்வாக கட்டுப்பாடு",
        analytics: "பகுப்பாய்வு",
        totalTourists: "மொத்த சுற்றுலாப் பயணிகள்",
        activeAlerts: "செயலில் உள்ள எச்சரிக்கைகள்",
        safetyScore: "சராசரி பாதுகாப்பு மதிப்பெண்",
        incidents: "மொத்த சம்பவங்கள்",
        incidentFeed: "சம்பவ ஊட்டம்",
        futureIntegrations: "எதிர்கால ஒருங்கிணைப்புகள்",
        threatLevels: {
          high: "உயர்",
          medium: "நடுத்தர",
          low: "குறைந்த",
          medical: "மருத்துவ"
        }
      },
      liveDemo: {
        title: "நேரடி சுற்றுலா டெமோ",
        enterRedZone: "சிவப்பு மண்டலத்தில் நுழை",
        sendSOS: "எஸ்ஓஎஸ் அனுப்பு",
        dispatch: "அனுப்பு",
        resolve: "தீர்வு",
        statusUpdates: {
          enteringDanger: "சுற்றுலாப் பயணி ஆபத்து மண்டலத்தில் நுழைகிறார்",
          sosTriggered: "எஸ்ஓஎஸ் எச்சரிக்கை தூண்டப்பட்டது",
          helpDispatched: "இடத்திற்கு உதவி அனுப்பப்பட்டது",
          incidentResolved: "சம்பவம் வெற்றிகரமாக தீர்க்கப்பட்டது"
        }
      },
      actions: {
        save: "சேமி",
        cancel: "ரத்து",
        close: "மூடு",
        ok: "சரி",
        yes: "ஆம்",
        no: "இல்லை",
        loading: "ஏற்றுகிறது...",
        error: "பிழை",
        success: "வெற்றி"
      },
      messages: {
        languageChanged: "மொழி தமிழாக மாற்றப்பட்டது",
        idGenerated: "டிஜிட்டல் சுற்றுலா அடையாள அட்டை வெற்றிகரமாக உருவாக்கப்பட்டது",
        sosActivated: "எஸ்ஓஎஸ் எச்சரிக்கை வெற்றிகரமாக அனுப்பப்பட்டது",
        scanningStarted: "ஸ்கேனிங் தொடங்கியது",
        scanningStopped: "ஸ்கேனிங் நிறுத்தப்பட்டது"
      }
    }
  },
  te: {
    translation: {
      app: {
        title: "జియో-సేఫ్-చెయిన్",
        subtitle: "పర్యాటక భద్రత పర్యవేక్షణ",
        welcome: "స్మార్ట్ పర్యాటక భద్రతా వ్యవస్థకు స్వాగతం",
        description: "బ్లాక్‌చెయిన్-శక్తితో పనిచేసే డిజిటల్ గుర్తింపుతో నిజ-సమయ భద్రత పర్యవేక్షణ"
      },
      nav: {
        dashboard: "డాష్‌బోర్డ్",
        map: "మ్యాప్",
        incidents: "సంఘటనలు",
        admin: "అడ్మిన్"
      },
      tourist: {
        welcome: "స్వాగతం, పర్యాటకుడా!",
        safetyScore: "భద్రత స్కోరు",
        currentLocation: "ప్రస్తుత స్థానం",
        emergencyContacts: "అత్యవసర పరిచయాలు",
        digitalId: "డిజిటల్ పర్యాటక ID",
        generateId: "డిజిటల్ ID జనరేట్ చేయండి",
        scanQr: "QR కోడ్ స్కాన్ చేయండి",
        validUntil: "వరకు చెల్లుబాటు",
        blockchainVerified: "బ్లాక్‌చెయిన్ ధృవీకరించబడింది",
        reportIncident: "సంఘటనను నివేదించండి",
        submitReport: "నివేదికను సమర్పించండి"
      },
      safety: {
        sos: "🚨 SOS",
        emergency: "అత్యవసరం",
        sendAlert: "హెచ్చరిక పంపండి",
        voiceSos: "వాయిస్ SOS",
        quickSos: "త్వరిత SOS",
        startRecording: "రికార్డింగ్ ప్రారంభించండి",
        stopRecording: "రికార్డింగ్ ఆపండి",
        recording: "రికార్డింగ్...",
        transcribing: "ట్రాన్స్‌క్రిప్ట్ చేస్తోంది...",
        instructions: "మీ అత్యవసర సందేశాన్ని రికార్డ్ చేయడానికి పట్టుకోండి",
        defaultMessage: "అత్యవసర సహాయం అవసరం!"
      },
      admin: {
        dashboard: "అడ్మిన్ డాష్‌బోర్డ్",
        console: "అడ్మిన్ కన్సోల్",
        analytics: "విశ్లేషణలు",
        totalTourists: "మొత్తం పర్యాటకులు",
        activeAlerts: "క్రియాశీల హెచ్చరికలు",
        safetyScore: "సగటు భద్రత స్కోరు",
        incidents: "మొత్తం సంఘటనలు",
        incidentFeed: "సంఘటన ఫీడ్",
        futureIntegrations: "భవిష్యత్ ఏకీకరణలు",
        threatLevels: {
          high: "అధిక",
          medium: "మధ్యమ",
          low: "తక్కువ",
          medical: "వైద్య"
        }
      },
      liveDemo: {
        title: "లైవ్ పర్యాటక డెమో",
        enterRedZone: "రెడ్ జోన్‌లో ప్రవేశించండి",
        sendSOS: "SOS పంపండి",
        dispatch: "పంపించు",
        resolve: "పరిష్కరించు",
        statusUpdates: {
          enteringDanger: "పర్యాటకుడు ప్రమాద జోన్‌లోకి ప్రవేశిస్తున్నాడు",
          sosTriggered: "SOS హెచ్చరిక ట్రిగ్గర్ అయింది",
          helpDispatched: "స్థానానికి సహాయం పంపబడింది",
          incidentResolved: "సంఘటన విజయవంతంగా పరిష్కరించబడింది"
        }
      },
      actions: {
        save: "సేవ్ చేయండి",
        cancel: "రద్దు చేయండి",
        close: "మూసివేయండి",
        ok: "సరే",
        yes: "అవును",
        no: "కాదు",
        loading: "లోడవుతోంది...",
        error: "లోపం",
        success: "విజయం"
      },
      messages: {
        languageChanged: "భాష తెలుగుకు మార్చబడింది",
        idGenerated: "డిజిటల్ పర్యాటక ID విజయవంతంగా జనరేట్ అయింది",
        sosActivated: "SOS హెచ్చరిక విజయవంతంగా పంపబడింది",
        scanningStarted: "స్కానింగ్ ప్రారంభమైంది",
        scanningStopped: "స్కానింగ్ ఆపబడింది"
      }
    }
  },
  mr: {
    translation: {
      app: {
        title: "जियो-सेफ-चेन",
        subtitle: "पर्यटक सुरक्षा निरीक्षण",
        welcome: "स्मार्ट पर्यटक सुरक्षा प्रणालीमध्ये आपले स्वागत आहे",
        description: "ब्लॉकचेन-चालित डिजिटल ओळखीसह रिअल-टाइम सुरक्षा निरीक्षण"
      },
      nav: {
        dashboard: "डॅशबोर्ड",
        map: "नकाशा",
        incidents: "घटना",
        admin: "प्रशासक"
      },
      tourist: {
        welcome: "स्वागत आहे, पर्यटक!",
        safetyScore: "सुरक्षा स्कोअर",
        currentLocation: "सध्याचे स्थान",
        emergencyContacts: "आपत्कालीन संपर्क",
        digitalId: "डिजिटल पर्यटक ओळखपत्र",
        generateId: "डिजिटल ओळखपत्र तयार करा",
        scanQr: "QR कोड स्कॅन करा",
        validUntil: "पर्यंत वैध",
        blockchainVerified: "ब्लॉकचेन सत्यापित",
        reportIncident: "घटनेची तक्रार करा",
        submitReport: "अहवाल सादर करा"
      },
      safety: {
        sos: "🚨 SOS",
        emergency: "आपत्काळ",
        sendAlert: "सूचना पाठवा",
        voiceSos: "व्हॉइस SOS",
        quickSos: "त्वरित SOS",
        startRecording: "रेकॉर्डिंग सुरू करा",
        stopRecording: "रेकॉर्डिंग थांबवा",
        recording: "रेकॉर्डिंग...",
        transcribing: "ट्रान्सक्रिप्शन...",
        instructions: "आपला आपत्कालीन संदेश रेकॉर्ड करण्यासाठी दाबून ठेवा",
        defaultMessage: "आपत्कालीन मदतीची गरज आहे!"
      },
      admin: {
        dashboard: "प्रशासक डॅशबोर्ड",
        console: "प्रशासक कन्सोल",
        analytics: "विश्लेषणे",
        totalTourists: "एकूण पर्यटक",
        activeAlerts: "सक्रिय सूचना",
        safetyScore: "सरासरी सुरक्षा स्कोअर",
        incidents: "एकूण घटना",
        incidentFeed: "घटना फीड",
        futureIntegrations: "भविष्यातील एकत्रीकरण",
        threatLevels: {
          high: "उच्च",
          medium: "मध्यम",
          low: "कमी",
          medical: "वैद्यकीय"
        }
      },
      liveDemo: {
        title: "थेट पर्यटक डेमो",
        enterRedZone: "लाल क्षेत्रात प्रवेश करा",
        sendSOS: "SOS पाठवा",
        dispatch: "पाठवा",
        resolve: "निराकरण करा",
        statusUpdates: {
          enteringDanger: "पर्यटक धोक्याच्या क्षेत्रात प्रवेश करत आहे",
          sosTriggered: "SOS अलर्ट ट्रिगर झाला",
          helpDispatched: "स्थानावर मदत पाठवली",
          incidentResolved: "घटना यशस्वीरित्या निराकरण झाली"
        }
      },
      actions: {
        save: "जतन करा",
        cancel: "रद्द करा",
        close: "बंद करा",
        ok: "ठीक आहे",
        yes: "होय",
        no: "नाही",
        loading: "लोड होत आहे...",
        error: "त्रुटी",
        success: "यश"
      },
      messages: {
        languageChanged: "भाषा मराठीमध्ये बदलली",
        idGenerated: "डिजिटल पर्यटक ओळखपत्र यशस्वीरित्या तयार केले",
        sosActivated: "SOS अलर्ट यशस्वीरित्या पाठवला",
        scanningStarted: "स्कॅनिंग सुरू केले",
        scanningStopped: "स्कॅनिंग थांबवले"
      }
    }
  },
  gu: {
    translation: {
      app: {
        title: "જિયો-સેફ-ચેન",
        subtitle: "પર્યટક સુરક્ષા નિરીક્ષણ",
        welcome: "સ્માર્ટ પર્યટક સુરક્ષા સિસ્ટમમાં આપનું સ્વાગત છે",
        description: "બ્લોકચેન-સંચાલિત ડિજિટલ ઓળખ સાથે રિયલ-ટાઇમ સુરક્ષા નિરીક્ષણ"
      },
      nav: {
        dashboard: "ડેશબોર્ડ",
        map: "નકશો",
        incidents: "ઘટનાઓ",
        admin: "એડમિન"
      },
      tourist: {
        welcome: "સ્વાગત છે, પર્યટક!",
        safetyScore: "સુરક્ષા સ્કોર",
        currentLocation: "વર્તમાન સ્થાન",
        emergencyContacts: "કટોકટી સંપર્કો",
        digitalId: "ડિજિટલ પર્યટક ID",
        generateId: "ડિજિટલ ID જનરેટ કરો",
        scanQr: "QR કોડ સ્કેન કરો",
        validUntil: "સુધી માન્ય",
        blockchainVerified: "બ્લોકચેન વેરિફાઇડ",
        reportIncident: "ઘટનાની જાણ કરો",
        submitReport: "રિપોર્ટ સબમિટ કરો"
      },
      safety: {
        sos: "🚨 SOS",
        emergency: "કટોકટી",
        sendAlert: "અલર્ટ મોકલો",
        voiceSos: "વોઇસ SOS",
        quickSos: "ત્વરિત SOS",
        startRecording: "રેકોર્ડિંગ શરૂ કરો",
        stopRecording: "રેકોર્ડિંગ બંધ કરો",
        recording: "રેકોર્ડિંગ...",
        transcribing: "ટ્રાન્સક્રિપ્શન...",
        instructions: "તમારો કટોકટીનો સંદેશ રેકોર્ડ કરવા માટે દબાવી રાખો",
        defaultMessage: "કટોકટી મદદની જરૂર છે!"
      },
      admin: {
        dashboard: "એડમિન ડેશબોર્ડ",
        console: "એડમિન કન્સોલ",
        analytics: "વિશ્લેષણ",
        totalTourists: "કુલ પર્યટકો",
        activeAlerts: "સક્રિય અલર્ટ્સ",
        safetyScore: "સરેરાશ સુરક્ષા સ્કોર",
        incidents: "કુલ ઘટનાઓ",
        incidentFeed: "ઘટના ફીડ",
        futureIntegrations: "ભવિષ્યના એકીકરણો",
        threatLevels: {
          high: "ઉચ્ચ",
          medium: "મધ્યમ",
          low: "નીચું",
          medical: "તબીબી"
        }
      },
      liveDemo: {
        title: "લાઇવ પર્યટક ડેમો",
        enterRedZone: "રેડ ઝોનમાં પ્રવેશ કરો",
        sendSOS: "SOS મોકલો",
        dispatch: "મોકલો",
        resolve: "ઉકેલો",
        statusUpdates: {
          enteringDanger: "પર્યટક ખતરનાક ઝોનમાં પ્રવેશ કરી રહ્યા છે",
          sosTriggered: "SOS અલર્ટ ટ્રિગર થયું",
          helpDispatched: "સ્થાન પર મદદ મોકલવામાં આવી",
          incidentResolved: "ઘટના સફળતાપૂર્વક ઉકેલાઈ"
        }
      },
      actions: {
        save: "સેવ કરો",
        cancel: "રદ કરો",
        close: "બંધ કરો",
        ok: "બરાબર",
        yes: "હા",
        no: "ના",
        loading: "લોડ થઈ રહ્યું છે...",
        error: "ભૂલ",
        success: "સફળતા"
      },
      messages: {
        languageChanged: "ભાષા ગુજરાતીમાં બદલાઈ",
        idGenerated: "ડિજિટલ પર્યટક ID સફળતાપૂર્વક જનરેટ થયું",
        sosActivated: "SOS અલર્ટ સફળતાપૂર્વક મોકલાયું",
        scanningStarted: "સ્કેનિંગ શરૂ થયું",
        scanningStopped: "સ્કેનિંગ બંધ થયું"
      }
    }
  },
  kn: {
    translation: {
      app: {
        title: "ಜಿಯೋ-ಸೇಫ್-ಚೇನ್",
        subtitle: "ಪ್ರವಾಸಿ ಸುರಕ್ಷತೆ ಮೇಲ್ವಿಚಾರಣೆ",
        welcome: "ಸ್ಮಾರ್ಟ್ ಪ್ರವಾಸಿ ಸುರಕ್ಷತೆ ವ್ಯವಸ್ಥೆಗೆ ಸ್ವಾಗತ",
        description: "ಬ್ಲಾಕ್‌ಚೇನ್-ಚಾಲಿತ ಡಿಜಿಟಲ್ ಗುರುತಿನ ಜೊತೆ ನೈಜ-ಸಮಯ ಸುರಕ್ಷತೆ ಮೇಲ್ವಿಚಾರಣೆ"
      },
      nav: {
        dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        map: "ನಕ್ಷೆ",
        incidents: "ಘಟನೆಗಳು",
        admin: "ಆಡಳಿತ"
      },
      tourist: {
        welcome: "ಸ್ವಾಗತ, ಪ್ರವಾಸಿ!",
        safetyScore: "ಸುರಕ್ಷತೆ ಅಂಕ",
        currentLocation: "ಪ್ರಸ್ತುತ ಸ್ಥಳ",
        emergencyContacts: "ತುರ್ತು ಸಂಪರ್ಕಗಳು",
        digitalId: "ಡಿಜಿಟಲ್ ಪ್ರವಾಸಿ ID",
        generateId: "ಡಿಜಿಟಲ್ ID ಜನರೇಟ್ ಮಾಡಿ",
        scanQr: "QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
        validUntil: "ವರೆಗೆ ಮಾನ್ಯ",
        blockchainVerified: "ಬ್ಲಾಕ್‌ಚೇನ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
        reportIncident: "ಘಟನೆ ವರದಿ ಮಾಡಿ",
        submitReport: "ವರದಿ ಸಲ್ಲಿಸಿ"
      },
      safety: {
        sos: "🚨 SOS",
        emergency: "ತುರ್ತುಸ್ಥಿತಿ",
        sendAlert: "ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ",
        voiceSos: "ಧ್ವನಿ SOS",
        quickSos: "ತ್ವರಿತ SOS",
        startRecording: "ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ",
        stopRecording: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
        recording: "ರೆಕಾರ್ಡಿಂಗ್...",
        transcribing: "ಪ್ರತಿಲೇಖನ...",
        instructions: "ನಿಮ್ಮ ತುರ್ತು ಸಂದೇಶವನ್ನು ರೆಕಾರ್ಡ್ ಮಾಡಲು ಹಿಡಿದುಕೊಳ್ಳಿ",
        defaultMessage: "ತುರ್ತು ಸಹಾಯ ಬೇಕು!"
      },
      admin: {
        dashboard: "ಆಡಳಿತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        console: "ಆಡಳಿತ ಕನ್ಸೋಲ್",
        analytics: "ವಿಶ್ಲೇಷಣೆ",
        totalTourists: "ಒಟ್ಟು ಪ್ರವಾಸಿಗರು",
        activeAlerts: "ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು",
        safetyScore: "ಸರಾಸರಿ ಸುರಕ್ಷತೆ ಅಂಕ",
        incidents: "ಒಟ್ಟು ಘಟನೆಗಳು",
        incidentFeed: "ಘಟನೆ ಫೀಡ್",
        futureIntegrations: "ಭವಿಷ್ಯದ ಏಕೀಕರಣಗಳು",
        threatLevels: {
          high: "ಹೆಚ್ಚು",
          medium: "ಮಧ್ಯಮ",
          low: "ಕಡಿಮೆ",
          medical: "ವೈದ್ಯಕೀಯ"
        }
      },
      liveDemo: {
        title: "ಲೈವ್ ಪ್ರವಾಸಿ ಡೆಮೋ",
        enterRedZone: "ಕೆಂಪು ವಲಯಕ್ಕೆ ಪ್ರವೇಶಿಸಿ",
        sendSOS: "SOS ಕಳುಹಿಸಿ",
        dispatch: "ಕಳುಹಿಸು",
        resolve: "ಪರಿಹರಿಸು",
        statusUpdates: {
          enteringDanger: "ಪ್ರವಾಸಿ ಅಪಾಯದ ವಲಯಕ್ಕೆ ಪ್ರವೇಶಿಸುತ್ತಿದ್ದಾರೆ",
          sosTriggered: "SOS ಎಚ್ಚರಿಕೆ ಪ್ರಚೋದಿಸಲಾಗಿದೆ",
          helpDispatched: "ಸ್ಥಳಕ್ಕೆ ಸಹಾಯ ಕಳುಹಿಸಲಾಗಿದೆ",
          incidentResolved: "ಘಟನೆ ಯಶಸ್ವಿಯಾಗಿ ಪರಿಹರಿಸಲಾಗಿದೆ"
        }
      },
      actions: {
        save: "ಉಳಿಸು",
        cancel: "ರದ್ದುಮಾಡು",
        close: "ಮುಚ್ಚು",
        ok: "ಸರಿ",
        yes: "ಹೌದು",
        no: "ಇಲ್ಲ",
        loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        error: "ದೋಷ",
        success: "ಯಶಸ್ಸು"
      },
      messages: {
        languageChanged: "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ",
        idGenerated: "ಡಿಜಿಟಲ್ ಪ್ರವಾಸಿ ID ಯಶಸ್ವಿಯಾಗಿ ಜನರೇಟ್ ಆಗಿದೆ",
        sosActivated: "SOS ಎಚ್ಚರಿಕೆ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ",
        scanningStarted: "ಸ್ಕ್ಯಾನಿಂಗ್ ಪ್ರಾರಂಭವಾಗಿದೆ",
        scanningStopped: "ಸ್ಕ್ಯಾನಿಂಗ್ ನಿಲ್ಲಿಸಲಾಗಿದೆ"
      }
    }
  },
  bn: {
    translation: {
      app: {
        title: "জিও-সেফ-চেইন",
        subtitle: "পর্যটক নিরাপত্তা পর্যবেক্ষণ",
        welcome: "স্মার্ট পর্যটক নিরাপত্তা সিস্টেমে স্বাগতম",
        description: "ব্লকচেইন-চালিত ডিজিটাল পরিচয়ের সাথে রিয়েল-টাইম নিরাপত্তা পর্যবেক্ষণ"
      },
      nav: {
        dashboard: "ড্যাশবোর্ড",
        map: "মানচিত্র",
        incidents: "ঘটনা",
        admin: "অ্যাডমিন"
      },
      tourist: {
        welcome: "স্বাগতম, পর্যটক!",
        safetyScore: "নিরাপত্তা স্কোর",
        currentLocation: "বর্তমান অবস্থান",
        emergencyContacts: "জরুরি যোগাযোগ",
        digitalId: "ডিজিটাল পর্যটক আইডি",
        generateId: "ডিজিটাল আইডি তৈরি করুন",
        scanQr: "QR কোড স্ক্যান করুন",
        validUntil: "পর্যন্ত বৈধ",
        blockchainVerified: "ব্লকচেইন যাচাইকৃত",
        reportIncident: "ঘটনা রিপোর্ট করুন",
        submitReport: "রিপোর্ট জমা দিন"
      },
      safety: {
        sos: "🚨 SOS",
        emergency: "জরুরি অবস্থা",
        sendAlert: "সতর্কবার্তা পাঠান",
        voiceSos: "ভয়েস SOS",
        quickSos: "দ্রুত SOS",
        startRecording: "রেকর্ডিং শুরু করুন",
        stopRecording: "রেকর্ডিং বন্ধ করুন",
        recording: "রেকর্ডিং...",
        transcribing: "প্রতিলিপি...",
        instructions: "আপনার জরুরি বার্তা রেকর্ড করতে চেপে ধরে রাখুন",
        defaultMessage: "জরুরি সাহায্যের প্রয়োজন!"
      },
      admin: {
        dashboard: "অ্যাডমিন ড্যাশবোর্ড",
        console: "অ্যাডমিন কনসোল",
        analytics: "বিশ্লেষণ",
        totalTourists: "মোট পর্যটক",
        activeAlerts: "সক্রিয় সতর্কবার্তা",
        safetyScore: "গড় নিরাপত্তা স্কোর",
        incidents: "মোট ঘটনা",
        incidentFeed: "ঘটনার ফিড",
        futureIntegrations: "ভবিষ্যৎ একীকরণ",
        threatLevels: {
          high: "উচ্চ",
          medium: "মাঝারি",
          low: "নিম্ন",
          medical: "চিকিৎসা"
        }
      },
      liveDemo: {
        title: "লাইভ পর্যটক ডেমো",
        enterRedZone: "লাল অঞ্চলে প্রবেশ",
        sendSOS: "SOS পাঠান",
        dispatch: "প্রেরণ",
        resolve: "সমাধান",
        statusUpdates: {
          enteringDanger: "পর্যটক বিপজ্জনক অঞ্চলে প্রবেশ করছেন",
          sosTriggered: "SOS সতর্কবার্তা ট্রিগার হয়েছে",
          helpDispatched: "অবস্থানে সাহায্য পাঠানো হয়েছে",
          incidentResolved: "ঘটনা সফলভাবে সমাধান হয়েছে"
        }
      },
      actions: {
        save: "সংরক্ষণ",
        cancel: "বাতিল",
        close: "বন্ধ",
        ok: "ঠিক আছে",
        yes: "হ্যাঁ",
        no: "না",
        loading: "লোডিং...",
        error: "ত্রুটি",
        success: "সাফল্য"
      },
      messages: {
        languageChanged: "ভাষা বাংলায় পরিবর্তিত হয়েছে",
        idGenerated: "ডিজিটাল পর্যটক আইডি সফলভাবে তৈরি হয়েছে",
        sosActivated: "SOS সতর্কবার্তা সফলভাবে পাঠানো হয়েছে",
        scanningStarted: "স্ক্যানিং শুরু হয়েছে",
        scanningStopped: "স্ক্যানিং বন্ধ হয়েছে"
      }
    }
  },
  or: {
    translation: {
      app: {
        title: "ଜିଓ-ସେଫ-ଚେନ",
        subtitle: "ପର୍ଯ୍ୟଟକ ସୁରକ୍ଷା ନିରୀକ୍ଷଣ",
        welcome: "ସ୍ମାର୍ଟ ପର୍ଯ୍ୟଟକ ସୁରକ୍ଷା ସିଷ୍ଟମକୁ ସ୍ୱାଗତ",
        description: "ବ୍ଲକଚେନ-ଚାଳିତ ଡିଜିଟାଲ ପରିଚୟ ସହିତ ରିଅଲ-ଟାଇମ ସୁରକ୍ଷା ନିରୀକ୍ଷଣ"
      },
      nav: {
        dashboard: "ଡ୍ୟାସବୋର୍ଡ",
        map: "ମାନଚିତ୍ର",
        incidents: "ଘଟଣାସମୂହ",
        admin: "ଆଡମିନ"
      },
      tourist: {
        welcome: "ସ୍ୱାଗତ, ପର୍ଯ୍ୟଟକ!",
        safetyScore: "ସୁରକ୍ଷା ସ୍କୋର",
        currentLocation: "ବର୍ତ୍ତମାନ ସ୍ଥାନ",
        emergencyContacts: "ଜରୁରୀକାଳୀନ ସମ୍ପର୍କ",
        digitalId: "ଡିଜିଟାଲ ପର୍ଯ୍ୟଟକ ଆଇଡି",
        generateId: "ଡିଜିଟାଲ ଆଇଡି ସୃଷ୍ଟି କରନ୍ତୁ",
        scanQr: "QR କୋଡ ସ୍କାନ କରନ୍ତୁ",
        validUntil: "ପର୍ଯ୍ୟନ୍ତ ବୈଧ",
        blockchainVerified: "ବ୍ଲକଚେନ ଯାଞ୍ଚ କରାଯାଇଛି",
        reportIncident: "ଘଟଣା ରିପୋର୍ଟ କରନ୍ତୁ",
        submitReport: "ରିପୋର୍ଟ ଦାଖଲ କରନ୍ତୁ"
      },
      safety: {
        sos: "🚨 SOS",
        emergency: "ଜରୁରୀକାଳୀନ ଅବସ୍ଥା",
        sendAlert: "ସତର୍କତା ପଠାନ୍ତୁ",
        voiceSos: "ଭଏସ SOS",
        quickSos: "ଶୀଘ୍ର SOS",
        startRecording: "ରେକର୍ଡିଂ ଆରମ୍ଭ କରନ୍ତୁ",
        stopRecording: "ରେକର୍ଡିଂ ବନ୍ଦ କରନ୍ତୁ",
        recording: "ରେକର୍ଡିଂ...",
        transcribing: "ଟ୍ରାନ୍ସକ୍ରିପ୍ଟିଂ...",
        instructions: "ଆପଣଙ୍କର ଜରୁରୀକାଳୀନ ସନ୍ଦେଶ ରେକର୍ଡ କରିବା ପାଇଁ ଧରି ରଖନ୍ତୁ",
        defaultMessage: "ଜରୁରୀକାଳୀନ ସହାୟତା ଆବଶ୍ୟକ!"
      },
      admin: {
        dashboard: "ଆଡମିନ ଡ୍ୟାସବୋର୍ଡ",
        console: "ଆଡମିନ କନସୋଲ",
        analytics: "ବିଶ୍ଳେଷଣ",
        totalTourists: "ମୋଟ ପର୍ଯ୍ୟଟକ",
        activeAlerts: "ସକ୍ରିୟ ସତର୍କତା",
        safetyScore: "ହାରାହାରି ସୁରକ୍ଷା ସ୍କୋର",
        incidents: "ମୋଟ ଘଟଣା",
        incidentFeed: "ଘଟଣା ଫିଡ",
        futureIntegrations: "ଭବିଷ୍ୟତ ଏକୀକରଣ",
        threatLevels: {
          high: "ଉଚ୍ଚ",
          medium: "ମଧ୍ୟମ",
          low: "ନିମ୍ନ",
          medical: "ଚିକିତ୍ସା"
        }
      },
      liveDemo: {
        title: "ଲାଇଭ ପର୍ଯ୍ୟଟକ ଡେମୋ",
        enterRedZone: "ଲାଲ ଜୋନରେ ପ୍ରବେଶ କରନ୍ତୁ",
        sendSOS: "SOS ପଠାନ୍ତୁ",
        dispatch: "ପ଍ାନ୍ତୁ",
        resolve: "ସମାଧାନ କରନ୍ତୁ",
        statusUpdates: {
          enteringDanger: "ପର୍ଯ୍ୟଟକ ବିପଦ ଜୋନରେ ପ୍ରବେଶ କରୁଛନ୍ତି",
          sosTriggered: "SOS ସତର୍କତା ଟ୍ରିଗର ହୋଇଛି",
          helpDispatched: "ସ୍ଥାନକୁ ସହାୟତା ପଠାଯାଇଛି",
          incidentResolved: "ଘଟଣା ସଫଳତାପୂର୍ବକ ସମାଧାନ ହୋଇଛି"
        }
      },
      actions: {
        save: "ସେଭ କରନ୍ତୁ",
        cancel: "ବାତିଲ କରନ୍ତୁ",
        close: "ବନ୍ଦ କରନ୍ତୁ",
        ok: "ଠିକ ଅଛି",
        yes: "ହଁ",
        no: "ନା",
        loading: "ଲୋଡିଂ...",
        error: "ତ୍ରୁଟି",
        success: "ସଫଳତା"
      },
      messages: {
        languageChanged: "ଭାଷା ଓଡ଼ିଆକୁ ବଦଳାଯାଇଛି",
        idGenerated: "ଡିଜିଟାଲ ପର୍ଯ୍ୟଟକ ଆଇଡି ସଫଳତାପୂର୍ବକ ସୃଷ୍ଟି ହୋଇଛି",
        sosActivated: "SOS ସତର୍କତା ସଫଳତାପୂର୍ବକ ପଠାଯାଇଛି",
        scanningStarted: "ସ୍କାନିଂ ଆରମ୍ଭ ହୋଇଛି",
        scanningStopped: "ସ୍କାନିଂ ବନ୍ଦ ହୋଇଛି"
      }
    }
  },
  pa: {
    translation: {
      app: {
        title: "ਜਿਓ-ਸੇਫ-ਚੇਨ",
        subtitle: "ਸੈਲਾਨੀ ਸੁਰੱਖਿਆ ਨਿਗਰਾਨੀ",
        welcome: "ਸਮਾਰਟ ਸੈਲਾਨੀ ਸੁਰੱਖਿਆ ਸਿਸਟਮ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
        description: "ਬਲਾਕਚੇਨ-ਸੰਚਾਲਿਤ ਡਿਜਿਟਲ ਪਛਾਣ ਨਾਲ ਰੀਅਲ-ਟਾਈਮ ਸੁਰੱਖਿਆ ਨਿਗਰਾਨੀ"
      },
      nav: {
        dashboard: "ਡੈਸ਼ਬੋਰਡ",
        map: "ਨਕਸ਼ਾ",
        incidents: "ਘਟਨਾਵਾਂ",
        admin: "ਪ੍ਰਸ਼ਾਸਕ"
      },
      tourist: {
        welcome: "ਸੁਆਗਤ ਹੈ, ਸੈਲਾਨੀ!",
        safetyScore: "ਸੁਰੱਖਿਆ ਸਕੋਰ",
        currentLocation: "ਮੌਜੂਦਾ ਸਥਾਨ",
        emergencyContacts: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ",
        digitalId: "ਡਿਜਿਟਲ ਸੈਲਾਨੀ ਪਛਾਣ",
        generateId: "ਡਿਜਿਟਲ ਪਛਾਣ ਬਣਾਓ",
        scanQr: "QR ਕੋਡ ਸਕੈਨ ਕਰੋ",
        validUntil: "ਤੱਕ ਵੈਧ",
        blockchainVerified: "ਬਲਾਕਚੇਨ ਪ੍ਰਮਾਣਿਤ",
        reportIncident: "ਘਟਨਾ ਦੀ ਰਿਪੋਰਟ ਕਰੋ",
        submitReport: "ਰਿਪੋਰਟ ਜਮ੍ਹਾ ਕਰੋ"
      },
      safety: {
        sos: "🚨 SOS",
        emergency: "ਐਮਰਜੈਂਸੀ",
        sendAlert: "ਅਲਰਟ ਭੇਜੋ",
        voiceSos: "ਆਵਾਜ਼ SOS",
        quickSos: "ਤਤਕਾਲ SOS",
        startRecording: "ਰਿਕਾਰਡਿੰਗ ਸ਼ੁਰੂ ਕਰੋ",
        stopRecording: "ਰਿਕਾਰਡਿੰਗ ਬੰਦ ਕਰੋ",
        recording: "ਰਿਕਾਰਡਿੰਗ...",
        transcribing: "ਟ੍ਰਾਨਸਕ੍ਰਿਪਸ਼ਨ...",
        instructions: "ਆਪਣਾ ਐਮਰਜੈਂਸੀ ਸੰਦੇਸ਼ ਰਿਕਾਰਡ ਕਰਨ ਲਈ ਦਬਾ ਕੇ ਰੱਖੋ",
        defaultMessage: "ਐਮਰਜੈਂਸੀ ਮਦਦ ਦੀ ਲੋੜ ਹੈ!"
      },
      admin: {
        dashboard: "ਪ੍ਰਸ਼ਾਸਕ ਡੈਸ਼ਬੋਰਡ",
        console: "ਪ੍ਰਸ਼ਾਸਕ ਕੰਸੋਲ",
        analytics: "ਵਿਸ਼ਲੇਸ਼ਣ",
        totalTourists: "ਕੁੱਲ ਸੈਲਾਨੀ",
        activeAlerts: "ਸਰਗਰਮ ਅਲਰਟ",
        safetyScore: "ਔਸਤ ਸੁਰੱਖਿਆ ਸਕੋਰ",
        incidents: "ਕੁੱਲ ਘਟਨਾਵਾਂ",
        incidentFeed: "ਘਟਨਾ ਫੀਡ",
        futureIntegrations: "ਭਵਿੱਖੀ ਏਕੀਕਰਣ",
        threatLevels: {
          high: "ਉੱਚਾ",
          medium: "ਮੱਧਮ",
          low: "ਘੱਟ",
          medical: "ਮੈਡੀਕਲ"
        }
      },
      liveDemo: {
        title: "ਲਾਈਵ ਸੈਲਾਨੀ ਡੈਮੋ",
        enterRedZone: "ਲਾਲ ਖੇਤਰ ਵਿੱਚ ਦਾਖਲ ਹੋਵੋ",
        sendSOS: "SOS ਭੇਜੋ",
        dispatch: "ਭੇਜੋ",
        resolve: "ਹੱਲ ਕਰੋ",
        statusUpdates: {
          enteringDanger: "ਸੈਲਾਨੀ ਖਤਰਨਾਕ ਖੇਤਰ ਵਿੱਚ ਦਾਖਲ ਹੋ ਰਿਹਾ ਹੈ",
          sosTriggered: "SOS ਅਲਰਟ ਟ੍ਰਿਗਰ ਹੋਇਆ",
          helpDispatched: "ਸਥਾਨ 'ਤੇ ਮਦਦ ਭੇਜੀ ਗਈ",
          incidentResolved: "ਘਟਨਾ ਸਫਲਤਾਪੂਰਵਕ ਹੱਲ ਹੋ ਗਈ"
        }
      },
      actions: {
        save: "ਸੇਵ ਕਰੋ",
        cancel: "ਰੱਦ ਕਰੋ",
        close: "ਬੰਦ ਕਰੋ",
        ok: "ਠੀਕ ਹੈ",
        yes: "ਹਾਂ",
        no: "ਨਹੀਂ",
        loading: "ਲੋਡਿੰਗ...",
        error: "ਗਲਤੀ",
        success: "ਸਫਲਤਾ"
      },
      messages: {
        languageChanged: "ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲੀ ਗਈ",
        idGenerated: "ਡਿਜਿਟਲ ਸੈਲਾਨੀ ਪਛਾਣ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਈ ਗਈ",
        sosActivated: "SOS ਅਲਰਟ ਸਫਲਤਾਪੂਰਵਕ ਭੇਜਿਆ ਗਿਆ",
        scanningStarted: "ਸਕੈਨਿੰਗ ਸ਼ੁਰੂ ਹੋਈ",
        scanningStopped: "ਸਕੈਨਿੰਗ ਬੰਦ ਹੋਈ"
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