-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price VARCHAR(100) NOT NULL,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  area VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  features TEXT[] DEFAULT '{}',
  category VARCHAR(100) NOT NULL DEFAULT 'شقة',
  status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'rented', 'maintenance')),
  featured BOOLEAN DEFAULT FALSE,
  images TEXT[] DEFAULT '{}',
  main_image TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id BIGSERIAL PRIMARY KEY,
  property_id BIGINT REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table for contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);
CREATE INDEX IF NOT EXISTS idx_bookings_property_id ON bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO properties (title, location, price, bedrooms, bathrooms, area, phone, features, category, status, featured, main_image) VALUES
('فيلا فاخرة في الرباط', 'الرباط، المغرب', '15,000 درهم/شهر', 4, 3, '250 متر مربع', '+212 6 00 00 00 01', ARRAY['مسبح', 'حديقة', 'موقف سيارات', 'مكيف هواء'], 'فيلا', 'available', true, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('شقة حديثة في الدار البيضاء', 'الدار البيضاء، المغرب', '8,000 درهم/شهر', 2, 2, '120 متر مربع', '+212 6 00 00 00 02', ARRAY['مصعد', 'أمن 24/7', 'موقف سيارات', 'شرفة'], 'شقة', 'available', false, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('منزل تقليدي في فاس', 'فاس، المغرب', '6,500 درهم/شهر', 3, 2, '180 متر مربع', '+212 6 00 00 00 03', ARRAY['فناء داخلي', 'تصميم تقليدي', 'موقع مركزي', 'هادئ'], 'منزل', 'available', false, 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('شقة بإطلالة بحرية في طنجة', 'طنجة، المغرب', '12,000 درهم/شهر', 3, 2, '150 متر مربع', '+212 6 00 00 00 04', ARRAY['إطلالة بحرية', 'شرفة كبيرة', 'قريب من الشاطئ', 'مفروش'], 'شقة', 'available', true, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('استوديو في مراكش', 'مراكش، المغرب', '4,000 درهم/شهر', 1, 1, '60 متر مربع', '+212 6 00 00 00 05', ARRAY['مفروش بالكامل', 'مطبخ مجهز', 'قريب من المدينة القديمة', 'واي فاي'], 'استوديو', 'available', false, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('فيلا مع حديقة في أكادير', 'أكادير، المغرب', '18,000 درهم/شهر', 5, 4, '300 متر مربع', '+212 6 00 00 00 06', ARRAY['حديقة كبيرة', 'مسبح خاص', 'قريب من الشاطئ', 'موقف 3 سيارات'], 'فيلا', 'available', true, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');

-- Row Level Security (RLS) policies
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "Properties are viewable by everyone" ON properties
    FOR SELECT USING (true);

CREATE POLICY "Properties are insertable by authenticated users" ON properties
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Properties are updatable by authenticated users" ON properties
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Properties are deletable by authenticated users" ON properties
    FOR DELETE USING (auth.role() = 'authenticated');

-- User profiles policies
CREATE POLICY "User profiles are viewable by owner" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "User profiles are insertable by owner" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "User profiles are updatable by owner" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Bookings policies
CREATE POLICY "Bookings are viewable by owner" ON bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Bookings are insertable by authenticated users" ON bookings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Bookings are updatable by owner" ON bookings
    FOR UPDATE USING (auth.uid() = user_id);

-- Contacts policies
CREATE POLICY "Contacts are insertable by everyone" ON contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Contacts are viewable by authenticated users" ON contacts
    FOR SELECT USING (auth.role() = 'authenticated');
