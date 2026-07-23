import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * @cube27Component
 * @cube27ComponentId cube27SplitExplorer
 * @cube27ComponentType component
 * @cube27ComponentPattern two-panel
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Two-panel content explorer used to organize long stacked content (case studies, service lines) without heavy scrolling. On lg+ it renders a sticky left rail of selectable items beside a detail panel that swaps on selection; below lg it collapses to a stacked accordion. Syncs with the URL hash so deep links (e.g. /services#gcc) select and scroll to the matching item. Reduced-motion safe via `Reveal`.
 */
export interface SplitItem {
  /** Stable id — also used as the URL hash target for deep links. */
  id: string;
  /** Small overline label (category / service area). */
  eyebrow?: ReactNode;
  /** Rail + accordion title. */
  title: string;
  /** Renders the full detail for this item. */
  render: () => ReactNode;
}

interface SplitExplorerProps {
  items: SplitItem[];
  /** Accessible label for the rail navigation. */
  ariaLabel: string;
  /** Sticky offset for the rail on lg+ (matches the sticky navbar height). */
  stickyTopClass?: string;
  className?: string;
}

export function SplitExplorer({
  items,
  ariaLabel,
  stickyTopClass = "lg:top-20",
  className,
}: SplitExplorerProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const rootRef = useRef<HTMLDivElement>(null);

  // On mount, honor a deep-link hash (/services#gcc) by selecting that item.
  // Deferred to a frame so server and first client render both show items[0]
  // (no hydration mismatch), then we correct to the hash target and scroll it
  // into view without jumping past the sticky navbar.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && items.some((i) => i.id === hash)) {
      requestAnimationFrame(() => {
        setActiveId(hash);
        rootRef.current?.scrollIntoView({ block: "start" });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Respond to in-page hash changes (e.g. clicking a navbar dropdown link
  // while already on the page).
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.replace("#", "");
      if (hash && items.some((i) => i.id === hash)) setActiveId(hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [items]);

  function select(id: string) {
    setActiveId(id);
    if (window.location.hash.replace("#", "") !== id) {
      history.replaceState(null, "", `#${id}`);
    }
  }

  const active = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <div
      ref={rootRef}
      className={cn("mx-auto max-w-7xl px-5 sm:px-8 scroll-mt-20", className)}
    >
      {/* Desktop: sticky rail + detail panel */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-12">
        <nav
          aria-label={ariaLabel}
          className={cn(
            "lg:col-span-4 lg:self-start",
            stickyTopClass,
            "lg:sticky",
          )}
        >
          <ul className="flex flex-col gap-1.5">
            {items.map((item) => {
              const selected = item.id === active?.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => select(item.id)}
                    aria-current={selected ? "true" : undefined}
                    className={cn(
                      "group relative w-full rounded-xl border px-5 py-4 text-left transition-all duration-200 motion-safe:hover:translate-x-0.5",
                      selected
                        ? "border-cube27-accent-primary/30 bg-cube27-neutral-secondary"
                        : "border-cube27-border-primary bg-cube27-background-primary hover:bg-cube27-neutral-secondary/50",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 w-0.5 -translate-y-1/2 rounded-full bg-cube27-accent-primary transition-all duration-300",
                        selected ? "h-8 opacity-100" : "h-0 opacity-0",
                      )}
                      aria-hidden="true"
                    />
                    {item.eyebrow && (
                      <span className="typography-eyebrow block text-[0.65rem] uppercase text-cube27-accent-primary">
                        {item.eyebrow}
                      </span>
                    )}
                    <span
                      className={cn(
                        "typography-heading mt-1 block text-[1rem] font-medium leading-snug text-cube27-text-primary",
                      )}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="lg:col-span-8">
          {active && (
            <Reveal key={active.id} className="min-w-0">
              {active.render()}
            </Reveal>
          )}
        </div>
      </div>

      {/* Mobile / tablet: stacked accordion (single-open, synced to `active`
          so deep-link hashes open the right panel). */}
      <div className="flex flex-col gap-3 lg:hidden">
        {items.map((item) => (
          <details
            key={item.id}
            id={item.id}
            open={item.id === active?.id}
            onToggle={(e) => {
              if (e.currentTarget.open) select(item.id);
            }}
            className="group scroll-mt-20 overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-background-primary open:bg-cube27-neutral-secondary/30"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
              <span className="min-w-0">
                {item.eyebrow && (
                  <span className="typography-eyebrow block text-[0.65rem] uppercase text-cube27-accent-primary">
                    {item.eyebrow}
                  </span>
                )}
                <span className="typography-heading mt-1 block text-[1.05rem] font-medium leading-snug text-cube27-text-primary">
                  {item.title}
                </span>
              </span>
              <ChevronDown
                className="size-5 shrink-0 text-cube27-accent-primary transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="border-t border-cube27-border-primary px-5 py-6">
              {item.render()}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
