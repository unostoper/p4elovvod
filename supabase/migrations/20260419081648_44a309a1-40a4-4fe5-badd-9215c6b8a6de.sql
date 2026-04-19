
-- Posts
CREATE TABLE public.zeroblog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  emoji text DEFAULT '✨',
  media jsonb NOT NULL DEFAULT '[]'::jsonb,
  tg_message_id bigint,
  tg_chat_id bigint,
  published boolean NOT NULL DEFAULT true,
  views integer NOT NULL DEFAULT 0,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX zeroblog_posts_tg_unique ON public.zeroblog_posts (tg_chat_id, tg_message_id) WHERE tg_message_id IS NOT NULL;
CREATE INDEX zeroblog_posts_published_at_idx ON public.zeroblog_posts (published_at DESC);

ALTER TABLE public.zeroblog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published posts"
  ON public.zeroblog_posts FOR SELECT
  USING (published = true);

-- Settings
CREATE TABLE public.zeroblog_settings (
  id int PRIMARY KEY CHECK (id = 1),
  site_title text NOT NULL DEFAULT 'ZeroBlog',
  site_description text NOT NULL DEFAULT 'Личный дневник из 2005-го',
  accent_color text NOT NULL DEFAULT '#ff00ff',
  author_name text NOT NULL DEFAULT 'Admin',
  tg_channel text DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.zeroblog_settings (id) VALUES (1);

ALTER TABLE public.zeroblog_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read settings"
  ON public.zeroblog_settings FOR SELECT
  USING (true);

-- TG offset state
CREATE TABLE public.zeroblog_tg_state (
  id int PRIMARY KEY CHECK (id = 1),
  update_offset bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.zeroblog_tg_state (id) VALUES (1);

ALTER TABLE public.zeroblog_tg_state ENABLE ROW LEVEL SECURITY;
-- no policies = no client access

-- updated_at trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.zeroblog_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER zeroblog_posts_touch
  BEFORE UPDATE ON public.zeroblog_posts
  FOR EACH ROW EXECUTE FUNCTION public.zeroblog_touch_updated_at();

CREATE TRIGGER zeroblog_settings_touch
  BEFORE UPDATE ON public.zeroblog_settings
  FOR EACH ROW EXECUTE FUNCTION public.zeroblog_touch_updated_at();

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('zeroblog-media', 'zeroblog-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read zeroblog media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'zeroblog-media');
