import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/data/shopData';
import { CheckoutFormData } from '@/types/shop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Shield, Truck, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PayPalButton } from '@/components/PayPalButton';


const COUNTRIES = [
  'United Kingdom',
  'United States',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Other'
];

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
    paymentMethod: 'card',
    agreeToTerms: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string>('');

  const updateFormData = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    const requiredFields: (keyof CheckoutFormData)[] = [
      'email', 'firstName', 'lastName', 'phone', 'address', 'city', 'postcode', 'country'
    ];
    
    return requiredFields.every(field => formData[field]?.toString().trim()) && 
           formData.agreeToTerms;
  };

  const handlePayPalSuccess = async () => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const orderData = { 
        ...formData, 
        items: cart.items, 
        total: cart.subtotal,
        orderId: currentOrderId,
        createdAt: new Date().toISOString()
      };
      
      // Store order in localStorage
      localStorage.setItem(`order_${currentOrderId}`, JSON.stringify(orderData));
      
      // Send order confirmation emails
      try {
        await supabase.functions.invoke('send-order-email', {
          body: {
            orderId: currentOrderId,
            customerEmail: formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`,
            items: cart.items,
            total: cart.subtotal,
            shippingAddress: {
              address: formData.address,
              city: formData.city,
              postcode: formData.postcode,
              country: formData.country,
            },
            paymentMethod: 'paypal',
          },
        });
      } catch (emailError) {
        console.error('Error sending order emails:', emailError);
      }
      
      // Clear cart and redirect
      clearCart();
      navigate(`/order-confirmation/${currentOrderId}`, { 
        state: { orderData } 
      });
      
      toast({
        title: "Payment successful!",
        description: `Your order #${currentOrderId} has been confirmed.`,
      });
    } catch (error) {
      toast({
        title: "Order processing failed",
        description: "Payment was successful but order processing failed. Please contact support.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Please complete all required fields",
        description: "All fields marked with * are required, and you must agree to the terms.",
        variant: "destructive",
      });
      return;
    }

    if (cart.items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { supabase } = await import('@/integrations/supabase/client');

      // For card payment, use Stripe Checkout
      if (formData.paymentMethod === 'card') {
        const { data, error } = await supabase.functions.invoke('create-product-checkout', {
          body: {
            items: cart.items.map(item => ({
              id: item.product.id,
              name: item.product.title,
              price: item.variant.sale_price || item.variant.price,
              quantity: item.quantity,
              image: item.product.images[0],
            })),
            shippingAddress: {
              fullName: `${formData.firstName} ${formData.lastName}`,
              addressLine1: formData.address,
              city: formData.city,
              postcode: formData.postcode,
              phone: formData.phone,
            },
            guestEmail: formData.email,
          },
        });

        if (error) throw error;
        
        if (data?.url) {
          // Redirect to Stripe Checkout
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL received');
        }
        return;
      }

      // For PayPal, show the payment buttons
      if (formData.paymentMethod === 'paypal') {
        const orderId = `SS${Date.now()}`;
        setCurrentOrderId(orderId);
        setShowPayPal(true);
        setIsProcessing(false);
        return;
      }

      // For cash on delivery, process immediately
      const orderId = `SS${Date.now()}`;
      
      const orderData = { 
        ...formData, 
        items: cart.items, 
        total: cart.subtotal,
        orderId,
        createdAt: new Date().toISOString()
      };
      
      // Store order in localStorage
      localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
      
      // Send order confirmation emails
      try {
        await supabase.functions.invoke('send-order-email', {
          body: {
            orderId,
            customerEmail: formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`,
            items: cart.items,
            total: cart.subtotal,
            shippingAddress: {
              address: formData.address,
              city: formData.city,
              postcode: formData.postcode,
              country: formData.country,
            },
            paymentMethod: formData.paymentMethod,
          },
        });
      } catch (emailError) {
        console.error('Error sending order emails:', emailError);
      }
      
      // Clear cart and redirect
      clearCart();
      navigate(`/order-confirmation/${orderId}`, { 
        state: { orderData } 
      });
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderId} has been confirmed.`,
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Payment failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout | Sahiya Slays</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20">
            <div className="container mx-auto px-4 py-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
              <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Sahiya Slays</title>
        <meta name="description" content="Complete your order securely with Sahiya Slays." />
        <link rel="canonical" href="/checkout" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">Checkout</h1>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Checkout Form */}
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            required
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Billing Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Billing Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => updateFormData('firstName', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => updateFormData('lastName', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="address">Address *</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => updateFormData('address', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => updateFormData('city', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="postcode">Postcode *</Label>
                            <Input
                              id="postcode"
                              value={formData.postcode}
                              onChange={(e) => updateFormData('postcode', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="country">Country *</Label>
                            <Select 
                              value={formData.country}
                              onValueChange={(value) => updateFormData('country', value)}
                            >
                              <SelectTrigger id="country">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                {COUNTRIES.map(country => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={(value: 'card' | 'paypal' | 'cash-on-delivery') => updateFormData('paymentMethod', value)}
                        >
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              Credit / Debit Card
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                            <Label htmlFor="cash-on-delivery" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                          </div>
                        </RadioGroup>
                        
                        {formData.paymentMethod === 'card' && (
                          <div className="mt-4 p-4 bg-muted rounded-lg">
                            <div className="flex items-start gap-2">
                              <Shield className="w-4 h-4 mt-0.5 text-primary" />
                              <div>
                                <p className="text-sm font-medium mb-1">Secure Payment with Stripe</p>
                                <p className="text-sm text-muted-foreground">
                                  You'll be redirected to our secure payment page to complete your purchase.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {formData.paymentMethod === 'cash-on-delivery' && (
                          <div className="mt-4 p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              Pay with cash when you receive your order.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Terms Agreement */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => updateFormData('agreeToTerms', !!checked)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{' '}
                        <a href="/terms-and-conditions" className="text-primary hover:underline">
                          Terms & Conditions
                        </a>{' '}
                        and{' '}
                        <a href="/privacy-policy" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                        *
                      </Label>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <Card className="sticky top-24">
                      <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Order Items */}
                        <div className="space-y-3">
                          {cart.items.map((item) => (
                            <div 
                              key={`${item.product.id}-${item.variant.length}`}
                              className="flex gap-3"
                            >
                              <div className="w-12 h-15 flex-shrink-0">
                                <img
                                  src={item.product.images[0] || '/placeholder.svg'}
                                  alt={`${item.product.title}, ${item.variant.length}`}
                                  className="w-full h-full object-cover rounded border"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium line-clamp-2">
                                  {item.product.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {item.variant.length} × {item.quantity}
                                </p>
                              </div>
                              <div className="text-sm font-semibold">
                                {formatPrice((item.variant.sale_price || item.variant.price) * item.quantity)}
                              </div>
                            </div>
                          ))}
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
                            <span>Free</span>
                          </div>
                          
                          <Separator />
                          
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>{formatPrice(cart.subtotal)}</span>
                          </div>
                        </div>

                        {showPayPal ? (
                          <PayPalButton
                            amount={cart.subtotal}
                            orderId={currentOrderId}
                            onSuccess={handlePayPalSuccess}
                            onError={(error) => {
                              setShowPayPal(false);
                              toast({
                                title: "Payment Error",
                                description: error,
                                variant: "destructive",
                              });
                            }}
                            onCancel={() => setShowPayPal(false)}
                          />
                        ) : (
                          <Button
                            type="submit"
                            className="w-full py-3 text-lg"
                            disabled={!isFormValid() || isProcessing}
                          >
                            {isProcessing 
                              ? 'Processing...' 
                              : formData.paymentMethod === 'card' || formData.paymentMethod === 'paypal'
                                ? 'Continue to Payment' 
                                : 'Place Order'}
                          </Button>
                        )}

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            <span>Secure</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            <span>Fast delivery</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>Quality guaranteed</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}