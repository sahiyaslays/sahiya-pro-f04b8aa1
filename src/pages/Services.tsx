import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { ServiceBookingModal } from "@/components/booking/ServiceBookingModal";
import { Search, ChevronDown, ChevronRight, Loader2, Scissors, Sparkles, Hand, Heart, Droplets, Eye, Palette, Sun, Circle, User } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";
import { useRef, useCallback } from "react";
interface ServiceOption {
  name: string;
  duration: number;
  price: number;
}

interface DatabaseService {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  category: string;
  subcategory: string | null;
  image_url: string | null;
  options: ServiceOption[] | null;
  active: boolean | null;
}

interface DisplayService {
  id: string;
  name: string;
  description: string;
  options: { label: string; duration: number; price: number }[];
}

interface DisplaySubcategory {
  id: string;
  title: string;
  services: DisplayService[];
}

interface DisplayCategory {
  id: string;
  title: string;
  subcategories: DisplaySubcategory[];
}

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'consultation-/-patch-test': <Circle className="w-3.5 h-3.5" />,
  'hair': <Scissors className="w-3.5 h-3.5" />,
  'nails': <Hand className="w-3.5 h-3.5" />,
  'facials': <Sparkles className="w-3.5 h-3.5" />,
  'waxing-and-threading': <Droplets className="w-3.5 h-3.5" />,
  'brows-and-lashes': <Eye className="w-3.5 h-3.5" />,
  'make-up': <Palette className="w-3.5 h-3.5" />,
  'tanning': <Sun className="w-3.5 h-3.5" />,
  'piercing': <Circle className="w-3.5 h-3.5" />,
  'body': <Heart className="w-3.5 h-3.5" />,
};

const Services = () => {
  const [services, setServices] = useState<DatabaseService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<DisplayService | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set());
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      
      // Parse options from JSON
      const parsedServices = (data || []).map((s: any) => ({
        ...s,
        options: s.options ? (s.options as ServiceOption[]) : null
      }));
      
      setServices(parsedServices);
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

  // Group services by category and subcategory
  const groupedServices = (): DisplayCategory[] => {
    const categories = new Map<string, Map<string, DisplayService[]>>();

    services.forEach(service => {
      if (!categories.has(service.category)) {
        categories.set(service.category, new Map());
      }
      
      const subcatMap = categories.get(service.category)!;
      const subcategory = service.subcategory || 'General';
      
      if (!subcatMap.has(subcategory)) {
        subcatMap.set(subcategory, []);
      }

      // Convert to display format
      const displayService: DisplayService = {
        id: service.id,
        name: service.name,
        description: service.description || '',
        options: service.options && service.options.length > 0
          ? service.options.map(opt => ({
              label: opt.name,
              duration: opt.duration,
              price: opt.price
            }))
          : [{ label: 'Standard', duration: service.duration, price: service.price }]
      };

      subcatMap.get(subcategory)!.push(displayService);
    });

    // Convert to array format
    const result: DisplayCategory[] = [];
    categories.forEach((subcatMap, catName) => {
      const subcategories: DisplaySubcategory[] = [];
      subcatMap.forEach((services, subcatName) => {
        subcategories.push({
          id: `${catName}-${subcatName}`.toLowerCase().replace(/\s+/g, '-'),
          title: subcatName,
          services
        });
      });
      result.push({
        id: catName.toLowerCase().replace(/\s+/g, '-'),
        title: catName,
        subcategories
      });
    });

    return result;
  };

  const getServiceDisplayInfo = (service: DisplayService) => {
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

  const servicesData = groupedServices();

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

  // Scroll to category section when clicking on nav
  const scrollToCategory = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === "") return;
    
    const element = categoryRefs.current[categoryId];
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 100;
      const headerHeight = 80; // approximate header height
      const offset = navHeight + headerHeight + 20;
      
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }, []);

  // Get service count per category
  const getCategoryServiceCount = useCallback((categoryId: string) => {
    const category = filteredServices.find(c => c.id === categoryId);
    if (!category) return 0;
    return category.subcategories.reduce((acc, sub) => acc + sub.services.length, 0);
  }, [filteredServices]);

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
            Transparent, simple 'from' pricing.
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
      <section 
        ref={navRef}
        className="sticky top-20 z-40 py-2.5 md:py-3 px-2 md:px-4 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md"
      >
        <div className="max-w-[1040px] mx-auto">
          {/* Categories - Mobile: single scrollable row with gradient indicators, Desktop: wrapped */}
          <div className="relative">
            {/* Scroll fade indicators for mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />
            
            <div className="flex md:flex-wrap gap-1.5 md:gap-2 justify-start md:justify-center overflow-x-auto scrollbar-hide py-0.5 px-1">
              <Button
                variant={activeCategory === "" ? "default" : "outline"}
                onClick={() => scrollToCategory("")}
                size="sm"
                className="text-[10px] md:text-xs tracking-wider uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0 h-8 md:h-9 px-3 md:px-4 rounded-full"
              >
                All
                <span className="ml-1 text-[9px] opacity-70">({services.length})</span>
              </Button>
              {servicesData.map((category) => {
                const count = getCategoryServiceCount(category.id);
                const icon = categoryIcons[category.id];
                
                return (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    onClick={() => scrollToCategory(category.id)}
                    size="sm"
                    className="text-[10px] md:text-xs tracking-wider uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0 h-8 md:h-9 px-2.5 md:px-4 rounded-full gap-1"
                  >
                    {icon}
                    <span className="hidden sm:inline">{category.title}</span>
                    <span className="sm:hidden">
                      {category.title.length > 10 ? category.title.split(' ')[0] : category.title}
                    </span>
                    <span className="ml-0.5 text-[9px] opacity-70">({count})</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-8 px-4">
        <div className="max-w-[1040px] mx-auto space-y-8">
          {activeCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchTerm ? `No services found matching "${searchTerm}"` : 'No services available'}
              </p>
            </div>
          ) : (
            activeCategories.map((category) => (
              <div 
                key={category.id} 
                ref={(el) => { categoryRefs.current[category.id] = el; }}
                className="space-y-6 scroll-mt-40"
              >
                {/* Category Header */}
                <div className="w-full bg-foreground py-2.5 md:py-3 flex items-center justify-center gap-2">
                  <span className="text-background">{categoryIcons[category.id]}</span>
                  <h2 className="text-center text-background text-base md:text-xl font-normal tracking-[0.15em] uppercase">
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
            ))
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
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Service Booking Modal */}
      {selectedService && (
        <ServiceBookingModal
          service={{
            id: selectedService.id,
            name: selectedService.name,
            options: selectedService.options.map(opt => ({
              label: opt.label,
              duration: opt.duration,
              price: opt.price
            }))
          }}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
};

export default Services;
