-- Teenfluencer Referral System Database Schema

-- Create influencers table
CREATE TABLE IF NOT EXISTS influencers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  unique_code TEXT NOT NULL UNIQUE,
  social_handles JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create influencer_earnings table
CREATE TABLE IF NOT EXISTS influencer_earnings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  influencer_id UUID NOT NULL REFERENCES influencers(id),
  total_clicks INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  total_signups INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(influencer_id)
);

-- Create influencer_tracking table
CREATE TABLE IF NOT EXISTS influencer_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  influencer_id UUID NOT NULL REFERENCES influencers(id),
  product_id TEXT,
  action TEXT NOT NULL CHECK (action IN ('click', 'conversion', 'signup', 'admin_bonus')),
  order_amount DECIMAL(10,2),
  order_id TEXT,
  commission DECIMAL(10,2),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample influencer
INSERT INTO influencers (name, email, unique_code, social_handles)
VALUES ('John Doe', 'john@example.com', 'JOHN2024', '{"instagram": "@johndoe", "youtube": "johndoe"}')
ON CONFLICT (email) DO NOTHING;

-- Insert sample earnings
INSERT INTO influencer_earnings (influencer_id, total_clicks, total_conversions, total_earnings)
SELECT id, 1250, 85, 2500.00 FROM influencers WHERE email = 'john@example.com'
ON CONFLICT (influencer_id) DO NOTHING;