import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader } from "@/components/ui-bits/Card";
import { Badge, StatusDot } from "@/components/ui-bits/Badge";
import { logs } from "@/lib/mock-data";
import { Filter, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/logs")({
  component: LogsPage,
});

function LogsPage() {
  const [sev, setSev] = useState("todos");
  const filtered = logs.filter((l) => sev === "todos" || l.tipo === sev);

  return (
    <Card>
      <div className="flex flex-wrap items-end gap-4 p-5 border-b border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mr-2">
          <Filter className="h-3.5 w-3.5" /> Filtros
        </div>
        <Field label="Severidade">
          <select
            value={sev}
            onChange={(e) => setSev(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold"
          >
            <option value="todos">Todas</option>
            <option value="info">Info</option>
            <option value="sucesso">Sucesso</option>
            <option value="aviso">Aviso</option>
            <option value="erro">Erro</option>
          </select>
        </Field>
        <Field label="Período">
          <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold">
            <option>Últimas 24h</option>
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
          </select>
        </Field>
        <div className="flex-1" />
        <button className="h-9 px-4 rounded-md border border-input bg-background text-sm flex items-center gap-2 hover:bg-muted">
          <Download className="h-4 w-4" /> Exportar
        </button>
      </div>

      <CardHeader
        title={`${filtered.length} eventos`}
        sub="Stream técnico do sistema · ordenado por mais recente"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/40">
            <tr>
              <th className="text-left font-medium px-5 py-3">Data / hora</th>
              <th className="text-left font-medium px-5 py-3">Módulo</th>
              <th className="text-left font-medium px-5 py-3">Seguradora</th>
              <th className="text-left font-medium px-5 py-3">Tipo</th>
              <th className="text-left font-medium px-5 py-3">Detalhe</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-5 py-3 font-mono text-xs text-foreground/80 whitespace-nowrap">
                  {l.data}
                </td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono text-foreground/80 border border-border">
                    {l.modulo}
                  </span>
                </td>
                <td className="px-5 py-3 text-foreground/80">{l.seguradora}</td>
                <td className="px-5 py-3">
                  {l.tipo === "info" && (
                    <Badge variant="info">
                      <StatusDot variant="info" /> info
                    </Badge>
                  )}
                  {l.tipo === "sucesso" && (
                    <Badge variant="success">
                      <StatusDot variant="success" /> sucesso
                    </Badge>
                  )}
                  {l.tipo === "aviso" && (
                    <Badge variant="warning">
                      <StatusDot variant="warning" /> aviso
                    </Badge>
                  )}
                  {l.tipo === "erro" && (
                    <Badge variant="danger">
                      <StatusDot variant="danger" /> erro
                    </Badge>
                  )}
                </td>
                <td className="px-5 py-3 text-foreground/85">{l.detalhe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
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
