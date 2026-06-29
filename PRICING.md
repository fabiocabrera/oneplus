# OnePlus — Precificação

Modelo de cobrança do OnePlus. Este documento define a estratégia de pricing,
os planos, o setup fee e as implicações técnicas que o backend precisará suportar.

> Status: **proposta de pricing definida**. Ainda não há billing implementado no
> sistema. Valores devem ser revisados conforme validação com os primeiros clientes.

## 1. Modelo de negócio

OnePlus é um **SaaS B2B vertical** para corretoras de planos de saúde. Há dois
níveis na cadeia, mas **apenas um paga**:

```
VOCÊ (dono do SaaS)
   │  cobra mensalidade do corretor
   ▼
CORRETOR (cliente / administrador)
   │  oferece o portal aos seus clientes (não cobra por isso)
   ▼
CLIENTE FINAL (beneficiário)
   │  acessa o portal e baixa o PDF — gratuito
```

- **Quem paga:** o corretor (administrador).
- **Cliente final:** consome de graça. O portal é um **diferencial de venda** do
  corretor, não uma fonte de receita direta.
- **Tipo de modelo:** assinatura recorrente B2B, em **faixas por número de
  clientes** (tiers), **híbrida** com cobrança de excedente.

## 2. Métrica de valor

A cobrança é baseada no **número de clientes ativos** cadastrados pelo corretor.
Escolhida por ser:

- simples de o corretor entender;
- fácil de fiscalizar;
- praticamente equivalente a 1 boleto/cliente/mês.

## 3. Planos

| Plano | Clientes | Preço/mês | WhatsApp | R$/cliente |
|-------|----------|-----------|----------|------------|
| **Essencial** | até 50 | **R$ 297** | Evolution (não oficial) | R$ 5,94 |
| **Profissional** ⭐ | até 150 | **R$ 597** | Oficial Meta incluído | R$ 3,98 |
| **Business** | até 400 | **R$ 1.197** | Oficial Meta incluído | R$ 2,99 |
| **Scale** | 400+ | sob consulta | Oficial + onboarding | negociado |
| **Excedente** | — | **+ R$ 3 / cliente** | — | — |

⭐ Profissional é o plano âncora — onde a maioria dos clientes deve cair.

### Lógica dos números
- Degrau limpo: 297 → 597 → 1.197, cada plano ~dobra capacidade e preço.
- O **R$/cliente cai** conforme sobe o plano (5,94 → 3,98 → 2,99): premia quem
  cresce e estimula upgrade.
- Âncora no meio (efeito psicológico): o Profissional é o "óbvio".
- ROI óbvio: mesmo o Profissional fica abaixo do valor real entregue
  (~R$ 700+/mês), então o "sim" é fácil.

## 4. Setup fee

- **R$ 500 a R$ 1.000**, cobrança **única** na entrada.
- Cobre o trabalho manual de configurar as seguradoras do corretor (login,
  mapear portal, testar coleta).
- Filtra cliente não sério e remunera o esforço inicial pesado.
- Alavanca comercial: pode ser oferecido grátis no plano anual como gatilho de
  fechamento.

## 5. Plano anual

- **2 meses grátis** pagando no ano (paga 10, leva 12).
- Exemplo: Profissional anual = **R$ 5.970** em vez de R$ 7.164.
- Objetivo: reforçar caixa e retenção; mantém o mensal cheio e joga o desconto
  só no anual.

## 6. WhatsApp — custo e diferenciação

O custo de envio **não é driver de preço** (é arredondamento). Vira eixo de
diferenciação entre planos.

| Via | Custo | Risco | Onde usar |
|-----|-------|-------|-----------|
| **Evolution API** (não oficial) | "zero" (só a VPS, fixa e diluída) | Bloqueio de número, sem garantia | Plano de entrada |
| **Meta Cloud API** (oficial) | ~R$ 0,04–0,05/msg (utility template) | Praticamente nulo, entrega garantida | Planos superiores |

- 1 boleto/cliente/mês → ~99 mensagens/mês para um cliente de 99 beneficiários.
- Custo Meta para esse volume: **~R$ 4 a R$ 7/mês** (confirmar no painel da Meta;
  valores variam por volume e categoria).
- **Não cobrar por mensagem avulsa** — complexidade de billing não compensa para
  economizar centavos. Tudo incluído na faixa.
- WhatsApp oficial é vendido como **selo de confiabilidade** ("número verificado,
  sem risco de bloqueio, entrega garantida"), não como custo repassado.

## 7. Âncora de valor (justificativa de preço)

Pricing **value-based**, não cost-plus.

- Funcionária ~R$ 2.500 (custo real com encargos ~R$ 3.500).
- Tarefa de boletos consome ~15–25% do tempo dela num mês → **~R$ 500–700/mês**
  de custo direto evitado.
- Valor total entregue é maior: ganho de produtividade (tempo realocado para
  vendas/retenção), redução de erro/atraso e profissionalismo/portal.
- Regra: capturar **10–30% do valor total gerado**. Com valor percebido de
  R$ 800–1.500/mês, o preço-alvo do plano médio fica em R$ 300–600 → ROI óbvio.

## 8. Estratégia para o primeiro cliente

- Cobrar valor âncora justo (Essencial/Profissional conforme volume), travado
  como **preço de founding member**.
- Usar como caso de validação: medir tempo economizado, coletar depoimento.
- Cobrar o setup fee para ser pago pelo trabalho de integrar as seguradoras.

## 9. Upsell futuro (add-ons)

Degraus de receita adicionais à medida que o produto cresce:

- Portal **white-label** com a marca da corretora.
- Relatórios e analytics.
- Segunda via automática / régua de inadimplência.
- Multi-usuário (mais logins administrativos).
- Integrações adicionais por seguradora.

## 10. Implicações técnicas (para o backend)

O modelo de pricing exige que o sistema suporte:

- **Multi-tenancy:** isolamento de dados por corretor (tenant).
- **Limite por plano:** contagem de clientes ativos por tenant + bloqueio/aviso
  ao atingir a faixa, com lógica de excedente.
- **Flag de via de WhatsApp por plano:** Evolution vs. Meta Cloud API.
- **Controle de assinatura:** plano atual, status (ativo/inadimplente), ciclo
  (mensal/anual), setup fee pago.
- **Portal do cliente final:** acesso público/segregado por tenant para download
  de PDF, sem acesso administrativo.

> Estes pontos devem ser refletidos em `contracts.md` quando o billing e o
> multi-tenant entrarem no escopo de implementação.
</content>
</invoke>
