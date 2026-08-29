import React, { useEffect, useRef, useState } from 'react';
import { Language, MapPoint, MapCategory } from '../types';
import { getTranslation } from '../translations';
import L from 'leaflet';
import { Phone, Navigation, MapPin } from 'lucide-react';

interface InteractiveMapProps {
  language: Language;
  mapPoints: MapPoint[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  language,
  mapPoints,
  selectedCategory,
  onSelectCategory,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Pandharpur Vitthal Temple Center
      const map = L.map(mapContainerRef.current, {
        center: [17.6775, 75.3239],
        zoom: 14,
        zoomControl: true,
      });

      // OpenStreetMap Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | WariSeva Maps',
        maxZoom: 19,
      }).addTo(map);

      // Polyline for Wari Palkhi Route Stage
      const wariRouteCoords: [number, number][] = [
        [18.6750, 73.8960], // Alandi
        [18.5204, 73.8567], // Pune
        [18.2612, 74.0280], // Saswad
        [18.0300, 74.1900], // Lonand
        [17.9800, 74.4300], // Phaltan
        [17.8200, 74.9000], // Malshiras
        [17.7010, 75.3020], // Wakhari Ringan
        [17.6775, 75.3239]  // Pandharpur Vitthal Temple
      ];

      L.polyline(wariRouteCoords, {
        color: '#E65100',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers on Filter Change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const filtered = selectedCategory === 'all'
      ? mapPoints
      : mapPoints.filter(p => p.category === selectedCategory);

    filtered.forEach((pt) => {
      let iconEmoji = '📍';
      let bgColor = 'bg-amber-600';

      if (pt.category === 'hotel') {
        iconEmoji = '🏨';
        bgColor = 'bg-indigo-600';
      } else if (pt.category === 'palkhi') {
        iconEmoji = '🚩';
        bgColor = 'bg-red-600 animate-bounce';
      } else if (pt.category === 'temple') {
        iconEmoji = '🛕';
        bgColor = 'bg-amber-600 ring-2 ring-yellow-400';
      } else if (pt.category === 'water') {
        iconEmoji = '💧';
        bgColor = 'bg-blue-600';
      } else if (pt.category === 'medical') {
        iconEmoji = '🏥';
        bgColor = 'bg-red-500';
      } else if (pt.category === 'stay') {
        iconEmoji = '⛺';
        bgColor = 'bg-emerald-600';
      } else if (pt.category === 'food') {
        iconEmoji = '🍲';
        bgColor = 'bg-orange-500';
      } else if (pt.category === 'parking') {
        iconEmoji = '🅿️';
        bgColor = 'bg-slate-700';
      } else if (pt.category === 'shoe_stand') {
        iconEmoji = '👟';
        bgColor = 'bg-teal-600';
      } else if (pt.category === 'toilet') {
        iconEmoji = '🚻';
        bgColor = 'bg-purple-600';
      } else if (pt.category === 'ringan') {
        iconEmoji = '🐎';
        bgColor = 'bg-amber-700';
      }

      // Create Custom DivIcon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="w-9 h-9 ${bgColor} text-white rounded-full flex items-center justify-center font-bold shadow-xl border-2 border-white transform transition-transform hover:scale-125 cursor-pointer text-base">
            ${iconEmoji}
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([pt.lat, pt.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedPoint(pt);
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [mapPoints, selectedCategory]);

  // Find User Location
  const handleFindMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };

          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([coords.lat, coords.lng], 15);

            const userIcon = L.divIcon({
              className: 'user-pin',
              html: `
                <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold ring-4 ring-blue-300 animate-pulse text-lg shadow-xl">
                  🚶
                </div>
              `,
              iconSize: [40, 40],
              iconAnchor: [20, 20]
            });

            L.marker([coords.lat, coords.lng], { icon: userIcon })
              .addTo(mapInstanceRef.current)
              .bindPopup("<b>तुम्ही येथे आहात (Your Location)</b>")
              .openPopup();
          }
        },
        () => {
          alert("GPS Location access denied or unavailable. Centering at Pandharpur Temple.");
        }
      );
    }
  };

  const categories: { id: string; labelKey: keyof typeof import('../translations').translations['en']; emoji: string }[] = [
    { id: 'all', labelKey: 'filterAll', emoji: '📍' },
    { id: 'hotel', labelKey: 'filterHotel', emoji: '🏨' },
    { id: 'stay', labelKey: 'filterStay', emoji: '⛺' },
    { id: 'palkhi', labelKey: 'filterPalkhi', emoji: '🚩' },
    { id: 'food', labelKey: 'filterFood', emoji: '🍲' },
    { id: 'water', labelKey: 'filterWater', emoji: '💧' },
    { id: 'medical', labelKey: 'filterMedical', emoji: '🏥' },
    { id: 'parking', labelKey: 'filterParking', emoji: '🅿️' },
    { id: 'shoe_stand', labelKey: 'filterShoeStand', emoji: '👟' },
    { id: 'toilet', labelKey: 'filterToilet', emoji: '🚻' },
    { id: 'ringan', labelKey: 'filterRingan', emoji: '🐎' },
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white p-4 sm:p-5 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border border-amber-700">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif flex items-center space-x-2">
            <span>🗺️</span>
            <span>{getTranslation(language, 'mapHeader')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-amber-200 mt-0.5">
            {getTranslation(language, 'mapSubheader')}
          </p>
        </div>

        <button
          onClick={handleFindMyLocation}
          className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl transition-all shadow-md flex items-center space-x-1.5 shrink-0"
        >
          <span>{getTranslation(language, 'myLocationBtn')}</span>
        </button>
      </div>

      {/* Category Filter Chips Bar (Request #4) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-300'
                : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{getTranslation(language, cat.labelKey)}</span>
          </button>
        ))}
      </div>

      {/* Interactive Leaflet Canvas Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 h-[520px] bg-amber-50">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Selected Marker Detail Modal Overlay */}
        {selectedPoint && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border-2 border-amber-400 z-20 animate-fade-in space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 uppercase">
                  {selectedPoint.category}
                </span>
                <h4 className="font-bold text-sm sm:text-base text-amber-950 mt-1 font-serif">
                  {selectedPoint.title[language]}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-amber-900/90 leading-relaxed">
              {selectedPoint.description[language]}
            </p>

            {selectedPoint.address && (
              <p className="text-[11px] text-amber-800 font-medium">
                📍 {selectedPoint.address[language]}
              </p>
            )}

            {selectedPoint.occupancyOrStatus && (
              <div className="text-xs font-bold text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 flex justify-between">
                <span>{getTranslation(language, 'statusCapacity')}:</span>
                <span className="text-emerald-700">{selectedPoint.occupancyOrStatus[language]}</span>
              </div>
            )}

            {selectedPoint.priceOrFree && (
              <div className="text-xs font-bold text-amber-900 bg-amber-100/60 p-2 rounded-xl border border-amber-200 flex justify-between">
                <span>{getTranslation(language, 'priceTag')}:</span>
                <span className="text-amber-950 font-black">{selectedPoint.priceOrFree[language]}</span>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              {selectedPoint.contactPhone && (
                <a
                  href={`tel:${selectedPoint.contactPhone}`}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl text-center shadow transition-all flex items-center justify-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{getTranslation(language, 'callBtn')}</span>
                </a>
              )}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.lat},${selectedPoint.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 rounded-xl text-center shadow transition-all flex items-center justify-center space-x-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{getTranslation(language, 'navigateBtn')}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
