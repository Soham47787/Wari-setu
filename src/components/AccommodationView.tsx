import React, { useState } from 'react';
import { Language, AccommodationItem, AnnachhatraItem } from '../types';
import { getTranslation } from '../translations';
import { BedDouble, Utensils, Phone, MapPin, CheckCircle, Shield, Wifi, Filter, Coffee } from 'lucide-react';

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
  const [activeTabSection, setActiveTabSection] = useState<'stays' | 'annachhatra'>('stays');
  const [selectedFacility, setSelectedFacility] = useState<string>('all');
  const [bookedIds, setBookedIds] = useState<string[]>([]);

  const handleReserve = (acc: AccommodationItem) => {
    if (acc.availableBeds <= 0) {
      alert("क्षमतेपेक्षा जास्त खाटा भरलेल्या आहेत / No beds available currently");
      return;
    }
    onBookBed(acc.id);
    setBookedIds([...bookedIds, acc.id]);
    alert(`तुमची खाट ${acc.name[language]} येथे आरक्षित झाली आहे! (Bed reserved successfully)`);
  };

  const filteredAccommodations = accommodations.filter(acc => {
    if (selectedFacility === 'all') return true;
    return acc.facilities.some(f => f.toLowerCase().includes(selectedFacility.toLowerCase()));
  });

  return (
    <div className="space-y-6 pb-12">
      {/* View Header with Toggle Tabs */}
      <div className="bg-amber-900 text-white p-5 rounded-2xl shadow-md border border-amber-700 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif flex items-center space-x-2">
              <span>🏠</span>
              <span>{getTranslation(language, 'stayHeader')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-200 mt-1">
              वारकऱ्यांसाठी सरकारी व सामाजिक संस्थांचे विनामूल्य निवास व अन्नछत्र महाप्रसाद.
            </p>
          </div>

          <div className="bg-amber-950/60 p-1 rounded-xl border border-amber-500/40 flex space-x-1">
            <button
              onClick={() => setActiveTabSection('stays')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
                activeTabSection === 'stays'
                  ? 'bg-amber-400 text-amber-950 shadow'
                  : 'text-amber-100 hover:bg-amber-800'
              }`}
            >
              <BedDouble className="w-4 h-4" />
              <span>विनामूल्य निवास (Stays)</span>
            </button>
            <button
              onClick={() => setActiveTabSection('annachhatra')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
                activeTabSection === 'annachhatra'
                  ? 'bg-amber-400 text-amber-950 shadow'
                  : 'text-amber-100 hover:bg-amber-800'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>अन्नछत्र भोजन (Meals)</span>
            </button>
          </div>
        </div>

        {/* Facility Filter Chips for Stays */}
        {activeTabSection === 'stays' && (
          <div className="flex items-center space-x-2 pt-2 overflow-x-auto no-scrollbar border-t border-amber-800">
            <span className="text-xs text-amber-300 font-bold flex items-center space-x-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>सुविधा:</span>
            </span>
            {['all', 'Wheelchair', 'Hot Water', 'Free Meals', 'Medical'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFacility(f)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFacility === f
                    ? 'bg-amber-300 text-amber-950 font-bold'
                    : 'bg-amber-800/80 text-amber-100 hover:bg-amber-700'
                }`}
              >
                {f === 'all' ? 'सर्व सुविधा' : f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 1: Free Accommodations List */}
      {activeTabSection === 'stays' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAccommodations.map((acc) => {
            const isBooked = bookedIds.includes(acc.id);
            const occupancyPct = Math.round(((acc.totalBeds - acc.availableBeds) / acc.totalBeds) * 100);

            return (
              <div
                key={acc.id}
                className="bg-white rounded-2xl p-5 shadow-md border border-amber-200 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                      {acc.isFree ? 'विनामूल्य (FREE STAY)' : 'सवलत'}
                    </span>
                    <span className="text-xs font-bold text-amber-800 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{acc.distanceFromTempleKm} किमी अंतरावर</span>
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-amber-950 font-serif">
                    {acc.name[language]}
                  </h3>
                  <p className="text-xs text-amber-800">
                    📍 {acc.address[language]}
                  </p>

                  {/* Bed Occupancy Progress Bar */}
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-amber-900">
                        {getTranslation(language, 'availableBeds')}: <span className="text-emerald-700 text-sm">{acc.availableBeds}</span>
                      </span>
                      <span className="text-amber-700">{acc.totalBeds} एकूण खाटा</span>
                    </div>
                    <div className="w-full bg-amber-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          occupancyPct > 80 ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Facility Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {acc.facilities.map((fac, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-900 border border-amber-200"
                      >
                        ✓ {fac}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="flex gap-2 pt-2 border-t border-amber-100">
                  <a
                    href={`tel:${acc.contactPhone}`}
                    className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold py-2.5 rounded-xl text-center transition-all flex items-center justify-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-800" />
                    <span>कॉल करा ({acc.contactPhone})</span>
                  </a>

                  <button
                    onClick={() => handleReserve(acc)}
                    disabled={isBooked || acc.availableBeds <= 0}
                    className={`flex-1 text-xs font-extrabold py-2.5 rounded-xl shadow transition-all ${
                      isBooked
                        ? 'bg-emerald-600 text-white cursor-default'
                        : acc.availableBeds <= 0
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    {isBooked ? '✓ खाट आरक्षित झाली' : getTranslation(language, 'bookBedBtn')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 2: Annachhatra Free Meal Distribution */}
      {activeTabSection === 'annachhatra' && (
        <div className="space-y-4">
          <div className="bg-amber-100 p-4 rounded-2xl border border-amber-300 text-xs text-amber-900 flex items-center space-x-2">
            <Coffee className="w-5 h-5 text-amber-700 shrink-0" />
            <p>
              श्री विठ्ठल रुक्मिणी वारीमध्ये विविध सामाजिक व धार्मिक संस्थांतर्फे २४ तास मोफत महाप्रसाद व अन्नछत्र सुरू आहे.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {annachhatras.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-2xl p-5 shadow-md border border-amber-200 space-y-3"
              >
                <div className="flex items-center space-x-3 border-b border-amber-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xl">
                    🍲
                  </div>
                  <div>
                    <h3 className="font-extrabold text-amber-950 text-sm font-serif">
                      {ann.organizer[language]}
                    </h3>
                    <p className="text-xs text-amber-800">📍 {ann.location[language]}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    <span className="font-bold text-amber-900 block">
                      {getTranslation(language, 'servingTimes')}:
                    </span>
                    <span className="text-amber-800 font-semibold">{ann.servingTimes[language]}</span>
                  </div>

                  <div className="bg-orange-50 p-2.5 rounded-xl border border-orange-200">
                    <span className="font-bold text-orange-950 block">
                      {getTranslation(language, 'menuToday')}:
                    </span>
                    <span className="text-orange-900 font-medium">{ann.menuItems[language]}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-amber-800 font-medium">
                      दैनिक भोजन क्षमता: <strong className="text-amber-950">{ann.dailyMealsCapacity.toLocaleString()} वारकरी</strong>
                    </span>
                    <a
                      href={`tel:${ann.contactPhone}`}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow"
                    >
                      📞 संपर्क
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
