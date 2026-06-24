# Protocolo V.L.A.E.G.

## Objetivo
O V.L.A.E.G. e um protocolo opcional para construir automacoes, agentes, integracoes externas, webhooks, cron jobs, ETLs e ferramentas deterministicas.

Ele nao substitui o `AGENTS.md`. Use este protocolo somente quando o trabalho precisar de descoberta explicita, schemas de dados, conexoes externas testadas, scripts confiaveis e gatilhos de execucao.

## Quando ativar
Ative o VLAEG quando o pedido envolver:
- automacoes recorrentes;
- agentes de IA com ferramentas;
- integracoes com APIs externas;
- webhooks, filas, cron jobs ou listeners;
- scripts deterministas em `tools/`, `scripts/` ou equivalente;
- payloads estruturados entregues em planilha, banco, CRM, Slack, Notion, e-mail, dashboard ou outro destino final;
- processos em que falha silenciosa gere risco operacional.

Nao ative por padrao para:
- ajuste visual simples;
- CRUD comum;
- refatoracao pequena;
- correcao pontual de bug;
- documentacao curta;
- bootstrap generico sem automacao definida.

## Principio central
Confiabilidade vem antes da velocidade.

LLMs podem navegar, interpretar e compor. A logica de negocio, coleta, transformacao e entrega devem ficar em ferramentas deterministicas, testaveis e pequenas sempre que o fluxo tiver risco operacional.

## Protocolo 0: Inicializacao

Antes de escrever ferramentas completas, confirmar se o projeto precisa mesmo do VLAEG.

Para automacoes medias ou longas, criar ou atualizar:
- `task_plan.md` - fases, objetivos, checklist e estado atual;
- `findings.md` - descobertas, restricoes, respostas de APIs e decisoes;
- `progress.md` - o que foi feito, erros, testes e resultados.

Para automacoes pequenas, pode bastar registrar a decisao na `Memoria operacional` do `AGENTS.md`.

## Fase V: Visao
Objetivo: entender o resultado unico desejado e as regras de negocio antes de codificar.

Perguntas:
- Qual e o resultado unico desejado?
- Quais servicos externos entram no fluxo?
- Onde vivem os dados primarios?
- Como e onde o resultado final deve ser entregue?
- O que o sistema deve fazer e o que nunca deve fazer?

## Fase L: Link
Objetivo: provar conectividade antes de construir logica completa.

Passos:
- identificar variaveis de ambiente necessarias;
- conferir `.env.example` sem expor segredos reais;
- criar handshakes minimos para APIs externas quando necessario;
- validar autenticacao, permissao, rate limit basico e formato de resposta.

Se o Link falhar, nao avance para a automacao completa.

## Fase A: Arquitetura
Objetivo: separar decisao, regra e execucao para reduzir fragilidade.

Camadas:
- arquitetura: POPs, schemas, regras e casos de borda;
- navegacao: ordem das ferramentas, roteamento e confirmacoes;
- ferramentas: scripts pequenos, testaveis, idempotentes e sem segredos hardcoded.

## Fase E: Estilo
Objetivo: entregar o payload em formato profissional e utilizavel.

Aplicar quando houver e-mail, Slack, WhatsApp, planilha, PDF, dashboard, CRM, banco ou ferramenta operacional.

## Fase G: Gatilho
Objetivo: colocar a automacao no modo de execucao real.

Tipos comuns:
- cron job;
- webhook;
- fila;
- listener;
- botao em dashboard;
- comando manual documentado;
- automacao em plataforma externa.

Checklist:
- ambiente definido;
- variaveis configuradas;
- logs e erros observaveis;
- rollback ou desativacao simples;
- payload chegando ao destino final;
- documentacao de manutencao atualizada.

## Regras operacionais
- Documentar dado bruto, dado normalizado, payload final, destino e regra de validacao.
- Em falha, identificar se e dado, credencial, rede, schema, regra ou destino.
- Intermediarios ficam em `.tmp/`; entregaveis ficam versionados ou no destino final.
- Um fluxo VLAEG so esta concluido quando o payload chega ao destino esperado ou o bloqueio fica documentado com proximo passo claro.

## Relacao com o kit CabrerAI Connect
Ordem de precedencia:
1. pedido explicito do usuario;
2. `AGENTS.md`;
3. `PROJECT_DOC.md` e `contracts.md`;
4. este protocolo.
