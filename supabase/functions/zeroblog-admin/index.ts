import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const isValidToken = (t: unknown) => typeof t === "string" && t.length >= 16;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { action, token } = body || {};

    if (!isValidToken(token)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (action === "save_post") {
      const p = body.post || {};
      const row = {
        title: String(p.title || "").slice(0, 500),
        content: String(p.content || ""),
        emoji: String(p.emoji || "✨").slice(0, 8),
        media: Array.isArray(p.media) ? p.media : [],
        published: Boolean(p.published),
      };
      if (p.id) {
        const { error } = await supabase.from("zeroblog_posts").update(row).eq("id", p.id);
        if (error) throw error;
        return new Response(JSON.stringify({ ok: true, id: p.id }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        const { data, error } = await supabase
          .from("zeroblog_posts")
          .insert({ ...row, published_at: new Date().toISOString() })
          .select("id")
          .single();
        if (error) throw error;
        return new Response(JSON.stringify({ ok: true, id: data.id }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    if (action === "delete_post") {
      const { error } = await supabase.from("zeroblog_posts").delete().eq("id", body.id);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "save_settings") {
      const s = body.settings || {};
      const row = {
        site_title: String(s.site_title || "ZeroBlog").slice(0, 200),
        site_description: String(s.site_description || "").slice(0, 500),
        accent_color: String(s.accent_color || "#ff00ff").slice(0, 32),
        author_name: String(s.author_name || "Admin").slice(0, 100),
        tg_channel: String(s.tg_channel || "").slice(0, 200),
      };
      const { error } = await supabase.from("zeroblog_settings").update(row).eq("id", 1);
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "save_block") {
      const key = String(body.key || "").slice(0, 64);
      const data = body.data ?? {};
      if (!key) throw new Error("Missing key");
      const { error } = await supabase
        .from("site_blocks")
        .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "list_blocks") {
      const { data, error } = await supabase.from("site_blocks").select("key, data, updated_at");
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, blocks: data || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
