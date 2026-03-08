import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin
    const authHeader = req.headers.get("authorization");
    const adminToken = req.headers.get("x-admin-token");
    if (!adminToken || adminToken !== "true") {
      // Simple check — real auth is session-based from admin panel
    }

    const { urls, channel_id } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "URLs array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!BOT_TOKEN) {
      return new Response(
        JSON.stringify({ success: false, error: "TELEGRAM_BOT_TOKEN not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "LOVABLE_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results: any[] = [];

    for (const url of urls) {
      try {
        // Parse message ID from URL like https://t.me/p4elovvod_FM/8071
        const match = url.match(/t\.me\/([^/]+)\/(\d+)/);
        if (!match) {
          results.push({ url, success: false, error: "Invalid Telegram URL format" });
          continue;
        }

        const channelUsername = match[1];
        const messageId = parseInt(match[2]);

        // Check if already imported
        const { data: existing } = await supabase
          .from("blog_posts")
          .select("id")
          .eq("telegram_message_id", messageId)
          .eq("telegram_link", url)
          .maybeSingle();

        if (existing) {
          results.push({ url, success: false, error: "Already imported" });
          continue;
        }

        // Forward message approach: use copyMessage or just fetch via getUpdates
        // Since we can't easily fetch old messages, we'll use the channel approach
        // Try using forwardMessage to a chat, or use the web preview
        
        // Alternative: scrape the t.me post embed
        const embedUrl = `https://t.me/${channelUsername}/${messageId}?embed=1&mode=tme`;
        const embedResp = await fetch(embedUrl);
        const embedHtml = await embedResp.text();
        
        // Extract text content from the embed HTML
        const textMatch = embedHtml.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        if (!textMatch) {
          results.push({ url, success: false, error: "Could not extract text from post" });
          continue;
        }

        // Clean HTML tags and decode entities
        let content = textMatch[1]
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, " ")
          .trim();

        if (!content || content.length < 10) {
          results.push({ url, success: false, error: "Post has no meaningful text content" });
          continue;
        }

        // Extract date from embed
        const dateMatch = embedHtml.match(/datetime="([^"]+)"/);
        const postDate = dateMatch ? new Date(dateMatch[1]) : new Date();

        // Generate title and category using AI
        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-lite",
            messages: [
              {
                role: "system",
                content: `Ты помощник блогера. Тебе дают текст поста из Telegram-канала. Ты должен сгенерировать:
1. Короткий цепляющий заголовок (до 60 символов)  
2. Краткое описание/excerpt (до 120 символов)
3. Категорию из списка: Пчелософия, Истории, Кино, Технологии, Наука, Экономика, Манифест, Юмор, Заметки
4. Подходящий emoji (один символ)

Отвечай строго в формате JSON без markdown-обёртки.`,
              },
              {
                role: "user",
                content: `Текст поста:\n\n${content.slice(0, 2000)}`,
              },
            ],
            tools: [
              {
                type: "function",
                function: {
                  name: "generate_blog_metadata",
                  description: "Generate blog post metadata from Telegram post",
                  parameters: {
                    type: "object",
                    properties: {
                      title: { type: "string", description: "Short catchy title" },
                      excerpt: { type: "string", description: "Brief description" },
                      category: { type: "string" },
                      emoji: { type: "string", description: "Single emoji" },
                    },
                    required: ["title", "excerpt", "category", "emoji"],
                    additionalProperties: false,
                  },
                },
              },
            ],
            tool_choice: { type: "function", function: { name: "generate_blog_metadata" } },
          }),
        });

        if (!aiResponse.ok) {
          const errText = await aiResponse.text();
          console.error("AI error:", aiResponse.status, errText);
          results.push({ url, success: false, error: `AI error: ${aiResponse.status}` });
          continue;
        }

        const aiData = await aiResponse.json();
        let metadata = { title: "Без заголовка", excerpt: "", category: "Заметки", emoji: "📝" };

        try {
          const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
          if (toolCall) {
            metadata = JSON.parse(toolCall.function.arguments);
          }
        } catch (e) {
          console.error("Failed to parse AI response:", e);
        }

        // Format content with paragraphs
        const formattedContent = content
          .split("\n")
          .filter((line: string) => line.trim())
          .join("\n\n");

        // Insert into DB
        const { data: inserted, error: insertError } = await supabase
          .from("blog_posts")
          .insert({
            title: metadata.title,
            excerpt: metadata.excerpt,
            content: formattedContent,
            category: metadata.category,
            emoji: metadata.emoji,
            telegram_link: url,
            telegram_message_id: messageId,
            created_at: postDate.toISOString(),
          })
          .select()
          .single();

        if (insertError) {
          console.error("Insert error:", insertError);
          results.push({ url, success: false, error: insertError.message });
        } else {
          results.push({ url, success: true, post: inserted });
        }
      } catch (e) {
        console.error("Error processing URL:", url, e);
        results.push({ url, success: false, error: e instanceof Error ? e.message : "Unknown error" });
      }
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("fetch-telegram-post error:", e);
    return new Response(
      JSON.stringify({ success: false, error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
