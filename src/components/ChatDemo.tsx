import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Send, Globe, Bot } from "lucide-react";
import { SectionHeader } from "./Features";

const conversation = [
  { role: "user", text: "I think I lost my trekking route." },
  {
    role: "ai",
    text: "Your GPS indicates you are 1.2 km away from the safe trail. Follow the highlighted route south-east. Would you like emergency assistance?",
  },
  { role: "user", text: "Yes, please notify rescue." },
  { role: "ai", text: "Rescue team has been alerted. Stay put — ETA 18 minutes. I'll keep you company. 🏔️" },
];

const langs = ["EN", "हिं", "বাং", "नेपा", "ES"];

export function ChatDemo() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    if (visible >= conversation.length) return;
    setTyping(true);
    const t = setTimeout(() => {
      setVisible((v) => v + 1);
      setTyping(false);
    }, 1400);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    if (visible >= conversation.length) {
      const r = setTimeout(() => setVisible(0), 4000);
      return () => clearTimeout(r);
    }
  }, [visible]);

  return (
    <section id="demo" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Live Demo"
          title="Talk to Summit AI"
          subtitle="A glimpse of the assistant in the wild — voice, text and multilingual support."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto glass-strong rounded-3xl overflow-hidden glow-soft"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neon/15 text-neon"><Bot className="h-4 w-4" /></div>
              <div>
                <div className="text-sm font-semibold">Summit AI Assistant</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon" /> online · low-bandwidth mode
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 glass rounded-full p-1">
              <Globe className="h-3 w-3 text-muted-foreground ml-2" />
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-[10px] px-2 py-1 rounded-full transition-colors ${
                    lang === l ? "bg-neon text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 space-y-3 min-h-[360px] max-h-[420px] overflow-hidden">
            {conversation.slice(0, visible).map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-neon/15 rounded-tr-sm"
                      : "bg-white/5 rounded-tl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
            {typing && visible < conversation.length && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          <div className="px-5 py-4 border-t border-white/10 flex items-center gap-3">
            <div className="flex-1 glass rounded-full px-4 py-2.5 text-sm text-muted-foreground">
              Ask Summit AI anything…
            </div>
            <button className="p-2.5 rounded-full glass hover:text-neon transition-colors">
              <Mic className="h-4 w-4" />
            </button>
            <button className="p-2.5 rounded-full bg-neon text-primary-foreground hover:glow-neon transition-shadow">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
