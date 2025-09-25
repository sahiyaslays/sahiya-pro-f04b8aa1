import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceOption } from '@/data/servicesData';
import { BookingFormData } from './ServiceBookingModal';
import { format, addDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface DateTimeBookingStepProps {
  selectedOption: ServiceOption;
  selectedDate?: string;
  selectedTime?: string;
  onNext: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
}

export function DateTimeBookingStep({
  selectedOption,
  selectedDate,
  selectedTime,
  onNext,
  onBack,
}: DateTimeBookingStepProps) {
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );
  const [time, setTime] = useState<string | undefined>(selectedTime);

  // Generate available time slots (9 AM to 7 PM)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 19;
    const duration = selectedOption.duration;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Check if the service can fit within business hours
        const slotEndMinutes = hour * 60 + minute + duration;
        const businessEndMinutes = endHour * 60;
        
        if (slotEndMinutes <= businessEndMinutes) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          slots.push(timeString);
        }
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

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
    if (date && time) {
      onNext({
        date: format(date, 'yyyy-MM-dd'),
        time,
      });
    }
  };

  const minDate = new Date();
  const maxDate = addDays(new Date(), 60); // Allow booking up to 2 months ahead

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center">
        <h4 className="font-medium text-foreground mb-1 md:mb-2 text-sm md:text-base">
          {selectedOption.label} - {formatDuration(selectedOption.duration)}
        </h4>
        <p className="text-xs md:text-sm text-muted-foreground">
          Select your preferred date and time
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-3 md:gap-6">
        {/* Date Selection */}
        <Card>
          <CardContent className="p-2 md:p-4">
            <h5 className="font-medium text-foreground mb-2 md:mb-4 text-sm md:text-base">Choose Date</h5>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < minDate || date > maxDate}
              className={cn("w-full pointer-events-auto text-xs md:text-sm")}
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-2 md:space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-xs md:text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn("h-6 w-6 md:h-7 md:w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-6 md:w-9 font-normal text-[0.6rem] md:text-[0.8rem]",
                row: "flex w-full mt-1 md:mt-2",
                cell: "text-center text-xs md:text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn("h-6 w-6 md:h-9 md:w-9 p-0 font-normal aria-selected:opacity-100 text-xs md:text-sm"),
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
            />
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardContent className="p-2 md:p-4">
            <h5 className="font-medium text-foreground mb-2 md:mb-4 text-sm md:text-base">Choose Time</h5>
            {date ? (
              <div className="grid grid-cols-4 md:grid-cols-3 gap-1 md:gap-2 max-h-48 md:max-h-64 overflow-y-auto">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={time === slot ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTime(slot)}
                    className="text-xs h-6 md:h-8 px-1 md:px-2"
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-xs md:text-sm text-muted-foreground text-center py-6 md:py-8">
                Please select a date first
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="sm" className="text-xs md:text-sm">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!date || !time}
          size="sm"
          className="px-4 md:px-8 text-xs md:text-sm"
        >
          Next: Customer Details
        </Button>
      </div>
    </div>
  );
}