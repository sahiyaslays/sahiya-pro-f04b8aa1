import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface BookingDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: any;
  onStatusUpdate?: () => void;
}

export function BookingDetailsModal({ open, onOpenChange, booking, onStatusUpdate }: BookingDetailsModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  if (!booking) return null;

  const services = Array.isArray(booking.services) ? booking.services : [];
  
  const handleAcceptBooking = async () => {
    setIsProcessing(true);
    try {
      // Update booking status
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', booking.id);

      if (updateError) throw updateError;

      // Send confirmation email - format services properly
      const formattedServices = services.map((s: any) => ({
        name: s.name || "Service",
        duration: s.duration || 0,
        price: typeof s.price === "number" ? `£${s.price.toFixed(2)}` : (s.price || "£0.00"),
      }));

      const { error: emailError } = await supabase.functions.invoke('send-booking-email', {
        body: {
          emailType: 'confirmation',
          bookingId: booking.id,
          customerName: booking.guest_name,
          customerEmail: booking.guest_email,
          customerPhone: booking.guest_phone,
          services: formattedServices,
          bookingDate: new Date(booking.booking_date).toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          bookingTime: booking.booking_time,
          totalAmount: booking.total_amount,
          paymentType: booking.payment_type,
          specialRequests: booking.special_requests,
          stylistId: booking.stylist_id,
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        toast({
          title: "Booking Confirmed",
          description: "Booking status updated but email notification failed. Please contact customer directly.",
          variant: "default",
        });
      } else {
        toast({
          title: "Booking Accepted",
          description: "Confirmation email sent to customer successfully.",
        });
      }

      onStatusUpdate?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error accepting booking:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to accept booking",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectBooking = async () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejecting this booking.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Update booking status
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', booking.id);

      if (updateError) throw updateError;

      // Send rejection email - format services properly
      const formattedServicesForRejection = services.map((s: any) => ({
        name: s.name || "Service",
        duration: s.duration || 0,
        price: typeof s.price === "number" ? `£${s.price.toFixed(2)}` : (s.price || "£0.00"),
      }));

      const { error: emailError } = await supabase.functions.invoke('send-booking-email', {
        body: {
          emailType: 'rejection',
          bookingId: booking.id,
          customerName: booking.guest_name,
          customerEmail: booking.guest_email,
          customerPhone: booking.guest_phone,
          services: formattedServicesForRejection,
          bookingDate: new Date(booking.booking_date).toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          bookingTime: booking.booking_time,
          totalAmount: booking.total_amount,
          paymentType: booking.payment_type,
          specialRequests: booking.special_requests,
          rejectionReason: rejectionReason,
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        toast({
          title: "Booking Rejected",
          description: "Booking status updated but email notification failed. Please contact customer directly.",
          variant: "default",
        });
      } else {
        toast({
          title: "Booking Rejected",
          description: "Rejection email sent to customer successfully.",
        });
      }

      setShowRejectDialog(false);
      setRejectionReason("");
      onStatusUpdate?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error rejecting booking:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reject booking",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Booking Details</DialogTitle>
          <DialogDescription className="text-gray-600">
            Booking ID: {booking.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Status</h3>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-base font-medium text-gray-900">{booking.guest_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-base font-medium text-gray-900">{booking.guest_email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-base font-medium text-gray-900">{booking.guest_phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="text-base font-medium text-gray-900">
                  {new Date(booking.booking_date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-base font-medium text-gray-900">{booking.booking_time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-base font-medium text-gray-900">{booking.total_duration} minutes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Stylist</p>
                <p className="text-base font-medium text-gray-900">{booking.stylist_id || 'Not assigned'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Services</h3>
            <div className="space-y-2">
              {services.map((service: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">
                      {service.duration} min • Qty: {service.quantity || 1}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">£{typeof service.price === 'number' ? service.price.toFixed(2) : service.price}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">Payment Type</p>
                <p className="text-base font-medium text-gray-900">
                  {booking.payment_type === 'deposit' ? 'Deposit (50%)' : 
                   booking.payment_type === 'full' ? 'Full Payment' : 
                   booking.payment_type === 'free' ? 'Free' : booking.payment_type}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-base font-semibold text-[#D4AF37]">£{booking.total_amount.toFixed(2)}</p>
              </div>
              {booking.stripe_payment_intent_id && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Payment Intent ID</p>
                  <p className="text-xs font-mono text-gray-900 break-all">{booking.stripe_payment_intent_id}</p>
                </div>
              )}
            </div>
          </div>

          {/* Special Requests */}
          {booking.special_requests && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Requests / Notes</h3>
                <p className="text-base text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  {booking.special_requests}
                </p>
              </div>
            </>
          )}

          <Separator />

          {/* Timestamps */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Timestamps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-base font-medium text-gray-900">
                  {new Date(booking.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-base font-medium text-gray-900">
                  {new Date(booking.updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons - Only show for pending bookings */}
          {booking.status === 'pending' && (
            <>
              <Separator />
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => setShowRejectDialog(true)}
                  disabled={isProcessing}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isProcessing ? "Processing..." : "Reject Booking"}
                </Button>
                <Button
                  onClick={handleAcceptBooking}
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isProcessing ? "Processing..." : "Accept Booking"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>

      {/* Rejection Reason Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Reject Booking</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Please provide a reason for rejecting this booking. This will be sent to the customer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            placeholder="e.g., Unavailable on that date, Fully booked, etc."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px] bg-white text-gray-900 border-gray-300"
          />
          <AlertDialogFooter>
            <AlertDialogCancel 
              disabled={isProcessing}
              className="bg-gray-100 text-gray-900 hover:bg-gray-200"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRejectBooking}
              disabled={isProcessing || !rejectionReason.trim()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isProcessing ? "Processing..." : "Send Rejection"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
