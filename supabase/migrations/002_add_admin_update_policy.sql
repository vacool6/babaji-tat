-- Add policy to allow updates to bookings table
-- This enables admin panel to update booking status
-- In production, you should implement proper authentication

CREATE POLICY "Allow admin update bookings" ON bookings
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

-- Note: For better security in production:
-- 1. Implement Supabase Auth for admin users
-- 2. Replace 'anon' with 'authenticated' 
-- 3. Add role-based checks like: auth.jwt() ->> 'role' = 'admin'
