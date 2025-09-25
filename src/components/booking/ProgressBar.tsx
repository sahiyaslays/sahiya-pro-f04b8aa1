import { BookingStep } from '@/types/booking';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: BookingStep;
}

const steps = [
  { number: 1, label: 'Service' },
  { number: 2, label: 'Stylist' },
  { number: 3, label: 'Date & Time' },
  { number: 4, label: 'Details' },
  { number: 5, label: 'Review & Pay' },
  { number: 6, label: 'Success' }
];

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const getStepEmoji = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return '🛍️';
      case 2: return '👩‍💼';
      case 3: return '📅';
      case 4: return '📋';
      case 5: return '💳';
      case 6: return '✅';
      default: return '⭐';
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-16 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4">
        {/* Progress bar */}
        <div className="relative mb-3">
          <div className="h-2 bg-gray-100 rounded-full">
            <div 
              className="h-2 bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Step labels */}
        <div className="flex justify-between text-xs">
          {steps.map((step) => (
            <div
              key={step.number}
              className={cn(
                "flex flex-col items-center transition-all duration-300",
                currentStep >= step.number 
                  ? "text-primary scale-110" 
                  : "text-muted-foreground scale-100"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium mb-1 transition-all duration-300 border-2",
                  currentStep >= step.number
                    ? "bg-primary text-primary-foreground border-primary shadow-lg"
                    : "bg-white text-muted-foreground border-gray-200"
                )}
              >
                <span className="text-sm">{getStepEmoji(step.number)}</span>
              </div>
              <span className="text-center uppercase tracking-wide font-medium hidden sm:block">
                {step.label}
              </span>
              <span className="text-center uppercase tracking-wide font-medium sm:hidden">
                {step.label.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}