# AGENT_ROUTING.md

## Objetivo
Este documento define como escolher o melhor agente/modelo para cada tipo de trabalho no OnePlus.

A meta e economizar tokens, reduzir retrabalho e usar cada agente como uma funcao de equipe: direcionamento, decisao profunda, execucao, validacao e checklist.

## Regra principal
O roteador nao altera automaticamente o LLM.

Ele tem autoridade consultiva:
- recomenda o melhor agente/modelo para a tarefa;
- explica o motivo;
- aponta riscos;
- sugere validacao minima;
- entrega prompt pronto quando o usuario pedir direcionamento.

## Hierarquia obrigatoria
1. Entregavel: analisar/decidir, implementar, revisar ou validar.
2. Dominio e risco: financeiro, banco/RLS, producao, contrato, frontend, automacao ou documentacao.
3. Necessidade operacional: repo, terminal, banco, navegador, deploy ou ferramentas externas.
4. Volume e formato: muitos arquivos, planilha grande, PDF, imagem, video ou contexto amplo.
5. Custo: escolher o modelo mais barato que preserve a qualidade exigida.

Regra critica: volume, PDF, imagem, planilha grande ou muitos arquivos nao direcionam sozinhos para Gemini. Se o entregavel exigir decisao arquitetural, regra financeira, seguranca, banco/RLS, contrato ou producao, Opus ou Codex continuam liderando. Gemini entra como extrator/sintetizador auxiliar quando volume ou multimodalidade forem o gargalo principal.

## Fluxo pratico
Quando o usuario trouxer demanda ampla ou estiver em duvida, responder:

```text
Agente recomendado: [modelo/agente]
Motivo: [1 frase]
Risco: [baixo/medio/alto]
Evidencias esperadas: [arquivos, comandos, numeros ou decisoes]

Prompt para colar:
[prompt completo]

Validacao minima:
[comando/check]
```

## Papeis

### Codex
Use quando a tarefa exige operar repo real, terminal, arquivos, build, deploy ou integracao entre camadas.

Melhor para:
- backend/API;
- contratos alinhando backend e frontend;
- migrations e RLS quando houver edicao real;
- bugs de producao;
- Docker, EasyPanel, Cloudflare e smoke tests;
- automacoes com scripts versionados;
- aplicacao de patches e validacao final.
- direcionamento inicial quando a tarefa ainda precisa ser quebrada entre agentes.

### Claude Opus
Use quando a tarefa exige leitura profunda, julgamento arquitetural ou revisao de alto risco.

Melhor para:
- revisar arquitetura;
- revisar seguranca, RLS e dados sensiveis;
- avaliar tradeoffs de produto;
- revisar integracoes complexas;
- escrever parecer tecnico antes da execucao.

### Claude Sonnet
Use quando a tarefa esta bem especificada e precisa de execucao produtiva.

Melhor para:
- telas e componentes;
- refatorar TSX;
- formularios e estados de UI;
- conectar tela a endpoint ja definido;
- documentacao operacional com escopo claro.

### Gemini 3.1 Pro
Use quando volume ou multimodalidade forem o gargalo principal.

Melhor para:
- PDFs, prints, imagens, videos e planilhas grandes;
- muitos arquivos para sintetizar;
- briefing tecnico a partir de material bruto;
- comparacao ampla entre documento, print e requisito.

Gemini nao deve ser executor final de deploy, migrations, secrets ou alteracao final no repo sem validacao por Codex.

### Modelo menor / Haiku
Use para tarefas baratas e de baixa criticidade:
- resumir;
- transformar decisoes em checklist;
- revisar texto;
- preparar issue;
- classificar tarefas.

## Matriz por area

| Area | Agente principal | Revisor recomendado | Validacao minima |
| --- | --- | --- | --- |
| Produto/roadmap | Claude Opus | Codex | Atualizar `PROJECT_DOC.md` |
| Contratos API | Codex | Opus se alto risco | Build backend + frontend |
| Backend | Codex | Opus se alto risco | Build/testes backend |
| Banco/RLS | Codex | Claude Opus | Migration + teste de acesso |
| Frontend | Claude Sonnet | Codex | Build + verificacao visual |
| UI visual | Claude Sonnet | Codex | Screenshot/fluxo principal |
| Integracoes/API externa | Codex | Opus se risco operacional | Handshake + dry-run |
| Automacoes/agentes | Codex + VLAEG | Opus se alto risco | Execucao minima + payload |
| Deploy/EasyPanel/Cloudflare | Codex | Smoke deterministico | Health publico |
| Documentacao | Sonnet ou modelo menor | Codex se fonte de verdade | Conferir caminhos |
| Contexto gigante/multimodal | Gemini 3.1 Pro | Codex/Opus | Handoff rastreavel |

## Regras de economia
1. Se a tarefa pode ser validada por script, rode script antes de pedir raciocinio longo.
2. Se envolve dado sensivel, banco ou producao, use Codex ou Opus.
3. Se e UI bem especificada, use Sonnet.
4. Se e resumo/checklist, use modelo menor.
5. Se volume/multimodalidade forem gargalo, use Gemini para extrair e sintetizar.
6. Se cruza backend + frontend + contrato, Codex integra.
7. Se muda regra critica de negocio, Opus revisa.
