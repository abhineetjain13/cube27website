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
    title: "Services",
    links: [
      { label: "GCC & BOT Model", href: "/services#gcc" },
      { label: "Salesforce & Platforms", href: "/services#commerce" },
      { label: "Digital Product Engineering", href: "/services#engineering" },
      { label: "AI & Automation", href: "/services#ai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "CSR", href: "/csr" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

interface FooterProps {
  columns?: FooterColumn[];
  tagline?: string;
}

export function Footer({
  columns = DEFAULT_COLUMNS,
  tagline = "Stability. Intelligence. Scale. Building high-performance GCCs and enterprise solutions.",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cube27-border-primary bg-cube27-background-primary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Cube27Logo className="text-cube27-text-primary" />
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-cube27-text-secondary">
            {tagline}
          </p>
          <div className="mt-6 text-[0.88rem] leading-relaxed text-cube27-text-secondary">
            <p className="font-medium text-cube27-text-primary">
              Cube27 IT Pvt. Ltd.
            </p>
            <p>Plot No. 12, Mulberry Gardens 1,</p>
            <p>Magarpatta City, Hadapsar, Pune 411013</p>
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:gap-4">
              <a
                href="mailto:contact@cube27.com"
                className="hover:text-cube27-accent-primary"
              >
                contact@cube27.com
              </a>
              <a
                href="tel:+919881720375"
                className="hover:text-cube27-accent-primary"
              >
                +91-9881720375
              </a>
            </div>
          </div>
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
          <span>© {year} Cube27. All rights reserved.</span>
          <span>Pune, India · Serving enterprises worldwide</span>
        </div>
      </div>
    </footer>
  );
}
