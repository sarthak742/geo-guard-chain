import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, MapPin, AlertTriangle, Settings, Home } from "lucide-react";

export const Navigation = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "map", icon: MapPin, label: "Safety Map" },
    { id: "incidents", icon: AlertTriangle, label: "Report" },
    { id: "admin", icon: Settings, label: "Admin" },
  ];

  return (
    <Card className="fixed top-0 left-0 right-0 z-50 border-0 rounded-none bg-background/95 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Geo-Safe-Chain</h1>
            <p className="text-xs text-muted-foreground">Tourist Safety Platform</p>
          </div>
        </div>
        
        <nav className="flex gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col h-auto py-2 px-3 gap-1"
            >
              <item.icon className="h-4 w-4" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </Card>
  );
};