import React, { useState, useEffect } from 'react';
import { Language, UserProfile, UserRole, TabType } from '../types';
import { getTranslation } from '../translations';
import {
  User,
  Phone,
  MapPin,
  Heart,
  Droplet,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  LogOut,
  Edit3,
  Ticket,
  BedDouble,
  AlertOctagon,
  Search,
  Check,
  Users,
  Building,
  Stethoscope,
  ShieldAlert,
  HeartHandshake,
  QrCode,
  ArrowRight
} from 'lucide-react';

interface ProfileLoginViewProps {
  language: Language;
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onNavigateTab: (tab: TabType) => void;
}

export const ProfileLoginView: React.FC<ProfileLoginViewProps> = ({
  language,
  user,
  onLogin,
  onLogout,
  onNavigateTab,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');

  // Form Fields (Required: name, phone, city, gender)
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | string>(user?.gender || 'male');
  
  // Optional / Helper Fields
  const [role, setRole] = useState<UserRole>(user?.role || 'warkari');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || 'O+');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyContactPhone || '');
  const [dindiName, setDindiName] = useState(user?.dindiName || '');
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setCity(user.city);
      setGender(user.gender || 'male');
      setRole(user.role || 'warkari');
      setBloodGroup(user.bloodGroup || 'O+');
      setEmergencyPhone(user.emergencyContactPhone || '');
      setDindiName(user.dindiName || '');
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !city.trim() || !gender) {
      alert("कृपया नाव, मोबाईल नंबर, गाव/शहर आणि लिंग ही आवश्यक माहिती भरा! (Please fill all required fields: Name, Phone, City, and Gender)");
      return;
    }

    const updatedProfile: UserProfile = {
      id: user?.id || `wariseva_usr_${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      gender,
      role,
      bloodGroup: bloodGroup || 'O+',
      emergencyContactName: 'कुटुंब / साथीदार (Family / Companion)',
      emergencyContactPhone: emergencyPhone.trim() || phone.trim(),
      dindiName: dindiName.trim(),
      isLoggedIn: true,
      avatarUrl: user?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    };

    onLogin(updatedProfile);
    setIsEditing(false);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3500);
  };

  const rolesList: { id: UserRole; labelKey: keyof typeof import('../translations').translations['en']; icon: any; color: string }[] = [
    { id: 'warkari', labelKey: 'role_warkari', icon: Users, color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'volunteer', labelKey: 'role_volunteer', icon: HeartHandshake, color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { id: 'dindi_pramukh', labelKey: 'role_dindi_pramukh', icon: Sparkles, color: 'bg-orange-100 text-orange-900 border-orange-300' },
    { id: 'trustee', labelKey: 'role_trustee', icon: Building, color: 'bg-blue-100 text-blue-900 border-blue-300' },
    { id: 'medical_staff', labelKey: 'role_medical_staff', icon: Stethoscope, color: 'bg-red-100 text-red-900 border-red-300' },
    { id: 'police_security', labelKey: 'role_police_security', icon: ShieldAlert, color: 'bg-purple-100 text-purple-900 border-purple-300' },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const getGenderText = (g: string) => {
    if (g === 'male') return getTranslation(language, 'genderMale');
    if (g === 'female') return getTranslation(language, 'genderFemale');
    return getTranslation(language, 'genderOther');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white p-5 sm:p-6 rounded-3xl shadow-xl border-2 border-amber-500/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg border border-amber-300/40 shrink-0">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif">
              {getTranslation(language, 'profileHeader')}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200 mt-0.5">
              {getTranslation(language, 'profileSubheader')}
            </p>
          </div>
        </div>

        {user?.isLoggedIn && (
          <div className="bg-emerald-900/80 border border-emerald-400/60 px-3.5 py-1.5 rounded-2xl text-emerald-100 text-xs font-extrabold flex items-center space-x-1.5 shrink-0 shadow">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>सत्यापित भाविक (Verified)</span>
          </div>
        )}
      </div>

      {/* Success Notification Banner */}
      {savedBanner && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 flex items-center space-x-3 shadow-md animate-fade-in">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold text-sm">
              {user?.isLoggedIn ? getTranslation(language, 'loginSuccess') : getTranslation(language, 'registerSuccess')}
            </p>
            <p className="text-xs text-emerald-800">
              नाव: <strong>{user?.name}</strong> • फोन: <strong>{user?.phone}</strong> • गाव/शहर: <strong>{user?.city}</strong> • माहिती सर्व सेवांशी थेट जोडली गेली आहे!
            </p>
          </div>
        </div>
      )}

      {/* View Logic: Logged In & Not Editing => Show Digital Card & Connected Modules */}
      {user?.isLoggedIn && !isEditing ? (
        <div className="space-y-6">
          {/* Official Digital Warkari ID Card */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-400 relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-amber-200">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-amber-300 overflow-hidden shrink-0">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-amber-200 text-amber-950 border border-amber-300">
                      Wari Digital Pass
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-red-100 text-red-800 border border-red-200">
                      रक्तगट: {user.bloodGroup || 'O+'}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-serif mt-1">
                    {user.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-800 font-semibold flex items-center space-x-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>गाव/शहर: <strong>{user.city}</strong></span>
                    <span>•</span>
                    <span>लिंग: <strong>{getGenderText(user.gender)}</strong></span>
                  </p>
                </div>
              </div>

              {/* Digital QR Badge */}
              <div className="bg-white p-3 rounded-2xl border-2 border-amber-300 shadow-sm flex flex-col items-center justify-center shrink-0 self-center md:self-auto">
                <div className="w-20 h-20 bg-amber-950 rounded-xl flex flex-col items-center justify-center text-amber-100 p-2 text-center">
                  <QrCode className="w-10 h-10 text-amber-300" />
                  <span className="text-[9px] font-mono font-bold mt-0.5">ID: {user.id.slice(-6).toUpperCase()}</span>
                </div>
                <span className="text-[10px] font-bold text-amber-900 mt-1">अधिकृत वारी पास</span>
              </div>
            </div>

            {/* User Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-amber-200 text-xs sm:text-sm">
              <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-200">
                <span className="text-amber-800 font-bold block text-[11px]">{getTranslation(language, 'phoneNo')}</span>
                <span className="font-extrabold text-amber-950 font-mono text-sm">{user.phone}</span>
              </div>
              <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-200">
                <span className="text-amber-800 font-bold block text-[11px]">{getTranslation(language, 'cityVillage')}</span>
                <span className="font-extrabold text-amber-950">{user.city}</span>
              </div>
              <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-200">
                <span className="text-amber-800 font-bold block text-[11px]">{getTranslation(language, 'genderLabel')}</span>
                <span className="font-extrabold text-amber-950">{getGenderText(user.gender)}</span>
              </div>
              <div className="bg-amber-100/60 p-3 rounded-xl border border-amber-200">
                <span className="text-amber-800 font-bold block text-[11px]">{getTranslation(language, 'roleLabel')}</span>
                <span className="font-extrabold text-amber-950 truncate block">
                  {rolesList.find(r => r.id === user.role)?.labelKey ? getTranslation(language, rolesList.find(r => r.id === user.role)!.labelKey) : 'वारकरी भाविक'}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons on Card */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition-all shadow flex items-center space-x-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>{getTranslation(language, 'editProfile')}</span>
              </button>

              <button
                onClick={onLogout}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 font-bold text-xs sm:text-sm transition-all border border-stone-300 flex items-center space-x-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>{getTranslation(language, 'logoutBtn')}</span>
              </button>
            </div>
          </div>

          {/* Auto-Fetch Synchronized Services Box */}
          <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-emerald-300 space-y-4">
            <div className="flex items-center space-x-2.5 text-emerald-900 border-b border-emerald-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3 className="font-bold text-base sm:text-lg font-serif">
                ✨ लॉगिन माहिती खालील सर्व सेवांमध्ये थेट भरली गेली आहे (Auto-Synced Services):
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => onNavigateTab('crowd')}
                className="p-4 rounded-2xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 transition-all cursor-pointer group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shrink-0 shadow">
                  <Ticket className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-amber-950 group-hover:text-amber-800">
                      १. ई-दर्शन पास (Darshan e-Pass)
                    </h4>
                    <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-amber-800 mt-0.5">
                    नाव <strong>({user.name})</strong> व फोन <strong>({user.phone})</strong> फॉर्ममध्ये आधीच भरलेले आहेत.
                  </p>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('stays')}
                className="p-4 rounded-2xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 transition-all cursor-pointer group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shrink-0 shadow">
                  <BedDouble className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-amber-950 group-hover:text-amber-800">
                      २. भक्त निवास व खोल्या आरक्षण
                    </h4>
                    <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-amber-800 mt-0.5">
                    नाव, शहर <strong>({user.city})</strong> व फोन त्वरित बुकिंग व्हाउचरसाठी तयार.
                  </p>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('lost')}
                className="p-4 rounded-2xl bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200 transition-all cursor-pointer group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center shrink-0 shadow">
                  <Search className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-amber-950 group-hover:text-amber-800">
                      ३. हरवले-सापडले शोध नोंद
                    </h4>
                    <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-amber-800 mt-0.5">
                    संपर्क व्यक्ती म्हणून तुमचे नाव व फोन थेट जोडले जाईल.
                  </p>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('sos')}
                className="p-4 rounded-2xl bg-red-50/80 hover:bg-red-100/80 border border-red-200 transition-all cursor-pointer group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-red-950 group-hover:text-red-800">
                      ४. आणीबाणी मदत (SOS)
                    </h4>
                    <ArrowRight className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-red-800 mt-0.5">
                    १-टॅप आपत्कालीन अलर्ट मध्ये तुमची माहिती व रक्तगट <strong>({user.bloodGroup})</strong> त्वरित पाठवले जाईल.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Form for Login, Registration or Editing Profile */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-300 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-amber-200 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-amber-950">
                {isEditing
                  ? getTranslation(language, 'editProfile')
                  : authMode === 'signup'
                  ? getTranslation(language, 'signUpBtn')
                  : getTranslation(language, 'loginBtn')}
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                कृपया खालील आवश्यक माहिती अचूकपणे भरा.
              </p>
            </div>

            {!isEditing && (
              <div className="flex p-1 bg-amber-100 rounded-2xl border border-amber-300">
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    authMode === 'signup'
                      ? 'bg-amber-900 text-white shadow'
                      : 'text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {getTranslation(language, 'signUpBtn')}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    authMode === 'signin'
                      ? 'bg-amber-900 text-white shadow'
                      : 'text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {getTranslation(language, 'loginBtn')}
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Required Fields Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-black text-amber-900 uppercase tracking-wider bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>आवश्यक वैयक्तिक माहिती (Required Individual Information):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Name (Required) */}
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-1">
                    {getTranslation(language, 'fullName')} <span className="text-red-600 font-black">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-amber-600 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="उदा. तुकाराम विठ्ठल माने"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm font-semibold bg-amber-50/40"
                    />
                  </div>
                </div>

                {/* 2. Phone Number (Required) */}
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-1">
                    {getTranslation(language, 'phoneNo')} <span className="text-red-600 font-black">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-amber-600 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="१० अंकी मोबाईल नंबर (उदा. 9822012345)"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm font-semibold font-mono bg-amber-50/40"
                    />
                  </div>
                </div>

                {/* 3. City / Village (Required) */}
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-1">
                    {getTranslation(language, 'cityVillage')} <span className="text-red-600 font-black">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="उदा. आळंदी, पुणे / नाशिक / सोलापूर"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm font-semibold bg-amber-50/40"
                    />
                  </div>
                </div>

                {/* 4. Gender (Required) */}
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-1">
                    {getTranslation(language, 'genderLabel')} <span className="text-red-600 font-black">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'male', label: getTranslation(language, 'genderMale') },
                      { id: 'female', label: getTranslation(language, 'genderFemale') },
                      { id: 'other', label: getTranslation(language, 'genderOther') },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGender(item.id)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                          gender === item.id
                            ? 'bg-amber-800 text-white border-amber-900 shadow'
                            : 'bg-amber-50/60 text-amber-900 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Pilgrim Details Section */}
            <div className="space-y-4 pt-2 border-t border-amber-200">
              <div className="flex items-center space-x-2 text-xs font-black text-amber-900 uppercase tracking-wider">
                <Heart className="w-4 h-4 text-amber-700" />
                <span>अतिरिक्त वारकरी माहिती (Optional Wari Details):</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Role */}
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-1">
                    {getTranslation(language, 'roleLabel')}
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-bold bg-white"
                  >
                    {rolesList.map((r) => (
                      <option key={r.id} value={r.id}>
                        {getTranslation(language, r.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-1">
                    {getTranslation(language, 'bloodGroup')}
                  </label>
                  <div className="relative">
                    <Droplet className="w-4 h-4 text-red-600 absolute left-3 top-3.5" />
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-bold bg-white"
                    >
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Emergency Companion Phone */}
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-1">
                    {getTranslation(language, 'emergencyContactPhone')}
                  </label>
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="कुटुंबीय / दिंडी प्रमुख फोन"
                    className="w-full px-3 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-semibold font-mono bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center space-x-3 pt-3">
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-extrabold text-sm sm:text-base shadow-lg transition-all border border-amber-500 flex items-center justify-center space-x-2"
              >
                <Check className="w-5 h-5" />
                <span>{isEditing ? getTranslation(language, 'saveProfile') : authMode === 'signup' ? getTranslation(language, 'signUpBtn') : getTranslation(language, 'loginBtn')}</span>
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm border border-stone-300"
                >
                  रद्द करा (Cancel)
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
