import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { EditableText } from '@/components/EditableText';
import { SortOption } from '@/types/shop';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface DBProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  stock_quantity: number;
  active: boolean;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default sorting' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'newest', label: 'Newest' },
];

export default function Shop() {
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredAndSortedProducts = useMemo(() => {
    let productsFiltered = [...products];

    // Filter by categories if any selected
    if (selectedCategories.length > 0) {
      productsFiltered = productsFiltered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        productsFiltered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        productsFiltered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Already sorted by created_at desc from query
        break;
      default:
        // Default order
        break;
    }

    return productsFiltered;
  }, [sortBy, selectedCategories, products]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <>
      <Helmet>
        <title>Hair Extensions & Wigs Shop | Sahiya Slays</title>
        <meta name="description" content="Shop premium hair extensions, closures, frontals and accessories at Sahiya Slays. Raw Cambodian hair, HD lace, and more." />
        <link rel="canonical" href="/shop" />
        <meta property="og:title" content="Hair Extensions & Wigs Shop | Sahiya Slays" />
        <meta property="og:description" content="Shop premium hair extensions, closures, frontals and accessories at Sahiya Slays." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <EditableText 
                id="shop-page-title" 
                as="h1" 
                className="text-3xl font-bold mb-2"
              >
                Shop
              </EditableText>
              <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
                <ol className="flex items-center space-x-2">
                  <li>
                    <a href="/" className="hover:text-primary transition-colors">Home</a>
                  </li>
                  <li>/</li>
                  <li aria-current="page">Shop</li>
                </ol>
              </nav>
            </div>

            {/* Category Filters */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <p className="text-sm text-muted-foreground">
                Showing all {filteredAndSortedProducts.length} results
              </p>
              
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-full sm:w-auto sm:min-w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-bold text-xl">
                          £{product.price.toFixed(2)}
                        </span>
                        <span className="text-gray-500 text-sm">
                          Stock: {product.stock_quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination would go here if needed */}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}