import React, { useState } from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { sampleAbhangs } from '../data/wariData';
import {
  Search,
  HeartPulse,
  CheckCircle2,
  BookOpen,
  Heart,
  Youtube,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface AbhangGuideViewProps {
  language: Language;
}

export const AbhangGuideView: React.FC<AbhangGuideViewProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSaint, setSelectedSaint] = useState<string>('all');
  const [expandedAbhangId, setExpandedAbhangId] = useState<string | null>(sampleAbhangs[0].id);
  const [likedAbhangs, setLikedAbhangs] = useState<Record<string, boolean>>({});

  // Direct YouTube Search Handler
  const handleOpenYouTubeSearch = (query?: string) => {
    const searchTerm = query || searchQuery || 'Pandharpur Wari Vitthal Abhang';
    const targetUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // Filter Abhangs
  const filteredAbhangs = sampleAbhangs.filter((abhang) => {
    const titleMatch = abhang.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                       abhang.saint[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                       abhang.singer[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                       abhang.lyrics[language].toLowerCase().includes(searchQuery.toLowerCase());
    const saintMatch = selectedSaint === 'all' || abhang.saint[language].includes(selectedSaint);
    return titleMatch && saintMatch;
  });

  const saintsList = [
    { id: 'all', label: { mr: 'सर्व संत', hi: 'सभी संत', en: 'All Saints' } },
    { id: 'तुकाराम', label: { mr: 'संत तुकाराम महाराज', hi: 'संत तुकाराम महाराज', en: 'Sant Tukaram Maharaj' } },
    { id: 'ज्ञानेश्वर', label: { mr: 'संत ज्ञानेश्वर महाराज', hi: 'संत ज्ञानेश्वर महाराज', en: 'Sant Dnyaneshwar Maharaj' } },
    { id: 'एकनाथ', label: { mr: 'संत एकनाथ महाराज', hi: 'संत एकनाथ महाराज', en: 'Sant Eknath Maharaj' } },
    { id: 'नामदेव', label: { mr: 'संत नामदेव महाराज', hi: 'संत नामदेव महाराज', en: 'Sant Namdev Maharaj' } },
    { id: 'सोयराबाई', label: { mr: 'संत सोयराबाई', hi: 'संत सोयराबाई', en: 'Sant Soyrabai' } },
  ];

  const toggleLike = (id: string) => {
    setLikedAbhangs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12"
    >
      {/* Devotional YouTube Banner */}
      <div className="bg-gradient-to-r from-red-900 via-amber-900 to-amber-950 text-white p-6 rounded-3xl shadow-xl border-2 border-red-500/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow font-black text-xl">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
              {getTranslation(language, 'abhangHeader')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-amber-200/90 mt-1 max-w-2xl">
            {getTranslation(language, 'youtubeSearchNotice')}
          </p>
        </div>

        <button
          onClick={() => handleOpenYouTubeSearch(searchQuery || 'Pandharpur Wari Vitthal Abhang Bhakti')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center space-x-2 shrink-0 shadow-lg cursor-pointer transition-transform hover:scale-105"
        >
          <Youtube className="w-4 h-4" />
          <span>{getTranslation(language, 'searchDirectOnYouTube')}</span>
        </button>
      </div>

      {/* YouTube Search Bar & Saint Filters */}
      <div className="bg-white p-5 rounded-3xl shadow-lg border-2 border-amber-300 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex w-full md:w-auto flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-amber-700 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getTranslation(language, 'searchAbhangsPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-300 focus:outline-none focus:border-amber-600 text-xs sm:text-sm font-semibold bg-amber-50/40 text-amber-950"
            />
          </div>
          <button
            onClick={() => handleOpenYouTubeSearch()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-1.5 shrink-0 shadow cursor-pointer"
          >
            <Youtube className="w-4 h-4" />
            <span>{getTranslation(language, 'searchDirectOnYouTube')}</span>
          </button>
        </div>

        {/* Saint Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
          {saintsList.map((saint) => (
            <button
              key={saint.id}
              onClick={() => setSelectedSaint(saint.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedSaint === saint.id
                  ? 'bg-amber-800 text-white border-amber-900 shadow'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              {saint.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Abhang Cards with YouTube Search Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAbhangs.map((abhang) => {
          const isExpanded = expandedAbhangId === abhang.id;
          const isLiked = likedAbhangs[abhang.id] || false;
          const youtubeQuery = `${abhang.title[language]} ${abhang.saint[language]} ${abhang.singer[language]} Pandharpur Wari Abhang`;

          return (
            <div
              key={abhang.id}
              className="bg-white rounded-3xl shadow-lg border-2 border-amber-300 hover:border-amber-500 overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl"
            >
              <div className="p-5 space-y-4">
                {/* Header row with saint image & info */}
                <div className="flex gap-4 items-start">
                  <div className="relative w-20 sm:w-24 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-300 shadow-sm bg-amber-900">
                    <img
                      src={abhang.thumbnail}
                      alt={abhang.title[language]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1">
                      <span className="text-[10px] text-amber-200 font-bold">
                        {abhang.duration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Attribution */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                        {abhang.saint[language]}
                      </span>
                      <button
                        onClick={() => toggleLike(abhang.id)}
                        className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                          isLiked ? 'text-red-500 bg-red-50' : 'text-stone-400 hover:text-red-500'
                        }`}
                        title={getTranslation(language, 'favorite')}
                      >
                        <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-amber-950 font-serif truncate mt-1">
                      {abhang.title[language]}
                    </h3>
                    <p className="text-xs text-amber-800 font-semibold mt-0.5 truncate">
                      🎙️ {getTranslation(language, 'traditionalSinging')}: <span className="font-bold text-amber-950">{abhang.singer[language]}</span>
                    </p>
                  </div>
                </div>

                {/* Lyrics Devotional Reader */}
                <div className="p-4 rounded-2xl border space-y-2 bg-amber-50/70 border-amber-200">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider font-serif flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                      <span>{getTranslation(language, 'lyricsAndMeaning')}:</span>
                    </h4>
                    <button
                      onClick={() => setExpandedAbhangId(isExpanded ? null : abhang.id)}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-950 underline cursor-pointer"
                    >
                      {isExpanded ? getTranslation(language, 'showLess') : getTranslation(language, 'fullLyrics')}
                    </button>
                  </div>

                  <p className={`text-sm sm:text-base font-serif text-amber-950 whitespace-pre-line leading-relaxed font-semibold ${
                    !isExpanded ? 'line-clamp-3' : ''
                  }`}>
                    {abhang.lyrics[language]}
                  </p>

                  {/* English Meaning if Expanded */}
                  {isExpanded && (
                    <div className="pt-2.5 border-t border-amber-200 mt-2">
                      <span className="text-[11px] font-extrabold text-amber-800 block mb-0.5">
                        {getTranslation(language, 'englishTranslationTitle')}
                      </span>
                      <p className="text-xs text-amber-900/90 italic leading-relaxed font-medium">
                        "{abhang.translationEn}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* YouTube Search Option */}
              <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenYouTubeSearch(youtubeQuery)}
                  className="flex-1 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer transform hover:scale-[1.02]"
                >
                  <Youtube className="w-4 h-4" />
                  <span>{getTranslation(language, 'searchYouTubeBtn')}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>

                <button
                  onClick={() => setExpandedAbhangId(isExpanded ? null : abhang.id)}
                  className="py-2.5 px-4 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm"
                >
                  {isExpanded ? getTranslation(language, 'showLess') : getTranslation(language, 'fullLyrics')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warkari Health & Walking Tips Guide */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 rounded-3xl p-6 shadow-md border-2 border-emerald-300 space-y-4">
        <h3 className="font-extrabold text-base sm:text-lg text-emerald-950 font-serif flex items-center space-x-2">
          <HeartPulse className="w-6 h-6 text-emerald-700" />
          <span>{getTranslation(language, 'healthTipsTitle')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-sm space-y-1.5">
            <span className="text-emerald-800 font-extrabold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. {language === 'mr' ? 'जल व ओआरएस' : language === 'hi' ? 'जल व ओआरएस' : 'Hydration'}</span>
            </span>
            <p className="text-emerald-950 font-medium leading-relaxed">
              {getTranslation(language, 'tip1')}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-sm space-y-1.5">
            <span className="text-emerald-800 font-extrabold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. {language === 'mr' ? 'पायांची काळजी' : language === 'hi' ? 'पैरों की देखभाल' : 'Foot Care'}</span>
            </span>
            <p className="text-emerald-950 font-medium leading-relaxed">
              {getTranslation(language, 'tip2')}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-sm space-y-1.5">
            <span className="text-emerald-800 font-extrabold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. {language === 'mr' ? 'सुरक्षा व ओळख' : language === 'hi' ? 'सुरक्षा व पहचान' : 'Safety & ID'}</span>
            </span>
            <p className="text-emerald-950 font-medium leading-relaxed">
              {getTranslation(language, 'tip3')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
