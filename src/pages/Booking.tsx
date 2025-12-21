import { useState, useEffect } from 'react';
import { BookingData, BookingStep } from '@/types/booking';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { ProgressBar } from '@/components/booking/ProgressBar';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { ServiceSelection } from '@/components/booking/ServiceSelection';
import { StylistSelection } from '@/components/booking/StylistSelection';
import { DateTimeSelection } from '@/components/booking/DateTimeSelection';
import { CustomerDetails } from '@/components/booking/CustomerDetails';
import { ReviewAndPay } from '@/components/booking/ReviewAndPay';
import { BookingSuccess } from '@/components/booking/BookingSuccess';

const Booking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [bookingData, setBookingData] = useState<BookingData>({
    services: [],
    customerDetails: {
      firstName: '',
      lastName: '',
      email: '',
      agreesToPolicy: false,
      wantsReminders: false
    }
  });

  // Handle successful booking return from Stripe
  useEffect(() => {
    const success = searchParams.get('success');
    const bookingId = searchParams.get('bookingId');

    if (success === 'true' && bookingId) {
      handleBookingSuccess(bookingId);
      // Clean up URL
      setSearchParams({});
    }
  }, [searchParams]);

  const handleBookingSuccess = async (bookingId: string) => {
    try {
      // Fetch booking details
      const { data: booking, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (error) throw error;

      setBookingReference(bookingId.substring(0, 8).toUpperCase());
      
      // Send confirmation emails
      try {
        const services = Array.isArray(booking.services) ? booking.services : [];
        await supabase.functions.invoke('send-booking-email', {
          body: {
            emailType: 'initial',
            bookingId: bookingId,
            customerEmail: booking.guest_email,
            customerName: booking.guest_name || 'Customer',
            customerPhone: booking.guest_phone || '',
            services: services.map((s: any) => ({
              name: s.name || 'Service',
              duration: s.duration || 0,
              price: typeof s.price === 'number' ? `£${s.price.toFixed(2)}` : s.price || '£0.00',
            })),
            bookingDate: booking.booking_date,
            bookingTime: booking.booking_time,
            totalAmount: booking.total_amount,
            paymentType: booking.payment_type,
            specialRequests: booking.special_requests,
            stylistId: booking.stylist_id,
          }
        });
        console.log('Booking confirmation email sent successfully');
      } catch (emailError) {
        console.error('Email error:', emailError);
      }

      // Try to create account for guest users
      if (booking.guest_email && !booking.user_id) {
        try {
          await createGuestAccount(booking.guest_email, booking.guest_name);
        } catch (accountError) {
          console.error('Account creation error:', accountError);
        }
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error handling booking success:', error);
      toast.error('Failed to load booking details');
    }
  };

  const createGuestAccount = async (email: string, name: string) => {
    try {
      // Generate random password
      const randomPassword = Math.random().toString(36).slice(-12) + 'A1!';
      
      const names = name.split(' ');
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '';

      const { data, error } = await supabase.auth.signUp({
        email,
        password: randomPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/user-dashboard`,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: '',
          },
        },
      });

      if (error) {
        // If account already exists, that's okay
        if (error.message.includes('already registered')) {
          console.log('Account already exists for:', email);
          return;
        }
        throw error;
      }

      console.log('Account created successfully for:', email);
      toast.success('Account created! Check your email to set your password.');
    } catch (error: any) {
      console.error('Account creation error:', error);
      throw error;
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const goToStep = (step: BookingStep) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as BookingStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as BookingStep);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            bookingData={bookingData}
            onUpdate={updateBookingData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <StylistSelection
            bookingData={bookingData}
            onUpdate={updateBookingData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <DateTimeSelection
            bookingData={bookingData}
            onUpdate={updateBookingData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <CustomerDetails
            bookingData={bookingData}
            onUpdate={updateBookingData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <ReviewAndPay
            bookingData={bookingData}
            onUpdate={updateBookingData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return <BookingSuccess bookingData={bookingData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-abel">
      <Header />

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Booking Request Submitted!
              </h2>
              <p className="text-muted-foreground">
                We'll review your booking and send confirmation to your email.
              </p>
              {bookingReference && (
                <p className="text-sm text-muted-foreground">
                  Reference: <span className="font-mono font-semibold">{bookingReference}</span>
                </p>
              )}
            </div>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = '/';
                }}
                className="flex-1"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = '/user-dashboard';
                }}
                className="flex-1 bg-foreground text-background hover:bg-foreground/90"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Add spacing for header */}
      <div className="pt-16">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Main Content */}
        <main className="py-4">
        <div className="max-w-6xl mx-auto px-4">
          {currentStep < 6 ? (
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Form Content */}
              <div className="lg:col-span-3">
                {renderStep()}
              </div>

              {/* Booking Summary - Desktop */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <BookingSummary
                    bookingData={bookingData}
                    onEditStep={goToStep}
                  />
                </div>
              </div>

              {/* Booking Summary - Mobile (Collapsible) */}
              <div className="lg:hidden">
                <BookingSummary
                  bookingData={bookingData}
                  onEditStep={goToStep}
                  className="mb-4"
                />
              </div>
            </div>
          ) : (
            /* Success Page - Full Width */
            <div className="max-w-4xl mx-auto">
              {renderStep()}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B0B0B] py-8 px-4 mt-8">
        <div className="max-w-[1040px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            {/* Address */}
            <div className="text-white">
              <h3 className="text-xs font-normal tracking-wide uppercase mb-2 text-primary">📍 Address</h3>
              <p className="text-xs leading-relaxed">
                415 WICK LANE<br />
                TRADESTARS BLOCK G<br />
                BOW, LONDON E3 2JG
              </p>
            </div>
            
            {/* Contact */}
            <div className="text-white">
              <h3 className="text-xs font-normal tracking-wide uppercase mb-2 text-primary">📞 Contact</h3>
              <a 
                href="tel:07943115966"
                className="text-xs hover:text-primary transition-colors duration-300 block mb-1"
              >
                07943 115966
              </a>
            </div>
            
            {/* Email & Social */}
            <div className="text-white">
              <h3 className="text-xs font-normal tracking-wide uppercase mb-2 text-primary">📧 Email</h3>
              <a 
                href="mailto:contact@sahiyaslays.com"
                className="text-xs hover:text-primary transition-colors duration-300 block mb-2"
              >
                contact@sahiyaslays.com
              </a>
              <a
                href="https://instagram.com/sahiyaslays"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-6 h-6 text-white hover:text-primary transition-colors duration-300"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Booking;