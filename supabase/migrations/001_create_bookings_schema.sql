-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    
    -- Trip Details
    pickup_location VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    trip_type VARCHAR(50) NOT NULL, -- 'One Way', 'Round Trip', 'Local'
    pickup_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    return_datetime TIMESTAMP WITH TIME ZONE,
    
    -- Vehicle Details
    vehicle_id VARCHAR(50) NOT NULL,
    vehicle_name VARCHAR(100) NOT NULL,
    vehicle_category VARCHAR(100) NOT NULL,
    vehicle_seats INTEGER NOT NULL,
    
    -- Customer Details
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_alternate_phone VARCHAR(20),
    pickup_address TEXT,
    special_instructions TEXT,
    
    -- Pricing
    base_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    
    -- Payment Details
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
    payment_id VARCHAR(255),
    payment_method VARCHAR(50),
    payment_gateway VARCHAR(50),
    paid_amount DECIMAL(10, 2),
    payment_date TIMESTAMP WITH TIME ZONE,
    
    -- Booking Status
    booking_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'
    driver_assigned BOOLEAN DEFAULT FALSE,
    driver_name VARCHAR(255),
    driver_phone VARCHAR(20),
    vehicle_registration VARCHAR(50),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    
    -- Tracking
    booking_ip VARCHAR(50),
    user_agent TEXT
);

-- Create index for faster lookups
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX idx_bookings_email ON bookings(customer_email);
CREATE INDEX idx_bookings_phone ON bookings(customer_phone);
CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate booking reference
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
    ref TEXT;
    exists BOOLEAN;
BEGIN
    LOOP
        ref := 'BKG' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
        SELECT EXISTS(SELECT 1 FROM bookings WHERE booking_reference = ref) INTO exists;
        EXIT WHEN NOT exists;
    END LOOP;
    RETURN ref;
END;
$$ LANGUAGE plpgsql;

-- Create payment transactions table for tracking
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    payment_gateway VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) NOT NULL, -- 'initiated', 'success', 'failed', 'refunded'
    payment_method VARCHAR(50),
    gateway_response JSONB,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_payment_transactions_booking_id ON payment_transactions(booking_id);
CREATE INDEX idx_payment_transactions_transaction_id ON payment_transactions(transaction_id);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no login)
-- Allow anyone to insert bookings
CREATE POLICY "Allow public insert bookings" ON bookings
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow users to read their own bookings using email or phone
CREATE POLICY "Allow read own bookings" ON bookings
    FOR SELECT TO anon
    USING (true);

-- Allow service role to do everything
CREATE POLICY "Allow service role all" ON bookings
    FOR ALL TO service_role
    USING (true);

-- Payment transactions policies
CREATE POLICY "Allow service role payment transactions" ON payment_transactions
    FOR ALL TO service_role
    USING (true);
