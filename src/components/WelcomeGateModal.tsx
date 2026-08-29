import React, { useState } from 'react';
import { Language, UserProfile, UserRole } from '../types';
import { getTranslation } from '../translations';
import { 
  Lock, 
  AlertTriangle, 
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface WelcomeGateModalProps {
  language: Language;
  onLoginSuccess: (profile: UserProfile) => void;
  onContinueAsGuest: () => void;
}

export const WelcomeGateModal: React.FC<WelcomeGateModalProps> = ({
  language,
  onLoginSuccess,
  onContinueAsGuest,
}) => {
  const [activeTab, setActiveTab] = useState<'pilgrim' | 'admin'>('pilgrim');

  // Pilgrim Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [role, setRole] = useState<UserRole>('warkari');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [dindiName, setDindiName] = useState('');

  // Admin Form State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  const handlePilgrimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city.trim()) {
      alert(language === 'mr' ? "कृपया नाव, फोन नंबर आणि शहर भरा" : language === 'hi' ? "कृपया नाम, फोन नंबर और शहर भरें" : "Please fill name, phone and city");
      return;
    }

    const newProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      gender: gender,
      role: role,
      bloodGroup: bloodGroup,
      emergencyContactName: emergencyContactName.trim() || (language === 'mr' ? 'कुटुंब सदस्य' : language === 'hi' ? 'परिवार सदस्य' : 'Family Member'),
      emergencyContactPhone: emergencyContactPhone.trim() || phone.trim(),
      dindiName: dindiName.trim() || (language === 'mr' ? 'श्री विठ्ठल वारकरी दिंडी' : language === 'hi' ? 'श्री विट्ठल वारकरी दिंडी' : 'Shri Vitthal Warkari Dindi'),
      district: city.trim(),
      isLoggedIn: true,
      isAdmin: false,
      avatarUrl: gender === 'female' 
        ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    };

    onLoginSuccess(newProfile);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    // Specific Admin Credentials: Soham@2006 / 25042006
    if (adminUsername.trim() === 'Soham@2006' && adminPassword === '25042006') {
      const adminProfile: UserProfile = {
        id: 'admin_soham_2006',
        name: language === 'mr' ? 'सोहम सर (मुख्य मंदिर प्रशासक)' : language === 'hi' ? 'सोहम सर (मुख्य मंदिर प्रशासक)' : 'Soham Sir (Chief Temple Admin)',
        phone: '9822000001',
        city: 'Pandharpur HQ',
        gender: 'male',
        role: 'admin',
        bloodGroup: 'O+',
        emergencyContactName: 'Temple Control Room',
        emergencyContactPhone: '02186-224466',
        district: 'Solapur',
        dindiName: 'Shri Vitthal Rukmini Mandir Samiti Pandharpur',
        isLoggedIn: true,
        isAdmin: true,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };

      onLoginSuccess(adminProfile);
    } else {
      setAdminError(getTranslation(language, 'adminLoginError'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden my-auto"
      >
        {/* Header Visual Banner */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 text-white p-6 text-center space-y-2 border-b-2 border-amber-500">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center mx-auto text-3xl shadow-lg font-black">
            🚩
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-amber-100 tracking-tight">
            {getTranslation(language, 'welcomeLoginFirstTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/95 max-w-lg mx-auto leading-relaxed">
            {getTranslation(language, 'welcomeLoginFirstDesc')}
          </p>

          {/* Mode Switch Pills */}
          <div className="inline-flex bg-amber-950/80 p-1 rounded-2xl border border-amber-500/50 mt-2">
            <button
              onClick={() => setActiveTab('pilgrim')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pilgrim'
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              👤 {language === 'mr' ? 'वारकरी / स्वयंसेवक नोंदणी' : language === 'hi' ? 'वारकरी / स्वयंसेवक पंजीकरण' : 'Warkari / Volunteer Registration'}
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-amber-950 shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>🔐 {language === 'mr' ? 'मंदिर प्रशासन लॉगिन' : language === 'hi' ? 'मंदिर प्रशासन लॉगिन' : 'Temple Admin Login'}</span>
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* TAB 1: Pilgrim Registration Form */}
          {activeTab === 'pilgrim' && (
            <form onSubmit={handlePilgrimSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block font-extrabold text-amber-950 mb-1">
                    {language === 'mr' ? 'वारकऱ्याचे पूर्ण नाव *' : language === 'hi' ? 'वारकरी का पूरा नाम *' : 'Warkari Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. सोपान ज्ञानेश्वर पाटील' : language === 'hi' ? 'उदा. सोपान ज्ञानेश्वर पाटिल' : 'e.g. Sopan Patil'}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block font-extrabold text-amber-950 mb-1">
                    {language === 'mr' ? 'मोबाईल नंबर *' : language === 'hi' ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98220XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* City */}
                <div>
                  <label className="block font-extrabold text-amber-950 mb-1">
                    {getTranslation(language, 'city')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. पुणे / पंढरपूर' : language === 'hi' ? 'उदा. पुणे / पंढरपुर' : 'e.g. Pune / Pandharpur'}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block font-extrabold text-amber-950 mb-1">
                    {getTranslation(language, 'gender')} *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                  >
                    <option value="male">{getTranslation(language, 'genderMale')}</option>
                    <option value="female">{getTranslation(language, 'genderFemale')}</option>
                    <option value="other">{getTranslation(language, 'genderOther')}</option>
                  </select>
                </div>

                {/* Role */}
                <div>
                  <label className="block font-extrabold text-amber-950 mb-1">
                    {getTranslation(language, 'userRole')}
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                  >
                    <option value="warkari">{getTranslation(language, 'roleWarkari')}</option>
                    <option value="volunteer">{getTranslation(language, 'roleVolunteer')}</option>
                    <option value="dindi_pramukh">{getTranslation(language, 'roleDindiLeader')}</option>
                    <option value="medical_staff">{getTranslation(language, 'roleMedical')}</option>
                    <option value="police_security">{getTranslation(language, 'roleSecurity')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Blood Group */}
                <div>
                  <label className="block font-extrabold text-amber-950 mb-1">
                    {getTranslation(language, 'bloodGroup')}
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
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

                {/* Dindi Name */}
                <div>
                  <label className="block font-extrabold text-amber-950 mb-1">
                    {getTranslation(language, 'dindiName')}
                  </label>
                  <input
                    type="text"
                    value={dindiName}
                    onChange={(e) => setDindiName(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. संत ज्ञानेश्वर माउली पालखी दिंडी क्र. २' : language === 'hi' ? 'उदा. संत ज्ञानेश्वर माउली पालखी दिंडी सं. २' : 'e.g. Sant Dnyaneshwar Palkhi Dindi No. 2'}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Emergency Contact Name */}
                <div>
                  <label className="block font-extrabold text-amber-950 mb-1">
                    {getTranslation(language, 'emergencyContactName')}
                  </label>
                  <input
                    type="text"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. भाऊ / वडील / पत्नी' : language === 'hi' ? 'उदा. भाई / पिता / पत्नी' : 'e.g. Brother / Father / Spouse'}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Emergency Contact Phone */}
                <div>
                  <label className="block font-extrabold text-amber-950 mb-1">
                    {getTranslation(language, 'emergencyContactPhone')}
                  </label>
                  <input
                    type="tel"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    placeholder="94220XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 text-sm sm:text-base cursor-pointer"
              >
                <UserCheck className="w-5 h-5 text-amber-300" />
                <span>{language === 'mr' ? 'नोंदणी पूर्ण करा व ॲप सुरू करा →' : language === 'hi' ? 'पंजीकरण पूरा करें और ऐप शुरू करें →' : 'Complete Registration & Open App →'}</span>
              </button>
            </form>
          )}

          {/* TAB 2: Admin Login Portal */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs sm:text-sm">
              {adminError && (
                <div className="p-3.5 bg-red-50 border-2 border-red-300 text-red-800 rounded-2xl font-bold flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
                🔒 {language === 'mr' ? 'अधिकृत मंदिर समिती प्रशासन क्रेडेंशियल्स प्रविष्ट करा.' : language === 'hi' ? 'अधिकृत मंदिर समिति प्रशासन क्रेडेंशियल्स दर्ज करें।' : 'Enter authorized Temple Administration credentials.'}
              </div>

              <div>
                <label className="block font-extrabold text-amber-950 mb-1.5">
                  {getTranslation(language, 'adminUsername')} *
                </label>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="Soham@2006"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none placeholder:text-stone-400"
                />
              </div>

              <div>
                <label className="block font-extrabold text-amber-950 mb-1.5">
                  {getTranslation(language, 'adminPassword')} *
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none placeholder:text-stone-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 text-sm sm:text-base cursor-pointer"
              >
                <Lock className="w-5 h-5 text-amber-300" />
                <span>{getTranslation(language, 'adminLoginBtn')}</span>
              </button>
            </form>
          )}

          {/* Guest Option Footer */}
          <div className="pt-2 border-t border-amber-200 text-center">
            <button
              onClick={onContinueAsGuest}
              className="text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
            >
              {getTranslation(language, 'continueAsGuest')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
