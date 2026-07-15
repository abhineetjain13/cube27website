import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * @cube27Component
 * @cube27ComponentId cube27Button
 * @cube27ComponentType component
 * @cube27ComponentPattern button
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Brand pill button/link primitive for the cube27 site. Variants: `primary` (electric-blue filled pill, the single hero CTA), `secondary` (ink-charcoal filled pill, used in the nav and closing CTA band), and `link` (sentence-case ink-black inline link with an electric-blue chevron, the default secondary action everywhere else). Renders as `<button>` by default or any element via `asChild` (e.g. wrap an `<a>`). Keep the blue accent reserved for `primary` fills and `link` chevrons only — never set body copy or headings in the accent.
 */
const buttonVariants = cva(
  "typography-button inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cube27-accent-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cube27-background-primary",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-cube27-button-primary-background text-cube27-button-primary-text hover:bg-cube27-accent-primary-600",
        secondary:
          "rounded-full bg-cube27-button-secondary-background text-cube27-button-secondary-text hover:bg-cube27-neutral-inverse-s2",
        link: "gap-1.5 text-cube27-text-primary hover:text-cube27-accent-primary [&_svg]:text-cube27-accent-primary",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
        link: "h-auto p-0 text-sm",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", className: "h-auto p-0" },
      { variant: "link", size: "md", className: "h-auto p-0" },
      { variant: "link", size: "lg", className: "h-auto p-0" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
