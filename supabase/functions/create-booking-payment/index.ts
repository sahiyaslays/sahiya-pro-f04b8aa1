import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ServiceSchema = z.object({
  id: z.string().max(50),
  name: z.string().min(1).max(200),
  price: z.number().positive().max(10000),
  duration: z.number().positive().max(600),
});

const BookingRequestSchema = z.object({
  services: z.array(ServiceSchema).min(1).max(10),
  stylistId: z.string().max(50).optional(),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  bookingTime: z.string().regex(/^\d{2}:\d{2}$/),
  totalDuration: z.number().positive().max(600),
  totalAmount: z.number().positive().max(50000),
  paymentType: z.enum(["deposit", "full"]),
  guestName: z.string().min(1).max(100).optional(),
  guestEmail: z.string().email().max(255).optional(),
  guestPhone: z.string().min(1).max(20).optional(),
  specialRequests: z.string().max(1000).optional(),
});

type BookingRequest = z.infer<typeof BookingRequestSchema>;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get user if authenticated
    const authHeader = req.headers.get("Authorization");
    let user = null;
    let customerEmail = "";

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
      customerEmail = user?.email || "";
    }

    const rawData = await req.json();
    
    // Validate input data
    const validationResult = BookingRequestSchema.safeParse(rawData);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: validationResult.error.issues }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    const bookingData = validationResult.data;

    // Use guest email if not authenticated
    if (!customerEmail && bookingData.guestEmail) {
      customerEmail = bookingData.guestEmail;
    }

    if (!customerEmail) {
      throw new Error("Email is required for booking");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Recalculate total amount server-side (never trust client)
    const calculatedTotal = bookingData.services.reduce((sum, service) => sum + service.price, 0);
    if (Math.abs(calculatedTotal - bookingData.totalAmount) > 0.01) {
      throw new Error("Total amount mismatch");
    }
    
    // Calculate payment amount
    const paymentAmount = bookingData.paymentType === "deposit" ? 20 : bookingData.totalAmount;

    // Create booking record in database
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .insert({
        user_id: user?.id || null,
        guest_email: user ? null : bookingData.guestEmail,
        guest_name: user ? null : bookingData.guestName,
        guest_phone: user ? null : bookingData.guestPhone,
        services: bookingData.services,
        stylist_id: bookingData.stylistId,
        booking_date: bookingData.bookingDate,
        booking_time: bookingData.bookingTime,
        total_duration: bookingData.totalDuration,
        total_amount: bookingData.totalAmount,
        payment_type: bookingData.paymentType,
        status: "pending",
        special_requests: bookingData.specialRequests,
      })
      .select()
      .single();

    if (bookingError) {
      console.error("Booking creation error:", bookingError);
      throw new Error("Failed to create booking");
    }

    // Create line items for Stripe
    const lineItems = [{
      price_data: {
        currency: "gbp",
        product_data: {
          name: bookingData.paymentType === "deposit" 
            ? "Booking Deposit (£20)" 
            : "Booking Full Payment",
          description: `Services: ${bookingData.services.map(s => s.name).join(", ")}`,
        },
        unit_amount: Math.round(paymentAmount * 100), // Convert to pence
      },
      quantity: 1,
    }];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : customerEmail,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/booking?success=true&bookingId=${booking.id}`,
      cancel_url: `${req.headers.get("origin")}/booking`,
      metadata: {
        booking_id: booking.id,
        payment_type: bookingData.paymentType,
      },
    });

    // Update booking with session ID
    await supabaseClient
      .from("bookings")
      .update({ stripe_session_id: session.id })
      .eq("id", booking.id);

    return new Response(JSON.stringify({ url: session.url, bookingId: booking.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Booking payment error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});