import Link from "next/link";
import { Portrait } from "@/components/portrait";
import type { Conversation, Person } from "@/lib/types";

export function ConversationCard({
  conversation,
  person,
  featured = false,
}: {
  conversation: Conversation;
  person: Person;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/conversations/${conversation.slug}`}
      className={`group border border-white/10 bg-ink-900/80 transition hover:border-gold/50 ${
        featured ? "grid overflow-hidden md:grid-cols-[0.9fr_1.1fr]" : "flex flex-col"
      }`}
    >
      <Portrait
        person={person}
        className={featured ? "min-h-64 sm:min-h-72 md:min-h-full" : "aspect-[4/3] sm:aspect-[4/5]"}
        sizes={featured ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
      />
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="eyebrow">
          {conversation.number} · {conversation.duration}
        </p>
        <h3 className={`mt-4 font-display tracking-tight ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {conversation.title}
        </h3>
        <p className="mt-3 text-sm text-cream/70">{person.name}</p>
        <p className="mt-4 text-sm leading-7 text-muted">{conversation.lesson}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] uppercase tracking-[0.18em] text-gold group-hover:text-cream">
          Open the conversation
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
