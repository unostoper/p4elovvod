import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { BarChart3, Globe, FileText, Users, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsData {
  total_visits: number;
  unique_visitors: number;
  visits_by_day: { date: string; total: number; unique: number }[];
  popular_pages: { path: string; count: number }[];
  referrers: { source: string; count: number }[];
}

const PAGE_NAMES: Record<string, string> = {
  "/": "Главная",
  "/shop": "Магазин",
  "/blog": "Блог",
  "/news": "Новости",
  "/free-key": "Бесплатный ключ",
  "/confidentiality": "Конфиденциальность",
  "/oferta": "Оферта",
};

const AnalyticsEditor = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-visit?mode=analytics`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      );
      const json = await response.json();
      setData(json);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Загрузка аналитики…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Не удалось загрузить данные
      </div>
    );
  }

  const chartData = data.visits_by_day.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short" }),
  }));

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-gold" />
          Аналитика
        </h2>
        <Button variant="outline" size="sm" onClick={fetchAnalytics} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Обновить
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Eye className="w-4 h-4" />
            Всего просмотров
          </div>
          <p className="text-3xl font-display font-bold">{data.total_visits.toLocaleString("ru-RU")}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Users className="w-4 h-4" />
            Уникальных посетителей
          </div>
          <p className="text-3xl font-display font-bold">{data.unique_visitors.toLocaleString("ru-RU")}</p>
        </div>
      </div>

      {/* Chart: visits by day */}
      <div className="bg-surface border border-border rounded-xl p-5 mb-8">
        <h3 className="font-display font-semibold mb-4">Посещения за 30 дней</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="label"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              interval={Math.floor(chartData.length / 7)}
            />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--surface))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Bar dataKey="total" name="Просмотры" fill="hsl(var(--gold))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="unique" name="Уникальные" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular pages */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gold" />
            Популярные страницы
          </h3>
          <div className="space-y-2">
            {data.popular_pages.map((p, i) => (
              <div key={p.path} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-5">{i + 1}.</span>
                  <span className="text-sm font-medium">{PAGE_NAMES[p.path] || p.path}</span>
                </div>
                <span className="text-sm text-muted-foreground font-mono">{p.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Referrers */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-gold" />
            Источники трафика
          </h3>
          <div className="space-y-2">
            {data.referrers.map((r, i) => (
              <div key={r.source} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-5">{i + 1}.</span>
                  <span className="text-sm font-medium truncate max-w-[200px]">{r.source}</span>
                </div>
                <span className="text-sm text-muted-foreground font-mono">{r.count}</span>
              </div>
            ))}
            {data.referrers.length === 0 && (
              <p className="text-sm text-muted-foreground">Пока нет данных</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsEditor;
