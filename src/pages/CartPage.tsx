import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/data/shopData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Footer } from "@/components/Footer";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      toast({
        title: "Coupon applied",
        description: "Your discount has been applied to your order.",
      });
      setCouponCode('');
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const adjustQuantity = (productId: string, variantLength: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateQuantity(productId, variantLength, newQuantity);
    }
  };

  if (cart.items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart | Sahiya Slays</title>
          <meta name="description" content="Review your selected hair products and proceed to checkout." />
          <link rel="canonical" href="/cart" />
        </Helmet>

        <div className="min-h-screen bg-background">
          <Header />
          
          <main className="pt-20">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center py-16">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link to="/shop">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart | Sahiya Slays</title>
        <meta name="description" content="Review your selected hair products and proceed to checkout." />
        <link rel="canonical" href="/cart" />
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
                <li aria-current="page" className="text-foreground">Cart</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Shopping Cart ({cart.items.length} items)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Product</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Options</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Subtotal</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cart.items.map((item) => (
                            <TableRow key={`${item.product.id}-${item.variant.length}`}>
                              <TableCell>
                                <div className="w-16 h-20">
                                  <img
                                    src={item.product.images[0] || '/placeholder.svg'}
                                    alt={`${item.product.title}, ${item.variant.length}`}
                                    className="w-full h-full object-cover rounded border"
                                  />
                                </div>
                              </TableCell>
                              <TableCell>
                                <Link
                                  to={`/product/${item.product.slug}`}
                                  className="font-medium hover:text-primary transition-colors line-clamp-2"
                                >
                                  {item.product.title}
                                </Link>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm text-muted-foreground">
                                  Length: {item.variant.length}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  {item.variant.sale_price ? (
                                    <>
                                      <span className="font-semibold">
                                        {formatPrice(item.variant.sale_price)}
                                      </span>
                                      <div className="text-sm text-muted-foreground line-through">
                                        {formatPrice(item.variant.price)}
                                      </div>
                                    </>
                                  ) : (
                                    <span className="font-semibold">
                                      {formatPrice(item.variant.price)}
                                    </span>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => adjustQuantity(
                                      item.product.id,
                                      item.variant.length,
                                      item.quantity,
                                      -1
                                    )}
                                    disabled={item.quantity <= 1}
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center text-sm">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => adjustQuantity(
                                      item.product.id,
                                      item.variant.length,
                                      item.quantity,
                                      1
                                    )}
                                    disabled={item.quantity >= 10}
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="font-semibold">
                                  {formatPrice((item.variant.sale_price || item.variant.price) * item.quantity)}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() => removeFromCart(item.product.id, item.variant.length)}
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/shop">
                      <Button variant="outline">Continue Shopping</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Coupon Code */}
                    <div className="space-y-2">
                      <label htmlFor="coupon" className="text-sm font-medium">
                        Coupon Code
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="coupon"
                          placeholder="Enter code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          onClick={handleApplyCoupon}
                          disabled={!couponCode.trim()}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatPrice(cart.subtotal)}</span>
                      </div>
                      
                      {cart.savings > 0 && (
                        <div className="flex justify-between text-destructive">
                          <span>Savings</span>
                          <span>-{formatPrice(cart.savings)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>{formatPrice(cart.subtotal)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleProceedToCheckout}
                      className="w-full"
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}