import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductImage } from '@/components/shop/ProductImage';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { useCart } from '@/hooks/useCart';
import { PRODUCTS, formatPrice } from '@/data/shopData';
import { Product, Variant } from '@/types/shop';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ZoomIn, Star, Shield, Truck, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EditableText } from '@/components/EditableText';
import { EditableVariants } from '@/components/shop/EditableVariants';
import { useEditMode } from '@/contexts/EditModeContext';
export default function ProductDetail() {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const {
    addToCart
  } = useCart();
  const {
    toast
  } = useToast();
  const { isEditMode } = useEditMode();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [customVariants, setCustomVariants] = useState<Variant[]>([]);
  const product = PRODUCTS.find(p => p.slug === slug);
  
  // Load custom variants from localStorage
  useEffect(() => {
    if (product) {
      const stored = localStorage.getItem(`variants-${product.id}`);
      if (stored) {
        try {
          setCustomVariants(JSON.parse(stored));
        } catch (e) {
          setCustomVariants(product.variants);
        }
      } else {
        setCustomVariants(product.variants);
      }
    }
  }, [product]);
  
  const displayVariants = customVariants.length > 0 ? customVariants : product?.variants || [];
  useEffect(() => {
    if (product && displayVariants.length === 1) {
      setSelectedVariant(displayVariants[0]);
    } else {
      setSelectedVariant(null);
    }
    setQuantity(1);
    setSelectedImageIndex(0);
  }, [product, displayVariants]);
  if (!product) {
    return <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <Link to="/shop" className="text-primary hover:underline">
              Return to shop
            </Link>
          </div>
        </main>
      </div>;
  }
  const relatedProducts = product.related_slugs ? PRODUCTS.filter(p => product.related_slugs?.includes(p.slug)).slice(0, 4) : PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const currentPrice = selectedVariant ? selectedVariant.sale_price || selectedVariant.price : null;
  const priceDisplay = selectedVariant ? formatPrice(selectedVariant.sale_price || selectedVariant.price) : `${formatPrice(product.price_min)} – ${formatPrice(product.price_max)}`;
  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast({
        title: "Please select a length",
        description: "You must choose a length before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    addToCart(product, selectedVariant, quantity);
  };
  const adjustQuantity = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  const getImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl) {
      return '/placeholder.svg';
    }
    return imageUrl;
  };
  return <>
      <Helmet>
        <title>{product.title} | Sahiya Slays</title>
        <meta name="description" content={product.short_description} />
        <link rel="canonical" href={`/shop/${product.slug}`} />
        <meta property="og:title" content={`${product.title} | Sahiya Slays`} />
        <meta property="og:description" content={product.short_description} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:type" content="product" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.title,
          "image": product.images,
          "description": product.short_description,
          "brand": {
            "@type": "Brand",
            "name": "Sahiya Slays"
          },
          "offers": product.variants.map(variant => ({
            "@type": "Offer",
            "price": variant.sale_price || variant.price,
            "priceCurrency": "GBP",
            "availability": variant.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "sku": variant.sku || `${product.id}-${variant.length}`
          }))
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                </li>
                <li>/</li>
                <li>
                  <span className="text-muted-foreground">{product.category}</span>
                </li>
                <li>/</li>
                <li aria-current="page" className="text-foreground">{product.title}</li>
              </ol>
            </nav>

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                 {/* Images */}
                 <div className="space-y-4">
                   <div className="relative aspect-[4/5] overflow-hidden rounded-lg border bg-muted">
                     <img
                       src={getImageUrl(product.images?.[selectedImageIndex])}
                       alt={`${product.title}, length options available`}
                       className="w-full h-full object-contain cursor-zoom-in"
                       sizes="(min-width: 1024px) 50vw, 100vw"
                       loading="eager"
                       onClick={() => setShowZoom(true)}
                     />
                     <Button variant="secondary" size="icon" className="absolute top-4 right-4" onClick={() => setShowZoom(true)} aria-label="Zoom image">
                       <ZoomIn className="h-4 w-4" />
                     </Button>
                   </div>
                
                  {product.images && product.images.length > 1 && <div className="flex gap-2 overflow-x-auto">
                      {product.images.map((image, index) => <button key={index} onClick={() => setSelectedImageIndex(index)} className={`flex-shrink-0 w-20 h-24 rounded border-2 overflow-hidden bg-muted ${selectedImageIndex === index ? 'border-primary' : 'border-transparent'}`}>
                          <img
                            src={getImageUrl(image)}
                            alt={`${product.title} view ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>)}
                    </div>}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    <EditableText 
                      id={`product-detail-title-${product.id}`}
                      className="text-3xl font-bold"
                    >
                      {product.title}
                    </EditableText>
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    <EditableText 
                      id={`product-detail-brand-${product.id}`}
                      className="text-sm text-muted-foreground"
                    >
                      Brand: Sahiya Slays
                    </EditableText>
                  </p>
                </div>

                <div className="prose prose-sm max-w-none">
                  <ul className="space-y-1">
                    {product.short_description.split('.').filter(Boolean).map((point, index) => <li key={index} className="text-sm">
                      <EditableText 
                        id={`product-detail-desc-${product.id}-${index}`}
                        className="text-sm"
                      >
                        {point.trim()}.
                      </EditableText>
                    </li>)}
                  </ul>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    {selectedVariant?.sale_price ? <>
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(selectedVariant.sale_price)}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(selectedVariant.price)}
                        </span>
                        <Badge variant="destructive">Sale</Badge>
                      </> : <span className="text-2xl font-bold text-primary">{priceDisplay}</span>}
                  </div>
                </div>

                {/* Variant Selection */}
                {displayVariants.length > 1 && <div className="space-y-2">
                    <label htmlFor="length-select" className="text-sm font-medium">Size *</label>
                    <Select value={selectedVariant?.length || ''} onValueChange={length => {
                  const variant = displayVariants.find(v => v.length === length);
                  setSelectedVariant(variant || null);
                }}>
                      <SelectTrigger id="length-select">
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {displayVariants.map(variant => <SelectItem key={variant.length} value={variant.length}>
                            {variant.length} - {formatPrice(variant.sale_price || variant.price)}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>}

                {/* Editable Variants - Only shown in edit mode */}
                {isEditMode && product && (
                  <EditableVariants 
                    productId={product.id}
                    variants={displayVariants}
                    onVariantChange={setCustomVariants}
                  />
                )}

                {/* Quantity */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => adjustQuantity(-1)} disabled={quantity <= 1} aria-label="Decrease quantity">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => adjustQuantity(1)} disabled={quantity >= 10} aria-label="Increase quantity">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button onClick={handleAddToCart} className="w-full py-3 text-lg" disabled={!selectedVariant}>
                  Add to cart
                </Button>

                {/* Processing Time */}
                {product.processing_time_note && <p className="text-sm text-muted-foreground">
                    <EditableText 
                      id={`product-detail-processing-${product.id}`}
                      className="text-sm text-muted-foreground"
                    >
                      {product.processing_time_note}
                    </EditableText>
                  </p>}

                {/* Trust Badges */}
                <div className="flex items-center justify-between py-4 border-t border-b">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <EditableText 
                      id={`product-detail-badge-secure-${product.id}`}
                      className="text-sm"
                    >
                      Secure payments
                    </EditableText>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    <EditableText 
                      id={`product-detail-badge-delivery-${product.id}`}
                      className="text-sm"
                    >
                      Fast delivery
                    </EditableText>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-primary" />
                    <EditableText 
                      id={`product-detail-badge-quality-${product.id}`}
                      className="text-sm"
                    >
                      Premium quality
                    </EditableText>
                  </div>
                </div>

                {/* Payment Icons */}
                <div className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                  <EditableText 
                    id={`product-detail-payment-${product.id}`}
                    className="text-sm text-muted-foreground"
                  >
                    Visa, Mastercard, PayPal accepted
                  </EditableText>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mb-16">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="care">Care & Maintenance</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-6">
                  <div className="prose prose-sm max-w-none">
                    <EditableText 
                      id={`product-detail-description-${product.id}`}
                      className="prose prose-sm max-w-none"
                    >
                      {product.description_long}
                    </EditableText>
                  </div>
                </TabsContent>
                
                <TabsContent value="care" className="mt-6">
                  <div className="prose prose-sm max-w-none">
                    <h3>
                      <EditableText 
                        id={`product-detail-care-title-${product.id}`}
                        as="h3"
                      >
                        Hair Care Instructions
                      </EditableText>
                    </h3>
                    <ul>
                      <li>
                        <EditableText id={`product-detail-care-1-${product.id}`}>
                          Wash with sulfate-free shampoo and conditioner
                        </EditableText>
                      </li>
                      <li>
                        <EditableText id={`product-detail-care-2-${product.id}`}>
                          Use a wide-tooth comb when wet
                        </EditableText>
                      </li>
                      <li>
                        <EditableText id={`product-detail-care-3-${product.id}`}>
                          Apply heat protectant before styling
                        </EditableText>
                      </li>
                      <li>
                        <EditableText id={`product-detail-care-4-${product.id}`}>
                          Store on a wig stand or hanger when not in use
                        </EditableText>
                      </li>
                      <li>
                        <EditableText id={`product-detail-care-5-${product.id}`}>
                          Deep condition weekly for best results
                        </EditableText>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="shipping" className="mt-6">
                  <div className="prose prose-sm max-w-none">
                    <h3>
                      <EditableText 
                        id={`product-detail-shipping-title-${product.id}`}
                        as="h3"
                      >
                        Shipping Information
                      </EditableText>
                    </h3>
                    <p>
                      <EditableText id={`product-detail-shipping-1-${product.id}`}>
                        Standard delivery: 3-5 business days
                      </EditableText>
                    </p>
                    <p>
                      <EditableText id={`product-detail-shipping-2-${product.id}`}>
                        Express delivery: 1-2 business days
                      </EditableText>
                    </p>
                    <p>
                      <EditableText id={`product-detail-shipping-3-${product.id}`}>
                        Free shipping on orders over £100
                      </EditableText>
                    </p>
                    
                    <h3>
                      <EditableText 
                        id={`product-detail-returns-title-${product.id}`}
                        as="h3"
                      >
                        Returns Policy
                      </EditableText>
                    </h3>
                    <p>
                      <EditableText id={`product-detail-returns-1-${product.id}`}>
                        30-day return policy for unopened items
                      </EditableText>
                    </p>
                    <p>
                      <EditableText id={`product-detail-returns-2-${product.id}`}>
                        Items must be in original packaging
                      </EditableText>
                    </p>
                    <p>
                      <EditableText id={`product-detail-returns-3-${product.id}`}>
                        Return shipping fees may apply
                      </EditableText>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && <section>
                <h2 className="text-2xl font-bold mb-6">You may also like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map(relatedProduct => <ProductCard key={relatedProduct.id} product={relatedProduct} />)}
                </div>
              </section>}
          </div>
        </main>

        <Footer />
        <CartDrawer />
      </div>
    </>;
}