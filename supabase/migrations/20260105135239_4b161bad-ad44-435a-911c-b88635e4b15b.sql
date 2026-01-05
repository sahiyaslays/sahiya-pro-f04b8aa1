-- Create coaching_bookings table for 1-1 coaching call scheduling
CREATE TABLE public.coaching_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.coaching_bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create a booking (public form)
CREATE POLICY "Anyone can create coaching bookings"
ON public.coaching_bookings
FOR INSERT
WITH CHECK (true);

-- Only admins can view/update/delete bookings
CREATE POLICY "Admins can view coaching bookings"
ON public.coaching_bookings
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

CREATE POLICY "Admins can update coaching bookings"
ON public.coaching_bookings
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete coaching bookings"
ON public.coaching_bookings
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);

-- Trigger for updated_at
CREATE TRIGGER update_coaching_bookings_updated_at
BEFORE UPDATE ON public.coaching_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();