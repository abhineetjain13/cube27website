import { cn } from "@/lib/utils";

export function Cube27Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/cube27_logo.png"
        alt="cube27"
        className="h-[2.15rem] sm:h-[2.35rem] w-auto object-contain shrink-0"
      />
    </span>
  );
}
