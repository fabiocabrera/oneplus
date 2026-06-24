# AGENTS.md

## Objetivo
Este arquivo e a fonte primaria de contexto operacional para agentes Codex no projeto OnePlus.

O objetivo e iniciar projetos CabrerAI Connect com disciplina, economia de tokens, rastreabilidade de decisoes, seguranca de credenciais e continuidade entre sessoes.

## Leitura obrigatoria antes de editar
1. `AGENTS.md`
2. `PROJECT_DOC.md`
3. `contracts.md`
4. `README.md`
5. `AGENT_ROUTING.md`, quando a tarefa envolver escolha de agente/modelo ou economia de tokens
6. `Protocolo-V.L.A.E.G.md`, somente quando a tarefa envolver automacoes, agentes, webhooks, cron, ETL, scripts deterministas, integracoes externas ou payload estruturado
7. `INTEGRATIONS_AGENT.md`, somente quando a tarefa envolver APIs externas, n8n, CRM, mensageria, pagamentos, banco remoto ou conectores
8. `deploy/production.md`, somente quando a tarefa envolver deploy, DNS, CI/CD, EasyPanel, Cloudflare, Docker ou producao

## Fluxo obrigatorio do agente
1. Ler `AGENTS.md`.
2. Identificar se a tarefa e produto, frontend, backend, contratos, banco, integracao, automacao, deploy, scripts ou documentacao.
3. Abrir somente os 2 ou 3 caminhos candidatos mais provaveis.
4. Formular uma hipotese curta antes de buscar amplamente.
5. Buscar apenas no subtree relevante se ainda faltar contexto.
6. Editar a fonte de verdade, nao artefatos gerados.
7. Validar com o menor comando confiavel para a mudanca.
8. Ao finalizar mudancas relevantes, atualizar `Memoria operacional`.

## Modo agressivo de economia
- Orcamento inicial de leitura: no maximo 3 arquivos alem deste antes da primeira hipotese.
- Busca global no repo: no maximo 1, e apenas se o roteamento rapido falhar.
- Depois da primeira busca global, restringir todas as demais a uma subtree.
- Em retomadas, abrir primeiro os arquivos citados na ultima entrada relevante de `Trabalho recente`.
- Preferir `rg` para busca. Se indisponivel, usar a melhor alternativa local.
- Nao usar memoria de projetos antigos como regra do OnePlus quando a decisao ja estiver consolidada aqui.

## Nao procurar primeiro em
Estas areas so devem ser abertas no inicio se o pedido exigir explicitamente:

- `node_modules/`
- `dist/`
- `build/`
- `.next/`
- `.turbo/`
- `.cache/`
- `.venv/`
- `coverage/`
- `test-results/`
- `logs/`
- `tmp/`
- `.tmp/`
- `bak/`
- `scratch/`
- arquivos `.log`, `.out`, `.err`
- lockfiles grandes, salvo quando a tarefa for dependencia/build

## Fonte de verdade
- Workspace atual: `C:\Users\fa_su\ProjetoCodex\OnePlus`
- Documento mestre: `PROJECT_DOC.md`
- Contratos iniciais: `contracts.md`
- Operacao local: `README.md`
- Roteamento de agentes: `AGENT_ROUTING.md`
- Protocolo opcional de automacoes: `Protocolo-V.L.A.E.G.md`
- Guia de integracoes: `INTEGRATIONS_AGENT.md`
- Deploy/producao: `deploy/production.md`
- Referencia operacional externa: `C:\Users\fa_su\ProjetoCodex\spa360-platform`
- Referencia de kit documental: `C:\Users\fa_su\ProjetoCodex\FinOS`
- Cofre local de secrets: `C:\Users\fa_su\.codex-secrets`

## Mapa rapido do workspace atual

### Raiz
- `PROJECT_DOC.md` - documento mestre, fase atual e decisoes do produto
- `contracts.md` - contratos entre camadas, APIs, dados e integracoes
- `README.md` - operacao local e como evoluir o projeto
- `AGENT_ROUTING.md` - matriz consultiva para escolher agente/modelo
- `PROMPTS.md` - prompts curtos para operar o projeto
- `Protocolo-V.L.A.E.G.md` - protocolo opcional para automacoes/agentes/integracoes
- `INTEGRATIONS_AGENT.md` - regras para operar conectores externos sem expor segredos
- `deploy/production.md` - modelo de producao GitHub -> EasyPanel -> Cloudflare
- `BOOTSTRAP-CHECKLIST.md` - checklist de partida para transformar o kit em projeto real
- `TEMPLATE-*.md` - templates reutilizaveis para proximos projetos

### Estrutura planejada
- `frontend/` - existe, importado de `https://github.com/fabiocabrera/soneplus-v2.git`
- `backend/` - nao existe ainda
- `database/`, `supabase/` ou `migrations/` - nao existem ainda
- `scripts/` ou `tools/` - nao existem ainda
- `deploy/` - existe com `deploy/production.md`
- `.github/workflows/` - existe com validacao de producao do frontend
- `.env.example` - existe com variaveis publicas planejadas

## Roteamento rapido por tipo de tarefa

### Produto e arquitetura
Alterar primeiro:
- `PROJECT_DOC.md`
- `README.md`
- `contracts.md`, se houver impacto de API/dados

### Frontend UI
Alterar primeiro:
- `frontend/src/`
- `frontend/src/components/`
- `frontend/src/services/`
- `contracts.md`, se payload ou endpoint mudar

Validar com:
- comando de build/teste definido em `README.md`
- verificacao visual quando houver UI

### Backend API
Alterar primeiro:
- `backend/src/`
- `backend/src/routes/`
- `backend/src/services/`
- `backend/src/env/`
- `contracts.md`

Validar com:
- build/teste backend definido em `README.md`
- healthcheck local quando existir

### Contratos entre camadas
Alterar primeiro:
- `contracts.md`
- backend routes/services
- frontend services/clientes HTTP

Regra:
- Se payload, resposta, status HTTP ou semantica mudar, atualizar contrato, backend e frontend juntos.

### Banco, migrations e dados
Alterar primeiro:
- `PROJECT_DOC.md`
- `contracts.md`
- `database/`, `supabase/` ou `migrations/`
- backend data clients

Regra:
- Dados sensiveis exigem RLS/policies desde o primeiro desenho quando Supabase/Postgres for usado.
- Nunca expor service role, DB URL ou secret key no frontend.

### Automacoes, agentes e integracoes
Alterar primeiro:
- `Protocolo-V.L.A.E.G.md`
- `INTEGRATIONS_AGENT.md`
- `PROJECT_DOC.md`
- `contracts.md`
- `scripts/` ou `tools/`
- `.env.example`

Regra:
- Ativar VLAEG quando houver agente, webhook, cron, ETL, payload estruturado, integracao externa ou risco de falha silenciosa.
- Antes de escrever ferramenta final, provar schema, fonte da verdade, destino e credenciais sem imprimir segredos.

### Deploy e producao
Alterar primeiro:
- `deploy/production.md`
- `.github/workflows/`
- Dockerfiles/manifests/configuracoes de plataforma
- `.env.example`

Regra:
- GitHub e a fonte do codigo, quando repositorio remoto existir.
- EasyPanel e a fonte do deploy do OnePlus.
- Cloudflare e a fonte do DNS publico.
- Nao fazer SSH direto ou mudancas manuais na VPS como caminho oficial quando EasyPanel estiver ativo.

### Documentacao
Alterar primeiro:
- `PROJECT_DOC.md`
- `contracts.md`
- `README.md`
- `AGENTS.md`
- `PROMPTS.md`

## Atalhos por pedido comum
- "bootstrap do projeto" -> `PROJECT_DOC.md`, `README.md`, `contracts.md`, `AGENTS.md`
- "checklist inicial / o que falta" -> `BOOTSTRAP-CHECKLIST.md`
- "qual agente / modelo / economizar tokens" -> `AGENT_ROUTING.md`
- "automacao / agente / webhook / cron / ETL" -> avaliar `Protocolo-V.L.A.E.G.md`
- "integracao / n8n / CRM / API externa / pagamentos" -> `INTEGRATIONS_AGENT.md`
- "deploy / producao / EasyPanel / Cloudflare" -> `deploy/production.md`
- "contrato / payload / endpoint" -> `contracts.md`, backend e frontend services
- "secrets / credenciais" -> usar `C:\Users\fa_su\.codex-secrets` sem imprimir valores

## Comandos ancora

Frontend real:

- instalar dependencias frontend: `bun install --cwd frontend`
- frontend dev: `bun run --cwd frontend dev`
- build frontend: `bun run --cwd frontend build`
- start frontend producao: `bun run --cwd frontend start`
- preview frontend: `bun run --cwd frontend preview`
- lint frontend: `bun run --cwd frontend lint`
- format frontend: `bun run --cwd frontend format`

Comandos documentais:

- inventario de arquivos: `rg --files -g '!node_modules/**' -g '!dist/**' -g '!build/**' -g '!.next/**' -g '!.turbo/**' -g '!.cache/**' -g '!coverage/**' -g '!test-results/**' -g '!logs/**' -g '!tmp/**' -g '!*.log'`
- estado Git: `git status --short --branch`
- remoto Git: `git remote -v`

Comandos de backend e teste integrado devem ser adicionados apos criacao do backend.

Smoke publico atual:

- app producao: `Invoke-WebRequest https://oneplus.cabrerahub.com -UseBasicParsing`
- login producao: `Invoke-WebRequest https://oneplus.cabrerahub.com/login -UseBasicParsing`

## Regras de edicao
- Editar a fonte de verdade primeiro.
- Nao editar `dist/`, `build/`, caches ou arquivos gerados manualmente.
- Nao usar `node_modules/` como referencia de arquitetura.
- Se mudar contrato de API, sincronizar `contracts.md`, backend e frontend.
- Se mudar decisao de produto/arquitetura, registrar em `PROJECT_DOC.md`.
- Nao acoplar OnePlus a FinOS ou Spa360; reaproveitar metodologia, nao regras de negocio.
- Nao colocar dados sensiveis ou credenciais reais no repo.
- Responder sempre em portugues do Brasil neste projeto.

## Politica de validacao
- Documentacao: conferir arquivos esperados, caminhos e referencias.
- Backend: build/testes e healthcheck quando existir.
- Frontend: build/testes e verificacao visual quando houver UI.
- Banco: validar migrations em ambiente apropriado e RLS/policies antes de considerar pronto.
- Automacoes: validar schema, handshake de integracoes, dry-run e entrega do payload.
- Deploy: revisar `deploy/production.md`, workflow, variaveis e smoke publico.

Se nao for possivel validar, registrar claramente o motivo e o risco residual.

## Politica de seguranca
- Nunca imprimir segredos, tokens, chaves privadas ou `.env` completo.
- Usar `C:\Users\fa_su\.codex-secrets` apenas como cofre local de referencia.
- Frontend recebe somente variaveis publicas.
- Backend recebe secrets, service roles, DB URLs e tokens internos.
- Webhooks e automacoes devem ter segredos dedicados.
- Toda tabela sensivel exposta deve ter policy/RLS quando aplicavel.

## Politica de memoria operacional

### Como atualizar
Depois de cada tarefa relevante, registrar:
- pedido em uma linha
- arquivos principais tocados
- decisao importante tomada
- validacao executada
- pendencia ou risco

### Limites
- manter no maximo 10 entradas em `Trabalho recente`
- comprimir entradas antigas em `Resumo historico`
- nao registrar logs longos
- nao registrar comandos irrelevantes

## Memoria operacional

### Estado atual do workspace
- Workspace principal: `C:\Users\fa_su\ProjetoCodex\OnePlus`
- Produto/projeto: OnePlus
- Fase atual: frontend publicado em producao, backend ainda nao criado
- Stack: Python/FastAPI, PostgreSQL/Alembic, Playwright Python, APScheduler, Meta Cloud API, React/TypeScript/Vite, TanStack Router/Start, Tailwind CSS, Docker, GitHub, EasyPanel e Cloudflare
- Estrutura tecnica real: frontend existe em `frontend/`; producao inicial esta em `https://oneplus.cabrerahub.com`; GitHub remoto e CI existem; ainda sem backend, banco, scripts e testes integrados
- Metodo: CabrerAI Connect com AGENTS, contratos, roteamento, VLAEG opcional, integracoes seguras e deploy documentado

### Decisoes estaveis
- OnePlus inicia como projeto novo, separado de FinOS e Spa360.
- FinOS fornece o modelo de disciplina operacional, memoria enxuta e padrao de deploy.
- Spa360 fornece referencia de deploy/integracoes, sem copiar dominios, variaveis, segredos ou regras de negocio.
- O padrao base do OnePlus e Vite + GitHub + EasyPanel + Cloudflare.
- VLAEG fica disponivel, mas so deve ser ativado para automacoes, agentes, integrações externas, scripts deterministas ou payload estruturado.
- Secrets reais ficam fora do repo, no cofre local `C:\Users\fa_su\.codex-secrets`.
- Frontend do OnePlus sera React + TypeScript + Vite, nao Next.js, porque o produto e um painel administrativo autenticado consumindo FastAPI separada e nao depende de SSR/SEO/API routes Node.
- VLAEG deve ser ativado antes de implementar Playwright, APScheduler, Meta Cloud API, storage de PDFs, credenciais de seguradoras ou payloads operacionais estruturados.

### Trabalho recente
- 2026-06-24 | Pedido: corrigir logo quebrado no login e layout interno | Arquivos: frontend/src/components/brand/Logo.tsx, frontend/src/assets/oneplus-logo.jpg, frontend/src/assets/oneplus-logo.png.asset.json, AGENTS.md | Resultado: componente `Logo` deixou de depender do asset externo do Lovable e passou a usar imagem real versionada do OnePlus | Validacao: `bun run --cwd frontend lint` e `bun run --cwd frontend build`; build gerou asset `oneplus-logo-*.jpg`; lint sem erros e com 6 warnings conhecidos de Fast Refresh | Pendencias: publicar deploy no EasyPanel e confirmar smoke publico apos push
- 2026-06-24 | Pedido: publicar frontend OnePlus em producao | Arquivos: frontend/Dockerfile, frontend/.dockerignore, frontend/package.json, frontend/vite.config.ts, .github/workflows/deploy-production.yml, .env.example, .gitignore, deploy/production.md, README.md, PROJECT_DOC.md, AGENTS.md | Resultado: repo `fabiocabrera/oneplus` recebeu `main`; EasyPanel `spa360/oneplus` aponta para GitHub `/frontend` com Dockerfile; Cloudflare criou `oneplus.cabrerahub.com`; URL publica respondeu 200 na home e no login | Validacao: `bun run --cwd frontend lint`, `bun run --cwd frontend build`, start local com HTTP 200, GitHub Actions verde, deploy EasyPanel concluido e smoke publico HTTPS | Pendencias: Docker local nao validado porque Docker Desktop nao estava rodando; backend, banco e automacoes continuam fora do escopo inicial
- 2026-06-24 | Pedido: ajustar dados visuais de acesso do frontend para Henrique | Arquivos: frontend/src/routes/login.tsx, frontend/src/routes/_app.tsx, AGENTS.md | Resultado: login mockado passou a exibir `henrique@oneplusseguros.com.br` com a senha mascarada existente; usuario interno passou a aparecer como Henrique / Adm | Validacao: busca por textos antigos, `bun run --cwd frontend lint` e `bun run --cwd frontend build`; lint sem erros e com 6 warnings conhecidos de Fast Refresh | Pendencias: autenticação real continua fora de escopo ate backend/banco existirem
- 2026-06-24 | Pedido: clonar front `fabiocabrera/soneplus-v2` para o projeto | Arquivos: frontend/, AGENTS.md, PROJECT_DOC.md, README.md, BOOTSTRAP-CHECKLIST.md | Resultado: frontend importado para `frontend/`, `.git` interno removido para evitar repositorio aninhado, comandos reais do frontend registrados e formatação aplicada | Validacao: clone Git concluido, leitura de `frontend/package.json` e `frontend/AGENTS.md`, `bun install`, `bun run build`, `bun run lint` e `bun run --cwd frontend lint`; lint sem erros e com 6 warnings de Fast Refresh em componentes UI | Pendencias: criar backend, banco, automacoes e testes integrados
- 2026-06-24 | Pedido: corrigir padrao de deploy para Spa360/FinOS | Arquivos: AGENTS.md, PROJECT_DOC.md, README.md, deploy/production.md | Resultado: EasyPanel restaurado como fonte oficial de deploy; Cloudflare restaurado como DNS publico; GitHub restaurado como fonte do codigo; referencias desalinhadas de deploy direto removidas | Validacao: revisao dos MDs e busca por termos conflitantes | Pendencias: criar servicos futuros de backend/banco quando existirem
- 2026-06-24 | Pedido: avaliar Vite vs Next.js para o sistema OnePlus descrito no anexo | Arquivos: AGENTS.md, PROJECT_DOC.md, contracts.md, README.md, Protocolo-V.L.A.E.G.md, INTEGRATIONS_AGENT.md, deploy/production.md | Resultado: produto definido como automacao de boletos via WhatsApp; stack inicial registrada com FastAPI, PostgreSQL, Playwright, APScheduler, Meta Cloud API e React/TypeScript/Vite; Vite escolhido no lugar de Next.js; VLAEG marcado como aplicavel para implementacao dos fluxos operacionais | Validacao: leitura do briefing anexado e dos documentos obrigatorios do projeto | Pendencias: criar backend, contratos detalhados de API, migrations, testes e automacoes
- 2026-06-24 | Pedido: bootstrap do projeto e mapeamento real do workspace | Arquivos: AGENTS.md, PROJECT_DOC.md, contracts.md, README.md, deploy/production.md | Resultado: estrutura real documentada como kit documental sem scaffold tecnico; placeholders de comandos substituidos por comandos documentais reais; deploy marcado como template nao operacional naquele momento; VLAEG avaliado e nao ativado por ausencia de fluxo operacional implementado | Validacao: `rg --files`, `git status --short --branch`, `git remote -v` e busca por manifests tecnicos | Pendencias: criar backend, contratos implementados, banco, testes e comandos integrados
- 2026-06-24 | Pedido: conferir kit de arquitetura/agentes/modelos/integracoes | Arquivos: AGENTS.md, AGENT_ROUTING.md, PROMPTS.md, README.md, PROJECT_DOC.md, BOOTSTRAP-CHECKLIST.md, TEMPLATE-AGENTS-COMPACT.md, TEMPLATE-PROMPTS-COMPACT.md | Resultado: kit revisado e reforcado com checklist de bootstrap, templates compactos e regra de roteamento por entregavel/dominio/risco antes de volume | Validacao: leitura cruzada dos MDs OnePlus contra FinOS/Spa360 e conferencia de arquivos | Pendencias: detalhar contratos especificos do produto e iniciar backend
- 2026-06-24 | Pedido: organizar MDs/agentes para iniciar novo projeto CabrerAI Connect | Arquivos: AGENTS.md, AGENT_ROUTING.md, PROMPTS.md, PROJECT_DOC.md, contracts.md, README.md, Protocolo-V.L.A.E.G.md, INTEGRATIONS_AGENT.md, deploy/production.md | Resultado: kit inicial criado em OnePlus a partir do padrao FinOS e referencias operacionais Spa360 | Validacao: conferencia local dos arquivos criados | Pendencias: detalhar contratos especificos do produto e iniciar backend

### Resumo historico
- Projeto iniciado com kit documental e operacional antes do scaffold tecnico.

## Checklist de abordagem enxuta
1. A tarefa e produto, frontend, backend, contrato, banco, script, deploy, documentacao, automacao, agente ou integracao?
2. Quais sao os 2 ou 3 arquivos mais provaveis?
3. Existe mudanca de contrato? Se sim, alinhar contrato, backend e frontend.
4. Existe risco de dados sensiveis?
5. A mudanca vai na fonte de verdade ou em artefato gerado?
6. Preciso mesmo buscar globalmente?
7. O Protocolo VLAEG se aplica ou seria peso desnecessario?
8. Qual validacao minima prova que a tarefa foi feita?
