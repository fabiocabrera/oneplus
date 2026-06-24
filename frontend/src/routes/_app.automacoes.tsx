import { createFileRoute } from "@tanstack/react-router";
import { Card, CardBody, CardHeader, Metric } from "@/components/ui-bits/Card";
import { Badge, StatusDot } from "@/components/ui-bits/Badge";
import { execucoes } from "@/lib/mock-data";
import { Play, Clock, Activity, CheckCircle2, AlertTriangle, XCircle, Bot } from "lucide-react";

export const Route = createFileRoute("/_app/automacoes")({
  component: AutomacoesPage,
});

function AutomacoesPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Metric
          label="Status do robô"
          value="Operacional"
          hint="Playwright · headless"
          icon={<Bot className="h-4 w-4" />}
        />
        <Metric
          label="Próxima execução"
          value="07:00"
          hint="amanhã, horário Brasília"
          icon={<Clock className="h-4 w-4" />}
        />
        <Metric
          label="Taxa de sucesso (30d)"
          value="97,8%"
          trend={{ dir: "up", text: "+1,2%" }}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <Metric
          label="Tempo médio"
          value="12m 38s"
          hint="execução completa"
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      <Card>
        <CardHeader
          title="Agendamento diário"
          sub="O robô executa diariamente às 07:00 e coleta boletos de todas as seguradoras conectadas."
          action={
            <button className="h-9 px-4 rounded-md bg-navy text-primary-foreground text-sm font-medium hover:bg-navy-deep flex items-center gap-2">
              <Play className="h-3.5 w-3.5" /> Executar teste manual
            </button>
          }
        />
        <CardBody>
          <div className="rounded-lg border border-border bg-navy-deep text-sidebar-foreground p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold-soft/80">
                  Cron · America/Sao_Paulo
                </div>
                <div className="mt-2 font-mono text-2xl">0 7 * * * /opt/oneplus/run.sh</div>
              </div>
              <Badge variant="gold">
                <StatusDot variant="gold" /> ativo
              </Badge>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-4 text-xs">
              <Stat label="Última execução" value="Hoje · 07:00" />
              <Stat label="Duração média" value="12m 38s" />
              <Stat label="Falhas (7d)" value="2" />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Últimas execuções" sub="Histórico das 5 execuções mais recentes" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/40">
              <tr>
                <th className="text-left font-medium px-5 py-3">Início</th>
                <th className="text-left font-medium px-5 py-3">Duração</th>
                <th className="text-right font-medium px-5 py-3">Processados</th>
                <th className="text-right font-medium px-5 py-3">Sucesso</th>
                <th className="text-right font-medium px-5 py-3">Erro</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {execucoes.map((e) => (
                <tr key={e.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{e.inicio}</td>
                  <td className="px-5 py-3">{e.duracao}</td>
                  <td className="px-5 py-3 text-right">{e.processados}</td>
                  <td className="px-5 py-3 text-right text-[var(--success)] font-medium">
                    {e.sucesso}
                  </td>
                  <td className="px-5 py-3 text-right text-[var(--danger)] font-medium">
                    {e.erro}
                  </td>
                  <td className="px-5 py-3">
                    {e.status === "sucesso" && (
                      <Badge variant="success">
                        <CheckCircle2 className="h-3 w-3" /> Sucesso
                      </Badge>
                    )}
                    {e.status === "aviso" && (
                      <Badge variant="warning">
                        <AlertTriangle className="h-3 w-3" /> Atenção
                      </Badge>
                    )}
                    {e.status === "erro" && (
                      <Badge variant="danger">
                        <XCircle className="h-3 w-3" /> Falha
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sidebar-foreground/60">{label}</div>
      <div className="mt-1 font-display text-base text-sidebar-foreground">{value}</div>
    </div>
  );
}
