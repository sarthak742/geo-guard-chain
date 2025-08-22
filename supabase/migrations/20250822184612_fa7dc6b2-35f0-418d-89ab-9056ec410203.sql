-- Fix user location data exposure by implementing stricter RLS
-- WARNING: This will make zones private to each user, which may break the collaborative 
-- safety reporting feature where users share zone information with each other

-- Drop the current "view all zones" policy
DROP POLICY IF EXISTS "Users can view all zones" ON public.zones;

-- Create restrictive policy so users can only see their own zones
CREATE POLICY "Users can view only their own zones"
ON public.zones
FOR SELECT
USING (auth.uid() = user_id);

-- Keep existing policies for INSERT, UPDATE, DELETE (they're already secure)
-- Users can create their own zones: already exists
-- Users can update their own zones: already exists  
-- Users can delete their own zones: already exists