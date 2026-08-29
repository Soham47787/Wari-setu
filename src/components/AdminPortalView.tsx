import React, { useState } from 'react';
import { Language, CrowdStatus, AccommodationItem, AnnachhatraItem, UserProfile, TempleOpenStatus } from '../types';
import { getTranslation } from '../translations';
import { 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  Plus, 
  Trash2, 
  Clock, 
  Users, 
  Megaphone, 
  Sparkles,
  DoorOpen
} from 'lucide-react';
import { motion } from 'motion/react';

interface AdminPortalViewProps {
  language: Language;
  crowdStatus: CrowdStatus;
  onUpdateCrowdStatus: (newStatus: CrowdStatus, notice?: string) => void;
  accommodations: AccommodationItem[];
  onUpdateAccommodations: (newAccommodations: AccommodationItem[]) => void;
  annachhatras: AnnachhatraItem[];
  onUpdateAnnachhatras: (newAnnachhatras: AnnachhatraItem[]) => void;
  currentUser: UserProfile | null;
  onAdminLogin: (user: UserProfile) => void;
  broadcastNotice: string;
  onUpdateBroadcastNotice: (notice: string) => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  language,
  crowdStatus,
  onUpdateCrowdStatus,
  currentUser,
  onAdminLogin,
  broadcastNotice,
  onUpdateBroadcastNotice,
}) => {
  // Admin Login Credentials
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Editable Form States for Temple Live Data
  const [templeStatus, setTempleStatus] = useState<TempleOpenStatus>(crowdStatus.templeStatus || 'Open');
  const [darshanDate, setDarshanDate] = useState(crowdStatus.darshanDate || '२९ ऑगस्ट २०२६ (आषाढी एकादशी सोहळा)');
  const [templeHours, setTempleHours] = useState(crowdStatus.templeHours || 'सकाळी ०४:०० ते रात्री ११:३०');
  
  const [statusTextMr, setStatusTextMr] = useState(crowdStatus.templeStatusText?.mr || 'श्री विठ्ठल रुक्मिणी मुख्य मंदिर सुरू आहे (दर्शन खुले)');
  const [statusTextHi, setStatusTextHi] = useState(crowdStatus.templeStatusText?.hi || 'श्री विट्ठल रुक्मिणी मुख्य मंदिर खुला है (दर्शन चालू)');
  const [statusTextEn, setStatusTextEn] = useState(crowdStatus.templeStatusText?.en || 'Shri Vitthal Rukmini Main Temple is OPEN for Darshan');

  const [mukhMins, setMukhMins] = useState(crowdStatus.mukhDarshanWaitMins);
  const [charanHours, setCharanHours] = useState(crowdStatus.charanSparshWaitHours);
  const [crowdLevel, setCrowdLevel] = useState(crowdStatus.crowdLevel);
  const [queueMeters, setQueueMeters] = useState(crowdStatus.queueLengthMeters);

  const [nextAartiMr, setNextAartiMr] = useState(crowdStatus.nextAartiName?.mr || 'धूपारती (सायंकाळी)');
  const [nextAartiHi, setNextAartiHi] = useState(crowdStatus.nextAartiName?.hi || 'धूपारती (संध्याकालीन)');
  const [nextAartiEn, setNextAartiEn] = useState(crowdStatus.nextAartiName?.en || 'Dhoop Aarti (Evening)');
  const [nextAartiTime, setNextAartiTime] = useState(crowdStatus.nextAartiTime || '०७:०० PM');

  const [vipStatus, setVipStatus] = useState<'Open' | 'Restricted' | 'Closed'>(crowdStatus.vipQueueStatus || 'Open');
  const [seniorStatus, setSeniorStatus] = useState<'Open' | 'Priority Line Active' | 'Closed'>(crowdStatus.seniorCitizenQueueStatus || 'Priority Line Active');

  const [palkhiLocationMr, setPalkhiLocationMr] = useState(crowdStatus.palkhiStageLocation?.mr || 'वाखरी मुक्काम (पंढरपूरजवळ ५ किमी)');
  
  const [noticeMr, setNoticeMr] = useState(crowdStatus.noticeMessage.mr);
  const [noticeHi, setNoticeHi] = useState(crowdStatus.noticeMessage.hi);
  const [noticeEn, setNoticeEn] = useState(crowdStatus.noticeMessage.en);

  const [activeGatesList, setActiveGatesList] = useState(crowdStatus.activeGates || []);
  const [newGateMr, setNewGateMr] = useState('');
  const [newGateHi, setNewGateHi] = useState('');
  const [newGateEn, setNewGateEn] = useState('');

  const [broadcastText, setBroadcastText] = useState(broadcastNotice || crowdStatus.emergencyBroadcastNotice || '');
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isAdminAuthenticated = currentUser?.isAdmin === true;

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    setIsAuthenticating(true);

    try {
      // 1. Try server-side authentication
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          onAdminLogin(data.user);
          setLoginSuccess(getTranslation(language, 'adminLoginSuccess'));
          setIsAuthenticating(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Backend auth fetch error, evaluating locally:", err);
    }

    // 2. Direct local fallback for credentials: Soham@2006 / 25042006
    if (username.trim() === 'Soham@2006' && password === '25042006') {
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

      onAdminLogin(adminProfile);
      setLoginSuccess(getTranslation(language, 'adminLoginSuccess'));
    } else {
      setLoginError(getTranslation(language, 'adminLoginError'));
    }
    setIsAuthenticating(false);
  };

  const handleAddGate = () => {
    if (!newGateMr.trim()) return;
    const newGate = {
      mr: newGateMr.trim(),
      hi: newGateHi.trim() || newGateMr.trim(),
      en: newGateEn.trim() || newGateMr.trim(),
      status: 'open' as const
    };
    setActiveGatesList([...activeGatesList, newGate]);
    setNewGateMr('');
    setNewGateHi('');
    setNewGateEn('');
  };

  const handleRemoveGate = (index: number) => {
    setActiveGatesList(activeGatesList.filter((_, i) => i !== index));
  };

  const handleToggleGateStatus = (index: number) => {
    setActiveGatesList(activeGatesList.map((g, i) => {
      if (i !== index) return g;
      const current = g.status || 'open';
      const nextStatus = current === 'open' ? 'restricted' : current === 'restricted' ? 'closed' : 'open';
      return { ...g, status: nextStatus };
    }));
  };

  // Quick Temple Presets
  const applyPreset = (type: 'normal' | 'aarti' | 'rush' | 'night_closed') => {
    if (type === 'normal') {
      setTempleStatus('Open');
      setStatusTextMr('श्री विठ्ठल रुक्मिणी मुख्य मंदिर सुरू आहे (दर्शन खुले)');
      setStatusTextHi('श्री विट्ठल रुक्मिणी मुख्य मंदिर खुला है (दर्शन चालू)');
      setStatusTextEn('Shri Vitthal Rukmini Main Temple is OPEN for Darshan');
      setMukhMins(35);
      setCharanHours(4);
      setCrowdLevel('Medium');
      setQueueMeters(1400);
      setVipStatus('Open');
      setSeniorStatus('Priority Line Active');
      setBroadcastText('🚩 श्री विठ्ठल रुक्मिणी मंदिर: आज सर्व दर्शन रांगा सुरळीत सुरू आहेत. वारकऱ्यांनी स्वयंसेवकांच्या सूचनांचे पालन करावे.');
    } else if (type === 'aarti') {
      setTempleStatus('Aarti');
      setStatusTextMr('मंदिर गर्भगृहात आरती व महापूजा चालू आहे (दर्शन रांग तात्पुरती थांबवली आहे)');
      setStatusTextHi('मंदिर गर्भगृह में आरती व महापूजा चल रही है (कतार कुछ समय के लिए रोकी गई है)');
      setStatusTextEn('Aarti & Mahapooja in progress inside sanctum (Queue temporarily paused)');
      setMukhMins(65);
      setCharanHours(5.5);
      setCrowdLevel('High');
      setQueueMeters(2000);
      setVipStatus('Restricted');
      setBroadcastText('🔔 मंदिरात मुख्य महापूजा व धूपारती चालू आहे. पुढील १५ मिनिटांत दर्शन पूर्ववत सुरू होईल.');
    } else if (type === 'rush') {
      setTempleStatus('SpecialDarshan');
      setStatusTextMr('पंढरपुरात विक्रमी गर्दी - जलद मुख दर्शन रांग सुरू');
      setStatusTextHi('पंढरपुर में भारी भीड़ - द्रुत मुख दर्शन कतार चालू');
      setStatusTextEn('High Pilgrim Rush in Pandharpur - Express Mukh Darshan Active');
      setMukhMins(80);
      setCharanHours(7.5);
      setCrowdLevel('Critical');
      setQueueMeters(3200);
      setVipStatus('Restricted');
      setSeniorStatus('Priority Line Active');
      setBroadcastText('⚠️ भाविकांची संख्या जास्त असल्याने चंद्रभागा वाळवंटाजवळील होल्डिंग शेड क्र. १ ते ५ पूर्ण क्षमतेने सुरू आहेत.');
    } else if (type === 'night_closed') {
      setTempleStatus('Closed');
      setStatusTextMr('रात्रीची शेजारती संपन्न - मंदिर दर्शन उद्या पहाटे ४:०० वाजेपर्यंत बंद');
      setStatusTextHi('रात्रि की शेजारती संपन्न - मंदिर दर्शन कल प्रातः 4:00 बजे तक बंद');
      setStatusTextEn('Shej Aarti concluded - Temple closed for night until 4:00 AM');
      setMukhMins(0);
      setCharanHours(0);
      setCrowdLevel('Low');
      setQueueMeters(0);
      setVipStatus('Closed');
      setSeniorStatus('Closed');
      setBroadcastText('🌙 आजचे दर्शन पूर्ण झाले असून उद्या पहाटे ४:०० वाजता काकड आरतीने मंदिर पुन्हा खुले होईल.');
    }
  };

  const handlePublishUpdates = async () => {
    setIsSaving(true);

    const updatedStatus: CrowdStatus = {
      lastUpdated: {
        mr: `आत्ताच थेट अपडेट केलेले (${new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' })})`,
        hi: `अभी लाइव अपडेट किया गया (${new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })})`,
        en: `Just Updated (${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })})`
      },
      templeStatus,
      templeStatusText: {
        mr: statusTextMr,
        hi: statusTextHi,
        en: statusTextEn
      },
      darshanDate,
      templeHours,
      crowdLevel,
      mukhDarshanWaitMins: Number(mukhMins),
      charanSparshWaitHours: Number(charanHours),
      queueLengthMeters: Number(queueMeters),
      nextAartiName: {
        mr: nextAartiMr,
        hi: nextAartiHi,
        en: nextAartiEn
      },
      nextAartiTime,
      vipQueueStatus: vipStatus,
      seniorCitizenQueueStatus: seniorStatus,
      palkhiStageLocation: {
        mr: palkhiLocationMr,
        hi: palkhiLocationMr,
        en: palkhiLocationMr
      },
      activeGates: activeGatesList,
      noticeMessage: {
        mr: noticeMr,
        hi: noticeHi,
        en: noticeEn
      },
      emergencyBroadcastNotice: broadcastText
    };

    // 1. Sync to server endpoint so all users see it
    try {
      await fetch('/api/temple-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStatus)
      });
    } catch (e) {
      console.warn("Could not sync to backend API, state saved locally:", e);
    }

    // 2. Update React app state & local storage
    onUpdateCrowdStatus(updatedStatus, broadcastText);
    onUpdateBroadcastNotice(broadcastText);

    try {
      localStorage.setItem('wariseva_temple_crowd_status', JSON.stringify(updatedStatus));
      localStorage.setItem('wariseva_broadcast_notice', broadcastText);
    } catch (e) {
      // Ignore
    }

    setIsSaving(false);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 4000);
  };

  // If not logged in as Admin, show Admin Login Portal (WITHOUT DISPLAYING ANY CREDENTIALS)
  if (!isAdminAuthenticated) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-xl mx-auto space-y-6 pb-12"
      >
        <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-amber-500 text-center space-y-3">
          <div className="w-16 h-16 bg-amber-500 text-amber-950 rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-lg font-black">
            🔐
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
            {getTranslation(language, 'adminLoginTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-amber-300/90 max-w-md mx-auto leading-relaxed">
            {getTranslation(language, 'adminLoginDesc')}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-300 space-y-5">
          {loginError && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 border-2 border-red-300 text-red-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center space-x-3"
            >
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{loginError}</span>
            </motion.div>
          )}

          {loginSuccess && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center space-x-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{loginSuccess}</span>
            </motion.div>
          )}

          <form onSubmit={handleAdminAuth} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-extrabold text-amber-950 mb-1.5">
                {getTranslation(language, 'adminUsername')} *
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Soham@2006"
                className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            <div>
              <label className="block font-extrabold text-amber-950 mb-1.5">
                {getTranslation(language, 'adminPassword')} *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 font-bold text-amber-950 focus:border-amber-600 focus:bg-white focus:outline-none transition-all placeholder:text-stone-400"
              />
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-extrabold py-3.5 rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 text-sm sm:text-base cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-5 h-5 text-amber-200" />
              <span>{isAuthenticating ? '...' : getTranslation(language, 'adminLoginBtn')}</span>
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-amber-900 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200 font-medium">
            🔒 {language === 'mr' ? 'केवळ अधिकृत मंदिर समिती प्रशासक लॉगिन करून दर्शन वेळ, मंदिर स्थिती (Open/Closed), तारीख व सूचना बदलू शकतात.' : language === 'hi' ? 'केवल अधिकृत मंदिर समिति प्रशासक लॉगिन करके दर्शन समय, मंदिर स्थिति (Open/Closed), तारीख व सूचनाएँ बदल सकते हैं।' : 'Only authorized Temple Administration staff can update darshan timings, open/close status, and broadcast notices.'}
          </div>
        </div>
      </motion.div>
    );
  }

  // Admin Logged-In Control Panel
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 pb-12"
    >
      {/* Top Admin Control Header Bar */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-5 sm:p-6 rounded-3xl shadow-xl border-2 border-amber-500 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full uppercase">
              👑 {language === 'mr' ? 'मुख्य मंदिर प्रशासक (Chief Admin)' : language === 'hi' ? 'मुख्य मंदिर प्रशासक (Chief Admin)' : 'Chief Temple Admin'}
            </span>
            <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>{language === 'mr' ? 'थेट सिंक सक्रिय (Live Synced)' : language === 'hi' ? 'लाइव सिंक सक्रिय (Live Synced)' : 'Live Synchronized'}</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
            {getTranslation(language, 'adminControlHeader')}
          </h2>
          <p className="text-xs text-amber-300/90 max-w-2xl">
            {getTranslation(language, 'adminControlSubheader')}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button
            onClick={handlePublishUpdates}
            disabled={isSaving}
            className="w-full lg:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? '...' : getTranslation(language, 'saveTempleDataBtn')}</span>
          </button>
        </div>
      </div>

      {showSavedFeedback && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-emerald-600 text-white font-black rounded-2xl shadow-2xl text-center text-sm flex items-center justify-center space-x-2 border-2 border-emerald-300"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{language === 'mr' ? 'सर्व भाविकांसाठी मंदिर स्थिती, दर्शन वेळ व घोषणा यशस्वीरित्या अपडेट करण्यात आल्या आहेत! ✅' : language === 'hi' ? 'सभी श्रद्धालुओं के लिए मंदिर स्थिति, दर्शन समय व सूचनाएँ सफलतापूर्वक अपडेट की गई हैं! ✅' : 'Temple status, darshan timings and announcements updated for all users successfully! ✅'}</span>
        </motion.div>
      )}

      {/* QUICK PRESETS STRIP */}
      <div className="bg-amber-100/70 p-4 rounded-3xl border-2 border-amber-300 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-amber-950 flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>{language === 'mr' ? 'एका क्लीकमध्ये प्रीसेट लागू करा (Quick Status Presets):' : language === 'hi' ? 'एक क्लिक में प्रीसेट लागू करें (Quick Presets):' : 'Apply Quick Presets in One Click:'}</span>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <button
            type="button"
            onClick={() => applyPreset('normal')}
            className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl font-bold transition-all text-left flex items-center space-x-2 cursor-pointer"
          >
            <span>🟢</span>
            <span>{language === 'mr' ? 'सामान्य दर्शन सुरू' : language === 'hi' ? 'सामान्य दर्शन चालू' : 'Normal Darshan Open'}</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('aarti')}
            className="p-2.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-900 border border-yellow-300 rounded-xl font-bold transition-all text-left flex items-center space-x-2 cursor-pointer"
          >
            <span>🟡</span>
            <span>{language === 'mr' ? 'आरती / महापूजा' : language === 'hi' ? 'आरती / महापूजा' : 'Aarti in Progress'}</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('rush')}
            className="p-2.5 bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-300 rounded-xl font-bold transition-all text-left flex items-center space-x-2 cursor-pointer"
          >
            <span>🟠</span>
            <span>{language === 'mr' ? 'अति गर्दी अलर्ट' : language === 'hi' ? 'अत्यधिक भीड़ अलर्ट' : 'Heavy Rush Alert'}</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('night_closed')}
            className="p-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 rounded-xl font-bold transition-all text-left flex items-center space-x-2 cursor-pointer"
          >
            <span>🔴</span>
            <span>{language === 'mr' ? 'शेजारती (दर्शन बंद)' : language === 'hi' ? 'शेजारती (दर्शन बंद)' : 'Night Closed'}</span>
          </button>
        </div>
      </div>

      {/* 1. MAIN TEMPLE STATUS & SCHEDULE (Open/Closed/Aarti) */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-300 space-y-5">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <h3 className="text-lg font-bold text-amber-950 font-serif flex items-center space-x-2">
            <DoorOpen className="w-5 h-5 text-amber-700" />
            <span>{language === 'mr' ? 'मंदिर दर्शन स्थिती व वेळापत्रक (Temple Open / Closed / Timings)' : language === 'hi' ? 'मंदिर दर्शन स्थिति व समय सारणी' : 'Temple Darshan Status & Timings'}</span>
          </h3>
          <span className={`text-xs font-black px-3 py-1 rounded-full border ${
            templeStatus === 'Open' ? 'bg-emerald-100 text-emerald-900 border-emerald-400' :
            templeStatus === 'Aarti' ? 'bg-yellow-100 text-yellow-900 border-yellow-400' :
            templeStatus === 'Closed' ? 'bg-red-100 text-red-900 border-red-400' :
            'bg-amber-100 text-amber-900 border-amber-400'
          }`}>
            {language === 'mr' ? `सध्याची स्थिती: ${templeStatus}` : language === 'hi' ? `वर्तमान स्थिति: ${templeStatus}` : `Current Status: ${templeStatus}`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          {/* Temple Open Status */}
          <div className="space-y-1.5 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <label className="font-extrabold text-amber-950 block">
              {language === 'mr' ? 'मंदिर दर्शन स्थिती (Temple Status) *' : language === 'hi' ? 'मंदिर दर्शन स्थिति (Temple Status) *' : 'Temple Open / Closed Status *'}
            </label>
            <select
              value={templeStatus}
              onChange={(e) => setTempleStatus(e.target.value as TempleOpenStatus)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-300 bg-white font-extrabold text-amber-950 text-sm focus:outline-none"
            >
              <option value="Open">🟢 {language === 'mr' ? 'मंदिर सुरू (Open for Darshan)' : language === 'hi' ? 'मंदिर खुला (Open for Darshan)' : 'Temple OPEN for Darshan'}</option>
              <option value="Aarti">🟡 {language === 'mr' ? 'आरती / पूजा चालू (Aarti in Progress)' : language === 'hi' ? 'आरती / पूजा चालू (Aarti in Progress)' : 'Aarti / Pooja in Progress'}</option>
              <option value="SpecialDarshan">🔵 {language === 'mr' ? 'विशेष दर्शन सोहळा (Special Protocol)' : language === 'hi' ? 'विशेष दर्शन (Special Protocol)' : 'Special Protocol Darshan'}</option>
              <option value="Cleaning">🟠 {language === 'mr' ? 'स्वच्छता व व्यवस्था (Cleaning Break)' : language === 'hi' ? 'सफाई व विश्राम (Cleaning Break)' : 'Sanitization / Cleaning Break'}</option>
              <option value="Closed">🔴 {language === 'mr' ? 'दर्शन बंद (Closed / Night Rest)' : language === 'hi' ? 'दर्शन बंद (Closed / Night Rest)' : 'Temple CLOSED'}</option>
            </select>
          </div>

          {/* Darshan Date / Festival Day */}
          <div className="space-y-1.5 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <label className="font-extrabold text-amber-950 block">
              {language === 'mr' ? 'दर्शनाची तारीख व उत्सव (Darshan Date & Tithi)' : language === 'hi' ? 'दर्शन तारीख व उत्सव' : 'Darshan Date & Festival'}
            </label>
            <input
              type="text"
              value={darshanDate}
              onChange={(e) => setDarshanDate(e.target.value)}
              placeholder="२९ ऑगस्ट २०२६ (आषाढी एकादशी)"
              className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white font-bold text-amber-950 text-xs sm:text-sm"
            />
          </div>

          {/* Temple Darshan Hours */}
          <div className="space-y-1.5 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <label className="font-extrabold text-amber-950 block">
              {language === 'mr' ? 'मंदिर उघडण्याची व बंद होण्याची वेळ (Temple Hours)' : language === 'hi' ? 'मंदिर खुलने व बंद होने का समय' : 'Temple Opening & Closing Hours'}
            </label>
            <input
              type="text"
              value={templeHours}
              onChange={(e) => setTempleHours(e.target.value)}
              placeholder="सकाळी ०४:०० ते रात्री ११:३०"
              className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white font-bold text-amber-950 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Temple Status Banner Description */}
        <div className="space-y-2 pt-2">
          <label className="font-extrabold text-xs text-amber-950 block">
            {language === 'mr' ? 'थेट मंदिर स्थिती संदेश (Status Banner Text for Pilgrims):' : language === 'hi' ? 'सीधा मंदिर स्थिति संदेश (Status Banner Text):' : 'Live Temple Status Banner Message for Pilgrims:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[11px] font-bold text-amber-800 block mb-1">मराठी (Marathi):</span>
              <input
                type="text"
                value={statusTextMr}
                onChange={(e) => setStatusTextMr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-medium"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-800 block mb-1">हिंदी (Hindi):</span>
              <input
                type="text"
                value={statusTextHi}
                onChange={(e) => setStatusTextHi(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-medium"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-800 block mb-1">English:</span>
              <input
                type="text"
                value={statusTextEn}
                onChange={(e) => setStatusTextEn(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. REAL-TIME DARSHAN WAIT TIMES & QUEUE METRICS */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-300 space-y-6">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <h3 className="text-lg font-bold text-amber-950 font-serif flex items-center space-x-2">
            <Clock className="w-5 h-5 text-amber-700" />
            <span>{getTranslation(language, 'updateWaitTimes')}</span>
          </h3>
          <span className="text-xs bg-amber-100 text-amber-900 font-extrabold px-3 py-1 rounded-full">
            {language === 'mr' ? 'थेट ॲप सिंक (Real-Time)' : language === 'hi' ? 'लाइव ऐप सिंक (Real-Time)' : 'Real-Time Sync'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
          {/* Mukh Darshan Wait */}
          <div className="space-y-1.5 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <label className="font-extrabold text-amber-950 block">
              {getTranslation(language, 'mukhDarshanMins')}
            </label>
            <input
              type="number"
              min="0"
              max="600"
              value={mukhMins}
              onChange={(e) => setMukhMins(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white font-black text-amber-950 text-base"
            />
          </div>

          {/* Charan Sparsh Wait */}
          <div className="space-y-1.5 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <label className="font-extrabold text-amber-950 block">
              {getTranslation(language, 'charanSparshHours')}
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="24"
              value={charanHours}
              onChange={(e) => setCharanHours(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white font-black text-amber-950 text-base"
            />
          </div>

          {/* Crowd Level */}
          <div className="space-y-1.5 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <label className="font-extrabold text-amber-950 block">
              {getTranslation(language, 'crowdLevelSelect')}
            </label>
            <select
              value={crowdLevel}
              onChange={(e) => setCrowdLevel(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white font-extrabold text-amber-950 text-sm"
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🟠 High</option>
              <option value="Critical">🔴 Critical</option>
            </select>
          </div>

          {/* Queue Length */}
          <div className="space-y-1.5 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <label className="font-extrabold text-amber-950 block">
              {getTranslation(language, 'queueLengthM')}
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={queueMeters}
              onChange={(e) => setQueueMeters(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white font-black text-amber-950 text-base"
            />
          </div>
        </div>

        {/* Aarti Schedule & Priority Lines */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-amber-200 text-xs">
          <div className="space-y-1 bg-amber-50/40 p-3 rounded-xl border border-amber-200">
            <label className="font-bold text-amber-950 block">{language === 'mr' ? 'पुढील आरती व वेळ (Next Aarti):' : language === 'hi' ? 'अगली आरती व समय:' : 'Next Aarti & Time:'}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={nextAartiMr}
                onChange={(e) => setNextAartiMr(e.target.value)}
                placeholder="धूपारती (सायंकाळी)"
                className="w-2/3 px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white font-bold"
              />
              <input
                type="text"
                value={nextAartiTime}
                onChange={(e) => setNextAartiTime(e.target.value)}
                placeholder="०७:०० PM"
                className="w-1/3 px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white font-bold text-center"
              />
            </div>
          </div>

          <div className="space-y-1 bg-amber-50/40 p-3 rounded-xl border border-amber-200">
            <label className="font-bold text-amber-950 block">{language === 'mr' ? 'ज्येष्ठ नागरिक / दिव्यांग रांग:' : language === 'hi' ? 'वरिष्ठ नागरिक / दिव्यांग कतार:' : 'Senior Citizens Queue:'}</label>
            <select
              value={seniorStatus}
              onChange={(e) => setSeniorStatus(e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white font-bold"
            >
              <option value="Priority Line Active">🟢 Priority Line Active</option>
              <option value="Open">🟢 Open</option>
              <option value="Closed">🔴 Closed</option>
            </select>
          </div>

          <div className="space-y-1 bg-amber-50/40 p-3 rounded-xl border border-amber-200">
            <label className="font-bold text-amber-950 block">{language === 'mr' ? 'पालखी मुक्काम स्थिती (Palkhi Stage):' : language === 'hi' ? 'पालखी पड़ाव स्थिति:' : 'Palkhi Stage Location:'}</label>
            <input
              type="text"
              value={palkhiLocationMr}
              onChange={(e) => setPalkhiLocationMr(e.target.value)}
              placeholder="वाखरी मुक्काम (पंढरपूरजवळ ५ किमी)"
              className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white font-bold"
            />
          </div>
        </div>
      </div>

      {/* 3. BROADCAST URGENT LIVE ANNOUNCEMENT TICKER */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-red-300 space-y-4">
        <div className="flex items-center justify-between border-b border-red-200 pb-3">
          <h3 className="text-lg font-bold text-amber-950 font-serif flex items-center space-x-2">
            <Megaphone className="w-5 h-5 text-red-600" />
            <span>{getTranslation(language, 'broadcastNoticeTitle')}</span>
          </h3>
          <span className="text-xs bg-red-100 text-red-800 font-extrabold px-3 py-1 rounded-full">
            {language === 'mr' ? 'सर्व स्क्रीनवर थेट दिसेल' : language === 'hi' ? 'सभी स्क्रीन पर दिखेगा' : 'Live on All Screens'}
          </span>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-amber-900 block">
            {language === 'mr' ? 'सर्व वापरकर्त्यांच्या मुख्य स्क्रीनवर स्क्रोल होणारा संदेश (Broadcast Announcement):' : language === 'hi' ? 'सभी उपयोगकर्ताओं की स्क्रीन पर प्रसारित संदेश:' : 'Scrolling Broadcast Announcement for all pilgrims:'}
          </label>
          <input
            type="text"
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            placeholder={language === 'mr' ? 'उदा. आज दुपारी १२ वाजता चंद्रभागा स्नान घाटावर विशेष दिंडी रिंगण सोहळा सुरू होईल.' : language === 'hi' ? 'उदा. आज दोपहर १२ बजे चंद्रभागा घाट पर विशेष दिंडी रिंगण सोहळा होगा।' : 'e.g. Special Ringan ceremony starts today at 12 PM at Chandrabhaga Ghat.'}
            className="w-full px-4 py-3 rounded-2xl border-2 border-red-300 bg-red-50/40 text-amber-950 font-bold text-xs sm:text-sm focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* 4. MANAGE ACTIVE TEMPLE ENTRY GATES */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-300 space-y-4">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <h3 className="text-lg font-bold text-amber-950 font-serif flex items-center space-x-2">
            <Users className="w-5 h-5 text-amber-700" />
            <span>{getTranslation(language, 'activeGatesTitle')}</span>
          </h3>
          <span className="text-xs text-amber-800 font-bold">
            {language === 'mr' ? `एकूण ${activeGatesList.length} गेट्स` : language === 'hi' ? `कुल ${activeGatesList.length} द्वार` : `Total ${activeGatesList.length} Gates`}
          </span>
        </div>

        <div className="space-y-3">
          {activeGatesList.map((gate, idx) => (
            <div key={idx} className="flex items-center justify-between p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs sm:text-sm">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-950">{gate[language] || gate.mr}</span>
                  <button
                    onClick={() => handleToggleGateStatus(idx)}
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase cursor-pointer ${
                      gate.status === 'open' || !gate.status ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      gate.status === 'restricted' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                      'bg-red-100 text-red-800 border border-red-300'
                    }`}
                  >
                    {gate.status === 'open' || !gate.status ? (language === 'mr' ? 'खुले (Open)' : language === 'hi' ? 'खुला (Open)' : 'Open') : gate.status === 'restricted' ? (language === 'mr' ? 'मर्यादित' : language === 'hi' ? 'सीमित' : 'Restricted') : (language === 'mr' ? 'बंद (Closed)' : language === 'hi' ? 'बंद (Closed)' : 'Closed')}
                  </button>
                </div>
                <span className="text-[11px] text-amber-700">{gate.en}</span>
              </div>
              <button
                onClick={() => handleRemoveGate(idx)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-all cursor-pointer"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add New Gate */}
          <div className="p-4 bg-amber-100/60 rounded-2xl border-2 border-dashed border-amber-300 space-y-3 text-xs">
            <span className="font-bold text-amber-950 block">{language === 'mr' ? 'नवीन प्रवेशद्वार जोडा (Add New Gate):' : language === 'hi' ? 'नया प्रवेश द्वार जोड़ें:' : 'Add New Entry Gate:'}</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={newGateMr}
                onChange={(e) => setNewGateMr(e.target.value)}
                placeholder="मराठी नाव (उदा. गेट ४ - नामदेव पायरी)"
                className="px-3 py-2 rounded-xl border border-amber-300 bg-white"
              />
              <input
                type="text"
                value={newGateHi}
                onChange={(e) => setNewGateHi(e.target.value)}
                placeholder="हिंदी नाम"
                className="px-3 py-2 rounded-xl border border-amber-300 bg-white"
              />
              <input
                type="text"
                value={newGateEn}
                onChange={(e) => setNewGateEn(e.target.value)}
                placeholder="English Gate Name"
                className="px-3 py-2 rounded-xl border border-amber-300 bg-white"
              />
            </div>
            <button
              onClick={handleAddGate}
              className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'mr' ? 'गेट जोडा (Add Gate)' : language === 'hi' ? 'द्वार जोड़ें' : 'Add Gate'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. MULTILINGUAL TEMPLE NOTICES & PUBLISH BUTTON */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-300 space-y-4">
        <h3 className="text-lg font-bold text-amber-950 font-serif border-b border-amber-200 pb-3">
          📢 {getTranslation(language, 'broadcastNoticeTitle')}
        </h3>

        <div className="space-y-3 text-xs sm:text-sm">
          <div>
            <label className="font-bold text-amber-900 block mb-1">मराठी सूचना (Marathi):</label>
            <textarea
              rows={2}
              value={noticeMr}
              onChange={(e) => setNoticeMr(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/30 text-amber-950 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-amber-900 block mb-1">हिंदी सूचना (Hindi):</label>
            <textarea
              rows={2}
              value={noticeHi}
              onChange={(e) => setNoticeHi(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/30 text-amber-950 font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-amber-900 block mb-1">English Notice:</label>
            <textarea
              rows={2}
              value={noticeEn}
              onChange={(e) => setNoticeEn(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/30 text-amber-950 font-medium"
            />
          </div>
        </div>

        <div className="pt-3">
          <button
            onClick={handlePublishUpdates}
            disabled={isSaving}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 text-sm sm:text-base cursor-pointer disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{isSaving ? '...' : getTranslation(language, 'saveTempleDataBtn')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
