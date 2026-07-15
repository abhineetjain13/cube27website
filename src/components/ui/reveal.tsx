import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * @cube27Component
 * @cube27ComponentId Reveal
 * @cube27ComponentType component
 * @cube27ComponentPattern animation
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Single consistent entrance-reveal wrapper used across cube27 sections. Pure-CSS (tw-animate-css) fade-up that runs once on load and is fully visible by default — it never depends on JS hydration, so content can't get stuck invisible. Gated behind `motion-safe` so reduced-motion users just see static content. `delay` staggers sibling reveals via animation-delay.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both motion-safe:duration-700 motion-safe:ease-out",
        className,
      )}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
