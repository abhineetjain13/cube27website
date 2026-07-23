import { Reveal } from "@/components/ui/reveal";

/**
 * @cube27Component
 * @cube27ComponentId cube27PartnerMarquee
 * @cube27ComponentType section
 * @cube27ComponentPattern marquee
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Trusted-partners band: a quiet eyebrow + statement over an infinite, edge-faded logo strip. Logos are whitespace-trimmed full-color marks that sit directly on the page background (no card chrome — their baked-in white backgrounds are near-identical to the warm-white canvas) and scroll continuously; the strip pauses on hover and, for reduced-motion users, becomes a static horizontally-scrollable row. Logos live in `public/images/logos/opt/{n}.webp`. Tune with `count`, `eyebrow`, `statement`.
 */
interface PartnerMarqueeProps {
  eyebrow?: string;
  statement?: string;
  /** Number of sequentially-named logos in images/logos/opt (1.webp … N.webp). */
  count?: number;
}

const LOGO_COUNT = 36;

export function PartnerMarquee({
  eyebrow = "Trusted partners",
  statement = "Brands and enterprises that count on Cube27 to engineer their intelligent operations.",
  count = LOGO_COUNT,
}: PartnerMarqueeProps) {
  const logos = Array.from(
    { length: count },
    (_, i) => `/images/logos/opt/${i + 1}.webp`,
  );

  return (
    <section className="border-t border-cube27-border-primary bg-cube27-background-primary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="typography-eyebrow text-[0.7rem] uppercase text-cube27-accent-primary">
            {eyebrow}
          </p>
          <p className="typography-heading mt-4 max-w-3xl text-balance text-[clamp(1.15rem,2vw,1.5rem)] font-medium leading-[1.3] tracking-[-0.01em] text-cube27-text-primary">
            {statement}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        {/* A single animated track holds two identical copies of the logo set,
            so translateX(-50%) advances by exactly one copy → seamless loop. */}
        <div
          className="cube27-marquee group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          aria-label="Partner and client logos"
        >
          <div className="cube27-marquee-track flex w-max">
            <ul className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
              {logos.map((src, i) => (
                <LogoCard key={src} src={src} index={i} />
              ))}
            </ul>
            <ul
              className="cube27-marquee-dup flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
              aria-hidden="true"
            >
              {logos.map((src, i) => (
                <LogoCard key={`dup-${src}`} src={src} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function LogoCard({ src, index }: { src: string; index: number }) {
  return (
    <li className="flex h-20 shrink-0 items-center justify-center sm:h-24">
      <img
        src={src}
        alt={`Partner ${index + 1}`}
        loading="lazy"
        decoding="async"
        className="max-h-16 w-auto max-w-[160px] object-contain sm:max-h-20 sm:max-w-[210px]"
      />
    </li>
  );
}
