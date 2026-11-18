# Como começar a mexer no Pulse Creator

Guia para quem vai trabalhar no projeto no próprio computador. Leva uns 15 minutos na primeira vez.

## 1. Instale (uma vez só)

| O quê | Para quê | Onde baixar |
|---|---|---|
| **Git** | Baixar e enviar o código | https://git-scm.com/downloads |
| **Python 3** | Rodar o servidor local | https://www.python.org/downloads (no Windows, marque **“Add Python to PATH”** na instalação) |
| **VS Code** (recomendado) | Editar os arquivos | https://code.visualstudio.com |

No Mac, o Git e o Python geralmente já vêm instalados. Para conferir, abra o Terminal e rode `git --version` e `python3 --version`.

## 2. Aceite o convite

O Renan te adiciona como colaborador no GitHub. Você recebe um e-mail: clique em **Accept invitation**. Sem isso dá para baixar o código, mas não para enviar as mudanças.

## 3. Baixe o projeto

Abra o Terminal (Mac) ou o **Git Bash** (Windows, vem junto com o Git), vá para a pasta onde quer guardar e rode:

```bash
git clone https://github.com/renanlira12-debug/PulseCreator.git
cd PulseCreator
```

Na primeira vez, configure seu nome e e-mail (aparecem nos seus commits):

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

## 4. Rode o sistema

```bash
cd v2
python3 servir.py
```

No Windows, se `python3` não funcionar, use `python servir.py`.

Abra **http://localhost:4190** no navegador. No login, clique em **“Entrar com Google”** e escolha uma conta de exemplo (é demonstração, não usa Google de verdade). Para parar o servidor: `Ctrl + C`.

## 5. Onde fica cada coisa

Tudo o que importa está em `v2/`. Não tem etapa de montagem: salvou, recarregou a página, viu.

| Arquivo | O que tem |
|---|---|
| `v2/index.html` | Login |
| `v2/inicio.html`, `pautas.html`, `clientes.html`, `cliente.html`, `agenda.html`, `social.html`, `ferramentas.html`, `gestao.html` | Telas da agência |
| `v2/portal.html` | Portal do cliente (uma página com seções) |
| `v2/aprovar.html`, `v2/briefing.html` | Links públicos que o cliente abre sem login |
| `v2/assets/app.css` | Todo o visual: cores (no topo, em `:root`), botões, cartões, modo escuro |
| `v2/assets/app.js` | Lateral, topo, busca, notificações, perfil e o editor de pauta |
| `v2/assets/dados.js` | Dados de exemplo (equipe, clientes, pautas, agenda) e as permissões de cada função |

`novo/`, `docs/` e `prototipo/` são versões antigas, só para consulta.

Os dados que você muda testando ficam salvos só no seu navegador. Para zerar: entre como Renan › **Gestão › Configurações › Voltar aos dados de exemplo**.

## 6. Jeito de trabalhar (para um não apagar o trabalho do outro)

Sempre antes de começar, pegue o que os outros enviaram:

```bash
git pull
```

Trabalhe numa **branch** (um galho separado) com o nome do que você está fazendo:

```bash
git checkout -b ajuste-agenda
```

Quando terminar uma parte, salve e envie:

```bash
git add -A
git commit -m "Agenda: mostra feriados em vermelho"
git push -u origin ajuste-agenda
```

Depois, no site do GitHub, aparece o botão **Compare & pull request**. Abra o pull request: o Renan revisa e junta na versão principal (`main`).

Combinem antes quem mexe em qual tela. Se duas pessoas mexem no mesmo arquivo ao mesmo tempo, o Git pede para resolver o conflito na mão.

## Problemas comuns

- **`git push` pede usuário e senha:** a senha é um *token*, não a senha da conta. Crie em https://github.com/settings/tokens/new (marque **repo**) e cole no lugar da senha.
- **A página não mudou depois de editar:** confira se o servidor é o `servir.py` (ele desliga o cache) e recarregue.
- **“Address already in use”:** já tem um servidor rodando. Use outra porta: `python3 servir.py 4191`.
