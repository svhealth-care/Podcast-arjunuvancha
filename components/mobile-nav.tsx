"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center border border-white/15 text-cream"
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
          <nav className="flex flex-col gap-4 text-sm uppercase tracking-[0.18em] text-cream/70">
            {site.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={active ? "text-cream" : "hover:text-cream"}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="pt-2 text-cream"
              onClick={() => setOpen(false)}
            >
              Listen ↗
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
