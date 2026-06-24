# Producao - Template CabrerAI Connect

Modelo:

```text
GitHub main -> EasyPanel -> Docker/Traefik -> Cloudflare DNS
```

## Repositorio
- Owner: `<GITHUB_OWNER>`
- Repo: `<GITHUB_REPOSITORY>`
- Branch: `main`

## EasyPanel
- Projeto: `<EASYPANEL_PROJECT>`
- API service: `<EASYPANEL_API_SERVICE>`
- App service: `<EASYPANEL_APP_SERVICE>`

## Dominios
- API: `https://api.<ROOT_DOMAIN>`
- App: `https://app.<ROOT_DOMAIN>`

## Variaveis
Nunca versionar valores reais.

Backend:

```env
NODE_ENV=production
PORT=<API_INTERNAL_PORT>
CORS_ORIGINS=https://app.<ROOT_DOMAIN>
SUPABASE_URL=<SUPABASE_URL>
SUPABASE_KEY=<SERVICE_ROLE>
WEBHOOK_SECRET=<SECRET>
```

Frontend:

```env
VITE_API_URL=https://api.<ROOT_DOMAIN>/api
VITE_SUPABASE_URL=<SUPABASE_URL>
VITE_SUPABASE_ANON_KEY=<PUBLIC_KEY>
```

## DNS

| Tipo | Nome | Conteudo | Proxy |
| --- | --- | --- | --- |
| A | `api` | `<VPS_IP>` | Somente DNS |
| A | `app` | `<VPS_IP>` | Conforme TLS/proxy |

## Validacao

```powershell
Invoke-WebRequest https://api.<ROOT_DOMAIN>/api/health -UseBasicParsing
Invoke-WebRequest https://app.<ROOT_DOMAIN> -UseBasicParsing
```
