import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Building, Satellite, Database, Smartphone, Globe } from "lucide-react";

const futureIntegrations = [
  {
    id: 1,
    title: "Police API Integration",
    description: "Direct connection to local law enforcement dispatch systems",
    icon: Shield,
    status: "Coming Soon",
    priority: "High"
  },
  {
    id: 2,
    title: "Smart City Dashboard",
    description: "Integration with municipal traffic and surveillance systems",
    icon: Building,
    status: "Future",
    priority: "Medium"
  },
  {
    id: 3,
    title: "Satellite Emergency Network",
    description: "Backup communication via satellite when cellular is down",
    icon: Satellite,
    status: "Future",
    priority: "High"
  },
  {
    id: 4,
    title: "Hospital Database Sync",
    description: "Real-time bed availability and emergency room status",
    icon: Database,
    status: "Coming Soon",
    priority: "Medium"
  },
  {
    id: 5,
    title: "Embassy Alert System",
    description: "Automatic tourist embassy notifications for major incidents",
    icon: Globe,
    status: "Future",
    priority: "Low"
  },
  {
    id: 6,
    title: "IoT Sensor Network",
    description: "Smart city sensors for crowd density and environmental monitoring",
    icon: Smartphone,
    status: "Future",
    priority: "Medium"
  }
];

export const FutureIntegrations = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Coming Soon": return "caution";
      case "Future": return "secondary";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "restricted";
      case "Medium": return "caution";
      case "Low": return "safe";
      default: return "outline";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Future Integrations</h3>
        <Badge variant="outline" className="bg-gradient-primary border-0 text-primary-foreground">
          Roadmap Preview
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">
        Planned integrations to enhance the platform's capabilities and scalability
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {futureIntegrations.map((integration) => (
          <Card key={integration.id} className="p-4 opacity-75 hover:opacity-90 transition-opacity">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <integration.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-1">
                  <Badge variant={getStatusColor(integration.status)} size="sm">
                    {integration.status}
                  </Badge>
                  <Badge variant={getPriorityColor(integration.priority)} size="sm">
                    {integration.priority} Priority
                  </Badge>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium mb-2 text-muted-foreground">{integration.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
            
            <Button 
              variant="outline" 
              size="sm" 
              disabled 
              className="w-full opacity-50 cursor-not-allowed"
            >
              {integration.status === "Coming Soon" ? "Notify When Ready" : "Add to Roadmap"}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2 text-muted-foreground">Development Timeline</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Q1 2025</span>
            <span className="text-caution font-medium">Police API & Hospital Database</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Q2 2025</span>
            <span className="text-muted-foreground">Smart City Dashboard Integration</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Q3 2025</span>
            <span className="text-muted-foreground">Satellite Network & IoT Sensors</span>
          </div>
        </div>
      </div>
    </Card>
  );
};