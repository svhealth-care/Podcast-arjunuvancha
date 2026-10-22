import Image from "next/image";
import { initialsFor, publicImage } from "@/lib/media";
import type { Person } from "@/lib/types";

export function Portrait({
  person,
  className = "",
  sizes = "(min-width: 1024px) 320px, 50vw",
  priority = false,
}: {
  person: Person;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = publicImage(person.image);
  const initials = initialsFor(person.name);

  return (
    <div className={`relative overflow-hidden bg-ink-800 ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={`Portrait of ${person.name}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover grayscale"
          style={person.imagePosition ? { objectPosition: person.imagePosition } : undefined}
        />
      ) : (
        <div className="flex h-full min-h-40 flex-col items-center justify-center gap-2 text-cream/70">
          <span className="font-display text-4xl tracking-tight">{initials}</span>
          <span className="text-[10px] uppercase tracking-[0.22em]">A voice to discover</span>
        </div>
      )}
    </div>
  );
}
