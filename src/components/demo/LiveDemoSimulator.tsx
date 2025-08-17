import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, MapPin, Clock, CheckCircle, Play, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DemoStep {
  id: number;
  title: string;
  description: string;
  type: "alert" | "blockchain" | "response";
  duration: number;
}

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: "Tourist Enters Danger Zone",
    description: "Sarah walks into a pickpocket hotspot near Taj Mahal",
    type: "alert",
    duration: 2000
  },
  {
    id: 2,
    title: "AI Smart Alert Triggered",
    description: "Warning: High theft risk area detected. Stay alert!",
    type: "alert",
    duration: 1500
  },
  {
    id: 3,
    title: "Incident Reported (SOS)",
    description: "Tourist taps SOS - bag snatched at Gate 2",
    type: "blockchain",
    duration: 2000
  },
  {
    id: 4,
    title: "Blockchain Verification",
    description: "Report saved to secure notebook that can't be tampered with",
    type: "blockchain",
    duration: 2500
  },
  {
    id: 5,
    title: "Authority Response",
    description: "Local police notified, tourist receives help in 2 minutes",
    type: "response",
    duration: 1500
  }
];

export const LiveDemoSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { toast } = useToast();

  const startDemo = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);
    setCompletedSteps([]);

    for (let i = 0; i < demoSteps.length; i++) {
      const step = demoSteps[i];
      setCurrentStep(i + 1);
      
      // Show toast for each step
      const stepIcon = step.type === "alert" ? "⚠️" : step.type === "blockchain" ? "🔗" : "🚨";
      toast({
        title: `${stepIcon} ${step.title}`,
        description: step.description,
        variant: step.type === "alert" ? "destructive" : "default"
      });

      // Simulate step duration with progress
      const stepProgress = ((i + 1) / demoSteps.length) * 100;
      setProgress(stepProgress);
      
      await new Promise(resolve => setTimeout(resolve, step.duration));
      setCompletedSteps(prev => [...prev, step.id]);
    }

    setIsRunning(false);
    toast({
      title: "🎉 Demo Complete!",
      description: "Tourist safety workflow demonstrated successfully",
    });
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setProgress(0);
    setCompletedSteps([]);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "alert": return AlertTriangle;
      case "blockchain": return Shield;
      case "response": return CheckCircle;
      default: return MapPin;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case "alert": return "restricted";
      case "blockchain": return "safe";
      case "response": return "hero";
      default: return "default";
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-hero/5 border-primary/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            🎬 Live Demo: Tourist Safety in Action
          </h3>
          <p className="text-muted-foreground">
            Watch how our system protects tourists in real-time
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={startDemo}
            disabled={isRunning}
            size="lg"
            variant="hero"
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Demo Running..." : "Start Live Demo"}
          </Button>
          <Button
            onClick={resetDemo}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Progress Bar */}
        {(isRunning || progress > 0) && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Demo Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Current Step Highlight */}
        {currentStep > 0 && (
          <Card className="p-4 bg-gradient-to-r from-hero/20 to-primary/20 border-hero/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-hero/20 rounded-lg">
                {React.createElement(getStepIcon(demoSteps[currentStep - 1]?.type), {
                  className: "h-5 w-5 text-hero"
                })}
              </div>
              <div>
                <h4 className="font-semibold text-hero">
                  Step {currentStep}: {demoSteps[currentStep - 1]?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {demoSteps[currentStep - 1]?.description}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Demo Steps Overview */}
        <div className="grid gap-3">
          <h4 className="font-semibold text-center">Demo Workflow</h4>
          {demoSteps.map((step, index) => {
            const StepIcon = getStepIcon(step.type);
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            
            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  isCurrent 
                    ? "bg-hero/10 border-hero/30 shadow-md" 
                    : isCompleted
                    ? "bg-safe/10 border-safe/30"
                    : "bg-muted/20 border-muted"
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  isCompleted ? "bg-safe/20" : isCurrent ? "bg-hero/20" : "bg-muted/20"
                }`}>
                  <StepIcon className={`h-4 w-4 ${
                    isCompleted ? "text-safe" : isCurrent ? "text-hero" : "text-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{step.title}</span>
                    <Badge 
                      variant="outline"
                      size="sm"
                    >
                      {step.type}
                    </Badge>
                    {isCompleted && <CheckCircle className="h-4 w-4 text-safe" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-hero">2 min</div>
            <div className="text-xs text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-safe">100%</div>
            <div className="text-xs text-muted-foreground">Secure Logging</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs text-muted-foreground">Protection</div>
          </div>
        </div>
      </div>
    </Card>
  );
};