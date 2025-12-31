import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Service {
  name: string;
  duration: number;
  price: string;
  quantity?: number;
}

interface BookingEmailRequest {
  emailType: 'initial' | 'confirmation' | 'rejection';
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  services: Service[];
  bookingDate: string;
  bookingTime: string;
  totalAmount: number;
  paymentType: string;
  specialRequests?: string;
  stylistId?: string;
  rejectionReason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("[SEND-BOOKING-EMAIL] Function invoked");
  console.log("[SEND-BOOKING-EMAIL] Request method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.text();
    console.log("[SEND-BOOKING-EMAIL] Raw request body:", rawBody);
    
    const bookingData: BookingEmailRequest = JSON.parse(rawBody);
    console.log("[SEND-BOOKING-EMAIL] Parsed data - Type:", bookingData.emailType, "ID:", bookingData.bookingId);
    console.log("[SEND-BOOKING-EMAIL] Customer email:", bookingData.customerEmail);
    console.log("[SEND-BOOKING-EMAIL] RESEND_API_KEY configured:", !!Deno.env.get("RESEND_API_KEY"));

    const paymentTypeText = 
      bookingData.paymentType === "deposit" ? "£20 Deposit Paid" :
      bookingData.paymentType === "full" ? "Full Payment" : "Free";

    const servicesHtml = bookingData.services.map(service => 
      `<p style="margin: 5px 0;">${service.name} - ${service.duration} min - ${service.price}${service.quantity ? ` (Qty: ${service.quantity})` : ''}</p>`
    ).join('');

    const emailPromises = [];

    // INITIAL BOOKING REQUEST - Send to customer and admin
    if (bookingData.emailType === 'initial') {
      // Email to customer
      emailPromises.push(
        resend.emails.send({
          from: "Sahiya Slays <onboarding@resend.dev>",
          to: bookingData.customerEmail,
          subject: "Booking Request Received - Awaiting Confirmation",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #000; color: #D4AF37; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">SAHIYA SLAYS</h1>
                <p style="margin: 5px 0 0 0; font-size: 12px; letter-spacing: 2px;">HAIR • BEAUTY • NAILS</p>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #000; margin-top: 0;">We Received Your Booking Request!</h2>
                <p>Hi ${bookingData.customerName},</p>
                <p>Thank you for your booking request. Our team will review this during business hours and send you a confirmation email when your booking is confirmed.</p>
                
                <div style="background-color: #fff3cd; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">📅 Requested Appointment</h3>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingData.bookingDate}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingData.bookingTime}</p>
                </div>

                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <h3 style="margin: 0 0 10px 0; color: #000;">Services Requested</h3>
                  ${servicesHtml}
                  <p style="margin: 15px 0 5px 0;"><strong>Total Amount:</strong> £${bookingData.totalAmount.toFixed(2)}</p>
                  <p style="margin: 5px 0;"><strong>Payment:</strong> ${paymentTypeText}</p>
                </div>

                ${bookingData.specialRequests ? `
                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <p style="margin: 5px 0;"><strong>Your Notes:</strong></p>
                  <p style="margin: 5px 0;">${bookingData.specialRequests}</p>
                </div>
                ` : ''}
                
                <p style="margin-top: 30px; font-size: 14px; color: #666;">
                  We'll get back to you soon!
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

      // Email to admin
      emailPromises.push(
        resend.emails.send({
          from: "Sahiya Slays Bookings <onboarding@resend.dev>",
          to: "sahiyaslays@gmail.com",
          subject: `🔔 NEW BOOKING REQUEST - ${bookingData.customerName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #000; color: #D4AF37; padding: 20px;">
                <h1 style="margin: 0;">🔔 New Booking Request</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <div style="background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">👤 Customer Information</h3>
                  <p style="margin: 5px 0;"><strong>Name:</strong> ${bookingData.customerName}</p>
                  <p style="margin: 5px 0;"><strong>Email:</strong> ${bookingData.customerEmail}</p>
                  <p style="margin: 5px 0;"><strong>Phone:</strong> ${bookingData.customerPhone}</p>
                </div>

                <div style="background-color: #fff3cd; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">📅 Appointment Details</h3>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingData.bookingDate}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingData.bookingTime}</p>
                </div>

                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <h3 style="margin: 0 0 10px 0; color: #000;">Services</h3>
                  ${servicesHtml}
                  <p style="margin: 15px 0 5px 0;"><strong>Total:</strong> £${bookingData.totalAmount.toFixed(2)}</p>
                  <p style="margin: 5px 0;"><strong>Payment:</strong> ${paymentTypeText}</p>
                </div>

                ${bookingData.specialRequests ? `
                <div style="background-color: #fff9e6; border-left: 4px solid #FFC107; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">📝 Customer Notes</h3>
                  <p style="margin: 5px 0;">${bookingData.specialRequests}</p>
                </div>
                ` : ''}

                <p style="margin-top: 30px; padding: 15px; background-color: #e8f5e9; border-radius: 5px;">
                  <strong>Action Required:</strong> Please review and accept/reject this booking in your admin dashboard.
                </p>
              </div>
            </div>
          `,
        })
      );
    }

    // CONFIRMATION EMAIL - Send to customer AND admin
    if (bookingData.emailType === 'confirmation') {
      // Email to customer
      emailPromises.push(
        resend.emails.send({
          from: "Sahiya Slays <onboarding@resend.dev>",
          to: bookingData.customerEmail,
          subject: "✅ Booking Confirmed - We Look Forward to Seeing You!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #000; color: #D4AF37; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">SAHIYA SLAYS</h1>
                <p style="margin: 5px 0 0 0; font-size: 12px; letter-spacing: 2px;">HAIR • BEAUTY • NAILS</p>
              </div>
              
              <div style="padding: 30px 20px;">
                <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0;">
                  <h2 style="color: #2e7d32; margin: 0;">✅ Great News! Your Booking is Confirmed!</h2>
                </div>

                <p>Hi ${bookingData.customerName},</p>
                <p>We're excited to confirm your appointment at Sahiya Slays!</p>
                
                <div style="background-color: #fff3cd; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">📅 Your Appointment</h3>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingData.bookingDate}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingData.bookingTime}</p>
                </div>

                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <h3 style="margin: 0 0 10px 0; color: #000;">Your Services</h3>
                  ${servicesHtml}
                  <p style="margin: 15px 0 5px 0;"><strong>Total Amount:</strong> £${typeof bookingData.totalAmount === 'number' ? bookingData.totalAmount.toFixed(2) : bookingData.totalAmount}</p>
                  <p style="margin: 5px 0;"><strong>Payment:</strong> ${paymentTypeText}</p>
                </div>

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
                  If you need to reschedule, please contact us at 07809441074 or contact@sahiyaslays.com
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

      // Email to admin - notify of confirmed booking
      emailPromises.push(
        resend.emails.send({
          from: "Sahiya Slays Bookings <onboarding@resend.dev>",
          to: "sahiyaslays@gmail.com",
          subject: `✅ BOOKING CONFIRMED & PAID - ${bookingData.customerName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #4caf50; color: #fff; padding: 20px;">
                <h1 style="margin: 0;">✅ Booking Confirmed & Paid</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0;">
                  <p style="margin: 0; color: #2e7d32; font-weight: bold;">Payment received - Booking auto-confirmed!</p>
                </div>

                <div style="background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">👤 Customer Information</h3>
                  <p style="margin: 5px 0;"><strong>Name:</strong> ${bookingData.customerName}</p>
                  <p style="margin: 5px 0;"><strong>Email:</strong> ${bookingData.customerEmail}</p>
                  <p style="margin: 5px 0;"><strong>Phone:</strong> ${bookingData.customerPhone}</p>
                </div>

                <div style="background-color: #fff3cd; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">📅 Appointment Details</h3>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingData.bookingDate}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingData.bookingTime}</p>
                </div>

                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <h3 style="margin: 0 0 10px 0; color: #000;">Services</h3>
                  ${servicesHtml}
                  <p style="margin: 15px 0 5px 0;"><strong>Total:</strong> £${typeof bookingData.totalAmount === 'number' ? bookingData.totalAmount.toFixed(2) : bookingData.totalAmount}</p>
                  <p style="margin: 5px 0;"><strong>Payment:</strong> ${paymentTypeText}</p>
                </div>

                ${bookingData.specialRequests ? `
                <div style="background-color: #fff9e6; border-left: 4px solid #FFC107; padding: 15px; margin: 20px 0;">
                  <h3 style="margin: 0 0 10px 0; color: #000; font-size: 16px;">📝 Customer Notes</h3>
                  <p style="margin: 5px 0;">${bookingData.specialRequests}</p>
                </div>
                ` : ''}
              </div>
            </div>
          `,
        })
      );
    }

    // REJECTION EMAIL - Send to customer
    if (bookingData.emailType === 'rejection') {
      emailPromises.push(
        resend.emails.send({
          from: "Sahiya Slays <onboarding@resend.dev>",
          to: bookingData.customerEmail,
          subject: "Booking Update - Unable to Confirm",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background-color: #000; color: #D4AF37; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">SAHIYA SLAYS</h1>
                <p style="margin: 5px 0 0 0; font-size: 12px; letter-spacing: 2px;">HAIR • BEAUTY • NAILS</p>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #000; margin-top: 0;">Booking Update</h2>
                <p>Hi ${bookingData.customerName},</p>
                <p>We're sorry, but we're unable to accept your booking request for the following reason:</p>
                
                <div style="background-color: #ffebee; border-left: 4px solid #f44336; padding: 15px; margin: 20px 0;">
                  <p style="margin: 0; color: #c62828;"><strong>Reason:</strong> ${bookingData.rejectionReason || 'Unavailable at requested time'}</p>
                </div>

                <div style="background-color: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
                  <h3 style="margin: 0 0 10px 0; color: #000;">Requested Details</h3>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${bookingData.bookingDate}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${bookingData.bookingTime}</p>
                  ${servicesHtml}
                </div>
                
                <p style="margin-top: 30px;">Please try booking a different time or contact us directly:</p>
                <p style="font-size: 16px; color: #000;">
                  📞 <strong>07809441074</strong><br>
                  ✉️ <strong>contact@sahiyaslays.com</strong>
                </p>
                <p>We'd love to serve you and look forward to hearing from you!</p>
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

    console.log("[SEND-BOOKING-EMAIL] Sending", emailPromises.length, "email(s)...");
    
    const results = await Promise.all(emailPromises);
    console.log("[SEND-BOOKING-EMAIL] Resend API responses:", JSON.stringify(results));
    
    // Check for any errors in results
    const errors = results.filter((r: any) => r.error);
    if (errors.length > 0) {
      console.error("[SEND-BOOKING-EMAIL] Some emails failed:", JSON.stringify(errors));
    } else {
      console.log("[SEND-BOOKING-EMAIL] All emails sent successfully!");
    }

    return new Response(
      JSON.stringify({
        success: true,
        results,
        emailCount: emailPromises.length,
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
    console.error("[SEND-BOOKING-EMAIL] Error:", error.message);
    console.error("[SEND-BOOKING-EMAIL] Stack:", error.stack);
    return new Response(JSON.stringify({ error: error.message, stack: error.stack }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
