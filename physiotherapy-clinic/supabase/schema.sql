-- =============================================
-- Supabase Database Schema for Appointments
-- Run this in your Supabase SQL Editor
-- =============================================

-- Create enum types
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE service_type AS ENUM ('ortho', 'sports', 'neuro', 'manual', 'senior', 'surgery');
CREATE TYPE time_slot AS ENUM ('morning', 'afternoon', 'evening');

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service service_type NOT NULL,
    appointment_date DATE NOT NULL,
    time_slot time_slot NOT NULL,
    message TEXT,
    status appointment_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_email ON appointments(email);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Create unique constraint to prevent double booking
-- This ensures only one appointment per date + time_slot + service combination
CREATE UNIQUE INDEX idx_unique_appointment_slot 
ON appointments(appointment_date, time_slot, service) 
WHERE status != 'cancelled';

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting appointments (public can submit)
CREATE POLICY "Allow public to insert appointments" 
ON appointments 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading own appointments by email
CREATE POLICY "Allow reading appointments by email" 
ON appointments 
FOR SELECT 
USING (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT ON appointments TO anon;

-- =============================================
-- Helper function to check slot availability
-- =============================================
CREATE OR REPLACE FUNCTION check_slot_available(
    p_date DATE,
    p_time_slot time_slot,
    p_service service_type
)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN NOT EXISTS (
        SELECT 1 FROM appointments
        WHERE appointment_date = p_date
        AND time_slot = p_time_slot
        AND service = p_service
        AND status != 'cancelled'
    );
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- Function to get available slots for a date
-- =============================================
CREATE OR REPLACE FUNCTION get_available_slots(
    p_date DATE,
    p_service service_type
)
RETURNS TABLE(slot time_slot, available BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.slot,
        NOT EXISTS (
            SELECT 1 FROM appointments a
            WHERE a.appointment_date = p_date
            AND a.time_slot = s.slot
            AND a.service = p_service
            AND a.status != 'cancelled'
        ) as available
    FROM (
        SELECT unnest(enum_range(NULL::time_slot)) as slot
    ) s;
END;
$$ LANGUAGE plpgsql;
