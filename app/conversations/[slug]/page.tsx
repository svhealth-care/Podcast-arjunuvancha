import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Portrait } from "@/components/portrait";
import { site } from "@/content/site";
import { conversations, getConversation } from "@/lib/conversations";
import { conversationQuestions, getPerson, personHref } from "@/lib/people";

export function generateStaticParams() {
  return conversations().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const conversation = getConversation(slug);
  if (!conversation) return { title: "Conversation" };
  return {
    title: conversation.title,
    description: conversation.lesson,
  };
}

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const conversation = getConversation(slug);
  const person = conversation ? getPerson(conversation.guestId) : undefined;
  if (!conversation || !person) notFound();

  const questions = conversationQuestions(person);

  return (
    <article className="pb-20">
      <div className="border-b border-white/10 bg-ink-900">
        <Container className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Portrait
            person={person}
            className="aspect-[4/5] max-h-[34rem]"
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
          />
          <div className="flex flex-col justify-center">
            <p className="eyebrow">
              Episode {conversation.number} · {conversation.duration}
            </p>
            <h1 className="mt-5 max-w-xl text-4xl leading-tight tracking-tight sm:text-6xl">
              {conversation.title}
            </h1>
            <p className="mt-5 text-lg text-cream/75">{person.name}</p>
            <p className="mt-2 text-sm text-muted">{person.role}</p>
            <p className="mt-8 max-w-lg text-sm leading-7 text-muted">{conversation.lesson}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {conversation.status === "watch" ? (
                <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Watch on YouTube ↗
                </a>
              ) : (
                <span className="btn-ghost">Coming conversation</span>
              )}
              <Link href={personHref(person)} className="btn-ghost">
                Read the profile →
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">A conversation worth having</p>
          <blockquote className="mt-5 font-display text-3xl leading-snug text-cream/90">
            “{conversation.question}”
          </blockquote>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-cream/40">
            An editorial question for a future conversation, not a quotation from this person.
          </p>
          <div className="mt-10 space-y-4 text-sm leading-7 text-muted">
            <p>{person.bio}</p>
            {person.detail?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="border border-white/10 bg-ink-900 p-8">
          <p className="eyebrow">More questions</p>
          <ul className="mt-6 space-y-5 text-sm leading-7 text-cream/80">
            {questions.map((question) => (
              <li key={question} className="border-t border-white/10 pt-5 first:border-0 first:pt-0">
                {question}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-3">
            <Image src="/images/brand/arjun-uvaach-symbol.webp" alt="" width={36} height={36} />
            <p className="text-[11px] uppercase tracking-[0.16em] text-cream/50">
              Real people. Useful lessons. Shared forward.
            </p>
          </div>
        </aside>
      </Container>
    </article>
  );
}
