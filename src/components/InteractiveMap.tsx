import React, { useState } from 'react';
import { Language, MapPoint } from '../types';
import { getTranslation } from '../translations';
import { Map, Navigation, Phone, ExternalLink, Sparkles, Filter, Info, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface InteractiveMapProps {
  language: Language;
  mapPoints: MapPoint[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  language,
  mapPoints,
  selectedCategory,
  onSelectCategory,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(mapPoints[0] || null);

  const filteredPoints = selectedCategory === 'all'
    ? mapPoints
    : mapPoints.filter(p => p.type === selectedCategory);

  const categories = [
    { id: 'all', label: 'सर्व (All Points)', icon: '🚩' },
    { id: 'temple', label: 'मंदिर (Temples)', icon: '🛕' },
    { id: 'ghat', label: 'चंद्रभागा घाट (Ghats)', icon: '🌊' },
    { id: 'water', label: 'पिण्याचे पाणी (Water)', icon: '💧' },
    { id: 'medical', label: 'वैद्यकीय केंद्र (Medical)', icon: '🏥' },
    { id: 'food', label: 'अन्नछत्र (Food)', icon: '🍲' },
    { id: 'toilet', label: 'शौचालय (Toilets)', icon: '🚻' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner - Slate Charcoal & Golden Accent */}
      <div className="bg-gradient-to-r from-[#1C1815] via-[#2A241F] to-[#141210] rounded-3xl p-6 text-white shadow-xl border border-amber-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-widest">
              जीपीएस नकाशा (GPS MAP)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-amber-100">
            {getTranslation(language, 'mapHeader')}
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            पंढरपूर परिसरातील महत्त्वाचे मार्ग, घाट, अन्नछत्र आणि वैद्यकीय मदत केन्द्रे.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-stone-900/90 p-2.5 rounded-2xl border border-stone-700">
          <Navigation className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-stone-200 font-medium">पंढरपूर मुख्य मार्ग - थेट दिशादर्शक</span>
        </div>
      </div>

      {/* Category Filters Pill Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md border border-amber-500/30'
                : 'bg-white text-stone-700 hover:bg-amber-50 border border-stone-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Map Interactive Simulation & Points Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Visual Display Box */}
        <div className="lg:col-span-8 bg-stone-900 rounded-3xl p-4 sm:p-6 shadow-xl border border-stone-800 relative min-h-[380px] sm:min-h-[460px] flex flex-col justify-between overflow-hidden">
          {/* Simulated Pandharpur River & Route Map Visual Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#3a322b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* Chandrabhaga River Flow Vector Overlay */}
          <div className="absolute top-1/3 -left-10 -right-10 h-16 bg-gradient-to-r from-blue-900/30 via-indigo-800/40 to-blue-900/30 blur-sm transform -rotate-3 border-y border-blue-500/20" />
          <span className="absolute top-[38%] right-12 text-[10px] font-black text-blue-300 uppercase tracking-widest bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30">
            चंद्रभागा नदी (Chandrabhaga River)
          </span>

          {/* Interactive Map Pins Simulation */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto py-8">
            {filteredPoints.map((point) => {
              const isSelected = selectedPoint?.id === point.id;
              return (
                <motion.div
                  key={point.id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedPoint(point)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer backdrop-blur-md ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-lg ring-2 ring-amber-400'
                      : 'bg-stone-800/90 text-stone-200 border-stone-700 hover:bg-stone-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl shrink-0">
                      {point.type === 'temple' ? '🛕' : point.type === 'ghat' ? '🌊' : point.type === 'water' ? '💧' : point.type === 'medical' ? '🏥' : '🍲'}
                    </span>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-xs truncate">
                        {language === 'mr' ? point.nameMr : point.nameEn}
                      </h4>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-stone-900 font-semibold' : 'text-stone-400'}`}>
                        {point.distanceFromTemple} अंतरावर
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="relative z-10 bg-stone-950/90 backdrop-blur-md p-3 rounded-2xl border border-stone-800 flex justify-between items-center text-xs text-stone-300">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>थेट GPS ठिकाणे सक्रीय ({filteredPoints.length} स्थाने)</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono">PANDHARPUR-GPS-V2</span>
          </div>
        </div>

        {/* Selected Point Details Panel */}
        <div className="lg:col-span-4">
          {selectedPoint ? (
            <motion.div
              key={selectedPoint.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/90 space-y-5"
            >
              <div className="border-b border-stone-100 pb-4 space-y-2">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  निवडले स्थान
                </span>
                <h3 className="text-xl font-bold text-stone-900 font-serif">
                  {language === 'mr' ? selectedPoint.nameMr : selectedPoint.nameEn}
                </h3>
                <p className="text-xs text-stone-500 font-sans">
                  {language === 'mr' ? selectedPoint.addressMr : selectedPoint.addressEn}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                  <span className="text-stone-500 font-semibold">श्री विठ्ठल मंदिरापासून अंतर:</span>
                  <span className="font-bold text-amber-800">{selectedPoint.distanceFromTemple}</span>
                </div>

                {selectedPoint.contact && (
                  <div className="flex justify-between items-center py-1.5 border-b border-stone-100">
                    <span className="text-stone-500 font-semibold">संपर्क क्रमांक:</span>
                    <a href={`tel:${selectedPoint.contact}`} className="font-bold text-blue-700 flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedPoint.contact}</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedPoint.lat},${selectedPoint.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-amber-200" />
                  <span>गूगल मॅपवर दिशा मिळवा (Navigate)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-200" />
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center text-stone-500 text-xs">
              स्थान निवडण्यासाठी डाव्या बाजूच्या मॅप पिनवर क्लिक करा.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
