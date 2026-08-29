import React from 'react';
import { Language, UserProfile } from '../types';
import { getTranslation } from '../translations';
import { Globe, Volume2, ShieldAlert, User, LogIn } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onTriggerSOS: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  user,
  onOpenAuth,
  onTriggerSOS,
}) => {
  return (
    <header className="bg-amber-950 text-amber-50 border-b border-amber-800/80 sticky top-0 z-50 shadow-lg">
      {/* Top Notification Live Ticker */}
      <div className="bg-amber-900/90 text-amber-200 text-[11px] sm:text-xs py-1 px-3 border-b border-amber-800/60 flex items-center justify-between overflow-hidden">
        <div className="flex items-center space-x-2 truncate">
          <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full uppercase animate-pulse shrink-0">
            Live
          </span>
          <span className="truncate">
            🚩 {getTranslation(language, 'palkhiStatusHeader')}: वाखरी मुक्काम (पंढरपूर ५ किमी) • {getTranslation(language, 'templeQueueLive')}
          </span>
        </div>
        <span className="hidden md:inline text-amber-300 font-semibold shrink-0">
          🚩 राम कृष्ण हरी!
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center gap-2">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md border border-amber-300/40 shrink-0">
            <span className="text-xl sm:text-2xl font-black text-white">🚩</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-base sm:text-xl text-amber-100 font-serif tracking-tight">
                {getTranslation(language, 'appName')}
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-800 text-amber-200 border border-amber-700">
                Official Wari
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-amber-300/90 font-medium truncate max-w-[200px] sm:max-w-md">
              {getTranslation(language, 'tagline')}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Language Selector */}
          <div className="relative flex items-center bg-amber-900/80 rounded-xl p-0.5 sm:p-1 border border-amber-700/80">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 ml-1 mr-0.5 shrink-0 hidden xs:inline" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              aria-label={getTranslation(language, 'langTitle')}
              className="bg-transparent text-amber-100 text-xs sm:text-sm font-bold pr-1 pl-1 py-1 focus:outline-none cursor-pointer rounded-lg hover:text-white"
            >
              <option value="mr" className="bg-amber-950 text-white font-medium">मराठी (MR)</option>
              <option value="hi" className="bg-amber-950 text-white font-medium">हिंदी (HI)</option>
              <option value="en" className="bg-amber-950 text-white font-medium">English (EN)</option>
            </select>
          </div>

          {/* User Auth Profile Button */}
          <button
            onClick={onOpenAuth}
            className={`px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow flex items-center space-x-1.5 border ${
              user?.isLoggedIn
                ? 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white border-amber-400'
            }`}
          >
            {user?.isLoggedIn ? (
              <>
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-800 shrink-0" />
                <span className="max-w-[80px] sm:max-w-[120px] truncate font-extrabold">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-red-600 text-white font-black rounded-full hidden md:inline">
                  {user.bloodGroup}
                </span>
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{getTranslation(language, 'loginBtn')}</span>
              </>
            )}
          </button>

          {/* 1-Tap SOS Emergency Quick Button */}
          <button
            onClick={onTriggerSOS}
            title={getTranslation(language, 'emergencySosBtn')}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs sm:text-sm px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all shadow-md flex items-center space-x-1 border border-red-400 animate-pulse shrink-0"
          >
            <ShieldAlert className="w-4 h-4 text-amber-200" />
            <span className="hidden md:inline">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
