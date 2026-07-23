import type { ReactNode } from "react";

/**
 * @cube27Component
 * @cube27ComponentId FeatureCard
 * @cube27ComponentType ui
 * @cube27ComponentPattern card
 * @cube27ComponentStatus stable
 * @cube27ComponentDescription Small rounded-xl border card for feature
 * highlights: optional icon slot, medium heading, short body copy. Shared by
 * the services-page capability sections.
 */
interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
}

export function FeatureCard({ icon, title, children }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-cube27-border-primary bg-cube27-neutral-secondary/30 p-6">
      {icon}
      <h4 className="typography-heading mt-4 text-[1.1rem] font-medium text-cube27-text-primary">
        {title}
      </h4>
      <p className="mt-2 text-[0.92rem] leading-relaxed text-cube27-text-secondary">
        {children}
      </p>
    </div>
  );
}
