# Telas do Modo Criador (prints)

> 22/10/2026. 5 prints dos destaques do Instagram ("Por dentro" e "Agências").
> As telas mostram a Luzeria Estúdio usando o próprio sistema.

## Estrutura geral

- **Marca da agência no topo da lateral** (logo LUZERIA + slogan "Você foi chamado para criar").
  Cada agência vê o sistema com a própria marca → precisa de **white-label** (logo e slogan por agência).
- **Selo do plano/nível**: "Agência Platina II". Parece gamificação por volume, não só o nome do plano.
- **Lateral**: Minhas demandas · Dashboard · Calendário · Redes sociais · Clientes (+) · Buscar.
- **Clientes agrupados em pastas com contador**: SOCIAL MEDIA 18 · PACK DIGITAL 6 · AVULSOS 3 ·
  EX-CLIENTES 14 (em vermelho). As pastas são categorias de contrato, e o ex-cliente é arquivado, não apagado.
- Topo: configurações, busca, ajuda, notificações.
- Faixa de anúncio no topo ("…funcionalidades do Modo Criador →") para avisar novidades.
- Visual: escuro, cartões de vidro, um único destaque em verde-limão.

## 1. Minhas demandas (tela inicial de cada pessoa)

- "Olá, João!" + **frase do dia** (no print, um versículo bíblico). Personalizável pela agência.
- **"Ver como: [pessoa]"**: o gestor enxerga a fila de qualquer colaborador.
- 3 números: **Atrasadas · Para hoje · Próximos 7 dias**.
- Duas visões: **Lista** e **Minha semana**.

## 2. Dashboard da equipe (período)

- Frase-resumo: "Em últimos 3 meses, a equipe finalizou **1528 demandas**", com quebra por formato
  (569 posts · 887 reels · 1 outros · 4 stories) e **variação vs período anterior** (▲ 363%).
- Anel **"% NO PRAZO"** (41%).
- Cartões: Posts, Reels, Outros, **Atrasadas** (em vermelho), cada um com % vs anterior.
- **Pódio "Quem mais entregou"** com foto, coroa no 1º e medalhas. Tocar na pessoa mostra tudo o que ela entregou.

## 3. Dashboard de entregas (mês)

- Seletor de mês (‹ Outubro 2026 ›).
- **Frase que muda com o ritmo**: "Atenção: precisamos acelerar o mês."
- Anel **% entregue** (58% · 135/231).
- **Clientes ativos** (27, não arquivados) · **Meta do mês** (231, "faltam 96", ver lista) · **Entregues**.
- A **meta do mês é a soma do que cada cliente contratou**. Então o cadastro do cliente
  precisa guardar quantos posts, reels e stories por mês estão no contrato.

## 4. IA gerando o planejamento do mês

URL `/minhas-tarefas`. Tela cheia enquanto a IA trabalha:
- Tom leve: "Aproveita pra ir tomar um café!" e "Estamos fazendo o planejamento mensal **por você**."
- **O que está fazendo agora**: "Montando o planejamento do mês e escolhendo os ganchos..."
- **Etapa 4 de 8** (o site fala em 7; o app mostra 8), barra de progresso e **"Faltam ~2 min"**.
- Contexto em pílulas: **cliente** (Júnior Reis) · **mês** (Outubro 2026) · **0 / 1 conteúdos** criados.
- Botão **Cancelar**.

O que isso diz da arquitetura: a geração **roda em segundo plano** (leva minutos) e a tela acompanha
o progresso em tempo real. Precisa de uma tarefa em fila com etapas que gravam o andamento no banco,
e de uma tela que escuta essas mudanças. Cancelar tem que interromper a tarefa e não cobrar o que
não rodou.

## 5. Página do cliente (quadro)

URL `/cliente/<uuid>`. A lateral abre a pasta da categoria e lista os clientes com foto,
botão de info (i) e menu (…).

- Cabeçalho com **logo, nome e subtítulo do cliente** ("Luzeria Estúdio · Conteúdo & Estratégia").
- Abas em formato de pasta: **TUDO · POSTS · REELS · STORIES · MAIS**.
- Filtro de **Formato** com contagem: Todos 6 · Estático 2 · Carrossel…
- **"Contratado: 6 · Esse mês: 6"**: compara a cota do contrato com o que já existe no mês.
- **Cards numerados** (01, 02…) que mostram **a própria arte** em tamanho grande, não um título.
- **Faixa diagonal de status** no canto do card ("PUBLICADO").
- **Barra de ferramentas no card**: texto (Aa), lista, tabela, anexo e outro ícone.
  O card é um mini documento: dá pra escrever roteiro e legenda dentro dele.

## O que isso muda no nosso modelo de dados

| Entidade | Campos que os prints revelam |
|---|---|
| Agência | logo, slogan, cor, frase do dia, nível/selo |
| Categoria de cliente | nome, cor, ordem (pastas da lateral) |
| Cliente | logo, nome, subtítulo, categoria, **cota mensal por formato**, arquivado sim/não |
| Demanda (conteúdo) | número no mês, formato (estático, carrossel, vídeo, story…), responsável, prazo, data de entrega, status, arte (capa), corpo em texto rico (roteiro, listas, tabelas), anexos |
| Colaborador | foto, papel; pode ser "visto como" pelo gestor |
| Geração de IA | cliente, mês, etapa atual / total, mensagem, conteúdos criados, custo, status (rodando, concluída, cancelada) |

Com prazo e data de entrega em cada demanda dá pra calcular tudo: no prazo, atrasadas, ranking e meta.

## Ainda falta ver

1. Calendário (visão do mês com todos os clientes)
2. Card aberto, e como ele muda de status
3. Ficha do cliente e a conexão das redes
4. Tela que o cliente vê no link de aprovação
5. O resultado da IA: como o planejamento aparece depois de pronto
6. Redes sociais (métricas)
