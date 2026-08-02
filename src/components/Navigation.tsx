import React from 'react';
import { Language, TabType } from '../types';
import { getTranslation } from '../translations';
import { Home, Users, Map, BedDouble, Search, AlertOctagon, Music, HandHeart } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  language,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      labelKey: 'navHome' as const,
      icon: Home,
      badge: null,
    },
    {
      id: 'crowd' as TabType,
      labelKey: 'navCrowd' as const,
      icon: Users,
      badge: 'LIVE',
    },
    {
      id: 'map' as TabType,
      labelKey: 'navMap' as const,
      icon: Map,
      badge: 'GPS',
    },
    {
      id: 'stays' as TabType,
      labelKey: 'navStays' as const,
      icon: BedDouble,
      badge: 'FREE',
    },
    {
      id: 'lost' as TabType,
      labelKey: 'navLost' as const,
      icon: Search,
      badge: null,
    },
    {
      id: 'sos' as TabType,
      labelKey: 'navSos' as const,
      icon: AlertOctagon,
      badge: 'SOS',
      isEmergency: true,
    },
    {
      id: 'abhang' as TabType,
      labelKey: 'navAbhang' as const,
      icon: Music,
      badge: null,
    },
    {
      id: 'volunteer' as TabType,
      labelKey: 'navVolunteer' as const,
      icon: HandHeart,
      badge: null,
    }
  ];

  return (
    <nav className="bg-[#FFFBF0] border-b border-amber-900/15 sticky top-[72px] sm:top-[76px] z-40 shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center space-x-2 whitespace-nowrap ${
                tab.isEmergency && !isActive
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100/80'
                  : isActive
                  ? 'text-white font-black shadow-md'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-amber-100/60'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-xl border border-amber-500 shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center space-x-2">
                <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                  isActive ? 'text-amber-100' : tab.isEmergency ? 'text-rose-600' : 'text-stone-500'
                }`} />
                <span>{getTranslation(language, tab.labelKey)}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 font-extrabold rounded-full ${
                    tab.isEmergency
                      ? 'bg-rose-600 text-white'
                      : isActive
                      ? 'bg-amber-100 text-amber-950 font-black'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
