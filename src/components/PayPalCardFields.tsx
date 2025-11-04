import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PayPalCardFieldsProps {
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

export function PayPalCardFields({ amount, orderId, onSuccess, onError, onCancel }: PayPalCardFieldsProps) {
  const cardNumberRef = useRef<HTMLDivElement>(null);
  const cardExpiryRef = useRef<HTMLDivElement>(null);
  const cardCvvRef = useRef<HTMLDivElement>(null);
  const cardNameRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [clientId, setClientId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

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
      }
    };
    
    getClientId();
  }, [onError]);

  useEffect(() => {
    if (!clientId || !cardNumberRef.current) return;

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP&components=card-fields`;
    script.async = true;

    script.onload = () => {
      if (window.paypal && cardNumberRef.current && cardExpiryRef.current && cardCvvRef.current && cardNameRef.current) {
        const cardField = window.paypal.CardFields({
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
            try {
              setIsProcessing(true);
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
              setIsProcessing(false);
              onError('Payment processing failed. Please try again.');
            }
          },
          onError: (err: any) => {
            console.error('PayPal card error:', err);
            setIsProcessing(false);
            onError('Payment failed. Please check your card details and try again.');
          },
        });

        if (cardField.isEligible()) {
          cardField.NumberField({
            inputEvents: {
              onChange: () => {},
            },
          }).render(cardNumberRef.current);

          cardField.ExpiryField().render(cardExpiryRef.current);
          cardField.CVVField().render(cardCvvRef.current);
          cardField.NameField().render(cardNameRef.current);

          const submitButton = document.getElementById('paypal-card-submit');
          if (submitButton) {
            submitButton.addEventListener('click', async () => {
              if (isProcessing) return;
              
              setIsProcessing(true);
              try {
                await cardField.submit();
              } catch (err) {
                console.error('Submit error:', err);
                setIsProcessing(false);
                toast({
                  title: "Payment Error",
                  description: "Please check your card details and try again.",
                  variant: "destructive",
                });
              }
            });
          }
        } else {
          onError('Card payment is not available. Please try another payment method.');
        }
      }
    };

    script.onerror = () => {
      onError('Failed to load payment system. Please refresh and try again.');
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [clientId, amount, orderId, onSuccess, onError, toast, isProcessing]);

  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg mb-4">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Complete your payment with PayPal
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Card Number</label>
          <div ref={cardNumberRef} className="border rounded-md p-3 bg-background"></div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cardholder Name</label>
          <div ref={cardNameRef} className="border rounded-md p-3 bg-background"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <div ref={cardExpiryRef} className="border rounded-md p-3 bg-background"></div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CVV</label>
            <div ref={cardCvvRef} className="border rounded-md p-3 bg-background"></div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 px-4 py-3 border rounded-md hover:bg-muted transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          id="paypal-card-submit"
          type="button"
          disabled={isProcessing}
          className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : `Pay £${amount.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
