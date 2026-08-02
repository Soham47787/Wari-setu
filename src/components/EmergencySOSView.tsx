import React, { useState } from 'react';
import { Language, SOSAlert } from '../types';
import { getTranslation } from '../translations';
import { AlertOctagon, Phone, ShieldCheck, MapPin, HeartPulse, Stethoscope, Compass, CheckCircle, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EmergencySOSViewProps {
  language: Language;
  onSendSOS: (alert: SOSAlert) => void;
  activeSosAlerts: SOSAlert[];
}

export const EmergencySOSView: React.FC<EmergencySOSViewProps> = ({
  language,
  onSendSOS,
  activeSosAlerts,
}) => {
  const [sosCategory, setSosCategory] = useState<'medical' | 'lost_child' | 'police' | 'mobility'>('medical');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [locationName, setLocationName] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleTriggerSOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert("कृपया नाव व फोन प्रविष्ट करा / Please enter name and phone");
      return;
    }

    const newAlert: SOSAlert = {
      id: `sos_${Date.now()}`,
      senderName: userName,
      phone: userPhone,
      category: sosCategory,
      locationName: locationName || 'चंद्रभागा घाट परिसर, पंढरपूर (GPS Auto-located)',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'active'
    };

    onSendSOS(newAlert);
    setIsSent(true);
    setTimeout(() => setIsSent(false), 8000);
  };

  const emergencyContacts = [
    { name: 'पोलीस नियंत्रण कक्ष (Police Control)', phone: '100', icon: ShieldCheck, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { name: 'रुग्णवाहिका / रुग्णालय (Ambulance)', phone: '108', icon: HeartPulse, color: 'text-rose-700 bg-rose-50 border-rose-200' },
    { name: 'आपत्ती व्यवस्थापन (Disaster Cell)', phone: '1077', icon: Compass, color: 'text-amber-800 bg-amber-50 border-amber-200' },
    { name: 'अग्निशामक दल (Fire Station)', phone: '101', icon: Flame, color: 'text-orange-700 bg-orange-50 border-orange-200' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner - Rose & Dark Slate Emergency Accent */}
      <div className="bg-gradient-to-r from-stone-950 via-rose-950 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-rose-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center space-x-1.5 w-fit shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>२४x७ आणीबाणी सेवा (24x7 SOS HELP)</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
            {getTranslation(language, 'cardSosTitle')}
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl font-sans">
            वैद्यकीय आणीबाणी, पोलिस मदत किंवा गंभीर प्रसंगी १-टॅप थेट मदत संदेश पाठवा.
          </p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-md p-4 rounded-2xl border border-rose-500/30 shrink-0 text-center space-y-1">
          <span className="text-[10px] text-stone-400 block font-semibold uppercase tracking-wider">थेट हेल्पलाइन</span>
          <a href="tel:108" className="text-2xl font-black text-rose-400 font-mono tracking-wider hover:underline block">
            📞 १०८ / १००
          </a>
        </div>
      </div>

      {/* Main Grid: SOS Trigger + Helpline Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trigger Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-stone-200/90 space-y-5">
          <div className="border-b border-stone-100 pb-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                तात्काळ मदत संदेश पाठवा (Send Emergency SOS)
              </h3>
              <p className="text-xs text-stone-500">
                तुमचे GPS स्थान व माहिती नियंत्रण कक्षाला त्वरित पाठवली जाईल.
              </p>
            </div>
          </div>

          <form onSubmit={handleTriggerSOS} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">आणीबाणी प्रकार निवडा</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'medical', label: '🏥 वैद्यकीय (Medical)', bg: 'hover:bg-rose-50' },
                  { id: 'police', label: '👮 पोलिस मदत', bg: 'hover:bg-blue-50' },
                  { id: 'lost_child', label: '👶 मुल हरवले', bg: 'hover:bg-amber-50' },
                  { id: 'mobility', label: '♿ व्हीलचेअर / इतर', bg: 'hover:bg-stone-50' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSosCategory(cat.id as any)}
                    className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all ${
                      sosCategory === cat.id
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : `bg-stone-50 text-stone-700 border-stone-200 ${cat.bg}`
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">तुमचे नाव *</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="उदा. बबन शिंदे"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 bg-stone-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">मोबाईल नंबर *</label>
                <input
                  type="tel"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="९८२२०XXXXX"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 bg-stone-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">सध्याचे स्थान / ठिकाण</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="चंद्रभागा महाद्वार घाट जवळ (GPS स्वयंचलित...)"
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 bg-stone-50"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-700 hover:to-red-800 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 border border-rose-500/40"
            >
              <AlertOctagon className="w-5 h-5 text-white animate-pulse" />
              <span>तात्काळ मदत पाठवा (Send Emergency SOS)</span>
            </motion.button>
          </form>

          {/* Alert Sent Success Banner */}
          <AnimatePresence>
            {isSent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-950 text-xs flex items-center space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <strong className="font-bold text-sm block">SOS संदेश यशस्वीपणे पाठवला!</strong>
                  <span>पंढरपूर नियंत्रण कक्ष व जवळच्या रुग्णवाहिकेला माहिती पाठवली आहे.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Emergency Contacts Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/90 space-y-4">
            <h3 className="text-base font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
              थेट आणीबाणी दूरध्वनी (Direct Emergency Numbers)
            </h3>

            <div className="space-y-3">
              {emergencyContacts.map((contact, i) => {
                const Icon = contact.icon;
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border flex justify-between items-center ${contact.color}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="font-bold text-xs">{contact.name}</span>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="bg-stone-950 text-white font-mono font-black text-xs px-3.5 py-2 rounded-xl hover:bg-stone-800 transition-colors shadow"
                    >
                      📞 {contact.phone}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Alerts List */}
          {activeSosAlerts.length > 0 && (
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-200 space-y-3">
              <h4 className="font-bold text-xs text-stone-800">सक्रिय SOS संदेश ({activeSosAlerts.length})</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {activeSosAlerts.map((a) => (
                  <div key={a.id} className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-rose-950 block">{a.senderName} ({a.category})</span>
                      <span className="text-stone-600 text-[11px]">{a.locationName}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white">
                      {a.timestamp}
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
