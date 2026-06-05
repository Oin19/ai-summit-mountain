import logoAsset from "@/assets/ai-summit-logo.png.asset.json";

export function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Radial glow from center */}
      <div className="absolute inset-0 topo-bg" />

      {/* Subtle mountain silhouette at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-64 opacity-20 pointer-events-none"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#mountainGradient)"
          d="M0,320 L0,180 C80,160 160,100 240,120 C320,140 400,60 480,80 C560,100 640,40 720,60 C800,80 880,20 960,40 C1040,60 1120,100 1200,80 C1280,60 1360,120 1440,100 L1440,320 Z"
        />
        <defs>
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.32 0.08 250)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.13 0.04 255)" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating mountain peaks subtle overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Back to home link */}
      <a
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 group glass px-4 py-2 rounded-full hover:glow-soft transition-all"
      >
        <img src={logoAsset.url} alt="AI to the Summit logo" className="h-5 w-5 rounded-full object-cover transition-transform group-hover:scale-110" />
        <span className="font-display text-sm font-semibold text-foreground">
          AI to the <span className="text-gradient">Summit</span>
        </span>
      </a>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-20">
        {children}
      </div>
    </div>
  );
}
