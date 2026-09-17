import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const SYSTEM_PROMPT = `You are Summit AI, an intelligent mountain companion chatbot for "AI to the Summit": a platform that supports trekkers, tourists, and rescue teams in remote mountainous regions.

You help with:
- Trail guidance and navigation
- Weather updates and hazard alerts
- Emergency SOS coordination
- Multilingual support (English, Hindi, Bengali, Nepali, Spanish and more)
- Offline survival tips
- Tourist recommendations

Tone: calm, confident, supportive, concise. Keep answers under 3 short sentences unless the user asks for detail. Use occasional mountain emojis (🏔️ 🧭 ⛺) sparingly. If a user describes danger (lost, injured, avalanche, hypothermia), immediately recommend pressing the SOS and stay with them.`;

const PayloadSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      })
    )
    .min(1)
    .max(50),
});

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // --- Authentication: require a valid Supabase JWT ---
          const authHeader = request.headers.get("authorization") ?? "";
          if (!authHeader.startsWith("Bearer ")) {
            return json(401, { error: "Authentication required" });
          }
          const token = authHeader.slice("Bearer ".length).trim();
          if (!token) return json(401, { error: "Authentication required" });

          const SUPABASE_URL = process.env.SUPABASE_URL;
          const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
          if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
            console.error("Missing Supabase env vars");
            return json(500, { error: "Internal server error" });
          }
          const sb = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { data: claimsData, error: claimsErr } = await sb.auth.getClaims(token);
          if (claimsErr || !claimsData?.claims?.sub) {
            return json(401, { error: "Invalid or expired session" });
          }

          // --- Input validation ---
          let raw: unknown;
          try {
            raw = await request.json();
          } catch {
            return json(400, { error: "Invalid JSON" });
          }
          const parsed = PayloadSchema.safeParse(raw);
          if (!parsed.success) {
            return json(400, { error: "Invalid payload" });
          }
          const { messages } = parsed.data;

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            console.error("LOVABLE_API_KEY not configured");
            return json(500, { error: "Internal server error" });
          }

          const upstream = await fetch(
            "https://ai.gateway.lovable.dev/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-3-flash-preview",
                stream: true,
                messages: [
                  { role: "system", content: SYSTEM_PROMPT },
                  ...messages,
                ],
              }),
            }
          );

          if (!upstream.ok) {
            if (upstream.status === 429) {
              return json(429, { error: "Rate limit reached. Try again in a moment." });
            }
            if (upstream.status === 402) {
              return json(402, { error: "AI credits exhausted. Add credits in Workspace Settings." });
            }
            const text = await upstream.text();
            console.error("AI gateway error", upstream.status, text);
            return json(500, { error: "AI gateway error" });
          }

          return new Response(upstream.body, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
            },
          });
        } catch (err) {
          console.error("chat handler crashed", err);
          return json(500, { error: "Internal server error" });
        }
      },
    },
  },
});
