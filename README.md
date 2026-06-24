# OnePlus

OnePlus e um sistema web para automatizar download e envio de boletos de planos de saude via WhatsApp, organizado pela metodologia CabrerAI Connect.

Este repositorio comeca pelo kit operacional: agentes, roteamento, contratos, VLAEG, integracoes e deploy documentado antes do scaffold tecnico.

## Arquivos principais
- `AGENTS.md` - guia operacional para agentes Codex.
- `PROJECT_DOC.md` - documento mestre de produto, arquitetura e fase atual.
- `contracts.md` - contratos de API, dados, eventos e integracoes.
- `AGENT_ROUTING.md` - matriz consultiva para escolher agente/modelo.
- `PROMPTS.md` - prompts curtos para operar o projeto.
- `Protocolo-V.L.A.E.G.md` - protocolo opcional para automacoes, agentes, webhooks e ETL.
- `INTEGRATIONS_AGENT.md` - guia seguro para conectores externos.
- `deploy/production.md` - modelo de producao GitHub + EasyPanel + Cloudflare.
- `BOOTSTRAP-CHECKLIST.md` - checklist de partida para transformar o kit em projeto real.
- `TEMPLATE-*.md` - templates reutilizaveis para proximos projetos.

## Estado atual
Fase: frontend importado, backend ainda nao criado.

Stack escolhida:

- Backend: Python + FastAPI.
- Banco: PostgreSQL + Alembic.
- Automacao: Playwright Python.
- Agendamento: APScheduler.
- WhatsApp: Meta Cloud API oficial.
- Frontend: React + TypeScript + Vite.
- Frontend real: Vite + React 19 + TypeScript + TanStack Router/Start + Tailwind CSS 4, importado de `fabiocabrera/soneplus-v2`.
- Deploy: GitHub + EasyPanel + Cloudflare, seguindo o padrao Spa360/FinOS.

Decisao frontend: usar **Vite**, nao Next.js. O sistema e um painel administrativo autenticado consumindo uma API FastAPI separada; Vite entrega menos complexidade operacional e encaixa melhor no deploy padrao via EasyPanel.

Estrutura real confirmada em 2026-06-24:

- existe repositorio Git local, ainda sem commits;
- nao ha remoto Git configurado;
- existe `deploy/production.md`;
- existe `frontend/` importado de `https://github.com/fabiocabrera/soneplus-v2.git`;
- nao existe `backend/`;
- nao existe `database/`, `supabase/` ou `migrations/`;
- nao existe `scripts/` ou `tools/`;
- nao existe `.github/workflows/`;
- nao existe `.env.example`;
- existem manifests do frontend em `frontend/package.json`, `frontend/bun.lock`, `frontend/vite.config.ts` e `frontend/tsconfig.json`;
- ainda nao existem Dockerfiles ou manifests backend.

## Comandos reais hoje

Frontend:

```powershell
bun install --cwd frontend
bun run --cwd frontend dev
bun run --cwd frontend build
bun run --cwd frontend start
bun run --cwd frontend preview
bun run --cwd frontend lint
bun run --cwd frontend format
```

Comandos de verificacao documental usados no bootstrap:

```powershell
rg --files -g '!node_modules/**' -g '!dist/**' -g '!build/**' -g '!.next/**' -g '!.turbo/**' -g '!.cache/**' -g '!coverage/**' -g '!test-results/**' -g '!logs/**' -g '!tmp/**' -g '!*.log'
git status --short --branch
git remote -v
```

Smoke publico de producao:

```powershell
Invoke-WebRequest https://oneplus.cabrerahub.com -UseBasicParsing
Invoke-WebRequest https://oneplus.cabrerahub.com/login -UseBasicParsing
```

Comandos backend e testes integrados devem ser adicionados depois que `backend/` existir.

## Secrets
Secrets reais devem ficar fora do repositorio:

```text
C:\Users\fa_su\.codex-secrets
```

Nunca versionar:
- `.env` real;
- service role;
- secret key;
- DB URL com senha;
- JWT secret;
- tokens internos;
- chaves privadas;
- exports com dados sensiveis sem decisao explicita.

## Proximo passo recomendado
Validar o frontend importado e depois criar `backend/`, `.env.example`, Dockerfiles e contratos detalhados da API.
