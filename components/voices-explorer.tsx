"use client";

import { useMemo, useState } from "react";
import { PersonCard } from "@/components/person-card";
import { states } from "@/content/site";
import type { Person } from "@/lib/types";

const focuses = [
  { id: "shortlist", label: "Guest shortlist" },
  { id: "leaders", label: "Community" },
  { id: "mps", label: "Public life" },
  { id: "missions", label: "Indian missions" },
  { id: "all", label: "All voices" },
] as const;

type Focus = (typeof focuses)[number]["id"];

export function VoicesExplorer({
  people,
  missions,
}: {
  people: Person[];
  missions: Person[];
}) {
  const [state, setState] = useState("all");
  const [focus, setFocus] = useState<Focus>("shortlist");

  const visible = useMemo(() => {
    const fromPeople = people.filter((person) => {
      if (person.group === "host") return focus === "all";
      if (state !== "all" && person.state !== state) return false;
      if (focus === "shortlist") return Boolean(person.shortlisted);
      if (focus === "leaders") return person.group === "leader";
      if (focus === "mps") return person.group === "parliament";
      if (focus === "missions") return false;
      return true;
    });

    const fromMissions =
      focus === "missions" || focus === "all"
        ? missions.filter((person) => state === "all" || person.states?.includes(state))
        : [];

    return [...fromPeople, ...fromMissions];
  }, [people, missions, state, focus]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-y border-white/10 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by state">
          <FilterButton active={state === "all"} onClick={() => setState("all")}>
            All Australia
          </FilterButton>
          {states.map((item) => (
            <FilterButton key={item.id} active={state === item.id} onClick={() => setState(item.id)}>
              {item.id}
            </FilterButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose people shown">
          {focuses.map((item) => (
            <FilterButton key={item.id} active={focus === item.id} onClick={() => setFocus(item.id)}>
              {item.label}
            </FilterButton>
          ))}
        </div>
      </div>
      <p className="mb-6 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "voice" : "voices"} to discover.
        Profiles introduce proposed conversations, not confirmed podcast guests.
      </p>
      {visible.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      ) : (
        <div className="border border-white/10 p-10">
          <h3 className="text-2xl">A chapter still being written.</h3>
          <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
            No matching voice for this view. Try another state, or look through the full atlas.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterButton({
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
        active ? "bg-cream text-black" : "border border-white/15 text-cream/70 hover:border-cream hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}
