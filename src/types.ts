export type Language = 'mr' | 'hi' | 'en';

export type TabType = 
  | 'home' 
  | 'crowd' 
  | 'map' 
  | 'stays' 
  | 'lost' 
  | 'sos' 
  | 'abhang' 
  | 'volunteer';

export interface PilgrimProfile {
  id: string;
  name: string;
  phone: string;
  isLoggedIn: boolean;
  language: Language;
}

export interface CrowdStatus {
  lastUpdated: string;
  crowdLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  mukhDarshanWaitMins: number;
  charanSparshWaitHours: number;
  queueLengthMeters: number;
  activeGates: string[];
  noticeMessage: {
    mr: string;
    hi: string;
    en: string;
  };
}

export interface DarshanToken {
  id: string;
  tokenNo: string;
  name: string;
  phone: string;
  pilgrimCount: number;
  timeSlot: string;
  gateNumber: string;
  darshanType: 'Mukh' | 'CharanSparsh';
  date: string;
  qrCodeValue: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface MapPoint {
  id: string;
  title: {
    mr: string;
    hi: string;
    en: string;
  };
  category: 'palkhi' | 'temple' | 'water' | 'medical' | 'stay' | 'food' | 'toilet' | 'ringan';
  lat: number;
  lng: number;
  description: {
    mr: string;
    hi: string;
    en: string;
  };
  contactPhone?: string;
  occupancyOrStatus?: string;
}

export interface AccommodationItem {
  id: string;
  name: {
    mr: string;
    hi: string;
    en: string;
  };
  type: 'BhaktaNiwas' | 'Matha' | 'School' | 'TentCity' | 'PrivateCamp';
  address: {
    mr: string;
    hi: string;
    en: string;
  };
  distanceFromTempleKm: number;
  totalBeds: number;
  availableBeds: number;
  isFree: boolean;
  contactPhone: string;
  facilities: string[]; // e.g. ['wheelchair', 'hotwater', 'food', 'charging', 'medical']
  lat: number;
  lng: number;
}

export interface AnnachhatraItem {
  id: string;
  organizer: {
    mr: string;
    hi: string;
    en: string;
  };
  location: {
    mr: string;
    hi: string;
    en: string;
  };
  servingTimes: {
    mr: string;
    hi: string;
    en: string;
  };
  menuItems: {
    mr: string;
    hi: string;
    en: string;
  };
  dailyMealsCapacity: number;
  contactPhone: string;
}

export interface LostItem {
  id: string;
  type: 'person' | 'belonging';
  name: string;
  age?: number;
  gender?: string;
  photoUrl: string;
  lastSeenLocation: {
    mr: string;
    hi: string;
    en: string;
  };
  missingSince: string;
  contactPerson: string;
  contactPhone: string;
  description: {
    mr: string;
    hi: string;
    en: string;
  };
  status: 'missing' | 'found';
  audioNoteUrl?: string;
}

export interface SOSAlert {
  id: string;
  senderName: string;
  phone: string;
  category: 'medical' | 'lost_child' | 'water_distress' | 'police' | 'mobility';
  locationName: string;
  lat?: number;
  lng?: number;
  timestamp: string;
  status: 'active' | 'assigned' | 'resolved';
  responderInfo?: string;
}

export interface AbhangItem {
  id: string;
  title: string;
  saint: string;
  lyricsMr: string;
  lyricsHi: string;
  translationEn: string;
  audioUrl?: string;
}
