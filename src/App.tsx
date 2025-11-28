import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { EditModeButton } from "@/components/EditModeButton";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Team from "./pages/Team";
import Services from "./pages/Services";
import ServicesSimple from "./pages/ServicesSimple";
import BeautyNails from "./pages/BeautyNails";
import News from "./pages/News";
import Career from "./pages/Career";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import OurCustomers from "./pages/OurCustomers";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminServicesManagement from "./pages/AdminServicesManagement";
import AdminProductsManagement from "./pages/AdminProductsManagement";
import AdminBookings from "./pages/AdminBookings";
import AdminOrders from "./pages/AdminOrders";

const queryClient = new QueryClient();

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <EditModeProvider>
                <Toaster />
                <Sonner />
                <ScrollToTop />
              <CartDrawer />
              <EditModeButton />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services-db" element={<ServicesSimple />} />
                <Route path="/beauty-nails" element={<BeautyNails />} />
                <Route path="/news" element={<News />} />
                <Route path="/career" element={<Career />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/our-customers" element={<OurCustomers />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                <Route path="/terms-and-conditions" element={<TermsConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<AdminServicesManagement />} />
            <Route path="/admin/products" element={<AdminProductsManagement />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CartDrawer />
              <EditModeButton />
            </EditModeProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
