import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Detects numeric-leading stat values ("100+", "$1B+", "<10%") as opposed to
 * word values ("Pune", "Fortune 500", "Real-time"). Used to gate the count-up
 * animation so only numeric tiles animate; word tiles stay static.
 */
export function isNumericStat(value: string): boolean {
  return /^[\d<$]/.test(value.trim());
}
