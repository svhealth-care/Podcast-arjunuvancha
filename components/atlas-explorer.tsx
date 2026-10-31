"use client";

import { useMemo, useState } from "react";
import { Portrait } from "@/components/portrait";
import { TwinFlags } from "@/components/flags";
import { states, groupLabels } from "@/content/site";
import { faceSlots, projectPoint, statePoints, type StateShape } from "@/lib/australia-map";
import { initialsFor, publicImage } from "@/lib/media";
import { stateName } from "@/lib/people";
import type { Person, StateId } from "@/lib/types";

const honours = new Set(["OAM", "AM", "AO", "AC", "ASM", "PSM", "APM", "MP", "MLA", "MLC"]);

function shortLabel(name: string) {
  const words = name
    .replace(/^(Dr\.?|Professor|Prof\.?|Senator|The Hon\.?|Hon\.?)\s+/i, "")
    .replace(/\([^)]*\)/g, "")
    .split(/\s+/)
    .filter((word) => word && !honours.has(word.replace(/[.,]/g, "")));
  return words[words.length - 1] ?? name;
}

export function AtlasExplorer({
  people,
  missions,
  australia,
}: {
  people: Person[];
  missions: Person[];
  australia: StateShape[];
}) {
  const [state, setStateRaw] = useState<StateId>("SA");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function setState(id: StateId) {
    setStateRaw(id);
    setSelectedId(null);
  }

  const voices = useMemo(
    () => people.filter((person) => person.state === state).slice(0, 5),
    [people, state],
  );

  const mission = useMemo(
    () => missions.find((item) => item.states?.includes(state)),
    [missions, state],
  );

  const selected = voices.find((person) => person.id === selectedId) ?? voices[0];
  const slots = faceSlots[state];
  const meta = states.find((item) => item.id === state);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow eyebrow-rule">03 · An atlas of people</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Touch a place. Meet its <em className="not-italic text-muted">people.</em>
          </h2>
        </div>
        <TwinFlags />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {states.map((item) => {
          const active = item.id === state;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setState(item.id)}
              aria-pressed={active}
              className={`min-w-12 border px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition ${
                active
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-transparent text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {item.id}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,340px)] lg:items-start">
        <div className="relative border border-line bg-paper-2 p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Touch to explore</p>
              <p className="mt-2 font-display text-2xl text-ink">{meta?.name}</p>
              <p className="mt-1 text-sm text-muted">
                {voices.length} voices to discover · {meta?.capital}
              </p>
            </div>
            <p className="max-w-xs text-xs leading-5 text-muted">
              The map and the story move together. Choose a state, highlight a portrait, then slide through the
              lives beside it.
            </p>
          </div>

          <svg
            viewBox="0 0 630 570"
            className="mx-auto block h-auto w-full max-w-4xl"
            role="group"
            aria-label="Select an Australian state, territory or highlighted portrait"
          >
            <g>
              {australia.map((shape) => {
                const active = shape.id === state;
                return (
                  <path
                    key={shape.id}
                    d={shape.d}
                    role="button"
                    tabIndex={0}
                    aria-label={`Explore ${shape.name}`}
                    aria-pressed={active}
                    onClick={() => setState(shape.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setState(shape.id);
                      }
                    }}
                    className={`cursor-pointer outline-none transition-colors duration-300 focus-visible:stroke-[#5d5d5d] ${
                      active ? "fill-[#b3b3b3] stroke-[#878787]" : "fill-[#d4d4d4] stroke-[#eaeaea] hover:fill-[#b9b9b9]"
                    }`}
                    strokeWidth={1.5}
                    vectorEffect="non-scaling-stroke"
                  >
                    <title>{shape.name}</title>
                  </path>
                );
              })}
            </g>
            <g className="pointer-events-none">
              {(Object.keys(statePoints) as StateId[])
                .filter((id) => id !== "ACT")
                .map((id) => {
                  const [x, y] = projectPoint(...statePoints[id].label);
                  return (
                    <text key={id} x={x} y={y} textAnchor="middle" fontSize="11" letterSpacing="2" fill="#707070">
                      {id}
                    </text>
                  );
                })}
            </g>
            <g className="pointer-events-none">
              {states.map((item) => {
                const [x, y] = projectPoint(...statePoints[item.id].city);
                const alignEnd = item.id === "NSW" || item.id === "QLD" || item.id === "TAS";
                return (
                  <g key={item.id}>
                    <circle cx={x} cy={y} r="3.5" fill="#5d5d5d" stroke="#f8f8f8" strokeWidth="2.3" />
                    {item.id !== "ACT" ? (
                      <text
                        x={x + (alignEnd ? -10 : 10)}
                        y={item.id === "VIC" ? y + 21 : y + 4}
                        textAnchor={alignEnd ? "end" : "start"}
                        fontSize="10"
                        fill="#626262"
                      >
                        {item.capital}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </g>
            {voices.map((person, index) => {
              const [x, y] = slots[index];
              const src = publicImage(person.image);
              const active = selected?.id === person.id;
              const clip = `face-${person.id.replace(/[^a-z0-9-]/gi, "")}`;
              return (
                <g
                  key={person.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Highlight ${person.name}`}
                  aria-pressed={active}
                  onClick={() => setSelectedId(person.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(person.id);
                    }
                  }}
                  className="cursor-pointer outline-none"
                >
                  <title>{`${person.name} — ${person.role}`}</title>
                  <defs>
                    <clipPath id={clip}>
                      <circle cx={x} cy={y} r="23" />
                    </clipPath>
                  </defs>
                  {active ? <circle cx={x} cy={y} r="29" fill="none" stroke="#292929" strokeWidth="2" /> : null}
                  <circle cx={x} cy={y} r="26" fill="#f8f8f8" stroke={active ? "#292929" : "#9d9d9d"} strokeWidth="1.5" />
                  <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fill="#696969">
                    {initialsFor(person.name)}
                  </text>
                  {src ? (
                    <image
                      href={src}
                      x={x - 23}
                      y={y - 23}
                      width="46"
                      height="46"
                      preserveAspectRatio="xMidYMin slice"
                      clipPath={`url(#${clip})`}
                      style={{ filter: "grayscale(1)" }}
                    />
                  ) : null}
                  <text x={x} y={y + 40} textAnchor="middle" fontSize="9" fill="#292929">
                    {shortLabel(person.name)}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="mt-3 flex justify-between text-[9px] text-muted">
            <span>Portraits are linked to the selected state, not exact street locations.</span>
            <span>8 states &amp; territories</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col lg:sticky lg:top-24">
          {selected ? (
            <article className="border border-line bg-cream p-4">
              <Portrait
                person={selected}
                className="aspect-[4/5] w-full max-h-56"
                sizes="(min-width: 1024px) 320px, 90vw"
              />
              <p className="eyebrow mt-3 text-[10px]">{groupLabels[selected.group] ?? "A voice"}</p>
              <h3 className="mt-2 font-display text-xl tracking-tight text-ink sm:text-2xl">{selected.name}</h3>
              <p className="mt-1 text-xs leading-5 text-muted">{selected.role}</p>
              <p className="mt-1 text-xs text-muted">
                {selected.location ?? `${selected.city ?? meta?.capital} · ${state}`}
              </p>
              <p className="mt-3 line-clamp-4 text-xs leading-5 text-muted">{selected.bio}</p>
              {selected.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selected.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="border border-line px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {selected.sources?.[0] ? (
                <a
                  href={selected.sources[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-[10px] uppercase tracking-[0.16em] text-ink hover:underline"
                >
                  Source profile ↗
                </a>
              ) : null}
            </article>
          ) : (
            <p className="border border-line p-4 text-sm text-muted">No shortlisted voices in this state yet.</p>
          )}

          {voices.length > 0 ? (
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                More voices from {stateName(state)}
              </p>
              <ul className="mt-3 grid grid-cols-5 gap-1.5">
                {voices.map((person) => (
                  <li key={person.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(person.id)}
                      className={`w-full text-left ${selected?.id === person.id ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                    >
                      <Portrait person={person} className="aspect-square w-full" sizes="64px" />
                      <span className="mt-1 block truncate text-[9px] leading-3 text-ink">{shortLabel(person.name)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {mission ? (
            <a
              href={mission.sources?.[0]?.url ?? "#credits"}
              target={mission.sources?.[0]?.url ? "_blank" : undefined}
              rel={mission.sources?.[0]?.url ? "noopener noreferrer" : undefined}
              className="mt-4 flex items-center gap-3 border border-line bg-cream p-2.5 transition hover:border-ink"
            >
              <Portrait person={mission} className="h-12 w-12 shrink-0" sizes="48px" />
              <span className="min-w-0">
                <span className="block text-[9px] uppercase tracking-[0.14em] text-muted">
                  {mission.office ?? "Indian mission"}
                </span>
                <span className="mt-0.5 block truncate text-xs text-ink">{mission.name}</span>
                <span className="mt-0.5 block truncate text-[10px] text-muted">{mission.role}</span>
              </span>
              <span className="ml-auto text-muted" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
