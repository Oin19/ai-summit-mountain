import { motion } from "framer-motion";
import { MessageSquare, Bot, Cpu, Cloud, Sparkles, Siren } from "lucide-react";
import { SectionHeader } from "./Features";

const steps = [
  { icon: MessageSquare, title: "User Request", desc: "Trekker types or speaks to the assistant." },
  { icon: Bot, title: "AI Chatbot", desc: "The assistant interprets the question and recent conversation." },
  { icon: Cpu, title: "NLP Processing", desc: "A language model prepares a relevant response." },
  { icon: Cloud, title: "Weather + GPS APIs", desc: "Available location and weather information provide context." },
  { icon: Sparkles, title: "Smart Response", desc: "The app returns guidance for the user to verify." },
  { icon: Siren, title: "Emergency Escalation", desc: "The triage flow prepares details for an emergency call." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28 topo-bg">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="How it works"
          title="From a question to a practical next step"
          subtitle="The app combines a question, available context, and clear safety guidance."
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
              <div className="inline-flex p-3 rounded-xl bg-neon/10 text-neon mb-4">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-neon/40" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
