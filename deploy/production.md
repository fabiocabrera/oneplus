# Producao - GitHub + EasyPanel + Cloudflare

## Estado atual

Deploy configurado em 2026-06-24:

- repositorio GitHub: `https://github.com/fabiocabrera/oneplus`;
- branch de producao: `main`;
- projeto EasyPanel: `spa360`;
- servico EasyPanel: `oneplus`;
- dominio publico: `https://oneplus.cabrerahub.com`;
- frontend publicado a partir de `frontend/Dockerfile`;
- backend/API ainda nao existem neste deploy inicial.

## Modelo oficial

Padrao obrigatorio do OnePlus, herdado da base operacional Spa360/FinOS:

```text
GitHub main
  -> EasyPanel
  -> Docker/Traefik na VPS
  -> Cloudflare DNS
  -> app e api publicos
```

Este deploy inicial publica somente o frontend visual. Backend, banco, automacoes e API ficam para fases posteriores.

## Repositorio

```text
GitHub owner: fabiocabrera
Repositorio: oneplus
Branch de producao: main
URL: https://github.com/fabiocabrera/oneplus
```

Regras:
- GitHub e a fonte do codigo.
- `main` e a branch oficial de producao, salvo decisao explicita.
- GitHub Actions valida build/testes quando CI/CD existir.
- O deploy real acontece pelo EasyPanel.
- Nao fazer deploy SSH direto na VPS como caminho oficial quando EasyPanel estiver ativo.

## EasyPanel

Projeto:

```text
spa360
```

### Servico frontend inicial

```text
Servico: oneplus
Tipo: App
Fonte: GitHub
Owner: fabiocabrera
Repositorio: oneplus
Branch: main
Build Path: /frontend
Build: Dockerfile
File: Dockerfile
Arquivo no repo: frontend/Dockerfile
Porta interna: 3000
Dominio publico: https://oneplus.cabrerahub.com
Destino interno: http://spa360_oneplus:3000/
```

### Servicos futuros

```text
API/backend: ainda nao criado
Banco PostgreSQL: ainda nao criado
Automacoes/Playwright: ainda nao criadas
```

Regras:
- Quando o backend existir, criar servico separado no EasyPanel.
- Quando o banco existir, senha real fica somente no EasyPanel/cofre local, nunca no repo.
- Migrations Alembic devem rodar como etapa controlada antes de considerar deploy backend concluido.

## Variaveis de ambiente

Modelo atual do frontend:

```env
PORT=3000
HOST=0.0.0.0
NODE_ENV=production
```

Variavel publica futura, quando a API existir:

```env
VITE_API_URL=
```

Regras:
- Nunca versionar `.env` real.
- Nunca colocar token Meta, JWT secret, AES key, senha de banco ou credenciais de seguradoras no frontend.
- Variaveis publicas do frontend devem ter prefixo `VITE_*`.
- Depois de mudar variavel publica de build, reimplantar o frontend.

## Politica anti-queda por variaveis

Variavel nova de seguranca nao pode derrubar o boot da API em producao sem confirmacao previa no EasyPanel.

Antes de fazer push para `main` quando tocar em env, Dockerfile, CORS, autenticacao, headers, segredos ou `.env.example`:
1. conferir este documento;
2. confirmar se a variavel nova ja existe no EasyPanel, sem imprimir valor;
3. se ainda nao existir, implementar fallback seguro, warning em log ou rollout em duas etapas;
4. validar build local;
5. validar healthcheck apos deploy.

## Cloudflare DNS

Zona:

```text
cabrerahub.com
```

Registros esperados:

| Tipo | Nome | Conteudo | Proxy | Uso |
| --- | --- | --- | --- | --- |
| A | `oneplus` | `<VPS_IP_DO_EASYPANEL>` | Com proxy ou conforme TLS do EasyPanel | Frontend publico |

Regras:
- Cloudflare e a fonte do DNS publico.
- `oneplus.cabrerahub.com` aponta para a VPS e chega no EasyPanel/Traefik.
- Nao mexer em e-mail, raiz, outros apps ou subdominios legados durante deploy deste projeto, salvo pedido explicito.

## Publicacao segura

1. Validar localmente.
2. Fazer commit e push para `main`.
3. Aguardar GitHub Actions passar, quando CI existir.
4. Reimplantar o servico `oneplus` no EasyPanel se houver mudanca frontend ou variavel publica de build.
5. Validar HTTPS publico.

Comandos esperados:

```powershell
Invoke-WebRequest https://oneplus.cabrerahub.com -UseBasicParsing
Invoke-WebRequest https://oneplus.cabrerahub.com/login -UseBasicParsing
```

## O que nao fazer

- Nao editar containers diretamente como fonte de verdade.
- Nao aplicar configuracao manual na VPS como caminho oficial quando EasyPanel estiver ativo.
- Nao publicar segredo em README, print, issue, log ou chat.
- Nao misturar deploy real com SSH legado, orquestrador manual ou outra plataforma sem decisao explicita.

## Pendencias

- Confirmar DNS `oneplus.cabrerahub.com` no Cloudflare.
- Confirmar no EasyPanel se o app `oneplus` aponta para `fabiocabrera/oneplus`, branch `main`, build path `/frontend`, file `Dockerfile`, porta `3000`.
- Criar backend/API em fase posterior.
- Criar banco em fase posterior.
