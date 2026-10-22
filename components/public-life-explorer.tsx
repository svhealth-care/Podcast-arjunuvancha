"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Portrait } from "@/components/portrait";
import { states } from "@/content/site";
import { personHref } from "@/lib/people";
import type { Person } from "@/lib/types";

export function PublicLifeExplorer({ people }: { people: Person[] }) {
  const [state, setState] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return people.filter((person) => {
      if (state !== "all" && person.state !== state) return false;
      if (!needle) return true;
      return [person.name, person.role, person.location, person.bio, ...(person.tags ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [people, state, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-y border-white/10 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={state === "all"} onClick={() => setState("all")}>
            All Australia
          </FilterChip>
          {states.map((item) => (
            <FilterChip key={item.id} active={state === item.id} onClick={() => setState(item.id)}>
              {item.id}
            </FilterChip>
          ))}
        </div>
        <label className="flex items-center gap-3 border border-white/15 px-4 py-2 text-sm text-cream/70">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a name, place or chamber…"
            aria-label="Search parliamentarians"
            className="w-64 bg-transparent outline-none placeholder:text-cream/30"
          />
        </label>
      </div>
      <div className="mb-8 flex gap-5 border border-white/10 p-5">
        <strong className="font-display text-5xl text-cream">{visible.length}</strong>
        <p className="max-w-2xl text-sm leading-7 text-muted">
          {state === "all"
            ? "Current federal, state and territory parliamentarians in this researched collection."
            : `Profiles for ${states.find((item) => item.id === state)?.name}.`}{" "}
          Indian heritage is supported by published sources, not inferred from names.
        </p>
      </div>
      {visible.length ? (
        <div className="grid gap-5">
          {visible.map((person) => (
            <Link
              key={person.id}
              href={personHref(person)}
              className="grid gap-0 border border-white/10 bg-ink-900/70 transition hover:border-gold/40 md:grid-cols-[220px_1fr]"
            >
              <Portrait person={person} className="min-h-56 md:min-h-full" sizes="220px" />
              <div className="p-6 sm:p-8">
                <p className="eyebrow">
                  {person.state} · {person.chamber === "Federal" ? "Federal parliament" : "State / territory"}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-cream/50">{person.office}</p>
                <h3 className="mt-2 text-2xl tracking-tight sm:text-3xl">{person.name}</h3>
                <p className="mt-2 text-sm text-gold/80">{person.role}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{person.bio}</p>
                <span className="mt-5 inline-block text-[11px] uppercase tracking-[0.16em] text-cream">
                  Read the profile →
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-white/10 p-10">
          <h3 className="text-2xl">The collection is still growing.</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
            No current matching parliamentarian was identified in this review. Try all Australia, or explore the
            atlas of community voices.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-3 py-2 text-[11px] uppercase tracking-[0.16em] ${
        active ? "bg-cream text-black" : "border border-white/15 text-cream/70 hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}
