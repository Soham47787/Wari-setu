import React, { useState } from 'react';
import { Language, AbhangItem } from '../types';
import { getTranslation } from '../translations';
import { sampleAbhangs } from '../data/wariData';
import {
  Youtube,
  ExternalLink,
  Play,
  Heart,
  HeartPulse,
  CheckCircle2,
  Search,
  Music,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';

interface AbhangGuideViewProps {
  language: Language;
}

export const AbhangGuideView: React.FC<AbhangGuideViewProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSaint, setSelectedSaint] = useState<string>('all');
  const [expandedAbhangId, setExpandedAbhangId] = useState<string | null>(sampleAbhangs[0].id);

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
    { id: 'all', label: 'सर्व संत (All Saints)' },
    { id: 'तुकाराम', label: 'संत तुकाराम महाराज' },
    { id: 'ज्ञानेश्वर', label: 'संत ज्ञानेश्वर महाराज' },
    { id: 'एकनाथ', label: 'संत एकनाथ महाराज' },
    { id: 'नामदेव', label: 'संत नामदेव महाराज' },
    { id: 'सोयराबाई', label: 'संत सोयराबाई' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Devotional Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-amber-900 text-white p-5 sm:p-6 rounded-3xl shadow-xl border-2 border-amber-500/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center shadow">
              <Youtube className="w-6 h-6 text-white fill-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif">
              {getTranslation(language, 'abhangHeader')}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-amber-200 mt-1 max-w-2xl">
            {getTranslation(language, 'abhangSubheader')}
          </p>
        </div>

        <div className="bg-red-950/90 border border-red-500/60 px-4 py-2 rounded-2xl text-red-200 text-xs font-bold flex items-center space-x-2 shrink-0 shadow">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span>अधिकृत YouTube व्हिडिओ लिंक्स (Working Video Links)</span>
        </div>
      </div>

      {/* Search & Saint Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-md border-2 border-amber-300 flex flex-col md:flex-row gap-3.5 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-amber-700 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अभंग, संत किंवा गायक शोधा..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm font-semibold bg-amber-50/40"
          />
        </div>

        {/* Saint Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
          {saintsList.map((saint) => (
            <button
              key={saint.id}
              onClick={() => setSelectedSaint(saint.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedSaint === saint.id
                  ? 'bg-amber-800 text-white border-amber-900 shadow'
                  : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
              }`}
            >
              {saint.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Abhang Cards with Working YouTube Video Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAbhangs.map((abhang) => {
          const isExpanded = expandedAbhangId === abhang.id;

          return (
            <div
              key={abhang.id}
              className="bg-white rounded-3xl shadow-lg border-2 border-amber-300/90 overflow-hidden flex flex-col justify-between transition-all hover:border-amber-500 hover:shadow-xl"
            >
              <div className="p-5 space-y-4">
                {/* Header row with thumbnail & info */}
                <div className="flex gap-4 items-start">
                  {/* Thumbnail with overlay badge */}
                  <div className="relative w-24 sm:w-28 h-20 rounded-2xl overflow-hidden shrink-0 border border-amber-300 shadow-sm bg-amber-900">
                    <img
                      src={abhang.thumbnail}
                      alt={abhang.title[language]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                      {abhang.duration}
                    </span>
                  </div>

                  {/* Title & Attribution */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                      {abhang.saint[language]}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-amber-950 font-serif truncate mt-1">
                      {abhang.title[language]}
                    </h3>
                    <p className="text-xs text-amber-800 font-semibold mt-0.5 truncate">
                      🎙️ गायक: <span className="font-bold text-amber-950">{abhang.singer[language]}</span>
                    </p>
                  </div>
                </div>

                {/* Lyrics Preview / Full */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider font-serif flex items-center space-x-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                      <span>अभंग बोल (Lyrics):</span>
                    </h4>
                    <button
                      onClick={() => setExpandedAbhangId(isExpanded ? null : abhang.id)}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-950 underline"
                    >
                      {isExpanded ? "कमी पहा (Show Less)" : "संपूर्ण बोल (Full Lyrics)"}
                    </button>
                  </div>
                  <p className={`text-xs sm:text-sm font-serif text-amber-950 whitespace-pre-line leading-relaxed font-semibold ${
                    !isExpanded ? 'line-clamp-2' : ''
                  }`}>
                    {abhang.lyrics[language]}
                  </p>

                  {/* English Meaning if Expanded */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-amber-200 mt-2">
                      <span className="text-[11px] font-extrabold text-amber-800 block mb-0.5">
                        {getTranslation(language, 'englishTranslationTitle')}
                      </span>
                      <p className="text-xs text-amber-900/90 italic leading-relaxed">
                        "{abhang.translationEn}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Direct Working YouTube Links */}
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                {/* Primary Working YouTube Direct Video Link */}
                <a
                  href={abhang.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-center"
                >
                  <Youtube className="w-4 h-4 fill-white" />
                  <span>▶️ YouTube वर व्हिडिओ पहा (Open Video)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Secondary Search on YouTube Link */}
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(abhang.title.mr + ' ' + abhang.singer.mr)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-white hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-300 transition-all flex items-center justify-center space-x-1.5 shadow-sm text-center"
                >
                  <Search className="w-3.5 h-3.5 text-amber-700" />
                  <span>YouTube सर्च</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warkari Health & Walking Tips Guide at the bottom */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 rounded-3xl p-6 shadow-md border-2 border-emerald-300 space-y-4">
        <h3 className="font-extrabold text-base sm:text-lg text-emerald-950 font-serif flex items-center space-x-2">
          <HeartPulse className="w-6 h-6 text-emerald-700" />
          <span>{getTranslation(language, 'healthTipsTitle')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-sm space-y-1.5">
            <span className="text-emerald-800 font-extrabold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>१. जल व ओआरएस (Hydration)</span>
            </span>
            <p className="text-emerald-950 font-medium leading-relaxed">
              {getTranslation(language, 'tip1')}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-sm space-y-1.5">
            <span className="text-emerald-800 font-extrabold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>२. पायांची काळजी (Foot Care)</span>
            </span>
            <p className="text-emerald-950 font-medium leading-relaxed">
              {getTranslation(language, 'tip2')}
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-sm space-y-1.5">
            <span className="text-emerald-800 font-extrabold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>३. सुरक्षा व ओळख (ID Card & Safety)</span>
            </span>
            <p className="text-emerald-950 font-medium leading-relaxed">
              {getTranslation(language, 'tip3')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
