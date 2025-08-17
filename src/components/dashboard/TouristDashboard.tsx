import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RiskGauge } from "@/components/safety/RiskGauge";
import { SafetyMap } from "@/components/safety/SafetyMap";
import { IncidentReporter } from "@/components/incidents/IncidentReporter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { AlertTriangle, Phone, MapPin, Clock, QrCode, Users, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TouristDashboard = () => {
  const [currentRisk] = useState(35);
  const [riskFactors] = useState(["Tourist District", "Daytime", "Moderate Crowd"]);
  const [sosActive, setSosActive] = useState(false);
  const [locationPulse, setLocationPulse] = useState(false);
  const { toast } = useToast();
  
  // Temporary fallback to debug the context issue
  let t;
  try {
    const langContext = useLanguage();
    t = langContext.t;
  } catch (error) {
    console.error("Language context error:", error);
    t = (key: string) => key; // Fallback function
  }
  const { isOnline, simulateOfflineAlert } = useOfflineMode();

  const handleSOS = () => {
    setSosActive(true);
    setLocationPulse(true);
    
    // Blockchain logging simulation
    const blockchainHash = `0x${Math.random().toString(16).substr(2, 8)}`;
    const timestamp = new Date().toISOString();
    
    toast({
      title: `🚨 ${t("sos.activated")}`,
      description: t("sos.help"),
      variant: "destructive"
    });

    // Simulate admin notification
    setTimeout(() => {
      toast({
        title: "📡 Admin Notified", 
        description: `Hash: ${blockchainHash} | Time: ${timestamp}`,
      });
    }, 1000);
    
    // Reset after 5 seconds for demo
    setTimeout(() => {
      setSosActive(false);
      setLocationPulse(false);
    }, 5000);
  };

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {t("tourist.welcome")}, Alex Chen
        </h1>
        <p className="text-muted-foreground">Tourist ID: TUR-2024-8391 🇺🇸</p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="bg-gradient-safe border-0 text-safe-foreground">
            {t("tourist.digitalId")} ✓
          </Badge>
          <Badge variant={isOnline ? "safe" : "restricted"} className="flex items-center gap-1">
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
      </div>

      {/* Emergency SOS */}
      <Card className="p-6 bg-gradient-to-r from-emergency/10 to-emergency/5 border-emergency/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-emergency">{t("tourist.emergency")}</h3>
            <p className="text-sm text-muted-foreground">{t("tourist.emergencyDesc")}</p>
            {!isOnline && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={simulateOfflineAlert}
                className="mt-2"
              >
                Test Offline Alert
              </Button>
            )}
          </div>
          <Button
            variant="emergency"
            size="lg"
            onClick={handleSOS}
            disabled={sosActive}
            className={`h-16 w-16 rounded-full ${locationPulse ? 'animate-pulse' : ''}`}
          >
            {sosActive ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emergency-foreground"></div>
            ) : (
              <Phone className="h-8 w-8" />
            )}
          </Button>
        </div>
        {sosActive && (
          <div className="mt-4 p-3 bg-emergency/20 rounded-lg">
            <p className="text-emergency font-medium">🚨 {t("sos.notified")}</p>
            <p className="text-sm text-emergency/80">{t("sos.stayCalm")}</p>
          </div>
        )}
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Assessment */}
        <div className="lg:col-span-1">
          <RiskGauge score={currentRisk} factors={riskFactors} />
        </div>

        {/* Safety Map */}
        <div className="lg:col-span-2">
          <SafetyMap locationPulse={locationPulse} />
        </div>
      </div>

      {/* Smart Guidance */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-primary mb-2">{t("tourist.smartGuidance")}</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="safe" size="sm">{t("tourist.recommendation")}</Badge>
                <span className="text-sm">Continue on Broadway - Safe route to Times Square</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="caution" size="sm">{t("tourist.headsUp")}</Badge>
                <span className="text-sm">Construction ahead - Expect delays</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated 2 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <QrCode className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h4 className="font-medium">{t("tourist.digitalIdAction")}</h4>
            <p className="text-xs text-muted-foreground">Show QR Code</p>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-safe" />
            <h4 className="font-medium">{t("tourist.safeRoutes")}</h4>
            <p className="text-xs text-muted-foreground">Find safe paths</p>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-caution" />
            <h4 className="font-medium">{t("tourist.emergencyContacts")}</h4>
            <p className="text-xs text-muted-foreground">Police, Hospital</p>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-restricted" />
            <h4 className="font-medium">{t("tourist.reportIssue")}</h4>
            <p className="text-xs text-muted-foreground">Quick reporting</p>
          </div>
        </Card>
      </div>

      {/* Incident Reporter */}
      <IncidentReporter />
    </div>
  );
};