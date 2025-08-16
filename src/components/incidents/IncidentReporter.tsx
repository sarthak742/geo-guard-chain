import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Camera, Send, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const incidentTypes = [
  { id: "theft", label: "Theft", icon: "🕳️" },
  { id: "medical", label: "Medical Emergency", icon: "🏥" },
  { id: "harassment", label: "Harassment", icon: "⚠️" },
  { id: "lost", label: "Lost/Confused", icon: "🗺️" },
  { id: "other", label: "Other", icon: "📝" },
];

export const IncidentReporter = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!selectedType || !description.trim()) {
      toast({
        title: "Incomplete Information",
        description: "Please select incident type and provide description",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate blockchain anchoring
    setTimeout(() => {
      const incidentId = `INC-${Date.now()}`;
      const hash = `0x${Math.random().toString(16).substr(2, 40)}`;
      
      toast({
        title: "Incident Reported Successfully",
        description: `Incident ${incidentId} has been blockchain-verified and dispatched to authorities.`,
      });
      
      // Reset form
      setSelectedType("");
      setDescription("");
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="h-5 w-5 text-caution" />
        <h3 className="text-lg font-semibold">Report Incident</h3>
        <Badge variant="outline" className="bg-gradient-primary border-0 text-primary-foreground ml-auto">
          <Shield className="h-3 w-3 mr-1" />
          Blockchain Verified
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Incident Type Selection */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Incident Type</Label>
          <div className="grid grid-cols-2 gap-2">
            {incidentTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                className="justify-start h-auto p-3"
                onClick={() => setSelectedType(type.id)}
              >
                <span className="mr-2">{type.icon}</span>
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="text-sm font-medium mb-2 block">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe what happened, when, and any other relevant details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Media Upload (Mock) */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Evidence (Optional)</Label>
          <Button variant="outline" className="w-full h-16 border-dashed">
            <Camera className="h-6 w-6 mr-2" />
            Add Photo/Video
          </Button>
        </div>

        {/* Location Info */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <Label className="text-sm font-medium block mb-2">Current Location</Label>
          <div className="text-sm text-muted-foreground">
            📍 Times Square, New York, NY<br />
            🕐 {new Date().toLocaleString()}<br />
            🗺️ Tourist District (Safe Zone)
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
              Blockchain Verification...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit Report
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};