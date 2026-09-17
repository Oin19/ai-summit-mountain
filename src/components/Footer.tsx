import logoAsset from "@/assets/ai-summit-logo.png.asset.json";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#emergency", label: "Emergency" },
  { href: "#future", label: "Future Scope" },
  { href: "#contact", label: "Contact" },
  { href: "#technology", label: "Technology" },
];

export function Footer() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logoAsset.url} alt="AI to the Summit" className="h-7 w-7 rounded-md object-cover" />
              <span className="font-display font-bold">
                AI to the <span className="text-gradient">Summit</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Trail guidance, weather context, emergency tools, and offline resources for remote mountain travel.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Quick Links
            </div>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm hover:text-neon transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Project
            </div>
            <p className="text-sm text-muted-foreground">
              Built by Oindrila Banerjee & Alokparna Mitra<br />
              Institute of Engineering and Management, Kolkata
            </p>
          </div>
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} AI to the Summit. All rights reserved.</div>
          <div>Built for safer decisions in remote terrain.</div>
        </div>
      </div>
    </footer>
  );
}
