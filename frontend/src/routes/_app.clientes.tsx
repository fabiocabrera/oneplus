import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardHeader } from "@/components/ui-bits/Card";
import { Badge, StatusDot } from "@/components/ui-bits/Badge";
import { clientes, seguradoras, formatDate } from "@/lib/mock-data";
import { Plus, Edit3, History as HistoryIcon, Power, Filter } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/clientes")({
  component: ClientesPage,
});

function ClientesPage() {
  const [seg, setSeg] = useState<string>("todas");
  const [status, setStatus] = useState<string>("todos");

  const filtered = clientes.filter(
    (c) => (seg === "todas" || c.seguradora === seg) && (status === "todos" || c.status === status),
  );

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-end gap-4 p-5 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mr-2">
            <Filter className="h-3.5 w-3.5" /> Filtros
          </div>
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
              <option value="ativo">Ativo</option>
              <option value="atrasado">Atrasado</option>
              <option value="inativo">Inativo</option>
            </select>
          </Field>
          <Field label="Vencimento até">
            <input
              type="date"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-gold"
            />
          </Field>
          <div className="flex-1" />
          <button className="h-9 px-4 rounded-md bg-navy text-primary-foreground text-sm font-medium hover:bg-navy-deep flex items-center gap-2">
            <Plus className="h-4 w-4" /> Novo cliente
          </button>
        </div>

        <CardHeader
          title={`${filtered.length} clientes`}
          sub="Base atual de beneficiários gerenciados"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/40">
              <tr>
                <th className="text-left font-medium px-5 py-3">Nome</th>
                <th className="text-left font-medium px-5 py-3">CPF</th>
                <th className="text-left font-medium px-5 py-3">WhatsApp</th>
                <th className="text-left font-medium px-5 py-3">Seguradora</th>
                <th className="text-left font-medium px-5 py-3">Vencimento</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-right font-medium px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-5 py-3">
                    <div className="font-medium text-foreground">{c.nome}</div>
                    <div className="text-[11px] text-muted-foreground">
                      próx: {formatDate(c.proximoVencimento)}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-foreground/80">{c.cpf}</td>
                  <td className="px-5 py-3 text-foreground/80 font-mono text-xs">{c.whatsapp}</td>
                  <td className="px-5 py-3 text-foreground/80">{c.seguradora}</td>
                  <td className="px-5 py-3 text-foreground/80">{c.vencimento}</td>
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
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <IconBtn title="Editar">
                        <Edit3 className="h-3.5 w-3.5" />
                      </IconBtn>
                      <Link to="/clientes/$id" params={{ id: c.id }}>
                        <IconBtn title="Histórico">
                          <HistoryIcon className="h-3.5 w-3.5" />
                        </IconBtn>
                      </Link>
                      <IconBtn title="Desativar">
                        <Power className="h-3.5 w-3.5" />
                      </IconBtn>
                    </div>
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

function IconBtn({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <button
      title={title}
      className="h-8 w-8 grid place-items-center rounded-md border border-border bg-background hover:bg-muted text-foreground/70 hover:text-foreground"
    >
      {children}
    </button>
  );
}
