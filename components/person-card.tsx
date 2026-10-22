import Link from "next/link";
import { Portrait } from "@/components/portrait";
import { personHref, personKind } from "@/lib/people";
import type { Person } from "@/lib/types";

export function PersonCard({ person }: { person: Person }) {
  return (
    <Link
      href={personHref(person)}
      className="group flex flex-col border border-white/10 bg-ink-900/70 transition hover:border-gold/40"
    >
      <Portrait person={person} className="aspect-[4/5]" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold/80">{personKind(person)}</p>
        <h3 className="mt-2 text-xl tracking-tight">{person.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{person.role}</p>
        <p className="mt-auto pt-4 text-[11px] uppercase tracking-[0.16em] text-cream/45">
          {person.state ?? person.city ?? "Australia"}
        </p>
      </div>
    </Link>
  );
}
