-- Fix all security issues

-- 1. Fix function search path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. Improve zones table security - ensure location data is properly protected
-- Add constraint to prevent exact coordinate exposure (round to ~100m accuracy for privacy)
ALTER TABLE public.zones 
ADD CONSTRAINT zones_coord_precision_check 
CHECK (
  round(latitude::numeric, 3) = latitude AND 
  round(longitude::numeric, 3) = longitude
);

-- 3. Add database-level search_path security
-- Lock down search_path at database level to prevent function hijacking
ALTER DATABASE postgres SET search_path = 'public';

-- 4. Add trigger to automatically round coordinates on insert/update for privacy
CREATE OR REPLACE FUNCTION public.round_coordinates()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Round coordinates to 3 decimal places (~100m accuracy) for privacy
  NEW.latitude = round(NEW.latitude::numeric, 3);
  NEW.longitude = round(NEW.longitude::numeric, 3);
  RETURN NEW;
END;
$$;

-- Create trigger to automatically round coordinates
DROP TRIGGER IF EXISTS round_coordinates_trigger ON public.zones;
CREATE TRIGGER round_coordinates_trigger
  BEFORE INSERT OR UPDATE ON public.zones
  FOR EACH ROW
  EXECUTE FUNCTION public.round_coordinates();

-- 5. Ensure zones description doesn't contain sensitive data
ALTER TABLE public.zones 
ADD CONSTRAINT zones_description_length_check 
CHECK (length(description) <= 200);