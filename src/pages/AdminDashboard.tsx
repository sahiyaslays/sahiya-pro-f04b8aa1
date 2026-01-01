import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Loader2, 
  Calendar, 
  ShoppingBag, 
  TrendingUp, 
  Scissors, 
  Package,
  Plus,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
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
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && user && !isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/user-dashboard');
    } else if (!authLoading && user && isAdmin) {
      fetchAdminData();
    }
  }, [user, authLoading, navigate, isAdmin]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      const [bookingsRes, ordersRes, servicesRes, productsRes] = await Promise.all([
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*').order('created_at', { ascending: false }),
      ]);

      if (bookingsRes.error) throw bookingsRes.error;
      if (ordersRes.error) throw ordersRes.error;
      if (servicesRes.error) throw servicesRes.error;
      if (productsRes.error) throw productsRes.error;

      setBookings(bookingsRes.data || []);
      setOrders(ordersRes.data || []);
      setServices(servicesRes.data || []);
      setProducts(productsRes.data || []);
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
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const totalOrders = orders.length;
  const totalRevenue =
    bookings.reduce((sum, b) => sum + Number(b.total_amount), 0) +
    orders.reduce((sum, o) => sum + Number(o.total_amount), 0);
  const activeServices = services.filter((s) => s.active).length;
  const activeProducts = products.filter((p) => p.active).length;
  const lowStockProducts = products.filter((p) => p.stock_quantity !== null && p.stock_quantity < 5);

  // Upcoming bookings (next 7 days)
  const today = new Date();
  const next7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingBookings = bookings.filter(b => {
    const bookingDate = new Date(b.booking_date);
    return bookingDate >= today && bookingDate <= next7Days && b.status !== 'cancelled';
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
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button 
              onClick={() => navigate('/admin/products')}
              className="gap-2 bg-primary hover:bg-primary/90 text-black font-semibold"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
            <Button 
              onClick={() => navigate('/admin/services')}
              variant="outline"
              className="gap-2 border-gray-300"
            >
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </div>
        </div>

        {/* Alerts */}
        {(pendingBookings > 0 || lowStockProducts.length > 0) && (
          <div className="mb-6 space-y-3">
            {pendingBookings > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-800">
                    <strong>{pendingBookings}</strong> booking{pendingBookings > 1 ? 's' : ''} pending approval
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => navigate('/admin/bookings')}
                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                >
                  Review
                </Button>
              </div>
            )}
            {lowStockProducts.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800">
                    <strong>{lowStockProducts.length}</strong> product{lowStockProducts.length > 1 ? 's' : ''} low on stock
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => navigate('/admin/products')}
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  Manage
                </Button>
              </div>
            )}
          </div>
        )}
        
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card 
            className="bg-white border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/admin/bookings')}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalBookings}</div>
              <p className="text-xs text-gray-500 mt-1">
                {confirmedBookings} confirmed • {pendingBookings} pending
              </p>
            </CardContent>
          </Card>

          <Card 
            className="bg-white border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/admin/orders')}
          >
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

          <Card 
            className="bg-white border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/admin/services')}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Services</CardTitle>
              <Scissors className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeServices}</div>
              <p className="text-xs text-gray-500 mt-1">of {services.length} total</p>
            </CardContent>
          </Card>

          <Card 
            className="bg-white border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/admin/products')}
          >
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
              <CardTitle className="text-sm font-medium text-gray-600">Upcoming Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</div>
              <p className="text-xs text-gray-500 mt-1">Next 7 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Bookings */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-900">Recent Bookings</CardTitle>
              <Link to="/admin/bookings">
                <Button variant="ghost" size="sm" className="gap-1 text-gray-600">
                  View all <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bookings.slice(0, 5).length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No bookings yet</p>
                ) : (
                  bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.guest_name || 'Registered User'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(booking.booking_date), 'MMM dd')} at {booking.booking_time}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {booking.status}
                        </span>
                        <p className="text-primary font-medium mt-1">£{Number(booking.total_amount).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-900">Recent Orders</CardTitle>
              <Link to="/admin/orders">
                <Button variant="ghost" size="sm" className="gap-1 text-gray-600">
                  View all <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.slice(0, 5).length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No orders yet</p>
                ) : (
                  orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 font-mono text-sm">
                          #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(order.created_at), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {order.status}
                        </span>
                        <p className="text-primary font-medium mt-1">£{Number(order.total_amount).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
