-- Create gemstones table
CREATE TABLE IF NOT EXISTS gemstones (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gem_type TEXT NOT NULL,
  shape TEXT NOT NULL,
  carat DECIMAL(10, 2) NOT NULL,
  color TEXT NOT NULL,
  clarity TEXT NOT NULL,
  treatment TEXT NOT NULL,
  origin TEXT NOT NULL,
  price DECIMAL(10, 2) DEFAULT 0,
  dimensions TEXT,
  description TEXT,
  image TEXT,
  cloudinary_id TEXT,
  specifications JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_gemstones_gem_type ON gemstones(gem_type);
CREATE INDEX IF NOT EXISTS idx_gemstones_shape ON gemstones(shape);
CREATE INDEX IF NOT EXISTS idx_gemstones_color ON gemstones(color);
CREATE INDEX IF NOT EXISTS idx_gemstones_carat ON gemstones(carat);
CREATE INDEX IF NOT EXISTS idx_gemstones_price ON gemstones(price);

-- Enable Row Level Security (optional)
ALTER TABLE gemstones ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON gemstones
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert/update
CREATE POLICY "Allow authenticated insert" ON gemstones
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON gemstones
  FOR UPDATE
  USING (true);
