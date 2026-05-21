-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (so anyone can subscribe from the frontend)
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.newsletter_subscribers;
CREATE POLICY "Enable insert for anonymous users" 
    ON public.newsletter_subscribers 
    FOR INSERT 
    WITH CHECK (true);

-- Allow admins to view, update, delete
DROP POLICY IF EXISTS "Enable all access for admins" ON public.newsletter_subscribers;
CREATE POLICY "Enable all access for admins" 
    ON public.newsletter_subscribers 
    FOR ALL 
    USING (auth.uid() IN (SELECT id FROM auth.users WHERE email = 'info@kilitosavannasafariclub.com'));

-- Create an index for faster lookups by email
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
