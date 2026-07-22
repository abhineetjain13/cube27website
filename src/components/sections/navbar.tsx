import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cube27Logo } from "@/components/ui/cube27-logo";

/**
 * @cube27Component
 * @cube27ComponentId cube27Navbar
 * @cube27ComponentType section
 * @cube27ComponentPattern navbar
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Shared site navbar for cube27. Thin, borderless warm-white bar: cube27 wordmark at left, center sentence-case nav rendered from a single `links` array, and a single dark-charcoal "Work with us" pill at far right (the only CTA in the bar — never add a second). Collapses to a wordmark + menu toggle on mobile with a simple disclosure panel. Pass `links` and `ctaHref` to reuse across pages.
 */
interface NavLink {
  label: string;
  href: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function Navbar({
  links = DEFAULT_LINKS,
  ctaLabel = "Start a conversation",
  ctaHref = "/contact",
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-cube27-background-primary/85 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="/"
          className="text-cube27-text-primary"
          aria-label="CUBE27 home"
        >
          <Cube27Logo />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[0.9rem] text-cube27-text-primary/80 transition-colors hover:text-cube27-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="secondary" size="sm">
            <a href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden text-cube27-text-primary"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-cube27-border-primary bg-cube27-background-primary px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-cube27-text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild variant="secondary" size="md" className="mt-3 w-full">
            <a href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
