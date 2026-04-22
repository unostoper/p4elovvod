-- Универсальная таблица для редактируемых блоков сайта
CREATE TABLE IF NOT EXISTS public.site_blocks (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_blocks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site_blocks" ON public.site_blocks;
CREATE POLICY "Public read site_blocks"
  ON public.site_blocks
  FOR SELECT
  USING (true);

DROP TRIGGER IF EXISTS trg_site_blocks_touch ON public.site_blocks;
CREATE TRIGGER trg_site_blocks_touch
  BEFORE UPDATE ON public.site_blocks
  FOR EACH ROW
  EXECUTE FUNCTION public.zeroblog_touch_updated_at();

-- Сидим дефолтные блоки
INSERT INTO public.site_blocks (key, data) VALUES
  ('hero', '{
    "title": "ZeroBlog",
    "subtitle": "Личный дневник из 2005-го",
    "footnote": "Best viewed in Internet Explorer 6 @ 1024×768",
    "showCursor": true
  }'::jsonb),
  ('marquee_top', '{
    "text": "✦ Welcome to my homepage! ✦ Sign my guestbook! ✦ Don''t forget to bookmark! ✦ New posts every week! ✦ This site is best viewed with Netscape Navigator ✦"
  }'::jsonb),
  ('nav', '{
    "items": [
      {"to": "/", "label": "★ HOME"},
      {"to": "/archive", "label": "📁 ARCHIVE"},
      {"to": "/about", "label": "👤 ABOUT ME"},
      {"to": "/admin", "label": "🔐 ADMIN"}
    ]
  }'::jsonb),
  ('banners', '{
    "items": [
      {"label": "★ NETSCAPE NOW! ★", "color": "neon-pink", "href": ""},
      {"label": "♥ MADE WITH LOVE ♥", "color": "neon-cyan", "href": ""},
      {"label": "✦ Y2K READY ✦", "color": "neon-lime", "href": ""},
      {"label": "» 56K MODEM «", "color": "neon-yellow", "href": ""}
    ]
  }'::jsonb),
  ('sidebar_about', '{
    "title": "★ About me",
    "lines": [
      "Имя: Anonymous",
      "Возраст: ∞",
      "Город: Internet",
      "Настроение: 🦄 nostalgic"
    ]
  }'::jsonb),
  ('sidebar_links', '{
    "title": "→ Links",
    "items": [
      {"label": "GeoCities mirror", "href": "#"},
      {"label": "Old web webring", "href": "#"},
      {"label": "Guestbook", "href": "#"}
    ]
  }'::jsonb),
  ('sidebar_friends', '{
    "title": "♥ Friends",
    "items": [
      {"label": "★ Cool Site #1", "href": "#"},
      {"label": "★ Cool Site #2", "href": "#"}
    ]
  }'::jsonb),
  ('sidebar_now_playing', '{
    "title": "♫ Now playing",
    "track": "t.A.T.u. — All The Things She Said",
    "marquee": true
  }'::jsonb),
  ('about_page', '{
    "title": "👤 About me",
    "avatar": "",
    "bio": "Привет! Я веду этот блог с 2005-го (мысленно). Тут будет всё, что я думаю о жизни, музыке и интернете.",
    "facts": [
      "Любимый браузер: Netscape Navigator",
      "Любимая ОС: Windows XP",
      "Любимая музыка: Eurobeat, Nu-metal, поп-2003",
      "Любимый напиток: Pepsi с лимоном"
    ]
  }'::jsonb),
  ('footer', '{
    "copyright": "© 2005–∞ ZeroBlog. Все права на ностальгию защищены.",
    "links": [
      {"label": "RSS 0.91", "href": "#"},
      {"label": "Webmaster", "href": "mailto:hi@example.com"}
    ],
    "tagline": "Powered by HTML, CSS и магией пятницы"
  }'::jsonb)
ON CONFLICT (key) DO NOTHING;