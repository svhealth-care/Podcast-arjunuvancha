import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ConversationCard } from "@/components/conversation-card";
import { SectionHeading } from "@/components/section-heading";
import { conversations } from "@/lib/conversations";
import { getPerson } from "@/lib/people";

export const metadata: Metadata = {
  title: "Conversations",
  description: "Proposed conversations from The Arjun Vekariya Show — real people, useful lessons, shared forward.",
};

export default function ConversationsPage() {
  const items = conversations();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="The Arjun Vekariya Show"
          title={
            <>
              Conversations
              <br />
              in motion.
            </>
          }
          body="Each card is a proposed conversation, not a confirmed interview. When episodes are recorded, they will take this same shape: a guest, a question, a lesson worth sharing."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item) => {
            const person = getPerson(item.guestId);
            if (!person) return null;
            return <ConversationCard key={item.slug} conversation={item} person={person} />;
          })}
        </div>
      </Container>
    </section>
  );
}
