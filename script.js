const C = CONTENT;
const $ = (s, el = document) => el.querySelector(s);

// ---------- Helpers ----------
function youtubeId(url) {
  const m = String(url).match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}
const ytThumb = (id, q = "maxresdefault") => `https://i.ytimg.com/vi/${id}/${q}.jpg`;
const ytEmbed = (id, extra = "") =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1${extra}`;
const pad = n => String(n).padStart(2, "0");
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
};
const PLAY_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>';

// ---------- Static fields ----------
document.querySelectorAll("[data-field]").forEach(e => (e.textContent = C[e.dataset.field] || ""));
document.querySelectorAll("[data-href]").forEach(e => (e.href = C.contact[e.dataset.href]));
$("#year").textContent = new Date().getFullYear();

// ---------- Hero / reel ----------
const reelId = youtubeId(C.reel.link);
$("#reel-title").textContent = C.reel.title;
const poster = $("#hero-poster");
poster.src = C.reel.thumb || ytThumb(reelId);
poster.onerror = () => { poster.onerror = null; poster.src = ytThumb(reelId, "hqdefault"); };

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const saveData = navigator.connection && navigator.connection.saveData;
const touch = matchMedia("(hover: none)").matches;
if (!reduceMotion && !saveData && !touch) {
  // Muted, looping background preview of the reel
  const bg = $("#hero-video");
  const iframe = el("iframe");
  iframe.src = ytEmbed(reelId, `&autoplay=1&mute=1&loop=1&playlist=${reelId}&controls=0&disablekb=1&iv_load_policy=3&fs=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`);
  iframe.allow = "autoplay; encrypted-media";
  iframe.tabIndex = -1;
  iframe.title = "Demo reel background";
  // Only fade the video in once YouTube reports it is actually playing (hides its loading UI)
  iframe.addEventListener("load", () => {
    iframe.contentWindow.postMessage(JSON.stringify({ event: "listening", id: "hero" }), "*");
  });
  addEventListener("message", e => {
    if (!/youtube/.test(e.origin)) return;
    let d;
    try { d = JSON.parse(e.data); } catch { return; }
    const state = d.info && d.info.playerState;
    if (state === 1) setTimeout(() => bg.classList.add("is-ready"), 600);
    else if (state === 2 || state === -1) bg.classList.remove("is-ready");
  });
  bg.appendChild(iframe);
}
$("#play-reel").addEventListener("click", () => openVideo(reelId, `${C.name} — ${C.reel.title}`));

// Running timecode (24 fps)
const tc = $("#timecode");
const t0 = performance.now();
(function tick() {
  const f = Math.floor(((performance.now() - t0) / 1000) * 24);
  tc.textContent = `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
  requestAnimationFrame(tick);
})();

// ---------- Game cinematics ----------
const cineGrid = $("#cine-grid");
$("#count-cinematics").textContent = "Selected Work";
$("#cine-note").textContent = C.cinematicsNote || "";
C.cinematics.forEach((c, i) => {
  const id = youtubeId(c.link);
  if (!id) return;
  const card = el("button", "cine reveal");
  card.type = "button";
  card.dataset.cursor = "Play";
  card.innerHTML = `
    <div class="cine-media">
      <span class="cine-index mono">${pad(i + 1)}</span>
      <img loading="lazy" alt="">
      <span class="cine-play">${PLAY_SVG}</span>
    </div>
    <div class="cine-info">
      <h3 class="cine-title"><span class="cine-game"></span><span class="t"></span></h3>
      <span class="mono">Game Cinematic</span>
    </div>`;
  const img = $("img", card);
  img.src = c.thumb || ytThumb(id);
  img.alt = `${c.game} — ${c.title}`;
  img.onerror = () => { img.onerror = null; img.src = ytThumb(id, "hqdefault"); };
  $(".cine-game", card).textContent = c.game;
  $(".t", card).textContent = c.title;
  card.addEventListener("click", () => openVideo(id, `${c.game} — ${c.title}`));
  cineGrid.appendChild(card);
});

// ---------- Movies ----------
const posterGrid = $("#poster-grid");
$("#count-movies").textContent = `${pad(C.movies.length)} Credits`;
C.movies.forEach(m => {
  const a = el("a", "poster reveal");
  a.href = `https://www.imdb.com/title/${m.imdb}/`;
  a.target = "_blank";
  a.rel = "noopener";
  a.dataset.type = m.type;
  a.innerHTML = `
    <div class="poster-media">
      <span class="poster-tag mono"></span>
      <img loading="lazy" alt="">
      <span class="poster-arrow">↗</span>
    </div>
    <h3 class="poster-title"></h3>
    <div class="poster-meta mono"><span class="r"></span><span class="y"></span></div>`;
  $(".poster-tag", a).textContent = m.type;
  $("img", a).src = `assets/movies/${m.imdb}.jpg`;
  $("img", a).alt = `${m.title} poster`;
  $(".poster-title", a).textContent = m.title;
  $(".r", a).textContent = m.role;
  $(".y", a).textContent = m.year;
  posterGrid.appendChild(a);
});

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    posterGrid.querySelectorAll(".poster").forEach(p => {
      const show = f === "all" || p.dataset.type === f || (f === "Film" && p.dataset.type === "Short");
      p.classList.toggle("is-hidden", !show);
    });
  });
});

// ---------- About ----------
$("#about-statement").textContent = C.about.statement;
// Italicize the last few words of the statement for an editorial touch
(() => {
  const s = $("#about-statement");
  const words = C.about.statement.split(" ");
  const tail = words.splice(-4).join(" ");
  s.textContent = words.join(" ") + " ";
  const em = el("em");
  em.textContent = tail;
  s.appendChild(em);
})();
const paras = $("#about-paragraphs");
C.about.paragraphs.forEach(t => {
  const p = el("p", "reveal");
  p.textContent = t;
  paras.appendChild(p);
});
const stats = [
  [C.experience, "Years of experience"],
  [C.movies.length, "IMDb Credits"],
  [`${C.cinematics.length}+`, "Game Cinematics"],
];
const lists = [["Studios", C.about.studios], ["Tools", C.about.tools]].filter(([, l]) => l && l.length);
$("#about-lists").innerHTML = lists
  .map(([h, l]) => `<div><h4 class="mono">${h}</h4><ul>${l.map(() => "<li></li>").join("")}</ul></div>`)
  .join("");
$("#about-lists").querySelectorAll("ul").forEach((ul, i) =>
  ul.querySelectorAll("li").forEach((li, j) => (li.textContent = lists[i][1][j])));
$("#stats").innerHTML = stats.map(([n, l]) => `<div><dt>${n}</dt><dd class="mono">${l}</dd></div>`).join("");

// ---------- Contact ----------
$("#email").href = `mailto:${C.contact.email}`;
$("#email-text").textContent = C.contact.email;
if (C.contact.cv) $("#cv").href = C.contact.cv;
else $("#cv").remove();
$("#copy-email").addEventListener("click", async e => {
  try {
    await navigator.clipboard.writeText(C.contact.email);
    e.target.textContent = "Copied";
  } catch {
    e.target.textContent = "Press ⌘C";
  }
  setTimeout(() => (e.target.textContent = "Copy"), 1800);
});

// ---------- Video modal ----------
const modal = $("#modal");
const player = $("#modal-player");
let lastFocus = null;

function openVideo(id, title) {
  lastFocus = document.activeElement;
  $("#modal-title").textContent = title;
  player.innerHTML = `<iframe src="${ytEmbed(id, "&autoplay=1")}" title="" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  $("iframe", player).title = title;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $("#modal-close").focus();
  setCursor(false);
}
function closeVideo() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  setTimeout(() => (player.innerHTML = ""), 400);
  if (lastFocus) lastFocus.focus({ preventScroll: true });
}
$("#modal-close").addEventListener("click", closeVideo);
modal.addEventListener("click", e => { if (e.target === modal) closeVideo(); });
addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("is-open")) closeVideo(); });

// ---------- Custom cursor ----------
const cursor = $(".cursor");
let mx = 0, my = 0, cx = 0, cy = 0;
function setCursor(on, label) {
  cursor.classList.toggle("is-on", on);
  if (label) $("span", cursor).textContent = label;
}
if (matchMedia("(hover: hover)").matches) {
  addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });
  (function loop() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.translate = `${cx}px ${cy}px`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", e => {
    const t = e.target.closest("[data-cursor]");
    setCursor(!!t && !modal.classList.contains("is-open"), t && t.dataset.cursor);
  });
}

// ---------- Header state + active nav ----------
const header = $("#header");
addEventListener("scroll", () => header.classList.toggle("is-scrolled", scrollY > 40), { passive: true });
const navLinks = [...document.querySelectorAll(".nav a")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle("is-active", a.hash === `#${en.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main .section").forEach(s => spy.observe(s));

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const t = en.target;
    // Stagger siblings in the same grid row
    const siblings = t.parentElement ? [...t.parentElement.children].filter(c => c.classList.contains("reveal") && !c.classList.contains("is-in")) : [];
    const i = Math.max(0, siblings.indexOf(t));
    t.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
    t.classList.add("is-in");
    setTimeout(() => (t.style.transitionDelay = ""), 1600);
    io.unobserve(t);
  });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
document.querySelectorAll(".reveal").forEach(r => io.observe(r));
