import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-5xl">This chapter is still being written.</h1>
        <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
          The page you asked for is not in the atlas. Try the conversations, the voices, or return home.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to the beginning →
        </Link>
      </Container>
    </section>
  );
}
