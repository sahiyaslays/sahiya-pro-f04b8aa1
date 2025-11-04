import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PayPalButtonProps {
  amount: number;
  orderId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export function PayPalButton({ amount, orderId, onSuccess, onError }: PayPalButtonProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [clientId, setClientId] = useState<string>('');

  useEffect(() => {
    // Get PayPal Client ID from backend
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
        onError('Failed to initialize PayPal. Please refresh and try again.');
      }
    };
    
    getClientId();
  }, [onError]);

  useEffect(() => {
    if (!clientId) return;
    
    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP&components=buttons,marks`;
    script.async = true;
    
    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'pay',
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
                throw new Error('Failed to create PayPal order');
              }

              return data.id;
            } catch (err) {
              console.error('Error creating PayPal order:', err);
              toast({
                title: "Payment Error",
                description: "Failed to initialize PayPal payment. Please try again.",
                variant: "destructive",
              });
              throw err;
            }
          },
          onApprove: async (data: any) => {
            try {
              const { supabase } = await import('@/integrations/supabase/client');
              const { data: captureData, error } = await supabase.functions.invoke('capture-paypal-order', {
                body: {
                  orderID: data.orderID,
                },
              });

              if (error || !captureData) {
                throw new Error('Failed to capture payment');
              }

              console.log('Payment captured:', captureData);
              onSuccess();
            } catch (err) {
              console.error('Error capturing payment:', err);
              onError('Failed to process payment. Please contact support.');
            }
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
            onError('Payment failed. Please try again or use another payment method.');
          },
        }).render(paypalRef.current);
      }
    };

    script.onerror = () => {
      onError('Failed to load PayPal. Please refresh and try again.');
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [amount, orderId, onSuccess, onError, toast, clientId]);

  return (
    <div className="w-full">
      <div ref={paypalRef} className="min-h-[200px]"></div>
    </div>
  );
}
