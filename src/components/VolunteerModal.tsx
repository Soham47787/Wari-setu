import React, { useState } from 'react';
import { Language, VolunteerMember, UserProfile } from '../types';
import { getTranslation } from '../translations';
import { 
  HandHeart, 
  CheckCircle, 
  Phone, 
  MapPin, 
  Search, 
  Users, 
  Award, 
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface VolunteerModalProps {
  language: Language;
  volunteers: VolunteerMember[];
  onRegisterVolunteer: (newVolunteer: VolunteerMember) => void;
  onToggleDutyStatus: (volunteerId: string) => void;
  currentUser: UserProfile | null;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ 
  language,
  volunteers,
  onRegisterVolunteer,
  onToggleDutyStatus,
  currentUser
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'register'>('directory');

  // Registration Form Fields
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [bloodGroup, setBloodGroup] = useState(currentUser?.bloodGroup || 'O+');
  const [sevaType, setSevaType] = useState('जल सेवा (Water Distribution)');
  const [assignedSpot, setAssignedSpot] = useState('महाद्वार घाट व मंदिर परिसर');
  const [submittedVolunteer, setSubmittedVolunteer] = useState<VolunteerMember | null>(null);

  // Directory Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSevaFilter, setSelectedSevaFilter] = useState('all');

  const onDutyCount = volunteers.filter(v => v.status === 'on_duty').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert(language === 'mr' ? 'कृपया नाव व फोन नंबर भरा' : language === 'hi' ? 'कृपया नाम और फोन नंबर भरें' : 'Please enter name and phone number');
      return;
    }

    const badgeId = `SEVA-PND-${Math.floor(100 + Math.random() * 900)}`;
    const newVol: VolunteerMember = {
      id: `vol_${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim() || 'पंढरपूर',
      sevaType: sevaType,
      assignedLocation: {
        mr: assignedSpot,
        hi: assignedSpot,
        en: assignedSpot
      },
      status: 'on_duty',
      registeredAt: `२९ ऑगस्ट २०२६, ${new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' })}`,
      badgeNumber: badgeId,
      bloodGroup: bloodGroup,
      avatarUrl: currentUser?.gender === 'female'
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    };

    onRegisterVolunteer(newVol);
    setSubmittedVolunteer(newVol);
    setActiveTab('directory');
  };

  const filteredVolunteers = volunteers.filter(vol => {
    const matchesSearch = 
      vol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.sevaType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.assignedLocation[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeva = selectedSevaFilter === 'all' || vol.sevaType.includes(selectedSevaFilter);

    return matchesSearch && matchesSeva;
  });

  const sevaFilters = [
    { id: 'all', label: { mr: 'सर्व सेवक', hi: 'सभी सेवक', en: 'All Sevaks' } },
    { id: 'जल सेवा', label: { mr: '💧 जल सेवा', hi: '💧 जल सेवा', en: '💧 Water Booth' } },
    { id: 'गर्दी', label: { mr: '👥 गर्दी रांग', hi: '👥 कतार प्रबंधन', en: '👥 Crowd Queue' } },
    { id: 'वैद्यकीय', label: { mr: '🏥 वैद्यकीय', hi: '🏥 चिकित्सा', en: '🏥 Medical' } },
    { id: 'अन्नछत्र', label: { mr: '🍲 अन्नछत्र', hi: '🍲 भोजन सेवा', en: '🍲 Food Seva' } },
    { id: 'हरवलेले', label: { mr: '🔍 शोध मदत', hi: '🔍 खोया-पाया', en: '🔍 Lost Help' } },
    { id: 'ज्येष्ठ', label: { mr: '♿ ज्येष्ठ सेवा', hi: '♿ वरिष्ठ सेवा', en: '♿ Senior Care' } }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 text-white p-6 rounded-3xl shadow-xl border-2 border-amber-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-300 text-amber-950 font-black text-xs px-3 py-1 rounded-full uppercase">
              🤝 {language === 'mr' ? 'वारी स्वयंसेवक नेटवर्क' : language === 'hi' ? 'वारी स्वयंसेवक नेटवर्क' : 'Wari Sevak Network'}
            </span>
            <span className="text-xs bg-emerald-500/80 text-white font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{onDutyCount} {language === 'mr' ? 'सेवक सेवेत हजर' : language === 'hi' ? 'सेवक ड्यूटी पर उपस्थित' : 'Sevaks On Duty'}</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
            {getTranslation(language, 'activeVolunteersList')}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/90 max-w-xl">
            {getTranslation(language, 'activeVolunteersSub')}
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-amber-950/80 p-1.5 rounded-2xl border border-amber-500/50">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-amber-400 text-amber-950 shadow-lg'
                : 'text-amber-200 hover:text-white'
            }`}
          >
            📋 {language === 'mr' ? 'उपलब्ध सेवक सूची' : language === 'hi' ? 'उपलब्ध सेवक सूची' : 'Sevak Directory'} ({volunteers.length})
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center space-x-1 ${
              activeTab === 'register'
                ? 'bg-amber-400 text-amber-950 shadow-lg'
                : 'text-amber-200 hover:text-white'
            }`}
          >
            <HandHeart className="w-4 h-4" />
            <span>+ {language === 'mr' ? 'स्वयंसेवक बना' : language === 'hi' ? 'स्वयंसेवक बनें' : 'Join as Volunteer'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification after registration */}
      {submittedVolunteer && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-600 text-white p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <CheckCircle className="w-10 h-10 text-emerald-200 shrink-0" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {language === 'mr' ? `अभिनंदन ${submittedVolunteer.name}! तुमची स्वयंसेवक नोंदणी पूर्ण झाली.` : language === 'hi' ? `बधाई ${submittedVolunteer.name}! आपका स्वयंसेवक पंजीकरण पूरा हुआ।` : `Congratulations ${submittedVolunteer.name}! Volunteer registration complete.`}
              </h3>
              <p className="text-xs text-emerald-100">
                {language === 'mr' ? `तुमचा डिजिटल बॅज क्र: ${submittedVolunteer.badgeNumber}. तुम्ही आता ऑन-ड्युटी सेवक म्हणून सूचीमध्ये दिसत आहात.` : language === 'hi' ? `आपका डिजिटल बैज सं: ${submittedVolunteer.badgeNumber}. आप अब ऑन-ड्यूटी सेवक के रूप में सूचीबद्ध हैं।` : `Your Digital Badge No: ${submittedVolunteer.badgeNumber}. You are now listed as an active on-duty Sevak.`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSubmittedVolunteer(null)}
            className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            {language === 'mr' ? 'समजले ✓' : language === 'hi' ? 'समझ गया ✓' : 'Dismiss ✓'}
          </button>
        </motion.div>
      )}

      {/* TAB 1: Live Volunteers Directory */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-amber-300 flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={getTranslation(language, 'searchVolunteerPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-300 text-xs sm:text-sm text-amber-950 bg-amber-50/50 focus:bg-white focus:outline-none"
              />
              <Search className="w-4 h-4 text-amber-700 absolute left-3.5 top-3" />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 text-xs w-full md:w-auto">
              {sevaFilters.map((flt) => (
                <button
                  key={flt.id}
                  onClick={() => setSelectedSevaFilter(flt.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    selectedSevaFilter === flt.id
                      ? 'bg-amber-800 text-white shadow'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {flt.label[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Volunteers Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVolunteers.map((vol) => {
              const isOnDuty = vol.status === 'on_duty';

              return (
                <div
                  key={vol.id}
                  className={`bg-white rounded-3xl p-5 border-2 transition-all shadow-md flex flex-col justify-between space-y-4 ${
                    isOnDuty ? 'border-amber-300 hover:border-amber-500' : 'border-stone-200 opacity-75'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Avatar, Name, Status Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={vol.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={vol.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-400 shadow-sm"
                        />
                        <div>
                          <h3 className="font-extrabold text-amber-950 text-sm sm:text-base leading-tight">
                            {vol.name}
                          </h3>
                          <span className="text-[11px] text-amber-800 font-semibold flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-amber-600 inline" />
                            <span>{vol.city}</span>
                            {vol.bloodGroup && (
                              <span className="ml-1 bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-black text-[10px]">
                                {vol.bloodGroup}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center space-x-1 shrink-0 ${
                          isOnDuty
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-stone-100 text-stone-600 border border-stone-300'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isOnDuty ? 'bg-emerald-600 animate-pulse' : 'bg-stone-400'}`} />
                        <span>{isOnDuty ? getTranslation(language, 'onDutyBadge') : getTranslation(language, 'offDutyBadge')}</span>
                      </span>
                    </div>

                    {/* Assigned Duty & Seva Tag */}
                    <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/80 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-amber-900">
                        <span className="font-bold text-amber-950">{language === 'mr' ? 'सेवा प्रकार:' : language === 'hi' ? 'सेवा प्रकार:' : 'Seva Type:'}</span>
                        <span className="bg-amber-200/80 text-amber-950 font-bold px-2 py-0.5 rounded-lg text-[11px]">
                          {vol.sevaType}
                        </span>
                      </div>

                      <div className="pt-1 text-[11px] text-amber-900 flex items-start space-x-1">
                        <span className="font-bold text-amber-950 shrink-0">📍 {language === 'mr' ? 'ड्युटी पोस्ट:' : language === 'hi' ? 'ड्यूटी पोस्ट:' : 'Duty Post:'}</span>
                        <span className="font-medium">{vol.assignedLocation[language]}</span>
                      </div>

                      <div className="text-[10px] text-amber-700/80 font-mono font-bold pt-0.5 flex justify-between">
                        <span>{language === 'mr' ? 'बॅज:' : language === 'hi' ? 'बैज:' : 'Badge:'} {vol.badgeNumber}</span>
                        <span>{vol.registeredAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Call & Toggle */}
                  <div className="flex items-center gap-2 pt-1 border-t border-amber-100">
                    <a
                      href={`tel:${vol.phone}`}
                      className="flex-1 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{getTranslation(language, 'callSevakBtn')}</span>
                    </a>

                    <button
                      onClick={() => onToggleDutyStatus(vol.id)}
                      title={getTranslation(language, 'toggleDutyStatus')}
                      className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl transition-all text-xs font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      {isOnDuty ? (
                        <ToggleRight className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-stone-500" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredVolunteers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-amber-300 p-8 space-y-2">
              <Users className="w-12 h-12 text-amber-400 mx-auto" />
              <h4 className="font-bold text-amber-950 text-base">{language === 'mr' ? 'कोणतेही सेवक सापडले नाहीत' : language === 'hi' ? 'कोई सेवक नहीं मिला' : 'No Sevaks Found'}</h4>
              <p className="text-xs text-amber-800">{language === 'mr' ? 'कृपया वेगळा शोध शब्द किंवा फिल्टर वापरून पहा.' : language === 'hi' ? 'कृपया अन्य खोज शब्द या फ़िल्टर का उपयोग करें।' : 'Please try a different search keyword or filter.'}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Volunteer Registration Form */}
      {activeTab === 'register' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-300 space-y-6">
          <div className="border-b border-amber-200 pb-3 space-y-1">
            <h3 className="text-xl font-bold text-amber-950 font-serif flex items-center space-x-2">
              <HandHeart className="w-6 h-6 text-amber-700" />
              <span>{getTranslation(language, 'volunteerFormTitle')}</span>
            </h3>
            <p className="text-xs text-amber-800">
              {language === 'mr' ? 'नोंदणीनंतर तुमचा सेवक बॅज जनरेट होईल आणि तुम्ही थेट ऑन-ड्युटी सेवक सूचीमध्ये समाविष्ट व्हाल.' : language === 'hi' ? 'पंजीकरण के बाद आपका डिजिटल बैज उत्पन्न होगा और आप सीधे ड्यूटी सूची में जुड़ेंगे।' : 'After registration, your digital Sevak badge will be generated and you will be listed in the active directory.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-extrabold text-amber-950 mb-1.5">
                {language === 'mr' ? 'स्वयंसेवकाचे पूर्ण नाव *' : language === 'hi' ? 'स्वयंसेवक का पूरा नाम *' : 'Volunteer Full Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'mr' ? 'उदा. ज्ञानेश्वर विठ्ठल कदम' : language === 'hi' ? 'उदा. ज्ञानेश्वर विट्ठल कदम' : 'e.g. Dnyaneshwar Kadam'}
                className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-extrabold text-amber-950 mb-1.5">
                  {language === 'mr' ? 'मोबाईल नंबर (कॉलिंगसाठी) *' : language === 'hi' ? 'मोबाइल नंबर (कॉल हेतु) *' : 'Mobile Number (For calls) *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98220XXXXX"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-extrabold text-amber-950 mb-1.5">
                  {language === 'mr' ? 'तुमचे शहर / मूळ गाव *' : language === 'hi' ? 'आपका शहर / गाँव *' : 'Your City / Town *'}
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. पुणे / सोलापूर / सातारा' : language === 'hi' ? 'उदा. पुणे / सोलापुर / सतारा' : 'e.g. Pune / Solapur / Satara'}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-extrabold text-amber-950 mb-1.5">
                  {getTranslation(language, 'bloodGroup')}
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                >
                  <option value="A+">A+ Positive</option>
                  <option value="A-">A- Negative</option>
                  <option value="B+">B+ Positive</option>
                  <option value="B-">B- Negative</option>
                  <option value="O+">O+ Positive</option>
                  <option value="O-">O- Negative</option>
                  <option value="AB+">AB+ Positive</option>
                  <option value="AB-">AB- Negative</option>
                </select>
              </div>

              <div>
                <label className="block font-extrabold text-amber-950 mb-1.5">
                  {language === 'mr' ? 'इच्छित सेवा प्रकार (Seva Category) *' : language === 'hi' ? 'इच्छित सेवा प्रकार (Seva Category) *' : 'Preferred Seva Category *'}
                </label>
                <select
                  value={sevaType}
                  onChange={(e) => setSevaType(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                >
                  <option value="जल सेवा (Water Distribution)">💧 {language === 'mr' ? 'जल सेवा' : language === 'hi' ? 'जल सेवा' : 'Water Distribution'}</option>
                  <option value="गर्दी व्यवस्थापन (Crowd Queue Guide)">👥 {language === 'mr' ? 'दर्शन रांग व गर्दी नियंत्रण' : language === 'hi' ? 'दर्शन कतार व भीड़ नियंत्रण' : 'Darshan Queue & Crowd Guide'}</option>
                  <option value="वैद्यकीय मदत (Medical First-Aid)">🏥 {language === 'mr' ? 'प्राथमिक वैद्यकीय मदत' : language === 'hi' ? 'प्राथमिक चिकित्सा सहायता' : 'Medical First-Aid'}</option>
                  <option value="अन्नछत्र सेवा (Food & Prasadam)">🍲 {language === 'mr' ? 'अन्नछत्र व महाप्रसाद वाटप' : language === 'hi' ? 'अन्नछत्र व महाप्रसाद वितरण' : 'Food & Meal Distribution'}</option>
                  <option value="हरवलेले शोधा (Lost Child & Elder Help)">🔍 {language === 'mr' ? 'हरवलेल्या व्यक्ती शोध केंद्र' : language === 'hi' ? 'खोया-पाया सहायता' : 'Lost & Found Center'}</option>
                  <option value="ज्येष्ठ वारकरी सेवा (Elder Assistance)">♿ {language === 'mr' ? 'ज्येष्ठ वारकरी व व्हीलचेअर सेवा' : language === 'hi' ? 'वरिष्ठ श्रद्धालु व व्हीलचेयर सेवा' : 'Elder & Wheelchair Assistance'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-extrabold text-amber-950 mb-1.5">
                {language === 'mr' ? 'कामाचे स्थान / ड्युटी पोस्ट (Assigned Post)' : language === 'hi' ? 'कार्य स्थल / ड्यूटी पोस्ट (Assigned Post)' : 'Assigned Duty Post Location'}
              </label>
              <input
                type="text"
                value={assignedSpot}
                onChange={(e) => setAssignedSpot(e.target.value)}
                placeholder={language === 'mr' ? 'उदा. महाद्वार घाट, चंद्रभागा वाळवंट, बस स्टँड' : language === 'hi' ? 'उदा. महाद्वार घाट, चंद्रभागा किनारा, बस स्टैंड' : 'e.g. Mahadwar Ghat, Chandrabhaga sands, Bus stand'}
                className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-extrabold py-3.5 rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 text-sm sm:text-base cursor-pointer"
            >
              <Award className="w-5 h-5 text-amber-300" />
              <span>{getTranslation(language, 'submitSevaBtn')}</span>
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
};
