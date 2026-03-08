import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { game_type } = await req.json();

    if (!game_type || !['slots'].includes(game_type)) {
      return new Response(JSON.stringify({ error: 'Invalid game type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('cf-connecting-ip')
      || 'unknown';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Check if this IP won in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentWins } = await supabase
      .from('game_attempts')
      .select('*')
      .eq('ip_address', ip)
      .eq('won', true)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .limit(1);

    if (recentWins && recentWins.length > 0) {
      const lastWin = recentWins[0];
      const nextWinDate = new Date(lastWin.created_at);
      nextWinDate.setDate(nextWinDate.getDate() + 30);

      return new Response(JSON.stringify({
        allowed: false,
        message: 'Ты уже выигрывал в этом месяце',
        next_play_date: nextWinDate.toISOString(),
        last_won: true,
        last_key: lastWin.key_awarded,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check daily attempts (5 per day)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { data: todayAttempts, count } = await supabase
      .from('game_attempts')
      .select('*', { count: 'exact' })
      .eq('ip_address', ip)
      .gte('created_at', todayStart.toISOString());

    const attemptsToday = count ?? (todayAttempts?.length ?? 0);

    if (attemptsToday >= 5) {
      const tomorrow = new Date(todayStart);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return new Response(JSON.stringify({
        allowed: false,
        message: 'Все попытки на сегодня использованы',
        attempts_left: 0,
        next_play_date: tomorrow.toISOString(),
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Win chance: 1/10000
    const won = Math.random() < 0.0001;
    let keyAwarded: string | null = null;

    if (won) {
      const { data: availableKey } = await supabase
        .from('trial_keys')
        .select('*')
        .is('assigned_ip', null)
        .limit(1)
        .single();

      if (availableKey) {
        keyAwarded = availableKey.key;
        await supabase
          .from('trial_keys')
          .update({ assigned_ip: ip, assigned_at: new Date().toISOString() })
          .eq('id', availableKey.id);
      }
    }

    // Record attempt
    await supabase.from('game_attempts').insert({
      ip_address: ip,
      game_type,
      won: won && !!keyAwarded,
      key_awarded: keyAwarded,
    });

    const attemptsLeft = 4 - attemptsToday; // already used attemptsToday, this is the new one

    return new Response(JSON.stringify({
      allowed: true,
      won: won && !!keyAwarded,
      key: keyAwarded,
      attempts_left: Math.max(0, attemptsLeft),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
