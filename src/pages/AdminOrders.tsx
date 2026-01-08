import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface Order {
  id: string;
  guest_email: string | null;
  items: any;
  total_amount: number;
  status: string;
  shipping_address: any;
  created_at: string;
  updated_at: string;
}

export default function AdminOrders() {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (!authLoading && user && !isAdmin) {
      navigate("/user-dashboard");
      return;
    }

    if (!authLoading && user && isAdmin) {
      fetchOrders();
    }
  }, [user, authLoading, navigate, isAdmin]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">All Orders</h1>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-xl text-gray-900">Order Management</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-gray-700 font-semibold">Order ID</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Customer Email</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Items</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Status</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Amount</TableHead>
                      <TableHead className="text-gray-700 font-semibold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                          No orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => {
                        const items = Array.isArray(order.items) ? order.items : [];
                        return (
                          <TableRow key={order.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium text-gray-900">
                              {order.id.slice(0, 8)}...
                            </TableCell>
                            <TableCell className="text-gray-700">{order.guest_email || 'N/A'}</TableCell>
                            <TableCell className="text-gray-700">{items.length} items</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold text-gray-900">
                              ${order.total_amount.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-gray-700">
                              {new Date(order.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
