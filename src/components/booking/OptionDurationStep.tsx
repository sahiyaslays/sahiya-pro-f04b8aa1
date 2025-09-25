import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Service, ServiceOption } from '@/data/servicesData';
import { BookingFormData } from './ServiceBookingModal';

interface OptionDurationStepProps {
  service: Service;
  selectedOption?: ServiceOption;
  onNext: (data: Partial<BookingFormData>) => void;
}

export function OptionDurationStep({ service, selectedOption, onNext }: OptionDurationStepProps) {
  const [selected, setSelected] = useState<ServiceOption | undefined>(
    selectedOption || (service.options.length === 1 ? service.options[0] : undefined)
  );

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

  const handleNext = () => {
    if (selected) {
      onNext({ selectedOption: selected });
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center">
        <h4 className="font-medium text-foreground mb-1 md:mb-2 text-sm md:text-base">Select your option</h4>
        <p className="text-xs md:text-sm text-muted-foreground">
          Choose from the available options for this service
        </p>
      </div>

      <RadioGroup
        value={selected ? `${selected.label}-${selected.duration}-${selected.price}` : ''}
        onValueChange={(value) => {
          const option = service.options.find(
            opt => `${opt.label}-${opt.duration}-${opt.price}` === value
          );
          setSelected(option);
        }}
        className="space-y-2 md:space-y-3"
      >
        {service.options.map((option, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-2 md:p-4">
              <div className="flex items-center space-x-2 md:space-x-3">
                <RadioGroupItem
                  value={`${option.label}-${option.duration}-${option.price}`}
                  id={`option-${index}`}
                  className="w-3 h-3 md:w-4 md:h-4"
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-foreground text-xs md:text-sm">
                        {option.label}
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {formatDuration(option.duration)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm md:text-lg font-medium text-primary">
                        {formatPrice(option.price)}
                      </span>
                    </div>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selected}
          size="sm"
          className="px-4 md:px-8 text-xs md:text-sm"
        >
          Next: Date & Time
        </Button>
      </div>
    </div>
  );
}