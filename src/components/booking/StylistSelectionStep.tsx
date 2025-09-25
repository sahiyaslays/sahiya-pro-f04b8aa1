import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { User, Users } from 'lucide-react';
import { Stylist, stylists } from '@/data/stylistsData';
import { BookingFormData } from './ServiceBookingModal';

interface StylistSelectionStepProps {
  selectedStylist?: Stylist;
  onNext: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
}

export function StylistSelectionStep({ selectedStylist, onNext, onBack }: StylistSelectionStepProps) {
  const [selected, setSelected] = useState<Stylist | undefined>(selectedStylist);

  const handleNext = () => {
    if (selected) {
      onNext({ selectedStylist: selected });
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center">
        <h4 className="font-medium text-foreground mb-1 md:mb-2 text-sm md:text-base">Choose your stylist</h4>
        <p className="text-xs md:text-sm text-muted-foreground">
          Select a preferred stylist or choose no preference
        </p>
      </div>

      <RadioGroup
        value={selected?.id || ''}
        onValueChange={(value) => {
          const stylist = stylists.find(s => s.id === value);
          setSelected(stylist);
        }}
        className="space-y-2 md:space-y-3"
      >
        {stylists.map((stylist) => (
          <Card key={stylist.id} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-2 md:p-4">
              <div className="flex items-start space-x-2 md:space-x-3">
                <RadioGroupItem
                  value={stylist.id}
                  id={`stylist-${stylist.id}`}
                  className="w-3 h-3 md:w-4 md:h-4 mt-1"
                />
                <Label
                  htmlFor={`stylist-${stylist.id}`}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {stylist.id === 'no-preference' ? (
                        <Users className="w-3 h-3 md:w-6 md:h-6 text-primary" />
                      ) : (
                        <User className="w-3 h-3 md:w-6 md:h-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground text-xs md:text-sm">
                        {stylist.name}
                      </h5>
                      <p className="text-xs text-primary font-medium mb-0.5 md:mb-1">
                        {stylist.role}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 md:line-clamp-none">
                        {stylist.bio}
                      </p>
                    </div>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          size="sm"
          className="px-4 md:px-8 text-xs md:text-sm"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selected}
          size="sm"
          className="px-4 md:px-8 text-xs md:text-sm"
        >
          Next: Customer Details
        </Button>
      </div>
    </div>
  );
}