interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
}

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const asText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json(
      { ok: false, error: "Please send a valid form submission." },
      400,
    );
  }

  // The hidden field catches basic automated submissions without adding friction for people.
  if (asText(payload.website)) return json({ ok: true });

  const name = asText(payload.name);
  const email = asText(payload.email);
  const company = asText(payload.company);
  const phone = asText(payload.phone);
  const message = asText(payload.message);

  if (
    !name ||
    !company ||
    !phone ||
    !message ||
    !/^\S+@\S+\.\S+$/.test(email)
  ) {
    return json(
      { ok: false, error: "Please complete all required fields." },
      422,
    );
  }

  if (
    [name, email, company, phone, message].some((value) => value.length > 2000)
  ) {
    return json({ ok: false, error: "One or more fields are too long." }, 422);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json(
      { ok: false, error: "The contact service is not configured." },
      503,
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `New Cube27 enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Phone: ${phone}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return json(
      { ok: false, error: "We could not send your message. Please try again." },
      502,
    );
  }

  return json({ ok: true });
};
