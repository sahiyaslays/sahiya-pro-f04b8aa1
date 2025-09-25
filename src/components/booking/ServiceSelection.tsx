import { useState } from 'react';
import { BookingData, Service, SelectedService } from '@/types/booking';
import { services, serviceCategories } from '@/data/bookingData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Clock, AlertTriangle, Scissors, Palette, Heart, Sparkles, Hand, MoreHorizontal } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ServiceSelectionProps {
  bookingData: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

export function ServiceSelection({ bookingData, onUpdate, onNext }: ServiceSelectionProps) {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(bookingData.services || []);
  const [selectedCategory, setSelectedCategory] = useState<string>('Hair Cut & Finish');

  // Get category emoji for display
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'Hair Cut & Finish':
        return '✂️';
      case 'Colouring':
        return '🎨';
      case 'Hair & Scalp Treatment':
        return '💆‍♀️';
      case 'Beauty':
        return '💅';
      case 'Nails':
        return '👐';
      case 'Other Services':
        return '✨';
      default:
        return '✂️';
    }
  };

  const handleAddService = (service: Service) => {
    const existing = selectedServices.find(s => s.id === service.id);
    if (existing) {
      setSelectedServices(prev => 
        prev.map(s => s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s)
      );
    } else {
      setSelectedServices(prev => [...prev, { ...service, quantity: 1 }]);
    }
  };

  const handleRemoveService = (serviceId: string) => {
    const existing = selectedServices.find(s => s.id === serviceId);
    if (existing && existing.quantity > 1) {
      setSelectedServices(prev => 
        prev.map(s => s.id === serviceId ? { ...s, quantity: s.quantity - 1 } : s)
      );
    } else {
      setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
    }
  };

  const getServiceQuantity = (serviceId: string) => {
    return selectedServices.find(s => s.id === serviceId)?.quantity || 0;
  };

  const hasColouringService = selectedServices.some(s => s.category === 'Colouring');
  const hasFinishService = selectedServices.some(s => 
    s.category === 'Hair Cut & Finish' && 
    (s.id.includes('blow') || s.id.includes('cut'))
  );

  const canProceed = selectedServices.length > 0 && (!hasColouringService || hasFinishService);

  const handleNext = () => {
    onUpdate({ services: selectedServices });
    onNext();
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${mins}m`;
    }
  };

  const currentCategoryServices = services.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-normal tracking-[0.15em] mb-4 text-foreground uppercase">
          Choose Your Services
        </h2>
        <p className="text-muted-foreground tracking-wide">
          Select a category below to browse available services
        </p>
      </div>

      {/* Warning for colour services */}
      {hasColouringService && !hasFinishService && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            Colour services require a blow-dry or cut & blow-dry. Please add one to continue.
          </AlertDescription>
        </Alert>
      )}

      {/* Selected Services Summary */}
      {selectedServices.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-normal tracking-wide uppercase flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              Selected Services ({selectedServices.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedServices.map((service) => (
                <div key={service.id} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{service.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {formatDuration(service.duration)}
                      <span>•</span>
                      {service.price}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveService(service.id)}
                      className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{service.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddService(service)}
                      className="h-8 w-8 p-0 hover:bg-primary/10 hover:border-primary/30"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Selection */}
      <div>
        <h3 className="text-lg font-medium tracking-wide uppercase mb-4 text-center">Service Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {serviceCategories.map((category) => {
            const categoryServices = services.filter(s => s.category === category);
            if (categoryServices.length === 0) return null;
            
            const isSelected = selectedCategory === category;
            const hasSelectedServices = selectedServices.some(s => s.category === category);
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  isSelected 
                    ? 'border-primary bg-primary/10 shadow-lg' 
                    : 'border-gray-200 bg-[#f7f7f7] hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl">{getCategoryEmoji(category)}</div>
                  <div className={`text-xs font-medium text-center leading-tight ${
                    isSelected ? 'text-primary' : 'text-gray-700'
                  }`}>
                    {category.replace('&', '&')}
                  </div>
                  {hasSelectedServices && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                      {selectedServices.filter(s => s.category === category).length}
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services for Selected Category */}
      {selectedCategory && currentCategoryServices.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium tracking-wide uppercase flex items-center gap-2">
            <span className="text-2xl">{getCategoryEmoji(selectedCategory)}</span>
            {selectedCategory} Services
          </h3>
          <div className="grid gap-4">
            {currentCategoryServices.map((service) => {
              const quantity = getServiceQuantity(service.id);
              return (
                <Card key={service.id} className="transition-all duration-300 hover:shadow-lg bg-[#f7f7f7] border-gray-200 hover:border-primary/30">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium tracking-wide uppercase text-base mb-2 text-gray-800">
                          {service.name}
                        </h4>
                        {service.description && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {service.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDuration(service.duration)}
                          </div>
                          <span className="text-primary font-semibold text-base">
                            {service.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {quantity > 0 ? (
                          <div className="flex items-center gap-3 bg-white rounded-lg p-1 border border-gray-200">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveService(service.id)}
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddService(service)}
                              className="h-8 w-8 p-0 hover:bg-primary/10 hover:border-primary/30"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleAddService(service)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary font-medium px-6"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Service
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-center pt-8">
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          size="lg"
          className="px-12 py-4 text-lg tracking-wider uppercase font-medium"
        >
          Next: Choose Your Stylist 
          <span className="ml-2">👩‍💼</span>
        </Button>
      </div>
    </div>
  );
}