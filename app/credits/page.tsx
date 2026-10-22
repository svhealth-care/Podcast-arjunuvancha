import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { historySources } from "@/content/history";
import { everyone } from "@/lib/people";

export const metadata: Metadata = {
  title: "Sources & credits",
  description: "The record behind the stories of Arjun Uvaach.",
};

export default function CreditsPage() {
  const sourced = everyone.filter((person) => person.sources?.length);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="The record behind the stories"
          title="Sources & portraits."
          body="Guest shortlist reviewed 20 October 2026. Parliamentary roles previously checked 19 October 2026. Portraits come from the named public sources. Names and titles are independently checked; the collection is curated and continues to grow."
        />
        <h3 className="text-2xl">People & public life</h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {sourced.map((person) => {
            const source = person.sources?.[0];
            if (!source) return null;
            return (
              <a
                key={person.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 p-4 hover:border-gold/50"
              >
                <strong className="block">{person.name} ↗</strong>
                <small className="mt-1 block text-muted">
                  {person.role} · {person.state ?? person.states?.join(" / ")}
                </small>
              </a>
            );
          })}
        </div>
        <h3 className="mt-14 text-2xl">History, geography & the opening</h3>
        <ul className="mt-5 space-y-3 text-sm text-cream/75">
          <li>
            <a href={historySources.history} className="hover:text-cream" target="_blank" rel="noopener noreferrer">
              Home Affairs — Indian migration history ↗
            </a>
          </li>
          <li>
            <a href={historySources.population} className="hover:text-cream" target="_blank" rel="noopener noreferrer">
              Home Affairs — India-born population, dated June 2024 ↗
            </a>
          </li>
          <li>
            <a href={historySources.restriction} className="hover:text-cream" target="_blank" rel="noopener noreferrer">
              National Museum — White Australia policy ↗
            </a>{" "}
            and{" "}
            <a href={historySources.ending} className="hover:text-cream" target="_blank" rel="noopener noreferrer">
              its end ↗
            </a>
          </li>
          <li>
            <a href={historySources.ellum} className="hover:text-cream" target="_blank" rel="noopener noreferrer">
              National Archives — Ellum Deen ↗
            </a>
          </li>
          <li>
            <a href={historySources.anzacs} className="hover:text-cream" target="_blank" rel="noopener noreferrer">
              Australian War Memorial — Indian Anzacs ↗
            </a>
          </li>
          <li>
            <a href={historySources.consulates} className="hover:text-cream" target="_blank" rel="noopener noreferrer">
              DFAT — Indian consulates ↗
            </a>{" "}
            and{" "}
            <a href={historySources.highCommission} className="hover:text-cream" target="_blank" rel="noopener noreferrer">
              High Commission ↗
            </a>
          </li>
        </ul>
        <p className="mt-10 max-w-3xl text-sm leading-7 text-muted">
          Podcast studio: original AI-created image for this website concept. Arjun’s Canberra photographs and the
          black-and-white logo were supplied by Arjun. The ocean connection is illustrative, not a particular
          historical voyage. Public profiles do not imply a podcast appearance, institutional affiliation or
          endorsement. Fonts: DM Sans and Playfair Display, SIL Open Font License.
        </p>
      </Container>
    </section>
  );
}
