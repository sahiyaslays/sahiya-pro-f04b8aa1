import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminSidebar from '@/components/AdminSidebar';
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
import { Loader2, Calendar, ShoppingBag, TrendingUp, Users, Scissors, Package } from 'lucide-react';
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

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  active: boolean;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock_quantity: number;
  active: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
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

      // Fetch all services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (servicesError) throw servicesError;
      setServices(servicesData || []);

      // Fetch all products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      setProducts(productsData || []);
    } catch (error: any) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };


  // Calculate stats
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const totalOrders = orders.length;
  const totalRevenue =
    bookings.reduce((sum, b) => sum + Number(b.total_amount), 0) +
    orders.reduce((sum, o) => sum + Number(o.total_amount), 0);
  const activeServices = services.filter((s) => s.active).length;
  const activeProducts = products.filter((p) => p.active).length;

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (statusFilter !== 'all' && booking.status !== statusFilter) return false;
    if (dateFrom && booking.booking_date < dateFrom) return false;
    if (dateTo && booking.booking_date > dateTo) return false;
    return true;
  });

  if (authLoading || loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalBookings}</div>
              <p className="text-xs text-gray-500 mt-1">{confirmedBookings} confirmed</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalOrders}</div>
              <p className="text-xs text-gray-500 mt-1">Product orders</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                £{totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Services</CardTitle>
              <Scissors className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeServices}</div>
              <p className="text-xs text-gray-500 mt-1">of {services.length} total</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Products</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeProducts}</div>
              <p className="text-xs text-gray-500 mt-1">of {products.length} total</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Stock</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {products.reduce((sum, p) => sum + p.stock_quantity, 0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">All products</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings Table */}
        <Card className="mb-8 bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-gray-50">
                    <TableHead className="text-gray-700">Customer</TableHead>
                    <TableHead className="text-gray-700">Services</TableHead>
                    <TableHead className="text-gray-700">Date & Time</TableHead>
                    <TableHead className="text-gray-700">Status</TableHead>
                    <TableHead className="text-gray-700">Payment</TableHead>
                    <TableHead className="text-right text-gray-700">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.slice(0, 10).length === 0 ? (
                    <TableRow className="border-gray-200">
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    bookings.slice(0, 10).map((booking) => (
                      <TableRow key={booking.id} className="border-gray-200 hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {booking.guest_name || 'Registered User'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.guest_email || 'N/A'}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {Array.isArray(booking.services)
                            ? booking.services.map((s: any) => s.name).join(', ')
                            : 'N/A'}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {format(new Date(booking.booking_date), 'MMM dd, yyyy')} at{' '}
                          {booking.booking_time}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'confirmed'
                                ? 'bg-primary/20 text-primary'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell className="capitalize text-gray-700">{booking.payment_type}</TableCell>
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

        {/* Recent Orders Table */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-gray-50">
                    <TableHead className="text-gray-700">Order ID</TableHead>
                    <TableHead className="text-gray-700">Customer</TableHead>
                    <TableHead className="text-gray-700">Items</TableHead>
                    <TableHead className="text-gray-700">Date</TableHead>
                    <TableHead className="text-gray-700">Status</TableHead>
                    <TableHead className="text-right text-gray-700">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 10).length === 0 ? (
                    <TableRow className="border-gray-200">
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.slice(0, 10).map((order) => (
                      <TableRow key={order.id} className="border-gray-200 hover:bg-gray-50">
                        <TableCell className="font-mono text-sm text-gray-700">
                          #{order.id.slice(0, 8)}
                        </TableCell>
                        <TableCell className="text-gray-700">{order.guest_email || 'Registered User'}</TableCell>
                        <TableCell className="text-gray-700">
                          {Array.isArray(order.items)
                            ? order.items.length + ' item(s)'
                            : 'N/A'}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {format(new Date(order.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'completed'
                                ? 'bg-primary/20 text-primary'
                                : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-600'
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
