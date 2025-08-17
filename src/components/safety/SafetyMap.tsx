import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

interface Zone {
  id: string;
  name: string;
  type: "safe" | "caution" | "restricted";
  coordinates: { lat: number; lng: number }[];
}

const mockZones: Zone[] = [
  {
    id: "1",
    name: "Taj Mahal Area",
    type: "safe",
    coordinates: [
      { lat: 27.1751, lng: 78.0421 },
      { lat: 27.1760, lng: 78.0450 },
      { lat: 27.1740, lng: 78.0400 },
    ]
  },
  {
    id: "2", 
    name: "Construction Zone",
    type: "caution",
    coordinates: [
      { lat: 27.1720, lng: 78.0380 },
      { lat: 27.1710, lng: 78.0390 },
      { lat: 27.1700, lng: 78.0370 },
    ]
  },
  {
    id: "3",
    name: "Restricted Area",
    type: "restricted", 
    coordinates: [
      { lat: 27.1680, lng: 78.0360 },
      { lat: 27.1670, lng: 78.0340 },
      { lat: 27.1660, lng: 78.0350 },
    ]
  }
];

interface SafetyMapProps {
  locationPulse?: boolean;
}

export const SafetyMap = ({ locationPulse = false }: SafetyMapProps) => {
  const getZoneColor = (type: "safe" | "caution" | "restricted") => {
    switch (type) {
      case "safe": return "bg-safe/20 border-safe";
      case "caution": return "bg-caution/20 border-caution";
      case "restricted": return "bg-restricted/20 border-restricted";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Safety Map</h3>
        <Badge variant="outline" className="bg-gradient-primary border-0 text-primary-foreground">
          <Navigation className="h-3 w-3 mr-1" />
          Live GPS
        </Badge>
      </div>
      
      {/* Mock Map Display */}
      <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
        {/* Map Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Safety Zones */}
        {mockZones.map((zone, index) => (
          <div
            key={zone.id}
            className={`absolute rounded-lg border-2 p-3 ${getZoneColor(zone.type)}`}
            style={{
              top: `${20 + index * 25}%`,
              left: `${15 + index * 20}%`,
              width: "25%",
              height: "20%"
            }}
          >
            <div className="text-xs font-medium">{zone.name}</div>
            <Badge variant="outline" size="sm" className="mt-1 capitalize">
              {zone.type}
            </Badge>
          </div>
        ))}
        
        
        {/* User Location - Enhanced with better positioning for Indian location */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className={`w-4 h-4 rounded-full border-2 border-background shadow-lg transition-all duration-300 ${
              locationPulse ? 'bg-destructive animate-pulse' : 'bg-primary'
            }`}></div>
            {locationPulse && (
              <div className="absolute -top-1 -left-1 w-6 h-6 bg-destructive/50 rounded-full animate-ping"></div>
            )}
            <MapPin className={`absolute -top-8 -left-3 h-6 w-6 transition-colors duration-300 ${
              locationPulse ? 'text-destructive' : 'text-primary'
            }`} />
          </div>
        </div>
      </div>
      
      {/* Zone Legend */}
      <div className="flex justify-around mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-safe rounded-full"></div>
          <span>Safe Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-caution rounded-full"></div>
          <span>Caution</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-restricted rounded-full"></div>
          <span>Restricted</span>
        </div>
      </div>
    </Card>
  );
};