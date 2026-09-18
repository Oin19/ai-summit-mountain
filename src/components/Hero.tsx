import { motion } from "framer-motion";
import { ArrowRight, Play, Cloud, MapPin, Siren, Languages } from "lucide-react";

const capabilities = [
  { icon: MapPin, label: "Trail guidance", value: "Directions from your live GPS position" },
  { icon: Cloud, label: "Weather", value: "Current conditions and hazard warnings" },
  { icon: Siren, label: "Emergency triage", value: "Guided injury assessment and SOS report" },
  { icon: Languages, label: "Languages", value: "English, Hindi, Bengali, Nepali, Spanish" },
];

function RidgeBackdrop() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 w-full h-[55%] text-neon"
      viewBox="0 0 1440 420"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ridge-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ridge-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.26" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d="M0 300 L180 190 L330 260 L520 120 L700 250 L860 170 L1060 270 L1240 160 L1440 280 L1440 420 L0 420 Z" fill="url(#ridge-far)" />
      <path d="M0 360 L160 280 L320 340 L500 230 L680 330 L880 260 L1080 350 L1280 270 L1440 340 L1440 420 L0 420 Z" fill="url(#ridge-near)" />
      <path
        d="M0 360 L160 280 L320 340 L500 230 L680 330 L880 260 L1080 350 L1280 270 L1440 340"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 topo-bg" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <RidgeBackdrop />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
          >
            Trail directions, weather and
            <br />
            <span className="text-gradient">emergency help</span> in the mountains
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-xl mb-8"
          >
            Ask questions in your own language and get trail guidance from your GPS position,
            current weather for your coordinates, a step by step injury assessment with an SOS
            report you can hand to rescuers, and a first aid kit that works with no signal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#features"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-neon text-primary-foreground font-semibold hover:glow-neon transition-all"
            >
              Explore Features
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md glass-strong font-semibold hover:bg-white/10 transition-colors"
            >
              <Play className="h-4 w-4" />
              Try the assistant
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {capabilities.map((c) => (
              <li key={c.label} className="glass-strong rounded-xl p-4">
                <div className="p-2 rounded-md bg-neon/15 text-neon w-fit mb-3">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold mb-1">{c.label}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{c.value}</div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
