import { useCart } from '@/hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '@/data/shopData';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export const CartDrawer = () => {
  const { cart, isDrawerOpen, closeDrawer, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    closeDrawer();
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">Your Cart</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeDrawer}
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={handleContinueShopping} variant="outline">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={`${item.product.id}-${item.variant.length}`} className="flex gap-4">
                    <div className="w-16 h-20 flex-shrink-0">
                      <img
                        src={item.product.images[0] || '/placeholder.svg'}
                        alt={`${item.product.title}, ${item.variant.length}`}
                        className="w-full h-full object-cover rounded border"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={closeDrawer}
                        className="block font-medium text-sm hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Length: {item.variant.length}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(
                              item.product.id,
                              item.variant.length,
                              item.quantity - 1
                            )}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(
                              item.product.id,
                              item.variant.length,
                              item.quantity + 1
                            )}
                            disabled={item.quantity >= 10}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {formatPrice((item.variant.sale_price || item.variant.price) * item.quantity)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.product.id, item.variant.length)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
                </div>
                {cart.savings > 0 && (
                  <div className="flex justify-between text-sm text-destructive">
                    <span>Savings</span>
                    <span>-{formatPrice(cart.savings)}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Taxes and shipping calculated at checkout
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleContinueShopping} className="flex-1">
                  Continue shopping
                </Button>
                <Button onClick={handleCheckout} className="flex-1">
                  Go to checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};