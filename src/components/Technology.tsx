import { motion } from "framer-motion";
import { SectionHeader } from "./Features";
import { Brain, Satellite, Radio, Smartphone, Cloud, Lock } from "lucide-react";

const stack = [
  { icon: Brain, label: "NLP / LLM", desc: "Conversational understanding" },
  { icon: Satellite, label: "GPS + Topo", desc: "Geo-spatial intelligence" },
  { icon: Cloud, label: "Weather APIs", desc: "Hyper-local forecasting" },
  { icon: Radio, label: "Mesh Comms", desc: "Low-signal fallback" },
  { icon: Smartphone, label: "On-device AI", desc: "Offline cached model" },
  { icon: Lock, label: "Secure Relay", desc: "Encrypted SOS pipeline" },
];

export function Technology() {
  return (
    <section id="tech" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Technology"
          title="Built on an intelligent edge stack"
          subtitle="A fusion of language models, geo-data and resilient connectivity engineered for the mountains."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-xl p-5 flex items-center gap-4 hover:border-neon/40 transition-colors"
            >
              <div className="p-3 rounded-lg bg-neon/10 text-neon">
                <t.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
