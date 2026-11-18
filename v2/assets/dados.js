/* Pulse Creator v2 — dados de exemplo e regras.
   Tudo o que muda durante o teste fica salvo neste navegador (localStorage, prefixo "pc2:").
   DB.zerar() volta tudo ao exemplo. */
(function(){
  var PREFIXO='pc2:';
  function ler(k,padrao){try{var v=localStorage.getItem(PREFIXO+k);return v?JSON.parse(v):padrao}catch(e){return padrao}}
  function grava(k,v){try{localStorage.setItem(PREFIXO+k,JSON.stringify(v))}catch(e){}}
  function copia(o){return JSON.parse(JSON.stringify(o))}

  /* ---------- funções e permissões ----------
     Papel: admin ou colaborador. A função (social, designer, vídeo, atendimento) define o que a pessoa faz.
     O admin pode ajustar as permissões de cada função em Gestão › Funções. */
  var ACOES=[
    ['criar_pauta','Criar pautas'],
    ['editar_copy','Editar título, copy e legenda'],
    ['editar_prazo','Mudar prazo e data de publicação'],
    ['atribuir','Escolher os responsáveis'],
    ['mover_tudo','Mover para qualquer coluna (inclusive aprovação do cliente e publicado)'],
    ['excluir_pauta','Excluir pautas'],
    ['gerir_clientes','Cadastrar e editar clientes'],
    ['falar_cliente','Conversar com o cliente'],
    ['ver_resultados','Ver resultados e relatórios dos clientes'],
    ['gerir_ferramentas','Cadastrar ferramentas'],
    ['gestao','Abrir a Gestão (equipe, financeiro, configurações)']
  ];
  var FUNCOES={
    social:{n:'Social media',p:['criar_pauta','editar_copy','editar_prazo','atribuir','mover_tudo','gerir_clientes','falar_cliente','ver_resultados']},
    designer:{n:'Designer',p:[]},
    video:{n:'Videomaker',p:[]},
    atendimento:{n:'Atendimento',p:['criar_pauta','editar_prazo','atribuir','mover_tudo','gerir_clientes','falar_cliente','ver_resultados']},
    direcao:{n:'Direção',p:ACOES.map(function(a){return a[0]})}
  };

  /* ---------- equipe ---------- */
  var EQUIPE0=[
    {id:'RN',nome:'Renan Lira',email:'renan@pulsecreator.com.br',papel:'admin',funcao:'direcao',cargo:'Diretor criativo',cor:'#9A5B13',nasc:'1998-02-09',pix:'',desc:'Cuido da direção criativa e do atendimento dos clientes maiores.',clientes:'todos',foto:null},
    {id:'BS',nome:'Bianca Souza',email:'bianca@pulsecreator.com.br',papel:'colaborador',funcao:'social',cargo:'Social media',cor:'#C2410C',nasc:'1996-11-22',pix:'bianca@pix.com',desc:'',clientes:['AU','FB','CL','PV','GR'],foto:null},
    {id:'TM',nome:'Tiago Melo',email:'tiago@pulsecreator.com.br',papel:'colaborador',funcao:'video',cargo:'Videomaker',cor:'#57534E',nasc:'1994-12-03',pix:'',desc:'',clientes:['AU','FB','LU','OD'],foto:null},
    {id:'DL',nome:'Davi Lopes',email:'davi@pulsecreator.com.br',papel:'colaborador',funcao:'designer',cargo:'Designer',cor:'#7A5C1E',nasc:'2000-03-17',pix:'',desc:'',clientes:['AU','FB','CL','OD','PV'],foto:null},
    {id:'LR',nome:'Lia Ramos',email:'lia@pulsecreator.com.br',papel:'colaborador',funcao:'designer',cargo:'Designer',cor:'#8F2D1B',nasc:'1999-07-08',pix:'',desc:'',clientes:['LU','GR','CL','MV'],foto:null}
  ];

  /* ---------- clientes ---------- */
  var CLIENTES0=[
    {id:'AU',nome:'Clínica Aurora',seg:'Dermatologia',cor:'#2F4A3F',ini:'CA',plano:'Pro',valor:3200,venc:5,insta:'@clinicaaurora',desde:'2025-03-10',contato:'Dra. Marina Alves',email:'marina@clinicaaurora.com.br',fone:'(81) 98765-1020',briefing:'Tom próximo e didático, sem promessa milagrosa. Público: mulheres de 28 a 50 anos que querem cuidar da pele com orientação médica. Evitar antes e depois sem autorização.',fixo:true},
    {id:'FB',nome:'Forno Bravo',seg:'Pizzaria',cor:'#9A2E12',ini:'FB',plano:'Essencial',valor:1800,venc:10,insta:'@fornobravo',desde:'2025-08-01',contato:'Paulo Teixeira',email:'paulo@fornobravo.com.br',fone:'(81) 99654-3300',briefing:'Comunicação divertida, foco em delivery de quinta a domingo. Promo de terça. Fotos sempre com a massa aparecendo.',fixo:true},
    {id:'CL',nome:'Casa Lume',seg:'Decoração',cor:'#B07A2A',ini:'CL',plano:'Pro',valor:2900,venc:15,insta:'@casalume',desde:'2024-11-20',contato:'Júlia Prado',email:'julia@casalume.com.br',fone:'(81) 98111-2233',briefing:'Estética clean, tons neutros. Conteúdo de inspiração e bastidores da loja.',fixo:false},
    {id:'LU',nome:'Studio Lunar Pilates',seg:'Pilates',cor:'#4B4F8C',ini:'SL',plano:'Essencial',valor:1500,venc:5,insta:'@studiolunar',desde:'2026-02-01',contato:'Carla Menezes',email:'carla@studiolunar.com.br',fone:'(81) 99222-1010',briefing:'Bem-estar sem culpa. Mostrar alunas reais (com autorização) e professoras.',fixo:false},
    {id:'OD',nome:'Dr. Otávio Dantas',seg:'Cardiologia',cor:'#1F3B57',ini:'OD',plano:'Pro',valor:3500,venc:20,insta:'@drotaviodantas',desde:'2025-05-05',contato:'Otávio Dantas',email:'contato@drotavio.com.br',fone:'(81) 98888-4545',briefing:'Autoridade e confiança. Linguagem simples para explicar exames e prevenção.',fixo:false},
    {id:'PV',nome:'Padaria Vila Nova',seg:'Padaria',cor:'#8A5A2B',ini:'PV',plano:'Essencial',valor:1400,venc:10,insta:'@padariavilanova',desde:'2026-04-12',contato:'Seu Antônio',email:'antonio@vilanova.com.br',fone:'(81) 98777-0001',briefing:'Afeto de bairro. Pão saindo do forno às 7h e às 17h.',fixo:false},
    {id:'GR',nome:'Grão Café',seg:'Cafeteria',cor:'#5B3A29',ini:'GC',plano:'Essencial',valor:1600,venc:15,insta:'@graocafe',desde:'2025-10-01',contato:'Rafa Lins',email:'rafa@graocafe.com.br',fone:'(81) 99191-7272',briefing:'Café especial sem esnobismo. Mostrar origem dos grãos e o time de baristas.',fixo:false},
    {id:'MV',nome:'Ótica Mais Visão',seg:'Ótica',cor:'#246B74',ini:'MV',plano:'Pro',valor:2600,venc:25,insta:'@oticamaisvisao',desde:'2025-01-15',contato:'Fernanda Rocha',email:'fernanda@maisvisao.com.br',fone:'(81) 98585-6060',briefing:'Moda e saúde visual. Lançamentos de armações toda segunda.',fixo:false}
  ];

  /* ---------- quadro de pautas ----------
     "todos" diz se designers e videomakers podem mover cards para essa coluna. */
  var COLUNAS0=[
    {k:'ideias',n:'Ideias e copy',todos:true},
    {k:'criacao',n:'Em criação',todos:true},
    {k:'revisao',n:'Revisão interna',todos:true},
    {k:'cliente',n:'Aprovação do cliente',todos:false},
    {k:'programado',n:'Programado',todos:false},
    {k:'publicado',n:'Publicado',todos:false}
  ];
  var FORMATOS=['Post','Carrossel','Reels','Stories','Gravação','Anúncio','Material off'];
  function hojeISO(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  function somaDias(n){var d=new Date();d.setDate(d.getDate()+n);return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  function agora(){var d=new Date();return d.toISOString()}
  // [cliente, título, coluna, responsáveis, prazo (dias a partir de hoje), nível, formato, anexos]
  var P=[
    ['AU','Rotina de skincare em 3 passos','cliente',['BS','DL'],2,'media','Carrossel',5],
    ['AU','Protetor solar no verão','criacao',['BS','DL'],4,'leve','Post',1],
    ['AU','Gravação: um dia na clínica','ideias',['TM','BS'],3,'alta','Gravação',0],
    ['AU','Peeling dói? (reels)','revisao',['TM'],1,'alta','Reels',1],
    ['FB','Black Friday: rodízio em dobro','criacao',['BS','DL'],5,'alta','Carrossel',0],
    ['FB','Promo de terça','programado',['DL'],1,'leve','Stories',2],
    ['FB','Bastidores da massa (reels)','ideias',['TM'],8,'media','Reels',0],
    ['CL','Coleção de verão 2027','revisao',['LR','BS'],2,'media','Carrossel',6],
    ['CL','Anúncio: frete grátis','cliente',['BS'],1,'media','Anúncio',2],
    ['LU','Aula experimental grátis','criacao',['LR'],3,'leve','Post',0],
    ['OD','Check-up: quando fazer?','ideias',['BS'],6,'media','Carrossel',0],
    ['OD','Novembro Azul: prevenção','publicado',['DL','BS'],-5,'media','Post',1],
    ['PV','Pão das 17h','publicado',['DL'],-2,'leve','Stories',1],
    ['GR','Origem do grão: Cerrado','criacao',['LR','TM'],4,'media','Reels',0],
    ['MV','Armações da semana','revisao',['LR'],0,'leve','Carrossel',4],
    ['AU','Caixinha de perguntas','programado',['BS'],2,'leve','Stories',1],
    ['AU','Mitos sobre peeling','programado',['BS','DL'],3,'media','Carrossel',4],
    ['AU','Um dia na clínica','publicado',['TM','BS'],-3,'alta','Reels',1],
    ['AU','Perguntas que mais recebemos','publicado',['BS','DL'],-6,'media','Post',1],
    ['AU','4 sinais de que sua pele pede hidratação','publicado',['BS','DL'],-9,'media','Carrossel',5],
    ['AU','Nossos serviços','publicado',['DL'],-13,'media','Post',1],
    ['AU','Banner da recepção','publicado',['DL'],-8,'media','Material off',1]
  ];
  var PAUTAS0=P.map(function(p,i){var prazo=somaDias(p[4]);return {id:i+1,cliente:p[0],titulo:p[1],coluna:p[2],resp:p[3],prazo:prazo,nivel:p[5],formato:p[6],anexos:p[7],
    copy:p[1]+'.\n\nTexto da legenda no tom do cliente. Chamada no fim: agende pelo link da bio.',
    visivelCliente:['cliente','programado','publicado'].indexOf(p[2])>=0,aprovacao:null,
    log:[{t:'criou',quem:'BS',quando:new Date(Date.now()-864e5*(6-i%4)).toISOString()}].concat(p[2]!=='ideias'?[{t:'moveu',para:p[2],quem:p[3][0],quando:new Date(Date.now()-864e5*(i%3)-36e5*(i%5)).toISOString()}]:[]),
    coment:i===0?[{quem:'cliente',txt:'Adorei! Dá pra trocar a foto do slide 3 por uma da recepção?',quando:new Date(Date.now()-5*36e5).toISOString()},{quem:'BS',txt:'@Davi consegue usar as fotos do último ensaio no slide 3?',quando:new Date(Date.now()-4*36e5).toISOString()}]:[]}});

  /* ---------- agenda ---------- */
  var CATS={reuniao:{n:'Reuniões',c:'#3567C9'},gravacao:{n:'Gravações',c:'#CC3F33'},evento:{n:'Eventos',c:'#8A4FBF'},sazonal:{n:'Datas sazonais',c:'#2E8A57'},aniversario:{n:'Aniversários',c:'#F26B1D'},google:{n:'Meu Google',c:'#1F9E8F'},ocupado:{n:'Ocupado',c:'#8C857B'}};
  var SAZONAIS={'01-01':'Ano-novo','02-14':'Valentine\'s Day','03-08':'Dia da Mulher','03-15':'Dia do Consumidor','04-07':'Dia da Saúde','05-01':'Dia do Trabalho','06-12':'Dia dos Namorados','08-11':'Dia do Estudante','09-15':'Dia do Cliente','10-01':'Outubro Rosa','10-12':'Dia das Crianças','10-15':'Dia do Professor','10-31':'Halloween','11-01':'Novembro Azul','11-02':'Finados (feriado)','11-15':'Proclamação da República','11-20':'Dia da Consciência Negra','11-27':'Black Friday','11-30':'Cyber Monday','12-01':'Dezembro Laranja','12-24':'Véspera de Natal','12-25':'Natal','12-31':'Réveillon'};
  function evDia(dias,h,fim,cat,titulo,quem,cliente,extra){var o={id:'e'+Math.random().toString(36).slice(2,8),data:somaDias(dias),hora:h,fim:fim,cat:cat,titulo:titulo,quem:quem||[],cliente:cliente||null};for(var k in extra||{})o[k]=extra[k];return o}
  var EVENTOS0=[
    evDia(0,'10:00','11:00','reuniao','Alinhamento semanal da equipe',['RN','BS','TM','DL','LR'],null,{local:'Sala de voz: Reunião geral'}),
    evDia(2,'14:00','17:00','gravacao','Gravação Clínica Aurora',['TM','BS'],'AU',{local:'Clínica Aurora, Boa Viagem'}),
    evDia(2,'14:00','17:00','ocupado','Tiago: ocupado',['TM']),
    evDia(3,'10:00','10:45','reuniao','Planejamento de dezembro · Forno Bravo',['BS','RN'],'FB',{local:'Link de reunião'}),
    evDia(5,'09:00','12:00','gravacao','Ensaio de verão · Casa Lume',['TM','LR'],'CL',{local:'Loja Casa Lume'}),
    evDia(8,'19:00','22:00','evento','Lançamento da coleção · Ótica Mais Visão',['RN','TM'],'MV'),
    evDia(9,'15:00','16:00','reuniao','Resultados de novembro · Dr. Otávio',['RN'],'OD'),
    evDia(1,'09:00','10:00','google','Dentista',['RN']),
    evDia(15,'10:00','11:30','reuniao','Planejamento de janeiro · Clínica Aurora',['BS','RN'],'AU')
  ];

  /* ---------- social (canais) ---------- */
  var CANAIS0={
    texto:[{k:'geral',n:'geral'},{k:'pautas-do-dia',n:'pautas-do-dia'},{k:'referencias',n:'referências'}],
    voz:[{k:'reuniao',n:'Reunião geral',dentro:[]},{k:'direcao',n:'Direção',trancado:true,dentro:['RN']},{k:'gravacao',n:'Ilha de edição',dentro:['TM']}],
    msgs:{
      'geral':[{quem:'RN',txt:'Bom dia, time! Hoje tem alinhamento às 10h na sala de voz.',quando:somaDias(0)+'T08:12:00'},{quem:'BS',txt:'Bom dia! Já subi as pautas da Aurora pra revisão.',quando:somaDias(0)+'T08:40:00'},{quem:'LR',txt:'Alguém tem o PNG novo do logo da Casa Lume?',quando:somaDias(0)+'T09:05:00'},{quem:'DL',txt:'Tá na pasta Marca do cliente, Lia.',quando:somaDias(0)+'T09:07:00'}],
      'pautas-do-dia':[{quem:'BS',txt:'Hoje: Promo de terça (Forno Bravo) programada pras 11h. Armações da semana (Mais Visão) precisa sair até as 18h.',quando:somaDias(0)+'T08:30:00'}],
      'referencias':[{quem:'DL',txt:'Achei esse carrossel com tipografia grande e foto recortada, ia ficar ótimo pra Aurora.',quando:somaDias(-1)+'T16:20:00'}]
    },
    cliente:{
      'AU':[{quem:'cliente',txt:'Oi! Consegue trocar a foto do slide 3 do carrossel de skincare?',quando:somaDias(0)+'T07:50:00'},{quem:'BS',txt:'Consigo sim, Dra. Marina! Te mando a nova versão ainda hoje.',quando:somaDias(0)+'T08:02:00'}],
      'FB':[{quem:'cliente',txt:'A Black Friday vai ser rodízio em dobro mesmo, pode seguir.',quando:somaDias(-1)+'T18:10:00'}]
    }
  };

  /* ---------- ferramentas e referências ---------- */
  var FERRAMENTAS0=[
    {id:'f1',nome:'Freelahub',cat:'Design e vídeo',desc:'Mais de 15 ferramentas de IA premium com uma única assinatura.',site:'freelahub.com',acesso:'todos',cor1:'#2B1B6E',cor2:'#6A3DF0',como:'Entre com o e-mail da agência. A senha está no cofre de senhas da equipe (peça ao admin).',valor:59.9},
    {id:'f2',nome:'Canva Pro',cat:'Design e vídeo',desc:'Kit de marca de cada cliente, modelos de stories e redimensionamento.',site:'canva.com',acesso:'todos',cor1:'#0E7C86',cor2:'#7D2AE8',como:'Convite pelo seu e-mail. Os kits de marca ficam em Pastas › Clientes.',valor:34.9},
    {id:'f3',nome:'Adobe Creative Cloud',cat:'Design e vídeo',desc:'Photoshop, Illustrator, Premiere e After Effects.',site:'adobe.com',acesso:['RN','DL','LR','TM'],cor1:'#3A0D0D',cor2:'#E3342F',como:'Licença nominal: o admin atribui pelo Admin Console.',valor:290},
    {id:'f4',nome:'mLabs',cat:'Agendamento',desc:'Agendamento de posts e relatórios das redes dos clientes.',site:'mlabs.com.br',acesso:['RN','BS'],cor1:'#0B2A4A',cor2:'#1E88E5',como:'Login próprio de cada social media.',valor:199},
    {id:'f5',nome:'CapCut Pro',cat:'Design e vídeo',desc:'Edição rápida de reels com legendas automáticas.',site:'capcut.com',acesso:['TM','BS'],cor1:'#111111',cor2:'#3A3A3A',como:'Conta da agência no celular de gravação.',valor:39.9},
    {id:'f6',nome:'Google Workspace',cat:'Gestão',desc:'E-mail, Drive com as pastas dos clientes e agenda da equipe.',site:'workspace.google.com',acesso:'todos',cor1:'#0F5132',cor2:'#34A853',como:'Seu e-mail @pulsecreator.com.br.',valor:28}
  ];
  var REFS0=[
    {id:'r1',titulo:'Carrossel com tipografia gigante',cliente:'AU',tag:'Carrossel',nota:'Funciona pra temas educativos. Fundo chapado + foto recortada.',cor:'#2F4A3F',quem:'DL'},
    {id:'r2',titulo:'Reels de bastidores em 3 cortes',cliente:'FB',tag:'Reels',nota:'Gancho nos 2 primeiros segundos, sem narração.',cor:'#9A2E12',quem:'TM'},
    {id:'r3',titulo:'Feed em grade de 3 cores',cliente:null,tag:'Feed',nota:'Alternar foto, frase e produto.',cor:'#B07A2A',quem:'LR'},
    {id:'r4',titulo:'Stories com enquete no 2º quadro',cliente:'GR',tag:'Stories',nota:'Mais respostas quando a enquete não é o primeiro story.',cor:'#5B3A29',quem:'BS'}
  ];

  /* ---------- financeiro ---------- */
  var PAGAMENTOS0=[
    {quem:'BS',ref:'Novembro',valor:3800,status:'pago',data:somaDias(-11)},
    {quem:'TM',ref:'Novembro',valor:3400,status:'pago',data:somaDias(-11)},
    {quem:'DL',ref:'Novembro',valor:3200,status:'pendente',data:somaDias(14)},
    {quem:'LR',ref:'Novembro',valor:3000,status:'pendente',data:somaDias(14)},
    {quem:'TM',ref:'Diária extra · gravação Casa Lume',valor:450,status:'pendente',data:somaDias(6)}
  ];

  /* ---------- configurações ---------- */
  var CONFIG0={agencia:'Pulse Creator',prazos:{leve:2,media:4,alta:7},perm:{},integracoes:{instagram:true,meta_ads:true,google:false,drive:true,whatsapp:false}};

  /* ---------- estado ---------- */
  var S={
    equipe:ler('equipe',EQUIPE0),clientes:ler('clientes',CLIENTES0),colunas:ler('colunas',COLUNAS0),pautas:ler('pautas',PAUTAS0),
    eventos:ler('eventos',EVENTOS0),canais:ler('canais',CANAIS0),ferramentas:ler('ferramentas',FERRAMENTAS0),refs:ler('refs',REFS0),
    pagamentos:ler('pagamentos',PAGAMENTOS0),config:ler('config',CONFIG0),notifs:ler('notifs',null),pedidos:ler('pedidos',null),arquivos:ler('arquivos',null)
  };
  if(!S.notifs)S.notifs=[
    {id:1,txt:'<b>Dra. Marina</b> (Clínica Aurora) pediu ajuste em <b>Rotina de skincare em 3 passos</b>',quando:new Date(Date.now()-5*36e5).toISOString(),link:'pautas.html#p1',nova:true},
    {id:2,txt:'<b>Bianca</b> te marcou em <b>Rotina de skincare em 3 passos</b>',quando:new Date(Date.now()-4*36e5).toISOString(),link:'pautas.html#p1',nova:true,para:'DL'},
    {id:3,txt:'<b>Paulo</b> (Forno Bravo) aprovou <b>Promo de terça</b>',quando:new Date(Date.now()-26*36e5).toISOString(),link:'pautas.html#p6',nova:false},
    {id:4,txt:'Aniversário da <b>Bianca</b> no domingo, dia 22',quando:new Date(Date.now()-30*36e5).toISOString(),link:'agenda.html',nova:false}
  ];
  if(!S.pedidos)S.pedidos=[
    {id:1,cliente:'AU',titulo:'Post sobre o novo horário de sábado',desc:'A partir de dezembro vamos abrir aos sábados das 8h às 12h.',urg:'normal',status:'novo',quando:somaDias(-1)},
    {id:2,cliente:'AU',titulo:'Stories de Natal com a equipe',desc:'Queremos fotos com a equipe de gorro.',urg:'baixa',status:'virou pauta',quando:somaDias(-6)},
    {id:3,cliente:'FB',titulo:'Arte para o cardápio de verão',desc:'Pizzas novas: abacaxi com bacon e caprese.',urg:'alta',status:'novo',quando:somaDias(0)}
  ];
  if(!S.arquivos)S.arquivos=[
    {id:1,cliente:'AU',nome:'Contrato de prestação de serviços 2026.pdf',pasta:'Contratos',tam:'312 KB',quando:'2026-01-05',assinado:true},
    {id:2,cliente:'AU',nome:'Aditivo · gravações mensais.pdf',pasta:'Contratos',tam:'120 KB',quando:'2026-06-02',assinado:false},
    {id:3,cliente:'AU',nome:'Manual da marca.pdf',pasta:'Marca',tam:'4,2 MB',quando:'2025-03-12'},
    {id:4,cliente:'AU',nome:'Logo · versões.zip',pasta:'Marca',tam:'8,9 MB',quando:'2025-03-12'},
    {id:5,cliente:'AU',nome:'Ensaio outubro (42 fotos)',pasta:'Fotos',tam:'210 MB',quando:'2026-10-21'},
    {id:6,cliente:'AU',nome:'Relatório de outubro.pdf',pasta:'Relatórios',tam:'1,1 MB',quando:'2026-11-03'},
    {id:7,cliente:'FB',nome:'Contrato 2025-2026.pdf',pasta:'Contratos',tam:'280 KB',quando:'2025-08-01',assinado:true},
    {id:8,cliente:'FB',nome:'Cardápio atual.pdf',pasta:'Marca',tam:'2,3 MB',quando:'2026-09-14'}
  ];
  function salva(k){grava(k,S[k])}

  /* ---------- sessão ---------- */
  function usuarioId(){try{return localStorage.getItem(PREFIXO+'eu')}catch(e){return null}}
  function eu(){var id=usuarioId();if(!id)return null;if(id.indexOf('cli:')===0){var c=cliente(id.slice(4));return c?{id:id,cliente:c.id,nome:c.contato,ehCliente:true,c:c}:null}return pessoa(id)}
  function entrar(id){try{localStorage.setItem(PREFIXO+'eu',id)}catch(e){}}
  function sair(){try{localStorage.removeItem(PREFIXO+'eu')}catch(e){}}
  function pessoa(id){return S.equipe.filter(function(p){return p.id===id})[0]||null}
  function cliente(id){return S.clientes.filter(function(c){return c.id===id})[0]||null}
  function perms(p){if(!p||p.ehCliente)return [];if(p.papel==='admin')return ACOES.map(function(a){return a[0]});var aj=S.config.perm[p.funcao];return aj||(FUNCOES[p.funcao]?FUNCOES[p.funcao].p:[])}
  function pode(p,acao){return perms(p).indexOf(acao)>=0}
  function podeMover(p,col){if(pode(p,'mover_tudo'))return true;var c=S.colunas.filter(function(x){return x.k===col})[0];return !!(c&&c.todos)}
  function meusClientes(p){if(!p)return [];if(p.papel==='admin'||p.clientes==='todos')return S.clientes;return S.clientes.filter(function(c){return p.clientes.indexOf(c.id)>=0})}
  function primeiroNome(p){return (p.nome||'').split(' ')[0]}

  window.DB={S:S,salva:salva,ACOES:ACOES,FUNCOES:FUNCOES,FORMATOS:FORMATOS,CATS:CATS,SAZONAIS:SAZONAIS,
    eu:eu,entrar:entrar,sair:sair,pessoa:pessoa,cliente:cliente,pode:pode,perms:perms,podeMover:podeMover,meusClientes:meusClientes,primeiroNome:primeiroNome,
    nomeCurto:function(n){var p=String(n||'').trim().split(/\s+/);while(p.length>1&&/^(dr|dra|sr|sra|seu|dona)\.?$/i.test(p[0]))p.shift();return p[0]||''},
    hoje:hojeISO,somaDias:somaDias,agora:agora,
    coluna:function(k){return S.colunas.filter(function(c){return c.k===k})[0]||{k:k,n:k}},
    pauta:function(id){return S.pautas.filter(function(p){return p.id===+id})[0]||null},
    novoId:function(lista){return lista.reduce(function(m,x){return Math.max(m,+x.id||0)},0)+1},
    log:function(pt,item){item.quando=item.quando||agora();pt.log.push(item);salva('pautas')},
    zerar:function(){var ks=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf(PREFIXO)===0&&k!==PREFIXO+'eu'&&k!==PREFIXO+'tema')ks.push(k)}ks.forEach(function(k){localStorage.removeItem(k)})},
    copia:copia,
    // resposta do cliente a um post (portal ou link de aprovação)
    responder:function(pt,acao,txt,quem){pt.aprovacao=acao;var q=quem||'cliente';
      if(txt)pt.coment.push({quem:q,txt:txt,quando:agora()});
      pt.log.push({t:acao==='aprovado'?'aprovou':'ajuste',quem:q,quando:agora()});
      if(acao==='aprovado'){var i=-1;S.colunas.forEach(function(c,k){if(c.k==='cliente')i=k});if(i>=0&&S.colunas[i+1]&&pt.coluna==='cliente'){pt.coluna=S.colunas[i+1].k;pt.log.push({t:'moveu',para:pt.coluna,quem:q,quando:agora()})}}
      var c=cliente(pt.cliente);
      pt.resp.forEach(function(r){S.notifs.push({id:S.notifs.length+1+Math.floor(Math.random()*1e6),txt:'<b>'+(c?DB.nomeCurto(c.contato):'Cliente')+'</b> ('+(c?c.nome:'')+') '+(acao==='aprovado'?'aprovou':'pediu ajuste em')+' <b>'+pt.titulo.replace(/</g,'&lt;')+'</b>',quando:agora(),link:'pautas.html#p'+pt.id,nova:true,para:r})});
      salva('pautas');salva('notifs')}
  };
})();
