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
 * @cube27ComponentDescription Shared site navbar for cube27. Thin, borderless warm-white bar: cube27 wordmark at left, center sentence-case nav rendered from a single `items` array, and a single dark-charcoal "Schedule a consultation" pill at far right (the only CTA in the bar — never add a second). Nav items can be plain links or dropdown groups (Company, Services); dropdowns open on hover/click/focus and are keyboard + screen-reader accessible. Collapses to a wordmark + menu toggle on mobile with nested disclosure accordions. Shrinks (h-16 → h-14) and gains a hairline border once the page scrolls past ~16px. Pass `items` and `ctaHref` to reuse across pages.
 */
interface NavLink {
  label: string;
  href: string;
  desc?: string;
}

interface NavGroup {
  label: string;
  /**
   * Destination of the group label itself. Every group heads a real page, so
   * the label renders as a link and only the adjacent chevron toggles the
   * menu — without this, `/services` and `/about` are unreachable from the
   * nav and the dropdown is the only way in.
   */
  href: string;
  items: NavLink[];
}

type NavItem = NavLink | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return "items" in item;
}

/**
 * Five top-level destinations. Success Stories and Insights sit at the top
 * level rather than nested under a "Company" catch-all: both are primary
 * evaluation content for enterprise buyers, and burying them cost a click
 * from every page. Each dropdown leads with an "Overview" row pointing at the
 * parent page, so there are always two routes to it.
 */
const DEFAULT_ITEMS: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    items: [
      {
        label: "Overview",
        href: "/services",
        desc: "All four capabilities",
      },
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
  { label: "Success Stories", href: "/success-stories" },
  { label: "Insights", href: "/insights" },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "Overview", href: "/about", desc: "Who we are & how we work" },
      { label: "Careers", href: "/careers", desc: "Open roles at Cube27" },
      { label: "CSR", href: "/csr", desc: "Our corporate responsibility" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/** True when `href` is the current page (or, for /services, its hash views). */
function isActive(href: string, pathname: string): boolean {
  const path = href.split("#")[0];
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

interface NavbarProps {
  items?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Current path, passed from the Astro shell, for active-item marking. */
  pathname?: string;
}

/**
 * Mount with `client:visible`, not `client:load`.
 *
 * This island pulls React, jsx-runtime, `button`, and four lucide icon chunks
 * — under `client:load` that whole chain sits on the critical path in front of
 * the hero's LCP paint, even though nothing here is needed to *render* the
 * bar. The markup (including the icons) is server-rendered; hydration only
 * adds the mobile sheet, the dropdowns, and the shrink-on-scroll border.
 *
 * The header is `sticky top-0`, so it is in the initial viewport and the
 * IntersectionObserver fires on first paint — hydration still happens
 * immediately, just after the paint rather than before it. The window where a
 * tap on the hamburger is inert is correspondingly small, and the links
 * underneath are real anchors that work unhydrated.
 */
export function Navbar({
  items = DEFAULT_ITEMS,
  ctaLabel = "Schedule a consultation",
  ctaHref = "/contact",
  pathname = "",
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shrink-on-scroll: past ~16px the bar contracts (h-16 → h-14) and gains a
  // hairline border. rAF-throttled passive listener; the height/border
  // transition is motion-safe so reduced-motion users get an instant switch.
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Lock body scroll while the mobile sheet is open so the page behind it
  // doesn't scroll under the menu.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-cube27-background-primary/85 backdrop-blur-sm",
        scrolled && "border-b border-cube27-border-primary",
      )}
    >
      <nav
        ref={navRef}
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between px-5 motion-safe:transition-[height] motion-safe:duration-200 sm:px-8",
          scrolled && "h-14",
        )}
      >
        <a
          href="/"
          className="text-cube27-text-primary"
          aria-label="CUBE27 home"
        >
          <Cube27Logo />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
          {items.map((item) => {
            const active = isActive(item.href, pathname);
            return isGroup(item) ? (
              <DesktopDropdown
                key={item.label}
                group={item}
                active={active}
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
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-[0.9rem] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-cube27-accent-primary after:transition-opacity",
                    active
                      ? "text-cube27-text-primary after:opacity-100"
                      : "text-cube27-text-primary/80 hover:text-cube27-text-primary after:opacity-0",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
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
                    active={isActive(item.href, pathname)}
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
                    aria-current={
                      isActive(item.href, pathname) ? "page" : undefined
                    }
                    className={cn(
                      "flex min-h-[2.75rem] items-center py-1 text-base font-medium",
                      isActive(item.href, pathname)
                        ? "text-cube27-accent-primary"
                        : "text-cube27-text-primary",
                    )}
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

/**
 * Group entry: the label is a real link to the parent page, and a separate
 * adjacent chevron button toggles the menu. Splitting them is what makes
 * `/services` and `/about` reachable — a single <button> trigger left those
 * pages with no direct path at all. Hover still opens the menu on pointer
 * devices, so the discovery affordance is unchanged.
 */
function DesktopDropdown({
  group,
  active,
  open,
  onOpen,
  onScheduleClose,
  onCancelClose,
  onClose,
}: {
  group: NavGroup;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
  onCancelClose: () => void;
  onClose: () => void;
}) {
  const menuId = useId();
  const wide = group.items.length > 4;

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
      <span className="flex items-center gap-0.5">
        <a
          href={group.href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "relative py-1 text-[0.9rem] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-cube27-accent-primary after:transition-opacity",
            active
              ? "text-cube27-text-primary after:opacity-100"
              : "text-cube27-text-primary/80 hover:text-cube27-text-primary after:opacity-0",
          )}
        >
          {group.label}
        </a>
        <button
          type="button"
          className="grid size-6 place-items-center rounded text-cube27-text-primary/70 transition-colors hover:text-cube27-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cube27-accent-primary"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`${group.label} menu`}
          onClick={() => (open ? onClose() : onOpen())}
        >
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </span>

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
          className={cn(
            "absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-background-primary p-1.5 shadow-lg shadow-black/5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1 motion-safe:duration-150 motion-safe:ease-out",
            // Services carries five entries; two columns keeps the panel from
            // running past the viewport and reads as a preview of the page.
            wide ? "grid w-[34rem] grid-cols-2 gap-0.5" : "w-72",
          )}
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

/**
 * Mobile group row: the label navigates to the parent page and only the
 * chevron expands the sublist. Previously the whole row was a <summary>, so
 * tapping "Services" could never reach /services. Uses controlled state
 * rather than <details> so the link can sit outside the toggle target.
 */
function MobileGroup({
  group,
  active,
  onNavigate,
}: {
  group: NavGroup;
  active: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <div className="border-b border-cube27-border-primary">
      <div className="flex items-center justify-between gap-2">
        <a
          href={group.href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex min-h-[2.75rem] flex-1 items-center py-1 text-base font-medium",
            active ? "text-cube27-accent-primary" : "text-cube27-text-primary",
          )}
        >
          {group.label}
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`${group.label} menu`}
          className="grid size-11 shrink-0 place-items-center text-cube27-text-secondary"
        >
          <ChevronDown
            className={cn(
              "size-5 transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </div>
      {open && (
        <ul id={listId} className="pb-2">
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
      )}
    </div>
  );
}
