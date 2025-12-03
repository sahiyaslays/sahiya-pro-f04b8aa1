import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, Variant } from '@/types/shop';
import { formatPrice } from '@/data/shopData';
import { useCart } from '@/hooks/useCart';
import { ProductImage } from './ProductImage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickViewModal = ({ product, open, onOpenChange }: QuickViewModalProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      if (product.variants.length === 1) {
        setSelectedVariant(product.variants[0]);
      } else {
        setSelectedVariant(null);
      }
      setQuantity(1);
      setSelectedImageIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast({
        title: "Please select an option",
        description: "You must choose a size/length before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    addToCart(product, selectedVariant, quantity);
    onOpenChange(false);
  };

  const adjustQuantity = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const priceDisplay = selectedVariant
    ? formatPrice(selectedVariant.sale_price || selectedVariant.price)
    : `${formatPrice(product.price_min)} – ${formatPrice(product.price_max)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="p-4 bg-muted/30">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
              <img
                src={product.images[selectedImageIndex] || '/placeholder.svg'}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.is_sale && (
                <Badge variant="destructive" className="absolute top-2 left-2">
                  Sale
                </Badge>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-4">
            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="text-xl font-bold leading-tight">
                {product.title}
              </DialogTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.short_description}
              </p>
            </DialogHeader>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              {selectedVariant?.sale_price ? (
                <>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(selectedVariant.sale_price)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(selectedVariant.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">{priceDisplay}</span>
              )}
            </div>

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Size / Length *</label>
                <Select
                  value={selectedVariant?.length || ''}
                  onValueChange={(length) => {
                    const variant = product.variants.find(v => v.length === length);
                    setSelectedVariant(variant || null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.map((variant) => (
                      <SelectItem key={variant.length} value={variant.length}>
                        {variant.length} - {formatPrice(variant.sale_price || variant.price)}
                        {!variant.in_stock && ' (Out of stock)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustQuantity(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => adjustQuantity(1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full"
              disabled={!selectedVariant || !selectedVariant.in_stock}
            >
              {!selectedVariant ? 'Select an option' : 'Add to cart'}
            </Button>

            {/* View Full Details Link */}
            <Link
              to={`/shop/${product.slug}`}
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View full details
            </Link>

            {/* Processing Time */}
            {product.processing_time_note && (
              <p className="text-xs text-muted-foreground border-t pt-3">
                {product.processing_time_note}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
