
-- Create storage bucket for news images
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true);

-- Allow anyone to view news images
CREATE POLICY "Anyone can view news images"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

-- Allow authenticated uploads (admin via service role will bypass RLS anyway)
CREATE POLICY "Allow upload news images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'news-images');

CREATE POLICY "Allow update news images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'news-images');

CREATE POLICY "Allow delete news images"
ON storage.objects FOR DELETE
USING (bucket_id = 'news-images');
