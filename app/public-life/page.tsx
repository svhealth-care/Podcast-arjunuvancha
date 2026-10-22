import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PublicLifeExplorer } from "@/components/public-life-explorer";
import { SectionHeading } from "@/components/section-heading";
import { parliamentarians } from "@/lib/people";

export const metadata: Metadata = {
  title: "In public life",
  description: "Indian-origin Australians serving in federal, state and territory parliaments.",
};

export default function PublicLifePage() {
  const people = parliamentarians();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="03 · In public life"
          title={
            <>
              Finding a voice.
              <br />
              Taking a <em className="not-italic text-cream/50">seat.</em>
            </>
          }
          body="Meet Indian-origin Australians serving in federal, state and territory parliaments. Select a state or open a portrait to learn more."
        />
        <PublicLifeExplorer people={people} />
        <p className="mt-10 max-w-4xl text-xs leading-6 text-cream/40">
          Checked 19 October 2026. This is a researched directory of current federal, state and territory members
          with documented Indian heritage, including mixed ancestry and Indo-Fijian heritage. It excludes local
          councillors and former parliamentarians. It is not a claim of official or exhaustive ethnic classification.
          Inclusion is independent of party and does not imply endorsement or a podcast appearance.
        </p>
      </Container>
    </section>
  );
}
