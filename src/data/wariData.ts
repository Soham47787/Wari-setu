import { CrowdStatus, MapPoint, AccommodationItem, AnnachhatraItem, LostItem, AbhangItem, UserProfile, VolunteerMember, LandmarkLocation } from '../types';

export const initialCrowdStatus: CrowdStatus = {
  lastUpdated: {
    mr: "१० मिनिटांपूर्वी (10 mins ago)",
    hi: "10 मिनट पूर्व (10 mins ago)",
    en: "10 mins ago (Live Sensor Feed)"
  },
  templeStatus: "Open",
  templeStatusText: {
    mr: "श्री विठ्ठल रुक्मिणी मुख्य मंदिर सुरू आहे (दर्शन खुले)",
    hi: "श्री विट्ठल रुक्मिणी मुख्य मंदिर खुला है (दर्शन चालू)",
    en: "Shri Vitthal Rukmini Main Temple is OPEN for Darshan"
  },
  darshanDate: "२९ ऑगस्ट २०२६ (आषाढी एकादशी सोहळा)",
  templeHours: "सकाळी ०४:०० ते रात्री ११:३०",
  crowdLevel: "High",
  mukhDarshanWaitMins: 40,
  charanSparshWaitHours: 4.5,
  queueLengthMeters: 1800,
  nextAartiName: {
    mr: "धूपारती (सायंकाळी)",
    hi: "धूपारती (संध्याकालीन)",
    en: "Dhoop Aarti (Evening)"
  },
  nextAartiTime: "०७:०० PM",
  vipQueueStatus: "Open",
  seniorCitizenQueueStatus: "Priority Line Active",
  palkhiStageLocation: {
    mr: "वाखरी मुक्काम (पंढरपूरजवळ ५ किमी)",
    hi: "वाखरी विश्राम (पंढरपुर निकट 5 किमी)",
    en: "Wakhari Halt (5 km to Pandharpur)"
  },
  activeGates: [
    { mr: "गेट १ (महाद्वार घाट - सामान्य रांग)", hi: "गेट 1 (महाद्वार घाट - सामान्य कतार)", en: "Gate 1 (Mahadwar Ghat - General Queue)", status: "open" },
    { mr: "गेट २ (पश्चिम दर्शन मंडप)", hi: "गेट 2 (पश्चिम दर्शन मंडप)", en: "Gate 2 (West Darshan Pavilion)", status: "open" },
    { mr: "गेट ३ (दक्षिण व्हीआयपी व वृद्ध प्रवेशद्वार)", hi: "गेट 3 (दक्षिण वीआईपी व वरिष्ठ नागरिक)", en: "Gate 3 (South VIP & Seniors Entry)", status: "open" },
    { mr: "गेट ४ (नामदेव पायरी मार्ग)", hi: "गेट 4 (नामदेव पायरी मार्ग)", en: "Gate 4 (Namdev Steps Route)", status: "open" }
  ],
  noticeMessage: {
    mr: "श्री विठ्ठल रुक्मिणी गाभारा दर्शनासाठी मुख दर्शन रांग महाद्वार घाट येथून संथ गतीने सुरू आहे. ज्येष्ठ नागरिकांनी रांगेत मोफत ओआरएस व जलसेवेचा लाभ घ्यावा.",
    hi: "श्री विट्ठल मंदिर परिसर में मुख दर्शन पंक्ति सुचारू रूप से चल रही है। वरिष्ठ नागरिक कतार में निःशुल्क ओआरएस व जल सेवा का लाभ लें।",
    en: "Mukh Darshan queue is moving steadily from Mahadwar Ghat. Free ORS and drinking water counters are available for senior pilgrims along the route."
  },
  emergencyBroadcastNotice: "🚩 श्री विठ्ठल रुक्मिणी मंदिर पंढरपूर: आज मुख्य महापूजा वेळेत संपन्न झाली असून भाविकांसाठी दर्शन सुरळीत चालू आहे. गर्दीच्या ठिकाणी सेवेकऱ्यांच्या सूचनांचे पालन करावे."
};

export const palkhiStageStatus = {
  mr: "श्री संत ज्ञानेश्वर महाराज पालखी सोहळा: मुक्काम - वाखरी (पंढरपूरजवळ ५ किमी)",
  hi: "श्री संत ज्ञानेश्वर महाराज पालकी समारोह: विश्राम - वाखरी (पंढरपुर निकट 5 किमी)",
  en: "Sant Dnyaneshwar Maharaj Palkhi Procession: Halt at Wakhari (5 km to Pandharpur)"
};

export const defaultUserProfile: UserProfile = {
  id: "user_sample_1",
  name: "ज्ञानेश्वर मारुती पाटील",
  phone: "9822014455",
  email: "dnyaneshwar.patil@example.com",
  gender: "male",
  role: "warkari",
  bloodGroup: "O+",
  emergencyContactName: "तुकाराम पाटील (भाऊ)",
  emergencyContactPhone: "9422033441",
  city: "पुणे (Pune)",
  district: "पुणे",
  dindiName: "आळंदी ते पंढरपूर दिंडी क्र. २७",
  isLoggedIn: true,
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
};

export const initialMapPoints: MapPoint[] = [
  // 1. Temple Sanctum
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
      en: "Pandharpur Holy Temple sanctum and primary entrance."
    },
    contactPhone: "02186-224466",
    occupancyOrStatus: {
      mr: "दर्शन रांग सुरू (४० मिनिटे)",
      hi: "दर्शन कतार जारी (40 मिनट)",
      en: "Darshan queue active (40 mins)"
    },
    priceOrFree: {
      mr: "विनामूल्य दर्शन",
      hi: "निःशुल्क दर्शन",
      en: "Free Public Darshan"
    },
    address: {
      mr: "मंदिर परिसर, महाद्वार पेठ, पंढरपूर",
      hi: "मंदिर परिसर, महाद्वार पेठ, पंढरपुर",
      en: "Temple Complex, Mahadwar Peth, Pandharpur"
    }
  },

  // 2. Hotels & Lodges (NEW)
  {
    id: "hotel_vitthal_inn",
    title: {
      mr: "हॉटेल विठ्ठल इन (Hotel Vitthal Inn)",
      hi: "होटल विट्ठल इन",
      en: "Hotel Vitthal Inn Pandharpur"
    },
    category: "hotel",
    lat: 17.6795,
    lng: 75.3225,
    description: {
      mr: "एसी व नॉन-एसी सुसज्ज रुम्स, २४ तास गरम पाणी, पार्किंग व शुद्ध शाकाहारी उपहारगृह.",
      hi: "एसी व नॉन-एसी कमरे, 24 घंटे गर्म पानी, पार्किंग एवं शुद्ध शाकाहारी भोजनालय।",
      en: "AC & Deluxe family rooms, 24/7 hot water, parking and vegetarian restaurant."
    },
    contactPhone: "02186-228899",
    occupancyOrStatus: {
      mr: "१२ रुम्स उपलब्ध",
      hi: "12 कमरे उपलब्ध",
      en: "12 Rooms Available"
    },
    priceOrFree: {
      mr: "₹१,२०० / रात्र",
      hi: "₹1,200 / रात्रि",
      en: "₹1,200 / Night"
    },
    address: {
      mr: "स्टेशन रोड, पंढरपूर (मंदिरापासून ६०० मी.)",
      hi: "स्टेशन रोड, पंढरपुर (मंदिर से 600 मी.)",
      en: "Station Road, Pandharpur (600m from temple)"
    }
  },
  {
    id: "hotel_balaji_residency",
    title: {
      mr: "हॉटेल बालाजी रेसिडेन्सी व लॉज",
      hi: "होटल बालाजी रेजीडेंसी",
      en: "Hotel Balaji Residency & Lodge"
    },
    category: "hotel",
    lat: 17.6830,
    lng: 75.3260,
    description: {
      mr: "वारकरी कुटुंबांसाठी स्वस्त व स्वच्छ रुम्स, वायफाय आणि लिफ्ट सुविधा.",
      hi: "श्रद्धालु परिवारों के लिए स्वच्छ कमरे, वाईफाई और लिफ्ट सुविधा।",
      en: "Clean budget lodging for pilgrim families, WiFi and elevator access."
    },
    contactPhone: "9822998877",
    occupancyOrStatus: {
      mr: "८ फॅमिली रुम्स शिल्लक",
      hi: "8 फैमिली रूम उपलब्ध",
      en: "8 Family Rooms Left"
    },
    priceOrFree: {
      mr: "₹८०० - ₹१,५००",
      hi: "₹800 - ₹1,500",
      en: "₹800 - ₹1,500 / Night"
    },
    address: {
      mr: "लिंक रोड, पंढरपूर बस स्थानकाजवळ",
      hi: "लिंक रोड, बस स्टैंड के पास, पंढरपुर",
      en: "Link Road, Near Bus Stand, Pandharpur"
    }
  },
  {
    id: "hotel_iskcon_guesthouse",
    title: {
      mr: "इस्कॉन गेस्ट हाऊस व आश्रम",
      hi: "इस्कॉन गेस्ट हाउस व आश्रम",
      en: "ISKCON Pilgrim Guest House"
    },
    category: "hotel",
    lat: 17.6715,
    lng: 75.3265,
    description: {
      mr: "चंद्रभागा नदीकाठी शांत व प्रसन्न वातावरण, सात्विक भोजन व सुरक्षित पार्किंग.",
      hi: "चंद्रभागा तट पर शांत वातावरण, सात्विक भोजन एवं सुरक्षित पार्किंग।",
      en: "Serene riverfront stay, Satvik meals, and spacious secure parking."
    },
    contactPhone: "02186-225577",
    occupancyOrStatus: {
      mr: "२० रुम्स उपलब्ध",
      hi: "20 कमरे उपलब्ध",
      en: "20 Rooms Available"
    },
    priceOrFree: {
      mr: "₹९०० / रात्र (देणगी)",
      hi: "₹900 / रात्रि",
      en: "₹900 / Night (Donation)"
    },
    address: {
      mr: "चंद्रभागा काठ, इस्कॉन रोड, पंढरपूर",
      hi: "चंद्रभागा तट, इस्कॉन मार्ग, पंढरपुर",
      en: "Chandrabhaga Bank, ISKCON Road, Pandharpur"
    }
  },

  // 3. Stays & Dharamshalas
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
    occupancyOrStatus: {
      mr: "४२० खाटा उपलब्ध",
      hi: "420 बिस्तर उपलब्ध",
      en: "420 Beds Available"
    },
    priceOrFree: {
      mr: "विनामूल्य (Free)",
      hi: "निःशुल्क",
      en: "100% Free"
    },
    address: {
      mr: "स्टेशन रोड, पंढरपूर",
      hi: "स्टेशन रोड, पंढरपुर",
      en: "Station Road, Pandharpur"
    }
  },
  {
    id: "stay_tanpure_math",
    title: {
      mr: "तनपुरे महाराज वारकरी मठ व सेवा केंद्र",
      hi: "तनपुरे महाराज वारकरी मठ",
      en: "Tanpure Maharaj Warkari Math"
    },
    category: "stay",
    lat: 17.6760,
    lng: 75.3210,
    description: {
      mr: "पारंपारिक वारकरी मठ, कीर्तन हॉल, निःशुल्क महाप्रसाद व २४ तास पाणी.",
      hi: "पारंपरिक वारकरी मठ, कीर्तन हॉल व निःशुल्क महाप्रसाद।",
      en: "Traditional Warkari monastery, Kirtan hall, free meals & 24/7 water."
    },
    contactPhone: "9822334455",
    occupancyOrStatus: {
      mr: "९५ खाटा उपलब्ध",
      hi: "95 बिस्तर उपलब्ध",
      en: "95 Beds Available"
    },
    priceOrFree: {
      mr: "विनामूल्य (Free)",
      hi: "निःशुल्क",
      en: "100% Free"
    },
    address: {
      mr: "नाथा चौक, पंढरपूर (मंदिरापासून ५०० मी.)",
      hi: "नाथा चौक, पंढरपुर",
      en: "Natha Chowk, Pandharpur (500m from temple)"
    }
  },

  // 4. Palkhi Location
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
    occupancyOrStatus: {
      mr: "सक्रिय तळ (Active Camp)",
      hi: "सक्रिय शिविर",
      en: "Active Camp Grounds"
    }
  },

  // 5. Drinking Water & ORS
  {
    id: "water_mahadwar",
    title: {
      mr: "💧 मोफत शुद्ध पिण्याचे पाणी व ORS - महाद्वार",
      hi: "💧 निःशुल्क शुद्ध पेयजल व ORS - महाद्वार",
      en: "💧 Free Drinking Water & ORS Station - Mahadwar"
    },
    category: "water",
    lat: 17.6785,
    lng: 75.3245,
    description: {
      mr: "२४ तास थंड व निर्जंतुक पिण्याचे पाणी आणि मोफत ओआरएस पाकीट वाटप.",
      hi: "24 घंटे ठंडा व स्वच्छ पेयजल एवं निःशुल्क ओआरएस वितरण।",
      en: "24/7 cold purified drinking water station with free ORS electrolyte packets."
    },
    contactPhone: "9422301122"
  },
  {
    id: "water_stand_chandrabhaga",
    title: {
      mr: "💧 चंद्रभागा वाळवंट जलसेवा केंद्र",
      hi: "💧 चंद्रभागा तट पेयजल केंद्र",
      en: "💧 Chandrabhaga Ghat Clean Water Point"
    },
    category: "water",
    lat: 17.6735,
    lng: 75.3200,
    description: {
      mr: "वाळवंट परिसरात १५ टॅप्सचे फिरते पिण्याचे पाण्याचे टँकर.",
      hi: "नदी तट पर 15 नलों वाला स्वच्छ पेयजल टैंकर।",
      en: "15-tap continuous drinking water tankers on the sandy bank."
    }
  },

  // 6. Medical Camps & Ambulance
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
      mr: "१० डॉक्टर्स, औषधे, पायांच्या फोडांची मलमपट्टी व १०८ रुग्णवाहिका सेवा मोफत.",
      hi: "10 डॉक्टर, दवाइयां, पैरों के छाले उपचार व एम्बुलेंस सेवा निःशुल्क।",
      en: "10 Doctors, free medicines, foot blister care & 108 ambulance."
    },
    contactPhone: "108"
  },
  {
    id: "medical_station_road",
    title: {
      mr: "🏥 आपत्कालीन प्राथमिक आरोग्य केंद्र (रेल्वे स्टेशन)",
      hi: "🏥 रेलवे स्टेशन आपातकालीन प्राथमिक स्वास्थ्य केंद्र",
      en: "🏥 Station Road Emergency Health Clinic"
    },
    category: "medical",
    lat: 17.6845,
    lng: 75.3295,
    description: {
      mr: "२४ तास ईसीजी, ऑक्सिजन, बीपी तपासणी व मोफत औषध गोळ्या.",
      hi: "24 घंटे ईसीजी, ऑक्सीजन एवं निःशुल्क दवाइयां।",
      en: "24/7 ECG, Oxygen, BP check and free prescription medicines."
    },
    contactPhone: "02186-221102"
  },

  // 7. Free Meals / Annachhatra
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
    id: "food_gajanan_shegaon",
    title: {
      mr: "🍲 शेगाव संस्थान अखंड महाप्रसाद केंद्र (६० फूट रोड)",
      hi: "🍲 शेगांव संस्थान अखंड महाप्रसाद केंद्र",
      en: "🍲 Shegaon Sansthan Continuous Prasad Center"
    },
    category: "food",
    lat: 17.6860,
    lng: 75.3240,
    description: {
      mr: "सकाळी ६ ते रात्री ११ वाजेपर्यंत अखंड ताजा महाप्रसाद व चहा.",
      hi: "सुबह 6 से रात 11 तक अनवरत ताजा महाप्रसाद।",
      en: "Non-stop freshly cooked Prasad and tea from 6 AM to 11 PM."
    },
    contactPhone: "02186-225500"
  },

  // 8. Parking Areas (NEW)
  {
    id: "parking_wakhari_ringan",
    title: {
      mr: "🅿️ वाखरी रिंगण भव्य वाहन पार्किंग (P1)",
      hi: "🅿️ वाखरी रिंगण विशाल वाहन पार्किंग (P1)",
      en: "🅿️ Wakhari Ringan Mega Vehicle Parking (P1)"
    },
    category: "parking",
    lat: 17.7020,
    lng: 75.3030,
    description: {
      mr: "५००० गाड्या व बसेससाठी प्रशस्त जागा, सीसीटीव्ही सुरक्षा व मोफत शटल बस.",
      hi: "5000 कारों व बसों हेतु स्थान, सीसीटीवी व मुफ्त शटल बस।",
      en: "Space for 5000 cars/buses, CCTV surveillance, and free shuttle buses to town."
    },
    contactPhone: "02186-229911",
    priceOrFree: {
      mr: "विनामूल्य सरकारी पार्किंग",
      hi: "निःशुल्क पार्किंग",
      en: "Free Govt Parking"
    }
  },
  {
    id: "parking_station_bypass",
    title: {
      mr: "🅿️ स्टेशन बायपास रिंग रोड पार्किंग (P2)",
      hi: "🅿️ स्टेशन बाईपास पार्किंग (P2)",
      en: "🅿️ Station Bypass Ring Road Parking (P2)"
    },
    category: "parking",
    lat: 17.6890,
    lng: 75.3350,
    description: {
      mr: "खाजगी गाड्या, ट्रॅव्हल्स व ट्रॅक्टर्ससाठी अधिकृत पार्किंग व्यवस्था.",
      hi: "निजी गाड़ियों व बसों के लिए सुरक्षित पार्किंग।",
      en: "Authorized parking lot for private cars, traveler vans, and tractors."
    }
  },

  // 9. Free Shoe Stands (NEW)
  {
    id: "shoestand_mahadwar",
    title: {
      mr: "👟 मोफत चप्पल/पादुका स्टँड - महाद्वार घाट",
      hi: "👟 निःशुल्क पादुका स्टैंड - महाद्वार घाट",
      en: "👟 Free Footwear & Shoe Stand - Mahadwar Ghat"
    },
    category: "shoe_stand",
    lat: 17.6780,
    lng: 75.3242,
    description: {
      mr: "टोकन पद्धतीसह वारकऱ्यांच्या चपला व पादुकांचे मोफत व सुरक्षित रक्षण.",
      hi: "टोकन प्रणाली द्वारा जूतों/चप्पलों की निःशुल्क सुरक्षित देखरेख।",
      en: "Token-based secure free custody for pilgrim shoes and footwear."
    },
    priceOrFree: {
      mr: "१००% विनामूल्य (Free Token)",
      hi: "100% निःशुल्क",
      en: "100% Free Service"
    }
  },
  {
    id: "shoestand_gate3",
    title: {
      mr: "👟 मोफत पादुका स्टँड - गेट नंबर ३ (दक्षिण द्वार)",
      hi: "👟 निःशुल्क पादुका स्टैंड - गेट 3",
      en: "👟 Free Shoe Stand - Gate No. 3 (South Entry)"
    },
    category: "shoe_stand",
    lat: 17.6765,
    lng: 75.3235,
    description: {
      mr: "दर्शन रांगेत जाण्यापूर्वी चप्पल ठेवण्यासाठी स्वयंसेवकांचे सेवा केंद्र.",
      hi: "दर्शन कतार में जाने से पूर्व जूता जमा केंद्र।",
      en: "Sevak counter for footwear storage before entering queue."
    }
  },

  // 10. Toilets
  {
    id: "toilet_complex_1",
    title: {
      mr: "🚻 फिरते बायोटॉयलेट व स्वच्छतागृह संकुल",
      hi: "🚻 मोबाइल बायोटॉयलेट कॉम्प्लेक्स",
      en: "🚻 Mobile Bio-Toilet Complex"
    },
    category: "toilet",
    lat: 17.6760,
    lng: 75.3220,
    description: {
      mr: "१०० पेक्षा जास्त स्वच्छ टॉयलेट ब्लॉक्स, महिला व पुरुषांसाठी स्वतंत्र सोय.",
      hi: "100 से अधिक स्वच्छ शौचालय ब्लॉक।",
      en: "Over 100 clean mobile bio-toilets with water supply and separate sections."
    }
  },

  // 11. Ringan Grounds
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
    pricePerNight: "Free / विनामूल्य",
    contactPhone: "02186-224411",
    facilities: ["Wheelchair Accessible", "24x7 Hot Water", "Free Meals", "Charging Station", "Medical Desk", "Safe Lockers"],
    lat: 17.6820,
    lng: 75.3280,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "acc_hotel_vitthal_inn",
    name: {
      mr: "हॉटेल विठ्ठल इन (Hotel Vitthal Inn)",
      hi: "होटल विट्ठल इन (Hotel Vitthal Inn)",
      en: "Hotel Vitthal Inn & Deluxe Lodge"
    },
    type: "Hotel",
    address: {
      mr: "स्टेशन रोड, पंढरपूर (मंदिरापासून ६०० मी.)",
      hi: "स्टेशन रोड, पंढरपुर (मंदिर से 600 मी.)",
      en: "Station Road, Pandharpur (600m from temple)"
    },
    distanceFromTempleKm: 0.6,
    totalBeds: 120,
    availableBeds: 18,
    isFree: false,
    pricePerNight: "₹1,200 - ₹2,200",
    contactPhone: "02186-228899",
    facilities: ["AC Deluxe Rooms", "Elevator Lift", "24x7 Hot Water", "Attached Bathroom", "WiFi", "Restaurant"],
    lat: 17.6795,
    lng: 75.3225,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "acc_2",
    name: {
      mr: "तनपुरे महाराज वारकरी मठ व धर्मशाळा",
      hi: "तनपुरे महाराज वारकरी मठ व धर्मशाला",
      en: "Tanpure Maharaj Warkari Math & Dharamshala"
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
    pricePerNight: "Free / विनामूल्य",
    contactPhone: "9822334455",
    facilities: ["Free Meals", "24x7 Hot Water", "Charging Station", "Prayer Hall", "Senior Citizen Floor"],
    lat: 17.6760,
    lng: 75.3210,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "acc_hotel_balaji",
    name: {
      mr: "हॉटेल बालाजी रेसिडेन्सी (Hotel Balaji Residency)",
      hi: "होटल बालाजी रेजीडेंसी",
      en: "Hotel Balaji Residency & Family Lodge"
    },
    type: "Hotel",
    address: {
      mr: "नवीन बस स्टँड रोड, पंढरपूर (मंदिरापासून १ किमी)",
      hi: "नया बस स्टैंड मार्ग, पंढरपुर (मंदिर से 1 किमी)",
      en: "New Bus Stand Road, Pandharpur (1 km from temple)"
    },
    distanceFromTempleKm: 1.0,
    totalBeds: 85,
    availableBeds: 12,
    isFree: false,
    pricePerNight: "₹900 - ₹1,600",
    contactPhone: "9822998877",
    facilities: ["Clean Bedding", "Car Parking", "Hot Water", "Drinking Water", "Room Service"],
    lat: 17.6830,
    lng: 75.3260,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=80"
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
    pricePerNight: "Free / विनामूल्य",
    contactPhone: "02186-221199",
    facilities: ["Wheelchair Accessible", "Charging Station", "Security Guard", "Drinking Water", "Ground Matting"],
    lat: 17.6730,
    lng: 75.3250,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "acc_4",
    name: {
      mr: "वाखरी रोड भव्य तंबू शहर (Pilgrim Tent City)",
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
    pricePerNight: "Free / विनामूल्य",
    contactPhone: "9423009988",
    facilities: ["Wheelchair Accessible", "Free Meals", "Medical Desk", "Mobile Bio Toilets", "Shuttle Bus"],
    lat: 17.6950,
    lng: 75.3100,
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=500&auto=format&fit=crop&q=80"
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
    missingSince: {
      mr: "आज सकाळी ८:३० वाजता",
      hi: "आज सुबह 8:30 बजे",
      en: "Today at 8:30 AM"
    },
    contactPerson: "केशव जगताप (मुलाचा नंबर)",
    contactPhone: "9822144332",
    description: {
      mr: "पांढरा कुर्ता-धोतर, डोक्यावर वारकरी टोपी, हातात वीणा पिशवी आहे.",
      hi: "सफेद कुर्ता-धोती, सिर पर वारकरी टोपी, हाथ में झोला।",
      en: "Wearing white kurta-dhoti, traditional Warkari cap, carrying a Veena bag."
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
    missingSince: {
      mr: "काल संध्याकाळी ६:०० वाजता",
      hi: "कल शाम 6:00 बजे",
      en: "Yesterday at 6:00 PM"
    },
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
    missingSince: {
      mr: "३ तासांपूर्वी",
      hi: "3 घंटे पहले",
      en: "3 hours ago"
    },
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
    title: {
      mr: "अवघा रंग एक झाला",
      hi: "अवघा रंग एक झाला",
      en: "Avagha Ranga Ek Zhala"
    },
    saint: {
      mr: "संत सोयराबाई",
      hi: "संत सोयराबाई",
      en: "Sant Soyarabai"
    },
    singer: {
      mr: "किशोरी आमोणकर (Gana Saraswati Kishori Amonkar)",
      hi: "गान सरस्वती किशोरी आमोणकर",
      en: "Kishori Amonkar"
    },
    lyrics: {
      mr: "अवघा रंग एक झाला । रंगी रंगला श्रीरंग ॥\nमी तू पण गेले वाया । पाहता पंढरीच्या राया ॥\nनाही भेदाभेद काही । अवघा आनंदूची पाही ॥",
      hi: "अवघा रंग एक झाला । रंगी रंगला श्रीरंग ॥\nमी तू पण गेले वाया । पाहता पंढरीच्या राया ॥\nनाही भेदाभेद काही । अवघा आनंदूची पाही ॥",
      en: "Avagha ranga eka jhala, rangi rangala Shriranga.\nMi tu pana gele vaya, pahata Pandharichya raya."
    },
    translationEn: "All colors have merged into one divine aura of Vitthal. Looking at the Lord of Pandhari, all divisions of 'I and You' have melted away into supreme spiritual bliss.",
    youtubeUrl: "https://www.youtube.com/watch?v=wXhX6wM0kC8",
    youtubeId: "wXhX6wM0kC8",
    duration: "7:45 Mins",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "abh_2",
    title: {
      mr: "आनंदाचे डोही आनंद तरंग",
      hi: "आनंदाचे डोही आनंद तरंग",
      en: "Anandache Dohi Ananda Taranga"
    },
    saint: {
      mr: "संत तुकाराम महाराज",
      hi: "संत तुकाराम महाराज",
      en: "Sant Tukaram Maharaj"
    },
    singer: {
      mr: "पं. भीमसेन जोशी (Bharat Ratna Pt. Bhimsen Joshi)",
      hi: "पं. भीमसेन जोशी",
      en: "Pt. Bhimsen Joshi"
    },
    lyrics: {
      mr: "आनंदाचे डोही आनंद तरंग । आनंदचि अंग आनंदाचे ॥\nकाय सांगो झाले काहीचिया बाही । पुढे उरले नाही दुजे काही ॥",
      hi: "आनंदाचे डोही आनंद तरंग । आनंदचि अंग आनंदाचे ॥\nकाय सांगो झाले काहीचिया बाही । पुढे उरले नाही दुजे काही ॥",
      en: "Anandache dohi ananda taranga, anandachi anga anandache."
    },
    translationEn: "Waves of bliss in the lake of ultimate divine joy! Every fiber of existence has become ecstasy, leaving behind no sorrow, ego or duality.",
    youtubeUrl: "https://www.youtube.com/watch?v=kYJv8P7kU-8",
    youtubeId: "kYJv8P7kU-8",
    duration: "6:12 Mins",
    thumbnail: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "abh_3",
    title: {
      mr: "माझे माहेर पंढरी",
      hi: "माझे माहेर पंढरी",
      en: "Majhe Maher Pandhari"
    },
    saint: {
      mr: "संत एकनाथ महाराज",
      hi: "संत एकनाथ महाराज",
      en: "Sant Eknath Maharaj"
    },
    singer: {
      mr: "पं. भीमसेन जोशी (Pt. Bhimsen Joshi)",
      hi: "पं. भीमसेन जोशी",
      en: "Pt. Bhimsen Joshi"
    },
    lyrics: {
      mr: "माझे माहेर पंढरी । आहे भीवरेच्या तीरी ॥\nबाप आणि आई । माझी विठ्ठल रखुमाई ॥\nपुंडलिक बंधू । त्याचा काय सांगू प्रेमा ॥",
      hi: "माझे माहेर पंढरी । आहे भीवरेच्या तीरी ॥\nबाप आणि आई । माझी विठ्ठल रखुमाई ॥\nपुंडलिक बंधू । त्याचा काय सांगू प्रेमा ॥",
      en: "Majhe maher Pandhari, aahe Bhivarechya teeri.\nBap aani aai majhi Vitthal Rakhumai."
    },
    translationEn: "My maternal home is holy Pandharpur on the banks of Chandrabhaga. My father and mother are Lord Vitthal and Mother Rakhumai.",
    youtubeUrl: "https://www.youtube.com/watch?v=0kY8F7F4BqY",
    youtubeId: "0kY8F7F4BqY",
    duration: "8:20 Mins",
    thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "abh_4",
    title: {
      mr: "सुंदर ते ध्यान उभे विटेवरी",
      hi: "सुंदर ते ध्यान उभे विटेवरी",
      en: "Sundar Te Dhyan Ubhe Vitevori"
    },
    saint: {
      mr: "संत तुकाराम महाराज",
      hi: "संत तुकाराम महाराज",
      en: "Sant Tukaram Maharaj"
    },
    singer: {
      mr: "अजित कडकडे (Ajit Kadkade)",
      hi: "अजित कडकडे",
      en: "Ajit Kadkade"
    },
    lyrics: {
      mr: "सुंदर ते ध्यान उभे विटेवरी । कर कटावरी ठेवोनिया ॥\nतुळशीचे हार गळा कासे पीतांबर । आवडे निरंतर हेचि ध्यान ॥",
      hi: "सुंदर ते ध्यान उभे विटेवरी । कर कटावरी ठेवोनिया ॥\nतुळशीचे हार गळा कासे पीतांबर । आवडे निरंतर हेचि ध्यान ॥",
      en: "Sundar te dhyan ubhe vitevari, kara katavari thevoniya.\nTulashiche haar gala kase pitambar, aavade nirantara hechi dhyana."
    },
    translationEn: "How sublime is this vision standing on the holy brick with hands on waist! Adorned with Tulsi garland and yellow silk, this form captivates the soul eternally.",
    youtubeUrl: "https://www.youtube.com/watch?v=5V2yW8c5PqM",
    youtubeId: "5V2yW8c5PqM",
    duration: "6:50 Mins",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "abh_5",
    title: {
      mr: "नाचू कीर्तनाचे रंगी",
      hi: "नाचू कीर्तनाचे रंगी",
      en: "Nachu Kirtanache Rangi"
    },
    saint: {
      mr: "संत नामदेव महाराज",
      hi: "संत नामदेव महाराज",
      en: "Sant Namdev Maharaj"
    },
    singer: {
      mr: "अनुराधा पौडवाल व सुरेश वाडकर",
      hi: "अनुराधा पौडवाल व सुरेश वाडकर",
      en: "Anuradha Paudwal & Suresh Wadkar"
    },
    lyrics: {
      mr: "नाचू कीर्तनाचे रंगी । ज्ञानदीप लावू जगी ॥\nसर्वभावे शरण जाऊ पंढरीनाथा । अभंग गाऊ विठ्ठल गाथा ॥",
      hi: "नाचू कीर्तनाचे रंगी । ज्ञानदीप लावू जगी ॥\nसर्वभावे शरण जाऊ पंढरीनाथा । अभंग गाऊ विठ्ठल गाथा ॥",
      en: "Nachu kirtanache rangi, gyanadeep laavu jagi."
    },
    translationEn: "Let us dance in the ecstatic colors of Kirtan and kindle the flame of divine wisdom in the entire world, praising Lord Vitthal.",
    youtubeUrl: "https://www.youtube.com/watch?v=gT_N1mY6h3s",
    youtubeId: "gT_N1mY6h3s",
    duration: "5:30 Mins",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "abh_6",
    title: {
      mr: "विठू माऊली तू माउली जगाची",
      hi: "विठू माउली तू माउली जगाची",
      en: "Vithu Mauli Tu Mauli Jagachi"
    },
    saint: {
      mr: "संत परंपरा (पारंपारिक गीत)",
      hi: "संत परंपरा (पारंपरिक)",
      en: "Traditional Saint Lore"
    },
    singer: {
      mr: "सुधीर फडके व सुरेश वाडकर (Sudhir Phadke & Suresh Wadkar)",
      hi: "सुधीर फडके व सुरेश वाडकर",
      en: "Sudhir Phadke & Suresh Wadkar"
    },
    lyrics: {
      mr: "विठू माऊली तू माउली जगाची । काय थोरवी सांगावी तुझ्या पायाची ॥\nपंढरीची वारी देह भान हरपून । पांडुरंग विठ्ठल बोलतो मुखाने ॥",
      hi: "विठू माउली तू माउली जगाची । काय थोरवी सांगावी तुझ्या पायाची ॥\nपंढरीची वारी देह भान हरपून । पांडुरंग विठ्ठल बोलतो मुखाने ॥",
      en: "Vithu Mauli tu mauli jagachi, kaay thoravi sangavi tujhya payachi."
    },
    translationEn: "O Vitthal, You are the loving mother of the entire universe! Immersed in the joy of the Pandhari pilgrimage, our lips chant Panduranga Vitthal.",
    youtubeUrl: "https://www.youtube.com/watch?v=3Kz9H6J0XFw",
    youtubeId: "3Kz9H6J0XFw",
    duration: "6:40 Mins",
    thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "abh_7",
    title: {
      mr: "रूप पाहता लोचनी",
      hi: "रूप पाहता लोचनी",
      en: "Roop Pahata Lochani"
    },
    saint: {
      mr: "संत ज्ञानेश्वर महाराज",
      hi: "संत ज्ञानेश्वर महाराज",
      en: "Sant Dnyaneshwar Maharaj"
    },
    singer: {
      mr: "पं. भीमसेन जोशी (Pt. Bhimsen Joshi)",
      hi: "पं. भीमसेन जोशी",
      en: "Pt. Bhimsen Joshi"
    },
    lyrics: {
      mr: "रूप पाहता लोचनी । सुख झाले वो साजणी ॥\nतो हा विठ्ठल बरवा । तो हा माधव बरवा ॥\nबहुता सुकृताची जोडी । म्हणुनी विठ्ठली आवडी ॥",
      hi: "रूप पाहता लोचनी । सुख झाले वो साजणी ॥\nतो हा विठ्ठल बरवा । तो हा माधव बरवा ॥\nबहुता सुकृताची जोडी । म्हणुनी विठ्ठली आवडी ॥",
      en: "Roop pahata lochani, sukha jhale vo sajani.\nTo haa Vitthala barava, to haa Madhava barava."
    },
    translationEn: "Beholding the divine form of Vitthal, my eyes and soul are drenched in supreme peace and bliss.",
    youtubeUrl: "https://www.youtube.com/watch?v=p4vW7tJ9e2I",
    youtubeId: "p4vW7tJ9e2I",
    duration: "7:15 Mins",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "abh_8",
    title: {
      mr: "कानडा राजा पंढरीचा",
      hi: "कानडा राजा पंढरीचा",
      en: "Kanada Raja Pandharicha"
    },
    saint: {
      mr: "संत परंपरा / जी. डी. माडगूळकर",
      hi: "संत परंपरा / जी. डी. माडगूलकर",
      en: "Traditional / G. D. Madgulkar"
    },
    singer: {
      mr: "सुधीर फडके व पं. वसंतराव देशपांडे",
      hi: "सुधीर फडके व पं. वसंतराव देशपांडे",
      en: "Sudhir Phadke & Vasantrao Deshpande"
    },
    lyrics: {
      mr: "कानडा राजा पंढरीचा । वेदांनाही नाही कळला अंतपार याचा ॥\nनिराकार निर्गुण ईश्वर । विटेवरी उभा भक्त सखा पांडुरंग ॥",
      hi: "कानडा राजा पंढरीचा । वेदांनाही नाही कळला अंतपार याचा ॥\nनिराकार निर्गुण ईश्वर । विटेवरी उभा भक्त सखा पांडुरंग ॥",
      en: "Kanada Raja Pandharicha, vedannahi nahi kalala antapaar yacha."
    },
    translationEn: "The enigmatic Lord of Pandhari whose divine bounds even the ancient Vedas cannot fathom!",
    youtubeUrl: "https://www.youtube.com/watch?v=0kY8F7F4BqY",
    youtubeId: "0kY8F7F4BqY",
    duration: "5:50 Mins",
    thumbnail: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=80"
  }
];

export const emergencyHelplines = [
  {
    name: "१०८ रुग्णवाहिका (108 Ambulance)",
    nameEn: "108 Emergency Ambulance",
    phone: "108",
    role: "वैद्यकीय आणीबाणी / Medical Emergency"
  },
  {
    name: "११२ पोलीस नियंत्रण कक्ष (112 Police)",
    nameEn: "112 Police Control Room",
    phone: "112",
    role: "पोलीस व सुरक्षा / Police & Security"
  },
  {
    name: "पंढरपूर मंदिर समिती कंट्रोल रूम",
    nameEn: "Pandharpur Temple Trust Control Room",
    phone: "02186-224466",
    role: "मंदिर प्रशासन / Temple Administration"
  },
  {
    name: "वारी आपत्ती व्यवस्थापन कक्ष",
    nameEn: "Wari Disaster Management Cell",
    phone: "02186-223000",
    role: "आपत्ती निवारण / Disaster Control"
  },
  {
    name: "जिल्हा आरोग्य अधिकारी कक्ष",
    nameEn: "District Health Officer Desk",
    phone: "9422001122",
    role: "आरोग्य व डॉक्टर्स / Health & Doctors"
  },
  {
    name: "महिला व बाल सुरक्षा हेल्पलाईन",
    nameEn: "Women & Child Safety Helpline",
    phone: "1090",
    role: "सुरक्षा कक्ष / Women Protection"
  }
];

export const initialVolunteers: VolunteerMember[] = [
  {
    id: "vol_1",
    name: "माऊली ज्ञानेश्वर कदम",
    phone: "9822091234",
    city: "पुणे (Pune)",
    sevaType: "जल सेवा (Water Distribution)",
    assignedLocation: {
      mr: "महाद्वार घाट - जलछत्र केंद्र क्र. २",
      hi: "महाद्वार घाट - जल सेवा केंद्र 2",
      en: "Mahadwar Ghat - Water Booth #2"
    },
    status: "on_duty",
    registeredAt: "२९ ऑगस्ट २०२६, सकाळी ८:००",
    badgeNumber: "SEVA-PND-104",
    bloodGroup: "O+",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "vol_2",
    name: "सुनील तुकाराम जगताप",
    phone: "9823114567",
    city: "सोलापूर (Solapur)",
    sevaType: "गर्दी व्यवस्थापन (Crowd Queue Guide)",
    assignedLocation: {
      mr: "दर्शन रांग शेड क्र. ५ (पश्चिम दर्शन मंडप)",
      hi: "दर्शन कतार शेड 5 (पश्चिम दर्शन मंडप)",
      en: "Darshan Queue Shed #5 (West Pavilion)"
    },
    status: "on_duty",
    registeredAt: "२९ ऑगस्ट २०२६, सकाळी ९:३०",
    badgeNumber: "SEVA-PND-218",
    bloodGroup: "B+",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "vol_3",
    name: "डॉ. प्रज्ञा अरविंद देशमुख",
    phone: "9422019876",
    city: "सातारा (Satara)",
    sevaType: "वैद्यकीय मदत (Medical First-Aid)",
    assignedLocation: {
      mr: "चंद्रभागा वाळवंट प्राथमिक आरोग्य केंद्र",
      hi: "चंद्रभागा तट प्राथमिक स्वास्थ्य केंद्र",
      en: "Chandrabhaga Sands Medical Camp #1"
    },
    status: "on_duty",
    registeredAt: "२९ ऑगस्ट २०२६, सकाळी ७:००",
    badgeNumber: "SEVA-MED-05",
    bloodGroup: "A+",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "vol_4",
    name: "आनंदराव विठ्ठल शिंदे",
    phone: "9822456789",
    city: "पंढरपूर (Pandharpur)",
    sevaType: "अन्नछत्र सेवा (Food & Prasadam)",
    assignedLocation: {
      mr: "श्री संत तनपुरे महाराज मठ अन्नछत्र",
      hi: "श्री संत तनपुरे महाराज मठ अन्नछत्र",
      en: "Sant Tanpure Maharaj Math Annachhatra"
    },
    status: "on_duty",
    registeredAt: "२९ ऑगस्ट २०२६, सकाळी ६:३०",
    badgeNumber: "SEVA-PND-312",
    bloodGroup: "AB+",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "vol_5",
    name: "शितल योगेश भोसले",
    phone: "9922883344",
    city: "कोल्हापूर (Kolhapur)",
    sevaType: "हरवलेले शोधा (Lost Child & Elder Help)",
    assignedLocation: {
      mr: "पोलीस नियंत्रण कक्ष शेजारी, स्टेशन रोड",
      hi: "पुलिस नियंत्रण कक्ष के पास, स्टेशन रोड",
      en: "Near Police Station Helpdesk, Station Rd"
    },
    status: "on_duty",
    registeredAt: "२९ ऑगस्ट २०२६, सकाळी १०:००",
    badgeNumber: "SEVA-PND-408",
    bloodGroup: "O-",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "vol_6",
    name: "रामेश्वर पांडुरंग मोटे",
    phone: "9860123987",
    city: "बीड (Beed)",
    sevaType: "ज्येष्ठ वारकरी सेवा (Elder Assistance & Wheelchair)",
    assignedLocation: {
      mr: "गेट ३ (दक्षिण व्हीआयपी व वृद्ध प्रवेशद्वार)",
      hi: "गेट 3 (दक्षिण वीआईपी व वरिष्ठ नागरिक द्वार)",
      en: "Gate 3 (South Elderly Pilgrim Desk)"
    },
    status: "off_duty",
    registeredAt: "२९ ऑगस्ट २०२६, दुपारी २:००",
    badgeNumber: "SEVA-PND-520",
    bloodGroup: "B+",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
  }
];

export const pandharpurLandmarks: LandmarkLocation[] = [
  {
    id: "temple_main",
    name: {
      mr: "श्री विठ्ठल रुक्मिणी मुख्य मंदिर (Vitthal Temple)",
      hi: "श्री विट्ठल रुक्मिणी मुख्य मंदिर",
      en: "Shri Vitthal Rukmini Main Temple"
    },
    category: "temple",
    lat: 17.6775,
    lng: 75.3239,
    description: {
      mr: "पंढरपूर तीर्थक्षेत्र मुख्य गाभारा व दर्शन महाद्वार",
      hi: "पंढरपुर मुख्य मंदिर एवं दर्शन महाद्वार",
      en: "Main Pandharpur Sanctum & Holy Gate"
    }
  },
  {
    id: "chandrabhaga_ghat",
    name: {
      mr: "चंद्रभागा स्नान घाट व पुंडलिक मंदिर",
      hi: "चंद्रभागा स्नान घाट व पुंडलिक मंदिर",
      en: "Chandrabhaga River Snan Ghat & Pundalik Temple"
    },
    category: "ghat",
    lat: 17.6750,
    lng: 75.3280,
    description: {
      mr: "पवित्र चंद्रभागा नदी स्नान, वाळवंट व दीपमाळ परिसर",
      hi: "पवित्र चंद्रभागा स्नान घाट एवं दीपमाल",
      en: "Holy Chandrabhaga River bathing ghat & sands"
    }
  },
  {
    id: "railway_station",
    name: {
      mr: "पंढरपूर रेल्वे स्टेशन (Railway Station)",
      hi: "पंढरपुर रेलवे स्टेशन",
      en: "Pandharpur Railway Station"
    },
    category: "transit",
    lat: 17.6855,
    lng: 75.3180,
    description: {
      mr: "विशेष वारी रेल्वे गाड्या व भाविक मदत केंद्र",
      hi: "विशेष वारी ट्रेन एवं यात्री सहायता केंद्र",
      en: "Special Wari pilgrim trains & assistance booth"
    }
  },
  {
    id: "bus_stand",
    name: {
      mr: "पंढरपूर मध्यवर्ती बस स्थानक (MSRTC Bus Stand)",
      hi: "पंढरपुर बस स्टैंड",
      en: "Pandharpur Central MSRTC Bus Stand"
    },
    category: "transit",
    lat: 17.6820,
    lng: 75.3250,
    description: {
      mr: "एसटी महामंडळ विशेष वारी बसेस, नियंत्रण कक्ष व चौकशी",
      hi: "एसटी बस स्टैंड एवं पूछताछ केंद्र",
      en: "State Transport Special Wari Buses Terminal"
    }
  },
  {
    id: "wakhari_ringan",
    name: {
      mr: "वाखरी पालखी रिंगण मैदान (Wakhari Ringan Ground)",
      hi: "वाखरी पालकी रिंगण मैदान",
      en: "Wakhari Palkhi Ringan & Tent City"
    },
    category: "ringan",
    lat: 17.7010,
    lng: 75.3020,
    description: {
      mr: "संत ज्ञानेश्वर व तुकाराम महाराज पालखी रिंगण व भव्य वारकरी मुक्काम",
      hi: "पालकी रिंगण स्थल व महामुक्काम",
      en: "Grand Horse Ringan Ground and Mega Pilgrim Camp"
    }
  },
  {
    id: "tanpure_math",
    name: {
      mr: "श्री संत तनपुरे महाराज मठ (अन्नछत्र व निवास)",
      hi: "श्री संत तनपुरे महाराज मठ",
      en: "Sant Tanpure Maharaj Math (Free Stay & Food)"
    },
    category: "stay",
    lat: 17.6788,
    lng: 75.3210,
    description: {
      mr: "२४ तास अखंड महाप्रसाद अन्नछत्र व वारकरी निवास",
      hi: "24 घंटे अखंड महाप्रसाद एवं आवास",
      en: "24x7 Free Food distribution & large pilgrim dorms"
    }
  },
  {
    id: "bhakta_niwas_1",
    name: {
      mr: "श्री विठ्ठल रुक्मिणी भक्त निवास क्र. १",
      hi: "श्री विट्ठल भक्त निवास क्र. 1",
      en: "Shri Vitthal Bhakta Niwas Complex #1"
    },
    category: "stay",
    lat: 17.6740,
    lng: 75.3215,
    description: {
      mr: "मंदिर समिती अधिकृत भक्त निवास (५०० खाटा, गरम पाणी, लिफ्ट)",
      hi: "मंदिर समिति आधिकारिक भक्त निवास",
      en: "Temple Trust official dormitory with modern amenities"
    }
  },
  {
    id: "isbavi_bypass",
    name: {
      mr: "इसबावी रिंगण व पालखी तळ (Isbavi Ringan)",
      hi: "इसबावी रिंगण स्थल",
      en: "Isbavi Ringan & Camping Grounds"
    },
    category: "ringan",
    lat: 17.6690,
    lng: 75.3120,
    description: {
      mr: "उभे व गोल रिंगण मैदान व वाहनतळ",
      hi: "गोल रिंगण मैदान व पार्किंग",
      en: "Traditional Ringan Ground and large parking"
    }
  },
  {
    id: "gopalpur_temple",
    name: {
      mr: "श्री गोपालपूर मंदिर (Gopalpur Temple)",
      hi: "श्री गोपालपुर मंदिर",
      en: "Shri Gopalpur Temple & Kala Grounds"
    },
    category: "temple",
    lat: 17.6580,
    lng: 75.3320,
    description: {
      mr: "गोपालकाला उत्सव स्थान व गायींचे खिल्लार",
      hi: "गोपालकाला उत्सव स्थान",
      en: "Holy Gopal-Kala closing festival ground"
    }
  }
];
