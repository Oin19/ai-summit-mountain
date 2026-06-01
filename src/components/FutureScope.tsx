import { motion } from "framer-motion";
import { Boxes, Glasses, Users, Plane, AlertTriangle } from "lucide-react";
import { SectionHeader } from "./Features";

const items = [
  { icon: Boxes, title: "Digital Twin Integration", desc: "Live 3D replica of the mountain to simulate routes & risks." },
  { icon: Glasses, title: "AR Mountain Navigation", desc: "Overlay turn-by-turn directions on the real landscape." },
  { icon: Users, title: "AI Crowd Management", desc: "Smart flow control on busy peaks during peak season." },
  { icon: Plane, title: "Drone-Assisted Rescue", desc: "Autonomous drones deliver supplies & scout terrain." },
  { icon: AlertTriangle, title: "Predictive Avalanche Alerts", desc: "ML models forecast avalanches before they trigger." },
];

export function FutureScope() {
  return (
    <section id="future" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container mx-auto px-6 relative">
        <SectionHeader
          eyebrow="Future Scope"
          title="What's beyond the summit"
          subtitle="The next horizon for mountain intelligence."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative glass rounded-2xl p-6 overflow-hidden group hover:border-neon/50 transition-colors"
            >
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-tr from-neon/30 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-neon/30 to-neon/5 text-neon mb-4">
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
