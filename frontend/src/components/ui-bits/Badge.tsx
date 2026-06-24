import { cn } from "@/lib/utils";

type Variant = "neutral" | "success" | "warning" | "danger" | "info" | "gold";

const styles: Record<Variant, string> = {
  neutral: "bg-muted text-muted-foreground border border-border",
  success:
    "bg-[color-mix(in_oklab,var(--success)_14%,transparent)] text-[var(--success)] border border-[color-mix(in_oklab,var(--success)_30%,transparent)]",
  warning:
    "bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] text-[oklch(0.45_0.12_75)] border border-[color-mix(in_oklab,var(--warning)_35%,transparent)]",
  danger:
    "bg-[color-mix(in_oklab,var(--danger)_12%,transparent)] text-[var(--danger)] border border-[color-mix(in_oklab,var(--danger)_30%,transparent)]",
  info: "bg-secondary text-navy border border-border",
  gold: "bg-[color-mix(in_oklab,var(--gold)_22%,transparent)] text-navy border border-[color-mix(in_oklab,var(--gold)_45%,transparent)]",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ variant = "neutral" }: { variant?: Variant }) {
  const color = {
    neutral: "bg-muted-foreground",
    success: "bg-[var(--success)]",
    warning: "bg-[var(--warning)]",
    danger: "bg-[var(--danger)]",
    info: "bg-navy",
    gold: "bg-gold",
  }[variant];
  return <span className={cn("inline-block h-1.5 w-1.5 rounded-full", color)} />;
}
