import { motion } from "framer-motion";
import { GraduationCap, Mountain } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto glass-strong rounded-3xl p-10 lg:p-14 relative overflow-hidden"
        >
          <Mountain className="absolute -right-10 -bottom-10 h-64 w-64 text-neon/5" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md glass text-xs font-medium text-neon mb-5">
            About the project
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight">
            A student project focused on <span className="text-gradient">mountain safety information</span> and emergency preparation.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
            AI to the Summit explores how conversational guidance, location data, and offline resources can support people in remote mountainous regions.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5">
              <div className="text-xs text-muted-foreground mb-1">Developed by</div>
              <div className="font-semibold text-lg">Oindrila Banerjee</div>
              <div className="font-semibold text-lg">Alokparna Mitra</div>
            </div>
            <div className="glass rounded-2xl p-5 flex items-start gap-3">
              <GraduationCap className="h-5 w-5 text-neon mt-1" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Institute</div>
                <div className="font-semibold">Institute of Engineering and Management, Kolkata</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
