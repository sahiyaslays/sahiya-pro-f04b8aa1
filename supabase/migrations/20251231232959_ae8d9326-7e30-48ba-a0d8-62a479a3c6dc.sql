-- Phase 1: Enhanced Products Table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS slug text,
ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS variants jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS short_description text,
ADD COLUMN IF NOT EXISTS long_description text,
ADD COLUMN IF NOT EXISTS price_min numeric,
ADD COLUMN IF NOT EXISTS price_max numeric,
ADD COLUMN IF NOT EXISTS is_sale boolean DEFAULT false;

-- Phase 1: Enhanced Services Table  
ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS subcategory text,
ADD COLUMN IF NOT EXISTS options jsonb DEFAULT '[]'::jsonb;

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public)
VALUES ('service-images', 'service-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for product-images bucket
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND (public.has_role(auth.uid(), 'admin') OR auth.email() = 'sahiyaslays@gmail.com')
);

CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images'
  AND (public.has_role(auth.uid(), 'admin') OR auth.email() = 'sahiyaslays@gmail.com')
);

CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images'
  AND (public.has_role(auth.uid(), 'admin') OR auth.email() = 'sahiyaslays@gmail.com')
);

-- RLS policies for service-images bucket
CREATE POLICY "Anyone can view service images"
ON storage.objects FOR SELECT
USING (bucket_id = 'service-images');

CREATE POLICY "Admins can upload service images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'service-images'
  AND (public.has_role(auth.uid(), 'admin') OR auth.email() = 'sahiyaslays@gmail.com')
);

CREATE POLICY "Admins can update service images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'service-images'
  AND (public.has_role(auth.uid(), 'admin') OR auth.email() = 'sahiyaslays@gmail.com')
);

CREATE POLICY "Admins can delete service images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'service-images'
  AND (public.has_role(auth.uid(), 'admin') OR auth.email() = 'sahiyaslays@gmail.com')
);