import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TouristDashboard } from "@/components/dashboard/TouristDashboard";
import { AdminConsole } from "@/components/admin/AdminConsole";
import { DemoSimulator } from "@/components/demo/DemoSimulator";
import { LiveDemoSimulator } from "@/components/demo/LiveDemoSimulator";
import { TouristLiveDemo } from "@/components/demo/TouristLiveDemo";
import { TechDemo } from "@/components/demo/TechDemo";

import { SimplifiedExplanations } from "@/components/explanation/SimplifiedExplanations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Settings, Play, BookOpen, TrendingUp, Code2, Monitor } from "lucide-react";

const Index = () => {
  const [activeMode, setActiveMode] = useState<"tourist" | "admin" | "tourist-demo" | "tech-demo" | "explanation">("tourist-demo");

  const modes = [
    {
      id: "tourist",
      title: "Dashboard",
      description: "Main tourist interface",
      icon: Monitor,
      color: "outline"
    },
    {
      id: "admin", 
      title: "Admin",
      description: "Authority center",
      icon: Settings,
      color: "outline"
    },
    {
      id: "explanation",
      title: "How It Works",
      description: "Simple tech explanations",
      icon: BookOpen,
      color: "hero"
    },
    {
      id: "tourist-demo",
      title: "🇮🇳 Live Tourist Demo", 
      description: "Tourist-friendly safety experience",
      icon: Users,
      color: "safe"
    },
    {
      id: "tech-demo",
      title: "🔧 Tech Deep-Dive", 
      description: "Blockchain & analytics dashboard",
      icon: Code2,
      color: "secondary"
    }
  ] as const;

  const renderContent = () => {
    switch (activeMode) {
      case "tourist-demo":
        return <TouristLiveDemo />;
      case "tech-demo":
        return <TechDemo />;
      case "explanation":
        return <SimplifiedExplanations />;
      case "tourist":
        return <TouristDashboard />;
      case "admin":
        return <AdminConsole />;
      default:
        return <TouristLiveDemo />;
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
              <h1 className="text-4xl font-bold animate-fade-in">Geo-Safe-Chain</h1>
              <p className="text-lg opacity-90 animate-fade-in">AI-Powered Tourist Safety Platform</p>
            </div>
          </div>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Smart warnings that prevent danger + Instant help when trouble happens + 
            Tamper-proof incident records that authorities trust.
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground">
              🛡️ Smart Warning System
            </Badge>
            <Badge variant="outline" className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground">
              🚨 Instant Emergency Help
            </Badge>
            <Badge variant="outline" className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground">
              📝 Tamper-Proof Records
            </Badge>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {modes.map((mode) => (
              <Button
                key={mode.id}
                variant={activeMode === mode.id ? mode.color : "outline"}
                onClick={() => setActiveMode(mode.id)}
                className="flex items-center gap-2 min-w-fit"
                size={mode.id === "tourist-demo" || mode.id === "tech-demo" ? "lg" : "default"}
              >
                <mode.icon className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium text-sm">{mode.title}</div>
                  <div className="text-xs opacity-80 hidden sm:block">{mode.description}</div>
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
            Hackathon Finals Ready • Proven Impact • Scalable Solution
          </p>
          <div className="flex justify-center gap-4 text-sm flex-wrap">
            <Badge variant="outline">🌍 Real Tourist Locations</Badge>
            <Badge variant="outline">📊 Proven Statistics</Badge>
            <Badge variant="outline">🤝 Partnership Ready</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
