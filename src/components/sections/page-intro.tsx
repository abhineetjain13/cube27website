import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * @cube27Component
 * @cube27ComponentId PageIntro
 * @cube27ComponentType section
 * @cube27ComponentPattern hero
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Shared top-of-page intro for the five pages that
 * reuse it (home, about, services, careers, success-stories — the contact page
 * does not use it). Split layout: eyebrow + display headline + lead body + a
 * single primary CTA on the left; media panel with a floating glass overlay
 * card on the right. Pages differentiate through copy props, not structure.
 * The overlay "See how it works" row renders as a real anchor only when
 * `overlayLinkHref` is provided; otherwise it is plain text with no link
 * affordance. `as` controls the headline element level (default h1).
 */
interface PageIntroProps {
  headlineLines?: string[];
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  overlayEyebrow?: string;
  overlayTitle?: string;
  overlayDescription?: string;
  overlayBadge?: string;
  overlayLinkLabel?: string;
  overlayLinkHref?: string;
  as?: "h1" | "h2";
}

const DEFAULT_HEADLINE = ["The technology", "behind better", "business."];
const DEFAULT_BODY =
  "CUBE27 builds digital marketing, ecommerce, machine learning, and business intelligence solutions that help ambitious organizations make better decisions and move faster.";

export function PageIntro({
  headlineLines = DEFAULT_HEADLINE,
  body = DEFAULT_BODY,
  ctaLabel = "Start a conversation",
  ctaHref = "/contact",
  overlayEyebrow = "INTELLIGENT OPERATIONS",
  overlayTitle = "Signal. Context. Action.",
  overlayDescription = "Continuous intelligence across data, marketing, and operations.",
  overlayBadge = "+24%",
  overlayLinkLabel = "See how it works",
  overlayLinkHref,
  as: Headline = "h1",
}: PageIntroProps) {
  return (
    <section className="overflow-hidden bg-cube27-background-primary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <p className="typography-eyebrow text-xs uppercase tracking-[0.2em] text-cube27-accent-primary font-semibold">
            Technology and solutions partner
          </p>
          <Headline className="typography-heading mt-4 text-balance text-[clamp(2.35rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-cube27-text-primary">
            {headlineLines.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </Headline>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-cube27-text-secondary">
            {body}
          </p>
          <div className="mt-8">
            <Button asChild variant="primary" size="lg">
              <a href={ctaHref} className="flex items-center gap-2 group">
                {ctaLabel}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-7 w-full h-[24rem] sm:h-[28rem] lg:h-[32rem] overflow-hidden rounded-2xl border border-cube27-border-primary shadow-[0_24px_80px_rgba(15,17,23,0.06)] group">
          {/* Main hero background image (LCP — eager + high priority) */}
          <img
            src="/cube27-bg.webp"
            srcSet="/cube27-bg-640.webp 640w, /cube27-bg-960.webp 960w, /cube27-bg-1280.webp 1280w, /cube27-bg.webp 1600w"
            sizes="(min-width: 1024px) 690px, 100vw"
            alt="Cube27 core operations background"
            width={1600}
            height={893}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          {/* Subtle overlay gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

          {/* Floating Premium Overlay Card in bottom-left */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:max-w-md rounded-xl border border-white/20 bg-white/90 backdrop-blur-md p-4 sm:p-5 shadow-[0_16px_48px_rgba(15,17,23,0.12)] transition-all duration-300 hover:shadow-[0_20px_56px_rgba(15,17,23,0.18)]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cube27-accent-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cube27-accent-primary"></span>
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] font-semibold text-cube27-text-secondary">
                {overlayEyebrow}
              </span>
            </div>
            <p className="mt-2 text-lg sm:text-xl font-medium leading-tight text-cube27-text-primary tracking-[-0.01em]">
              {overlayTitle}
            </p>
            <p className="mt-1 text-[0.82rem] leading-normal text-cube27-text-secondary">
              {overlayDescription}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-cube27-border-primary/50 pt-3">
              {overlayLinkHref ? (
                <a
                  href={overlayLinkHref}
                  className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-cube27-accent-primary hover:text-cube27-accent-secondary group/link transition-colors"
                >
                  {overlayLinkLabel}
                  <ArrowRight className="size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-cube27-text-secondary">
                  {overlayLinkLabel}
                </span>
              )}

              <div className="flex items-center gap-3">
                {/* Custom Sparkline drawing inside a mini-SVG */}
                <svg
                  className="w-16 h-6 overflow-visible text-cube27-accent-primary"
                  viewBox="0 0 100 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 25 C 20 25, 15 5, 35 15 C 55 25, 60 5, 80 12 L 100 2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Stat Badge */}
                {overlayBadge && (
                  <span className="inline-flex items-center justify-center rounded bg-cube27-accent-primary px-1.5 py-0.5 font-mono text-[0.7rem] font-semibold text-white tracking-wide animate-pulse">
                    {overlayBadge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
