import { createFileRoute } from "@tanstack/react-router";
import { Check, Zap, Star, Building2, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/planos")({
  component: PlanosPage,
});

type BillingCycle = "mensal" | "anual";

const planos = [
  {
    id: "essencial",
    nome: "Essencial",
    descricao: "Ideal para corretoras em crescimento",
    precoMensal: 297,
    precoAnual: 247, // 297 * 10 / 12 ≈ 247
    clientes: 50,
    clientesLabel: "até 50 clientes",
    porCliente: "R$ 5,94",
    porClienteAnual: "R$ 4,95",
    whatsapp: "Evolution API",
    whatsappDetalhe: "Não oficial – via VPS dedicada",
    whatsappOficial: false,
    destaque: false,
    icon: Zap,
    cor: "navy",
    features: [
      "Até 50 clientes ativos",
      "Download automático de boletos",
      "Envio via WhatsApp (Evolution)",
      "Painel administrativo completo",
      "Histórico de envios",
      "Integração multi-seguradora",
      "Execução diária automática (07h)",
      "Suporte por e-mail",
    ],
    nao: ["WhatsApp oficial Meta Cloud API", "Relatórios avançados", "Portal white-label"],
  },
  {
    id: "profissional",
    nome: "Profissional",
    descricao: "O plano escolhido pela maioria das corretoras",
    precoMensal: 597,
    precoAnual: 497, // 597 * 10 / 12 ≈ 497
    clientes: 150,
    clientesLabel: "até 150 clientes",
    porCliente: "R$ 3,98",
    porClienteAnual: "R$ 3,31",
    whatsapp: "Meta Cloud API",
    whatsappDetalhe: "Oficial – número verificado, entrega garantida",
    whatsappOficial: true,
    destaque: true,
    icon: Star,
    cor: "gold",
    features: [
      "Até 150 clientes ativos",
      "Download automático de boletos",
      "WhatsApp oficial Meta Cloud API ✓",
      "Número verificado – sem risco de bloqueio",
      "Painel administrativo completo",
      "Histórico de envios",
      "Integração multi-seguradora",
      "Execução diária automática (07h)",
      "Suporte prioritário",
    ],
    nao: ["Portal white-label", "Relatórios avançados"],
  },
  {
    id: "business",
    nome: "Business",
    descricao: "Para corretoras com grande carteira de clientes",
    precoMensal: 1197,
    precoAnual: 997, // 1197 * 10 / 12 ≈ 997
    clientes: 400,
    clientesLabel: "até 400 clientes",
    porCliente: "R$ 2,99",
    porClienteAnual: "R$ 2,49",
    whatsapp: "Meta Cloud API",
    whatsappDetalhe: "Oficial – número verificado, entrega garantida",
    whatsappOficial: true,
    destaque: false,
    icon: Building2,
    cor: "navy",
    features: [
      "Até 400 clientes ativos",
      "Download automático de boletos",
      "WhatsApp oficial Meta Cloud API ✓",
      "Número verificado – sem risco de bloqueio",
      "Painel administrativo completo",
      "Histórico de envios",
      "Integração multi-seguradora",
      "Execução diária automática (07h)",
      "Suporte dedicado",
      "Relatórios e analytics",
    ],
    nao: ["Portal white-label"],
  },
  {
    id: "scale",
    nome: "Scale",
    descricao: "Para grandes operações e redes de corretoras",
    precoMensal: null,
    precoAnual: null,
    clientes: null,
    clientesLabel: "400+ clientes",
    porCliente: "negociado",
    porClienteAnual: "negociado",
    whatsapp: "Meta Cloud API + Onboarding",
    whatsappDetalhe: "Dedicado com suporte de implementação",
    whatsappOficial: true,
    destaque: false,
    icon: Building2,
    cor: "navy-deep",
    features: [
      "Clientes ilimitados",
      "Download automático de boletos",
      "WhatsApp oficial Meta Cloud API ✓",
      "Onboarding dedicado",
      "SLA de suporte garantido",
      "Portal white-label com sua marca",
      "Relatórios e analytics avançados",
      "Multi-usuário administrativo",
      "Integrações customizadas",
      "Contrato personalizado",
    ],
    nao: [],
  },
] as const;

function formatBRL(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
}

function PlanosPage() {
  const [ciclo, setCiclo] = useState<BillingCycle>("mensal");

  return (
    <div className="space-y-10 max-w-[1200px] mx-auto">
      {/* Header da página */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-medium text-navy uppercase tracking-widest">
          Modelo de Assinatura
        </div>
        <h2 className="font-display text-[36px] md:text-[44px] leading-tight text-navy">
          Escolha o plano ideal
          <br />
          <span className="text-gold">para sua corretora</span>
        </h2>
        <p className="text-muted-foreground max-w-[520px] mx-auto text-sm leading-relaxed">
          Automatize o envio de boletos via WhatsApp e eleve o nível de serviço da sua carteira.
          Pague apenas pelo que utiliza — sem surpresas.
        </p>

        {/* Toggle mensal / anual */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <span
            className={`text-sm font-medium ${ciclo === "mensal" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Mensal
          </span>
          <button
            id="toggle-ciclo-faturamento"
            onClick={() => setCiclo((c) => (c === "mensal" ? "anual" : "mensal"))}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              ciclo === "anual" ? "bg-navy" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                ciclo === "anual" ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${ciclo === "anual" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Anual
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-success/10 text-[10px] font-semibold text-[var(--success)] uppercase tracking-wider">
              2 meses grátis
            </span>
          </span>
        </div>
      </div>

      {/* Grid de planos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
        {planos.map((plano) => {
          const preco = ciclo === "mensal" ? plano.precoMensal : plano.precoAnual;
          const porCliente = ciclo === "mensal" ? plano.porCliente : plano.porClienteAnual;
          const isDestaque = plano.destaque;

          return (
            <div
              key={plano.id}
              id={`plano-${plano.id}`}
              className={[
                "relative rounded-2xl border flex flex-col transition-all duration-200",
                isDestaque
                  ? "border-gold shadow-[0_0_0_2px_var(--gold),0_8px_40px_rgba(180,155,80,0.18)] bg-navy text-primary-foreground scale-[1.025]"
                  : "border-border bg-card shadow-[0_1px_4px_rgba(15,30,60,0.07)] hover:shadow-[0_4px_20px_rgba(15,30,60,0.12)] hover:-translate-y-0.5",
              ].join(" ")}
            >
              {isDestaque && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gold text-navy-deep text-[11px] font-bold uppercase tracking-widest shadow-sm whitespace-nowrap">
                    ⭐ Mais escolhido
                  </span>
                </div>
              )}

              <div
                className={`p-6 ${isDestaque ? "border-b border-white/10" : "border-b border-border"}`}
              >
                {/* Ícone e nome */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-display text-xl leading-tight">{plano.nome}</div>
                    <div
                      className={`text-xs mt-0.5 ${isDestaque ? "text-white/60" : "text-muted-foreground"}`}
                    >
                      {plano.descricao}
                    </div>
                  </div>
                  <div
                    className={`h-9 w-9 rounded-lg grid place-items-center ${
                      isDestaque ? "bg-white/10" : "bg-navy/8 text-navy"
                    }`}
                  >
                    <plano.icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Preço */}
                <div className="space-y-1">
                  {preco === null ? (
                    <div className="font-display text-[32px] leading-none">Sob consulta</div>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-sm ${isDestaque ? "text-white/50" : "text-muted-foreground"}`}
                        >
                          R$
                        </span>
                        <span className="font-display text-[40px] leading-none">
                          {preco.toLocaleString("pt-BR")}
                        </span>
                        <span
                          className={`text-sm ${isDestaque ? "text-white/50" : "text-muted-foreground"}`}
                        >
                          /mês
                        </span>
                      </div>
                      {ciclo === "anual" && (
                        <div
                          className={`text-xs ${isDestaque ? "text-white/50" : "text-muted-foreground"}`}
                        >
                          cobrado anualmente · 2 meses grátis
                        </div>
                      )}
                    </>
                  )}

                  {/* Capacidade e por cliente */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                        isDestaque ? "bg-white/10 text-white" : "bg-navy/8 text-navy"
                      }`}
                    >
                      {plano.clientesLabel}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                        isDestaque ? "bg-gold/20 text-gold-soft" : "bg-gold/10 text-navy"
                      }`}
                    >
                      {porCliente}/cliente
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div
                className={`px-6 py-4 ${isDestaque ? "border-b border-white/10" : "border-b border-border"}`}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`mt-0.5 h-7 w-7 rounded-md grid place-items-center shrink-0 ${
                      plano.whatsappOficial
                        ? isDestaque
                          ? "bg-[#25D366]/20"
                          : "bg-[#25D366]/10"
                        : isDestaque
                          ? "bg-white/10"
                          : "bg-border/60"
                    }`}
                  >
                    {plano.whatsappOficial ? (
                      <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                    ) : (
                      <Phone
                        className={`h-3.5 w-3.5 ${isDestaque ? "text-white/50" : "text-muted-foreground"}`}
                      />
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-semibold ${isDestaque ? "text-white" : "text-foreground"}`}
                    >
                      {plano.whatsapp}
                    </div>
                    <div
                      className={`text-[11px] mt-0.5 ${isDestaque ? "text-white/50" : "text-muted-foreground"}`}
                    >
                      {plano.whatsappDetalhe}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="px-6 py-5 flex-1 space-y-2">
                {plano.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs">
                    <Check
                      className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${
                        isDestaque ? "text-gold" : "text-[var(--success)]"
                      }`}
                    />
                    <span className={isDestaque ? "text-white/80" : "text-foreground/80"}>
                      {feat}
                    </span>
                  </div>
                ))}
                {plano.nao.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs opacity-40">
                    <span className="h-3.5 w-3.5 mt-0.5 shrink-0 text-center leading-none">—</span>
                    <span className={isDestaque ? "text-white/50" : "text-muted-foreground"}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <button
                  id={`btn-contratar-${plano.id}`}
                  className={[
                    "w-full h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150",
                    isDestaque
                      ? "bg-gold text-navy-deep hover:bg-gold-soft shadow-[0_2px_12px_rgba(180,155,80,0.35)]"
                      : plano.id === "scale"
                        ? "bg-navy text-white hover:bg-navy-deep"
                        : "border border-navy/20 text-navy bg-background hover:bg-navy hover:text-white",
                  ].join(" ")}
                >
                  {plano.id === "scale" ? "Falar com a equipe" : "Contratar agora"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Setup fee e excedente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-gold/10 grid place-items-center shrink-0">
              <Zap className="h-5 w-5 text-gold" />
            </div>
            <div>
              <div className="font-display text-base text-navy">Setup inicial</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 mb-3">
                Cobrança única na entrada
              </div>
              <div className="font-display text-2xl text-navy">R$ 500 – R$ 1.000</div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Cobre a configuração manual das seguradoras da sua corretora (mapeamento de portal,
                testes de coleta e validação). Pode ser isento para planos anuais como incentivo de
                fechamento.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-navy/8 grid place-items-center shrink-0">
              <ArrowRight className="h-5 w-5 text-navy" />
            </div>
            <div>
              <div className="font-display text-base text-navy">Clientes excedentes</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 mb-3">
                Além do limite do plano contratado
              </div>
              <div className="font-display text-2xl text-navy">+ R$ 3 / cliente</div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Se sua carteira crescer além do limite do plano, o excedente é cobrado
                proporcionalmente. Você nunca perde um cliente por limite — apenas paga o
                crescimento.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Âncora de valor */}
      <div className="rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center space-y-3">
        <div className="font-display text-xl text-navy">
          Por que isso faz sentido financeiramente?
        </div>
        <p className="text-sm text-muted-foreground max-w-[620px] mx-auto leading-relaxed">
          A tarefa de boletos consome entre 15–25% do tempo de um funcionário operacional. Com custo
          real de uma funcionária em ~R$ 3.500/mês, isso representa{" "}
          <strong className="text-navy">R$ 500 a R$ 700/mês evitados</strong>. O OnePlus entrega
          isso — e ainda libera tempo para vender, reter e crescer.
        </p>
        <div className="flex flex-wrap justify-center gap-6 pt-2">
          <div className="text-center">
            <div className="font-display text-[28px] text-navy">~R$ 700</div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
              custo evitado / mês
            </div>
          </div>
          <div className="h-12 w-px bg-border hidden sm:block self-center" />
          <div className="text-center">
            <div className="font-display text-[28px] text-navy">R$ 597</div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
              plano Profissional / mês
            </div>
          </div>
          <div className="h-12 w-px bg-border hidden sm:block self-center" />
          <div className="text-center">
            <div className="font-display text-[28px] text-[var(--success)]">&gt; 100%</div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
              ROI no 1º mês
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
