import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PayPalButtonProps {
  amount: number;
  orderId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export function PayPalButton({ amount, orderId, onSuccess, onError, onCancel }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [clientId, setClientId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getClientId = async () => {
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const { data, error } = await supabase.functions.invoke('get-paypal-client-id');
        
        if (error || !data?.clientId) {
          throw new Error('Failed to get PayPal configuration');
        }
        
        setClientId(data.clientId);
      } catch (err) {
        console.error('Error getting PayPal client ID:', err);
        onError('Failed to initialize payment. Please refresh and try again.');
        setIsLoading(false);
      }
    };
    
    getClientId();
  }, [onError]);

  useEffect(() => {
    if (!clientId) return;
    
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP&components=buttons,funding-eligibility&enable-funding=card`;
    script.async = true;
    
    script.onload = () => {
      console.log('PayPal SDK loaded');
      setIsLoading(false);
      
      if (window.paypal && paypalRef.current) {
        // Render PayPal button
        window.paypal.Buttons({
          fundingSource: window.paypal.FUNDING.PAYPAL,
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            height: 48
          },
          createOrder: async () => {
            try {
              const { supabase } = await import('@/integrations/supabase/client');
              const { data, error } = await supabase.functions.invoke('create-paypal-order', {
                body: {
                  amount: amount,
                  currency: 'GBP',
                  orderId: orderId,
                },
              });

              if (error || !data?.id) {
                throw new Error('Failed to create order');
              }

              return data.id;
            } catch (err) {
              console.error('Error creating order:', err);
              throw err;
            }
          },
          onApprove: async (data: any) => {
            console.log('Payment approved:', data);
            try {
              const { supabase } = await import('@/integrations/supabase/client');
              const { data: captureData, error } = await supabase.functions.invoke('capture-paypal-order', {
                body: {
                  orderID: data.orderID,
                },
              });

              if (error || !captureData) {
                throw new Error('Failed to process payment');
              }

              console.log('Payment successful:', captureData);
              onSuccess();
            } catch (err) {
              console.error('Error capturing payment:', err);
              onError('Payment processing failed. Please try again.');
            }
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
            onError('Payment failed. Please try again.');
          },
          onCancel: () => {
            console.log('Payment cancelled');
            onCancel();
          }
        }).render(paypalRef.current).catch((err: any) => {
          console.error('Error rendering PayPal button:', err);
          onError('Failed to load payment options. Please refresh and try again.');
        });
        
        // Render card button if available
        if (window.paypal.FUNDING && window.paypal.isFundingEligible(window.paypal.FUNDING.CARD)) {
          console.log('Card payments eligible, rendering card button');
          const cardContainer = document.createElement('div');
          cardContainer.style.marginTop = '10px';
          paypalRef.current!.appendChild(cardContainer);
          
          window.paypal.Buttons({
            fundingSource: window.paypal.FUNDING.CARD,
            style: {
              layout: 'vertical',
              color: 'black',
              shape: 'rect',
              label: 'pay',
              height: 48
            },
            createOrder: async () => {
              try {
                const { supabase } = await import('@/integrations/supabase/client');
                const { data, error } = await supabase.functions.invoke('create-paypal-order', {
                  body: {
                    amount: amount,
                    currency: 'GBP',
                    orderId: orderId,
                  },
                });

                if (error || !data?.id) {
                  throw new Error('Failed to create order');
                }

                return data.id;
              } catch (err) {
                console.error('Error creating order:', err);
                throw err;
              }
            },
            onApprove: async (data: any) => {
              console.log('Card payment approved:', data);
              try {
                const { supabase } = await import('@/integrations/supabase/client');
                const { data: captureData, error } = await supabase.functions.invoke('capture-paypal-order', {
                  body: {
                    orderID: data.orderID,
                  },
                });

                if (error || !captureData) {
                  throw new Error('Failed to process payment');
                }

                console.log('Card payment successful:', captureData);
                onSuccess();
              } catch (err) {
                console.error('Error capturing payment:', err);
                onError('Payment processing failed. Please try again.');
              }
            },
            onError: (err: any) => {
              console.error('Card payment error:', err);
              onError('Card payment failed. Please try again.');
            },
            onCancel: () => {
              console.log('Card payment cancelled');
              onCancel();
            }
          }).render(cardContainer).catch((err: any) => {
            console.error('Error rendering card button:', err);
          });
        }
      }
    };

    script.onerror = () => {
      setIsLoading(false);
      onError('Failed to load payment system. Please refresh and try again.');
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [amount, orderId, onSuccess, onError, onCancel, toast, clientId]);

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100">Loading payment options...</p>
        </div>
      )}
      <div ref={paypalRef} />
      <button
        type="button"
        onClick={onCancel}
        className="w-full px-4 py-3 border border-input rounded-md hover:bg-accent transition-colors text-sm"
      >
        Cancel
      </button>
    </div>
  );
}
