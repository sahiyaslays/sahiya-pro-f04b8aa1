import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { PRODUCTS } from '@/data/shopData';
import { SortOption } from '@/types/shop';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default sorting' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'newest', label: 'Newest' },
];

const CATEGORIES = ['Bundles', 'Closures', 'Frontals', 'Accessories', 'Extensions'] as const;

export default function Shop() {
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...PRODUCTS];

    // Filter by categories if any selected
    if (selectedCategories.length > 0) {
      products = products.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price_min - b.price_min);
        break;
      case 'price-high':
        products.sort((a, b) => b.price_max - a.price_max);
        break;
      case 'newest':
        // For now, reverse the array (newest last in data)
        products.reverse();
        break;
      default:
        // Default order
        break;
    }

    return products;
  }, [sortBy, selectedCategories]);

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
              <h1 className="text-3xl font-bold mb-2">Shop</h1>
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
                {CATEGORIES.map(category => (
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
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination would go here if needed */}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}