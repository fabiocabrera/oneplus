import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card, CardHeader } from "@/components/ui-bits/Card";
import { Badge, StatusDot } from "@/components/ui-bits/Badge";
import {
  clientes,
  boletos,
  formatBRL,
  formatDate,
  type Cliente,
  type Boleto,
} from "@/lib/mock-data";
import { ArrowLeft, Mail, Phone, FileText, Download } from "lucide-react";

export const Route = createFileRoute("/_app/clientes/$id")({
  loader: ({ params }): { cliente: Cliente; historico: Boleto[] } => {
    const cliente = clientes.find((c) => c.id === params.id);
    if (!cliente) throw notFound();
    const historico = boletos.filter((b) => b.clienteId === cliente.id);
    return { cliente, historico };
  },
  component: ClienteDetalhe,
  errorComponent: ({ error }) => <div className="text-sm text-destructive">{error.message}</div>,
  notFoundComponent: () => <div className="text-sm">Cliente não encontrado.</div>,
});

function ClienteDetalhe() {
  const { cliente, historico } = Route.useLoaderData() as { cliente: Cliente; historico: Boleto[] };

  return (
    <div className="space-y-6">
      <Link
        to="/clientes"
        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar para clientes
      </Link>

      <Card>
        <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-navy text-primary-foreground grid place-items-center font-display text-2xl">
            {cliente.nome
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="flex-1">
            <h2 className="font-display text-2xl">{cliente.nome}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span>{cliente.cpf}</span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" /> {cliente.whatsapp}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-3 w-3" /> {cliente.nome.toLowerCase().replace(/\s+/g, ".")}
                @email.com
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Seguradora
              </div>
              <div className="font-medium mt-1">{cliente.seguradora}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Mensalidade
              </div>
              <div className="font-medium mt-1">{formatBRL(cliente.valor)}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Status
              </div>
              <div className="mt-1">
                <Badge
                  variant={
                    cliente.status === "ativo"
                      ? "success"
                      : cliente.status === "atrasado"
                        ? "danger"
                        : "neutral"
                  }
                >
                  {cliente.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Histórico de boletos" sub={`${historico.length} envios registrados`} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground bg-muted/40">
              <tr>
                <th className="text-left font-medium px-5 py-3">Vencimento</th>
                <th className="text-right font-medium px-5 py-3">Valor</th>
                <th className="text-left font-medium px-5 py-3">Status WhatsApp</th>
                <th className="text-left font-medium px-5 py-3">Enviado em</th>
                <th className="text-left font-medium px-5 py-3">PDF</th>
              </tr>
            </thead>
            <tbody>
              {historico.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    Nenhum boleto registrado ainda.
                  </td>
                </tr>
              )}
              {historico.map((b) => (
                <tr key={b.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-5 py-3">{formatDate(b.vencimento)}</td>
                  <td className="px-5 py-3 text-right font-medium">{formatBRL(b.valor)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-5 py-3 text-foreground/80">
                    {b.enviadoEm ? formatDate(b.enviadoEm) : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <button className="inline-flex items-center gap-1.5 text-xs text-navy hover:underline">
                      <FileText className="h-3.5 w-3.5" /> boleto.pdf{" "}
                      <Download className="h-3 w-3" />
                    </button>
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

function StatusBadge({ status }: { status: "enviado" | "pendente" | "erro" | "pago" }) {
  const map = {
    enviado: { v: "success" as const, label: "Enviado" },
    pago: { v: "gold" as const, label: "Pago" },
    pendente: { v: "warning" as const, label: "Pendente" },
    erro: { v: "danger" as const, label: "Erro" },
  };
  return (
    <Badge variant={map[status].v}>
      <StatusDot variant={map[status].v} /> {map[status].label}
    </Badge>
  );
}
