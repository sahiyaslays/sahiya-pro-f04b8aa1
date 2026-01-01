import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Users, Sparkles } from 'lucide-react';
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
        {stylists.map((stylist) => {
          const isNoPreference = stylist.id === 'no-preference';
          
          return (
            <Card 
              key={stylist.id} 
              className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                selected?.id === stylist.id ? 'ring-2 ring-primary border-primary' : ''
              }`}
              onClick={() => setSelected(stylist)}
            >
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
                      {/* Stylist Photo or Icon */}
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center">
                        {isNoPreference ? (
                          <Users className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                        ) : stylist.image ? (
                          <img 
                            src={stylist.image} 
                            alt={stylist.name}
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                            <span className="text-primary font-medium text-lg">
                              {stylist.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-foreground text-xs md:text-sm">
                          {stylist.name}
                        </h5>
                        <p className="text-xs text-primary font-medium mb-0.5 md:mb-1">
                          {stylist.role}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {stylist.bio}
                        </p>
                        
                        {/* Specialties */}
                        {stylist.specialties && stylist.specialties.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {stylist.specialties.slice(0, 3).map((specialty, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center gap-0.5 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full"
                              >
                                <Sparkles className="w-2.5 h-2.5" />
                                {specialty}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Label>
                </div>
              </CardContent>
            </Card>
          );
        })}
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
