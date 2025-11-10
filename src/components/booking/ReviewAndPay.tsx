import { useState } from 'react';
import { BookingData } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, Clock, User, Mail, Phone, CreditCard } from 'lucide-react';

interface ReviewAndPayProps {
  bookingData: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ReviewAndPay({ bookingData, onUpdate, onNext, onBack }: ReviewAndPayProps) {
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalDuration = bookingData.services.reduce((total, service) => 
    total + (service.duration * service.quantity), 0
  );

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  };

  const totalAmount = bookingData.services.reduce((sum, service) => 
    sum + (parseFloat(service.price) * service.quantity), 0
  );

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('create-booking-payment', {
        body: {
          services: bookingData.services.map(s => ({
            id: s.id,
            name: s.name,
            price: parseFloat(s.price),
            duration: s.duration,
          })),
          stylistId: bookingData.stylist?.id,
          bookingDate: bookingData.date || '',
          bookingTime: bookingData.time || '',
          totalDuration,
          totalAmount,
          paymentType,
          guestName: `${bookingData.customerDetails.firstName} ${bookingData.customerDetails.lastName}`,
          guestEmail: bookingData.customerDetails.email,
          guestPhone: bookingData.customerDetails.phone || '',
          specialRequests: bookingData.customerDetails.notes || '',
        },
      });
      
      if (error) {
        console.error('Booking payment error:', error);
        throw error;
      }
      
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-medium text-foreground">
          Payment
        </h2>
        <h3 className="text-lg font-medium text-foreground">
          Choose a payment method
        </h3>
        <p className="text-muted-foreground text-sm">
          Select your preferred payment option
        </p>
      </div>

      {/* Booking Summary - Minimal */}
      <div className="bg-muted/30 rounded-lg p-4 space-y-3">
        <div className="text-sm">
          <p className="font-medium">{bookingData.services.length} service(s)</p>
          <p className="text-muted-foreground">
            {bookingData.date && format(new Date(bookingData.date), 'MMM do, yyyy')} at {bookingData.time}
          </p>
          {bookingData.stylist && (
            <p className="text-muted-foreground">with {bookingData.stylist.name}</p>
          )}
        </div>
        <div className="text-center pt-2">
          <Badge variant="secondary" className="text-xs">
            Final pricing confirmed in salon
          </Badge>
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-4">
        <RadioGroup value={paymentType} onValueChange={(value: 'deposit' | 'full') => setPaymentType(value)} className="space-y-3">
          {/* Deposit Option */}
          <div className="bg-background border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="deposit" id="deposit" />
              <Label htmlFor="deposit" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground">
                      Pay £20 Deposit
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Secure your booking with a deposit, pay remaining at salon
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </div>

          {/* Full Payment Option */}
          <div className="bg-background border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground">
                      Pay Full Amount
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Pay £{totalAmount.toFixed(2)} now via card
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>
        
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="text-primary">🔒</span>
            <span>Secure payment powered by Stripe. You'll be redirected to complete your payment.</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
          disabled={isProcessing}
        >
          Back
        </Button>
        <Button
          onClick={handleConfirmBooking}
          className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Continue to Payment'}
        </Button>
      </div>
    </div>
  );
}