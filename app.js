/* Tudo o que se vê no site é gerado a partir de dados.js.
   As candidaturas fecham sozinhas: depois da data "fecha" saem dos prazos
   e de "Fecham em breve"; no catálogo só ficam se tiverem "recorrente". */
(function () {
  const AGORA = new Date();
  const DIA = 86400000;
  const TIPOS = {
    bolsa: "Bolsas de estudo",
    estagio: "Estágios",
    mobilidade: "Mobilidade",
    voluntariado: "Voluntariado",
    emprego: "Emprego na UE",
    evento: "Eventos e programas",
    curso: "Cursos gratuitos"
  };
  const TIPO_SING = {
    bolsa: "Bolsa", estagio: "Estágio", mobilidade: "Mobilidade", voluntariado: "Voluntariado",
    emprego: "Emprego na UE", evento: "Evento / programa", curso: "Curso gratuito"
  };

  const fmtDia = new Intl.DateTimeFormat("pt-PT", { day: "numeric", month: "short", year: "numeric" });
  const fmtDiaCurto = new Intl.DateTimeFormat("pt-PT", { day: "numeric", month: "short" });
  const fmtMes = new Intl.DateTimeFormat("pt-PT", { month: "long", year: "numeric" });

  function data(s, fim) {
    if (!s) return null;
    if (s.length === 10) s += fim ? "T23:59" : "T00:00";
    return new Date(s);
  }
  const soMes = (o) => o.indicativo && o.quando && !o.fecha;

  function estado(o) {
    const abre = data(o.abre), fecha = data(o.fecha, true);
    if (o.sempreAberto) return { cls: "aberto", txt: "Sempre aberto", aberto: true };
    if (fecha && fecha < AGORA) return { cls: "fechado", txt: "Encerrado", fechado: true };
    if (abre && abre > AGORA) {
      const quando = soMes(o) ? fmtMes.format(abre) : fmtDia.format(abre);
      return { cls: "futuro", txt: (o.indicativo ? "Previsto: " : "Abre a ") + quando };
    }
    if (fecha) {
      const dias = Math.ceil((fecha - AGORA) / DIA);
      if (dias <= 14) return { cls: "breve", txt: dias <= 1 ? "Fecha hoje ou amanhã" : `Fecha em ${dias} dias`, aberto: true };
      return { cls: "aberto", txt: "Aberto até " + fmtDia.format(fecha), aberto: true };
    }
    return { cls: "futuro", txt: "Ver datas" };
  }
  const visivel = (o) => !(estado(o).fechado && !o.recorrente);
  const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ext = 'target="_blank" rel="noopener"';

  /* ---------- Fecham em breve ---------- */
  function emBreve() {
    const lim = new Date(AGORA.getTime() + 30 * DIA);
    const itens = OPORTUNIDADES
      .map((o) => ({ o, f: data(o.fecha, true) }))
      .filter(({ o, f }) => f && f >= AGORA && f <= lim && !(data(o.abre) > AGORA))
      .sort((a, b) => a.f - b.f).slice(0, 5);
    const ul = document.getElementById("em-breve");
    if (!itens.length) { ul.innerHTML = "<li>Nada a fechar nos próximos 30 dias. Espreita os prazos mais abaixo.</li>"; return; }
    ul.innerHTML = itens.map(({ o, f }) => {
      const d = Math.ceil((f - AGORA) / DIA);
      return `<li><span class="dias">${d <= 1 ? "Hoje/amanhã" : d + " dias"}</span><span><a href="${esc(o.link)}" ${ext}>${esc(o.titulo)}</a><br><small>Até ${fmtDia.format(f)}</small></span></li>`;
    }).join("");
  }

  /* ---------- Catálogo ---------- */
  const filtro = { tipo: "", nivel: "", destino: "", abertas: false };

  function chips() {
    const box = document.getElementById("chips-tipo");
    const lista = [["", "Todas"], ...Object.entries(TIPOS)];
    box.innerHTML = lista.map(([k, v]) => {
      const n = OPORTUNIDADES.filter(visivel).filter((o) => passa(o, k)).length;
      return `<button class="chip${n ? "" : " vazio"}" data-tipo="${k}" aria-pressed="${filtro.tipo === k}">${v} <span class="n">${n}</span></button>`;
    }).join("");
    box.querySelectorAll(".chip").forEach((b) => b.addEventListener("click", () => { filtro.tipo = b.dataset.tipo; chips(); catalogo(); }));
  }

  function passa(o, tipo) {
    return (!tipo || o.tipo === tipo) &&
      (!filtro.nivel || o.nivel.includes(filtro.nivel) || o.nivel.includes("todos")) &&
      (!filtro.destino || o.destino === filtro.destino || (filtro.destino === "portugal" && o.emPortugal)) &&
      (!filtro.abertas || estado(o).aberto);
  }

  function limpar() {
    filtro.tipo = ""; filtro.nivel = ""; filtro.destino = ""; filtro.abertas = false;
    document.getElementById("f-nivel").value = "";
    document.getElementById("f-destino").value = "";
    document.getElementById("f-abertas").checked = false;
    chips(); catalogo();
  }

  function catalogo() {
    const ordem = (o) => {
      const e = estado(o);
      if (e.cls === "breve") return 0;
      if (e.aberto && !o.sempreAberto) return 1;
      if (e.cls === "futuro") return 2;
      if (o.sempreAberto) return 3;
      return 4;
    };
    const itens = OPORTUNIDADES.filter(visivel).filter((o) => passa(o, filtro.tipo)).sort((a, b) => ordem(a) - ordem(b));

    document.getElementById("contagem").textContent = itens.length === 1 ? "1 oportunidade" : `${itens.length} oportunidades`;
    document.getElementById("catalogo").innerHTML = itens.map((o) => {
      const e = estado(o);
      const quando = e.fechado ? o.recorrente : o.quando;
      return `<article class="ficha">
        <span class="tipo">${TIPO_SING[o.tipo]}</span>
        <h3>${esc(o.titulo)}</h3>
        <p class="entidade">${esc(o.entidade)}</p>
        <dl>
          <dt>Para quem</dt><dd>${esc(o.paraQuem)}</dd>
          <dt>O que recebes</dt><dd>${esc(o.apoio)}</dd>
          <dt>Duração</dt><dd>${esc(o.duracao)}</dd>
          ${quando ? `<dt>Quando</dt><dd>${esc(quando)}</dd>` : ""}
        </dl>
        <div class="rodape-ficha">
          <span class="estado ${e.cls}">${e.txt}</span>
          <a class="oficial" href="${esc(o.link)}" ${ext}>Página oficial ↗</a>
        </div>
      </article>`;
    }).join("") || `<div class="sem-resultados"><p>Não há oportunidades com esta combinação de filtros.</p><button type="button" class="btn btn-azul" id="limpar">Ver todas as oportunidades</button></div>`;
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
    const ev = [];
    OPORTUNIDADES.forEach((o) => {
      const abre = data(o.abre), fecha = data(o.fecha, true);
      if (abre && abre >= AGORA) ev.push({ d: abre, o, txt: soMes(o) ? (o.quando || "Previsto") : "Abre", mes: soMes(o) });
      if (fecha && fecha >= AGORA) ev.push({ d: fecha, o, txt: "Último dia" });
    });
    ev.sort((a, b) => a.d - b.d);
    const grupos = {};
    ev.forEach((e) => { const k = fmtMes.format(e.d); (grupos[k] = grupos[k] || []).push(e); });
    document.getElementById("calendario").innerHTML = Object.entries(grupos).map(([mes, lista]) => `
      <div class="mes"><h3>${mes.charAt(0).toUpperCase() + mes.slice(1)}</h3><ul>${lista.map((e) => `
        <li><span class="data">${e.mes ? "Durante o mês" : fmtDiaCurto.format(e.d)}</span>
        <span>${e.mes ? "Previsto" : e.txt}: <a href="${esc(e.o.link)}" ${ext}>${esc(e.o.titulo)}</a>${e.o.indicativo ? '<span class="previsto">previsto</span>' : ""}</span></li>`).join("")}
      </ul></div>`).join("");

    document.getElementById("sempre").innerHTML = OPORTUNIDADES.filter((o) => o.sempreAberto)
      .map((o) => `<li><a href="${esc(o.link)}" ${ext}>${esc(o.titulo)}</a></li>`).join("");
  }

  /* ---------- Carreiras na UE ---------- */
  function previstos() {
    document.getElementById("epso-previstos").innerHTML = EPSO_PREVISTOS
      .filter((p) => data(p.mes + "-28", true) >= AGORA)
      .map((p) => `<li><strong>${fmtMes.format(data(p.mes + "-01"))}:</strong> ${esc(p.texto)}</li>`).join("");
  }

  const QUIZ = [
    ["Só quem estudou Direito ou Relações Internacionais pode trabalhar na UE.", false, "Mito. Há concursos e seleções para línguas, comunicação, economia, finanças, informática, ciências e muito mais."],
    ["É preciso falar pelo menos duas línguas da UE.", true, "Realidade. Na maioria das seleções pedem uma língua principal (C1) e uma segunda (B2), quase sempre inglês, francês ou alemão."],
    ["Os estágios nas instituições da UE não são pagos.", false, "Mito. Os estágios Blue Book, Schuman e do Conselho são remunerados (cerca de 1 538 € por mês no Blue Book)."],
    ["Para trabalhar na UE tens de viver em Bruxelas.", false, "Mito. Há instituições no Luxemburgo e em Estrasburgo e agências em toda a Europa, incluindo duas em Lisboa (EMSA e EUDA)."],
    ["Posso candidatar-me a agente contratual em qualquer altura do ano.", true, "Realidade. A seleção CAST permanente está sempre aberta."]
  ];
  function quiz() {
    const box = document.getElementById("quiz");
    box.innerHTML = QUIZ.map((q, i) => `<div class="pergunta" data-i="${i}"><p>${esc(q[0])}</p>
      <button data-r="1">Realidade</button><button data-r="0">Mito</button><p class="resposta" hidden></p></div>`).join("");
    box.querySelectorAll(".pergunta").forEach((el) => el.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      const q = QUIZ[el.dataset.i], certo = (b.dataset.r === "1") === q[1];
      const r = el.querySelector(".resposta"); r.hidden = false;
      r.textContent = (certo ? "Certo! " : "Não exatamente. ") + q[2];
    })));
  }

  /* ---------- Menu móvel ---------- */
  function menu() {
    const btn = document.querySelector(".menu-btn"), nav = document.getElementById("menu");
    btn.addEventListener("click", () => { const a = nav.classList.toggle("aberto"); btn.setAttribute("aria-expanded", a); });
    nav.querySelectorAll("a").forEach((l) => l.addEventListener("click", () => { nav.classList.remove("aberto"); btn.setAttribute("aria-expanded", false); }));
  }

  document.getElementById("atualizado").textContent = fmtDia.format(data(ULTIMA_ATUALIZACAO));
  emBreve(); chips(); ligarFiltros(); catalogo(); prazos(); previstos(); quiz(); menu();
})();
