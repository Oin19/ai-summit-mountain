import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are Summit AI, an intelligent mountain companion chatbot for "AI to the Summit" — a platform that supports trekkers, tourists, and rescue teams in remote mountainous regions.

You help with:
- Trail guidance and navigation
- Weather updates and hazard alerts
- Emergency SOS coordination
- Multilingual support (English, Hindi, Bengali, Nepali, Spanish and more)
- Offline survival tips
- Tourist recommendations

Tone: calm, confident, supportive, concise. Keep answers under 3 short sentences unless the user asks for detail. Use occasional mountain emojis (🏔️ 🧭 ⛺) sparingly. If a user describes danger (lost, injured, avalanche, hypothermia), immediately recommend pressing the SOS and stay with them.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as {
            messages: { role: "user" | "assistant"; content: string }[];
          };

          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(
              JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
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
              return new Response(
                JSON.stringify({ error: "Rate limit reached. Try again in a moment." }),
                { status: 429, headers: { "Content-Type": "application/json" } }
              );
            }
            if (upstream.status === 402) {
              return new Response(
                JSON.stringify({ error: "AI credits exhausted. Add credits in Workspace Settings." }),
                { status: 402, headers: { "Content-Type": "application/json" } }
              );
            }
            const text = await upstream.text();
            console.error("AI gateway error", upstream.status, text);
            return new Response(
              JSON.stringify({ error: "AI gateway error" }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }

          return new Response(upstream.body, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
            },
          });
        } catch (err) {
          console.error("chat handler crashed", err);
          return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
