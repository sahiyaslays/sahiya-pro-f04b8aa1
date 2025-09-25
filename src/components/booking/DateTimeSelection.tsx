import { useState } from 'react';
import { BookingData } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format, addDays, isAfter, isBefore, setHours, setMinutes } from 'date-fns';
import { Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateTimeSelectionProps {
  bookingData: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DateTimeSelection({ bookingData, onUpdate, onNext, onBack }: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    bookingData.date ? new Date(bookingData.date) : undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(bookingData.time);

  const hasColourService = bookingData.services?.some(s => s.category === 'Colouring') || false;

  // Generate time slots (10:00 AM to 7:00 PM, 15-minute intervals)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 10;
    const endHour = 19;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isBefore(date, today);
  };

  const isTimeSlotAvailable = (time: string) => {
    // Mock availability - in real app, this would check actual booking data
    // For demo purposes, make some slots unavailable
    const unavailableSlots = ['11:00', '14:30', '16:00'];
    return !unavailableSlots.includes(time);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onUpdate({ 
        date: selectedDate.toISOString(),
        time: selectedTime 
      });
      onNext();
    }
  };

  const canProceed = selectedDate && selectedTime;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-normal tracking-[0.15em] mb-3 text-foreground uppercase flex items-center justify-center gap-2">
          <span className="text-2xl">📅</span>
          Select Date & Time
        </h2>
        <p className="text-sm text-muted-foreground tracking-wide">
          Choose your preferred appointment slot
        </p>
      </div>

      {/* Color service warning */}
      {hasColourService && (
        <Alert className="border-orange-200 bg-orange-50 rounded-xl">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 text-sm">
            <strong>⚠️ Patch Test Required:</strong> New clients need a skin allergy test 48h before colour appointments.
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-[#f7f7f7] rounded-2xl p-6 border border-gray-100">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card className="bg-white rounded-xl border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-normal tracking-wide uppercase flex items-center gap-2">
                <span className="text-xl">🗓️</span>
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={isDateDisabled}
                className="rounded-lg border-0 p-0"
                initialFocus
              />
              <p className="text-xs text-muted-foreground mt-3 text-center">
                London local time
              </p>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card className="bg-white rounded-xl border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-normal tracking-wide uppercase flex items-center gap-2">
                <span className="text-xl">⏰</span>
                Available Times
              </CardTitle>
              {selectedDate && (
                <p className="text-xs text-muted-foreground">
                  {format(selectedDate, 'EEEE, MMMM do')}
                </p>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              {selectedDate ? (
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => {
                    const isAvailable = isTimeSlotAvailable(time);
                    const isSelected = selectedTime === time;
                    
                    return (
                      <Button
                        key={time}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        disabled={!isAvailable}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "text-xs rounded-lg h-8",
                          isSelected && "bg-primary text-primary-foreground",
                          !isAvailable && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <span className="text-2xl block mb-2">📆</span>
                  <span className="text-sm">Please select a date first</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected appointment summary */}
      {selectedDate && selectedTime && (
        <Card className="bg-primary/5 border-primary/20 rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-medium text-sm uppercase tracking-wide mb-1">
                    Selected Appointment
                  </h4>
                  <p className="text-sm">
                    {format(selectedDate, 'EEEE, MMMM do, yyyy')} at {selectedTime}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary text-primary-foreground rounded-lg">
                Confirmed
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

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
          disabled={!canProceed}
          size="lg"
          className="px-6 py-2 text-sm tracking-wider uppercase rounded-xl"
        >
          Next: Your Details 📋
        </Button>
      </div>
    </div>
  );
}