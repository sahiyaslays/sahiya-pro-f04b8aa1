import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Cart, Product, Variant } from '@/types/shop';
import { useToast } from '@/hooks/use-toast';

interface CartState {
  cart: Cart;
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; variant: Variant; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantLength: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; variantLength: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' };

const initialState: CartState = {
  cart: {
    items: [],
    subtotal: 0,
    savings: 0,
  },
  isDrawerOpen: false,
};

const calculateCartTotals = (items: CartItem[]): { subtotal: number; savings: number } => {
  let subtotal = 0;
  let savings = 0;

  items.forEach(item => {
    const price = item.variant.sale_price || item.variant.price;
    subtotal += price * item.quantity;
    
    if (item.variant.sale_price) {
      savings += (item.variant.price - item.variant.sale_price) * item.quantity;
    }
  });

  return { subtotal, savings };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity } = action.payload;
      const existingItemIndex = state.cart.items.findIndex(
        item => item.product.id === product.id && item.variant.length === variant.length
      );

      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = [...state.cart.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems = [...state.cart.items, { product, variant, quantity }];
      }

      const totals = calculateCartTotals(newItems);
      return {
        ...state,
        cart: {
          items: newItems,
          ...totals,
        },
        isDrawerOpen: true,
      };
    }

    case 'REMOVE_ITEM': {
      const { productId, variantLength } = action.payload;
      const newItems = state.cart.items.filter(
        item => !(item.product.id === productId && item.variant.length === variantLength)
      );
      const totals = calculateCartTotals(newItems);
      return {
        ...state,
        cart: {
          items: newItems,
          ...totals,
        },
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, variantLength, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId, variantLength } });
      }

      const newItems = state.cart.items.map(item =>
        item.product.id === productId && item.variant.length === variantLength
          ? { ...item, quantity }
          : item
      );
      const totals = calculateCartTotals(newItems);
      return {
        ...state,
        cart: {
          items: newItems,
          ...totals,
        },
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          items: [],
          subtotal: 0,
          savings: 0,
        },
      };

    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true };

    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };

    default:
      return state;
  }
};

interface CartContextType {
  cart: Cart;
  isDrawerOpen: boolean;
  addToCart: (product: Product, variant: Variant, quantity: number) => void;
  removeFromCart: (productId: string, variantLength: string) => void;
  updateQuantity: (productId: string, variantLength: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { toast } = useToast();

  const addToCart = (product: Product, variant: Variant, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, variant, quantity } });
    // Removed toast - only cart drawer opens now
  };

  const removeFromCart = (productId: string, variantLength: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantLength } });
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: string, variantLength: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantLength, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openDrawer = () => {
    dispatch({ type: 'OPEN_DRAWER' });
  };

  const closeDrawer = () => {
    dispatch({ type: 'CLOSE_DRAWER' });
  };

  const getItemCount = () => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        isDrawerOpen: state.isDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};