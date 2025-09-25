import { useState } from 'react';
import { BookingData } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, Clock, User, Mail, Phone, CreditCard, Banknote } from 'lucide-react';

interface ReviewAndPayProps {
  bookingData: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ReviewAndPay({ bookingData, onUpdate, onNext, onBack }: ReviewAndPayProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>(bookingData.paymentMethod || 'stripe-full');

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

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    onUpdate({ paymentMethod: method as any });
  };

  const handleConfirmBooking = () => {
    if (paymentMethod.startsWith('stripe-')) {
      // In real app, this would open Stripe checkout
      alert('This would open Stripe Checkout in a new tab');
    } else {
      // Generate booking reference and proceed to success
      const bookingRef = `SS${Date.now().toString().slice(-6)}`;
      onNext();
    }
  };

  const getButtonText = () => {
    switch (paymentMethod) {
      case 'stripe-full':
        return 'Continue';
      case 'stripe-deposit':
        return 'Continue';
      case 'salon':
        return 'Confirm Booking';
      default:
        return 'Continue';
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
        <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-3">
          {/* Credit Card Option */}
          <div className="bg-background border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="stripe-full" id="stripe-full" />
              <Label htmlFor="stripe-full" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground">
                      Credit Card
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Pay with Visa, Mastercard, or American Express
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </div>

          {/* Deposit Option */}
          <div className="bg-background border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="stripe-deposit" id="stripe-deposit" />
              <Label htmlFor="stripe-deposit" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground">
                      Pay £20 Deposit
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Secure your booking with a deposit
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </div>

          {/* Pay at Salon Option */}
          <div className="bg-background border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="salon" id="salon" />
              <Label htmlFor="salon" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Banknote className="h-5 w-5 text-foreground" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground">
                      Pay at Salon
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Pay when you arrive for your appointment
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12"
        >
          Cancel Payment Method
        </Button>
        <Button
          onClick={handleConfirmBooking}
          className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}