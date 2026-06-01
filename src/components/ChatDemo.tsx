import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Send, Globe, Bot, RotateCcw } from "lucide-react";
import { SectionHeader } from "./Features";

type Msg = { role: "user" | "assistant"; content: string };

const langs = [
  { code: "EN", label: "English" },
  { code: "हिं", label: "Hindi" },
  { code: "বাং", label: "Bengali" },
  { code: "नेपा", label: "Nepali" },
  { code: "ES", label: "Spanish" },
];

const suggestions = [
  "I think I lost my trekking route.",
  "What's the weather risk above 4,000m?",
  "How do I signal for rescue without signal?",
];

const initialAssistant: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Summit AI 🏔️ — ask me about trails, weather, safety or emergencies.",
};

export function ChatDemo() {
  const [messages, setMessages] = useState<Msg[]>([initialAssistant]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState("EN");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setError(null);
    setInput("");

    const language = langs.find((l) => l.code === lang)?.label ?? "English";
    const userMsg: Msg = {
      role: "user",
      content: language === "English" ? trimmed : `${trimmed}\n\n(Please reply in ${language}.)`,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || `Error ${resp.status}`);
      }

      // Append empty assistant message we'll grow as tokens arrive
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;
      let acc = "";

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              acc += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.content === "") return prev.slice(0, -1);
        return prev;
      });
    } finally {
      setLoading(false);
    }
  }

  const reset = () => {
    setMessages([initialAssistant]);
    setError(null);
  };

  return (
    <section id="demo" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Live Demo"
          title="Talk to Summit AI"
          subtitle="A real AI assistant — voice-ready, multilingual, and trained for the mountains."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto glass-strong rounded-3xl overflow-hidden glow-soft"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-neon/15 text-neon shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold">Summit AI Assistant</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                  live · powered by Lovable AI
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 glass rounded-full p-1">
                <Globe className="h-3 w-3 text-muted-foreground ml-2" />
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`text-[10px] px-2 py-1 rounded-full transition-colors ${
                      lang === l.code
                        ? "bg-neon text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.code}
                  </button>
                ))}
              </div>
              <button
                onClick={reset}
                className="p-2 rounded-full glass hover:text-neon transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="p-6 space-y-3 min-h-[360px] max-h-[440px] overflow-y-auto"
          >
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-neon/15 rounded-tr-sm"
                      : "bg-white/5 rounded-tl-sm"
                  }`}
                >
                  {m.content || (
                    <span className="inline-flex gap-1 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-neon animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-neon animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  )}
                </div>
              </motion.div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-3">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] glass rounded-full px-3 py-1.5 hover:text-neon hover:border-neon/40 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="px-5 py-4 border-t border-white/10 flex items-center gap-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask Summit AI anything…"
              className="flex-1 glass rounded-full px-4 py-2.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              type="button"
              className="p-2.5 rounded-full glass hover:text-neon transition-colors"
              title="Voice (coming soon)"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-full bg-neon text-primary-foreground hover:glow-neon transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
