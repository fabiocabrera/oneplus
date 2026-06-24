# AGENTS.md Compacto

Use em projetos pequenos ou temporarios.

## Fonte de verdade
- Projeto: `<PROJECT_NAME>`
- Workspace: `<ABSOLUTE_WORKSPACE_PATH>`
- Documento mestre: `PROJECT_DOC.md`
- Contratos: `contracts.md`
- README: `README.md`
- Secrets: `C:\Users\fa_su\.codex-secrets`

## Regras
- Ler `AGENTS.md` antes de editar.
- Abrir primeiro os 2 ou 3 arquivos mais provaveis.
- Evitar busca global no inicio.
- Nao abrir `node_modules`, `dist`, `build`, caches, logs ou lockfiles grandes sem necessidade.
- Editar fonte de verdade, nao artefatos gerados.
- Nao versionar segredos.
- Se contrato mudar, atualizar docs, backend e frontend.
- Responder em portugues do Brasil.

## Roteamento
- Produto/docs -> `PROJECT_DOC.md`, `README.md`
- API/contratos -> `contracts.md`, backend
- UI -> frontend
- Banco -> migrations/schema
- Automacoes/integracoes -> `Protocolo-V.L.A.E.G.md`, `INTEGRATIONS_AGENT.md`
- Deploy -> `deploy/production.md`

## Validacao
- Frontend: build e visual quando houver UI.
- Backend: build/teste e healthcheck.
- Banco: migration/policy em ambiente apropriado.
- Integracao: handshake e dry-run.
- Docs: conferir caminhos e referencias.

## Memoria operacional
- `YYYY-MM-DD | Pedido: ... | Arquivos: ... | Resultado: ... | Validacao: ... | Pendencias: ...`
