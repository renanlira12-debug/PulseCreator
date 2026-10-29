#!/usr/bin/env python3
"""Monta as telas do protótipo do Pulse Creator.

Cada tela em fonte/ usa três marcadores, trocados pelo que está em comum/:
  /*BASE*/            estilo comum (cores, vidro, lateral, pílulas, cartões)
  <!--FUNDO-->        aurora e textura
  <!--LATERAL:nome--> lateral da agência, com o item "nome" aceso
  <!--LATERAL:nome:CA--> idem, com o cliente CA aceso dentro da pasta
  <!--PORTAL:aba-->     barra do portal do cliente, com a aba acesa
  <!--SESSAO-->         dados da equipe e papéis (window.PULSE); a lateral e o portal já incluem
  <!--MARCA-->          aplica a marca da agência no portal do cliente
  <!--CONTEUDOS-->      conteúdos do cliente e etapas do fluxo (window.CONTEUDOS)
O resultado vai pra pasta prototipo/, um arquivo por tela, sem dependências.
O login também é gravado como index.html; a lista de telas fica em telas.html.
"""
import re
from pathlib import Path

AQUI = Path(__file__).resolve().parent
COMUM = AQUI / "comum"

base = (COMUM / "base.css").read_text()
fundo = (COMUM / "fundo.html").read_text()
lateral = (COMUM / "lateral.html").read_text()
portal = (COMUM / "portal-topo.html").read_text()
sessao = (COMUM / "sessao.html").read_text()
marca = (COMUM / "marca-portal.html").read_text()
conteudos = (COMUM / "conteudos.html").read_text()


def acende(nome, cliente=None):
    html = lateral.replace(f'data-nav="{nome}"', f'data-nav="{nome}" class="ativo"')
    if cliente:
        html = html.replace(f'class="cli-lat" data-cli="{cliente}"', f'class="cli-lat ativo" data-cli="{cliente}"')
    return html


for tela in sorted((AQUI / "fonte").glob("*.html")):
    html = tela.read_text()
    html = html.replace("/*BASE*/", base).replace("<!--FUNDO-->\n", fundo)
    html = re.sub(r"<!--LATERAL:(\w+)(?::(\w+))?-->\n", lambda m: acende(m.group(1), m.group(2)), html)
    html = re.sub(r"<!--PORTAL:(\w+)-->\n", lambda m: portal.replace(f'data-aba="{m.group(1)}"', f'data-aba="{m.group(1)}" class="ativo"'), html)
    html = html.replace("<!--SESSAO-->\n", sessao)
    html = html.replace("<!--MARCA-->\n", marca)
    html = html.replace("<!--CONTEUDOS-->\n", conteudos)
    (AQUI / tela.name).write_text(html)
    if tela.name == "login.html":
        (AQUI / "index.html").write_text(html)  # o endereço principal abre no login
    print("montado", tela.name)
