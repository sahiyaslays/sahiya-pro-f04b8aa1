import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Eye, Calendar, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import AdminSidebar from '@/components/AdminSidebar';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at: string;
}

interface UserWithEmail extends Profile {
  email?: string;
}

interface Booking {
  id: string;
  booking_date: string;
  booking_time: string;
  services: any;
  status: string;
  total_amount: number;
}

interface Order {
  id: string;
  items: any;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AdminUsersManagement() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<UserWithEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserWithEmail | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && user && !isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/user-dashboard');
    } else if (!authLoading && user && isAdmin) {
      fetchProfiles();
    }
  }, [user, authLoading, navigate, isAdmin]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      console.error('Error fetching profiles:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (profile: UserWithEmail) => {
    setLoadingDetails(true);
    setSelectedUser(profile);
    setDetailsOpen(true);

    try {
      // Fetch user's bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      setUserBookings(bookingsData || []);

      // Fetch user's orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setUserOrders(ordersData || []);
    } catch (error: any) {
      console.error('Error fetching user details:', error);
      toast.error('Failed to load user details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    const searchLower = searchQuery.toLowerCase();
    return (
      profile.first_name?.toLowerCase().includes(searchLower) ||
      profile.last_name?.toLowerCase().includes(searchLower) ||
      profile.phone?.includes(searchQuery)
    );
  });

  if (authLoading || loading) {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-500 mt-1">{profiles.length} registered users</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300"
            />
          </div>
        </div>

        {/* Users Table */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 hover:bg-gray-50">
                    <TableHead className="text-gray-700">Name</TableHead>
                    <TableHead className="text-gray-700">Phone</TableHead>
                    <TableHead className="text-gray-700">Joined</TableHead>
                    <TableHead className="text-right text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.length === 0 ? (
                    <TableRow className="border-gray-200">
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        {searchQuery ? 'No users found matching your search' : 'No users registered yet'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProfiles.map((profile) => (
                      <TableRow key={profile.id} className="border-gray-200 hover:bg-gray-50">
                        <TableCell>
                          <div className="font-medium text-gray-900">
                            {profile.first_name} {profile.last_name}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">{profile.phone || '-'}</TableCell>
                        <TableCell className="text-gray-700">
                          {format(new Date(profile.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchUserDetails(profile)}
                            className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
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

        {/* User Details Modal */}
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-900 text-xl">
                {selectedUser?.first_name} {selectedUser?.last_name}
              </DialogTitle>
            </DialogHeader>

            {loadingDetails ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-6">
                {/* User Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{selectedUser?.phone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-medium text-gray-900">
                        {selectedUser?.created_at && format(new Date(selectedUser.created_at), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bookings */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Bookings ({userBookings.length})
                    </h3>
                  </div>
                  {userBookings.length === 0 ? (
                    <p className="text-gray-500 text-sm">No bookings yet</p>
                  ) : (
                    <div className="space-y-2">
                      {userBookings.slice(0, 5).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              {format(new Date(booking.booking_date), 'MMM dd, yyyy')} at {booking.booking_time}
                            </p>
                            <p className="text-sm text-gray-500">
                              {Array.isArray(booking.services)
                                ? booking.services.map((s: any) => s.name).join(', ')
                                : 'N/A'}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                              className={booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : ''}
                            >
                              {booking.status}
                            </Badge>
                            <p className="text-primary font-medium mt-1">£{Number(booking.total_amount).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                      {userBookings.length > 5 && (
                        <p className="text-sm text-gray-500 text-center">
                          +{userBookings.length - 5} more bookings
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Orders */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Orders ({userOrders.length})
                    </h3>
                  </div>
                  {userOrders.length === 0 ? (
                    <p className="text-gray-500 text-sm">No orders yet</p>
                  ) : (
                    <div className="space-y-2">
                      {userOrders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              Order #{order.id.slice(0, 8)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(order.created_at), 'MMM dd, yyyy')} • {Array.isArray(order.items) ? order.items.length : 0} item(s)
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={order.status === 'completed' ? 'default' : 'secondary'}
                              className={order.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                            >
                              {order.status}
                            </Badge>
                            <p className="text-primary font-medium mt-1">£{Number(order.total_amount).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                      {userOrders.length > 5 && (
                        <p className="text-sm text-gray-500 text-center">
                          +{userOrders.length - 5} more orders
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
