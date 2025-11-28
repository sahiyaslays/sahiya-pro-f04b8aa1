-- Create services table for admin management
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  category TEXT NOT NULL,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create products table for admin management
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services (admin only can modify, public can view active)
CREATE POLICY "Public can view active services"
ON public.services
FOR SELECT
USING (active = true);

CREATE POLICY "Admins can do everything with services"
ON public.services
FOR ALL
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR 
  auth.email() = 'sahiyaslays@gmail.com'
);

-- RLS Policies for products (admin only can modify, public can view active)
CREATE POLICY "Public can view active products"
ON public.products
FOR SELECT
USING (active = true);

CREATE POLICY "Admins can do everything with products"
ON public.products
FOR ALL
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR 
  auth.email() = 'sahiyaslays@gmail.com'
);

-- Add triggers for updated_at
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();