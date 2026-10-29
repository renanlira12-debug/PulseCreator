# Análise do Modo Criador — ponto de partida

> 22/10/2026. Fonte: modocriador.com.br (home, /assinar, /ia e as 7 páginas de funcionalidade).
> O Instagram @modocriador.app exige login para mostrar os posts; só deu pra ver a bio
> (258 seguidores) e os destaques "Por dentro", "Depoimentos" e "Agências".

## O que é

SaaS para **agência de social media** gerenciar vários clientes num lugar só:
planejar o mês → produzir → cliente aprova → publica → arquiva. A IA faz o rascunho do planejamento.
Feito pela Luzeria Estúdio, uma agência que criou a ferramenta para uso próprio.

## Funcionalidades

| Módulo | O que faz |
|---|---|
| **Calendário / quadro** | cards por cliente (post, reels, carrossel, stories), status: criação → revisão do cliente → aprovado → agendado → publicado |
| **Aprovação por link** | 1 link por cliente, sem login. Aprova em 1 clique ou comenta no post certo. Histórico com data |
| **Publicação automática** | Instagram (feed + reels), Facebook, TikTok via API oficial. LinkedIn "em breve" |
| **IA** | análise do perfil (só texto das legendas e comentários), planejamento do mês em 7 etapas, roteiros, legendas em 3 tamanhos, datas sugeridas, formatar roteiro colado |
| **Nativo (artes)** | gera 10 modelos de arte com a identidade do cliente, depois posts e carrosséis a partir deles |
| **Equipe** | ranking de entregas por pessoa, % entregue no mês |
| **Automações** | regras "quando → então" (ex.: aprovação parada 2 dias → avisa responsável) |
| **Backup no Drive** | arquivo aprovado ou publicado vai sozinho pro Drive da agência, por cliente e mês |
| **Seleção de fotos** | galeria por link a partir de uma pasta do Drive, com marca d'água, várias pessoas escolhem, lista sai pro Lightroom |
| **Biblioteca de referências** | extensão do Chrome salva links como referência geral ou de um cliente |
| **Contrato** | modelo com campos variáveis, cliente assina com o dedo por link (sem ICP-Brasil) |

## Modelo de negócio

| Plano | Preço | Clientes | Colaboradores |
|---|---|---|---|
| Solo | R$ 49,90 | 10 | 2 |
| Pro | R$ 89,90 | 20 | 10 |
| Agência | R$ 149,90 | 30 | 20 |
| Enterprise | R$ 149,90 + R$ 6/cliente | 31+ | 50 |

- Teste de 30 dias com cartão, ou Pix do 1º mês com 7 dias de reembolso.
- **IA cobrada à parte, com preço fixo por uso** (R$ 4,12 por planejamento, R$ 2,41 por análise,
  ~R$ 0,30 por legenda...). Também dá pra usar créditos pré-pagos ou plugar a própria chave de IA.
  Isso protege a margem: IA na mensalidade fixa dá prejuízo.
- Aquisição: blog e uma landing page por funcionalidade (SEO).

## Pontos fracos (onde dá pra ganhar)

1. **A IA não vê imagem nem ouve áudio**, só lê texto. Modelos multimodais já resolvem isso.
2. **Não fecha o ciclo**: o que performou não volta como insumo do próximo planejamento.
3. **O cliente final só aprova.** Não vê resultado, relatório, nem manda material.
4. Publicação sem stories nem carrossel.
5. Automações fixas, não um construtor livre.
6. WhatsApp só "deixa a mensagem pronta", não envia de verdade.
7. Assinatura sem valor jurídico forte.

## O que é difícil de verdade (prazo, não código)

1. **Aprovação da Meta (App Review)** para publicar em contas de terceiros: semanas de espera,
   exige conta Business verificada e vídeo do fluxo. Tem que começar cedo.
2. **Aprovação do TikTok** (Content Posting API): mesma lógica.
3. **Cobrança recorrente com Pix**: Asaas, Pagar.me ou Iugu (Stripe é fraco nisso no Brasil).
4. **Fila de publicação confiável**: postar às 11h03 exige retentativa e controle de erro.
5. **Custo de IA**: precisa de trava de custo desde o primeiro dia.

## Stack sugerida

Next.js + TypeScript + Tailwind · Supabase (banco, login, arquivos, tempo real) ·
Trigger.dev ou Inngest (fila de publicação) · Claude via API (com opção de chave própria) ·
Asaas (cobrança) · Vercel (hospedagem).

## Próximos passos

1. **Você me passa as suas ideias extras.** Elas mudam o banco de dados, então vêm antes do código.
2. **Decidimos o foco:** concorrer de frente, mirar um nicho (clínicas, imobiliárias, fotógrafos...)
   ou usar na sua própria agência primeiro.
3. **Fechamos o MVP**: sugestão = calendário + clientes + equipe + aprovação por link. Já é usável
   sozinho e é a base de todo o resto.
4. **Protótipo das telas principais** para validar o visual antes de programar.
5. **Em paralelo:** criar o app na Meta e começar o processo de verificação da conta Business.
6. Depois: IA → publicação automática → módulos extras → cobrança e site.
