import { useEffect, useRef, useState } from 'react';

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
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const [clientId, setClientId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const initialized = useRef(false);

  useEffect(() => {
    const getClientId = async () => {
      try {
        console.log('Fetching PayPal client ID...');
        const { supabase } = await import('@/integrations/supabase/client');
        const { data, error } = await supabase.functions.invoke('get-paypal-client-id');
        
        if (error || !data?.clientId) {
          console.error('Failed to get client ID:', error);
          throw new Error('Failed to get PayPal configuration');
        }
        
        console.log('Client ID received');
        setClientId(data.clientId);
      } catch (err) {
        console.error('Error getting PayPal client ID:', err);
        setError('Failed to initialize payment');
        setIsLoading(false);
        onError('Failed to initialize payment. Please refresh and try again.');
      }
    };
    
    getClientId();
  }, [onError]);

  useEffect(() => {
    if (!clientId || !paypalContainerRef.current || initialized.current) return;
    
    initialized.current = true;
    console.log('Loading PayPal SDK with client ID:', clientId);
    
    // Remove any existing PayPal scripts
    const existingScripts = document.querySelectorAll('script[src*="paypal.com/sdk/js"]');
    existingScripts.forEach(script => script.remove());
    
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP&intent=capture&disable-funding=credit`;
    script.async = true;
    
    script.onload = () => {
      console.log('PayPal SDK loaded successfully');
      
      // Wait for PayPal SDK to fully initialize
      setTimeout(() => {
        if (!window.paypal) {
          console.error('PayPal object not found');
          setError('Payment system failed to load');
          setIsLoading(false);
          onError('Payment system failed to load. Please refresh and try again.');
          return;
        }

        if (!window.paypal.Buttons) {
          console.error('PayPal Buttons not available');
          setError('Payment buttons not available');
          setIsLoading(false);
          onError('Payment buttons not available. Please refresh and try again.');
          return;
        }

        if (!paypalContainerRef.current) {
          console.error('Container ref not available');
          return;
        }

        try {
          console.log('Initializing PayPal buttons...');
          
          window.paypal.Buttons({
            style: {
              layout: 'vertical',
              shape: 'rect',
              label: 'paypal',
              height: 50
            },
            createOrder: async () => {
              console.log('Creating PayPal order...');
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
                  console.error('Order creation failed:', error);
                  throw new Error('Failed to create order');
                }

                console.log('Order created:', data.id);
                return data.id;
              } catch (err) {
                console.error('Error creating order:', err);
                throw err;
              }
            },
            onApprove: async (data: any) => {
              console.log('Payment approved, capturing...', data);
              try {
                const { supabase } = await import('@/integrations/supabase/client');
                const { data: captureData, error } = await supabase.functions.invoke('capture-paypal-order', {
                  body: {
                    orderID: data.orderID,
                  },
                });

                if (error || !captureData) {
                  console.error('Payment capture failed:', error);
                  throw new Error('Failed to process payment');
                }

                console.log('Payment captured successfully:', captureData);
                onSuccess();
              } catch (err) {
                console.error('Error capturing payment:', err);
                onError('Payment processing failed. Please contact support.');
              }
            },
            onError: (err: any) => {
              console.error('PayPal button error:', err);
              onError('Payment failed. Please try again or use another payment method.');
            },
            onCancel: () => {
              console.log('Payment cancelled by user');
              onCancel();
            }
          }).render(paypalContainerRef.current).then(() => {
            console.log('PayPal buttons rendered successfully');
            setIsLoading(false);
          }).catch((err: any) => {
            console.error('Error rendering PayPal buttons:', err);
            setError('Failed to load payment buttons');
            setIsLoading(false);
            onError('Failed to load payment buttons. Please refresh and try again.');
          });
        } catch (err) {
          console.error('Error initializing PayPal buttons:', err);
          setError('Failed to initialize payment');
          setIsLoading(false);
          onError('Failed to initialize payment. Please refresh and try again.');
        }
      }, 500); // Wait 500ms for SDK to fully initialize
    };

    script.onerror = (err) => {
      console.error('Failed to load PayPal SDK script:', err);
      setError('Failed to load payment system');
      setIsLoading(false);
      onError('Failed to load payment system. Please check your internet connection and try again.');
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [clientId, amount, orderId, onSuccess, onError, onCancel]);

  return (
    <div className="space-y-4">
      {isLoading && !error && (
        <div className="text-center p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="animate-pulse">
            <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">Loading secure payment...</p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
        </div>
      )}
      
      <div ref={paypalContainerRef} id="paypal-button-container"></div>
      
      <button
        type="button"
        onClick={onCancel}
        className="w-full px-4 py-3 border border-input rounded-md hover:bg-accent transition-colors text-sm font-medium"
      >
        Cancel and Return
      </button>
    </div>
  );
}
