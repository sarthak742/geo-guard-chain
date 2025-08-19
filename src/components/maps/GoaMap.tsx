import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GoaZone {
  id: string;
  name: string;
  type: "safe" | "crowded" | "danger";
  coordinates: [number, number][];
  message: string;
}

interface GoaMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  height?: string;
}

// Goa zones with real coordinates
const goaZones: GoaZone[] = [
  {
    id: "north-goa-beaches",
    name: "North Goa Beaches",
    type: "safe",
    message: "Safe tourist spot – recommended for families. Beautiful beaches with good infrastructure.",
    coordinates: [
      [15.5570, 73.7510], // Calangute Beach area
      [15.5600, 73.7540],
      [15.5540, 73.7580],
      [15.5500, 73.7550],
      [15.5520, 73.7480],
      [15.5570, 73.7510]
    ]
  },
  {
    id: "panjim-city",
    name: "Panjim City",
    type: "crowded", 
    message: "Crowded urban area – stay alert in busy markets and transport hubs.",
    coordinates: [
      [15.4980, 73.8270], // Panjim city center
      [15.5020, 73.8320],
      [15.4950, 73.8350],
      [15.4920, 73.8300],
      [15.4960, 73.8240],
      [15.4980, 73.8270]
    ]
  },
  {
    id: "forest-border",
    name: "Border Forest Area", 
    type: "danger",
    message: "Restricted zone – avoid after dark. Remote forested area with limited connectivity.",
    coordinates: [
      [15.3200, 74.0800], // Near Goa-Karnataka border
      [15.3300, 74.0900],
      [15.3100, 74.1000],
      [15.3000, 74.0850],
      [15.3100, 74.0750],
      [15.3200, 74.0800]
    ]
  }
];

export const GoaMap: React.FC<GoaMapProps> = ({
  center = [15.4909, 73.8278], // Goa center coordinates
  zoom = 11,
  className = "",
  height = "500px"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const zonesRef = useRef<L.Polygon[]>([]);

  const getZoneColor = (type: string) => {
    switch (type) {
      case "safe": return "#10b981"; // green-500
      case "crowded": return "#f59e0b"; // amber-500
      case "danger": return "#ef4444"; // red-500
      default: return "#6b7280"; // gray-500
    }
  };

  const getZoneIcon = (type: string) => {
    switch (type) {
      case "safe": return "🏖️";
      case "crowded": return "🏙️";
      case "danger": return "⚠️";
      default: return "📍";
    }
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Goa
    const map = L.map(mapRef.current).setView(center, zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  // Add zones to map
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing zones
    zonesRef.current.forEach(zone => {
      mapInstanceRef.current?.removeLayer(zone);
    });
    zonesRef.current = [];

    // Add new zones
    goaZones.forEach(zone => {
      const polygon = L.polygon(zone.coordinates, {
        color: getZoneColor(zone.type),
        fillColor: getZoneColor(zone.type),
        fillOpacity: 0.3,
        weight: 3,
        opacity: 0.8
      }).addTo(mapInstanceRef.current!);

      // Create styled popup
      polygon.bindPopup(`
        <div class="p-4 min-w-[250px]">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-lg">${getZoneIcon(zone.type)}</span>
            <h3 class="font-bold text-lg capitalize">${zone.type} Zone</h3>
          </div>
          <h4 class="font-semibold text-md mb-2">${zone.name}</h4>
          <p class="text-sm text-gray-700">${zone.message}</p>
          <div class="mt-3">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-medium ${
              zone.type === 'safe' 
                ? 'bg-green-100 text-green-800' 
                : zone.type === 'crowded' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
            }">
              ${zone.type.toUpperCase()} ZONE
            </span>
          </div>
        </div>
      `, {
        closeButton: true,
        autoPan: true
      });

      // Add hover effects
      polygon.on('mouseover', function(e) {
        this.setStyle({
          weight: 4,
          fillOpacity: 0.5
        });
      });

      polygon.on('mouseout', function(e) {
        this.setStyle({
          weight: 3,
          fillOpacity: 0.3
        });
      });

      zonesRef.current.push(polygon);
    });
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full rounded-lg border-2 border-border shadow-lg"
        style={{ height }}
      />
      
      {/* Zone Legend */}
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
        <h4 className="font-semibold text-sm mb-2">Zone Types</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-safe rounded-full"></div>
            <span>🏖️ Safe Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-caution rounded-full"></div>
            <span>🏙️ Crowded Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-restricted rounded-full"></div>
            <span>⚠️ Danger Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
};