import { Link } from 'react-router-dom';
import { Product } from '@/types/shop';
import { formatPriceRange } from '@/data/shopData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductImage } from './ProductImage';
import { EditableText } from '@/components/EditableText';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = product.images?.[0] || '/placeholder.svg';
  const altText = `${product.title}, premium ${product.category.toLowerCase()}`;

  return (
    <div className="group relative bg-card rounded-lg border shadow-sm hover:shadow-elegant transition-shadow duration-300 h-full flex flex-col">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-t-lg group-hover:scale-[1.02] transition-transform duration-300">
          <ProductImage
            src={imageUrl}
            alt={altText}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            priority={false}
          />
          {product.is_sale && (
            <Badge variant="destructive" className="absolute top-2 left-2 z-10">
              Sale
            </Badge>
          )}
        </div>
      </Link>
      
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem] flex-shrink-0">
            <EditableText 
              id={`product-title-${product.id}`}
              className="font-semibold text-sm"
            >
              {product.title}
            </EditableText>
          </h3>
        </Link>
        
        <div className="flex items-center justify-between flex-shrink-0">
          <span className="text-lg font-bold text-primary">
            <EditableText 
              id={`product-price-${product.id}`}
              className="text-lg font-bold text-primary"
            >
              {formatPriceRange(product.price_min, product.price_max)}
            </EditableText>
          </span>
        </div>
        
        <div className="mt-auto">
          <Link to={`/product/${product.slug}`}>
            <Button variant="outline" className="w-full" size="sm">
              Select options
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};