import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Clock, MapPin, User, CheckCircle, Bell } from 'lucide-react';
import { anomalyDetectionService, type AnomalyAlert } from '@/services/anomalyDetection';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface AnomalyAlertsPanelProps {
  touristId?: string; // If provided, show alerts for specific tourist
  className?: string;
}

export const AnomalyAlertsPanel = ({ touristId, className = "" }: AnomalyAlertsPanelProps) => {
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAlerts();
    
    // Simulate periodic checks for inactivity
    const inactivityCheck = setInterval(() => {
      const inactivityAlerts = anomalyDetectionService.checkInactivityAlerts();
      if (inactivityAlerts.length > 0) {
        setAlerts(prev => [...prev, ...inactivityAlerts]);
        
        // Show toast for new alerts
        inactivityAlerts.forEach(alert => {
          toast({
            title: "⚠️ Anomaly Detected",
            description: alert.message,
            variant: "destructive"
          });
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(inactivityCheck);
  }, [touristId, toast]);

  const loadAlerts = () => {
    setLoading(true);
    try {
      if (touristId) {
        const touristAlerts = anomalyDetectionService.getActiveAlerts(touristId);
        setAlerts(touristAlerts);
      } else {
        const allAlerts = anomalyDetectionService.getAllActiveAlerts();
        setAlerts(allAlerts);
      }
    } finally {
      setLoading(false);
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    anomalyDetectionService.acknowledgeAlert(alertId);
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
    
    toast({
      title: "✅ Alert Acknowledged",
      description: "Alert has been marked as handled",
    });
  };

  const getSeverityColor = (severity: AnomalyAlert['severity']) => {
    switch (severity) {
      case 'high': return 'restricted';
      case 'medium': return 'caution';
      case 'low': return 'safe';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: AnomalyAlert['type']) => {
    switch (type) {
      case 'inactivity': return Clock;
      case 'geofence_violation': return MapPin;
      case 'unusual_movement': return AlertTriangle;
      default: return Bell;
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-3">Loading alerts...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-emergency">
              <AlertTriangle className="h-5 w-5" />
              Active Anomaly Alerts ({activeAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeAlerts.map((alert) => {
              const IconComponent = getTypeIcon(alert.type);
              return (
                <Alert key={alert.id} className="border-l-4 border-l-caution">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-start gap-3 flex-1">
                      <IconComponent className="h-4 w-4 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={getSeverityColor(alert.severity)} size="sm">
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" size="sm">
                            {alert.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {format(alert.timestamp, 'HH:mm')}
                          </span>
                        </div>
                        
                        <AlertDescription className="text-sm mb-2">
                          {alert.message}
                        </AlertDescription>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {alert.touristId}
                          </div>
                          {alert.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {alert.location.latitude.toFixed(4)}, {alert.location.longitude.toFixed(4)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Acknowledge
                    </Button>
                  </div>
                </Alert>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* No Active Alerts */}
      {activeAlerts.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-safe mx-auto mb-3" />
            <p className="text-lg font-medium">No Active Anomalies</p>
            <p className="text-sm text-muted-foreground">All tourists are within safe parameters</p>
          </CardContent>
        </Card>
      )}

      {/* Acknowledged Alerts */}
      {acknowledgedAlerts.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-5 w-5" />
              Handled Alerts ({acknowledgedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {acknowledgedAlerts.slice(0, 5).map((alert) => {
              const IconComponent = getTypeIcon(alert.type);
              return (
                <div key={alert.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <IconComponent className="h-3 w-3 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground truncate">
                      {alert.message}
                    </p>
                  </div>
                  <Badge variant="outline" size="sm">
                    Handled
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Demo Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Demo Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Simulate location update that might trigger alerts
                const mockAlerts = anomalyDetectionService.simulateLocationUpdate(
                  'TUR-2024-DEMO', 
                  { lat: 25.5788, lng: 91.8933 }
                );
                setAlerts(prev => [...prev, ...mockAlerts]);
              }}
            >
              Simulate Activity
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Check for inactivity alerts manually
                const inactivityAlerts = anomalyDetectionService.checkInactivityAlerts();
                if (inactivityAlerts.length > 0) {
                  setAlerts(prev => [...prev, ...inactivityAlerts]);
                }
              }}
            >
              Check Inactivity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};