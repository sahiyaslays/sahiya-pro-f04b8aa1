import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BookingData, BookingStep } from '@/types/booking';
import Header from '@/components/Header';
import { ProgressBar } from '@/components/booking/ProgressBar';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { ServiceSelection } from '@/components/booking/ServiceSelection';
import { StylistSelection } from '@/components/booking/StylistSelection';
import { DateTimeSelection } from '@/components/booking/DateTimeSelection';
import { CustomerDetails } from '@/components/booking/CustomerDetails';
import { ReviewAndPay } from '@/components/booking/ReviewAndPay';
import { BookingSuccess } from '@/components/booking/BookingSuccess';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const isStripeSuccess = searchParams.get('success') === 'true';
  const stripeBookingId = searchParams.get('bookingId');

  const [stripeBookingData, setStripeBookingData] = useState<BookingData | null>(null);
  const [stripeLoading, setStripeLoading] = useState(isStripeSuccess);

  useEffect(() => {
    if (!isStripeSuccess || !stripeBookingId) return;
    supabase
      .from('bookings')
      .select('*')
      .eq('id', stripeBookingId)
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          const services = Array.isArray(data.services) ? (data.services as any[]) : [];
          setStripeBookingData({
            services: services.map((s: any) => ({
              id: s.id || '',
              name: s.name || '',
              category: s.category || '',
              duration: Number(s.duration) || 0,
              price: String(s.price || '0'),
              quantity: 1,
            })),
            date: data.booking_date,
            time: data.booking_time,
            customerDetails: {
              firstName: data.guest_name?.split(' ')[0] || '',
              lastName: data.guest_name?.split(' ').slice(1).join(' ') || '',
              email: data.guest_email || '',
              phone: data.guest_phone || '',
              agreesToPolicy: true,
            },
          });
        }
        setStripeLoading(false);
      });
  }, [isStripeSuccess, stripeBookingId]);

  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
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

  if (isStripeSuccess) {
    if (stripeLoading) {
      return (
        <div className="min-h-screen bg-gray-50 font-abel flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your booking confirmation...</p>
          </div>
        </div>
      );
    }

    if (stripeBookingData) {
      return (
        <div className="min-h-screen bg-gray-50 font-abel">
          <Header />
          <div className="pt-16">
            <main className="py-8">
              <div className="max-w-4xl mx-auto px-4">
                <BookingSuccess
                  bookingData={stripeBookingData}
                  bookingReference={`SS${stripeBookingId?.slice(-6).toUpperCase()}`}
                />
              </div>
            </main>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 font-abel">
        <Header />
        <div className="pt-16">
          <main className="py-8">
            <div className="max-w-2xl mx-auto px-4 text-center space-y-6 py-16">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-normal tracking-[0.15em] uppercase">Booking Confirmed!</h2>
              <p className="text-muted-foreground">
                Your payment was successful and your booking is confirmed.
                A confirmation email will be sent to you shortly.
              </p>
              <Button asChild variant="outline">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-abel">
      <Header />
      
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