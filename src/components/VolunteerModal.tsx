import React, { useState } from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { HandHeart, CheckCircle, User, Phone, MapPin, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VolunteerModalProps {
  language: Language;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ language }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('MedicalAssist');
  const [location, setLocation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("कृपया नाव व फोन नंबर भरा / Please enter name and phone number");
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Top Banner - Deep Slate & Warm Gold */}
      <div className="bg-gradient-to-r from-[#1C1815] via-[#2A241F] to-[#141210] rounded-3xl p-6 text-white shadow-xl border border-amber-500/20 text-center space-y-2">
        <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-amber-400 text-stone-950 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-md">
          🤲
        </div>
        <h2 className="text-2xl font-black font-serif tracking-tight text-amber-100">
          {getTranslation(language, 'volunteerHeader')}
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto">
          वारी सोहळ्यात अन्नछत्र, वैद्यकीय मदत किंवा मार्गदर्शनासाठी स्वयंसेवक (सेवेकरी) म्हणून योगदान द्या.
        </p>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 text-center space-y-4 shadow-sm"
        >
          <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-md">
            ✓
          </div>
          <h3 className="text-xl font-black text-emerald-950 font-serif">
            धन्यवाद! तुमची सेवा नोंदणी यशस्वी झाली.
          </h3>
          <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
            वारकरी सेवा समन्वय कक्ष तुमच्याशी लवकरच संपर्क साधेल. <br />
            <strong>राम कृष्ण हरी! 🙏</strong>
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all"
          >
            नवीन नोंदणी करा
          </button>
        </motion.div>
      ) : (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-stone-500" />
                <span>सेवेकऱ्याचे नाव *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="उदा. तुकाराम पाटील"
                className="w-full px-4 py-3 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>मोबाईल नंबर *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="९८२२०XXXXX"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">सेवा प्रकार निवडा</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50 font-semibold"
                >
                  <option value="MedicalAssist">🏥 वैद्यकीय साहाय्यक (Doctor / Nurse)</option>
                  <option value="FoodSeva">🍲 अन्नछत्र वाढणे / वितरण (Food Seva)</option>
                  <option value="CrowdControl">👥 गर्दी नियंत्रण व मार्गदर्शन (Crowd Guide)</option>
                  <option value="Cleanliness">🧹 स्वच्छता अभियान (Cleanliness Seva)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>उपलब्ध शहर / स्थान</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="उदा. पंढरपूर किंवा वाखरी"
                className="w-full px-4 py-3 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-stone-50"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-black text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>सेवेकरी म्हणून नोंदणी करा (Register as Sevakari)</span>
            </motion.button>
          </form>
        </div>
      )}
    </div>
  );
};
