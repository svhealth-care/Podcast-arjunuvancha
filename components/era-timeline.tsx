"use client";

import { useState } from "react";
import { eras } from "@/content/history";

export function EraTimeline() {
  const [index, setIndex] = useState(0);
  const era = eras[index];

  return (
    <div>
      <div className="grid gap-8 border border-white/10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-80 overflow-hidden bg-ink-900 p-8 sm:p-10">
          <p className="eyebrow">India → Australia · a connection across the sea</p>
          <div className="mt-16 max-w-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-cream/40">India</p>
            <p className="mt-2 text-sm text-muted">A departure. A possibility.</p>
            <div className="my-8 h-px w-40 bg-gradient-to-r from-gold/80 to-transparent" />
            <p className="text-xs uppercase tracking-[0.28em] text-cream/40">Australia</p>
            <p className="mt-6 text-xs leading-6 text-cream/40">
              An illustrative ocean connection, not the route of one identified voyage or first arrival.
            </p>
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <p className="eyebrow">{era.short}</p>
          <p className="mt-4 font-display text-5xl tracking-tight text-gold">{era.year}</p>
          <h3 className="mt-5 text-3xl tracking-tight">{era.heading}</h3>
          <p className="mt-5 text-sm leading-7 text-muted">{era.body}</p>
          <a
            href={era.source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-[11px] uppercase tracking-[0.16em] text-cream/70 hover:text-cream"
          >
            {era.sourceName} ↗
          </a>
          <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-cream/40">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(eras.length).padStart(2, "0")} · Slide through history
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="h-9 w-9 border border-white/20 disabled:opacity-30"
                onClick={() => setIndex((value) => value - 1)}
                disabled={index === 0}
                aria-label="Previous historical chapter"
              >
                ←
              </button>
              <button
                type="button"
                className="h-9 w-9 border border-white/20 disabled:opacity-30"
                onClick={() => setIndex((value) => value + 1)}
                disabled={index === eras.length - 1}
                aria-label="Next historical chapter"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-2 sm:grid-cols-5">
        {eras.map((item, eraIndex) => (
          <button
            key={item.year}
            type="button"
            onClick={() => setIndex(eraIndex)}
            aria-pressed={eraIndex === index}
            className={`border px-4 py-4 text-left ${
              eraIndex === index ? "border-gold bg-ink-900" : "border-white/10 hover:border-white/30"
            }`}
          >
            <strong className="block text-lg">{item.year}</strong>
            <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-muted">{item.short}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
