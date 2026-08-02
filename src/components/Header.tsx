import React, { useState } from 'react';
import { Language, TabType } from '../types';
import { getTranslation } from '../translations';
import { Volume2, VolumeX, Type, ShieldAlert, Sparkles, PhoneCall } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isLargeText: boolean;
  onToggleTextSize: () => void;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  isLargeText,
  onToggleTextSize,
  activeTab,
  onSelectTab,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleVoiceAssist = () => {
    if (!('speechSynthesis' in window)) {
      alert("Voice assistance is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = language === 'mr'
      ? "राम कृष्ण हरी! वारकरी सेवा ॲपमध्ये आपले स्वागत आहे. येथे थेट दर्शन गर्दी, ई-पास, वारी मार्ग नकाशा, विनामूल्य निवास आणि १-टॅप आणीबाणी मदत उपलब्ध आहे."
      : language === 'hi'
      ? "राम कृष्ण हरि! वारकरी सेवा ऐप में आपका स्वागत है। यहां लाइव दर्शन भीड़, ई-पास, वारी मार्ग मानचित्र, निःशुल्क आवास और 1-टैप आपातकालीन सहायता उपलब्ध है।"
      : "Ram Krishna Hari! Welcome to WariSeva pilgrim app. Access live crowd status, e-Darshan tokens, interactive route map, free stays, and instant SOS emergency assistance.";

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9; // clear, comfortable speed for elders
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <header className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-700 text-white shadow-xl sticky top-0 z-50 border-b-2 border-amber-300">
      {/* Top Banner Accent */}
      <div className="bg-amber-900/40 px-3 py-1 text-xs text-amber-100 flex flex-wrap justify-between items-center border-b border-amber-500/30">
        <div className="flex items-center space-x-2 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>🚩 {getTranslation(language, 'welcomeGreeting')}</span>
          <span className="hidden sm:inline opacity-80">| पंढरपूर श्री विठ्ठल रुक्मिणी तीर्थक्षेत्र</span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <a href="tel:108" className="hover:underline flex items-center space-x-1 font-semibold text-amber-200">
            <PhoneCall className="w-3 h-3 text-red-300" />
            <span>108 (रुग्णवाहिका)</span>
          </a>
          <span>•</span>
          <a href="tel:112" className="hover:underline flex items-center space-x-1 font-semibold text-amber-200">
            <span>112 (पोलीस)</span>
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Logo & Title */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100 p-1 flex items-center justify-center shadow-md border-2 border-amber-300 group-hover:scale-105 transition-transform">
            <span className="text-2xl sm:text-3xl">🛕</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif">
                {getTranslation(language, 'appName')}
              </h1>
              <span className="bg-amber-300 text-amber-950 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full border border-amber-400 shadow-sm">
                सेवा
              </span>
            </div>
            <p className="text-xs text-amber-100/90 hidden sm:block font-sans">
              {getTranslation(language, 'tagline')}
            </p>
          </div>
        </div>

        {/* Accessibility Tools & Language Selector */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Language Selector Buttons */}
          <div className="bg-amber-950/40 p-1 rounded-lg border border-amber-400/40 flex items-center space-x-1 shadow-inner">
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-2.5 py-1 text-xs sm:text-sm font-bold rounded-md transition-all ${
                language === 'mr'
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'text-amber-100 hover:bg-amber-800/60'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2.5 py-1 text-xs sm:text-sm font-bold rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'text-amber-100 hover:bg-amber-800/60'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 text-xs sm:text-sm font-bold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'text-amber-100 hover:bg-amber-800/60'
              }`}
            >
              ENG
            </button>
          </div>

          {/* Text Size Mode Toggle for Elder Pilgrims */}
          <button
            onClick={onToggleTextSize}
            title="Toggle Large Text for Easy Reading"
            className={`p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center space-x-1 ${
              isLargeText
                ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold ring-2 ring-amber-300'
                : 'bg-amber-800/50 text-amber-100 border-amber-500/40 hover:bg-amber-800'
            }`}
          >
            <Type className="w-4 h-4 text-amber-200" />
            <span className="hidden md:inline">
              {isLargeText ? getTranslation(language, 'textSizeNormal') : getTranslation(language, 'textSizeLarge')}
            </span>
          </button>

          {/* Voice Assist Button */}
          <button
            onClick={handleVoiceAssist}
            title="Read aloud page guidance"
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center space-x-1 ${
              isSpeaking
                ? 'bg-emerald-500 text-white border-emerald-300 animate-pulse'
                : 'bg-amber-800/50 text-amber-100 border-amber-500/40 hover:bg-amber-800'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-amber-200" />}
            <span className="hidden sm:inline">
              {isSpeaking ? getTranslation(language, 'voiceReading') : getTranslation(language, 'voiceAssist')}
            </span>
          </button>

          {/* 1-Tap Emergency SOS Quick Action */}
          <button
            onClick={() => onSelectTab('sos')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-3 py-1.5 rounded-lg border-2 border-red-300 shadow-lg hover:shadow-red-500/50 transition-all flex items-center space-x-1.5 animate-bounce-subtle"
          >
            <ShieldAlert className="w-4 h-4 text-amber-200 animate-pulse" />
            <span>SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
