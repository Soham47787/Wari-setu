import React, { useState, useEffect } from 'react';
import { Language, TabType, DarshanToken, MapPoint, AccommodationItem, LostItem, SOSAlert, UserProfile } from './types';
import { getTranslation } from './translations';
import {
  initialCrowdStatus,
  palkhiStageStatus,
  initialMapPoints,
  initialAccommodations,
  initialAnnachhatras,
  initialLostItems
} from './data/wariData';

// Components
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

// Generated Asset Paths
import heroBannerImg from './assets/images/warkari_palkhi_hero_1785484542388.jpg';

export default function App() {
  const [language, setLanguage] = useState<Language>('mr');
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Auth User State (persisted in localStorage)
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('wariseva_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return {
      id: 'usr_guest',
      name: 'माउली तुकाराम माने',
      phone: '9822012345',
      city: 'पुणे (Pune)',
      gender: 'male',
      role: 'warkari',
      bloodGroup: 'O+',
      emergencyContactName: 'कुटुंब संपर्क',
      emergencyContactPhone: '9822099887',
      dindiName: 'ज्ञानेश्वर महाराज पालखी दिंडी क्र. ७',
      isLoggedIn: true,
    };
  });

  // Modal Visibility States
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // App Business State
  const [crowdStatus, setCrowdStatus] = useState(initialCrowdStatus);
  const [tokens, setTokens] = useState<DarshanToken[]>([
    {
      id: 'token_sample_1',
      tokenNo: 'VITTHAL-MUKH-8821',
      name: 'माउली तुकाराम माने',
      phone: '9822012345',
      pilgrimCount: 2,
      timeSlot: '१०:०० AM - ११:३० AM',
      gateNumber: 'गेट १ (महाद्वार घाट)',
      darshanType: 'Mukh',
      date: '२८ ऑगस्ट २०२६',
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

  // Auth Save Handler
  const handleSaveProfile = (updated: UserProfile) => {
    setUser(updated);
    localStorage.setItem('wariseva_user_profile', JSON.stringify(updated));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('wariseva_user_profile');
  };

  // Business Handlers
  const handleGenerateToken = (newToken: DarshanToken) => {
    setTokens((prev) => [newToken, ...prev]);
  };

  const handleAddLostItem = (newItem: LostItem) => {
    setLostItems((prev) => [newItem, ...prev]);
  };

  const handleSendSOS = (newAlert: SOSAlert) => {
    setSosAlerts((prev) => [newAlert, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-amber-950 font-sans antialiased selection:bg-amber-200">
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        user={user}
        onOpenAuth={() => setActiveTab('profile')}
        onTriggerSOS={() => setActiveTab('sos')}
      />

      {/* Main Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        language={language}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        {/* TAB 1: HOME DASHBOARD */}
        {activeTab === 'home' && (
          <div className="space-y-8 pb-12">
            {/* Spiritual Hero Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300 bg-amber-950 text-white min-h-[320px] sm:min-h-[380px] flex items-end">
              <img
                src={heroBannerImg}
                alt="Warkari Pilgrimage Palkhi Procession"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-overlay scale-105 transition-transform duration-1000 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-950/60 to-transparent" />

              <div className="relative z-10 p-6 sm:p-10 space-y-3 max-w-3xl">
                <span className="bg-amber-400 text-amber-950 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full shadow border border-amber-300 inline-block uppercase">
                  जय जय राम कृष्ण हरी 🙏
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-amber-100 drop-shadow-md">
                  {getTranslation(language, 'appName')}
                </h2>
                <p className="text-xs sm:text-base text-amber-200/90 leading-relaxed font-sans">
                  {getTranslation(language, 'tagline')}.
                </p>

                {/* Quick Stats Strip */}
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-amber-100">
                  <span className="bg-amber-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                    🛕 {getTranslation(language, 'mukhDarshan')}: <strong className="text-amber-300">{crowdStatus.mukhDarshanWaitMins} Mins</strong>
                  </span>
                  <span className="bg-amber-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                    ⛺ {getTranslation(language, 'statAvailableShelter')}
                  </span>
                  <span className="bg-amber-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                    🍲 {getTranslation(language, 'statFreeFood')}
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
                      पालखी मुक्काम: वाखरी • अंतिम टप्पा पंढरपूर आगमन
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('map')}
                  className="px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all shadow self-end sm:self-auto"
                >
                  नकाशावर पहा (View on Map) →
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-amber-900">
                  <span>प्रस्थान: आळंदी / देहू</span>
                  <span>९५% पूर्ण (वाखरी मुक्काम)</span>
                  <span>अंतिम टप्पा: श्री क्षेत्र पंढरपूर</span>
                </div>
                <div className="w-full bg-amber-200 h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `95%` }}
                  />
                </div>
              </div>
            </div>

            {/* Services Grid (6 Core Features) */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-amber-950 font-serif flex items-center space-x-2">
                <span>✨</span>
                <span>{getTranslation(language, 'quickServicesTitle')}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Crowd & Pass */}
                <div
                  onClick={() => setActiveTab('crowd')}
                  className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
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

                {/* 2. Map */}
                <div
                  onClick={() => setActiveTab('map')}
                  className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
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

                {/* 3. Stays & Food */}
                <div
                  onClick={() => setActiveTab('stays')}
                  className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
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

                {/* 4. Lost & Found */}
                <div
                  onClick={() => setActiveTab('lost')}
                  className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                      🔍
                    </div>
                    <h4 className="text-lg font-bold text-amber-950 font-serif">
                      {getTranslation(language, 'cardLostTitle')}
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {getTranslation(language, 'cardLostDesc')}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-orange-700 group-hover:text-orange-900 flex items-center space-x-1">
                    <span>{getTranslation(language, 'reportMissingBtn')}</span>
                    <span>→</span>
                  </span>
                </div>

                {/* 5. SOS Emergency */}
                <div
                  onClick={() => setActiveTab('sos')}
                  className="group bg-red-50 rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-red-300 hover:border-red-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform animate-pulse">
                      🚨
                    </div>
                    <h4 className="text-lg font-bold text-red-950 font-serif">
                      {getTranslation(language, 'cardSosTitle')}
                    </h4>
                    <p className="text-xs text-red-800 leading-relaxed">
                      {getTranslation(language, 'cardSosDesc')}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-red-700 group-hover:text-red-900 flex items-center space-x-1">
                    <span>{getTranslation(language, 'emergencySosBtn')}</span>
                    <span>→</span>
                  </span>
                </div>

                {/* 6. Abhang & YouTube */}
                <div
                  onClick={() => setActiveTab('abhang')}
                  className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                      🎵
                    </div>
                    <h4 className="text-lg font-bold text-amber-950 font-serif">
                      {getTranslation(language, 'cardAbhangTitle')}
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {getTranslation(language, 'cardAbhangDesc')}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-purple-700 group-hover:text-purple-900 flex items-center space-x-1">
                    <span>{getTranslation(language, 'abhangHeader')}</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
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

        {/* TAB 3: INTERACTIVE MAP */}
        {activeTab === 'map' && (
          <InteractiveMap
            language={language}
            mapPoints={mapPoints}
            selectedCategory={mapCategory}
            onSelectCategory={setMapCategory}
          />
        )}

        {/* TAB 4: STAYS & HOTELS & MEALS */}
        {activeTab === 'stays' && (
          <AccommodationView
            language={language}
            accommodations={accommodations}
            annachhatras={annachhatras}
            user={user}
          />
        )}

        {/* TAB 5: LOST & FOUND */}
        {activeTab === 'lost' && (
          <LostFoundView
            language={language}
            lostItems={lostItems}
            onReportMissing={handleAddLostItem}
            user={user}
          />
        )}

        {/* TAB 6: EMERGENCY SOS */}
        {activeTab === 'sos' && (
          <EmergencySOSView
            language={language}
            onSendSOS={handleSendSOS}
            activeSosAlerts={sosAlerts}
            user={user}
          />
        )}

        {/* TAB 7: ABHANG & YOUTUBE GUIDE */}
        {activeTab === 'abhang' && (
          <AbhangGuideView language={language} />
        )}

        {/* TAB 8: VOLUNTEER SEVA */}
        {activeTab === 'volunteer' && (
          <VolunteerModal language={language} />
        )}

        {/* TAB 9: PROFILE / LOGIN TAB */}
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

      {/* Auth & Profile Modal (if triggered directly) */}
      {isAuthOpen && (
        <AuthModal
          language={language}
          currentUser={user}
          onClose={() => setIsAuthOpen(false)}
          onSaveProfile={handleSaveProfile}
          onLogout={handleLogout}
        />
      )}

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
            <button onClick={() => setActiveTab('crowd')} className="hover:underline">{getTranslation(language, 'navCrowd')}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('map')} className="hover:underline">{getTranslation(language, 'navMap')}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('stays')} className="hover:underline">{getTranslation(language, 'navStays')}</button>
            <span>•</span>
            <button onClick={() => setActiveTab('profile')} className="hover:underline font-bold text-amber-300">{getTranslation(language, 'navProfile')}</button>
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
