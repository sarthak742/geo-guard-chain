import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, Upload, CheckCircle, XCircle, Shield, Calendar, MapPin, Phone } from 'lucide-react';
import { digitalIDService } from '@/services/digitalId';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import QrScanner from 'qr-scanner';

interface ScannedIDData {
  id: string;
  name: string;
  nationality: string;
  validFrom: string;
  validUntil: string;
  hash: string;
  emergency: string;
  destination: string;
  timestamp: number;
}

export const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedIDData | null>(null);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; reason?: string } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      setIsScanning(true);
      
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => handleScanResult(result.data),
        {
          onDecodeError: (error) => {
            // Silently handle decode errors - normal when no QR code is visible
            console.debug('QR decode error:', error);
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      await qrScannerRef.current.start();
      
      toast({
        title: "📷 Scanner Active",
        description: "Point camera at Digital Tourist ID QR code",
      });
    } catch (error) {
      console.error('Error starting scanner:', error);
      toast({
        title: "Camera Access Required",
        description: "Please allow camera access to scan QR codes",
        variant: "destructive"
      });
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScanResult = (data: string) => {
    stopScanning();
    
    const validation = digitalIDService.validateDigitalID(data);
    setValidationResult(validation);
    
    if (validation.isValid && validation.data) {
      setScannedData(validation.data);
      toast({
        title: "✅ Valid Digital ID",
        description: `Tourist: ${validation.data.name}`,
      });
    } else {
      toast({
        title: "❌ Invalid Digital ID",
        description: validation.reason || "Could not verify ID",
        variant: "destructive"
      });
    }
    
    setShowResult(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then(result => handleScanResult(result.data))
      .catch(error => {
        console.error('Error scanning image:', error);
        toast({
          title: "Scan Failed",
          description: "Could not find QR code in image",
          variant: "destructive"
        });
      });
  };

  const resetScanner = () => {
    setScannedData(null);
    setValidationResult(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Scanner Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authority ID Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isScanning ? (
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button onClick={startScanning} className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera Scan
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <video 
                  ref={videoRef} 
                  className="w-full h-64 object-cover rounded-lg bg-muted"
                />
                <div className="absolute inset-0 border-2 border-primary border-dashed rounded-lg pointer-events-none flex items-center justify-center">
                  <div className="bg-background/80 rounded-lg p-2">
                    <p className="text-sm font-medium">Align QR code within frame</p>
                  </div>
                </div>
              </div>
              
              <Button onClick={stopScanning} variant="outline" className="w-full">
                Stop Scanning
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Validation Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {validationResult?.isValid ? (
                <CheckCircle className="h-5 w-5 text-safe" />
              ) : (
                <XCircle className="h-5 w-5 text-emergency" />
              )}
              ID Verification Result
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Badge 
              variant={validationResult?.isValid ? "safe" : "restricted"}
              className="w-full justify-center p-2"
            >
              {validationResult?.isValid ? "✅ VALID TOURIST ID" : "❌ INVALID ID"}
            </Badge>

            {validationResult?.isValid && scannedData ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium">Name:</p>
                    <p>{scannedData.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">ID:</p>
                    <p className="font-mono text-xs">{scannedData.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Valid: {format(new Date(scannedData.validFrom), 'MMM dd')} - {format(new Date(scannedData.validUntil), 'MMM dd')}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{scannedData.destination}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>Emergency: {scannedData.emergency}</span>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>Blockchain Hash:</p>
                  <p className="font-mono break-all">{scannedData.hash.slice(0, 32)}...</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>{validationResult?.reason || "Invalid QR code format"}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={resetScanner} variant="outline" className="flex-1">
                Scan Another
              </Button>
              {validationResult?.isValid && (
                <Button 
                  onClick={() => window.open(`tel:${scannedData?.emergency}`)}
                  className="flex-1"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};