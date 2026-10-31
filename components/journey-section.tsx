"use client";

import { useState } from "react";
import { TwinFlags } from "@/components/flags";
import { eras, historyFootnote, journeyIntro } from "@/content/history";
import type { StateShape } from "@/lib/australia-map";

export function JourneySection({ australia }: { australia: StateShape[] }) {
  const [index, setIndex] = useState(2);
  const era = eras[index];

  return (
    <div>
      <header className="flex flex-col gap-6 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow eyebrow-rule">02 · The crossings</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.07] tracking-tight text-ink sm:text-5xl">
            Before the success,
            <br />
            there was a <em className="not-italic text-muted">crossing.</em>
          </h2>
        </div>
        <div className="flex max-w-xs flex-col gap-4 md:items-end md:text-right">
          <TwinFlags />
          <p className="text-xs leading-6 text-muted">{journeyIntro}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-9">
        <figure className="relative order-2 min-h-[300px] overflow-hidden border border-[#dadada] bg-[#eaeaea] lg:order-1 lg:min-h-[390px]">
          <p className="absolute left-5 top-4 text-[8px] uppercase tracking-[0.18em] text-[#555]">
            India → Australia · a connection across the sea
          </p>
          <svg
            viewBox="0 0 640 440"
            className="block h-full max-h-[440px] min-h-[300px] w-full"
            role="img"
            aria-label="Illustrative connection across the Indian Ocean from India to Australia"
          >
            <defs>
              <pattern id="voyage-grid" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M42 0H0V42" fill="none" stroke="#b5b5b5" strokeWidth=".5" opacity=".3" />
              </pattern>
            </defs>
            <rect width="640" height="440" fill="url(#voyage-grid)" />
            <text x="58" y="98" fill="#6d6d6d" fontSize="12" letterSpacing="3">
              INDIA
            </text>
            <path d="M85 111Q130 145 155 181T196 252" fill="none" stroke="#aeaeae" strokeWidth="2" />
            <circle cx="154" cy="179" r="6" fill="#626262" stroke="#eaeaea" strokeWidth="3" />
            <text x="180" y="178" fill="#5e5e5e" fontSize="10">
              A departure. A possibility.
            </text>
            <path
              d="M158 185C167 260 190 340 275 366S352 392 378 366"
              fill="none"
              stroke="#686868"
              strokeWidth="1.7"
              strokeDasharray="5 6"
            />
            <g transform="translate(269 358) rotate(8)">
              <path d="M-15 3H18L11 12H-7Z" fill="#707070" />
              <path d="M0 3V-25L16 0Z" fill="#9d9d9d" />
              <path d="M-3-22L-14 0H-3Z" fill="#bebebe" />
            </g>
            <g transform="translate(342 225) scale(.39)">
              {australia.map((shape) => (
                <path key={shape.id} d={shape.d} fill="#bbbbbb" stroke="#eaeaea" strokeWidth="2" />
              ))}
            </g>
            <circle cx="378" cy="366" r="5" fill="#626262" stroke="#eaeaea" strokeWidth="2" />
            <text x="448" y="363" fill="#6f6f6f" fontSize="11" letterSpacing="2">
              AUSTRALIA
            </text>
            <text
              x="205"
              y="240"
              fill="#8b8b8b"
              fontSize="11"
              letterSpacing="3"
              transform="rotate(-12 205 240)"
            >
              INDIAN OCEAN
            </text>
          </svg>
          <figcaption className="absolute bottom-4 left-5 right-5 max-w-sm text-[8px] text-[#7b7b7b]">
            An illustrative ocean connection, not the route of one identified voyage or first arrival.
          </figcaption>
        </figure>

        <div className="order-1 flex flex-col justify-center py-2 lg:order-2" aria-live="polite">
          <p className="eyebrow eyebrow-rule">{era.short}</p>
          <p className="my-4 font-display text-5xl leading-[1.1] text-[#5d5d5d] sm:text-[57px]">{era.year}</p>
          <h3 className="mb-3 font-display text-3xl leading-[1.2] text-ink sm:text-[33px]">{era.heading}</h3>
          <p className="text-xs leading-[1.9] text-muted">{era.body}</p>
          <p className="mt-5 text-[10px] text-muted">
            <a href={era.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px]">
              {era.sourceName} <span aria-hidden="true">↗</span>
            </a>
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="mr-2 text-[9px] uppercase tracking-[0.12em] text-muted">
              {String(index + 1).padStart(2, "0")} / {String(eras.length).padStart(2, "0")} · Slide through history
            </span>
            <button
              type="button"
              className="round-button"
              onClick={() => setIndex((value) => value - 1)}
              disabled={index === 0}
              aria-label="Previous historical chapter"
            >
              ←
            </button>
            <button
              type="button"
              className="round-button"
              onClick={() => setIndex((value) => value + 1)}
              disabled={index === eras.length - 1}
              aria-label="Next historical chapter"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        className="mt-8 grid grid-cols-5 gap-2 border-t border-[#b5b5b5]"
        role="group"
        aria-label="Choose an era"
      >
        {eras.map((item, eraIndex) => {
          const active = eraIndex === index;
          return (
            <button
              key={item.year}
              type="button"
              onClick={() => setIndex(eraIndex)}
              aria-pressed={active}
              className="relative pb-4 pr-2 pt-6 text-left"
            >
              <span
                aria-hidden="true"
                className={`absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full border transition ${
                  active
                    ? "border-[#5d5d5d] bg-[#5d5d5d] shadow-[0_0_0_6px_rgba(93,93,93,0.08)]"
                    : "border-[#a2a2a2] bg-paper"
                }`}
              />
              <strong
                className={`block font-display text-base font-normal sm:text-[23px] ${
                  active ? "text-[#5d5d5d]" : "text-ink"
                }`}
              >
                {item.year}
              </strong>
              <span className="mt-2 block text-[9px] leading-normal text-muted sm:text-[10px]">{item.short}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 max-w-[900px] border-l-2 border-[#9d9d9d] bg-[#e6e6e6] px-5 py-4 text-[10px] leading-relaxed text-ink">
        {historyFootnote}
      </p>

      <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-muted">The journey leads to people, places and the lives being built today.</p>
        <a
          href="#atlas"
          className="inline-flex items-center gap-5 self-start border-b border-current pb-1 text-[10px] text-ink sm:self-auto"
        >
          Keep the story moving <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
