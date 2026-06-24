import { createFileRoute } from "@tanstack/react-router";
import { Card, CardBody, CardHeader } from "@/components/ui-bits/Card";
import { Badge, StatusDot } from "@/components/ui-bits/Badge";
import { CheckCircle2, Smartphone, MessageCircle, FileText, Send } from "lucide-react";

export const Route = createFileRoute("/_app/whatsapp")({
  component: WhatsAppPage,
});

function WhatsAppPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <Card>
          <CardHeader
            title="Meta Cloud API"
            sub="Configuração da conta WhatsApp Business"
            action={
              <Badge variant="success">
                <CheckCircle2 className="h-3 w-3" /> Conectado
              </Badge>
            }
          />
          <CardBody className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Phone Number ID">
                <input
                  defaultValue="1086427398104928"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-mono"
                />
              </Field>
              <Field label="WABA ID">
                <input
                  defaultValue="219874510046823"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-mono"
                />
              </Field>
              <Field label="Número exibido">
                <input
                  defaultValue="+55 11 4040-2200"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                />
              </Field>
              <Field label="Nome de exibição">
                <input
                  defaultValue="OnePlus Seguros"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                />
              </Field>
              <Field label="Token de acesso (mascarado)">
                <input
                  type="password"
                  defaultValue="••••••••••••••••••••••••"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                />
              </Field>
              <Field label="Webhook URL">
                <input
                  defaultValue="https://api.oneplus.com.br/webhooks/wa"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-mono"
                />
              </Field>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="h-10 px-5 rounded-md bg-navy text-primary-foreground text-sm font-medium hover:bg-navy-deep">
                Salvar configuração
              </button>
              <button className="h-10 px-5 rounded-md border border-input bg-background text-sm hover:bg-muted">
                Reenviar verificação
              </button>
              <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                <StatusDot variant="success" /> Última verificação há 12 min
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Template de mensagem"
            sub="Template aprovado pela Meta · categoria UTILITY"
            action={<Badge variant="gold">aprovado</Badge>}
          />
          <CardBody className="space-y-3">
            <Field label="Nome do template">
              <input
                defaultValue="boleto_mensal_oneplus"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-mono"
              />
            </Field>
            <Field label="Conteúdo (com variáveis)">
              <textarea
                rows={6}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                defaultValue={`Olá {{1}}, aqui é a OnePlus Seguros.

Seu boleto da {{2}} no valor de R$ {{3}} venceu em {{4}}.

Acesse o PDF anexo. Em caso de dúvidas, responda esta mensagem.

— Equipe OnePlus`}
              />
            </Field>
          </CardBody>
        </Card>
      </div>

      {/* Preview */}
      <div className="space-y-6">
        <Card>
          <CardHeader title="Preview do envio" sub="Como o cliente recebe a mensagem" />
          <CardBody>
            <div className="mx-auto w-full max-w-[320px] rounded-[28px] border border-border bg-[#0b141a] p-3 shadow-[0_20px_50px_-20px_rgba(15,30,60,0.5)]">
              <div className="flex items-center gap-3 px-2 pb-3 border-b border-white/10">
                <div className="h-9 w-9 rounded-full bg-navy grid place-items-center text-xs font-display text-primary-foreground">
                  OP
                </div>
                <div className="flex-1 leading-tight">
                  <div className="text-white text-sm font-medium">OnePlus Seguros</div>
                  <div className="text-[10px] text-white/50">online · conta verificada ✓</div>
                </div>
                <Smartphone className="h-4 w-4 text-white/40" />
              </div>
              <div className="py-4 space-y-2 min-h-[380px]">
                <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#005c4b] text-white text-[13px] leading-snug p-2.5">
                  <div>
                    Olá <b>Adriana Martins</b>, aqui é a OnePlus Seguros.
                  </div>
                  <div className="mt-1.5">
                    Seu boleto da <b>SulAmérica</b> no valor de <b>R$ 587,40</b> vence em{" "}
                    <b>28/06/2026</b>.
                  </div>
                  <div className="mt-1.5">
                    Acesse o PDF anexo. Em caso de dúvidas, responda esta mensagem.
                  </div>
                  <div className="mt-1.5">— Equipe OnePlus</div>
                  <div className="text-[10px] text-white/60 text-right mt-1">07:02 ✓✓</div>
                </div>
                <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-[#005c4b] text-white text-[13px] p-2.5 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-white/80" />
                  <div className="flex-1 leading-tight">
                    <div className="text-white">boleto-junho.pdf</div>
                    <div className="text-[10px] text-white/60">2 páginas · 184 KB</div>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full h-10 rounded-md border border-input bg-background text-sm hover:bg-muted flex items-center justify-center gap-2">
              <Send className="h-3.5 w-3.5" /> Enviar mensagem de teste
            </button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Indicadores · últimas 24h" />
          <CardBody className="space-y-3">
            <Row label="Mensagens enviadas" value="487" />
            <Row label="Entregues" value="481" tone="success" />
            <Row label="Lidas" value="402" />
            <Row label="Falhas" value="6" tone="danger" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium mb-1.5">{label}</div>
      {children}
    </div>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "success" | "danger";
}) {
  const color =
    tone === "success"
      ? "text-[var(--success)]"
      : tone === "danger"
        ? "text-[var(--danger)]"
        : "text-foreground";
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessageCircle className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className={`font-display text-lg ${color}`}>{value}</div>
    </div>
  );
}
