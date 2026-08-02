import React, { useState } from 'react';
import { Language, TabType } from '../types';
import { getTranslation } from '../translations';
import { Volume2, VolumeX, Type, ShieldAlert, PhoneCall, Sparkles, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isLargeText: boolean;
  onToggleTextSize: () => void;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenVoiceAssist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  isLargeText,
  onToggleTextSize,
  activeTab,
  onSelectTab,
  onOpenVoiceAssist,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-xl border-b border-amber-300/30">
      {/* Top Hotline Strip - Deep Sandalwood Maroon */}
      <div className="bg-[#6B21A8] sm:bg-[#78350F] px-4 py-1.5 text-xs text-amber-100 flex flex-wrap justify-between items-center border-b border-amber-400/20">
        <div className="flex items-center space-x-2 font-medium tracking-wide">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          <span className="font-extrabold text-amber-200">{getTranslation(language, 'welcomeGreeting')}</span>
          <span className="hidden sm:inline text-amber-100/80">| पंढरपूर श्री विठ्ठल रुक्मिणी क्षेत्र</span>
        </div>

        <div className="flex items-center space-x-4 text-xs font-bold">
          <a href="tel:108" className="hover:text-white flex items-center space-x-1.5 transition-colors bg-rose-900/60 px-2 py-0.5 rounded-lg border border-rose-400/40">
            <PhoneCall className="w-3.5 h-3.5 text-rose-300" />
            <span className="text-white">१०८ रुग्णवाहिका</span>
          </a>
          <span className="text-amber-300/40">•</span>
          <a href="tel:112" className="hover:text-white flex items-center space-x-1.5 transition-colors text-amber-100">
            <span>११२ पोलीस मदत</span>
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <motion.div 
          onClick={() => onSelectTab('home')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 text-amber-950 p-2 flex items-center justify-center shadow-md border-2 border-amber-200 font-serif font-black text-2xl">
            🛕
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-white drop-shadow">
                {getTranslation(language, 'appName')}
              </h1>
              <span className="bg-amber-100 text-amber-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-amber-300">
                सेवा
              </span>
            </div>
            <p className="text-xs text-amber-100/90 hidden sm:block font-sans font-medium">
              {getTranslation(language, 'tagline')}
            </p>
          </div>
        </motion.div>

        {/* Action Toolbar */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Language Selector Pills */}
          <div className="bg-amber-950/40 p-1 rounded-xl border border-amber-300/30 flex items-center space-x-1 backdrop-blur-md">
            {(['mr', 'hi', 'en'] as Language[]).map((lang) => {
              const label = lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'ENG';
              const isSelected = language === lang;
              return (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`relative px-2.5 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                    isSelected
                      ? 'bg-amber-100 text-amber-950 shadow-md border border-amber-300'
                      : 'text-amber-100 hover:text-white hover:bg-amber-800/40'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Text Size Scale Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTextSize}
            title="Toggle Text Size for Easy Reading"
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              isLargeText
                ? 'bg-amber-100 text-amber-950 border-white font-bold shadow'
                : 'bg-amber-950/30 text-amber-100 border-amber-300/30 hover:bg-amber-900/40'
            }`}
          >
            <Type className="w-4 h-4 text-amber-200" />
            <span className="hidden md:inline">
              {isLargeText ? getTranslation(language, 'textSizeNormal') : getTranslation(language, 'textSizeLarge')}
            </span>
          </motion.button>

          {/* Voice Assist Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenVoiceAssist}
            title="Open Interactive Voice Help Assistant"
            className="bg-amber-100 text-amber-950 font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border border-amber-300 shadow-md flex items-center space-x-1.5 hover:bg-white transition-all"
          >
            <Volume2 className="w-4 h-4 text-amber-800 animate-pulse" />
            <span>{getTranslation(language, 'voiceAssist')}</span>
          </motion.button>

          {/* 1-Tap SOS Quick Action */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectTab('sos')}
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border border-red-300 shadow-md shadow-red-900/30 flex items-center space-x-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>SOS</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
