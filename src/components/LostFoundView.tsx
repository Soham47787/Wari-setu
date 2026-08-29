import React, { useState, useEffect } from 'react';
import { Language, LostItem, UserProfile } from '../types';
import { getTranslation } from '../translations';
import { Search, PlusCircle, Phone, Megaphone, CheckCircle, Upload, Image, X, AlertTriangle, UserCheck } from 'lucide-react';

interface LostFoundViewProps {
  language: Language;
  lostItems: LostItem[];
  onReportMissing: (item: LostItem) => void;
  user?: UserProfile | null;
}

export const LostFoundView: React.FC<LostFoundViewProps> = ({
  language,
  lostItems,
  onReportMissing,
  user,
}) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [broadcastId, setBroadcastId] = useState<string | null>(null);

  // Form State
  const [type, setType] = useState<'person' | 'belonging'>('person');
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState('पुरुष (Male)');
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [photoUrlInput, setPhotoUrlInput] = useState<string>('');
  const [location, setLocation] = useState('');
  const [missingTime, setMissingTime] = useState('आज सकाळी ९:०० वाजता');
  const [contactName, setContactName] = useState(user?.name || '');
  const [contactPhone, setContactPhone] = useState(user?.phone || '');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (user) {
      if (user.name) setContactName(user.name);
      if (user.phone) setContactPhone(user.phone);
    }
  }, [user]);

  // Handle Photo File Upload (Request #9)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPhoto = photoPreview || photoUrlInput || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80";

    if (!name || !location || !contactPhone || (!photoPreview && !photoUrlInput)) {
      alert("कृपया हरवलेल्या व्यक्ती/वस्तूचा फोटो, नाव, ठिकाण व फोन नंबर भरा (Please upload photo and fill required fields)");
      return;
    }

    const newItem: LostItem = {
      id: `lost_${Date.now()}`,
      type,
      name,
      age: age ? Number(age) : undefined,
      gender: type === 'person' ? gender : undefined,
      photoUrl: finalPhoto,
      lastSeenLocation: {
        mr: location,
        hi: location,
        en: location,
      },
      missingSince: {
        mr: missingTime,
        hi: missingTime,
        en: missingTime,
      },
      contactPerson: contactName || 'कुटुंब प्रतिनिधी',
      contactPhone,
      description: {
        mr: description || 'तपशील उपलब्ध नाही',
        hi: description || 'विवरण उपलब्ध नहीं',
        en: description || 'Details provided on call',
      },
      status: 'missing',
    };

    onReportMissing(newItem);
    setShowReportForm(false);
    // Reset Form
    setName('');
    setPhotoPreview('');
    setPhotoUrlInput('');
    setDescription('');
    setLocation('');
    alert("हरवल्याची नोंदणी यशस्वी झाली! वारी स्वयंसेवक मदत कक्षाला माहिती पाठवली आहे.");
  };

  const handleBroadcast = (item: LostItem) => {
    setBroadcastId(item.id);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `लक्ष द्या, लक्ष द्या! पंढरपूर वारी गर्दीमध्ये ${item.name} हरवले आहेत. शेवटचे पाहिलेले ठिकाण ${item.lastSeenLocation[language]}. सापडल्यास संपर्क करा ${item.contactPhone}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'mr' ? 'mr-IN' : 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setBroadcastId(null), 8000);
  };

  const filteredItems = lostItems.filter((it) => {
    const query = searchQuery.toLowerCase();
    return (
      it.name.toLowerCase().includes(query) ||
      it.lastSeenLocation[language].toLowerCase().includes(query) ||
      it.description[language].toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white p-5 rounded-3xl shadow-lg border border-amber-700 space-y-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif flex items-center space-x-2">
              <span>🔍</span>
              <span>{getTranslation(language, 'lostHeader')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-200 mt-1 max-w-2xl">
              {getTranslation(language, 'lostSubheader')}
            </p>
          </div>

          <button
            onClick={() => setShowReportForm(!showReportForm)}
            className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{getTranslation(language, 'reportMissingBtn')}</span>
          </button>
        </div>
      </div>

      {/* Report Missing Person/Item Form with Photo Upload (Request #9) */}
      {showReportForm && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-400 animate-fade-in space-y-4">
          <div className="flex justify-between items-center border-b border-amber-200 pb-3">
            <h3 className="font-extrabold text-base sm:text-lg text-amber-950 font-serif flex items-center space-x-2">
              <span>📸</span>
              <span>{getTranslation(language, 'reportMissingBtn')}</span>
            </h3>
            <button
              onClick={() => setShowReportForm(false)}
              className="text-amber-800 hover:text-amber-950 font-bold text-base p-1"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Category Selector */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType('person')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all text-xs ${
                  type === 'person'
                    ? 'bg-amber-600 text-white shadow'
                    : 'bg-amber-100/60 text-amber-900 border border-amber-200'
                }`}
              >
                👤 हरवलेली व्यक्ती / मूल (Person / Child)
              </button>
              <button
                type="button"
                onClick={() => setType('belonging')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all text-xs ${
                  type === 'belonging'
                    ? 'bg-amber-600 text-white shadow'
                    : 'bg-amber-100/60 text-amber-900 border border-amber-200'
                }`}
              >
                🎒 हरवलेली वस्तू / बॅग (Lost Belonging)
              </button>
            </div>

            {/* MANDATORY PHOTO UPLOAD SECTION (Request #9) */}
            <div className="p-4 bg-amber-50/80 rounded-2xl border-2 border-dashed border-amber-400 space-y-3">
              <label className="block font-bold text-amber-950 text-xs sm:text-sm flex items-center space-x-1.5">
                <Upload className="w-4 h-4 text-amber-700" />
                <span>{getTranslation(language, 'uploadPhotoLabel')}</span>
              </label>

              {photoPreview ? (
                <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md mx-auto">
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhotoPreview('')}
                    className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-full shadow hover:bg-red-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-amber-100/40 rounded-xl transition-all">
                  <label className="cursor-pointer flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center text-amber-800">
                      <Image className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-xs text-amber-900">
                      {getTranslation(language, 'dragDropPhoto')}
                    </span>
                    <span className="text-[11px] text-amber-700">
                      {getTranslation(language, 'uploadPhotoHelp')}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Direct Photo URL fallback */}
              <div>
                <label className="block text-[11px] font-semibold text-amber-800 mb-1">
                  {getTranslation(language, 'orPhotoUrl')}
                </label>
                <input
                  type="url"
                  value={photoUrlInput}
                  onChange={(e) => setPhotoUrlInput(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3 py-1.5 rounded-xl border border-amber-300 bg-white text-xs"
                />
              </div>
            </div>

            {/* Name, Age, Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-bold text-amber-950 mb-1">
                  {getTranslation(language, 'missingPersonName')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. ज्ञानदेव मारुती जगताप"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold text-amber-950"
                />
              </div>

              {type === 'person' && (
                <div>
                  <label className="block font-bold text-amber-950 mb-1">
                    {getTranslation(language, 'ageYears')}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="उदा. ६५"
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40 font-bold"
                  />
                </div>
              )}
            </div>

            {/* Location & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-amber-950 mb-1">
                  {getTranslation(language, 'lastSeenLocation')}
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="उदा. महाद्वार घाट / चंद्रभागा वाळवंट"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-950 mb-1">
                  {getTranslation(language, 'missingSince')}
                </label>
                <input
                  type="text"
                  value={missingTime}
                  onChange={(e) => setMissingTime(e.target.value)}
                  placeholder="उदा. आज सकाळी ९:०० वाजता"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40"
                />
              </div>
            </div>

            {/* Description & Clothes */}
            <div>
              <label className="block font-bold text-amber-950 mb-1">
                {getTranslation(language, 'clothingDescription')}
              </label>
              <textarea
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="पांढरा सदरा, धोतर, गळ्यात तुळशीमाळ, कपाळावर गोपीचंदन टिळा..."
                className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40"
              />
            </div>

            {/* Contact Person & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-amber-950 mb-1">
                  {getTranslation(language, 'contactPersonName')}
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="उदा. केशव जगताप (मुलगा)"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-950 mb-1">
                  {getTranslation(language, 'phoneNo')} *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="९८२२०XXXXX"
                  className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40 font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all"
            >
              {getTranslation(language, 'submitMissingReportBtn')}
            </button>
          </form>
        </div>
      )}

      {/* Search Input Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-amber-600 absolute left-3 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={getTranslation(language, 'searchByName')}
          className="w-full pl-9 pr-4 py-3 rounded-2xl border-2 border-amber-200 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-sm"
        />
      </div>

      {/* Missing Items/Persons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo View */}
              <div className="relative h-48 w-full bg-amber-100">
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow animate-pulse">
                  {item.status === 'missing' ? '🚨 हरवले आहेत (Missing)' : '✓ सापडले (Found)'}
                </span>

                <span className="absolute bottom-3 left-3 right-3 bg-black/75 text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl backdrop-blur-sm truncate">
                  📍 {item.lastSeenLocation[language]}
                </span>
              </div>

              {/* Details */}
              <div className="p-4 space-y-2.5">
                <h4 className="font-bold text-base text-amber-950 font-serif">
                  {item.name}
                </h4>

                <p className="text-xs text-amber-800 font-semibold">
                  ⏰ {getTranslation(language, 'missingSince')}: <span className="text-amber-950">{item.missingSince[language]}</span>
                </p>

                <p className="text-xs text-amber-900/90 leading-relaxed bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                  {item.description[language]}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0 space-y-2">
              <a
                href={`tel:${item.contactPhone}`}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>📞 {item.contactPerson} ({item.contactPhone})</span>
              </a>

              <button
                onClick={() => handleBroadcast(item)}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-1 ${
                  broadcastId === item.id
                    ? 'bg-amber-600 text-white animate-pulse border-amber-600'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                }`}
              >
                <Megaphone className="w-3.5 h-3.5 text-amber-700" />
                <span>{broadcastId === item.id ? '🔊 घोषणा सुरू आहे...' : getTranslation(language, 'broadcastAudio')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
