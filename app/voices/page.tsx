import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { VoicesExplorer } from "@/components/voices-explorer";
import { missions, people } from "@/lib/people";

export const metadata: Metadata = {
  title: "The atlas",
  description: "Touch a place. Meet its people. An atlas of proposed conversations across Australia.",
};

export default function VoicesPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="02 · An atlas of people"
          title={
            <>
              Touch a place.
              <br />
              Meet its <em className="not-italic text-cream/50">people.</em>
            </>
          }
          body="Choose a state, then slide through the lives beside it. The featured roster follows Arjun’s guest shortlist, including Indian-Australian and broader Australian voices."
        />
        <VoicesExplorer people={people} missions={missions} />
      </Container>
    </section>
  );
}
