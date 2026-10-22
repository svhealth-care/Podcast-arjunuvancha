export function SectionHeading({
  eyebrow,
  title,
  body,
  light = false,
  as = "h2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  light?: boolean;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <header className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <Heading className={`mt-4 max-w-3xl text-4xl leading-[1.05] tracking-tight sm:text-5xl ${light ? "text-cream" : ""}`}>
          {title}
        </Heading>
      </div>
      {body ? <p className="max-w-md text-sm leading-7 text-muted">{body}</p> : null}
    </header>
  );
}
