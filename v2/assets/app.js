/* Pulse Creator v2 — casca comum: lateral, topo (busca, notificações, nova pauta), tema, perfil,
   editor de pauta e utilidades. Cada tela marca <body data-pag="..." data-area="agencia|portal|publico">. */
(function(){
  var S=DB.S,B=document.body,AREA=B.dataset.area||'agencia',PAG=B.dataset.pag||'';

  /* ---------- tema (antes de tudo, para não piscar) ---------- */
  function tema(){try{return localStorage.getItem('pc2:tema')||'claro'}catch(e){return 'claro'}}
  function aplicaTema(t){document.documentElement.dataset.tema=t}
  aplicaTema(tema());

  /* ---------- ícones ---------- */
  var I={
    casa:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    quadro:'<rect x="3" y="3" width="5" height="16" rx="1.5"/><rect x="10" y="3" width="5" height="10" rx="1.5"/><rect x="17" y="3" width="4" height="6" rx="1.5"/>',
    pasta:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    agenda:'<rect x="3" y="4.5" width="18" height="16.5" rx="3"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18"/><path d="M7.5 13.5h.01M12 13.5h.01M16.5 13.5h.01M7.5 17h.01M12 17h.01" stroke-width="2.6"/>',
    chat:'<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z"/>',
    chave:'<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 1.3-1.3-1.4-1.4L8.6 16.6 6 14l1.3-1.3-1.4-1.4L3 14.2"/><circle cx="16.5" cy="7.5" r="1"/>',
    ferramenta:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    gestao:'<path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/><path d="M3 21h18"/>',
    lua:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    sol:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    sino:'<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    lupa:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    mais:'<path d="M12 5v14M5 12h14"/>',
    seta:'<path d="m9 6 6 6-6 6"/>',
    voltar:'<path d="m15 6-6 6 6 6"/>',
    x:'<path d="M18 6 6 18M6 6l12 12"/>',
    clip:'<path d="m21.4 11.6-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
    doc:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    pin:'<path d="M12 17v5M9 10.8V4h6v6.8l2.5 3.2H6.5z"/>',
    pinOn:'<path d="M12 17v5M9 10.8V4h6v6.8l2.5 3.2H6.5z" fill="currentColor"/>',
    check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    link:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    voz:'<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
    hash:'<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
    cadeado:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4"/>',
    micOff:'<path d="m2 2 20 20M9 9v2a3 3 0 0 0 5.1 2.1M15 9.3V5a3 3 0 0 0-5.9-.7M19 10v1a7 7 0 0 1-.9 3.4M5 10v1a7 7 0 0 0 11.3 5.6M12 18v4"/>',
    sair:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    camera:'<path d="M3 8a2 2 0 0 1 2-2h2l2-3h6l2 3h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>',
    olho:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    copiar:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    lixo:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    raio:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    baixar:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    subir:'<path d="M12 21V9M7 14l5-5 5 5M5 3h14"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    externo:'<path d="M7 17 17 7M9 7h8v8"/>',
    relogio:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    local:'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    grafico:'<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-7"/>',
    imagem:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    enviar:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    pedido:'<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 13h6M9 17h4"/>',
    estrela:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'
  };
  function ico(n,t,extra){return '<svg width="'+(t||20)+'" height="'+(t||20)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'+(extra||'')+'>'+(I[n]||'')+'</svg>'}

  /* ---------- utilidades ---------- */
  function esc(t){return String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function $(s,r){return (r||document).querySelector(s)}
  function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
  var MESES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  var MES3=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  var SEMANA=['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  function dt(iso){var p=String(iso).slice(0,10).split('-');return new Date(+p[0],+p[1]-1,+p[2])}
  function iso(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  function dataCurta(s){var d=dt(s);return d.getDate()+' '+MES3[d.getMonth()]}
  function dataLonga(s){var d=dt(s);return d.getDate()+' de '+MESES[d.getMonth()]+' de '+d.getFullYear()}
  function diasAte(s){return Math.round((dt(s)-dt(DB.hoje()))/864e5)}
  function quando(s){var d=new Date(s),m=Math.round((Date.now()-d)/6e4);if(m<1)return 'agora';if(m<60)return 'há '+m+' min';var h=Math.round(m/60);if(h<24)return 'há '+h+' h';var dd=Math.round(h/24);if(dd===1)return 'ontem';if(dd<7)return 'há '+dd+' dias';return d.getDate()+' '+MES3[d.getMonth()]}
  function hora(s){var d=new Date(s);return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}
  function reais(v){return 'R$ '+Number(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}
  function iniciais(n){var p=String(n||'?').trim().split(/\s+/);return ((p[0]||'')[0]+(p.length>1?p[p.length-1][0]:'')).toUpperCase()}
  function av(p,cls){if(!p)return '';if(p==='cliente'||p.ehCliente)return '<span class="av '+(cls||'')+'" style="--c:#8C857B" title="Cliente">'+ico('estrela',14)+'</span>';
    return '<span class="av '+(cls||'')+'" style="--c:'+(p.cor||'#7A5C1E')+(p.foto?';background-image:url('+p.foto+')':'')+'" title="'+esc(p.nome)+'">'+(p.foto?'':iniciais(p.nome))+'</span>'}
  function avCli(c,cls){return c?'<span class="av '+(cls||'')+'" style="--c:'+c.cor+(c.logo?';background-image:url('+c.logo+')':'')+'">'+(c.logo?'':esc(c.ini))+'</span>':''}
  function nivelHTML(n){var t={leve:'Leve',media:'Média',alta:'Alta'}[n]||n;return '<span class="nivel '+n+'"><i><b></b><b></b><b></b></i>'+t+'</span>'}
  var tAviso;function aviso(m){var a=$('.aviso');if(!a){a=document.createElement('div');a.className='aviso';a.setAttribute('role','status');document.body.appendChild(a)}a.textContent=m;a.classList.add('on');clearTimeout(tAviso);tAviso=setTimeout(function(){a.classList.remove('on')},2800)}
  function modal(html,o){o=o||{};var v=document.createElement('div');v.className='veu';v.innerHTML='<div class="modal '+(o.cls||'')+'" role="dialog" aria-modal="true">'+(o.fixo?'':'<button class="fechar" aria-label="Fechar">'+ico('x',18)+'</button>')+html+'</div>';document.body.appendChild(v);
    function fecha(){if(!v.parentNode)return;v.remove();document.removeEventListener('keydown',tecla);if(o.aoFechar)o.aoFechar()}
    function tecla(e){if(e.key==='Escape'&&!o.fixo)fecha()}
    if(!o.fixo){v.addEventListener('mousedown',function(e){if(e.target===v)fecha()});$('.fechar',v).addEventListener('click',fecha)}
    document.addEventListener('keydown',tecla);var f=$('input:not([type=hidden]):not([disabled]),textarea,select',v);if(f&&!o.semFoco)setTimeout(function(){f.focus()},60);
    return {el:v,fecha:fecha}}
  function copiar(t,msg){(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){aviso(msg||'Copiado')},function(){aviso(t)})}

  window.UI={ico:ico,esc:esc,$:$,$$:$$,MESES:MESES,MES3:MES3,SEMANA:SEMANA,dt:dt,iso:iso,dataCurta:dataCurta,dataLonga:dataLonga,diasAte:diasAte,quando:quando,hora:hora,reais:reais,iniciais:iniciais,av:av,avCli:avCli,nivelHTML:nivelHTML,aviso:aviso,modal:modal,copiar:copiar};

  /* ---------- quem está logado ---------- */
  var EU=DB.eu();
  if(AREA!=='publico'){
    if(!EU){location.replace('index.html');return}
    if(AREA==='agencia'&&EU.ehCliente){location.replace('portal.html');return}
    if(AREA==='portal'&&!EU.ehCliente&&!new URLSearchParams(location.search).get('c')){location.replace('inicio.html');return}
    if(B.dataset.exige&&!DB.pode(EU,B.dataset.exige)){location.replace('inicio.html');return}
  }
  UI.eu=EU;

  /* ---------- pautas visíveis e fixados ---------- */
  function pautasVisiveis(){if(!EU||EU.ehCliente)return [];var ids=DB.meusClientes(EU).map(function(c){return c.id});return S.pautas.filter(function(p){return ids.indexOf(p.cliente)>=0})}
  function minhasAbertas(){return pautasVisiveis().filter(function(p){return p.resp.indexOf(EU.id)>=0&&p.coluna!=='publicado'})}
  function fixos(){var k='pc2:fixos:'+(EU&&EU.id);try{var v=localStorage.getItem(k);if(v)return JSON.parse(v)}catch(e){}return S.clientes.filter(function(c){return c.fixo}).map(function(c){return c.id})}
  function alternaFixo(id){var f=fixos(),i=f.indexOf(id);if(i>=0)f.splice(i,1);else f.push(id);try{localStorage.setItem('pc2:fixos:'+EU.id,JSON.stringify(f))}catch(e){}desenhaFixos();return i<0}
  UI.pautasVisiveis=pautasVisiveis;UI.minhasAbertas=minhasAbertas;UI.fixos=fixos;UI.alternaFixo=alternaFixo;

  /* ---------- lateral ---------- */
  function navItens(){
    if(EU.ehCliente)return [['inicio','Início','casa','portal.html#inicio'],['aprovar','Aprovações','check','portal.html#aprovar'],['pedidos','Pedidos','pedido','portal.html#pedidos'],['mensagens','Mensagens','chat','portal.html#mensagens'],['agenda','Agenda','agenda','portal.html#agenda'],['arquivos','Arquivos','pasta','portal.html#arquivos'],['relatorios','Relatórios','grafico','portal.html#relatorios']];
    var n=[['inicio','Início','casa','inicio.html'],['pautas','Pautas','quadro','pautas.html'],['clientes','Clientes','pasta','clientes.html'],['agenda','Agenda','agenda','agenda.html'],['social','Social','chat','social.html'],['ferramentas','Ferramentas','ferramenta','ferramentas.html']];
    if(DB.pode(EU,'gestao'))n.push(['gestao','Gestão','gestao','gestao.html']);
    return n}
  function desenhaLateral(){
    var lat=$('#lat');if(!lat)return;
    var minhas=EU.ehCliente?0:minhasAbertas().length,pend=EU.ehCliente?S.pautas.filter(function(p){return p.cliente===EU.cliente&&p.coluna==='cliente'&&!p.aprovacao}).length:0;
    var sec=EU.ehCliente?(location.hash.slice(1)||'inicio'):PAG;
    var sub=EU.ehCliente?(EU.c.nome):(EU.papel==='admin'?'Admin':'Colaborador')+' · '+esc(EU.cargo||DB.FUNCOES[EU.funcao].n);
    lat.innerHTML='<div class="marca"><span class="logo">'+ico('raio',19,' stroke="#fff" fill="#fff"')+'</span><b>pulse<span>.</span>creator</b><button class="btn-lua" data-tema title="Mudar tema" aria-label="Mudar tema">'+ico(tema()==='escuro'?'sol':'lua',20)+'</button></div>'+
      '<nav class="nav">'+navItens().map(function(n){var c=n[0]==='pautas'?'<span class="cont">'+minhas+'</span>':(n[0]==='aprovar'&&pend?'<span class="cont quente">'+pend+'</span>':'');return '<a href="'+n[3]+'" data-sec="'+n[0]+'" class="'+(n[0]===sec?'ativo':'')+'">'+ico(n[2],22)+n[1]+c+'</a>'}).join('')+'</nav>'+
      (EU.ehCliente?'<div style="flex:1"></div>':'<div class="div"></div><h4>Clientes fixados</h4><label class="busca-lat">'+ico('lupa',18)+'<input placeholder="Buscar cliente" data-busca-fix aria-label="Buscar cliente"></label><div class="fixados" data-fixados></div>')+
      '<button class="eu" data-perfil>'+(EU.ehCliente?avCli(EU.c,''):av(EU,''))+'<span><b>'+esc(EU.ehCliente?EU.nome:DB.primeiroNome(EU))+'</b><small>'+sub+'</small></span>'+ico('seta',18)+'</button>';
    $('[data-tema]',lat).addEventListener('click',function(){var t=tema()==='escuro'?'claro':'escuro';try{localStorage.setItem('pc2:tema',t)}catch(e){}aplicaTema(t);this.innerHTML=ico(t==='escuro'?'sol':'lua',20)});
    $('[data-perfil]',lat).addEventListener('click',function(){EU.ehCliente?perfilCliente():perfil(false)});
    var bf=$('[data-busca-fix]',lat);if(bf)bf.addEventListener('input',desenhaFixos);
    if(EU.ehCliente)$$('.nav a',lat).forEach(function(a){a.addEventListener('click',function(){$$('.nav a',lat).forEach(function(x){x.classList.toggle('ativo',x===a)});lat.classList.remove('aberta')})});
    desenhaFixos();
  }
  function desenhaFixos(){var box=$('[data-fixados]');if(!box)return;var q=($('[data-busca-fix]').value||'').toLowerCase().trim(),mc=DB.meusClientes(EU),f=fixos();
    var lista=q?mc.filter(function(c){return c.nome.toLowerCase().indexOf(q)>=0}):mc.filter(function(c){return f.indexOf(c.id)>=0});
    box.innerHTML=lista.length?lista.map(function(c){return '<a href="cliente.html?c='+c.id+'">'+avCli(c,'p')+esc(c.nome)+'</a>'}).join(''):'<div class="vazio">'+(q?'Nenhum cliente com esse nome.':'Fixe clientes na tela Clientes.')+'</div>'}
  UI.desenhaLateral=desenhaLateral;

  /* ---------- topo: busca, sino, botão principal ---------- */
  function desenhaTopo(){
    var box=$('[data-acoes]');if(!box)return;
    var botao=B.dataset.botao==='nova-pauta'&&DB.pode(EU,'criar_pauta')?'<button class="btn pri" data-nova-pauta>'+ico('mais',20)+'Nova pauta</button>':'';
    box.innerHTML='<button class="redondo menu-mob" data-menu aria-label="Abrir menu">'+ico('menu',20)+'</button>'+
      (EU.ehCliente?'':'<div class="busca">'+ico('lupa',20)+'<input placeholder="Buscar pauta, cliente ou pessoa" data-busca aria-label="Buscar"><div class="res-busca" data-res hidden></div></div>')+
      '<div style="position:relative"><button class="redondo" data-sino aria-label="Notificações">'+ico('sino',21)+'<span class="bolinha" hidden></span></button><div class="pop" data-pop hidden></div></div>'+box.innerHTML+botao;
    $('[data-menu]',box).addEventListener('click',function(e){e.stopPropagation();$('#lat').classList.add('aberta')});
    document.addEventListener('click',function(e){var l=$('#lat');if(l&&l.classList.contains('aberta')&&!l.contains(e.target))l.classList.remove('aberta')});
    var nb=$('[data-nova-pauta]',box);if(nb)nb.addEventListener('click',function(){novaPauta()});
    var bu=$('[data-busca]',box);if(bu)busca(bu);
    sino();
  }
  function busca(inp){var res=$('[data-res]'),sel=0,itens=[];
    function desenha(){var q=inp.value.toLowerCase().trim();if(!q){res.hidden=true;return}
      var ps=pautasVisiveis().filter(function(p){return p.titulo.toLowerCase().indexOf(q)>=0}).slice(0,6),cs=DB.meusClientes(EU).filter(function(c){return (c.nome+' '+c.seg).toLowerCase().indexOf(q)>=0}).slice(0,5),pe=S.equipe.filter(function(p){return (p.nome+' '+p.cargo).toLowerCase().indexOf(q)>=0}).slice(0,4);
      itens=[];var h='';
      if(ps.length){h+='<h6>Pautas</h6>'+ps.map(function(p){itens.push('#p'+p.id);return '<a href="#p'+p.id+'" data-i="'+(itens.length-1)+'">'+avCli(DB.cliente(p.cliente),'p')+esc(p.titulo)+'<small>'+esc(DB.coluna(p.coluna).n)+'</small></a>'}).join('')}
      if(cs.length){h+='<h6>Clientes</h6>'+cs.map(function(c){itens.push('cliente.html?c='+c.id);return '<a href="cliente.html?c='+c.id+'" data-i="'+(itens.length-1)+'">'+avCli(c,'p')+esc(c.nome)+'<small>'+esc(c.seg)+'</small></a>'}).join('')}
      if(pe.length){h+='<h6>Pessoas</h6>'+pe.map(function(p){itens.push('pessoa:'+p.id);return '<a href="#" data-pessoa="'+p.id+'" data-i="'+(itens.length-1)+'">'+av(p,'p')+esc(p.nome)+'<small>'+esc(p.cargo)+'</small></a>'}).join('')}
      res.innerHTML=h||'<div class="nada">Nada encontrado para “'+esc(inp.value)+'”.</div>';res.hidden=false;sel=0;marca();
      $$('[data-pessoa]',res).forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();res.hidden=true;verPessoa(a.dataset.pessoa)})});
      $$('a[href^="#p"]',res).forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();res.hidden=true;inp.value='';abrePauta(+a.getAttribute('href').slice(2))})})}
    function marca(){$$('a',res).forEach(function(a){a.classList.toggle('sel',+a.dataset.i===sel)})}
    inp.addEventListener('input',desenha);inp.addEventListener('focus',desenha);
    inp.addEventListener('keydown',function(e){if(res.hidden)return;if(e.key==='ArrowDown'){sel=Math.min(itens.length-1,sel+1);marca();e.preventDefault()}else if(e.key==='ArrowUp'){sel=Math.max(0,sel-1);marca();e.preventDefault()}else if(e.key==='Enter'&&itens[sel]){var a=$('a[data-i="'+sel+'"]',res);if(a)a.click();else location.href=itens[sel]}else if(e.key==='Escape'){res.hidden=true}});
    document.addEventListener('click',function(e){if(!inp.parentNode.contains(e.target))res.hidden=true})}
  function minhasNotifs(){var cli=EU.ehCliente;return S.notifs.filter(function(n){return cli?n.cliente===EU.cliente:(!n.cliente&&(!n.para||n.para===EU.id))})}
  function sino(){var b=$('[data-sino]'),pop=$('[data-pop]');if(!b)return;function ponto(){$('.bolinha',b).hidden=!minhasNotifs().some(function(n){return n.nova})}ponto();
    b.addEventListener('click',function(e){e.stopPropagation();if(!pop.hidden){pop.hidden=true;return}var L=minhasNotifs().sort(function(a,b){return new Date(b.quando)-new Date(a.quando)});
      pop.innerHTML='<h5>Notificações</h5>'+(L.length?L.map(function(n){return '<a class="notif'+(n.nova?' nova':'')+'" href="'+(n.link||'#')+'"><span>'+n.txt+'<small>'+quando(n.quando)+'</small></span></a>'}).join(''):'<div class="vazio-c">Nada novo por aqui.</div>');pop.hidden=false;
      $$('a',pop).forEach(function(a){a.addEventListener('click',function(e){var h=a.getAttribute('href');var m=h.match(/^pautas\.html#p(\d+)$/);if(m&&PAG!=='pautas'){return}if(m){e.preventDefault();pop.hidden=true;abrePauta(+m[1])}})});
      L.forEach(function(n){n.nova=false});DB.salva('notifs');ponto()});
    document.addEventListener('click',function(e){if(!pop.hidden&&!pop.contains(e.target))pop.hidden=true})}
  function notifica(n){n.id=DB.novoId(S.notifs);n.quando=DB.agora();n.nova=true;S.notifs.push(n);DB.salva('notifs')}
  UI.notifica=notifica;

  /* ---------- perfil e primeiro acesso ---------- */
  function perfil(primeiro){
    var p=EU,adm=EU.papel==='admin';
    var m=modal('<div class="olho">'+(primeiro?'Primeiro acesso':'Seu perfil')+'</div><h2>'+(primeiro?'Complete seu perfil':'Seu perfil')+'</h2><p class="desc">'+(primeiro?'Preencha para começar a usar o sistema. Nome e data de nascimento são obrigatórios.':'O que a equipe vê sobre você.')+'</p>'+
      '<div style="display:flex;align-items:center;gap:16px;margin-bottom:24px"><span data-av-prev>'+av(p,'g')+'</span><label class="btn" style="cursor:pointer">'+ico('camera',18)+'Trocar foto<input type="file" accept="image/*" hidden data-foto></label></div>'+
      '<label class="campo"><span>Nome</span><input class="ent" data-f="nome" value="'+esc(p.nome)+'" required></label>'+
      '<label class="campo"><span>Cargo</span><input class="ent" data-f="cargo" value="'+esc(p.cargo)+'"'+(adm?'':' disabled')+'>'+(adm?'':'<small>Só admins mudam o cargo, em Gestão › Equipe.</small>')+'</label>'+
      '<label class="campo"><span>Data de nascimento</span><input class="ent" type="date" data-f="nasc" value="'+esc(p.nasc||'')+'" required><small>Na agenda de Aniversários, a equipe vê só o dia e o mês.</small></label>'+
      '<label class="campo"><span>Chave Pix (opcional)</span><input class="ent" data-f="pix" value="'+esc(p.pix||'')+'" autocomplete="off"><small>Usada nos seus pagamentos. Só você e os admins veem.</small></label>'+
      '<label class="campo"><span>Descrição (opcional)</span><textarea class="ent" data-f="desc" rows="3" placeholder="No que você trabalha, o que curte fazer…">'+esc(p.desc||'')+'</textarea></label>'+
      '<div class="pe">'+(primeiro?'':'<button class="btn fant" data-sair style="margin-right:auto">'+ico('sair',18)+'Sair</button>')+'<button class="btn pri p" data-salvar>'+(primeiro?'Começar a usar':'Salvar')+'</button></div>',{fixo:primeiro});
    var foto=p.foto;
    $('[data-foto]',m.el).addEventListener('change',function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){var img=new Image();img.onload=function(){var c=document.createElement('canvas'),t=160;c.width=c.height=t;var x=c.getContext('2d'),s=Math.min(img.width,img.height);x.drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,t,t);foto=c.toDataURL('image/jpeg',.82);$('[data-av-prev]',m.el).innerHTML=av({nome:p.nome,cor:p.cor,foto:foto},'g')};img.src=r.result};r.readAsDataURL(f)});
    var sa=$('[data-sair]',m.el);if(sa)sa.addEventListener('click',function(){DB.sair();location.href='index.html'});
    $('[data-salvar]',m.el).addEventListener('click',function(){var v={};$$('[data-f]',m.el).forEach(function(i){v[i.dataset.f]=i.value.trim()});
      if(!v.nome){aviso('Preencha o nome');return}if(!v.nasc){aviso('Preencha a data de nascimento');return}
      p.nome=v.nome;if(adm)p.cargo=v.cargo;p.nasc=v.nasc;p.pix=v.pix;p.desc=v.desc;p.foto=foto;p.perfilOk=true;DB.salva('equipe');m.fecha();desenhaLateral();aviso(primeiro?'Tudo pronto, '+DB.primeiroNome(p)+'!':'Perfil salvo');if(primeiro&&window.aoCompletarPerfil)window.aoCompletarPerfil()});
  }
  function perfilCliente(){var c=EU.c;var m=modal('<div class="olho">Portal do cliente</div><h2>'+esc(c.nome)+'</h2><p class="desc">Você entrou como '+esc(c.contato)+'.</p><div class="pe"><button class="btn fant" data-sair style="margin-right:auto">'+ico('sair',18)+'Sair</button><button class="btn" data-ok>Fechar</button></div>');
    $('[data-sair]',m.el).addEventListener('click',function(){DB.sair();location.href='index.html'});$('[data-ok]',m.el).addEventListener('click',m.fecha)}
  function verPessoa(id){var p=DB.pessoa(id);if(!p)return;var ver=EU.papel==='admin'||EU.id===p.id,d=p.nasc?dt(p.nasc):null;
    modal('<div style="display:flex;align-items:center;gap:18px;margin-bottom:18px">'+av(p,'g')+'<div><h2 style="margin:0;font-size:28px">'+esc(p.nome)+'</h2><div class="olho">'+esc(p.cargo)+' · '+(p.papel==='admin'?'Admin':'Colaborador')+'</div></div></div>'+
      (p.desc?'<p class="desc">'+esc(p.desc)+'</p>':'')+
      '<div class="tab-info" style="display:grid;gap:12px;font-size:15px">'+(d?'<div>'+ico('estrela',16)+' Aniversário: <b>'+d.getDate()+' de '+MESES[d.getMonth()]+'</b></div>':'')+'<div>'+ico('chat',16)+' '+esc(p.email)+'</div>'+(ver&&p.pix?'<div>'+ico('chave',16)+' Pix: <b>'+esc(p.pix)+'</b></div>':'')+
      '<div>'+ico('pasta',16)+' Clientes: '+(p.clientes==='todos'?'todos':p.clientes.map(function(c){var x=DB.cliente(c);return x?esc(x.nome):''}).filter(Boolean).join(', '))+'</div></div>')}
  UI.perfil=perfil;UI.verPessoa=verPessoa;

  /* ---------- editor de pauta ---------- */
  function realca(t){return esc(t).replace(/@([A-Za-zÀ-ú]+)/g,'<b style="color:var(--laranja-tinta)">@$1</b>').replace(/\n/g,'<br>')}
  function abrePauta(id,aoMudar){
    var pt=DB.pauta(id);if(!pt){aviso('Essa pauta não existe mais');return}
    var c=DB.cliente(pt.cliente),PO=function(a){return DB.pode(EU,a)};
    var m=modal('<div class="ed" style="display:grid;grid-template-columns:minmax(0,1fr) 340px;min-height:540px"><div class="ed-esq" style="padding:40px 40px 30px"></div><div class="ed-dir" style="padding:40px 28px 30px;background:var(--cartao-2);border-left:1px solid var(--linha);border-radius:0 32px 32px 0"></div></div>',{cls:'l',semFoco:true,aoFechar:function(){if(location.hash==='#p'+id)history.replaceState(null,'',location.pathname+location.search);if(aoMudar)aoMudar();if(window.aoMudarPautas)window.aoMudarPautas()}});
    history.replaceState(null,'',location.pathname+location.search+'#p'+id);
    function salva(campo,v,txt){if(pt[campo]===v)return;pt[campo]=v;DB.log(pt,{t:'editou',campo:txt||campo,quem:EU.id});aviso('Salvo');dir()}
    function esq(){var e=$('.ed-esq',m.el);
      e.innerHTML='<a class="olho" href="cliente.html?c='+c.id+'" style="display:inline-flex;align-items:center;gap:8px">'+avCli(c,'p')+esc(c.nome)+'</a>'+
        (PO('editar_copy')?'<textarea class="ent ed-tit" rows="1" style="margin:12px 0 20px;font-family:var(--titulo);font-weight:600;font-size:26px;letter-spacing:-.04em;line-height:1.2;border:0;padding:4px 0;background:none;min-height:0;resize:none;box-shadow:none" data-tit>'+esc(pt.titulo)+'</textarea>':'<h2 style="margin:12px 0 20px;font-size:26px">'+esc(pt.titulo)+'</h2>')+
        '<div class="campo"><span style="display:flex;justify-content:space-between">Copy e legenda'+(PO('editar_copy')?'':'<em style="font-style:normal">só social media edita</em>')+'</span><textarea class="ent" rows="6" data-copy'+(PO('editar_copy')?'':' disabled')+'>'+esc(pt.copy)+'</textarea></div>'+
        '<div class="campo"><span>Arquivos ('+pt.anexos+')</span><div style="display:flex;gap:10px;flex-wrap:wrap">'+Array.apply(null,{length:pt.anexos}).map(function(_,i){return '<span style="width:84px;height:84px;border-radius:16px;display:grid;place-items:center;font-size:11px;font-weight:800;text-transform:uppercase;text-align:center;line-height:1.1;padding:6px;color:#F6EFE8;background:linear-gradient(150deg,'+c.cor+',#141110)">'+esc(c.ini)+'<br>'+(i+1)+'</span>'}).join('')+'<label style="width:84px;height:84px;border-radius:16px;display:grid;place-items:center;border:1.5px dashed var(--linha-2);color:var(--tinta-3);cursor:pointer" title="Anexar">'+ico('subir',22)+'<input type="file" hidden multiple data-anexo></label></div></div>'+
        '<div class="campo" style="margin-bottom:0"><span>Comentários</span><div data-coments style="display:flex;flex-direction:column;gap:14px;margin-bottom:14px"></div><div style="display:flex;gap:10px"><input class="ent p" data-novo-com placeholder="Escreva. Use @ para marcar alguém"><button class="btn p escuro" data-env-com aria-label="Enviar">'+ico('enviar',17)+'</button></div></div>';
      var ti=$('[data-tit]',e);if(ti){var aj=function(){ti.style.height='auto';ti.style.height=ti.scrollHeight+'px'};setTimeout(aj,0);ti.addEventListener('input',aj);ti.addEventListener('change',function(){var v=ti.value.trim();if(v)salva('titulo',v,'título')})}
      var cp=$('[data-copy]',e);if(cp)cp.addEventListener('change',function(){salva('copy',cp.value,'copy')});
      $('[data-anexo]',e).addEventListener('change',function(){var n=this.files.length;if(!n)return;pt.anexos+=n;DB.log(pt,{t:'anexou',n:n,quem:EU.id});aviso(n+' arquivo'+(n>1?'s':'')+' anexado'+(n>1?'s':''));esq();dir()});
      coments();
      var ni=$('[data-novo-com]',e);function envia(){var t=ni.value.trim();if(!t)return;pt.coment.push({quem:EU.id,txt:t,quando:DB.agora()});DB.salva('pautas');
        (t.match(/@([A-Za-zÀ-ú]+)/g)||[]).forEach(function(mn){var p=S.equipe.filter(function(x){return DB.primeiroNome(x).toLowerCase()===mn.slice(1).toLowerCase()})[0];if(p&&p.id!==EU.id)notifica({txt:'<b>'+esc(DB.primeiroNome(EU))+'</b> te marcou em <b>'+esc(pt.titulo)+'</b>',link:'pautas.html#p'+pt.id,para:p.id})});
        ni.value='';coments()}
      $('[data-env-com]',e).addEventListener('click',envia);ni.addEventListener('keydown',function(ev){if(ev.key==='Enter')envia()})}
    function coments(){var box=$('[data-coments]',m.el);box.innerHTML=pt.coment.length?pt.coment.map(function(k){var p=k.quem==='cliente'?'cliente':DB.pessoa(k.quem);return '<div style="display:flex;gap:12px">'+av(p,'p')+'<div style="flex:1;min-width:0"><div style="font-size:13px;color:var(--tinta-3)"><b style="color:var(--tinta)">'+(k.quem==='cliente'?esc(c.contato)+' · cliente':esc(p?DB.primeiroNome(p):'?'))+'</b> · '+quando(k.quando)+'</div><div style="margin-top:3px;font-size:14.5px;'+(k.quem==='cliente'?'padding:10px 14px;border-radius:14px;background:var(--laranja-suave)':'')+'">'+realca(k.txt)+'</div></div></div>'}).join(''):'<div style="font-size:14px;color:var(--tinta-3)">Nenhum comentário ainda.</div>'}
    function dir(){var d=$('.ed-dir',m.el);
      var cols=S.colunas.map(function(k){var ok=k.k===pt.coluna||DB.podeMover(EU,k.k);return '<option value="'+k.k+'"'+(k.k===pt.coluna?' selected':'')+(ok?'':' disabled')+'>'+esc(k.n)+(ok?'':' · sem permissão')+'</option>'}).join('');
      var pessoas=S.equipe.filter(function(p){return p.clientes==='todos'||p.clientes.indexOf(pt.cliente)>=0||pt.resp.indexOf(p.id)>=0});
      d.innerHTML='<label class="campo"><span>Status</span><select class="ent p" data-col>'+cols+'</select></label>'+
        '<div class="campo"><span>Responsáveis</span><div style="display:flex;flex-wrap:wrap;gap:6px">'+pessoas.map(function(p){var on=pt.resp.indexOf(p.id)>=0;return '<button class="chip p" data-resp="'+p.id+'" aria-pressed="'+on+'"'+(PO('atribuir')?'':' disabled')+' style="padding-left:5px;gap:7px">'+av(p,'p')+DB.primeiroNome(p)+'</button>'}).join('')+'</div></div>'+
        '<div class="linha2" style="gap:10px"><label class="campo"><span>Prazo</span><input type="date" class="ent p" data-prazo value="'+pt.prazo+'"'+(PO('editar_prazo')?'':' disabled')+'></label><label class="campo"><span>Formato</span><select class="ent p" data-formato'+(PO('editar_copy')?'':' disabled')+'>'+DB.FORMATOS.map(function(f){return '<option'+(f===pt.formato?' selected':'')+'>'+f+'</option>'}).join('')+'</select></label></div>'+
        '<label class="campo"><span>Nível da demanda</span><select class="ent p" data-nivel'+(PO('editar_prazo')?'':' disabled')+'><option value="leve"'+(pt.nivel==='leve'?' selected':'')+'>Leve</option><option value="media"'+(pt.nivel==='media'?' selected':'')+'>Média</option><option value="alta"'+(pt.nivel==='alta'?' selected':'')+'>Alta</option></select></label>'+
        '<div class="campo" style="display:flex;align-items:center;gap:12px"><span style="flex:1;margin:0">Cliente vê no portal</span><button class="troca" role="switch" aria-checked="'+!!pt.visivelCliente+'" data-vis'+(PO('mover_tudo')?'':' disabled')+' aria-label="Cliente vê no portal"></button></div>'+
        (pt.aprovacao?'<div class="selo '+(pt.aprovacao==='aprovado'?'verde':'laranja')+'" style="margin-bottom:16px">'+(pt.aprovacao==='aprovado'?'Aprovado pelo cliente':'Cliente pediu ajuste')+'</div>':'')+
        '<div class="campo" style="margin-bottom:0"><span>Histórico</span><div style="display:flex;flex-direction:column;gap:9px;font-size:13px;color:var(--tinta-2);max-height:190px;overflow:auto">'+pt.log.slice().reverse().map(function(l){var p=l.quem==='cliente'?{nome:c.contato}:DB.pessoa(l.quem);var n='<b style="color:var(--tinta)">'+esc(p?DB.primeiroNome(p):'?')+'</b>';var t=l.t==='criou'?n+' criou a pauta':l.t==='moveu'?n+' moveu para <b style="color:var(--tinta)">'+esc(DB.coluna(l.para).n)+'</b>':l.t==='anexou'?n+' anexou '+l.n+' arquivo'+(l.n>1?'s':''):l.t==='aprovou'?n+' aprovou':l.t==='ajuste'?n+' pediu ajuste':n+' editou '+esc(l.campo||'');var d=new Date(l.quando);return '<div>'+t+'<br><span style="color:var(--tinta-3)">'+d.getDate()+' '+MES3[d.getMonth()]+', '+hora(l.quando)+'</span></div>'}).join('')+'</div></div>'+
        (PO('excluir_pauta')?'<button class="btn fant p" data-excluir style="margin-top:18px;color:var(--vermelho)">'+ico('lixo',16)+'Excluir pauta</button>':'');
      $('[data-col]',d).addEventListener('change',function(){var v=this.value;if(!DB.podeMover(EU,v)){aviso('Sua função não pode mover para essa coluna');dir();return}pt.coluna=v;if(v==='cliente'){pt.visivelCliente=true;pt.aprovacao=null}DB.log(pt,{t:'moveu',para:v,quem:EU.id});aviso('Movido para '+DB.coluna(v).n);dir()});
      $$('[data-resp]',d).forEach(function(b){b.addEventListener('click',function(){var i=pt.resp.indexOf(b.dataset.resp);if(i>=0){if(pt.resp.length===1){aviso('A pauta precisa de pelo menos um responsável');return}pt.resp.splice(i,1)}else{pt.resp.push(b.dataset.resp);if(b.dataset.resp!==EU.id)notifica({txt:'<b>'+esc(DB.primeiroNome(EU))+'</b> te colocou em <b>'+esc(pt.titulo)+'</b>',link:'pautas.html#p'+pt.id,para:b.dataset.resp})}DB.log(pt,{t:'editou',campo:'responsáveis',quem:EU.id});dir()})});
      $('[data-prazo]',d).addEventListener('change',function(){if(this.value)salva('prazo',this.value,'prazo')});
      $('[data-formato]',d).addEventListener('change',function(){salva('formato',this.value,'formato')});
      $('[data-nivel]',d).addEventListener('change',function(){salva('nivel',this.value,'nível')});
      $('[data-vis]',d).addEventListener('click',function(){pt.visivelCliente=!pt.visivelCliente;DB.salva('pautas');aviso(pt.visivelCliente?'O cliente passa a ver no portal':'Escondido do cliente');dir()});
      var ex=$('[data-excluir]',d);if(ex)ex.addEventListener('click',function(){if(!confirm('Excluir “'+pt.titulo+'”? Não dá para desfazer.'))return;S.pautas.splice(S.pautas.indexOf(pt),1);DB.salva('pautas');m.fecha();aviso('Pauta excluída')});
    }
    esq();dir();
  }
  function novaPauta(o){o=o||{};if(!DB.pode(EU,'criar_pauta')){aviso('Sua função não cria pautas');return}
    var cs=DB.meusClientes(EU),pz=S.config.prazos;
    var m=modal('<div class="olho">Quadro da equipe</div><h2>Nova pauta</h2><p class="desc">Ela entra em “'+esc(DB.coluna(o.coluna||S.colunas[0].k).n)+'”. O prazo segue o nível da demanda, e você pode mudar.</p>'+
      '<label class="campo"><span>Cliente</span><select class="ent" data-n="cliente">'+cs.map(function(c){return '<option value="'+c.id+'"'+(c.id===o.cliente?' selected':'')+'>'+esc(c.nome)+'</option>'}).join('')+'</select></label>'+
      '<label class="campo"><span>Título</span><input class="ent" data-n="titulo" placeholder="Ex.: Carrossel sobre protetor solar" value="'+esc(o.titulo||'')+'"></label>'+
      '<div class="linha2"><label class="campo"><span>Formato</span><select class="ent" data-n="formato">'+DB.FORMATOS.map(function(f){return '<option>'+f+'</option>'}).join('')+'</select></label><label class="campo"><span>Nível</span><select class="ent" data-n="nivel"><option value="leve">Leve · '+pz.leve+' dias</option><option value="media" selected>Média · '+pz.media+' dias</option><option value="alta">Alta · '+pz.alta+' dias</option></select></label></div>'+
      '<label class="campo"><span>Prazo</span><input type="date" class="ent" data-n="prazo" value="'+DB.somaDias(pz.media)+'"></label>'+
      '<div class="campo"><span>Responsáveis</span><div style="display:flex;flex-wrap:wrap;gap:6px" data-resps></div></div>'+
      '<div class="pe"><button class="btn fant" data-cancela>Cancelar</button><button class="btn pri p" data-cria>'+ico('mais',18)+'Criar pauta</button></div>');
    var resp=[EU.id];
    function pessoas(){var cl=$('[data-n=cliente]',m.el).value;var ps=S.equipe.filter(function(p){return p.clientes==='todos'||p.clientes.indexOf(cl)>=0});resp=resp.filter(function(r){return ps.some(function(p){return p.id===r})});
      $('[data-resps]',m.el).innerHTML=ps.map(function(p){return '<button class="chip p" data-r="'+p.id+'" aria-pressed="'+(resp.indexOf(p.id)>=0)+'" style="padding-left:5px;gap:7px">'+av(p,'p')+DB.primeiroNome(p)+'</button>'}).join('');
      $$('[data-r]',m.el).forEach(function(b){b.addEventListener('click',function(){var i=resp.indexOf(b.dataset.r);if(i>=0)resp.splice(i,1);else resp.push(b.dataset.r);b.setAttribute('aria-pressed',i<0)})})}
    pessoas();$('[data-n=cliente]',m.el).addEventListener('change',pessoas);
    $('[data-n=nivel]',m.el).addEventListener('change',function(){$('[data-n=prazo]',m.el).value=DB.somaDias(pz[this.value])});
    $('[data-cancela]',m.el).addEventListener('click',m.fecha);
    $('[data-cria]',m.el).addEventListener('click',function(){var v={};$$('[data-n]',m.el).forEach(function(i){v[i.dataset.n]=i.value.trim()});if(!v.titulo){aviso('Dê um título para a pauta');$('[data-n=titulo]',m.el).focus();return}if(!resp.length){aviso('Escolha pelo menos um responsável');return}
      var pt={id:DB.novoId(S.pautas),cliente:v.cliente,titulo:v.titulo,coluna:o.coluna||S.colunas[0].k,resp:resp.slice(),prazo:v.prazo||DB.somaDias(4),nivel:v.nivel,formato:v.formato,anexos:0,copy:'',visivelCliente:false,aprovacao:null,log:[{t:'criou',quem:EU.id,quando:DB.agora()}],coment:[]};
      S.pautas.push(pt);DB.salva('pautas');resp.forEach(function(r){if(r!==EU.id)notifica({txt:'<b>'+esc(DB.primeiroNome(EU))+'</b> te colocou em <b>'+esc(pt.titulo)+'</b>',link:'pautas.html#p'+pt.id,para:r})});
      m.fecha();aviso('Pauta criada');desenhaLateral();if(window.aoMudarPautas)window.aoMudarPautas();if(o.depois)o.depois(pt)});
  }
  UI.abrePauta=abrePauta;UI.novaPauta=novaPauta;

  /* ---------- cartão de pauta (quadro e listas) ---------- */
  UI.cartaoPauta=function(p,o){o=o||{};var c=DB.cliente(p.cliente),d=diasAte(p.prazo),atras=d<0&&p.coluna!=='publicado';
    return '<article class="cp" data-pid="'+p.id+'"'+(o.arrasta?' draggable="true"':'')+' tabindex="0">'+
      '<div class="cp-cli">'+esc(c?c.nome:'')+'</div><h4>'+esc(p.titulo)+'</h4>'+
      '<div class="cp-meta">'+(p.anexos?'<span>'+ico('clip',15)+p.anexos+'</span>':'')+(p.copy?'<span title="Tem copy">'+ico('doc',15)+'</span>':'')+(p.coment.length?'<span>'+ico('chat',15)+p.coment.length+'</span>':'')+nivelHTML(p.nivel)+(p.aprovacao?'<span class="selo '+(p.aprovacao==='aprovado'?'verde':'laranja')+'" style="height:22px;font-size:11.5px">'+(p.aprovacao==='aprovado'?'Aprovado':'Ajuste pedido')+'</span>':'')+'</div>'+
      '<div class="cp-pe"><span class="avs">'+p.resp.map(function(r){return av(DB.pessoa(r),'p')}).join('')+'</span><span class="cp-prazo'+(atras?' atras':d<=1&&p.coluna!=='publicado'?' perto':'')+'">'+(d===0&&p.coluna!=='publicado'?'hoje':dataCurta(p.prazo))+'</span></div></article>'};

  /* ---------- post para o cliente ver e responder (portal e link de aprovação) ---------- */
  UI.verPost=function(pt,depois){var c=DB.cliente(pt.cliente),n=Math.max(1,pt.anexos||1),i=0,pede=false;
    var m=modal('<div class="vp"><div class="vp-img"></div><div class="vp-txt"></div></div>',{cls:'l vp-m',semFoco:true,aoFechar:depois});
    function img(){var b=$('.vp-img',m.el);
      b.innerHTML='<div class="vp-arte" style="--c:'+c.cor+'"><div><div class="vp-sup">'+esc(c.nome)+(n>1?' · '+(i+1)+'/'+n:'')+'</div><div class="vp-tit">'+(i===0?esc(pt.titulo):'Slide '+(i+1))+'</div></div></div>'+
        (n>1?'<button class="vp-nav" data-pv="-1" aria-label="Anterior" style="left:12px">'+ico('voltar',18)+'</button><button class="vp-nav" data-pv="1" aria-label="Próximo" style="right:12px">'+ico('seta',18)+'</button><div class="vp-pts">'+Array.apply(null,{length:n}).map(function(_,k){return '<i class="'+(k===i?'on':'')+'"></i>'}).join('')+'</div>':'')+
        '<span class="vp-fmt">'+esc(pt.formato)+'</span>';
      $$('[data-pv]',b).forEach(function(x){x.addEventListener('click',function(){i=(i+ +x.dataset.pv+n)%n;img()})})}
    function txt(){var t=$('.vp-txt',m.el),d=dt(pt.prazo),ped=pt.coment.filter(function(k){return k.quem==='cliente'});
      t.innerHTML='<div style="display:flex;align-items:center;gap:12px;margin-bottom:18px">'+avCli(c)+'<div><b style="display:block">'+esc(c.insta||c.nome)+'</b><small style="color:var(--tinta-3)">'+SEMANA[d.getDay()]+', '+d.getDate()+' de '+MESES[d.getMonth()]+'</small></div></div>'+
        '<h2 style="font-size:24px;margin-bottom:12px">'+esc(pt.titulo)+'</h2><div style="flex:1;font-size:15px;line-height:1.65;color:var(--tinta-2);white-space:pre-line">'+esc(pt.copy||'Legenda em produção.')+'</div>'+
        (ped.length?'<div style="margin-top:16px;padding:12px 14px;border-radius:14px;background:var(--laranja-suave);font-size:14px"><b style="display:block;margin-bottom:2px">Seu pedido</b>'+esc(ped[ped.length-1].txt)+'</div>':'')+
        '<div style="margin-top:20px" data-resp></div>';
      var r=$('[data-resp]',t);
      if(pede){r.innerHTML='<textarea class="ent" rows="3" data-aj placeholder="O que você quer mudar? Ex.: trocar a foto do slide 2"></textarea><div style="display:flex;gap:8px;margin-top:10px"><button class="btn fant" data-vt>Voltar</button><button class="btn pri p" style="flex:1" data-envaj>Enviar pedido de ajuste</button></div>';
        $('[data-aj]',r).focus();$('[data-vt]',r).addEventListener('click',function(){pede=false;txt()});
        $('[data-envaj]',r).addEventListener('click',function(){var v=$('[data-aj]',r).value.trim();if(!v){aviso('Conte o que quer mudar');return}DB.responder(pt,'ajuste',v);aviso('Pedido enviado para a equipe');pede=false;txt()})}
      else if(pt.aprovacao){r.innerHTML='<div class="selo '+(pt.aprovacao==='aprovado'?'verde':'laranja')+'" style="height:42px;padding:0 16px;font-size:14.5px;width:100%;justify-content:center">'+(pt.aprovacao==='aprovado'?ico('check',17)+'Você aprovou':'Você pediu ajuste. A equipe foi avisada.')+'</div>'+(pt.aprovacao==='ajuste'?'<button class="btn" style="width:100%;margin-top:8px" data-ap>'+ico('check',17)+'Aprovar assim mesmo</button>':'');
        var ap=$('[data-ap]',r);if(ap)ap.addEventListener('click',function(){DB.responder(pt,'aprovado');aviso('Aprovado!');txt()})}
      else if(pt.coluna==='cliente'){r.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button class="btn" style="height:54px" data-aj2>Pedir ajuste</button><button class="btn pri" data-ap>'+ico('check',18)+'Aprovar</button></div>';
        $('[data-aj2]',r).addEventListener('click',function(){pede=true;txt()});$('[data-ap]',r).addEventListener('click',function(){DB.responder(pt,'aprovado');aviso('Aprovado! A equipe foi avisada.');txt()})}
      else r.innerHTML='<div class="selo" style="height:42px;padding:0 16px;width:100%;justify-content:center">'+esc(DB.coluna(pt.coluna).n)+'</div>'}
    img();txt();return m};

  /* ---------- montar ---------- */
  function monta(){if(AREA==='publico')return;desenhaLateral();desenhaTopo();
    var m=location.hash.match(/^#p(\d+)$/);if(m&&AREA==='agencia')setTimeout(function(){abrePauta(+m[1])},50);
    if(!EU.ehCliente&&!EU.perfilOk&&!EU.nasc)setTimeout(function(){perfil(true)},300)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',monta);else monta();
})();
