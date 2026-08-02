import { CrowdStatus, MapPoint, AccommodationItem, AnnachhatraItem, LostItem, AbhangItem } from '../types';

export const initialCrowdStatus: CrowdStatus = {
  lastUpdated: "१० मिनिटांपूर्वी (10 mins ago)",
  crowdLevel: "High",
  mukhDarshanWaitMins: 40,
  charanSparshWaitHours: 4.5,
  queueLengthMeters: 1800,
  activeGates: ["Gate 1 (Mahadwar)", "Gate 2 (West Stand)", "Gate 3 (VIP Entry)"],
  noticeMessage: {
    mr: "श्री विठ्ठल रुक्मिणी गाभारा दर्शनासाठी मुख दर्शन रांग महाद्वार घाट येथून संथ गतीने सुरू आहे. ज्येष्ठ नागरिकांनी रांगेत मोफत ओआरएस पाकीट घ्यावे.",
    hi: "श्री विट्ठल मंदिर परिसर में मुख दर्शन पंक्ति तेजी से चल रही है। बुजुर्ग श्रद्धालु कतार में निःशुल्क ओआरएस व जल सेवा का लाभ लें।",
    en: "Mukh Darshan queue moving steadily from Mahadwar Ghat. Free ORS and water counters available for senior pilgrims."
  }
};

export const palkhiStageStatus = {
  mr: "श्री संत ज्ञानेश्वर महाराज पालखी सोहळा: मुक्काम - वाखरी (पंढरपूरजवळ ५ किमी)",
  hi: "श्री संत ज्ञानेश्वर महाराज पालकी समारोह: विश्राम - वाखरी (पंढरपुर निकट 5 किमी)",
  en: "Sant Dnyaneshwar Maharaj Palkhi Procession: Halt at Wakhari (5 km to Pandharpur)"
};

export const initialMapPoints: MapPoint[] = [
  {
    id: "temple_pandharpur",
    title: {
      mr: "श्री विठ्ठल रुक्मिणी मुख्य मंदिर (Pandharpur)",
      hi: "श्री विट्ठल रुक्मिणी मुख्य मंदिर",
      en: "Shri Vitthal Rukmini Main Temple"
    },
    category: "temple",
    lat: 17.6775,
    lng: 75.3239,
    description: {
      mr: "पंढरपूर तीर्थक्षेत्र मुख्य गाभारा व दर्शन महाद्वार.",
      hi: "पंढरपुर तीर्थक्षेत्र मुख्य मंदिर व दर्शन द्वार।",
      en: "Pandharpur Holy Temple sanctum and main entrance."
    },
    contactPhone: "02186-224466",
    occupancyOrStatus: "Crowd High"
  },
  {
    id: "palkhi_wakhari",
    title: {
      mr: "🚩 संत ज्ञानेश्वर महाराज पालखी मुक्काम (वाखरी)",
      hi: "🚩 संत ज्ञानेश्वर महाराज पालकी विश्राम (वाखरी)",
      en: "🚩 Sant Dnyaneshwar Palkhi Camp (Wakhari)"
    },
    category: "palkhi",
    lat: 17.6980,
    lng: 75.3050,
    description: {
      mr: "वाखरी येथे भव्य पालखी रिंगण व अंतिम मुक्काम स्थळ.",
      hi: "वाखरी में भव्य पालकी रिंगण व अंतिम विश्राम स्थल।",
      en: "Wakhari grand Ringan grounds and final halt before temple."
    },
    contactPhone: "9822012345",
    occupancyOrStatus: "Active Camp"
  },
  {
    id: "water_mahadwar",
    title: {
      mr: "💧 मोफत शुद्ध पिण्याचे पाणी - महाद्वार",
      hi: "💧 निःशुल्क शुद्ध पेयजल - महाद्वार",
      en: "💧 Free Drinking Water Station - Mahadwar"
    },
    category: "water",
    lat: 17.6785,
    lng: 75.3245,
    description: {
      mr: "२४ तास थंड व निर्जंतुक पिण्याचे पाणी उपलब्ध.",
      hi: "24 घंटे ठंडा व स्वच्छ पेयजल उपलब्ध।",
      en: "24/7 cold purified drinking water station."
    },
    contactPhone: "9422301122"
  },
  {
    id: "medical_chandrabhaga",
    title: {
      mr: "🏥 मध्यवर्ती आरोग्य छावणी - चंद्रभागा घाट",
      hi: "🏥 केंद्रीय चिकित्सा शिविर - चंद्रभागा घाट",
      en: "🏥 Central Medical Camp - Chandrabhaga Ghat"
    },
    category: "medical",
    lat: 17.6740,
    lng: 75.3210,
    description: {
      mr: "१० डॉक्टर्स, औषधे, मलमपट्टी व रुग्णवाहिका सेवा मोफत.",
      hi: "10 डॉक्टर, दवाइयां व एम्बुलेंस सेवा निःशुल्क।",
      en: "10 Doctors, free medicines, foot blister care & ambulance."
    },
    contactPhone: "108"
  },
  {
    id: "stay_bhakta_niwas",
    title: {
      mr: "⛺ सरकारी भक्त निवास (६००० खाटा)",
      hi: "⛺ सरकारी भक्त निवास (6000 बिस्तर)",
      en: "⛺ Govt Bhakta Niwas (6000 Beds)"
    },
    category: "stay",
    lat: 17.6820,
    lng: 75.3280,
    description: {
      mr: "विनामूल्य गरम पाणी, महिलांसाठी सुरक्षित कक्ष व मोबाईल चार्जिंग.",
      hi: "मुफ्त गर्म पानी, महिला कक्ष एवं मोबाइल चार्जिंग।",
      en: "Free hot water, safe women section & phone charging."
    },
    contactPhone: "02186-223344",
    occupancyOrStatus: "420 Beds Available"
  },
  {
    id: "food_annachhatra_isckon",
    title: {
      mr: "🍲 इसकॉन महाप्रसाद अन्नछत्र",
      hi: "🍲 इस्कॉन महाप्रसाद अन्नक्षेत्र",
      en: "🍲 ISKCON Free Annachhatra Meals"
    },
    category: "food",
    lat: 17.6720,
    lng: 75.3260,
    description: {
      mr: "रोज ५०,००० वारकऱ्यांना विनामूल्य गरम खिचडी महाप्रसाद.",
      hi: "प्रतिदिन 50,000 वारकरियों को निःशुल्क भोजन महाप्रसाद।",
      en: "Serves free hot Khichdi prasad to 50,000 pilgrims daily."
    },
    contactPhone: "9823456789"
  },
  {
    id: "toilet_complex_1",
    title: {
      mr: "🚻 फिरते बायोटॉयलेट व स्वच्छतागृह कॉम्प्लेक्स",
      hi: "🚻 मोबाइल बायोटॉयलेट कॉम्प्लेक्स",
      en: "🚻 Mobile Bio-Toilet Complex"
    },
    category: "toilet",
    lat: 17.6760,
    lng: 75.3220,
    description: {
      mr: "१०० पेक्षा जास्त स्वच्छ टॉयलेट ब्लॉक्स.",
      hi: "100 से अधिक स्वच्छ शौचालय ब्लॉक।",
      en: "Over 100 clean mobile bio-toilets with water supply."
    }
  },
  {
    id: "ringan_wakhari",
    title: {
      mr: "🐎 वाखरी अश्व रिंगण मैदान",
      hi: "🐎 वाखरी अश्व रिंगण मैदान",
      en: "🐎 Wakhari Horse Ringan Grounds"
    },
    category: "ringan",
    lat: 17.7010,
    lng: 75.3020,
    description: {
      mr: "वारकरी संप्रदायाचे प्रसिद्ध धावते अश्व रिंगण सोहळा ठिकाण.",
      hi: "वारकरी संप्रदाय का प्रसिद्ध अश्व रिंगण समारोह स्थल।",
      en: "Famous traditional equestrian Ringan ceremony field."
    }
  }
];

export const initialAccommodations: AccommodationItem[] = [
  {
    id: "acc_1",
    name: {
      mr: "श्री विठ्ठल-रुक्मिणी भक्त निवास नंबर १",
      hi: "श्री विट्ठल-रुक्मिणी भक्त निवास नंबर 1",
      en: "Shri Vitthal-Rukmini Bhakta Niwas No. 1"
    },
    type: "BhaktaNiwas",
    address: {
      mr: "स्टेशन रोड, पंढरपूर (मंदिरापासून १.२ किमी)",
      hi: "स्टेशन रोड, पंढरपुर (मंदिर से 1.2 किमी)",
      en: "Station Road, Pandharpur (1.2 km from temple)"
    },
    distanceFromTempleKm: 1.2,
    totalBeds: 2500,
    availableBeds: 340,
    isFree: true,
    contactPhone: "02186-224411",
    facilities: ["Wheelchair Accessible", "24x7 Hot Water", "Free Meals", "Charging Station", "Medical Desk"],
    lat: 17.6820,
    lng: 75.3280
  },
  {
    id: "acc_2",
    name: {
      mr: "तनपुरे महाराज वारकरी मठ व सेवा केंद्र",
      hi: "तनपुरे महाराज वारकरी मठ व सेवा केंद्र",
      en: "Tanpure Maharaj Warkari Math"
    },
    type: "Matha",
    address: {
      mr: "नाथा चौक, पंढरपूर (मंदिरापासून ५०० मीटर)",
      hi: "नाथा चौक, पंढरपुर (मंदिर से 500 मीटर)",
      en: "Natha Chowk, Pandharpur (500m from temple)"
    },
    distanceFromTempleKm: 0.5,
    totalBeds: 800,
    availableBeds: 95,
    isFree: true,
    contactPhone: "9822334455",
    facilities: ["Free Meals", "24x7 Hot Water", "Charging Station", "Prayer Hall"],
    lat: 17.6760,
    lng: 75.3210
  },
  {
    id: "acc_3",
    name: {
      mr: "जिल्हा परिषद प्राथमिक शाळा निवारा केंद्र (कॅम्प ३)",
      hi: "जिला परिषद प्राथमिक विद्यालय निवास केंद्र (कैंप 3)",
      en: "ZP Primary School Pilgrim Shelter (Camp 3)"
    },
    type: "School",
    address: {
      mr: "चंद्रभागा काठ, पंढरपूर (मंदिरापासून ८०० मीटर)",
      hi: "चंद्रभागा तट, पंढरपुर (मंदिर से 800 मीटर)",
      en: "Chandrabhaga Bank, Pandharpur (800m from temple)"
    },
    distanceFromTempleKm: 0.8,
    totalBeds: 1200,
    availableBeds: 410,
    isFree: true,
    contactPhone: "02186-221199",
    facilities: ["Wheelchair Accessible", "Charging Station", "Security Guard", "Drinking Water"],
    lat: 17.6730,
    lng: 75.3250
  },
  {
    id: "acc_4",
    name: {
      mr: "वाखरी रोड भव्य तंबू शहर (Tent City)",
      hi: "वाखरी रोड विशाल टेंट सिटी (Tent City)",
      en: "Wakhari Road Pilgrim Tent City"
    },
    type: "TentCity",
    address: {
      mr: "वाखरी बायपास बायरोड (मंदिरापासून ३.५ किमी)",
      hi: "वाखरी बाईपास रोड (मंदिर से 3.5 किमी)",
      en: "Wakhari Bypass Road (3.5 km from temple)"
    },
    distanceFromTempleKm: 3.5,
    totalBeds: 5000,
    availableBeds: 1850,
    isFree: true,
    contactPhone: "9423009988",
    facilities: ["Wheelchair Accessible", "Free Meals", "Medical Desk", "Mobile Bio Toilets", "Shuttle Bus"],
    lat: 17.6950,
    lng: 75.3100
  }
];

export const initialAnnachhatras: AnnachhatraItem[] = [
  {
    id: "ann_1",
    organizer: {
      mr: "श्री संत गजानन महाराज संस्थान शेगाव (अन्नछत्र)",
      hi: "श्री संत गजानन महाराज संस्थान शेगांव (अन्नक्षेत्र)",
      en: "Shri Sant Gajanan Maharaj Sansthan Shegaon"
    },
    location: {
      mr: "६० फूट रोड, पंढरपूर",
      hi: "60 फीट रोड, पंढरपुर",
      en: "60 Feet Road, Pandharpur"
    },
    servingTimes: {
      mr: "सकाळी ६:०० ते रात्री ११:०० (अखंड महाप्रसाद)",
      hi: "प्रातः 6:00 से रात्रि 11:00 (अविराम महाप्रसाद)",
      en: "6:00 AM to 11:00 PM (Continuous Food Service)"
    },
    menuItems: {
      mr: "गरम साबुदाणा खिचडी, आमटी-भाजी, पोहे, चहा व दूध",
      hi: "गर्म खिचड़ी, चावल-सब्जी, पोहा, चाय एवं दूध",
      en: "Hot Sabudana Khichdi, Rice Curry, Poha, Tea & Milk"
    },
    dailyMealsCapacity: 100000,
    contactPhone: "02186-225500"
  },
  {
    id: "ann_2",
    organizer: {
      mr: "वारकरी सेवा संघ पुणे - महाप्रसाद केंद्र",
      hi: "वारकरी सेवा संघ पुणे - महाप्रसाद केंद्र",
      en: "Warkari Seva Sangh Pune Food Center"
    },
    location: {
      mr: "नवीन बस स्थानकाजवळ, पंढरपूर",
      hi: "नए बस स्टैंड के पास, पंढरपुर",
      en: "Near New Bus Stand, Pandharpur"
    },
    servingTimes: {
      mr: "सकाळी ७:०० ते रात्री १०:००",
      hi: "सुबह 7:00 से रात 10:00 तक",
      en: "7:00 AM to 10:00 PM"
    },
    menuItems: {
      mr: "चपाती, बटाटा भाजी, मसुराची आमटी, भात व ताक",
      hi: "रोटी, आलू सब्जी, दाल, चावल एवं छाछ",
      en: "Chapati, Potato Curry, Lentil Soup, Rice & Buttermilk"
    },
    dailyMealsCapacity: 45000,
    contactPhone: "9821098210"
  }
];

export const initialLostItems: LostItem[] = [
  {
    id: "lost_1",
    type: "person",
    name: "ज्ञानदेव मारुती जगताप (वय ६८ वर्ष)",
    age: 68,
    gender: "पुरुष (Male)",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    lastSeenLocation: {
      mr: "चंद्रभागा नदी वाळवंट, स्नान घाट परिसर",
      hi: "चंद्रभागा नदी तट, स्नान घाट परिसर",
      en: "Chandrabhaga River Bank, Bathing Ghat Area"
    },
    missingSince: "आज सकाळी ८:३० वाजता",
    contactPerson: "केशव जगताप (मुलाचा नंबर)",
    contactPhone: "9822144332",
    description: {
      mr: "पांढरा कुर्ता-धोतर, डोक्यावर वारकरी टोपी, हातात वीणा पिशवी आहे.",
      hi: "सफेद कुर्ता-धोती, सिर पर वारकरी टोपी, हाथ में झोला।",
      en: "Wearing white kurta-dhoti, traditional Warkari cap, carrying a bag."
    },
    status: "missing"
  },
  {
    id: "lost_2",
    type: "person",
    name: "सुमनबाई नामदेव शिंदे (वय ६२ वर्ष)",
    age: 62,
    gender: "स्त्री (Female)",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    lastSeenLocation: {
      mr: "महाद्वार घाट दर्शन रांग, गेट नंबर २ जवळ",
      hi: "महाद्वार घाट दर्शन कतार, गेट 2 के पास",
      en: "Mahadwar Ghat Darshan Queue, Near Gate 2"
    },
    missingSince: "काल संध्याकाळी ६:०० वाजता",
    contactPerson: "रामचंद्र शिंदे",
    contactPhone: "9422088776",
    description: {
      mr: "हिरवी नऊवारी साडी, तुळशीची माळ गळ्यात, पायात पैंजण आहे.",
      hi: "हरी साड़ी, गले में तुलसी माला।",
      en: "Green saree, Tulsi mala around neck, speaking Marathi."
    },
    status: "missing"
  },
  {
    id: "lost_3",
    type: "belonging",
    name: "काळ्या रंगाची वारकरी बॅग (कागदपत्रे व मोबाईल)",
    photoUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80",
    lastSeenLocation: {
      mr: "वाखरी मुक्काम शेड क्र. ४",
      hi: "वाखरी शेड संख्या 4",
      en: "Wakhari Rest Shed No. 4"
    },
    missingSince: "३ तासांपूर्वी",
    contactPerson: "तुकाराम माने",
    contactPhone: "9890123456",
    description: {
      mr: "बॅगेत आधार कार्ड, २५०० रुपये रोख आणि सॅमसंग फोन आहे.",
      hi: "बैग में आधार कार्ड, 2500 रुपये नकद और सैमसंग फोन है।",
      en: "Contains Aadhaar card, cash, and Samsung phone."
    },
    status: "missing"
  }
];

export const sampleAbhangs: AbhangItem[] = [
  {
    id: "abh_1",
    title: "अवघा रंग एक झाला",
    saint: "संत सोयराबाई / संत नामदेव",
    lyricsMr: "अवघा रंग एक झाला । रंगी रंगला श्रीरंग ॥\nमी तू पण गेले वाया । पाहता पंढरीच्या राया ॥\nनाही भेदाभेद काही । अवघा आनंदूची पाही ॥",
    lyricsHi: "अवघा रंग एक झाला । रंगी रंगला श्रीरंग ॥\nमी तू पण गेले वाया । पाहता पंढरीच्या राया ॥\nनाही भेदाभेद काही । अवघा आनंदूची पाही ॥",
    translationEn: "All colors have merged into one divine aura of Vitthal. Looking at the Lord of Pandhari, all divisions of 'I and You' have melted away into supreme joy."
  },
  {
    id: "abh_2",
    title: "आनंदाचे डोही आनंद तरंग",
    saint: "संत तुकाराम महाराज",
    lyricsMr: "आनंदाचे डोही आनंद तरंग । आनंदचि अंग आनंदाचे ॥\nकाय सांगो झाले काहीचिया बाही । पुढे उरले नाही दुजे काही ॥",
    lyricsHi: "आनंदाचे डोही आनंद तरंग । आनंदचि अंग आनंदाचे ॥\nकाय सांगो झाले काहीचिया बाही । पुढे उरले नाही दुजे काही ॥",
    translationEn: "Waves of bliss in the lake of ultimate joy! Every fiber of existence has become ecstasy, leaving behind no sorrow or duality."
  },
  {
    id: "abh_3",
    title: "नाचू कीर्तनाचे रंगी",
    saint: "संत नामदेव महाराज",
    lyricsMr: "नाचू कीर्तनाचे रंगी । ज्ञानदीप लावू जगी ॥\nसर्वभावे शरण जाऊ पंढरीनाथा । अभंग गाऊ विठ्ठल गाथा ॥",
    lyricsHi: "नाचू कीर्तनाचे रंगी । ज्ञानदीप लावू जगी ॥\nसर्वभावे शरण जाऊ पंढरीनाथा । अभंग गाऊ विठ्ठल गाथा ॥",
    translationEn: "Let us dance in the joy of Kirtan and light the lamp of wisdom across the world, surrendering with devotion at the feet of Vitthal."
  }
];

export const emergencyHelplines = [
  { name: "१०८ रुग्णवाहिका (108 Ambulance)", phone: "108", role: "वैद्यकीय आणीबाणी / Medical" },
  { name: "११२ पोलीस नियंत्रण कक्ष (112 Police)", phone: "112", role: "पोलीस व सुरक्षा / Police" },
  { name: "पंढरपूर मंदिर समिती कंट्रोल रूम", phone: "02186-224466", role: "मंदिर प्रशासन / Temple" },
  { name: "वारी आपत्ती व्यवस्थापन कक्ष", phone: "02186-223000", role: "आपत्ती व निवारण / Disaster" },
  { name: "जिल्हा आरोग्य अधिकारी कक्ष", phone: "9422001122", role: "आरोग्य व डॉक्टर्स / Health" }
];
