import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { CopyButton } from "@/components/copy-button";
import { SuggestForm } from "@/components/suggest-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Meet Arjun",
  description: site.host.intro,
};

export default function HostPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-white/10">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">04 · The person behind the questions</p>
            <h1 className="mt-5 text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              I’m Arjun.
              <br />
              And I’m still <em className="not-italic text-cream/45">learning.</em>
            </h1>
            <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-muted">
              {site.host.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <figure className="relative min-h-[28rem] overflow-hidden">
            <Image
              src="/images/arjun/parliament-visit.webp"
              alt="Arjun during his visit to Parliament House, Canberra"
              fill
              priority
              className="object-cover object-[50%_25%] grayscale"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-4 py-4 text-[10px] uppercase tracking-[0.18em]">
              Arjun Vekariya · a visit to Canberra
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="border-b border-white/10">
        <Container className="grid gap-8 py-16 lg:grid-cols-[0.85fr_1fr_1fr]">
          <div>
            <p className="eyebrow">From my camera</p>
            <h2 className="mt-5 text-4xl leading-tight">
              Curiosity takes
              <br />
              you places.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
              A few moments from my visit to Canberra. Every place opens up another question about the country we
              call home.
            </p>
          </div>
          <figure className="relative min-h-80 overflow-hidden">
            <Image
              src="/images/arjun/canberra-overlook.webp"
              alt="Arjun looking over Canberra from Parliament House"
              fill
              className="object-cover grayscale"
              sizes="(min-width: 1024px) 30vw, 100vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-4 py-3 text-[10px] uppercase tracking-[0.16em]">
              Canberra · a different perspective
            </figcaption>
          </figure>
          <figure className="relative min-h-80 overflow-hidden">
            <Image
              src="/images/arjun/parliament-senate.webp"
              alt="Arjun in the visitors’ area of the Senate chamber at Parliament House"
              fill
              className="object-cover object-[50%_28%] grayscale"
              sizes="(min-width: 1024px) 30vw, 100vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-4 py-3 text-[10px] uppercase tracking-[0.16em]">
              Parliament House · the Senate chamber
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="border-b border-white/10">
        <Container className="grid gap-10 py-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">When we meet</p>
            <h2 className="mt-4 text-3xl">
              The 30-second
              <br />
              introduction.
            </h2>
          </div>
          <div>
            <blockquote className="font-display text-2xl leading-snug text-cream/90 sm:text-3xl">
              “{site.host.intro}”
            </blockquote>
            <div className="mt-6">
              <CopyButton text={site.host.copyIntro} label="Copy my introduction" />
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <p className="eyebrow">A story starts with a hello</p>
          <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
            Whose story
            <br />
            should we hear <em className="not-italic text-gold">next?</em>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
            A first-generation migrant. A quiet community builder. A parent who began again. Tell me who comes to
            mind.
          </p>
          <div className="mt-10">
            <SuggestForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
