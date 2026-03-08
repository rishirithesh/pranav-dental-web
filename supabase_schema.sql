-- Supabase Schema for Pranav's Dental Care

-- Appointments Table
CREATE TABLE public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    treatment_type TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending'::text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Reviews Table
CREATE TABLE public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Gallery Table
CREATE TABLE public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Services Table
CREATE TABLE public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    procedure TEXT,
    recovery_time TEXT,
    cost_estimate TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and setup policies (simplistic for this example)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Allow public inserts to appointments
CREATE POLICY "Allow public insert to appointments" ON public.appointments FOR INSERT WITH CHECK (true);

-- Allow public read of reviews, gallery, services
CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Allow admin full appointments" ON public.appointments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full reviews" ON public.reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full services" ON public.services FOR ALL USING (auth.role() = 'authenticated');

-- Storage Setup
-- Note: You will need to create a public storage bucket named 'gallery' in your Supabase dashboard.
-- Ensure you add policies for this bucket to allow public reads and authenticated uploads.
