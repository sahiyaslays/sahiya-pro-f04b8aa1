import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Search, Plus, Check } from 'lucide-react';
import { servicesData, Service, ServiceOption } from '@/data/servicesData';

export interface SelectedAdditionalService {
  service: Service;
  selectedOption: ServiceOption;
}

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (service: SelectedAdditionalService) => void;
  existingServices: SelectedAdditionalService[];
}

export function AddServiceModal({ isOpen, onClose, onAddService, existingServices }: AddServiceModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedService(null);
      setSelectedOption(null);
    }
  }, [isOpen]);

  // Get all services flattened
  const allServices: Service[] = servicesData.flatMap(category =>
    category.subcategories.flatMap(sub => sub.services)
  );

  // Filter services based on search
  const filteredServices = allServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if service is already added
  const isServiceAdded = (serviceId: string) => {
    return existingServices.some(s => s.service.id === serviceId);
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `£${price}`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}min`;
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    // Auto-select first option if only one
    if (service.options.length === 1) {
      setSelectedOption(service.options[0]);
    } else {
      setSelectedOption(null);
    }
  };

  const handleAddService = () => {
    if (selectedService && selectedOption) {
      onAddService({ service: selectedService, selectedOption });
      setSelectedService(null);
      setSelectedOption(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden p-4 md:p-6">
        <DialogHeader className="relative pb-2">
          <DialogTitle className="text-base md:text-lg font-medium text-center pr-8">
            Add Another Service
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-6 w-6 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        {!selectedService ? (
          <>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Services List */}
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {filteredServices.map((service) => {
                  const isAdded = isServiceAdded(service.id);
                  const minPrice = Math.min(...service.options.map(o => o.price));
                  const maxPrice = Math.max(...service.options.map(o => o.price));
                  const priceRange = minPrice === maxPrice 
                    ? formatPrice(minPrice) 
                    : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

                  return (
                    <Card 
                      key={service.id} 
                      className={`cursor-pointer transition-all ${isAdded ? 'opacity-50' : 'hover:shadow-md hover:border-primary/50'}`}
                      onClick={() => !isAdded && handleSelectService(service)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <h5 className="font-medium text-sm text-foreground line-clamp-1">
                              {service.name}
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              {service.options.length} option{service.options.length > 1 ? 's' : ''} • {priceRange}
                            </p>
                          </div>
                          {isAdded ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <Plus className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {filteredServices.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No services found
                  </p>
                )}
              </div>
            </ScrollArea>
          </>
        ) : (
          <>
            {/* Selected Service Options */}
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedService(null)}
                className="text-xs text-muted-foreground mb-2"
              >
                ← Back to services
              </Button>
              <h4 className="font-medium text-sm">{selectedService.name}</h4>
              <p className="text-xs text-muted-foreground">Select an option</p>
            </div>

            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-2">
                {selectedService.options.map((option, index) => (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all ${
                      selectedOption === option 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:shadow-md hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedOption(option)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-medium text-sm">{option.label}</h5>
                          <p className="text-xs text-muted-foreground">
                            {formatDuration(option.duration)}
                          </p>
                        </div>
                        <span className="font-medium text-primary">
                          {formatPrice(option.price)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleAddService}
                disabled={!selectedOption}
              >
                Add Service
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
