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

    if (!game_type || !['slots', 'coinflip', 'scratch'].includes(game_type)) {
      return new Response(JSON.stringify({ error: 'Invalid game type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get IP from headers
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('cf-connecting-ip') 
      || 'unknown';

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Check if this IP played any game in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentAttempts } = await supabase
      .from('game_attempts')
      .select('*')
      .eq('ip_address', ip)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .limit(1);

    if (recentAttempts && recentAttempts.length > 0) {
      const lastAttempt = recentAttempts[0];
      const nextPlayDate = new Date(lastAttempt.created_at);
      nextPlayDate.setDate(nextPlayDate.getDate() + 30);

      return new Response(JSON.stringify({
        allowed: false,
        message: 'Вы уже играли в этом месяце',
        next_play_date: nextPlayDate.toISOString(),
        last_won: lastAttempt.won,
        last_key: lastAttempt.key_awarded,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 20% chance to win
    const won = Math.random() < 0.2;
    let keyAwarded: string | null = null;

    if (won) {
      // Try to get an available trial key
      const { data: availableKey } = await supabase
        .from('trial_keys')
        .select('*')
        .is('assigned_ip', null)
        .limit(1)
        .single();

      if (availableKey) {
        keyAwarded = availableKey.key;
        
        // Mark key as assigned
        await supabase
          .from('trial_keys')
          .update({ assigned_ip: ip, assigned_at: new Date().toISOString() })
          .eq('id', availableKey.id);
      }
    }

    // Record the attempt
    await supabase.from('game_attempts').insert({
      ip_address: ip,
      game_type,
      won: won && !!keyAwarded,
      key_awarded: keyAwarded,
    });

    return new Response(JSON.stringify({
      allowed: true,
      won: won && !!keyAwarded,
      key: keyAwarded,
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
