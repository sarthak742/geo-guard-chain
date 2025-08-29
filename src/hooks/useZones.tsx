import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Security: Zone interface excludes sensitive user data for public display
export interface Zone {
  id: string;
  // user_id removed for privacy - not needed in frontend display
  latitude: number;
  longitude: number;
  zone_type: 'safe' | 'crowded' | 'avoid';
  description: string | null;
  blockchain_tx_hash: string | null;
  created_at: string;
  updated_at: string;
}

// Private interface for backend operations only
interface ZoneWithUser extends Zone {
  user_id: string;
}

export const useZones = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch zones from database - excluding sensitive user data
  const fetchZones = async () => {
    try {
      setLoading(true);
      // Security: Only select fields needed for public display, exclude user_id
      const { data, error } = await supabase
        .from('geofences')
        .select('id, name, geometry, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching zones:', error);
        return;
      }

      // Transform geofences data to match Zone interface
      const transformedData = (data || []).map(item => ({
        id: item.id,
        latitude: 0, // Default values since geofences use geometry
        longitude: 0,
        zone_type: 'safe' as const,
        description: item.name,
        blockchain_tx_hash: null,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));

      setZones(transformedData);
    } catch (error) {
      console.error('Error fetching zones:', error);
    } finally {
      setLoading(false);
    }
  };

  // Report a new zone (with blockchain integration)
  const reportZone = async (
    latitude: number,
    longitude: number,
    zoneType: 'safe' | 'crowded' | 'avoid',
    description?: string
  ) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to report zones.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Storing on blockchain...",
        description: "Your report is being secured on Polygon testnet.",
      });

      // Call the blockchain logger edge function
      const { data, error } = await supabase.functions.invoke('blockchain-logger', {
        body: {
          latitude,
          longitude,
          zone_type: zoneType,
          description,
          user_id: user.id
        }
      });

      if (error) {
        console.error('Blockchain logging error:', error);
        toast({
          title: "Error",
          description: "Failed to secure report on blockchain.",
          variant: "destructive",
        });
        return;
      }

      console.log('Zone reported successfully:', data);

      toast({
        title: "✅ Zone reported successfully!",
        description: `Report secured on blockchain. TX: ${data.blockchain.txHash.substring(0, 10)}...`,
        action: data.blockchain.polygonScanUrl ? (
          <a 
            href={data.blockchain.polygonScanUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline"
          >
            View on PolygonScan
          </a>
        ) : undefined,
      });

      // Refresh zones
      await fetchZones();
    } catch (error) {
      console.error('Error reporting zone:', error);
      toast({
        title: "Error",
        description: "Failed to report zone. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchZones();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('zones-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'zones'
        },
        (payload) => {
          console.log('Real-time zone update:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newZone = payload.new as ZoneWithUser;
            // Security: Remove user_id before adding to public state
            const { user_id, ...publicZone } = newZone;
            setZones(prev => [publicZone, ...prev]);
            
            // Show toast for new zones from other users
            if (user_id !== user?.id) {
              toast({
                title: "New zone reported!",
                description: `A ${newZone.zone_type} zone was reported nearby.`,
              });
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedZoneWithUser = payload.new as ZoneWithUser;
            // Security: Remove user_id before updating public state
            const { user_id, ...updatedZone } = updatedZoneWithUser;
            setZones(prev => prev.map(zone => 
              zone.id === updatedZone.id ? updatedZone : zone
            ));
          } else if (payload.eventType === 'DELETE') {
            const deletedZone = payload.old as Zone;
            setZones(prev => prev.filter(zone => zone.id !== deletedZone.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, toast]);

  return {
    zones,
    loading,
    reportZone,
    fetchZones
  };
};