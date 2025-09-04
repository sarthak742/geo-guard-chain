-- Create a security definer function to check if user is admin
-- This prevents infinite recursion in RLS policies
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM user_profiles 
    WHERE id = auth.uid() AND role = 'ADMIN'
  );
$$;

-- Drop the existing problematic admin policy that causes recursion
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.user_profiles;

-- Create new secure admin policy using the security definer function
CREATE POLICY "Admins can manage all profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Ensure all existing policies are properly secured and only work for authenticated users
-- Update the read policy to be more explicit about authentication requirement
DROP POLICY IF EXISTS "Users can read their own profile" ON public.user_profiles;
CREATE POLICY "Users can read their own profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Update the update policy to be more explicit about authentication requirement  
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
CREATE POLICY "Users can update their own profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Update the insert policy to be more explicit about authentication requirement
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
CREATE POLICY "Users can insert their own profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);