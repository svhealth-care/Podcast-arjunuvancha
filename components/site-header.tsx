"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TwinFlags } from "@/components/flags";
import { MobileNav } from "@/components/mobile-nav";
import { site } from "@/content/site";

const sectionIds = site.nav.map((item) => item.href.replace("/#", ""));

export function SiteHeader() {
  const [active, setActive] = useState(sectionIds[0] ?? "beginning");

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    nodes.forEach((node) => observer.observe(node));

    const onScroll = () => {
      if (window.scrollY < 80) {
        setActive("beginning");
        return;
      }
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (nearBottom) {
        setActive(sectionIds[sectionIds.length - 1] ?? "host");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black text-cream">
      <div className="relative mx-auto flex h-16 w-full max-w-none items-center justify-between px-5 sm:h-[4.25rem] sm:px-8 lg:px-10 xl:px-14">
        <Link
          href="/#beginning"
          className="relative block h-8 w-[7.5rem] sm:h-9 sm:w-[8.75rem]"
          onClick={() => setActive("beginning")}
          aria-label={`${site.name} home`}
        >
          <Image
            src="/images/brand/arjun-uvaach-wordmark.jpg"
            alt={site.name}
            fill
            priority
            className="object-contain object-left"
            sizes="140px"
          />
        </Link>
        <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.18em] lg:flex">
          {site.nav.map((item) => {
            const id = item.href.replace("/#", "");
            const isActive = active === id;
            const isHost = id === "host";
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(id)}
                className={
                  isHost
                    ? `btn-on-dark ${isActive ? "border-cream text-cream" : ""}`
                    : `relative pb-1 transition hover:text-cream ${
                        isActive
                          ? "text-cream after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-cream"
                          : "text-cream/55"
                      }`
                }
              >
                {isHost ? `${item.label} →` : item.label}
              </Link>
            );
          })}
          <TwinFlags className="ml-2" />
        </nav>
        <MobileNav active={active} onNavigate={setActive} />
      </div>
    </header>
  );
}
