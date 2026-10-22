import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { EraTimeline } from "@/components/era-timeline";
import { SectionHeading } from "@/components/section-heading";
import { historySources } from "@/content/history";

export const metadata: Metadata = {
  title: "Our journey",
  description: "Before the success, there was a crossing — the documented history of Indian lives in Australia.",
};

export default function JourneyPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="01 · The crossings"
          title={
            <>
              Before the success,
              <br />
              there was a <em className="not-italic text-cream/50">crossing.</em>
            </>
          }
          body="Long before airports and video calls, there were sea journeys, country roads and letters sent home."
        />
        <EraTimeline />
        <p className="mt-8 max-w-4xl border border-white/10 bg-ink-900 p-6 text-sm leading-7 text-muted">
          The surviving record is incomplete. We trace documented phases rather than claim one person as the first
          Indian migrant. Individual archival profiles, including{" "}
          <a
            href={historySources.ellum}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream hover:text-gold"
          >
            Ellum Deen’s recollection of arriving in Melbourne in 1891
          </a>
          , add names to that history. The journey leads to people, places and the lives being built today.
        </p>
        <div className="mt-10">
          <Link href="/voices" className="btn-ghost">
            Keep the story moving →
          </Link>
        </div>
      </Container>
    </section>
  );
}
