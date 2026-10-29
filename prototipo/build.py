#!/usr/bin/env python3
"""Monta o protótipo navegável do Pulso Creator a partir das telas em telas/.

Gera:
  index.html          documento completo, pra rodar local (python3 -m http.server)
  dist/artifact.html  o mesmo conteúdo sem <html>/<head>/<body>, pra publicar como link
"""
import calendar
import datetime
import re
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
TELAS = AQUI / "telas"

VIEWS = [
    ("Main.dc.html", "painel"),
    ("Quadro.dc.html", "quadro"),
    ("Roteiro.dc.html", "roteiro"),
    ("PlanejarIA.dc.html", "ia"),
    ("PortalRelatorio.dc.html", "relatorio"),
    ("PortalPlanejamento.dc.html", "planejamento"),
    ("PortalArquivos.dc.html", "arquivos"),
    ("PortalAgenda.dc.html", "agenda"),
    ("PortalCofre.dc.html", "cofre"),
]
ARQ_PARA_VIEW = dict(VIEWS)
OPACIDADE = {"o1": ".5", "o2": ".44", "o3": ".3"}

# Nomes de pessoas que vieram dos prints do concorrente: troca por nomes fictícios.
NOMES = {"Jordânia": "Bianca", "Calebe": "Tiago", "Amaro": "Davi"}

# Dias da semana corrigidos pro calendário real de 2026.
DATAS = {
    "Quadro.dc.html": {"QUA 08": "QUI 08", "SEX 10": "SÁB 10", "SEG 13": "TER 13", "QUA 01": "QUI 01",
                       ">Todos <span class=\"mono\" style=\"opacity:.8\">6<": ">Todos <span class=\"mono\" style=\"opacity:.8\">4<",
                       ">Estático <span class=\"mono\" style=\"color:var(--fai)\">2<": ">Estático <span class=\"mono\" style=\"color:var(--fai)\">3<",
                       ">Carrossel <span class=\"mono\" style=\"color:var(--fai)\">3<": ">Carrossel <span class=\"mono\" style=\"color:var(--fai)\">1<",
                       ">Vídeo <span class=\"mono\" style=\"color:var(--fai)\">1<": ">Vídeo <span class=\"mono\" style=\"color:var(--fai)\">0<"},
    "Roteiro.dc.html": {"QUA 08": "QUI 08"},
    "PlanejarIA.dc.html": {"seg 03": "ter 03", "qua 05": "qui 05", "sex 07": "sáb 07", "seg 10": "ter 10", "qua 12": "qui 12"},
    "PortalPlanejamento.dc.html": {"SEG 03 NOV": "TER 03 NOV", "QUA 05": "QUI 05", "SEX 07": "SÁB 07", "SEG 10": "TER 10"},
    "PortalRelatorio.dc.html": {"terça, 4 de novembro": "quarta, 4 de novembro"},
    "PortalAgenda.dc.html": {"QUI, 13 NOV": "SEX, 13 NOV", "SEG, 1 DEZ": "TER, 1 DEZ",
                             ">Terça, 4 de novembro<": ">Quarta, 4 de novembro<"},
    "Main.dc.html": {'font-size:20px;font-weight:600">C<': 'font-size:20px;font-weight:600">T<',
                     'font-size:20px;font-weight:600">A<': 'font-size:20px;font-weight:600">D<',
                     '0 0 30px var(--acs)">J<': '0 0 30px var(--acs)">B<'},
}


def bloco(corpo, abertura):
    """Posição de início e fim do elemento cuja tag de abertura é `abertura`."""
    i = corpo.index(abertura)
    tag = re.match(r"<(\w+)", abertura).group(1)
    prof = 1
    for m in re.finditer(rf"<(/?){tag}\b", corpo[i + len(abertura):]):
        prof += -1 if m.group(1) else 1
        if prof == 0:
            fim = i + len(abertura) + m.end()
            return i, corpo.index(">", fim) + 1
    raise ValueError(abertura)


def grupo(corpo, abertura, nome, item_re, ativo_re, valores=None):
    """Marca um grupo de abas: o contêiner ganha data-abas, cada item data-aba."""
    i, f = bloco(corpo, abertura)
    trecho = corpo[i:f]
    cabeca, resto = trecho[:len(abertura)], trecho[len(abertura):]
    cabeca = cabeca[:-1] + f' data-abas="{nome}">'
    n = 0

    def marca(m):
        nonlocal n
        tag = m.group(0)
        extra = " data-aba"
        if valores:
            extra += f' data-valor="{valores[n]}"'
        if re.search(ativo_re, tag):
            extra += " data-ativa"
        if not tag.startswith("<a"):
            extra += ' tabindex="0" role="button"'
        n += 1
        return re.sub(r"^<(\w+)", lambda t: f"<{t.group(1)}{extra}", tag)

    resto = re.sub(item_re, marca, resto)
    if valores and n != len(valores):
        raise ValueError(f"{nome}: achei {n} itens, esperava {len(valores)}")
    return corpo[:i] + cabeca + resto + corpo[f:]


def calendario_novembro():
    ano, mes, marcado, escolhido = 2026, 11, 13, 4
    feriados = {2: "Finados", 15: "Proclamação da República", 20: "Consciência Negra"}
    vazio = '<span class="mono" style="min-height:44px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;color:var(--fai)"{t}>{d}</span>'
    livre = '<a href="#" data-aba data-valor="{d}"{a} class="mono" style="min-height:44px;border-radius:12px;{s};display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:{w}">{d}</a>'
    s_livre = "background:var(--glass2);border:1px solid var(--stroke)"
    s_esc = "background:linear-gradient(140deg,var(--vi),var(--ac));color:#FFF;box-shadow:0 6px 18px var(--acs)"
    html = ['<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px" data-abas="dia">']
    html += ["<span></span>"] * datetime.date(ano, mes, 1).weekday()
    for d in range(1, calendar.monthrange(ano, mes)[1] + 1):
        sem = datetime.date(ano, mes, d).weekday()
        if d == marcado:
            html.append(f'<span class="mono" title="Seu ensaio de fotos" style="min-height:44px;border-radius:12px;background:var(--acs);border:1px solid var(--acb);color:var(--act);display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">{d}</span>')
        elif sem >= 5 or d < 3 or d in feriados:
            t = f' title="{feriados[d]}"' if d in feriados else ""
            html.append(vazio.format(d=d, t=t))
        elif d == escolhido:
            html.append(livre.format(d=d, a=" data-ativa", s=s_esc, w=700))
        else:
            html.append(livre.format(d=d, a="", s=s_livre, w=500))
    html.append("</div>")
    return "\n".join(html)


def converter(arquivo, view):
    html = (TELAS / arquivo).read_text(encoding="utf-8")
    aur = {
        n: (cor, css, OPACIDADE[o])
        for n, cor, css, o in re.findall(r"(aur\d): this\.blob\(t\.(\w+), '([^']*?)opacity:' \+ t\.(o\d)\)", html)
    }
    corpo = html[html.index("</helmet>") + len("</helmet>"):html.index("</x-dc>")]

    for velho, novo in {**NOMES, **DATAS.get(arquivo, {})}.items():
        corpo = corpo.replace(velho, novo)

    corpo = corpo.replace('<div style="{{raiz}}">', '<div class="raiz">', 1)
    for n, (cor, css, op) in aur.items():
        estilo = (f"position:absolute;border-radius:999px;pointer-events:none;"
                  f"background:radial-gradient(circle,var(--{cor}) 0%, transparent 68%);{css}opacity:{op}")
        corpo = corpo.replace(f'style="{{{{{n}}}}}"', f'style="{estilo}"')
    corpo = corpo.replace('<aside style="flex:0 0 272px', '<aside class="lateral" style="flex:0 0 272px')

    abas_linha = '<div style="display:flex;flex-wrap:wrap;gap:3px;border-bottom:1px solid var(--stroke);margin-bottom:18px">'
    seletor = '<span style="display:inline-flex;align-items:center;gap:2px;padding:3px;border-radius:999px;background:var(--glass2);border:1px solid var(--stroke)">'
    if view in ("quadro", "roteiro"):
        corpo = grupo(corpo, abas_linha, "abas", r'<(?:span|a)\b[^>]*?style="padding:11px 16px 13px[^"]*"', r"^<span")
    if view == "quadro":
        corpo = grupo(corpo, '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">', "filtro",
                      r'<(?:span|a)\b[^>]*?style="display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:0 15px;border-radius:999px[^"]*"',
                      r"var\(--acs\)", ["todos", "estatico", "carrossel", "video"])
        corpo = grupo(corpo, seletor, "ordem", r'<(?:span|a)\b[^>]*?style="display:inline-flex;align-items:center;min-height:28px[^"]*"', r"^<span")
    if view == "roteiro":
        corpo = grupo(corpo, '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;align-items:center">', "legenda",
                      r'<(?:span|a)\b[^>]*?style="display:inline-flex;align-items:center;min-height:34px;padding:0 15px;border-radius:999px[^"]*"',
                      r"var\(--acs\)", ["curta", "media", "profunda"])
        corpo = corpo.replace('<p style="font-size:14.5px;line-height:1.6;letter-spacing:-0.01em">Nublado',
                              '<p id="legenda" style="font-size:14.5px;line-height:1.6;letter-spacing:-0.01em">Nublado', 1)
    if view == "ia":
        corpo = grupo(corpo, seletor, "modo", r'<(?:span|a)\b[^>]*?style="display:inline-flex;align-items:center;min-height:30px[^"]*"', r"^<span")
    if view == "agenda":
        corpo = corpo.replace('color:var(--act)">SELECIONADO</span>', 'color:var(--mut)">ONLINE</span>', 1)
        corpo = grupo(corpo, '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(252px,1fr));gap:14px;margin-top:14px">', "tipo",
                      r'<(?:div|a)\b[^>]*?style="(?:display:block;)?background:var\(--glass\);backdrop-filter[^"]*"',
                      r"var\(--acb\)", ["alinhamento", "ensaio", "duvida"])
        i, f = bloco(corpo, '<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px">')
        corpo = corpo[:i] + calendario_novembro() + corpo[f:]
        corpo = grupo(corpo, '<div style="display:flex;flex-direction:column;gap:7px;margin-top:16px">', "hora",
                      r'<(?:span|a)\b[^>]*?class="mono" style="display:flex;align-items:center;justify-content:center;min-height:44px;border-radius:13px[^"]*"',
                      r"^<span", ["09:00", "10:30", "14:00", "15:30", "17:00"])
        corpo = corpo.replace(">Quarta, 4 de novembro<", ' id="dia">Quarta, 4 de novembro<', 1).replace('<h2 style="font-size:14px;font-weight:700;letter-spacing:-0.015em" id="dia">', '<h2 id="dia" style="font-size:14px;font-weight:700;letter-spacing:-0.015em">')
        corpo = corpo.replace('margin-top:4px">ALINHAMENTO MENSAL · 30 MIN<', 'margin-top:4px" id="tipo">ALINHAMENTO MENSAL · 30 MIN<', 1)
        corpo = corpo.replace('<a href="PortalRelatorio.dc.html" style="display:inline-flex;align-items:center;justify-content:center;min-height:46px',
                              '<a href="#" id="marcar" style="display:inline-flex;align-items:center;justify-content:center;min-height:46px', 1)

    def link(m):
        alvo = m.group(1) + ".dc.html"
        return 'href="#" data-acao' if alvo == arquivo else f'href="#{ARQ_PARA_VIEW[alvo]}"'

    corpo = re.sub(r'href="(\w+)\.dc\.html"', link, corpo)
    corpo = re.sub(r'\bid="([^"]+)"', lambda m: f'id="{view}-{m.group(1)}"', corpo)
    corpo = re.sub(r'\bfor="([^"]+)"', lambda m: f'for="{view}-{m.group(1)}"', corpo)
    corpo = re.sub(r"url\(#([\w-]+)\)", lambda m: f"url(#{view}-{m.group(1)})", corpo)
    # Inter é mais estreita que a mono: afrouxa o tracking negativo extremo.
    corpo = re.sub(r"letter-spacing:-0\.0([5-9])\d*em", "letter-spacing:-0.04em", corpo)

    sobra = re.findall(r"\{\{[^}]*\}\}|sc-if|\.dc\.html", corpo)
    if sobra:
        sys.exit(f"{arquivo}: sobrou {sobra[:3]}")
    return f'<section data-view="{view}" hidden>\n{corpo.strip()}\n</section>'


TOKENS = """
  --ink:#F5F3F0; --mut:#A9A49D; --fai:#8A857E;
  --ac:#FF6A1A; --act:#FF9254; --acs:rgba(255,106,26,.14); --acb:rgba(255,106,26,.34);
  --cy:#FFB020; --vi:#C2410C;
  --glass:rgba(255,255,255,.05); --glass2:rgba(255,255,255,.085); --glass3:rgba(255,255,255,.14); --glassLow:rgba(255,255,255,.03);
  --side:rgba(8,8,9,.6); --stroke:rgba(255,255,255,.11); --spec:rgba(255,255,255,.7); --track:rgba(255,255,255,.08);
  --sh:0 2px 10px rgba(0,0,0,.45), 0 24px 60px rgba(0,0,0,.55);
  --glow:inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 0 rgba(255,255,255,.04);
  --fundo:radial-gradient(120% 80% at 55% 0%, #1B120B 0%, #0C0A08 55%, #050505 100%);
"""

CABECA = """<title>Pulso Creator</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
<style>
/* Pulso Creator — só escuro, uma fonte (Inter), vidro sobre aurora preta e laranja. */
:root{color-scheme:dark;%TOKENS%}
*{box-sizing:border-box}
html,body{overflow-x:hidden}
body{margin:0;background:#050505;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-variant-numeric:tabular-nums}
h1,h2,h3,h4{margin:0;letter-spacing:-0.03em;text-wrap:balance}
p{margin:0}
a{color:inherit;text-decoration:none}
a:hover{color:var(--act)}
button{font:inherit;cursor:pointer;color:inherit}
input,textarea{font:inherit;color:inherit}
.mono{font-variant-numeric:tabular-nums}
.ser{font-weight:600;letter-spacing:-0.03em}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
[hidden]{display:none!important}
.raiz{position:relative;min-height:100vh;background:var(--fundo);color:var(--ink);overflow-x:hidden}
[data-aba]{cursor:pointer}
a:focus-visible,button:focus-visible,[tabindex]:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid var(--ac);outline-offset:2px}
input::placeholder,textarea::placeholder{color:var(--fai)}

.demo{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:50;display:flex;align-items:center;gap:2px;padding:4px;border-radius:999px;background:rgba(14,10,8,.78);backdrop-filter:blur(18px) saturate(170%);-webkit-backdrop-filter:blur(18px) saturate(170%);border:1px solid var(--stroke);box-shadow:var(--sh),var(--glow);font-size:12px}
.demo b{padding:0 10px;color:var(--fai);font-size:10.5px;font-weight:700;letter-spacing:.12em}
.demo button{min-height:36px;padding:0 13px;border-radius:999px;border:0;background:transparent;color:var(--mut)}
.demo button[aria-pressed="true"]{background:var(--acs);color:var(--act);box-shadow:inset 0 0 0 1px var(--acb)}
.toast{position:fixed;left:50%;bottom:calc(68px + env(safe-area-inset-bottom,0px));z-index:60;max-width:min(520px,calc(100vw - 32px));padding:12px 18px;border-radius:16px;background:rgba(22,14,9,.9);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid var(--acb);box-shadow:var(--sh),var(--glow);font-size:13px;line-height:1.5;opacity:0;transform:translate(-50%,8px);transition:opacity .2s,transform .2s;pointer-events:none}
.toast.on{opacity:1;transform:translate(-50%,0)}
@media (prefers-reduced-motion:reduce){.toast{transition:none}}

@media (max-width:820px){
  .lateral{flex:1 1 100%!important;min-width:0!important;border-right:0!important;border-bottom:1px solid var(--stroke);padding:14px 16px!important;gap:12px!important}
  .lateral > nav:first-of-type{flex-direction:row!important;overflow-x:auto;gap:6px!important;scrollbar-width:none}
  .lateral > nav:first-of-type > *{flex:0 0 auto}
  .lateral > :not(:first-child):not(nav:first-of-type){display:none!important}
  main{padding-left:16px!important;padding-right:16px!important}
  header > div{padding-left:16px!important;padding-right:16px!important}
}
</style>""".replace("%TOKENS%", TOKENS)

AURORA = """<div style="position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;pointer-events:none">
    <span style="position:absolute;border-radius:999px;background:radial-gradient(circle,var(--vi) 0%, transparent 68%);top:-160px;left:-80px;width:640px;height:620px;filter:blur(100px);opacity:.55"></span>
    <span style="position:absolute;border-radius:999px;background:radial-gradient(circle,var(--ac) 0%, transparent 68%);top:30%;right:-60px;width:620px;height:560px;filter:blur(110px);opacity:.42"></span>
    <span style="position:absolute;border-radius:999px;background:radial-gradient(circle,var(--cy) 0%, transparent 70%);bottom:-200px;left:30%;width:520px;height:520px;filter:blur(110px);opacity:.22"></span>
  </div>"""

LOGIN = """<section data-view="login" hidden>
<div class="raiz" style="display:flex;flex-wrap:wrap;align-items:stretch">
  %AURORA%
  <div style="position:relative;flex:1 1 440px;min-width:0;display:flex;flex-direction:column;justify-content:center;padding:48px max(20px,6vw)">
    <div style="max-width:420px;width:100%">
      <div style="display:flex;align-items:baseline;gap:4px">
        <b style="font-size:22px;font-weight:800;letter-spacing:-0.045em">PULSO</b>
        <span style="width:6px;height:17px;background:linear-gradient(180deg,var(--ac),var(--vi));display:inline-block;transform:skewX(-14deg);border-radius:2px"></span>
        <span style="font-size:22px;font-weight:400;letter-spacing:-0.035em;color:var(--mut)">CREATOR</span>
      </div>
      <h1 style="font-size:clamp(26px,3.4vw,38px);font-weight:700;letter-spacing:-0.04em;line-height:1.1;margin-top:40px">Entre e veja <span style="color:var(--ac)">o mês inteiro</span> num lugar só.</h1>
      <p style="font-size:14px;color:var(--mut);line-height:1.6;margin-top:12px">A agência produz e aprova. O cliente acompanha relatório, arquivos e agenda.</p>

      <form id="login-form" novalidate style="margin-top:28px;display:flex;flex-direction:column;gap:14px">
        <div role="group" aria-label="Como você quer entrar" data-abas="papel" style="display:flex;gap:4px;padding:4px;border-radius:999px;background:var(--glass2);border:1px solid var(--stroke)">
          <button type="button" data-aba data-ativa data-valor="agencia" style="flex:1;min-height:40px;border:0;border-radius:999px;background:var(--acs);box-shadow:inset 0 0 0 1px var(--acb);color:var(--act);font-size:13px;font-weight:600">Sou da agência</button>
          <button type="button" data-aba data-valor="cliente" style="flex:1;min-height:40px;border:0;border-radius:999px;background:transparent;box-shadow:none;color:var(--mut);font-size:13px;font-weight:500">Sou cliente</button>
        </div>
        <label for="login-email" style="display:flex;flex-direction:column;gap:7px;font-size:12px;color:var(--mut)">E-mail
          <input id="login-email" type="email" autocomplete="username" placeholder="voce@agencia.com.br" style="min-height:48px;padding:0 18px;border-radius:14px;border:1px solid var(--stroke);background:var(--glass2);font-size:14px;outline:none;box-shadow:var(--glow)">
        </label>
        <label for="login-senha" style="display:flex;flex-direction:column;gap:7px;font-size:12px;color:var(--mut)">Senha
          <input id="login-senha" type="password" autocomplete="current-password" placeholder="••••••••" style="min-height:48px;padding:0 18px;border-radius:14px;border:1px solid var(--stroke);background:var(--glass2);font-size:14px;outline:none;box-shadow:var(--glow)">
        </label>
        <p id="login-erro" hidden role="alert" style="font-size:12.5px;color:var(--act)">Digite um e-mail, ou entre com a conta de demonstração.</p>
        <button type="submit" style="min-height:50px;border:0;border-radius:999px;background:linear-gradient(140deg,var(--vi),var(--ac));color:#FFF;font-size:14px;font-weight:600;box-shadow:0 10px 28px var(--acs)">Entrar</button>
        <div style="display:flex;align-items:center;gap:12px;color:var(--fai);font-size:12px"><span style="flex:1;height:1px;background:var(--stroke)"></span>ou<span style="flex:1;height:1px;background:var(--stroke)"></span></div>
        <button type="button" id="login-demo" style="min-height:48px;border-radius:999px;background:var(--glass2);border:1px solid var(--stroke);box-shadow:var(--glow);font-size:13.5px;font-weight:500">Entrar com a conta de demonstração</button>
      </form>
      <p style="font-size:12px;color:var(--fai);line-height:1.6;margin-top:22px">Protótipo do Pulso Creator. Qualquer e-mail e senha entram, e nada sai do seu navegador.</p>
    </div>
  </div>

  <div style="position:relative;flex:1 1 420px;min-width:0;padding:20px;display:flex">
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:18px;padding:40px 28px;border-radius:30px;background:var(--glass);backdrop-filter:blur(26px) saturate(180%);-webkit-backdrop-filter:blur(26px) saturate(180%);border:1px solid var(--stroke);box-shadow:var(--sh),var(--glow);position:relative;overflow:hidden;min-height:480px">
      <span style="position:absolute;top:0;left:12%;right:12%;height:1px;background:linear-gradient(90deg,transparent,var(--spec),transparent)"></span>
      <div style="width:100%;max-width:360px;background:var(--glass2);border:1px solid var(--stroke);border-radius:22px;box-shadow:var(--glow);padding:20px 22px">
        <div style="font-size:10.5px;font-weight:700;letter-spacing:.13em;color:var(--ac)">OUTUBRO 2026</div>
        <div style="font-size:20px;font-weight:700;letter-spacing:-0.035em;margin-top:8px">135 demandas <span style="color:var(--mut);font-weight:500">entregues</span></div>
        <span style="height:7px;border-radius:999px;background:var(--track);display:block;position:relative;overflow:hidden;margin-top:14px"><i style="position:absolute;top:0;left:0;bottom:0;width:94%;background:linear-gradient(90deg,var(--cy),var(--ac));border-radius:999px;display:block"></i></span>
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--fai);margin-top:8px"><span>no prazo</span><span style="color:var(--ink);font-weight:600">94%</span></div>
      </div>
      <div style="width:100%;max-width:360px;display:flex;align-items:center;gap:12px;background:var(--glassLow);border:1px solid var(--stroke);border-radius:18px;padding:14px 16px">
        <span style="width:34px;height:34px;border-radius:999px;background:linear-gradient(140deg,var(--vi),var(--ac));display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#FFF">AC</span>
        <div style="flex:1;min-width:0;font-size:13px;line-height:1.45"><b style="font-weight:600">Ana, da Clínica Bem Viver</b> aprovou 4 conteúdos de novembro</div>
      </div>
      <div style="width:100%;max-width:360px;display:flex;align-items:center;gap:12px;background:var(--glassLow);border:1px solid var(--stroke);border-radius:18px;padding:14px 16px">
        <span style="width:34px;height:34px;border-radius:999px;background:var(--acs);border:1px solid var(--acb);display:inline-flex;align-items:center;justify-content:center"><svg width="15" height="15" viewBox="0 0 24 24" fill="var(--ac)" aria-hidden="true"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg></span>
        <div style="flex:1;min-width:0;font-size:13px;line-height:1.45">O plano de novembro ficou pronto: <b style="font-weight:600">12 conteúdos</b></div>
      </div>
    </div>
  </div>
</div>
</section>""".replace("%AURORA%", AURORA)

FIXOS = """<div id="demo" class="demo" hidden aria-label="Modo de teste">
  <b>PROTÓTIPO</b>
  <button type="button" data-papel="agencia" aria-pressed="false">Agência</button>
  <button type="button" data-papel="cliente" aria-pressed="false">Cliente</button>
  <button type="button" data-sair>Sair</button>
</div>
<div id="toast" class="toast" role="status" aria-live="polite"></div>"""

SCRIPT = r"""<script>
(() => {
  const AGENCIA = ['painel', 'quadro', 'roteiro', 'ia'];
  const CLIENTE = ['relatorio', 'planejamento', 'arquivos', 'agenda', 'cofre'];
  const TODAS = AGENCIA.concat(CLIENTE);
  const CHAVE = 'pulso.sessao';
  let memoria = null;
  const ler = () => { try { const v = localStorage.getItem(CHAVE); return v ? JSON.parse(v) : memoria; } catch (e) { return memoria; } };
  const gravar = (s) => { memoria = s; try { s ? localStorage.setItem(CHAVE, JSON.stringify(s)) : localStorage.removeItem(CHAVE); } catch (e) {} };
  let sessao = ler();

  const toast = document.getElementById('toast');
  let tempo;
  const aviso = (txt) => { toast.textContent = txt; toast.classList.add('on'); clearTimeout(tempo); tempo = setTimeout(() => toast.classList.remove('on'), 3000); };

  const demo = document.getElementById('demo');
  const inicio = () => (sessao && sessao.papel === 'cliente' ? 'relatorio' : 'painel');

  function mostrar(v) {
    if (!sessao) v = 'login';
    else if (!TODAS.includes(v)) v = inicio();
    else if (sessao.papel === 'cliente' && AGENCIA.includes(v)) { v = 'relatorio'; aviso('Essa tela é da agência. Como cliente, você vê o portal.'); }
    document.querySelectorAll('[data-view]').forEach((s) => { s.hidden = s.dataset.view !== v; });
    try { history.replaceState(null, '', '#' + v); } catch (e) {}
    window.scrollTo(0, 0);
    demo.hidden = !sessao;
    demo.querySelectorAll('[data-papel]').forEach((b) => b.setAttribute('aria-pressed', String(!!sessao && b.dataset.papel === sessao.papel)));
  }

  // ---- agenda ----
  const agenda = { dia: 4, hora: '14:00', tipo: 'alinhamento' };
  const TIPOS = {
    alinhamento: ['Alinhamento mensal', 'ALINHAMENTO MENSAL · 30 MIN'],
    ensaio: ['Ensaio de fotos', 'ENSAIO DE FOTOS · 3H · PRESENCIAL'],
    duvida: ['Dúvida rápida', 'DÚVIDA RÁPIDA · 15 MIN'],
  };
  const SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const diaTexto = (d) => `${SEMANA[new Date(2026, 10, d).getDay()]}, ${d} de novembro`;

  const LEGENDAS = {
    curta: 'Nublado não é folga do protetor. Separamos os três mitos que mais ouvimos no consultório — e o que fazer no lugar. Salve pra lembrar.',
    media: 'Nublado não é folga do protetor solar. A radiação atravessa as nuvens, a base com FPS não basta sozinha e uma aplicação de manhã não dura o dia todo. Separamos os três mitos que mais ouvimos no consultório e o que fazer no lugar de cada um. Salve pra lembrar na próxima vez que o dia amanhecer fechado.',
    profunda: 'Todo mês alguém chega no consultório dizendo: "mas estava nublado". Por isso juntamos os três mitos que mais ouvimos sobre protetor solar.\n\n1. Dia nublado não protege: os raios UVA atravessam as nuvens e continuam envelhecendo a pele.\n2. Maquiagem com FPS ajuda, mas a quantidade que vai no rosto é bem menor que a do teste do produto.\n3. Passar uma vez não basta: reaplique a cada duas horas, principalmente se suar.\n\nSalve este post e mande pra quem ainda acha que protetor é só pra praia.',
  };

  const ganchos = {
    filtro(valor) {
      let visiveis = 0;
      document.querySelectorAll('[data-view="quadro"] article').forEach((c) => {
        const t = c.textContent.toUpperCase();
        const novo = t.includes('NOVO CONTEÚDO');
        const tipo = t.includes('CARROSSEL') ? 'carrossel' : (t.includes('REEL') || t.includes('VÍDEO')) ? 'video' : 'estatico';
        const mostra = novo || valor === 'todos' || tipo === valor;
        c.hidden = !mostra;
        if (mostra && !novo) visiveis++;
      });
      if (!visiveis) aviso('Nenhum conteúdo nesse formato em outubro.');
    },
    legenda(valor) {
      const p = document.getElementById('roteiro-legenda');
      if (p) { p.textContent = LEGENDAS[valor]; p.style.whiteSpace = 'pre-line'; }
    },
    dia(valor) {
      agenda.dia = +valor;
      const h = document.getElementById('agenda-dia');
      if (h) h.textContent = diaTexto(agenda.dia).replace(/^./, (c) => c.toUpperCase());
    },
    hora(valor) {
      agenda.hora = valor;
      const b = document.getElementById('agenda-marcar');
      if (b) b.textContent = 'Marcar ' + valor;
    },
    tipo(valor) {
      agenda.tipo = valor;
      const p = document.getElementById('agenda-tipo');
      if (p) p.textContent = TIPOS[valor][1];
    },
  };

  function trocarAba(item) {
    const grupo = item.closest('[data-abas]');
    if (!grupo) return;
    const itens = [...grupo.querySelectorAll('[data-aba]')].filter((i) => i.closest('[data-abas]') === grupo);
    const atual = itens.find((i) => i.hasAttribute('data-ativa'));
    if (atual === item) return;
    if (atual) {
      const estilo = atual.getAttribute('style');
      atual.setAttribute('style', item.getAttribute('style'));
      item.setAttribute('style', estilo);
      atual.removeAttribute('data-ativa');
    }
    item.setAttribute('data-ativa', '');
    const g = ganchos[grupo.dataset.abas];
    if (g) g(item.dataset.valor);
  }

  const EM_BREVE = ['Biblioteca', 'Financeiro', 'Equipe', 'Ajuda', 'Nova categoria', 'Configurações', 'Notificações', 'Buscar', 'Redes sociais', 'Recolher o menu lateral', 'Fechar o menu lateral'];
  const RESPOSTAS = [
    [/^Aprovar este conteúdo/, 'Conteúdo aprovado. A agência já foi avisada.'],
    [/^Pedir ajuste/, 'Pedido de ajuste enviado pra agência.'],
    [/^Enviar$/, 'Comentário enviado no trecho marcado.'],
    [/^Sugerir outro texto/, 'Escreva o texto novo no campo e envie.'],
    [/^Aceitar/, 'Sugestão aceita e aplicada no roteiro.'],
    [/^Recusar/, 'Sugestão recusada. O cliente vai ver que você respondeu.'],
    [/^Responder/, 'Resposta enviada pro cliente.'],
    [/^Resolver/, 'Comentário marcado como resolvido.'],
    [/^Aplicar e aprovar/, 'Sugestões aplicadas e conteúdo aprovado.'],
    [/^Baixar em PDF/, 'No protótipo o PDF não é gerado. No sistema, ele baixa aqui.'],
    [/^Baixar|^Baixar tudo/, 'No protótipo os arquivos não baixam. No sistema, o download começa aqui.'],
    [/^Confirmar presença/, 'Presença confirmada.'],
    [/^Trancar agora/, 'Cofre trancado.'],
    [/^Revelar a senha/, 'Pra revelar, o cofre pede a sua senha-mestra. No protótipo as senhas ficam escondidas.'],
    [/^Escolher arquivos|^Enviar material/, 'No protótipo ainda não dá pra enviar arquivos.'],
    [/^Adicionar/, 'Aqui você guarda um novo acesso no cofre.'],
    [/^Tirar/, 'Acesso removido. Vale na hora.'],
    [/anterior|Próximo|próximo/, 'No protótipo os números são de exemplo e o período não muda.'],
    [/entregas/, 'Aqui abre tudo o que a pessoa entregou no período.'],
    [/^Duplicar mês/, 'Mês duplicado como rascunho.'],
    [/^Usar minha própria chave/, 'Aqui você conecta a sua chave de IA.'],
    [/^Desfazer este mês/, 'Os cards do mês foram pra Lixeira.'],
    [/^Ver o registro completo|^Ver o mês inteiro|^Ver tudo|^Abrir tudo/, 'No protótipo essa lista mostra só o resumo.'],
  ];
  const resposta = (rot) => { const r = RESPOSTAS.find(([re]) => re.test(rot)); return r ? r[1] : `"${rot}": ação de demonstração.`; };

  document.addEventListener('click', (e) => {
    const item = e.target.closest('[data-aba]');
    if (item) { e.preventDefault(); trocarAba(item); return; }
    const el = e.target.closest('a, button');
    if (!el || el.closest('#demo') || el.closest('#login-form')) return;
    e.preventDefault();
    if (el.id === 'agenda-marcar') {
      aviso(`Marcado: ${TIPOS[agenda.tipo][0]} na ${diaTexto(agenda.dia)}, às ${agenda.hora}. O convite vai pro seu e-mail.`);
      return;
    }
    const rot = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim();
    if (EM_BREVE.some((x) => rot.startsWith(x))) { aviso(`${rot.replace(/\s*\d+$/, '')}: essa área ainda não está no protótipo.`); return; }
    const href = el.getAttribute('href') || '';
    if (href.length > 1 && href.startsWith('#') && !el.hasAttribute('data-acao')) { mostrar(href.slice(1)); return; }
    aviso(resposta(rot));
  });

  document.addEventListener('keydown', (e) => {
    const item = e.target.closest && e.target.closest('[data-aba][tabindex]');
    if (item && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); trocarAba(item); }
  });

  // ---- login ----
  const form = document.getElementById('login-form');
  const erro = document.getElementById('login-erro');
  const papelEscolhido = () => { const a = form.querySelector('[data-abas="papel"] [data-ativa]'); return a ? a.dataset.valor : 'agencia'; };
  function entrar(nome, papel) {
    sessao = { nome, papel };
    gravar(sessao);
    erro.hidden = true;
    mostrar(inicio());
    aviso(`Olá, ${nome.split(' ')[0]}. ` + (papel === 'cliente' ? 'Esse é o portal da Clínica Bem Viver.' : 'Esse é o painel do Estúdio Linha.'));
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    if (!email) { erro.hidden = false; document.getElementById('login-email').focus(); return; }
    const nome = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Visitante';
    entrar(nome, papelEscolhido());
  });
  document.getElementById('login-demo').addEventListener('click', () => {
    const papel = papelEscolhido();
    entrar(papel === 'cliente' ? 'Ana Costa' : 'Renan Lira', papel);
  });

  demo.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-sair')) { sessao = null; gravar(null); mostrar('login'); return; }
    if (b.dataset.papel && sessao) {
      sessao = { nome: b.dataset.papel === 'cliente' ? 'Ana Costa' : 'Renan Lira', papel: b.dataset.papel };
      gravar(sessao);
      mostrar(inicio());
      aviso(sessao.papel === 'cliente' ? 'Agora você está vendo o portal do cliente.' : 'Agora você está vendo o painel da agência.');
    }
  });

  window.addEventListener('hashchange', () => mostrar(location.hash.slice(1)));
  mostrar(location.hash.slice(1));
})();
</script>"""


def main():
    telas = "\n\n".join(converter(a, v) for a, v in VIEWS)
    corpo = f"{LOGIN}\n\n{telas}\n\n{FIXOS}\n{SCRIPT}\n"
    (AQUI / "index.html").write_text(
        '<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        f"{CABECA}\n</head>\n<body>\n{corpo}</body>\n</html>\n",
        encoding="utf-8",
    )
    (AQUI / "dist").mkdir(exist_ok=True)
    (AQUI / "dist" / "artifact.html").write_text(f"{CABECA}\n{corpo}", encoding="utf-8")
    print("ok:", AQUI / "index.html", f"({len(corpo) // 1024} KB)")


if __name__ == "__main__":
    main()
