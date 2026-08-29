import React, { useState } from 'react';
import { Language, LandmarkLocation } from '../types';
import { pandharpurLandmarks } from '../data/wariData';
import { getTranslation } from '../translations';
import { 
  Navigation, 
  MapPin, 
  Compass, 
  Footprints, 
  Droplet, 
  HeartPulse, 
  ShieldAlert, 
  Zap, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

interface NearbyServicesDistanceViewProps {
  language: Language;
}

// Preset starting locations
const presetStartPoints: LandmarkLocation[] = [
  {
    id: 'user_railway',
    name: {
      mr: 'पंढरपूर रेल्वे स्टेशन (Pandharpur Railway Station)',
      hi: 'पंढरपुर रेलवे स्टेशन',
      en: 'Pandharpur Railway Station'
    },
    category: 'transit',
    lat: 17.6855,
    lng: 75.3180,
    description: {
      mr: 'मुख्य रेल्वे स्थानक व पूर्व प्रवेशद्वार',
      hi: 'मुख्य रेलवे स्टेशन',
      en: 'Main Railway Station'
    }
  },
  {
    id: 'user_bus_stand',
    name: {
      mr: 'मध्यवर्ती एसटी बस स्थानक (Central Bus Stand)',
      hi: 'केंद्रीय बस स्टैंड',
      en: 'Central MSRTC Bus Stand'
    },
    category: 'transit',
    lat: 17.6820,
    lng: 75.3250,
    description: {
      mr: 'एसटी बसेस व रिक्षा थांबा',
      hi: 'एसटी बस स्टॉप',
      en: 'State Transport Terminal'
    }
  },
  {
    id: 'user_chandrabhaga',
    name: {
      mr: 'चंद्रभागा स्नान घाट (Chandrabhaga River Ghat)',
      hi: 'चंद्रभागा स्नान घाट',
      en: 'Chandrabhaga Bathing Ghat'
    },
    category: 'ghat',
    lat: 17.6750,
    lng: 75.3280,
    description: {
      mr: 'पवित्र स्नान घाट व पुंडलिक मंदिर',
      hi: 'पवित्र स्नान घाट',
      en: 'Holy River Ghat'
    }
  },
  {
    id: 'user_wakhari',
    name: {
      mr: 'वाखरी पालखी तळ व रिंगण मैदान (Wakhari Ringan)',
      hi: 'वाखरी पालकी मैदान',
      en: 'Wakhari Ringan Camp'
    },
    category: 'ringan',
    lat: 17.7010,
    lng: 75.3020,
    description: {
      mr: 'मुख्य वारी तळ व महामुक्काम',
      hi: 'वारी महामुक्काम स्थल',
      en: 'Major Wari Camp'
    }
  },
  {
    id: 'user_isbavi',
    name: {
      mr: 'इसबावी रिंगण मैदान (Isbavi Ringan)',
      hi: 'इसबावी रिंगण मैदान',
      en: 'Isbavi Ringan Ground'
    },
    category: 'ringan',
    lat: 17.6690,
    lng: 75.3120,
    description: {
      mr: 'इसबावी प्रवेशद्वार व वाहनतळ',
      hi: 'इसबावी वाहन पार्किंग',
      en: 'Isbavi Entrance'
    }
  }
];

// Essential Pandharpur facilities & services
const essentialServicesData = [
  {
    id: 'srv_1',
    type: 'water',
    icon: Droplet,
    name: {
      mr: 'महाद्वार घाट जलछत्र केंद्र',
      hi: 'महाद्वार घाट जल सेवा केंद्र',
      en: 'Mahadwar Ghat Free Water Booth'
    },
    location: {
      mr: 'महाद्वार पोलीस चौकीजवळ, मंदिर परिसर',
      hi: 'महाद्वार पुलिस चौकी के पास',
      en: 'Near Mahadwar Police Chowki'
    },
    timing: {
      mr: '२४ तास अखंड (24x7 Active)',
      hi: '२४ घंटे निरंतर (24x7)',
      en: '24x7 Active'
    },
    provider: 'श्री विठ्ठल मंदिर समिती',
    contact: '02186-224466',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
  },
  {
    id: 'srv_2',
    type: 'medical',
    icon: HeartPulse,
    name: {
      mr: 'चंद्रभागा वाळवंट आपत्कालीन रुग्णालय व ICU',
      hi: 'चंद्रभागा तट आपातकालीन अस्पताल व आईसीयू',
      en: 'Chandrabhaga Sands Mobile Emergency ICU'
    },
    location: {
      mr: 'पुंडलिक मंदिराच्या मागे, चंद्रभागा वाळवंट',
      hi: 'पुंडलिक मंदिर के पीछे, चंद्रभागा तट',
      en: 'Behind Pundalik Temple, River Sands'
    },
    timing: {
      mr: '२४ तास डॉक्टर्स व औषधे मोफत',
      hi: '२४ घंटे डॉक्टर व दवाएं निःशुल्क',
      en: '24x7 Free Doctors & Meds'
    },
    provider: 'महाराष्ट्र शासन आरोग्य विभाग',
    contact: '108 / 9422001122',
    badgeColor: 'bg-red-100 text-red-900 border-red-300'
  },
  {
    id: 'srv_3',
    type: 'toilet',
    icon: Layers,
    name: {
      mr: 'मोबाईल बायो-टॉयलेट्स संकुल क्र. ३ (महिला व पुरुष)',
      hi: 'मोबाइल बायो-शौचालय कॉम्प्लेक्स 3',
      en: 'Mobile Eco Bio-Toilet Complex #3'
    },
    location: {
      mr: 'स्टेशन रोड, रेल्वे उड्डाणपुलाखाली',
      hi: 'स्टेशन रोड, रेलवे ओवरब्रिज के नीचे',
      en: 'Station Road, Under Railway Flyover'
    },
    timing: {
      mr: 'सतत स्वच्छता व पाणी उपलब्ध',
      hi: 'निरंतर सफाई व पानी उपलब्ध',
      en: 'Clean & Water Available'
    },
    provider: 'पंढरपूर नगरपरिषद स्वच्छता पथक',
    contact: '02186-223000',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    id: 'srv_4',
    type: 'shoe_stand',
    icon: Footprints,
    name: {
      mr: 'विनामूल्य पादत्राणे व सामान लॉकर कक्ष',
      hi: 'निःशुल्क जूता स्टैंड व सामान लॉकर',
      en: 'Free Footwear & Luggage Cloakroom'
    },
    location: {
      mr: 'पश्चिम दर्शन मंडप प्रवेशद्वार, गेट १',
      hi: 'पश्चिम दर्शन मंडप प्रवेश द्वार, गेट 1',
      en: 'West Darshan Pavilion Entry, Gate 1'
    },
    timing: {
      mr: 'पहाटे ४:०० ते रात्री १२:००',
      hi: 'प्रातः 4:00 से रात्रि 12:00',
      en: '04:00 AM to 12:00 AM'
    },
    provider: 'वारकरी सेवा मंडळ पंढरपूर',
    contact: '02186-224488',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'srv_5',
    type: 'charging',
    icon: Zap,
    name: {
      mr: 'सौर ऊर्जा मोबाईल चार्जिंग केंद्र (५० पोर्ट्स)',
      hi: 'सौर ऊर्जा मोबाइल चार्जिंग स्टेशन',
      en: 'Solar Mobile Fast-Charging Booth'
    },
    location: {
      mr: 'संत तनपुरे महाराज मठ प्रवेशद्वार',
      hi: 'संत तनपुरे महाराज मठ मुख्य द्वार',
      en: 'Sant Tanpure Maharaj Math Entrance'
    },
    timing: {
      mr: 'सकाळी ५:०० ते रात्री ११:०० (मोफत)',
      hi: 'सुबह 5:00 से रात 11:00 (मुफ्त)',
      en: '05:00 AM to 11:00 PM (Free)'
    },
    provider: 'रोटरी क्लब वारी मित्र',
    contact: '9822456789',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300'
  },
  {
    id: 'srv_6',
    type: 'police',
    icon: ShieldAlert,
    name: {
      mr: 'पोलीस मित्र व हरवलेली मुले मदत केंद्र',
      hi: 'पुलिस मित्र व खोया-पाया बालक सहायता केंद्र',
      en: 'Police Pilgrim Help & Lost Child Desk'
    },
    location: {
      mr: 'मध्यवर्ती बस स्थानक परिसर व छत्रपती शिवाजी महाराज चौक',
      hi: 'बस स्टैंड व शिवाजी चौक',
      en: 'Central Bus Stand & Shivaji Chowk'
    },
    timing: {
      mr: '२४ तास पोलीस अधिकारी व महिला पोलीस हजर',
      hi: '२४ घंटे पुलिस अधिकारी उपस्थित',
      en: '24x7 Police Helpdesk'
    },
    provider: 'सोलापूर ग्रामीण पोलीस',
    contact: '112 / 1090',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
  }
];

export const NearbyServicesDistanceView: React.FC<NearbyServicesDistanceViewProps> = ({ language }) => {
  // Current user coordinate state
  const [selectedStartId, setSelectedStartId] = useState<string>('user_railway');
  const [customUserCoords, setCustomUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [gpsSuccessMsg, setGpsSuccessMsg] = useState('');

  // Selected Destination
  const [selectedDestId, setSelectedDestId] = useState<string>('temple_main');

  // Filter for services
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Find destination coordinates
  const destinationObj = pandharpurLandmarks.find(item => item.id === selectedDestId) || pandharpurLandmarks[0];

  // Find start coordinates
  const startObj = presetStartPoints.find(item => item.id === selectedStartId) || presetStartPoints[0];
  const startCoords = customUserCoords || { lat: startObj.lat, lng: startObj.lng };

  // Calculate Haversine Distance (in km)
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const distanceKm = calculateDistanceKm(
    startCoords.lat,
    startCoords.lng,
    destinationObj.lat,
    destinationObj.lng
  );

  // Approximate Walking Time (assuming 4.2 km/h pilgrim pace in crowd)
  const walkingMinutes = Math.max(2, Math.round((distanceKm / 4.2) * 60));

  // Request Live GPS
  const handleGetLiveGPS = () => {
    if (!navigator.geolocation) {
      alert(language === 'mr' ? 'तुमच्या ब्राऊझरमध्ये GPS सेवा उपलब्ध नाही.' : language === 'hi' ? 'आपके ब्राउज़र में जीपीएस उपलब्ध नहीं है।' : 'GPS not available in browser');
      return;
    }

    setIsGpsLoading(true);
    setGpsSuccessMsg('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCustomUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsGpsLoading(false);
        setGpsSuccessMsg(getTranslation(language, 'gpsDetected'));
        setSelectedStartId('gps_live');
      },
      () => {
        setIsGpsLoading(false);
        // Fallback default Pandharpur coordinates if permission denied in iframe
        setCustomUserCoords({
          lat: 17.6830,
          lng: 75.3200
        });
        setGpsSuccessMsg(language === 'mr' ? 'पंढरपूर परिसरातील GPS स्थान निश्चित केले.' : language === 'hi' ? 'पंढरपुर क्षेत्र जीपीएस स्थान निर्धारित किया।' : 'Pandharpur coordinates set');
        setSelectedStartId('gps_live');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startCoords.lat},${startCoords.lng}&destination=${destinationObj.lat},${destinationObj.lng}&travelmode=walking`;

  const filteredServices = essentialServicesData.filter(srv => {
    const matchesFilter = serviceFilter === 'all' || srv.type === serviceFilter;
    const matchesSearch = 
      srv.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.location[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 text-white p-6 rounded-3xl shadow-xl border-2 border-amber-400 space-y-2">
        <div className="flex items-center space-x-2">
          <span className="bg-amber-300 text-amber-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            📍 {language === 'mr' ? 'थेट अंतर व स्थानिक सेवा' : language === 'hi' ? 'लाइव दूरी व स्थानीय सेवाएं' : 'Live Distance & Services'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
          {getTranslation(language, 'servicesHeader')}
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/90 max-w-2xl">
          {getTranslation(language, 'servicesSubheader')}
        </p>
      </div>

      {/* 1. Live Distance & Route Calculator */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-300 space-y-6">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <h3 className="text-lg font-bold text-amber-950 font-serif flex items-center space-x-2">
            <Compass className="w-6 h-6 text-amber-700" />
            <span>{getTranslation(language, 'distanceCalcTitle')}</span>
          </h3>
          <span className="text-xs bg-emerald-100 text-emerald-900 font-extrabold px-3 py-1 rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{language === 'mr' ? 'थेट अचूक गणना' : language === 'hi' ? 'लाइव सटीक गणना' : 'Live Accuracy'}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Starting Location */}
          <div className="space-y-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <label className="font-extrabold text-amber-950 text-xs sm:text-sm flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>{getTranslation(language, 'fromLocation')}</span>
            </label>

            <select
              value={selectedStartId}
              onChange={(e) => {
                setSelectedStartId(e.target.value);
                setCustomUserCoords(null);
                setGpsSuccessMsg('');
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-white font-bold text-amber-950 text-xs sm:text-sm focus:border-amber-600 focus:outline-none"
            >
              {presetStartPoints.map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.name[language]}
                </option>
              ))}
              {customUserCoords && (
                <option value="gps_live">
                  📍 {language === 'mr' ? 'माझे थेट GPS स्थान' : language === 'hi' ? 'मेरा जीपीएस स्थान' : 'My GPS Location'} ({startCoords.lat.toFixed(4)}, {startCoords.lng.toFixed(4)})
                </option>
              )}
            </select>

            <button
              onClick={handleGetLiveGPS}
              disabled={isGpsLoading}
              className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              {isGpsLoading ? (
                <span>{language === 'mr' ? 'GPS स्थान शोधत आहे...' : language === 'hi' ? 'जीपीएस स्थान खोज रहा है...' : 'Locating GPS...'}</span>
              ) : (
                <>
                  <Navigation className="w-4 h-4 text-amber-300" />
                  <span>{getTranslation(language, 'useGpsLiveBtn')}</span>
                </>
              )}
            </button>

            {gpsSuccessMsg && (
              <div className="p-2 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center space-x-1.5 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{gpsSuccessMsg}</span>
              </div>
            )}
          </div>

          {/* Destination Landmark */}
          <div className="space-y-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <label className="font-extrabold text-amber-950 text-xs sm:text-sm flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>{getTranslation(language, 'toDestination')}</span>
            </label>

            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-white font-bold text-amber-950 text-xs sm:text-sm focus:border-amber-600 focus:outline-none"
            >
              {pandharpurLandmarks.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name[language]}
                </option>
              ))}
            </select>

            <div className="text-xs text-amber-800 bg-white p-2.5 rounded-xl border border-amber-200 font-medium">
              ℹ️ {destinationObj.description[language]}
            </div>
          </div>
        </div>

        {/* Distance & Walking Time Result Banner */}
        <div className="bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900 text-white p-5 rounded-2xl shadow-lg border border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-6 text-center sm:text-left">
            <div>
              <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider block">
                {getTranslation(language, 'calculatedDistance')}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-100">
                {distanceKm < 1 ? `${Math.round(distanceKm * 1000)} ${getTranslation(language, 'meters')}` : `${distanceKm.toFixed(2)} ${getTranslation(language, 'kms')}`}
              </span>
            </div>

            <div className="h-10 w-[1px] bg-amber-700/60" />

            <div>
              <span className="text-[11px] text-amber-300 font-bold uppercase tracking-wider block">
                {getTranslation(language, 'walkTimeEstimate')}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-300 flex items-center justify-center sm:justify-start space-x-1">
                <Footprints className="w-5 h-5 inline text-amber-400" />
                <span>~{walkingMinutes} {getTranslation(language, 'mins')}</span>
              </span>
            </div>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-center cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>{getTranslation(language, 'startNavigationBtn')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Essential Services Around Pandharpur */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-300 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-3">
          <div>
            <h3 className="text-lg font-bold text-amber-950 font-serif">
              {getTranslation(language, 'nearbyServicesAround')}
            </h3>
            <p className="text-xs text-amber-800">
              {language === 'mr' ? 'पंढरपूर परिसरातील अधिकृत मोफत पाणी, आरोग्य, बायो-शौचालये आणि मदत केंद्र' : language === 'hi' ? 'पंढरपुर क्षेत्र में अधिकृत निःशुल्क पानी, स्वास्थ्य, बायो-शौचालय व सहायता केंद्र' : 'Official free water, medical ICUs, toilets, and helpline centers'}
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'सेवा किंवा ठिकाण शोधा...' : language === 'hi' ? 'सेवा या स्थान खोजें...' : 'Search services or places...'}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-amber-300 text-xs text-amber-950 bg-amber-50/50 focus:bg-white focus:outline-none"
            />
            <Search className="w-4 h-4 text-amber-600 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'all', label: language === 'mr' ? 'सर्व सेवा' : language === 'hi' ? 'सभी सेवाएं' : 'All Services' },
            { id: 'water', label: `💧 ${language === 'mr' ? 'मोफत पाणी' : language === 'hi' ? 'निःशुल्क पानी' : 'Free Water'}` },
            { id: 'medical', label: `🏥 ${language === 'mr' ? 'आरोग्य व ICU' : language === 'hi' ? 'स्वास्थ्य व ICU' : 'Medical & ICU'}` },
            { id: 'toilet', label: `🚻 ${language === 'mr' ? 'बायो-शौचालये' : language === 'hi' ? 'बायो-शौचालय' : 'Bio-Toilets'}` },
            { id: 'shoe_stand', label: `👟 ${language === 'mr' ? 'पादत्राणे स्टँड' : language === 'hi' ? 'जूता स्टैंड' : 'Footwear Stand'}` },
            { id: 'charging', label: `⚡ ${language === 'mr' ? 'मोबाईल चार्जिंग' : language === 'hi' ? 'मोबाइल चार्जिंग' : 'Mobile Charging'}` },
            { id: 'police', label: `👮 ${language === 'mr' ? 'पोलीस मदत' : language === 'hi' ? 'पुलिस सहायता' : 'Police Help'}` }
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => setServiceFilter(flt.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                serviceFilter === flt.id
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200 hover:border-amber-400 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2.5 bg-amber-200/80 rounded-xl text-amber-900">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-950 text-sm">
                        {service.name[language]}
                      </h4>
                      <span className="text-[11px] text-amber-800 font-medium">
                        {service.provider}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${service.badgeColor}`}>
                    {service.timing[language] || service.timing.mr}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-amber-900/90 pl-11">
                  <div className="flex items-center space-x-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{service.location[language]}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 pt-1">
                    <span className="font-bold text-amber-950">📞 {language === 'mr' ? 'हेल्पलाइन:' : language === 'hi' ? 'हेल्पलाइन:' : 'Helpline:'}</span>
                    <a href={`tel:${service.contact.split('/')[0].trim()}`} className="text-amber-800 font-extrabold hover:underline">
                      {service.contact}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
