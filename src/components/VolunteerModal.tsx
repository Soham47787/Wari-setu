import React, { useState } from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { HandHeart, CheckCircle, Heart, User } from 'lucide-react';

interface VolunteerModalProps {
  language: Language;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ language }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sevaType, setSevaType] = useState('अन्नछत्र सेवा (Food Service)');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("कृपया नाव व फोन नंबर भरा (Fill required fields)");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-amber-900 text-white p-5 rounded-2xl shadow-md border border-amber-700 space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold font-serif flex items-center space-x-2">
          <span>🤝</span>
          <span>{getTranslation(language, 'volunteerHeader')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-amber-200">
          श्री विठ्ठल रुक्मिणी पंढरपूर वारीमध्ये वारकऱ्यांच्या सेवेसाठी स्वयंसेवक म्हणून सहभाग नोंदवा.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-xl border border-amber-200 space-y-4">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-amber-950 font-serif">
              राम कृष्ण हरी! सेवा नोंदणी पूर्ण झाली!
            </h3>
            <p className="text-xs sm:text-sm text-amber-800">
              वारी सेवा नियंत्रण कक्षाकडून तुम्हाला लवकरच कामाचे ठिकाण व वेळ मॅप केली जाईल.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow"
            >
              नवी नोंदणी करा
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <h3 className="font-extrabold text-base text-amber-950 font-serif border-b border-amber-200 pb-2">
              {getTranslation(language, 'volunteerFormTitle')}
            </h3>

            <div>
              <label className="block font-bold text-amber-900 mb-1">
                स्वयंसेवकाचे नाव *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="उदा. माऊली गायकवाड"
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  मोबाईल नंबर *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="९८२२०XXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  तुमचे शहर / गाव
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="उदा. पुणे / सोलापूर"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-amber-900 mb-1">
                तुम्हाला आवडणारा सेवा प्रकार
              </label>
              <select
                value={sevaType}
                onChange={(e) => setSevaType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold text-amber-950"
              >
                <option value="अन्नछत्र सेवा (Food Service)">🍲 अन्नछत्र व महाप्रसाद वाटप</option>
                <option value="वैद्यकीय मदत (Medical Assistance)">🏥 प्राथमिक वैद्यकीय मदत व मलमपट्टी</option>
                <option value="गर्दी व्यवस्थापन (Crowd Control)">👥 दर्शन रांग व गर्दी नियंत्रण</option>
                <option value="हरवलेले शोधा (Lost & Found Help)">🔍 हरवलेल्या व्यक्ती शोध व मदत केंद्र</option>
                <option value="जल सेवा (Water Distribution)">💧 पिण्याचे पाणी वितरण सेवा</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-extrabold py-3 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <HandHeart className="w-5 h-5 text-amber-200" />
              <span>{getTranslation(language, 'submitSevaBtn')}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
