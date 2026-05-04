import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { formatPrice } from '@/data/shopData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Download, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const orderData = location.state?.orderData;

  const [dbOrder, setDbOrder] = useState<any>(null);
  const [dbLoading, setDbLoading] = useState(!orderData);

  useEffect(() => {
    if (orderData || !orderId) return;
    supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setDbOrder(data);
        setDbLoading(false);
      });
  }, [orderId, orderData]);

  if (!orderData && dbLoading) {
    return (
      <>
        <Helmet>
          <title>Order Confirmation | Sahiya Slays</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20">
            <div className="container mx-auto px-4 py-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your order...</p>
            </div>
          </main>
        </div>
      </>
    );
  }

  if (!orderData && !dbOrder) {
    return (
      <>
        <Helmet>
          <title>Order Confirmed | Sahiya Slays</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20">
            <div className="container mx-auto px-4 py-16 text-center space-y-6">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h1 className="text-3xl font-bold text-green-600">Order Confirmed!</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your payment was successful. A confirmation email will be sent to you shortly.
              </p>
              <Link to="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </main>
        </div>
      </>
    );
  }

  if (!orderData && dbOrder) {
    const shipping = dbOrder.shipping_address as any;
    const items = (dbOrder.items as any[]) || [];
    return (
      <>
        <Helmet>
          <title>Order Confirmation #{orderId} | Sahiya Slays</title>
          <meta name="description" content="Your order has been successfully placed with Sahiya Slays." />
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
                  <p className="text-muted-foreground">
                    Thank you for your order. We'll send you a confirmation email shortly.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-semibold">Order Number</p>
                        <p className="text-muted-foreground">#{orderId}</p>
                      </div>
                      {dbOrder.guest_email && (
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-muted-foreground">{dbOrder.guest_email}</p>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">Payment Method</p>
                        <p className="text-muted-foreground">Credit/Debit Card</p>
                      </div>
                      {shipping && (
                        <div>
                          <p className="font-semibold">Shipping Address</p>
                          <div className="text-muted-foreground text-sm">
                            <p>{shipping.fullName}</p>
                            <p>{shipping.addressLine1}</p>
                            {shipping.addressLine2 && <p>{shipping.addressLine2}</p>}
                            <p>{shipping.city}, {shipping.postcode}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {items.map((item: any, i: number) => (
                          <div key={i} className="flex gap-3">
                            {item.image && (
                              <div className="w-12 h-15 flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded border"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>{formatPrice(dbOrder.total_amount)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>What happens next?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Order Processing', 'Shipping', 'Delivery'].map((step, i) => (
                        <div key={step} className="text-center p-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                            <span className="text-blue-600 font-bold">{i + 1}</span>
                          </div>
                          <h3 className="font-semibold mb-2">{step}</h3>
                          <p className="text-sm text-muted-foreground">
                            {i === 0 && 'We\'ll prepare your order within 7-10 business days'}
                            {i === 1 && 'Your order will be shipped via tracked delivery'}
                            {i === 2 && 'Receive your premium hair products'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Contact Support
                  </Button>
                  <Link to="/shop">
                    <Button className="w-full sm:w-auto">Continue Shopping</Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order Confirmation #{orderId} | Sahiya Slays</title>
        <meta name="description" content="Your order has been successfully placed with Sahiya Slays." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-green-600 mb-2">
                  Order Confirmed!
                </h1>
                <p className="text-muted-foreground">
                  Thank you for your order. We'll send you a confirmation email shortly.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold">Order Number</p>
                      <p className="text-muted-foreground">#{orderId}</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">{orderData.email}</p>
                    </div>
                    
                    <div>
                      <p className="font-semibold">Payment Method</p>
                      <p className="text-muted-foreground capitalize">
                        {orderData.paymentMethod === 'stripe' ? 'Credit/Debit Card' : 
                         orderData.paymentMethod === 'paypal' ? 'PayPal' : 'Pay in Salon'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-semibold">Shipping Address</p>
                      <div className="text-muted-foreground text-sm">
                        <p>{orderData.firstName} {orderData.lastName}</p>
                        <p>{orderData.address}</p>
                        <p>{orderData.city}, {orderData.postcode}</p>
                        <p>{orderData.country}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {orderData.items.map((item: any) => (
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

                    {/* Order Total */}
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(orderData.total)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* What's Next */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>What happens next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <h3 className="font-semibold mb-2">Order Processing</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll prepare your order within 7-10 business days
                      </p>
                    </div>
                    
                    <div className="text-center p-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                        <span className="text-blue-600 font-bold">2</span>
                      </div>
                      <h3 className="font-semibold mb-2">Shipping</h3>
                      <p className="text-sm text-muted-foreground">
                        Your order will be shipped via tracked delivery
                      </p>
                    </div>
                    
                    <div className="text-center p-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                        <span className="text-blue-600 font-bold">3</span>
                      </div>
                      <h3 className="font-semibold mb-2">Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive your premium hair products
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Support
                </Button>
                <Link to="/shop">
                  <Button className="w-full sm:w-auto">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}