import React, { useState } from 'react';
import { Language, AccommodationItem, AnnachhatraItem } from '../types';
import { getTranslation } from '../translations';
import { BedDouble, Utensils, MapPin, Phone, CheckCircle, Clock, Search, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface AccommodationViewProps {
  language: Language;
  accommodations: AccommodationItem[];
  annachhatras: AnnachhatraItem[];
  onBookBed: (accId: string) => void;
}

export const AccommodationView: React.FC<AccommodationViewProps> = ({
  language,
  accommodations,
  annachhatras,
  onBookBed,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'stays' | 'meals'>('stays');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner - Fresh Sandalwood & Emerald Accent */}
      <div className="bg-gradient-to-r from-[#1E1B18] via-[#2A241F] to-[#141210] rounded-3xl p-6 text-white shadow-xl border border-amber-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest">
            विनामूल्य सेवा (FREE SEVA)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-amber-100 mt-1">
            {getTranslation(language, 'cardStaysTitle')}
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            वारकऱ्यांसाठी मोफत निवास स्थानक, धर्मशाळा आणि २४ तास मोफत महाप्रसाद अन्नछत्र माहिती.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="bg-stone-900/90 p-1.5 rounded-2xl border border-stone-700 flex space-x-1 shrink-0">
          <button
            onClick={() => setActiveSubTab('stays')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeSubTab === 'stays'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>{language === 'mr' ? 'मोफत निवारा' : 'Free Stays'}</span>
          </button>
          <button
            onClick={() => setActiveSubTab('meals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeSubTab === 'meals'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>{language === 'mr' ? 'अन्नछत्र प्रसाद' : 'Food Meals'}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: STAYS */}
      {activeSubTab === 'stays' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations.map((acc) => {
            const hasBeds = acc.availableBeds > 0;
            const nameStr = typeof acc.name === 'string' ? acc.name : (acc.name[language] || acc.name.mr);
            const addressStr = typeof acc.address === 'string' ? acc.address : (acc.address[language] || acc.address.mr);
            return (
              <motion.div
                key={acc.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-stone-200/90 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      {acc.type === 'BhaktaNiwas' ? 'मोफत भक्त निवास' : 'मोफत धर्मशाळा'}
                    </span>
                    <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                      hasBeds ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {hasBeds ? `उपलब्ध: ${acc.availableBeds} जागा` : 'पूर्ण (Full)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 font-serif">
                    {nameStr}
                  </h3>

                  <p className="text-xs text-stone-500 flex items-center space-x-1 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{addressStr}</span>
                  </p>

                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 space-y-1.5 text-xs text-stone-700">
                    <div className="font-bold text-stone-900 text-[11px] uppercase tracking-wider text-amber-900">सुविधा (Facilities):</div>
                    <div className="flex flex-wrap gap-1.5">
                      {acc.facilities.map((f, i) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded-md border border-stone-200 text-[10px] font-medium text-stone-700">
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500 font-semibold">संपर्क:</span>
                    <a href={`tel:${acc.contactPhone}`} className="font-bold text-blue-700 flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{acc.contactPhone}</span>
                    </a>
                  </div>

                  <button
                    disabled={!hasBeds}
                    onClick={() => {
                      onBookBed(acc.id);
                      alert(`जागा यशस्वीपणे आरक्षित झाली! (${nameStr})`);
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                      hasBeds
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-sm'
                        : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    <BedDouble className="w-4 h-4" />
                    <span>{hasBeds ? getTranslation(language, 'bookBedBtn') : 'स्थान पूर्ण भरले आहे'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* SUB-TAB 2: MEALS */}
      {activeSubTab === 'meals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annachhatras.map((meal) => {
            const orgStr = typeof meal.organizer === 'string' ? meal.organizer : (meal.organizer[language] || meal.organizer.mr);
            const locStr = typeof meal.location === 'string' ? meal.location : (meal.location[language] || meal.location.mr);
            const menuStr = typeof meal.menuItems === 'string' ? meal.menuItems : (meal.menuItems[language] || meal.menuItems.mr);
            const timeStr = typeof meal.servingTimes === 'string' ? meal.servingTimes : (meal.servingTimes[language] || meal.servingTimes.mr);

            return (
              <motion.div
                key={meal.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-stone-200/90 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      मोफत महाप्रसाद
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{timeStr}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 font-serif">
                    {orgStr}
                  </h3>

                  <p className="text-xs text-stone-500 flex items-center space-x-1 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{locStr}</span>
                  </p>

                  <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200/80 space-y-1 text-xs text-amber-950">
                    <div className="font-bold text-[11px] uppercase tracking-wider text-amber-900">आजचा प्रसाद मेनू:</div>
                    <div className="font-bold text-xs">{menuStr}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
                  <span className="text-stone-500 font-semibold">क्षमता (Capacity):</span>
                  <span className="font-bold text-stone-800">{meal.dailyMealsCapacity.toLocaleString()} व्यक्ती रोज</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
