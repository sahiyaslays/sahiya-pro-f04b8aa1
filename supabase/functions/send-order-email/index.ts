import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  product: {
    id: string;
    title: string;
  };
  variant: {
    length: string;
    price: number;
    sale_price?: number;
  };
  quantity: number;
}

interface OrderEmailRequest {
  orderId: string;
  customerEmail?: string;
  customerName?: string;
  items?: OrderItem[];
  total?: number;
  shippingAddress?: {
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
  paymentMethod?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: OrderEmailRequest = await req.json();
    console.log("Processing order email for:", requestData.orderId);
    console.log("Received data - customerEmail:", requestData.customerEmail, "items count:", requestData.items?.length, "total:", requestData.total);

    // Check if we have all required data from the request
    const hasFullData = requestData.customerEmail && 
                        requestData.items && 
                        requestData.items.length > 0 && 
                        requestData.customerName && 
                        requestData.total !== undefined;
    
    // Check if orderId looks like a UUID (database IDs are UUIDs)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestData.orderId);
    
    let orderData = requestData;
    
    // Only fetch from database if we don't have full data AND the orderId is a valid UUID
    if (!hasFullData && isUUID) {
      console.log("Fetching order from database for UUID:", requestData.orderId);
      
      // Initialize Supabase client
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const { data: order, error } = await supabaseClient
        .from('orders')
        .select('*')
        .eq('id', requestData.orderId)
        .maybeSingle();

      if (error || !order) {
        console.error("Order not found in database:", requestData.orderId, error);
        throw new Error('Order not found in database');
      }

      const shippingAddress = order.shipping_address as any;
      orderData = {
        orderId: order.id,
        customerEmail: order.guest_email || '',
        customerName: shippingAddress.fullName || 'Customer',
        items: order.items as OrderItem[],
        total: order.total_amount,
        shippingAddress: {
          address: shippingAddress.addressLine1 || '',
          city: shippingAddress.city || '',
          postcode: shippingAddress.postcode || '',
          country: 'United Kingdom',
        },
        paymentMethod: 'stripe',
      };
    } else if (!hasFullData && !isUUID) {
      // Non-UUID order ID without full data - this shouldn't happen but handle gracefully
      console.error("Cannot process order: non-UUID order ID without full data:", requestData.orderId);
      throw new Error('Incomplete order data provided');
    } else {
      console.log("Using provided order data (no database fetch needed)");
    }

    // Format order items for email
    const itemsHtml = (orderData.items || [])
      .map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            ${item.product.title} (${item.variant.length})
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
            ${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
            £${((item.variant.sale_price || item.variant.price) * item.quantity).toFixed(2)}
          </td>
        </tr>
      `
      )
      .join("");

    const paymentMethodText =
      orderData.paymentMethod === "stripe"
        ? "Credit/Debit Card"
        : orderData.paymentMethod === "paypal"
        ? "PayPal"
        : "Pay in Salon";

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Sahiya Slays <contact@sahiyaslays.com>",
      to: [orderData.customerEmail || ''],
      subject: `Order Confirmation - #${orderData.orderId.substring(0, 8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: #D4AF37; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">SAHIYA SLAYS</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; letter-spacing: 2px;">HAIR • BEAUTY • NAILS</p>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #000; margin-top: 0;">Thank You for Your Order!</h2>
            <p>Hi ${orderData.customerName},</p>
            <p>Your order has been confirmed and will be processed within 7-10 business days.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="margin: 5px 0;"><strong>Order Number:</strong> #${orderData.orderId.substring(0, 8)}</p>
              <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${paymentMethodText}</p>
            </div>
            
            <h3 style="color: #000;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                  <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr>
                  <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold;">£${(orderData.total || 0).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            <h3 style="color: #000;">Shipping Address</h3>
            <p style="margin: 5px 0;">${orderData.shippingAddress?.address || ''}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress?.city || ''}, ${orderData.shippingAddress?.postcode || ''}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress?.country || ''}</p>
            
            <p style="margin-top: 30px;">We'll send you another email when your order ships.</p>
            <p>If you have any questions, please contact us at contact@sahiyaslays.com</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p>415 Wick Lane, TradeStars Block G, Bow, London E3 2JG</p>
            <p>07809441074 | contact@sahiyaslays.com</p>
          </div>
        </div>
      `,
    });

    console.log("Customer email sent:", customerEmailResponse);

    // Send notification email to salon
    const salonEmailResponse = await resend.emails.send({
      from: "Sahiya Slays Orders <contact@sahiyaslays.com>",
      to: ["sahiyaslays@gmail.com", "contact@sahiyaslays.com"],
      subject: `New Order - #${orderData.orderId.substring(0, 8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: #D4AF37; padding: 20px;">
            <h1 style="margin: 0;">New Order Received</h1>
          </div>
          
          <div style="padding: 30px 20px;">
            <h2 style="color: #000; margin-top: 0;">Order Details</h2>
            
            <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="margin: 5px 0;"><strong>Order Number:</strong> #${orderData.orderId.substring(0, 8)}</p>
              <p style="margin: 5px 0;"><strong>Customer:</strong> ${orderData.customerName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${orderData.customerEmail}</p>
              <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${paymentMethodText}</p>
            </div>
            
            <h3 style="color: #000;">Order Items</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                  <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr>
                  <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                  <td style="padding: 10px; text-align: right; font-weight: bold;">£${(orderData.total || 0).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            <h3 style="color: #000;">Shipping Address</h3>
            <p style="margin: 5px 0;">${orderData.customerName}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress?.address || ''}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress?.city || ''}, ${orderData.shippingAddress?.postcode || ''}</p>
            <p style="margin: 5px 0;">${orderData.shippingAddress?.country || ''}</p>
          </div>
        </div>
      `,
    });

    console.log("Salon email sent:", salonEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmail: customerEmailResponse,
        salonEmail: salonEmailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
