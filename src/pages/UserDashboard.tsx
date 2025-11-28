import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, LogOut, Calendar, ShoppingBag, User } from 'lucide-react';
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
  created_at: string;
}

interface Order {
  id: string;
  items: any;
  total_amount: number;
  status: string;
  created_at: string;
  shipping_address: any;
}

interface Profile {
  first_name: string;
  last_name: string;
  phone: string;
}

export default function UserDashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<Profile>({ first_name: '', last_name: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      if (profileData) {
        setProfile(profileData);
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load your data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setUpdating(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone,
        })
        .eq('id', user.id);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            {profile.first_name && (
              <p className="text-primary mt-1">Welcome back, {profile.first_name}!</p>
            )}
          </div>
          <Button 
            onClick={handleLogout} 
            className="gap-2 bg-primary hover:bg-primary/90 text-white font-semibold"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <User className="h-5 w-5 text-primary" />
                My Profile
              </CardTitle>
              <CardDescription className="text-gray-600">Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.first_name}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                    required
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.last_name}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                    required
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    required
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input 
                    id="email" 
                    value={user?.email || ''} 
                    disabled 
                    className="bg-gray-100 border-gray-300 text-gray-500"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={updating} 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Profile'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Bookings Section */}
          <Card className="lg:col-span-2 bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Calendar className="h-5 w-5 text-primary" />
                My Bookings
              </CardTitle>
              <CardDescription className="text-gray-600">View your upcoming and past appointments</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No bookings yet</p>
                  <Button
                    onClick={() => navigate('/booking')}
                    className="mt-2 bg-primary hover:bg-primary/90 text-white font-semibold"
                  >
                    Book your first appointment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {format(new Date(booking.booking_date), 'MMMM dd, yyyy')} at{' '}
                            {booking.booking_time}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Services:{' '}
                            {Array.isArray(booking.services)
                              ? booking.services.map((s: any) => s.name).join(', ')
                              : 'N/A'}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-primary/20 text-primary'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          Payment: {booking.payment_type}
                        </span>
                        <span className="font-semibold text-primary">
                          £{booking.total_amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Orders Section */}
          <Card className="lg:col-span-3 bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <ShoppingBag className="h-5 w-5 text-primary" />
                My Orders
              </CardTitle>
              <CardDescription className="text-gray-600">Track your product orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No orders yet</p>
                  <Button 
                    onClick={() => navigate('/shop')} 
                    className="mt-2 bg-primary hover:bg-primary/90 text-white font-semibold"
                  >
                    Browse our shop
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Order #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {format(new Date(order.created_at), 'MMMM dd, yyyy')}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Items:{' '}
                            {Array.isArray(order.items)
                              ? order.items.map((item: any) => item.product?.title).join(', ')
                              : 'N/A'}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'completed'
                              ? 'bg-primary/20 text-primary'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                        <span className="text-gray-600">Total</span>
                        <span className="font-semibold text-primary">
                          £{order.total_amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
