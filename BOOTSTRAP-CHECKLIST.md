# Checklist de Bootstrap - OnePlus

Use este arquivo para transformar o kit CabrerAI Connect em projeto real.

## 1. Produto
- [ ] Definir objetivo unico do produto.
- [ ] Definir publico/usuario principal.
- [ ] Definir escopo do MVP.
- [ ] Registrar decisoes em `PROJECT_DOC.md`.

## 2. Stack
- [x] Escolher frontend.
- [ ] Escolher backend.
- [ ] Escolher banco/auth/storage.
- [ ] Definir se sera monorepo.
- [x] Atualizar comandos em `README.md` e `AGENTS.md`.

## 3. Contratos
- [ ] Definir entidades principais em `contracts.md`.
- [ ] Definir endpoints iniciais.
- [ ] Definir modelo de erro.
- [ ] Definir eventos/webhooks, se existirem.
- [ ] Definir regras de permissao e dados sensiveis.

## 4. Agentes e modelos
- [ ] Conferir `AGENT_ROUTING.md`.
- [ ] Definir se Codex executa diretamente ou apenas direciona.
- [ ] Definir quando Opus revisa alto risco.
- [ ] Definir quando Sonnet executa UI/codigo delimitado.
- [ ] Definir quando Gemini entra para contexto grande/multimodal.

## 5. VLAEG e integracoes
- [ ] Decidir se o projeto tera automacoes/agentes/integracoes.
- [ ] Se sim, usar `Protocolo-V.L.A.E.G.md`.
- [ ] Criar `.env.example` sem segredos.
- [ ] Definir arquivo local no cofre `C:\Users\fa_su\.codex-secrets`.
- [ ] Registrar schemas e destino de payload em `contracts.md`.

## 6. Deploy
- [ ] Definir repositorio GitHub.
- [ ] Definir dominio raiz.
- [ ] Definir servicos EasyPanel.
- [ ] Preencher `deploy/production.md`.
- [ ] Definir smoke test publico.

## 7. Seguranca
- [ ] Criar `.gitignore`.
- [ ] Nunca versionar `.env` real.
- [ ] Separar variaveis publicas e privadas.
- [ ] Definir RLS/policies quando houver dados sensiveis.
- [ ] Documentar politica anti-queda por variaveis.

## 8. Fechamento do bootstrap
- [ ] Rodar validacao minima disponivel.
- [ ] Atualizar memoria operacional no `AGENTS.md`.
- [ ] Registrar pendencias concretas.
- [ ] Remover placeholders que ja tiverem resposta real.
