# OnePlus - Documento Mestre

## Visao geral
Nome de trabalho: **OnePlus**

Objetivo inicial: construir um sistema web profissional para automacao de envio de boletos de planos de saude via WhatsApp, com painel de controle, historico completo, download automatizado em portais de seguradoras e envio automatico D-10 antes do vencimento.

## Estado atual
- Fase atual: **frontend publicado em producao, backend ainda nao criado**.
- Estrutura real confirmada em 2026-06-24: kit documental, repositorio Git publicado em `https://github.com/fabiocabrera/oneplus`, `deploy/production.md` e `frontend/` importado de `https://github.com/fabiocabrera/soneplus-v2.git`.
- Produto definido a partir do briefing: automacao de boletos de planos de saude com painel administrativo, Playwright, PostgreSQL, WhatsApp Meta Cloud API e execucao agendada.
- Stack inicial definida: backend Python/FastAPI, frontend React/TypeScript/Vite, PostgreSQL, Playwright Python, APScheduler, storage local de PDFs, Docker e deploy padrao GitHub + EasyPanel + Cloudflare.
- Producao inicial publicada: `https://oneplus.cabrerahub.com`, via GitHub `fabiocabrera/oneplus`, EasyPanel projeto `spa360`, app `oneplus`, Cloudflare `cabrerahub.com`.
- Ainda nao ha backend, banco, testes backend ou integracoes implementadas.
- O kit inicial foi criado a partir da disciplina operacional do FinOS e dos padroes de deploy/integracao do Spa360.

## Metodologia CabrerAI Connect
O projeto deve operar com estes pilares:

- `AGENTS.md`: fonte primaria de contexto operacional.
- `PROJECT_DOC.md`: documento mestre de produto, arquitetura e decisoes.
- `contracts.md`: contratos entre camadas, APIs, banco, eventos e integracoes.
- `AGENT_ROUTING.md`: escolha consultiva de agente/modelo por entregavel, dominio e risco.
- `Protocolo-V.L.A.E.G.md`: modo opcional para automacoes, agentes, webhooks, ETL e payload estruturado.
- `INTEGRATIONS_AGENT.md`: regras para conexoes externas sem expor credenciais.
- `deploy/production.md`: fonte operacional do deploy de producao.
- `PROMPTS.md`: prompts curtos para retomada e operacao.
- `BOOTSTRAP-CHECKLIST.md`: checklist para transformar o kit em projeto real.

## Decisoes iniciais
- OnePlus e um projeto novo, nao um fork de negocio do FinOS ou do Spa360.
- O padrao operacional base do OnePlus e o mesmo usado hoje em Spa360 e FinOS: Vite + GitHub + EasyPanel + Cloudflare.
- Spa360 e FinOS sao referencia de metodologia, deploy e operacao; regras de negocio, dominios, variaveis e banco nao devem ser copiados automaticamente.
- Secrets reais ficam fora do repositorio em `C:\Users\fa_su\.codex-secrets`.
- Frontend escolhido: **React + TypeScript + Vite**, nao Next.js.
- Motivo da escolha: o produto e um painel administrativo autenticado consumindo API FastAPI separada; nao ha necessidade relevante de SSR, SEO, Server Components ou API routes Node. Vite reduz complexidade, encaixa melhor com EasyPanel/Docker e mantem separacao clara entre frontend estatico e backend Python.
- Next.js deve ser reconsiderado somente se o produto ganhar area publica com SEO, SSR por usuario, rotas server-side em Node, marketing pages importantes ou necessidade clara de fullstack React.
- VLAEG deve ser ativado quando iniciar a implementacao dos fluxos de Playwright, APScheduler, Meta Cloud API, storage de PDFs, credenciais de seguradoras ou qualquer payload estruturado operacional.

## Stack alvo
Stack escolhida para o scaffold tecnico:

- Backend: Python + FastAPI.
- Banco de dados: PostgreSQL.
- Migrations: Alembic.
- Automacao de portais: Playwright Python, headless na VPS.
- Agendamento: APScheduler.
- Storage de PDFs: pasta local na VPS organizada por ano, mes e CPF do cliente.
- WhatsApp: Meta Cloud API oficial.
- Frontend: React + TypeScript + Vite.
- Deploy/runtime: GitHub + EasyPanel + Docker + Cloudflare, seguindo o padrao Spa360/FinOS.
- Deploy inicial: frontend em `https://oneplus.cabrerahub.com`, build path `/frontend`, `frontend/Dockerfile`, porta interna `3000`, DNS Cloudflare para o IP do EasyPanel.

Frontend real importado:

- Origem: `https://github.com/fabiocabrera/soneplus-v2.git`.
- Caminho local: `frontend/`.
- Stack encontrada: Vite, React 19, TypeScript, TanStack Router/Start, Tailwind CSS 4, shadcn/Radix, Bun.
- Scripts reais: `bun run dev`, `bun run build`, `bun run preview`, `bun run lint`, `bun run format`.
- O `.git` interno do clone foi removido para integrar o front ao repositorio OnePlus.

Ainda nao existe no workspace atual:

- Sem `backend/`.
- Sem `database/`, `supabase/` ou `migrations/`.
- Sem `scripts/` ou `tools/`.
- Sem `backend/Dockerfile`.

## Modulos previstos
- Cadastro de clientes.
- Cadastro seguro de credenciais das seguradoras.
- Motor de automacao Playwright por seguradora.
- Motor de envio WhatsApp via Meta Cloud API.
- Dashboard administrativo.
- Historico por cliente e historico geral.
- Configuracoes de integracoes, mensagem e agendamento.
- Logs do sistema.
- Modulos independentes por seguradora: Amil, SulAmerica, Bradesco, Porto Seguro, Omint e Unimed.

## Estrutura real confirmada

```text
OnePlus/
  .git/
  .github/
    workflows/
      deploy-production.yml
  .env.example
  .gitignore
  deploy/
    production.md
  frontend/
    Dockerfile
    .dockerignore
    src/
    package.json
    bun.lock
    vite.config.ts
    tsconfig.json
  AGENTS.md
  AGENT_ROUTING.md
  BOOTSTRAP-CHECKLIST.md
  contracts.md
  INTEGRATIONS_AGENT.md
  PROJECT_DOC.md
  PROMPTS.md
  Protocolo-V.L.A.E.G.md
  README.md
  TEMPLATE-AGENTS-COMPACT.md
  TEMPLATE-AGENTS.md
  TEMPLATE-DEPLOY-PRODUCTION.md
  TEMPLATE-PROMPTS-COMPACT.md
  TEMPLATE-PROMPTS.md
```

## Estrutura alvo a criar

```text
OnePlus/
  backend/
    api/
      routes/
      models/
      services/
      automation/
        insurers/
    scheduler/
    storage/
    alembic/
  frontend/                # importado de fabiocabrera/soneplus-v2
    src/
      routes/
      components/
      lib/
  backend/Dockerfile
  deploy/
    production.md
  AGENTS.md
  AGENT_ROUTING.md
  PROJECT_DOC.md
  contracts.md
  README.md
  PROMPTS.md
  Protocolo-V.L.A.E.G.md
  INTEGRATIONS_AGENT.md
  BOOTSTRAP-CHECKLIST.md
```

## Proximos passos
1. Criar `backend/`, `.env.example` backend e `backend/Dockerfile`.
2. Definir servicos futuros de API/banco no EasyPanel.
3. Atualizar `VITE_API_URL` quando a API existir.
4. Criar models e migrations Alembic.
5. Criar CRUD inicial de clientes e credenciais.
6. Implementar primeiro modulo Playwright da Porto Seguro com VLAEG ativo.
7. Implementar envio WhatsApp e logs operacionais.

## Validacao do bootstrap
- Inventario real executado com `rg --files` excluindo caches, builds e logs.
- Repositorio remoto configurado em `https://github.com/fabiocabrera/oneplus`.
- Commit inicial publicado em `main`.
- Frontend importado em `frontend/` a partir de `fabiocabrera/soneplus-v2`.
- Dependencias frontend instaladas com `bun install`.
- Build frontend validado com `bun run build`.
- Lint frontend validado com `bun run lint`; restam 6 warnings de Fast Refresh em componentes UI, sem erros.
- `frontend/dist/` e `frontend/node_modules/` estao ignorados pelo `.gitignore` do frontend.
- GitHub Actions `production-build` validado com sucesso.
- EasyPanel publicou o app `spa360/oneplus`.
- Smoke publico validado em `https://oneplus.cabrerahub.com` e `https://oneplus.cabrerahub.com/login` com HTTP 200.

## Avaliacao VLAEG
VLAEG se aplica ao projeto por envolver automacao recorrente, Playwright em portais externos, credenciais sensiveis, Meta Cloud API, armazenamento de PDFs, agendamento e payloads operacionais para WhatsApp. Ele nao foi executado nesta decisao de stack, mas deve ser ativado antes de implementar os fluxos reais de automacao, integracao externa e envio.
