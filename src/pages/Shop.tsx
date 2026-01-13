import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EditableText } from '@/components/EditableText';
import { SortOption } from '@/types/shop';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProductImage } from '@/components/shop/ProductImage';
import { QuickViewModal } from '@/components/shop/QuickViewModal';
import { Search, X, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

// Display product interface
interface DisplayProduct {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  category: string;
  price_min: number;
  price_max: number;
  images: string[];
  is_sale: boolean;
  variants: any[];
  long_description?: string;
}

// Convert database product to display format
interface DisplayProduct {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  category: string;
  price_min: number;
  price_max: number;
  images: string[];
  is_sale: boolean;
  variants: any[];
  long_description?: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default sorting' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'newest', label: 'Newest' },
];

export default function Shop() {
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<DisplayProduct | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

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

      // Transform database products to display format
      const displayProducts: DisplayProduct[] = (data || []).map((p: any) => {
        // Build images array
        let images: string[] = [];
        if (p.images && Array.isArray(p.images) && p.images.length > 0) {
          images = p.images;
        } else if (p.image_url) {
          images = [p.image_url];
        } else {
          images = ['/placeholder.svg'];
        }

        // Calculate price range from variants if available
        let priceMin = p.price;
        let priceMax = p.price;
        
        if (p.variants && Array.isArray(p.variants) && p.variants.length > 0) {
          const variantPrices = p.variants.map((v: any) => v.price || p.price);
          priceMin = Math.min(...variantPrices);
          priceMax = Math.max(...variantPrices);
        } else if (p.price_min !== null && p.price_max !== null) {
          priceMin = p.price_min;
          priceMax = p.price_max;
        }

        return {
          id: p.id,
          title: p.name,
          slug: p.slug || p.id,
          short_description: p.short_description || p.description || '',
          category: p.category,
          price_min: priceMin,
          price_max: priceMax,
          images,
          is_sale: p.is_sale || false,
          variants: p.variants || [],
          long_description: p.description || '',
        };
      });

      setProducts(displayProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredAndSortedProducts = useMemo(() => {
    let productsFiltered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      productsFiltered = productsFiltered.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.short_description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Filter by categories if any selected
    if (selectedCategories.length > 0) {
      productsFiltered = productsFiltered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        productsFiltered.sort((a, b) => a.price_min - b.price_min);
        break;
      case 'price-high':
        productsFiltered.sort((a, b) => b.price_max - a.price_max);
        break;
      case 'newest':
        // Already sorted by newest from database
        break;
      default:
        break;
    }

    return productsFiltered;
  }, [products, sortBy, selectedCategories, searchQuery]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleQuickView = (e: React.MouseEvent, product: DisplayProduct) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const formatPriceRange = (min: number, max: number) => {
    if (min === max) {
      return `£${min.toFixed(2)}`;
    }
    return `£${min.toFixed(2)} - £${max.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Shop Hair Extensions & Wigs | Raw Cambodian Hair | Sahiya Slays"
        description="Premium raw Cambodian hair bundles, HD lace wigs, frontals & hair care products. Virgin human hair lasting 4-5 years. Free UK shipping over £100."
        canonical="/shop"
        ogType="website"
        keywords="hair extensions London, raw Cambodian hair, HD lace wigs, hair bundles UK, frontals closures"
      />
      <SchemaMarkup 
        type="Product" 
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Sahiya Slays Hair Products",
          "description": "Premium hair extensions, wigs, closures and frontals",
          "numberOfItems": products.length,
          "itemListElement": products.slice(0, 10).map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "name": product.title,
              "url": `https://sahiyaslays.com/shop/${product.slug}`,
              "image": product.images[0],
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": product.price_min,
                "highPrice": product.price_max,
                "priceCurrency": "GBP"
              }
            }
          }))
        }}
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <Breadcrumbs className="mb-4" />
              <EditableText 
                id="shop-page-title" 
                as="h1" 
                className="text-3xl font-bold mb-2"
              >
                Shop
              </EditableText>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            {categories.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <p className="text-sm text-muted-foreground">
                {searchQuery 
                  ? `Found ${filteredAndSortedProducts.length} results for "${searchQuery}"`
                  : `Showing all ${filteredAndSortedProducts.length} results`
                }
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
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">
                  {searchQuery ? `No products found for "${searchQuery}"` : 'No products found'}
                </p>
                {searchQuery && (
                  <Button variant="outline" onClick={clearSearch}>
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {filteredAndSortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
                  >
                    <Link to={`/shop/${product.slug}`}>
                      <div className="relative">
                        <ProductImage
                          src={product.images[0]}
                          alt={product.title}
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.is_sale && (
                          <Badge variant="destructive" className="absolute top-2 left-2 z-10">
                            Sale
                          </Badge>
                        )}
                        {/* Quick View Button */}
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          onClick={(e) => handleQuickView(e, product)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Quick View
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm md:text-base font-semibold text-foreground mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-muted-foreground text-xs md:text-sm mb-3 line-clamp-2">
                          {product.short_description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-primary font-bold text-sm md:text-lg">
                            {formatPriceRange(product.price_min, product.price_max)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct as any}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
}
