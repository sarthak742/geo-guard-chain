import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, AlertTriangle, Shield, Phone, Users, CheckCircle, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TouristLocation {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  type: "safe" | "caution" | "restricted";
  description: string;
}

const touristLocations: TouristLocation[] = [
  { id: "taj", name: "Taj Mahal", coordinates: { x: 60, y: 45 }, type: "caution", description: "High pickpocket risk area" },
  { id: "red-fort", name: "Red Fort", coordinates: { x: 55, y: 35 }, type: "safe", description: "Well-monitored tourist zone" },
  { id: "gateway", name: "Gateway of India", coordinates: { x: 45, y: 70 }, type: "caution", description: "Crowded area - stay alert" },
  { id: "goa", name: "Goa Beaches", coordinates: { x: 35, y: 75 }, type: "safe", description: "Tourist-friendly beaches" },
  { id: "hampi", name: "Hampi Ruins", coordinates: { x: 40, y: 80 }, type: "restricted", description: "After-hours danger zone" },
  { id: "jaipur", name: "Jaipur Palace", coordinates: { x: 50, y: 40 }, type: "safe", description: "Secure heritage site" }
];

const demoSteps = [
  { id: 1, title: "Welcome Tourist!", message: "You're exploring incredible India 🇮🇳", duration: 2000 },
  { id: 2, title: "Location Detected", message: "GPS shows you near Taj Mahal", duration: 2000 },
  { id: 3, title: "⚠️ Danger Zone Alert!", message: "High pickpocket risk area detected!", duration: 3000 },
  { id: 4, title: "🆘 Emergency Help", message: "SOS sent securely via blockchain", duration: 2000 },
  { id: 5, title: "✅ Help Confirmed", message: "Local authorities notified - Help arriving in 2 mins!", duration: 2000 }
];

export const TouristLiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const [touristPosition, setTouristPosition] = useState({ x: 65, y: 50 });
  const { toast } = useToast();

  const startDemo = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);
    setShowDangerAlert(false);

    for (let i = 0; i < demoSteps.length; i++) {
      const step = demoSteps[i];
      setCurrentStep(i + 1);
      
      // Special effects for specific steps
      if (i === 1) {
        setTouristPosition({ x: 60, y: 45 }); // Move to Taj Mahal
      }
      
      if (i === 2) {
        setShowDangerAlert(true);
        // Simulate vibration and sound
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }
      }

      toast({
        title: step.title,
        description: step.message,
        variant: i === 2 ? "destructive" : "default"
      });

      const stepProgress = ((i + 1) / demoSteps.length) * 100;
      setProgress(stepProgress);
      
      await new Promise(resolve => setTimeout(resolve, step.duration));
    }

    setIsRunning(false);
    setShowDangerAlert(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case "safe": return "bg-safe";
      case "caution": return "bg-caution";
      case "restricted": return "bg-restricted";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="p-8 bg-gradient-to-br from-safe/10 to-primary/10 border-safe/30">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-safe/20 rounded-xl">
              <Shield className="h-8 w-8 text-safe" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">🇮🇳 Welcome to India!</h2>
              <p className="text-lg text-muted-foreground">Your AI Safety Companion</p>
            </div>
          </div>
          <p className="text-xl max-w-2xl mx-auto">
            Explore India's incredible heritage sites with confidence. 
            <span className="text-safe font-semibold"> Geo-Guard-Chain</span> protects you every step of the way!
          </p>
        </div>
      </Card>

      {/* Demo Controls */}
      <div className="flex justify-center">
        <Button
          onClick={startDemo}
          disabled={isRunning}
          size="lg"
          className="bg-gradient-safe text-safe-foreground hover:opacity-90 text-lg px-8 py-6"
        >
          {isRunning ? "🎬 Demo Running..." : "▶️ Start Tourist Safety Demo"}
        </Button>
      </div>

      {/* Progress */}
      {(isRunning || progress > 0) && (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Demo Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </Card>
      )}

      {/* Map Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              India Tourist Map
            </h3>
            <Badge variant="outline" className="bg-safe/10 text-safe border-safe/30">
              Live GPS Tracking
            </Badge>
          </div>

          {/* Mock India Map */}
          <div className="relative bg-gradient-to-br from-primary/5 to-safe/5 rounded-lg h-96 border-2 border-dashed border-muted overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-10 grid-rows-8 h-full">
                {Array.from({ length: 80 }).map((_, i) => (
                  <div key={i} className="border border-muted" />
                ))}
              </div>
            </div>

            {/* Tourist Locations */}
            {touristLocations.map((location) => (
              <div
                key={location.id}
                className={`absolute w-4 h-4 rounded-full ${getLocationColor(location.type)} border-2 border-white shadow-lg transform -translate-x-2 -translate-y-2 animate-pulse-glow`}
                style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
                title={location.name}
              />
            ))}

            {/* Tourist Position */}
            <div
              className="absolute w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg transform -translate-x-3 -translate-y-3 z-10"
              style={{ left: `${touristPosition.x}%`, top: `${touristPosition.y}%` }}
            >
              <Users className="h-4 w-4 text-white absolute -translate-x-2 -translate-y-2" />
            </div>

            {/* Danger Zone Alert Overlay */}
            {showDangerAlert && (
              <div className="absolute inset-0 bg-restricted/20 border-4 border-restricted rounded-lg animate-pulse">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="bg-white p-4 rounded-lg shadow-emergency border-2 border-restricted">
                    <AlertTriangle className="h-8 w-8 text-restricted mx-auto mb-2" />
                    <h4 className="font-bold text-restricted">🚨 DANGER ZONE!</h4>
                    <p className="text-sm">High theft risk area detected</p>
                    <Button variant="destructive" size="sm" className="mt-2">
                      <Phone className="h-4 w-4 mr-1" />
                      SOS Help
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Legend */}
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-safe rounded-full"></div>
              <span className="text-sm">Safe Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-caution rounded-full"></div>
              <span className="text-sm">Caution Area</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-restricted rounded-full"></div>
              <span className="text-sm">Danger Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm">Your Location</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Current Step Display */}
      {currentStep > 0 && (
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-safe/10 border-primary/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-primary">
                Step {currentStep}: {demoSteps[currentStep - 1]?.title}
              </h4>
              <p className="text-muted-foreground">
                {demoSteps[currentStep - 1]?.message}
              </p>
            </div>
            {currentStep === 3 && (
              <Volume2 className="h-6 w-6 text-restricted animate-pulse" />
            )}
          </div>
        </Card>
      )}

      {/* Tourist Locations List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">🏛️ Popular Tourist Destinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {touristLocations.map((location) => (
            <div key={location.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
              <div className={`w-3 h-3 rounded-full ${getLocationColor(location.type)}`} />
              <div className="flex-1">
                <span className="font-medium">{location.name}</span>
                <p className="text-xs text-muted-foreground">{location.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Safety Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center border-safe/30 bg-safe/5">
          <Shield className="h-8 w-8 mx-auto mb-2 text-safe" />
          <h4 className="font-semibold text-safe">Smart Alerts</h4>
          <p className="text-sm text-muted-foreground">AI warns you before danger</p>
        </Card>
        <Card className="p-4 text-center border-primary/30 bg-primary/5">
          <Phone className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h4 className="font-semibold text-primary">Instant SOS</h4>
          <p className="text-sm text-muted-foreground">One-tap emergency help</p>
        </Card>
        <Card className="p-4 text-center border-caution/30 bg-caution/5">
          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-caution" />
          <h4 className="font-semibold text-caution">Secure Records</h4>
          <p className="text-sm text-muted-foreground">Tamper-proof blockchain logs</p>
        </Card>
      </div>
    </div>
  );
};