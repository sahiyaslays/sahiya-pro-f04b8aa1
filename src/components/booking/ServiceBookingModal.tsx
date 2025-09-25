import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Service, ServiceOption } from '@/data/servicesData';
import { OptionDurationStep } from './OptionDurationStep';
import { DateTimeBookingStep } from './DateTimeBookingStep';
import { StylistSelectionStep } from './StylistSelectionStep';
import { CustomerDetailsStep } from './CustomerDetailsStep';
import { PaymentConfirmationStep } from './PaymentConfirmationStep';

export interface BookingFormData {
  selectedOption?: ServiceOption;
  date?: string;
  time?: string;
  selectedStylist?: import('@/data/stylistsData').Stylist;
  customerDetails: {
    fullName: string;
    mobile: string;
    email?: string;
    notes?: string;
    agreeToTerms?: boolean;
  };
  paymentMethod?: 'card' | 'deposit-20' | 'pay-in-salon';
}

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}

export function ServiceBookingModal({ isOpen, onClose, service }: ServiceBookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    customerDetails: {
      fullName: '',
      mobile: '',
    },
  });

  const handleStepComplete = (stepData: Partial<BookingFormData>) => {
    setBookingData(prev => ({ ...prev, ...stepData }));
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setBookingData({
      customerDetails: {
        fullName: '',
        mobile: '',
      },
    });
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OptionDurationStep
            service={service}
            selectedOption={bookingData.selectedOption}
            onNext={handleStepComplete}
          />
        );
      case 2:
        return (
          <DateTimeBookingStep
            selectedOption={bookingData.selectedOption!}
            selectedDate={bookingData.date}
            selectedTime={bookingData.time}
            onNext={handleStepComplete}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <StylistSelectionStep
            selectedStylist={bookingData.selectedStylist}
            onNext={handleStepComplete}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <CustomerDetailsStep
            customerDetails={bookingData.customerDetails}
            onNext={handleStepComplete}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <PaymentConfirmationStep
            service={service}
            bookingData={bookingData}
            onConfirm={() => {
              // Handle booking confirmation
              handleClose();
            }}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Option & Duration';
      case 2:
        return 'Choose Date & Time';
      case 3:
        return 'Choose Stylist';
      case 4:
        return 'Customer Details';
      case 5:
        return 'Payment & Confirmation';
      default:
        return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl md:max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto p-4 md:p-6 mx-2 md:mx-auto">
        <DialogHeader className="relative pb-2 md:pb-4">
          <DialogTitle className="text-base md:text-xl font-normal tracking-wide uppercase text-center pr-8">
            Book: {service.name}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-6 w-6 md:h-8 md:w-8 p-0"
            onClick={handleClose}
          >
            <X className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-4 md:mb-6">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`flex items-center ${step < 5 ? 'space-x-1 md:space-x-2' : ''}`}
            >
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 5 && (
                <div
                  className={`w-6 md:w-12 h-px ${
                    step < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Title */}
        <div className="text-center mb-4 md:mb-6">
          <h3 className="text-sm md:text-lg font-medium text-foreground">
            Step {currentStep}: {getStepTitle()}
          </h3>
        </div>

        {/* Step Content */}
        <div className="space-y-4 md:space-y-6">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}