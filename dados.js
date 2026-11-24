/*
  FICHEIRO CENTRAL DE DADOS
  Cada oportunidade escreve-se UMA vez aqui. O catálogo, os prazos e
  "Fecham em breve" são gerados automaticamente a partir desta lista.

  Campos:
    id            identificador único (sem espaços)
    titulo        nome da oportunidade
    entidade      quem a organiza
    tipo          bolsa | estagio | mobilidade | voluntariado | emprego | evento | curso
    nivel         lista: secundario | licenciatura | finalista | licenciado | mestrado | doutoramento | todos
    destino       ue | portugal | eua | franca | mundo | online
    emPortugal    true se também há vagas ou uma fase em Portugal (aparece no filtro Portugal)
    paraQuem      requisitos principais (curto)
    apoio         financiamento / o que recebes
    duracao       duração
    abre          "AAAA-MM-DD" ou "AAAA-MM-DDTHH:MM" (opcional)
    fecha         idem (opcional). Depois desta data a oportunidade fecha sozinha.
    indicativo    true se a data ainda não é oficial
    sempreAberto  true para candidaturas contínuas
    recorrente    texto a mostrar quando fecha (ex.: "Volta habitualmente em maio")
                  Sem este campo, a oportunidade desaparece quando fecha.
    quando        texto livre quando não há data exata
    link          página OFICIAL
    revisto       data em que confirmaste a informação
    artigo        ligação para um artigo meu sobre o tema (opcional)
*/

const OPORTUNIDADES = [

  /* ---------- EMPREGO E CONCURSOS NA UE ---------- */
  {
    id: "tjue-juristas-ad7",
    titulo: "Juristas-linguistas (AD7) no Tribunal de Justiça da UE",
    entidade: "EPSO · Tribunal de Justiça da UE (Luxemburgo)",
    tipo: "emprego", nivel: ["licenciado", "mestrado"], destino: "ue",
    paraQuem: "Licenciatura em Direito. Línguas-alvo: BG, DE, EL, ES, GA, MT, NL e RO (não inclui PT).",
    apoio: "Lugar permanente de funcionário da UE (grau AD7).",
    duracao: "Carreira",
    fecha: "2026-11-25T12:00+01:00",
    link: "https://selection.eu-careers.europa.eu/en/apply-lawyer-linguists-competition-ad7",
    revisto: "2026-11-21"
  },
  {
    id: "epso-juristas-pt",
    titulo: "Juristas-linguistas de língua portuguesa (EPSO/AD/432/26)",
    entidade: "EPSO",
    tipo: "emprego", nivel: ["licenciado", "mestrado"], destino: "ue",
    paraQuem: "Licenciatura em Direito. Inclui o português (e também ES, FI, GA, IT, LV, MT e SV).",
    apoio: "Lugar permanente de funcionário da UE.",
    duracao: "Carreira",
    abre: "2026-12-09", fecha: "2027-01-20", indicativo: true,
    link: "https://selection.eu-careers.europa.eu/en/upcoming-selection-procedures",
    revisto: "2026-11-21"
  },
  {
    id: "epso-lawyers-1",
    titulo: 'Juristas "Lawyers 1" (AD 7), 4 áreas do Direito',
    entidade: "EPSO",
    tipo: "emprego", nivel: ["licenciado", "mestrado"], destino: "ue",
    paraQuem: "Formação em Direito.",
    apoio: "Lugar permanente de funcionário da UE.",
    duracao: "Carreira",
    abre: "2027-01-01", indicativo: true, quando: "Previsto para janeiro de 2027",
    link: "https://selection.eu-careers.europa.eu/en/upcoming-selection-procedures",
    revisto: "2026-11-21"
  },
  {
    id: "epso-lawyers-2",
    titulo: 'Juristas "Lawyers 2" (AD), 4 áreas do Direito',
    entidade: "EPSO",
    tipo: "emprego", nivel: ["licenciado", "mestrado"], destino: "ue",
    paraQuem: "Formação em Direito.",
    apoio: "Lugar permanente de funcionário da UE.",
    duracao: "Carreira",
    abre: "2027-02-01", indicativo: true, quando: "Previsto para fevereiro de 2027",
    link: "https://selection.eu-careers.europa.eu/en/upcoming-selection-procedures",
    revisto: "2026-11-21"
  },
  {
    id: "cast", emPortugal: true,
    titulo: "Agentes contratuais (CAST permanente)",
    entidade: "EPSO · instituições e agências da UE",
    tipo: "emprego", nivel: ["finalista", "licenciado", "mestrado"], destino: "ue",
    paraQuem: "Perfis de administração, comunicação, finanças, direito, informática, tradução. O grupo de funções IV pede pelo menos 3 anos de estudos universitários concluídos.",
    apoio: "Contrato remunerado numa instituição ou agência da UE (incluindo Lisboa).",
    duracao: "Contratos temporários renováveis",
    sempreAberto: true,
    link: "https://selection.eu-careers.europa.eu/en/contract-staff-selection-procedures-always-open-registration",
    revisto: "2026-11-21"
  },
  {
    id: "temporarios-ue", emPortugal: true,
    titulo: "Empregos temporários e de agente contratual",
    entidade: "Instituições e agências da UE",
    tipo: "emprego", nivel: ["licenciado", "mestrado", "doutoramento"], destino: "ue",
    paraQuem: "Varia por anúncio. Há vagas em agências com sede em Lisboa (EMSA, EUDA).",
    apoio: "Contrato remunerado.",
    duracao: "Varia",
    sempreAberto: true,
    link: "https://eu-careers.europa.eu/jobs_en",
    revisto: "2026-11-21"
  },

  /* ---------- ESTÁGIOS ---------- */
  {
    id: "tce-estagios",
    titulo: "Estágios em inteligência artificial no Tribunal de Contas Europeu",
    entidade: "Tribunal de Contas Europeu (Luxemburgo)",
    tipo: "estagio", nivel: ["licenciado", "mestrado"], destino: "ue",
    paraQuem: "Nacionalidade de um país da UE e diploma de pelo menos três anos em inteligência artificial, informática, ciência de dados ou área próxima. Inglês C1.",
    apoio: "2500 € por mês",
    duracao: "6 meses (sessões de 1 de abril e 1 de outubro)",
    fecha: "2026-11-30T23:59",
    recorrente: "Duas sessões por ano: confirma a próxima no site oficial",
    link: "https://www.eca.europa.eu/en/traineeships",
    revisto: "2026-10-31"
  },
  {
    id: "eurocities-estagio",
    titulo: "Estágio em políticas e advocacy na Eurocities",
    entidade: "Eurocities (Bruxelas)",
    tipo: "estagio", nivel: ["licenciatura", "finalista", "mestrado"], destino: "ue",
    paraQuem: "Estudantes de licenciatura ou mestrado inscritos durante todo o estágio, em ciência política, assuntos europeus, direito, economia, estudos urbanos ou área próxima. Inglês muito bom. Início em fevereiro de 2027.",
    apoio: "É obrigatório ter uma bolsa (por exemplo, Erasmus+) e um acordo com a tua universidade. A Eurocities reembolsa os transportes públicos na Bélgica.",
    duracao: "6 meses",
    fecha: "2026-11-26T17:00+01:00",
    link: "https://eurocities.eu/policy-and-advocacy-intern/",
    revisto: "2026-11-24"
  },
  {
    id: "esa-relacoes-externas",
    titulo: "Estágio no Departamento de Relações Externas da Agência Espacial Europeia (ESA)",
    entidade: "ESA (Paris)",
    tipo: "estagio", nivel: ["mestrado"], destino: "ue",
    paraQuem: "Estudantes de mestrado, de preferência no último ou penúltimo ano, inscritos durante todo o estágio. Inglês ou francês. Aberto a nacionais de Portugal e de outros Estados membros da ESA.",
    apoio: "Consulta as condições na página de estágios da ESA.",
    duracao: "3 a 6 meses, com início a partir de fevereiro de 2027",
    fecha: "2026-11-30T23:59+01:00",
    link: "https://jobs.esa.int/job/Paris-Intern-in-the-External-Relations-Department/1452875233/",
    revisto: "2026-11-24"
  },
  {
    id: "euaa-estagio",
    titulo: "Estágio na Agência da UE para o Asilo (EUAA)",
    entidade: "EUAA (Malta)",
    tipo: "estagio", nivel: ["finalista", "licenciado", "mestrado"], destino: "ue",
    paraQuem: "Primeiro ciclo do ensino superior concluído, ou pelo menos três anos de estudos concluídos antes do início do estágio. Início em março ou abril de 2027.",
    apoio: "1500 € por mês",
    duracao: "Até 6 meses",
    fecha: "2026-12-01T12:00+01:00",
    link: "https://www.euaa.europa.eu/careers/traineeship",
    revisto: "2026-11-21"
  },
  {
    id: "conselho-estagios",
    titulo: "Estágios no Conselho da UE",
    entidade: "Secretariado-Geral do Conselho (Bruxelas)",
    tipo: "estagio", nivel: ["licenciado", "mestrado"], destino: "ue",
    paraQuem: "Cidadania da UE, licenciatura, inglês ou francês muito bom e outra língua da UE, sem experiência anterior noutra instituição da UE.",
    apoio: "Estágio remunerado, com subsídios.",
    duracao: "5 meses (set. 2027 a jan. 2028)",
    abre: "2027-02-08", quando: "Candidaturas a partir de 8 de fevereiro de 2027, em fevereiro e março",
    link: "https://www.consilium.europa.eu/trainee",
    revisto: "2026-11-22"
  },
  {
    id: "blue-book",
    titulo: "Estágio Blue Book (Comissão Europeia)",
    entidade: "Comissão Europeia e outros organismos da UE",
    tipo: "estagio", nivel: ["licenciado", "mestrado"], destino: "ue",
    paraQuem: "Licenciatura de pelo menos 3 anos concluída, com diploma na candidatura. Inglês, francês ou alemão em C1 e outra língua da UE em B2. Máximo de 6 semanas de experiência anterior na UE.",
    apoio: "Cerca de 1 538 € por mês (valor de 2026)",
    duracao: "5 meses (1 out. 2027 a 29 fev. 2028)",
    abre: "2027-02-15T10:00+01:00", fecha: "2027-03-12T10:00+01:00",
    recorrente: "Duas candidaturas por ano: fevereiro-março e julho-setembro",
    link: "https://traineeships.ec.europa.eu/",
    artigo: "https://www.linkedin.com/pulse/european-commissions-blue-book-how-access-traineeship-daniela-barreto-fioke/",
    revisto: "2026-11-22"
  },
  {
    id: "schuman",
    titulo: "Estágios Schuman no Parlamento Europeu",
    entidade: "Parlamento Europeu",
    tipo: "estagio", nivel: ["licenciado", "mestrado"], destino: "ue",
    paraQuem: "Mais de 18 anos, nacionalidade de um país da UE, diploma universitário completo e requisitos de línguas. Não ter trabalhado nem estagiado mais de dois meses numa instituição da UE.",
    apoio: "Subsídio mensal (varia com o local de colocação).",
    duracao: "5 meses",
    abre: "2027-05-01", fecha: "2027-05-31T23:59+02:00",
    recorrente: "Duas candidaturas por ano: em maio (estágio de outubro a fevereiro) e em outubro (estágio de março a julho)",
    link: "https://ep-stages.gestmax.eu/website/application-informations",
    revisto: "2026-11-22"
  },
  {
    id: "jpd",
    titulo: "Junior Professionals in Delegation (JPD)",
    entidade: "Serviço Europeu para a Ação Externa",
    tipo: "estagio", nivel: ["mestrado"], destino: "mundo",
    paraQuem: "Nacionais da UE com mestrado, inglês e/ou francês excelente. Candidatura através da autoridade nacional.",
    apoio: "2500 € por mês, mais 1700 € por mês para alojamento e contribuições para viagem e seguro",
    duracao: "12 meses, renováveis por mais 12",
    quando: "Convocatória a cada dois anos. A última, para a ronda de 2026 a 2028, esteve aberta em abril de 2025.",
    link: "https://www.eeas.europa.eu/eeas/call-expression-interest-junior-professionals-delegation-jpd-programme-2026-2028_en",
    revisto: "2026-11-22"
  },
  {
    id: "agencias-estagios", emPortugal: true,
    titulo: "Estágios em agências da UE (BCE, EBA, ECDC e outras)",
    entidade: "Agências e organismos da UE",
    tipo: "estagio", nivel: ["finalista", "licenciado", "mestrado"], destino: "ue",
    paraQuem: "Varia por agência.",
    apoio: "Geralmente remunerados.",
    duracao: "Varia: EMA 10 meses, EUDA até 11, EASA 12, Centro de Tradução 3 a 12 meses",
    sempreAberto: true,
    link: "https://eu-careers.europa.eu/en/job-opportunities/traineeships?institution=All",
    artigo: "https://www.linkedin.com/pulse/traineeships-eu-beyond-brussels-map-agencies-many-students-barreto-bpwyc/",
    revisto: "2026-11-21"
  },
  {
    id: "inov-contacto", emPortugal: true,
    titulo: "INOV Contacto: estágios internacionais pagos",
    entidade: "AICEP",
    tipo: "estagio", nivel: ["licenciado", "mestrado"], destino: "mundo",
    paraQuem: "Licenciatura ou mestrado integrado concluído, residência legal em Portugal, até 29 anos. Só se participa uma vez.",
    apoio: "Bolsa mensal (2,76 × IAS) na fase em Portugal; viagem, alojamento e seguro na fase no estrangeiro.",
    duracao: "Varia por edição",
    quando: "As candidaturas da 29.ª edição abriram em setembro de 2026. A próxima edição é anunciada no site oficial.",
    link: "https://portugalglobal.pt/academia-aicep/inov-contacto/faq-estagiarios/",
    revisto: "2026-11-22"
  },
  {
    id: "onu-estagios",
    titulo: "Estágios nas Nações Unidas",
    entidade: "Secretariado da ONU e agências",
    tipo: "estagio", nivel: ["finalista", "licenciado", "mestrado"], destino: "mundo",
    paraQuem: "Estudantes ou recém-licenciados. Vagas publicadas ao longo do ano.",
    apoio: "Varia por agência.",
    duracao: "2 a 6 meses",
    sempreAberto: true,
    link: "https://careers.un.org/",
    revisto: "2026-11-22"
  },

  /* ---------- BOLSAS DE ESTUDO ---------- */
  {
    id: "eiffel",
    titulo: "Bolsas France Excellence Eiffel",
    entidade: "Ministério dos Negócios Estrangeiros de França · Campus France",
    tipo: "bolsa", nivel: ["licenciado", "mestrado"], destino: "franca",
    paraQuem: "Estudantes estrangeiros até 29 anos (mestrado) ou 35 anos (doutoramento). Só a universidade francesa pode apresentar a candidatura. Confirma a elegibilidade de cidadãos da UE nas regras.",
    apoio: "Bolsa mensal e outras despesas (ver regras).",
    duracao: "12 a 24 meses (mestrado)",
    quando: "A universidade envia a candidatura à Campus France até 6 de janeiro de 2027. Cada universidade tem um prazo interno anterior, por isso contacta-a já.",
    link: "https://www.campusfrance.org/en/france-excellence-eiffel-scholarship-program",
    revisto: "2026-11-22"
  },
  {
    id: "erasmus-mundus",
    titulo: "Mestrados Erasmus Mundus",
    entidade: "Comissão Europeia (EACEA)",
    tipo: "bolsa", nivel: ["finalista", "licenciado"], destino: "ue",
    paraQuem: "Licenciados de todo o mundo. Cada mestrado tem as suas regras e datas, e nem todos dão bolsa.",
    apoio: "1400 € por mês, até 24 meses",
    duracao: "1 a 2 anos",
    quando: "A maioria dos mestrados aceita candidaturas entre outubro e janeiro",
    link: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
    revisto: "2026-11-22"
  },
  {
    id: "fulbright",
    titulo: "Bolsas Fulbright para estudantes portugueses",
    entidade: "Comissão Fulbright Portugal (com a FCT e outros parceiros)",
    tipo: "bolsa", nivel: ["licenciado", "mestrado", "doutoramento"], destino: "eua",
    paraQuem: "Estudantes, investigadores e professores portugueses. Há bolsas para mestrado, doutoramento e investigação.",
    apoio: "Varia por bolsa.",
    duracao: "Varia por bolsa",
    quando: "Concurso anual: confirma as datas no site oficial.",
    link: "https://www.fulbright.pt/",
    revisto: "2026-11-22"
  },
  {
    id: "la-caixa",
    titulo: 'Bolsas "la Caixa" de pós-graduação no estrangeiro',
    entidade: 'Fundação "la Caixa"',
    tipo: "bolsa", nivel: ["finalista", "licenciado"], destino: "mundo",
    paraQuem: "Nacionalidade portuguesa ou espanhola. São 100 bolsas para pós-graduação em universidades do Espaço Europeu de Educação Superior, da América do Norte ou da Ásia-Pacífico.",
    apoio: "Propinas, viagem e subsídio mensal (ver regras do concurso).",
    duracao: "1 a 2 anos",
    fecha: "2027-01-21T14:00+01:00",
    recorrente: "Concurso anual",
    link: "https://fundacaolacaixa.pt/pt/bolsas-pos-graduacao-no-estrangeiro",
    revisto: "2026-11-22"
  },

  /* ---------- MOBILIDADE ---------- */
  {
    id: "erasmus-plus",
    titulo: "Erasmus+: estudar ou estagiar noutro país",
    entidade: "Comissão Europeia · Gabinete de Relações Internacionais da tua universidade",
    tipo: "mobilidade", nivel: ["licenciatura", "finalista", "mestrado", "doutoramento"], destino: "ue",
    paraQuem: "Estudantes inscritos no ensino superior. Também há estágios Erasmus+ para recém-licenciados (até 12 meses após o curso).",
    apoio: "Bolsa mensal conforme o país de destino.",
    duracao: "2 a 12 meses",
    quando: "Candidatura através da tua universidade (habitualmente no início do ano civil)",
    link: "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students",
    revisto: "2026-11-22"
  },
  {
    id: "discovereu",
    titulo: "DiscoverEU: passe de comboio para jovens de 18 anos",
    entidade: "Comissão Europeia",
    tipo: "mobilidade", nivel: ["secundario", "licenciatura"], destino: "ue",
    paraQuem: "Jovens com 18 anos, cidadãos ou residentes na UE. É preciso responder a um questionário.",
    apoio: "Passe de viagem (sobretudo comboio) e cartão de descontos.",
    duracao: "Até 30 dias de viagem",
    quando: "Habitualmente duas rondas por ano: confirma as datas no site oficial",
    link: "https://youth.europa.eu/discoverEU",
    revisto: "2026-11-22"
  },

  /* ---------- VOLUNTARIADO ---------- */
  {
    id: "corpo-solidariedade",
    titulo: "Corpo Europeu de Solidariedade",
    entidade: "Comissão Europeia",
    tipo: "voluntariado", nivel: ["todos"], destino: "ue",
    paraQuem: "Jovens dos 18 aos 30 anos.",
    apoio: "Viagem, alojamento, alimentação, seguro e dinheiro de bolso.",
    duracao: "2 semanas a 12 meses",
    sempreAberto: true,
    link: "https://youth.europa.eu/solidarity_pt",
    revisto: "2026-11-22"
  },
  {
    id: "unv",
    titulo: "Voluntários das Nações Unidas (UNV)",
    entidade: "Programa de Voluntários da ONU",
    tipo: "voluntariado", nivel: ["licenciado", "mestrado"], destino: "mundo",
    paraQuem: "Há missões presenciais e online, incluindo missões para jovens (UN Youth Volunteers).",
    apoio: "Subsídio de subsistência nas missões presenciais.",
    duracao: "Varia",
    sempreAberto: true,
    link: "https://www.unv.org/",
    revisto: "2026-11-22"
  },

  /* ---------- EVENTOS E PROGRAMAS PARA JOVENS ---------- */
  {
    id: "eye-2027",
    titulo: "European Youth Event 2027 (Estrasburgo)",
    entidade: "Parlamento Europeu",
    tipo: "evento", nivel: ["todos"], destino: "ue",
    paraQuem: "Jovens de toda a Europa. O evento é a 18 e 19 de junho de 2027, em Estrasburgo.",
    apoio: "Participação gratuita. Viagem e alojamento por tua conta (a chamada de apoio financeiro para grupos fechou a 13 de novembro de 2026).",
    duracao: "2 dias",
    quando: "Inscrições anunciadas no site oficial",
    link: "https://european-youth-event.europarl.europa.eu/en",
    revisto: "2026-11-22"
  },
  {
    id: "embaixadores-eu-careers",
    titulo: "Embaixador/a EU Careers 2027/28",
    entidade: "EPSO",
    tipo: "evento", nivel: ["licenciatura", "finalista", "mestrado"], destino: "portugal",
    paraQuem: "Estudantes de universidades participantes. Formação obrigatória em outubro de 2027; mandato de outubro de 2027 a setembro de 2028.",
    apoio: "Formação da EPSO e experiência de comunicação institucional.",
    duracao: "1 ano letivo",
    indicativo: true, quando: "Seleção prevista para fevereiro e março de 2027",
    link: "https://selection.eu-careers.europa.eu/job-opportunities/eu-careers-student-ambassadors/participating-unversities",
    revisto: "2026-11-21"
  },

  /* ---------- CURSOS GRATUITOS ---------- */
  {
    id: "eu-academy",
    titulo: "EU Academy: cursos gratuitos da UE",
    entidade: "Comissão Europeia",
    tipo: "curso", nivel: ["todos"], destino: "online",
    paraQuem: "Qualquer pessoa. Cursos sobre políticas da UE, línguas, digital e mais. A Comissão Europeia desativou temporariamente o acesso público à plataforma devido a um incidente de cibersegurança.",
    apoio: "Gratuito, com certificados em muitos cursos.",
    duracao: "Ao teu ritmo",
    sempreAberto: true, indisponivel: true,
    link: "https://academy.europa.eu/",
    revisto: "2026-11-24"
  },
  {
    id: "epso-preparacao",
    titulo: "Preparação para os testes da EPSO",
    entidade: "EPSO",
    tipo: "curso", nivel: ["todos"], destino: "online",
    paraQuem: "Quem quer preparar um concurso ou seleção de agentes contratuais.",
    apoio: "Testes de exemplo, vídeos tutoriais e o assistente de IA Epsy, tudo gratuito.",
    duracao: "Ao teu ritmo",
    sempreAberto: true,
    link: "https://selection.eu-careers.europa.eu/en/selection-procedure/epso-tests",
    revisto: "2026-11-21"
  }
];

/* Concursos EPSO previstos (indicativos). Aparecem em "Carreiras na UE". */
const EPSO_PREVISTOS = [
  { mes: "2027-03", texto: "AST: assistentes de trabalho parlamentar", en: "AST: assistants in parliamentary work" },
  { mes: "2027-04", texto: "AD: segurança, defesa e assuntos internacionais", en: "AD: security, defence and international affairs" },
  { mes: "2027-05", texto: "AST: revisores e editores (Luxemburgo)", en: "AST: proofreaders and editors (Luxembourg)" },
  { mes: "2027-06", texto: "AD: tradutores, incluindo português", en: "AD: translators, including Portuguese" },
  { mes: "2027-07", texto: "AD: juristas-linguistas", en: "AD: lawyer-linguists" },
  { mes: "2027-09", texto: "AD: gestão financeira", en: "AD: financial management" },
  { mes: "2027-11", texto: "AST: informática (TIC)", en: "AST: ICT" }
];

/* Textos em inglês britânico de cada oportunidade (pelo id). Só é preciso pôr os campos
   que mudam; o que faltar aparece em português. */
const EN_DADOS = {
  "tjue-juristas-ad7": { titulo: "Lawyer-linguists (AD7) at the Court of Justice of the EU", entidade: "EPSO · Court of Justice of the EU (Luxembourg)", paraQuem: "Law degree. Target languages: BG, DE, EL, ES, GA, MT, NL and RO (Portuguese is not included).", apoio: "Permanent post as an EU official (grade AD7).", duracao: "Career" },
  "epso-juristas-pt": { titulo: "Lawyer-linguists including Portuguese (EPSO/AD/432/26)", paraQuem: "Law degree. Includes Portuguese (as well as ES, FI, GA, IT, LV, MT and SV).", apoio: "Permanent post as an EU official.", duracao: "Career" },
  "epso-lawyers-1": { titulo: 'EPSO "Lawyers 1" competition (AD 7), 4 fields of law', paraQuem: "Background in law.", apoio: "Permanent post as an EU official.", duracao: "Career", quando: "Expected in January 2027" },
  "epso-lawyers-2": { titulo: 'EPSO "Lawyers 2" competition (AD), 4 fields of law', paraQuem: "Background in law.", apoio: "Permanent post as an EU official.", duracao: "Career", quando: "Expected in February 2027" },
  "cast": { titulo: "Contract staff (CAST Permanent)", entidade: "EPSO · EU institutions and agencies", paraQuem: "Profiles in administration, communication, finance, law, IT and translation. Function group IV requires at least three years of completed university studies.", apoio: "Paid contract at an EU institution or agency (including in Lisbon).", duracao: "Renewable fixed term contracts" },
  "temporarios-ue": { titulo: "Temporary and contract staff jobs", entidade: "EU institutions and agencies", paraQuem: "Varies by vacancy. There are posts at agencies based in Lisbon (EMSA, EUDA).", apoio: "Paid contract.", duracao: "Varies" },
  "tce-estagios": { titulo: "Artificial intelligence traineeships at the European Court of Auditors", entidade: "European Court of Auditors (Luxembourg)", paraQuem: "Nationality of an EU country and a degree of at least three years in artificial intelligence, computer science, data science or a closely related field. English at C1.", apoio: "€2,500 a month", duracao: "6 months (sessions starting 1 April and 1 October)", recorrente: "Two sessions a year: check the next one on the official website" },
  "eurocities-estagio": { titulo: "Policy and advocacy traineeship at Eurocities", entidade: "Eurocities (Brussels)", paraQuem: "Bachelor's or master's students enrolled for the whole traineeship, in political science, EU affairs, law, economics, urban studies or a related field. Excellent English. Starts in February 2027.", apoio: "You must have a grant (for example, Erasmus+) and an agreement with your university. Eurocities reimburses public transport in Belgium.", duracao: "6 months" },
  "esa-relacoes-externas": { titulo: "Traineeship in the External Relations Department of the European Space Agency (ESA)", entidade: "ESA (Paris)", paraQuem: "Master's students, preferably in their final or penultimate year, enrolled for the whole traineeship. English or French. Open to nationals of Portugal and other ESA Member States.", apoio: "See the conditions on the ESA internships page.", duracao: "3 to 6 months, starting from February 2027" },
  "euaa-estagio": { titulo: "Traineeship at the EU Agency for Asylum (EUAA)", paraQuem: "First cycle of higher education completed, or at least three years of studies completed before the traineeship starts. Starts in March or April 2027.", apoio: "€1,500 a month", duracao: "Up to 6 months" },
  "conselho-estagios": { titulo: "Traineeships at the Council of the EU", entidade: "General Secretariat of the Council (Brussels)", paraQuem: "EU citizenship, a bachelor's degree, very good English or French and another EU language, and no previous work experience at another EU institution.", apoio: "Paid traineeship with allowances.", duracao: "5 months (September 2027 to January 2028)", quando: "Applications from 8 February 2027, in February and March" },
  "blue-book": { titulo: "Blue Book traineeship (European Commission)", entidade: "European Commission and other EU bodies", paraQuem: "A completed bachelor's degree of at least 3 years, with the diploma in hand when you apply. English, French or German at C1 and another EU language at B2. No more than 6 weeks of previous experience at the EU institutions.", apoio: "Around €1,538 a month (2026 figure)", duracao: "5 months (1 October 2027 to 29 February 2028)", recorrente: "Two application rounds a year: February to March and July to September" },
  "schuman": { titulo: "Schuman traineeships at the European Parliament", entidade: "European Parliament", paraQuem: "Aged 18 or over, nationality of an EU country, a full university degree and the language requirements. You must not have worked or done a traineeship for more than two months at an EU institution.", apoio: "Monthly allowance (varies with the place of assignment).", duracao: "5 months", recorrente: "Two application rounds a year: in May (traineeship from October to February) and in October (traineeship from March to July)" },
  "jpd": { entidade: "European External Action Service", paraQuem: "EU nationals with a master's degree and excellent English and/or French. Applications go through the national authority.", apoio: "€2,500 a month, plus €1,700 a month for accommodation and contributions towards travel and insurance", duracao: "12 months, renewable for another 12", quando: "A call every two years. The last one, for the 2026 to 2028 round, was open in April 2025." },
  "agencias-estagios": { titulo: "Traineeships at EU agencies (ECB, EBA, ECDC and others)", entidade: "EU agencies and bodies", paraQuem: "Varies by agency.", apoio: "Usually paid.", duracao: "Varies: EMA 10 months, EUDA up to 11, EASA 12, Translation Centre 3 to 12 months" },
  "inov-contacto": { titulo: "INOV Contacto: paid international traineeships", paraQuem: "A completed bachelor's or integrated master's degree, legal residence in Portugal and aged up to 29. You can only take part once.", apoio: "Monthly grant (2.76 × IAS) during the phase in Portugal; travel, accommodation and insurance during the phase abroad.", duracao: "Varies by edition", quando: "Applications for the 29th edition opened in September 2026. The next edition is announced on the official website." },
  "onu-estagios": { titulo: "United Nations internships", entidade: "UN Secretariat and agencies", paraQuem: "Students or recent graduates. Vacancies are published throughout the year.", apoio: "Varies by agency.", duracao: "2 to 6 months" },
  "eiffel": { titulo: "France Excellence Eiffel scholarships", entidade: "French Ministry for Europe and Foreign Affairs · Campus France", paraQuem: "International students aged up to 29 (master's) or 35 (PhD). Only the French university can submit the application. Check the rules to see whether EU citizens are eligible.", apoio: "Monthly allowance and other costs (see the rules).", duracao: "12 to 24 months (master's)", quando: "The university sends the application to Campus France by 6 January 2027. Each university has an earlier internal deadline, so contact yours now." },
  "erasmus-mundus": { titulo: "Erasmus Mundus Joint Masters", entidade: "European Commission (EACEA)", paraQuem: "Graduates from all over the world. Each master's has its own rules and dates, and not all of them offer scholarships.", apoio: "€1,400 a month, for up to 24 months", duracao: "1 to 2 years", quando: "Most master's programmes accept applications between October and January" },
  "fulbright": { titulo: "Fulbright scholarships for Portuguese students", entidade: "Fulbright Commission Portugal (with FCT and other partners)", paraQuem: "Portuguese students, researchers and teachers. There are scholarships for master's degrees, PhDs and research.", apoio: "Varies by scholarship.", duracao: "Varies by scholarship", quando: "Annual call: check the dates on the official website." },
  "la-caixa": { titulo: '"la Caixa" scholarships for postgraduate studies abroad', entidade: '"la Caixa" Foundation', paraQuem: "Portuguese or Spanish nationality. There are 100 scholarships for postgraduate studies at universities in the European Higher Education Area, North America or Asia Pacific.", apoio: "Tuition fees, travel and a monthly allowance (see the call rules).", duracao: "1 to 2 years", recorrente: "Annual call" },
  "erasmus-plus": { titulo: "Erasmus+: study or do a traineeship in another country", entidade: "European Commission · your university's International Relations Office", paraQuem: "Students enrolled in higher education. There are also Erasmus+ traineeships for recent graduates (up to 12 months after finishing your degree).", apoio: "Monthly grant depending on the destination country.", duracao: "2 to 12 months", quando: "Apply through your university (usually at the start of the calendar year)" },
  "discovereu": { titulo: "DiscoverEU: a travel pass for young people aged 18", entidade: "European Commission", paraQuem: "Young people aged 18 who are EU citizens or residents. You have to answer a short quiz.", apoio: "A travel pass (mainly by train) and a discount card.", duracao: "Up to 30 days of travel", quando: "Usually two rounds a year: check the dates on the official website" },
  "corpo-solidariedade": { titulo: "European Solidarity Corps", entidade: "European Commission", paraQuem: "Young people aged 18 to 30.", apoio: "Travel, accommodation, food, insurance and pocket money.", duracao: "2 weeks to 12 months" },
  "unv": { titulo: "United Nations Volunteers (UNV)", entidade: "UN Volunteers programme", paraQuem: "There are onsite and online assignments, including assignments for young people (UN Youth Volunteers).", apoio: "Living allowance for onsite assignments.", duracao: "Varies" },
  "eye-2027": { titulo: "European Youth Event 2027 (Strasbourg)", entidade: "European Parliament", paraQuem: "Young people from all over Europe. The event takes place on 18 and 19 June 2027 in Strasbourg.", apoio: "Free to attend. Travel and accommodation are at your own expense (the call for financial support for groups closed on 13 November 2026).", duracao: "2 days", quando: "Registration will be announced on the official website" },
  "embaixadores-eu-careers": { titulo: "EU Careers Ambassador 2027/28", paraQuem: "Students at participating universities. Compulsory training in October 2027; the term runs from October 2027 to September 2028.", apoio: "Training from EPSO and experience in institutional communication.", duracao: "1 academic year", quando: "Selection expected in February and March 2027" },
  "eu-academy": { titulo: "EU Academy: free EU courses", entidade: "European Commission", paraQuem: "Anyone. Courses on EU policies, languages, digital skills and more. The European Commission has temporarily disabled public access to the platform following a cybersecurity incident.", apoio: "Free, with certificates for many courses.", duracao: "At your own pace" },
  "epso-preparacao": { titulo: "Preparing for EPSO tests", paraQuem: "Anyone preparing for a competition or a contract staff selection.", apoio: "Sample tests, tutorial videos and the Epsy AI assistant, all free of charge.", duracao: "At your own pace" }
};

const ULTIMA_ATUALIZACAO = "2026-11-24";
