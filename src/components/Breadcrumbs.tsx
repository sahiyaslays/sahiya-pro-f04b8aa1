import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { SchemaMarkup } from './SchemaMarkup';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeNameMap: Record<string, string> = {
  'about': 'About',
  'services': 'Services',
  'shop': 'Shop',
  'contact': 'Contact',
  'booking': 'Book Appointment',
  'team': 'Our Team',
  'news': 'News',
  'career': 'Career',
  'our-customers': 'Our Customers',
  'faq': 'FAQ',
  'privacy-policy': 'Privacy Policy',
  'terms-conditions': 'Terms & Conditions',
  'cart': 'Cart',
  'checkout': 'Checkout',
  'user-dashboard': 'Dashboard',
};

export const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  const location = useLocation();
  
  // Generate breadcrumbs from current path if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', url: '/' }];
    
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = routeNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({ name, url: currentPath });
    });
    
    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Don't render on homepage
  if (location.pathname === '/') return null;

  return (
    <>
      {/* Schema Markup for SEO */}
      <SchemaMarkup type="BreadcrumbList" data={{ items: breadcrumbItems }} />
      
      {/* Visual Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb" 
        className={`text-sm ${className}`}
      >
        <ol className="flex items-center gap-1 flex-wrap">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
                )}
                
                {isLast ? (
                  <span 
                    className="text-foreground font-medium"
                    aria-current="page"
                  >
                    {index === 0 ? <Home className="h-4 w-4" /> : item.name}
                  </span>
                ) : (
                  <Link 
                    to={item.url}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {index === 0 ? <Home className="h-4 w-4" /> : item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
