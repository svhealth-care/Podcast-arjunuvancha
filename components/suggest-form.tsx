"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function SuggestForm() {
  const [personName, setPersonName] = useState("");
  const [story, setStory] = useState("");
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personName, story, fromName, fromEmail }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setPersonName("");
      setStory("");
      setFromName("");
      setFromEmail("");
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="space-y-5">
        <label className="block">
          <span className="eyebrow">The person’s name</span>
          <input
            required
            maxLength={120}
            value={personName}
            onChange={(event) => setPersonName(event.target.value)}
            placeholder="Who would you like to introduce?"
            className="mt-3 w-full border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-ink"
          />
        </label>
        <label className="block">
          <span className="eyebrow">A little of their story</span>
          <textarea
            required
            maxLength={2000}
            rows={5}
            value={story}
            onChange={(event) => setStory(event.target.value)}
            placeholder="Where did they begin? What makes their story worth hearing?"
            className="mt-3 w-full border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-ink"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="eyebrow">Your name</span>
            <input
              maxLength={120}
              value={fromName}
              onChange={(event) => setFromName(event.target.value)}
              placeholder="Optional"
              className="mt-3 w-full border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-ink"
            />
          </label>
          <label className="block">
            <span className="eyebrow">Your email</span>
            <input
              type="email"
              maxLength={160}
              value={fromEmail}
              onChange={(event) => setFromEmail(event.target.value)}
              placeholder="So Arjun can reply"
              className="mt-3 w-full border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-ink"
            />
          </label>
        </div>
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send suggestion"}
          <span aria-hidden="true">↗</span>
        </button>
        <p className="text-xs leading-6 text-muted">
          Your note is emailed to hello@arjunuvach.com.au. Nothing is stored on this website.
        </p>
        {status === "error" ? <p className="text-sm text-red-700">{error}</p> : null}
      </form>

      <div className="border border-line bg-paper p-6">
        {status === "success" ? (
          <>
            <p className="eyebrow">Suggestion received</p>
            <h3 className="mt-4 font-display text-2xl text-ink">Thank you.</h3>
            <p className="mt-4 text-sm leading-7 text-muted">
              Your introduction is on its way to Arjun. If you shared an email, he can reply from there.
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">Where it goes</p>
            <h3 className="mt-4 font-display text-2xl text-ink">Straight to Arjun’s inbox.</h3>
            <p className="mt-4 text-sm leading-7 text-muted">
              Tell him who to meet and why their story matters. He’ll receive a clean email template with the
              person, the story, and your contact details.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">hello@arjunuvach.com.au</p>
          </>
        )}
      </div>
    </div>
  );
}
