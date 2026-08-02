import { Language } from './types';

export const translations = {
  mr: {
    appName: "वारकरी सेवा (WariSeva)",
    tagline: "पंढरपूर वारी अधिकृत डिजिटल सेवा व मार्गदर्शक",
    welcomeGreeting: "राम कृष्ण हरी! 🙏",
    palkhiStatusHeader: "पालखी वर्तमान स्थान स्थिती",
    
    // Header & Actions
    langTitle: "भाषा निवडा / Select Language",
    textSizeLarge: "मोठा मजकूर",
    textSizeNormal: "सामान्य मजकूर",
    voiceAssist: "आवाज मदत",
    voiceReading: "वाचत आहे...",
    emergencySosBtn: "🚨 १-टॅप आणीबाणी (SOS)",
    
    // Navigation Tabs
    navHome: "मुख्य पृष्ठ",
    navCrowd: "गर्दी व दर्शन pass",
    navMap: "वारी नकाशे",
    navStays: "निवास व अन्नछत्र",
    navLost: "हरवलेले-सापडलेले",
    navSos: "आणीबाणी मदत",
    navAbhang: "अभंग व मार्गदर्शक",
    navVolunteer: "सेवक नोंदणी",

    // Home Dashboard Cards
    cardCrowdTitle: "दर्शन रांग व गर्दी स्थिती",
    cardCrowdDesc: "श्री विठ्ठल रुक्मिणी मंदिर परिसरातील थेट गर्दी व ई-दर्शन पास.",
    
    cardMapTitle: "वारी मार्ग व थेट नकाशा",
    cardMapDesc: "पालखी मार्ग, रिंगण ठिकाणे, पाणी, वैद्यकीय व शौचालय नकाशे.",

    cardStaysTitle: "विनामूल्य निवास व अन्नछत्र",
    cardStaysDesc: "भक्त निवास, मठ, शाळा, उपलब्ध खाटा आणि महाप्रसाद भोजन स्थळे.",

    cardLostTitle: "हरवलेले-सापडलेले (Family Finder)",
    cardLostDesc: "आपल्या प्रिय व्यक्ती किंवा वस्तू शोधा किंवा शोध नोंदवा.",

    cardSosTitle: "आणीबाणी मदत (SOS)",
    cardSosDesc: "वैद्यकीय मदत, रुग्णवाहिका, पोलीस आणि मदत केंद्र तात्काळ संपर्क.",

    cardAbhangTitle: "दैनंदिन अभंग व आरोग्य सल्ला",
    cardAbhangDesc: "चालताना अभंग ऐका आणि वारकरी आरोग्य मार्गदर्शन मिळवा.",

    // Crowd View
    crowdLevelTitle: "थेट गर्दीची पातळी",
    mukhDarshan: "मुख दर्शन वेळ",
    charanSparsh: "चरण स्पर्श दर्शन वेळ",
    queueLength: "रांगेची लांबी",
    activeGates: "सुरू असलेले प्रवेशद्वार",
    bookTokenHeader: "ई-दर्शन टोकन पास मिळवा",
    pilgrimName: "वारकऱ्याचे नाव",
    phoneNumber: "मोबाईल नंबर",
    pilgrimCount: "एकूण वारकरी संख्या",
    selectTimeSlot: "वेळ स्लॉट निवडा",
    selectDarshanType: "दर्शन प्रकार",
    generatePassBtn: "ई-दर्शन पास तयार करा 🎫",
    tokenPassTitle: "श्री विठ्ठल दर्शन ई-पास",
    tokenNumber: "टोकन क्र.",
    downloadPassBtn: "पास डाउनलोड करा",

    // Map View
    mapHeader: "पंढरपूर वारी व पालखी मार्ग नकाशा",
    filterAll: "सर्व ठिकाणे",
    filterPalkhi: "🚩 पालखी स्थान",
    filterWater: "💧 पिण्याचे पाणी",
    filterMedical: "🏥 वैद्यकीय छावणी",
    filterStay: "⛺ निवास स्थान",
    filterFood: "🍲 अन्नछत्र",
    filterToilet: "🚻 स्वच्छतागृह",
    filterRingan: "🐎 रिंगण मैदान",
    myLocationBtn: "📍 माझे स्थान शोधा",

    // Stays View
    stayHeader: "विनामूल्य निवास व अन्नछत्र स्थळे",
    availableBeds: "उपलब्ध खाटा",
    totalBeds: "एकूण क्षमता",
    distanceFromTemple: "मंदिरापासून अंतर",
    callStayBtn: "📞 संपर्क साधा",
    bookBedBtn: "खाट आरक्षित करा",
    annachhatraTitle: "महाप्रसाद व अन्नछत्र सेवा",
    servingTimes: "वेळ",
    menuToday: "आजचा महाप्रसाद",

    // Lost and Found View
    lostHeader: "हरवलेले व्यक्ती व वस्तू शोध केंद्र",
    reportMissingBtn: "➕ हरवल्याची नोंद करा",
    reportFoundBtn: "हाताशी सापडल्याचे कळवा",
    searchByName: "नावाने किंवा ठिकाणाने शोधा...",
    missingSince: "हरवल्याची वेळ",
    contactFamily: "कुटुंबाशी संपर्क करा",
    broadcastAudio: "🔊 लाउडस्पीकरवर सूचना द्या",

    // SOS View
    sosHeader: "🚨 तात्काळ आणीबाणी मदत (1-Tap SOS)",
    sosDescription: "तुम्ही अडचणीत असल्यास खालील बटणावर क्लिक करा. स्वयंसेवक आणि वैद्यकीय पथक त्वरित पोहोचेल.",
    sendSosBtn: "तात्काळ SOS मदत पाठवा",
    sosMedical: "वैद्यकीय मदत (Medical Emergency)",
    sosPolice: "सुरक्षा / पोलीस मदत (Police/Security)",
    sosLostChild: "लहान मूल हरवले (Lost Child)",
    sosWater: "पाणी / अन्न टंचाई (Water Distress)",
    helplinesTitle: "महत्वाचे हेल्पलाईन नंबर",

    // Abhang & Guide
    abhangHeader: "भक्ती संगीत, अभंग व वारकरी आरोग्य मार्गदर्शक",
    healthTipsTitle: "चालताना घ्यावयाची काळजी",
    tip1: "दर २ तासांनी पुरेसे पाणी व ओरल रिहायड्रेशन (ORS) प्या.",
    tip2: "पायाला फोड आल्यास प्राथमिक वैद्यकीय छावणीत मलम लावा.",
    tip3: "आपले ओळखपत्र व मोबाईल नेहमी खिशात ठेवा.",

    // Volunteer
    volunteerHeader: "वारकरी सेवा - स्वयंसेवक नोंदणी",
    volunteerFormTitle: "मी वारी सेवेत सहभागी होऊ इच्छितो",
    submitSevaBtn: "सेवा नोंदणी करा"
  },

  hi: {
    appName: "वारकरी सेवा (WariSeva)",
    tagline: "पंढरपुर वारी आधिकारिक डिजिटल सेवा एवं मार्गदर्शक",
    welcomeGreeting: "राम कृष्ण हरि! 🙏",
    palkhiStatusHeader: "पालकी वर्तमान स्थान स्थिति",
    
    // Header & Actions
    langTitle: "भाषा चुनें / Select Language",
    textSizeLarge: "बड़ा पाठ (Large)",
    textSizeNormal: "सामान्य पाठ",
    voiceAssist: "आवाज सहायता",
    voiceReading: "पढ़ रहा है...",
    emergencySosBtn: "🚨 1-टैप आपातकालीन (SOS)",
    
    // Navigation Tabs
    navHome: "मुख्य पृष्ठ",
    navCrowd: "भीड़ व दर्शन पास",
    navMap: "वारी मानचित्र",
    navStays: "आवास व अन्नछत्र",
    navLost: "खोया-पाया",
    navSos: "आपातकालीन SOS",
    navAbhang: "अभंग व मार्गदर्शक",
    navVolunteer: "स्वयंसेवक पंजीकरण",

    // Home Dashboard Cards
    cardCrowdTitle: "दर्शन कतार व भीड़ स्थिति",
    cardCrowdDesc: "श्री विट्ठल रुक्मिणी मंदिर परिसर की लाइव भीड़ व ई-दर्शन पास।",
    
    cardMapTitle: "वारी मार्ग व लाइव मानचित्र",
    cardMapDesc: "पालकी मार्ग, रिंगण स्थल, जल, चिकित्सा व शौचालय मानचित्र।",

    cardStaysTitle: "निःशुल्क आवास व अन्नछत्र",
    cardStaysDesc: "भक्त निवास, मठ, स्कूल, उपलब्ध बिस्तर एवं भोजन वितरण स्थल।",

    cardLostTitle: "खोया-पाया (Family Finder)",
    cardLostDesc: "अपने प्रियजनों या वस्तुओं को खोजें अथवा गुमशुदगी दर्ज करें।",

    cardSosTitle: "आपातकालीन सहायता (SOS)",
    cardSosDesc: "चिकित्सा सहायता, एम्बुलेंस, पुलिस व सहायता केंद्र त्वरित संपर्क।",

    cardAbhangTitle: "दैनिक अभंग व स्वास्थ्य सलाह",
    cardAbhangDesc: "पैदल चलते समय अभंग सुनें व वारकरी स्वास्थ्य सलाह प्राप्त करें।",

    // Crowd View
    crowdLevelTitle: "लाइव भीड़ का स्तर",
    mukhDarshan: "मुख दर्शन समय",
    charanSparsh: "चरण स्पर्श दर्शन समय",
    queueLength: "कतार की लंबाई",
    activeGates: "सक्रिय प्रवेश द्वार",
    bookTokenHeader: "ई-दर्शन टोकन पास प्राप्त करें",
    pilgrimName: "श्रद्धालु का नाम",
    phoneNumber: "मोबाइल नंबर",
    pilgrimCount: "कुल श्रद्धालुओं की संख्या",
    selectTimeSlot: "समय स्लॉट चुनें",
    selectDarshanType: "दर्शन का प्रकार",
    generatePassBtn: "ई-दर्शन पास बनाएं 🎫",
    tokenPassTitle: "श्री विट्ठल दर्शन ई-पास",
    tokenNumber: "टोकन सं.",
    downloadPassBtn: "पास डाउनलोड करें",

    // Map View
    mapHeader: "पंढरपुर वारी व पालकी मार्ग मानचित्र",
    filterAll: "सभी स्थान",
    filterPalkhi: "🚩 पालकी स्थिति",
    filterWater: "💧 पीने का पानी",
    filterMedical: "🏥 चिकित्सा शिविर",
    filterStay: "⛺ आवास स्थल",
    filterFood: "🍲 अन्नछत्र",
    filterToilet: "🚻 शौचालय",
    filterRingan: "🐎 रिंगण मैदान",
    myLocationBtn: "📍 मेरी स्थिति खोजें",

    // Stays View
    stayHeader: "निःशुल्क आवास व अन्नछत्र स्थल",
    availableBeds: "उपलब्ध बिस्तर",
    totalBeds: "कुल क्षमता",
    distanceFromTemple: "मंदिर से दूरी",
    callStayBtn: "📞 संपर्क करें",
    bookBedBtn: "बिस्तर आरक्षित करें",
    annachhatraTitle: "महाप्रसाद व अन्नछत्र सेवा",
    servingTimes: "समय",
    menuToday: "आज का महाप्रसाद",

    // Lost and Found View
    lostHeader: "खोया-पाया सहायता केंद्र",
    reportMissingBtn: "➕ गुमशुदगी दर्ज करें",
    reportFoundBtn: "पाया गया व्यक्ति/वस्तु दर्ज करें",
    searchByName: "नाम या स्थान से खोजें...",
    missingSince: "लापता होने का समय",
    contactFamily: "परिवार से संपर्क करें",
    broadcastAudio: "🔊 लाउडस्पीकर घोषणा करें",

    // SOS View
    sosHeader: "🚨 त्वरित आपातकालीन सहायता (1-Tap SOS)",
    sosDescription: "यदि आप किसी समस्या में हैं तो नीचे दिए बटन पर क्लिक करें। स्वयंसेवक व चिकित्सा दल तुरंत पहुंचेगा।",
    sendSosBtn: "तत्काल SOS सहायता भेजें",
    sosMedical: "चिकित्सा आपातकाल (Medical)",
    sosPolice: "सुरक्षा / पुलिस (Police Help)",
    sosLostChild: "बच्चा लापता (Lost Child)",
    sosWater: "जल / भोजन समस्या (Water Crisis)",
    helplinesTitle: "महत्वपूर्ण हेल्पलाइन नंबर",

    // Abhang & Guide
    abhangHeader: "भक्ति संगीत, अभंग व वारकरी स्वास्थ्य मार्गदर्शक",
    healthTipsTitle: "पैदल यात्रा के दौरान सावधानियां",
    tip1: "हर 2 घंटे में पर्याप्त पानी व ओआरएस (ORS) घोल पीते रहें।",
    tip2: "पैरों में छाले होने पर निकटतम प्राथमिक चिकित्सा शिविर में दवा लगाएं।",
    tip3: "अपना पहचान पत्र व मोबाइल हमेशा सुरक्षित रखें।",

    // Volunteer
    volunteerHeader: "वारकरी सेवा - स्वयंसेवक पंजीकरण",
    volunteerFormTitle: "मैं वारी सेवा में योगदान देना चाहता हूँ",
    submitSevaBtn: "सेवा पंजीकरण करें"
  },

  en: {
    appName: "WariSeva (वारकरी सेवा)",
    tagline: "Official Digital Pilgrim Assistant for Pandharpur Wari",
    welcomeGreeting: "Ram Krishna Hari! 🙏",
    palkhiStatusHeader: "Live Palkhi Procession Location",
    
    // Header & Actions
    langTitle: "Select Language / भाषा निवडा",
    textSizeLarge: "Large Font",
    textSizeNormal: "Normal Font",
    voiceAssist: "Voice Assist",
    voiceReading: "Reading aloud...",
    emergencySosBtn: "🚨 1-Tap SOS Emergency",
    
    // Navigation Tabs
    navHome: "Home",
    navCrowd: "Crowd & Darshan",
    navMap: "Wari Route Map",
    navStays: "Stays & Food",
    navLost: "Lost & Found",
    navSos: "Emergency SOS",
    navAbhang: "Abhang & Guide",
    navVolunteer: "Volunteer Seva",

    // Home Dashboard Cards
    cardCrowdTitle: "Live Queue & Crowd Status",
    cardCrowdDesc: "Real-time queue wait time at Shri Vitthal Temple & e-Darshan pass.",
    
    cardMapTitle: "Interactive Wari Route Map",
    cardMapDesc: "Live Palkhi route, Ringan venues, water points, medical camps & toilets.",

    cardStaysTitle: "Free Stays & Food (Annachhatra)",
    cardStaysDesc: "Bhakta Niwas, Mathas, Schools, bed availability & free meal hubs.",

    cardLostTitle: "Lost & Found (Family Finder)",
    cardLostDesc: "Search missing family members, lost items, or file a report.",

    cardSosTitle: "Emergency SOS Assistance",
    cardSosDesc: "1-Tap medical aid, ambulance, police dispatch & emergency helplines.",

    cardAbhangTitle: "Daily Abhangs & Health Guide",
    cardAbhangDesc: "Listen to devotional Abhangs & view health guidelines for Warkaris.",

    // Crowd View
    crowdLevelTitle: "Live Crowd Level",
    mukhDarshan: "Mukh Darshan Wait",
    charanSparsh: "Charan Sparsh Wait",
    queueLength: "Queue Length",
    activeGates: "Active Entry Gates",
    bookTokenHeader: "Get e-Darshan Token Pass",
    pilgrimName: "Pilgrim Full Name",
    phoneNumber: "Mobile Number",
    pilgrimCount: "Number of Pilgrims",
    selectTimeSlot: "Select Preferred Time Slot",
    selectDarshanType: "Darshan Type",
    generatePassBtn: "Generate e-Darshan Pass 🎫",
    tokenPassTitle: "Shri Vitthal Darshan e-Pass",
    tokenNumber: "Token No.",
    downloadPassBtn: "Download Pass",

    // Map View
    mapHeader: "Pandharpur Wari Interactive Route Map",
    filterAll: "All Places",
    filterPalkhi: "🚩 Palkhi Location",
    filterWater: "💧 Drinking Water",
    filterMedical: "🏥 Medical Camp",
    filterStay: "⛺ Free Lodging",
    filterFood: "🍲 Free Meals",
    filterToilet: "🚻 Restrooms",
    filterRingan: "🐎 Ringan Venue",
    myLocationBtn: "📍 Find My Location",

    // Stays View
    stayHeader: "Free Accommodation & Food Hubs",
    availableBeds: "Available Beds",
    totalBeds: "Total Capacity",
    distanceFromTemple: "Distance to Temple",
    callStayBtn: "📞 Call Host",
    bookBedBtn: "Reserve Bed",
    annachhatraTitle: "Free Meal Distribution (Annachhatra)",
    servingTimes: "Serving Hours",
    menuToday: "Today's Prasad Menu",

    // Lost and Found View
    lostHeader: "Lost & Found Pilgrim Finder",
    reportMissingBtn: "➕ Report Missing Person",
    reportFoundBtn: "Report Found Person",
    searchByName: "Search by name or location...",
    missingSince: "Missing Since",
    contactFamily: "Contact Family",
    broadcastAudio: "🔊 Broadcast Audio Alert",

    // SOS View
    sosHeader: "🚨 Instant 1-Tap Emergency SOS",
    sosDescription: "If you need immediate help, tap below. Emergency volunteers & medical teams will be dispatched to your location.",
    sendSosBtn: "Send Immediate SOS Signal",
    sosMedical: "Medical Emergency",
    sosPolice: "Police & Security",
    sosLostChild: "Lost Child Alert",
    sosWater: "Water / Food Crisis",
    helplinesTitle: "Important Helpline Contacts",

    // Abhang & Guide
    abhangHeader: "Devotional Abhangs & Warkari Health Guide",
    healthTipsTitle: "Walking Pilgrimage Safety Rules",
    tip1: "Drink plenty of water and ORS electrolytes every 2 hours.",
    tip2: "Visit nearby medical tents immediately if you develop blisters.",
    tip3: "Keep your ID card and emergency contact details in your pocket.",

    // Volunteer
    volunteerHeader: "WariSeva Volunteer Registration",
    volunteerFormTitle: "Offer Seva / Help Fellow Pilgrims",
    submitSevaBtn: "Register for Seva"
  }
};

export function getTranslation(lang: Language, key: keyof typeof translations['en']): string {
  const langDict = translations[lang] || translations.mr;
  return langDict[key] || translations.mr[key] || translations.en[key] || key;
}
