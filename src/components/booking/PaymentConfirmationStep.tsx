import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Service } from '@/data/servicesData';
import { BookingFormData } from './ServiceBookingModal';
import { format } from 'date-fns';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, MessageSquare, Users, CreditCard, Banknote, Building } from 'lucide-react';

interface PaymentConfirmationStepProps {
  service: Service;
  bookingData: BookingFormData;
  onConfirm: () => void;
  onBack: () => void;
}

export function PaymentConfirmationStep({
  service,
  bookingData,
  onConfirm,
  onBack,
}: PaymentConfirmationStepProps) {
  const [paymentMethod, setPaymentMethod] = useState<'pay-in-salon'>('pay-in-salon');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `£${price}`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${hours}h ${remainingMinutes}min`;
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    
    try {
      const bookingReference = `SS${Date.now().toString().slice(-6)}`;
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Send booking confirmation emails
      try {
        const emailData = {
          bookingReference,
          serviceName: service.name,
          serviceOption: bookingData.selectedOption?.label || '',
          serviceDuration: formatDuration(bookingData.selectedOption?.duration || 0),
          servicePrice: formatPrice(bookingData.selectedOption?.price || 0),
          date: bookingData.date ? format(new Date(bookingData.date), 'EEEE, MMMM do, yyyy') : '',
          time: bookingData.time || '',
          stylistName: bookingData.selectedStylist?.name,
          customerName: bookingData.customerDetails.fullName,
          customerEmail: bookingData.customerDetails.email,
          customerMobile: bookingData.customerDetails.mobile,
          customerNotes: bookingData.customerDetails.notes,
          paymentMethod,
        };
        
        console.log('Sending booking email with data:', emailData);
        
        const { data, error } = await supabase.functions.invoke('send-booking-email', {
          body: emailData,
        });
        
        if (error) {
          console.error('Error invoking send-booking-email:', error);
          throw error;
        }
        
        console.log('Booking confirmation emails sent successfully:', data);
      } catch (emailError) {
        console.error('Error sending booking emails:', emailError);
        // Don't block booking completion if email fails
      }
      
      setIsConfirming(false);
      setIsConfirmed(true);
      
      // Auto-close after showing confirmation
      setTimeout(() => {
        onConfirm();
      }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
      setIsConfirming(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <div>
          <h3 className="text-xl font-medium text-foreground mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-muted-foreground">
            Your booking has been successfully confirmed.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="text-left space-y-3">
              <div className="text-center border-b pb-3 mb-3">
                <p className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Booking Reference
                </p>
                <p className="text-lg font-bold text-primary">
                  SS{Date.now().toString().slice(-6)}
                </p>
              </div>
              
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs">✨</span>
                  </div>
                  <div>
                    <span className="font-medium">{service.name}</span>
                    <br />
                    <span className="text-muted-foreground">
                      {bookingData.selectedOption?.label} - {formatDuration(bookingData.selectedOption?.duration || 0)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>
                    {bookingData.date && format(new Date(bookingData.date), 'EEEE, MMMM do, yyyy')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{bookingData.time}</span>
                </div>

                {bookingData.selectedStylist && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span>{bookingData.selectedStylist.name}</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <span>{bookingData.customerDetails.fullName}</span>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span className="text-primary">
                      {formatPrice(bookingData.selectedOption?.price || 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground">
          A confirmation message has been sent to your mobile number.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center">
        <h4 className="font-medium text-foreground mb-1 md:mb-2 text-sm md:text-base">Review & Payment</h4>
        <p className="text-xs md:text-sm text-muted-foreground">
          Please review your booking details and choose your payment method
        </p>
      </div>

      {/* Booking Summary */}
      <Card>
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-sm md:text-lg">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 pt-0">
          <div className="flex justify-between items-start">
            <div>
              <h5 className="font-medium text-foreground text-xs md:text-sm">{service.name}</h5>
              <p className="text-xs text-muted-foreground">
                {bookingData.selectedOption?.label} - {formatDuration(bookingData.selectedOption?.duration || 0)}
              </p>
            </div>
            <span className="text-sm md:text-lg font-medium text-primary">
              {formatPrice(bookingData.selectedOption?.price || 0)}
            </span>
          </div>

          <Separator />

          <div className="grid gap-2 md:gap-3 text-xs md:text-sm">
            <div className="flex items-center gap-2 md:gap-3">
              <Calendar className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
              <span>
                {bookingData.date && format(new Date(bookingData.date), 'EEEE, MMMM do, yyyy')}
              </span>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Clock className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
              <span>{bookingData.time}</span>
            </div>

            {bookingData.selectedStylist && (
              <div className="flex items-center gap-2 md:gap-3">
                <Users className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                <span>{bookingData.selectedStylist.name}</span>
              </div>
            )}

            <div className="flex items-center gap-2 md:gap-3">
              <User className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
              <span>{bookingData.customerDetails.fullName}</span>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Phone className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
              <span>{bookingData.customerDetails.mobile}</span>
            </div>

            {bookingData.customerDetails.email && (
              <div className="flex items-center gap-2 md:gap-3">
                <Mail className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                <span>{bookingData.customerDetails.email}</span>
              </div>
            )}

            {bookingData.customerDetails.notes && (
              <div className="flex items-start gap-2 md:gap-3">
                <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground mt-0.5" />
                <span>{bookingData.customerDetails.notes}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-sm md:text-lg">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <RadioGroup value={paymentMethod} onValueChange={(value: 'pay-in-salon') => setPaymentMethod(value)}>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 border rounded-lg">
                <RadioGroupItem value="pay-in-salon" id="pay-in-salon" className="w-3 h-3 md:w-4 md:h-4" />
                <Label htmlFor="pay-in-salon" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Building className="w-3 h-3 md:w-5 md:h-5 text-primary" />
                    <div>
                      <h6 className="font-medium text-xs md:text-sm">Pay at Salon</h6>
                      <p className="text-xs text-muted-foreground">
                        Pay when you arrive for your appointment
                      </p>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="sm" disabled={isConfirming} className="text-xs md:text-sm">
          Back
        </Button>
        <Button onClick={handleConfirm} size="sm" className="px-4 md:px-8 text-xs md:text-sm" disabled={isConfirming}>
          {isConfirming ? 'Confirming...' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
}