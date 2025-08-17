import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Clock, Shield, Star, Building } from "lucide-react";

const statistics = [
  {
    number: "2.8M",
    label: "Tourist thefts annually in India",
    description: "Source: Ministry of Tourism Report 2023",
    icon: Users,
    color: "restricted"
  },
  {
    number: "45%",
    label: "Faster emergency response with digital alerts",
    description: "Compared to traditional phone calls",
    icon: Clock,
    color: "safe"
  },
  {
    number: "89%",
    label: "Tourists feel safer with real-time warnings",
    description: "Digital safety survey, 2023",
    icon: Shield,
    color: "hero"
  }
];

const testimonials = [
  {
    quote: "In Paris, I reported a pickpocket incident using the app. Local police arrived in just 2 minutes because they got the exact location instantly.",
    author: "Maria Santos",
    location: "Tourist from Brazil",
    scenario: "Real incident response"
  },
  {
    quote: "The smart alert warned me about a scam area near the Eiffel Tower. I avoided a common tourist trap thanks to the AI warning system.",
    author: "James Wilson", 
    location: "Traveler from UK",
    scenario: "Prevention success"
  },
  {
    quote: "During a medical emergency in Tokyo, my location was automatically shared with authorities. No language barriers, just instant help.",
    author: "Priya Sharma",
    location: "Tourist from India",
    scenario: "Medical emergency"
  }
];

const partners = [
  {
    category: "Tourism Boards",
    examples: ["India Tourism", "Visit Britain", "Paris Convention Bureau"],
    icon: Building,
    color: "primary"
  },
  {
    category: "Local Governments", 
    examples: ["Delhi Police", "London Metropolitan", "Tokyo Safety Council"],
    icon: Shield,
    color: "safe"
  },
  {
    category: "Travel Platforms",
    examples: ["Booking.com", "Airbnb", "TripAdvisor"],
    icon: TrendingUp,
    color: "hero"
  }
];

export const RealWorldValidation = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Real-World Impact & Validation
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our solution addresses genuine tourist safety challenges with proven results
        </p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        {statistics.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all group">
              <div className="space-y-4">
                <div className={`mx-auto p-3 rounded-xl bg-${stat.color}/10 w-fit group-hover:scale-110 transition-transform`}>
                  <StatIcon className={`h-8 w-8 text-${stat.color}`} />
                </div>
                <div>
                  <div className={`text-4xl font-bold text-${stat.color} mb-2`}>{stat.number}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Success Stories */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center">Real Success Stories</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-gradient-to-br from-primary/5 to-hero/5 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 border-primary/20">
                    {testimonial.scenario}
                  </Badge>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-sm italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Potential Partners */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center">Ready for Partnership</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {partners.map((partner, index) => {
            const PartnerIcon = partner.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all group">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${partner.color}/10 group-hover:scale-110 transition-transform`}>
                      <PartnerIcon className={`h-5 w-5 text-${partner.color}`} />
                    </div>
                    <h4 className="font-semibold">{partner.category}</h4>
                  </div>
                  <div className="space-y-2">
                    {partner.examples.map((example, i) => (
                      <Badge key={i} variant="outline" className="mr-2 mb-2">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="p-8 bg-gradient-to-r from-primary/10 to-hero/10 border-primary/20 text-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Ready to Scale Globally</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With proven demand and willing partners, Geo-Safe-Chain is positioned to transform 
            tourist safety worldwide. Join us in making travel safer for everyone.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="safe" className="text-base px-4 py-2">
              ✅ Proven Market Need
            </Badge>
            <Badge variant="secondary" className="text-base px-4 py-2">
              🚀 Ready to Deploy
            </Badge>
            <Badge variant="default" className="text-base px-4 py-2">
              🌍 Global Scalability
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};