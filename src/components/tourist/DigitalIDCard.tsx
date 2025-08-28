import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QrCode, Download, Shield, Calendar, MapPin, Phone } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { digitalIDService, type DigitalTouristID } from '@/services/digitalId';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface DigitalIDCardProps {
  userId: string;
  className?: string;
}

// Mock tourist data - in production this would come from user profile
const mockTouristData = {
  fullName: "Priya Sharma",
  nationality: "Indian",
  passportNumber: "K1234567",
  emergencyContact: "+91-9876543210"
};

const mockTripData = {
  destination: "Meghalaya, India",
  plannedStartDate: new Date(),
  plannedEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  itinerary: ["Shillong", "Cherrapunji", "Mawlynnong", "Dawki"]
};

export const DigitalIDCard = ({ userId, className = "" }: DigitalIDCardProps) => {
  const [digitalId, setDigitalId] = useState<DigitalTouristID | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    generateDigitalID();
  }, [userId]);

  const generateDigitalID = async () => {
    setLoading(true);
    try {
      const id = await digitalIDService.generateDigitalID(
        userId,
        mockTouristData,
        mockTripData
      );
      setDigitalId(id);

      const qrUrl = await digitalIDService.generateQRCode(id);
      setQrCodeUrl(qrUrl);

      toast({
        title: "✅ Digital ID Generated",
        description: "Your blockchain-verified Digital ID is ready",
      });
    } catch (error) {
      console.error('Error generating Digital ID:', error);
      toast({
        title: "❌ Generation Failed",
        description: "Could not generate Digital ID",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `tourist-id-${digitalId?.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3">Generating Digital ID...</span>
        </div>
      </Card>
    );
  }

  if (!digitalId) return null;

  const isValid = digitalIDService.isValidForDate(digitalId);

  return (
    <Card className={`bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Shield className="h-5 w-5" />
          {t("tourist.digitalId")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tourist Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">{digitalId.fullName}</p>
            <p className="text-muted-foreground">{digitalId.nationality}</p>
          </div>
          <div>
            <p className="font-medium">ID: {digitalId.id}</p>
            <Badge variant={isValid ? "safe" : "restricted"} size="sm">
              {isValid ? "Valid" : "Expired"}
            </Badge>
          </div>
        </div>

        {/* Validity Period */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Valid: {format(digitalId.validFrom, 'MMM dd')} - {format(digitalId.validUntil, 'MMM dd')}</span>
          </div>
        </div>

        {/* Trip Info */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-3 w-3" />
          <span>{mockTripData.destination}</span>
        </div>

        {/* QR Code Dialog */}
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <QrCode className="h-4 w-4 mr-2" />
                Show QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">Digital Tourist ID</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                {qrCodeUrl && (
                  <div className="p-4 bg-white rounded-lg">
                    <img 
                      src={qrCodeUrl} 
                      alt="Digital ID QR Code" 
                      className="w-48 h-48"
                    />
                  </div>
                )}
                <div className="text-center space-y-2">
                  <p className="font-medium">{digitalId.fullName}</p>
                  <p className="text-sm text-muted-foreground">ID: {digitalId.id}</p>
                  <Badge variant={isValid ? "safe" : "restricted"}>
                    {isValid ? "✅ Valid ID" : "❌ Expired"}
                  </Badge>
                </div>
                <div className="flex gap-2 w-full">
                  <Button onClick={downloadQRCode} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="icon" onClick={() => window.open(`tel:${digitalId.emergencyContact}`)}>
            <Phone className="h-4 w-4" />
          </Button>
        </div>

        {/* Blockchain Hash */}
        <div className="text-xs text-muted-foreground">
          <p>Blockchain Hash:</p>
          <p className="font-mono break-all">{digitalId.blockchainHash.slice(0, 32)}...</p>
        </div>
      </CardContent>
    </Card>
  );
};