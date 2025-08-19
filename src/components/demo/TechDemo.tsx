import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Code, 
  Link, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  MapPin,
  Clock,
  Hash,
  ExternalLink,
  Settings,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MeghalayaMap } from "@/components/maps/MeghalayaMap";

interface IncidentLog {
  id: string;
  timestamp: string;
  location: string;
  type: "theft" | "crowd" | "restricted";
  txHash: string;
  response_time: string;
  status: "active" | "resolved";
}

const mockIncidents: IncidentLog[] = [
  {
    id: "INC001",
    timestamp: "2024-01-18 14:32:15",
    location: "Taj Mahal, Gate 2",
    type: "theft",
    txHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
    response_time: "2 min",
    status: "resolved"
  },
  {
    id: "INC002", 
    timestamp: "2024-01-18 16:45:33",
    location: "Gateway of India",
    type: "crowd",
    txHash: "0x9876543210fedcba0987654321fedcba",
    response_time: "1 min",
    status: "resolved"
  },
  {
    id: "INC003",
    timestamp: "2024-01-18 19:22:07",
    location: "Hampi Ruins",
    type: "restricted",
    txHash: "0xabcdef1234567890abcdef1234567890",
    response_time: "3 min",
    status: "active"
  }
];

const mockApiLogs = [
  { timestamp: "14:32:15", endpoint: "/api/incidents/create", status: 201, response: "Incident logged successfully" },
  { timestamp: "14:32:16", endpoint: "/api/blockchain/submit", status: 200, response: "Transaction submitted to network" },
  { timestamp: "14:32:18", endpoint: "/api/alerts/notify", status: 200, response: "Authorities notified via webhook" }
];

export const TechDemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentDemo, setCurrentDemo] = useState("");
  const [logs, setLogs] = useState<typeof mockApiLogs>([]);
  const { toast } = useToast();

  const runTechDemo = async () => {
    setIsRunning(true);
    setLogs([]);
    
    const steps = [
      "Incident Detection System Activated",
      "GPS Coordinates Validated",
      "Risk Assessment Algorithm Running",
      "Blockchain Transaction Created",
      "Smart Contract Executed",
      "Database Record Inserted",
      "Authority Notification Sent",
      "Real-time Analytics Updated"
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentDemo(steps[i]);
      
      // Add API log
      setTimeout(() => {
        setLogs(prev => [...prev, {
          timestamp: new Date().toLocaleTimeString(),
          endpoint: `/api/step/${i + 1}`,
          status: 200,
          response: steps[i]
        }]);
      }, 500);

      toast({
        title: `⚙️ ${steps[i]}`,
        description: `Step ${i + 1}/8 completed`,
      });

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsRunning(false);
    setCurrentDemo("");
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "theft": return AlertTriangle;
      case "crowd": return TrendingUp;
      case "restricted": return Shield;
      default: return MapPin;
    }
  };

  const getIncidentColor = (type: string) => {
    switch (type) {
      case "theft": return "text-restricted bg-restricted/10";
      case "crowd": return "text-caution bg-caution/10";
      case "restricted": return "text-emergency bg-emergency/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Tech Header */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-muted/5 border-primary/20">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">🔧 Technical Deep-Dive Dashboard</h2>
              <p className="text-muted-foreground">Real-time system monitoring & blockchain analytics</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Demo Control */}
      <div className="flex justify-center">
        <Button
          onClick={runTechDemo}
          disabled={isRunning}
          size="lg"
          variant="secondary"
          className="bg-primary/10 border-primary/30 hover:bg-primary/20"
        >
          <Activity className="h-4 w-4 mr-2" />
          {isRunning ? "🔄 System Processing..." : "▶️ Run Technical Demo"}
        </Button>
      </div>

      {/* Current Process */}
      {isRunning && currentDemo && (
        <Card className="p-4 border-primary/30 bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="animate-spin">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">Processing:</h4>
              <p className="text-sm">{currentDemo}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="incidents">Incident Logs</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="api">API Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Incident Map */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Incident Map</h3>
                <Badge variant="outline" className="bg-primary/10">
                  <MapPin className="h-3 w-3 mr-1" />
                  Real-time
                </Badge>
              </div>
              <MeghalayaMap
                center={[25.4670, 91.3662]} // Meghalaya coordinates
                zoom={11}
                height="300px"
                className="rounded-lg"
                userLocation={[25.5788, 91.8933]}
              />
            </Card>

            {/* Incident Logs */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Real-Time Incident Database</h3>
                <Badge variant="outline" className="bg-primary/10">
                  <Activity className="h-3 w-3 mr-1" />
                  Live Feed
                </Badge>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {mockIncidents.map((incident) => {
                  const IconComponent = getIncidentIcon(incident.type);
                  return (
                    <div key={incident.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className={`p-2 rounded-lg ${getIncidentColor(incident.type)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="grid grid-cols-1 gap-1">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-sm">{incident.id}</span>
                            <Badge variant={incident.status === "resolved" ? "secondary" : "destructive"} className="text-xs">
                              {incident.status}
                            </Badge>
                          </div>
                          <div>
                            <span className="font-medium text-sm">{incident.location}</span>
                            <p className="text-xs text-muted-foreground capitalize">{incident.type} incident</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                              {incident.txHash.slice(0, 12)}...
                            </span>
                            <span className="text-xs text-muted-foreground">{incident.response_time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Blockchain Transaction Records</h3>
              <Badge variant="outline" className="bg-safe/10 text-safe">
                <Shield className="h-3 w-3 mr-1" />
                Tamper-Proof
              </Badge>
            </div>
            
            <div className="space-y-4">
              {mockIncidents.map((incident, index) => (
                <div key={incident.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-primary" />
                      <span className="font-semibold">Transaction #{index + 1}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View on Explorer
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Transaction Hash:</p>
                      <code className="bg-muted px-2 py-1 rounded text-xs">{incident.txHash}</code>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Block Timestamp:</p>
                      <span className="font-mono">{incident.timestamp}</span>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gas Used:</p>
                      <span>21,000 gwei</span>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Confirmations:</p>
                      <span className="text-safe">12/12 ✓</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded text-xs">
                    <p className="text-muted-foreground mb-1">Smart Contract Data:</p>
                    <code>
                      {`{"incident_id":"${incident.id}","location":"${incident.location}","type":"${incident.type}","verified":true}`}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-muted-foreground">Total Incidents This Month</div>
            </Card>
            <Card className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-safe" />
              <div className="text-2xl font-bold">1.8 min</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </Card>
            <Card className="p-4 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-caution" />
              <div className="text-2xl font-bold">98.7%</div>
              <div className="text-sm text-muted-foreground">Prevention Rate</div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Incident Analytics Dashboard</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Taj Mahal</span>
                  <span>67 incidents</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Gateway of India</span>
                  <span>45 incidents</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Red Fort</span>
                  <span>23 incidents</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Hampi Ruins</span>
                  <span>21 incidents</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Real-Time API Monitoring</h3>
              <Badge variant="outline" className="bg-primary/10">
                <Code className="h-3 w-3 mr-1" />
                Live Logs
              </Badge>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {[...mockApiLogs, ...logs].map((log, index) => (
                <div key={index} className="flex items-center gap-4 p-2 border rounded text-sm font-mono">
                  <span className="text-muted-foreground">{log.timestamp}</span>
                  <span className="text-primary">{log.endpoint}</span>
                  <Badge variant={log.status === 200 ? "secondary" : "destructive"} className="text-xs">
                    {log.status}
                  </Badge>
                  <span className="text-muted-foreground">{log.response}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Future Integration Hooks */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">🚀 Future Integration Ready</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="font-semibold">Police API Integration</div>
              <div className="text-xs text-muted-foreground">Direct emergency response system</div>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="font-semibold">Smart City Dashboard</div>
              <div className="text-xs text-muted-foreground">Municipal authority integration</div>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="font-semibold">Tourism Board API</div>
              <div className="text-xs text-muted-foreground">Official tourism data sync</div>
            </div>
          </Button>
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="font-semibold">ML Analytics Engine</div>
              <div className="text-xs text-muted-foreground">Advanced predictive algorithms</div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};