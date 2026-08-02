import React, { useState } from 'react';
import { Language, LostItem } from '../types';
import { getTranslation } from '../translations';
import { Search, UserX, Phone, Radio, PlusCircle, AlertCircle, Volume2, Camera } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'person' | 'belonging'>('all');
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [lastSeen, setLastSeen] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactPhone) {
      alert("कृपया नाव व फोन नंबर प्रविष्ट करा (Please fill required fields)");
      return;
    }

    const newItem: LostItem = {
      id: `lost_${Date.now()}`,
      type: 'person',
      name,
      age: age ? Number(age) : undefined,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      lastSeenLocation: { mr: lastSeen, hi: lastSeen, en: lastSeen },
      missingSince: 'ताजी नोंदणी (Just Now)',
      contactPerson,
      contactPhone,
      description: { mr: desc, hi: desc, en: desc },
      status: 'missing'
    };

    onAddLostItem(newItem);
    setShowModal(false);
    // Reset form
    setName('');
    setAge('');
    setLastSeen('');
    setContactPhone('');
    setDesc('');
    alert("हरवलेल्या व्यक्तीची नोंदणी यशस्वी झाली आहे! (Missing report registered)");
  };

  const handleAudioBroadcast = (item: LostItem) => {
    if ('speechSynthesis' in window) {
      const msg = `लक्ष द्या! वारकरी सेवा हरवलेले व्यक्ति सूचना. नाव: ${item.name}. वय: ${item.age || ''} वर्ष. शेवटचे ठिकाण: ${item.lastSeenLocation[language]}. सापडल्यास संपर्क साधा: ${item.contactPhone}`;
      const utterance = new SpeechSynthesisUtterance(msg);
      utterance.lang = 'mr-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Broadcast announcement triggered for ${item.name}`);
    }
  };

  const filtered = lostItems.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.lastSeenLocation[language].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-amber-900 text-white p-5 rounded-2xl shadow-md border border-amber-700 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif flex items-center space-x-2">
              <span>🔍</span>
              <span>{getTranslation(language, 'lostHeader')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-200 mt-1">
              गर्दीत हरवलेल्या प्रिय व्यक्ती किंवा सापडलेल्या वस्तूंची माहिती तातडीने मिळवा.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-1.5 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{getTranslation(language, 'reportMissingBtn')}</span>
          </button>
        </div>

        {/* Search Bar & Filter Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-amber-600" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={getTranslation(language, 'searchByName')}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm text-amber-950 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
            />
          </div>

          <div className="flex space-x-1 bg-amber-950/60 p-1 rounded-xl border border-amber-700/60 shrink-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterType === 'all' ? 'bg-amber-400 text-amber-950' : 'text-amber-100 hover:bg-amber-800'
              }`}
            >
              सर्व (All)
            </button>
            <button
              onClick={() => setFilterType('person')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterType === 'person' ? 'bg-amber-400 text-amber-950' : 'text-amber-100 hover:bg-amber-800'
              }`}
            >
              👤 व्यक्ती (Persons)
            </button>
            <button
              onClick={() => setFilterType('belonging')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterType === 'belonging' ? 'bg-amber-400 text-amber-950' : 'text-amber-100 hover:bg-amber-800'
              }`}
            >
              🎒 वस्तू (Items)
            </button>
          </div>
        </div>
      </div>

      {/* Missing Persons / Items Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md border border-amber-200 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Image Container with Badge */}
              <div className="relative h-48 bg-amber-100 overflow-hidden">
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow">
                  🚨 {item.status === 'missing' ? 'हरवले आहे (MISSING)' : 'सापडले (FOUND)'}
                </span>
                {item.age && (
                  <span className="absolute bottom-2 right-2 bg-amber-950/80 text-amber-200 text-xs font-bold px-2 py-0.5 rounded-md">
                    वय: {item.age} वर्षे
                  </span>
                )}
              </div>

              {/* Content Details */}
              <div className="p-4 space-y-2">
                <h3 className="font-extrabold text-base text-amber-950 font-serif">
                  {item.name}
                </h3>

                <div className="space-y-1 text-xs text-amber-900">
                  <p>
                    <strong className="text-amber-800">शेवटचे ठिकाण:</strong> {item.lastSeenLocation[language]}
                  </p>
                  <p>
                    <strong className="text-amber-800">हरवल्याची वेळ:</strong> {item.missingSince}
                  </p>
                  <p className="text-amber-800/90 text-[11px] bg-amber-50 p-2 rounded-lg border border-amber-200">
                    {item.description[language]}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-amber-100 bg-amber-50/50 flex gap-2">
              <a
                href={`tel:${item.contactPhone}`}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl text-center shadow transition-all flex items-center justify-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>संपर्क करा</span>
              </a>

              <button
                onClick={() => handleAudioBroadcast(item)}
                title="Broadcast Audio Alert on Speaker"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3 py-2 rounded-xl shadow transition-all flex items-center justify-center space-x-1"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden sm:inline">ध्वनी घोषणा</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* REPORT MISSING MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-amber-400 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-amber-200 pb-3">
              <h3 className="text-lg font-bold text-amber-950 font-serif">
                हरवलेल्या व्यक्तीची नोंदणी करा
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-amber-800 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  हरवलेल्या व्यक्तीचे पूर्ण नाव *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. बबनराव मारुती शिंदे"
                  className="w-full px-3 py-2 border border-amber-300 rounded-xl bg-amber-50/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-amber-900 mb-1">वय (Age)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="उदा. ६५"
                    className="w-full px-3 py-2 border border-amber-300 rounded-xl bg-amber-50/40"
                  />
                </div>
                <div>
                  <label className="block font-bold text-amber-900 mb-1">मोबाईल नंबर *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="९८२२०XXXXX"
                    className="w-full px-3 py-2 border border-amber-300 rounded-xl bg-amber-50/40"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  शेवटचे पाहिलेले ठिकाण *
                </label>
                <input
                  type="text"
                  required
                  value={lastSeen}
                  onChange={(e) => setLastSeen(e.target.value)}
                  placeholder="उदा. महाद्वार घाट दर्शन रांगेजवळ"
                  className="w-full px-3 py-2 border border-amber-300 rounded-xl bg-amber-50/40"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  कपडे व ओळखीचे वर्णन (Description)
                </label>
                <textarea
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="उदा. पांढरा कुर्ता धोतर, डोक्यावर वारकरी टोपी"
                  className="w-full px-3 py-2 border border-amber-300 rounded-xl bg-amber-50/40"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  फोटो युआरएल (Photo URL Preview)
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-xl bg-amber-50/40 text-xs"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-amber-100 text-amber-900 font-bold py-2.5 rounded-xl"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl shadow"
                >
                  नोंदणी सबमिट करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
