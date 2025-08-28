import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Phone, Volume2 } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useToast } from '@/hooks/use-toast';

interface VoiceSOSProps {
  onSOSActivated: (message: string, audioBlob?: Blob) => void;
  className?: string;
}

export const VoiceSOS = ({ onSOSActivated, className = "" }: VoiceSOSProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup MediaRecorder for audio
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      // Setup Speech Recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-IN';

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscription(finalTranscript || interimTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          toast({
            title: "Voice Recognition Error",
            description: "Please try again or use manual SOS",
            variant: "destructive"
          });
        };

        recognitionRef.current.start();
      }

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTranscription("");

      toast({
        title: "🎤 Recording Started",
        description: i18n.language === 'hi' ? "हिंदी या अंग्रेजी में बोलें" : "Speak in Hindi or English",
      });

    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access for voice SOS",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setIsRecording(false);
    setIsTranscribing(true);

    // Simulate processing delay
    setTimeout(() => {
      setIsTranscribing(false);
      
      if (transcription.trim()) {
        onSOSActivated(transcription, audioBlob);
        toast({
          title: "🚨 SOS Activated",
          description: `Message: "${transcription.slice(0, 50)}..."`,
          variant: "destructive"
        });
      } else {
        // Fallback to default emergency message
        const defaultMessage = i18n.language === 'hi' 
          ? "आपातकालीन सहायता चाहिए" 
          : "Emergency assistance needed";
        onSOSActivated(defaultMessage, audioBlob);
        
        toast({
          title: "🚨 SOS Activated",
          description: "Emergency message sent with audio recording",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const quickSOS = () => {
    const quickMessage = i18n.language === 'hi' 
      ? "तत्काल मदद चाहिए! आपातकाल!"
      : "Need immediate help! Emergency!";
    
    onSOSActivated(quickMessage);
    
    toast({
      title: "🚨 EMERGENCY SOS",
      description: quickMessage,
      variant: "destructive"
    });
  };

  return (
    <Card className={`bg-gradient-to-r from-emergency/10 to-emergency/5 border-emergency/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-emergency">
          <Phone className="h-5 w-5" />
          Voice SOS System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recording Status */}
        {isRecording && (
          <div className="flex items-center gap-2 p-3 bg-emergency/10 rounded-lg">
            <div className="animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 bg-emergency rounded-full"></div>
              <span className="text-emergency font-medium">Recording...</span>
            </div>
            <Badge variant="outline" className="ml-auto">
              {i18n.language === 'hi' ? 'हिंदी/English' : 'Hindi/English'}
            </Badge>
          </div>
        )}

        {/* Transcription Display */}
        {(transcription || isTranscribing) && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="h-4 w-4" />
              <span className="text-sm font-medium">Live Transcription:</span>
            </div>
            <p className="text-sm">
              {isTranscribing ? (
                <span className="animate-pulse">Processing speech...</span>
              ) : (
                transcription || "Waiting for speech..."
              )}
            </p>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-3">
          {!isRecording ? (
            <>
              <Button 
                onClick={startRecording} 
                className="flex-1 bg-emergency hover:bg-emergency/90"
                size="lg"
              >
                <Mic className="h-5 w-5 mr-2" />
                Voice SOS
              </Button>
              <Button 
                onClick={quickSOS}
                variant="outline"
                className="border-emergency text-emergency hover:bg-emergency hover:text-emergency-foreground"
              >
                Quick SOS
              </Button>
            </>
          ) : (
            <Button 
              onClick={stopRecording} 
              className="w-full bg-emergency hover:bg-emergency/90"
              size="lg"
            >
              <MicOff className="h-5 w-5 mr-2" />
              Stop & Send SOS
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• {i18n.language === 'hi' ? 'हिंदी या अंग्रेजी में बोलें' : 'Speak in Hindi or English'}</p>
          <p>• {i18n.language === 'hi' ? 'स्पष्ट रूप से अपनी समस्या बताएं' : 'Clearly describe your emergency'}</p>
          <p>• {i18n.language === 'hi' ? 'ऑडियो और टेक्स्ट दोनों भेजे जाएंगे' : 'Both audio and text will be sent'}</p>
        </div>
      </CardContent>
    </Card>
  );
};