import { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, Phone } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Contact } from '@shared/schema';
import { getInitials, getAvatarColor } from '@/lib/contacts';

interface CallModalProps {
  isOpen: boolean;
  contact: Contact | null;
  onClose: () => void;
  onCallEnd: (contact: Contact, duration: number) => void;
}

export function CallModal({ isOpen, contact, onClose, onCallEnd }: CallModalProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [callState, setCallState] = useState<'calling' | 'connected' | 'ended'>('calling');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isOpen && contact) {
      setCallDuration(0);
      setCallState('calling');
      setIsMuted(false);
      
      // Simulate call connecting after 2-3 seconds
      const connectTimeout = setTimeout(() => {
        setCallState('connected');
      }, 2000 + Math.random() * 1000);

      // Start timer when connected
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Auto-end call after 20 seconds for demo
      const autoEndTimeout = setTimeout(() => {
        handleEndCall();
      }, 20000);

      return () => {
        clearTimeout(connectTimeout);
        clearTimeout(autoEndTimeout);
        clearInterval(interval);
      };
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, contact]);

  const handleEndCall = () => {
    if (contact) {
      onCallEnd(contact, callDuration);
    }
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm p-8 text-center animate-fade-in">
        <div className="mb-6">
          <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${getAvatarColor(contact.name)} flex items-center justify-center text-white font-bold text-3xl mb-4`}>
            {getInitials(contact.name)}
          </div>
          <h3 className="text-xl font-semibold mb-2">{contact.name}</h3>
          <p className="text-muted-foreground">{contact.phone}</p>
        </div>

        <div className="mb-6">
          {callState === 'calling' && (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse-slow">
                  <Phone className="text-white text-2xl" />
                </div>
              </div>
              <p className="text-lg font-medium">Calling...</p>
            </div>
          )}
          
          {callState === 'connected' && (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Phone className="text-white text-2xl" />
                </div>
              </div>
              <p className="text-lg font-medium">Connected</p>
              <p className="text-sm text-muted-foreground mt-1">
                {formatDuration(callDuration)}
              </p>
            </div>
          )}
          
          {callState === 'ended' && (
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">Call Ended</p>
              <p className="text-sm text-muted-foreground">
                Duration: {formatDuration(callDuration)}
              </p>
            </div>
          )}
        </div>

        {callState !== 'ended' && (
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full p-0"
              onClick={handleEndCall}
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
            
            <Button
              size="lg"
              variant="secondary"
              className="w-16 h-16 rounded-full p-0"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            
            <Button
              size="lg"
              variant="secondary"
              className="w-16 h-16 rounded-full p-0"
            >
              <Volume2 className="h-6 w-6" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
