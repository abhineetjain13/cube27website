import { useEffect, useRef, useState } from "react";

/**
 * @cube27Component
 * @cube27ComponentId CountUp
 * @cube27ComponentType ui
 * @cube27ComponentPattern animation
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Reduced-motion-safe stat count-up. The initial
 * (SSR) render always shows the final value string, so no-JS and
 * reduced-motion users never see an animation — the effect simply no-ops.
 * When the element scrolls into view (IntersectionObserver, fires once) and
 * motion is allowed, the numeric run animates 0 → final with an ease-out,
 * preserving any prefix/suffix ("$1B+", "<10%"). Values with no digit run
 * render static.
 */

/* Splits a stat value into prefix / numeric run / suffix:
   "$1B+" → "$" + "1" + "B+"; "<10%" → "<" + "10" + "%". */
const VALUE_PARTS = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/;

interface CountUpProps {
  value: string;
  durationMs?: number;
}

export function CountUp({ value, durationMs = 900 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parts = value.match(VALUE_PARTS);
    const el = ref.current;
    if (!parts || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, numeric, suffix] = parts;
    const target = Number.parseFloat(numeric);
    const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          if (t >= 1) {
            setDisplay(value);
            return;
          }
          setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return <span ref={ref}>{display}</span>;
}
