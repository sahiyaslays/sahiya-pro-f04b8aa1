-- Fix RLS policies for bookings table
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;

-- Create secure SELECT policy - only authenticated users can view their own bookings
CREATE POLICY "Users can view their own bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create secure INSERT policy - ensure user_id matches auth.uid() for authenticated users
CREATE POLICY "Authenticated users can create their own bookings"
ON public.bookings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow guest bookings (user_id must be NULL and guest_email must be provided)
CREATE POLICY "Guests can create bookings"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL AND guest_email IS NOT NULL);

-- Fix RLS policies for orders table
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;

-- Create secure SELECT policy - only authenticated users can view their own orders
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create secure INSERT policy - ensure user_id matches auth.uid() for authenticated users
CREATE POLICY "Authenticated users can create their own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow guest orders (user_id must be NULL and guest_email must be provided)
CREATE POLICY "Guests can create orders"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL AND guest_email IS NOT NULL);