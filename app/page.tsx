import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { ConversationCard } from "@/components/conversation-card";
import { PersonCard } from "@/components/person-card";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";
import { featuredConversations } from "@/lib/conversations";
import { getPerson, shortlistedPeople } from "@/lib/people";

export default function HomePage() {
  const featured = featuredConversations();
  const latest = featured[0];
  const latestPerson = latest ? getPerson(latest.guestId) : undefined;
  const more = featured.slice(1);
  const voices = shortlistedPeople().slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10 bg-black">
        <div className="mx-auto grid min-h-[38rem] max-w-[1600px] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16">
            <p className="eyebrow">{site.show}</p>
            <h1 className="mt-7 max-w-xl text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              The courage
              <br />
              to begin
              <br />
              <em className="not-italic text-cream/45">again.</em>
            </h1>
            <p className="mt-7 max-w-md text-sm leading-7 text-cream/65">{site.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/voices" className="btn-primary">
                Meet the voices
                <span aria-hidden="true">→</span>
              </Link>
              <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {site.youtubeLabel} ↗
              </a>
            </div>
            <Link href="/host" className="mt-12 flex max-w-sm items-center gap-4 text-left">
              <span className="relative h-16 w-12 overflow-hidden bg-ink-800">
                <Image
                  src="/images/arjun/parliament-senate.webp"
                  alt="Arjun visiting Parliament House"
                  fill
                  className="object-cover object-[50%_32%] grayscale"
                  sizes="48px"
                />
              </span>
              <span>
                <small className="block text-[10px] uppercase tracking-[0.18em] text-cream/40">
                  Hosted by {site.host.name}
                </small>
                <strong className="mt-1 block text-sm font-normal leading-6 text-cream/80">
                  {site.host.short}
                </strong>
              </span>
              <span className="ml-auto text-xl text-cream/40" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
          <figure className="relative min-h-[22rem] lg:min-h-full">
            <Image
              src="/images/podcast-studio.webp"
              alt="A black-and-white podcast microphone, headphones and interview studio"
              fill
              priority
              className="object-cover object-[70%_50%] grayscale"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent lg:via-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-24 right-[7%] hidden w-40 overflow-hidden border-4 border-[#f5f5f2] shadow-2xl sm:block">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/arjun/parliament-visit.webp"
                  alt="Arjun Vekariya during his Canberra visit"
                  fill
                  className="object-cover object-[50%_28%] grayscale"
                  sizes="160px"
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-2 pb-2 pt-8 text-[9px] uppercase tracking-[0.16em]">
                Arjun Vekariya
                <br />
                Your host
              </span>
            </div>
            <figcaption className="absolute bottom-8 left-[8%] right-[8%] z-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-cream/80">
              <Image
                src="/images/brand/arjun-uvaach-symbol.webp"
                alt=""
                width={40}
                height={40}
              />
              <span>
                The story behind
                <br />
                the person.
              </span>
              <span className="sound-bars ml-auto" aria-hidden="true">
                {[14, 25, 38, 18, 46, 30, 16, 35, 24].map((height, index) => (
                  <i key={height + index} style={{ height, animationDelay: `${index * 0.11}s` }} />
                ))}
              </span>
            </figcaption>
          </figure>
        </div>
        <div className="flex flex-wrap items-center gap-5 border-t border-white/10 px-6 py-5 text-[10px] uppercase tracking-[0.22em] text-cream/55 sm:px-12">
          {site.ticker.map((item, index) => (
            <span key={item} className="flex items-center gap-5">
              {index > 0 ? <i className="h-1 w-1 rounded-full bg-cream/30" /> : null}
              {item}
            </span>
          ))}
          <Link href="/journey" className="ml-auto text-cream/80 hover:text-cream">
            Slide into the story →
          </Link>
        </div>
      </section>

      {latest && latestPerson ? (
        <section className="border-b border-white/10 py-20">
          <Container>
            <SectionHeading
              eyebrow="Latest from the show"
              title={
                <>
                  A conversation
                  <br />
                  worth having.
                </>
              }
              body="Recorded episodes will live here. Until then, these pages hold the proposed conversations behind Arjun Uvaach — the people, the questions, the lesson worth passing on."
            />
            <ConversationCard conversation={latest} person={latestPerson} featured />
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {more.map((item) => {
                const person = getPerson(item.guestId);
                if (!person) return null;
                return <ConversationCard key={item.slug} conversation={item} person={person} />;
              })}
            </div>
            <div className="mt-10">
              <Link href="/conversations" className="btn-ghost">
                See all conversations →
              </Link>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-white/10 py-20">
        <Container>
          <SectionHeading
            eyebrow="02 · An atlas of people"
            title={
              <>
                Touch a place.
                <br />
                Meet its <em className="not-italic text-cream/50">people.</em>
              </>
            }
            body="Arjun’s selected voices from each state: Indian-Australian stories alongside wider Australian perspectives."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {voices.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
          <div className="mt-10">
            <Link href="/voices" className="btn-ghost">
              Open the story atlas →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-10 border border-white/10 bg-ink-900 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow">04 · The person behind the questions</p>
              <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
                I’m Arjun.
                <br />
                And I’m still <em className="not-italic text-cream/50">learning.</em>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-muted">{site.host.story[0]}</p>
              <Link href="/host" className="btn-ghost mt-8">
                A little more of my story ↗
              </Link>
            </div>
            <div className="relative min-h-80 overflow-hidden">
              <Image
                src="/images/arjun/parliament-visit.webp"
                alt="Arjun during his visit to Parliament House, Canberra"
                fill
                className="object-cover object-[50%_25%] grayscale"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-4 py-4 text-[10px] uppercase tracking-[0.18em]">
                Arjun Vekariya · a visit to Canberra
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
