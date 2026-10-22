"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteFooter() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Link href="/" className="relative block h-16 w-52 overflow-hidden" aria-label="Arjun Uvaach home">
            <Image
              src="/images/brand/arjun-uvaach-wordmark.webp"
              alt="Arjun Uvaach"
              fill
              className="object-cover object-center"
              sizes="208px"
            />
          </Link>
          <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-cream/45">{site.tagline}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-cream/70">
          {site.nav.map((item) => {
            const active = isCurrent(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={active ? "text-cream" : "hover:text-cream"}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/credits"
            aria-current={pathname === "/credits" ? "page" : undefined}
            className={pathname === "/credits" ? "text-cream" : "hover:text-cream"}
          >
            Sources & credits
          </Link>
          <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
            YouTube ↗
          </a>
        </div>
        <p className="max-w-3xl text-xs leading-6 text-cream/45 lg:col-span-2">{site.acknowledgement}</p>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-cream/40 lg:col-span-2">
          <p>© {site.year} Arjun Uvaach. {site.footerNote}</p>
          <span className="border border-white/15 px-3 py-1 uppercase tracking-[0.18em]">{site.badge}</span>
        </div>
      </div>
    </footer>
  );
}
