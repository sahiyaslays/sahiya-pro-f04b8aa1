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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Pencil, Trash2, Search, Grid, List, Package } from 'lucide-react';
import { toast } from 'sonner';
import AdminSidebar from '@/components/AdminSidebar';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { VariantsBuilder, ProductVariant } from '@/components/admin/VariantsBuilder';

const PRODUCT_CATEGORIES = [
  'Bundles',
  'Closures',
  'Frontals',
  'Accessories',
  'Extensions',
  'Weft Installation',
  'Colour Theory',
];

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  stock_quantity: number | null;
  active: boolean | null;
  created_at: string | null;
  slug: string | null;
  images: string[] | null;
  variants: ProductVariant[] | null;
  short_description: string | null;
  long_description: string | null;
  price_min: number | null;
  price_max: number | null;
  is_sale: boolean | null;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  long_description: string;
  price: string;
  category: string;
  image_url: string;
  images: string[];
  variants: ProductVariant[];
  stock_quantity: string;
  active: boolean;
  is_sale: boolean;
}

const initialFormData: FormData = {
  name: '',
  slug: '',
  description: '',
  short_description: '',
  long_description: '',
  price: '',
  category: 'Bundles',
  image_url: '',
  images: [],
  variants: [],
  stock_quantity: '0',
  active: true,
  is_sale: false,
};

export default function AdminProductsManagement() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (user && user.email?.toLowerCase() !== 'sahiyaslays@gmail.com') {
      toast.error('Access denied. Admin only.');
      navigate('/user-dashboard');
    } else if (user) {
      fetchProducts();
    }
  }, [user, authLoading, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const parsedProducts = (data || []).map((p: any) => ({
        ...p,
        images: p.images || [],
        variants: p.variants || [],
      }));
      
      setProducts(parsedProducts);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let priceMin = parseFloat(formData.price) || 0;
      let priceMax = priceMin;
      
      if (formData.variants.length > 0) {
        const prices = formData.variants.map(v => v.price).filter(p => p > 0);
        if (prices.length > 0) {
          priceMin = Math.min(...prices);
          priceMax = Math.max(...prices);
        }
      }

      const productData: any = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description || null,
        short_description: formData.short_description || null,
        long_description: formData.long_description || null,
        price: parseFloat(formData.price) || priceMin,
        price_min: priceMin,
        price_max: priceMax,
        category: formData.category,
        image_url: formData.images[0] || formData.image_url || null,
        images: formData.images,
        variants: formData.variants,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        active: formData.active,
        is_sale: formData.is_sale,
      };

      if (editingProduct) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
        toast.success('Product created successfully');
      }

      setDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug || '',
      description: product.description || '',
      short_description: product.short_description || '',
      long_description: product.long_description || '',
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url || '',
      images: product.images || [],
      variants: product.variants || [],
      stock_quantity: (product.stock_quantity || 0).toString(),
      active: product.active ?? true,
      is_sale: product.is_sale ?? false,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      const { error } = await supabase.from('products').update({ active: !product.active }).eq('id', product.id);
      if (error) throw error;
      toast.success(`Product ${!product.active ? 'activated' : 'deactivated'}`);
      fetchProducts();
    } catch (error: any) {
      toast.error('Failed to update product status');
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData(initialFormData);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
            <p className="text-gray-600 mt-1">Add, edit, and manage your product catalog</p>
          </div>
          <Button onClick={() => { resetForm(); setDialogOpen(true); }} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Card className="mb-6 bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-white border-gray-300" />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300"><SelectValue placeholder="All Categories" /></SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {PRODUCT_CATEGORIES.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                </SelectContent>
              </Select>
              <div className="flex gap-1">
                <Button variant={viewMode === 'table' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('table')} className={viewMode === 'table' ? 'bg-primary' : 'border-gray-300'}><List className="h-4 w-4" /></Button>
                <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-primary' : 'border-gray-300'}><Grid className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {viewMode === 'table' ? (
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader><CardTitle className="text-gray-900">All Products ({filteredProducts.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-200 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="text-gray-700">Image</TableHead>
                      <TableHead className="text-gray-700">Name</TableHead>
                      <TableHead className="text-gray-700">Category</TableHead>
                      <TableHead className="text-gray-700">Price</TableHead>
                      <TableHead className="text-gray-700">Status</TableHead>
                      <TableHead className="text-right text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-500">No products found</TableCell></TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell>
                            {(product.images?.[0] || product.image_url) ? (
                              <img src={product.images?.[0] || product.image_url || ''} alt={product.name} className="w-12 h-12 object-cover rounded" />
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center"><Package className="h-6 w-6 text-gray-400" /></div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                          <TableCell className="text-gray-700">{product.category}</TableCell>
                          <TableCell className="text-primary font-medium">£{Number(product.price).toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {product.active ? 'Active' : 'Inactive'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => toggleActive(product)} className="border-gray-300">{product.active ? 'Deactivate' : 'Activate'}</Button>
                              <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="border-gray-300"><Pencil className="h-4 w-4" /></Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)} className="border-red-200 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white border-gray-200 overflow-hidden">
                <div className="aspect-square relative">
                  {(product.images?.[0] || product.image_url) ? (
                    <img src={product.images?.[0] || product.image_url || ''} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center"><Package className="h-12 w-12 text-gray-400" /></div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-primary font-medium mt-1">£{Number(product.price).toFixed(2)}</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(product)}><Pencil className="h-4 w-4 mr-1" />Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)} className="border-red-200 text-red-600"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle className="text-gray-900 text-xl">{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="variants">Variants & Pricing</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">Product Name *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })} className="bg-white border-gray-300" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-700">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger className="bg-white border-gray-300"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-white">{PRODUCT_CATEGORIES.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="short_description" className="text-gray-700">Short Description</Label>
                    <Textarea id="short_description" value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} className="bg-white border-gray-300" rows={2} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="long_description" className="text-gray-700">Full Description</Label>
                    <Textarea id="long_description" value={formData.long_description} onChange={(e) => setFormData({ ...formData, long_description: e.target.value })} className="bg-white border-gray-300" rows={4} />
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch id="active" checked={formData.active} onCheckedChange={(checked) => setFormData({ ...formData, active: checked })} />
                      <Label htmlFor="active" className="text-gray-700">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="is_sale" checked={formData.is_sale} onCheckedChange={(checked) => setFormData({ ...formData, is_sale: checked })} />
                      <Label htmlFor="is_sale" className="text-gray-700">On Sale</Label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="images" className="space-y-4">
                  <ImageUploader images={formData.images} onImagesChange={(images) => setFormData({ ...formData, images })} bucket="product-images" maxImages={10} />
                </TabsContent>

                <TabsContent value="variants" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-700">Base Price (£) *</Label>
                    <Input id="price" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="bg-white border-gray-300 max-w-xs" required={formData.variants.length === 0} />
                  </div>
                  <VariantsBuilder variants={formData.variants} onVariantsChange={(variants) => setFormData({ ...formData, variants })} />
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-gray-300">Cancel</Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingProduct ? 'Update' : 'Create'} Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
