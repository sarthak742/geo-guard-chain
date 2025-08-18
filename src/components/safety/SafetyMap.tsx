import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "lucide-react";
import { LeafletMap } from "@/components/maps/LeafletMap";

interface Zone {
  id: string;
  name: string;
  type: "safe" | "caution" | "restricted";
  coordinates: [number, number][];
  description: string;
}

const mockZones: Zone[] = [
  {
    id: "1",
    name: "Taj Mahal Area",
    type: "safe",
    description: "Tourist-friendly zone with enhanced security",
    coordinates: [
      [27.1751, 78.0421],
      [27.1760, 78.0450],
      [27.1740, 78.0400],
      [27.1751, 78.0421]
    ]
  },
  {
    id: "2", 
    name: "Construction Zone",
    type: "caution",
    description: "Ongoing construction - proceed with caution",
    coordinates: [
      [27.1720, 78.0380],
      [27.1710, 78.0390],
      [27.1700, 78.0370],
      [27.1720, 78.0380]
    ]
  },
  {
    id: "3",
    name: "Restricted Area",
    type: "restricted", 
    description: "Entry restricted after 6 PM",
    coordinates: [
      [27.1680, 78.0360],
      [27.1670, 78.0340],
      [27.1660, 78.0350],
      [27.1680, 78.0360]
    ]
  }
];

// Mock tourist position near Taj Mahal
const touristMarker = {
  id: "tourist-1",
  position: [27.1751, 78.0421] as [number, number],
  title: "Your Location",
  type: "tourist" as const
};

interface SafetyMapProps {
  locationPulse?: boolean;
}

export const SafetyMap = ({ locationPulse = false }: SafetyMapProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Safety Map</h3>
        <Badge variant="outline" className="bg-gradient-primary border-0 text-primary-foreground">
          <Navigation className="h-3 w-3 mr-1" />
          Live GPS
        </Badge>
      </div>
      
      {/* Interactive Leaflet Map */}
      <LeafletMap
        center={[27.1751, 78.0421]} // Taj Mahal coordinates
        zoom={14}
        zones={mockZones}
        markers={[touristMarker]}
        height="320px"
        className="rounded-lg"
      />
      
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