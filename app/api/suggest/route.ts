import { Resend } from "resend";
import { NextResponse } from "next/server";

type SuggestBody = {
  personName?: string;
  story?: string;
  fromName?: string;
  fromEmail?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml({
  personName,
  story,
  fromName,
  fromEmail,
}: {
  personName: string;
  story: string;
  fromName: string;
  fromEmail: string;
}) {
  const safePerson = escapeHtml(personName);
  const safeStory = escapeHtml(story).replaceAll("\n", "<br />");
  const safeFromName = escapeHtml(fromName || "Anonymous");
  const safeFromEmail = escapeHtml(fromEmail || "Not provided");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New voice suggestion</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f2ee;color:#121212;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f2ee;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #d4d0c7;">
            <tr>
              <td style="background:#0a0a0a;padding:28px 32px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#9a9a94;">
                  Arjun Uvaach
                </p>
                <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;font-weight:500;color:#f7f6f2;">
                  A new voice suggestion
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6f6c66;">
                  Suggested person
                </p>
                <p style="margin:0 0 24px;font-size:24px;line-height:1.3;">${safePerson}</p>

                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6f6c66;">
                  Their story
                </p>
                <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#3a3a3a;">
                  ${safeStory}
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #d4d0c7;padding-top:20px;">
                  <tr>
                    <td style="padding-top:20px;">
                      <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6f6c66;">
                        Suggested by
                      </p>
                      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#121212;">
                        ${safeFromName}<br />
                        ${safeFromEmail}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#f7f6f2;border-top:1px solid #d4d0c7;padding:18px 32px;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#6f6c66;">
                  Sent from the Arjun Uvaach website · Real people. Useful lessons. Shared forward.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "hello@arjunuvach.com.au";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Arjun Uvaach <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  let body: SuggestBody;
  try {
    body = (await request.json()) as SuggestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const personName = body.personName?.trim() ?? "";
  const story = body.story?.trim() ?? "";
  const fromName = body.fromName?.trim() ?? "";
  const fromEmailAddress = body.fromEmail?.trim() ?? "";

  if (!personName || personName.length > 120) {
    return NextResponse.json({ error: "Please share a valid person’s name." }, { status: 400 });
  }
  if (!story || story.length > 2000) {
    return NextResponse.json({ error: "Please share a short story (up to 2000 characters)." }, { status: 400 });
  }
  if (fromName.length > 120) {
    return NextResponse.json({ error: "Your name is too long." }, { status: 400 });
  }
  if (fromEmailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmailAddress)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: fromEmailAddress || undefined,
      subject: `Voice suggestion: ${personName}`,
      html: buildEmailHtml({
        personName,
        story,
        fromName,
        fromEmail: fromEmailAddress,
      }),
      text: [
        "A new voice suggestion for Arjun Uvaach",
        "",
        `Suggested person: ${personName}`,
        "",
        "Their story:",
        story,
        "",
        `Suggested by: ${fromName || "Anonymous"}`,
        `Email: ${fromEmailAddress || "Not provided"}`,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json({ error: error.message || "Failed to send email." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
