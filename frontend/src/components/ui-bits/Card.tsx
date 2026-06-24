import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(15,30,60,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  sub,
  action,
  className,
}: {
  title: string;
  sub?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 px-5 py-4 border-b border-border",
        className,
      )}
    >
      <div>
        <h3 className="font-display text-base">{title}</h3>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function Metric({
  label,
  value,
  hint,
  trend,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  trend?: { dir: "up" | "down" | "flat"; text: string };
  icon?: ReactNode;
}) {
  const trendColor =
    trend?.dir === "up"
      ? "text-[var(--success)]"
      : trend?.dir === "down"
        ? "text-[var(--danger)]"
        : "text-muted-foreground";
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-[3px] bg-gold/70" />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
          {icon && <span className="text-navy/70">{icon}</span>}
        </div>
        <div className="mt-3 font-display text-[34px] leading-none text-navy">{value}</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          {trend && <span className={trendColor}>{trend.text}</span>}
          {hint && <span>{hint}</span>}
        </div>
      </div>
    </Card>
  );
}
