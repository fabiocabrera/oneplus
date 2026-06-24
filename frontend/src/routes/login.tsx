import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Entrar · OnePlus" }] }),
});

function Login() {
  return (
    <div className="min-h-screen w-full bg-navy-deep text-sidebar-foreground flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between flex-1 px-14 py-12 relative overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-gold/15" />
        <div className="absolute -right-24 top-20 h-[360px] w-[360px] rounded-full border border-gold/10" />
        <div className="absolute right-12 bottom-10 h-[200px] w-[200px] rounded-full border border-gold/10" />
        <Logo />
        <div className="relative z-10 max-w-lg">
          <div className="text-[11px] uppercase tracking-[0.24em] text-gold-soft/80 mb-4">
            Gestão inteligente em saúde
          </div>
          <h1 className="font-display text-5xl leading-[1.05]">
            Operação, histórico e controle <span className="text-gold-soft">em um só painel.</span>
          </h1>
          <p className="mt-5 text-sm text-sidebar-foreground/70 max-w-md">
            Automação completa de boletos de planos de saúde, com envio seguro via WhatsApp e
            visibilidade total da sua carteira.
          </p>
          <div className="mt-10 flex items-center gap-3 text-xs text-sidebar-foreground/60">
            <ShieldCheck className="h-4 w-4 text-gold" />
            Conexão criptografada · LGPD compliant
          </div>
        </div>
        <div className="text-[11px] text-sidebar-foreground/40">
          © 2026 OnePlus Seguros. Todos os direitos reservados.
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-navy-deep">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 flex justify-center">
            <Logo />
          </div>
          <div className="rounded-2xl bg-card text-card-foreground p-9 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.4)]">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Acesso administrativo
            </div>
            <h2 className="font-display text-3xl mt-2">Entrar na plataforma</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Use suas credenciais corporativas OnePlus.
            </p>

            <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs font-medium text-foreground/80">E-mail corporativo</label>
                <input
                  type="email"
                  defaultValue="henrique@oneplusseguros.com.br"
                  className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground/80">Senha</label>
                  <a href="#" className="text-[11px] text-navy hover:underline">
                    Esqueci minha senha
                  </a>
                </div>
                <input
                  type="password"
                  defaultValue="••••••••••"
                  className="mt-1.5 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-input accent-navy"
                />
                Manter sessão por 7 dias neste dispositivo
              </label>
              <Link to="/" className="block">
                <button className="h-11 w-full rounded-md bg-navy text-primary-foreground font-medium text-sm hover:bg-navy-deep transition-colors">
                  Entrar
                </button>
              </Link>
            </form>
            <div className="mt-6 pt-5 border-t border-border text-[11px] text-muted-foreground text-center">
              Problemas para acessar? Fale com o time de TI ·{" "}
              <span className="text-navy">henrique@oneplusseguros.com.br</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
