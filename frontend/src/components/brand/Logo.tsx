import logoAsset from "@/assets/oneplus-logo.png.asset.json";

interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: "light" | "dark";
}

export function Logo({ size = 36, showText = true, variant = "light" }: LogoProps) {
  const textColor = variant === "light" ? "text-sidebar-foreground" : "text-foreground";
  return (
    <div className="flex items-center gap-3">
      <img src={logoAsset.url} alt="OnePlus" width={size} height={size} className="rounded-md" />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-display text-base font-medium tracking-wide ${textColor}`}>
            one plus
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-gold-soft/80">
            seguros · saúde
          </span>
        </div>
      )}
    </div>
  );
}
