import { motion } from "framer-motion";
import { Siren, MapPin, Radio, ShieldCheck, Activity } from "lucide-react";
import { SectionHeader } from "./Features";

export function Emergency() {
  return (
    <section
      id="emergency"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, oklch(0.13 0.04 255) 0%, oklch(0.16 0.04 250) 100%)" }}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-destructive/20 blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-neon/20 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <SectionHeader
          eyebrow="Emergency System"
          title="A lifeline that activates in one tap"
          subtitle="When seconds matter, our rescue stack coordinates location, authority and aid."
        />

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* SOS Simulator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-3xl p-10 flex flex-col items-center text-center"
          >
            <div className="relative mb-6">
              <button className="relative w-40 h-40 rounded-md bg-gradient-to-br from-red-500 to-red-700 text-primary-foreground font-display font-bold text-2xl shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-colors hover:from-red-600 hover:to-red-800">
                <Siren className="h-8 w-8 mx-auto mb-1" />
                SOS
              </button>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              On the triage page, SOS builds a report with your current coordinates, place name and
              assessment answers so you can pass it to rescuers.
            </p>
          </motion.div>

          {/* Rescue dashboard mock */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-xs font-semibold uppercase tracking-wider">Active Incident</span>
              </div>
              <span className="text-xs text-muted-foreground">#SOS-2841</span>
            </div>

            {/* Map placeholder */}
            <div className="relative h-44 rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-mountain to-slate-deep border border-white/10">
              <div className="absolute inset-0 grid-bg opacity-50" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M0,160 Q100,80 200,120 T400,60" stroke="oklch(0.86 0.2 195)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 w-6 h-6 rounded-full bg-destructive/50 animate-ping" />
                  <div className="relative w-6 h-6 rounded-full bg-destructive border-2 border-white shadow-lg" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-neon">27.9881° N · 86.9250° E</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: "Location", val: "Locked" },
                { icon: Radio, label: "Comms", val: "Mesh + Sat" },
                { icon: Activity, label: "Vitals", val: "Stable" },
                { icon: ShieldCheck, label: "Rescue", val: "Dispatched" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-3 flex items-center gap-3">
                  <s.icon className="h-4 w-4 text-neon" />
                  <div className="text-xs">
                    <div className="text-muted-foreground">{s.label}</div>
                    <div className="font-semibold">{s.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
