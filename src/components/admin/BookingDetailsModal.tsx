import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BookingDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: any;
}

export function BookingDetailsModal({ open, onOpenChange, booking }: BookingDetailsModalProps) {
  if (!booking) return null;

  const services = Array.isArray(booking.services) ? booking.services : [];
  
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
                  <p className="font-semibold text-gray-900">${service.price}</p>
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
                <p className="text-base font-semibold text-[#D4AF37]">${booking.total_amount.toFixed(2)}</p>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
