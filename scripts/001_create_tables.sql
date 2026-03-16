-- Create profiles table for parent users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'admin')),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'family')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired')),
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create children table for kid profiles
CREATE TABLE IF NOT EXISTS public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avatar TEXT DEFAULT 'panda',
  age INTEGER CHECK (age >= 2 AND age <= 7),
  total_stars INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create progress table for tracking learning progress
CREATE TABLE IF NOT EXISTS public.progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  subject TEXT NOT NULL CHECK (subject IN ('english', 'maths', 'science', 'coding', 'music')),
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  module_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  stars_earned INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- in seconds
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, subject, module_id, lesson_id)
);

-- Create achievements/badges table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, badge_type)
);

-- Create stories progress table
CREATE TABLE IF NOT EXISTS public.story_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  story_id TEXT NOT NULL,
  current_scene INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  watched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id, story_id)
);

-- Create activity log for parent dashboard
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('lesson', 'game', 'story', 'worksheet', 'achievement')),
  subject TEXT,
  description TEXT NOT NULL,
  stars_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for children (parent can manage their children)
CREATE POLICY "children_select_own" ON public.children FOR SELECT USING (parent_id = auth.uid());
CREATE POLICY "children_insert_own" ON public.children FOR INSERT WITH CHECK (parent_id = auth.uid());
CREATE POLICY "children_update_own" ON public.children FOR UPDATE USING (parent_id = auth.uid());
CREATE POLICY "children_delete_own" ON public.children FOR DELETE USING (parent_id = auth.uid());

-- RLS Policies for progress (through child ownership)
CREATE POLICY "progress_select_own" ON public.progress FOR SELECT 
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));
CREATE POLICY "progress_insert_own" ON public.progress FOR INSERT 
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));
CREATE POLICY "progress_update_own" ON public.progress FOR UPDATE 
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- RLS Policies for achievements
CREATE POLICY "achievements_select_own" ON public.achievements FOR SELECT 
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));
CREATE POLICY "achievements_insert_own" ON public.achievements FOR INSERT 
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- RLS Policies for story_progress
CREATE POLICY "story_progress_select_own" ON public.story_progress FOR SELECT 
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));
CREATE POLICY "story_progress_insert_own" ON public.story_progress FOR INSERT 
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));
CREATE POLICY "story_progress_update_own" ON public.story_progress FOR UPDATE 
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- RLS Policies for activity_log
CREATE POLICY "activity_log_select_own" ON public.activity_log FOR SELECT 
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));
CREATE POLICY "activity_log_insert_own" ON public.activity_log FOR INSERT 
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_children_parent_id ON public.children(parent_id);
CREATE INDEX IF NOT EXISTS idx_progress_child_id ON public.progress(child_id);
CREATE INDEX IF NOT EXISTS idx_progress_subject ON public.progress(subject);
CREATE INDEX IF NOT EXISTS idx_achievements_child_id ON public.achievements(child_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_child_id ON public.activity_log(child_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log(created_at DESC);
