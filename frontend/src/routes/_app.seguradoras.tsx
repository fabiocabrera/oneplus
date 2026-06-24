import { createFileRoute } from "@tanstack/react-router";
import { Card, CardBody, CardHeader } from "@/components/ui-bits/Card";
import { Badge, StatusDot } from "@/components/ui-bits/Badge";
import { seguradoras } from "@/lib/mock-data";
import { CheckCircle2, AlertCircle, XCircle, RefreshCw, KeyRound, Globe, User } from "lucide-react";

export const Route = createFileRoute("/_app/seguradoras")({
  component: SeguradorasPage,
});

const statusMap = {
  conectado: { v: "success" as const, label: "Conectado", icon: CheckCircle2 },
  instavel: { v: "warning" as const, label: "Instável", icon: AlertCircle },
  desconectado: { v: "danger" as const, label: "Desconectado", icon: XCircle },
};

function SeguradorasPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {seguradoras.map((s) => {
          const sm = statusMap[s.status];
          const Icon = sm.icon;
          return (
            <Card key={s.id}>
              <div className="p-5 flex items-start justify-between border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg bg-navy/5 border border-border grid place-items-center font-display text-navy text-lg">
                    {s.nome.charAt(0)}
                  </div>
                  <div>
                    <div className="font-display text-base">{s.nome}</div>
                    <div className="text-xs text-muted-foreground">
                      {s.clientes} clientes ativos
                    </div>
                  </div>
                </div>
                <Badge variant={sm.v}>
                  <Icon className="h-3 w-3" /> {sm.label}
                </Badge>
              </div>
              <CardBody className="space-y-3">
                <Row icon={<Globe className="h-3.5 w-3.5" />} label="Portal" value={s.portal} />
                <Row icon={<User className="h-3.5 w-3.5" />} label="Login" value={s.login} />
                <Row
                  icon={<KeyRound className="h-3.5 w-3.5" />}
                  label="Senha"
                  value="••••••••••••"
                />
                <Row
                  icon={<RefreshCw className="h-3.5 w-3.5" />}
                  label="Última sincronização"
                  value={s.ultimaSync}
                />
                <div className="pt-3 flex items-center gap-2 border-t border-border">
                  <button className="flex-1 h-9 rounded-md border border-input bg-background text-sm hover:bg-muted">
                    Editar credenciais
                  </button>
                  <button className="h-9 px-4 rounded-md bg-navy text-primary-foreground text-sm font-medium hover:bg-navy-deep flex items-center gap-2">
                    <RefreshCw className="h-3.5 w-3.5" /> Testar conexão
                  </button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader
          title="Adicionar nova seguradora"
          sub="Configure as credenciais do portal — nada é enviado para integrações reais nesta etapa."
        />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nome da seguradora">
              <input
                placeholder="Ex.: Hapvida"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </Field>
            <Field label="URL do portal">
              <input
                placeholder="https://"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </Field>
            <Field label="Usuário">
              <input
                placeholder="login.corporativo"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </Field>
            <Field label="Senha">
              <input
                type="password"
                placeholder="••••••••"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </Field>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <button className="h-10 px-5 rounded-md bg-navy text-primary-foreground text-sm font-medium hover:bg-navy-deep">
              Salvar credenciais
            </button>
            <button className="h-10 px-5 rounded-md border border-input bg-background text-sm hover:bg-muted">
              Cancelar
            </button>
            <div className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground">
              <StatusDot variant="gold" /> Credenciais armazenadas com criptografia AES-256
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        {icon}
        {label}
      </div>
      <div className="text-foreground/85 truncate max-w-[60%] text-right text-xs font-mono">
        {value}
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
