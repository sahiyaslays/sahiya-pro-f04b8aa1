import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onClick?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
}

export const ProductImage = ({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  priority = false,
  onClick,
  onError,
  style
}: ProductImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    onError?.();
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Use the original image or fallback
  const displaySrc = imageError ? '/placeholder.svg' : src;

  return (
    <div className="relative bg-muted aspect-square overflow-hidden">
      <img
        src={displaySrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={onClick}
        style={{
          display: 'block',
          imageRendering: 'auto',
          objectPosition: 'center',
          ...style
        }}
      />
      
      {/* Clean loading placeholder */}
      {!isLoaded && !imageError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
};