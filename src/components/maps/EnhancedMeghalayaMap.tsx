import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Shield, AlertTriangle, Users, ExternalLink } from 'lucide-react';
import { useZones, Zone } from '@/hooks/useZones';
import { useAuth } from '@/contexts/AuthContext';

// Define zone colors
const ZONE_COLORS = {
  safe: '#22c55e',
  crowded: '#eab308', 
  avoid: '#ef4444'
} as const;

// Create custom icons for different zone types
const createZoneIcon = (zoneType: keyof typeof ZONE_COLORS) => new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="${ZONE_COLORS[zoneType]}" stroke="#fff" stroke-width="2"/>
      <path d="M12 8v4l2 2" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `)}`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Map click handler component
function MapClickHandler({ onMapClick }: { onMapClick: (e: any) => void }) {
  useMapEvents({
    click: onMapClick,
  });
  return null;
}

interface EnhancedMeghalayaMapProps {
  userLocation?: [number, number];
  onZoneReport?: (lat: number, lng: number, type: 'safe' | 'crowded' | 'avoid') => void;
}

export const EnhancedMeghalayaMap = ({ userLocation, onZoneReport }: EnhancedMeghalayaMapProps) => {
  const { zones, loading, reportZone } = useZones();
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const defaultCenter: [number, number] = [25.467030, 91.366409]; // Shillong
  const center = userLocation || defaultCenter;

  const handleMapClick = (e: any) => {
    if (!user) return;
    
    const { lat, lng } = e.latlng;
    setSelectedLocation([lat, lng]);
    setShowReportDialog(true);
  };

  const handleZoneReport = async (zoneType: 'safe' | 'crowded' | 'avoid') => {
    if (!selectedLocation) return;
    
    const [lat, lng] = selectedLocation;
    // Security: Use generic description without exact coordinates
    await reportZone(lat, lng, zoneType, `${zoneType} zone reported via map`);
    
    setShowReportDialog(false);
    setSelectedLocation(null);
    
    if (onZoneReport) {
      onZoneReport(lat, lng, zoneType);
    }
  };

  const getZoneIcon = (zoneType: Zone['zone_type']) => {
    switch (zoneType) {
      case 'safe': return <Shield className="h-4 w-4 text-green-600" />;
      case 'crowded': return <Users className="h-4 w-4 text-yellow-600" />;
      case 'avoid': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getZoneBadgeVariant = (zoneType: Zone['zone_type']) => {
    switch (zoneType) {
      case 'safe': return 'default';
      case 'crowded': return 'secondary';
      case 'avoid': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <Card className="h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading map and zones...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="h-[500px] relative overflow-hidden">
        <MapContainer
          center={center}
          zoom={12}
          className="h-full w-full"
        >
          <MapClickHandler onMapClick={handleMapClick} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* User location marker */}
          {userLocation && (
            <Marker position={userLocation} icon={createZoneIcon('safe')}>
              <Popup>
                <div className="text-center">
                  <strong>Your Location</strong>
                  <br />
                  <small>Approximate location</small>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Zone markers and circles */}
          {zones.map((zone) => (
            <div key={zone.id}>
              <Circle
                center={[zone.latitude, zone.longitude]}
                radius={200}
                pathOptions={{
                  color: ZONE_COLORS[zone.zone_type],
                  fillColor: ZONE_COLORS[zone.zone_type],
                  fillOpacity: 0.2,
                  weight: 2
                }}
              />
              <Marker
                position={[zone.latitude, zone.longitude]}
                icon={createZoneIcon(zone.zone_type)}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      {getZoneIcon(zone.zone_type)}
                      <Badge variant={getZoneBadgeVariant(zone.zone_type)}>
                        {zone.zone_type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">
                      {zone.description || `${zone.zone_type} zone`}
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>📍 Area: {zone.latitude.toFixed(3)}°, {zone.longitude.toFixed(3)}°</p>
                      <p>📅 {new Date(zone.created_at).toLocaleString()}</p>
                      {zone.blockchain_tx_hash && (
                        <div className="flex items-center gap-1">
                          <span>🔗</span>
                          <a
                            href={`https://mumbai.polygonscan.com/tx/${zone.blockchain_tx_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            Blockchain Verified
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}

          {/* Selected location marker */}
          {selectedLocation && (
            <Marker position={selectedLocation}>
              <Popup>
                <div className="text-center">
                  <strong>Report Zone</strong>
                  <br />
                  <small>Selected area</small>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>

        {/* Zone reporting dialog */}
        {showReportDialog && selectedLocation && user && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-[1000]">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Report Zone Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Selected area for zone reporting
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    onClick={() => handleZoneReport('safe')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Safe Zone
                  </Button>
                  <Button
                    onClick={() => handleZoneReport('crowded')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Crowded Area
                  </Button>
                  <Button
                    onClick={() => handleZoneReport('avoid')}
                    variant="destructive"
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Avoid This Area
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReportDialog(false);
                    setSelectedLocation(null);
                  }}
                  className="w-full"
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </Card>

      {/* Zone statistics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {zones.filter(z => z.zone_type === 'safe').length}
            </div>
            <p className="text-xs text-muted-foreground">Safe Zones</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {zones.filter(z => z.zone_type === 'crowded').length}
            </div>
            <p className="text-xs text-muted-foreground">Crowded Areas</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">
              {zones.filter(z => z.zone_type === 'avoid').length}
            </div>
            <p className="text-xs text-muted-foreground">Danger Zones</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};