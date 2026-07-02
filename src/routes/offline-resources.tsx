import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bandage,
  Droplet,
  Snowflake,
  Mountain,
  GlassWater,
  PawPrint,
  Phone,
  Ambulance,
  Shield,
  Hospital,
  Trees,
  Siren,
  Flashlight,
  BatteryCharging,
  Map,
  Bell,
  Apple,
  Thermometer,
  CheckCircle2,
  Circle,
  ChevronDown,
  Save,
  WifiOff,
  Compass,
  Wind,
  Moon,
  CloudSnow,
  Eye,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

export const Route = createFileRoute("/offline-resources")({
  head: () => ({
    meta: [
      { title: "Offline Emergency Resources — AI to the Summit" },
      {
        name: "description",
        content:
          "Critical first-aid guides, emergency contacts, survival checklist and offline SOS draft for trekkers without connectivity.",
      },
      { property: "og:title", content: "Offline Emergency Resources — AI to the Summit" },
      {
        property: "og:description",
        content:
          "Practical emergency toolkit for trekkers — first aid, contacts, checklist and offline SOS draft that works without internet.",
      },
      { property: "og:url", content: "https://ai-summit-mountain.lovable.app/offline-resources" },
    ],
    links: [
      { rel: "canonical", href: "https://ai-summit-mountain.lovable.app/offline-resources" },
    ],
  }),
  component: OfflineResources,
});

/* ---------------------------------- Data --------------------------------- */

const FIRST_AID = [
  {
    key: "fracture",
    title: "Fractures",
    emoji: "🩹",
    Icon: Bandage,
    steps: [
      "Stay calm and keep the injured person still.",
      "Avoid moving the injured limb — never try to realign a bone.",
      "Immobilize the area with a splint, padding or a rolled jacket.",
      "Apply ice wrapped in cloth to reduce swelling. Never directly on skin.",
      "Elevate the limb if possible and treat for shock (warm, hydrated, lying down).",
      "Contact rescue immediately and share GPS coordinates.",
    ],
  },
  {
    key: "bleeding",
    title: "Severe Bleeding",
    emoji: "🩸",
    Icon: Droplet,
    steps: [
      "Apply firm, direct pressure with a clean cloth or gauze.",
      "Do NOT remove embedded objects — stabilize them in place.",
      "Elevate the wound above heart level if there's no fracture.",
      "If bleeding soaks through, add more layers — don't remove the original.",
      "Apply a tourniquet ABOVE the wound only for life-threatening limb bleeds.",
      "Keep the person warm and monitor breathing until rescue arrives.",
    ],
  },
  {
    key: "hypothermia",
    title: "Hypothermia",
    emoji: "❄️",
    Icon: Snowflake,
    steps: [
      "Move the person to a sheltered, wind-protected area.",
      "Replace wet clothing with dry layers and wrap in a thermal blanket.",
      "Insulate from the ground — use a backpack or sleeping pad.",
      "Offer warm (not hot) sugary fluids only if fully conscious.",
      "Re-warm the core first (chest, neck, groin) — never extremities first.",
      "Avoid alcohol, caffeine and vigorous rubbing of skin.",
    ],
  },
  {
    key: "altitude",
    title: "Altitude Sickness",
    emoji: "🏔️",
    Icon: Mountain,
    steps: [
      "Stop ascending immediately at the first symptoms (headache, nausea, dizziness).",
      "Descend at least 500 m if symptoms worsen — this is the only true cure.",
      "Rest, hydrate with small frequent sips, and avoid alcohol and sleeping pills.",
      "Watch for HAPE (breathlessness at rest) or HACE (confusion, loss of balance).",
      "Administer supplemental oxygen if available.",
      "Evacuate urgently for severe symptoms — these are life-threatening.",
    ],
  },
  {
    key: "dehydration",
    title: "Dehydration",
    emoji: "💧",
    Icon: GlassWater,
    steps: [
      "Move to shade and stop physical exertion immediately.",
      "Sip water or oral rehydration solution slowly — never gulp.",
      "Add a pinch of salt and sugar to water if ORS is unavailable.",
      "Loosen tight clothing and cool the body with damp cloth on neck and wrists.",
      "Avoid caffeine, alcohol and sugary energy drinks.",
      "Seek medical help if there's confusion, no urine output, or rapid pulse.",
    ],
  },
  {
    key: "wildlife",
    title: "Wildlife Encounters",
    emoji: "🐻",
    Icon: PawPrint,
    steps: [
      "Stay calm. Do NOT run — most predators chase fleeing prey.",
      "Make yourself look large: raise arms, open jacket, group together.",
      "Back away slowly while facing the animal. Avoid direct eye contact with bears.",
      "Speak in a low, firm voice. Carry bear spray within easy reach.",
      "If attacked by a bear: play dead (brown) or fight back (black).",
      "Treat wounds for bleeding/shock immediately and seek medical help.",
    ],
  },
];

const CONTACTS = [
  {
    Icon: Ambulance,
    name: "Mountain Rescue Team",
    number: "+91 98765 43210",
    status: "Available 24/7",
    tone: "emerald",
  },
  {
    Icon: Shield,
    name: "Local Police",
    number: "100",
    status: "Available 24/7",
    tone: "cyan",
  },
  {
    Icon: Hospital,
    name: "Nearest Hospital",
    number: "+91 98321 11220",
    status: "Emergency Ward Open",
    tone: "emerald",
  },
  {
    Icon: Trees,
    name: "Forest Department",
    number: "1926",
    status: "Day & Night Helpline",
    tone: "cyan",
  },
  {
    Icon: Siren,
    name: "National Emergency Helpline",
    number: "112",
    status: "All India — 24/7",
    tone: "red",
  },
];

const CHECKLIST_ITEMS = [
  { key: "water", label: "Water Bottle", Icon: GlassWater },
  { key: "firstaid", label: "First Aid Kit", Icon: Bandage },
  { key: "flashlight", label: "Flashlight", Icon: Flashlight },
  { key: "blanket", label: "Thermal Blanket", Icon: Thermometer },
  { key: "powerbank", label: "Power Bank", Icon: BatteryCharging },
  { key: "whistle", label: "Emergency Whistle", Icon: Bell },
  { key: "food", label: "Food Supplies", Icon: Apple },
  { key: "map", label: "Trekking Map", Icon: Map },
];

const GUIDELINES = [
  {
    title: "What To Do If Lost",
    Icon: Compass,
    points: [
      "STOP — Stop, Think, Observe, Plan. Don't keep walking blindly.",
      "Stay on the trail you last recognized. Mark your position visibly.",
      "Blow your whistle in groups of three at regular intervals.",
      "Conserve phone battery — use airplane mode and only signal when needed.",
    ],
  },
  {
    title: "Snowstorm Safety",
    Icon: CloudSnow,
    points: [
      "Seek shelter behind natural windbreaks or dig a snow trench.",
      "Stay dry — wet clothing accelerates hypothermia drastically.",
      "Avoid sweating; ventilate before exertion, layer up after.",
      "Keep group members tethered or within constant visual range.",
    ],
  },
  {
    title: "Avalanche Precautions",
    Icon: Mountain,
    points: [
      "Avoid slopes between 30°–45° after fresh snowfall.",
      "Carry beacon, probe, and shovel — and know how to use them.",
      "Cross suspect slopes one person at a time, watcher posted.",
      "If caught: swim toward the surface, create an air pocket near your face.",
    ],
  },
  {
    title: "Night Trekking Safety",
    Icon: Moon,
    points: [
      "Always carry two light sources — headlamp plus a backup.",
      "Stay close together; the lead person navigates, the last person counts.",
      "Reduce pace by half — depth perception drops sharply at night.",
      "Camp before fatigue sets in. Most accidents happen in the last hour.",
    ],
  },
  {
    title: "Wildlife Safety",
    Icon: PawPrint,
    points: [
      "Store food in sealed containers away from sleeping areas.",
      "Make noise on blind corners — surprise is the leading cause of attacks.",
      "Never feed or approach wild animals, even small ones.",
      "Report any aggressive wildlife sightings to forest department.",
    ],
  },
  {
    title: "Weather Awareness",
    Icon: Wind,
    points: [
      "Check forecasts the morning of departure — mountain weather shifts fast.",
      "Turn back if visibility drops below 50 m on exposed ridges.",
      "Lightning rule: descend ridges if thunder follows flash within 30 sec.",
      "Watch lenticular clouds — they signal incoming high-altitude storms.",
    ],
  },
];

const TONE_BG: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  cyan: "bg-neon/15 text-neon border-neon/30",
  red: "bg-red-500/15 text-red-300 border-red-500/30",
};

const STORAGE_DRAFT = "sos.offline.draft";
const STORAGE_CHECKLIST = "sos.offline.checklist";

/* ---------------------------------- Page --------------------------------- */

function OfflineResources() {
  const [openAid, setOpenAid] = useState<string | null>("fracture");
  const [openGuide, setOpenGuide] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [draft, setDraft] = useState({
    name: "",
    location: "",
    type: "Injury",
    description: "",
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    try {
      const c = localStorage.getItem(STORAGE_CHECKLIST);
      if (c) setChecked(JSON.parse(c));
      const d = localStorage.getItem(STORAGE_DRAFT);
      if (d) {
        const parsed = JSON.parse(d);
        if (parsed.draft) setDraft(parsed.draft);
        if (parsed.savedAt) setSavedAt(parsed.savedAt);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggleCheck = (k: string) => {
    setChecked((prev) => {
      const next = { ...prev, [k]: !prev[k] };
      try {
        localStorage.setItem(STORAGE_CHECKLIST, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const packedCount = CHECKLIST_ITEMS.filter((i) => checked[i.key]).length;
  const checklistProgress = (packedCount / CHECKLIST_ITEMS.length) * 100;

  const saveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    const time = new Date().toLocaleString();
    try {
      localStorage.setItem(STORAGE_DRAFT, JSON.stringify({ draft, savedAt: time }));
    } catch {
      /* ignore */
    }
    setSavedAt(time);
    toast.success("Emergency report saved locally.", {
      description: "It can be shared when connectivity becomes available.",
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main className="relative z-10 pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-xs uppercase tracking-wider text-neon mb-4">
              <WifiOff className="h-3.5 w-3.5" /> Works without internet
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Offline <span className="text-gradient">Emergency Resources</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground">
              Critical information available even when connectivity is limited.
            </p>
          </div>

          {/* SECTION 1 — First Aid Guide */}
          <section className="mb-16">
            <SectionHeading
              eyebrow="Section 1"
              title="First Aid Guide"
              subtitle="Tap a card to reveal step-by-step emergency instructions."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FIRST_AID.map(({ key, title, emoji, Icon, steps }) => {
                const isOpen = openAid === key;
                return (
                  <button
                    key={key}
                    onClick={() => setOpenAid(isOpen ? null : key)}
                    className={`text-left glass-strong rounded-3xl p-6 border transition-all hover:-translate-y-1 ${
                      isOpen ? "border-neon/40 shadow-[0_0_30px_rgba(34,211,238,0.15)]" : "border-white/10 hover:border-neon/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-neon/15 flex items-center justify-center text-xl">
                          {emoji}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold">{title}</h3>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Icon className="h-3 w-3" /> Field protocol
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-neon transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    {isOpen && (
                      <ol className="mt-4 space-y-2 animate-[fade-up_0.3s_ease-out]">
                        {steps.map((s, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-neon/20 text-neon text-[11px] font-semibold flex items-center justify-center mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-muted-foreground leading-relaxed">{s}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* SECTION 2 — Emergency Contacts */}
          <section className="mb-16">
            <SectionHeading
              eyebrow="Section 2"
              title="Emergency Contacts"
              subtitle="Save these numbers offline. Tap any card to dial directly."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CONTACTS.map(({ Icon, name, number, status, tone }) => (
                <a
                  key={name}
                  href={`tel:${number.replace(/\s+/g, "")}`}
                  className="glass-strong rounded-3xl p-6 border border-white/10 hover:border-neon/40 hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center ${TONE_BG[tone]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-base group-hover:text-neon transition-colors">
                        {name}
                      </h3>
                      <p className="font-mono text-lg mt-1 tracking-tight">{number}</p>
                      <p className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {status}
                      </p>
                    </div>
                    <Phone className="h-4 w-4 text-neon opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* SECTION 3 — Survival Checklist */}
          <section className="mb-16">
            <SectionHeading
              eyebrow="Section 3"
              title="Survival Checklist"
              subtitle="Mark each item as you pack. Progress is saved on your device."
            />
            <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Packed <span className="text-neon font-semibold">{packedCount}</span> of {CHECKLIST_ITEMS.length}
                </p>
                <p className="text-xs text-muted-foreground">{Math.round(checklistProgress)}%</p>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
                <div
                  className="h-full bg-neon transition-all duration-500 glow-neon"
                  style={{ width: `${checklistProgress}%` }}
                />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {CHECKLIST_ITEMS.map(({ key, label, Icon }) => {
                  const isOn = !!checked[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleCheck(key)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                        isOn
                          ? "bg-neon/10 border-neon/40 text-foreground"
                          : "bg-white/5 border-white/10 hover:border-neon/30 text-muted-foreground"
                      }`}
                    >
                      {isOn ? (
                        <CheckCircle2 className="h-5 w-5 text-neon flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <Icon className={`h-4 w-4 ${isOn ? "text-neon" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${isOn ? "line-through opacity-70" : ""}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4 — Safety Guidelines */}
          <section className="mb-16">
            <SectionHeading
              eyebrow="Section 4"
              title="Safety Guidelines"
              subtitle="Quick reference cards for the most common mountain scenarios."
            />
            <div className="grid md:grid-cols-2 gap-5">
              {GUIDELINES.map(({ title, Icon, points }) => {
                const isOpen = openGuide === title;
                return (
                  <div
                    key={title}
                    className={`glass-strong rounded-3xl border transition-all ${
                      isOpen ? "border-neon/40" : "border-white/10"
                    }`}
                  >
                    <button
                      onClick={() => setOpenGuide(isOpen ? null : title)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-neon/15 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-neon" />
                        </div>
                        <h3 className="font-display font-bold">{title}</h3>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-neon transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <ul className="px-5 pb-5 space-y-2 animate-[fade-up_0.3s_ease-out]">
                        {points.map((p, i) => (
                          <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                            <Eye className="h-4 w-4 text-neon flex-shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 5 — Offline SOS Draft */}
          <section>
            <SectionHeading
              eyebrow="Section 5"
              title="Offline SOS Draft"
              subtitle="Compose an emergency report now — share it the moment signal returns."
            />
            <form
              onSubmit={saveDraft}
              className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 max-w-3xl mx-auto"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Field label="Name">
                  <input
                    required
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neon/50"
                  />
                </Field>
                <Field label="Current Location">
                  <input
                    required
                    value={draft.location}
                    onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                    placeholder="e.g. Annapurna Base Camp Trail, Day 4"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neon/50"
                  />
                </Field>
                <Field label="Emergency Type">
                  <select
                    value={draft.type}
                    onChange={(e) => setDraft({ ...draft, type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neon/50"
                  >
                    {["Injury", "Lost", "Altitude Sickness", "Weather", "Wildlife", "Other"].map((o) => (
                      <option key={o} value={o} className="bg-background">{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Injury Description">
                  <input
                    value={draft.description}
                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                    placeholder="Brief description"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-neon/50"
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-neon to-cyan-400 text-primary-foreground font-semibold text-sm hover:glow-neon transition-all"
              >
                <Save className="h-4 w-4" />
                Save Emergency Report
              </button>

              {savedAt && (
                <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-start gap-3 animate-[fade-up_0.3s_ease-out]">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-emerald-200 font-semibold">Emergency report saved locally.</p>
                    <p className="text-muted-foreground mt-0.5">
                      It can be shared when connectivity becomes available.
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1">Last saved: {savedAt}</p>
                  </div>
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* -------------------------------- Helpers -------------------------------- */

function SectionHeading({
  eyebrow, title, subtitle,
}: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-wider text-neon font-semibold">{eyebrow}</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mt-1">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{subtitle}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 block">
        {label}
      </span>
      {children}
    </label>
  );
}
