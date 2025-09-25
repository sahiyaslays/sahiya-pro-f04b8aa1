import { useState } from 'react';
import { BookingData, Stylist } from '@/types/booking';
import { stylists } from '@/data/bookingData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface StylistSelectionProps {
  bookingData: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StylistSelection({ bookingData, onUpdate, onNext, onBack }: StylistSelectionProps) {
  const [selectedStylist, setSelectedStylist] = useState<Stylist | undefined>(bookingData.stylist);

  const handleStylistChange = (stylistId: string) => {
    if (stylistId === 'no-preference') {
      setSelectedStylist(undefined);
    } else {
      const stylist = stylists.find(s => s.id === stylistId);
      setSelectedStylist(stylist);
    }
  };

  const handleNext = () => {
    onUpdate({ stylist: selectedStylist });
    onNext();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-normal tracking-[0.15em] mb-3 text-foreground uppercase flex items-center justify-center gap-2">
          <span className="text-2xl">👩‍💼</span>
          Choose Your Stylist
        </h2>
        <p className="text-sm text-muted-foreground tracking-wide">
          Select a specific stylist or leave it to us
        </p>
      </div>

      <div className="bg-[#f7f7f7] rounded-2xl p-6 border border-gray-100">
        <RadioGroup
          value={selectedStylist?.id || 'no-preference'}
          onValueChange={handleStylistChange}
          className="space-y-3"
        >
          {/* No Preference Option */}
          <Card className="transition-all duration-300 hover:shadow-md hover:scale-[1.02] bg-white border border-gray-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="no-preference" id="no-preference" />
                <Label htmlFor="no-preference" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xl">✨</span>
                    </div>
                    <div>
                      <h4 className="font-medium tracking-wide uppercase text-sm text-gray-800">
                        No Preference
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        We'll assign the best available stylist
                      </p>
                    </div>
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Specific Stylists */}
          {stylists.map((stylist) => (
            <Card key={stylist.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02] bg-white border border-gray-200 rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={stylist.id} id={stylist.id} />
                  <Label htmlFor={stylist.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-xl">
                          {stylist.name === 'Sahiya' ? '👑' : stylist.name === 'Maria' ? '🌟' : '💫'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium tracking-wide uppercase text-sm text-gray-800">
                          {stylist.name}
                        </h4>
                        <p className="text-xs text-primary font-medium mb-1">
                          {stylist.role}
                        </p>
                        <p className="text-xs text-muted-foreground">
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
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          size="lg"
          className="px-6 py-2 text-sm tracking-wider uppercase rounded-xl border-2"
        >
          ← Back
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          className="px-6 py-2 text-sm tracking-wider uppercase rounded-xl"
        >
          Next: Date & Time 📅
        </Button>
      </div>
    </div>
  );
}