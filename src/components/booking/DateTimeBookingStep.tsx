import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceOption } from '@/data/servicesData';
import { BookingFormData } from './ServiceBookingModal';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Clock, Sun, Sunset, Moon } from 'lucide-react';

interface DateTimeBookingStepProps {
  selectedOption: ServiceOption;
  selectedDate?: string;
  selectedTime?: string;
  onNext: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
}

interface TimeSlot {
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
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

  // Generate available time slots with period grouping (9 AM to 7 PM)
  const timeSlots = useMemo((): TimeSlot[] => {
    const slots: TimeSlot[] = [];
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
          let period: 'morning' | 'afternoon' | 'evening' = 'morning';
          
          if (hour >= 17) {
            period = 'evening';
          } else if (hour >= 12) {
            period = 'afternoon';
          }
          
          slots.push({ time: timeString, period });
        }
      }
    }
    return slots;
  }, [selectedOption.duration]);

  const groupedSlots = useMemo(() => {
    const groups = {
      morning: timeSlots.filter(s => s.period === 'morning'),
      afternoon: timeSlots.filter(s => s.period === 'afternoon'),
      evening: timeSlots.filter(s => s.period === 'evening'),
    };
    return groups;
  }, [timeSlots]);

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

  const getEndTime = (startTime: string, durationMinutes: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + durationMinutes;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
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

  const periodIcons = {
    morning: <Sun className="w-3.5 h-3.5 text-amber-500" />,
    afternoon: <Sunset className="w-3.5 h-3.5 text-orange-500" />,
    evening: <Moon className="w-3.5 h-3.5 text-indigo-500" />,
  };

  const periodLabels = {
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
  };

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

        {/* Time Selection - Grouped by Period */}
        <Card>
          <CardContent className="p-2 md:p-4">
            <h5 className="font-medium text-foreground mb-2 md:mb-4 text-sm md:text-base">Choose Time</h5>
            {date ? (
              <div className="space-y-3 max-h-64 md:max-h-72 overflow-y-auto pr-1">
                {(['morning', 'afternoon', 'evening'] as const).map((period) => {
                  const slots = groupedSlots[period];
                  if (slots.length === 0) return null;
                  
                  return (
                    <div key={period}>
                      <div className="flex items-center gap-1.5 mb-2">
                        {periodIcons[period]}
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {periodLabels[period]}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 md:grid-cols-3 gap-1 md:gap-2">
                        {slots.map(({ time: slotTime }) => (
                          <Button
                            key={slotTime}
                            variant={time === slotTime ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTime(slotTime)}
                            className="text-xs h-7 md:h-8 px-1 md:px-2"
                          >
                            {slotTime}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Show estimated end time */}
                {time && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {time} - {getEndTime(time, selectedOption.duration)} ({formatDuration(selectedOption.duration)})
                      </span>
                    </div>
                  </div>
                )}
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
          Next: Choose Stylist
        </Button>
      </div>
    </div>
  );
}
