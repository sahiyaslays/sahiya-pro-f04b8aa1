import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Pencil, Trash2, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import AdminSidebar from '@/components/AdminSidebar';
import { ServiceOptionsBuilder, ServiceOption } from '@/components/admin/ServiceOptionsBuilder';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Json } from '@/integrations/supabase/types';

// All 10 service categories (matching database)
const SERVICE_CATEGORIES = [
  'CONSULTATION / PATCH TEST',
  'HAIR',
  'NAILS',
  'FACIALS',
  'WAXING AND THREADING',
  'BROWS AND LASHES',
  'MAKE UP',
  'TANNING',
  'PIERCING',
  'BODY'
];

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  category: string;
  subcategory: string | null;
  options: ServiceOption[] | null;
  active: boolean;
  created_at: string;
}

export default function AdminServicesManagement() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(SERVICE_CATEGORIES));
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'HAIR',
    subcategory: '',
    active: true,
    options: [] as ServiceOption[],
  });

  const { user, loading: authLoading, isAdmin } = useAuth();
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && user && !isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/user-dashboard');
    } else if (!authLoading && user && isAdmin) {
      fetchServices();
    }
  }, [user, authLoading, navigate, isAdmin]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      
      // Parse options from JSON
      const parsedServices = (data || []).map(service => ({
        ...service,
        options: service.options ? (service.options as unknown as ServiceOption[]) : null
      }));
      
      setServices(parsedServices);
    } catch (error: any) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Calculate base price and duration from options if available
      let basePrice = parseFloat(formData.price) || 0;
      let baseDuration = parseInt(formData.duration) || 0;
      
      if (formData.options.length > 0) {
        basePrice = Math.min(...formData.options.map(o => o.price));
        baseDuration = formData.options[0].duration;
      }

      const serviceData = {
        name: formData.name,
        description: formData.description || null,
        price: basePrice,
        duration: baseDuration,
        category: formData.category,
        subcategory: formData.subcategory || null,
        options: formData.options.length > 0 ? formData.options as unknown as Json : null,
        active: formData.active,
      };

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);

        if (error) throw error;
        toast.success('Service updated successfully');
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);

        if (error) throw error;
        toast.success('Service created successfully');
      }

      setDialogOpen(false);
      resetForm();
      fetchServices();
    } catch (error: any) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      price: service.price.toString(),
      duration: service.duration.toString(),
      category: service.category,
      subcategory: service.subcategory || '',
      active: service.active,
      options: service.options || [],
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error: any) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ active: !service.active })
        .eq('id', service.id);

      if (error) throw error;
      toast.success(`Service ${!service.active ? 'activated' : 'deactivated'}`);
      fetchServices();
    } catch (error: any) {
      console.error('Error toggling service status:', error);
      toast.error('Failed to update service status');
    }
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      category: 'HAIR',
      subcategory: '',
      active: true,
      options: [],
    });
  };


  const toggleCategoryExpanded = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Filter and group services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const groupedServices = SERVICE_CATEGORIES.reduce((acc, category) => {
    acc[category] = filteredServices.filter(s => s.category === category);
    return acc;
  }, {} as Record<string, Service[]>);

  const formatPrice = (service: Service) => {
    if (service.options && service.options.length > 1) {
      const prices = service.options.map(o => o.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max ? `£${min}` : `£${min} - £${max}`;
    }
    return `£${Number(service.price).toFixed(2)}`;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
            <p className="text-gray-500 mt-1">{services.length} services total</p>
          </div>
          <Button 
            onClick={() => {
              resetForm();
              setDialogOpen(true);
            }}
            className="gap-2 bg-primary hover:bg-primary/90 text-black font-semibold"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[200px] bg-white border-gray-300">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Categories</SelectItem>
              {SERVICE_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Services by Category */}
        <div className="space-y-4">
          {SERVICE_CATEGORIES.map(category => {
            const categoryServices = groupedServices[category] || [];
            if (categoryFilter !== 'all' && categoryFilter !== category) return null;
            
            return (
              <Card key={category} className="bg-white border-gray-200 shadow-sm">
                <Collapsible 
                  open={expandedCategories.has(category)}
                  onOpenChange={() => toggleCategoryExpanded(category)}
                >
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        {expandedCategories.has(category) ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {category}
                        </CardTitle>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {categoryServices.length} services
                        </span>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      {categoryServices.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">
                          No services in this category
                        </p>
                      ) : (
                        <div className="rounded-md border border-gray-200">
                          <Table>
                            <TableHeader>
                              <TableRow className="border-gray-200 hover:bg-gray-50">
                                <TableHead className="text-gray-700">Name</TableHead>
                                <TableHead className="text-gray-700">Subcategory</TableHead>
                                <TableHead className="text-gray-700">Price</TableHead>
                                <TableHead className="text-gray-700">Duration</TableHead>
                                <TableHead className="text-gray-700">Options</TableHead>
                                <TableHead className="text-gray-700">Status</TableHead>
                                <TableHead className="text-right text-gray-700">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {categoryServices.map((service) => (
                                <TableRow key={service.id} className="border-gray-200 hover:bg-gray-50">
                                  <TableCell className="font-medium text-gray-900">
                                    {service.name}
                                  </TableCell>
                                  <TableCell className="text-gray-700">
                                    {service.subcategory || '-'}
                                  </TableCell>
                                  <TableCell className="text-primary font-medium">
                                    {formatPrice(service)}
                                  </TableCell>
                                  <TableCell className="text-gray-700">
                                    {service.duration} min
                                  </TableCell>
                                  <TableCell className="text-gray-700">
                                    {service.options && service.options.length > 0 ? (
                                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                                        {service.options.length} options
                                      </span>
                                    ) : (
                                      <span className="text-gray-400">-</span>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        service.active
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-gray-100 text-gray-600'
                                      }`}
                                    >
                                      {service.active ? 'Active' : 'Inactive'}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleActive(service)}
                                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                      >
                                        {service.active ? 'Deactivate' : 'Activate'}
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(service)}
                                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(service.id)}
                                        className="border-red-200 text-red-600 hover:bg-red-50"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>

        {/* Add/Edit Service Dialog */}
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-900 text-xl">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="options">Options & Pricing</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">Service Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white border-gray-300 text-gray-900"
                        placeholder="e.g., Traditional Weave"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-700">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: '' })}
                      >
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          {SERVICE_CATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subcategory" className="text-gray-700">Subcategory</Label>
                      <Input
                        id="subcategory"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        className="bg-white border-gray-300 text-gray-900"
                        placeholder="e.g., Styling, Hair Colouring"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-8">
                      <Switch
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                      />
                      <Label htmlFor="active" className="text-gray-700">Active (Published)</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-700">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-white border-gray-300 text-gray-900"
                      rows={4}
                      placeholder="Describe this service..."
                    />
                  </div>

                  {formData.options.length === 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-gray-700">Base Price (£) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="bg-white border-gray-300 text-gray-900"
                          required={formData.options.length === 0}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-gray-700">Duration (minutes) *</Label>
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="bg-white border-gray-300 text-gray-900"
                          required={formData.options.length === 0}
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>


                <TabsContent value="options" className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Add options for services with different pricing based on hair length, duration, or other variants. 
                      If you add options, they will override the base price and duration.
                    </p>
                  </div>
                  
                  <ServiceOptionsBuilder
                    options={formData.options}
                    onOptionsChange={(options) => setFormData({ ...formData, options })}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 pt-6 border-t mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-black font-semibold"
                >
                  {editingService ? 'Update' : 'Create'} Service
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
