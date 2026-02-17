
-- Table for editable site content blocks (JSONB per block)
CREATE TABLE public.site_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read content (public site)
CREATE POLICY "Anyone can read site content"
ON public.site_content FOR SELECT USING (true);

-- Insert/update allowed without auth (secret link approach)
CREATE POLICY "Allow insert site content"
ON public.site_content FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update site content"
ON public.site_content FOR UPDATE USING (true);

-- Seed default content blocks
INSERT INTO public.site_content (id, content) VALUES
('hero', '{"badge":"VPN без мучений","title":"Интернет должен работать, а не бороться с вами","subtitle":"Готовые VPN‑ключи без настроек и переключений. Подключил — и всё работает.","cta_primary":"Получить пробный ключ","cta_secondary":"Купить ключ"}'::jsonb),
('advantages', '{"title":"Почему это работает","items":[{"title":"Никаких настроек","desc":"Вставил ключ — работает. Без танцев с бубном и чтения мануалов на английском."},{"title":"Максимальная скорость","desc":"Весь канал твоего провайдера. Ни мегабита мимо."},{"title":"Стабильное соединение","desc":"Не отваливается в самый интересный момент. Проверено на сериалах."},{"title":"Подходит всем","desc":"Даже твоему коту. Особенно твоему коту."}]}'::jsonb),
('how_it_works', '{"title":"Как это работает","steps":[{"num":"01","title":"Получаешь ключ","desc":"Пробный или платный — оба настоящие."},{"num":"02","title":"Вставляешь в приложение","desc":"Копировать - вставить. Ты это умеешь."},{"num":"03","title":"Интернет работает","desc":"Вот и всё. Серьёзно, всё."}]}'::jsonb),
('reviews', '{"title":"Что говорят почти живые люди","items":[{"name":"Алексей","text":"Купил ключ, вставил в Outline, всё заработало. Потратил 30 секунд. Остальное время смотрел YouTube без рекламы."},{"name":"Марина","text":"Настроила маме за 2 минуты по телефону. Мама даже не поняла, что я что-то настраивала. Идеально."},{"name":"Дмитрий","text":"Третий месяц — ни одного обрыва. Раньше менял VPN как носки. Теперь просто пользуюсь."}]}'::jsonb),
('cta', '{"title":"Попробуй и забудь о проблемах","subtitle":"Пробный ключ — бесплатный. Если не понравится — ну, хотя бы попробовал.","cta_primary":"Получить пробный ключ","cta_secondary":"Купить ключ"}'::jsonb),
('news', '{"title":"Новости и обновления","items":[{"date":"2025-06-15","title":"Подключил новые серверы в Европе","desc":"Добавил серверы в Нидерландах и Германии. Скорость для европейского контента стала ещё выше."},{"date":"2025-06-01","title":"Специальный ключ для YouTube","desc":"Запустил отдельный ключ, оптимизированный для просмотра видео. Без рекламы и буферизации."},{"date":"2025-05-20","title":"Обновление протокола VLESS","desc":"Перешёл на последнюю версию VLESS. Соединение стало ещё стабильнее и быстрее."}]}'::jsonb);
