import React, { useState } from 'react';
import { Language, LostItem } from '../types';
import { getTranslation } from '../translations';
import { Search, UserCheck, PlusCircle, Phone, MapPin, Calendar, AlertCircle, ShieldCheck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LostFoundViewProps {
  language: Language;
  lostItems: LostItem[];
  onAddLostItem: (item: LostItem) => void;
}

export const LostFoundView: React.FC<LostFoundViewProps> = ({
  language,
  lostItems,
  onAddLostItem,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'person' | 'belonging'>('all');

  // New Item Form State
  const [personName, setPersonName] = useState('');
  const [age, setAge] = useState('');
  const [itemType, setItemType] = useState<'person' | 'belonging'>('person');
  const [lastLocation, setLastLocation] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim() || !contactPhone.trim() || !lastLocation.trim()) {
      alert("कृपया आवश्यक माहिती भरा / Please enter mandatory details");
      return;
    }

    const newItem: LostItem = {
      id: `lost_${Date.now()}`,
      name: personName,
      age: age ? Number(age) : undefined,
      type: itemType,
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      lastSeenLocation: {
        mr: lastLocation,
        hi: lastLocation,
        en: lastLocation
      },
      contactPerson: personName,
      contactPhone,
      description: {
        mr: description || lastLocation,
        hi: description || lastLocation,
        en: description || lastLocation
      },
      status: 'missing',
      missingSince: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    };

    onAddLostItem(newItem);
    setShowModal(false);
    setPersonName('');
    setAge('');
    setLastLocation('');
    setContactPhone('');
    setDescription('');

    alert("हरवल्याची नोंदणी यशस्वीपणे झाली आहे. वारकरी सेवा कक्ष मदत करेल.");
  };

  const filteredItems = lostItems.filter((item) => {
    const locationStr = typeof item.lastSeenLocation === 'string'
      ? item.lastSeenLocation
      : (item.lastSeenLocation[language] || item.lastSeenLocation.mr);
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         locationStr.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesQuery && matchesType;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner - Slate Charcoal & Golden Orange */}
      <div className="bg-gradient-to-r from-[#1E1B18] via-[#2A241F] to-[#141210] rounded-3xl p-6 text-white shadow-xl border border-amber-500/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-orange-500/20 text-orange-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-orange-500/30 uppercase tracking-widest">
            शोध कक्ष (LOST & FOUND HELPDESK)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-amber-100 mt-1">
            {getTranslation(language, 'cardLostTitle')}
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            वारीतील हरवलेले नातेवाईक, लहान मुले किंवा मौल्यवान वस्तू शोधण्यासाठी साहाय्य.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs py-3 px-5 rounded-2xl shadow-md transition-all flex items-center space-x-2 shrink-0 border border-amber-500/30"
        >
          <PlusCircle className="w-4 h-4 text-amber-200" />
          <span>{language === 'mr' ? 'हरवल्याची नोंद करा' : 'Report Missing'}</span>
        </motion.button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="नाव किंवा ठिकाणाने शोधा..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-amber-900 text-amber-100' : 'bg-stone-100 text-stone-600'
            }`}
          >
            सर्व
          </button>
          <button
            onClick={() => setFilterType('person')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'person' ? 'bg-amber-900 text-amber-100' : 'bg-stone-100 text-stone-600'
            }`}
          >
            👤 व्यक्ती / नातेवाईक
          </button>
          <button
            onClick={() => setFilterType('belonging')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'belonging' ? 'bg-amber-900 text-amber-100' : 'bg-stone-100 text-stone-600'
            }`}
          >
            🎒 वस्तू / सामान
          </button>
        </div>
      </div>

      {/* Lost Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const locationStr = typeof item.lastSeenLocation === 'string'
            ? item.lastSeenLocation
            : (item.lastSeenLocation[language] || item.lastSeenLocation.mr);
          const descStr = typeof item.description === 'string'
            ? item.description
            : (item.description[language] || item.description.mr);

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-stone-200/90 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                    item.type === 'person' ? 'bg-orange-100 text-orange-900 border border-orange-200' : 'bg-stone-100 text-stone-800 border border-stone-200'
                  }`}>
                    {item.type === 'person' ? '👤 व्यक्ती हरवली' : '🎒 वस्तू हरवली'}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    item.status === 'missing' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.status === 'missing' ? 'हरवलेले (Missing)' : 'सापडले (Found)'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-900 font-serif">
                    {item.name} {item.age ? `(${item.age} वर्षे)` : ''}
                  </h3>
                  <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
                    {descStr}
                  </p>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 space-y-1.5 text-xs text-stone-700">
                  <div className="flex items-center space-x-1 font-semibold text-stone-800">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>शेवटचे ठिकाण: <strong>{locationStr}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1 text-stone-500 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>पासून हरवले: {item.missingSince}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
                <span className="text-stone-500 font-semibold">संपर्क करा:</span>
                <a
                  href={`tel:${item.contactPhone}`}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{item.contactPhone}</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Report Lost Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-5"
            >
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  {language === 'mr' ? 'हरवल्याची नोंद करा' : 'Report Missing Person/Item'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">प्रकार निवडा</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setItemType('person')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border ${
                        itemType === 'person' ? 'bg-amber-900 text-amber-100 border-amber-900' : 'bg-stone-50 text-stone-700'
                      }`}
                    >
                      👤 व्यक्ती / नातेवाईक
                    </button>
                    <button
                      type="button"
                      onClick={() => setItemType('belonging')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border ${
                        itemType === 'belonging' ? 'bg-amber-900 text-amber-100 border-amber-900' : 'bg-stone-50 text-stone-700'
                      }`}
                    >
                      🎒 वस्तू / बॅग
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">नाव / वस्तूचे नाव *</label>
                    <input
                      type="text"
                      required
                      value={personName}
                      onChange={(e) => setPersonName(e.target.value)}
                      placeholder="उदा. मारुती सुतार"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">वय (Age)</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="उदा. ६५"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">शेवटचे ठिकाण *</label>
                    <input
                      type="text"
                      required
                      value={lastLocation}
                      onChange={(e) => setLastLocation(e.target.value)}
                      placeholder="उदा. चंद्रभागा घाट, पंढरपूर"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">मोबाईल नंबर *</label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="९८२२०XXXXX"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">अधिक वर्णन / कपडे / खूण</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="उदा. पांढरा कुर्ता आणि धोतर, डोक्यावर तुळशी माळ..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black text-xs py-3 rounded-xl transition-all shadow-md"
                >
                  नोंदणी करा (Submit Report)
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
