import React, { useState } from 'react';
import { Language, CrowdStatus, DarshanToken } from '../types';
import { getTranslation } from '../translations';
import { Users, Clock, QrCode, Ticket, CheckCircle, AlertTriangle, ShieldCheck, Download, Sparkles, User, Phone, Eye, Footprints, Calendar, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface CrowdDarshanViewProps {
  language: Language;
  crowdStatus: CrowdStatus;
  onGenerateToken: (token: DarshanToken) => void;
  existingTokens: DarshanToken[];
}

export const CrowdDarshanView: React.FC<CrowdDarshanViewProps> = ({
  language,
  crowdStatus,
  onGenerateToken,
  existingTokens,
}) => {
  const [pilgrimName, setPilgrimName] = useState('');
  const [phone, setPhone] = useState('');
  const [pilgrimCount, setPilgrimCount] = useState(1);
  const [timeSlot, setTimeSlot] = useState('06:00 AM - 08:00 AM');
  const [darshanType, setDarshanType] = useState<'Mukh' | 'CharanSparsh'>('Mukh');
  const [activeGeneratedPass, setActiveGeneratedPass] = useState<DarshanToken | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pilgrimName.trim() || !phone.trim()) {
      alert("कृपया नाव आणि मोबाईल नंबर प्रविष्ट करा / Please enter name and phone number");
      return;
    }

    const tokenNo = `VIT-${Math.floor(100000 + Math.random() * 900000)}`;
    const gateNumber = darshanType === 'Mukh' ? 'Gate 1 (Mahadwar Ghat)' : 'Gate 3 (South Pavilion)';
    
    const newPass: DarshanToken = {
      id: `dt_${Date.now()}`,
      tokenNo,
      name: pilgrimName,
      phone,
      pilgrimCount,
      timeSlot,
      gateNumber,
      darshanType,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      qrCodeValue: `WARISEVA-${tokenNo}-${phone}-${pilgrimCount}`,
      status: 'Confirmed'
    };

    onGenerateToken(newPass);
    setActiveGeneratedPass(newPass);

    // Fire celebratory confetti!
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Live Crowd Status Banner - Vibrant Traditional Saffron Bhagwa & Golden Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-[#78350F] via-[#9A3412] to-[#EA580C] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-amber-400/40 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest flex items-center space-x-1.5 shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>LIVE UPDATES</span>
              </span>
              <span className="text-amber-100 text-xs font-semibold">
                अद्यतन वेळ: {crowdStatus.lastUpdated}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-amber-100 drop-shadow">
              {getTranslation(language, 'cardCrowdTitle')}
            </h2>
            <p className="text-amber-100/90 text-xs sm:text-sm max-w-xl font-sans font-medium">
              श्री विठ्ठल रुक्मिणी मंदिर परिसरातील थेट गर्दी व दर्शन वेळ माहिती.
            </p>
          </div>

          {/* Meter Badges */}
          <div className="bg-amber-950/90 backdrop-blur-md border border-amber-400/40 p-4 rounded-2xl flex items-center space-x-6 shrink-0 shadow-inner">
            <div className="text-center">
              <span className="text-[11px] text-amber-200 block uppercase tracking-wider font-semibold">गर्दीची पातळी</span>
              <span className="text-lg font-black text-amber-300 flex items-center justify-center space-x-1 mt-0.5">
                <Users className="w-4 h-4 text-amber-300" />
                <span>{crowdStatus.crowdLevel === 'High' ? 'जास्त (High)' : 'मध्यम (Medium)'}</span>
              </span>
            </div>
            <div className="h-9 w-px bg-amber-700/60" />
            <div className="text-center">
              <span className="text-[11px] text-amber-200 block uppercase tracking-wider font-semibold">रांगेची लांबी</span>
              <span className="text-lg font-black text-white mt-0.5 block">{crowdStatus.queueLengthMeters} मी.</span>
            </div>
          </div>
        </div>

        {/* Live Wait Times */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 relative z-10">
          <div className="bg-amber-950/80 backdrop-blur-md p-4 rounded-2xl border border-amber-400/40 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-amber-100 text-amber-950 rounded-xl flex items-center justify-center font-bold shadow-md shrink-0 border border-amber-300">
                <Eye className="w-6 h-6 text-amber-900" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-amber-100">{getTranslation(language, 'mukhDarshan')}</h4>
                <p className="text-xs text-amber-200/80">गाभारा थेट दर्शन रांग</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-amber-400">{crowdStatus.mukhDarshanWaitMins}</span>
              <span className="text-[11px] text-stone-400 block font-medium">मिनिटे</span>
            </div>
          </div>

          <div className="bg-stone-900/60 backdrop-blur-md p-4 rounded-2xl border border-stone-700 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-amber-400 text-stone-950 rounded-xl flex items-center justify-center font-bold shadow-md shrink-0">
                <Footprints className="w-6 h-6 text-stone-950" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-stone-100">{getTranslation(language, 'charanSparsh')}</h4>
                <p className="text-xs text-stone-400">श्री विठ्ठल चरणस्पर्श दर्शन</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-amber-400">{crowdStatus.charanSparshWaitHours}</span>
              <span className="text-[11px] text-stone-400 block font-medium">तास</span>
            </div>
          </div>
        </div>

        {/* Advisory */}
        <div className="mt-5 p-3.5 bg-stone-900/80 rounded-xl border border-stone-700 text-xs text-stone-300 flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-sans">{crowdStatus.noticeMessage[language]}</p>
        </div>
      </motion.div>

      {/* Generator Form + Pass Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pass Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-stone-200/90 space-y-5">
          <div className="border-b border-stone-100 pb-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center border border-amber-200">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                {getTranslation(language, 'bookTokenHeader')}
              </h3>
              <p className="text-xs text-stone-500">
                रांगेतील वेळ वाचवण्यासाठी मोफत अधिकृत ई-पास बुक करा.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-stone-500" />
                <span>{getTranslation(language, 'pilgrimName')} *</span>
              </label>
              <input
                type="text"
                required
                value={pilgrimName}
                onChange={(e) => setPilgrimName(e.target.value)}
                placeholder="उदा. ज्ञानेश्वर पाटील (e.g. Dnyaneshwar Patil)"
                className="w-full px-4 py-3 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50/50 text-stone-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>{getTranslation(language, 'phoneNumber')} *</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="९८२२०XXXXX"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50/50 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-stone-500" />
                  <span>{getTranslation(language, 'pilgrimCount')}</span>
                </label>
                <select
                  value={pilgrimCount}
                  onChange={(e) => setPilgrimCount(Number(e.target.value))}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50/50 font-semibold text-stone-900"
                >
                  <option value={1}>१ वारकरी (1 Person)</option>
                  <option value={2}>२ वारकरी (2 Persons)</option>
                  <option value={4}>४ वारकरी (4 Persons)</option>
                  <option value={6}>६ वारकरी (6 Persons Group)</option>
                  <option value={10}>१० वारकरी दिंडी (10 Group)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {getTranslation(language, 'selectDarshanType')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDarshanType('Mukh')}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                      darshanType === 'Mukh'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-600 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    👁️ मुख दर्शन
                  </button>
                  <button
                    type="button"
                    onClick={() => setDarshanType('CharanSparsh')}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                      darshanType === 'CharanSparsh'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-600 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    👣 चरण स्पर्श
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>{getTranslation(language, 'selectTimeSlot')}</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50/50 font-semibold text-stone-900"
                >
                  <option value="06:00 AM - 08:00 AM">सकाळी ०६:०० ते ०८:०० (Morning)</option>
                  <option value="08:00 AM - 10:00 AM">सकाळी ०८:०० ते १०:००</option>
                  <option value="10:00 AM - 12:00 PM">सकाळी १०:०० ते दुपारी १२:००</option>
                  <option value="02:00 PM - 04:00 PM">दुपारी ०२:०० ते ०४:००</option>
                  <option value="04:00 PM - 06:00 PM">सायंकाळी ०४:०० ते ०६:००</option>
                  <option value="06:00 PM - 08:00 PM">सायंकाळी ०६:०० ते ०८:०० (Evening)</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black text-sm py-3.5 rounded-xl border border-amber-500/30 shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{getTranslation(language, 'generatePassBtn')}</span>
            </motion.button>
          </form>
        </div>

        {/* Generated Pass Display Card */}
        <div className="lg:col-span-5 space-y-4">
          <AnimatePresence mode="wait">
            {activeGeneratedPass ? (
              <motion.div
                key={activeGeneratedPass.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-gradient-to-b from-amber-50/90 to-orange-50/90 border-2 border-amber-400 rounded-3xl p-6 shadow-xl relative overflow-hidden text-stone-900"
              >
                <div className="absolute top-0 right-0 bg-stone-900 text-amber-300 text-[10px] font-black px-3 py-1 rounded-bl-2xl uppercase tracking-wider shadow">
                  अधिकृत ई-पास
                </div>

                <div className="text-center border-b border-amber-200 pb-4 mb-4 space-y-1">
                  <span className="text-3xl">🛕</span>
                  <h4 className="text-lg font-black text-stone-900 font-serif">
                    {getTranslation(language, 'tokenPassTitle')}
                  </h4>
                  <p className="text-xs text-stone-600 font-medium">श्री विठ्ठल रुक्मिणी मंदिर समिती, पंढरपूर</p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-inner text-center my-3">
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">{getTranslation(language, 'tokenNumber')}</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-800 font-mono tracking-widest">
                    {activeGeneratedPass.tokenNo}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-stone-800 border-b border-amber-200 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-stone-600">वारकरी नाव:</span>
                    <span className="font-bold text-stone-900">{activeGeneratedPass.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-stone-600">मोबाईल:</span>
                    <span className="font-bold text-stone-900">{activeGeneratedPass.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-stone-600">एकूण व्यक्ती:</span>
                    <span className="font-bold text-stone-900">{activeGeneratedPass.pilgrimCount} व्यक्ती</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-stone-600">दर्शन वेळ:</span>
                    <span className="font-bold text-amber-900">{activeGeneratedPass.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-stone-600">नियुक्त गेट:</span>
                    <span className="font-bold text-emerald-700">{activeGeneratedPass.gateNumber}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-amber-200 flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 bg-stone-100 p-2 rounded-xl border border-stone-200 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-stone-900" />
                  </div>
                  <span className="text-[10px] text-stone-500 mt-2 font-mono font-semibold">
                    SCAN AT ENTRANCE • {activeGeneratedPass.tokenNo}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => alert(`ई-पास ${activeGeneratedPass.tokenNo} यशस्वीपणे सेव्ह झाला आहे!`)}
                  className="w-full mt-4 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>{getTranslation(language, 'downloadPassBtn')}</span>
                </motion.button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-dashed border-stone-300 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                  <Ticket className="w-8 h-8 text-amber-700" />
                </div>
                <h4 className="font-bold text-stone-800 text-sm font-serif">
                  पास अजून तयार केलेला नाही
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  डाव्या फॉर्ममध्ये माहिती भरून तुमचा श्री विठ्ठल दर्शन ई-पास तयार करा.
                </p>
              </div>
            )}
          </AnimatePresence>

          {/* Existing Passes History List */}
          {existingTokens.length > 0 && (
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200 space-y-3">
              <h4 className="font-bold text-xs text-stone-800 flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>तुमचे दर्शन ई-पास ({existingTokens.length})</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {existingTokens.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveGeneratedPass(t)}
                    className="p-3 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-amber-50 cursor-pointer text-xs flex justify-between items-center transition-colors"
                  >
                    <div>
                      <span className="font-bold text-stone-900 block font-mono">{t.tokenNo}</span>
                      <span className="text-stone-600 text-[11px]">{t.name} ({t.pilgrimCount} व्यक्ती)</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {t.timeSlot}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
