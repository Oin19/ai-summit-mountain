import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions: AI to the Summit" },
      {
        name: "description",
        content:
          "Terms of use for AI to the Summit, including acceptable use, the limits of its emergency and triage features, and disclaimers on trail, weather and location accuracy.",
      },
      { property: "og:title", content: "Terms and Conditions: AI to the Summit" },
      {
        property: "og:description",
        content:
          "Acceptable use, safety limitations and warranty disclaimers for the AI to the Summit mountain assistant.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: "https://ai-summit-mountain.lovable.app/terms-and-conditions",
      },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "canonical", href: "https://ai-summit-mountain.lovable.app/terms-and-conditions" },
    ],
  }),
  component: TermsPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-display text-xl font-bold mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Terms and Conditions
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Please read these terms before relying on any part of AI to the Summit.
          </p>

          <div className="glass-strong rounded-xl p-5 mb-10 border border-destructive/30">
            <h2 className="font-display text-base font-bold mb-2">Safety notice</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This site is an informational tool, not an emergency service and not medical advice.
              In a real emergency, contact local emergency services or mountain rescue directly by
              phone or radio. Do not delay that call in order to use this site.
            </p>
          </div>

          <Section title="Acceptance">
            <p>
              By using this website you agree to these terms. If you do not agree, do not use the
              service.
            </p>
          </Section>

          <Section title="Acceptable use">
            <p>
              Use the service lawfully and for its intended purpose. Do not submit false emergency
              information, attempt to gain unauthorised access, interfere with the service or the
              third party services it depends on, scrape it at scale, or use it to give professional
              medical or rescue advice to others as though it were verified.
            </p>
          </Section>

          <Section title="Accounts">
            <p>
              You are responsible for the accuracy of your registration details, for keeping your
              credentials confidential, and for activity carried out under your account. Tell us
              promptly if you believe your account has been compromised.
            </p>
          </Section>

          <Section title="Emergency and triage features">
            <p>
              The triage questionnaire produces a general severity indication and first aid
              suggestions based only on the answers you provide. It is not a diagnosis and cannot
              account for conditions it was not told about. The generated SOS report is a document
              for you to communicate to rescuers. Preparing a report does not dispatch responders,
              and we do not guarantee that any message reaches any authority.
            </p>
          </Section>

          <Section title="No warranty on trail, weather and location data">
            <p>
              Trail guidance, place names, elevation, weather and hazard information are derived
              from third party sources and from AI generated text. They may be incomplete, delayed,
              outdated or wrong, and mountain conditions change faster than any data feed.
              Everything is provided "as is" and "as available" without warranties of any kind.
              Always verify against official forecasts, local guides and authorities before making
              a decision in the field.
            </p>
          </Section>

          <Section title="Connectivity and availability">
            <p>
              Features that need a network connection, satellite fix or third party provider may be
              unavailable without notice. Offline content reflects what was cached on your device
              at the time you last opened it.
            </p>
          </Section>

          <Section title="Limitation of liability">
            <p>
              To the fullest extent permitted by law, we are not liable for any injury, loss,
              delay, damage or costs arising from your use of, or reliance on, this service,
              including decisions about routes, weather, medical care or rescue. You use the
              service at your own risk and remain responsible for your own safety.
            </p>
          </Section>

          <Section title="Intellectual property">
            <p>
              The site, its design and its content are owned by the project authors. You may not
              copy or redistribute them commercially without permission. Third party data remains
              subject to its own licences.
            </p>
          </Section>

          <Section title="Changes and termination">
            <p>
              We may modify, suspend or discontinue features, and may update these terms. Continued
              use after an update means you accept the revised terms.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms: [add your contact email address here]. This is a
              placeholder and should be replaced with a monitored address before launch.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
