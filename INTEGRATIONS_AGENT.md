# Guia para agentes de integracoes

## Objetivo
Use este arquivo quando o trabalho envolver n8n, CRM, Supabase, pagamentos, mensageria, LLMs, Meta/Instagram, Google APIs, webhooks ou fluxos externos do OnePlus.

Este documento nao guarda segredos. Ele apenas aponta como credenciais locais devem ser usadas sem expor valores.

## Arquivos locais de credenciais

Cofre principal do Codex:

```text
C:\Users\fa_su\.codex-secrets
```

Arquivo sugerido para este projeto, quando necessario:

```text
C:\Users\fa_su\.codex-secrets\oneplus-integrations.env
```

Referencia auxiliar de infraestrutura, quando existir:

```text
C:\Users\fa_su\.codex-secrets\oneplus-infra-runtime.env
```

## Regras
- Nunca imprimir tokens, chaves ou URLs com senha no chat.
- Nunca copiar arquivos de secrets para dentro do repositorio.
- Nunca commitar `.env`.
- Para validar, mostrar apenas status, contagem e nomes de variaveis preenchidas.
- Antes de editar workflow ou dados externos, fazer leitura/diagnostico e explicar o alvo da mudanca.

## Validacao minima antes de mexer em fluxos
1. Carregar o arquivo de secrets relevante, se existir.
2. Confirmar presenca das variaveis necessarias sem imprimir valores.
3. Validar conexao do servico alvo com endpoint leve.
4. Fazer backup/export do workflow antes de alterar n8n ou ferramenta equivalente.
5. Testar a correcao com caso controlado ou dry-run quando houver risco operacional.

## Fluxo recomendado para corrigir automacoes
1. Identificar o workflow ou job correto.
2. Exportar o estado atual para backup local seguro, sem segredos.
3. Mapear nodes, conexoes, entradas e saidas.
4. Cruzar dados reais na fonte e no destino.
5. Corrigir a menor parte possivel.
6. Validar com execucao controlada.
7. Registrar no `AGENTS.md` o que mudou, validacao e pendencias.

## Prompts curtos

```text
Leia o INTEGRATIONS_AGENT.md e valide as conexoes externas do OnePlus.
```

```text
Leia o INTEGRATIONS_AGENT.md e investigue ponta a ponta: origem -> processamento -> destino.
```

```text
Leia o INTEGRATIONS_AGENT.md e corrija o fluxo de integracao, usando VLAEG se houver risco operacional.
```
