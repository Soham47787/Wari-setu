import React from 'react';
import { Language, TabType } from '../types';
import { getTranslation } from '../translations';
import { Home, Users, Map, BedDouble, Search, AlertOctagon, Music, HandHeart, UserCheck } from 'lucide-react';

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
    },
    {
      id: 'profile' as TabType,
      labelKey: 'navProfile' as const,
      icon: UserCheck,
      badge: null,
    }
  ];

  return (
    <nav className="bg-amber-900 text-amber-100 border-b border-amber-700/60 sticky top-[68px] sm:top-[72px] z-40 shadow-md overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center space-x-1 sm:space-x-2 py-1.5 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 whitespace-nowrap ${
                tab.isEmergency && !isActive
                  ? 'bg-red-900/60 text-red-200 border border-red-500/50 hover:bg-red-800/80'
                  : isActive
                  ? 'bg-amber-100 text-amber-950 font-bold shadow-md ring-2 ring-amber-400 scale-[1.02]'
                  : 'text-amber-100/90 hover:bg-amber-800/60 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-amber-800' : tab.isEmergency ? 'text-red-400' : 'text-amber-300'}`} />
              <span>{getTranslation(language, tab.labelKey)}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 font-extrabold rounded-full ${
                  tab.isEmergency
                    ? 'bg-red-600 text-white animate-pulse'
                    : isActive
                    ? 'bg-amber-700 text-white'
                    : 'bg-amber-800 text-amber-200'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
