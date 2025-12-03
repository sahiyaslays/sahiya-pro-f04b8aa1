import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { EditableText } from '@/components/EditableText';
import { Product, SortOption } from '@/types/shop';
import { PRODUCTS, formatPriceRange } from '@/data/shopData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ProductImage } from '@/components/shop/ProductImage';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default sorting' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'newest', label: 'Newest' },
];

export default function Shop() {
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  const filteredAndSortedProducts = useMemo(() => {
    let productsFiltered = [...PRODUCTS];

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
        // Reverse order for newest (assuming later in array = newer)
        productsFiltered.reverse();
        break;
      default:
        // Default order
        break;
    }

    return productsFiltered;
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
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {filteredAndSortedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/shop/${product.slug}`}
                    className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <ProductImage
                      src={product.images[0]}
                      alt={product.title}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
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
                        {product.is_sale && (
                          <Badge variant="destructive" className="text-xs">Sale</Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
