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
      // Track a visit
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

      // Return unique visitor count
      const { count } = await supabase
        .from('site_visits')
        .select('ip_address', { count: 'exact', head: false })
        .then(res => {
          // Count distinct IPs manually
          const uniqueIps = new Set(res.data?.map(r => r.ip_address));
          return { count: uniqueIps.size };
        });

      return new Response(JSON.stringify({ ok: true, unique_visitors: count }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'GET') {
      // Just return visitor count
      const { data } = await supabase
        .from('site_visits')
        .select('ip_address');

      const uniqueIps = new Set(data?.map(r => r.ip_address));

      return new Response(JSON.stringify({ unique_visitors: uniqueIps.size }), {
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
