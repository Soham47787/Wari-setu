import React, { useState } from 'react';
import { Language, UserProfile, UserRole } from '../types';
import { getTranslation } from '../translations';
import { User, Phone, Droplet, Shield, HeartHandshake, LogOut, CheckCircle, Sparkles, MapPin, Users, Building, Stethoscope, ShieldAlert } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  user,
  onLogin,
  onLogout,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | string>(user?.gender || 'male');
  const [role, setRole] = useState<UserRole>(user?.role || 'warkari');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || 'O+');
  const [emergencyName, setEmergencyName] = useState(user?.emergencyContactName || '');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyContactPhone || '');
  const [city, setCity] = useState(user?.city || '');
  const [district, setDistrict] = useState(user?.district || '');
  const [dindiName, setDindiName] = useState(user?.dindiName || '');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const rolesList: { id: UserRole; labelKey: keyof typeof import('../translations').translations['en']; icon: any; color: string }[] = [
    { id: 'warkari', labelKey: 'role_warkari', icon: Users, color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'volunteer', labelKey: 'role_volunteer', icon: HeartHandshake, color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { id: 'dindi_pramukh', labelKey: 'role_dindi_pramukh', icon: Sparkles, color: 'bg-orange-100 text-orange-900 border-orange-300' },
    { id: 'trustee', labelKey: 'role_trustee', icon: Building, color: 'bg-blue-100 text-blue-900 border-blue-300' },
    { id: 'medical_staff', labelKey: 'role_medical_staff', icon: Stethoscope, color: 'bg-red-100 text-red-900 border-red-300' },
    { id: 'police_security', labelKey: 'role_police_security', icon: ShieldAlert, color: 'bg-purple-100 text-purple-900 border-purple-300' },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || (!name && authMode === 'signup')) {
      alert("कृपया आवश्यक माहिती भरा (Please fill required details)");
      return;
    }

    const newUser: UserProfile = {
      id: user?.id || `user_${Date.now()}`,
      name: name || (authMode === 'signin' ? 'वारकरी भाविक (Warkari Pilgrim)' : 'वारकरी'),
      phone,
      gender,
      role,
      bloodGroup: bloodGroup || 'O+',
      emergencyContactName: emergencyName || 'कुटुंब संपर्क',
      emergencyContactPhone: emergencyPhone || phone,
      city: city || 'महाराष्ट्र (Maharashtra)',
      district: district || 'सोलापूर',
      dindiName,
      isLoggedIn: true,
      avatarUrl: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80`
    };

    onLogin(newUser);
    setSuccessMsg(authMode === 'signup' ? getTranslation(language, 'registerSuccess') : getTranslation(language, 'loginSuccess'));
    
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-400 max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white p-5 flex justify-between items-center border-b border-amber-700">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center shadow">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-serif">
                {user?.isLoggedIn ? getTranslation(language, 'myProfile') : getTranslation(language, 'loginBtn')}
              </h3>
              <p className="text-xs text-amber-200">
                {user?.isLoggedIn ? `ID: ${user.id.slice(-6)} • Verified Pilgrim` : "पंढरपूर वारी अधिकृत भाविक नोंदणी"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-amber-800/80 hover:bg-amber-700 text-white flex items-center justify-center text-sm font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs sm:text-sm font-bold flex items-center space-x-2 animate-bounce">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {user?.isLoggedIn ? (
            /* Logged-In User Profile Card */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <div className="flex items-center space-x-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-700 text-white font-bold text-xl flex items-center justify-center shadow-md">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-amber-950 font-serif">{user.name}</h4>
                    <p className="text-xs text-amber-800 font-semibold flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{user.phone}</span>
                    </p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-200 text-amber-950">
                      {getTranslation(language, `role_${user.role}` as any)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-amber-200/80 text-xs">
                  <div className="p-2 rounded-xl bg-white border border-amber-100">
                    <span className="text-amber-700 font-semibold block">{getTranslation(language, 'bloodGroup')}</span>
                    <span className="font-extrabold text-red-600 text-sm flex items-center space-x-1">
                      <Droplet className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      <span>{user.bloodGroup}</span>
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-amber-100">
                    <span className="text-amber-700 font-semibold block">{getTranslation(language, 'cityVillage')}</span>
                    <span className="font-bold text-amber-950 truncate block">
                      📍 {user.city}
                    </span>
                  </div>
                  <div className="col-span-2 p-2.5 rounded-xl bg-white border border-amber-100">
                    <span className="text-amber-700 font-semibold block">{getTranslation(language, 'emergencyContactName')}</span>
                    <span className="font-bold text-amber-950">
                      📞 {user.emergencyContactName} ({user.emergencyContactPhone})
                    </span>
                  </div>
                  {user.dindiName && (
                    <div className="col-span-2 p-2.5 rounded-xl bg-amber-100/60 border border-amber-200 text-amber-950 font-bold">
                      🚩 {user.dindiName}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onLogout}
                  className="flex-1 py-2.5 px-4 bg-red-50 hover:bg-red-100 border border-red-300 text-red-700 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{getTranslation(language, 'logoutBtn')}</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow"
                >
                  पूर्ण (Done)
                </button>
              </div>
            </div>
          ) : (
            /* Login / Sign Up Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tab Switcher */}
              <div className="flex rounded-xl bg-amber-100/80 p-1 border border-amber-200">
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                    authMode === 'signup'
                      ? 'bg-white text-amber-950 shadow-sm'
                      : 'text-amber-800 hover:text-amber-950'
                  }`}
                >
                  {getTranslation(language, 'signUpBtn')}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                    authMode === 'signin'
                      ? 'bg-white text-amber-950 shadow-sm'
                      : 'text-amber-800 hover:text-amber-950'
                  }`}
                >
                  {getTranslation(language, 'enterOtpOrPass')}
                </button>
              </div>

              {/* Role Selection (Multi-Option) */}
              <div>
                <label className="block text-xs font-bold text-amber-950 mb-1.5">
                  {getTranslation(language, 'roleLabel')} *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {rolesList.map((r) => {
                    const Icon = r.icon;
                    const isSelected = role === r.id;
                    return (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => setRole(r.id)}
                        className={`p-2 rounded-xl text-left border transition-all flex items-center space-x-2 ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-600 shadow-md font-bold'
                            : 'bg-white text-amber-950 border-amber-200 hover:bg-amber-50 text-xs font-semibold'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-amber-700'}`} />
                        <span className="text-[11px] leading-tight truncate">
                          {getTranslation(language, r.labelKey)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Basic Fields */}
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-amber-950 mb-1">
                    {getTranslation(language, 'fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. ज्ञानेश्वर पाटील / Ramesh Deshmukh"
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-amber-950 mb-1">
                  {getTranslation(language, 'phoneNo')} *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-amber-700 font-bold">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98220XXXXX"
                    className="w-full pl-11 pr-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none tracking-wider"
                  />
                </div>
              </div>

              {authMode === 'signup' && (
                <>
                  {/* Blood Group & City */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-amber-950 mb-1 flex items-center space-x-1">
                        <Droplet className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                        <span>{getTranslation(language, 'bloodGroup')} *</span>
                      </label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-bold text-amber-950 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        {bloodGroups.map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-950 mb-1">
                        {getTranslation(language, 'cityVillage')}
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="पुणे / सोलापूर / आळंदी"
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="p-3 rounded-2xl bg-red-50/60 border border-red-200 space-y-2">
                    <span className="text-[11px] font-extrabold text-red-900 flex items-center space-x-1">
                      <Shield className="w-3.5 h-3.5 text-red-600" />
                      <span>आणीबाणी संपर्क माहिती (Emergency Contact) *</span>
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                        placeholder="नातेवाईकाचे नाव"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-red-200 bg-white text-xs font-medium"
                      />
                      <input
                        type="tel"
                        maxLength={10}
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="मोबाईल नंबर"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-red-200 bg-white text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Dindi Name (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-amber-950 mb-1">
                      {getTranslation(language, 'dindiNameOptional')}
                    </label>
                    <input
                      type="text"
                      value={dindiName}
                      onChange={(e) => setDindiName(e.target.value)}
                      placeholder="उदा. ज्ञानेश्वर माऊली पालखी दिंडी क्र. १५"
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>{authMode === 'signup' ? getTranslation(language, 'signUpBtn') : getTranslation(language, 'loginBtn')}</span>
                <span>🙏</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
