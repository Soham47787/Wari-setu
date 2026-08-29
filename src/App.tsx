import React, { useState, useEffect } from 'react';
import { 
  Language, 
  TabType, 
  DarshanToken, 
  MapPoint, 
  AccommodationItem, 
  LostItem, 
  SOSAlert, 
  UserProfile, 
  VolunteerMember, 
  CrowdStatus 
} from './types';
import { getTranslation } from './translations';
import {
  initialCrowdStatus,
  palkhiStageStatus,
  initialMapPoints,
  initialAccommodations,
  initialAnnachhatras,
  initialLostItems,
  initialVolunteers,
  pandharpurLandmarks
} from './data/wariData';

// Sub-components
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { CrowdDarshanView } from './components/CrowdDarshanView';
import { InteractiveMap } from './components/InteractiveMap';
import { AccommodationView } from './components/AccommodationView';
import { LostFoundView } from './components/LostFoundView';
import { EmergencySOSView } from './components/EmergencySOSView';
import { AbhangGuideView } from './components/AbhangGuideView';
import { VolunteerModal } from './components/VolunteerModal';
import { ProfileLoginView } from './components/ProfileLoginView';
import { AuthModal } from './components/AuthModal';
import { AdminPortalView } from './components/AdminPortalView';
import { NearbyServicesDistanceView } from './components/NearbyServicesDistanceView';
import { WelcomeGateModal } from './components/WelcomeGateModal';

// Generated Asset Paths
import heroBannerImg from './assets/images/warkari_palkhi_hero_1785484542388.jpg';
import { 
  ShieldAlert, 
  Megaphone, 
  Sparkles, 
  Compass, 
  MapPin, 
  ShieldCheck, 
  HandHeart, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [language, setLanguage] = useState<Language>('mr');
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Auth User State (Persisted in LocalStorage)
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('wariseva_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Return default active pilgrim or null to show login gate
    return null;
  });

  // Login First-Time Gate Overlay (Shown if user is not logged in)
  const [showLoginGate, setShowLoginGate] = useState<boolean>(() => {
    const saved = localStorage.getItem('wariseva_user_profile');
    return !saved; // If no saved profile, show login gate first!
  });

  // App Business State
  const [crowdStatus, setCrowdStatus] = useState<CrowdStatus>(() => {
    const saved = localStorage.getItem('wariseva_temple_crowd_status');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialCrowdStatus;
      }
    }
    return initialCrowdStatus;
  });
  const [adminBroadcastNotice, setAdminBroadcastNotice] = useState<string>(() => {
    return localStorage.getItem('wariseva_broadcast_notice') || '';
  });

  // Fetch live temple status from backend API on mount & live interval polling
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/temple-status');
        if (res.ok) {
          const data: CrowdStatus = await res.json();
          if (data && data.mukhDarshanWaitMins !== undefined) {
            setCrowdStatus(data);
            if (data.emergencyBroadcastNotice) {
              setAdminBroadcastNotice(data.emergencyBroadcastNotice);
            }
          }
        }
      } catch (err) {
        // Fallback to local state if backend fetch fails
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 6000);
    return () => clearInterval(interval);
  }, []);

  const [tokens, setTokens] = useState<DarshanToken[]>([
    {
      id: 'token_sample_1',
      tokenNo: 'VITTHAL-MUKH-8821',
      name: 'ज्ञानेश्वर तुकाराम कदम',
      phone: '9822012345',
      pilgrimCount: 2,
      timeSlot: '१०:०० AM - ११:३० AM',
      gateNumber: 'गेट १ (महाद्वार घाट)',
      darshanType: 'Mukh',
      date: '२९ ऑगस्ट २०२६',
      qrCodeValue: 'PND-VITTHAL-TOKEN-VITTHAL-MUKH-8821-485912',
      status: 'Confirmed',
      idProofNumber: 'Aadhaar-4567'
    }
  ]);

  const [mapPoints, setMapPoints] = useState<MapPoint[]>(initialMapPoints);
  const [mapCategory, setMapCategory] = useState<string>('all');
  const [accommodations, setAccommodations] = useState<AccommodationItem[]>(initialAccommodations);
  const [annachhatras, setAnnachhatras] = useState(initialAnnachhatras);
  const [lostItems, setLostItems] = useState<LostItem[]>(initialLostItems);
  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerMember[]>(initialVolunteers);

  // Auth Save & Logout Handlers
  const handleSaveProfile = (updated: UserProfile) => {
    setUser(updated);
    localStorage.setItem('wariseva_user_profile', JSON.stringify(updated));
    setShowLoginGate(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('wariseva_user_profile');
    setShowLoginGate(true);
  };

  // Volunteer Handlers
  const handleRegisterVolunteer = (newVolunteer: VolunteerMember) => {
    setVolunteers((prev) => [newVolunteer, ...prev]);
  };

  const handleToggleDutyStatus = (volunteerId: string) => {
    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === volunteerId
          ? { ...v, status: v.status === 'on_duty' ? 'off_duty' : 'on_duty' }
          : v
      )
    );
  };

  // Business Action Handlers
  const handleGenerateToken = (newToken: DarshanToken) => {
    setTokens((prev) => [newToken, ...prev]);
  };

  const handleAddLostItem = (newItem: LostItem) => {
    setLostItems((prev) => [newItem, ...prev]);
  };

  const handleSendSOS = (newAlert: SOSAlert) => {
    setSosAlerts((prev) => [newAlert, ...prev]);
  };

  // Admin Temple Data Mutation Handler
  const handleUpdateCrowdStatus = (newStatus: CrowdStatus, notice?: string) => {
    setCrowdStatus(newStatus);
    if (notice !== undefined) {
      setAdminBroadcastNotice(notice);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-amber-950 font-sans antialiased selection:bg-amber-200 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <Header
          language={language}
          onLanguageChange={setLanguage}
          user={user}
          onOpenAuth={() => setActiveTab('profile')}
          onTriggerSOS={() => setActiveTab('sos')}
        />

        {/* Global Admin Broadcast Notice Bar (if broadcast is active) */}
        {adminBroadcastNotice && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-600 text-white px-4 py-2 text-xs sm:text-sm font-extrabold flex items-center justify-between border-b-2 border-red-700 shadow-md"
          >
            <div className="flex items-center space-x-2 truncate max-w-5xl">
              <Megaphone className="w-4 h-4 text-amber-200 shrink-0 animate-bounce" />
              <span className="bg-white text-red-700 px-2 py-0.5 rounded-full text-[10px] uppercase font-black shrink-0">
                {getTranslation(language, 'adminBroadcastLabel')}
              </span>
              <span className="truncate">{adminBroadcastNotice}</span>
            </div>
            <button 
              onClick={() => setAdminBroadcastNotice('')}
              className="text-white/80 hover:text-white text-xs underline font-bold shrink-0 ml-2 cursor-pointer"
            >
              {getTranslation(language, 'closeBtn')}
            </button>
          </motion.div>
        )}

        {/* Main Navigation Bar */}
        <Navigation
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          language={language}
          isAdmin={user?.isAdmin || false}
        />

        {/* Main Application Container */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 w-full">
          {/* TAB 1: HOME DASHBOARD */}
          {activeTab === 'home' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 pb-12"
            >
              {/* Spiritual Hero Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300 bg-amber-950 text-white min-h-[320px] sm:min-h-[380px] flex items-end">
                <img
                  src={heroBannerImg}
                  alt="Warkari Pilgrimage Palkhi Procession"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay scale-105 transition-transform duration-1000 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-950/60 to-transparent" />

                <div className="relative z-10 p-6 sm:p-10 space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-amber-400 text-amber-950 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full shadow border border-amber-300 inline-block uppercase">
                      {getTranslation(language, 'heroGreeting')}
                    </span>
                    {user?.isLoggedIn && (
                      <span className="bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{getTranslation(language, 'loggedInAs')} {user.name} ({user.role})</span>
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-amber-100 drop-shadow-md">
                    {getTranslation(language, 'appName')}
                  </h2>
                  <p className="text-xs sm:text-base text-amber-200/90 leading-relaxed font-sans">
                    {getTranslation(language, 'tagline')}.
                  </p>

                  {/* Quick Live Stats Strip */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-amber-100">
                    <span className="bg-amber-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                      🛕 {getTranslation(language, 'mukhDarshan')}: <strong className="text-amber-300">{crowdStatus.mukhDarshanWaitMins} Mins</strong>
                    </span>
                    <span className="bg-amber-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                      👣 {getTranslation(language, 'charanSparshHours')}: <strong className="text-amber-300">{crowdStatus.charanSparshWaitHours} Hrs</strong>
                    </span>
                    <span className="bg-amber-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                      🤝 {volunteers.filter(v => v.status === 'on_duty').length} {getTranslation(language, 'sevaksOnDuty')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Palkhi Live Tracker Status Widget */}
              <div className="bg-gradient-to-br from-amber-50 via-white to-amber-100/60 rounded-3xl p-6 shadow-xl border-2 border-amber-300 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-amber-200 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🚩</span>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-amber-950 font-serif">
                        {palkhiStageStatus[language]}
                      </h3>
                      <p className="text-xs text-amber-800 font-medium">
                        {getTranslation(language, 'palkhiCampSubtitle')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('services')}
                      className="px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold transition-all border border-amber-300 cursor-pointer"
                    >
                      {getTranslation(language, 'measureDistanceBtn')}
                    </button>
                    <button
                      onClick={() => setActiveTab('map')}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all shadow cursor-pointer"
                    >
                      {getTranslation(language, 'viewOnMapBtn')}
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-amber-900">
                    <span>{getTranslation(language, 'palkhiDeparture')}</span>
                    <span>{getTranslation(language, 'palkhiProgress')}</span>
                    <span>{getTranslation(language, 'palkhiFinalDestination')}</span>
                  </div>
                  <div className="w-full bg-amber-200 h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `95%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Core Features Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-extrabold text-amber-950 font-serif flex items-center space-x-2">
                    <span>✨</span>
                    <span>{getTranslation(language, 'quickServicesTitle')}</span>
                  </h3>
                  <span className="text-xs font-bold text-amber-800">
                    {getTranslation(language, 'allServicesFree')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* 1. Services & Distance (New requested) */}
                  <div
                    onClick={() => setActiveTab('services')}
                    className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                        🧭
                      </div>
                      <h4 className="text-lg font-bold text-amber-950 font-serif">
                        {getTranslation(language, 'navServices')}
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        {getTranslation(language, 'servicesSubheader')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-teal-700 group-hover:text-teal-900 flex items-center space-x-1">
                      <span>{getTranslation(language, 'checkDistanceFacilities')}</span>
                      <span>→</span>
                    </span>
                  </div>

                  {/* 2. Crowd & Darshan Pass */}
                  <div
                    onClick={() => setActiveTab('crowd')}
                    className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                        🎟️
                      </div>
                      <h4 className="text-lg font-bold text-amber-950 font-serif">
                        {getTranslation(language, 'cardCrowdTitle')}
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        {getTranslation(language, 'cardCrowdDesc')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-700 group-hover:text-amber-900 flex items-center space-x-1">
                      <span>{getTranslation(language, 'cardCrowdAction')}</span>
                      <span>→</span>
                    </span>
                  </div>

                  {/* 3. Volunteer Directory */}
                  <div
                    onClick={() => setActiveTab('volunteer')}
                    className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                        🤝
                      </div>
                      <h4 className="text-lg font-bold text-amber-950 font-serif">
                        {getTranslation(language, 'navVolunteer')}
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        {getTranslation(language, 'activeVolunteersSub')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-orange-700 group-hover:text-orange-900 flex items-center space-x-1">
                      <span>{getTranslation(language, 'viewSevaksList')}</span>
                      <span>→</span>
                    </span>
                  </div>

                  {/* 4. Multilingual Map */}
                  <div
                    onClick={() => setActiveTab('map')}
                    className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                        🗺️
                      </div>
                      <h4 className="text-lg font-bold text-amber-950 font-serif">
                        {getTranslation(language, 'cardMapTitle')}
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        {getTranslation(language, 'cardMapDesc')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 group-hover:text-blue-900 flex items-center space-x-1">
                      <span>{getTranslation(language, 'navMap')}</span>
                      <span>→</span>
                    </span>
                  </div>

                  {/* 5. Stays & Meals */}
                  <div
                    onClick={() => setActiveTab('stays')}
                    className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                        ⛺
                      </div>
                      <h4 className="text-lg font-bold text-amber-950 font-serif">
                        {getTranslation(language, 'cardStaysTitle')}
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        {getTranslation(language, 'cardStaysDesc')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-900 flex items-center space-x-1">
                      <span>{getTranslation(language, 'tabFreeStays')}</span>
                      <span>→</span>
                    </span>
                  </div>

                  {/* 6. Lost & Found */}
                  <div
                    onClick={() => setActiveTab('lost')}
                    className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                        🔍
                      </div>
                      <h4 className="text-lg font-bold text-amber-950 font-serif">
                        {getTranslation(language, 'cardLostTitle')}
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        {getTranslation(language, 'cardLostDesc')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-700 group-hover:text-amber-900 flex items-center space-x-1">
                      <span>{getTranslation(language, 'reportMissingBtn')}</span>
                      <span>→</span>
                    </span>
                  </div>

                  {/* 7. Abhang Gatha & YouTube Search */}
                  <div
                    onClick={() => setActiveTab('abhang')}
                    className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-300 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                        🪕
                      </div>
                      <h4 className="text-lg font-bold text-amber-950 font-serif">
                        {getTranslation(language, 'cardAbhangTitle')}
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        {getTranslation(language, 'cardAbhangDesc')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-purple-700 group-hover:text-purple-900 flex items-center space-x-1">
                      <span>{getTranslation(language, 'abhangAndChanting')}</span>
                      <span>→</span>
                    </span>
                  </div>

                  {/* 8. Admin Portal */}
                  <div
                    onClick={() => setActiveTab('admin')}
                    className="group bg-stone-900 text-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-400 hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center text-2xl shadow font-black group-hover:scale-110 transition-transform">
                        🔐
                      </div>
                      <h4 className="text-lg font-bold text-amber-100 font-serif">
                        {getTranslation(language, 'adminLoginTitle')}
                      </h4>
                      <p className="text-xs text-amber-200/80 leading-relaxed">
                        {getTranslation(language, 'adminControlSubheader')}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-300 group-hover:text-white flex items-center space-x-1">
                      <span>{getTranslation(language, 'adminControlCenter')}</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: CROWD & DARSHAN */}
          {activeTab === 'crowd' && (
            <CrowdDarshanView
              language={language}
              crowdStatus={crowdStatus}
              userTokens={tokens}
              onGenerateToken={handleGenerateToken}
              user={user}
            />
          )}

          {/* TAB 3: SERVICES & DISTANCE CALCULATOR */}
          {activeTab === 'services' && (
            <NearbyServicesDistanceView
              language={language}
              user={user}
            />
          )}

          {/* TAB 4: MULTILINGUAL INTERACTIVE MAP */}
          {activeTab === 'map' && (
            <InteractiveMap
              language={language}
              mapPoints={mapPoints}
              selectedCategory={mapCategory}
              onSelectCategory={setMapCategory}
            />
          )}

          {/* TAB 5: STAYS & HOTELS & MEALS */}
          {activeTab === 'stays' && (
            <AccommodationView
              language={language}
              accommodations={accommodations}
              annachhatras={annachhatras}
              user={user}
            />
          )}

          {/* TAB 6: LOST & FOUND */}
          {activeTab === 'lost' && (
            <LostFoundView
              language={language}
              lostItems={lostItems}
              onReportMissing={handleAddLostItem}
              user={user}
            />
          )}

          {/* TAB 7: VOLUNTEER SEVAK DIRECTORY */}
          {activeTab === 'volunteer' && (
            <VolunteerModal
              language={language}
              volunteers={volunteers}
              onRegisterVolunteer={handleRegisterVolunteer}
              onToggleDutyStatus={handleToggleDutyStatus}
              currentUser={user}
            />
          )}

          {/* TAB 8: EMERGENCY SOS */}
          {activeTab === 'sos' && (
            <EmergencySOSView
              language={language}
              onSendSOS={handleSendSOS}
              activeSosAlerts={sosAlerts}
              user={user}
            />
          )}

          {/* TAB 9: ABHANG & YOUTUBE GUIDE */}
          {activeTab === 'abhang' && (
            <AbhangGuideView language={language} />
          )}

          {/* TAB 10: ADMIN PORTAL */}
          {activeTab === 'admin' && (
            <AdminPortalView
              language={language}
              crowdStatus={crowdStatus}
              onUpdateCrowdStatus={handleUpdateCrowdStatus}
              accommodations={accommodations}
              onUpdateAccommodations={setAccommodations}
              annachhatras={annachhatras}
              onUpdateAnnachhatras={setAnnachhatras}
              currentUser={user}
              onAdminLogin={handleSaveProfile}
              broadcastNotice={adminBroadcastNotice}
              onUpdateBroadcastNotice={setAdminBroadcastNotice}
            />
          )}

          {/* TAB 11: PROFILE & SETTINGS */}
          {activeTab === 'profile' && (
            <ProfileLoginView
              language={language}
              user={user}
              onLogin={handleSaveProfile}
              onLogout={handleLogout}
              onNavigateTab={setActiveTab}
            />
          )}
        </main>
      </div>

      {/* LOGIN-FIRST WELCOME GATE MODAL */}
      <AnimatePresence>
        {showLoginGate && (
          <WelcomeGateModal
            language={language}
            onLoginSuccess={(profile) => {
              handleSaveProfile(profile);
            }}
            onContinueAsGuest={() => {
              const guestProfile: UserProfile = {
                id: 'usr_guest_temp',
                name: 'भाविक वारकरी',
                phone: '९८२२०XXXXX',
                city: 'पंढरपूर',
                gender: 'male',
                role: 'warkari',
                bloodGroup: 'O+',
                emergencyContactName: 'कुटुंब संपर्क',
                emergencyContactPhone: '९८२२०XXXXX',
                dindiName: 'श्री विठ्ठल वारकरी दिंडी',
                isLoggedIn: true,
              };
              handleSaveProfile(guestProfile);
            }}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200/80 border-t-2 border-amber-600 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-xl">🛕</span>
              <span className="font-bold text-sm text-white font-serif">{getTranslation(language, 'appName')}</span>
            </div>
            <p className="text-amber-300/80">
              {getTranslation(language, 'tagline')}.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-amber-200 font-semibold">
            <button onClick={() => setActiveTab('services')} className="hover:underline">{getTranslation(language, 'navServices')}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('crowd')} className="hover:underline">{getTranslation(language, 'navCrowd')}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('volunteer')} className="hover:underline">{getTranslation(language, 'navVolunteer')}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('map')} className="hover:underline">{getTranslation(language, 'navMap')}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('admin')} className="hover:underline text-amber-300 font-bold">🔐 {getTranslation(language, 'navAdmin')}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('sos')} className="hover:underline text-red-300 font-bold">🚨 {getTranslation(language, 'emergencySosBtn')}</button>
          </div>

          <div className="text-amber-400 font-bold">
            🚩 राम कृष्ण हरी! 🙏
          </div>
        </div>
      </footer>
    </div>
  );
}
