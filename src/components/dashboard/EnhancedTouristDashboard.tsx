import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnhancedMeghalayaMap } from '@/components/maps/EnhancedMeghalayaMap';
import { useZones } from '@/hooks/useZones';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Clock, 
  ExternalLink,
  Zap
} from 'lucide-react';

export const EnhancedTouristDashboard = () => {
  const { zones, loading } = useZones();
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState<[number, number] | undefined>();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Location access denied or unavailable:', error);
          // Default to Shillong if location access is denied
          setUserLocation([25.467030, 91.366409]);
        }
      );
    } else {
      // Default to Shillong if geolocation is not supported
      setUserLocation([25.467030, 91.366409]);
    }
  }, []);

  const recentZones = zones.slice(0, 5);
  const safeZones = zones.filter(z => z.zone_type === 'safe').length;
  const dangerZones = zones.filter(z => z.zone_type === 'avoid').length;
  const crowdedZones = zones.filter(z => z.zone_type === 'crowded').length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary-glow/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0]}!
              </h2>
              <p className="text-muted-foreground">
                Your safety companion for exploring Meghalaya
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Blockchain Protected</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Real-time Updates</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{zones.length}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Safe Zones</p>
                <p className="text-2xl font-bold text-green-600">{safeZones}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Shield className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Crowded Areas</p>
                <p className="text-2xl font-bold text-yellow-600">{crowdedZones}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Users className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Danger Zones</p>
                <p className="text-2xl font-bold text-red-600">{dangerZones}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Safety Map
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Click anywhere on the map to report a zone. All reports are secured on blockchain.
          </p>
        </CardHeader>
        <CardContent>
          <EnhancedMeghalayaMap 
            userLocation={userLocation}
            onZoneReport={(lat, lng, type) => {
              console.log(`Zone reported: ${type} at ${lat}, ${lng}`);
            }}
          />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Zone Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : recentZones.length > 0 ? (
            <div className="space-y-4">
              {recentZones.map((zone) => (
                <div key={zone.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      {zone.zone_type === 'safe' && <Shield className="h-4 w-4 text-green-600" />}
                      {zone.zone_type === 'crowded' && <Users className="h-4 w-4 text-yellow-600" />}
                      {zone.zone_type === 'avoid' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant={zone.zone_type === 'safe' ? 'default' : zone.zone_type === 'crowded' ? 'secondary' : 'destructive'}
                        >
                          {zone.zone_type.toUpperCase()}
                        </Badge>
                        {zone.blockchain_tx_hash && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Blockchain Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {zone.description || `${zone.zone_type} zone reported`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        📍 {zone.latitude.toFixed(6)}, {zone.longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(zone.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(zone.created_at).toLocaleTimeString()}
                    </p>
                    {zone.blockchain_tx_hash && (
                      <a
                        href={`https://mumbai.polygonscan.com/tx/${zone.blockchain_tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                      >
                        View TX <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No zone reports yet</p>
              <p className="text-sm text-muted-foreground">Click on the map to report your first zone</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};