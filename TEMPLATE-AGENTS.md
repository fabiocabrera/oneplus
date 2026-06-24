# AGENTS.md - Template CabrerAI Connect

Use este arquivo como base para novos projetos. Copie para a raiz do projeto com o nome `AGENTS.md` e substitua os placeholders.

## Objetivo
Este arquivo e a fonte primaria de contexto operacional para agentes Codex no projeto `<PROJECT_NAME>`.

## Leitura obrigatoria antes de editar
1. `AGENTS.md`
2. `<PRIMARY_DOC>` ou `PROJECT_DOC.md`
3. `<CONTRACTS_DOC>` ou `contracts.md`
4. `README.md`
5. `AGENT_ROUTING.md`, quando houver roteamento de agente/modelo
6. `Protocolo-V.L.A.E.G.md`, somente para automacoes/agentes/webhooks/cron/ETL/integracoes/payload estruturado
7. `INTEGRATIONS_AGENT.md`, somente para APIs externas/conectores
8. `deploy/production.md`, somente para deploy/producao

## Fluxo obrigatorio
1. Ler `AGENTS.md`.
2. Identificar o tipo da tarefa.
3. Abrir somente os 2 ou 3 caminhos candidatos.
4. Formular hipotese curta antes de busca ampla.
5. Buscar apenas no subtree relevante.
6. Editar a fonte de verdade.
7. Validar com o menor comando confiavel.
8. Atualizar memoria operacional ao final de mudancas relevantes.

## Fonte de verdade
- Workspace: `<ABSOLUTE_WORKSPACE_PATH>`
- Projeto: `<PROJECT_NAME>`
- Documento mestre: `<PRIMARY_DOC>`
- Contratos: `<CONTRACTS_DOC>`
- Frontend: `<FRONTEND_ROOT>`
- Backend: `<BACKEND_ROOT>`
- Banco/migrations: `<DATABASE_ROOT>`
- Scripts/tools: `<SCRIPTS_ROOT>`
- Deploy: `<DEPLOY_ROOT>`
- Cofre local: `C:\Users\fa_su\.codex-secrets`

## Roteamento rapido
- Produto/arquitetura -> `<PRIMARY_DOC>`, `README.md`
- Frontend -> `<FRONTEND_ROOT>`
- Backend -> `<BACKEND_ROOT>`, `<CONTRACTS_DOC>`
- Banco -> `<DATABASE_ROOT>`, `<CONTRACTS_DOC>`
- Automacao/integracao -> `Protocolo-V.L.A.E.G.md`, `INTEGRATIONS_AGENT.md`
- Deploy -> `deploy/production.md`
- Docs -> `PROJECT_DOC.md`, `contracts.md`, `README.md`, `AGENTS.md`

## Comandos ancora
- instalar: `<INSTALL_COMMAND>`
- dev: `<DEV_COMMAND>`
- build backend: `<BACKEND_BUILD_COMMAND>`
- build frontend: `<FRONTEND_BUILD_COMMAND>`
- testes: `<TEST_COMMAND>`
- smoke: `<SMOKE_COMMAND>`

## Politicas
- Nao editar artefatos gerados.
- Nao abrir `node_modules`, `dist`, `build`, caches, logs ou lockfiles grandes no inicio.
- Nao versionar segredos.
- Se contrato mudar, sincronizar docs, backend e frontend.
- Responder em portugues do Brasil.

## Memoria operacional

### Estado atual
- Workspace: `<ABSOLUTE_WORKSPACE_PATH>`
- Projeto: `<PROJECT_NAME>`
- Fase: `<CURRENT_PHASE>`
- Stack: `<STACK>`

### Decisoes estaveis
- `<DECISION_1>`

### Trabalho recente
- `YYYY-MM-DD | Pedido: ... | Arquivos: ... | Resultado: ... | Validacao: ... | Pendencias: ...`

### Resumo historico
- `<SUMMARY>`
