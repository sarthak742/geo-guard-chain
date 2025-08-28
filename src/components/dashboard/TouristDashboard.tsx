import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RiskGauge } from "@/components/safety/RiskGauge";
import { MeghalayaMap } from "@/components/maps/MeghalayaMap";
import { IncidentReporter } from "@/components/incidents/IncidentReporter";
import { DigitalIDCard } from "@/components/tourist/DigitalIDCard";
import { VoiceSOS } from "@/components/tourist/VoiceSOS";
import { AnomalyAlertsPanel } from "@/components/alerts/AnomalyAlertsPanel";
import { useTranslation } from "react-i18next";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { useTranslateContent } from "@/hooks/useTranslateContent";
import { AlertTriangle, Phone, MapPin, Clock, QrCode, Users, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { anomalyDetectionService } from "@/services/anomalyDetection";

export const TouristDashboard = () => {
  const [currentRisk] = useState(25);
  const [riskFactors] = useState(["Tourist District", "Daytime", "Light Crowd"]);
  const [sosActive, setSosActive] = useState(false);
  const [locationPulse, setLocationPulse] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { isOnline, simulateOfflineAlert } = useOfflineMode();
  const { user } = useAuth();

  // Dynamic content for translation
  const dynamicContent = {
    welcomeSubtitle: "Your safety is our priority - Smart monitoring with AI",
    emergencyDescription: "Instant SOS with voice recording and GPS location",
    offlineTestButton: "Test offline emergency alert system",
    sosNotifiedMessage: "Emergency services have been notified. Stay calm and wait for help.",
    stayCalm: "Help is on the way. Your location has been shared securely.",
    smartGuidanceTitle: "AI-Powered Smart Guidance for Tourists",
    recommendation: "Visit Taj Mahal gardens - Safe tourist route with verified security",
    headsUpMessage: "Heavy tourist traffic near main entrance - alternate routes available",
    lastUpdated: "AI recommendations updated 2 minutes ago",
    digitalIdDesc: "Show your verified blockchain digital identity",
    safeRoutesDesc: "Find AI-verified safe paths and tourist routes",
    emergencyContactsDesc: "Quick access to verified emergency services",
    reportIssueDesc: "Report incidents with blockchain verification"
  };

  const { translatedContent, isTranslating } = useTranslateContent(dynamicContent);

  // Set up anomaly detection with mock planned zones
  useState(() => {
    if (user) {
      anomalyDetectionService.setPlannedItinerary(user.id, [
        {
          id: 'shillong-zone',
          name: 'Shillong Tourist Zone',
          center: { latitude: 25.5788, longitude: 91.8933 },
          radius: 5000, // 5km radius
          type: 'planned'
        },
        {
          id: 'cherrapunji-zone', 
          name: 'Cherrapunji Tourist Zone',
          center: { latitude: 25.2633, longitude: 91.7098 },
          radius: 3000, // 3km radius
          type: 'planned'
        }
      ]);
    }
  });

  const handleSOS = (message: string, audioBlob?: Blob) => {
    setSosActive(true);
    setLocationPulse(true);
    
    // Blockchain logging simulation
    const blockchainHash = `0x${Math.random().toString(16).substr(2, 8)}`;
    const timestamp = new Date().toISOString();
    
    toast({
      title: `🚨 ${t("sos.activated")}`,
      description: message.length > 50 ? message.slice(0, 50) + "..." : message,
      variant: "destructive"
    });

    // Simulate admin notification with voice message
    setTimeout(() => {
      toast({
        title: "📡 Admin Notified", 
        description: `Voice Message Received | Hash: ${blockchainHash}`,
      });
    }, 1000);
    
    // Reset after 8 seconds for demo
    setTimeout(() => {
      setSosActive(false);
      setLocationPulse(false);
    }, 8000);
  };

  const handleTraditionalSOS = () => {
    const defaultMessage = t("tourist.emergency");
    handleSOS(defaultMessage);
  };

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
          {t("tourist.welcome")}, Priya Sharma
        </h1>
        <p className="text-muted-foreground animate-fade-in">Tourist ID: IND-2024-TAJ-7823 🇮🇳</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto animate-fade-in">
          {isTranslating ? "..." : translatedContent.welcomeSubtitle}
        </p>
        <div className="flex items-center justify-center gap-2 animate-fade-in">
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
            <p className="text-sm text-muted-foreground">
              {isTranslating ? "..." : translatedContent.emergencyDescription}
            </p>
            {!isOnline && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={simulateOfflineAlert}
                className="mt-2"
              >
                {isTranslating ? "..." : translatedContent.offlineTestButton}
              </Button>
            )}
          </div>
          <Button
            variant="emergency"
            size="lg"
            onClick={handleTraditionalSOS}
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
            <p className="text-sm text-emergency/80">
              {isTranslating ? "..." : translatedContent.stayCalm}
            </p>
          </div>
        )}
      </Card>

      {/* Enhanced Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Digital ID & Voice SOS */}
        <div className="lg:col-span-1 space-y-6">
          {/* Digital ID Card */}
          {user && (
            <DigitalIDCard userId={user.id} />
          )}
          
          {/* Voice SOS */}
          <VoiceSOS onSOSActivated={handleSOS} />
          
          {/* Risk Assessment */}
          <RiskGauge score={currentRisk} factors={riskFactors} />
        </div>

        {/* AI-Powered Meghalaya Map */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AI Safety Zones - Meghalaya</h3>
              <Badge variant="outline" className="ml-auto">Live GPS</Badge>
            </div>
            <MeghalayaMap 
              height="400px"
              userLocation={[25.5788, 91.8933]} // Shillong coordinates
              className={locationPulse ? 'animate-pulse' : ''}
            />
          </Card>

          {/* Anomaly Alerts for Tourist */}
          {user && (
            <AnomalyAlertsPanel touristId={user.id} />
          )}
        </div>
      </div>

      {/* Smart Guidance */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-primary mb-2">
              {isTranslating ? "..." : translatedContent.smartGuidanceTitle}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 animate-slide-in">
                <Badge variant="safe" size="sm">{t("tourist.recommendation")}</Badge>
                <span className="text-sm">
                  {isTranslating ? "..." : translatedContent.recommendation}
                </span>
              </div>
              <div className="flex items-center gap-2 animate-slide-in">
                <Badge variant="caution" size="sm">{t("tourist.headsUp")}</Badge>
                <span className="text-sm">
                  {isTranslating ? "..." : translatedContent.headsUpMessage}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {isTranslating ? "..." : translatedContent.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions - Enhanced with hover effects */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group">
          <div className="text-center">
            <QrCode className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
            <h4 className="font-medium">{t("tourist.digitalIdAction")}</h4>
            <p className="text-xs text-muted-foreground">
              {isTranslating ? "..." : translatedContent.digitalIdDesc}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group">
          <div className="text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-safe group-hover:scale-110 transition-transform" />
            <h4 className="font-medium">{t("tourist.safeRoutes")}</h4>
            <p className="text-xs text-muted-foreground">
              {isTranslating ? "..." : translatedContent.safeRoutesDesc}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group">
          <div className="text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-caution group-hover:scale-110 transition-transform" />
            <h4 className="font-medium">{t("tourist.emergencyContacts")}</h4>
            <p className="text-xs text-muted-foreground">
              {isTranslating ? "..." : translatedContent.emergencyContactsDesc}
            </p>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-restricted group-hover:scale-110 transition-transform" />
            <h4 className="font-medium">{t("tourist.reportIssue")}</h4>
            <p className="text-xs text-muted-foreground">
              {isTranslating ? "..." : translatedContent.reportIssueDesc}
            </p>
          </div>
        </Card>
      </div>

      {/* Incident Reporter */}
      <IncidentReporter />
    </div>
  );
};