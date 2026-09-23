(function () {
"use strict";
var d = document, root = d.documentElement;
root.classList.add("js");
var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var $ = function (s, c) { return (c || d).querySelector(s); };
var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
var hd = $("[data-hd]");
if (hd) {
var onScroll = function () { hd.classList.toggle("scrolled", window.scrollY > 8); };
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
var burger = $(".burger", hd), sheet = $("#sheet");
if (burger && sheet) {
$$(".sheet-nav li", sheet).forEach(function (li, i) { li.style.setProperty("--k", i); });
var setOpen = function (open) {
burger.setAttribute("aria-expanded", open ? "true" : "false");
burger.setAttribute("aria-label", open ? burger.dataset.close : burger.dataset.open);
if (open) { sheet.hidden = false; requestAnimationFrame(function () { sheet.classList.add("open"); }); d.body.style.overflow = "hidden"; var f = $("a", sheet); if (f) f.focus(); }
else { sheet.classList.remove("open"); sheet.hidden = true; d.body.style.overflow = ""; }
};
burger.addEventListener("click", function () { setOpen(burger.getAttribute("aria-expanded") !== "true"); });
d.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) { setOpen(false); burger.focus(); } });
$$("a", sheet).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
}
}
$$("[data-r=stagger]").forEach(function (g) { Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--k", i); }); });
var revealables = $$("[data-r], .map, [data-pet]");
if ("IntersectionObserver" in window && !reduce) {
var io = new IntersectionObserver(function (es) {
es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
revealables.forEach(function (el) { io.observe(el); });
} else {
revealables.forEach(function (el) { el.classList.add("in"); });
}
var rot = $(".rot-w");
if (rot) {
var words = $$(".rot-i", rot), ri = 0, rtimer = null, hero = rot.closest(".hero") || rot.parentNode;
words[0].classList.add("on");
var stop = function () { clearInterval(rtimer); rtimer = null; };
var step = function () {
var cur = words[ri]; ri = (ri + 1) % words.length; var nxt = words[ri];
cur.classList.remove("on"); cur.classList.add("off");
nxt.classList.remove("off"); nxt.classList.add("on");
setTimeout(function () { cur.classList.remove("off"); }, 600);
if (ri === 0) stop();  /* one pass, then rest on the first phrase (WCAG 2.2.2) */
};
var play = function () { if (!rtimer && !reduce) rtimer = setInterval(step, 2300); };
play();
hero.addEventListener("mouseenter", play);
hero.addEventListener("focusin", play);
d.addEventListener("visibilitychange", function () { if (d.hidden) stop(); });
}
$$(".mq").forEach(function (m) { m.addEventListener("click", function () { m.classList.toggle("paused"); }); });
var BEAN = '<svg viewBox="0 0 80 62.23" aria-hidden="true"><use href="#s-bean"/></svg>';
var HEART = '<svg viewBox="0 0 24 20" aria-hidden="true"><path d="M12 19.5S1 13 1 6.4A5.4 5.4 0 0 1 12 4.3a5.4 5.4 0 0 1 11 2.1C23 13 12 19.5 12 19.5z"/></svg>';
var COLORS = ["#C63A33", "#F0C93A", "#2F7A4E", "#2572B0", "#875834"];
function burst(x, y, kind, n) {
if (reduce || !Element.prototype.animate) return;
for (var i = 0; i < n; i++) {
var el = d.createElement("span");
el.className = kind === "heart" ? "heart" : "conf";
el.innerHTML = kind === "heart" ? HEART : BEAN;
el.style.left = x - 12 + "px"; el.style.top = y - 12 + "px";
if (kind !== "heart") el.style.fill = COLORS[i % COLORS.length];
d.body.appendChild(el);
var a = (kind === "heart" ? -Math.PI / 2 : Math.random() * Math.PI * 2) + (Math.random() - .5) * (kind === "heart" ? 1.2 : .6);
var dist = kind === "heart" ? 90 + Math.random() * 90 : 80 + Math.random() * 140;
var dx = Math.cos(a) * dist, dy = Math.sin(a) * dist + (kind === "heart" ? 0 : 60);
var rot = (Math.random() - .5) * 180;
el.animate([
{ transform: "translate(0,0) scale(.4) rotate(0deg)", opacity: 0 },
{ transform: "translate(" + dx * .5 + "px," + dy * .4 + "px) scale(1) rotate(" + rot * .5 + "deg)", opacity: 1, offset: .35 },
{ transform: "translate(" + dx + "px," + dy + "px) scale(.8) rotate(" + rot + "deg)", opacity: 0 }
], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.23,1,.32,1)" }).onfinish = (function (e) { return function () { e.remove(); }; })(el);
}
}
function centerOf(el) { var r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }
var firstKiss = $("[data-kiss]");
if (firstKiss && !reduce) setTimeout(function () { var r = firstKiss.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) burst(r.left + r.width / 2, r.top + r.height * .4, "heart", 6); }, 2700);
$$("[data-kiss]").forEach(function (b) {
b.addEventListener("click", function (e) { var c = e.clientX ? [e.clientX, e.clientY] : centerOf(b); burst(c[0], c[1], "heart", 9); });
});
$$("[data-cheers]").forEach(function (b) {
b.addEventListener("click", function () {
b.classList.remove("clink"); void b.offsetWidth; b.classList.add("clink");
var c = centerOf(b); burst(c[0], c[1] - 30, "bean", 10);
setTimeout(function () { b.classList.remove("clink"); }, 1400);
});
});
$$("[data-card10]").forEach(function (card) {
var cells = $$(".st", card), n = 0, btn = $("[data-stamp]", card), reset = $("[data-reset]", card), win = $("[data-win]", card), state = $(".card10-state", card);
var tpl = card.dataset.state;
var render = function () {
cells.forEach(function (c, i) { c.classList.toggle("on", i < n); });
state.textContent = tpl.replace("{n}", n);
};
btn.addEventListener("click", function () {
if (n >= 10) return;
n++; render();
var c = centerOf(cells[n - 1]);
if (n === 10) {
card.classList.add("full"); win.hidden = false; btn.hidden = true; reset.hidden = false;
burst(c[0], c[1], "bean", 26); setTimeout(function () { burst(c[0] - 120, c[1] - 40, "bean", 14); }, 180);
reset.focus();
} else { burst(c[0], c[1], "bean", 4); }
});
reset.addEventListener("click", function () { n = 0; card.classList.remove("full"); win.hidden = true; btn.hidden = false; reset.hidden = true; render(); btn.focus(); });
});
$$("[data-moods]").forEach(function (w) {
var bs = $$(".mood-b", w), cards = $$(".mood-card", w);
bs.forEach(function (b) {
b.addEventListener("click", function () {
var id = b.dataset.mood;
bs.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
cards.forEach(function (c) {
var on = c.dataset.card === id; c.hidden = !on;
if (on) { c.classList.remove("pop"); void c.offsetWidth; c.classList.add("pop"); }
});
});
});
});
$$("[data-moka-w]").forEach(function (w) {
var chips = $$("[data-moka]", w), cup = $(".moka-cup", w), opis = $(".moka-opis", w);
chips.forEach(function (c) {
c.addEventListener("click", function () {
chips.forEach(function (x) { x.setAttribute("aria-pressed", x === c ? "true" : "false"); });
cup.style.setProperty("--liq", c.dataset.c);
w.dataset.f = c.dataset.moka; opis.textContent = c.dataset.opis;
w.classList.remove("stir"); void w.offsetWidth; w.classList.add("stir");
});
});
});
$$("[data-fokus]").forEach(function (f) {
var go = $("[data-f-go]", f), rs = $("[data-f-reset]", f), tm = $(".fokus-time", f), msg = $(".fokus-msg", f), lbl = $("span", go), ico = $("svg", go);
var FULL = 25 * 60, left = FULL, endAt = 0, timer = null, title = d.title;
var fmt = function (s) { return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
var draw = function () { tm.textContent = fmt(left); f.style.setProperty("--lvl", Math.max(left / FULL, 0.04)); };
var pause = function () { clearInterval(timer); timer = null; f.classList.remove("run"); lbl.textContent = f.dataset.start; ico.innerHTML = '<path d="M8.5 6.5l9 5.5-9 5.5z"/>'; d.title = title; };
var tick = function () {
left = Math.max(0, Math.round((endAt - Date.now()) / 1000)); draw();
d.title = "☕ " + fmt(left) + " · Coffeedream";
if (left === 0) { pause(); msg.textContent = f.dataset.end; var c = centerOf(f); burst(c[0], c[1], "bean", 18); }
};
go.addEventListener("click", function () {
if (timer) { pause(); return; }
if (left === 0) left = FULL;
msg.textContent = ""; endAt = Date.now() + left * 1000; timer = setInterval(tick, 1000); f.classList.add("run");
lbl.textContent = f.dataset.pause; ico.innerHTML = '<path d="M9 6.5v11M15 6.5v11"/>';
});
rs.addEventListener("click", function () { pause(); left = FULL; msg.textContent = ""; draw(); });
draw();
});
$$("[data-vid]").forEach(function (w) {
var v = $("video", w), b = $(".vid-b", w), user = false;
var setState = function () { var p = v.paused; w.classList.toggle("paused", p); b.setAttribute("aria-label", p ? b.dataset.play : b.dataset.pause); };
if (reduce) { w.classList.add("paused"); setState(); }
b.addEventListener("click", function () { user = true; if (v.paused) { v.play(); } else { v.pause(); } setTimeout(setState, 30); });
if ("IntersectionObserver" in window && !reduce) {
new IntersectionObserver(function (es) {
es.forEach(function (e) {
if (e.isIntersecting && !user) { v.preload = "auto"; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
else if (!e.isIntersecting) v.pause();
setTimeout(setState, 60);
});
}, { threshold: 0.35 }).observe(w);
}
v.addEventListener("play", setState); v.addEventListener("pause", setState);
});
var ld = $("#lok-data"), LOK = null;
if (ld) { try { LOK = JSON.parse(ld.textContent); } catch (e) { LOK = null; } }
function nowBelgrade() {
var parts = {};
try {
new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Belgrade", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
.formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
} catch (e) { var n = new Date(); return { day: n.getDay(), min: n.getHours() * 60 + n.getMinutes() }; }
var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
return { day: days[parts.weekday], min: parseInt(parts.hour, 10) * 60 + parseInt(parts.minute, 10) };
}
function hm(m) { m = ((m % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); }
function status(week) {
if (!week) return null;
var n = nowBelgrade(), today = week[n.day], yday = week[(n.day + 6) % 7];
if (yday && yday[1] > 1440 && n.min < yday[1] - 1440) return { open: true, until: yday[1] };
if (today && n.min >= today[0] && n.min < today[1]) return { open: true, until: today[1] };
if (today && n.min < today[0]) return { open: false, at: today[0] };
var tm = week[(n.day + 1) % 7]; return { open: false, at: tm ? tm[0] : null };
}
function paintStatus() {
if (!LOK) return;
var S = LOK.s;
LOK.l.forEach(function (l) {
var card = d.getElementById(l.id); if (!card) return;
var chip = $("[data-status]", card), st = status(l.week);
card.dataset.open = st && st.open ? "1" : "0";
if (!chip || !st) return;
chip.classList.toggle("open", st.open); chip.classList.toggle("closed", !st.open);
chip.textContent = st.open ? (st.until === 1440 ? S.lok_otvoreno_ponoc : S.lok_otvoreno.replace("{t}", hm(st.until)))
: (st.at != null ? S.lok_zatvoreno.replace("{t}", hm(st.at)) : S.lok_zatvoreno_dan);
});
}
paintStatus(); setInterval(paintStatus, 60000);
function km(a, b, c, e) {
var R = 6371, t = Math.PI / 180, x = (c - a) * t, y = (e - b) * t;
var h = Math.sin(x / 2) * Math.sin(x / 2) + Math.cos(a * t) * Math.cos(c * t) * Math.sin(y / 2) * Math.sin(y / 2);
return 2 * R * Math.asin(Math.sqrt(h));
}
var lang = d.body.dataset.lang;
var locPath = (LOK ? LOK.base : "") + (lang === "en" ? "/en/locations/" : "/lokacije/");
$$("[data-near]").forEach(function (w) {
var b = $("[data-near-go]", w), msg = $(".near-msg", w), list = $(".near-list", w);
b.addEventListener("click", function () {
if (!LOK || !navigator.geolocation) { msg.textContent = w.dataset.err; return; }
msg.textContent = w.dataset.searching; b.disabled = true;
navigator.geolocation.getCurrentPosition(function (p) {
b.disabled = false; msg.textContent = "";
var me = [p.coords.latitude, p.coords.longitude];
var near = LOK.l.map(function (l) { return { l: l, k: km(me[0], me[1], l.lat, l.lng) }; }).sort(function (x, y) { return x.k - y.k; }).slice(0, 3);
var onLocPage = !!$("[data-lks]");
list.innerHTML = near.map(function (n) {
var href = onLocPage ? "#" + n.l.id : locPath + "#" + n.l.id;
return '<li><a href="' + href + '" data-go="' + n.l.id + '"><b>' + n.l.naziv + '</b><span>' + w.dataset.dist.replace("{d}", n.k < 10 ? n.k.toFixed(1).replace(".", lang === "sr" ? "," : ".") : Math.round(n.k)) + "</span></a></li>";
}).join("");
list.hidden = false;
$$(".dot").forEach(function (dt) { dt.classList.toggle("hot", dt.dataset.id === near[0].l.id); });
placeMe(me);
}, function () { b.disabled = false; msg.textContent = w.dataset.err; }, { enableHighAccuracy: false, timeout: 9000, maximumAge: 300000 });
});
});
function placeMe(me) {
$$(".map").forEach(function (m) {
var g = $(".me", m); if (!g) return;
var box = [44.752, 44.838, 20.383, 20.530], vb = m.viewBox.baseVal;
if (me[0] < box[0] || me[0] > box[1] || me[1] < box[2] || me[1] > box[3]) return;
var x = (me[1] - box[2]) / (box[3] - box[2]) * vb.width, y = (box[1] - me[0]) / (box[1] - box[0]) * vb.height;
g.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")"); g.hidden = false;
});
}
$$(".dot").forEach(function (dt) {
var card = d.getElementById(dt.dataset.id);
dt.addEventListener("mouseenter", function () { if (card) card.classList.add("hl"); });
dt.addEventListener("mouseleave", function () { if (card) card.classList.remove("hl"); });
if (dt.tagName.toLowerCase() === "a" && window.matchMedia && window.matchMedia("(max-width: 880px)").matches) { dt.setAttribute("tabindex", "-1"); dt.setAttribute("aria-hidden", "true"); }
});
$$(".lk").forEach(function (c) {
var dot = $('.dot[data-id="' + c.id + '"]');
if (!dot) return;
c.addEventListener("mouseenter", function () { dot.classList.add("hl"); });
c.addEventListener("mouseleave", function () { dot.classList.remove("hl"); });
});
var fl = $("[data-filters]");
if (fl && LOK) {
var area = "all", openOnly = $("[data-open-now]", fl), garden = $("[data-garden]", fl), cnt = $("[data-count]", fl), empty = $("[data-lk-empty]");
var qs = new URLSearchParams(location.search);
if (qs.get("basta") === "1") garden.checked = true;
var apply = function () {
var n = 0;
$$(".lk").forEach(function (c) {
var ok = (area === "all" || c.dataset.area === area) && (!openOnly.checked || c.dataset.open === "1") && (!garden.checked || c.dataset.basta === "1");
c.hidden = !ok; if (ok) n++;
var dot = $('.dot[data-id="' + c.id + '"]'); if (dot) dot.style.opacity = ok ? "" : ".18";
});
cnt.textContent = LOK.s.lok_broj.replace("{n}", n); empty.hidden = n > 0;
};
$$("[data-area]", fl).forEach(function (b) {
b.addEventListener("click", function () {
area = b.dataset.area;
$$("[data-area]", fl).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
apply();
});
});
openOnly.addEventListener("change", apply); garden.addEventListener("change", apply);
apply();
}
var q = $("[data-q]");
if (q) {
var norm = function (s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "dj"); };
var items = $$(".it").map(function (li) { return { li: li, s: norm(li.dataset.s) }; });
var secs = $$("[data-mc]"), emptyM = $("[data-empty]");
q.addEventListener("input", function () {
var v = norm(q.value.trim()), any = false;
items.forEach(function (it) { it.li.hidden = v && it.s.indexOf(v) < 0; });
secs.forEach(function (s) { var vis = $$(".it", s).some(function (li) { return !li.hidden; }); s.hidden = !vis; if (vis) any = true; });
emptyM.hidden = any;
});
var chips = $$("[data-cats] .chip");
if ("IntersectionObserver" in window) {
var cio = new IntersectionObserver(function (es) {
es.forEach(function (e) {
if (e.isIntersecting) {
chips.forEach(function (c) { var on = c.getAttribute("href") === "#" + e.target.id; c.classList.toggle("cur", on); if (on && c.scrollIntoView) { var p = c.parentNode.parentNode; p.scrollTo({ left: c.parentNode.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" }); } });
}
});
}, { rootMargin: "-30% 0px -60% 0px" });
secs.forEach(function (s) { cio.observe(s); });
var rail = chips.length ? chips[0].parentNode.parentNode : null;
window.addEventListener("scroll", function () {
if (secs.length && window.scrollY < secs[0].offsetTop - innerHeight * .45) { chips.forEach(function (c) { c.classList.remove("cur"); }); if (rail && rail.scrollLeft) rail.scrollLeft = 0; }
}, { passive: true });
}
}
var tl = $("[data-tl]");
if (tl) {
var fillTl = function () {
var r = tl.getBoundingClientRect(), vh = window.innerHeight;
var p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
tl.style.setProperty("--p", p.toFixed(3));
};
fillTl(); window.addEventListener("scroll", fillTl, { passive: true }); window.addEventListener("resize", fillTl);
}
$$("[data-comp]").forEach(function (f) {
var msgEl = $(".comp-msg", f);
var compose = function () {
var fd = new FormData(f), lines = [], subj = f.dataset.subj;
fd.forEach(function (v, k) { subj = subj.replace("{" + k + "}", v); });
fd.forEach(function (v, k) {
if (!String(v).trim()) return;
var lab = f.querySelector('[name="' + k + '"]');
var name = lab && lab.closest(".fld") ? ($("span", lab.closest(".fld")) || $("legend", lab.closest(".fld")) || { textContent: k }).textContent : k;
lines.push(name + ": " + v);
});
return { subj: subj, body: lines.join("\n") };
};
var valid = function () {
var req = $$("[required]", f), ok = true;
req.forEach(function (el) { var bad = !el.value.trim(); el.setAttribute("aria-invalid", bad ? "true" : "false"); if (bad) ok = false; });
if (!ok) { msgEl.textContent = f.dataset.err; msgEl.classList.add("err"); var first = $("[aria-invalid=true]", f); if (first) first.focus(); }
else { msgEl.textContent = ""; msgEl.classList.remove("err"); }
return ok;
};
f.addEventListener("submit", function (e) {
e.preventDefault(); if (!valid()) return;
var c = compose();
location.href = "mailto:" + f.dataset.to + "?subject=" + encodeURIComponent(c.subj) + "&body=" + encodeURIComponent(c.body);
});
var cp = $("[data-copy]", f);
if (cp) cp.addEventListener("click", function () {
if (!valid()) return;
var c = compose(), txt = "Za: " + f.dataset.to + "\n" + c.subj + "\n\n" + c.body;
var done = function () { msgEl.textContent = f.dataset.copied; msgEl.classList.remove("err"); };
if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () {});
else { var ta = d.createElement("textarea"); ta.value = txt; d.body.appendChild(ta); ta.select(); try { d.execCommand("copy"); done(); } catch (e) {} ta.remove(); }
});
});
})();
