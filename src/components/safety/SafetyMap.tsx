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
    name: "Tourist District",
    type: "safe",
    coordinates: [
      { lat: 40.7589, lng: -73.9851 },
      { lat: 40.7614, lng: -73.9776 },
      { lat: 40.7505, lng: -73.9934 },
    ]
  },
  {
    id: "2", 
    name: "Construction Area",
    type: "caution",
    coordinates: [
      { lat: 40.7505, lng: -73.9934 },
      { lat: 40.7489, lng: -73.9857 },
      { lat: 40.7456, lng: -73.9903 },
    ]
  },
  {
    id: "3",
    name: "High Crime Area",
    type: "restricted", 
    coordinates: [
      { lat: 40.7456, lng: -73.9903 },
      { lat: 40.7423, lng: -73.9825 },
      { lat: 40.7398, lng: -73.9876 },
    ]
  }
];

export const SafetyMap = () => {
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
        
        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg animate-pulse"></div>
            <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary/30 rounded-full animate-ping"></div>
            <MapPin className="absolute -top-8 -left-3 h-6 w-6 text-primary" />
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