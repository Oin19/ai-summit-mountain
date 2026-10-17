import logoAsset from "@/assets/ai-summit-logo.png.asset.json";

export function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* Subtle mountain silhouette at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-64 opacity-10 pointer-events-none"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="oklch(0.4 0.08 250)"
          d="M0,320 L0,180 C80,160 160,100 240,120 C320,140 400,60 480,80 C560,100 640,40 720,60 C800,80 880,20 960,40 C1040,60 1120,100 1200,80 C1280,60 1360,120 1440,100 L1440,320 Z"
        />

      </svg>


      {/* Back to home link */}
      <a
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 group card-surface px-4 py-2 rounded-md hover: transition-all"
      >
        <img src={logoAsset.url} alt="AI to the Summit" className="h-5 w-5 rounded-md object-cover transition-transform group-hover:scale-110" />
        <span className="font-display text-sm font-semibold text-foreground">
          AI to the <span className="text-primary">Summit</span>
        </span>
      </a>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-20">
        {children}
      </div>
    </div>
  );
}
