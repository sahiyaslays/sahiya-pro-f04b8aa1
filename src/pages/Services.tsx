import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { ServiceBookingModal } from "@/components/booking/ServiceBookingModal";
import { Search } from "lucide-react";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface DbService {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  duration: number;
  image_url: string | null;
  active: boolean;
}

// Convert DB service to the format expected by ServiceBookingModal
interface ServiceOption {
  label: string;
  duration: number;
  price: number;
}

interface Service {
  id: string;
  name: string;
  options: ServiceOption[];
}

const Services = () => {
  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('category')
        .order('name');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Convert DB service to modal-compatible format
  const convertToModalService = (service: DbService): Service => ({
    id: service.id,
    name: service.name,
    options: [{
      label: formatDuration(service.duration),
      duration: service.duration,
      price: service.price
    }]
  });

  // Get unique categories
  const categories = [...new Set(services.map(s => s.category))];

  // Filter services by search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = searchTerm === "" || 
      service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "" || 
      service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Group services by category
  const groupedServices = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, DbService[]>);

  const salonImages = [
    '/lovable-uploads/ab3846e2-d8b3-4cac-99bf-c43a3d7fd10d.png',
    '/lovable-uploads/43f793dd-ec38-4c65-903e-36b7d3327cc9.png',
    '/lovable-uploads/67347769-c536-471a-bab6-06fa5183b14a.png',
    '/lovable-uploads/f0976d91-79f6-4699-b301-2ad6b3b93aab.png',
    '/lovable-uploads/8083105a-56c1-478e-92f8-6424fb55f2d1.png',
    '/lovable-uploads/88122a6d-de54-49bc-b338-283e59c66061.png'
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-abel">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-abel">
      <Header />
      
      {/* Hero Section */}
      <section className="h-[34vh] md:h-[40vh] bg-white flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand tagline */}
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            <EditableText id="services-page-label">SS • HAIR • BEAUTY • NAILS</EditableText>
          </div>
          
          <EditableText 
            id="services-page-title" 
            as="h1" 
            className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase"
          >
            SERVICES
          </EditableText>
          
          {/* Thin gold hairline */}
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          
          <EditableText 
            id="services-page-subtitle" 
            as="p" 
            className="text-base md:text-lg text-[#5D6776] tracking-wide leading-relaxed"
          >
            Transparent, simple pricing.
          </EditableText>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-3 md:py-4 px-4 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 text-sm bg-white"
            />
          </div>
        </div>
      </section>

      {/* Category Navigation - Sticky */}
      <section className="sticky top-20 z-40 py-2.5 md:pt-2.5 md:pb-2.5 px-2 md:px-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1040px] mx-auto">
          {/* Categories - Mobile: single scrollable row, Desktop: wrapped */}
          <div className="flex md:flex-wrap gap-1 md:gap-2 justify-start md:justify-center overflow-x-auto scrollbar-hide">
            <Button
              variant={activeCategory === "" ? "default" : "outline"}
              onClick={() => setActiveCategory("")}
              size="sm"
              className="text-xs tracking-wider uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0"
            >
              ALL SERVICES
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                size="sm"
                className="text-xs tracking-wider uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-8 px-4">
        <div className="max-w-[1040px] mx-auto space-y-8">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category} className="space-y-6">
              {/* Category Header */}
              <div className="w-full bg-foreground py-2.5">
                <h2 className="text-center text-background text-lg md:text-xl font-normal tracking-[0.15em] uppercase">
                  {category}
                </h2>
              </div>

              {/* Services */}
              <div className="space-y-1">
                {categoryServices.map((service) => (
                  <div key={service.id} className="w-full max-w-4xl mx-auto">
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200">
                      <div className="flex-1 text-left">
                        <h4 className="text-foreground text-sm md:text-base font-normal tracking-wide uppercase">
                          {service.name}
                        </h4>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {formatDuration(service.duration)} • {formatPrice(service.price)}
                        </div>
                        {service.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {service.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => setSelectedService(convertToModalService(service))}
                          size="sm"
                          className="px-3 py-1 text-xs tracking-wider uppercase h-7"
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* No results message */}
          {Object.keys(groupedServices).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm ? `No services found matching "${searchTerm}"` : 'No services available'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="py-16 px-4">
        <div className="max-w-[1040px] mx-auto text-center space-y-12">
          <div>
            <EditableText
              id="cancellation-policy-title"
              as="h2"
              className="text-2xl md:text-3xl font-normal tracking-[0.15em] mb-6 text-foreground uppercase"
            >
              CANCELLATION POLICY
            </EditableText>
            <EditableText
              id="cancellation-policy-text"
              as="p"
              className="text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto"
            >
              At Sahiya, we kindly request at least 48 hours' notice for cancellations or rescheduling. Since services are reserved just for you, a cancellation fee may apply. We may request a deposit to secure bookings; deposits are used toward your final bill and are non-refundable for late cancellations or no-shows. Thank you for your understanding and support.
            </EditableText>
          </div>
          
          <div>
            <EditableText
              id="allergy-testing-policy-title"
              as="h2"
              className="text-2xl md:text-3xl font-normal tracking-[0.15em] mb-6 text-foreground uppercase"
            >
              ALLERGY TESTING POLICY
            </EditableText>
            <EditableText
              id="allergy-testing-policy-text"
              as="p"
              className="text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto"
            >
              For new colour clients at Sahiya, please attend the salon at least 48 hours before your appointment for a complimentary skin allergy test.
            </EditableText>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-4">
        <div className="max-w-[1040px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {salonImages.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden">
                <img 
                  src={image} 
                  alt={`Salon image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <EditableText 
            id="services-cta-title"
            as="h2" 
            className="text-2xl md:text-3xl font-normal tracking-[0.15em] mb-6 text-background uppercase"
          >
            Ready to Book?
          </EditableText>
          <EditableText
            id="services-cta-subtitle"
            as="p"
            className="text-base md:text-lg text-gray-300 mb-8"
          >
            Book your appointment today and let us help you look and feel your best.
          </EditableText>
          <Link to="/booking">
            <Button 
              variant="outline" 
              className="bg-transparent border-primary text-primary hover:bg-primary hover:text-background px-8 py-3 text-sm tracking-widest uppercase"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      {selectedService && (
        <ServiceBookingModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default Services;
