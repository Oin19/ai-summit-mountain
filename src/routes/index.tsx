import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Technology } from "@/components/Technology";
import { Emergency } from "@/components/Emergency";
import { ChatDemo } from "@/components/ChatDemo";
import { FutureScope } from "@/components/FutureScope";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Snowfall } from "@/components/Snowfall";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI to the Summit — Your Intelligent Mountain Companion" },
      {
        name: "description",
        content:
          "An AI chatbot platform supporting trekkers, tourists and rescue teams in remote mountainous regions with trail guidance, weather, SOS and offline navigation.",
      },
      { property: "og:title", content: "AI to the Summit — Your Intelligent Mountain Companion" },
      {
        property: "og:description",
        content: "AI assistance for the world's toughest terrains.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Snowfall count={35} />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <Technology />
        <Emergency />
        <ChatDemo />
        <Stats />
        <FutureScope />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
