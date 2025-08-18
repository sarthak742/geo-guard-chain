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

interface Zone {
  id: string;
  name: string;
  type: "safe" | "caution" | "restricted";
  coordinates: [number, number][];
  description?: string;
}

interface Marker {
  id: string;
  position: [number, number];
  title: string;
  type: "tourist" | "incident" | "location";
  icon?: string;
}

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  zones?: Zone[];
  markers?: Marker[];
  onZoneEnter?: (zone: Zone) => void;
  className?: string;
  height?: string;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [20.5937, 78.9629], // Center of India
  zoom = 5,
  zones = [],
  markers = [],
  onZoneEnter,
  className = "",
  height = "400px"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const zonesRef = useRef<L.Polygon[]>([]);

  const getZoneColor = (type: string) => {
    switch (type) {
      case "safe": return "#10b981"; // green-500
      case "caution": return "#f59e0b"; // amber-500
      case "restricted": return "#ef4444"; // red-500
      default: return "#6b7280"; // gray-500
    }
  };

  const getMarkerIcon = (type: string, isActive: boolean = false) => {
    const color = type === "tourist" ? "#3b82f6" : type === "incident" ? "#ef4444" : "#10b981";
    const size = type === "tourist" ? 15 : 10;
    
    return L.divIcon({
      html: `<div style="
        width: ${size * 2}px; 
        height: ${size * 2}px; 
        background: ${color}; 
        border: 3px solid white; 
        border-radius: 50%; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ${isActive ? 'animation: pulse 2s infinite;' : ''}
      "></div>`,
      className: 'custom-marker',
      iconSize: [size * 2, size * 2],
      iconAnchor: [size, size]
    });
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(center, zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Add custom CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  // Update zones
  useEffect(() => {
    if (!mapInstanceRef.current) return;

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
        fillOpacity: 0.2,
        weight: 2
      }).addTo(mapInstanceRef.current!);

      polygon.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold">${zone.name}</h3>
          <p class="text-sm text-gray-600">${zone.description || ''}</p>
          <span class="inline-block px-2 py-1 rounded text-xs font-medium bg-${zone.type === 'safe' ? 'green' : zone.type === 'caution' ? 'yellow' : 'red'}-100 text-${zone.type === 'safe' ? 'green' : zone.type === 'caution' ? 'yellow' : 'red'}-800 capitalize">
            ${zone.type} Zone
          </span>
        </div>
      `);

      zonesRef.current.push(polygon);
    });
  }, [zones]);

  // Update markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const marker = L.marker(markerData.position, {
        icon: getMarkerIcon(markerData.type, markerData.type === "tourist")
      }).addTo(mapInstanceRef.current!);

      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold">${markerData.title}</h3>
          <p class="text-sm text-gray-600 capitalize">${markerData.type}</p>
        </div>
      `);

      // Check for zone intersections for tourist markers
      if (markerData.type === "tourist" && onZoneEnter) {
        zones.forEach(zone => {
          const point = L.latLng(markerData.position);
          const polygon = L.polygon(zone.coordinates);
          
          // Simple point-in-polygon check
          if (polygon.getBounds().contains(point)) {
            setTimeout(() => onZoneEnter(zone), 1000);
          }
        });
      }

      markersRef.current.push(marker);
    });
  }, [markers, zones, onZoneEnter]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full rounded-lg border shadow-sm ${className}`}
      style={{ height }}
    />
  );
};