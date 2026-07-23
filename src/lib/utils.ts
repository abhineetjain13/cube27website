import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Design-system rule: the numeric part of stat tiles renders in IBM Plex
 * Mono, while word values ("Pune", "Fortune 500", "Real-time") keep the
 * heading face. A value counts as numeric when it opens with a digit, a
 * currency sign, or a comparison glyph ("100+", "$1B+", "<10%").
 */
export function isNumericStat(value: string): boolean {
  return /^[\d<$]/.test(value.trim());
}
