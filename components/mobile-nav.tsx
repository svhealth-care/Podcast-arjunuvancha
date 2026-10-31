"use client";

import Link from "next/link";
import { useState } from "react";
import { TwinFlags } from "@/components/flags";
import { site } from "@/content/site";

export function MobileNav({
  active,
  onNavigate,
}: {
  active?: string;
  onNavigate?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center border border-white/25 text-cream"
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">Menu</span>
        <span className="flex flex-col gap-1.5">
          <span className={`block h-px w-5 bg-cream transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-cream transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
        </span>
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-black px-5 py-6">
          <nav className="flex flex-col gap-4 text-sm uppercase tracking-[0.16em] text-cream/60">
            {site.nav.map((item) => {
              const id = item.href.replace("/#", "");
              const isActive = active === id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    onNavigate?.(id);
                    setOpen(false);
                  }}
                  className={isActive ? "text-cream" : "hover:text-cream"}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <TwinFlags />
            </div>
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-2 text-cream"
              onClick={() => setOpen(false)}
            >
              YouTube ↗
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
