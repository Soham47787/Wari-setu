import React, { useState } from 'react';
import { Language, SOSAlert } from '../types';
import { getTranslation } from '../translations';
import { ShieldAlert, PhoneCall, Ambulance, ShieldCheck, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import { emergencyHelplines } from '../data/wariData';

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
  const [selectedCategory, setSelectedCategory] = useState<'medical' | 'lost_child' | 'water_distress' | 'police' | 'mobility'>('medical');
  const [senderName, setSenderName] = useState('');
  const [phone, setPhone] = useState('');
  const [locationName, setLocationName] = useState('चंद्रभागा स्नान घाट (Pandharpur)');
  const [isSending, setIsSending] = useState(false);

  const handleTriggerSOS = () => {
    setIsSending(true);

    setTimeout(() => {
      const newAlert: SOSAlert = {
        id: `sos_${Date.now()}`,
        senderName: senderName || 'वारकरी भाविक (Pilgrim)',
        phone: phone || '९८२२०९९८८७',
        category: selectedCategory,
        locationName,
        lat: 17.6775,
        lng: 75.3239,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        status: 'assigned',
        responderInfo: 'वैद्यकीय पथक २ व १०८ रुग्णवाहिका (Dispatching Team - 3 mins away)'
      };

      onSendSOS(newAlert);
      setIsSending(false);
      alert("🚨 SOS आणीबाणी संदेश पाठवला गेला आहे! ५ मिनिटांत पथक पोहोचेल. (Emergency Team Dispatched)");
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Huge Urgent SOS Banner */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-700 text-white rounded-2xl p-6 shadow-xl border-4 border-red-400 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-red-400/40 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-300 animate-ping" />
              <h2 className="text-xl sm:text-2xl font-extrabold font-serif tracking-tight">
                {getTranslation(language, 'sosHeader')}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-xl">
              {getTranslation(language, 'sosDescription')}
            </p>
          </div>

          <div className="bg-red-950/60 p-3 rounded-xl border border-red-300/40 text-center shrink-0">
            <span className="text-xs text-red-200 block font-bold">आणीबाणी नियंत्रण कक्ष</span>
            <a href="tel:108" className="text-xl font-black text-amber-300 hover:underline">
              📞 108 / 112
            </a>
          </div>
        </div>

        {/* Big Pulse 1-Tap SOS Button */}
        <div className="flex flex-col items-center justify-center py-4 space-y-4">
          <button
            onClick={handleTriggerSOS}
            disabled={isSending}
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-red-500 via-red-600 to-red-800 text-white font-black text-xl sm:text-2xl border-8 border-red-300 shadow-2xl flex flex-col items-center justify-center transition-all transform hover:scale-105 active:scale-95 ${
              isSending ? 'animate-spin' : 'animate-pulse'
            }`}
          >
            <ShieldAlert className="w-16 h-16 text-amber-300 mb-2" />
            <span>{isSending ? 'पाठवत आहे...' : 'तात्काळ SOS'}</span>
            <span className="text-xs text-amber-200 font-semibold mt-1">1-TAP EMERGENCY</span>
          </button>
        </div>

        {/* SOS Category Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {[
            { id: 'medical', label: '🏥 वैद्यकीय मदत (Medical)', icon: '🚑' },
            { id: 'police', label: '👮 पोलीस / सुरक्षा (Police)', icon: '🛡️' },
            { id: 'lost_child', label: '👶 मूल हरवले (Lost Child)', icon: '👦' },
            { id: 'water_distress', label: '💧 पाणी टंचाई (Water/Food)', icon: '🥤' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center space-y-1 ${
                selectedCategory === cat.id
                  ? 'bg-amber-300 text-amber-950 border-2 border-white shadow-lg font-black'
                  : 'bg-red-900/60 text-red-100 hover:bg-red-800 border border-red-500/40'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Dispatched Responses Tracker */}
      {activeSosAlerts.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-red-300 space-y-3">
          <h3 className="font-extrabold text-base text-red-950 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span>सक्रिय मदत पथक पाठपुरावा (Active SOS Emergency Status)</span>
          </h3>

          <div className="space-y-3">
            {activeSosAlerts.map((sos) => (
              <div
                key={sos.id}
                className="p-4 rounded-xl border border-red-200 bg-red-50/50 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-red-900">{sos.senderName} ({sos.phone})</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-200 text-red-900 uppercase">
                      {sos.category}
                    </span>
                  </div>
                  <p className="text-xs text-red-800 mt-1">
                    📍 {sos.locationName} | वेळ: {sos.timestamp}
                  </p>
                  <p className="text-xs font-bold text-emerald-800 mt-1 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    🚑 {sos.responderInfo}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-600 text-white inline-block">
                    ✓ पथक मार्गस्थ (Assigned)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Helplines Quick Dial Grid */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-amber-200 space-y-4">
        <h3 className="font-extrabold text-base text-amber-950 font-serif flex items-center space-x-2">
          <PhoneCall className="w-5 h-5 text-amber-700" />
          <span>{getTranslation(language, 'helplinesTitle')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {emergencyHelplines.map((h, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-100 transition-all flex justify-between items-center"
            >
              <div>
                <span className="text-xs font-bold text-amber-900 block">{h.name}</span>
                <span className="text-[11px] text-amber-700">{h.role}</span>
              </div>
              <a
                href={`tel:${h.phone}`}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow transition-all flex items-center space-x-1"
              >
                <span>📞 {h.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
