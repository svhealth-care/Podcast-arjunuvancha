"use client";

import { useState } from "react";

export function SuggestForm() {
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prepared = `Hi Arjun, I’d love to suggest ${name} for Arjun Uvaach.\n\n${story}`;
    setMessage(prepared);
  }

  async function copyMessage() {
    if (!message) return;
    await navigator.clipboard.writeText(message);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-5">
        <label className="block">
          <span className="eyebrow">The person’s name</span>
          <input
            required
            maxLength={120}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Who would you like to introduce?"
            className="mt-3 w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/30 focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="eyebrow">A little of their story</span>
          <textarea
            required
            maxLength={2000}
            rows={6}
            value={story}
            onChange={(event) => setStory(event.target.value)}
            placeholder="Where did they begin? What makes their story worth hearing?"
            className="mt-3 w-full border border-white/15 bg-black/40 px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/30 focus:border-gold"
          />
        </label>
        <button type="submit" className="btn-primary">
          Prepare the introduction
          <span aria-hidden="true">↗</span>
        </button>
        <p className="text-xs leading-6 text-muted">
          Prepare a message to share with Arjun through your usual contact. This site sends and stores nothing.
        </p>
      </form>
      {message ? (
        <div className="border border-white/10 bg-ink-900 p-6">
          <p className="eyebrow">A conversation waiting to happen</p>
          <h3 className="mt-4 text-2xl">Your introduction is ready.</h3>
          <textarea readOnly value={message} className="mt-5 h-48 w-full border border-white/10 bg-black/50 p-4 text-sm leading-7 text-cream/80" />
          <button type="button" onClick={copyMessage} className="btn-ghost mt-4">
            Copy the message ↗
          </button>
        </div>
      ) : null}
    </div>
  );
}
