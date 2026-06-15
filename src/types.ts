/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Category {
  NoticiasDF = "Notícias DF",
  Empregos = "Empregos",
  ImoveisDF = "Imóveis DF",
  Veiculos = "Veículos",
  GuiaDeCompras = "Guia de Compras",
  Negocios = "Negócios",
  SegurancaDigital = "Segurança Digital",
  AgendaDF = "Agenda DF"
}

export interface BlogPost {
  id: string;
  title: string;
  category: Category;
  summary: string;
  content: string;
  imageUrl: string;
  date: string;
  readTime: string;
  urgent?: boolean;
  author: string;
}

// Imagens importadas excelentes do GDF / Brasília e imagens profissionais
export const MOCK_POSTS: BlogPost[] = [
  // ---------------- NOTÍCIAS DF ----------------
  {
    id: "not-1",
    title: "Novos investimentos em infraestrutura transformam o DF e criam milhares de empregos",
    category: Category.NoticiasDF,
    summary: "Governo local anuncia pacote de obras focado em mobilidade urbana e revitalização de espaços públicos, prometendo aquecer a economia e o mercado de trabalho na capital federal.",
    content: "O Governo do Distrito Federal (GDF) anunciou nesta semana a liberação de um novo pacote bilionário de investimentos destinados a obras públicas e melhorias na mobilidade urbana de Brasília. O plano estratégico prevê intervenções profundas em viadutos, pavimentação asfáltica de novas vias nas regiões administrativas do Sol Nascente, Vicente Pires e Planaltina, e a reforma completa das calçadas e ciclovias na Asa Sul e Asa Norte.\n\nSegundo dados da Secretaria de Obras, a expectativa é que mais de 15.000 empregos diretos e indiretos sejam gerados ao longo dos próximos 12 meses. O foco principal está na agilidade do tráfego e no incentivo ao transporte sustentável. \n\n### Impacto regional\n\nMoradores das regiões mais afastadas do plano piloto comemoraram as notícias. Em Sobradinho e Samambaia, novos viadutos ajudarão a aliviar gargalos históricos que custavam horas de deslocamento diário aos trabalhadores. 'Essa obra é um sonho de vinte anos. Passar pelo balão de Sobradinho em horário de pico vai ser muito mais rápido e seguro', comentou o morador Geraldo Alves.\n\nCom as frentes de trabalho espalhadas por todo o Distrito Federal, fornecedores de materiais de construção, comércio local e prestadores de serviços de engenharia já começam a sentir o aumento na procura.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoQXxY8nPQswmXUfDE41T1Q23yUFIVE8eBR9drKZC2Eape_BSZ0HN2cRbcySmYCD7Tixn0Q8Ry9h-VIxjJfypmaJfzc_xhXULGl35PfYpC_LViFU1Ei-JIOzA94CUGSSG7RtlcuxggJaPT3m9AKaU6GysgCqk5FXFxVVvgE0oPwm755_PGqUn_lxSagDpN81M8gsUUlx50mp6KhrVl64jsYP4EutnAcfIuPf-od_CyD1Ia0wzDd7irYArVMxndApzyzvnhr56pYFQ",
    date: "15 de Junho, 2026",
    readTime: "4 min de leitura",
    urgent: true,
    author: "Redação Radar Tá On"
  },
  {
    id: "not-2",
    title: "Reforma do Teatro Nacional de Brasília entra na fase final e empolga classe artística",
    category: Category.NoticiasDF,
    summary: "Com mais de 80% das intervenções estruturais prontas, a Sala Martins Penna reabrirá as portas com tecnologia cênica de ponta e acessibilidade plena.",
    content: "O icônico projeto arquitetônico de Oscar Niemeyer está mais perto de reencontrar seu público. A Secretaria de Cultura informou que as obras de restauro e modernização técnica do Teatro Nacional Cláudio Santoro avançaram significativamente. Foram realizadas trocas de fiação, instalação de carpete antichama, modernos sistemas de acústica e iluminação, e total adaptação para acessibilidade física.\n\nA classe cultural do Distrito Federal aguarda com ansiedade. 'O Teatro Nacional é a alma cênica de Brasília. Ver este patrimônio voltar à vida é um sopro de esperança e oportunidade para todas as companhias de teatro e música', afirma Lívia Maranhão, diretora teatral local.",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    date: "13 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Daniel Ferreira"
  },
  {
    id: "not-3",
    title: "GDF investe em frotas de ônibus 100% elétricos para as principais linhas do DF",
    category: Category.NoticiasDF,
    summary: "Asa Sul, Asa Norte e Águas Claras serão as primeiras contempladas com veículos modernos de emissão zero, carregamento rápido e ar-condicionado de alta potência.",
    content: "Visando a consolidação de políticas públicas voltadas ao meio ambiente, o DF inicia a substituição progressiva de ônibus movidos a diesel por modelos elétricos de última geração. O plano de sustentabilidade urbana prevê que até o final do ano cerca de 80 coletivos elétricos operem nas rotas com maior congestionamento. \n\nAlém de não emitirem poluentes nas avenidas brasilienses, esses novos coletivos reduzem vertiginosamente o ruído sonoro urbano e contam com entradas USB em todos os assentos, suspensão pneumática confortável e internet de alta velocidade liberada aos passageiros.",
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    date: "10 de Junho, 2026",
    readTime: "5 min de leitura",
    author: "Mariana Lopes"
  },

  // ---------------- EMPREGOS ----------------
  {
    id: "emp-1",
    title: "GDF anuncia edital para concurso da Secretaria de Saúde com mais de 500 vagas",
    category: Category.Empregos,
    summary: "As inscrições começam no próximo mês. Salários iniciais podem chegar a R$ 8.000,00 para cargos de nível superior em diversas especialidades médicas e administrativas.",
    content: "Foi publicado no Diário Oficial de hoje o extrato do aguardado edital de concurso público para preenchimento de mais de 500 vagas na Secretaria de Saúde do Distrito Federal (SES-DF). As oportunidades abrangem cargos de níveis médio, técnico e superior, com destaque para as áreas de assistência em enfermagem, clínica médica, farmácia e administração hospitalar.\n\n### Detalhes das Vagas e Remunerações\n\n- **Nível Superior**: Salários iniciais de R$ 6.300 a R$ 8.200, jornada flexível e auxílio alimentação.\n- **Nível Técnico/Médio**: Salários a partir de R$ 3.800,00.\n\nAs provas objetivas serão organizadas por banca de renome nacional e aplicadas em diversas localidades, incluindo Taguatinga, Plano Piloto e Ceilândia. Especialistas recomendam iniciar os estudos imediatamente focando em legislação do SUS e conhecimentos específicos da área escolhida.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAApKeJKUN4T-oSoGtDMPjBXzv_j7yAjMMsnf3UYZClOeeuMdLWg-KAvY_SymDVYGVmi25zh1rXtzCFuQuBXNMAcXMYiD3XTnMHX_siZR3eNvJvRW6GtQbn2JOe0nwvJVJ9lgytNfOy7BLUy2bjSRofVIhJeMYBrxoBc2lvIRYmtJDpEIISuy087EyqR4PuZqTTjGWVs616Dr5XEZDXEj9Fvxjp7ROcbSIOY56iejtJl0_DlZflaysT91Qxt3ztAlHuHv1TbpEVYYc",
    date: "14 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Felipe Andrade"
  },
  {
    id: "emp-2",
    title: "Empresas de tecnologia no Polo Digital abrem 200 vagas para desenvolvedores",
    category: Category.Empregos,
    summary: "Oportunidades variam de desenvolvedor júnior a sênior, com excelentes opções de trabalho híbrido ou totalmente remoto com sedes em Brasília.",
    content: "O Polo Digital de Brasília segue em forte expansão econômica. Esta semana, um pool formado por sete grandes startups e consolidadas corporações tecnológicas anunciou o início de recrutamento em massa com cerca de 200 novas posições.\n\nTêm vagas para especialistas em JavaScript, TypeScript, Python, DevOps, e arquitetura de dados em Cloud (Google Cloud e AWS). A maior parte das oportunidades aceita candidatos de qualquer parte do Brasil, contudo empresas preferem talentos regionais para possibilitar dinâmicas de escritório híbridas no Parque Tecnológico de Brasília (BIOTIC).\n\nPara se candidatar, basta acessar os portais dessas empresas parceiras ou participar dos canais de recrutamento integrados ao Tá On Classificados.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh8SsyZk1Eef5HuLXmBJ7DEw0v6D2ZyqwzGVyRsZCFfjAjAblpXQncCYxH7xrc3YYn0ML7Cz6AgjGLWjnjW_7xw1AEr9joCMIIuuuRDQMfdyloorWRJb1Vwyz9rNakYew0UEXfxVgHJUbILHZK2MRFtvXFTN971Sr_IYfyBI9-369stXF_V0UUJN0oukd6X7-tBguy4i6GVZ6A7yU1L34hMOl6Xs0MA92jhV6a9XfV3MllrFE463_FjlAXv6slAM417bLO_OCIkt8",
    date: "14 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Redação Radar Tá On"
  },
  {
    id: "emp-3",
    title: "Feira de Estágios da UnB conecta estudantes a grandes empresas do DF",
    category: Category.Empregos,
    summary: "Evento totalmente online e gratuito acontece na próxima semana. Especialistas darão palestras e análises de currículos ao vivo para dezenas de áreas.",
    content: "A Universidade de Brasília (UnB), em parceria com o CIEE-DF, promove de 22 a 25 de junho a sua tradicional e aguardada Feira Anual de Estágios e Trainees. O formato interativo permite que alunos cadastrados conversem de forma direta com profissionais de captação de talentos de multinacionais, escritórios de advocacia, e órgãos da administração pública.\n\nAlém das centenas de vagas destinadas a estudantes de Administração, Engenharia, Comunicação, TI e Saúde, haverá painéis com mentores de carreira, revisões gratuitas de perfil no LinkedIn e orientações comportamentais para dinâmicas de seleção.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuxzrf_f2pPCV3myk9S2BJXMCm7V4Z2LEJj4AAgX7PRTaPZLZUK3otTkgghLqfZi0WyAJuMt9k_BJ8GH90-biSG1wMHlETBPK89KNf2M_MBDNFRM3LvBBAhVXu5GZ4BQODdX66K589rlqBEERuAm5if5nPtfrtMBPVsgzusvMVxr8dGMQ1BPwASEtLO-6mMUM4EPZMdvFUQo1ON7EyNXDrIY6jiV_l4JNOJ2T2bhJUFc_6Izzz2GXKLdkz1wS9h2hhqy6l4B8lvOk",
    date: "13 de Junho, 2026",
    readTime: "4 min de leitura",
    author: "Ana Souza"
  },

  // ---------------- IMÓVEIS DF ----------------
  {
    id: "im-1",
    title: "Águas Claras e Noroeste lideram a valorização imobiliária do primeiro semestre",
    category: Category.ImoveisDF,
    summary: "Alta na demanda por apartamentos maiores com varanda gourmet e infraestrutura moderna de lazer impulsiona os preços por metro quadrado nas regiões administratatvas.",
    content: "O mercado imobiliário do Distrito Federal registrou um aquecimento expressivo no primeiro semestre deste ano, consolidando as regiões de Águas Claras, Setor Noroeste e Sudoeste no topo do ranking de valorização patrimonial.\n\nDe acordo com a última pesquisa do sindicato patronal da construção civil, o metro quadrado na região do Noroeste cresceu significativamente, registrando valorização histórica para empreendimentos de alto padrão integrados a fontes renováveis e projetos de arquitetura biofílica.\n\n### Busca por novos layouts residenciais\n\nCom a consolidação permanente das rotinas de trabalho híbrido, famílias brasilienses priorizam novos fatores na compra: cômodos adaptáveis, duas vagas na garagem preparadas para veículos elétricos e excelente isolamento sonoro. 'Percebemos que as pessoas não buscam mais apenas metragem, mas sim usabilidade inteligente da planta', comenta um incorporador local parceiro do Radar Tá On.",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    date: "11 de Junho, 2026",
    readTime: "4 min de leitura",
    author: "Guilherme Santos"
  },
  {
    id: "im-2",
    title: "Novidades de crédito imobiliário facilitam compra da casa própria na Ceilândia e Samambaia",
    category: Category.ImoveisDF,
    summary: "Cooperativas locais e novos subsídios habitacionais do governo reduzem juros, atraindo novos compradores de primeira viagem.",
    content: "Adquirir um imóvel residencial no Distrito Federal está se tornando mais simples graças a linhas especiais de renegociação fiscal e taxas reduzidas oferecidas pela Caixa Econômica e Banco de Brasília (BRB). \n\nEm regiões dinâmicas como Ceilândia e Samambaia, a procura por condomínios fechados subiu mais de 35% nos últimos dois meses. 'Com as taxas atuais e bônus estaduais de fomento habitacional, os valores mensais de prestação caíram para patamares bem próximos ao custo médio de aluguel residencial secundário na região', explica a economista Patrícia Menezes.",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    date: "08 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Felipe Andrade"
  },
  {
    id: "im-3",
    title: "Arquitetura sustentável: Conheça os novos edifícios inteligentes do Setor Noroeste",
    category: Category.ImoveisDF,
    summary: "Novos empreendimentos trazem reutilização inteligente de água da chuva, energia com painéis solares próprios e hortas comunitárias orgânicas nos terraços.",
    content: "O Noroeste é mundialmente reconhecido por carregar as diretrizes de primeiro bairro ecológico do Brasil. Agora, novos edifícios comerciais e residenciais elevam esse patamar ao aplicarem sistemas avançados de automação predial com internet das coisas (IoT).\n\nMoradores conseguem controlar de forma centralizada o consumo de água, gerenciar energia em tempo real e monitorar áreas comuns pelo smartphone. Esse compromisso ecológico não apenas preserva a flora única do cerrado do Planalto Central, mas também reduz as taxas condominiais de manutenção em até 40% anuais.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    date: "05 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Letícia Ribeiro"
  },

  // ---------------- VEÍCULOS ----------------
  {
    id: "vei-1",
    title: "Venda de carros híbridos e elétricos bate novos recordes no Distrito Federal",
    category: Category.Veiculos,
    summary: "Graças à isenção parcial de IPVA concedida no DF e ao aumento de postos de carregamento rápido gratuitos nas quadras, a frota sustentável não para de crescer.",
    content: "Brasília tem despontado como uma das cidades mais adaptadas à revolução dos carros sustentáveis. O Detran-DF reportou novos recordes semestrais no emplacamento de veículos 100% elétricos e modelos híbridos autorrecarregáveis nas concessionárias do DF.\n\nO principal motivador do 'boom' é o benefício tributário concedido em território do DF e a excelente capilaridade urbana da cidade. Projetada originalmente em grandes eixos lineares, a topografia plana de Brasília é ideal para otimizar as baterias regenerativas desses automóveis, que rendem muito mais nas vias brasilienses.\n\n### Carregamento facilitado\n\nHoje, grandes shoppings, supermercados e hipermercados do plano piloto já oferecem dezenas de totens públicos de carregamento, permitindo que proprietários abasteçam suas baterias sem custos extras enquanto realizam suas compras diárias.",
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    date: "14 de Junho, 2026",
    readTime: "4 min de leitura",
    author: "Henrique Ramos"
  },
  {
    id: "vei-2",
    title: "Motos elétricas viram as preferidas dos entregadores de aplicativos em Brasília",
    category: Category.Veiculos,
    summary: "Baixíssimo custo por quilômetro rodado e manutenção quase nula atraem dezenas de motoristas autônomos por todo o DF.",
    content: "Com a oscilação dos preços de combustíveis fósseis, profissionais da economia compartilhada (aplicativos de entrega e transporte de passageiros) encontraram nas motos elétricas e scotters urbanas de lítio o modelo perfeito para maximizar seus ganhos diários.\n\n'Eu gastava quase trezentos reais de gasolina por semana trabalhando de moto convencional. Agora com a elétrica de recarga residencial, meu custo de eletricidade subiu apenas trinta e cinco reais por mês', calcula Vinícius de Paula, que atua na Asa Norte.",
    imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    date: "12 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Mateus Lima"
  },
  {
    id: "vei-3",
    title: "Preço de seminovos estabiliza no DF e feirões de carros em Taguatinga voltam a lotar",
    category: Category.Veiculos,
    summary: "Com mais confiança econômica, feiras de carros usados ganham força e reúnem ótimas oportunidades para compradores conscientes.",
    content: "Os finais de semana no tradicional Feirão de Veículos do Parque de Exposições de Taguatinga registraram excelente movimentação comercial ultimamente. Vendedores e compradores voltaram a negociar frente a frente após ajustes de preços de mercado que deixaram as tabelas de usados mais realistas.\n\nPara fazer um bom negócio, especialistas recomendam sempre realizar inspeção de cautelar prévia e comparar múltiplos modelos anunciados nos portais como o Tá On Classificados.",
    imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    date: "09 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Henrique Ramos"
  },

  // ---------------- GUIA DE COMPRAS ----------------
  {
    id: "gui-1",
    title: "Onde encontrar artesanato típico do cerrado de Brasília com preço justo",
    category: Category.GuiaDeCompras,
    summary: "Conheça feiras, cooperativas de artesãos artísticos e rotas alternativas que celebram a biodiversidade e a beleza icônica das flores secas típicas do cerrado.",
    content: "Receber visitas de turistas em Brasília ou presentear amigos de outros estados exige mimos emblemáticos. O artesanato local feito com sementes nativas, folhas esqueletizadas de cerrado e os famosos arranjos estruturados de flores secas do cerrado são verdadeiras joias estéticas.\n\nA Feira da Torre de TV continua sendo o polo mais conhecido, mas existem cooperativas de economia solidária fantásticas no Guará, Sobradinho e Lago Sul que vendem diretamente do produtor com preços imbatíveis. \n\nNo Guia de hoje, detalhamos como apoiar o empreendedorismo artesanal e encontrar peças lindas e exclusivas para decorar salas e escritórios.",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    date: "12 de Junho, 2026",
    readTime: "4 min de leitura",
    author: "Aline Costa"
  },
  {
    id: "gui-2",
    title: "Dicas de brechós elegantes e feiras vintage imperdíveis nas quadras da Asa Norte",
    category: Category.GuiaDeCompras,
    summary: "Seja por estilo ou sustentabilidade financeira, comprar em brechós de grife e bazares comunitários em Brasília virou a nova tendência urbana.",
    content: "A moda sustentável e circular conquistou o coração dos brasilienses. No eixão das quadras da Asa Norte (especialmente na 115 e 216 Norte), pequenos brechós seletivos oferecem roupas de grifes internacionais conceituadas, óculos retrô restaurados e acessórios artesanais de excelente qualidade.\n\n'Muitas roupas chegam com etiquetas de novas. Comprar de segunda mão agora é sinônimo de criatividade estética e consumo ambientalmente correto', garante a personal stylist Carla Mendonça.",
    imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    date: "08 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Aline Costa"
  },
  {
    id: "gui-3",
    title: "Guia de Hortifrútis Orgânicos: Onde comprar direto do produtor rural em Brasília",
    category: Category.GuiaDeCompras,
    summary: "A produção de alimentos limpos nos arredores do DF cresce, trazendo saúde e economia. Saiba quais feiras visitar nos fins de semana.",
    content: "O cinturão verde do Distrito Federal (especialmente na região de Brazlândia e São Sebastião) é responsável por produzir alimentos orgânicos certificados incríveis que abastecem mercados locais.\n\nPara quem preza por folhas frescas, morangos livres de defensivos agrícolas e tubérculos ricos em nutrientes, vale conferir as feiras livres de sábado no Jardim Botânico e nas entrequadras residenciais da Asa Sul. Preços são surpreendentemente competitivos devido à ausência de intermediários corporativos.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    date: "04 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Juliana Santos"
  },

  // ---------------- NEGÓCIOS ----------------
  {
    id: "neg-1",
    title: "MEIs em Brasília crescem 40% em relação ao ano passado, aponta faturamento regional",
    category: Category.Negocios,
    summary: "O empreendedorismo individual consolida-se como alternativa forte de renda no Distrito Federal. Áreas de consultoria e alimentação encabeçam a lista.",
    content: "Abrir o próprio negócio tornou-se uma prática estrutural em solo brasiliense. O Sebrae-DF divulgou estatísticas indicando que o volume de microempreendedores individuais ativos teve avanço recorde na região, movimentando dezenas de segmentos e impulsionando a arrecadação interna do DF.\n\nSegmentos de conveniência em marmitas saudáveis congeladas, agências independentes de marketing nas redes sociais e salões domésticos de beleza lideram os registros no portal do microempreendedor.\n\n### Apoio à formalização\n\nEsse cenário de expansão é fortalecido pelas dezenas de postos do 'Simplifica DF', iniciativa governamental que centralizou processos e reduziu a burocracia para emissão imediata de alvarás de funcionamento nas residências e salas comerciais.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    date: "14 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Roberto Costa"
  },
  {
    id: "neg-2",
    title: "Franquias de alimentação saudável ganham força em pontos estratégicos de Águas Claras",
    category: Category.Negocios,
    summary: "Adensamento urbano acelerado e rotina movimentada da comunidade local criam a oportunidade ideal para expansão de novos modelos de negócios rápidos e saudáveis.",
    content: "Águas Claras destaca-se por sua população jovem, conectada e com perfil de consumo focado em bem-estar. Empreendedores estão capitalizando em cima dessa demografia abrindo filiais licenciadas de redes de sucos prensados frios, saladas gourmet montadas e mercados com produtos sem lactose.\n\n'O retorno de investimento de lojas na proximidade das estações de metrô da região tem ocorrido em prazos menores que os estipulados originalmente pela franqueadora', comemora o franqueado Thiago Martins.",
    imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    date: "11 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Roberto Costa"
  },
  {
    id: "neg-3",
    title: "GDF anuncia novo programa de capacitação para jovens aprendizes e microempresas",
    category: Category.Negocios,
    summary: "Iniciativa conjunta oferta consultoria de gestão financeira sem custos e bolsas de qualificação técnica para modernização de comércios de bairro.",
    content: "Pequenos comerciantes de bairros residenciais (como padarias, mercados e pet shops de Santa Maria ou Paranoá) agora possuem amparo especializado para informatizarem seus fluxos de caixa e migrarem suas listagens de produtos para vendas de marketplace integradas à internet.\n\nO objetivo essencial é mitigar a taxa de mortalidade prévia de empresas de até dois anos, capacitando jovens moradores de baixa renda para atuarem como estagiários e desenvolvedores digitais nesses estabelecimentos do Distrito Federal.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3OQgnfO7h0f4-XsuiZyb4QxORBd4pPy5zFQvtK-EkWorDGb96uPZHyeX44ne9RAjem966XKPHE2oSk25W6pOxAu8p87ZhvO3vpG7nXgAUYeyyhr7SO7_lF9BFOefG9fjn5oDjD1vJDQmo6I-MZcZ-XI9MRRKIePBtMSU7hANgUcy3nUkfmJpfbJMxsp8XCChyOMra9wlqKZf0SHpT6s3s15HnrgyTAx8RqMocOxoauUXRopSogkaXFzInC-RuH-ZO5t_p72aVomg",
    date: "09 de Junho, 2026",
    readTime: "4 min de leitura",
    author: "Redação Radar Tá On"
  },

  // ---------------- SEGURANÇA DIGITAL ----------------
  {
    id: "seg-1",
    title: "Alerta de golpes por WhatsApp no DF: Como se proteger do 'golpe da falsa portabilidade'",
    category: Category.SegurancaDigital,
    summary: "Sequestro virtual de contas e falsas trocas de operadoras móveis têm ocorrido com maior frequência no WhatsApp de moradores e empresas do Distrito Federal.",
    content: "Criminosos digitais criaram novas fraudes telefônicas bem elaboradas para roubar dinheiro. Trata-se do golpe da 'falsa portabilidade telefônica', onde ligam haciando-se passar por assistentes de grandes operadoras exigindo atualizações confidenciais de dados cadastrais para evitar bloqueios da linha celular.\n\nDe posse dessas informações pessoais preciosas, eles criam perfis replicados nas redes para extorquirem parentes e parceiros profissionais da vítima.\n\n### Recomendações Críticas da Polícia Civil do DF\n\n1. **Nunca compartilhe códigos de seis dígitos** enviados via SMS para autorizações cambiais ou de portabilidade.\n2. **Valide a identidade do remetente** por ligações de voz secundárias ou canais corporativos verificados oficiais.\n3. **Habilite a autenticação de duas etapas** com PIN numérico específico direto nas configurações de segurança do próprio aplicativo de mensagens.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    date: "14 de Junho, 2026",
    readTime: "5 min de leitura",
    author: "Polícia Civil - Imprensa"
  },
  {
    id: "seg-2",
    title: "Pequenos e médios comércios do DF investem em criptografia contra ransomware",
    category: Category.SegurancaDigital,
    summary: "Após incidentes locais de sequestro de dados cadastrais, empresas buscam rotinas de backup na nuvem criptografado para preservar faturamentos.",
    content: "O sequestro de arquivos operacionais por criminosos digitais (ransomware) não é mais problema exclusivo de multinacionais bilionárias. Consultorias de segurança cibernética de Brasília registraram um aumento nos pedidos de socorro de padarias, laboratórios de exames e pequenos lojistas que tiveram seus computadores totalmente bloqueados por invasores da rede.\n\nEspecialistas reforçam que a única barreira definitiva de segurança é rodar rotinas automáticas de backup em mídias físicas isoladas e utilizar acessos corporativos estruturados com senhas únicas exclusivas e rotativas.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    date: "10 de Junho, 2026",
    readTime: "4 min de leitura",
    author: "Cláudio Magalhães"
  },
  {
    id: "seg-3",
    title: "LGPD nas Microempresas de Brasília: Como adequar o cadastro de clientes sem custos altos",
    category: Category.SegurancaDigital,
    summary: "A Lei Geral de Proteção de Dados exige cuidados no arquivamento de fichas cadastrais físicas e planilhas eletrônicas locais.",
    content: "Adequar-se à legislação federal de privacidade de dados parece desafiador na rotina de quem tem poucos funcionários e orçamento apertado. No entanto, medidas descomplicadas de segurança ajudam a mitigar multas institucionais e proteger o patrimônio de dados da empresa.\n\nApagar cadastros antigos inativos de e-mails, evitar planilhas abertas expostas compartilhadas e adicionar termos transparentes declarados de consentimento na coleta de WhatsApp do cliente são as primeiras frentes cruciais de segurança sugeridas por juristas locais.",
    imageUrl: "https://images.unsplash.com/photo-1508847154043-be12a26c86c5?auto=format&fit=crop&w=800&q=80",
    date: "06 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Cláudio Magalhães"
  },

  // ---------------- AGENDA DF ----------------
  {
    id: "age-1",
    title: "Festival de Cinema de Brasília anuncia programação oficial com foco em inclusão",
    category: Category.AgendaDF,
    summary: "Edição histórica do festival audiovisual mais longevo do Brasil traz mostras competitivas gratuitas de curtas e longas no Cine Brasília e debates temáticos de fomento.",
    content: "O Cine Brasília prepara-se para receber realizadores de cinema, roteiristas, críticos de arte e apaixonados pela sétima arte na nova edição do prestigiado Festival de Cinema de Brasília.\n\nSendo referência essencial de engajamento social, debate ético e vanguarda cultural nacional, a programação trará dezenas de sessões com curtas independentes produzidos no Distrito Federal, mostras internacionais aclamadas de documentários e debates interativos voltados ao fomento de leis estaduais de inclusão de cotas de produção.\n\nOs ingressos estarão disponíveis gratuitamente e retirados por meio de sistema online centralizado com antecedência de 24 horas das exibições, visando democratizar o acesso ao espaço histórico.",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    date: "14 de Junho, 2026",
    readTime: "4 min de leitura",
    author: "Ricardo Silveira"
  },
  {
    id: "age-2",
    title: "Eixão do Lazer no próximo domingo recebe circuito de corrida de rua infantil gratuito",
    category: Category.AgendaDF,
    summary: "Asa Norte recebe evento esportivo infantil promovido para estimular hábitos saudáveis de vida em família e a integração comunitária na capital.",
    content: "O fechamento semanal do tráfego rodoviário nos eixos de Brasília possibilita a ocupação saudável das vias públicas. No próximo domingo, o Eixão Norte (altura da 108 Norte) sediará o divertido Circuito Kids de Corrida e Ciclismo.\n\nDestinado a crianças de 3 a 12 anos, a atração é inteiramente voluntária e terá distribuição de medalhas ecológicas de participação, sucos orgânicos frescos no ponto de chegada e tendas exclusivas de pintura facial e gincanas recreativas clássicas.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
    date: "12 de Junho, 2026",
    readTime: "3 min de leitura",
    author: "Amanda Cavalcanti"
  },
  {
    id: "age-3",
    title: "Orquestra Sinfônica do Teatro Nacional faz concerto especial com clássicos de Rock no CCBB",
    category: Category.AgendaDF,
    summary: "Sob regência magistral, concerto ao ar livre une a exuberância sinfônica clássica aos maiores hinos mundiais do Rock and Roll clássico de estádio.",
    content: "Os finais de tarde do gramado do Centro Cultural Banco do Brasil (CCBB Brasília) ficarão repletos de emoção melódica nos próximos dias. A Orquestra Sinfônica do Teatro Nacional Cláudio Santoro se une a solos de guitarras elétricas locais para uma fusão fantástica.\n\nSerão executadas releituras sinfônicas inéditas de músicas consagradas das bandas Pink Floyd, Queen e Legião Urbana, aproveitando os incríveis entardeceres cor de rosa do céu de Brasília de forma exuberante e gratuita.",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    date: "08 de Junho, 2026",
    readTime: "4 min de leitura",
    author: "Amanda Cavalcanti"
  }
];

// Helper to derive readable Category url keys/slugs
export function categoryToSlug(cat: Category): string {
  switch (cat) {
    case Category.NoticiasDF: return "noticias-df";
    case Category.Empregos: return "empregos";
    case Category.ImoveisDF: return "imoveis-df";
    case Category.Veiculos: return "veiculos";
    case Category.GuiaDeCompras: return "guia-de-compras";
    case Category.Negocios: return "negocios";
    case Category.SegurancaDigital: return "seguranca-digital";
    case Category.AgendaDF: return "agenda-df";
  }
}

export function slugToCategory(slug: string): Category | undefined {
  const normalized = slug.toLowerCase();
  if (normalized === "noticias-df") return Category.NoticiasDF;
  if (normalized === "empregos") return Category.Empregos;
  if (normalized === "imoveis-df") return Category.ImoveisDF;
  if (normalized === "veiculos") return Category.Veiculos;
  if (normalized === "guia-de-compras") return Category.GuiaDeCompras;
  if (normalized === "negocios") return Category.Negocios;
  if (normalized === "seguranca-digital") return Category.SegurancaDigital;
  if (normalized === "agenda-df") return Category.AgendaDF;
  return undefined;
}

export function getCategoryIcon(cat: Category): string {
  switch (cat) {
    case Category.NoticiasDF: return "newspaper";
    case Category.Empregos: return "work";
    case Category.ImoveisDF: return "home";
    case Category.Veiculos: return "directions_car";
    case Category.GuiaDeCompras: return "local_mall";
    case Category.Negocios: return "trending_up";
    case Category.SegurancaDigital: return "security";
    case Category.AgendaDF: return "event";
  }
}
