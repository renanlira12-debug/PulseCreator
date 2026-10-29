# Design system — Pulso Creator

> Fonte da verdade do visual. Atualizado em 22/10/2026.
>
> **Decisões do Renan, em ordem:**
> - O nome do produto é **Pulso Creator**.
> - A **estrutura** das telas segue o app real do Modo Criador (lateral inteira, dashboard com
>   frase-resumo e anel, cards de número separados, ranking em pódio, quadro do cliente com abas).
> - O **acabamento** é liquid glass: vidro com espessura sobre uma aurora.
> - **Preto com laranja.**
> - **Só modo escuro.** Não existe tema claro.
> - **Uma fonte só: IBM Plex Mono**, em tudo — títulos, texto, números.

---

## Fonte

**IBM Plex Mono**, pesos 400 / 500 / 600 / 700. Nenhuma outra.

```css
body { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
       font-size: 14px; font-variant-numeric: tabular-nums; }
```

Mono é mais larga que fonte proporcional, então os tamanhos descem e o espaçamento aperta:

| Uso | Tamanho | Peso | Tracking |
|---|---|---|---|
| Título da tela | `clamp(22px, 2.8vw, 36px)` | 700 | −0.055em |
| Número grande | 30–34px | 700 | −0.07em |
| Título de cartão | 14–15px | 700 | −0.04em |
| Texto | 12.5–14px | 400 | — |
| Rótulo em caixa alta | 10.5–11px | 600 | +0.10em |

**Destaque no título** é só cor, mesma fonte e peso:
*"Em últimos 3 meses, a equipe finalizou* **<laranja>412 demandas</laranja>***"*. Uma por tela.

---

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--ac` | `#FF6A1A` | laranja: ação, ponto vivo, borda acesa, número em destaque |
| `--act` | `#FF9254` | laranja claro: texto em laranja sobre o escuro |
| `--acs` / `--acb` | laranja 14% / 34% | fundo e borda de selo, chip, cartão aceso |
| `--cy` | `#FFB020` | âmbar: positivo (▲), "grátis", "aprovado" |
| `--vi` | `#C2410C` | brasa: só em gradiente e na aurora |
| `--ink` | `#F5F3F0` | texto principal (branco quente) |
| `--mut` | `#A9A49D` | texto secundário |
| `--fai` | `#8A857E` | metadado |
| fundo | `radial-gradient(120% 80% at 55% 0%, #1B120B, #0C0A08 55%, #050505)` | preto com um calor no topo |

> Nos arquivos, âmbar e brasa ainda se chamam `--cy` e `--vi` (nomes herdados da paleta anterior).
> No código de verdade, renomear para `--ambar` e `--brasa`.

**Positivo e negativo** se separam por símbolo **e** cor: ▲ em âmbar, ▼ ou atraso em laranja.
Nunca só pela cor.

**Gradiente de botão primário:** `linear-gradient(140deg, #C2410C, #FF6A1A)` com sombra laranja.

---

## Vidro

| Token | Valor |
|---|---|
| `--glass` | `rgba(255,255,255,.05)` — painel |
| `--glass2` | `rgba(255,255,255,.085)` — elevado, pílula |
| `--glass3` | `rgba(255,255,255,.14)` — selecionado |
| `--glassLow` | `rgba(255,255,255,.03)` — fosco, conteúdo dentro de vidro |
| `--side` | `rgba(8,8,9,.6)` — lateral e cabeçalho |
| `--stroke` | `rgba(255,255,255,.11)` — borda |

```css
background: var(--glass);
backdrop-filter: blur(24px) saturate(180%);
border: 1px solid var(--stroke);
border-radius: 20–26px;
box-shadow:
  0 2px 10px rgba(0,0,0,.45), 0 24px 60px rgba(0,0,0,.55),
  inset 0 1px 0 rgba(255,255,255,.2),        /* o topo acende */
  inset 0 -1px 0 rgba(255,255,255,.04);      /* a base devolve um fio */
```

Painel grande ganha a **linha especular** no topo (1px, gradiente branco que some nas pontas).

**Aurora:** três manchas radiais desfocadas — brasa, laranja, âmbar — atrás de tudo. O vidro precisa
dela pra ter o que refratar; sem ela fica cinza.

**Nunca vidro dentro de vidro com blur nos dois.** Por dentro, `--glassLow` sem blur.

---

## Estrutura

**App da agência** — lateral inteira de 272px, colada na borda:
marca **PULSO / CREATOR** + agência + selo do plano → navegação (item ativo com barra laranja de
3px à esquerda) → busca → categorias de cliente como pastas → Biblioteca, Financeiro, Equipe,
Ajuda → usuário.

**Dashboard** — rótulo "ÚLTIMOS 3 MESES" → frase-resumo com o número em laranja → quebra por
formato → variação vs período anterior → seletor de período → anel "NO PRAZO" à direita.
Embaixo, quatro cards de número separados (Posts, Reels, Stories, Atrasadas — esta acesa em
laranja), o pódio de **Quem mais entregou** e a lista **Precisa de você**.

**Portal do cliente** — sem lateral. Cabeçalho de vidro na largura toda com a marca pequena,
"Estúdio Linha para Clínica Bem Viver", o usuário, e as abas embaixo com sublinhado laranja.

---

## Estado

As nove telas do canvas estão nesse sistema.
