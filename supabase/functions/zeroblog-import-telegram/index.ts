import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev/telegram";
const isValidToken = (t: unknown) => typeof t === "string" && t.length >= 16;

const tg = async (method: string, body?: unknown) => {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY");
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");
  if (!TELEGRAM_API_KEY) throw new Error("TELEGRAM_API_KEY missing");
  const r = await fetch(`${GATEWAY}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": TELEGRAM_API_KEY,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : "{}",
  });
  const data = await r.json();
  if (!r.ok || !data.ok) {
    throw new Error(`Telegram ${method} failed [${r.status}]: ${JSON.stringify(data)}`);
  }
  return data.result;
};

const downloadFile = async (file_id: string, supabase: any): Promise<string | null> => {
  try {
    const fileInfo = await tg("getFile", { file_id });
    const path = fileInfo.file_path;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY");
    const r = await fetch(`${GATEWAY}/file/${path}`, {
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TELEGRAM_API_KEY!,
      },
    });
    if (!r.ok) throw new Error(`download ${r.status}`);
    const bytes = new Uint8Array(await r.arrayBuffer());
    const ext = path.split(".").pop() || "bin";
    const objectName = `${file_id}.${ext}`;
    const contentType =
      ext === "jpg" || ext === "jpeg" ? "image/jpeg"
      : ext === "png" ? "image/png"
      : ext === "gif" ? "image/gif"
      : ext === "webp" ? "image/webp"
      : ext === "mp4" ? "video/mp4"
      : ext === "webm" ? "video/webm"
      : "application/octet-stream";
    const { error } = await supabase.storage.from("zeroblog-media").upload(objectName, bytes, {
      contentType,
      upsert: true,
    });
    if (error && !String(error.message).includes("exists")) throw error;
    const { data } = supabase.storage.from("zeroblog-media").getPublicUrl(objectName);
    return data.publicUrl;
  } catch (e) {
    console.error("downloadFile error", e);
    return null;
  }
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { token } = await req.json().catch(() => ({}));
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

    // Read offset
    const { data: state } = await supabase
      .from("zeroblog_tg_state")
      .select("update_offset")
      .eq("id", 1)
      .single();
    let offset = state?.update_offset || 0;

    let imported = 0;
    let totalUpdates = 0;
    const errors: string[] = [];

    // Drain updates (no long-poll, just fetch what's queued)
    for (let iter = 0; iter < 20; iter++) {
      const updates: any[] = await tg("getUpdates", {
        offset,
        timeout: 0,
        allowed_updates: ["channel_post", "edited_channel_post"],
      });
      if (!updates.length) break;
      totalUpdates += updates.length;

      // Group media-groups together
      const groups: Record<string, any[]> = {};
      const singles: any[] = [];
      for (const u of updates) {
        const msg = u.channel_post || u.edited_channel_post;
        if (!msg) continue;
        if (msg.media_group_id) {
          (groups[msg.media_group_id] ||= []).push(msg);
        } else {
          singles.push(msg);
        }
      }

      const processMessage = async (msg: any, extraMedia: any[] = []) => {
        try {
          const text: string = msg.caption || msg.text || "";
          const firstLine = text.split("\n")[0]?.slice(0, 200) || "Untitled";
          const media: { url: string; type: string }[] = [...extraMedia];

          const collectFrom = async (m: any) => {
            if (m.photo) {
              const best = m.photo[m.photo.length - 1];
              const url = await downloadFile(best.file_id, supabase);
              if (url) media.push({ url, type: "photo" });
            }
            if (m.video) {
              const url = await downloadFile(m.video.file_id, supabase);
              if (url) media.push({ url, type: "video" });
            }
            if (m.animation) {
              const url = await downloadFile(m.animation.file_id, supabase);
              if (url) media.push({ url, type: "animation" });
            }
            if (m.document) {
              const url = await downloadFile(m.document.file_id, supabase);
              if (url) media.push({ url, type: "document" });
            }
          };
          await collectFrom(msg);

          const row = {
            title: firstLine,
            content: text,
            emoji: "📨",
            media,
            tg_message_id: msg.message_id,
            tg_chat_id: msg.chat.id,
            published: true,
            published_at: new Date(msg.date * 1000).toISOString(),
          };

          // Upsert by (tg_chat_id, tg_message_id)
          const { error } = await supabase
            .from("zeroblog_posts")
            .upsert(row, { onConflict: "tg_chat_id,tg_message_id" });
          if (error) throw error;
          imported++;
        } catch (e) {
          errors.push(String((e as Error).message));
        }
      };

      for (const msg of singles) await processMessage(msg);

      for (const groupMsgs of Object.values(groups)) {
        // Sort by message_id, use first as the post, collect media from all
        groupMsgs.sort((a, b) => a.message_id - b.message_id);
        const head = groupMsgs[0];
        const extraMedia: { url: string; type: string }[] = [];
        for (let i = 1; i < groupMsgs.length; i++) {
          const m = groupMsgs[i];
          if (m.photo) {
            const best = m.photo[m.photo.length - 1];
            const url = await downloadFile(best.file_id, supabase);
            if (url) extraMedia.push({ url, type: "photo" });
          }
          if (m.video) {
            const url = await downloadFile(m.video.file_id, supabase);
            if (url) extraMedia.push({ url, type: "video" });
          }
        }
        await processMessage(head, extraMedia);
      }

      offset = Math.max(...updates.map((u) => u.update_id)) + 1;
      await supabase
        .from("zeroblog_tg_state")
        .update({ update_offset: offset, updated_at: new Date().toISOString() })
        .eq("id", 1);
    }

    return new Response(
      JSON.stringify({ ok: true, totalUpdates, imported, errors, finalOffset: offset }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
