import { useState, type ReactNode, type SyntheticEvent } from "react";
import {
  ArrowRight,
  MapPin,
  Linkedin,
  Mail,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

interface ContactProps {
  eyebrow?: string;
  headlineLines?: string[];
  body?: string;
  address?: string[];
  email?: string;
  submitLabel?: string;
}

const DEFAULT_ADDRESS = [
  "Cube27 IT Pvt. Ltd.",
  "Plot 12, Mulberry Garden 1,",
  "Magarpatta City, Hadapsar,",
  "Pune Maharashtra India 411013",
];

const AREA_OPTIONS = [
  "GCC / BOT Setup",
  "Salesforce & Enterprise Platforms",
  "Digital Product & Commerce",
  "Agentic AI & Automation",
  "Other / General Inquiry",
];

export function Contact({
  eyebrow = "Get in touch",
  headlineLines = ["Ready to Transform?", "Schedule a consultation."],
  body = "Schedule a consultation with our Solutions Architect to explore how we can extend your team with stability, intelligence, and scale.",
  address = DEFAULT_ADDRESS,
  email = "contact@cube27.com",
  submitLabel = "Send message",
}: ContactProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Contact request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="border-t border-cube27-border-primary bg-cube27-background-primary py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-5">
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            {eyebrow}
          </p>
          <h2 className="typography-heading mt-5 text-balance text-[clamp(1.75rem,3.2vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-cube27-text-primary">
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-cube27-text-secondary">
            {body}
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 size-5 shrink-0 text-cube27-accent-primary"
                strokeWidth={1.5}
              />
              <address className="not-italic text-[0.95rem] leading-relaxed text-cube27-text-secondary">
                {address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="flex items-center gap-3 text-[0.95rem] text-cube27-text-secondary">
              <Linkedin
                className="size-5 shrink-0 text-cube27-accent-primary"
                strokeWidth={1.5}
              />
              <a
                href="https://www.linkedin.com/company/cube27ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="cube27-link"
              >
                Connect on LinkedIn
              </a>
            </div>

            <div className="flex items-center gap-3 text-[0.95rem] text-cube27-text-secondary">
              <Mail
                className="size-5 shrink-0 text-cube27-accent-primary"
                strokeWidth={1.5}
              />
              <a
                href={`mailto:${email}`}
                className="cube27-link"
              >
                {email}
              </a>
            </div>

            <div className="flex items-center gap-3 text-[0.95rem] text-cube27-text-secondary">
              <Globe
                className="size-5 shrink-0 text-cube27-accent-primary"
                strokeWidth={1.5}
              />
              <span>
                24/7 Global Support across NORAM, EMEA, APAC, and India.
              </span>
            </div>
          </div>

          {/* Why Partner highlights */}
          <div className="mt-10 rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/40 p-6">
            <h3 className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
              Why Partner with Cube27?
            </h3>
            <ul className="mt-3 space-y-2 text-[0.88rem] text-cube27-text-primary">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cube27-accent-primary shrink-0" />
                <span>Top 1% talent with stringent hiring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cube27-accent-primary shrink-0" />
                <span>6-week resource onboarding</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cube27-accent-primary shrink-0" />
                <span>&lt;10% attrition for project continuity</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cube27-accent-primary shrink-0" />
                <span>95% SLA for enterprise support</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <Field label="Full Name *" name="name" required />
            <Field label="Work Email *" name="email" type="email" required />
            <Field label="Company Name *" name="company" required />
            <Field label="Phone Number *" name="phone" type="tel" required />

            <div className="sm:col-span-2">
              <FieldLabel htmlFor="areaOfInterest">
                Area of Interest *
              </FieldLabel>
              <select
                id="areaOfInterest"
                name="areaOfInterest"
                required
                className={fieldClass("h-12")}
              >
                <option value="">Select an option…</option>
                {AREA_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <FieldLabel htmlFor="message">
                Tell Us About Your Project *
              </FieldLabel>
              <textarea
                id="message"
                name="message"
                rows={8}
                required
                className={fieldClass("resize-none py-3")}
                placeholder="A brief description of your idea, process, or website…"
              />
            </div>

            <div
              className="absolute -left-[9999px] h-px w-px overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : submitLabel}
                  <ArrowRight className="size-4" />
                </Button>
                {status === "sent" && (
                  <p
                    className="text-[0.9rem] font-medium text-cube27-accent-primary"
                    aria-live="polite"
                  >
                    Thanks — our experts will be in touch shortly.
                  </p>
                )}
                {status === "error" && (
                  <p
                    className="text-[0.9rem] font-medium text-cube27-text-primary"
                    aria-live="polite"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
              <p className="text-[0.82rem] text-cube27-text-secondary">
                We typically respond within 24 business hours.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const fieldClass = (extra = "") =>
  `w-full rounded-lg border border-cube27-border-primary bg-cube27-background-primary px-4 text-[0.95rem] text-cube27-text-primary outline-none transition-colors placeholder:text-cube27-text-secondary/60 focus:border-cube27-accent-primary ${extra}`;

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.8rem] font-medium text-cube27-text-primary"
    >
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={fieldClass("h-12")}
      />
    </div>
  );
}
