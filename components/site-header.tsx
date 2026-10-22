"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { site } from "@/content/site";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-[4.75rem] w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link href="/" className="relative block h-14 w-44 overflow-hidden sm:h-16 sm:w-52" aria-label="Arjun Uvaach home">
          <Image
            src="/images/brand/arjun-uvaach-wordmark.webp"
            alt="Arjun Uvaach"
            fill
            priority
            className="object-cover object-center"
            sizes="208px"
          />
        </Link>
        <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.2em] lg:flex">
          {site.nav.map((item) => {
            const active = isCurrent(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative pb-1 transition hover:text-cream ${
                  active
                    ? "text-cream after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-cream"
                    : "text-cream/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/25 px-4 py-2 text-cream transition hover:border-cream hover:bg-cream hover:text-black"
          >
            Listen ↗
          </a>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
