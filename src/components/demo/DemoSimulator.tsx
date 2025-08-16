import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Square, RotateCcw, Users, Clock, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimulationStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  type: "tourist" | "system" | "admin";
}

const simulationSteps: SimulationStep[] = [
  {
    id: 1,
    title: "Tourist Registration",
    description: "Alex Chen creates digital ID with blockchain verification",
    duration: 10,
    type: "tourist"
  },
  {
    id: 2,
    title: "Zone Entry Alert", 
    description: "Tourist enters caution zone, risk score increases to 45",
    duration: 8,
    type: "system"
  },
  {
    id: 3,
    title: "Incident Report",
    description: "Tourist reports theft incident via mobile app",
    duration: 12,
    type: "tourist"
  },
  {
    id: 4,
    title: "Blockchain Anchoring",
    description: "Incident hash anchored to blockchain for verification",
    duration: 5,
    type: "system"
  },
  {
    id: 5,
    title: "Admin Response",
    description: "Authority acknowledges incident and dispatches assistance",
    duration: 8,
    type: "admin"
  },
  {
    id: 6,
    title: "Resolution & Verification",
    description: "Incident resolved, hash trail verified for audit",
    duration: 7,
    type: "admin"
  }
];

export const DemoSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const startSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);
    runSimulation();
  };

  const runSimulation = async () => {
    for (let i = 0; i < simulationSteps.length; i++) {
      setCurrentStep(i);
      const step = simulationSteps[i];
      
      toast({
        title: `Step ${i + 1}: ${step.title}`,
        description: step.description,
      });

      // Simulate step execution with progress
      for (let p = 0; p <= 100; p += 10) {
        setProgress(p);
        await new Promise(resolve => setTimeout(resolve, step.duration * 10));
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsRunning(false);
    toast({
      title: "🎉 Simulation Complete!",
      description: "End-to-end tourist safety workflow demonstrated successfully.",
    });
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case "tourist": return "safe";
      case "system": return "default";
      case "admin": return "caution";
      default: return "secondary";
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Hackathon Demo Simulator
        </h1>
        <p className="text-muted-foreground">
          Interactive 3-minute end-to-end demo for judges
        </p>
        <Badge variant="outline" className="bg-gradient-primary border-0 text-primary-foreground">
          <Zap className="h-3 w-3 mr-1" />
          Live Demo Ready
        </Badge>
      </div>

      {/* Simulation Controls */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Simulation Controls</h3>
          <div className="flex gap-2">
            <Button
              onClick={startSimulation}
              disabled={isRunning}
              variant="hero"
              size="sm"
            >
              <Play className="h-4 w-4 mr-1" />
              Start Demo
            </Button>
            <Button
              onClick={stopSimulation}
              disabled={!isRunning}
              variant="destructive"
              size="sm"
            >
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
            <Button
              onClick={resetSimulation}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        {isRunning && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Step {currentStep + 1} of {simulationSteps.length}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / simulationSteps.length) * 100 + (progress / simulationSteps.length)}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Current Step Highlight */}
        {isRunning && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <Badge variant={getStepTypeColor(simulationSteps[currentStep].type)} size="sm">
                {simulationSteps[currentStep].type.toUpperCase()}
              </Badge>
              <div>
                <h4 className="font-medium">{simulationSteps[currentStep].title}</h4>
                <p className="text-sm text-muted-foreground">
                  {simulationSteps[currentStep].description}
                </p>
              </div>
            </div>
          </Card>
        )}
      </Card>

      {/* Simulation Steps Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Demo Scenario Steps</h3>
        <div className="space-y-3">
          {simulationSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                isRunning && index === currentStep
                  ? "bg-primary/10 border border-primary/20"
                  : index < currentStep && isRunning
                  ? "bg-safe/10 border border-safe/20"
                  : "bg-muted/20"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isRunning && index === currentStep
                  ? "bg-primary text-primary-foreground"
                  : index < currentStep && isRunning
                  ? "bg-safe text-safe-foreground"
                  : "bg-muted text-muted-foreground"
              }`}>
                {step.id}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <Badge variant={getStepTypeColor(step.type)} size="sm">
                    {step.type}
                  </Badge>
                  <Badge variant="outline" size="sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {step.duration}s
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Demo Features Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Users className="h-8 w-8 mx-auto mb-2 text-safe" />
          <h4 className="font-semibold mb-1">Dual-Sided UX</h4>
          <p className="text-sm text-muted-foreground">Tourist + Authority interfaces</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h4 className="font-semibold mb-1">AI Risk Scoring</h4>
          <p className="text-sm text-muted-foreground">Explainable & transparent</p>
        </Card>
        
        <Card className="p-4 text-center">
          <Badge className="h-8 w-8 mx-auto mb-2 bg-gradient-primary border-0" />
          <h4 className="font-semibold mb-1">Blockchain Audit</h4>
          <p className="text-sm text-muted-foreground">Tamper-proof verification</p>
        </Card>
      </div>
    </div>
  );
};