import Image from "next/image";
import { AtlasExplorer } from "@/components/atlas-explorer";
import { Container } from "@/components/container";
import { TwinFlags } from "@/components/flags";
import { JourneySection } from "@/components/journey-section";
import { SuggestForm } from "@/components/suggest-form";
import { historySources } from "@/content/history";
import { site } from "@/content/site";
import { australiaShapes } from "@/lib/australia-map";
import {
  directoryReviewed,
  everyone,
  missions,
  shortlistedPeople,
} from "@/lib/people";

export default function HomePage() {
  const voices = shortlistedPeople();
  const sourced = everyone.filter((person) => person.sources?.length);

  return (
    <div>
      <section id="beginning" className="scroll-mt-20 border-b border-line bg-black text-cream">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <p className="eyebrow !text-cream/55">{site.show}</p>
              <TwinFlags />
            </div>
            <h1 className="mt-6 max-w-xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              The courage
              <br />
              to begin
              <br />
              <em className="not-italic text-cream/45">again.</em>
            </h1>
            <p className="mt-7 max-w-md text-sm leading-7 text-cream/65">{site.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#atlas" className="btn-primary !bg-cream !text-ink hover:!bg-white">
                Open the atlas
                <span aria-hidden="true">→</span>
              </a>
              <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="btn-on-dark">
                {site.youtubeLabel} ↗
              </a>
            </div>
            <a href="#host" className="mt-12 flex max-w-xl items-start gap-4 text-left">
              <span className="relative mt-1 h-16 w-12 shrink-0 overflow-hidden bg-ink">
                <Image
                  src="/images/arjun/host-portrait.jpg"
                  alt="Arjun Vekariya"
                  fill
                  className="object-cover object-[50%_18%] grayscale"
                  sizes="48px"
                />
              </span>
              <span className="min-w-0">
                <small className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cream/40">
                  <span>Hosted by {site.host.name}</span>
                  <span className="text-sm leading-none text-cream/55" aria-hidden="true">
                    ↗
                  </span>
                </small>
                <strong className="mt-2 block whitespace-pre-line text-sm font-normal leading-7 text-cream/80">
                  {site.host.short}
                </strong>
              </span>
            </a>
          </div>
          <figure className="relative min-h-[22rem] overflow-hidden bg-ink lg:min-h-full">
            <Image
              src="/images/podcast-studio.webp"
              alt="A black-and-white podcast microphone, headphones and interview studio"
              fill
              priority
              className="object-cover object-[70%_50%] grayscale"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <figcaption className="absolute bottom-6 left-6 right-6 text-[10px] uppercase tracking-[0.2em] text-cream/80">
              {site.ticker.join(" · ")}
            </figcaption>
          </figure>
        </Container>
      </section>

      <section id="journey" className="scroll-mt-20 border-b border-line py-12 sm:py-16">
        <Container>
          <JourneySection australia={australiaShapes} />
        </Container>
      </section>

      <section id="atlas" className="scroll-mt-20 border-b border-line py-16 sm:py-20">
        <Container>
          <AtlasExplorer people={voices} missions={missions} australia={australiaShapes} />
        </Container>
      </section>

      <section id="host" className="scroll-mt-20 border-b border-line py-16 sm:py-20">
        <Container>
          <p className="eyebrow">04 · The person behind the questions</p>
          <div className="mt-4 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
                I’m Arjun. And I’m still <em className="not-italic text-muted">learning.</em>
              </h2>
              <div className="mt-8 space-y-5 text-sm leading-7 text-muted">
                {site.host.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted">
                {site.host.role} · {site.host.location}
              </p>
            </div>
            <figure className="relative min-h-[24rem] overflow-hidden bg-paper-2">
              <Image
                src="/images/arjun/host-portrait.jpg"
                alt="Arjun Vekariya at the Australia India Business Council anniversary"
                fill
                className="object-cover object-[50%_18%] grayscale"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </figure>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <figure className="relative aspect-[4/3] overflow-hidden bg-paper-2">
              <Image
                src="/images/arjun/host-event-trio.jpg"
                alt="Arjun Vekariya with guests at an Australia India anniversary event"
                fill
                className="object-cover object-[50%_30%] grayscale"
                sizes="(min-width: 640px) 40vw, 100vw"
              />
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden bg-paper-2">
              <Image
                src="/images/arjun/host-event-group.jpg"
                alt="Arjun Vekariya with the gathering at the Australia India Address 2026"
                fill
                className="object-cover object-[50%_35%] grayscale"
                sizes="(min-width: 640px) 40vw, 100vw"
              />
            </figure>
          </div>

          <div className="mt-14 border border-line bg-cream p-6 sm:p-8">
            <p className="eyebrow">Suggest a voice</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              Know someone whose story should be shared forward? Draft a short note for Arjun.
            </p>
            <div className="mt-6">
              <SuggestForm />
            </div>
          </div>
        </Container>
      </section>

      <section id="credits" className="scroll-mt-20 py-16 sm:py-20">
        <Container>
          <p className="eyebrow">Sources & credits</p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            The record behind the stories.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
            Guest shortlist reviewed {directoryReviewed}. Roles come from named public sources. Public profiles do
            not imply a podcast appearance or endorsement.
          </p>
          <h3 className="mt-10 text-sm font-medium uppercase tracking-[0.16em] text-ink">History</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a href={historySources.history} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Home Affairs — Indian migration history ↗
              </a>
            </li>
            <li>
              <a
                href={historySources.population}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                Home Affairs — India-born population ↗
              </a>
            </li>
            <li>
              <a
                href={historySources.restriction}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                National Museum — White Australia policy ↗
              </a>
            </li>
            <li>
              <a href={historySources.ending} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                National Museum — end of the policy ↗
              </a>
            </li>
          </ul>
          <h3 className="mt-10 text-sm font-medium uppercase tracking-[0.16em] text-ink">People</h3>
          <ul className="mt-4 columns-1 gap-x-8 space-y-2 text-sm text-muted sm:columns-2 lg:columns-3">
            {sourced.map((person) => {
              const source = person.sources?.[0];
              if (!source) return null;
              return (
                <li key={person.id} className="break-inside-avoid">
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                    {person.name} ↗
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </div>
  );
}
