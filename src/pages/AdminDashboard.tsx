import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, LogOut, Calendar, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Booking {
  id: string;
  booking_date: string;
  booking_time: string;
  services: any;
  status: string;
  payment_type: string;
  total_amount: number;
  guest_name: string | null;
  guest_email: string | null;
  user_id: string | null;
}

interface Order {
  id: string;
  items: any;
  total_amount: number;
  status: string;
  created_at: string;
  guest_email: string | null;
}

export default function AdminDashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (user && user.email?.toLowerCase() !== 'sahiyaslays@gmail.com') {
      toast.error('Access denied. Admin only.');
      navigate('/user-dashboard');
    } else if (user) {
      setIsAdmin(true);
      fetchAdminData();
    }
  }, [user, authLoading, navigate]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // Fetch all bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Fetch all orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);
    } catch (error: any) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Calculate stats
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const totalOrders = orders.length;
  const totalRevenue =
    bookings.reduce((sum, b) => sum + Number(b.total_amount), 0) +
    orders.reduce((sum, o) => sum + Number(o.total_amount), 0);

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (statusFilter !== 'all' && booking.status !== statusFilter) return false;
    if (dateFrom && booking.booking_date < dateFrom) return false;
    if (dateTo && booking.booking_date > dateTo) return false;
    return true;
  });

  if (authLoading || loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-primary/20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button 
            onClick={handleLogout} 
            className="gap-2 bg-primary hover:bg-primary/90 text-black font-semibold"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-zinc-900 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalBookings}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Confirmed Bookings</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{confirmedBookings}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalOrders}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                £{totalRevenue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-zinc-900 border-primary/30">
          <CardHeader>
            <CardTitle className="text-white">Filters</CardTitle>
            <CardDescription className="text-gray-400">Filter bookings by status and date range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-300">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status" className="bg-black border-primary/20 text-white">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-primary/30">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFrom" className="text-gray-300">Date From</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-black border-primary/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateTo" className="text-gray-300">Date To</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="bg-black border-primary/20 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="mb-8 bg-zinc-900 border-primary/30">
          <CardHeader>
            <CardTitle className="text-white">All Bookings</CardTitle>
            <CardDescription className="text-gray-400">View and manage all customer bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-primary/20">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20 hover:bg-black/30">
                    <TableHead className="text-gray-300">Customer</TableHead>
                    <TableHead className="text-gray-300">Services</TableHead>
                    <TableHead className="text-gray-300">Date & Time</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Payment</TableHead>
                    <TableHead className="text-right text-gray-300">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow className="border-primary/20">
                      <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="border-primary/20 hover:bg-black/30">
                        <TableCell>
                          <div>
                            <p className="font-medium text-white">
                              {booking.guest_name || 'Registered User'}
                            </p>
                            <p className="text-sm text-gray-400">
                              {booking.guest_email || 'N/A'}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {Array.isArray(booking.services)
                            ? booking.services.map((s: any) => s.name).join(', ')
                            : 'N/A'}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {format(new Date(booking.booking_date), 'MMM dd, yyyy')} at{' '}
                          {booking.booking_time}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed'
                                ? 'bg-primary/20 text-primary'
                                : booking.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-600'
                                : 'bg-zinc-800 text-gray-400'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell className="capitalize text-gray-300">{booking.payment_type}</TableCell>
                        <TableCell className="text-right font-medium text-primary">
                          £{Number(booking.total_amount).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="bg-zinc-900 border-primary/30">
          <CardHeader>
            <CardTitle className="text-white">All Orders</CardTitle>
            <CardDescription className="text-gray-400">View all product orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-primary/20">
              <Table>
                <TableHeader>
                  <TableRow className="border-primary/20 hover:bg-black/30">
                    <TableHead className="text-gray-300">Order ID</TableHead>
                    <TableHead className="text-gray-300">Customer</TableHead>
                    <TableHead className="text-gray-300">Items</TableHead>
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-right text-gray-300">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow className="border-primary/20">
                      <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order.id} className="border-primary/20 hover:bg-black/30">
                        <TableCell className="font-mono text-sm text-gray-300">
                          #{order.id.slice(0, 8)}
                        </TableCell>
                        <TableCell className="text-gray-300">{order.guest_email || 'Registered User'}</TableCell>
                        <TableCell className="text-gray-300">
                          {Array.isArray(order.items)
                            ? order.items.length + ' item(s)'
                            : 'N/A'}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {format(new Date(order.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'completed'
                                ? 'bg-primary/20 text-primary'
                                : order.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-600'
                                : 'bg-zinc-800 text-gray-400'
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-medium text-primary">
                          £{Number(order.total_amount).toFixed(2)}
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
  );
}
