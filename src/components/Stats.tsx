import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { value: 24, suffix: "/7", label: "AI Assistance" },
  { value: 50, suffix: "+", label: "Mountain Routes" },
  { value: 10, suffix: "+", label: "Languages" },
  { value: 100, suffix: "%", label: "Instant Alerts" },
];

export function Stats() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="glass-strong rounded-3xl p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-2">
                <CountUp end={s.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                {s.suffix}
              </div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
