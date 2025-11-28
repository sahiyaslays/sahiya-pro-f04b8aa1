-- Update RLS policies to allow admin email access
-- This allows the admin user (sahiyaslays@gmail.com) to view all bookings and orders

-- Drop existing admin view policies and recreate with email check
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

-- Create new policies that check both role and email
CREATE POLICY "Admins can view all bookings"
ON public.bookings
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR 
  auth.email() = 'sahiyaslays@gmail.com'
);

CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR 
  auth.email() = 'sahiyaslays@gmail.com'
);

-- Also update the update policies
DROP POLICY IF EXISTS "Admins can update all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;

CREATE POLICY "Admins can update all bookings"
ON public.bookings
FOR UPDATE
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  OR 
  auth.email() = 'sahiyaslays@gmail.com'
);