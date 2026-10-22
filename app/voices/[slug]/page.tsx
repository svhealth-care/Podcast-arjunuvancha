import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Portrait } from "@/components/portrait";
import { conversationQuestions, everyone, getPerson, personKind, stateName } from "@/lib/people";

export function generateStaticParams() {
  return everyone.map((person) => ({ slug: person.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return { title: "Voice" };
  return {
    title: person.name,
    description: person.bio,
  };
}

export default async function VoicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();
  const questions = conversationQuestions(person);
  const isMission = person.group === "mission";

  return (
    <article className="pb-20">
      <div className="border-b border-white/10 bg-ink-900">
        <Container className="grid gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Portrait
            person={person}
            className="aspect-[4/5] max-h-[36rem]"
            sizes="(min-width: 1024px) 38vw, 100vw"
            priority
          />
          <div className="flex flex-col justify-center">
            <p className="eyebrow">{personKind(person)}</p>
            <h1 className="mt-4 text-4xl leading-tight tracking-tight sm:text-6xl">{person.name}</h1>
            <p className="mt-4 text-gold/90">{person.role}</p>
            <p className="mt-3 text-sm text-muted">
              {person.location ?? person.city ?? person.jurisdiction ?? stateName(person.state)}
            </p>
            {person.tags?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {person.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-cream/60">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {person.shortlisted ? (
              <Link href={`/conversations/${person.id}`} className="btn-ghost mt-8 w-fit">
                Open the conversation →
              </Link>
            ) : null}
          </div>
        </Container>
      </div>
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5 text-sm leading-7 text-muted">
          <p>{person.bio}</p>
          {person.detail?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {person.heritage ? <p>{person.heritage}</p> : null}
          <p className="border border-white/10 bg-ink-900 p-5 text-xs leading-6 text-cream/55">
            {isMission
              ? `Responsible office: ${person.office}. Serving ${person.jurisdiction}. Visit the mission’s official website for current services.`
              : person.group === "parliament"
                ? "Current parliamentary role checked against published records. Heritage is described only where documented. Inclusion does not imply endorsement or a recorded interview."
                : person.group === "host"
                  ? "Host background and photographs supplied by Arjun."
                  : "An independently researched public profile, not a confirmed Arjun Uvaach guest or interview."}
          </p>
        </div>
        <aside>
          {!isMission ? (
            <div className="border border-white/10 p-7">
              <p className="eyebrow">A conversation worth having</p>
              <p className="mt-5 font-display text-2xl leading-snug">“{questions[0]}”</p>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-cream/40">
                An editorial question, not a quotation from this person.
              </p>
            </div>
          ) : null}
          <div className="mt-6 border border-white/10 p-7">
            <p className="eyebrow">Profile sources</p>
            <ul className="mt-5 space-y-3 text-sm">
              {person.sources?.length ? (
                person.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream/80 hover:text-cream"
                    >
                      {source.label} ↗
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-muted">A verified public source is still needed for this name.</li>
              )}
            </ul>
            <p className="mt-6 text-xs leading-6 text-cream/40">
              {person.image
                ? `Portrait: ${person.credit ?? "The linked public profile source"}.`
                : "A typographic placeholder is shown. A verified portrait has not yet been added."}
            </p>
          </div>
        </aside>
      </Container>
    </article>
  );
}
