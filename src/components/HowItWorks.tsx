import { motion } from "framer-motion";
import { MessageSquare, Bot, Cpu, Cloud, Sparkles, Siren } from "lucide-react";
import { SectionHeader } from "./Features";

const steps = [
  { icon: MessageSquare, title: "User Request", desc: "Trekker types or speaks to the assistant." },
  { icon: Bot, title: "AI Chatbot", desc: "Conversational layer captures intent & context." },
  { icon: Cpu, title: "NLP Processing", desc: "Language model parses query in real time." },
  { icon: Cloud, title: "Weather + GPS APIs", desc: "Live data merged with local route maps." },
  { icon: Sparkles, title: "Smart Response", desc: "Tailored guidance returned instantly." },
  { icon: Siren, title: "Emergency Escalation", desc: "Auto-route to rescue if risk detected." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28 topo-bg">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="How it works"
          title="From whisper to rescue, in seconds"
          subtitle="A six-stage pipeline that turns natural language into life-saving action."
        />

        <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative glass-strong rounded-2xl p-6 group"
            >
              <div className="absolute top-4 right-4 text-5xl font-display font-bold text-neon/15">
                0{i + 1}
              </div>
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-neon/20 to-transparent text-neon mb-4">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-neon/60 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
