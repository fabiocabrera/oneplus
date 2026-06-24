# PROMPTS.md

## Objetivo
Prompts curtos e reutilizaveis para operar o OnePlus seguindo a metodologia CabrerAI Connect.

Use junto com `AGENTS.md`: o `AGENTS.md` guarda o mapa operacional; este arquivo guarda comandos de retomada.

## Bootstrap do projeto

```text
Leia o AGENTS.md primeiro e faca o bootstrap deste projeto.

Objetivo:
- transformar os documentos iniciais em contexto especifico do produto real
- mapear frontend, backend, banco, scripts, deploy, docs, contratos e testes
- identificar se VLAEG deve ficar apenas disponivel ou ativo
- definir comandos reais de dev/build/test/deploy
- atualizar PROJECT_DOC.md, contracts.md, README.md e AGENTS.md

Regras:
- nao abra node_modules, dist, build, logs, caches ou lockfiles grandes no inicio
- substitua placeholders por caminhos reais
- se algo nao existir, marque como "a definir"
- preserve a memoria operacional
- registre pendencias concretas
```

## Reindexar AGENTS

```text
Reindexe o AGENTS.md deste projeto.

Objetivo:
- verificar se a estrutura real mudou
- atualizar caminhos, atalhos e comandos
- remover referencias obsoletas
- preservar a memoria operacional
- manter o arquivo curto e pratico
```

## Roteamento de agente

```text
Leia AGENT_ROUTING.md e recomende o melhor agente/modelo para esta tarefa.

Tarefa:
[descreva aqui]

Entregue:
- agente recomendado
- motivo em uma frase
- risco
- prompt pronto para colar
- evidencias esperadas
- validacao minima
```

## Resumo rapido do projeto

```text
Resuma a estrutura deste projeto de forma pratica para eu editar mais rapido.

Entregue:
- mapa curto do projeto
- arquivos que devo abrir primeiro por tipo de tarefa
- comandos uteis
- pendencias importantes
- o que evitar ler no inicio
```

## Preparar uma tarefa

```text
Prepare a execucao desta tarefa usando AGENTS.md como fonte primaria.

Tarefa:
[descreva aqui]

Objetivo:
- identificar o tipo da tarefa
- listar os 2 ou 3 arquivos mais provaveis
- apontar se existe risco de contrato/API/dados
- apontar se VLAEG se aplica
- apontar validacao minima

Regra:
- nao implemente ainda se eu pedir apenas preparo
```

## Ativar protocolo VLAEG

```text
Leia AGENTS.md e avalie se o Protocolo VLAEG se aplica a esta tarefa.

Tarefa:
[descreva aqui]

Objetivo:
- usar VLAEG somente se houver automacao, agente, webhook, cron, ETL, integracao externa, ferramenta deterministica ou payload estruturado
- definir Visao, Link, Arquitetura, Estilo e Gatilho
- identificar fonte da verdade, schemas, credenciais, destino do payload e validacao
- nao escrever ferramenta final antes de confirmar schema, fonte e destino
```

## Validar antes de finalizar

```text
Valide a mudanca atual antes de finalizar.

Objetivo:
- rodar a menor validacao confiavel indicada no AGENTS.md
- conferir se contratos/documentacao precisam ser atualizados
- conferir se nao foram alterados artefatos gerados ou arquivos sensiveis
- revisar git diff de forma objetiva

No final:
- diga quais validacoes passaram
- diga o que nao foi possivel validar
- diga se existe risco residual
```

## Atualizar memoria operacional

```text
Atualize a memoria operacional deste projeto com o que foi feito nesta sessao.

Formato:
- YYYY-MM-DD | Pedido: ... | Arquivos: ... | Resultado: ... | Validacao: ... | Pendencias: ...

Regras:
- mantenha curto
- nao copie logs longos
- mantenha no maximo 10 entradas em Trabalho recente
```

## Revisar arquitetura

```text
Revise a arquitetura atual usando AGENTS.md, PROJECT_DOC.md, contracts.md e README.md.

Objetivo:
- encontrar inconsistencias entre codigo, documentacao e contratos
- apontar riscos de acoplamento, seguranca, deploy ou fonte de verdade
- sugerir melhorias pequenas e seguras

Regras:
- priorize achados acionaveis
- nao faca refatoracao ampla sem pedir
```

## Handoff da sessao

```text
Prepare um handoff curto desta sessao.

Inclua:
- o que foi feito
- arquivos principais tocados
- decisoes tomadas
- validacoes executadas
- pendencias ou riscos
- proximo passo recomendado

Depois, atualize a memoria operacional do AGENTS.md se a sessao teve mudanca relevante.
```
