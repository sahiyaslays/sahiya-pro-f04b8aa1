import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Scissors, 
  Package, 
  Calendar, 
  ShoppingBag,
  LogOut
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
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 min-h-screen bg-zinc-900 border-r border-primary/20 flex flex-col">
      <div className="p-6 border-b border-primary/20">
        <h2 className="text-2xl font-bold text-primary">Sahiya Slays</h2>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
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
                    ? 'bg-primary/20 text-primary hover:bg-primary/30'
                    : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary/20">
        <Button
          onClick={signOut}
          variant="outline"
          className="w-full gap-2 border-primary/20 text-white hover:bg-zinc-800"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
