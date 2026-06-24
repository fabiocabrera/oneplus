# Contratos iniciais - OnePlus

Este documento define os contratos esperados do projeto OnePlus.
Ele deve ser atualizado sempre que payload, resposta, status HTTP, semantica de dados, evento, schema ou regra de integracao mudar.

## Padrao de API

Quando houver backend HTTP, respostas de sucesso devem usar envelope:

```json
{
  "data": {},
  "meta": {}
}
```

Listas:

```json
{
  "data": [],
  "meta": {
    "total": 0,
    "page": 1,
    "pageSize": 50
  }
}
```

Erros:

```json
{
  "error": {
    "code": "validation_error",
    "message": "Mensagem legivel",
    "details": {}
  }
}
```

## Autenticacao e seguranca
- Frontend nunca recebe service role, secret key, DB URL, private key ou tokens internos.
- Chamadas autenticadas devem usar token de usuario ou segredo especifico por integracao.
- Webhooks devem ter segredo dedicado.
- Tabelas sensiveis devem ter RLS/policies quando Supabase/Postgres for usado.
- Payloads externos devem ser validados antes de persistir.

## Estado real dos contratos
Em 2026-06-24, ainda nao ha backend, frontend, banco, scripts, integracoes ou testes implementados neste workspace. Os contratos abaixo registram o alvo inicial do sistema, mas ainda nao sao endpoints executaveis.

## Entidades principais
Modelo inicial previsto:

```ts
type Client = {
  id: string;
  name: string;
  cpf: string;
  whatsapp: string;
  insurer: "amil" | "sulamerica" | "bradesco" | "porto_seguro" | "omint" | "unimed";
  policyNumber: string;
  dueDay: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt?: string;
};

type InsurerCredential = {
  id: string;
  insurerName: Client["insurer"];
  portalUrl: string;
  username: string;
  passwordEncrypted: string;
  navPathJson: unknown;
  status: "working" | "error";
};

type Boleto = {
  id: string;
  clientId: string;
  insurer: Client["insurer"];
  dueDate: string;
  value: number;
  pdfPath: string;
  downloadedAt?: string;
  status: "downloaded" | "error" | "pending";
};

type WhatsAppSend = {
  id: string;
  boletoId: string;
  clientId: string;
  sentAt?: string;
  status: "sent" | "error" | "pending";
  errorMessage?: string;
  metaMessageId?: string;
};
```

## Endpoints iniciais

### Health

`GET /api/health`

Status: **planejado, ainda nao implementado**.

Resposta:

```json
{
  "data": {
    "status": "ok",
    "service": "oneplus-backend",
    "timestamp": "2026-06-24T00:00:00.000Z",
    "environment": "development"
  },
  "meta": {
    "version": "0.1.0"
  }
}
```

## Eventos e integracoes
Status atual: **nenhum evento, webhook, cron, fila, ETL ou API externa implementado**.

Fluxos previstos que exigem VLAEG antes da implementacao:

- Execucao diaria APScheduler as 7h.
- Login e navegacao Playwright nos portais das seguradoras.
- Download de PDFs para `/storage/boletos/{ano}/{mes}/{cpf_cliente}/`.
- Envio de PDF pela Meta Cloud API oficial.
- Registro de logs, status de download e status de envio.

Quando houver automacao, webhook, cron, fila ou API externa, registrar:

- nome do fluxo;
- origem;
- destino;
- schema de entrada;
- schema normalizado;
- payload final;
- idempotencia;
- politica de retry;
- segredo/assinatura esperada, sem valor real;
- validacao minima.

## Mudanca de contrato
Se qualquer item abaixo mudar, atualizar este arquivo junto do codigo:

- rota;
- status HTTP;
- campo obrigatorio;
- tipo de campo;
- semantica de dados;
- regra de permissao;
- payload de webhook;
- evento de fila;
- formato de arquivo;
- resposta consumida pelo frontend.
