import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Scissors, 
  Package, 
  Calendar, 
  ShoppingBag,
  Users,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/services', label: 'Manage Services', icon: Scissors },
    { path: '/admin/products', label: 'Manage Products', icon: Package },
    { path: '/admin/bookings', label: 'All Bookings', icon: Calendar },
    { path: '/admin/orders', label: 'All Orders', icon: ShoppingBag },
    { path: '/admin/users', label: 'Manage Users', icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-primary">Sahiya Slays</h2>
        <p className="text-sm text-gray-600 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link to="/" target="_blank">
          <Button
            variant="outline"
            className="w-full gap-2 border-gray-200 text-gray-700 hover:bg-gray-100"
          >
            <ExternalLink className="h-4 w-4" />
            View Website
          </Button>
        </Link>
        <Button
          onClick={signOut}
          variant="outline"
          className="w-full gap-2 border-gray-200 text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
