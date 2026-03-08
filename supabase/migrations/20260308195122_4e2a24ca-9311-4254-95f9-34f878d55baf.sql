
CREATE TABLE public.site_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  path text NOT NULL DEFAULT '/',
  user_agent text,
  referrer text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_site_visits_ip ON public.site_visits (ip_address);
CREATE INDEX idx_site_visits_created_at ON public.site_visits (created_at);

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert visits" ON public.site_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read visit count" ON public.site_visits FOR SELECT USING (true);
