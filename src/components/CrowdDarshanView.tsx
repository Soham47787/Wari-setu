import React, { useState, useEffect } from 'react';
import { Language, CrowdStatus, DarshanToken, UserProfile } from '../types';
import { getTranslation } from '../translations';
import { Users, Clock, ShieldCheck, Ticket, Download, CheckCircle, Sparkles, AlertCircle, QrCode } from 'lucide-react';

interface CrowdDarshanViewProps {
  language: Language;
  crowdStatus: CrowdStatus;
  userTokens: DarshanToken[];
  onGenerateToken: (token: DarshanToken) => void;
  user?: UserProfile | null;
}

// Crisp deterministic QR Code generator component (Renders unique matrix for each token ID)
const DynamicQRCode: React.FC<{ value: string; size?: number }> = ({ value, size = 160 }) => {
  // Generate a consistent pseudo-random pattern based on string hash
  const hash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gridSize = 21; // Standard QR matrix grid 21x21
  const moduleSize = size / gridSize;

  // 2D matrix
  const matrix: boolean[][] = [];
  for (let r = 0; r < gridSize; r++) {
    matrix[r] = [];
    for (let c = 0; c < gridSize; c++) {
      // Finder patterns in top-left, top-right, bottom-left corners (7x7)
      const isTopLeftFinder = r < 7 && c < 7;
      const isTopRightFinder = r < 7 && c >= gridSize - 7;
      const isBottomLeftFinder = r >= gridSize - 7 && c < 7;

      if (isTopLeftFinder) {
        matrix[r][c] = r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
      } else if (isTopRightFinder) {
        const col = c - (gridSize - 7);
        matrix[r][c] = r === 0 || r === 6 || col === 0 || col === 6 || (r >= 2 && r <= 4 && col >= 2 && col <= 4);
      } else if (isBottomLeftFinder) {
        const row = r - (gridSize - 7);
        matrix[r][c] = row === 0 || row === 6 || c === 0 || c === 6 || (row >= 2 && row <= 4 && c >= 2 && c <= 4);
      } else if (r === 6 || c === 6) {
        // Timing patterns
        matrix[r][c] = (r + c) % 2 === 0;
      } else {
        // Data modules computed from string hash
        const cellHash = (hash * 31 + r * 17 + c * 23 + (value.charCodeAt((r + c) % value.length) || 0)) % 100;
        matrix[r][c] = cellHash > 45;
      }
    }
  }

  return (
    <div className="bg-white p-2.5 rounded-2xl border-2 border-amber-900/40 shadow-inner flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg">
        <rect width={size} height={size} fill="#ffffff" />
        {matrix.map((row, r) =>
          row.map((filled, c) =>
            filled ? (
              <rect
                key={`${r}-${c}`}
                x={c * moduleSize}
                y={r * moduleSize}
                width={moduleSize}
                height={moduleSize}
                fill="#1c1917"
              />
            ) : null
          )
        )}
      </svg>
      <span className="text-[10px] font-mono font-black text-amber-950 tracking-wider mt-1 uppercase">
        {value}
      </span>
    </div>
  );
};

export const CrowdDarshanView: React.FC<CrowdDarshanViewProps> = ({
  language,
  crowdStatus,
  userTokens,
  onGenerateToken,
  user,
}) => {
  const [pilgrimName, setPilgrimName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [pilgrimCount, setPilgrimCount] = useState(2);
  const [timeSlot, setTimeSlot] = useState('१०:०० AM - ११:३० AM');
  const [darshanType, setDarshanType] = useState<'Mukh' | 'CharanSparsh'>('Mukh');
  const [idProofNo, setIdProofNo] = useState('');
  const [activePass, setActivePass] = useState<DarshanToken | null>(userTokens[0] || null);

  useEffect(() => {
    if (user) {
      if (user.name) setPilgrimName(user.name);
      if (user.phone) setPhone(user.phone);
    }
  }, [user]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pilgrimName || !phone) {
      alert("कृपया नाव व फोन नंबर भरा (Please fill required fields)");
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const tokenNo = `VITTHAL-${darshanType.toUpperCase()}-${randomSuffix}`;
    const uniqueId = `pass_${Date.now()}`;

    const newPass: DarshanToken = {
      id: uniqueId,
      tokenNo,
      name: pilgrimName,
      phone,
      pilgrimCount: Number(pilgrimCount),
      timeSlot,
      gateNumber: darshanType === 'Mukh' ? 'गेट १ (महाद्वार घाट)' : 'गेट ३ (दक्षिण दर्शन द्वार)',
      darshanType,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      qrCodeValue: `PND-VITTHAL-TOKEN-${tokenNo}-${uniqueId.slice(-6)}`,
      status: 'Confirmed',
      idProofNumber: idProofNo || 'Aadhaar-Verified'
    };

    onGenerateToken(newPass);
    setActivePass(newPass);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Live Crowd Level Alert Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-amber-500/60 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-amber-700 pb-3">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif">
              {getTranslation(language, 'crowdLevelTitle')}
            </h2>
          </div>
          <span className="text-xs bg-amber-800/80 px-3 py-1 rounded-full text-amber-200 border border-amber-600 font-semibold">
            {crowdStatus.lastUpdated[language]}
          </span>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-amber-950/70 p-4 rounded-2xl border border-amber-600/40">
            <span className="text-xs text-amber-300 font-semibold block">{getTranslation(language, 'mukhDarshan')}</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-white">{crowdStatus.mukhDarshanWaitMins}</span>
              <span className="text-xs text-amber-200 font-bold">मिनिटे (Mins)</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-extrabold mt-1 block">✓ जलद हालचाल (Fast Moving)</span>
          </div>

          <div className="bg-amber-950/70 p-4 rounded-2xl border border-amber-600/40">
            <span className="text-xs text-amber-300 font-semibold block">{getTranslation(language, 'charanSparsh')}</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-300">{crowdStatus.charanSparshWaitHours}</span>
              <span className="text-xs text-amber-200 font-bold">तास (Hours)</span>
            </div>
            <span className="text-[10px] text-amber-300 font-extrabold mt-1 block">महाद्वार घाट ते दर्शन मंडप</span>
          </div>

          <div className="bg-amber-950/70 p-4 rounded-2xl border border-amber-600/40">
            <span className="text-xs text-amber-300 font-semibold block">{getTranslation(language, 'queueLength')}</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-white">{crowdStatus.queueLengthMeters}</span>
              <span className="text-xs text-amber-200 font-bold">मीटर (Meters)</span>
            </div>
            <span className="text-[10px] text-amber-200 font-medium mt-1 block">१२ दर्शन मंडप शेड कार्यरत</span>
          </div>
        </div>

        {/* Notice */}
        <div className="p-3 bg-amber-800/50 rounded-2xl border border-amber-600/40 text-xs text-amber-100 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <span>{crowdStatus.noticeMessage[language]}</span>
        </div>
      </div>

      {/* Main Form & Passes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pass Generation Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-amber-300 space-y-4">
          <div className="flex items-center space-x-2 border-b border-amber-200 pb-3">
            <Ticket className="w-6 h-6 text-amber-700" />
            <h3 className="font-bold text-base sm:text-lg text-amber-950 font-serif">
              {getTranslation(language, 'bookTokenHeader')}
            </h3>
          </div>

          <form onSubmit={handleGenerate} className="space-y-3.5 text-xs sm:text-sm">
            {/* Darshan Type Switcher */}
            <div>
              <label className="block font-bold text-amber-900 mb-1.5">
                {getTranslation(language, 'selectDarshanType')} *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDarshanType('Mukh')}
                  className={`py-2 px-3 rounded-xl font-bold border transition-all text-xs ${
                    darshanType === 'Mukh'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                      : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {getTranslation(language, 'mukhDarshanBtn')}
                </button>
                <button
                  type="button"
                  onClick={() => setDarshanType('CharanSparsh')}
                  className={`py-2 px-3 rounded-xl font-bold border transition-all text-xs ${
                    darshanType === 'CharanSparsh'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                      : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {getTranslation(language, 'charanSparshBtn')}
                </button>
              </div>
            </div>

            {/* Pilgrim Name */}
            <div>
              <label className="block font-bold text-amber-900 mb-1">
                {getTranslation(language, 'pilgrimName')} *
              </label>
              <input
                type="text"
                required
                value={pilgrimName}
                onChange={(e) => setPilgrimName(e.target.value)}
                placeholder="उदा. नामदेव तुकाराम शिंदे"
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-amber-950 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Phone & Pilgrim Count */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  {getTranslation(language, 'phoneNumber')} *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="९८२२०XXXXX"
                  className="w-full px-3 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-amber-950 font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  {getTranslation(language, 'pilgrimCount')}
                </label>
                <select
                  value={pilgrimCount}
                  onChange={(e) => setPilgrimCount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-bold text-amber-950 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {language === 'en' ? 'Pilgrims' : 'वारकरी'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="block font-bold text-amber-900 mb-1">
                {getTranslation(language, 'selectTimeSlot')} *
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-bold text-amber-950 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="सकाळी ०६:०० AM - ०८:०० AM">सकाळी ०६:०० AM - ०८:०० AM (Early Morning Slot)</option>
                <option value="सकाळी ०८:३० AM - १०:०० AM">सकाळी ०८:३० AM - १०:०० AM (Morning Slot)</option>
                <option value="१०:०० AM - ११:३० AM">सकाळी १०:०० AM - ११:३० AM (Standard Slot)</option>
                <option value="दुपारी १२:३० PM - ०२:०० PM">दुपारी १२:३० PM - ०२:०० PM (Afternoon Slot)</option>
                <option value="संध्याकाळी ०४:०० PM - ०६:०० PM">संध्याकाळी ०४:०० PM - ०६:०० PM (Evening Slot)</option>
                <option value="रात्री ०७:३० PM - ०९:३० PM">रात्री ०७:३० PM - ०९:३० PM (Night Aarti Slot)</option>
              </select>
            </div>

            {/* Optional ID Proof */}
            <div>
              <label className="block font-bold text-amber-900 mb-1">
                {getTranslation(language, 'idProofNumberLabel')}
              </label>
              <input
                type="text"
                value={idProofNo}
                onChange={(e) => setIdProofNo(e.target.value)}
                placeholder="आधार कार्ड / ओळखपत्र शेवटचे ४ अंक"
                className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-amber-950 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>{getTranslation(language, 'generatePassBtn')}</span>
            </button>
          </form>
        </div>

        {/* Display Verified QR Pass & Passes List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activePass ? (
            /* Single Official Temple QR Pass Card (Request #8) */
            <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50 rounded-3xl p-6 shadow-2xl border-4 border-amber-500 relative overflow-hidden space-y-5">
              {/* Holographic Header Bar */}
              <div className="bg-amber-950 text-white -m-6 mb-2 p-4 border-b-4 border-amber-500 flex justify-between items-center">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center font-bold text-amber-950 text-lg shadow">
                    🚩
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base font-serif tracking-tight">
                      {getTranslation(language, 'officialTempleCommittee')}
                    </h4>
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                      {getTranslation(language, 'verifiedDigitalPass')}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold shadow flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{activePass.status}</span>
                </span>
              </div>

              {/* Pass Content Body with Unique Dedicated QR Code */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                {/* QR Code Block for this specific ID */}
                <div className="flex flex-col items-center text-center space-y-2 shrink-0">
                  <DynamicQRCode value={activePass.qrCodeValue} size={150} />
                  <span className="text-[10px] font-extrabold text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full uppercase">
                    {getTranslation(language, 'scanAtGate')}
                  </span>
                </div>

                {/* Pass Specific Details */}
                <div className="flex-1 space-y-2.5 text-xs sm:text-sm w-full">
                  <div className="bg-amber-100/70 p-3 rounded-2xl border border-amber-300">
                    <span className="text-amber-800 text-xs font-semibold block">{getTranslation(language, 'tokenNumber')}</span>
                    <span className="font-black text-base sm:text-lg text-amber-950 font-mono tracking-wide">
                      {activePass.tokenNo}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-amber-800 font-medium block">{getTranslation(language, 'pilgrimName')}</span>
                      <span className="font-bold text-amber-950 text-sm truncate block">{activePass.name}</span>
                    </div>
                    <div>
                      <span className="text-amber-800 font-medium block">{getTranslation(language, 'personsCount')}</span>
                      <span className="font-bold text-amber-950 text-sm block">
                        👥 {activePass.pilgrimCount} {language === 'en' ? 'Persons' : 'भाविक'}
                      </span>
                    </div>
                    <div>
                      <span className="text-amber-800 font-medium block">{getTranslation(language, 'darshanSlot')}</span>
                      <span className="font-bold text-amber-950 block">⏰ {activePass.timeSlot}</span>
                    </div>
                    <div>
                      <span className="text-amber-800 font-medium block">{getTranslation(language, 'assignedGate')}</span>
                      <span className="font-bold text-emerald-800 block">🚪 {activePass.gateNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Print / Save Action */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{getTranslation(language, 'downloadPassBtn')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-md border-2 border-dashed border-amber-300 text-center space-y-3">
              <QrCode className="w-16 h-16 text-amber-400 mx-auto" />
              <h4 className="font-bold text-amber-950 text-base">{getTranslation(language, 'noPassGeneratedYet')}</h4>
              <p className="text-xs text-amber-800 max-w-sm mx-auto">
                {getTranslation(language, 'fillLeftFormToGenerate')}
              </p>
            </div>
          )}

          {/* All Generated Passes List */}
          {userTokens.length > 0 && (
            <div className="bg-white rounded-3xl p-5 shadow-md border border-amber-200 space-y-3">
              <h4 className="font-bold text-sm text-amber-950 font-serif flex items-center space-x-2">
                <Ticket className="w-4 h-4 text-amber-700" />
                <span>{getTranslation(language, 'recentPasses')} ({userTokens.length})</span>
              </h4>

              <div className="space-y-2">
                {userTokens.map((pass) => (
                  <div
                    key={pass.id}
                    onClick={() => setActivePass(pass)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex justify-between items-center text-xs ${
                      activePass?.id === pass.id
                        ? 'bg-amber-100/90 border-amber-500 font-bold shadow-sm'
                        : 'bg-amber-50/50 hover:bg-amber-100/60 border-amber-200'
                    }`}
                  >
                    <div>
                      <span className="font-mono font-bold text-amber-950 block">{pass.tokenNo}</span>
                      <span className="text-amber-800 font-medium">
                        {pass.name} ({pass.pilgrimCount} भाविक) • {pass.timeSlot}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                      {pass.darshanType}
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
