import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader } from "@/components/ui-bits/Card";
import { Badge, StatusDot } from "@/components/ui-bits/Badge";
import { boletos, seguradoras, formatBRL, formatDate } from "@/lib/mock-data";
import { Filter, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/historico")({
  component: HistoricoPage,
});

function HistoricoPage() {
  const [seg, setSeg] = useState("todas");
  const [status, setStatus] = useState("todos");

  const filtered = boletos.filter(
    (b) => (seg === "todas" || b.seguradora === seg) && (status === "todos" || b.status === status),
  );

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-end gap-4 p-5 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mr-2">
            <Filter className="h-3.5 w-3.5" /> Filtros
          </div>
          <Field label="Data inicial">
            <input
              type="date"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold"
            />
          </Field>
          <Field label="Data final">
            <input
              type="date"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold"
            />
          </Field>
          <Field label="Seguradora">
            <select
              value={seg}
              onChange={(e) => setSeg(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold"
            >
              <option value="todas">Todas</option>
              {seguradoras.map((s) => (
                <option key={s.id}>{s.nome}</option>
              ))}
            </select>
          </Field>
          <Field label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold"
            >
              <option value="todos">Todos</option>
              <option value="enviado">Enviado</option>
              <option value="pendente">Pendente</option>
              <option value="erro">Erro</option>
              <option value="pago">Pago</option>
            </select>
          </Field>
          <div className="flex-1" />
          <button className="h-9 px-4 rounded-md border border-input bg-background text-sm flex items-center gap-2 hover:bg-muted">
            <Download className="h-4 w-4" /> Exportar CSV
          </button>
        </div>

        <CardHeader
          title={`${filtered.length} envios`}
          sub="Histórico completo de boletos enviados pela plataforma"
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
                <th className="text-left font-medium px-5 py-3">Enviado em</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-5 py-3 font-medium">{b.clienteNome}</td>
                  <td className="px-5 py-3 text-foreground/80">{b.seguradora}</td>
                  <td className="px-5 py-3 text-foreground/80">{formatDate(b.vencimento)}</td>
                  <td className="px-5 py-3 text-right font-medium">{formatBRL(b.valor)}</td>
                  <td className="px-5 py-3">
                    {b.status === "enviado" && (
                      <Badge variant="success">
                        <StatusDot variant="success" /> Enviado
                      </Badge>
                    )}
                    {b.status === "pago" && (
                      <Badge variant="gold">
                        <StatusDot variant="gold" /> Pago
                      </Badge>
                    )}
                    {b.status === "pendente" && (
                      <Badge variant="warning">
                        <StatusDot variant="warning" /> Pendente
                      </Badge>
                    )}
                    {b.status === "erro" && (
                      <Badge variant="danger">
                        <StatusDot variant="danger" /> Erro
                      </Badge>
                    )}
                  </td>
                  <td className="px-5 py-3 text-foreground/80">
                    {b.enviadoEm ? formatDate(b.enviadoEm) : "—"}
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      {children}
    </div>
  );
}
