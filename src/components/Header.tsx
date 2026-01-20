import { useState, useEffect } from "react";
import { Menu, X, Info, Users, Heart, Scissors, Palette, Newspaper, Briefcase, Phone, Calendar, ShoppingBag, ShoppingCart, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getItemCount, openDrawer } = useCart();
  const { user, signOut } = useAuth();
  
  // Check if current route is home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about", icon: Info },
    { name: "Team", href: "/team", icon: Users },
    { name: "Our Customers", href: "/our-customers", icon: Heart },
    { name: "Services", href: "/services", icon: Scissors },
    { name: "Shop", href: "/shop", icon: ShoppingBag },
    { name: "News", href: "/news", icon: Newspaper },
    { name: "Career", href: "/career", icon: Briefcase },
    { name: "Contact", href: "/contact", icon: Phone }
  ];

  const leftLinks = navLinks.slice(0, 5);
  const rightLinks = navLinks.slice(5);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isHomePage
        ? (isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-md' 
            : 'bg-transparent')
        : 'bg-background shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Left Links */}
          <div className="flex items-center space-x-8">
            {leftLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href.startsWith('#') ? '/' : link.href}
                className={`hover:text-primary transition-colors duration-300 tracking-wide text-sm font-medium ${
                  location.pathname === link.href ? 'text-primary' : 
                  isHomePage ? 'text-white' : 'text-foreground'
                }`}
                onClick={link.href.startsWith('#') ? () => {
                  document.getElementById(link.href.substring(1))?.scrollIntoView({
                    behavior: 'smooth'
                  });
                } : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/lovable-uploads/57d4284b-6e51-42fd-93a0-cfc1a8afc314.png" 
                  alt="Sahiya Slays Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className={`text-xl font-normal tracking-widest leading-tight ${
                  isHomePage ? 'text-white' : 'text-foreground'
                }`}>
                  SAHIYA SLAYS
                </h1>
                <p className={`text-xs tracking-wide ${
                  isHomePage ? 'text-white/80' : 'text-muted-foreground'
                }`}>
                  Hair • Beauty • Nails
                </p>
              </div>
            </Link>
          </div>

          {/* Right Links */}
          <div className="flex items-center space-x-8">
            {rightLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href.startsWith('#') ? '/' : link.href}
                className={`hover:text-primary transition-colors duration-300 tracking-wide text-sm font-medium ${
                  location.pathname === link.href ? 'text-primary' : 
                  isHomePage ? 'text-white' : 'text-foreground'
                }`}
                onClick={link.href.startsWith('#') ? () => {
                  document.getElementById(link.href.substring(1))?.scrollIntoView({
                    behavior: 'smooth'
                  });
                } : undefined}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openDrawer}
              className={`relative hover:text-primary transition-colors duration-300 ${
                isHomePage ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
              }`}
              aria-label={`Shopping cart (${getItemCount()} items)`}
            >
              <ShoppingCart size={20} />
              {getItemCount() > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {getItemCount() > 9 ? '9+' : getItemCount()}
                </Badge>
              )}
            </Button>

            {/* Account/Login Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`hover:text-primary transition-colors duration-300 ${
                      isHomePage ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
                    }`}
                    aria-label="Account menu"
                  >
                    <User size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={`hover:text-primary transition-colors duration-300 ${
                  isHomePage ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
                }`}
              >
                <Link to="/auth">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/lovable-uploads/57d4284b-6e51-42fd-93a0-cfc1a8afc314.png" 
                alt="Sahiya Slays Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className={`text-lg font-normal tracking-widest ${
                isHomePage ? 'text-white' : 'text-foreground'
              }`}>
                SAHIYA SLAYS
              </span>
              <p className={`text-xs tracking-wide ${
                isHomePage ? 'text-white/80' : 'text-muted-foreground'
              }`}>
                Hair • Beauty • Nails
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            {/* Mobile Cart Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openDrawer}
              className={`relative hover:text-primary transition-colors duration-300 ${
                isHomePage ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
              }`}
              aria-label={`Shopping cart (${getItemCount()} items)`}
            >
              <ShoppingCart size={20} />
              {getItemCount() > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
                >
                  {getItemCount() > 9 ? '9+' : getItemCount()}
                </Badge>
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:text-primary transition-colors duration-300 ${
                    isHomePage ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
                  }`}
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 max-h-screen">
              <div className="flex flex-col h-full max-h-screen overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/57d4284b-6e51-42fd-93a0-cfc1a8afc314.png" 
                        alt="Sahiya Slays Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold tracking-wide">SAHIYA SLAYS</h2>
                      <p className="text-sm text-muted-foreground">Hair • Beauty • Nails</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-1">
                    {navLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <Link
                          key={link.name}
                          to={link.href}
                          className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                            location.pathname === link.href 
                              ? 'bg-primary/10 text-primary' 
                              : 'text-foreground hover:bg-muted hover:text-primary'
                          }`}
                        >
                          <IconComponent className={`h-5 w-5 transition-colors ${
                            location.pathname === link.href 
                              ? 'text-primary' 
                              : 'text-muted-foreground group-hover:text-primary'
                          }`} />
                          <span className="font-medium">{link.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* Call to Action */}
                <div className="sticky bottom-0 p-6 border-t border-border bg-background">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Ready to transform?</h3>
                      <p className="text-sm text-muted-foreground">Book your appointment today and experience premium beauty services.</p>
                    </div>
                    <Button asChild className="w-full" size="lg">
                      <Link to="/services" className="flex items-center justify-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Book A Service</span>
                      </Link>
                    </Button>
                    <div className="text-center">
                      <Link 
                        to="/contact" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Questions? Contact us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;