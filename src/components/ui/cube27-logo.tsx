import { cn } from "@/lib/utils";

export function Cube27Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <picture>
        <source srcSet="/cube27_logo.webp" type="image/webp" />
        <img
          src="/cube27_logo.png"
          alt="cube27"
          width={300}
          height={109}
          className="h-[2.15rem] sm:h-[2.35rem] w-auto object-contain shrink-0"
        />
      </picture>
    </span>
  );
}
