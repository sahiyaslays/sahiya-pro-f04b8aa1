import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ItemSchema = z.object({
  id: z.string().max(50),
  name: z.string().min(1).max(200),
  price: z.number().positive().max(100000),
  quantity: z.number().int().positive().max(100),
  image: z.string().max(500).optional(),
});

const ShippingAddressSchema = z.object({
  fullName: z.string().min(1).max(100),
  addressLine1: z.string().min(1).max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(1).max(100),
  postcode: z.string().min(1).max(20),
  phone: z.string().min(1).max(20),
});

const CheckoutRequestSchema = z.object({
  items: z.array(ItemSchema).min(1).max(50),
  shippingAddress: ShippingAddressSchema,
  guestEmail: z.string().email().max(255).optional(),
});

type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Use anon client for auth check
    const anonClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Use service role client for database operations (bypasses RLS)
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get user if authenticated
    const authHeader = req.headers.get("Authorization");
    let user = null;
    let customerEmail = "";

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await anonClient.auth.getUser(token);
      user = data.user;
      customerEmail = user?.email || "";
    }

    const rawData = await req.json();
    
    // Validate input data
    const validationResult = CheckoutRequestSchema.safeParse(rawData);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validationResult.error.issues }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    const { items, shippingAddress, guestEmail } = validationResult.data;

    // Use guest email if not authenticated
    if (!customerEmail && guestEmail) {
      customerEmail = guestEmail;
    }

    if (!customerEmail) {
      throw new Error("Email is required for checkout");
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY")?.trim();
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY not found");
      throw new Error("Stripe configuration error");
    }
    
    console.log("Stripe key exists:", stripeKey.substring(0, 7) + "...");
    console.log("Stripe key length:", stripeKey.length);
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Calculate total
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order record in database
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        user_id: user?.id || null,
        guest_email: user ? null : customerEmail,
        items: items,
        total_amount: totalAmount,
        status: "pending",
        shipping_address: shippingAddress,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      throw new Error("Failed to create order");
    }

    // Get origin for constructing absolute URLs
    const origin = req.headers.get("origin") || "";

    // Create line items for Stripe
    const lineItems = items.map((item) => {
      // Convert relative image paths to absolute URLs
      let imageUrl: string | undefined;
      if (item.image) {
        if (item.image.startsWith("http://") || item.image.startsWith("https://")) {
          imageUrl = item.image;
        } else if (origin && item.image.startsWith("/")) {
          imageUrl = `${origin}${item.image}`;
        }
      }

      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: item.name,
            images: imageUrl ? [imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to pence
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/order-confirmation/${order.id}`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      metadata: {
        order_id: order.id,
      },
    });

    // Update order with session ID
    await supabaseClient
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return new Response(JSON.stringify({ url: session.url, orderId: order.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    const errorMessage = error.message || "Payment processing failed";
    console.error("Error details:", JSON.stringify(error));
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});