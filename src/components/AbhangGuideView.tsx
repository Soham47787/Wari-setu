import React, { useState } from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { sampleAbhangs } from '../data/wariData';
import { Music, Play, Pause, Heart, ShieldAlert, Sparkles, Volume2, BookOpen, Stethoscope, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface AbhangGuideViewProps {
  language: Language;
}

const healthTipsData = [
  {
    id: 'tip_1',
    icon: '🦶',
    titleMr: 'पायांच्या फोडांची काळजी (Foot Blisters Care)',
    titleEn: 'Foot Blisters & Walking Care',
    descMr: 'दीर्घ चालण्यामुळे पायाला फोड आल्यास स्वच्छ पाण्याने धुवून हळद-खोबरेल तेल लावा. सर्व वैद्यकीय छावण्यांमध्ये मोफत मलमपट्टी उपलब्ध आहे.',
    descEn: 'For foot blisters, clean with safe water and apply antiseptic ointment or coconut oil. Free dressing available at all medical camps.'
  },
  {
    id: 'tip_2',
    icon: '💧',
    titleMr: 'जलसंजीवन व ओआरएस (ORS & Hydration)',
    titleEn: 'Hydration & Sunstroke Protection',
    descMr: 'उन्हात चालताना दर तासाला किमान २५० मि.ली. पाणी किंवा ओआरएस द्रावण प्या. उन्हाचा त्रास टाळण्यासाठी डोक्यावर कापड ठेवा.',
    descEn: 'Drink at least 250ml water or ORS every hour while walking in heat. Keep head covered with cloth or cap.'
  },
  {
    id: 'tip_3',
    icon: '🥗',
    titleMr: 'आहार व पचन आरोग्य (Healthy Meals & Hygiene)',
    titleEn: 'Safe Food & Hygiene',
    descMr: 'फक्त अधिकृत अन्नछत्रातील गरम व ताजे अन्न ग्रहण करा. उघड्यावरील शिळे पदार्थ खाणे टाळा.',
    descEn: 'Eat fresh hot meals at recognized Annachhatra camps. Avoid open or stale roadside food items.'
  }
];

export const AbhangGuideView: React.FC<AbhangGuideViewProps> = ({ language }) => {
  const [activeAbhangId, setActiveAbhangId] = useState<string | null>(sampleAbhangs[0]?.id || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guideCategory, setGuideCategory] = useState<'abhang' | 'health'>('abhang');

  const currentAbhang = sampleAbhangs.find(a => a.id === activeAbhangId) || sampleAbhangs[0];

  const togglePlay = (id: string) => {
    if (activeAbhangId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveAbhangId(id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner - Deep Slate & Warm Amber Accent */}
      <div className="bg-gradient-to-r from-[#1E1B18] via-[#2A241F] to-[#141210] rounded-3xl p-6 text-white shadow-xl border border-amber-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-purple-500/20 text-purple-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-purple-500/30 uppercase tracking-widest">
            अध्यात्म व आरोग्य (SPIRITUAL & HEALTH)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-amber-100 mt-1">
            {getTranslation(language, 'abhangHeader')}
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            संत तुकाराम, ज्ञानेश्वर महाराजांचे प्रसिद्ध अभंग आणि पायपीट वारकऱ्यांसाठी आरोग्य मार्गदर्शक.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="bg-stone-900/90 p-1.5 rounded-2xl border border-stone-700 flex space-x-1 shrink-0">
          <button
            onClick={() => setGuideCategory('abhang')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              guideCategory === 'abhang'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>अभंग व भजने</span>
          </button>
          <button
            onClick={() => setGuideCategory('health')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              guideCategory === 'health'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>आरोग्य मार्गदर्शक</span>
          </button>
        </div>
      </div>

      {/* ABHANG AUDIO PLAYER & LYRICS */}
      {guideCategory === 'abhang' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Player Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-[#1C1815] via-[#2A241F] to-[#141210] rounded-3xl p-6 text-white shadow-xl border border-amber-500/30 space-y-5">
              <div className="flex justify-between items-center border-b border-stone-800 pb-3">
                <span className="text-xs text-amber-400 font-bold flex items-center space-x-1">
                  <Volume2 className="w-4 h-4" />
                  <span>अभंग संगीत प्लेयर</span>
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                  {currentAbhang.saint}
                </span>
              </div>

              <div className="text-center py-4 space-y-2">
                <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-amber-400 text-stone-950 rounded-full flex items-center justify-center text-3xl mx-auto shadow-lg">
                  🪕
                </div>
                <h3 className="text-xl font-bold font-serif text-amber-100">
                  {currentAbhang.title}
                </h3>
                <p className="text-xs text-stone-300 font-sans">
                  {currentAbhang.saint}
                </p>
              </div>

              {/* Player Progress Bar Simulation */}
              <div className="space-y-1.5">
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className={`bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-300 ${isPlaying ? 'w-2/3' : 'w-0'}`} />
                </div>
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>{isPlaying ? '01:45' : '00:00'}</span>
                  <span>03:30</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 pt-2">
                <button
                  onClick={() => togglePlay(currentAbhang.id)}
                  className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
                >
                  {isPlaying && activeAbhangId === currentAbhang.id ? (
                    <Pause className="w-6 h-6 fill-stone-950 text-stone-950" />
                  ) : (
                    <Play className="w-6 h-6 fill-stone-950 text-stone-950 ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Abhang Lyrics & Playlist */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/90 space-y-4">
              <h3 className="text-lg font-bold text-stone-900 font-serif border-b border-stone-100 pb-3 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-800" />
                <span>अभंग काव्य व भावार्थ (Lyrics & Meaning)</span>
              </h3>

              <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200/80 space-y-4 font-serif">
                <div className="text-stone-900 text-sm leading-loose whitespace-pre-line font-medium text-center">
                  {currentAbhang.lyricsMr}
                </div>
                <div className="border-t border-amber-200/60 pt-3 text-xs text-amber-950 font-sans leading-relaxed">
                  <strong className="text-amber-900 font-bold block mb-1">भावार्थ (Meaning):</strong>
                  {currentAbhang.translationEn}
                </div>
              </div>
            </div>

            {/* Abhang List */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200 space-y-3">
              <h4 className="font-bold text-xs text-stone-800 uppercase tracking-wider">सर्व अभंग यादी (Playlist)</h4>
              <div className="space-y-2">
                {sampleAbhangs.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveAbhangId(item.id);
                      setIsPlaying(true);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      activeAbhangId === item.id
                        ? 'bg-amber-100 border-amber-300 text-stone-950 shadow-sm'
                        : 'bg-stone-50 hover:bg-amber-50/50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">🪕</span>
                      <div>
                        <h5 className="font-bold text-xs font-serif">{item.title}</h5>
                        <p className="text-[11px] text-stone-500 font-sans">{item.saint}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-stone-600">03:30</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEALTH TIPS TAB */}
      {guideCategory === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthTipsData.map((tip) => (
            <motion.div
              key={tip.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-stone-200/90 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-900 flex items-center justify-center text-2xl shadow-sm border border-emerald-200">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  {language === 'mr' ? tip.titleMr : tip.titleEn}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {language === 'mr' ? tip.descMr : tip.descEn}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center space-x-1.5 text-xs text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>डॉक्टरांचा सल्ला मानून चालत राहा</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
