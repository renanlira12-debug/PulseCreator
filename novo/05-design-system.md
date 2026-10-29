# Design system — Pulse Creator

> 22/10/2026. Decisões do Renan: nome **Pulse Creator**, estrutura do Modo Criador,
> acabamento **liquid glass**, cores **preto com laranja**.
> Referências: pílulas de vidro que se deformam (collectui, @nitishkmrk) e dashboard escuro com
> cartões de gráfico (collectui, @sitenley).

## Princípios

1. **Estrutura do Modo Criador**: lateral fixa com a marca da agência, dashboard com frase-resumo
   e anel, cartões de número, pódio da equipe, quadro do cliente com abas.
2. **Vidro de verdade**: painéis translúcidos sobre um fundo vivo (aurora laranja). Sem fundo vivo
   o vidro vira cinza, então a aurora é obrigatória.
3. **Laranja é sinal, não decoração**: ação, item ativo, número em destaque, atraso. Um destaque por tela.
4. **Só modo escuro** na v1.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#060606` | fundo |
| `--laranja` | `#FF6B1A` | ação, ativo, destaque |
| `--laranja-claro` | `#FF9A57` | texto laranja sobre escuro |
| `--brasa` | `#C2410C` | gradientes e aurora |
| `--ambar` | `#FFB547` | positivo (▲), "aprovado" |
| `--vermelho` | `#FF5A4E` | negativo (▼), atrasado |
| `--texto` | `#F6F3EF` | texto principal |
| `--texto-2` | `#A8A29B` | secundário |
| `--texto-3` | `#76716B` | metadado |

Positivo e negativo usam **símbolo e cor** (▲ âmbar / ▼ vermelho), nunca só a cor.

Botão primário: `linear-gradient(135deg, #FF8A3D, #FF6B1A 45%, #C2410C)` com brilho interno no topo.

## Vidro

| Token | Valor | Uso |
|---|---|---|
| `--vidro-1` | `rgba(255,255,255,.045)` | painel |
| `--vidro-2` | `rgba(255,255,255,.08)` | pílula, elevado |
| `--vidro-3` | `rgba(255,255,255,.14)` | selecionado |
| `--borda` | `rgba(255,255,255,.10)` | borda |

```css
.vidro {
  background: var(--vidro-1);
  backdrop-filter: blur(28px) saturate(170%);
  border: 1px solid var(--borda);
  border-radius: 24px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.18),   /* o topo acende */
    inset 0 -1px 0 rgba(255,255,255,.04),  /* fio de luz na base */
    0 20px 50px rgba(0,0,0,.5);
}
```

- **Linha especular** no topo dos painéis grandes (gradiente branco que some nas pontas).
- **Nunca blur dentro de blur.** Conteúdo dentro de um painel usa `rgba(255,255,255,.03)` sem blur.
- **Aurora**: 3 manchas radiais desfocadas (brasa, laranja, âmbar) fixas atrás de tudo, com
  movimento lento (40–60 s).

## Movimento "líquido" (da referência)

- **Seletor em pílula com lente**: a pílula de vidro escorrega até a opção escolhida e
  **estica no caminho** (scale X ~1.15) antes de assentar. `cubic-bezier(.3,1.4,.5,1)`, 450 ms.
- Botões em pílula **afundam** ao clicar (scale .96) e ganham brilho interno.
- Trocas de conteúdo com **blur + fade** (blur 8px → 0) em vez de corte seco.
- Respeitar `prefers-reduced-motion`: sem esticar, sem aurora em movimento.

## Tipografia

**Inter** (400/500/600/700), números tabulares.

| Uso | Tamanho | Peso |
|---|---|---|
| Frase-resumo | `clamp(24px, 2.6vw, 34px)` | 700, tracking −0.03em |
| Número grande | 30–36px | 700 |
| Título de cartão | 15px | 600 |
| Texto | 13–14px | 400 |
| Rótulo caixa alta | 11px | 600, tracking +0.08em |

## Componentes de dados (da referência de dashboard)

- **Cartão de número**: rótulo pequeno, número grande, **pílula de variação** (▲ 14,8%) e
  seletor de período no canto.
- **Barras arredondadas sobre trilho**: cada barra tem o trilho cheio em vidro fraco atrás; a do
  mês atual em laranja, as outras em laranja 35%.
- **Funil** (para o fluxo de conteúdo: planejado → produzido → aprovado → publicado) com
  pílula de % em cada etapa.
- **Anel** de progresso com ponta arredondada e brilho laranja.

## Estrutura das telas

**Agência**: lateral de vidro de 264px → marca do Pulse Creator e da agência + selo do plano →
navegação (Minhas demandas, Dashboard, Calendário, Resultados, Mensagens, Clientes) → busca →
pastas de clientes com contador → usuário.

**Portal do cliente**: sem lateral. Barra de vidro no topo com a marca da agência e abas em
pílula com lente (Planejamento, Pedidos, Mensagens, Relatório, Agenda, Arquivos).
