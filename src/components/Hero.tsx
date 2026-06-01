import { motion } from "framer-motion";
import { ArrowRight, Play, Cloud, MapPin, Siren, Compass, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-mountains.jpg";

const floatCards = [
  { icon: Cloud, label: "Weather Alerts", value: "-4°C · Clear", x: "-12%", y: "8%", delay: 0 },
  { icon: MapPin, label: "GPS Assistance", value: "27.9881° N", x: "85%", y: "18%", delay: 0.2 },
  { icon: Siren, label: "Emergency SOS", value: "Active · Linked", x: "-8%", y: "65%", delay: 0.4 },
  { icon: Compass, label: "Offline Nav", value: "Cached · 50km", x: "82%", y: "70%", delay: 0.6 },
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-neon mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Your Intelligent Mountain Companion
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] mb-6"
          >
            AI Assistance for the
            <br />
            World's <span className="text-gradient">Toughest Terrains</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mb-8"
          >
            An intelligent chatbot platform built to support travelers, trekkers, and rescue
            operations in remote mountainous regions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#features"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neon text-primary-foreground font-semibold hover:glow-neon transition-all"
            >
              Explore Features
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-strong font-semibold hover:bg-white/10 transition-colors"
            >
              <Play className="h-4 w-4" />
              Try Demo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              Live AI · 24/7
            </div>
            <div>10+ Languages</div>
            <div className="hidden sm:block">Offline Ready</div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative h-[480px] hidden lg:block">
          {floatCards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + c.delay, duration: 0.6 }}
              style={{ left: c.x, top: c.y, animationDelay: `${c.delay}s` }}
              className="absolute glass-strong rounded-2xl p-4 min-w-[180px] animate-[float_6s_ease-in-out_infinite]"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neon/15 text-neon">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="text-sm font-semibold">{c.value}</div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Center chatbot preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass-strong rounded-3xl p-5 w-[280px] glow-soft"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <span className="text-xs font-semibold">Summit AI</span>
              <span className="ml-auto text-[10px] text-muted-foreground">online</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-white/5 rounded-xl rounded-tl-sm px-3 py-2">
                Where am I?
              </div>
              <div className="bg-neon/15 text-foreground rounded-xl rounded-tr-sm px-3 py-2 ml-6">
                You're 1.2 km from the safe trail. Follow the highlighted route south-east. 🧭
              </div>
              <div className="flex gap-1 px-2 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
