import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * @cube27Component
 * @cube27ComponentId StatGrid
 * @cube27ComponentType ui
 * @cube27ComponentPattern stats
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Shared hairline-ruled stat grid: a `<dl>` shell
 * using the gap-px-over-border track with `StatCell` tiles inside. Cell values
 * render in IBM Plex Mono by default (design-system rule: mono for the numeric
 * part of stat tiles); word values ("Pune", "Fortune 500") pass `mono={false}`
 * — `isNumericStat` from `@/lib/utils` is the single detection mechanism for
 * data-driven grids. `size="lg"` reproduces the large hero-stat variant. Cells
 * are data tiles: static, no hover affordance.
 */
interface StatGridProps {
  /** Number of columns at the widest breakpoint (2 → sm:grid-cols-2, 4 → lg:grid-cols-4). */
  columns?: 2 | 4;
  className?: string;
  children: ReactNode;
}

export function StatGrid({ columns = 4, className, children }: StatGridProps) {
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-cube27-border-primary bg-cube27-border-primary",
        columns === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </dl>
  );
}

interface StatCellProps {
  value: string;
  label: string;
  /** Optional about-style descriptive line under the label. */
  description?: string;
  /** `lg` reproduces the services-page large hero-stat variant (sm:text-3xl). */
  size?: "md" | "lg";
  /** Mono numerals by default; set false for word values. */
  mono?: boolean;
  className?: string;
}

export function StatCell({
  value,
  label,
  description,
  size = "md",
  mono = true,
  className,
}: StatCellProps) {
  return (
    <div className={cn("bg-cube27-background-primary p-5 sm:p-6", className)}>
      <dt
        className={cn(
          "font-medium text-cube27-text-primary",
          mono ? "font-mono" : "typography-heading",
          size === "lg" ? "text-2xl sm:text-3xl" : "text-2xl",
        )}
      >
        {value}
      </dt>
      <dd className="mt-1 text-[0.85rem] text-cube27-text-secondary">
        {label}
      </dd>
      {description && (
        <dd className="mt-2 text-[0.88rem] leading-relaxed text-cube27-text-secondary">
          {description}
        </dd>
      )}
    </div>
  );
}
