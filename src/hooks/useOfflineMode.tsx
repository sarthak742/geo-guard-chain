import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useOfflineMode = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        toast({
          title: "🟢 Connection Restored",
          description: "You're back online. All features are available.",
        });
        setWasOffline(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      
      // Simulate local alert with sound/vibration
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      
      // Play notification sound
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaBTGH0fPTfSkDJrDO89LJeSUELIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaBTGH0fPTfSkDKavd9c5qEBEwk9vy0Xr5BAq0y/LQ');
        audio.play().catch(() => {
          // Fallback if audio fails
          console.log('Audio notification failed');
        });
      } catch (error) {
        console.log('Audio not supported');
      }

      toast({
        title: "🔴 Offline Mode Activated",
        description: "Internet connection lost. Emergency features still available locally.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast, wasOffline]);

  const simulateOfflineAlert = () => {
    // For demo purposes - simulate offline alert
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    toast({
      title: "🔴 Simulated Offline Alert",
      description: "This is how the app would behave during network loss. Emergency SOS still works locally!",
      variant: "destructive",
    });
  };

  return {
    isOnline,
    simulateOfflineAlert
  };
};