export interface Variant {
  length: string;
  price: number;
  sale_price?: number;
  in_stock: boolean;
  sku?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: "Bundles" | "Closures" | "Frontals" | "Accessories" | "Extensions" | "Weft Installation";
  short_description: string;
  images: string[];
  variants: Variant[];
  price_min: number;
  price_max: number;
  processing_time_note?: string;
  description_long: string;
  related_slugs?: string[];
  is_sale?: boolean;
}

export interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  savings: number;
}

export type SortOption = 'default' | 'price-low' | 'price-high' | 'newest';

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  paymentMethod: 'cash-on-delivery' | 'paypal';
  agreeToTerms: boolean;
}