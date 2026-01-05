import { useState } from 'react';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import SEO from '@/components/SEO';
import { CheckCircle2, Clock, Users, TrendingUp, Scale, Sparkles } from 'lucide-react';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

const BENEFITS = [
  { icon: TrendingUp, title: 'Increase Revenue', description: 'Strategic pricing and service optimization' },
  { icon: Users, title: 'Grow Clientele', description: 'Marketing and retention strategies' },
  { icon: Sparkles, title: 'Passive Income', description: 'Build additional income streams' },
  { icon: Scale, title: 'Work-Life Balance', description: 'Systems for sustainable success' },
];

const Coaching = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }

    if (!formData.name || !formData.email) {
      toast.error('Please fill in your name and email');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('coaching_bookings')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          booking_date: format(selectedDate, 'yyyy-MM-dd'),
          booking_time: selectedTime,
          message: formData.message || null,
        });

      if (error) throw error;

      setIsBooked(true);
      toast.success('Your coaching call has been booked!');
    } catch (error) {
      console.error('Error booking call:', error);
      toast.error('Failed to book call. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabledDays = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6 || isBefore(date, today);
  };

  if (isBooked) {
    return (
      <>
        <SEO
          title="Booking Confirmed | 1-1 Business Coaching"
          description="Your coaching call has been confirmed with Sahiya Slays."
          canonical="/coaching"
          noindex
        />
        <Header />
        <main className="min-h-screen bg-background pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-card rounded-2xl p-12 shadow-lg">
              <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
              <h1 className="text-3xl font-medium text-foreground mb-4">Booking Confirmed!</h1>
              <p className="text-muted-foreground text-lg mb-6">
                Thank you for booking a coaching call. You will receive a confirmation email shortly with all the details.
              </p>
              <div className="bg-muted rounded-lg p-6 mb-8">
                <p className="text-foreground font-medium">{format(selectedDate!, 'EEEE, MMMM d, yyyy')}</p>
                <p className="text-primary text-lg">{selectedTime}</p>
              </div>
              <Button onClick={() => window.location.href = '/'} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Return Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title="1-1 Business Coaching for Beauty Professionals | Sahiya Slays"
        description="Transform your beauty business with expert 1-1 coaching. Increase revenue, grow your clientele, create passive income, and achieve work-life balance. Book your free consultation today."
        canonical="/coaching"
        keywords="beauty business coaching, salon coaching, beauty professional mentorship, beauty business consultant, hair business mentor"
      />
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Images Grid */}
              <div className="relative order-1 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  {/* Two images side by side */}
                  <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
                    <img
                      src="/lovable-uploads/sahiya-coaching-2.jpeg"
                      alt="Sahiya during a professional photoshoot"
                      className="w-full h-full object-cover object-top scale-150"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-xl">
                    <img
                      src="/lovable-uploads/sahiya-coaching-3.jpeg"
                      alt="Sahiya - Beauty Business Mentor"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-5 rounded-xl shadow-lg hidden md:block">
                  <p className="text-2xl font-semibold">1-1</p>
                  <p className="text-sm uppercase tracking-wide">Coaching</p>
                </div>
              </div>

              {/* Content */}
              <div className="order-2 lg:order-2">
                <h1 className="text-4xl lg:text-5xl font-medium text-foreground leading-tight mb-6">
                  Business Mentorship for Beauty Professionals
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Looking to increase your revenue, grow your clientele, make passive income, and build a sustainable work-life balance?
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {BENEFITS.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <benefit.icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{benefit.title}</p>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#booking" className="inline-block">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                    Book Your Free Call
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Coaching Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-medium text-foreground mb-6">1-1 Coaching</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are passionate about coaching, becoming your trusted adviser and enabling you as a business owner 
              to benefit from our experience and support. Whether you&apos;re just starting out or looking to scale, 
              our personalised approach ensures you get actionable strategies tailored to your unique goals.
            </p>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium text-foreground mb-4">Book Your Discovery Call</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Take the first step towards transforming your beauty business. Select a date and time that works for you.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar & Time Selection */}
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <Label className="text-base font-medium mb-3 block">Select Date</Label>
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={disabledDays}
                          fromDate={today}
                          toDate={maxDate}
                          className="rounded-lg border border-border pointer-events-auto"
                        />
                      </div>
                    </div>

                    {selectedDate && (
                      <div>
                        <Label className="text-base font-medium mb-3 block flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Select Time
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={selectedTime === time ? 'default' : 'outline'}
                              className={selectedTime === time ? 'bg-primary text-primary-foreground' : ''}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card className="border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-foreground mb-6">Your Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                          required
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Enter your email"
                          required
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Enter your phone number"
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Tell us about your business goals</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="What would you like to discuss in our call?"
                          rows={4}
                          className="mt-1.5"
                        />
                      </div>

                      {selectedDate && selectedTime && (
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-1">Selected appointment:</p>
                          <p className="font-medium text-foreground">
                            {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                          </p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={!selectedDate || !selectedTime || isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        size="lg"
                      >
                        {isSubmitting ? 'Booking...' : 'Book Your Call'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Coaching;
