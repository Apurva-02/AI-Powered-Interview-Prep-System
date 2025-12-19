-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_picture_url TEXT,
  bio TEXT,
  phone VARCHAR(20),
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pre-Interview Setup Table
CREATE TABLE IF NOT EXISTS pre_interview_setup (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  difficulty_level VARCHAR(50) NOT NULL CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  interview_type VARCHAR(50) NOT NULL CHECK (interview_type IN ('technical', 'behavioral')),
  resume_url TEXT,
  resume_filename VARCHAR(255),
  resume_content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interview Sessions Table
CREATE TABLE IF NOT EXISTS interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pre_interview_setup_id UUID REFERENCES pre_interview_setup(id) ON DELETE SET NULL,
  title VARCHAR(255),
  duration_seconds INTEGER,
  score DECIMAL(5, 2),
  transcript TEXT,
  emotion_analysis JSONB,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Reports Table
CREATE TABLE IF NOT EXISTS performance_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES interview_sessions(id) ON DELETE CASCADE,
  communication_score DECIMAL(5, 2),
  technical_score DECIMAL(5, 2),
  confidence_score DECIMAL(5, 2),
  overall_score DECIMAL(5, 2),
  strengths TEXT,
  improvements TEXT,
  recommendations TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_pre_interview_setup_user_id ON pre_interview_setup(user_id);
CREATE INDEX IF NOT EXISTS idx_pre_interview_setup_created_at ON pre_interview_setup(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user_id ON interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_created_at ON interview_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_performance_reports_session_id ON performance_reports(session_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pre_interview_setup ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for Pre-Interview Setup
CREATE POLICY "Users can view their own setup" ON pre_interview_setup
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own setup" ON pre_interview_setup
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for Interview Sessions
CREATE POLICY "Users can view their own interviews" ON interview_sessions
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own interviews" ON interview_sessions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for Performance Reports
CREATE POLICY "Users can view their own reports" ON performance_reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = performance_reports.session_id
      AND interview_sessions.user_id::text = auth.uid()::text
    )
  );
