"use client";

import { useMemo, useState } from "react";
import { Portrait } from "@/components/portrait";
import { TwinFlags } from "@/components/flags";
import { states } from "@/content/site";
import { stateName } from "@/lib/people";
import type { Person } from "@/lib/types";

export function PublicLifeSection({ people }: { people: Person[] }) {
  const [state, setState] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return people.filter((person) => {
      if (state !== "all" && person.state !== state) return false;
      if (!needle) return true;
      return (
        person.name.toLowerCase().includes(needle) ||
        person.role.toLowerCase().includes(needle) ||
        (person.location ?? "").toLowerCase().includes(needle)
      );
    });
  }, [people, state, query]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="max-w-3xl font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Indian-origin voices in Australian parliament.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            A researched directory for context — not an endorsement, affiliation, or confirmed podcast roster.
          </p>
        </div>
        <TwinFlags />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setState("all")}
          className={`border px-3 py-2 text-[11px] uppercase tracking-[0.16em] ${
            state === "all" ? "border-ink bg-ink text-cream" : "border-line text-muted"
          }`}
        >
          All
        </button>
        {states.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setState(item.id)}
            className={`border px-3 py-2 text-[11px] uppercase tracking-[0.16em] ${
              state === item.id ? "border-ink bg-ink text-cream" : "border-line text-muted"
            }`}
          >
            {item.id}
          </button>
        ))}
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a name"
          className="ml-auto min-w-[12rem] border border-line bg-cream px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
        />
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {filtered.map((person) => (
          <li key={person.id} className="flex gap-4 py-5">
            <Portrait person={person} className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" sizes="80px" />
            <div className="min-w-0">
              <p className="text-base text-ink">{person.name}</p>
              <p className="mt-1 text-sm text-muted">
                {person.role}
                {person.state ? ` · ${stateName(person.state)}` : null}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted line-clamp-2">{person.bio}</p>
              {person.sources?.[0] ? (
                <a
                  href={person.sources[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[11px] uppercase tracking-[0.16em] text-ink hover:underline"
                >
                  Source ↗
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? <p className="mt-6 text-sm text-muted">No matches in this filter.</p> : null}
    </div>
  );
}
