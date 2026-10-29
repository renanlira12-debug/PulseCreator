# Escopo do produto — o portal do cliente como centro

> Atualizado em 22/10/2026. Base: [analise-modo-criador.md](analise-modo-criador.md).
> Aqui entram as ideias do Renan + os diferenciais que levantamos, com veredito de viabilidade.

---

## A virada de posicionamento

O Modo Criador é um painel **para a agência**. O cliente final só recebe um link e clica "aprovar".

A nossa aposta é outra: **o cliente da agência ganha um portal de verdade.** Relatório, arquivos,
planejamento, comentário no documento, agenda e cofre. A agência não vende mais "a gente posta pra
você" — vende **"você tem um painel da sua marca"**. Isso muda o discurso comercial da agência
inteira, e é algo que o concorrente não tem.

Consequência técnica: o sistema passa a ter **duas superfícies**.

| Superfície | Quem usa | O que é |
|---|---|---|
| `app.` | agência, equipe | produção, IA, publicação, gestão |
| `portal.` | cliente da agência | relatório, arquivos, planejamento, comentários, agenda, cofre |

Mesmo banco, mesmo Postgres, políticas de acesso (RLS) completamente diferentes.

---

## Veredito das ideias novas

| # | Ideia | Viável? | Esforço | Risco |
|---|---|---|---|---|
| 1 | Relatório mensal com métricas | **Sim** | médio | baixo |
| 2 | Acesso ao Drive / arquivos do cliente | **Sim** | baixo‑médio | baixo |
| 3 | Acesso a todo o planejamento | **Sim** | baixo | baixo |
| 4 | Comentar e sugerir mudança no documento | **Sim** | **alto** | médio |
| 5 | Agenda de reuniões + marcar ensaio fotográfico | **Sim** | médio | baixo |
| 6 | Cofre de senhas | **Sim, com ressalva** | médio | **alto** |

Nenhuma é inviável. Uma delas (a 6) precisa de decisão sua antes de eu escrever código.

---

## 1. Relatório mensal com métricas

**Viável.** Vem da Instagram Graph API (`instagram_manage_insights`), e equivalentes no Facebook e
TikTok: alcance, impressões, visitas ao perfil, cliques no link, crescimento de seguidores,
demografia (idade, gênero, cidade) e, por publicação, curtidas, comentários, salvamentos,
compartilhamentos e alcance.

**O detalhe que quase toda ferramenta erra:** a API da Meta só devolve uma janela curta de
histórico. Se a gente só consultar quando o cliente abrir o relatório, **perdemos o passado**.
Então precisamos de um **coletor diário que tira um retrato das métricas e grava no nosso banco**.
Isso significa uma coisa importante pro cronograma: *quanto antes conectarmos as contas, melhor o
primeiro relatório* — mesmo antes de a publicação automática existir.

**Entrega:** página do mês no portal (números grandes, variação vs. mês anterior, melhores posts,
leitura em texto do que aconteceu) + exportação em PDF com a marca da agência.

**Extra que vale:** a IA escreve o parágrafo de análise do mês — "o que funcionou, o que não
funcionou, o que mudar". É isso que faz o cliente sentir que tem uma agência, não um fornecedor.

---

## 2. Acesso ao Drive com os arquivos do cliente

**Viável, e simples.** Mas **não** compartilhando a pasta do Drive direto — isso dá acesso bruto,
sem log e sem volta.

O certo é um **explorador de arquivos dentro do portal**, lendo a pasta daquele cliente pela conta
Google da agência:
- navegação por pastas, miniatura, busca
- download por link assinado de curta duração
- **upload do cliente** pra uma pasta "Enviado pelo cliente" (foto do estabelecimento, logo, material)
- registro de quem baixou e subiu o quê

O cliente enxerga só a pasta dele. A agência continua dona de tudo no próprio Drive.

> Vale pensar em dar ao cliente também um link direto de "abrir no Google Drive" pra quem preferir.
> É um botão, não um módulo.

---

## 3. Acesso a todo o planejamento

**Viável, é o núcleo que já íamos construir.** O portal mostra o mês do cliente com status de cada
conteúdo.

Precisa de um controle fino, senão vira problema: **uma flag de visibilidade por card.** Rascunho
interno não aparece. Quando a agência marca "pronto pra revisão", aí sim entra no portal. Sem isso
o cliente vê trabalho pela metade e cobra em cima de rascunho.

---

## 4. Comentar e sugerir mudanças no próprio documento

**Viável — e é o módulo mais pesado da lista.** É, na prática, o Google Docs do roteiro e da legenda.

O que precisa existir:
- **comentário ancorado a um trecho** (não um comentário solto no fim da página)
- **modo sugestão**: o cliente propõe um texto novo no lugar do antigo; a agência aceita ou recusa
- thread por âncora, com resolvido / não resolvido
- histórico de versões

**Como eu faria:** editor TipTap (ProseMirror por baixo) com marcas de comentário e de sugestão.

**Corte inteligente pra v1:** não fazer edição colaborativa ao vivo (dois cursores na tela ao mesmo
tempo). Comentário ancorado + proposta de substituição entregam ~90% do valor por ~30% do trabalho.
Colaboração em tempo real entra depois, se fizer falta.

Esse módulo sozinho vale de 2 a 3 semanas. É o que mata de vez o "aprovação por link" simples do
concorrente.

---

## 5. Agenda de reuniões e agendamento de ensaio

**Viável, e mais fácil do que parece.** Um Cal.com nosso, dentro do portal:

- a agência cadastra **tipos de compromisso**: reunião de alinhamento (30 min, online),
  gravação/ensaio (3 h, presencial), call rápida (15 min)
- define **janelas de disponibilidade** por colaborador, com antecedência mínima e intervalo entre
  compromissos
- o cliente vê só os horários livres e marca
- cria o evento no **Google Calendar da agência** — e aqui tem uma economia boa: é a **mesma conexão
  Google que já vamos fazer pro Drive**, só mais um escopo de permissão
- confirmação por e-mail e, depois, WhatsApp

**Para ensaio fotográfico** muda pouco: campos extras (local, nº de pessoas, tipo de ensaio),
duração maior, aprovação manual da agência antes de confirmar, e — se você quiser — sinal pago no
ato. O sinal depende do gateway de pagamento, então fica pra depois da fase de cobrança.

---

## 6. Cofre de senhas — viável, mas preciso ser direto com você

É a ideia mais útil no dia a dia e a mais perigosa de implementar mal. Três pontos, na ordem:

**a) Para Instagram, Facebook e TikTok a gente não precisa de senha nenhuma.** São OAuth oficial.
Guardar senha de rede social seria andar pra trás e é exatamente o risco de banimento que o
concorrente usa como argumento de venda. O cofre serve pro que **não tem API**: painel do site,
e-mail, Canva, Google Meu Negócio, provedor de domínio, banco de imagens, conta de anúncio antiga.

**b) Arquitetura mínima, inegociável:** criptografia de envelope. Cada segredo cifrado com
AES-256-GCM por uma chave de dados; a chave de dados embrulhada por uma chave mestra que vive num
KMS e **nunca** no banco. Nada em texto claro, nunca em log, nunca em backup legível. Mais: trilha
de auditoria (quem viu qual senha e quando), 2FA obrigatório pra abrir o cofre, e "revelar" com
tempo limite na tela.

**c) A decisão que é sua:**

| Modelo | O que significa | Custo |
|---|---|---|
| **Servidor** | a chave mestra é nossa; dá pra recuperar se o usuário esquecer a senha | se nosso servidor for comprometido, os segredos estão ao alcance |
| **Zero-knowledge** (recomendo) | a chave nasce de uma frase-senha do usuário (Argon2id) e a leitura acontece **no navegador**; nem nós conseguimos ler | perdeu a frase-senha, perdeu o cofre — sem recuperação |

Eu recomendo zero-knowledge. É o que o 1Password e o Bitwarden fazem, é o que te protege
juridicamente, e é vendável ("nem nós conseguimos ver a senha do seu cliente").

**LGPD:** credencial de terceiro precisa estar prevista no contrato da agência com o cliente e na
nossa política de privacidade. Isso é texto, não código, mas tem que existir antes de ir ao ar.

---

## Login do cliente

O portal exige identidade — não dá pra ter cofre e arquivos atrás de um link público.

**Recomendo magic link por e-mail**: o cliente digita o e-mail, recebe um link, entra. Sem senha pra
esquecer, mantém o espírito "sem fricção", mas agora com identidade e log. O cofre, em cima disso,
pede o segundo fator.

E o **link público de aprovação continua existindo** pro cliente que não quer nem isso — ele só não
dá acesso a relatório, arquivo ou cofre.

---

## Os diferenciais que vão junto

Você disse que quer todos. Ficam assim, com meu veredito de esforço:

| Diferencial | Veredito |
|---|---|
| **IA multimodal** — ler a imagem dos posts e ouvir o áudio dos reels do cliente | fácil hoje, e é um salto grande de qualidade na análise de marca |
| **Ciclo performance → planejamento** — o que performou volta como insumo do próximo mês | o maior buraco do concorrente; depende de ter métricas acumuladas |
| **Portal do cliente** | virou o centro do produto |
| **Construtor livre de automações** | médio; vale deixar pro fim |
| **WhatsApp Cloud API de verdade** | exige conta Business verificada e modelos de mensagem aprovados — tem burocracia própria |
| **Assinatura com hash + carimbo de tempo** | barato de fazer e resolve a fraqueza jurídica do concorrente |
| **Stories e carrossel na publicação** | a API cobre; é só trabalho |

---

## Ordem de construção

Duas coisas têm **relógio próprio** e por isso começam cedo, independente de estarem prontas pra uso:
o **App Review da Meta** (semanas de espera) e a **coleta de métricas** (precisa de tempo acumulando
histórico pra o primeiro relatório não nascer vazio).

| Fase | O que entra | Por quê agora |
|---|---|---|
| **1. Núcleo da agência** | multi-tenant, clientes, equipe, quadro/calendário, mídia, editor de roteiro | sem isso nada existe |
| **2. Conexões** | OAuth Google (Drive + Calendar), OAuth Meta/TikTok em modo leitura, **coletor diário de métricas** | começa a acumular histórico; **submeter o App Review aqui** |
| **3. Portal do cliente** | magic link, planejamento visível, **comentário + sugestão**, arquivos, agenda, relatório do mês | é o diferencial — tem que vir cedo |
| **4. IA** | análise multimodal do perfil, planejamento do mês, roteiros, legendas, medidor de custo, BYOK | é o que vende |
| **5. Publicação** | agendamento com fila, feed, reels, stories, carrossel | quando o App Review sair |
| **6. Ciclo de aprendizado** | performance alimenta o próximo planejamento | só funciona com métricas de meses anteriores |
| **7. Resto** | cofre, gerador de artes, contratos, automações livres, seleção de fotos, WhatsApp | módulos independentes, entram em qualquer ordem |
| **8. Negócio** | planos, trial, cobrança, site e SEO | quando houver o que cobrar |

---

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| App | **Next.js 15 (App Router) + TypeScript** | dois domínios (`app.` e `portal.`) no mesmo projeto |
| Estilo | **Tailwind** com os tokens do nosso design system | ver [design-system.md](design-system.md) |
| Banco / auth / storage / realtime | **Supabase** | Postgres com RLS resolve multi-tenant + portal numa política só; magic link já vem pronto |
| Fila | **Trigger.dev** | publicar às 11h03 de uma terça exige retry e idempotência de verdade |
| IA | **Claude** atrás de uma camada de provider | BYOK desde o dia 1, sem refatoração depois |
| Editor | **TipTap** | comentário ancorado e sugestão com marcas |
| Segredos | **AES-256-GCM + KMS**, ou derivação no navegador | ver seção 6 |
| Pagamento | **Asaas** ou **Pagar.me** | Pix recorrente — Stripe não resolve bem no Brasil |
| Site | **Astro**, separado | SEO é o canal de aquisição que o concorrente prova que funciona |

---

## Decisões que ainda dependem de você

1. **Cofre: zero-knowledge ou servidor?** (recomendo zero-knowledge)
2. **Nome e domínio** do produto.
3. **Nicho:** agência de social media em geral, ou mirar um vertical (clínica, advocacia, imobiliária)?
4. **Você tem agência / clientes reais pra testar?** Muda o que construir primeiro.
5. **Orçamento mensal** pras APIs (IA, Meta, pagamento, hospedagem).
6. **Conta Business verificada na Meta** — precisa existir antes do App Review. Já tem?

---

## Decisões que o protótipo fechou (22/10/2026)

**O portal não usa a lateral do app.** Barra no topo com a marca da agência e as abas
Relatório · Planejamento · Arquivos · Agenda · Linha do tempo · Cofre. O cliente precisa sentir
que entrou no lugar dele, não numa área restrita do painel da agência.

**Planejamento:** o cliente lê o conteúdo do jeito que vai ao ar, seleciona um trecho e escreve
ali do lado. Dois botões no fim: *Aprovar este conteúdo* e *Pedir ajuste*. Os outros conteúdos do
mês ficam numa lista calma — não num kanban, que é linguagem de quem produz, não de quem aprova.

**Agenda:** três tipos de compromisso (alinhamento mensal 30 min online, ensaio de fotos 3 h
presencial, dúvida rápida 15 min). Dia livre destacado, dia sem horário apagado, fuso do cliente
dito na tela. O ensaio passa por confirmação da agência antes de valer.

**Arquivos:** pastas por tipo e por mês, download por arquivo ou tudo de uma vez, e uma área de
envio pro cliente mandar material. A tela diz onde o arquivo mora e que ele é do cliente.

**Cofre — o que o protótipo assume:**
- A senha-mestra existe só no navegador do cliente (zero-knowledge). Dito na tela, com o preço
  junto: perdeu a senha-mestra, perdeu o cofre.
- Tranca sozinho em 10 min parado; a senha revelada some da tela em 20 s.
- Registro de quem abriu o quê e quando, visível pro cliente.
- O cliente tira o acesso de qualquer pessoa da agência, e vale na hora.
- **Rede social não entra no cofre.** Instagram, Facebook e TikTok são ligação oficial, sem senha.
  Isso vira argumento de venda na própria tela.
