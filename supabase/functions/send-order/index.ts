import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, telegram, phone, email, productTitle, productPrice, type } = await req.json();

    const isKeyRequest = type === "key";

    if (!firstName || (!isKeyRequest && (!email || !phone))) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!BOT_TOKEN) {
      return new Response(
        JSON.stringify({ error: "TELEGRAM_BOT_TOKEN not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const CHAT_ID = Deno.env.get("TELEGRAM_ORDER_CHAT_ID");
    if (!CHAT_ID) {
      return new Response(
        JSON.stringify({ error: "TELEGRAM_ORDER_CHAT_ID not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const lines = [
      `🛒 <b>Новый заказ!</b>`,
      ``,
      `<b>Товар:</b> ${productTitle}`,
      `<b>Цена:</b> ${productPrice}`,
      ``,
      `<b>Имя:</b> ${firstName}`,
      lastName ? `<b>Фамилия:</b> ${lastName}` : null,
      telegram ? `<b>Telegram:</b> @${telegram.replace(/^@/, "")}` : null,
      `<b>Тел:</b> ${phone}`,
      `<b>Email:</b> ${email}`,
    ].filter(Boolean).join("\n");

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: lines,
        parse_mode: "HTML",
      }),
    });

    const tgData = await tgRes.json();
    if (!tgRes.ok) {
      console.error("Telegram API error:", tgData);
      return new Response(
        JSON.stringify({ error: "Failed to send notification" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("send-order error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
