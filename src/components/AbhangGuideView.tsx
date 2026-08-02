import React, { useState } from 'react';
import { Language, AbhangItem } from '../types';
import { getTranslation } from '../translations';
import { Music, Play, Pause, HeartHandshake, ShieldCheck, Footprints, Droplets, Heart, Volume2 } from 'lucide-react';
import { sampleAbhangs } from '../data/wariData';

interface AbhangGuideViewProps {
  language: Language;
}

export const AbhangGuideView: React.FC<AbhangGuideViewProps> = ({ language }) => {
  const [playingAbhangId, setPlayingAbhangId] = useState<string | null>(null);

  const toggleAudio = (abhang: AbhangItem) => {
    if (!('speechSynthesis' in window)) {
      alert("Audio player not supported on this browser.");
      return;
    }

    if (playingAbhangId === abhang.id) {
      window.speechSynthesis.cancel();
      setPlayingAbhangId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setPlayingAbhangId(abhang.id);

    const utterance = new SpeechSynthesisUtterance(`${abhang.title}. ${abhang.saint}. ${abhang.lyricsMr}`);
    utterance.lang = 'mr-IN';
    utterance.rate = 0.85;

    utterance.onend = () => setPlayingAbhangId(null);
    utterance.onerror = () => setPlayingAbhangId(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Abhang Header */}
      <div className="bg-gradient-to-r from-purple-900 via-amber-800 to-purple-900 text-white p-5 rounded-2xl shadow-md border border-purple-500/40 space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold font-serif flex items-center space-x-2">
          <span>🎵</span>
          <span>{getTranslation(language, 'abhangHeader')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-purple-200">
          वारीच्या प्रवासात भक्तीमय अभंग ऐका आणि वारकरी आरोग्याची काळजी घ्या.
        </p>
      </div>

      {/* Abhang Audio Player Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleAbhangs.map((abhang) => {
          const isPlaying = playingAbhangId === abhang.id;

          return (
            <div
              key={abhang.id}
              className={`rounded-2xl p-5 shadow-md border transition-all flex flex-col justify-between space-y-4 ${
                isPlaying
                  ? 'bg-amber-100/90 border-2 border-amber-500 ring-2 ring-amber-300'
                  : 'bg-white border-amber-200 hover:shadow-lg'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                      {abhang.saint}
                    </span>
                    <h3 className="font-extrabold text-base text-amber-950 mt-1 font-serif">
                      {abhang.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleAudio(abhang)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 ${
                      isPlaying ? 'bg-amber-600 text-white animate-pulse' : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                </div>

                <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 text-xs font-serif leading-relaxed text-amber-950 whitespace-pre-line">
                  {language === 'hi' ? abhang.lyricsHi : abhang.lyricsMr}
                </div>

                <p className="text-[11px] text-amber-800 italic border-t border-amber-100 pt-2">
                  " {abhang.translationEn} "
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => toggleAudio(abhang)}
                  className="w-full text-xs font-bold py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white transition-all flex items-center justify-center space-x-1"
                >
                  <Volume2 className="w-4 h-4 text-amber-200" />
                  <span>{isPlaying ? 'थांबवा (Pause)' : 'अभंग ऐका (Play Abhang)'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Health Guidelines Section */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-amber-200 space-y-4">
        <h3 className="font-extrabold text-lg text-amber-950 font-serif flex items-center space-x-2">
          <Footprints className="w-5 h-5 text-amber-700" />
          <span>{getTranslation(language, 'healthTipsTitle')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span>१. हायड्रेशन (Hydration)</span>
            </div>
            <p className="text-xs text-amber-900">
              {getTranslation(language, 'tip1')}
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm">
              <Footprints className="w-5 h-5 text-amber-700" />
              <span>२. पायी चालताना काळजी</span>
            </div>
            <p className="text-xs text-amber-900">
              {getTranslation(language, 'tip2')}
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>३. ओळखपत्र व सुरक्षा</span>
            </div>
            <p className="text-xs text-amber-900">
              {getTranslation(language, 'tip3')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
