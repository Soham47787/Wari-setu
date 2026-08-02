import React, { useState, useEffect, useRef } from 'react';
import { Language, TabType } from '../types';
import { getTranslation } from '../translations';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, Navigation, Phone, HelpCircle, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectTab: (tab: TabType) => void;
  onTriggerSOS?: () => void;
}

export const VoiceAssistModal: React.FC<VoiceAssistModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectTab,
  onTriggerSOS,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const [assistantReply, setAssistantReply] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.9); // 0.8 for elderly pilgrims

  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setTranscript('');
          setMicError(null);
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
          if (event.results[0].isFinal) {
            handleVoiceCommand(currentTranscript);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
          
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            const errText = language === 'mr'
              ? 'मायक्रोफोन परवानगी नाकारली गेली आहे (Permission denied). खालील प्रश्न बटनांचा किंवा टायपिंग बॉक्सचा वापर करा.'
              : language === 'hi'
              ? 'माइक अनुमति अस्वीकृत (Permission denied)। कृपया नीचे दिए गए प्रश्नों या टाइपिंग बॉक्स का उपयोग करें।'
              : 'Microphone permission was denied. You can use the buttons below or type your query.';
            setMicError(errText);
          } else if (event.error === 'no-speech') {
            const errText = language === 'mr'
              ? 'कोणताही आवाज ऐकू आला नाही. कृपया पुन्हा बोला.'
              : language === 'hi'
              ? 'कोई आवाज नहीं सुनी गई। कृपया पुनः प्रयास करें।'
              : 'No speech was detected. Please try speaking again.';
            setMicError(errText);
          } else {
            const errText = language === 'mr'
              ? 'मायक्रोफोन संपर्क अयशस्वी. खालील पर्यायांवर क्लिक करून माहिती ऐका.'
              : language === 'hi'
              ? 'माइक कनेक्शन विफल। नीचे विकल्पों पर क्लिक करें।'
              : 'Voice recognition unavailable. Please select from quick options or type below.';
            setMicError(errText);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setMicError(
          language === 'mr'
            ? 'तुमच्या ब्राऊझरमध्ये व्हॉइस इनपुट उपलब्ध नाही. खालील प्रश्नांवर क्लिक करा.'
            : language === 'hi'
            ? 'आपके ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। नीचे प्रश्नों पर क्लिक करें।'
            : 'Speech recognition is not available in this browser. Please use quick options below.'
        );
      }
    }

    // Pre-trigger voice loading for browsers like Chrome/Edge
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  const toggleListening = () => {
    setMicError(null);
    if (!recognitionRef.current) {
      const noSupportMsg = language === 'mr'
        ? "मायक्रोफोन इनपुटसाठी तुमच्या ब्राऊझरला अनुमती द्या किंवा खालील प्रश्नांवर क्लिक करा."
        : language === 'hi'
        ? "माइक इनपुट के लिए अपने ब्राउज़र को अनुमति दें या नीचे दिए गए प्रश्नों पर क्लिक करें।"
        : "Speech recognition is not supported on this device. You can tap the sample question buttons below!";
      speakText(noSupportMsg);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      stopSpeaking();
      try {
        recognitionRef.current.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        recognitionRef.current.start();
      } catch (err: any) {
        console.warn('Start recognition error:', err);
        setIsListening(false);
        const errText = language === 'mr'
          ? 'मायक्रोफोन सुरू करता आला नाही. खालील प्रश्नांचा वापर करा.'
          : language === 'hi'
          ? 'माइक शुरू नहीं हो सका। नीचे दिए गए विकल्पों का उपयोग करें।'
          : 'Could not start microphone. Please use quick buttons below.';
        setMicError(errText);
      }
    }
  };

  // Voice resolution helper for reliable Marathi & Hindi speech output
  const getBestVoice = (lang: Language): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    if (lang === 'mr') {
      // 1. Check for dedicated Marathi voice (mr-IN, mr)
      const marathiVoice = voices.find(v => 
        v.lang.toLowerCase().includes('mr') || 
        v.name.toLowerCase().includes('marathi')
      );
      if (marathiVoice) return marathiVoice;

      // 2. Fallback to Hindi voice (both use Devanagari script, reads Marathi fluently)
      const hindiVoice = voices.find(v => 
        v.lang.toLowerCase().includes('hi') || 
        v.name.toLowerCase().includes('hindi')
      );
      if (hindiVoice) return hindiVoice;

      // 3. Fallback to any Indian region voice (e.g. en-IN)
      const indianVoice = voices.find(v => v.lang.toLowerCase().includes('in'));
      if (indianVoice) return indianVoice;
    } else if (lang === 'hi') {
      const hindiVoice = voices.find(v => 
        v.lang.toLowerCase().includes('hi') || 
        v.name.toLowerCase().includes('hindi')
      );
      if (hindiVoice) return hindiVoice;

      const marathiVoice = voices.find(v => 
        v.lang.toLowerCase().includes('mr') || 
        v.name.toLowerCase().includes('marathi')
      );
      if (marathiVoice) return marathiVoice;
    } else {
      const englishVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith('en')
      );
      if (englishVoice) return englishVoice;
    }

    return voices[0] || null;
  };

  // Clean text for speech engine (remove emojis and symbols)
  const sanitizeTextForSpeech = (rawText: string) => {
    return rawText
      .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      .replace(/[🚩🚨🗺️⛺🎵🛕🙏] /g, '')
      .replace(/१-टॅप/g, 'एक टॅप')
      .replace(/२,७५०/g, 'दोन हजार सातशे पन्नास')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const cleanText = sanitizeTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Get available voices
    const selectedVoice = getBestVoice(language);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      // If no voices list is populated yet, use Devanagari fallback hi-IN for Marathi if needed
      utterance.lang = language === 'mr' ? 'hi-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
    }

    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      // If Marathi failed with current lang setting, attempt instant fallback to hi-IN Devanagari
      if (language === 'mr' && utterance.lang !== 'hi-IN') {
        try {
          const fallbackUtterance = new SpeechSynthesisUtterance(cleanText);
          fallbackUtterance.lang = 'hi-IN';
          const fallbackVoice = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().includes('hi'));
          if (fallbackVoice) fallbackUtterance.voice = fallbackVoice;
          fallbackUtterance.rate = speechRate;
          fallbackUtterance.onstart = () => setIsSpeaking(true);
          fallbackUtterance.onend = () => setIsSpeaking(false);
          fallbackUtterance.onerror = () => setIsSpeaking(false);
          window.speechSynthesis.speak(fallbackUtterance);
          return;
        } catch (fallbackErr) {
          console.warn('Fallback speech failed:', fallbackErr);
        }
      }
      setIsSpeaking(false);
    };

    setAssistantReply(text);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Process Voice Query and Navigate / Provide Answer
  const handleVoiceCommand = (query: string) => {
    const q = query.toLowerCase();

    if (q.includes('गर्दी') || q.includes('दर्शन') || q.includes('कतार') || q.includes('crowd') || q.includes('queue') || q.includes('भीड़')) {
      const msg = language === 'mr'
        ? "राम कृष्ण हरी! श्री विठ्ठल मुख दर्शन वेळ सुमारे ४० मिनिटे आहे. ई-दर्शन पास स्क्रीन उघडत आहे."
        : language === 'hi'
        ? "राम कृष्ण हरि! श्री विट्ठल मुख दर्शन समय लगभग 40 मिनट है। ई-दर्शन पास स्क्रीन खोल रहे हैं।"
        : "Ram Krishna Hari! Current Mukh Darshan wait time is about 40 minutes. Opening Darshan Queue & Pass screen.";
      speakText(msg);
      setTimeout(() => {
        onSelectTab('crowd');
        onClose();
      }, 2500);
      return;
    }

    if (q.includes('नकाशा') || q.includes('मार्ग') || q.includes('पालखी') || q.includes('रिंगण') || q.includes('map') || q.includes('route')) {
      const msg = language === 'mr'
        ? "पालखी मार्ग व पंढरपूर शहर नकाशा उघडत आहे. येथे पिण्याचे पाणी, शौचालय व वैद्यकीय छावण्या पाहू शकता."
        : language === 'hi'
        ? "पालकी मार्ग एवं पंढरपुर मानचित्र खोल रहे हैं। यहां पानी, शौचालय एवं मेडिकल कैंप देख सकते हैं।"
        : "Opening Wari Interactive Map. You can view Palkhi route, drinking water, toilets and medical camps.";
      speakText(msg);
      setTimeout(() => {
        onSelectTab('map');
        onClose();
      }, 2500);
      return;
    }

    if (q.includes('निवास') || q.includes('अन्न') || q.includes('जेवण') || q.includes('खाट') || q.includes('stay') || q.includes('food') || q.includes('भोजन')) {
      const msg = language === 'mr'
        ? "विनामूल्य भक्त निवास व महाप्रसाद अन्नछत्र यादी उघडत आहे. पंढरपूरमध्ये २,७५० खाटा उपलब्ध आहेत."
        : language === 'hi'
        ? "निःशुल्क आवास व महाप्रसाद अन्नछत्र सूची खोल रहे हैं। पंढरपुर में 2,750 बिस्तर उपलब्ध हैं।"
        : "Opening Free Stays & Annachhatra Food Hubs. Over 2,750 free beds are available.";
      speakText(msg);
      setTimeout(() => {
        onSelectTab('stays');
        onClose();
      }, 2500);
      return;
    }

    if (q.includes('हरवले') || q.includes('नातेवाईक') || q.includes('मुल') || q.includes('lost') || q.includes('found') || q.includes('खोया')) {
      const msg = language === 'mr'
        ? "हरवलेले-सापडलेले शोध कक्ष उघडत आहे. येथे नातेवाईक किंवा वस्तूची शोध नोंदणी करा."
        : language === 'hi'
        ? "खोया-पाया सहायता केंद्र खोल रहे हैं। यहां गुमशुदा परिजन की रिपोर्ट दर्ज करें।"
        : "Opening Lost & Found Helpdesk. You can report or search missing family members here.";
      speakText(msg);
      setTimeout(() => {
        onSelectTab('lost');
        onClose();
      }, 2500);
      return;
    }

    if (q.includes('मदत') || q.includes('आणीबाणी') || q.includes('पोलिस') || q.includes('रुग्णवाहिका') || q.includes('sos') || q.includes('emergency') || q.includes('police')) {
      const msg = language === 'mr'
        ? "🚨 १-टॅप आणीबाणी मदत कक्ष उघडत आहे. १०८ रुग्णवाहिका किंवा १०० पोलीस मदत थेट जोडले जाईल."
        : language === 'hi'
        ? "🚨 आपातकालीन सहायता स्क्रीन खोल रहे हैं। 108 एम्बुलेंस या 100 पुलिस सेवा तुरंत उपलब्ध है।"
        : "🚨 Opening 1-Tap Emergency SOS. You can contact Ambulance 108 or Police 100 instantly.";
      speakText(msg);
      if (onTriggerSOS) onTriggerSOS();
      setTimeout(() => {
        onSelectTab('sos');
        onClose();
      }, 2500);
      return;
    }

    if (q.includes('अभंग') || q.includes('गाणी') || q.includes('आरोग्य') || q.includes('abhang') || q.includes('song')) {
      const msg = language === 'mr'
        ? "संत तुकाराम व संत ज्ञानेश्वर महाराज अभंग आणि वारकरी आरोग्य मार्गदर्शक उघडत आहे."
        : language === 'hi'
        ? "संत तुकाराम व संत ज्ञानेश्वर महाराज अभंग और स्वास्थ्य मार्गदर्शक खोल रहे हैं।"
        : "Opening Devotional Abhangs & Pilgrim Health Safety Guidelines.";
      speakText(msg);
      setTimeout(() => {
        onSelectTab('abhang');
        onClose();
      }, 2500);
      return;
    }

    // Default General Response
    const defaultMsg = language === 'mr'
      ? `मी समजले: "${query}". वारकरी सेवा ॲपमध्ये आपले स्वागत आहे! मी तुम्हाला दर्शन वेळ, ई-पास, वारी नकाशा, मोफत निवास किंवा आणीबाणी मदत मिळवून देऊ शकतो.`
      : language === 'hi'
      ? `मैंने सुना: "${query}"। वारकरी सेवा ऐप में स्वागत है! मैं दर्शन कतार, ई-पास, मानचित्र, आवास या आपातकालीन सहायता में मदद कर सकता हूँ।`
      : `I heard: "${query}". Welcome to WariSeva! I can guide you to live queue status, e-passes, route maps, free lodging, or emergency SOS.`;
    speakText(defaultMsg);
  };

  const sampleQueries = [
    {
      mr: "🚩 दर्शन वेळ व ई-पास माहिती सांगा",
      hi: "🚩 दर्शन समय व ई-पास जानकारी",
      en: "🚩 How long is the Darshan queue?",
      action: () => handleVoiceCommand("दर्शन वेळ")
    },
    {
      mr: "🗺️ पालखी मार्ग व पाणी नकाशे दाखवा",
      hi: "🗺️ पालकी मार्ग व जल मानचित्र",
      en: "🗺️ Show Wari route & water points",
      action: () => handleVoiceCommand("नकाशा")
    },
    {
      mr: "⛺ मोफत निवास व अन्नछत्र कुठे आहे?",
      hi: "⛺ निःशुल्क आवास व भोजन कहाँ है?",
      en: "⛺ Where are free stays & meals?",
      action: () => handleVoiceCommand("निवास")
    },
    {
      mr: "🚨 आणीबाणी रुग्णवाहिका १०८ मदत",
      hi: "🚨 आपातकालीन एम्बुलेंस 108 सहायता",
      en: "🚨 Emergency Ambulance & Police",
      action: () => handleVoiceCommand("आणीबाणी मदत")
    },
    {
      mr: "🎵 भक्ती अभंग व आरोग्य सल्ला",
      hi: "🎵 भक्ति अभंग व स्वास्थ्य सलाह",
      en: "🎵 Devotional Abhangs & Health Tips",
      action: () => handleVoiceCommand("अभंग")
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border-2 border-amber-500/40 overflow-hidden text-stone-900"
      >
        {/* Top Header Banner - Traditional Saffron Bhagwa Gradient */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 text-white flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl shadow-inner">
              🎙️
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest bg-amber-900/40 px-2.5 py-0.5 rounded-full text-amber-200 border border-amber-300/30">
                वारकरी आवाज सहाय्यक (VOICE ASSIST)
              </span>
              <h3 className="text-xl font-extrabold font-serif tracking-tight text-white mt-0.5">
                {language === 'mr' ? 'काय मदत हवी आहे? बोला...' : language === 'hi' ? 'क्या सहायता चाहिए? बोलें...' : 'How can I assist you? Speak...'}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-lg transition-colors border border-white/30"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Microphone Pulse Orb */}
          <div className="flex flex-col items-center justify-center space-y-3 py-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleListening}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all border-4 ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-300 ring-8 ring-rose-500/30 animate-pulse'
                  : 'bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white border-amber-200 shadow-amber-500/30'
              }`}
            >
              {isListening ? (
                <Mic className="w-10 h-10 animate-bounce text-white" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </motion.button>

            <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300/60">
              {isListening
                ? (language === 'mr' ? 'ऐकत आहे... बोला' : language === 'hi' ? 'सुन रहा हूँ... बोलें' : 'Listening...')
                : (language === 'mr' ? 'बोलण्यासाठी मायक्रोफोन टॅप करा' : language === 'hi' ? 'बोलने के लिए माइक दबाएं' : 'Tap Microphone to Speak')}
            </span>
          </div>

          {/* Mic Error / Permission Warning Banner */}
          {micError && (
            <div className="bg-amber-50 border-l-4 border-amber-600 p-3.5 rounded-r-2xl text-amber-900 text-xs font-semibold space-y-1 shadow-sm">
              <div className="flex items-center space-x-2 font-bold text-amber-950">
                <span>⚠️ {language === 'mr' ? 'व्हॉइस सूचना / माहिती' : language === 'hi' ? 'वॉइस सूचना' : 'Voice Status'}</span>
              </div>
              <p className="leading-relaxed">{micError}</p>
            </div>
          )}

          {/* Manual Text Fallback Query Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (textInput.trim()) {
                handleVoiceCommand(textInput);
                setTextInput('');
              }
            }}
            className="flex items-center space-x-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-300 focus-within:border-amber-500 transition-colors"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={
                language === 'mr'
                  ? 'येथे प्रश्न टाईप करा (उदा. दर्शन वेळ, निवास, नकाशा)...'
                  : language === 'hi'
                  ? 'प्रश्न टाइप करें (उदा. दर्शन समय, आवास)...'
                  : 'Type query (e.g. queue time, stays, map)...'
              }
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-sm"
            >
              {language === 'mr' ? 'शोधा' : language === 'hi' ? 'खोजें' : 'Ask'}
            </button>
          </form>

          {/* Heard Transcript Box */}
          {transcript && (
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-800">तुम्ही बोललात:</span>
              <p className="text-sm font-bold text-stone-900 font-serif">"{transcript}"</p>
            </div>
          )}

          {/* Assistant Vocal Response Box */}
          {assistantReply && (
            <div className="bg-stone-900 text-amber-100 p-4 rounded-2xl border border-amber-500/30 space-y-2 relative shadow-inner">
              <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>वारकरी डिजिटल मार्गदर्शक</span>
                </span>
                <button
                  onClick={isSpeaking ? stopSpeaking : () => speakText(assistantReply)}
                  className="text-xs text-amber-300 hover:text-white flex items-center space-x-1 font-bold bg-stone-800 px-2.5 py-1 rounded-lg border border-stone-700"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isSpeaking ? 'थांबवा' : 'पुन्हा ऐका'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                {assistantReply}
              </p>
            </div>
          )}

          {/* Quick Voice Prompt Buttons for Senior Pilgrims */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider flex items-center justify-between">
              <span>किंवा थेट क्लिक करून माहिती ऐका (Quick Tap Options)</span>
              {/* Voice Speed Selector */}
              <div className="flex items-center space-x-1 text-[11px] font-bold text-stone-600 bg-stone-100 p-1 rounded-xl">
                <span>गति:</span>
                {[0.75, 0.9, 1.1].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setSpeechRate(rate)}
                    className={`px-1.5 py-0.5 rounded ${speechRate === rate ? 'bg-amber-600 text-white font-black' : 'hover:bg-stone-200'}`}
                  >
                    {rate === 0.75 ? 'हळू' : rate === 0.9 ? 'मध्यम' : 'जलद'}
                  </button>
                ))}
              </div>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    q.action();
                  }}
                  className="text-left bg-stone-50 hover:bg-amber-50/80 p-3 rounded-2xl border border-stone-200 hover:border-amber-400 text-xs font-bold text-stone-800 transition-all flex justify-between items-center group shadow-sm"
                >
                  <span>{language === 'mr' ? q.mr : language === 'hi' ? q.hi : q.en}</span>
                  <Volume2 className="w-4 h-4 text-amber-600 opacity-60 group-hover:opacity-100 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 text-center text-xs text-stone-600 font-medium flex justify-between items-center">
          <span>🚩 जय जय राम कृष्ण हरी!</span>
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="bg-stone-900 text-amber-200 px-4 py-1.5 rounded-xl font-bold text-xs hover:bg-stone-800"
          >
            बंद करा (Close)
          </button>
        </div>
      </motion.div>
    </div>
  );
};
