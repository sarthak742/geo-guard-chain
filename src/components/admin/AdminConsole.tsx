import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { FutureIntegrations } from "./FutureIntegrations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, AlertTriangle, MapPin, Activity, Clock, CheckCircle, Eye, BarChart3, Zap } from "lucide-react";

interface Incident {
  id: string;
  type: string;
  description: string;
  location: string;
  status: "pending" | "dispatched" | "resolved";
  timestamp: string;
  touristId: string;
  priority: "low" | "medium" | "high";
}

const mockIncidents: Incident[] = [
  {
    id: "INC-001",
    type: "theft",
    description: "Phone stolen near subway station",
    location: "Times Square Station",
    status: "pending",
    timestamp: "2024-08-16 14:30",
    touristId: "TUR-2024-8391",
    priority: "high"
  },
  {
    id: "INC-002", 
    type: "medical",
    description: "Tourist feeling unwell, needs assistance",
    location: "Central Park",
    status: "dispatched",
    timestamp: "2024-08-16 13:45",
    touristId: "TUR-2024-7523",
    priority: "medium"
  },
  {
    id: "INC-003",
    type: "lost",
    description: "Lost tourist, doesn't speak English",
    location: "Brooklyn Bridge",
    status: "resolved", 
    timestamp: "2024-08-16 12:15",
    touristId: "TUR-2024-9184",
    priority: "low"
  }
];

export const AdminConsole = () => {
  const { t } = useLanguage();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "caution";
      case "dispatched": return "default";
      case "resolved": return "safe";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "restricted";
      case "medium": return "caution";
      case "low": return "safe";
      default: return "secondary";
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("admin.title")}</h1>
          <p className="text-muted-foreground">{t("admin.subtitle")}</p>
        </div>
        <Badge variant="default" className="bg-gradient-primary border-0 text-primary-foreground">
          🟢 {t("admin.systemOnline")}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t("admin.activeTourists")}</p>
              <p className="text-2xl font-bold">1,247</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t("admin.openIncidents")}</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-caution" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t("admin.avgResponse")}</p>
              <p className="text-2xl font-bold">4.2m</p>
            </div>
            <Clock className="h-8 w-8 text-safe" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t("admin.safetyScore")}</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
            <Activity className="h-8 w-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Tabbed Interface */}
      <Tabs defaultValue="incidents" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="incidents">{t("admin.incidentFeed")}</TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-1" />
            {t("admin.analytics")}
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Zap className="h-4 w-4 mr-1" />
            Future Integrations
          </TabsTrigger>
          <TabsTrigger value="heatmap">Risk Heatmap</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t("admin.incidentFeed")}</h3>
              <div className="flex gap-2">
                <Input placeholder="Search incidents..." className="w-64" />
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockIncidents.map((incident) => (
                <Card key={incident.id} className="p-4 border-l-4 border-l-caution">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getPriorityColor(incident.priority)} size="sm">
                          {incident.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {incident.type.toUpperCase()}
                        </Badge>
                        <Badge variant={getStatusColor(incident.status)} size="sm">
                          {incident.status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <h4 className="font-medium mb-1">{incident.description}</h4>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {incident.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {incident.timestamp}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {incident.touristId}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        {t("common.view")}
                      </Button>
                      {incident.status === "pending" && (
                        <Button variant="default" size="sm">
                          {t("common.dispatch")}
                        </Button>
                      )}
                      {incident.status === "dispatched" && (
                        <Button variant="safe" size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {t("common.resolve")}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="integrations">
          <FutureIntegrations />
        </TabsContent>

        <TabsContent value="heatmap">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Heatmap (Last 24h)</h3>
            <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 w-16 h-12 bg-restricted/60 rounded-lg"></div>
                <div className="absolute top-8 right-8 w-20 h-16 bg-caution/60 rounded-lg"></div>
                <div className="absolute bottom-6 left-1/3 w-24 h-14 bg-safe/60 rounded-lg"></div>
              </div>
              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
                Red: High Risk | Yellow: Medium | Green: Low Risk
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};