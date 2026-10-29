# Escopo — sistema com dois lados: agência e cliente

> 22/10/2026. Base: [01-analise.md](01-analise.md) e [02-telas.md](02-telas.md).

## A ideia em uma frase

Um sistema como o Modo Criador para a **agência** operar, mais um **portal do cliente** onde o
cliente da agência acompanha tudo, pede, conversa, vê resultado, marca horário e acessa os arquivos.

O Modo Criador só dá ao cliente um link para aprovar. **O portal é o nosso diferencial.**

## Os dois lados

| | Agência (`app`) | Cliente (`portal`) |
|---|---|---|
| Quem | dono, gestor, designer, social media, videomaker | o cliente da agência (e pessoas da equipe dele) |
| Entra com | e-mail e senha / Google | **link mágico no e-mail** (sem senha pra esquecer) |
| Vê | todos os clientes da agência | só a própria marca |
| Visual | painel de produção | página da marca, com o logo da agência |

Mesmo sistema e mesmo banco, com regras de acesso diferentes para cada lado.

---

## Lado da agência

Segue a referência:

1. **Clientes** em pastas (categorias), com logo, cota mensal por formato e arquivamento.
2. **Quadro do cliente**: abas Posts / Reels / Stories, cards com a arte, status, roteiro e legenda.
3. **Calendário** de todos os clientes.
4. **Minhas demandas**: atrasadas, para hoje, próximos 7 dias, com "ver como" para o gestor.
5. **Dashboard**: entregas do mês vs meta, % no prazo, ranking da equipe.
6. **Equipe**: convites, papéis e permissões.
7. **IA**: planejamento do mês, roteiros, legendas.
8. **Publicação automática** no Instagram, Facebook e TikTok.
9. **Caixa de entrada dos clientes**: pedidos, mensagens e sugestões chegando de todos os portais.
10. **Gestão de demandas com nível** (ver abaixo).
11. **Contratos** (ver abaixo), também visíveis no portal do cliente.
12. **Resultados (inspirado no Reportei, ver [04-reportei.md](04-reportei.md))**: overview de
    todos os clientes numa tela, construtor de relatório, análise com IA por seção, envio
    automático do relatório e de resumos, metas e alertas, linha do tempo.

### Gestão de demandas — nível leve, média e alta

Painel com **todas as demandas da agência**, em quadro (colunas por status) ou lista.

**Nível de cada demanda:**

| Nível | Exemplo | Peso | Prazo padrão |
|---|---|---|---|
| **Leve** | story, ajuste de texto, troca de foto | 1 ponto | 1 dia |
| **Média** | post estático, carrossel, legenda + arte | 2 pontos | 3 dias |
| **Alta** | reels com edição, campanha, identidade visual | 3 pontos | 5 dias |

- O nível é **sugerido pelo tipo** de demanda e a agência pode trocar.
- O **prazo padrão** sai do nível; a agência configura os dias.
- **Carga da equipe**: soma dos pontos que cada pessoa tem em aberto vs a capacidade dela na
  semana. Mostra quem está sobrecarregado antes de distribuir trabalho novo.
- Filtros por nível, cliente, responsável, formato e origem (planejamento ou **pedido do cliente**).
- Arrastar o card entre colunas muda o status.
- No dashboard: entregas e atrasos **por nível** (atrasar uma demanda alta pesa mais que uma leve).

**Viável · esforço médio.** É o mesmo quadro da fase 1 com mais um campo e o cálculo de carga.

### Contratos — a agência sobe, o cliente acessa

Painel com **todos os contratos da agência**:

- **Subir contrato pronto** (PDF) ou **gerar a partir de um modelo** com campos variáveis
  (cliente, valor, vencimento, escopo) e mandar para **assinatura eletrônica**.
- Dados de cada contrato: cliente, vigência (início e fim), valor mensal, dia de vencimento,
  renovação automática ou não, **escopo mensal** (ex.: 8 posts, 4 reels, 12 stories) e aditivos.
- Status: **aguardando assinatura · ativo · vence em 30 dias · encerrado**.
- **Resumo no topo**: contratos ativos, receita mensal somada, quantos vencem em 30 dias,
  quantos esperam assinatura.
- Histórico de cada contrato: enviado, visto pelo cliente, assinado, aditivo, renovado.
- Alerta de **vencimento chegando** para renovar a tempo.

**O escopo do contrato vira a cota mensal do cliente.** É dele que sai a meta do dashboard
("Contratado: 8 · Esse mês: 6") e o alerta de "não entregou o que está no contrato".

**No portal do cliente**: aba **Contratos** com os contratos dele, para ler, baixar e assinar.
Mostra o escopo do mês **contratado × entregue**. A agência escolhe, contrato por contrato,
se ele aparece no portal.

> A assinatura com nome, CPF e desenho na tela tem validade jurídica para contrato de prestação
> de serviço entre particulares, mas não é certificado ICP-Brasil. Para ficar mais forte que o
> Modo Criador: registrar IP, data e hora, e um código (hash) do PDF assinado que qualquer um
> pode conferir.

**Viável · esforço médio.** Subir PDF e mostrar no portal é simples; a assinatura é a parte maior.

## Lado do cliente — as partes que você pediu

### 1. Planejamento completo
O mês inteiro em **calendário e em lista**, separado em: **já postado**, **agendado**, **em produção**
e **aguardando sua aprovação**. Clica no conteúdo e vê a arte, a legenda e o roteiro como vão ao ar.

> Detalhe importante: a agência decide quando um conteúdo fica visível. Rascunho não aparece,
> senão o cliente cobra em cima de trabalho pela metade.

**Viável · esforço baixo.** Vem do mesmo quadro da agência.

### 2. Sugerir
- **Aprovar** ou **pedir ajuste** em cada conteúdo.
- **Comentar em um trecho** da legenda ou do roteiro (seleciona o texto e comenta, como no Google Docs).
- **Sugerir ideias de conteúdo** livres ("queria um post sobre o novo serviço").

**Viável · esforço médio.** O comentário num trecho é a parte mais trabalhosa; dá para começar
com comentário no conteúdo inteiro e evoluir depois.

### 3. Subir pedidos
Formulário de **solicitação**: tipo (post, reels, story, arte avulsa, alteração, outro), descrição,
data desejada e **anexos** (fotos, vídeos, logo, documentos).
O pedido vira uma demanda no quadro da agência, com status que o cliente acompanha:
*recebido → em produção → entregue*.

**Viável · esforço baixo-médio.**

### 4. Mensagens
**Chat entre cliente e agência**, um por cliente, em tempo real, com anexos e aviso de nova mensagem
(e-mail e notificação no navegador; WhatsApp numa fase posterior).
Do lado da agência, todas as conversas numa caixa de entrada.

**Viável · esforço médio.**

### 5. Relatório mensal de métricas
Para Instagram, Facebook e TikTok:
- seguidores e crescimento, alcance, impressões, engajamento, visitas ao perfil, cliques no link
- **melhores posts do mês**, comparação com o mês anterior
- público: idade, gênero, cidades
- **análise em texto** escrita pela IA ("o que funcionou, o que mudar"), que a agência revisa
- **exportar em PDF** com a marca da agência

> **Atenção:** a API da Meta só devolve um histórico curto. Precisamos de um **coletor diário** que
> salva os números no nosso banco. Quanto antes as contas forem conectadas, mais completo sai
> o primeiro relatório.

**Viável · esforço médio-alto.** Depende da aprovação da Meta e do TikTok.

### 6. Agenda — ensaio de fotos e reuniões
A agência cadastra **tipos de compromisso**, por exemplo:
- Reunião de alinhamento, 30 min, online (link do Meet automático)
- Ensaio fotográfico, 2–4 h, presencial (local, nº de pessoas, tipo de ensaio)
- Gravação de vídeo
- Call rápida, 15 min

E define **horários disponíveis** de cada pessoa da equipe. O cliente vê só os horários livres e
marca. O ensaio pode exigir **confirmação da agência** antes de valer. O evento vai para o
**Google Agenda** da agência, com lembrete por e-mail.

**Viável · esforço médio.**

### 7. Drive
Pastas do cliente: **Entregas** (por mês), **Fotos dos ensaios**, **Marca** (logo, fontes,
manual), **Enviado pelo cliente** e **Contratos**.
Ver miniaturas, baixar um arquivo ou a pasta inteira, e enviar arquivos.

Uma decisão sua (ver abaixo): os arquivos ficam **no nosso armazenamento** ou **no Google Drive
da agência**.

**Viável · esforço baixo-médio.**

### 8. Contratos
Os contratos dele para ler, baixar e assinar, com o escopo do mês contratado × entregue.
Detalhes no módulo de contratos da agência.

### Extras que combinam com o portal (sugestão)
- **Linha do tempo**: tudo o que a agência fez pelo cliente desde o início. Responde
  "o que vocês fizeram por mim?".
- **Seleção de fotos do ensaio**: depois do ensaio marcado na agência, o cliente escolhe as
  fotos favoritas pela galeria do Drive.
- **Faturas**: o cliente vê as cobranças e o que já foi pago.

---

## Ordem de construção

| Fase | O que entra | Por quê |
|---|---|---|
| **1. Base** | login da agência, equipe, clientes em pastas, **demandas com nível**, quadro, calendário, Minhas demandas, **contratos (subir PDF + escopo)** | sem isso nada existe |
| **2. Portal v1** | login do cliente, planejamento, aprovar / pedir ajuste, pedidos, mensagens, drive, **contratos** | já é o diferencial e já dá pra usar com cliente real |
| **3. Conexões** | conectar Instagram, Facebook e TikTok + coletor diário de métricas + **pedir aprovação à Meta** | começa a juntar histórico cedo |
| **4. Portal v2 + Resultados** | relatório mensal, construtor de relatório, overview de todos os clientes, envio automático, agenda de reuniões e ensaios | relatório precisa do histórico da fase 3 |
| **5. IA** | planejamento do mês, legendas, análise do relatório por seção, melhor dia e horário | o que vende |
| **6. Publicação** | agendar e publicar sozinho | quando a Meta aprovar |
| **7. Dashboard e extras** | metas e alertas, ranking, linha do tempo, seleção de fotos, **assinatura eletrônica e modelos de contrato**, apresentação de resultados, MCP | completa o produto |
| **8. Negócio** | planos, teste grátis, cobrança, site | quando houver o que vender |

## Stack

Next.js + TypeScript + Tailwind · Supabase (banco, login, arquivos, tempo real para o chat) ·
Trigger.dev (coletor de métricas, publicação, IA em segundo plano) · Claude (IA) ·
Google APIs (Agenda e Drive) · Meta e TikTok APIs · Vercel.

## Decisões que preciso de você

1. **Drive:** armazenamento próprio (mais simples, tudo dentro do sistema, mas custa espaço) ou
   Google Drive da agência (os arquivos são da agência, mas depende da conta Google)?
2. **É para vender (SaaS para várias agências) ou para a sua agência primeiro?**
3. **Nome do produto** e **visual** (cores, claro/escuro).
4. **Mensagens:** só dentro do sistema, ou também via WhatsApp desde o início?
5. Você tem **conta Business verificada na Meta**? (necessária para a aprovação)

---

## Equipe, funções e permissões (decidido em 23/10/2026)

- **Quem adiciona é o administrador.** Ele cola os e-mails da equipe, escolhe a **função** e os
  **clientes** (projetos) de cada pessoa e envia os convites. Cada pessoa cria o próprio acesso.
- **A função define as permissões.** Cada função vem com um padrão, e o administrador pode
  ligar ou desligar permissões por função na tela de Equipe. O administrador sempre pode tudo.
- **Cada pessoa vê só os clientes em que trabalha** (designer, videomaker e social media).

| Permissão | Admin | Gestor | Social media | Designer | Videomaker |
|---|---|---|---|---|---|
| Criar demandas e cards | ✓ | ✓ | ✓ | — | — |
| Atribuir responsável | ✓ | ✓ | ✓ | — | — |
| Editar roteiro, legenda e título | ✓ | ✓ | ✓ | — | — |
| Mudar prazo e data de publicação | ✓ | ✓ | ✓ | — | — |
| Subir arte, vídeo e arquivos | ✓ | ✓ | ✓ | ✓ | ✓ |
| Comentar nos cards (interno) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Excluir cards | ✓ | ✓ | — | — | — |
| Pegar e devolver para produção | ✓ | ✓ | ✓ | ✓ | ✓ |
| Mandar para aprovação interna | ✓ | ✓ | ✓ | ✓ | ✓ |
| Aprovar internamente | ✓ | ✓ | ✓ | — | — |
| Enviar para o cliente aprovar | ✓ | ✓ | ✓ | — | — |
| Agendar e publicar | ✓ | ✓ | ✓ | — | — |
| Conversar com o cliente | ✓ | ✓ | ✓ | — | — |
| Usar a IA | ✓ | ✓ | ✓ | — | — |
| Ver dashboard e resultados | ✓ | ✓ | ✓ | — | — |
| Ver demandas de toda a equipe | ✓ | ✓ | — | — | — |
| Subir e editar contratos | ✓ | ✓ | — | — | — |
| Adicionar pessoas e definir funções | ✓ | ✓* | — | — | — |
| Financeiro | ✓ | — | — | — | — |

\* O gestor adiciona e muda função de quem não é administrador nem gestor.

**No banco de dados:** `membro (agencia, usuario, funcao)`, `membro_cliente (membro, cliente)`,
`funcao_permissao (agencia, funcao, permissao)` com os padrões acima, e a checagem acontece
no servidor (políticas de acesso), não só na tela.
