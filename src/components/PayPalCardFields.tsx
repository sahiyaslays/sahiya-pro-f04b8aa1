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
  const [isLoading, setIsLoading] = useState(true);
  const cardFieldRef = useRef<any>(null);

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
    
    let script: HTMLScriptElement | null = null;
    let mounted = true;

    const loadPayPalSDK = async () => {
      try {
        console.log('Loading PayPal SDK with client ID:', clientId);
        
        // Remove any existing PayPal scripts
        const existingScript = document.querySelector(`script[src*="paypal.com/sdk/js"]`);
        if (existingScript) {
          console.log('Removing existing PayPal script');
          existingScript.remove();
        }

        // Wait a bit to ensure refs are ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (!mounted || !cardNumberRef.current || !cardExpiryRef.current || !cardCvvRef.current || !cardNameRef.current) {
          console.error('Card field refs not ready');
          return;
        }

        script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP&components=card-fields&debug=true`;
        script.async = true;

        script.onload = () => {
          console.log('PayPal SDK loaded');
          if (!mounted) return;

          if (!window.paypal) {
            console.error('PayPal object not found after script load');
            setIsLoading(false);
            onError('Failed to load PayPal. Please refresh and try again.');
            return;
          }

          // Give PayPal SDK time to initialize
          setTimeout(() => {
            if (!mounted || !cardNumberRef.current || !cardExpiryRef.current || !cardCvvRef.current || !cardNameRef.current) {
              console.error('Refs lost during initialization');
              return;
            }

            try {
              console.log('Initializing PayPal Card Fields');
              
              if (!window.paypal.CardFields) {
                console.error('CardFields not available on PayPal object');
                setIsLoading(false);
                onError('Card payments not available. Please use PayPal button or try another payment method.');
                return;
              }

              const cardFields = window.paypal.CardFields({
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
                  if (!mounted) return;
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

                    if (mounted) {
                      onSuccess();
                    }
                  } catch (err) {
                    console.error('Error capturing payment:', err);
                    if (mounted) {
                      setIsProcessing(false);
                      onError('Payment processing failed. Please try again.');
                    }
                  }
                },
                onError: (err: any) => {
                  console.error('PayPal card error:', err);
                  if (mounted) {
                    setIsProcessing(false);
                    onError('Payment failed. Please check your card details and try again.');
                  }
                },
                style: {
                  'input': {
                    'font-size': '16px',
                    'font-family': 'inherit',
                    'color': 'inherit'
                  }
                }
              });

              console.log('Checking CardFields eligibility');
              
              if (cardFields.isEligible()) {
                console.log('CardFields are eligible, rendering fields');
                
                const numberField = cardFields.NumberField();
                const expiryField = cardFields.ExpiryField();
                const cvvField = cardFields.CVVField();
                const nameField = cardFields.NameField();

                console.log('Rendering card number field');
                numberField.render(cardNumberRef.current!).catch((err: any) => {
                  console.error('Error rendering number field:', err);
                });
                
                console.log('Rendering expiry field');
                expiryField.render(cardExpiryRef.current!).catch((err: any) => {
                  console.error('Error rendering expiry field:', err);
                });
                
                console.log('Rendering CVV field');
                cvvField.render(cardCvvRef.current!).catch((err: any) => {
                  console.error('Error rendering CVV field:', err);
                });
                
                console.log('Rendering name field');
                nameField.render(cardNameRef.current!).catch((err: any) => {
                  console.error('Error rendering name field:', err);
                });

                cardFieldRef.current = cardFields;
                setIsLoading(false);
                console.log('Card fields successfully initialized');
              } else {
                console.error('CardFields not eligible');
                if (mounted) {
                  setIsLoading(false);
                  onError('Card payment is not available. This may be due to regional restrictions or account configuration. Please contact support or try Cash on Delivery.');
                }
              }
            } catch (err) {
              console.error('Error initializing card fields:', err);
              if (mounted) {
                setIsLoading(false);
                onError('Failed to initialize payment form. Please refresh and try again.');
              }
            }
          }, 500);
        };

        script.onerror = () => {
          if (mounted) {
            setIsLoading(false);
            onError('Failed to load payment system. Please refresh and try again.');
          }
        };

        document.body.appendChild(script);
      } catch (err) {
        console.error('Error loading PayPal SDK:', err);
        if (mounted) {
          setIsLoading(false);
          onError('Failed to initialize payment. Please refresh and try again.');
        }
      }
    };

    loadPayPalSDK();

    return () => {
      mounted = false;
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [clientId, amount, orderId, onSuccess, onError]);

  const handleSubmit = async () => {
    if (isProcessing || !cardFieldRef.current) return;
    
    setIsProcessing(true);
    try {
      await cardFieldRef.current.submit();
    } catch (err) {
      console.error('Submit error:', err);
      setIsProcessing(false);
      toast({
        title: "Payment Error",
        description: "Please check your card details and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg mb-4">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          {isLoading ? 'Loading payment form...' : 'Complete your payment with PayPal'}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-12 bg-muted rounded-md"></div>
          <div className="h-12 bg-muted rounded-md"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-muted rounded-md"></div>
            <div className="h-12 bg-muted rounded-md"></div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Card Number</label>
            <div 
              ref={cardNumberRef} 
              className="min-h-[44px] border border-input rounded-md bg-background"
              style={{ isolation: 'isolate' }}
            ></div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Cardholder Name</label>
            <div 
              ref={cardNameRef} 
              className="min-h-[44px] border border-input rounded-md bg-background"
              style={{ isolation: 'isolate' }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Expiry Date</label>
              <div 
                ref={cardExpiryRef} 
                className="min-h-[44px] border border-input rounded-md bg-background"
                style={{ isolation: 'isolate' }}
              ></div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">CVV</label>
              <div 
                ref={cardCvvRef} 
                className="min-h-[44px] border border-input rounded-md bg-background"
                style={{ isolation: 'isolate' }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing || isLoading}
          className="flex-1 px-4 py-3 border border-input rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isProcessing || isLoading}
          className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : `Pay £${amount.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
