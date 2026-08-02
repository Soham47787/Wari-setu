import React, { useState } from 'react';
import { Language, CrowdStatus, DarshanToken } from '../types';
import { getTranslation } from '../translations';
import { Users, Clock, QrCode, Ticket, CheckCircle, AlertTriangle, ShieldCheck, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Live Crowd Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-2xl p-4 sm:p-6 text-white shadow-lg border-2 border-amber-300/60">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full animate-pulse flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-white animate-ping mr-1" />
                LIVE
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold font-serif">
                {getTranslation(language, 'cardCrowdTitle')}
              </h2>
            </div>
            <p className="text-amber-100 text-xs sm:text-sm mt-1">
              अद्यतन वेळ: {crowdStatus.lastUpdated} | मंदिरातील सध्याची परिस्थिती
            </p>
          </div>

          {/* Crowd Gauge Pill */}
          <div className="bg-amber-950/40 border border-amber-300/40 p-3 rounded-xl flex items-center space-x-4">
            <div className="text-center">
              <span className="text-xs text-amber-200 block">गर्दीची पातळी (Crowd)</span>
              <span className="text-lg font-bold text-amber-300 flex items-center justify-center space-x-1">
                <Users className="w-5 h-5 text-amber-300" />
                <span>{crowdStatus.crowdLevel === 'High' ? 'जास्त (High)' : 'मध्यम (Medium)'}</span>
              </span>
            </div>
            <div className="h-8 w-px bg-amber-500/40" />
            <div className="text-center">
              <span className="text-xs text-amber-200 block">रांगेची लांबी (Queue)</span>
              <span className="text-lg font-bold text-amber-100">{crowdStatus.queueLengthMeters} मीटर</span>
            </div>
          </div>
        </div>

        {/* Live Wait Times Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-400 text-amber-950 rounded-xl font-bold">
                👁️
              </div>
              <div>
                <h4 className="font-bold text-sm text-amber-100">{getTranslation(language, 'mukhDarshan')}</h4>
                <p className="text-xs text-amber-200/90">गाभारा थेट दर्शन रांग</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-amber-300">{crowdStatus.mukhDarshanWaitMins}</span>
              <span className="text-xs text-amber-200 block">मिनिटे (Mins)</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-400 text-amber-950 rounded-xl font-bold">
                👣
              </div>
              <div>
                <h4 className="font-bold text-sm text-amber-100">{getTranslation(language, 'charanSparsh')}</h4>
                <p className="text-xs text-amber-200/90">श्री विठ्ठल चरणस्पर्श दर्शन</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-amber-300">{crowdStatus.charanSparshWaitHours}</span>
              <span className="text-xs text-amber-200 block">तास (Hours)</span>
            </div>
          </div>
        </div>

        {/* Advisory Box */}
        <div className="mt-4 p-3 bg-amber-950/50 rounded-xl border border-amber-400/30 text-xs sm:text-sm text-amber-100 flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <p>{crowdStatus.noticeMessage[language]}</p>
        </div>
      </div>

      {/* Main Grid: Generator + Active Pass Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Token Generator Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-amber-200 space-y-4">
          <div className="border-b border-amber-100 pb-3 flex items-center space-x-2">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-950">
                {getTranslation(language, 'bookTokenHeader')}
              </h3>
              <p className="text-xs text-amber-700">
                रांगेत थांबणे टाळण्यासाठी डिजिटल ई-पास मोफत बुक करा.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1">
                {getTranslation(language, 'pilgrimName')} *
              </label>
              <input
                type="text"
                required
                value={pilgrimName}
                onChange={(e) => setPilgrimName(e.target.value)}
                placeholder="उदा. ज्ञानेश्वर पाटील (e.g. Dnyaneshwar Patil)"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  {getTranslation(language, 'phoneNumber')} *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="९८२२०XXXXX"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  {getTranslation(language, 'pilgrimCount')}
                </label>
                <select
                  value={pilgrimCount}
                  onChange={(e) => setPilgrimCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/30 font-semibold"
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
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  {getTranslation(language, 'selectDarshanType')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDarshanType('Mukh')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                      darshanType === 'Mukh'
                        ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-300'
                        : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    👁️ मुख दर्शन
                  </button>
                  <button
                    type="button"
                    onClick={() => setDarshanType('CharanSparsh')}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                      darshanType === 'CharanSparsh'
                        ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-300'
                        : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    👣 चरण स्पर्श
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  {getTranslation(language, 'selectTimeSlot')}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/30 font-semibold"
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-sm py-3 rounded-xl border border-amber-300 shadow-md transition-all transform hover:scale-[1.01] flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>{getTranslation(language, 'generatePassBtn')}</span>
            </button>
          </form>
        </div>

        {/* Generated Pass Display Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {activeGeneratedPass ? (
            <div className="bg-amber-50 border-2 border-amber-500 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl shadow">
                अधिकृत डिजिटल पास
              </div>

              <div className="text-center border-b border-amber-200 pb-4 mb-4">
                <span className="text-2xl">🛕</span>
                <h4 className="text-lg font-extrabold text-amber-950 font-serif">
                  {getTranslation(language, 'tokenPassTitle')}
                </h4>
                <p className="text-xs text-amber-700">श्री विठ्ठल रुक्मिनी मंदिर समिती, पंढरपूर</p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-inner text-center my-3">
                <span className="text-xs text-amber-800 font-bold block">{getTranslation(language, 'tokenNumber')}</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-700 font-mono tracking-wider">
                  {activeGeneratedPass.tokenNo}
                </span>
              </div>

              <div className="space-y-2 text-xs text-amber-900 border-b border-amber-200 pb-3 mb-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-amber-800">वारकरी नाव:</span>
                  <span className="font-bold">{activeGeneratedPass.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-amber-800">मोबाईल:</span>
                  <span className="font-bold">{activeGeneratedPass.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-amber-800">एकूण संख्या:</span>
                  <span className="font-bold">{activeGeneratedPass.pilgrimCount} व्यक्ती</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-amber-800">दर्शन वेळ:</span>
                  <span className="font-bold text-amber-700">{activeGeneratedPass.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-amber-800">नियुक्त गेट:</span>
                  <span className="font-bold text-emerald-800">{activeGeneratedPass.gateNumber}</span>
                </div>
              </div>

              {/* Simulated QR Code Canvas */}
              <div className="bg-white p-3 rounded-xl border border-amber-200 flex flex-col items-center justify-center text-center">
                <div className="w-28 h-28 bg-amber-950/10 p-2 rounded-lg border border-amber-300 flex items-center justify-center font-mono text-[9px] text-amber-900">
                  <QrCode className="w-20 h-20 text-amber-900" />
                </div>
                <span className="text-[10px] text-amber-700 mt-1 font-mono">
                  SCAN AT GATE • {activeGeneratedPass.tokenNo}
                </span>
              </div>

              <button
                onClick={() => alert(`ई-पास ${activeGeneratedPass.tokenNo} तुमच्या मोबाईलमध्ये सेव्ह झाला आहे!`)}
                className="w-full mt-4 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow"
              >
                <Download className="w-4 h-4 text-amber-200" />
                <span>{getTranslation(language, 'downloadPassBtn')}</span>
              </button>
            </div>
          ) : (
            <div className="bg-amber-100/50 rounded-2xl p-6 border-2 border-dashed border-amber-300 text-center space-y-3">
              <Ticket className="w-12 h-12 text-amber-600 mx-auto opacity-70" />
              <h4 className="font-bold text-amber-950 text-sm">
                पास अजून तयार केलेला नाही
              </h4>
              <p className="text-xs text-amber-800">
                डाव्या बाजूचा फॉर्म भरून तुमचा श्री विठ्ठल दर्शन ई-पास तयार करा.
              </p>
            </div>
          )}

          {/* Existing Passes History List */}
          {existingTokens.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow border border-amber-200">
              <h4 className="font-bold text-xs text-amber-900 mb-2 flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>तुमचे अलीकडील दर्शन ई-पास ({existingTokens.length})</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {existingTokens.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveGeneratedPass(t)}
                    className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100 cursor-pointer text-xs flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold text-amber-950 block">{t.tokenNo}</span>
                      <span className="text-amber-800 text-[11px]">{t.name} ({t.pilgrimCount} P)</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
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
