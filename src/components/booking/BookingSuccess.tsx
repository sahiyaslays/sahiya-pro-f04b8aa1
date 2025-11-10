import { BookingData } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { CheckCircle, Calendar, MapPin, Phone, Mail, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookingSuccessProps {
  bookingData: BookingData;
  bookingReference?: string;
}

export function BookingSuccess({ bookingData, bookingReference = 'SS123456' }: BookingSuccessProps) {
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

  const generateCalendarLink = () => {
    if (!bookingData.date || !bookingData.time) return '#';
    
    const startDate = new Date(bookingData.date);
    const [hours, minutes] = bookingData.time.split(':').map(Number);
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + totalDuration);
    
    const formatCalendarDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };
    
    const title = encodeURIComponent('Hair Appointment at Sahiya Slays');
    const details = encodeURIComponent(
      `Services: ${bookingData.services.map(s => s.name).join(', ')}\n` +
      `Location: Sahiya Slays, 415 Wick Lane, Tradestars Block G, Bow, London E3 2JG\n` +
      `Phone: 07943 115966\n` +
      `Reference: ${bookingReference}`
    );
    const location = encodeURIComponent('415 Wick Lane, Tradestars Block G, Bow, London E3 2JG');
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}&details=${details}&location=${location}`;
  };

  const googleMapsLink = 'https://maps.google.com/maps?q=415+Wick+Lane,+Tradestars+Block+G,+Bow,+London+E3+2JG';

  const hasColourService = bookingData.services.some(s => s.category === 'Colouring');

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-normal tracking-[0.15em] text-foreground uppercase">
          Booking Confirmed!
        </h2>
        <p className="text-muted-foreground tracking-wide">
          Thank you for choosing Sahiya Slays. We look forward to seeing you!
        </p>
        <Badge variant="secondary" className="bg-green-100 text-green-800 text-lg px-4 py-2">
          Reference: {bookingReference}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal tracking-wide uppercase">
              Your Appointment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date & Time */}
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">
                  {bookingData.date && format(new Date(bookingData.date), 'EEEE, MMMM do, yyyy')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {bookingData.time} (London time) • {formatDuration(totalDuration)}
                </p>
              </div>
            </div>

            <Separator />

            {/* Services */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm uppercase tracking-wide">Services</h4>
              {bookingData.services.map((service) => (
                <div key={service.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{service.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDuration(service.duration)} {service.quantity > 1 && `× ${service.quantity}`}
                    </p>
                  </div>
                  <span className="text-primary text-sm">{service.price}</span>
                </div>
              ))}
            </div>

            {bookingData.stylist && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm uppercase tracking-wide mb-2">Stylist</h4>
                  <p className="font-medium text-sm">{bookingData.stylist.name}</p>
                  <p className="text-xs text-muted-foreground">{bookingData.stylist.role}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Salon Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-normal tracking-wide uppercase flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Salon Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-lg">Sahiya Slays</h4>
              <div className="text-sm text-muted-foreground space-y-1 mt-2">
                <p>415 Wick Lane</p>
                <p>Tradestars Block G</p>
                <p>Bow, London E3 2JG</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a 
                  href="tel:07943115966"
                  className="text-sm hover:text-primary transition-colors"
                >
                  07943 115966
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a 
                  href="mailto:contact@sahiyaslays.com"
                  className="text-sm hover:text-primary transition-colors"
                >
                  contact@sahiyaslays.com
                </a>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full"
                variant="outline"
              >
                <a href={generateCalendarLink()} target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Calendar
                </a>
              </Button>
              
              <Button
                asChild
                className="w-full"
                variant="outline"
              >
                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-lg font-normal tracking-wide uppercase text-orange-800">
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-orange-800">
          <div className="space-y-2 text-sm">
            <p>
              <strong>Cancellation Policy:</strong> Please provide at least 48 hours notice for cancellations or rescheduling.
            </p>
            
            {hasColourService && (
              <p>
                <strong>Patch Test:</strong> As you've booked colour services, please remember that new clients 
                require a skin allergy test at least 48 hours before the appointment.
              </p>
            )}
            
            <p>
              <strong>Arrival:</strong> Please arrive 5 minutes before your appointment time.
            </p>
            
            <p>
              <strong>Pricing:</strong> Final pricing will be confirmed based on your hair length, thickness, and service complexity.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          A confirmation email has been sent to {bookingData.customerDetails.email}
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/">Return Home</Link>
          </Button>
          <Button asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}