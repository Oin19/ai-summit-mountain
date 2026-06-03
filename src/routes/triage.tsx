import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Activity,
  MapPin,
  Send,
  Heart,
  Bandage,
  Snowflake,
  Mountain,
  CheckCircle2,
  Clock,
  Radio,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthBackground } from "@/components/AuthBackground";
import { toast } from "sonner";

export const Route = createFileRoute("/triage")({
  head: () => ({
    meta: [
      { title: "AI Emergency Triage System — AI to the Summit" },
      {
        name: "description",
        content:
          "AI-powered triage that assesses injured trekkers and prioritizes rescue in remote mountainous regions.",
      },
      { property: "og:title", content: "AI Emergency Triage System" },
      {
        property: "og:description",
        content:
          "Quickly assess injuries and prioritize rescue operations in remote mountainous regions.",
      },
    ],
  }),
  component: TriagePage,
});

type Answers = {
  conscious?: "Yes" | "No";
  breathing?: "Yes" | "No";
  bleeding?: "Yes" | "No";
  injury?: string;
  mobility?: "Yes" | "With Difficulty" | "No";
  pain?: number;
};

type Step =
  | "conscious"
  | "breathing"
  | "bleeding"
  | "injury"
  | "mobility"
  | "pain"
  | "done";

const STEPS: Step[] = [
  "conscious",
  "breathing",
  "bleeding",
  "injury",
  "mobility",
  "pain",
  "done",
];

const QUESTIONS: Record<Exclude<Step, "done">, string> = {
  conscious: "Are you or the injured person conscious?",
  breathing: "Is the person breathing normally?",
  bleeding: "Is there severe bleeding?",
  injury: "What type of injury occurred?",
  mobility: "Can the injured person walk?",
  pain: "Rate the pain level (1–10).",
};

const INJURY_OPTIONS = [
  "Fall",
  "Fracture",
  "Head Injury",
  "Altitude Sickness",
  "Hypothermia",
  "Avalanche",
  "Other",
];

type Severity = "Low Risk" | "Moderate" | "High Priority" | "Critical";

function computeSeverity(a: Answers): Severity {
  if (a.conscious === "No" || a.breathing === "No") return "Critical";
  if (a.bleeding === "Yes" || a.injury === "Head Injury" || a.injury === "Avalanche")
    return "Critical";
  const pain = a.pain ?? 0;
  if (pain >= 8 || a.mobility === "No") return "High Priority";
  if (pain >= 5 || a.mobility === "With Difficulty") return "Moderate";
  return "Low Risk";
}

const SEVERITY_STYLES: Record<Severity, { bg: string; text: string; ring: string; dot: string }> = {
  "Low Risk": {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    ring: "ring-emerald-400/40",
    dot: "bg-emerald-400",
  },
  Moderate: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-300",
    ring: "ring-yellow-400/40",
    dot: "bg-yellow-400",
  },
  "High Priority": {
    bg: "bg-orange-500/15",
    text: "text-orange-300",
    ring: "ring-orange-400/40",
    dot: "bg-orange-400",
  },
  Critical: {
    bg: "bg-red-500/15",
    text: "text-red-300",
    ring: "ring-red-400/40",
    dot: "bg-red-400",
  },
};

const RECOMMENDED_ACTION: Record<Severity, string> = {
  "Low Risk": "Self-monitor and descend slowly with a partner. Stay hydrated.",
  Moderate: "Stabilize on site and request a non-urgent rescue team.",
  "High Priority": "Dispatch rescue team immediately. Prepare evacuation route.",
  Critical: "LIFE-THREATENING: Helicopter evac & medical team required now.",
};

const FIRST_AID: Record<string, string[]> = {
  Fracture: [
    "Keep the injured area completely still.",
    "Avoid unnecessary movement.",
    "Splint if possible and wait for medical assistance.",
  ],
  Fall: [
    "Check for hidden injuries before moving.",
    "Stabilize the neck and spine.",
    "Apply pressure to any bleeding.",
  ],
  "Head Injury": [
    "Keep the person awake and calm.",
    "Avoid sudden movement of the head/neck.",
    "Monitor for confusion, vomiting, or loss of consciousness.",
  ],
  "Altitude Sickness": [
    "Stop ascending immediately.",
    "Descend to lower altitude as soon as possible.",
    "Hydrate and rest in a sheltered area.",
  ],
  Hypothermia: [
    "Move to a sheltered area.",
    "Replace wet clothes and wrap in dry layers.",
    "Provide warm fluids if conscious.",
  ],
  Avalanche: [
    "Clear airway of snow first.",
    "Check breathing and pulse.",
    "Treat for hypothermia and trauma simultaneously.",
  ],
  Other: [
    "Keep the patient calm and warm.",
    "Monitor breathing and consciousness.",
    "Await professional help.",
  ],
};

const BLEEDING_AID = [
  "Apply firm pressure to the wound with a clean cloth.",
  "Elevate the injured area above the heart if possible.",
  "Do not remove embedded objects.",
];

const LOCATION = {
  lat: "28.5983° N",
  lng: "83.8200° E",
  elevation: "4,130 m",
  shelter: "Machapuchare Base Camp (1.8 km)",
  route: "Mountain Route A — Annapurna Trail",
};

function TriagePage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [pain, setPain] = useState(5);
  const [sosSent, setSosSent] = useState<null | {
    id: string;
    time: string;
  }>(null);

  const step = STEPS[stepIndex];
  const progress = (stepIndex / (STEPS.length - 1)) * 100;
  const severity = useMemo(() => computeSeverity(answers), [answers]);

  const answer = (patch: Partial<Answers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const reset = () => {
    setAnswers({});
    setPain(5);
    setStepIndex(0);
    setSosSent(null);
  };

  const sendSos = () => {
    const id = `EM-${Math.floor(1000 + Math.random() * 9000)}`;
    const time = new Date().toLocaleString();
    setSosSent({ id, time });
    toast.success("Emergency alert sent successfully.", {
      description: `Rescue Team Notified — ${id}`,
    });
  };

  const renderOptions = () => {
    const btn =
      "px-5 py-3 rounded-xl glass border border-white/10 hover:border-neon/50 hover:text-neon hover:glow-neon transition-all text-sm font-medium";

    if (step === "conscious" || step === "breathing" || step === "bleeding") {
      return (
        <div className="flex flex-wrap gap-3">
          <button className={btn} onClick={() => answer({ [step]: "Yes" } as Answers)}>
            Yes
          </button>
          <button className={btn} onClick={() => answer({ [step]: "No" } as Answers)}>
            No
          </button>
        </div>
      );
    }
    if (step === "injury") {
      return (
        <div className="flex flex-wrap gap-2">
          {INJURY_OPTIONS.map((o) => (
            <button key={o} className={btn} onClick={() => answer({ injury: o })}>
              {o}
            </button>
          ))}
        </div>
      );
    }
    if (step === "mobility") {
      return (
        <div className="flex flex-wrap gap-3">
          {(["Yes", "With Difficulty", "No"] as const).map((o) => (
            <button key={o} className={btn} onClick={() => answer({ mobility: o })}>
              {o}
            </button>
          ))}
        </div>
      );
    }
    if (step === "pain") {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">1 — Minimal</span>
            <span className="text-2xl font-display font-bold text-neon">{pain}</span>
            <span className="text-muted-foreground">10 — Severe</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={pain}
            onChange={(e) => setPain(Number(e.target.value))}
            className="w-full accent-[hsl(var(--neon))]"
          />
          <button
            className="w-full px-5 py-3 rounded-xl bg-neon text-primary-foreground font-semibold hover:glow-neon transition-shadow flex items-center justify-center gap-2"
            onClick={() => answer({ pain })}
          >
            Submit Assessment <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      );
    }
    return null;
  };

  const isDone = step === "done";
  const styles = SEVERITY_STYLES[severity];
  const firstAidList = answers.injury ? FIRST_AID[answers.injury] ?? FIRST_AID.Other : [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuthBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 animate-[fade-up_0.6s_ease-out]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-5">
              <AlertTriangle className="h-3.5 w-3.5 text-neon" />
              <span className="text-xs font-medium text-muted-foreground">
                Emergency Module
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
              AI <span className="text-gradient">Emergency Triage</span> System
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Quickly assess injuries and prioritize rescue operations in remote
              mountainous regions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat / Triage */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10">
                {/* Progress */}
                <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                  <span>
                    Step {Math.min(stepIndex + 1, STEPS.length - 1)} of{" "}
                    {STEPS.length - 1}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
                  <div
                    className="h-full bg-neon transition-all duration-500 glow-neon"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Chat bubbles */}
                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                  {STEPS.slice(0, stepIndex).map((s) => {
                    if (s === "done") return null;
                    const k = s as Exclude<Step, "done">;
                    const val =
                      k === "pain"
                        ? `${answers.pain}/10`
                        : (answers as Record<string, unknown>)[k]?.toString() ?? "";
                    return (
                      <div key={s} className="space-y-2 animate-[fade-up_0.4s_ease-out]">
                        <div className="flex gap-3">
                          <div className="h-8 w-8 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0">
                            <Activity className="h-4 w-4 text-neon" />
                          </div>
                          <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] text-sm">
                            {QUESTIONS[k]}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-neon/20 border border-neon/30 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">
                            {val}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {!isDone && (
                    <div className="space-y-4 animate-[fade-up_0.4s_ease-out]">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0">
                          <Activity className="h-4 w-4 text-neon" />
                        </div>
                        <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] text-sm">
                          {QUESTIONS[step as Exclude<Step, "done">]}
                        </div>
                      </div>
                      <div className="pl-11">{renderOptions()}</div>
                    </div>
                  )}

                  {isDone && (
                    <div className="flex gap-3 animate-[fade-up_0.4s_ease-out]">
                      <div className="h-8 w-8 rounded-full bg-neon/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-neon" />
                      </div>
                      <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%] text-sm">
                        Assessment complete. See results panel.
                      </div>
                    </div>
                  )}
                </div>

                {isDone && (
                  <button
                    onClick={reset}
                    className="mt-6 text-xs text-muted-foreground hover:text-neon transition-colors"
                  >
                    ↻ Restart triage
                  </button>
                )}
              </div>

              {/* Analysis */}
              {isDone && (
                <div
                  className={`glass-strong rounded-3xl p-6 md:p-8 border border-white/10 ring-1 ${styles.ring} animate-[fade-up_0.5s_ease-out]`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Emergency Assessment Complete
                      </p>
                      <h2 className="font-display text-2xl font-bold mt-1">
                        Triage Analysis
                      </h2>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full ${styles.bg} ${styles.text} text-sm font-semibold flex items-center gap-2`}
                    >
                      <span className={`h-2 w-2 rounded-full ${styles.dot} animate-pulse`} />
                      {severity}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Stat label="Injury Type" value={answers.injury ?? "—"} />
                    <Stat label="Pain Score" value={`${answers.pain ?? 0}/10`} />
                    <Stat label="Mobility Status" value={answers.mobility ?? "—"} />
                    <Stat label="Conscious" value={answers.conscious ?? "—"} />
                  </div>

                  <div className={`mt-6 p-4 rounded-2xl ${styles.bg} border border-white/5`}>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Recommended Action
                    </p>
                    <p className={`text-sm font-medium ${styles.text}`}>
                      {RECOMMENDED_ACTION[severity]}
                    </p>
                  </div>
                </div>
              )}

              {/* First aid */}
              {isDone && (
                <div className="glass-strong rounded-3xl p-6 md:p-8 border border-white/10 animate-[fade-up_0.6s_ease-out]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-neon/15 flex items-center justify-center">
                      <Bandage className="h-5 w-5 text-neon" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">First Aid Recommendations</h3>
                      <p className="text-xs text-muted-foreground">
                        Follow these steps until rescue arrives
                      </p>
                    </div>
                  </div>

                  <AidBlock
                    title={`For ${answers.injury ?? "Injury"}`}
                    items={firstAidList}
                    icon={<Heart className="h-4 w-4 text-neon" />}
                  />
                  {answers.bleeding === "Yes" && (
                    <AidBlock
                      title="For Bleeding"
                      items={BLEEDING_AID}
                      icon={<Bandage className="h-4 w-4 text-red-400" />}
                    />
                  )}
                  {(answers.injury === "Hypothermia" ||
                    answers.injury === "Avalanche") && (
                    <AidBlock
                      title="For Hypothermia"
                      items={[
                        "Move to a sheltered area.",
                        "Keep the person warm and dry.",
                        "Avoid sudden re-warming of extremities.",
                      ]}
                      icon={<Snowflake className="h-4 w-4 text-cyan-300" />}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* SOS */}
              <div className="glass-strong rounded-3xl p-6 border border-red-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="h-4 w-4 text-red-400 animate-pulse" />
                    <span className="text-xs uppercase tracking-wider text-red-300 font-semibold">
                      SOS Beacon
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-4">
                    Emergency Rescue Signal
                  </h3>

                  {!sosSent ? (
                    <button
                      onClick={sendSos}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-sm hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all flex items-center justify-center gap-2 animate-pulse"
                    >
                      <Send className="h-4 w-4" />
                      🚨 SEND SOS ALERT
                    </button>
                  ) : (
                    <div className="space-y-3 animate-[fade-up_0.4s_ease-out]">
                      <div className="flex items-center gap-2 text-emerald-300 text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        Alert sent successfully
                      </div>
                      <div className="space-y-2 text-xs">
                        <Row k="Emergency ID" v={sosSent.id} />
                        <Row k="Time Reported" v={sosSent.time} />
                        <Row k="Status" v="Rescue Team Notified" valueClass="text-emerald-300" />
                        <Row k="Location" v={LOCATION.route} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* GPS */}
              <div className="glass-strong rounded-3xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-neon" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Live GPS
                  </span>
                </div>
                <div className="aspect-video rounded-2xl mb-4 relative overflow-hidden border border-white/10 bg-gradient-to-br from-primary/20 to-background">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--neon))_0%,transparent_60%)]" />
                  <Mountain className="absolute bottom-3 right-3 h-10 w-10 text-neon/60" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-3 w-3 rounded-full bg-neon glow-neon" />
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-neon animate-ping" />
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <Row k="Latitude" v={LOCATION.lat} />
                  <Row k="Longitude" v={LOCATION.lng} />
                  <Row k="Elevation" v={LOCATION.elevation} />
                  <Row k="Nearest Shelter" v={LOCATION.shelter} />
                </div>
              </div>

              {/* Summary */}
              {isDone && (
                <div className="glass-strong rounded-3xl p-6 border border-white/10 animate-[fade-up_0.6s_ease-out]">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-neon" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Emergency Summary
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <Row k="Emergency ID" v={sosSent?.id ?? "Pending"} />
                    <Row k="Injury Type" v={answers.injury ?? "—"} />
                    <Row k="Pain Level" v={`${answers.pain ?? 0}/10`} />
                    <Row k="Can Walk" v={answers.mobility ?? "—"} />
                    <Row k="Severity" v={severity} valueClass={styles.text} />
                    <Row k="Location" v={LOCATION.route} />
                    <Row
                      k="Status"
                      v={sosSent ? "SOS Sent" : "Awaiting Dispatch"}
                      valueClass={sosSent ? "text-emerald-300" : "text-yellow-300"}
                    />
                  </div>
                </div>
              )}

              {!isDone && (
                <div className="glass rounded-2xl p-4 border border-white/10 flex items-center gap-3 text-xs text-muted-foreground">
                  <Loader2 className="h-4 w-4 text-neon animate-spin" />
                  Complete triage to generate full emergency report.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-4 border border-white/5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-base font-semibold mt-1">{value}</p>
    </div>
  );
}

function Row({
  k,
  v,
  valueClass = "",
}: {
  k: string;
  v: string;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between gap-3 py-1.5 border-b border-white/5 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className={`font-medium text-right ${valueClass}`}>{v}</span>
    </div>
  );
}

function AidBlock({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <ul className="space-y-1.5 pl-6">
        {items.map((i) => (
          <li key={i} className="text-sm text-muted-foreground relative before:content-['•'] before:absolute before:-left-4 before:text-neon">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
