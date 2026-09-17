import { motion } from "framer-motion";
import {
  Compass, CloudLightning, Siren, Database, Languages, MapPin, Users, Sparkles,
} from "lucide-react";

const features = [
  { icon: Compass, title: "Trail Guidance", desc: "Ask for route-planning guidance and review location-aware context when available." },
  { icon: CloudLightning, title: "Location-Based Weather", desc: "View current conditions for your device location and practical weather-risk notices." },
  { icon: Siren, title: "Emergency SOS Alerts", desc: "Prepare a structured distress report with injury details and available GPS coordinates." },
  { icon: Database, title: "Offline Knowledge Base", desc: "Critical info cached on-device: works without signal at high altitudes." },
  { icon: Languages, title: "Multilingual Chatbot", desc: "Switch between English, Hindi, Nepali, Bengali, and Spanish in emergency triage." },
  { icon: MapPin, title: "GPS-Based Assistance", desc: "Read browser-provided coordinates, accuracy, and available elevation context." },
  { icon: Users, title: "Emergency Report", desc: "Collect the assessment and location details needed when contacting emergency services." },
  { icon: Sparkles, title: "Practical Guidance", desc: "Get general safety guidance while confirming routes with official local sources." },
];

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="Mountain information in one place"
          subtitle="Use chat, current weather, GPS context, triage questions, and offline emergency references."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group glass rounded-2xl p-6 hover:border-neon/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-md bg-neon/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-neon/10 text-neon mb-4 group-hover:glow-soft transition-shadow">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow, title, subtitle,
}: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-14"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass text-xs font-medium text-neon mb-4">
        {eyebrow}
      </div>
      <h2 className="text-3xl sm:text-5xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </motion.div>
  );
}
