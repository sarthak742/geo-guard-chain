-- Fix critical security vulnerability: Remove public access to geofences table
-- This prevents unauthorized users from accessing sensitive location and security data

-- Drop the existing policy that allows public access to geofences
DROP POLICY IF EXISTS "All can view geofences" ON public.geofences;

-- Create a new policy that restricts geofence access to authenticated users only
CREATE POLICY "Authenticated users can view geofences" 
ON public.geofences 
FOR SELECT 
TO authenticated
USING (true);

-- Add a more granular policy for tourists to only see basic safety info (optional enhancement)
-- This could be implemented later if you want to further restrict data based on user roles