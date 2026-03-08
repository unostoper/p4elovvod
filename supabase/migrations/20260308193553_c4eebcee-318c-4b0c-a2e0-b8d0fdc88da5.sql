
CREATE TABLE public.game_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  game_type text NOT NULL,
  won boolean NOT NULL DEFAULT false,
  key_awarded text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.game_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert game attempts" ON public.game_attempts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read own attempts" ON public.game_attempts
  FOR SELECT USING (true);
