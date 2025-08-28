import { differenceInMinutes } from 'date-fns';

export interface TouristLocation {
  latitude: number;
  longitude: number;
  timestamp: Date;
  accuracy?: number;
}

export interface GeofenceZone {
  id: string;
  name: string;
  center: { latitude: number; longitude: number };
  radius: number; // in meters
  type: 'safe' | 'planned' | 'restricted';
}

export interface AnomalyAlert {
  id: string;
  touristId: string;
  type: 'inactivity' | 'geofence_violation' | 'unusual_movement';
  severity: 'low' | 'medium' | 'high';
  message: string;
  location?: TouristLocation;
  timestamp: Date;
  acknowledged: boolean;
}

export class AnomalyDetectionService {
  private static instance: AnomalyDetectionService;
  private touristLocations: Map<string, TouristLocation[]> = new Map();
  private plannedItineraries: Map<string, GeofenceZone[]> = new Map();
  private activeAlerts: Map<string, AnomalyAlert[]> = new Map();
  private lastActivityTime: Map<string, Date> = new Map();

  static getInstance(): AnomalyDetectionService {
    if (!AnomalyDetectionService.instance) {
      AnomalyDetectionService.instance = new AnomalyDetectionService();
    }
    return AnomalyDetectionService.instance;
  }

  // Update tourist location and check for anomalies
  updateTouristLocation(touristId: string, location: TouristLocation): AnomalyAlert[] {
    // Store location history
    if (!this.touristLocations.has(touristId)) {
      this.touristLocations.set(touristId, []);
    }
    
    const locationHistory = this.touristLocations.get(touristId)!;
    locationHistory.push(location);
    
    // Keep only last 24 hours of data
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    this.touristLocations.set(
      touristId, 
      locationHistory.filter(loc => loc.timestamp > oneDayAgo)
    );

    // Update last activity time
    this.lastActivityTime.set(touristId, location.timestamp);

    // Check for anomalies
    const alerts: AnomalyAlert[] = [];
    
    // Check geofence violations
    const geofenceAlert = this.checkGeofenceViolation(touristId, location);
    if (geofenceAlert) alerts.push(geofenceAlert);

    // Check unusual movement patterns
    const movementAlert = this.checkUnusualMovement(touristId, location);
    if (movementAlert) alerts.push(movementAlert);

    // Store alerts
    if (alerts.length > 0) {
      if (!this.activeAlerts.has(touristId)) {
        this.activeAlerts.set(touristId, []);
      }
      this.activeAlerts.get(touristId)!.push(...alerts);
    }

    return alerts;
  }

  // Check for inactivity (no location updates)
  checkInactivityAlerts(): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = [];
    const now = new Date();
    const INACTIVITY_THRESHOLD_MINUTES = 30;

    this.lastActivityTime.forEach((lastActivity, touristId) => {
      const minutesInactive = differenceInMinutes(now, lastActivity);
      
      if (minutesInactive >= INACTIVITY_THRESHOLD_MINUTES) {
        const alert: AnomalyAlert = {
          id: `INACT-${Date.now()}-${touristId}`,
          touristId,
          type: 'inactivity',
          severity: minutesInactive > 60 ? 'high' : 'medium',
          message: `Tourist inactive for ${minutesInactive} minutes. Last seen: ${lastActivity.toLocaleTimeString()}`,
          timestamp: now,
          acknowledged: false
        };

        alerts.push(alert);

        // Store alert
        if (!this.activeAlerts.has(touristId)) {
          this.activeAlerts.set(touristId, []);
        }
        this.activeAlerts.get(touristId)!.push(alert);
      }
    });

    return alerts;
  }

  // Set planned itinerary zones for a tourist
  setPlannedItinerary(touristId: string, zones: GeofenceZone[]): void {
    this.plannedItineraries.set(touristId, zones);
  }

  // Check if tourist has left planned itinerary zones
  private checkGeofenceViolation(touristId: string, location: TouristLocation): AnomalyAlert | null {
    const itinerary = this.plannedItineraries.get(touristId);
    if (!itinerary || itinerary.length === 0) return null;

    // Check if current location is within any planned zone
    const isInPlannedZone = itinerary.some(zone => 
      this.isLocationInZone(location, zone)
    );

    if (!isInPlannedZone) {
      return {
        id: `GEO-${Date.now()}-${touristId}`,
        touristId,
        type: 'geofence_violation',
        severity: 'medium',
        message: `Tourist has left planned itinerary area. Current location: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`,
        location,
        timestamp: new Date(),
        acknowledged: false
      };
    }

    return null;
  }

  // Check for unusual movement patterns
  private checkUnusualMovement(touristId: string, location: TouristLocation): AnomalyAlert | null {
    const locationHistory = this.touristLocations.get(touristId);
    if (!locationHistory || locationHistory.length < 3) return null;

    // Get last 3 locations to calculate speed
    const recentLocations = locationHistory.slice(-3);
    const speed = this.calculateAverageSpeed(recentLocations);

    // Alert for unusually fast movement (>100 km/h - might indicate emergency vehicle)
    const FAST_MOVEMENT_THRESHOLD = 100; // km/h
    
    if (speed > FAST_MOVEMENT_THRESHOLD) {
      return {
        id: `MOVE-${Date.now()}-${touristId}`,
        touristId,
        type: 'unusual_movement',
        severity: 'high',
        message: `Unusual fast movement detected: ${speed.toFixed(1)} km/h. Possible emergency situation.`,
        location,
        timestamp: new Date(),
        acknowledged: false
      };
    }

    return null;
  }

  // Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Check if location is within a geofence zone
  private isLocationInZone(location: TouristLocation, zone: GeofenceZone): boolean {
    const distance = this.calculateDistance(
      location.latitude,
      location.longitude,
      zone.center.latitude,
      zone.center.longitude
    );
    
    return distance * 1000 <= zone.radius; // Convert km to meters
  }

  // Calculate average speed from recent locations
  private calculateAverageSpeed(locations: TouristLocation[]): number {
    if (locations.length < 2) return 0;

    let totalDistance = 0;
    let totalTime = 0;

    for (let i = 1; i < locations.length; i++) {
      const distance = this.calculateDistance(
        locations[i-1].latitude,
        locations[i-1].longitude,
        locations[i].latitude,
        locations[i].longitude
      );
      
      const timeDiff = (locations[i].timestamp.getTime() - locations[i-1].timestamp.getTime()) / (1000 * 60 * 60); // hours
      
      totalDistance += distance;
      totalTime += timeDiff;
    }

    return totalTime > 0 ? totalDistance / totalTime : 0; // km/h
  }

  // Get active alerts for a tourist
  getActiveAlerts(touristId: string): AnomalyAlert[] {
    return this.activeAlerts.get(touristId) || [];
  }

  // Acknowledge an alert
  acknowledgeAlert(alertId: string): void {
    this.activeAlerts.forEach(alerts => {
      const alert = alerts.find(a => a.id === alertId);
      if (alert) {
        alert.acknowledged = true;
      }
    });
  }

  // Get all active alerts across all tourists
  getAllActiveAlerts(): AnomalyAlert[] {
    const allAlerts: AnomalyAlert[] = [];
    this.activeAlerts.forEach(alerts => {
      allAlerts.push(...alerts.filter(alert => !alert.acknowledged));
    });
    return allAlerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Simulate location update for demo
  simulateLocationUpdate(touristId: string, baseLocation: { lat: number; lng: number }): AnomalyAlert[] {
    const location: TouristLocation = {
      latitude: baseLocation.lat + (Math.random() - 0.5) * 0.01, // Small random movement
      longitude: baseLocation.lng + (Math.random() - 0.5) * 0.01,
      timestamp: new Date(),
      accuracy: 5
    };

    return this.updateTouristLocation(touristId, location);
  }
}

export const anomalyDetectionService = AnomalyDetectionService.getInstance();
