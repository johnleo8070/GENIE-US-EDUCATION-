-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'parent')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update timestamps automatically
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_children_updated_at ON public.children;
CREATE TRIGGER update_children_updated_at
  BEFORE UPDATE ON public.children
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_progress_updated_at ON public.progress;
CREATE TRIGGER update_progress_updated_at
  BEFORE UPDATE ON public.progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Update child stats when progress is recorded
CREATE OR REPLACE FUNCTION public.update_child_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  today DATE := CURRENT_DATE;
  last_date DATE;
  current_str INTEGER;
BEGIN
  -- Get the child's last activity date and current streak
  SELECT last_activity_date, current_streak INTO last_date, current_str
  FROM public.children WHERE id = NEW.child_id;

  -- Update total stars
  UPDATE public.children 
  SET total_stars = total_stars + NEW.stars_earned,
      last_activity_date = today,
      current_streak = CASE
        WHEN last_date IS NULL THEN 1
        WHEN last_date = today THEN current_str
        WHEN last_date = today - 1 THEN current_str + 1
        ELSE 1
      END,
      longest_streak = GREATEST(
        longest_streak,
        CASE
          WHEN last_date IS NULL THEN 1
          WHEN last_date = today THEN current_str
          WHEN last_date = today - 1 THEN current_str + 1
          ELSE 1
        END
      )
  WHERE id = NEW.child_id;

  -- Log the activity
  INSERT INTO public.activity_log (child_id, activity_type, subject, description, stars_earned)
  VALUES (
    NEW.child_id,
    'lesson',
    NEW.subject,
    'Completed ' || NEW.module_id || ' - ' || NEW.lesson_id,
    NEW.stars_earned
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_progress_insert ON public.progress;
CREATE TRIGGER on_progress_insert
  AFTER INSERT ON public.progress
  FOR EACH ROW
  WHEN (NEW.completed = TRUE)
  EXECUTE FUNCTION public.update_child_stats();
