/* Tudo o que se vê no site é gerado a partir de dados.js.
   As candidaturas fecham sozinhas: depois da data "fecha" saem dos prazos
   e de "Fecham em breve"; no catálogo só ficam se tiverem "recorrente".
   Idiomas: português (pt) e inglês britânico (en). Os textos fixos em inglês
   estão em UI_EN; os textos das oportunidades em inglês estão em EN_DADOS (dados.js). */
(function () {
  const AGORA = new Date();
  const DIA = 86400000;

  /* ---------- Idioma ---------- */
  let LANG = "pt";
  try {
    const q = new URLSearchParams(location.search).get("lang");
    LANG = q === "en" || q === "pt" ? q : (localStorage.getItem("lang") || "pt");
  } catch (e) { /* sem armazenamento: fica em português */ }
  if (LANG !== "en") LANG = "pt";

  const T = {
    pt: {
      tipos: { bolsa: "Bolsas de estudo", estagio: "Estágios", mobilidade: "Mobilidade", voluntariado: "Voluntariado", emprego: "Emprego na UE", evento: "Eventos e programas", curso: "Cursos gratuitos" },
      tipoSing: { bolsa: "Bolsa", estagio: "Estágio", mobilidade: "Mobilidade", voluntariado: "Voluntariado", emprego: "Emprego na UE", evento: "Evento / programa", curso: "Curso gratuito" },
      todas: "Todas", indisp: "Temporariamente indisponível", sempre: "Sempre aberto", encerrado: "Encerrado", previsto: "Previsto: ", abreA: "Abre a ",
      fechaHoje: "Fecha hoje ou amanhã", fechaEm: (d) => `Fecha em ${d} dias`, abertoAte: "Aberto até ", verDatas: "Ver datas",
      nadaBreve: "Nada a fechar nos próximos 30 dias. Espreita os prazos mais abaixo.", hojeAmanha: "Hoje/amanhã", dias: (d) => d + " dias", ate: "Até ",
      contagem: (n) => n === 1 ? "1 oportunidade" : `${n} oportunidades`,
      artigo: "Lê o meu artigo sobre este tema ↗", paraQuem: "Para quem", apoio: "O que recebes", duracao: "Duração", quando: "Quando", oficial: "Página oficial ↗",
      semRes: "Não há oportunidades com esta combinação de filtros.", verTodas: "Ver todas as oportunidades",
      calPrev: "Previsto", calAbre: "Abre", calUltimo: "Último dia", calMes: "Durante o mês", badge: "previsto",
      realidade: "Realidade", mito: "Mito", certo: "Certo! ", errado: "Não exatamente. ",
      locale: "pt-PT"
    },
    en: {
      tipos: { bolsa: "Scholarships", estagio: "Traineeships", mobilidade: "Mobility", voluntariado: "Volunteering", emprego: "EU jobs", evento: "Events and programmes", curso: "Free courses" },
      tipoSing: { bolsa: "Scholarship", estagio: "Traineeship", mobilidade: "Mobility", voluntariado: "Volunteering", emprego: "EU job", evento: "Event / programme", curso: "Free course" },
      todas: "All", indisp: "Temporarily unavailable", sempre: "Always open", encerrado: "Closed", previsto: "Expected: ", abreA: "Opens on ",
      fechaHoje: "Closes today or tomorrow", fechaEm: (d) => `Closes in ${d} days`, abertoAte: "Open until ", verDatas: "See dates",
      nadaBreve: "Nothing closes in the next 30 days. Have a look at the deadlines further down.", hojeAmanha: "Today/tomorrow", dias: (d) => d + " days", ate: "Until ",
      contagem: (n) => n === 1 ? "1 opportunity" : `${n} opportunities`,
      artigo: "Read my article on this topic ↗", paraQuem: "Who it is for", apoio: "What you get", duracao: "Duration", quando: "When", oficial: "Official page ↗",
      semRes: "There are no opportunities matching these filters.", verTodas: "See all opportunities",
      calPrev: "Expected", calAbre: "Opens", calUltimo: "Last day", calMes: "During the month", badge: "expected",
      realidade: "Reality", mito: "Myth", certo: "Correct! ", errado: "Not quite. ",
      locale: "en-GB"
    }
  };

  const UI_EN = {
    "saltar": "Skip to content",
    "nav.inicio": "Home", "nav.oport": "Opportunities", "nav.prazos": "Deadlines", "nav.carr": "EU careers", "nav.sobre": "About me",
    "hero.sobre": "A guide for students in Madeira and Portugal",
    "hero.h1": "Scholarships, traineeships and opportunities to build an international career",
    "hero.lead": "I bring together scholarships, traineeships, volunteering and careers in the European Union and the United Nations in one place, always with a link to the official source.",
    "hero.b1": "See opportunities", "hero.b2": "See deadlines",
    "breve.h": "Closing soon",
    "comecar.h": "Where to start?",
    "comecar.p": "Choose your profile and see the opportunities that make sense for you right now.",
    "perfil.1": "<strong>I am still studying</strong><span>Erasmus+, DiscoverEU, volunteering, events</span>",
    "perfil.2": "<strong>I am in my final year</strong><span>Traineeships at agencies, Erasmus Mundus, master's scholarships</span>",
    "perfil.3": "<strong>I already have a degree</strong><span>Blue Book, Schuman, Council, INOV Contacto</span>",
    "perfil.4": "<strong>I have a master's degree</strong><span>JPD, EPSO competitions, PhD</span>",
    "perfil.5": "<strong>I want to work now</strong><span>Contract staff and temporary jobs in the EU</span>",
    "oport.h": "Opportunities",
    "oport.p": "Filter by type, level and destination. Each card takes you to the official page, where you should always check the conditions.",
    "f.nivel": "Level", "f.destino": "Destination", "f.todos": "All", "f.abertas": "Open now only",
    "n.secundario": "Secondary school / aged 18", "n.licenciatura": "Studying (bachelor's)", "n.finalista": "Final year",
    "n.licenciado": "Graduate", "n.mestrado": "Master's", "n.doutoramento": "PhD",
    "d.ue": "European Union", "d.franca": "France", "d.eua": "United States", "d.mundo": "Worldwide",
    "prazos.h": "Deadlines",
    "prazos.p": "All the dates, month by month. Applications that have closed disappear from this list automatically. Dates marked as <em>expected</em> are not yet official.",
    "prazos.sempre": "Always open",
    "carr.epso.h": "What is EPSO?",
    "carr.epso.p": "The European Personnel Selection Office (EPSO) runs selection for the EU institutions: competitions for permanent posts (AD and AST officials) and selection procedures for contract staff. There is no perfect profile: there are posts for people from law, languages, communication, economics or IT.",
    "carr.prep.h": "How to prepare",
    "carr.l1": "EPSO tutorial videos", "carr.l2": "Sample tests", "carr.l3": "Epsy, EPSO's AI assistant", "carr.l4": "Frequently asked questions",
    "carr.prev.h": "Upcoming EPSO competitions", "carr.prev.p": "Indicative dates published by EPSO.", "carr.prev.b": "See them all on the EPSO website",
    "quiz.h": "Myth or reality?",
    "carr.cast": "<strong>Contract staff (CAST Permanent):</strong> registration is always open and, if you pass the tests, your result is valid for 10 years.",
    "lemais.h": "Read more", "lemais.p": "My articles in The EU Briefing, my newsletter on LinkedIn.", "lemais.b": "Subscribe to The EU Briefing",
    "sobre.nl": "Subscribe to my newsletter",
    "sobre.papel": "Daniela Barreto · EU Careers Student Ambassador · Universidade da Madeira · 2026/27 academic year<br>Official programme of the European Personnel Selection Office (EPSO)",
    "sobre.p1": "I am in the final year of my degree in Languages and Business Relations at Universidade da Madeira and the official EU Careers Ambassador at my university. My role is to bring students closer to job opportunities in the European institutions: competitions, traineeships such as the Blue Book or the Schuman traineeships, and temporary contracts.",
    "sobre.p2": "I am a Public Information Intern at the Portugal Desk of the United Nations Regional Information Centre (UNRIC), and I write The EU Briefing, a newsletter on EU careers and digital policy. I speak Spanish, English, Portuguese and German.",
    "sobre.p3": "Today I bring the EU and the UN closer to students who want to work there. In the future, I want to work on the regulation of artificial intelligence, which is why I am preparing for a master's degree in that field.",
    "sobre.p4": "I believe the opportunities are out there, but they do not always reach the people who need them most. That is why I created this site: so that the right information reaches everyone, with links to the official sources, and so that no one is left out for not knowing where to start. It is a personal and independent project. If you have any questions, write to me.",
    "sobre.li": "Contact me on LinkedIn",
    "sobre.alt": "Daniela Barreto smiling, sitting at a table",
    "emb.h": "Would you like to be an EU Careers Ambassador?",
    "emb.p": "Selection for 2027/28 is expected in February and March 2027. The term runs from October 2027 to September 2028, with a compulsory one day training session in October.",
    "emb.l1": "Participating universities", "emb.l2": "Contact EPSO",
    "rod.1": "<strong>Daniela V. Barreto</strong> · An independent guide to scholarships, traineeships and international opportunities.",
    "rod.2": "Independent page: this is not an official website of EPSO, the European Union or Universidade da Madeira. Always check dates and conditions on the official pages.",
    "rod.atual": "Last updated:"
  };
  const META = {
    pt: { title: document.title, desc: (document.querySelector('meta[name="description"]') || {}).content },
    en: { title: "Daniela V. Barreto: scholarships, traineeships and international opportunities",
          desc: "An independent guide to scholarships, traineeships, volunteering, mobility and international careers for students in Portugal, by Daniela V. Barreto." }
  };

  const t = () => T[LANG];
  const fmt = (opts) => new Intl.DateTimeFormat(t().locale, opts);
  const fmtDia = (d) => fmt({ day: "numeric", month: "short", year: "numeric" }).format(d);
  const fmtDiaCurto = (d) => fmt({ day: "numeric", month: "short" }).format(d);
  const fmtMes = (d) => fmt({ month: "long", year: "numeric" }).format(d);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  /* Campo de uma oportunidade no idioma ativo (inglês com recurso ao português). */
  function c(o, campo) {
    if (LANG === "en" && typeof EN_DADOS !== "undefined" && EN_DADOS[o.id] && EN_DADOS[o.id][campo]) return EN_DADOS[o.id][campo];
    return o[campo];
  }

  function data(s, fim) {
    if (!s) return null;
    if (s.length === 10) s += fim ? "T23:59" : "T00:00";
    return new Date(s);
  }
  const soMes = (o) => o.indicativo && o.quando && !o.fecha;

  function estado(o) {
    const abre = data(o.abre), fecha = data(o.fecha, true), L = t();
    if (o.indisponivel) return { cls: "fechado", txt: L.indisp };
    if (o.sempreAberto) return { cls: "aberto", txt: L.sempre, aberto: true };
    if (fecha && fecha < AGORA) return { cls: "fechado", txt: L.encerrado, fechado: true };
    if (abre && abre > AGORA) {
      const quando = soMes(o) ? fmtMes(abre) : fmtDia(abre);
      return { cls: "futuro", txt: (o.indicativo ? L.previsto : L.abreA) + quando };
    }
    if (fecha) {
      const dias = Math.ceil((fecha - AGORA) / DIA);
      if (dias <= 14) return { cls: "breve", txt: dias <= 1 ? L.fechaHoje : L.fechaEm(dias), aberto: true };
      return { cls: "aberto", txt: L.abertoAte + fmtDia(fecha), aberto: true };
    }
    return { cls: "futuro", txt: L.verDatas };
  }
  const visivel = (o) => !(estado(o).fechado && !o.recorrente);
  const esc = (s) => String(s || "").replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  const ext = 'target="_blank" rel="noopener"';

  /* ---------- Fecham em breve ---------- */
  function emBreve() {
    const L = t(), lim = new Date(AGORA.getTime() + 30 * DIA);
    const itens = OPORTUNIDADES
      .map((o) => ({ o, f: data(o.fecha, true) }))
      .filter(({ o, f }) => f && f >= AGORA && f <= lim && !(data(o.abre) > AGORA))
      .sort((a, b) => a.f - b.f).slice(0, 5);
    const ul = document.getElementById("em-breve");
    if (!itens.length) { ul.innerHTML = `<li>${L.nadaBreve}</li>`; return; }
    ul.innerHTML = itens.map(({ o, f }) => {
      const d = Math.ceil((f - AGORA) / DIA);
      return `<li><span class="dias">${d <= 1 ? L.hojeAmanha : L.dias(d)}</span><span><a href="${esc(o.link)}" ${ext}>${esc(c(o, "titulo"))}</a><br><small>${L.ate}${fmtDia(f)}</small></span></li>`;
    }).join("");
  }

  /* ---------- Catálogo ---------- */
  const filtro = { tipo: "", nivel: "", destino: "", abertas: false };

  function passa(o, tipo) {
    return (!tipo || o.tipo === tipo) &&
      (!filtro.nivel || o.nivel.includes(filtro.nivel) || o.nivel.includes("todos")) &&
      (!filtro.destino || o.destino === filtro.destino || (filtro.destino === "portugal" && o.emPortugal)) &&
      (!filtro.abertas || estado(o).aberto);
  }

  function chips() {
    const L = t(), box = document.getElementById("chips-tipo");
    const lista = [["", L.todas], ...Object.entries(L.tipos)];
    box.innerHTML = lista.map(([k, v]) => {
      const n = OPORTUNIDADES.filter(visivel).filter((o) => passa(o, k)).length;
      return `<button class="chip${n ? "" : " vazio"}" data-tipo="${k}" aria-pressed="${filtro.tipo === k}">${v} <span class="n">${n}</span></button>`;
    }).join("");
    box.querySelectorAll(".chip").forEach((b) => b.addEventListener("click", () => { filtro.tipo = b.dataset.tipo; chips(); catalogo(); }));
  }

  function limpar() {
    filtro.tipo = ""; filtro.nivel = ""; filtro.destino = ""; filtro.abertas = false;
    document.getElementById("f-nivel").value = "";
    document.getElementById("f-destino").value = "";
    document.getElementById("f-abertas").checked = false;
    chips(); catalogo();
  }

  function catalogo() {
    const L = t();
    const ordem = (o) => {
      const e = estado(o);
      if (e.cls === "breve") return 0;
      if (e.aberto && !o.sempreAberto) return 1;
      if (e.cls === "futuro") return 2;
      if (o.sempreAberto) return 3;
      return 4;
    };
    const itens = OPORTUNIDADES.filter(visivel).filter((o) => passa(o, filtro.tipo)).sort((a, b) => ordem(a) - ordem(b));

    document.getElementById("contagem").textContent = L.contagem(itens.length);
    document.getElementById("catalogo").innerHTML = itens.map((o) => {
      const e = estado(o);
      const quando = e.fechado ? c(o, "recorrente") : c(o, "quando");
      return `<article class="ficha">
        <span class="tipo">${L.tipoSing[o.tipo]}</span>
        <h3>${esc(c(o, "titulo"))}</h3>
        <p class="entidade">${esc(c(o, "entidade"))}</p>
        <dl>
          <dt>${L.paraQuem}</dt><dd>${esc(c(o, "paraQuem"))}</dd>
          <dt>${L.apoio}</dt><dd>${esc(c(o, "apoio"))}</dd>
          <dt>${L.duracao}</dt><dd>${esc(c(o, "duracao"))}</dd>
          ${quando ? `<dt>${L.quando}</dt><dd>${esc(quando)}</dd>` : ""}
        </dl>
        ${o.artigo ? `<p class="artigo"><a href="${esc(o.artigo)}" ${ext}>${L.artigo}</a></p>` : ""}
        <div class="rodape-ficha">
          <span class="estado ${e.cls}">${e.txt}</span>
          <a class="oficial" href="${esc(o.link)}" ${ext}>${L.oficial}</a>
        </div>
      </article>`;
    }).join("") || `<div class="sem-resultados"><p>${L.semRes}</p><button type="button" class="btn btn-azul" id="limpar">${L.verTodas}</button></div>`;
    const bl = document.getElementById("limpar");
    if (bl) bl.addEventListener("click", limpar);
  }

  function ligarFiltros() {
    const n = document.getElementById("f-nivel"), d = document.getElementById("f-destino"), a = document.getElementById("f-abertas");
    n.addEventListener("change", () => { filtro.nivel = n.value; chips(); catalogo(); });
    d.addEventListener("change", () => { filtro.destino = d.value; chips(); catalogo(); });
    a.addEventListener("change", () => { filtro.abertas = a.checked; chips(); catalogo(); });
    document.querySelectorAll(".perfil").forEach((b) => b.addEventListener("click", () => {
      filtro.nivel = b.dataset.nivel || ""; filtro.tipo = b.dataset.tipo || "";
      n.value = filtro.nivel; chips(); catalogo();
      document.getElementById("oportunidades").scrollIntoView();
    }));
  }

  /* ---------- Prazos (calendário único) ---------- */
  function prazos() {
    const L = t(), ev = [];
    OPORTUNIDADES.forEach((o) => {
      const abre = data(o.abre), fecha = data(o.fecha, true);
      if (abre && abre >= AGORA) ev.push({ d: abre, o, txt: L.calAbre, mes: soMes(o) });
      if (fecha && fecha >= AGORA) ev.push({ d: fecha, o, txt: L.calUltimo });
    });
    ev.sort((a, b) => a.d - b.d);
    const grupos = {};
    ev.forEach((e) => { const k = fmtMes(e.d); (grupos[k] = grupos[k] || []).push(e); });
    document.getElementById("calendario").innerHTML = Object.entries(grupos).map(([mes, lista]) => `
      <div class="mes"><h3>${cap(mes)}</h3><ul>${lista.map((e) => `
        <li><span class="data">${e.mes ? L.calMes : fmtDiaCurto(e.d)}</span>
        <span>${e.mes ? L.calPrev : e.txt}: <a href="${esc(e.o.link)}" ${ext}>${esc(c(e.o, "titulo"))}</a>${e.o.indicativo ? `<span class="previsto">${L.badge}</span>` : ""}</span></li>`).join("")}
      </ul></div>`).join("");

    document.getElementById("sempre").innerHTML = OPORTUNIDADES.filter((o) => o.sempreAberto && !o.indisponivel)
      .map((o) => `<li><a href="${esc(o.link)}" ${ext}>${esc(c(o, "titulo"))}</a></li>`).join("");
  }

  /* ---------- Carreiras na UE ---------- */
  function previstos() {
    document.getElementById("epso-previstos").innerHTML = EPSO_PREVISTOS
      .filter((p) => data(p.mes + "-28", true) >= AGORA)
      .map((p) => `<li><strong>${cap(fmtMes(data(p.mes + "-01")))}:</strong> ${esc(LANG === "en" && p.en ? p.en : p.texto)}</li>`).join("");
  }

  const QUIZ = {
    pt: [
      ["Só quem estudou Direito ou Relações Internacionais pode trabalhar na UE.", false, "Mito. Há concursos e seleções para línguas, comunicação, economia, finanças, informática, ciências e muito mais."],
      ["É preciso falar pelo menos duas línguas da UE.", true, "Realidade. A maioria das seleções pede pelo menos duas línguas oficiais da UE, com o nível exigido indicado em cada anúncio (muitas vezes C1 e B2)."],
      ["Os estágios nas instituições da UE não são pagos.", false, "Mito. Os estágios Blue Book, Schuman e do Conselho são remunerados (cerca de 1 538 € por mês no Blue Book)."],
      ["Para trabalhar na UE tens de viver em Bruxelas.", false, "Mito. Há instituições no Luxemburgo e em Estrasburgo e agências em toda a Europa, incluindo duas em Lisboa (EMSA e EUDA)."],
      ["Posso candidatar-me a agente contratual em qualquer altura do ano.", true, "Realidade. A seleção CAST permanente está sempre aberta."]
    ],
    en: [
      ["Only people who studied law or international relations can work for the EU.", false, "Myth. There are competitions and selection procedures for languages, communication, economics, finance, IT, science and much more."],
      ["You need to speak at least two EU languages.", true, "Reality. Most selection procedures ask for at least two official EU languages, with the required level set out in each notice (often C1 and B2)."],
      ["Traineeships at the EU institutions are unpaid.", false, "Myth. The Blue Book, Schuman and Council traineeships are paid (around €1,538 a month for the Blue Book)."],
      ["To work for the EU you have to live in Brussels.", false, "Myth. There are institutions in Luxembourg and Strasbourg and agencies all over Europe, including two in Lisbon (EMSA and EUDA)."],
      ["I can apply to become contract staff at any time of the year.", true, "Reality. The CAST Permanent selection is always open."]
    ]
  };
  function quiz() {
    const L = t(), Q = QUIZ[LANG], box = document.getElementById("quiz");
    box.innerHTML = Q.map((q, i) => `<div class="pergunta" data-i="${i}"><p>${esc(q[0])}</p>
      <button data-r="1">${L.realidade}</button><button data-r="0">${L.mito}</button><p class="resposta" hidden></p></div>`).join("");
    box.querySelectorAll(".pergunta").forEach((el) => el.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      const q = Q[el.dataset.i], certo = (b.dataset.r === "1") === q[1];
      const r = el.querySelector(".resposta"); r.hidden = false;
      r.textContent = (certo ? L.certo : L.errado) + q[2];
    })));
  }

  /* ---------- Menu móvel ---------- */
  function menu() {
    const btn = document.querySelector(".menu-btn"), nav = document.getElementById("menu");
    btn.addEventListener("click", () => { const a = nav.classList.toggle("aberto"); btn.setAttribute("aria-expanded", a); });
    nav.querySelectorAll("a").forEach((l) => l.addEventListener("click", () => { nav.classList.remove("aberto"); btn.setAttribute("aria-expanded", false); }));
  }

  /* ---------- Textos fixos ---------- */
  function textosFixos() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (el.dataset.pt === undefined) el.dataset.pt = el.innerHTML;
      const en = UI_EN[el.dataset.i18n];
      el.innerHTML = LANG === "en" && en ? en : el.dataset.pt;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      if (el.dataset.ptAlt === undefined) el.dataset.ptAlt = el.alt;
      const en = UI_EN[el.dataset.i18nAlt];
      el.alt = LANG === "en" && en ? en : el.dataset.ptAlt;
    });
    document.documentElement.lang = LANG === "en" ? "en-GB" : "pt-PT";
    document.title = META[LANG].title;
    const md = document.querySelector('meta[name="description"]');
    if (md && META[LANG].desc) md.content = META[LANG].desc;
    document.querySelectorAll(".lang-op").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === LANG));
    document.getElementById("atualizado").textContent = fmtDia(data(ULTIMA_ATUALIZACAO));
  }

  function desenhar() {
    textosFixos(); emBreve(); chips(); catalogo(); prazos(); previstos(); quiz();
  }

  document.querySelectorAll(".lang-op").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.lang === LANG) return;
    LANG = b.dataset.lang;
    try { localStorage.setItem("lang", LANG); } catch (e) { /* ignorar */ }
    try {
      const u = new URL(location.href);
      if (LANG === "en") u.searchParams.set("lang", "en"); else u.searchParams.delete("lang");
      history.replaceState(null, "", u);
    } catch (e) { /* ignorar */ }
    desenhar();
  }));

  ligarFiltros(); menu(); desenhar();
})();
