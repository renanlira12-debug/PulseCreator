# Pulse Creator

Sistema para agências de social media: lado da agência (quadro de conteúdos, demandas, equipe com permissões, resultados, financeiro, IA) e portal do cliente (planejamento, aprovação, pedidos, mensagens, relatório, agenda, arquivos e contratos).

Hoje é um protótipo navegável em HTML, sem back-end. Os dados de exemplo e o que muda durante o teste ficam salvos no navegador (localStorage).

## Estrutura

- `novo/` — versão atual
  - `01-analise.md` a `06-video-modo-criador.md` — análise, telas, escopo, design system
  - `prototipo/fonte/` — **edite aqui** as telas
  - `prototipo/comum/` — partes compartilhadas (CSS base, lateral, sessão/permissões, conteúdos)
  - `prototipo/*.html` — telas montadas (geradas, não edite direto)
  - `prototipo/montar.py` — junta `fonte/` + `comum/` e gera as telas
- `docs/` e `prototipo/` — primeira versão, guardada só como referência

## Rodar localmente

```bash
cd novo/prototipo
python3 montar.py
python3 -m http.server 4180
```

Abra http://localhost:4180 (cai no login). A lista de todas as telas está em `telas.html`.

Depois de editar algo em `fonte/` ou `comum/`, rode `python3 montar.py` de novo e recarregue a página.
