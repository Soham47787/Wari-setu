import React, { useState } from 'react';
import { Language, TabType, DarshanToken, MapPoint, AccommodationItem, LostItem, SOSAlert } from './types';
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

// Generated Asset Paths
import heroBannerImg from './assets/images/warkari_palkhi_hero_1785484542388.jpg';
import templeBannerImg from './assets/images/wari_temple_banner_1785484528396.jpg';

export default function App() {
  const [language, setLanguage] = useState<Language>('mr');
  const [isLargeText, setIsLargeText] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // App State
  const [crowdStatus, setCrowdStatus] = useState(initialCrowdStatus);
  const [tokens, setTokens] = useState<DarshanToken[]>([]);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>(initialMapPoints);
  const [mapCategory, setMapCategory] = useState<string>('all');
  const [accommodations, setAccommodations] = useState<AccommodationItem[]>(initialAccommodations);
  const [lostItems, setLostItems] = useState<LostItem[]>(initialLostItems);
  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>([]);

  // Handlers
  const handleGenerateToken = (newToken: DarshanToken) => {
    setTokens([newToken, ...tokens]);
  };

  const handleBookBed = (accId: string) => {
    setAccommodations(prev => prev.map(a => {
      if (a.id === accId && a.availableBeds > 0) {
        return { ...a, availableBeds: a.availableBeds - 1 };
      }
      return a;
    }));
  };

  const handleAddLostItem = (newItem: LostItem) => {
    setLostItems([newItem, ...lostItems]);
  };

  const handleSendSOS = (newAlert: SOSAlert) => {
    setSosAlerts([newAlert, ...sosAlerts]);
  };

  return (
    <div className={`min-h-screen bg-[#FFFDF9] text-amber-950 font-sans antialiased selection:bg-amber-200 ${isLargeText ? 'text-lg' : 'text-base'}`}>
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        isLargeText={isLargeText}
        onToggleTextSize={() => setIsLargeText(!isLargeText)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        language={language}
      />

      {/* Live Ticker Bar */}
      <div className="bg-amber-100 border-b border-amber-300 py-1.5 px-4 text-xs font-bold text-amber-900 overflow-hidden flex items-center space-x-2">
        <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded font-extrabold shrink-0">
          पालखी अपडे्टস
        </span>
        <div className="animate-pulse whitespace-nowrap overflow-x-auto no-scrollbar">
          🚩 {palkhiStageStatus[language]} | मंदिर थेट दर्शन रांग: ४० मिनिटे वेळ
        </div>
      </div>

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
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay scale-105 transition-transform duration-1000 hover:scale-100"
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
                  {getTranslation(language, 'tagline')}. श्री विठ्ठल दर्शन गर्दी स्थिती, ई-पास, राहण्याची सोय आणि १-टॅप आणीबाणी मदत.
                </p>

                {/* Quick Stats Strip */}
                <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold text-amber-100">
                  <span className="bg-amber-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                    🛕 दर्शन वेळ: <strong className="text-amber-300">४० मिनिटे</strong>
                  </span>
                  <span className="bg-amber-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                    ⛺ उपलब्ध निवारा: <strong className="text-amber-300">२,७५० खाटा</strong>
                  </span>
                  <span className="bg-amber-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40">
                    🍲 मोफत अन्नछत्र: <strong className="text-amber-300">२४ तास सुरू</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Tiles Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold font-serif text-amber-950 flex items-center space-x-2">
                <span>🚩</span>
                <span>मुख्य सेवा केंद्र (Quick Services)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Crowd & Pass */}
                <div
                  onClick={() => setActiveTab('crowd')}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
                      🛕
                    </div>
                    <h4 className="text-lg font-bold text-amber-950 font-serif">
                      {getTranslation(language, 'cardCrowdTitle')}
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {getTranslation(language, 'cardCrowdDesc')}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-700 group-hover:text-amber-900 flex items-center space-x-1">
                    <span>थेट गर्दी पहा व ई-पास मिळवा</span>
                    <span>→</span>
                  </span>
                </div>

                {/* 2. Interactive Map */}
                <div
                  onClick={() => setActiveTab('map')}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
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
                    <span>नकाशा उघडा</span>
                    <span>→</span>
                  </span>
                </div>

                {/* 3. Stays & Meals */}
                <div
                  onClick={() => setActiveTab('stays')}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
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
                    <span>निवास व अन्नछत्र शोधा</span>
                    <span>→</span>
                  </span>
                </div>

                {/* 4. Lost & Found */}
                <div
                  onClick={() => setActiveTab('lost')}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
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
                    <span>हरवलेले-सापडलेले शोधा</span>
                    <span>→</span>
                  </span>
                </div>

                {/* 5. SOS Emergency */}
                <div
                  onClick={() => setActiveTab('sos')}
                  className="group bg-red-50 rounded-2xl p-6 shadow-md hover:shadow-2xl border-2 border-red-300 hover:border-red-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform animate-pulse">
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
                    <span>तात्काळ SOS मदत पाठवा</span>
                    <span>→</span>
                  </span>
                </div>

                {/* 6. Abhang & Guide */}
                <div
                  onClick={() => setActiveTab('abhang')}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border-2 border-amber-200 hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 transform hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-2xl shadow group-hover:scale-110 transition-transform">
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
                    <span>अभंग ऐका व आरोग्य मार्गदर्शक</span>
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
            onGenerateToken={handleGenerateToken}
            existingTokens={tokens}
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

        {/* TAB 4: STAYS & MEALS */}
        {activeTab === 'stays' && (
          <AccommodationView
            language={language}
            accommodations={accommodations}
            annachhatras={initialAnnachhatras}
            onBookBed={handleBookBed}
          />
        )}

        {/* TAB 5: LOST & FOUND */}
        {activeTab === 'lost' && (
          <LostFoundView
            language={language}
            lostItems={lostItems}
            onAddLostItem={handleAddLostItem}
          />
        )}

        {/* TAB 6: EMERGENCY SOS */}
        {activeTab === 'sos' && (
          <EmergencySOSView
            language={language}
            onSendSOS={handleSendSOS}
            activeSosAlerts={sosAlerts}
          />
        )}

        {/* TAB 7: ABHANG & GUIDE */}
        {activeTab === 'abhang' && (
          <AbhangGuideView language={language} />
        )}

        {/* TAB 8: VOLUNTEER SEVA */}
        {activeTab === 'volunteer' && (
          <VolunteerModal language={language} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200/80 border-t-2 border-amber-600 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-xl">🛕</span>
              <span className="font-bold text-sm text-white font-serif">वारकरी सेवा (WariSeva)</span>
            </div>
            <p className="text-amber-300/80">
              पंढरपूर श्री विठ्ठल रुक्मिणी मंदिर व वारी सोहळा डिजिटल सहाय्यक.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-amber-200">
            <button onClick={() => setActiveTab('crowd')} className="hover:underline">दर्शन रांग</button>
            <span>•</span>
            <button onClick={() => setActiveTab('map')} className="hover:underline">वारी नकाशा</button>
            <span>•</span>
            <button onClick={() => setActiveTab('stays')} className="hover:underline">निःशुल्क निवास</button>
            <span>•</span>
            <button onClick={() => setActiveTab('sos')} className="hover:underline text-red-300 font-bold">🚨 SOS</button>
          </div>

          <div className="text-amber-400 font-bold">
            राम कृष्ण हरी! 🙏
          </div>
        </div>
      </footer>
    </div>
  );
}
