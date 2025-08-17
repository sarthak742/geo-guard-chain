import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Brain, Shield, MapPin, Clock, Users } from "lucide-react";

const explanations = [
  {
    tech: "Blockchain Technology",
    simple: "A Secure Digital Notebook",
    description: "Think of it as a special notebook that:",
    points: [
      "Can never be erased or changed once written",
      "Everyone can see it's real and hasn't been tampered with", 
      "Works even if one computer breaks down",
      "Keeps tourist incident reports 100% trustworthy"
    ],
    icon: Book,
    color: "safe",
    analogy: "Like a permanent, tamper-proof diary that everyone trusts"
  },
  {
    tech: "AI Risk Scoring",
    simple: "Smart Warning System",
    description: "Like having a smart friend who:",
    points: [
      "Knows which areas are dangerous before you get there",
      "Warns you about pickpockets, scams, or unsafe zones",
      "Learns from other tourists' experiences",
      "Gives you heads-up alerts to stay safe"
    ],
    icon: Brain,
    color: "caution",
    analogy: "Like a GPS that warns about danger zones, not just traffic"
  },
  {
    tech: "Real-time Geo-fencing",
    simple: "Invisible Safety Boundaries",
    description: "Creates invisible safety zones that:",
    points: [
      "Alert you when entering risky areas",
      "Track your location only for safety (privacy protected)",
      "Send automatic help requests if you're in trouble",
      "Work like invisible safety bubbles around tourist spots"
    ],
    icon: MapPin,
    color: "primary",
    analogy: "Like having a protective invisible fence that keeps you safe"
  },
  {
    tech: "Emergency Response System",
    simple: "Instant Help Button",
    description: "One-tap SOS that instantly:",
    points: [
      "Sends your exact location to local authorities",
      "Records the incident permanently for proof",
      "Alerts nearby tourists who can help",
      "Works faster than calling traditional emergency numbers"
    ],
    icon: Clock,
    color: "emergency",
    analogy: "Like a magic button that instantly calls the right help to your exact spot"
  }
];

const benefits = [
  {
    title: "For Tourists",
    icon: Users,
    color: "hero",
    benefits: [
      "Get warned before walking into danger",
      "One-tap emergency help that actually works",
      "Feel confident exploring new places safely",
      "Have proof if something bad happens"
    ]
  },
  {
    title: "For Authorities", 
    icon: Shield,
    color: "safe",
    benefits: [
      "Respond to emergencies 45% faster",
      "Get exact locations instantly",
      "Track safety patterns to prevent incidents",
      "Have tamper-proof evidence for investigations"
    ]
  }
];

export const SimplifiedExplanations = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          How It Works (In Simple Terms)
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          No tech jargon - just clear explanations of how we keep tourists safe
        </p>
      </div>

      {/* Technology Explanations */}
      <div className="grid lg:grid-cols-2 gap-6">
        {explanations.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-all group">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-xl bg-${item.color}/10 group-hover:scale-110 transition-transform`}>
                    <ItemIcon className={`h-6 w-6 text-${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        Tech Term
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.tech}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary">{item.simple}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground">{item.description}</p>

                {/* Points */}
                <ul className="space-y-2">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${item.color} mt-2 flex-shrink-0`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Analogy */}
                <div className={`p-3 rounded-lg bg-${item.color}/5 border-l-4 border-${item.color}/30`}>
                  <p className="text-sm italic">
                    <strong>Simple analogy:</strong> {item.analogy}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center">Who Benefits & How</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const BenefitIcon = benefit.icon;
            return (
              <Card key={index} className="p-6 bg-gradient-to-br from-primary/5 to-hero/5 border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-${benefit.color}/10`}>
                      <BenefitIcon className={`h-6 w-6 text-${benefit.color}`} />
                    </div>
                    <h4 className="text-xl font-bold">{benefit.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {benefit.benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full bg-${benefit.color} mt-2 flex-shrink-0`} />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <Card className="p-8 bg-gradient-to-r from-primary/10 to-hero/10 border-primary/20 text-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">The Bottom Line</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced technology made simple: Keep tourists safe with smart warnings, 
            instant help, and tamper-proof incident records.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="safe" className="text-base px-4 py-2">
              🛡️ Prevention First
            </Badge>
            <Badge variant="destructive" className="text-base px-4 py-2">
              🚨 Instant Response
            </Badge>
            <Badge variant="default" className="text-base px-4 py-2">
              📝 Permanent Records
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};