
-- Table for trial VPN keys
CREATE TABLE public.trial_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  assigned_ip TEXT DEFAULT NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.trial_keys ENABLE ROW LEVEL SECURITY;

-- Anyone can read assigned keys (edge function uses service role anyway)
CREATE POLICY "Public read trial_keys" ON public.trial_keys FOR SELECT USING (true);
CREATE POLICY "Service insert trial_keys" ON public.trial_keys FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update trial_keys" ON public.trial_keys FOR UPDATE USING (true);
CREATE POLICY "Service delete trial_keys" ON public.trial_keys FOR DELETE USING (true);
