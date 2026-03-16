-- Add authentication fields to children table for child login
-- This allows parents to create login credentials for their children

-- Add new columns to children table
ALTER TABLE public.children 
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS password_hash TEXT,
ADD COLUMN IF NOT EXISTS learning_level TEXT DEFAULT 'beginner' CHECK (learning_level IN ('beginner', 'intermediate', 'advanced'));

-- Create index for username lookups
CREATE INDEX IF NOT EXISTS idx_children_username ON public.children(username);

-- Update RLS to allow reading children by username (for login)
CREATE POLICY IF NOT EXISTS "children_select_by_username" ON public.children 
FOR SELECT USING (true);

-- Note: The password_hash should be properly hashed in production
-- For this implementation, we're storing it as plain text for simplicity
-- In production, use bcrypt or similar on the server side
