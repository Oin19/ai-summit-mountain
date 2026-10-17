import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/ai-summit-logo.png.asset.json";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How It Works" },
  { href: "/#tech", label: "Technology" },
  { href: "/triage", label: "Triage" },
  { href: "/offline-resources", label: "Offline Kit" },
  { href: "/#emergency", label: "Emergency" },
  { href: "/#future", label: "Future Scope" },
  { href: "/#contact", label: "Contact" },
];


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95  border-b border-border py-3" : "py-5"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative">
            <img
              src={logoAsset.url}
              alt="AI to the Summit"
              className="h-9 w-9 rounded-md object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 blur-md bg-primary/30 rounded-md -z-10" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            AI to the <span className="text-primary">Summit</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {l.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md border border-white/15 text-foreground text-sm font-medium hover:border-border/40 hover:text-primary transition-all"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold transition-shadow"
          >
            Register
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background border border-white/15 shadow-2xl mt-3 mx-4 rounded-2xl p-4 animate-[fade-up_0.3s_ease-out]">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-card rounded-lg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm text-foreground hover:text-primary hover:bg-card rounded-lg text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-primary-foreground bg-primary rounded-lg text-center hover:bg-primary/90 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
