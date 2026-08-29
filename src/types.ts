export type Language = 'mr' | 'hi' | 'en';

export type TabType = 
  | 'home' 
  | 'crowd' 
  | 'map' 
  | 'stays' 
  | 'lost' 
  | 'sos' 
  | 'abhang' 
  | 'volunteer'
  | 'profile'
  | 'admin'
  | 'services';

export type UserRole = 
  | 'warkari' 
  | 'volunteer' 
  | 'dindi_pramukh' 
  | 'trustee' 
  | 'medical_staff' 
  | 'police_security'
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  city: string;
  gender: 'male' | 'female' | 'other' | string;
  email?: string;
  role: UserRole;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  district?: string;
  dindiName?: string;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  avatarUrl?: string;
}

export interface VolunteerMember {
  id: string;
  name: string;
  phone: string;
  city: string;
  sevaType: string;
  assignedLocation: {
    mr: string;
    hi: string;
    en: string;
  };
  status: 'on_duty' | 'off_duty';
  registeredAt: string;
  badgeNumber: string;
  bloodGroup?: string;
  avatarUrl?: string;
}

export interface LandmarkLocation {
  id: string;
  name: {
    mr: string;
    hi: string;
    en: string;
  };
  category: string;
  lat: number;
  lng: number;
  description: {
    mr: string;
    hi: string;
    en: string;
  };
}

export type TempleOpenStatus = 'Open' | 'Closed' | 'Aarti' | 'SpecialDarshan' | 'Cleaning';

export interface CrowdStatus {
  lastUpdated: {
    mr: string;
    hi: string;
    en: string;
  };
  templeStatus: TempleOpenStatus;
  templeStatusText?: {
    mr: string;
    hi: string;
    en: string;
  };
  darshanDate: string;
  templeHours: string;
  crowdLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  mukhDarshanWaitMins: number;
  charanSparshWaitHours: number;
  queueLengthMeters: number;
  nextAartiName?: {
    mr: string;
    hi: string;
    en: string;
  };
  nextAartiTime?: string;
  vipQueueStatus?: 'Open' | 'Restricted' | 'Closed';
  seniorCitizenQueueStatus?: 'Open' | 'Priority Line Active' | 'Closed';
  palkhiStageLocation?: {
    mr: string;
    hi: string;
    en: string;
  };
  activeGates: {
    mr: string;
    hi: string;
    en: string;
    status?: 'open' | 'restricted' | 'closed';
  }[];
  noticeMessage: {
    mr: string;
    hi: string;
    en: string;
  };
  emergencyBroadcastNotice?: string;
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
  idProofNumber?: string;
}

export type MapCategory = 
  | 'palkhi' 
  | 'temple' 
  | 'hotel'
  | 'stay' 
  | 'food' 
  | 'water' 
  | 'medical' 
  | 'parking'
  | 'shoe_stand'
  | 'toilet' 
  | 'ringan';

export interface MapPoint {
  id: string;
  title: {
    mr: string;
    hi: string;
    en: string;
  };
  category: MapCategory;
  lat: number;
  lng: number;
  description: {
    mr: string;
    hi: string;
    en: string;
  };
  contactPhone?: string;
  occupancyOrStatus?: {
    mr: string;
    hi: string;
    en: string;
  };
  priceOrFree?: {
    mr: string;
    hi: string;
    en: string;
  };
  address?: {
    mr: string;
    hi: string;
    en: string;
  };
}

export interface RoomBookingDetails {
  id: string;
  bookingRef: string;
  accommodationId: string;
  accommodationName: string;
  primaryGuestName: string;
  phone: string;
  email?: string;
  idProofType: 'Aadhaar Card' | 'Voter ID' | 'Driving License' | 'Passport';
  idProofNumber: string;
  adultCount: number;
  childCount: number;
  seniorCitizenCount: number;
  totalGuests: number;
  checkInDate: string;
  checkInTimeSlot: string;
  checkOutDate: string;
  roomOrBedType: string;
  specialAssistance: string[];
  purposeOfVisit: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bookedAt: string;
  status: 'Confirmed' | 'Checked-In' | 'Cancelled';
}

export interface AccommodationItem {
  id: string;
  name: {
    mr: string;
    hi: string;
    en: string;
  };
  type: 'BhaktaNiwas' | 'Hotel' | 'Matha' | 'School' | 'TentCity' | 'PrivateCamp';
  address: {
    mr: string;
    hi: string;
    en: string;
  };
  distanceFromTempleKm: number;
  totalBeds: number;
  availableBeds: number;
  isFree: boolean;
  pricePerNight?: string;
  contactPhone: string;
  facilities: string[];
  lat: number;
  lng: number;
  image?: string;
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
  missingSince: {
    mr: string;
    hi: string;
    en: string;
  };
  contactPerson: string;
  contactPhone: string;
  description: {
    mr: string;
    hi: string;
    en: string;
  };
  status: 'missing' | 'found';
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
  responderInfo?: {
    mr: string;
    hi: string;
    en: string;
  };
}

export interface AbhangItem {
  id: string;
  title: {
    mr: string;
    hi: string;
    en: string;
  };
  saint: {
    mr: string;
    hi: string;
    en: string;
  };
  singer: {
    mr: string;
    hi: string;
    en: string;
  };
  lyrics: {
    mr: string;
    hi: string;
    en: string;
  };
  translationEn: string;
  youtubeUrl: string;
  youtubeId: string;
  duration: string;
  thumbnail: string;
}
