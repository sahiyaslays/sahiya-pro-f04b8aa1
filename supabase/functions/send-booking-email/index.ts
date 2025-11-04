import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  bookingReference: string;
  serviceName: string;
  serviceOption: string;
  serviceDuration: string;
  servicePrice: string;
  date: string;
  time: string;
  stylistName?: string;
  customerName: string;
  customerEmail?: string;
  customerMobile: string;
  customerNotes?: string;
  paymentMethod: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();
    console.log("Processing booking email for:", bookingData.bookingReference);

    const paymentMethodText =
      bookingData.paymentMethod === "card"
        ? "Paid in Full (Online)"
        : bookingData.paymentMethod === "deposit-20"
        ? "£20 Deposit Paid (Balance due at salon)"
        : "Pay at Salon";

    const emailPromises = [];

    // Send confirmation email to customer if email provided
    if (bookingData.customerEmail) {
      emailPromises.push(
        resend.emails.send({
          from: "Sahiya Slays <sahiyaslays@gmail.com>",
          to: [bookingData.customerEmail],
          subject: `Booking Confirmed - ${bookingData.bookingReference}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #000; color: #D4AF37; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">SAHIYA SLAYS</h1>
                <p style="margin: 5px 0 0 0; font-size: 12px; letter-spacing: 2px;">HAIR • BEAUTY • NAILS</p>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #000; margin-top: 0;">Your Booking is Confirmed!</h2>
                <p>Hi ${bookingData.customerName},</p>
                <p>Thank you for booking with Sahiya Slays. We look forward to seeing you!</p>
                
                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <p style="margin: 5px 0;"><strong>Booking Reference:</strong> ${bookingData.bookingReference}</p>
                  <p style="margin: 5px 0;"><strong>Service:</strong> ${bookingData.serviceName}</p>
                  <p style="margin: 5px 0;"><strong>Option:</strong> ${bookingData.serviceOption}</p>
                  <p style="margin: 5px 0;"><strong>Duration:</strong> ${bookingData.serviceDuration}</p>
                  <p style="margin: 5px 0;"><strong>Price:</strong> ${bookingData.servicePrice}</p>
                </div>
                
                <div style="background-color: #fff3cd; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">📅 Appointment Details</h3>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingData.date}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingData.time}</p>
                  ${bookingData.stylistName ? `<p style="margin: 5px 0;"><strong>Stylist:</strong> ${bookingData.stylistName}</p>` : ""}
                </div>
                
                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <p style="margin: 5px 0;"><strong>Payment:</strong> ${paymentMethodText}</p>
                </div>
                
                ${bookingData.customerNotes ? `
                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <p style="margin: 5px 0;"><strong>Your Notes:</strong></p>
                  <p style="margin: 5px 0;">${bookingData.customerNotes}</p>
                </div>
                ` : ""}
                
                <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
                  <h3 style="color: #000; font-size: 16px; margin-top: 0;">📍 Our Location</h3>
                  <p style="margin: 5px 0;">415 Wick Lane, TradeStars Block G</p>
                  <p style="margin: 5px 0;">Bow, London E3 2JG</p>
                  <p style="margin: 5px 0;"><strong>Phone:</strong> 07809441074</p>
                </div>
                
                <p style="margin-top: 30px; font-size: 14px; color: #666;">
                  Please arrive 5-10 minutes before your appointment time.
                </p>
                <p style="font-size: 14px; color: #666;">
                  If you need to reschedule or have any questions, please contact us at 07809441074 or contact@sahiyaslays.com
                </p>
              </div>
              
              <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                <p>415 Wick Lane, TradeStars Block G, Bow, London E3 2JG</p>
                <p>07809441074 | contact@sahiyaslays.com</p>
              </div>
            </div>
          `,
        })
      );
    }

    // Always send notification email to salon
    emailPromises.push(
      resend.emails.send({
        from: "Sahiya Slays Bookings <sahiyaslays@gmail.com>",
        to: ["sahiyaslays@gmail.com"],
        subject: `New Booking - ${bookingData.bookingReference}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #000; color: #D4AF37; padding: 20px;">
              <h1 style="margin: 0;">New Booking Received</h1>
            </div>
            
            <div style="padding: 30px 20px;">
              <h2 style="color: #000; margin-top: 0;">Booking Details</h2>
              
              <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <p style="margin: 5px 0;"><strong>Booking Reference:</strong> ${bookingData.bookingReference}</p>
                <p style="margin: 5px 0;"><strong>Service:</strong> ${bookingData.serviceName}</p>
                <p style="margin: 5px 0;"><strong>Option:</strong> ${bookingData.serviceOption}</p>
                <p style="margin: 5px 0;"><strong>Duration:</strong> ${bookingData.serviceDuration}</p>
                <p style="margin: 5px 0;"><strong>Price:</strong> ${bookingData.servicePrice}</p>
              </div>
              
              <div style="background-color: #fff3cd; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">📅 Appointment</h3>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingData.date}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingData.time}</p>
                ${bookingData.stylistName ? `<p style="margin: 5px 0;"><strong>Stylist:</strong> ${bookingData.stylistName}</p>` : ""}
              </div>
              
              <div style="background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">👤 Customer Information</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${bookingData.customerName}</p>
                <p style="margin: 5px 0;"><strong>Mobile:</strong> ${bookingData.customerMobile}</p>
                ${bookingData.customerEmail ? `<p style="margin: 5px 0;"><strong>Email:</strong> ${bookingData.customerEmail}</p>` : ""}
              </div>
              
              <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <p style="margin: 5px 0;"><strong>Payment:</strong> ${paymentMethodText}</p>
              </div>
              
              ${bookingData.customerNotes ? `
              <div style="background-color: #fff9e6; border-left: 4px solid #FFC107; padding: 15px; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">📝 Customer Notes</h3>
                <p style="margin: 5px 0;">${bookingData.customerNotes}</p>
              </div>
              ` : ""}
            </div>
          </div>
        `,
      })
    );

    const results = await Promise.all(emailPromises);
    console.log("Booking emails sent:", results);

    return new Response(
      JSON.stringify({
        success: true,
        results,
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
    console.error("Error in send-booking-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
