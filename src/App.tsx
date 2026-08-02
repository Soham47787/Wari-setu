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
import { VoiceAssistModal } from './components/VoiceAssistModal';

// Icons & Motion
import { Users, Map, BedDouble, Search, AlertOctagon, Music, ArrowRight, ShieldCheck, Clock, Sparkles, Mic, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Generated Asset Paths
import heroBannerImg from './assets/images/warkari_palkhi_hero_1785484542388.jpg';

export default function App() {
  const [language, setLanguage] = useState<Language>('mr');
  const [isLargeText, setIsLargeText] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

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
    <div className={`min-h-screen bg-[#FFFDF7] text-stone-900 font-sans antialiased selection:bg-amber-200 ${isLargeText ? 'text-lg' : 'text-base'}`}>
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        isLargeText={isLargeText}
        onToggleTextSize={() => setIsLargeText(!isLargeText)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenVoiceAssist={() => setIsVoiceModalOpen(true)}
      />

      {/* Main Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        language={language}
      />

      {/* Live Ticker Bar - Fresh Warm Sandalwood & Saffron Tones */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border-b border-amber-300/80 py-2.5 px-4 text-xs font-bold text-amber-950 overflow-hidden flex items-center space-x-3 shadow-inner">
        <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-white text-[10px] px-3 py-0.5 rounded-full font-black uppercase tracking-wider shrink-0 shadow-sm">
          पालखी अद्यतन
        </span>
        <div className="whitespace-nowrap overflow-x-auto no-scrollbar font-medium">
          🚩 {palkhiStageStatus[language]} | श्री विठ्ठल मंदिर थेट दर्शन रांग: ४० मिनिटे वेळ
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* TAB 1: HOME DASHBOARD */}
            {activeTab === 'home' && (
              <div className="space-y-10 pb-12">
                {/* Master Spiritual Hero Banner - Vibrant Saffron Bhagwa & Golden Gradient */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/40 bg-gradient-to-r from-[#78350F] via-[#9A3412] to-[#EA580C] text-white min-h-[340px] sm:min-h-[420px] flex items-end">
                  <img
                    src={heroBannerImg}
                    alt="Warkari Pilgrimage Palkhi Procession"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay scale-105 transition-transform duration-1000 hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#451A03] via-[#78350F]/70 to-transparent" />

                  <div className="relative z-10 p-6 sm:p-10 space-y-4 max-w-3xl">
                    <span className="bg-amber-100 text-amber-950 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-lg inline-block uppercase tracking-wider border border-amber-300">
                      जय जय राम कृष्ण हरी 🙏
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-amber-100 drop-shadow">
                      {getTranslation(language, 'appName')}
                    </h2>
                    <p className="text-xs sm:text-base text-amber-50 leading-relaxed font-sans font-medium max-w-2xl drop-shadow-sm">
                      {getTranslation(language, 'tagline')}. श्री विठ्ठल दर्शन गर्दी स्थिती, मोफत ई-पास, निवासाची सोय आणि १-टॅप आणीबाणी मदत.
                    </p>

                    {/* Quick Stats Strip */}
                    <div className="pt-2 flex flex-wrap gap-2.5 text-xs font-bold text-amber-100">
                      <span className="bg-amber-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-400/40 flex items-center space-x-1.5 shadow-md">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        <span>दर्शन वेळ: <strong className="text-amber-200 font-extrabold">४० मिनिटे</strong></span>
                      </span>
                      <span className="bg-amber-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-400/40 flex items-center space-x-1.5 shadow-md">
                        <BedDouble className="w-3.5 h-3.5 text-emerald-300" />
                        <span>उपलब्ध निवारा: <strong className="text-emerald-200 font-extrabold">२,७५० खाटा</strong></span>
                      </span>
                      <span className="bg-amber-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-400/40 flex items-center space-x-1.5 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                        <span>मोफत अन्नछत्र: <strong className="text-orange-200 font-extrabold">२४ तास सुरू</strong></span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Tiles Grid */}
                <div className="space-y-5">
                  <h3 className="text-xl font-black font-serif text-stone-900 flex items-center space-x-2">
                    <span className="text-amber-600">🚩</span>
                    <span>मुख्य सेवा केंद्र (Quick Services)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* 1. Crowd & Pass */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      onClick={() => setActiveTab('crowd')}
                      className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-stone-200/90 hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-900 flex items-center justify-center text-2xl shadow-sm border border-amber-200 group-hover:scale-105 transition-transform">
                          🛕
                        </div>
                        <h4 className="text-lg font-bold text-stone-900 font-serif">
                          {getTranslation(language, 'cardCrowdTitle')}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          {getTranslation(language, 'cardCrowdDesc')}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-amber-700 flex items-center space-x-1 pt-2 border-t border-stone-100">
                        <span>थेट गर्दी पहा व ई-पास मिळवा</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>

                    {/* 2. Interactive Map */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      onClick={() => setActiveTab('map')}
                      className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-stone-200/90 hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-900 flex items-center justify-center text-2xl shadow-sm border border-blue-200 group-hover:scale-105 transition-transform">
                          🗺️
                        </div>
                        <h4 className="text-lg font-bold text-stone-900 font-serif">
                          {getTranslation(language, 'cardMapTitle')}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          {getTranslation(language, 'cardMapDesc')}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-blue-700 flex items-center space-x-1 pt-2 border-t border-stone-100">
                        <span>नकाशा उघडा</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>

                    {/* 3. Stays & Meals */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      onClick={() => setActiveTab('stays')}
                      className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-stone-200/90 hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-900 flex items-center justify-center text-2xl shadow-sm border border-emerald-200 group-hover:scale-105 transition-transform">
                          ⛺
                        </div>
                        <h4 className="text-lg font-bold text-stone-900 font-serif">
                          {getTranslation(language, 'cardStaysTitle')}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          {getTranslation(language, 'cardStaysDesc')}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 flex items-center space-x-1 pt-2 border-t border-stone-100">
                        <span>निवास व अन्नछत्र शोधा</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>

                    {/* 4. Lost & Found */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      onClick={() => setActiveTab('lost')}
                      className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-stone-200/90 hover:border-orange-400 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-100 text-orange-900 flex items-center justify-center text-2xl shadow-sm border border-orange-200 group-hover:scale-105 transition-transform">
                          🔍
                        </div>
                        <h4 className="text-lg font-bold text-stone-900 font-serif">
                          {getTranslation(language, 'cardLostTitle')}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          {getTranslation(language, 'cardLostDesc')}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-orange-700 flex items-center space-x-1 pt-2 border-t border-stone-100">
                        <span>हरवलेले-सापडलेले शोधा</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>

                    {/* 5. SOS Emergency */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      onClick={() => setActiveTab('sos')}
                      className="group bg-rose-50/80 rounded-3xl p-6 shadow-sm hover:shadow-xl border border-rose-200 hover:border-rose-400 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-red-600 text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
                          🚨
                        </div>
                        <h4 className="text-lg font-bold text-rose-950 font-serif">
                          {getTranslation(language, 'cardSosTitle')}
                        </h4>
                        <p className="text-xs text-rose-800 leading-relaxed font-sans">
                          {getTranslation(language, 'cardSosDesc')}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-rose-700 flex items-center space-x-1 pt-2 border-t border-rose-200/60">
                        <span>तात्काळ SOS मदत पाठवा</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>

                    {/* 6. Abhang & Guide */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      onClick={() => setActiveTab('abhang')}
                      className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-stone-200/90 hover:border-purple-400 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-100 text-purple-900 flex items-center justify-center text-2xl shadow-sm border border-purple-200 group-hover:scale-105 transition-transform">
                          🎵
                        </div>
                        <h4 className="text-lg font-bold text-stone-900 font-serif">
                          {getTranslation(language, 'cardAbhangTitle')}
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          {getTranslation(language, 'cardAbhangDesc')}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-purple-700 flex items-center space-x-1 pt-2 border-t border-stone-100">
                        <span>अभंग ऐका व आरोग्य मार्गदर्शक</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>
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
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Omnipresent Voice Assist Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsVoiceModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-2xl border-2 border-amber-300 flex items-center space-x-2 font-black text-sm tracking-wide group hover:shadow-amber-600/50 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
          <Mic className="w-4 h-4 text-white animate-pulse" />
        </div>
        <span className="hidden sm:inline text-amber-100 font-extrabold">आवाज सहाय्यक</span>
      </motion.button>

      {/* Interactive Voice Assistance Modal */}
      <VoiceAssistModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsVoiceModalOpen(false);
        }}
        onTriggerSOS={() => setActiveTab('sos')}
      />

      {/* Footer - Traditional Sandalwood Chestnut & Golden Saffron Detail */}
      <footer className="bg-[#451A03] text-amber-100 border-t-2 border-amber-500/30 py-10 px-4 mt-16 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left text-xs">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-2xl">🛕</span>
              <span className="font-black text-base text-white font-serif tracking-tight">वारकरी सेवा (WariSeva)</span>
            </div>
            <p className="text-amber-200/80 font-sans font-medium">
              पंढरपूर श्री विठ्ठल रुक्मिणी मंदिर व वारी सोहळा अधिकृत डिजिटल मार्गदर्शक.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-amber-100 font-bold">
            <button onClick={() => setActiveTab('crowd')} className="hover:text-white hover:underline transition-colors">दर्शन रांग</button>
            <span className="text-amber-500">•</span>
            <button onClick={() => setActiveTab('map')} className="hover:text-white hover:underline transition-colors">वारी नकाशा</button>
            <span className="text-amber-500">•</span>
            <button onClick={() => setActiveTab('stays')} className="hover:text-white hover:underline transition-colors">विनामूल्य निवास</button>
            <span className="text-amber-500">•</span>
            <button onClick={() => setActiveTab('sos')} className="hover:text-rose-300 text-rose-300 font-black hover:underline transition-colors">🚨 SOS</button>
          </div>

          <div className="bg-amber-950 px-4 py-2 rounded-2xl border border-amber-400/40 text-amber-300 font-black font-serif text-sm shadow-md">
            राम कृष्ण हरी! 🙏
          </div>
        </div>
      </footer>
    </div>
  );
}
