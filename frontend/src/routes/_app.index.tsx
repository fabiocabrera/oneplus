import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardBody, CardHeader, Metric } from "@/components/ui-bits/Card";
import { Badge, StatusDot } from "@/components/ui-bits/Badge";
import {
  dashboard,
  proximosVencimentos,
  alertas,
  formatBRL,
  formatDate,
  execucoes,
} from "@/lib/mock-data";
import {
  Users,
  FileCheck2,
  CalendarClock,
  AlertTriangle,
  ArrowUpRight,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <Metric
          label="Clientes ativos"
          value={dashboard.clientesAtivos.toLocaleString("pt-BR")}
          hint="vs. mês anterior"
          trend={{ dir: "up", text: "+4,2%" }}
          icon={<Users className="h-4 w-4" />}
        />
        <Metric
          label="Boletos enviados / mês"
          value={dashboard.boletosMes.toLocaleString("pt-BR")}
          hint="487 enviados, 12 pendentes"
          trend={{ dir: "up", text: "+11,8%" }}
          icon={<FileCheck2 className="h-4 w-4" />}
        />
        <Metric
          label="Próximos 10 dias"
          value={dashboard.proximosVencimentos}
          hint="vencimentos previstos"
          icon={<CalendarClock className="h-4 w-4" />}
        />
        <Metric
          label="Alertas operacionais"
          value={dashboard.alertas}
          hint="1 crítico, 2 atenção"
          trend={{ dir: "down", text: "−2 esta semana" }}
          icon={<AlertTriangle className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Próximos vencimentos"
            sub="Boletos com data até 10 dias"
            action={
              <Link
                to="/clientes"
                className="text-xs text-navy hover:underline flex items-center gap-1"
              >
                Ver todos <ArrowUpRight className="h-3 w-3" />
              </Link>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/40">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Cliente</th>
                  <th className="text-left font-medium px-5 py-3">Seguradora</th>
                  <th className="text-left font-medium px-5 py-3">Vencimento</th>
                  <th className="text-right font-medium px-5 py-3">Valor</th>
                  <th className="text-left font-medium px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {proximosVencimentos.map((c) => (
                  <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                    <td className="px-5 py-3">
                      <div className="font-medium text-foreground">{c.nome}</div>
                      <div className="text-xs text-muted-foreground">{c.cpf}</div>
                    </td>
                    <td className="px-5 py-3 text-foreground/80">{c.seguradora}</td>
                    <td className="px-5 py-3 text-foreground/80">
                      {formatDate(c.proximoVencimento)}
                    </td>
                    <td className="px-5 py-3 text-right font-medium">{formatBRL(c.valor)}</td>
                    <td className="px-5 py-3">
                      <Badge
                        variant={
                          c.status === "ativo"
                            ? "success"
                            : c.status === "atrasado"
                              ? "danger"
                              : "neutral"
                        }
                      >
                        <StatusDot
                          variant={
                            c.status === "ativo"
                              ? "success"
                              : c.status === "atrasado"
                                ? "danger"
                                : "neutral"
                          }
                        />{" "}
                        {c.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Alertas operacionais" sub="Eventos que precisam de atenção" />
            <div className="divide-y divide-border">
              {alertas.map((a) => (
                <div key={a.id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 h-2 w-2 rounded-full ${a.severidade === "alta" ? "bg-[var(--danger)]" : a.severidade === "media" ? "bg-[var(--warning)]" : "bg-navy"}`}
                      />
                      <div>
                        <div className="text-sm font-medium">{a.titulo}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{a.descricao}</div>
                      </div>
                    </div>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                      {a.tempo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Robô · execução diária"
              sub="Próxima janela: amanhã, 07:00"
              action={
                <Badge variant="success">
                  <StatusDot variant="success" /> ativo
                </Badge>
              }
            />
            <CardBody className="space-y-3">
              {execucoes.slice(0, 3).map((e) => (
                <div key={e.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <Activity
                      className={`h-4 w-4 ${e.status === "sucesso" ? "text-[var(--success)]" : e.status === "aviso" ? "text-[var(--warning)]" : "text-[var(--danger)]"}`}
                    />
                    <div>
                      <div className="font-medium">{e.inicio.slice(0, 10)}</div>
                      <div className="text-xs text-muted-foreground">
                        {e.processados} processados · {e.duracao}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {e.sucesso}✓ / {e.erro}✕
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
