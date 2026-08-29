import React, { useState, useEffect } from 'react';
import { Language, AccommodationItem, AnnachhatraItem, RoomBookingDetails, UserProfile } from '../types';
import { getTranslation } from '../translations';
import { BedDouble, Utensils, Phone, CheckCircle, Clock, MapPin, Search, Filter, ShieldCheck, Printer, Download, Sparkles, Building, Hotel } from 'lucide-react';

interface AccommodationViewProps {
  language: Language;
  accommodations: AccommodationItem[];
  annachhatras: AnnachhatraItem[];
  user?: UserProfile | null;
}

export const AccommodationView: React.FC<AccommodationViewProps> = ({
  language,
  accommodations,
  annachhatras,
  user,
}) => {
  const [activeTab, setActiveTab] = useState<'stays' | 'food'>('stays');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<string>('all');
  
  // Booking Modal State
  const [bookingModalItem, setBookingModalItem] = useState<AccommodationItem | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<RoomBookingDetails | null>(null);

  // Form Fields
  const [guestName, setGuestName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState('');
  const [idType, setIdType] = useState<'Aadhaar Card' | 'Voter ID' | 'Driving License' | 'Passport'>('Aadhaar Card');
  const [idNumber, setIdNumber] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkInSlot, setCheckInSlot] = useState('सकाळी ०८:०० AM - १०:०० AM');
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [roomType, setRoomType] = useState('विनामूल्य भक्त निवास खाट (Free Pilgrim Bed)');
  const [specialHelp, setSpecialHelp] = useState<string[]>([]);
  const [purpose, setPurpose] = useState('पंढरपूर आषाढी वारी दर्शन (Wari Pilgrimage)');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.emergencyContactPhone || user?.phone || '');

  useEffect(() => {
    if (user) {
      if (user.name) setGuestName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.emergencyContactPhone) setEmergencyPhone(user.emergencyContactPhone);
    }
  }, [user]);

  // Filter Stays
  const filteredAccommodations = accommodations.filter((acc) => {
    const nameMatch = acc.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
                      acc.address[language].toLowerCase().includes(searchQuery.toLowerCase());
    const facilityMatch = selectedFacility === 'all' || acc.facilities.includes(selectedFacility);
    return nameMatch && facilityMatch;
  });

  const handleOpenBooking = (item: AccommodationItem) => {
    setBookingModalItem(item);
    setConfirmedBooking(null);
  };

  const handleToggleSpecial = (feature: string) => {
    if (specialHelp.includes(feature)) {
      setSpecialHelp(specialHelp.filter(f => f !== feature));
    } else {
      setSpecialHelp([...specialHelp, feature]);
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone || !idNumber) {
      alert("कृपया नाव, फोन व ओळखपत्र नंबर भरा (Please fill required fields)");
      return;
    }

    const randomBookingRef = `BN-PND-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: RoomBookingDetails = {
      id: `book_${Date.now()}`,
      bookingRef: randomBookingRef,
      accommodationId: bookingModalItem?.id || 'acc_1',
      accommodationName: bookingModalItem?.name[language] || 'श्री विठ्ठल भक्त निवास',
      primaryGuestName: guestName,
      phone,
      email,
      idProofType: idType,
      idProofNumber: idNumber,
      adultCount: Number(adults),
      childCount: Number(children),
      seniorCitizenCount: Number(seniors),
      totalGuests: Number(adults) + Number(children) + Number(seniors),
      checkInDate,
      checkInTimeSlot: checkInSlot,
      checkOutDate,
      roomOrBedType: roomType,
      specialAssistance: specialHelp,
      purposeOfVisit: purpose,
      emergencyContactName: emergencyName || 'कुटुंब संपर्क',
      emergencyContactPhone: emergencyPhone || phone,
      bookedAt: new Date().toLocaleString('en-IN'),
      status: 'Confirmed'
    };

    setConfirmedBooking(newBooking);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white p-5 rounded-3xl shadow-lg border border-amber-700 space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold font-serif flex items-center space-x-2">
          <span>⛺</span>
          <span>{getTranslation(language, 'stayHeader')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-amber-200">
          {getTranslation(language, 'staySubheader')}
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex space-x-2 border-b border-amber-200 pb-2">
        <button
          onClick={() => setActiveTab('stays')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeTab === 'stays'
              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
              : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          <BedDouble className="w-4 h-4" />
          <span>{getTranslation(language, 'tabFreeStays')}</span>
        </button>

        <button
          onClick={() => setActiveTab('food')}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeTab === 'food'
              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
              : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>{getTranslation(language, 'tabAnnachhatra')}</span>
        </button>
      </div>

      {/* STAYS LIST TAB */}
      {activeTab === 'stays' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl shadow border border-amber-200 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="भक्त निवास, मठ, हॉटेल किंवा पत्ता शोधा..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-amber-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-amber-700 shrink-0" />
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="px-3 py-2 rounded-xl border border-amber-200 text-xs font-bold text-amber-950 bg-amber-50/50"
              >
                <option value="all">{getTranslation(language, 'allFacilities')}</option>
                <option value="Wheelchair Accessible">Wheelchair Accessible</option>
                <option value="24x7 Hot Water">24x7 Hot Water</option>
                <option value="Free Meals">Free Meals</option>
                <option value="Charging Station">Charging Station</option>
                <option value="AC Deluxe Rooms">AC Deluxe Rooms</option>
              </select>
            </div>
          </div>

          {/* Stays & Hotels Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAccommodations.map((acc) => (
              <div
                key={acc.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Header Badge */}
                  <div className="relative h-44 w-full bg-amber-100">
                    <img
                      src={acc.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=80"}
                      alt={acc.name[language]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full shadow ${
                        acc.isFree ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                      }`}>
                        {acc.isFree ? "विनामूल्य (100% Free)" : acc.pricePerNight}
                      </span>
                    </div>

                    <span className="absolute bottom-3 right-3 bg-black/75 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                      📍 {acc.distanceFromTempleKm} किमी मंदिरापासून
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-bold text-base text-amber-950 font-serif">
                      {acc.name[language]}
                    </h3>
                    <p className="text-xs text-amber-800">
                      📍 {acc.address[language]}
                    </p>

                    {/* Beds Availability */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-amber-50/70 p-2.5 rounded-2xl border border-amber-200">
                      <div>
                        <span className="text-amber-800 font-semibold block">{getTranslation(language, 'availableBeds')}</span>
                        <span className="font-black text-emerald-700 text-sm">{acc.availableBeds} खाटा शिल्लक</span>
                      </div>
                      <div>
                        <span className="text-amber-800 font-semibold block">{getTranslation(language, 'totalBeds')}</span>
                        <span className="font-bold text-amber-950 text-sm">{acc.totalBeds} क्षमता</span>
                      </div>
                    </div>

                    {/* Facility Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {acc.facilities.map((fac, idx) => (
                        <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-900 border border-amber-200">
                          ✓ {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 pt-0 flex gap-2">
                  <a
                    href={`tel:${acc.contactPhone}`}
                    className="flex-1 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs rounded-xl text-center transition-all flex items-center justify-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{getTranslation(language, 'callStayBtn')}</span>
                  </a>

                  <button
                    onClick={() => handleOpenBooking(acc)}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl text-center shadow transition-all flex items-center justify-center space-x-1"
                  >
                    <span>{getTranslation(language, 'bookBedBtn')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANNACHHATRA TAB */}
      {activeTab === 'food' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {annachhatras.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-3xl p-5 shadow-lg border-2 border-amber-200 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-950 uppercase">
                    अखंड महाप्रसाद
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    १००% विनामूल्य
                  </span>
                </div>

                <h3 className="font-bold text-base text-amber-950 font-serif">
                  {ann.organizer[language]}
                </h3>

                <p className="text-xs text-amber-800">
                  📍 {ann.location[language]}
                </p>

                <div className="space-y-1.5 text-xs bg-amber-50 p-3 rounded-2xl border border-amber-200">
                  <div className="flex justify-between">
                    <span className="font-bold text-amber-900">{getTranslation(language, 'servingTimes')}:</span>
                    <span className="font-semibold text-amber-950">{ann.servingTimes[language]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-amber-900">{getTranslation(language, 'menuToday')}:</span>
                    <span className="font-semibold text-amber-950">{ann.menuItems[language]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-amber-900">{getTranslation(language, 'dailyMealsCapacity')}:</span>
                    <span className="font-bold text-emerald-700">{ann.dailyMealsCapacity.toLocaleString()} भाविक/दिवस</span>
                  </div>
                </div>

                <a
                  href={`tel:${ann.contactPhone}`}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl block text-center shadow transition-all"
                >
                  📞 अन्नछत्र माहिती केंद्र: {ann.contactPhone}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GENUINE ROOM BOOKING MODAL (Request #11) */}
      {bookingModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-400 max-w-xl w-full overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white p-4 sm:p-5 flex justify-between items-center border-b border-amber-700">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center shadow">
                  <BedDouble className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg font-serif">
                    {confirmedBooking ? getTranslation(language, 'bookingVoucherTitle') : getTranslation(language, 'roomBookingModalTitle')}
                  </h3>
                  <p className="text-xs text-amber-200 truncate max-w-xs sm:max-w-md">
                    {bookingModalItem.name[language]}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setBookingModalItem(null);
                  setConfirmedBooking(null);
                }}
                className="w-8 h-8 rounded-full bg-amber-800 hover:bg-amber-700 text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {confirmedBooking ? (
                /* Official Booking Confirmation Voucher */
                <div className="space-y-4">
                  <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50 p-5 rounded-3xl border-4 border-amber-500 shadow-xl space-y-4 relative overflow-hidden">
                    <div className="flex justify-between items-start border-b border-amber-300 pb-3">
                      <div>
                        <span className="text-[10px] font-extrabold text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded-full uppercase">
                          अधिकृत भक्त निवास पावती
                        </span>
                        <h4 className="text-base font-bold text-amber-950 font-serif mt-1">
                          {confirmedBooking.accommodationName}
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold">
                        ✓ {confirmedBooking.status}
                      </span>
                    </div>

                    <div className="bg-amber-100/70 p-3 rounded-2xl border border-amber-300 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-amber-800 font-semibold block">{getTranslation(language, 'bookingRefNo')}</span>
                        <span className="font-black text-lg text-amber-950 font-mono">{confirmedBooking.bookingRef}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-amber-800 font-semibold block">{getTranslation(language, 'roomAllotment')}</span>
                        <span className="font-bold text-emerald-800 text-sm">कॉलम ब - खाट १४ ते १६</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-amber-800 font-medium block">{getTranslation(language, 'primaryGuestName')}</span>
                        <span className="font-bold text-amber-950 text-sm block">{confirmedBooking.primaryGuestName}</span>
                      </div>
                      <div>
                        <span className="text-amber-800 font-medium block">{getTranslation(language, 'phoneNo')}</span>
                        <span className="font-bold text-amber-950 text-sm block">{confirmedBooking.phone}</span>
                      </div>
                      <div>
                        <span className="text-amber-800 font-medium block">ओळखपत्र (ID Proof)</span>
                        <span className="font-bold text-amber-950 block">{confirmedBooking.idProofType}: {confirmedBooking.idProofNumber}</span>
                      </div>
                      <div>
                        <span className="text-amber-800 font-medium block">एकूण भाविक संख्या</span>
                        <span className="font-bold text-amber-950 block">👥 {confirmedBooking.totalGuests} व्यक्ती ({confirmedBooking.adultCount} मोठे, {confirmedBooking.childCount} मुले, {confirmedBooking.seniorCitizenCount} ज्येष्ठ)</span>
                      </div>
                      <div>
                        <span className="text-amber-800 font-medium block">आगमनाची तारीख व वेळ</span>
                        <span className="font-bold text-amber-950 block">📅 {confirmedBooking.checkInDate} ({confirmedBooking.checkInTimeSlot})</span>
                      </div>
                      <div>
                        <span className="text-amber-800 font-medium block">प्रस्थानाची तारीख</span>
                        <span className="font-bold text-amber-950 block">📅 {confirmedBooking.checkOutDate}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                      <p className="font-bold">⚠️ Check-in नियमावली:</p>
                      <p>१. आगमन वेळी मुख्य अतिथीचे मूळ आधार कार्ड / ओळखपत्र काउंटरवर दाखवणे अनिवार्य आहे.</p>
                      <p>२. २४ तास विनामूल्य गरम पाणी व सामान सुरक्षा लॉकर उपलब्ध आहे.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Printer className="w-4 h-4" />
                      <span>{getTranslation(language, 'downloadReceipt')}</span>
                    </button>
                    <button
                      onClick={() => setConfirmedBooking(null)}
                      className="flex-1 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs sm:text-sm rounded-xl transition-all"
                    >
                      {getTranslation(language, 'newBookingBtn')}
                    </button>
                  </div>
                </div>
              ) : (
                /* Detailed Genuine Reservation Form */
                <form onSubmit={handleConfirmReservation} className="space-y-4 text-xs sm:text-sm">
                  {/* Primary Guest Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-amber-950 mb-1">
                        {getTranslation(language, 'primaryGuestName')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="उदा. ज्ञानेश्वर विठ्ठल मोहिते"
                        className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-amber-950 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-amber-950 mb-1">
                        {getTranslation(language, 'phoneNo')} *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="९८२२०XXXXX"
                        className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/40 font-bold text-amber-950"
                      />
                    </div>
                  </div>

                  {/* ID Proof Verification Fields */}
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-amber-950 mb-1">
                        {getTranslation(language, 'idProofType')} *
                      </label>
                      <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-semibold text-amber-950"
                      >
                        <option value="Aadhaar Card">आधार कार्ड (Aadhaar Card)</option>
                        <option value="Voter ID">मतदान ओळखपत्र (Voter ID)</option>
                        <option value="Driving License">वाहन परवाना (Driving License)</option>
                        <option value="Passport">पासपोर्ट (Passport)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-amber-950 mb-1">
                        {getTranslation(language, 'idProofNo')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder="उदा. XXXX-XXXX-4567"
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-mono font-bold text-amber-950"
                      />
                    </div>
                  </div>

                  {/* Number of People Breakdown */}
                  <div>
                    <label className="block font-bold text-amber-950 mb-1.5">
                      भाविक संख्या वर्गीकरण (Pilgrim Breakdown) *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-amber-50 rounded-xl border border-amber-200">
                        <label className="text-[11px] font-bold text-amber-900 block">{getTranslation(language, 'adultsCount')}</label>
                        <input
                          type="number"
                          min={1}
                          max={20}
                          value={adults}
                          onChange={(e) => setAdults(Number(e.target.value))}
                          className="w-full p-1 font-bold text-center border border-amber-300 rounded-lg bg-white"
                        />
                      </div>

                      <div className="p-2 bg-amber-50 rounded-xl border border-amber-200">
                        <label className="text-[11px] font-bold text-amber-900 block">{getTranslation(language, 'childrenCount')}</label>
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={children}
                          onChange={(e) => setChildren(Number(e.target.value))}
                          className="w-full p-1 font-bold text-center border border-amber-300 rounded-lg bg-white"
                        />
                      </div>

                      <div className="p-2 bg-amber-50 rounded-xl border border-amber-200">
                        <label className="text-[11px] font-bold text-amber-900 block">{getTranslation(language, 'seniorCitizensCount')}</label>
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={seniors}
                          onChange={(e) => setSeniors(Number(e.target.value))}
                          className="w-full p-1 font-bold text-center border border-amber-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Check-In Date & Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-amber-950 mb-1">
                        {getTranslation(language, 'checkInDate')} *
                      </label>
                      <input
                        type="date"
                        required
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 text-amber-950 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-amber-950 mb-1">
                        {getTranslation(language, 'checkInSlot')}
                      </label>
                      <select
                        value={checkInSlot}
                        onChange={(e) => setCheckInSlot(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold text-amber-950"
                      >
                        <option value="सकाळी ०८:०० AM - १०:०० AM">सकाळी ०८:०० AM - १०:०० AM</option>
                        <option value="दुपारी १२:०० PM - ०२:०० PM">दुपारी १२:०० PM - ०२:०० PM</option>
                        <option value="संध्याकाळी ०५:०० PM - ०७:०० PM">संध्याकाळी ०५:०० PM - ०७:०० PM</option>
                        <option value="रात्री ०९:०० PM - ११:०० PM">रात्री ०९:०० PM - ११:०० PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Room Type */}
                  <div>
                    <label className="block font-bold text-amber-950 mb-1">
                      {getTranslation(language, 'roomType')}
                    </label>
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold text-amber-950"
                    >
                      <option value="विनामूल्य भक्त निवास खाट (Free Pilgrim Bed)">विनामूल्य भक्त निवास खाट (Free Pilgrim Bed)</option>
                      <option value="कुटुंब नॉन-एसी रूम (Family Non-AC Room)">कुटुंब नॉन-एसी रूम (Family Non-AC Room)</option>
                      <option value="एसी डीलक्स रूम (AC Deluxe Room)">एसी डीलक्स रूम (AC Deluxe Room)</option>
                      <option value="ज्येष्ठ नागरिक तळमजला खाट (Senior Citizen Ground Bed)">ज्येष्ठ नागरिक तळमजला खाट (Senior Citizen Ground Bed)</option>
                    </select>
                  </div>

                  {/* Special Assistance Checkboxes */}
                  <div>
                    <label className="block font-bold text-amber-950 mb-1.5">
                      {getTranslation(language, 'specialAssistance')}
                    </label>
                    <div className="space-y-1.5">
                      {[
                        { id: 'wheelchair', label: getTranslation(language, 'specialAssistanceWheelchair') },
                        { id: 'ground_floor', label: getTranslation(language, 'specialAssistanceGroundFloor') },
                        { id: 'hot_water', label: getTranslation(language, 'specialAssistanceHotWater') },
                      ].map((s) => (
                        <label key={s.id} className="flex items-center space-x-2 p-2 rounded-xl bg-amber-50/60 border border-amber-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={specialHelp.includes(s.id)}
                            onChange={() => handleToggleSpecial(s.id)}
                            className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                          />
                          <span className="text-xs font-semibold text-amber-950">{s.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all"
                  >
                    {getTranslation(language, 'confirmBookingBtn')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
