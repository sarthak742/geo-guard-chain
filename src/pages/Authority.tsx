import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QRScanner } from '@/components/authority/QRScanner';
import { AnomalyAlertsPanel } from '@/components/alerts/AnomalyAlertsPanel';
import { Shield, Scan, AlertTriangle } from 'lucide-react';

const Authority = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Authority Verification Center</h1>
              <p className="text-muted-foreground">Digital Tourist ID Scanner & Anomaly Monitoring</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-3">
            <Badge variant="outline" className="bg-primary/10">
              <Scan className="h-3 w-3 mr-1" />
              QR Verification
            </Badge>
            <Badge variant="outline" className="bg-caution/10">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Real-time Monitoring
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Scanner */}
        <div>
          <QRScanner />
        </div>

        {/* Anomaly Alerts */}
        <div>
          <AnomalyAlertsPanel />
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Authority Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">QR Code Verification:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Use camera to scan tourist Digital ID QR codes</li>
                  <li>• Upload image files if camera scan isn't possible</li>
                  <li>• Verify ID validity and trip dates</li>
                  <li>• Access emergency contact information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Anomaly Monitoring:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Real-time alerts for tourist inactivity (&gt;30 min)</li>
                  <li>• Geofence violations (leaving planned areas)</li>
                  <li>• Unusual movement patterns</li>
                  <li>• Acknowledge alerts when handled</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Authority;