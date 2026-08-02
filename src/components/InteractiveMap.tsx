import React, { useEffect, useRef, useState } from 'react';
import { Language, MapPoint } from '../types';
import { getTranslation } from '../translations';
import L from 'leaflet';

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
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Pandharpur Vitthal Temple Center
      const map = L.map(mapContainerRef.current, {
        center: [17.6775, 75.3239],
        zoom: 13,
        zoomControl: true,
      });

      // OpenStreetMap Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | WariSeva Maps',
        maxZoom: 19,
      }).addTo(map);

      // Polyline for Wari Palkhi Route Stage (Alandi -> Lonand -> Wakhari -> Pandharpur)
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

      const routePolyline = L.polyline(wariRouteCoords, {
        color: '#E65100', // Saffron route line
        weight: 5,
        opacity: 0.8,
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

      if (pt.category === 'palkhi') {
        iconEmoji = '🚩';
        bgColor = 'bg-red-600 animate-bounce';
      } else if (pt.category === 'temple') {
        iconEmoji = '🛕';
        bgColor = 'bg-amber-600';
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
          <div class="w-9 h-9 ${bgColor} text-white rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white transform transition-transform hover:scale-125 cursor-pointer text-base">
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
          setUserLoc(coords);

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
        (err) => {
          alert("GPS Location access denied or unavailable. Defaulting to Pandharpur Temple.");
        }
      );
    }
  };

  const categories = [
    { id: 'all', labelKey: 'filterAll' as const, emoji: '📍' },
    { id: 'palkhi', labelKey: 'filterPalkhi' as const, emoji: '🚩' },
    { id: 'water', labelKey: 'filterWater' as const, emoji: '💧' },
    { id: 'medical', labelKey: 'filterMedical' as const, emoji: '🏥' },
    { id: 'stay', labelKey: 'filterStay' as const, emoji: '⛺' },
    { id: 'food', labelKey: 'filterFood' as const, emoji: '🍲' },
    { id: 'toilet', labelKey: 'filterToilet' as const, emoji: '🚻' },
    { id: 'ringan', labelKey: 'filterRingan' as const, emoji: '🐎' },
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Map Header */}
      <div className="bg-amber-900 text-white p-4 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border border-amber-700">
        <div>
          <h2 className="text-xl font-bold font-serif flex items-center space-x-2">
            <span>🗺️</span>
            <span>{getTranslation(language, 'mapHeader')}</span>
          </h2>
          <p className="text-xs text-amber-200 mt-0.5">
            पालखी मार्ग, पाणी, वैद्यकीय छावण्या व विनामूल्य निवारा थेट नकाशामध्ये शोधा.
          </p>
        </div>

        <button
          onClick={handleFindMyLocation}
          className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow flex items-center space-x-1.5"
        >
          <span>{getTranslation(language, 'myLocationBtn')}</span>
        </button>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 ${
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
      <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-amber-300 h-[480px] bg-amber-50">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Selected Marker Detail Modal Overlay */}
        {selectedPoint && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border-2 border-amber-400 z-20 animate-fade-in space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 uppercase">
                  {selectedPoint.category}
                </span>
                <h4 className="font-bold text-sm text-amber-950 mt-1 font-serif">
                  {selectedPoint.title[language]}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-amber-800 hover:text-amber-950 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-amber-900/90 leading-relaxed">
              {selectedPoint.description[language]}
            </p>

            {selectedPoint.occupancyOrStatus && (
              <div className="text-xs font-bold text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                स्थिति / Capacity: {selectedPoint.occupancyOrStatus}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              {selectedPoint.contactPhone && (
                <a
                  href={`tel:${selectedPoint.contactPhone}`}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl text-center shadow transition-all flex items-center justify-center space-x-1"
                >
                  <span>📞 कॉल करा</span>
                </a>
              )}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.lat},${selectedPoint.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 rounded-xl text-center shadow transition-all flex items-center justify-center space-x-1"
              >
                <span>🚶 रस्ता शोधा</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
