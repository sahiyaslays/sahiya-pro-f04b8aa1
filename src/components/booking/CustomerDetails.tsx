import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookingData } from '@/types/booking';
import { hearAboutUsOptions } from '@/data/bookingData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';

const customerDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  hearAboutUs: z.string().optional(),
  notes: z.string().optional(),
  agreesToPolicy: z.boolean().refine(val => val === true, {
    message: 'You must agree to the cancellation policy'
  }),
  wantsReminders: z.boolean().optional()
});

type CustomerDetailsForm = z.infer<typeof customerDetailsSchema>;

interface CustomerDetailsProps {
  bookingData: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CustomerDetails({ bookingData, onUpdate, onNext, onBack }: CustomerDetailsProps) {
  const form = useForm<CustomerDetailsForm>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: {
      firstName: bookingData.customerDetails?.firstName || '',
      lastName: bookingData.customerDetails?.lastName || '',
      email: bookingData.customerDetails?.email || '',
      phone: bookingData.customerDetails?.phone || '',
      hearAboutUs: bookingData.customerDetails?.hearAboutUs || '',
      notes: bookingData.customerDetails?.notes || '',
      agreesToPolicy: bookingData.customerDetails?.agreesToPolicy || false,
      wantsReminders: bookingData.customerDetails?.wantsReminders || false
    }
  });

  const onSubmit = (data: CustomerDetailsForm) => {
    onUpdate({ customerDetails: data });
    onNext();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-normal tracking-[0.15em] mb-3 text-foreground uppercase flex items-center justify-center gap-2">
          <span className="text-2xl">📋</span>
          Your Details
        </h2>
        <p className="text-sm text-muted-foreground tracking-wide">
          Just a few details to complete your booking
        </p>
      </div>

      <div className="bg-[#f7f7f7] rounded-2xl p-6 border border-gray-100">
        <Card className="bg-white border border-gray-200 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-normal tracking-wide uppercase flex items-center gap-2">
              <span className="text-xl">👤</span>
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-wide text-xs font-medium">First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" className="rounded-lg h-9" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-wide text-xs font-medium">Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" className="rounded-lg h-9" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-wide text-xs font-medium flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" className="rounded-lg h-9" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-wide text-xs font-medium flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        Mobile Phone (optional)
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="07xxx xxx xxx" className="rounded-lg h-9" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        📱 For appointment reminders and updates
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* How did you hear about us */}
                <FormField
                  control={form.control}
                  name="hearAboutUs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-wide text-xs font-medium">
                        How did you hear about us? (optional)
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg h-9">
                            <SelectValue placeholder="Please select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hearAboutUsOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-wide text-xs font-medium flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" />
                        Special Requests (optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special requests, allergies, or notes..."
                          className="min-h-[60px] rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                  <FormField
                    control={form.control}
                    name="agreesToPolicy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 bg-gray-50 rounded-lg border">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-xs cursor-pointer">
                            📋 I agree to the{' '}
                            <Button
                              type="button"
                              variant="link"
                              className="p-0 h-auto text-primary underline text-xs"
                              onClick={() => {
                                alert('Cancellation Policy: 48 hours notice required. Late cancellations/no-shows may be charged.');
                              }}
                            >
                              Cancellation Policy
                            </Button>{' '}
                            *
                          </FormLabel>
                          <FormDescription className="text-xs">
                            48 hours notice required for cancellations
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wantsReminders"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 bg-gray-50 rounded-lg border">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-xs cursor-pointer">
                            🔔 Send me SMS/email appointment reminders
                          </FormLabel>
                          <FormDescription className="text-xs">
                            Receive reminders 24-48 hours before your appointment
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    size="lg"
                    className="px-6 py-2 text-sm tracking-wider uppercase rounded-xl border-2"
                  >
                    ← Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="px-6 py-2 text-sm tracking-wider uppercase rounded-xl"
                  >
                    Next: Review & Pay 💳
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}