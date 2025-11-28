import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingDetailsModal } from "@/components/admin/BookingDetailsModal";
import { Loader2 } from "lucide-react";

interface Booking {
  id: string;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  booking_date: string;
  booking_time: string;
  services: any;
  status: string;
  total_amount: number;
  total_duration: number;
  payment_type: string;
  special_requests: string | null;
  stylist_id: string | null;
  stripe_payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
}

export default function AdminBookings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (user.email !== "sahiyaslays@gmail.com") {
      navigate("/user-dashboard");
      return;
    }

    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
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

  const handleRowClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Recent Bookings</h1>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-xl text-gray-900">All Bookings ({bookings.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-gray-700 font-semibold">Customer</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Email</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Date</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Time</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Amount</TableHead>
                      <TableHead className="text-gray-700 font-semibold text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                          No bookings found
                        </TableCell>
                      </TableRow>
                    ) : (
                      bookings.map((booking) => (
                        <TableRow 
                          key={booking.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <TableCell className="font-medium text-gray-900">
                            {booking.guest_name || 'N/A'}
                          </TableCell>
                          <TableCell className="text-gray-700">{booking.guest_email}</TableCell>
                          <TableCell className="text-gray-700">
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-gray-700">{booking.booking_time}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-gray-900">
                            ${booking.total_amount.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              onClick={() => handleRowClick(booking)}
                              className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                            >
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BookingDetailsModal 
        open={modalOpen}
        onOpenChange={setModalOpen}
        booking={selectedBooking}
      />
    </div>
  );
}
