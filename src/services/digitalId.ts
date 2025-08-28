import QRCode from 'qrcode';
import { format, addDays, isAfter, isBefore } from 'date-fns';

export interface DigitalTouristID {
  id: string;
  userId: string;
  fullName: string;
  nationality: string;
  passportNumber: string;
  validFrom: Date;
  validUntil: Date;
  blockchainHash: string;
  qrCodeData: string;
  emergencyContact: string;
}

export interface TripData {
  destination: string;
  plannedStartDate: Date;
  plannedEndDate: Date;
  itinerary?: string[];
}

export class DigitalIDService {
  private static instance: DigitalIDService;

  static getInstance(): DigitalIDService {
    if (!DigitalIDService.instance) {
      DigitalIDService.instance = new DigitalIDService();
    }
    return DigitalIDService.instance;
  }

  async generateDigitalID(
    userId: string, 
    userData: {
      fullName: string;
      nationality: string;
      passportNumber: string;
      emergencyContact: string;
    }, 
    tripData: TripData
  ): Promise<DigitalTouristID> {
    // Generate unique Digital ID
    const digitalId = `DID-${Date.now()}-${userId.slice(0, 8)}`;
    
    // Create blockchain-like hash (simulated for MVP)
    const blockchainHash = await this.generateBlockchainHash({
      id: digitalId,
      userId,
      ...userData,
      tripData
    });

    // Create QR code data with verification info
    const qrCodeData = JSON.stringify({
      id: digitalId,
      name: userData.fullName,
      nationality: userData.nationality,
      validFrom: tripData.plannedStartDate.toISOString(),
      validUntil: tripData.plannedEndDate.toISOString(),
      hash: blockchainHash,
      emergency: userData.emergencyContact,
      destination: tripData.destination,
      timestamp: Date.now()
    });

    const digitalID: DigitalTouristID = {
      id: digitalId,
      userId,
      fullName: userData.fullName,
      nationality: userData.nationality,
      passportNumber: userData.passportNumber,
      validFrom: tripData.plannedStartDate,
      validUntil: tripData.plannedEndDate,
      blockchainHash,
      qrCodeData,
      emergencyContact: userData.emergencyContact
    };

    return digitalID;
  }

  async generateQRCode(digitalId: DigitalTouristID): Promise<string> {
    try {
      const qrCodeUrl = await QRCode.toDataURL(digitalId.qrCodeData, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.92,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      return qrCodeUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  validateDigitalID(qrData: string): { isValid: boolean; data?: any; reason?: string } {
    try {
      const data = JSON.parse(qrData);
      const now = new Date();
      const validFrom = new Date(data.validFrom);
      const validUntil = new Date(data.validUntil);

      if (isBefore(now, validFrom)) {
        return { isValid: false, reason: 'ID not yet valid' };
      }

      if (isAfter(now, validUntil)) {
        return { isValid: false, reason: 'ID has expired' };
      }

      // Verify required fields
      if (!data.id || !data.name || !data.hash) {
        return { isValid: false, reason: 'Invalid ID format' };
      }

      return { isValid: true, data };
    } catch (error) {
      return { isValid: false, reason: 'Invalid QR code format' };
    }
  }

  private async generateBlockchainHash(data: any): Promise<string> {
    // Simulate blockchain transaction for MVP
    // In production, this would interact with actual blockchain
    const dataString = JSON.stringify(data);
    const hash = await this.simpleHash(dataString);
    
    // Store in mock blockchain ledger
    console.log('Blockchain Transaction:', {
      hash,
      data: dataString,
      timestamp: new Date().toISOString(),
      block: Math.floor(Math.random() * 1000000)
    });

    return hash;
  }

  private async simpleHash(data: string): Promise<string> {
    // Simple hash function for demo
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data + Date.now());
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  isValidForDate(digitalId: DigitalTouristID, date: Date = new Date()): boolean {
    return !isBefore(date, digitalId.validFrom) && !isAfter(date, digitalId.validUntil);
  }
}

export const digitalIDService = DigitalIDService.getInstance();