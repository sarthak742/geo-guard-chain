import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskGaugeProps {
  score: number;
  factors: string[];
}

export const RiskGauge = ({ score, factors }: RiskGaugeProps) => {
  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: "Low", color: "safe", gradient: "bg-gradient-safe" };
    if (score < 60) return { level: "Medium", color: "caution", gradient: "bg-gradient-caution" };
    return { level: "High", color: "restricted", gradient: "bg-gradient-restricted" };
  };

  const risk = getRiskLevel(score);
  const needleRotation = (score / 100) * 180 - 90;

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">Current Risk Level</h3>
        <div className="relative w-32 h-16 mx-auto mb-4">
          {/* Gauge Background */}
          <div className="absolute inset-0 rounded-t-full border-8 border-muted"></div>
          
          {/* Risk Zones */}
          <div className="absolute inset-0 rounded-t-full border-8 border-transparent"
               style={{
                 background: `conic-gradient(from 270deg, hsl(var(--safe)) 0deg 60deg, hsl(var(--caution)) 60deg 120deg, hsl(var(--restricted)) 120deg 180deg)`,
                 clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)'
               }}></div>
          
          {/* Needle */}
          <div 
            className="absolute bottom-0 left-1/2 w-1 h-16 bg-foreground origin-bottom transform -translate-x-1/2 transition-transform duration-500"
            style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
          ></div>
          
          {/* Center Dot */}
          <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-foreground rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold">{score}</div>
          <Badge variant="outline" className={`${risk.gradient} border-0`}>
            {risk.level} Risk
          </Badge>
        </div>
      </div>
      
      {factors.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Risk Factors:</h4>
          <div className="flex flex-wrap gap-1">
            {factors.map((factor, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {factor}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};