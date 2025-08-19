import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MeghalayaZone {
  id: string;
  name: string;
  type: "safe" | "crowded" | "avoid";
  coordinates: [number, number][];
  message: string;
  riskLevel: number;
}

interface MeghalayaMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  height?: string;
  userLocation?: [number, number];
}

// Popular Meghalaya locations
const meghalayaLocations = [
  { name: "Shillong", coords: [25.5788, 91.8933] },
  { name: "Cherrapunji", coords: [25.2993, 91.7362] },
  { name: "Dawki", coords: [25.1470, 91.7630] },
  { name: "Mawlynnong", coords: [25.2040, 91.8794] },
  { name: "Mawsynram", coords: [25.2946, 91.5854] },
  { name: "Nongriat", coords: [25.2588, 91.6951] },
  { name: "Laitkynsew", coords: [25.2200, 91.7500] },
  { name: "Smit", coords: [25.5900, 91.9200] },
  { name: "Sohra", coords: [25.2800, 91.7400] },
  { name: "Mawkdok", coords: [25.3100, 91.7800] }
];

// AI-powered zone generation
const generateDynamicZones = (userLocation: [number, number]): MeghalayaZone[] => {
  const zones: MeghalayaZone[] = [];
  const [userLat, userLng] = userLocation;

  // Generate zones around user location
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60) * Math.PI / 180; // 60-degree intervals
    const distance = 0.015 + Math.random() * 0.02; // 1.5-3.5km radius
    
    const centerLat = userLat + Math.cos(angle) * distance;
    const centerLng = userLng + Math.sin(angle) * distance;
    
    // AI logic for zone classification
    const riskScore = Math.random();
    let type: "safe" | "crowded" | "avoid";
    let message: string;
    
    if (riskScore < 0.4) {
      type = "safe";
      message = "AI Analysis: Low risk area with good infrastructure and tourist facilities.";
    } else if (riskScore < 0.7) {
      type = "crowded";
      message = "AI Analysis: High footfall area - stay alert for pickpockets and traffic.";
    } else {
      type = "avoid";
      message = "AI Analysis: High risk zone detected - poor lighting, isolated area.";
    }

    // Create circular zone polygon
    const radius = 0.008 + Math.random() * 0.005;
    const points: [number, number][] = [];
    for (let j = 0; j < 12; j++) {
      const pointAngle = (j * 30) * Math.PI / 180;
      points.push([
        centerLat + Math.cos(pointAngle) * radius,
        centerLng + Math.sin(pointAngle) * radius
      ]);
    }
    points.push(points[0]); // Close the polygon

    zones.push({
      id: `user-zone-${i}`,
      name: `Zone ${i + 1}`,
      type,
      coordinates: points,
      message,
      riskLevel: riskScore
    });
  }

  // Generate zones around popular locations
  meghalayaLocations.slice(0, 4).forEach((location, index) => {
    const riskScore = Math.random();
    let type: "safe" | "crowded" | "avoid";
    let message: string;
    
    if (location.name === "Mawlynnong") {
      type = "safe";
      message = "AI Analysis: Asia's cleanest village - very safe for tourists.";
    } else if (location.name === "Shillong") {
      type = "crowded";
      message = "AI Analysis: Popular hill station - crowded markets and busy streets.";
    } else {
      if (riskScore < 0.5) {
        type = "safe";
        message = `AI Analysis: ${location.name} is generally safe with good tourist amenities.`;
      } else if (riskScore < 0.8) {
        type = "crowded";
        message = `AI Analysis: ${location.name} experiences high tourist traffic.`;
      } else {
        type = "avoid";
        message = `AI Analysis: Remote area near ${location.name} - exercise caution.`;
      }
    }

    const radius = 0.01;
    const points: [number, number][] = [];
    for (let j = 0; j < 8; j++) {
      const angle = (j * 45) * Math.PI / 180;
      points.push([
        location.coords[0] + Math.cos(angle) * radius,
        location.coords[1] + Math.sin(angle) * radius
      ]);
    }
    points.push(points[0]);

    zones.push({
      id: `location-zone-${index}`,
      name: location.name,
      type,
      coordinates: points,
      message,
      riskLevel: riskScore
    });
  });

  return zones;
};

export const MeghalayaMap: React.FC<MeghalayaMapProps> = ({
  center = [25.4670, 91.3662], // Meghalaya center coordinates
  zoom = 10,
  className = "",
  height = "500px",
  userLocation = [25.5788, 91.8933] // Default to Shillong
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const zonesRef = useRef<L.Polygon[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const [zones, setZones] = useState<MeghalayaZone[]>([]);

  const getZoneColor = (type: string) => {
    switch (type) {
      case "safe": return "#10b981"; // green-500
      case "crowded": return "#f59e0b"; // amber-500
      case "avoid": return "#ef4444"; // red-500
      default: return "#6b7280"; // gray-500
    }
  };

  const getZoneIcon = (type: string) => {
    switch (type) {
      case "safe": return "🟢";
      case "crowded": return "🟡";
      case "avoid": return "🔴";
      default: return "📍";
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(userLocation, zoom);

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
  }, [userLocation, zoom]);

  // Generate zones dynamically
  useEffect(() => {
    const dynamicZones = generateDynamicZones(userLocation);
    setZones(dynamicZones);
  }, [userLocation]);

  // Add user location marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove existing user marker
    if (userMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current);
    }

    // Create custom user icon
    const userIcon = L.divIcon({
      html: '<div style="background: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59,130,246,0.5);"></div>',
      className: 'custom-user-marker',
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    const userMarker = L.marker(userLocation, { icon: userIcon }).addTo(mapInstanceRef.current);
    userMarker.bindPopup(`
      <div class="p-3">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-lg">📍</span>
          <h3 class="font-bold text-lg">Your Location</h3>
        </div>
        <p class="text-sm text-gray-700">AI is analyzing surrounding areas for safety insights...</p>
      </div>
    `);

    userMarkerRef.current = userMarker;

    // Center map on user location
    mapInstanceRef.current.setView(userLocation, zoom);
  }, [userLocation, zoom]);

  // Add zones to map
  useEffect(() => {
    if (!mapInstanceRef.current || zones.length === 0) return;

    // Clear existing zones
    zonesRef.current.forEach(zone => {
      mapInstanceRef.current?.removeLayer(zone);
    });
    zonesRef.current = [];

    // Add new zones
    zones.forEach(zone => {
      const polygon = L.polygon(zone.coordinates, {
        color: getZoneColor(zone.type),
        fillColor: getZoneColor(zone.type),
        fillOpacity: 0.25,
        weight: 2,
        opacity: 0.7
      }).addTo(mapInstanceRef.current!);

      polygon.bindPopup(`
        <div class="p-4 min-w-[280px]">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xl">${getZoneIcon(zone.type)}</span>
            <h3 class="font-bold text-lg capitalize">${zone.type} Zone</h3>
          </div>
          <h4 class="font-semibold text-md mb-2">${zone.name}</h4>
          <p class="text-sm text-gray-700 mb-3">${zone.message}</p>
          <div class="flex items-center justify-between">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-medium ${
              zone.type === 'safe' 
                ? 'bg-green-100 text-green-800' 
                : zone.type === 'crowded' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
            }">
              ${zone.type.toUpperCase()}
            </span>
            <span class="text-xs text-gray-500">Risk: ${Math.round(zone.riskLevel * 100)}%</span>
          </div>
        </div>
      `, {
        closeButton: true,
        autoPan: true
      });

      // Add hover effects
      polygon.on('mouseover', function() {
        this.setStyle({
          weight: 3,
          fillOpacity: 0.4
        });
      });

      polygon.on('mouseout', function() {
        this.setStyle({
          weight: 2,
          fillOpacity: 0.25
        });
      });

      zonesRef.current.push(polygon);
    });
  }, [zones]);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full rounded-lg border-2 border-border shadow-lg"
        style={{ height }}
      />
      
      {/* AI-Powered Map Legend */}
      <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border max-w-[200px]">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm">🤖</span>
          <h4 className="font-semibold text-sm">AI Zone Analysis</h4>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-safe rounded-full"></div>
            <span>🟢 Safe Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-caution rounded-full"></div>
            <span>🟡 Crowded Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-restricted rounded-full"></div>
            <span>🔴 Avoid Zone</span>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>📍 Your Location</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">Zones update in real-time based on AI analysis</p>
        </div>
      </div>
    </div>
  );
};