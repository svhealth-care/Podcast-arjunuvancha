import Image from "next/image";
import Link from "next/link";
import { TwinFlags } from "@/components/flags";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-cream">
      <div className="mx-auto w-full max-w-none px-5 py-14 sm:px-8 lg:px-10 xl:px-14">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Link href="/#beginning" className="relative block h-10 w-[10.5rem]" aria-label={`${site.name} home`}>
              <Image
                src="/images/brand/arjun-uvaach-wordmark.jpg"
                alt={site.name}
                fill
                className="object-contain object-left"
                sizes="168px"
              />
            </Link>
            <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-cream/55">{site.tagline}</p>
            <div className="mt-5">
              <TwinFlags />
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-cream/65">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-cream">
                {item.label}
              </Link>
            ))}
            <Link href="/#credits" className="hover:text-cream">
              Sources & credits
            </Link>
            <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
              YouTube ↗
            </a>
          </nav>
        </div>
        <p className="mt-10 max-w-3xl text-xs leading-6 text-cream/50">{site.acknowledgement}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-cream/50">
          <p>
            © {site.year} Arjun Uvaach. {site.footerNote}
          </p>
          <span className="border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-cream/70">
            {site.badge}
          </span>
        </div>
      </div>
    </footer>
  );
}
