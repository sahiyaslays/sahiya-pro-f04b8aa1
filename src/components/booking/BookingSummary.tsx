import { BookingData } from '@/types/booking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Edit3, Plus } from 'lucide-react';

interface BookingSummaryProps {
  bookingData: BookingData;
  onEditStep: (step: number) => void;
  className?: string;
}

export function BookingSummary({ bookingData, onEditStep, className }: BookingSummaryProps) {
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

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-normal tracking-wide uppercase">
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Services */}
        {bookingData.services.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm uppercase tracking-wide">Services</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(1)}
                className="h-auto p-1 text-primary hover:text-primary/80"
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
            {bookingData.services.map((service) => (
              <div key={service.id} className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-primary">{service.price}</span>
                </div>
                <div className="text-muted-foreground text-xs">
                  {formatDuration(service.duration)} {service.quantity > 1 && `× ${service.quantity}`}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditStep(1)}
              className="w-full mt-2 border-dashed border-primary/50 text-primary hover:bg-primary/5 hover:border-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More Services
            </Button>
            <Separator />
          </div>
        )}

        {/* Stylist */}
        {bookingData.stylist && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm uppercase tracking-wide">Stylist</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(2)}
                className="h-auto p-1 text-primary hover:text-primary/80"
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-sm">
              <div className="font-medium">{bookingData.stylist.name}</div>
              <div className="text-muted-foreground text-xs">{bookingData.stylist.role}</div>
            </div>
            <Separator />
          </div>
        )}

        {/* Date & Time */}
        {bookingData.date && bookingData.time && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm uppercase tracking-wide">Date & Time</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditStep(3)}
                className="h-auto p-1 text-primary hover:text-primary/80"
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-sm">
              <div className="font-medium">
                {format(new Date(bookingData.date), 'EEEE, MMMM do, yyyy')}
              </div>
              <div className="text-muted-foreground text-xs">
                {bookingData.time} (London time)
              </div>
              <div className="text-muted-foreground text-xs">
                Duration: {formatDuration(totalDuration)}
              </div>
            </div>
            <Separator />
          </div>
        )}

        {/* Total */}
        {bookingData.services.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm uppercase tracking-wide">Estimated Total</h4>
            <div className="text-lg font-medium text-primary">
              Prices from services above
            </div>
            <p className="text-xs text-muted-foreground">
              Final price confirmed in salon; 'from' prices may vary by hair length, thickness, or complexity.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}