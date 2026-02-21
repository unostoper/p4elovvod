import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get client IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    // Check if this IP already has a key
    const { data: existing } = await supabase
      .from("trial_keys")
      .select("key")
      .eq("assigned_ip", ip)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ key: existing.key }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Find an unassigned key
    const { data: freeKey, error: fetchErr } = await supabase
      .from("trial_keys")
      .select("id, key")
      .is("assigned_ip", null)
      .limit(1)
      .maybeSingle();

    if (fetchErr) throw fetchErr;

    if (!freeKey) {
      return new Response(
        JSON.stringify({ error: "no_keys", message: "Свободные ключи закончились" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Assign the key to this IP
    const { error: updateErr } = await supabase
      .from("trial_keys")
      .update({ assigned_ip: ip, assigned_at: new Date().toISOString() })
      .eq("id", freeKey.id);

    if (updateErr) throw updateErr;

    return new Response(JSON.stringify({ key: freeKey.key }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "server_error", message: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
