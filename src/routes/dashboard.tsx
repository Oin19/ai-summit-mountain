import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthBackground } from "@/components/AuthBackground";
import { Mountain, MapPin, Shield, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({
    meta: [
      { title: "Dashboard — AI to the Summit" },
      {
        name: "description",
        content:
          "Your AI to the Summit dashboard — access the trail finder, live weather, emergency SOS and mountain companion tools from one place.",
      },
      { property: "og:title", content: "Dashboard — AI to the Summit" },
      {
        property: "og:description",
        content:
          "Personal dashboard for AI to the Summit — trail finder, live weather and emergency SOS at a glance.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://ai-summit-mountain.lovable.app/dashboard" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AuthBackground>
      <div className="max-w-2xl mx-auto animate-[fade-up_0.6s_ease-out]">
        {/* Welcome Card */}
        <div className="glass-strong rounded-3xl p-10 lg:p-14 text-center border border-neon/15 shadow-2xl">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon/20 to-neon/5 border border-neon/20 flex items-center justify-center mx-auto">
              <Mountain className="h-12 w-12 text-neon" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-neon rounded-full flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Welcome to AI to the <span className="text-gradient">Summit</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            You are successfully logged in.
          </p>

          {/* Feature preview cards */}
          <div className="grid sm:grid-cols-3 gap-4 text-left mb-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon/20 transition-colors">
              <MapPin className="h-5 w-5 text-neon mb-2" />
              <h3 className="text-sm font-semibold text-foreground mb-1">Trail Finder</h3>
              <p className="text-xs text-muted-foreground">Discover routes near you</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon/20 transition-colors">
              <Shield className="h-5 w-5 text-neon mb-2" />
              <h3 className="text-sm font-semibold text-foreground mb-1">SOS Ready</h3>
              <p className="text-xs text-muted-foreground">Emergency assistance active</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon/20 transition-colors">
              <Mountain className="h-5 w-5 text-neon mb-2" />
              <h3 className="text-sm font-semibold text-foreground mb-1">Weather</h3>
              <p className="text-xs text-muted-foreground">Live mountain conditions</p>
            </div>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon to-neon/80 text-primary-foreground font-semibold text-sm hover:glow-neon transition-all"
          >
            <LogOut className="h-4 w-4" />
            Back to Homepage
          </a>
        </div>
      </div>
    </AuthBackground>
  );
}
