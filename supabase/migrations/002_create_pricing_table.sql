-- Create vehicle pricing table
CREATE TABLE IF NOT EXISTS vehicle_pricing (
  id SERIAL PRIMARY KEY,
  vehicle_category VARCHAR(50) NOT NULL UNIQUE,
  base_fare DECIMAL(10, 2) NOT NULL DEFAULT 0, -- Minimum fare
  per_km_rate DECIMAL(10, 2) NOT NULL, -- Rate per kilometer
  per_minute_rate DECIMAL(10, 2) DEFAULT 0, -- Optional: rate per minute for waiting time
  night_surcharge_percent DECIMAL(5, 2) DEFAULT 0, -- Optional: % surcharge for night trips
  minimum_km DECIMAL(10, 2) DEFAULT 0, -- Minimum km for base fare
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default pricing for each vehicle category
INSERT INTO vehicle_pricing (vehicle_category, base_fare, per_km_rate, per_minute_rate, minimum_km) VALUES
  ('Sedan', 100.00, 19.00, 1.00, 5),
  ('SUV', 150.00, 25.00, 1.50, 5),
  ('Hatchback', 80.00, 15.00, 0.80, 5),
  ('Tempo Traveller', 300.00, 35.00, 2.00, 10)
ON CONFLICT (vehicle_category) DO NOTHING;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_vehicle_pricing_category ON vehicle_pricing(vehicle_category);

-- Enable RLS (Row Level Security)
ALTER TABLE vehicle_pricing ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (needed for frontend price calculation)
CREATE POLICY "Allow public read access to pricing" ON vehicle_pricing
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow only authenticated admin users to modify pricing
-- Note: You'll need to set up admin role separately
CREATE POLICY "Allow admin to modify pricing" ON vehicle_pricing
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_vehicle_pricing_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_vehicle_pricing_updated_at
  BEFORE UPDATE ON vehicle_pricing
  FOR EACH ROW
  EXECUTE FUNCTION update_vehicle_pricing_updated_at();

-- Add comment for documentation
COMMENT ON TABLE vehicle_pricing IS 'Stores per-kilometer pricing for different vehicle categories';
COMMENT ON COLUMN vehicle_pricing.base_fare IS 'Minimum fare charged regardless of distance';
COMMENT ON COLUMN vehicle_pricing.per_km_rate IS 'Cost per kilometer in INR';
COMMENT ON COLUMN vehicle_pricing.minimum_km IS 'Minimum kilometers included in base fare';
