# Pulse Creator

Sistema para agências de social media: lado da agência (pautas, clientes, agenda, conversas da equipe, ferramentas e gestão) e portal do cliente (aprovações, pedidos, mensagens, agenda, arquivos e relatórios).

Hoje é um protótipo navegável em HTML, sem back-end. Os dados de exemplo e o que muda durante o teste ficam salvos no navegador (localStorage).

**Vai mexer no projeto?** Comece pelo [COMO-COMECAR.md](COMO-COMECAR.md): instalação, como rodar e como enviar mudanças.

## Estrutura

- `v2/` — **versão atual** (visual claro e enxuto, inspirado no Showa, em preto e laranja)
  - `index.html` — login (conta Google de exemplo ou e-mail)
  - `inicio.html` · `pautas.html` · `clientes.html` · `cliente.html` · `agenda.html` · `social.html` · `ferramentas.html` · `gestao.html` — telas da agência
  - `portal.html` — portal do cliente (uma página com seções)
  - `aprovar.html` e `briefing.html` — links públicos que o cliente abre sem login
  - `assets/app.css` — visual; `assets/app.js` — lateral, topo, perfil e editor de pauta; `assets/dados.js` — dados de exemplo e permissões
- `novo/` — versão anterior (escura, com mais telas), guardada como referência
- `docs/` e `prototipo/` — primeira versão, só referência

Não tem etapa de montagem: edite os arquivos de `v2/` e recarregue a página.

## Rodar localmente

```bash
cd v2
python3 servir.py
```

Abra http://localhost:4190. No login, “Entrar com Google” mostra as contas de exemplo (admin, social media, designer, videomaker, cliente e um colaborador novo para ver o primeiro acesso).

Para zerar os dados de teste: Gestão › Configurações › “Voltar aos dados de exemplo”.
