import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    if (req.method === 'POST') {
      const { path, referrer } = await req.json().catch(() => ({ path: '/', referrer: null }));

      const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || req.headers.get('cf-connecting-ip')
        || 'unknown';

      const userAgent = req.headers.get('user-agent') || null;

      await supabase.from('site_visits').insert({
        ip_address: ip,
        path: path || '/',
        user_agent: userAgent,
        referrer: referrer || null,
      });

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'GET') {
      const url = new URL(req.url);
      const mode = url.searchParams.get('mode');

      // Simple count for footer
      if (!mode || mode === 'count') {
        const { data } = await supabase.from('site_visits').select('ip_address');
        const uniqueIps = new Set(data?.map(r => r.ip_address));
        return new Response(JSON.stringify({ unique_visitors: uniqueIps.size }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Full analytics for admin
      if (mode === 'analytics') {
        const { data: allVisits } = await supabase
          .from('site_visits')
          .select('ip_address, path, referrer, created_at')
          .order('created_at', { ascending: false })
          .limit(10000);

        const visits = allVisits || [];

        // Visits by day (last 30 days)
        const byDay: Record<string, { total: number; unique: Set<string> }> = {};
        const now = new Date();
        for (let i = 29; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          byDay[key] = { total: 0, unique: new Set() };
        }

        visits.forEach(v => {
          const day = v.created_at.slice(0, 10);
          if (byDay[day]) {
            byDay[day].total++;
            byDay[day].unique.add(v.ip_address);
          }
        });

        const visitsByDay = Object.entries(byDay).map(([date, d]) => ({
          date,
          total: d.total,
          unique: d.unique.size,
        }));

        // Popular pages
        const pageCounts: Record<string, number> = {};
        visits.forEach(v => {
          pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
        });
        const popularPages = Object.entries(pageCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([path, count]) => ({ path, count }));

        // Referrers
        const refCounts: Record<string, number> = {};
        visits.forEach(v => {
          if (v.referrer) {
            try {
              const host = new URL(v.referrer).hostname || v.referrer;
              refCounts[host] = (refCounts[host] || 0) + 1;
            } catch {
              refCounts[v.referrer] = (refCounts[v.referrer] || 0) + 1;
            }
          } else {
            refCounts['Прямой заход'] = (refCounts['Прямой заход'] || 0) + 1;
          }
        });
        const referrers = Object.entries(refCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([source, count]) => ({ source, count }));

        // Totals
        const uniqueIps = new Set(visits.map(v => v.ip_address));

        return new Response(JSON.stringify({
          total_visits: visits.length,
          unique_visitors: uniqueIps.size,
          visits_by_day: visitsByDay,
          popular_pages: popularPages,
          referrers,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Unknown mode' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
