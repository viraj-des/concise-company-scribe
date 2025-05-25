
-- Create companies table
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  cin TEXT UNIQUE,
  category TEXT,
  sub_category TEXT,
  class TEXT,
  roc_code TEXT,
  registration_number TEXT,
  date_of_incorporation DATE,
  email TEXT,
  phone_number TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  pin_code TEXT,
  authorized_capital DECIMAL,
  paid_up_capital DECIMAL,
  listed_status TEXT,
  active_compliance TEXT,
  annual_filing_date DATE,
  last_agm_date DATE,
  branches JSONB DEFAULT '[]'::jsonb,
  corporate_relations JSONB DEFAULT '[]'::jsonb,
  registrations JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create directors table
CREATE TABLE directors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prefix TEXT,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  din TEXT UNIQUE,
  email TEXT,
  phone_number TEXT,
  designation TEXT,
  nationality TEXT,
  occupation TEXT,
  date_of_birth DATE,
  date_of_appointment DATE,
  date_of_cessation DATE,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  pin_code TEXT,
  qualification TEXT,
  experience TEXT,
  other_directorships TEXT,
  has_interest_in_other_entities BOOLEAN DEFAULT FALSE,
  other_entities JSONB DEFAULT '[]'::jsonb,
  companies JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audits table
CREATE TABLE audits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auditor_type TEXT,
  auditor_name TEXT,
  address TEXT,
  pin_code TEXT,
  country TEXT,
  state TEXT,
  city TEXT,
  appointment_date DATE,
  cessation_date DATE,
  cessation_type TEXT,
  firm_registration_number TEXT,
  membership_number TEXT,
  duration_of_appointment TEXT,
  pan_of_firm TEXT,
  pan_of_signing_partner TEXT,
  email_id TEXT,
  phone_number TEXT,
  srn_of_adt TEXT,
  mode_of_appointment TEXT,
  attended_agm BOOLEAN DEFAULT FALSE,
  branch_office_address TEXT,
  start_date DATE,
  end_date DATE,
  paid_up_capital DECIMAL,
  reserves_and_surplus DECIMAL,
  net_worth DECIMAL,
  net_profit DECIMAL,
  amount_of_borrowing DECIMAL,
  turnover DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create share_capital_members table
CREATE TABLE share_capital_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  pan TEXT,
  din TEXT,
  aadhar TEXT,
  nationality TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  pin_code TEXT,
  email TEXT,
  phone_number TEXT,
  folio_number TEXT,
  shares_held INTEGER DEFAULT 0,
  share_type TEXT,
  face_value DECIMAL,
  holding_percentage DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_companies_cin ON companies(cin);
CREATE INDEX idx_directors_din ON directors(din);
CREATE INDEX idx_audits_firm_registration ON audits(firm_registration_number);
CREATE INDEX idx_share_capital_members_pan ON share_capital_members(pan);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE directors ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_capital_members ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all operations for now, you can restrict later)
CREATE POLICY "Allow all operations on companies" ON companies FOR ALL USING (true);
CREATE POLICY "Allow all operations on directors" ON directors FOR ALL USING (true);
CREATE POLICY "Allow all operations on audits" ON audits FOR ALL USING (true);
CREATE POLICY "Allow all operations on share_capital_members" ON share_capital_members FOR ALL USING (true);
