import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const requestUrl = new URL(req.url);
  console.log("[STRIPE-WEBHOOK] Received request at:", requestUrl.pathname);
  console.log("[STRIPE-WEBHOOK] Request method:", req.method);
  console.log("[STRIPE-WEBHOOK] Request headers:", JSON.stringify(Object.fromEntries(req.headers.entries())));

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2023-10-16",
  });

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      console.error("[STRIPE-WEBHOOK] No stripe-signature header found");
      return new Response(JSON.stringify({ error: "No signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!webhookSecret) {
      console.error("[STRIPE-WEBHOOK] STRIPE_WEBHOOK_SECRET not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      console.log("[STRIPE-WEBHOOK] Signature verified successfully");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("[STRIPE-WEBHOOK] Signature verification failed:", errorMessage);
      return new Response(JSON.stringify({ error: `Webhook signature verification failed: ${errorMessage}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`[STRIPE-WEBHOOK] Received event: ${event.type}`);

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[STRIPE-WEBHOOK] Processing checkout.session.completed");
      console.log("[STRIPE-WEBHOOK] Session ID:", session.id);
      console.log("[STRIPE-WEBHOOK] Session metadata:", JSON.stringify(session.metadata));
      console.log("[STRIPE-WEBHOOK] Payment status:", session.payment_status);

      const bookingId = session.metadata?.booking_id;
      
      if (!bookingId) {
        console.error("[STRIPE-WEBHOOK] No booking_id in session metadata");
        return new Response(JSON.stringify({ error: "No booking_id in metadata" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log("[STRIPE-WEBHOOK] Booking ID:", bookingId);

      // Fetch the booking
      const { data: booking, error: fetchError } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .maybeSingle();

      if (fetchError || !booking) {
        console.error("[STRIPE-WEBHOOK] Error fetching booking:", fetchError?.message);
        return new Response(JSON.stringify({ error: "Booking not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      console.log("[STRIPE-WEBHOOK] Found booking:", booking.id, "Status:", booking.status);
      console.log("[STRIPE-WEBHOOK] Booking details - guest_email:", booking.guest_email, "guest_name:", booking.guest_name);

      // Only process if booking is still pending
      if (booking.status === "pending") {
        // Update booking status to confirmed
        const { error: updateError } = await supabaseAdmin
          .from("bookings")
          .update({
            status: "confirmed",
            stripe_payment_intent_id: session.payment_intent as string,
            updated_at: new Date().toISOString(),
          })
          .eq("id", bookingId);

        if (updateError) {
          console.error("[STRIPE-WEBHOOK] Error updating booking:", updateError.message);
          return new Response(JSON.stringify({ error: "Failed to update booking" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        console.log("[STRIPE-WEBHOOK] Booking status updated to confirmed");

        // Send confirmation emails to BOTH customer AND admin
        try {
          const services = Array.isArray(booking.services) ? booking.services : [];
          
          // Format services properly - handle both string and number prices
          const formattedServices = services.map((s: any) => ({
            name: s.name || "Service",
            duration: s.duration || 0,
            price: typeof s.price === "number" 
              ? `£${s.price.toFixed(2)}` 
              : (s.price || "£0.00"),
          }));

          const emailPayload = {
            emailType: "confirmation",
            bookingId: booking.id,
            customerEmail: booking.guest_email,
            customerName: booking.guest_name || "Customer",
            customerPhone: booking.guest_phone || "",
            services: formattedServices,
            bookingDate: booking.booking_date,
            bookingTime: booking.booking_time,
            totalAmount: booking.total_amount,
            paymentType: booking.payment_type,
            specialRequests: booking.special_requests,
            stylistId: booking.stylist_id,
          };

          console.log("[STRIPE-WEBHOOK] Sending confirmation email with payload:", JSON.stringify(emailPayload));

          const emailResponse = await fetch(
            `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-booking-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
              },
              body: JSON.stringify(emailPayload),
            }
          );

          const emailResult = await emailResponse.text();
          console.log("[STRIPE-WEBHOOK] Email response status:", emailResponse.status);
          console.log("[STRIPE-WEBHOOK] Email response:", emailResult);

          if (!emailResponse.ok) {
            console.error("[STRIPE-WEBHOOK] Email sending failed:", emailResult);
          } else {
            console.log("[STRIPE-WEBHOOK] Confirmation emails sent successfully");
          }
        } catch (emailError) {
          console.error("[STRIPE-WEBHOOK] Error sending emails:", emailError);
          // Don't fail the webhook for email errors - booking is already confirmed
        }
      } else {
        console.log("[STRIPE-WEBHOOK] Booking already processed, status:", booking.status);
      }

      return new Response(JSON.stringify({ received: true, bookingId }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return success for other event types
    console.log("[STRIPE-WEBHOOK] Event type not handled:", event.type);
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[STRIPE-WEBHOOK] Unexpected error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
