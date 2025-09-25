import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { servicesData, Service } from "@/data/servicesData";
import { ServiceBookingModal } from "@/components/booking/ServiceBookingModal";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Footer } from "@/components/Footer";

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());

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

  const getServiceDisplayInfo = (service: Service) => {
    const firstOption = service.options[0];
    const minPrice = Math.min(...service.options.map(opt => opt.price));
    const maxPrice = Math.max(...service.options.map(opt => opt.price));
    
    let priceDisplay = formatPrice(minPrice);
    if (minPrice !== maxPrice) {
      priceDisplay = `from ${formatPrice(minPrice)}`;
    }
    
    return {
      price: priceDisplay,
      duration: formatDuration(firstOption.duration),
      hasMultipleOptions: service.options.length > 1
    };
  };

  const filteredServices = servicesData.map(category => ({
    ...category,
    subcategories: category.subcategories.map(subcategory => ({
      ...subcategory,
      services: subcategory.services.filter(service =>
        searchTerm === "" || 
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(subcategory => subcategory.services.length > 0)
  })).filter(category => category.subcategories.length > 0);

  const activeCategories = activeCategory === "" ? filteredServices : 
    filteredServices.filter(cat => cat.id === activeCategory);

  const toggleServiceExpanded = (serviceId: string) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

  const salonImages = [
    '/lovable-uploads/ab3846e2-d8b3-4cac-99bf-c43a3d7fd10d.png',
    '/lovable-uploads/43f793dd-ec38-4c65-903e-36b7d3327cc9.png',
    '/lovable-uploads/67347769-c536-471a-bab6-06fa5183b14a.png',
    '/lovable-uploads/f0976d91-79f6-4699-b301-2ad6b3b93aab.png',
    '/lovable-uploads/8083105a-56c1-478e-92f8-6424fb55f2d1.png',
    '/lovable-uploads/88122a6d-de54-49bc-b338-283e59c66061.png'
  ];

  return (
    <div className="min-h-screen bg-background font-abel">
      <Header />
      
      {/* Hero Section */}
      <section className="h-[34vh] md:h-[40vh] bg-white flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand tagline */}
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            SS • HAIR • BEAUTY • NAILS
          </div>
          
          <h1 className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase">
            SERVICES
          </h1>
          
          {/* Thin gold hairline */}
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          
          <p className="text-base md:text-lg text-[#5D6776] tracking-wide leading-relaxed">
            Transparent, simple 'from' pricing.
          </p>
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
            {servicesData.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                size="sm"
                className="text-xs tracking-wider uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0"
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-8 px-4">
        <div className="max-w-[1040px] mx-auto space-y-8">
          {activeCategories.map((category) => (
            <div key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="w-full bg-foreground py-2.5">
                <h2 className="text-center text-background text-lg md:text-xl font-normal tracking-[0.15em] uppercase">
                  {category.title}
                </h2>
              </div>

              {/* Subcategories */}
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.id} className="space-y-4">
                  {/* Subcategory Header */}
                  <div className="text-center">
                    <h3 className="text-base md:text-lg font-normal tracking-[0.1em] text-foreground uppercase mb-3">
                      {subcategory.title}
                    </h3>
                    <div className="w-12 h-[1px] bg-primary mx-auto"></div>
                  </div>

                  {/* Services */}
                  <div className="space-y-1">
                    {subcategory.services.map((service) => {
                      const displayInfo = getServiceDisplayInfo(service);
                      const isExpanded = expandedServices.has(service.id);
                      const hasMultipleOptions = service.options.length > 1;
                      
                      return (
                        <div key={service.id} className="space-y-1">
                          {hasMultipleOptions ? (
                            <Collapsible 
                              open={isExpanded} 
                              onOpenChange={() => toggleServiceExpanded(service.id)}
                            >
                              <CollapsibleTrigger className="w-full max-w-4xl mx-auto block">
                                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200">
                                  <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-foreground text-sm md:text-base font-normal tracking-wide uppercase">
                                        {service.name}
                                      </h4>
                                      <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded">
                                        {service.options.length} options
                                      </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      {displayInfo.duration} • {displayInfo.price}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground">
                                      {isExpanded ? 'Hide' : 'Show'} options
                                    </span>
                                    {isExpanded ? (
                                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                    )}
                                  </div>
                                </div>
                              </CollapsibleTrigger>
                              
                              <CollapsibleContent className="max-w-4xl mx-auto">
                                <div className="ml-4 mr-4 mb-2 space-y-2 bg-gray-50 rounded-lg p-3">
                                  {service.options.map((option, index) => (
                                    <div key={index} className="flex items-center justify-between py-2 px-3 bg-white rounded border border-gray-100">
                                      <div className="flex-1">
                                        <span className="text-sm font-medium text-foreground">
                                          {option.label}
                                        </span>
                                        <div className="text-xs text-muted-foreground">
                                          {formatDuration(option.duration)}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-primary">
                                          {formatPrice(option.price)}
                                        </span>
                                        <Button
                                          onClick={() => setSelectedService(service)}
                                          size="sm"
                                          className="px-3 py-1 text-xs tracking-wider uppercase h-7"
                                        >
                                          Book
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          ) : (
                            <div className="w-full max-w-4xl mx-auto">
                              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200">
                                <div className="flex-1 text-left">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-foreground text-sm md:text-base font-normal tracking-wide uppercase">
                                      {service.name}
                                    </h4>
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-0.5">
                                    {displayInfo.duration} • {displayInfo.price}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <Button
                                    onClick={() => setSelectedService(service)}
                                    size="sm"
                                    className="px-3 py-1 text-xs tracking-wider uppercase h-7"
                                  >
                                    Book
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* No results message */}
          {activeCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No services found matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="py-16 px-4">
        <div className="max-w-[1040px] mx-auto text-center space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-normal tracking-[0.15em] mb-6 text-foreground uppercase">
              CANCELLATION POLICY
            </h2>
            <p className="text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
              At Sahiya, we kindly request at least 48 hours' notice for cancellations or rescheduling. Since services are reserved just for you, a cancellation fee may apply. We may request a deposit to secure bookings; deposits are used toward your final bill and are non-refundable for late cancellations or no-shows. Thank you for your understanding and support.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-normal tracking-[0.15em] mb-6 text-foreground uppercase">
              ALLERGY TESTING POLICY
            </h2>
            <p className="text-base md:text-lg text-foreground leading-relaxed max-w-3xl mx-auto">
              For new colour clients at Sahiya, please attend the salon at least 48 hours before your appointment for a complimentary skin allergy test.
            </p>
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
                  alt={`Salon detail ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Hidden */}
      {/* 
      <section className="py-16 px-4">
        <div className="max-w-[1040px] mx-auto text-center">
          <p className="text-lg md:text-xl text-foreground mb-8 tracking-wide">
            Ready to book?
          </p>
          
          <Button 
            asChild 
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-base tracking-wider uppercase transition-all duration-300"
          >
            <Link to="/booking">BOOK NOW</Link>
          </Button>
        </div>
      </section>
      */}

      <Footer />

      {/* Booking Modal */}
      {selectedService && (
        <ServiceBookingModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default Services;