import { useEffect, useId, useRef, useState } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cube27Logo } from "@/components/ui/cube27-logo";
import { cn } from "@/lib/utils";

/**
 * @cube27Component
 * @cube27ComponentId cube27Navbar
 * @cube27ComponentType section
 * @cube27ComponentPattern navbar
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Shared site navbar for cube27. Thin, borderless warm-white bar: cube27 wordmark at left, center sentence-case nav rendered from a single `items` array, and a single dark-charcoal "Schedule a consultation" pill at far right (the only CTA in the bar — never add a second). Nav items can be plain links or dropdown groups (Company, Services); dropdowns open on hover/click/focus and are keyboard + screen-reader accessible. Collapses to a wordmark + menu toggle on mobile with nested disclosure accordions. Pass `items` and `ctaHref` to reuse across pages.
 */
interface NavLink {
  label: string;
  href: string;
  desc?: string;
}

interface NavGroup {
  label: string;
  items: NavLink[];
}

type NavItem = NavLink | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return "items" in item;
}

const DEFAULT_ITEMS: NavItem[] = [
  {
    label: "Company",
    items: [
      { label: "About", href: "/about", desc: "Who we are & how we work" },
      { label: "Careers", href: "/careers", desc: "Open roles at Cube27" },
      {
        label: "Success Stories",
        href: "/success-stories",
        desc: "Proven enterprise outcomes",
      },
      { label: "CSR", href: "/csr", desc: "Our corporate responsibility" },
    ],
  },
  {
    label: "Services",
    items: [
      {
        label: "AI & Automation",
        href: "/services#ai",
        desc: "Agentic AI & process automation",
      },
      {
        label: "Product Engineering",
        href: "/services#engineering",
        desc: "Growth-native digital products",
      },
      {
        label: "Commerce & Platforms",
        href: "/services#commerce",
        desc: "Salesforce & enterprise commerce",
      },
      {
        label: "GCC-as-a-Service",
        href: "/services#gcc",
        desc: "Dedicated Global Capability Centers",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  items?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function Navbar({
  items = DEFAULT_ITEMS,
  ctaLabel = "Schedule a consultation",
  ctaHref = "/contact",
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close any open desktop dropdown or mobile menu on outside click or Escape.
  useEffect(() => {
    if (!openGroup && !mobileOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openGroup, mobileOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-cube27-background-primary/85 backdrop-blur-sm">
      <nav
        ref={navRef}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="/"
          className="text-cube27-text-primary"
          aria-label="CUBE27 home"
        >
          <Cube27Logo />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {items.map((item) =>
            isGroup(item) ? (
              <DesktopDropdown
                key={item.label}
                group={item}
                open={openGroup === item.label}
                onOpen={() => {
                  cancelClose();
                  setOpenGroup(item.label);
                }}
                onScheduleClose={scheduleClose}
                onCancelClose={cancelClose}
                onClose={() => setOpenGroup(null)}
              />
            ) : (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[0.9rem] text-cube27-text-primary/80 transition-colors hover:text-cube27-text-primary"
                >
                  {item.label}
                </a>
              </li>
            ),
          )}
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
          className="-mr-2 flex size-11 items-center justify-center text-cube27-text-primary md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-cube27-border-primary bg-cube27-background-primary px-5 pb-6 pt-1 md:hidden">
          <ul className="flex flex-col">
            {items.map((item) =>
              isGroup(item) ? (
                <li key={item.label}>
                  <MobileGroup
                    group={item}
                    onNavigate={() => setMobileOpen(false)}
                  />
                </li>
              ) : (
                <li
                  key={item.label}
                  className="border-b border-cube27-border-primary"
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[3rem] items-center text-base font-medium text-cube27-text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
          <Button asChild variant="secondary" size="md" className="mt-4 w-full">
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

function DesktopDropdown({
  group,
  open,
  onOpen,
  onScheduleClose,
  onCancelClose,
  onClose,
}: {
  group: NavGroup;
  open: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
  onCancelClose: () => void;
  onClose: () => void;
}) {
  const menuId = useId();

  return (
    <li
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") onOpen();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "touch") onScheduleClose();
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-[0.9rem] text-cube27-text-primary/80 transition-colors hover:text-cube27-text-primary aria-expanded:text-cube27-text-primary"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {group.label}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={menuId}
          aria-label={group.label}
          onPointerEnter={(e) => {
            if (e.pointerType !== "touch") onCancelClose();
          }}
          onPointerLeave={(e) => {
            if (e.pointerType !== "touch") onScheduleClose();
          }}
          className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-1.5 shadow-lg shadow-black/5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-150 motion-safe:ease-out"
        >
          {group.items.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-cube27-neutral-secondary focus-visible:bg-cube27-neutral-secondary focus-visible:outline-none"
            >
              <span className="block text-[0.9rem] font-medium text-cube27-text-primary">
                {link.label}
              </span>
              {link.desc && (
                <span className="mt-0.5 block text-[0.78rem] leading-snug text-cube27-text-secondary">
                  {link.desc}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

function MobileGroup({
  group,
  onNavigate,
}: {
  group: NavGroup;
  onNavigate: () => void;
}) {
  return (
    <details className="group border-b border-cube27-border-primary">
      <summary className="flex min-h-[3rem] cursor-pointer list-none items-center justify-between text-base font-medium text-cube27-text-primary">
        {group.label}
        <ChevronDown className="size-5 text-cube27-text-secondary transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <ul className="pb-2">
        {group.items.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={onNavigate}
              className="flex min-h-[2.75rem] items-center pl-3 text-[0.95rem] text-cube27-text-secondary transition-colors hover:text-cube27-text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
