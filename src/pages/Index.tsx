import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TouristDashboard } from "@/components/dashboard/TouristDashboard";
import { AdminConsole } from "@/components/admin/AdminConsole";
import { DemoSimulator } from "@/components/demo/DemoSimulator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Settings, Play } from "lucide-react";

const Index = () => {
  const [activeMode, setActiveMode] = useState<"tourist" | "admin" | "demo">("tourist");

  const modes = [
    {
      id: "tourist",
      title: "Tourist Mode",
      description: "Mobile safety dashboard for tourists",
      icon: Users,
      color: "safe"
    },
    {
      id: "admin", 
      title: "Admin Console",
      description: "Authority operations center",
      icon: Settings,
      color: "default"
    },
    {
      id: "demo",
      title: "Demo Simulator", 
      description: "Interactive hackathon demo",
      icon: Play,
      color: "hero"
    }
  ] as const;

  const renderContent = () => {
    switch (activeMode) {
      case "tourist":
        return <TouristDashboard />;
      case "admin":
        return <AdminConsole />;
      case "demo":
        return <DemoSimulator />;
      default:
        return <TouristDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary-foreground/20 rounded-xl">
              <Shield className="h-12 w-12" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold">Geo-Safe-Chain</h1>
              <p className="text-lg opacity-90">AI-Powered Tourist Safety Platform</p>
            </div>
          </div>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Blockchain-verified digital IDs, AI risk scoring, and real-time geo-fencing
            for comprehensive tourist safety and incident response.
          </p>
          
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground">
              ✅ Blockchain Verified
            </Badge>
            <Badge variant="outline" className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground">
              🤖 AI Risk Scoring
            </Badge>
            <Badge variant="outline" className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground">
              🗺️ Real-time Geo-fencing
            </Badge>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-center gap-2">
            {modes.map((mode) => (
              <Button
                key={mode.id}
                variant={activeMode === mode.id ? mode.color : "outline"}
                onClick={() => setActiveMode(mode.id)}
                className="flex items-center gap-2"
                size="lg"
              >
                <mode.icon className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">{mode.title}</div>
                  <div className="text-xs opacity-80">{mode.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Content */}
      <div className="animate-slide-in">
        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold">Geo-Safe-Chain</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Hackathon Demo • Built with React, TypeScript, and Tailwind CSS
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <Badge variant="outline">🔗 Blockchain Integration</Badge>
            <Badge variant="outline">📱 Progressive Web App</Badge>
            <Badge variant="outline">⚡ Real-time Updates</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
