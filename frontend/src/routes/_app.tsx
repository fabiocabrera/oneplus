import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  FileClock,
  History,
  Building2,
  Bot,
  MessageCircle,
  ScrollText,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { type ReactNode } from "react";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/", label: "Painel", icon: LayoutDashboard, exact: true },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/historico", label: "Histórico geral", icon: History },
  { to: "/seguradoras", label: "Seguradoras", icon: Building2 },
  { to: "/automacoes", label: "Automações", icon: Bot },
  { to: "/whatsapp", label: "WhatsApp", icon: MessageCircle },
  { to: "/logs", label: "Logs do sistema", icon: ScrollText },
];

const titles: Record<string, { title: string; sub: string }> = {
  "/": { title: "Painel executivo", sub: "Visão geral da operação de boletos" },
  "/clientes": { title: "Clientes", sub: "Base de beneficiários e status de cobrança" },
  "/historico": { title: "Histórico geral", sub: "Todos os envios realizados pela plataforma" },
  "/seguradoras": {
    title: "Seguradoras e credenciais",
    sub: "Integrações com portais de operadoras",
  },
  "/automacoes": { title: "Automações", sub: "Execução diária do robô de coleta" },
  "/whatsapp": { title: "WhatsApp · Meta Cloud API", sub: "Configuração de envios e templates" },
  "/logs": { title: "Logs do sistema", sub: "Eventos técnicos da plataforma" },
};

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const matched =
    Object.keys(titles)
      .filter((k) => (k === "/" ? pathname === "/" : pathname.startsWith(k)))
      .sort((a, b) => b.length - a.length)[0] ?? "/";
  const header = titles[matched];

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[260px] shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="px-6 py-6 border-b border-sidebar-border/60">
          <Logo />
        </div>
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          <div className="px-3 pb-2 text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/50">
            Operação
          </div>
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={[
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-foreground border-l-2 border-gold pl-[10px]"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                ].join(" ")}
              >
                <Icon
                  className={`h-4 w-4 ${active ? "text-gold" : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground"}`}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-5 py-5 border-t border-sidebar-border/60">
          <div className="rounded-lg bg-sidebar-accent/60 p-4">
            <div className="text-xs text-sidebar-foreground/70">Próxima execução</div>
            <div className="mt-1 font-display text-lg text-gold-soft">amanhã · 07:00</div>
            <div className="mt-1 text-[11px] text-sidebar-foreground/60">718 boletos previstos</div>
          </div>
          <Link
            to="/login"
            className="mt-4 flex items-center gap-2 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <LogOut className="h-3.5 w-3.5" /> Sair
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[78px] border-b border-border bg-card/80 backdrop-blur flex items-center px-6 lg:px-10">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[22px] leading-tight">{header.title}</h1>
            <p className="text-xs text-muted-foreground">{header.sub}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 h-10 w-[320px] px-3 rounded-md border border-input bg-background">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Buscar cliente, CPF ou boleto…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden xl:inline text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
                ⌘K
              </kbd>
            </div>
            <button className="relative h-10 w-10 grid place-items-center rounded-md border border-input bg-background hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-gold" />
            </button>
            <button className="h-10 w-10 grid place-items-center rounded-md border border-input bg-background hover:bg-muted">
              <Settings className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 pl-3 ml-1 border-l border-border h-10">
              <div className="h-9 w-9 rounded-full bg-navy text-primary-foreground grid place-items-center font-display text-sm">
                H
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-medium">Henrique</div>
                <div className="text-[11px] text-muted-foreground">Adm</div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </header>
        <main className="flex-1 px-6 lg:px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function PageSection({
  title,
  action,
  children,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      {(title || action) && (
        <div className="flex items-center justify-between mb-3">
          {title && <h2 className="font-display text-lg">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
