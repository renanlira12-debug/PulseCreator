# Análise: Modo Criador (referência)

> Levantamento feito em 22/10/2026 a partir do site modocriador.com.br (landing, páginas de
> funcionalidade, página de IA, blog) e do perfil @modocriador.app no Instagram.
> Serve de base para definirmos o escopo do nosso sistema.

---

## 1. O que o produto é

Um **SaaS de operação para agências de social media**. Não é agendador, não é Trello: é o painel
onde a agência roda o mês inteiro de vários clientes — planejar, produzir, aprovar com o cliente,
publicar e arquivar — com IA escrevendo o rascunho do planejamento.

**Posicionamento declarado:** "nasceu dentro da Luzeria Estúdio" (agência real). Isso é o principal
ativo de marketing deles — produto feito por quem sente a dor.

**Cliente-alvo:** agência pequena/média de marketing (1 a 50 colaboradores, 10 a 31+ clientes).

**Dores que atacam, na ordem em que vendem:**
1. Planejar o mês leva dias → IA monta em um clique.
2. Aprovação some no WhatsApp → link público sem login.
3. Publicar na mão, conta por conta → publicação automática via API oficial.
4. Arte toma o dia → gerador de artes com a identidade do cliente.
5. Arquivo perdido → backup automático no Drive da própria agência.

---

## 2. Mapa de funcionalidades

### 2.1 Núcleo (multi-tenant)
- **Agência = tenant.** Dentro: clientes/marcas, colaboradores com papéis, limites por plano.
- **Ficha do cliente:** briefing, identidade visual, base de conhecimento da agência, arquivos de
  marca no Drive, anotações de reunião. Tudo isso alimenta a IA.
- **Quadro/calendário de conteúdo:** cards por cliente, abas POSTS / REELS / STORIES / CALENDÁRIO,
  filtros por formato, status e contratado. Status visto: *Criação de arte → Revisão do cliente →
  Aprovado → Agendado → Publicado*. Tem Lixeira (desfazer).

### 2.2 IA (o diferencial e o modelo de receita)
Sete capacidades, cada uma com preço fixo e visível **antes** de usar:

| Função | Preço | Observação |
|---|---|---|
| Modo Criador IA (mês inteiro, 7 etapas) | R$ 4,12 / planejamento | analisa perfil → confere briefing → planeja → revisa → roteiros → cards → PDF |
| Prévia de planejamento (4–12 sugestões) | R$ 4,12 | nada salvo sozinho |
| Análise de perfil do Instagram | R$ 2,41 | lê **texto** de legendas e comentários; não vê imagem nem áudio. 1ª grátis por agência |
| Legendas em 3 tamanhos | ~R$ 0,30 | curta/média/profunda de uma vez |
| Nativo — acervo de 10 modelos | R$ 5,90 | uma vez por cliente |
| Nativo — post / carrossel avulso | R$ 0,98 / R$ 1,12 | sai dos modelos do acervo |
| Datas de publicação sugeridas | grátis | usa histórico do perfil, não gasta crédito |
| Formatar roteiros colados | grátis | normaliza transcrição/rascunho |

**Três caminhos de pagamento da IA** (muito bem resolvido comercialmente):
1. Teste grátis: 6 gerações em até 2 clientes, uma vez só.
2. Créditos pré-pagos: R$ 20 / 50 / 100.
3. **BYOK** — a agência pluga a própria chave de IA em Configurações → Integrações. Sem limite,
   custo vai direto pro provedor.

> O custo da IA fica **fora** da mensalidade. Isso protege a margem e é vendido como transparência.

### 2.3 Aprovação por link
Link único **por cliente**, sem conta, sem senha, sem app. Cliente aprova em 1 clique ou comenta
pedindo ajuste — o comentário fica preso ao card certo. Status muda no painel na hora. Histórico
datado de quem aprovou o quê.

### 2.4 Publicação automática
Instagram (feed + reels), Facebook e TikTok via **API oficial, com App Review aprovado pela Meta**.
LinkedIn marcado como "em breve". Conecta a conta do cliente uma vez, agenda com antecedência,
publica sozinho. Eles transformam o App Review em argumento de venda ("bot não autorizado pode
banir a conta do seu cliente").

### 2.5 Nativo (gerador de artes)
Monta um acervo de 10 modelos (7 posts + 3 carrosséis de 4–5 slides) com a identidade da marca.
Depois cada arte nova sai a partir desses modelos. Editor com texto, lista, tabela, anexo.

### 2.6 Backup no Google Drive
OAuth no Drive **da própria agência**. Cada arquivo aprovado/publicado cai em pasta por cliente e
por mês, automático. Argumento forte: "se cancelar o plano, os arquivos continuam seus".

### 2.7 Seleção de fotos (módulo para fotógrafos)
Lê direto a pasta do Drive. Galeria pública com **marca d'água queimada nos pixels** (não overlay
CSS). Capa escolhida, ordem por nome ou horário real da foto, vários respondentes no mesmo link
(noivo/noiva), prazo e encerramento manual. Saída: lista pronta pra virar código no Lightroom.

### 2.8 Contrato com assinatura eletrônica
Modelo de contrato da agência com campos variáveis (nome, valor, vencimento, qtd. de posts).
Link público → cliente digita nome e CPF e desenha a assinatura. Sem ICP-Brasil (eles admitem).

### 2.9 Biblioteca de referências + extensão Chrome
Extensão oficial: 2 cliques, título e URL preenchidos, escolhe se é geral ou de um cliente.
Toda a equipe com acesso àquele cliente enxerga.

### 2.10 Automações (quando → então)
Regras simples: *status virou "Revisão do cliente" → deixar o WhatsApp pronto*; *aprovação parada
2 dias → avisar responsável*; *status virou "Criação de arte" → atribuir pra designer*.

### 2.11 Dashboard e métricas
Entregas por colaborador (ranking), % de entregas do mês, clientes ativos, entregues/faltando.
Métricas das redes nos últimos 30 dias: alcance, taxa de engajamento, seguidores, publicações.

---

## 3. Modelo de negócio

| Plano | Preço estreia | Clientes | Colaboradores |
|---|---|---|---|
| Solo | R$ 49,90/mês (de 64,87) | 10 | 2 |
| Pro | R$ 89,90/mês (de 116,87) | 20 | 10 |
| Agência | R$ 149,90/mês (de 194,87) | 30 | 20 |
| Enterprise | R$ 149,90/mês + R$ 6,00/cliente extra | 31+ | 50 |

- Trial de **30 dias com cartão** (cobra no fim) **ou Pix do 1º mês com 7 dias de reembolso**.
- Upgrade automático de Agência → Enterprise ao passar de 30 clientes.
- Créditos de IA vendidos à parte.
- Aquisição por SEO: ~27 posts de blog + 7 landing pages por funcionalidade, com comparativos
  diretos (vs Trello, vs Notion, vs Metricool, vs planilha+WhatsApp).

---

## 4. Stack que eles usam (inferida dos headers e da CSP)

| Camada | Tecnologia |
|---|---|
| Site institucional | **Astro** |
| Hospedagem | **Vercel** |
| Backend / banco / auth / storage / realtime | **Supabase** (inclui `wss://` → realtime ativo) |
| Erros | **Sentry** |
| Push | **OneSignal** |
| Integrações | Google APIs (Drive, OAuth), Meta / Facebook Graph API, TikTok |
| Mídia | `media-src` apontando pro Supabase Storage |
| WebRTC | STUN/TURN liberados + `display-capture`, `camera`, `microphone` → há algum recurso de gravação de tela/vídeo ou chamada no app |

Ou seja: **Next/Astro + Supabase + Vercel**. É uma stack enxuta, de um time pequeno, e perfeitamente
replicável.

---

## 5. Leitura crítica — onde dá pra ser melhor

1. **A IA só lê texto.** Não analisa a imagem nem o áudio dos posts do cliente. Um concorrente que
   analise o visual (paleta, tipo de enquadramento, estilo de edição) e o áudio dos reels entrega
   análise de marca muito mais precisa. Hoje isso é barato com modelos multimodais.
2. **Nenhuma camada de performance → aprendizado.** Eles planejam e publicam, mas não parecem
   fechar o ciclo: *o que foi publicado performou? então planeje mais daquilo.* Esse é o maior
   buraco do produto.
3. **Cliente é só aprovador.** O cliente final não tem painel, não vê resultado, não manda material.
   Um portal do cliente (mesmo leve) é diferencial de retenção — e justifica preço maior.
4. **Sem stories e sem carrossel de reels na publicação automática.** Só feed e reels.
5. **Assinatura sem valor jurídico forte** (sem ICP-Brasil, sem hash/carimbo de tempo verificável).
6. **Automações muito limitadas** — 3 regras fixas, não um construtor livre.
7. **WhatsApp é só "deixar pronto"**, não é integração real (API Oficial / Cloud API).

---

## 6. Dificuldades reais do projeto (prazo, não código)

Em ordem de risco:

1. **App Review da Meta** — publicar no Instagram de terceiros exige `instagram_content_publish`,
   `instagram_basic`, `pages_show_list`, `business_management`, conta Business verificada e
   revisão com vídeo demonstrando o fluxo. Leva **semanas**. Precisa começar cedo, em paralelo.
2. **Content Posting API do TikTok** — mesma lógica, revisão própria, mais restritiva.
3. **Recorrência + Pix no Brasil** — Stripe não resolve Pix recorrente bem; Asaas / Pagar.me /
   Iugu são o caminho.
4. **Fila confiável de publicação agendada** — publicar às 11h03 de uma terça exige worker com
   retry, idempotência e janela de erro. Não dá pra depender de cron de borda sem controle.
5. **Custo de IA** — o modelo de crédito + BYOK deles existe porque IA no preço fixo mata a margem.
   Qualquer coisa que a gente faça precisa dessa trava desde o dia 1.

---

## 7. Roteiro sugerido de construção

| Fase | Entrega | Por quê |
|---|---|---|
| **0. Decisão** | posicionamento, nicho, nome, stack | define tudo o resto |
| **1. Núcleo** | auth multi-tenant, clientes, quadro/calendário, upload de mídia, **aprovação por link** | é o coração; já é usável sozinho |
| **2. IA** | análise de perfil, planejamento do mês, roteiros, legendas — com contador de custo e BYOK | é o que vende |
| **3. Publicação** | Meta primeiro (feed+reels), fila de agendamento, depois TikTok | iniciar App Review **durante a fase 1** |
| **4. Artes** | gerador de templates por marca | pesado; só depois do fluxo fechar |
| **5. Periféricos** | Drive, contratos, seleção de fotos, referências, automações | módulos independentes |
| **6. Negócio** | planos, trial, cobrança, dashboard de métricas | só quando houver o que cobrar |
| **7. Aquisição** | site, landing por funcionalidade, blog/SEO | eles provam que isso funciona |

### Stack recomendada para nós
- **Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui**
- **Supabase** — Postgres com RLS por agência, Auth, Storage, Realtime
- **Fila:** Trigger.dev ou Inngest (publicação agendada precisa de retry de verdade)
- **IA:** Claude via API, atrás de uma camada de provider para permitir BYOK desde o início
- **Artes:** templates em HTML → Satori/Resvg (rápido e barato) com fallback Puppeteer
- **Pagamento:** Asaas ou Pagar.me (cartão recorrente + Pix)
- **Site:** Astro, separado do app, pelo SEO

---

## 8. O que eu preciso saber antes de escrever a primeira linha

1. **Objetivo:** concorrer de frente, atacar um nicho que eles não atendem, ou é pra uso da sua
   própria operação?
2. **Você tem agência / clientes reais pra validar?** Muda completamente o que construir primeiro.
3. **Prazo e orçamento** para APIs pagas (IA, Meta, pagamento).
4. **Quem programa?** Eu escrevo tudo, ou você também mexe?
5. **As suas ideias a mais** — você disse que tem. Elas podem mudar a modelagem do banco, então
   quanto antes, melhor.
