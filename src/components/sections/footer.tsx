import { Cube27Logo } from "@/components/ui/cube27-logo";

/**
 * @cube27Component
 * @cube27ComponentId cube27Footer
 * @cube27ComponentType section
 * @cube27ComponentPattern footer
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Shared site footer for cube27 on warm white with a hairline top rule: cube27 wordmark + one-line positioning at left, link columns rendered from a `columns` array, and a bottom bar with a dynamic copyright year and location. Keep it quiet and typographic — no accent fills.
 */
interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "GCC-as-a-Service", href: "/solutions" },
      { label: "Agentic AI & automation", href: "/solutions" },
      { label: "Data, BI & analytics", href: "/solutions" },
      { label: "Digital marketing", href: "/solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms-of-service" },
    ],
  },
];

interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
}

export function Footer({
  columns = DEFAULT_COLUMNS,
  tagline = "Engineering the intelligent enterprise.",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cube27-border-primary bg-cube27-background-primary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Cube27Logo className="text-cube27-text-primary" />
          <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-cube27-text-secondary">
            {tagline}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="typography-eyebrow text-[0.65rem] uppercase text-cube27-text-secondary">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.9rem] text-cube27-text-primary/80 transition-colors hover:text-cube27-accent-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-cube27-border-primary">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-[0.8rem] text-cube27-text-secondary sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {year} CUBE27. All rights reserved.</span>
          <span>Pune, India · Serving enterprises worldwide</span>
        </div>
      </div>
    </footer>
  );
}
