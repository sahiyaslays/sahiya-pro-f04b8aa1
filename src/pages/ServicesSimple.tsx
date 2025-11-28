import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Search, Loader2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DBService {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  category: string;
  image_url: string | null;
  active: boolean;
}

export default function ServicesSimple() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [services, setServices] = useState<DBService[]>([]);
  const [loading, setLoading] = useState(true);

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
        .order('category', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
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

  const filteredServices = services.filter(service =>
    (searchTerm === "" || service.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeCategory === "" || service.category === activeCategory)
  );

  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <div className="min-h-screen bg-background font-abel">
      <Header />
      
      {/* Hero Section */}
      <section className="h-[34vh] md:h-[40vh] bg-white flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            <EditableText id="services-page-label">SS • HAIR • BEAUTY • NAILS</EditableText>
          </div>
          
          <EditableText 
            id="services-page-title" 
            as="h1" 
            className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase"
          >
            Our Services
          </EditableText>

          <EditableText 
            id="services-page-description" 
            as="p" 
            className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Experience premium beauty services tailored to perfection
          </EditableText>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-primary"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={activeCategory === "" ? "default" : "outline"}
                onClick={() => setActiveCategory("")}
                className={activeCategory === "" ? "bg-primary text-white" : ""}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? "bg-primary text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Services List */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No services found</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  {service.image_url && (
                    <img
                      src={service.image_url}
                      alt={service.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary font-bold text-lg">
                      {formatPrice(service.price)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatDuration(service.duration)}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => window.location.href = '/booking'}
                  >
                    Book Now
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
