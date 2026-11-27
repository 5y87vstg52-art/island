(() => {
  const data = window.ISLAND_DATA || { entreprises: [], direction: null };
  const $ = (s, el = document) => el.querySelector(s);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Icônes ---------- */
  const ICONS = {
    bateau: '<path d="M3 17l2 3h14l2-3"/><path d="M5 17V12h14v5"/><path d="M12 12V4l6 8"/><path d="M12 6l-5 6"/>',
    hotel: '<path d="M3 21V7l9-4 9 4v14"/><path d="M9 21v-6h6v6"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
    bouclier: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    maison: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
    voiture: '<path d="M5 16l1.5-5h11L19 16"/><path d="M3 16h18v3H3z"/><circle cx="7" cy="19" r="1"/><circle cx="17" cy="19" r="1"/>',
    cocktail: '<path d="M4 4h16l-8 9z"/><path d="M12 13v7"/><path d="M8 20h8"/>',
    outils: '<path d="M14 7l3-3 3 3-3 3"/><path d="M17 7L5 19"/><path d="M4 4l5 5"/><path d="M15 15l5 5"/>',
    avion: '<path d="M2 16l20-8-8 12-2-6z"/>',
    licorne: '<path d="M8 21c-1-5 0-9 3-12"/><path d="M11 9V5.5l2 2.5"/><path d="M14 8l5-6"/><path d="M13 8c2.5 1 4.5 3.5 6 6.5l-1.2 1.5c-1.8 0-3.3-.6-4.8-1.2"/><path d="M13 14.8c0 2.2.8 4.2 2 6.2"/><path d="M10 11.5c-1.3 1-2 2.5-2.2 4"/><path d="M15 11h.01"/>'
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.outils}</svg>`;
  const PHONE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';

  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const phoneBtn = (num) => `<button class="phone copy" data-copy="${esc(num)}" aria-label="Copier le numéro ${esc(num)}">${PHONE_ICON}${esc(num)}</button>`;

  /* ---------- Cartes entreprises ---------- */
  const cards = $("#cards");
  cards.innerHTML = data.entreprises.map((e, i) => `
    <article class="card reveal" data-secteur="${esc(e.secteur)}" style="transition-delay:${(i % 3) * 0.08}s">
      <div class="card__top">
        <span class="card__icon">${icon(e.icone)}</span>
        <span class="badge ${e.statut === "ouvert" ? "badge--open" : "badge--soon"}">${e.statut === "ouvert" ? "Ouvert" : "Bientôt"}</span>
      </div>
      <span class="card__sector">${esc(e.secteur)}</span>
      <h3 class="card__name">${esc(e.nom)}</h3>
      <p class="card__desc">${esc(e.description)}</p>
      <ul class="card__services">${(e.services || []).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      <div class="card__foot">
        <span class="card__contact"><strong>${esc(e.responsable)}</strong>${esc(e.horaires)}</span>
        ${phoneBtn(e.telephone)}
      </div>
    </article>`).join("");

  /* ---------- Filtres ---------- */
  const secteurs = [...new Set(data.entreprises.map((e) => e.secteur))];
  const filters = $("#filters");
  filters.innerHTML = ["Toutes", ...secteurs]
    .map((s, i) => `<button class="filter${i === 0 ? " is-active" : ""}" data-filter="${esc(s)}" role="tab">${esc(s)}</button>`)
    .join("");
  filters.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".filter");
    if (!btn) return;
    filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    cards.querySelectorAll(".card").forEach((c) => {
      const show = f === "Toutes" || c.dataset.secteur === f;
      c.classList.toggle("is-hidden", !show);
      if (show) {
        c.classList.remove("is-visible");
        requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add("is-visible")));
      }
    });
  });

  /* ---------- Annuaire ---------- */
  const dir = data.direction;
  const row = (e, main) => `
    <div class="dir-row${main ? " dir-row--main" : ""}">
      <div class="dir-row__name"><small>${esc(main ? e.role : e.secteur)}</small>${esc(e.nom)}</div>
      <div class="dir-row__person">${esc(e.responsable)}</div>
      <div class="dir-row__hours">${esc(e.horaires)}</div>
      ${phoneBtn(e.telephone)}
    </div>`;
  $("#directory").innerHTML = (dir ? row(dir, true) : "") + data.entreprises.map((e) => row(e, false)).join("");
  if (dir) $("#join-phone").dataset.copy = dir.telephone;

  /* ---------- Stats ---------- */
  $("#stat-entreprises").dataset.count = data.entreprises.length;
  $("#stat-secteurs").dataset.count = secteurs.length;

  const countUp = (el) => {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Apparition au scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-visible");
      en.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- Copier un numéro ---------- */
  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-shown"), 2200);
  };
  document.addEventListener("click", async (ev) => {
    const btn = ev.target.closest(".copy");
    if (!btn || !btn.dataset.copy) return;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      showToast(`Numéro ${btn.dataset.copy} copié`);
    } catch {
      showToast(`Numéro : ${btn.dataset.copy}`);
    }
  });

  /* ---------- Navigation ---------- */
  const nav = $("#nav");
  const toggle = $(".nav__toggle");
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  $("#menu").addEventListener("click", (ev) => { if (ev.target.closest("a")) setOpen(false); });

  /* ---------- Scroll : nav + parallaxe ---------- */
  const parallax = [...document.querySelectorAll("[data-parallax]")];
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    if (!reduceMotion && y < window.innerHeight) {
      parallax.forEach((el) => { el.style.transform = `translateY(${y * +el.dataset.parallax}px)`; });
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* ---------- Intro ---------- */
  $("#year").textContent = new Date().getFullYear();
  document.body.classList.add("is-loading");
  const ready = () => {
    setTimeout(() => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
    }, reduceMotion ? 0 : 1500);
  };
  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready);
})();
