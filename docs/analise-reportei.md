# Análise: Reportei (+ Flux) — o que dá pra aproveitar

> Levantado em 22/10/2026 em reportei.com: home, planos, Flux, Reportei AI, MCP, Controle,
> Linha do Tempo, Automação e a página de métricas de Instagram.

---

## O que é

Ferramenta brasileira de **relatórios e dashboards de marketing**, de 2015. +10.000 clientes em 70
países, **+50 integrações** (Instagram, Meta Ads, Google Ads, GA4, TikTok, YouTube, LinkedIn, Google
Meu Negócio, RD Station, HubSpot, Pipedrive, Shopify, Nuvemshop, Hotmart, iFood...).

Preço: **R$ 74,90 / 109,90 / 199,90 por mês** para até **5 projetos** (projeto = um cliente).
Reportei AI e Flux são **adicionais pagos**. Teste de só **3 dias**.

## O achado mais importante: eles estão vindo pro nosso lado

O **Flux by Reportei** (R$ 29,90/mês por projeto) faz agendamento de posts, calendário, **aprovação
de conteúdo por link**, workflow com status (pendente → aprovado → agendado → publicado), **criação
de post com IA (imagem e legenda)**, dashboard de métricas e até impulsionamento automático no
Meta Ads.

Ou seja: **o Reportei está atacando o território do Modo Criador pelo lado dos dados, e o Modo
Criador ataca o do Reportei pelo lado do conteúdo.** Os dois estão convergindo pro mesmo produto.

Isso não é ruim pra gente — pelo contrário, deixa o nosso espaço mais nítido:

| Quem | O que resolve | O que não tem |
|---|---|---|
| Modo Criador | operação da agência: planejar, aprovar, publicar | relatório sério, portal do cliente |
| Reportei + Flux | dados e relatório (+ operação básica) | o cliente continua sem lugar próprio |
| **Nós** | **a agência opera e o cliente tem um portal de verdade** | — |

E dá uma conta de chegada muito forte pra vender: hoje uma agência de 5 clientes paga
**Modo Criador (R$ 49,90) + Reportei (R$ 74,90) + Flux (R$ 29,90) ≈ R$ 155/mês em três ferramentas**,
e ainda assim o cliente dela não tem onde ver nada. A gente pode ser uma só.

---

## O que vamos usar

### 1. A lista exata de métricas de Instagram — isso é um presente
Eles publicam o que coletam. É a nossa especificação de coleta, pronta:

**Números:** seguidores, variação de seguidores, alcance (geral e por post), impressões (geral e por
post), engajamento, curtidas, comentários, salvamentos, visualizações de perfil, cliques no perfil.

**Stories:** alcance, impressões, avançar, voltar, saídas, **retenção**, respostas.

**Gráficos:** audiência por idade e gênero, crescimento de seguidores no tempo, impressões × alcance
× visualizações, **melhor dia para postar**, **melhor horário para postar**.

**Tabelas:** cidades e países com mais seguidores, postagens em destaque, reels em destaque, stories,
visão geral dos cliques no perfil.

> Nota: "melhor dia e melhor horário" é a mesma funcionalidade que o Modo Criador vende como "datas
> de publicação sugeridas". Os dois têm. Não é diferencial, é obrigação.

### 2. Análise escrita por seção do relatório — **pegar**
O Reportei deixa a agência **escrever uma análise (texto, foto e vídeo) em cada tópico** do
relatório. É o que transforma um monte de número numa história.

Pra gente: cada seção do relatório tem um campo de análise, **a IA escreve o rascunho** e a agência
edita. O concorrente deixa escrever; a gente deixa escrever *e* já entrega escrito.

### 3. Linha do tempo do projeto — **pegar, é barato e vale muito**
Cada cliente tem uma timeline de marcos: reunião estratégica, campanha lançada, conquista,
mudança de rota. O cliente acompanha por link.

Isso responde a pergunta mais cara da relação agência–cliente: *"o que vocês fizeram por mim nesses
oito meses?"*. No nosso portal ela vira uma aba, e boa parte dos marcos pode ser preenchida sozinha
(contrato assinado, mês publicado, reunião realizada, meta batida).

### 4. Metas e alertas (Reportei Controle) — **pegar**
Define indicadores e metas por cliente e avisa por e-mail ou WhatsApp quando sai do esperado —
"corrige no meio do mês, não no fechamento".

E tem um detalhe que eles quase não exploram e que pra gente fecha um ciclo inteiro:
**"garanta que você está postando mensalmente o que está combinado em contrato"**. Como a gente vai
ter o módulo de contrato, dá pra ligar **contrato → meta de entregas → alerta** automaticamente.
Eles têm as peças soltas; a gente pode ter o ciclo.

### 5. Envio automático, e o "resumo" — **pegar**
Relatório agendado por e-mail, WhatsApp, Slack ou Discord. E, melhor ainda, a **automação de
resumos**: mensagem curta com as métricas principais, pra quem não quer o relatório inteiro toda
semana. É barato de fazer e muito bem pensado.

### 6. Overview de todos os projetos numa tela — **pegar**
Indicadores de todos os clientes lado a lado. Vira o painel inicial da agência.

### 7. MCP — **pegar, e aqui dá pra passar na frente**
O Reportei expõe os dados por **Model Context Protocol**, então a agência conversa com os próprios
dados no Claude, ChatGPT ou Cursor. O Flux tem MCP próprio pra criar e agendar post por conversa.

Como a gente já vai construir em cima do Claude, um MCP nosso é barato. E teria algo que **nenhum
dos dois tem junto**: planejamento, aprovação, comentário do cliente *e* métrica no mesmo servidor.
"Claude, o que o cliente pediu pra mudar essa semana e como foi o alcance do que já publicamos?"

### 8. Template de relatório editável
Adicionar, remover e reordenar métricas por cliente, a partir de um modelo. O decisor de uma clínica
não quer ver o mesmo que o de um e-commerce.

---

## O que **não** vamos copiar

- **As +50 integrações.** São dez anos de trabalho e é o fosso *deles*, não o nosso. A gente faz
  Instagram, Facebook e TikTok muito bem feitos. Google Analytics e Meta Ads entram depois, se
  pedirem. Correr atrás do número de integrações é armadilha.
- **Relatório de tráfego pago com profundidade.** É outro comprador (gestor de tráfego), outro
  produto. Fora do nosso foco.
- **Teste de 3 dias.** Curto demais pro nosso ciclo: o valor do nosso produto só aparece quando o
  cliente da agência entra no portal. Os 30 dias do Modo Criador fazem mais sentido aqui.

---

## O que muda no nosso plano

Entram no escopo, nas fases que já tínhamos:

| Entra | Fase |
|---|---|
| Overview de todos os clientes numa tela | 1 — núcleo |
| Lista completa de métricas (inclusive stories e retenção) | 2 — conexões e coleta |
| Linha do tempo do projeto | 3 — portal |
| Análise escrita por seção, com rascunho da IA | 3 — portal |
| Envio automático de relatório e de resumo | 4 — IA / comunicação |
| Metas, alertas e o ciclo contrato → entrega → alerta | 6 |
| Servidor MCP nosso | 7 |

E o posicionamento fica mais afiado: não é "mais um painel de agência", é
**o único lugar onde a agência opera e o cliente acompanha**.
