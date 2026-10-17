import { motion } from "framer-motion";
import { Boxes, Glasses, Users, Plane, AlertTriangle } from "lucide-react";
import { SectionHeader } from "./Features";

const items = [
  { icon: Boxes, title: "Digital Twin Integration", desc: "Proposed terrain models for route and risk simulations." },
  { icon: Glasses, title: "AR Mountain Navigation", desc: "Proposed visual navigation over the surrounding landscape." },
  { icon: Users, title: "AI Crowd Management", desc: "Research into route congestion information during busy periods." },
  { icon: Plane, title: "Drone-Assisted Rescue", desc: "A proposed integration with authorized rescue operations." },
  { icon: AlertTriangle, title: "Predictive Avalanche Alerts", desc: "Research using verified snow and weather observations." },
];

export function FutureScope() {
  return (
    <section id="future" className="relative py-28 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <SectionHeader
          eyebrow="Future Scope"
          title="Future research areas"
          subtitle="Ideas under consideration. These features are not currently available."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative card-surface rounded-2xl p-6 overflow-hidden group hover:border-border/50 transition-colors"
            >
              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <it.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
