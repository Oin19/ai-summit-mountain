import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, User } from "lucide-react";
import { SectionHeader } from "./Features";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-28 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Get in touch"
          title="Let's reach the summit together"
          subtitle="Questions, partnerships, or rescue collaborations — we're listening."
        />

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 3000);
          }}
          className="max-w-xl mx-auto glass-strong rounded-3xl p-8 space-y-5"
        >
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Name</label>
            <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
              <User className="h-4 w-4 text-neon" />
              <input
                required
                placeholder="Your name"
                className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Email</label>
            <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
              <Mail className="h-4 w-4 text-neon" />
              <input
                required
                type="email"
                placeholder="you@summit.ai"
                className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Message</label>
            <textarea
              rows={4}
              placeholder="Tell us about your idea…"
              className="w-full glass rounded-xl px-4 py-3 bg-transparent outline-none text-sm placeholder:text-muted-foreground resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neon text-primary-foreground font-semibold hover:glow-neon transition-all"
          >
            {sent ? "Message sent ✓" : (<>Send message <Send className="h-4 w-4" /></>)}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
