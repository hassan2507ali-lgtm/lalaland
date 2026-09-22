import React, { useMemo, useState } from 'react';

/* ============================================================
   Kopra Cash Management — AI OCR Document Checking (Cabang)
   Pure React functional component. No Tailwind, no UI library.
   Simpan sebagai Dashboard.jsx dan render <Dashboard />.
   ============================================================ */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

.kp { --navy:#12345a; --blue:#1c4e9c; --blue-soft:#eef3fb; --gold:#fdba12;
  --bg:#eef1f6; --surface:#fff; --border:#dde3ec; --border-soft:#f0f3f8;
  --ink:#1a2333; --ink2:#3d4759; --muted:#67718a; --muted2:#8a95a8;
  --ok:#1f9d6b; --ok-ink:#137a51; --ok-bg:#f2f7f4;
  --warn:#e08a00; --warn-ink:#8a6200; --warn-bg:#fff3d6;
  --crit:#e05c4a; --crit-ink:#b3382a; --crit-bg:#fdf3f1;
  --mono:'JetBrains Mono',ui-monospace,monospace;
  font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;
  -webkit-font-smoothing:antialiased; color:var(--ink);
  background:var(--bg); min-height:100vh; display:flex; flex-direction:column;
}
.kp *, .kp *::before, .kp *::after { box-sizing:border-box; }
.kp a { color:var(--blue); text-decoration:none; }
.kp a:hover { color:var(--navy); }
.kp h1 { margin:0; font-size:20px; font-weight:800; color:var(--navy); letter-spacing:-.02em; }
.kp button { font-family:inherit; }

/* ---------- topbar ---------- */
.kp-top { height:56px; background:var(--navy); display:flex; align-items:center;
  padding:0 24px; gap:20px; flex:none; position:relative; z-index:20; }
.kp-top__brand { display:flex; align-items:center; gap:10px; }
.kp-top__mark { width:26px; height:26px; border-radius:6px; background:var(--gold);
  display:flex; align-items:center; justify-content:center; font-weight:800; font-size:13px; color:var(--navy); }
.kp-top__title { color:#fff; font-weight:700; font-size:14px; letter-spacing:-.01em; }
.kp-top__rule { width:1px; height:18px; background:rgba(255,255,255,.22); }
.kp-top__sub { color:rgba(255,255,255,.72); font-size:12px; font-weight:500; }
.kp-top__spacer { flex:1; }
.kp-top__right { display:flex; align-items:center; gap:16px; }
.kp-bell { position:relative; padding:6px 8px; border-radius:7px; background:none; border:0;
  cursor:pointer; color:rgba(255,255,255,.85); display:flex; align-items:center; }
.kp-bell:hover, .kp-bell[aria-expanded="true"] { background:rgba(255,255,255,.12); }
.kp-bell__badge { position:absolute; top:2px; right:2px; min-width:15px; height:15px; padding:0 4px;
  border-radius:8px; background:var(--crit); color:#fff; font-size:9px; font-weight:800;
  display:flex; align-items:center; justify-content:center; border:1.5px solid var(--navy); }
.kp-who { text-align:right; }
.kp-who__name { color:#fff; font-size:11.5px; font-weight:600; line-height:1.3; }
.kp-who__role { color:rgba(255,255,255,.55); font-size:10.5px; }
.kp-avatar { width:30px; height:30px; border-radius:50%; background:#2b5fa8; color:#fff;
  font-size:11px; font-weight:700; display:flex; align-items:center; justify-content:center; }

/* ---------- notifications ---------- */
.kp-notif { position:absolute; top:52px; right:150px; width:352px; background:var(--surface);
  border:1px solid var(--border); border-radius:11px; box-shadow:0 12px 32px rgba(18,52,90,.18);
  z-index:30; overflow:hidden; }
.kp-notif__head { padding:12px 14px; border-bottom:1px solid #e8edf4; display:flex; align-items:center; }
.kp-notif__title { font-size:12.5px; font-weight:700; color:var(--navy); }
.kp-notif__mark { background:none; border:0; padding:0; cursor:pointer; font-size:11px;
  color:var(--blue); font-weight:700; }
.kp-notif__item { display:flex; gap:10px; padding:12px 14px; border-bottom:1px solid var(--border-soft);
  cursor:pointer; background:none; border-left:0; border-right:0; border-top:0; width:100%; text-align:left; }
.kp-notif__item:last-child { border-bottom:0; }
.kp-notif__item:hover { background:#f4f7fc; }
.kp-notif__item--unread { background:#fbfcfe; }
.kp-notif__dot { width:7px; height:7px; border-radius:50%; margin-top:5px; flex:none; }
.kp-notif__label { font-size:11.5px; font-weight:700; color:var(--ink); line-height:1.4; }
.kp-notif__label--read { font-weight:600; color:var(--ink2); }
.kp-notif__body { font-size:11px; color:var(--muted); line-height:1.5; margin-top:2px; }
.kp-notif__time { font-size:10px; color:var(--muted2); margin-top:4px; }

/* ---------- shell ---------- */
.kp-body { display:flex; flex:1; align-items:stretch; min-width:0; }
.kp-side { width:200px; flex:none; background:var(--surface); border-right:1px solid var(--border); padding:16px 0; }
.kp-side__label { padding:0 16px 10px; font-size:10px; font-weight:700; letter-spacing:.09em; color:var(--muted2); }
.kp-side__nav { display:flex; flex-direction:column; }
.kp-side__item { padding:9px 16px; font-size:12.5px; font-weight:500; color:#4a5568;
  border:0; border-left:3px solid transparent; background:none; text-align:left; cursor:pointer; }
.kp-side__item:hover { background:#f7f9fc; color:var(--navy); }
.kp-side__item--on { font-weight:700; color:var(--navy); background:var(--blue-soft); border-left-color:var(--blue); }
.kp-sla { margin:18px 12px 0; padding:12px; background:var(--navy); border-radius:9px; }
.kp-sla__label { font-size:10px; font-weight:700; letter-spacing:.07em; color:var(--gold); margin-bottom:7px; }
.kp-sla__value { font-family:var(--mono); font-size:21px; font-weight:500; color:#fff; letter-spacing:-.02em; }
.kp-sla__note { font-size:10px; color:rgba(255,255,255,.55); margin-top:3px; line-height:1.4; }
.kp-sla__track { height:4px; border-radius:2px; background:rgba(255,255,255,.16); margin-top:10px; overflow:hidden; }
.kp-sla__fill { height:4px; background:var(--gold); }
.kp-sum { margin:12px 12px 0; padding:11px 12px; border:1px solid #e0e6ef; border-radius:9px; }
.kp-sum__label { font-size:10px; font-weight:700; letter-spacing:.07em; color:var(--muted2); margin-bottom:8px; }
.kp-sum__rows { display:flex; flex-direction:column; gap:6px; }
.kp-sum__row { display:flex; justify-content:space-between; background:none; border:0; padding:0; cursor:pointer; }
.kp-sum__row:hover span:first-child { color:var(--blue); }
.kp-sum__row span:first-child { font-size:11px; color:var(--muted); }
.kp-sum__row span:last-child { font-size:11px; font-weight:700; color:var(--ink); }
.kp-sum__row--crit span:last-child { color:var(--crit-ink); }
.kp-sum__row--ok span:last-child { color:var(--ok-ink); }
.kp-main { flex:1; min-width:0; padding:20px 24px 32px; }

/* ---------- common ---------- */
.kp-head { display:flex; align-items:flex-start; gap:16px; margin-bottom:16px; }
.kp-head__crumb { font-size:11px; color:var(--muted2); font-weight:500; margin-bottom:6px; }
.kp-head__meta { font-size:12px; color:var(--muted); margin-top:5px; }
.kp-head__spacer { flex:1; }
.kp-head__actions { display:flex; align-items:center; gap:8px; flex:none; }
.kp-back { background:none; border:0; padding:0; font-size:11.5px; color:var(--blue);
  font-weight:600; cursor:pointer; margin-bottom:7px; display:block; }
.kp-back:hover { color:var(--navy); }

.kp-btn { padding:7px 14px; border-radius:7px; font-size:12px; font-weight:700; border:0;
  cursor:pointer; background:var(--blue); color:#fff; line-height:1.35; }
.kp-btn:hover { background:var(--navy); }
.kp-btn:disabled { background:#e8edf4; color:#a3adbd; cursor:default; }
.kp-btn--ghost { padding:7px 12px; font-weight:600; background:var(--surface);
  color:var(--ink2); border:1px solid #d3dae5; }
.kp-btn--ghost:hover { background:#f7f9fc; color:var(--navy); }
.kp-btn--sm { padding:5px 9px; border-radius:5px; font-size:10.5px; }
.kp-btn--md { padding:6px 10px; border-radius:6px; font-size:11px; }

.kp-card { background:var(--surface); border:1px solid var(--border); border-radius:10px; overflow:hidden; }
.kp-card__head { padding:11px 14px; border-bottom:1px solid #e8edf4; display:flex;
  align-items:center; gap:7px; flex-wrap:wrap; }
.kp-card__title { font-size:12.5px; font-weight:700; color:var(--navy); }
.kp-card__spacer { flex:1; }

.kp-chip { padding:5px 10px; border-radius:6px; background:#f2f5f9; color:var(--muted);
  font-size:11.5px; font-weight:600; border:0; cursor:pointer; }
.kp-chip:hover { background:#e8edf4; }
.kp-chip--on { background:var(--navy); color:#fff; font-weight:700; }
.kp-chip--crit { background:var(--crit-bg); color:var(--crit-ink); font-weight:700; }
.kp-chip--warn { background:var(--warn-bg); color:var(--warn-ink); font-weight:700; }
.kp-chip--ok { background:var(--ok-bg); color:var(--ok-ink); font-weight:700; }

.kp-search { padding:6px 10px; border:1px solid #e0e6ef; border-radius:6px; font-size:11.5px;
  font-family:inherit; color:var(--ink2); width:210px; background:var(--surface); }
.kp-search:focus { outline:0; border-color:var(--blue); }
.kp-search::placeholder { color:var(--muted2); }

.kp-pill { display:inline-flex; align-items:center; gap:5px; padding:3px 8px; border-radius:5px;
  font-size:10.5px; font-weight:700; white-space:nowrap; }
.kp-pill--crit { background:var(--crit-bg); color:var(--crit-ink); }
.kp-pill--warn { background:var(--warn-bg); color:var(--warn-ink); }
.kp-pill--ok { background:var(--ok-bg); color:var(--ok-ink); }
.kp-pill--info { background:var(--blue-soft); color:var(--blue); }
.kp-pill--draft { background:#f2f5f9; color:var(--muted); }
.kp-pill__dot { width:6px; height:6px; border-radius:50%; background:currentColor; }
.kp-pill__dot--live { animation:kp-pulse 1.4s infinite; }
@keyframes kp-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
@keyframes kp-spin { to { transform:rotate(360deg) } }

.kp-count { display:inline-block; min-width:20px; padding:2px 6px; border-radius:5px;
  font-size:10.5px; font-weight:800; }
.kp-count--crit { background:var(--crit); color:#fff; }
.kp-count--warn { background:var(--warn-bg); color:var(--warn-ink); }
.kp-count--ok { background:var(--ok-bg); color:var(--ok-ink); }
.kp-count--none { background:#f2f5f9; color:var(--muted2); font-weight:700; }

.kp-mono { font-family:var(--mono); font-weight:500; }

/* ---------- queue table ---------- */
.kp-table { width:100%; border-collapse:collapse; }
.kp-table thead th { padding:9px 14px; background:#f7f9fc; border-bottom:1px solid #e8edf4;
  font-size:10px; font-weight:700; letter-spacing:.05em; color:var(--muted2);
  text-align:left; white-space:nowrap; }
.kp-table thead th.srt { cursor:pointer; user-select:none; }
.kp-table thead th.srt:hover { color:var(--blue); }
.kp-table thead th .kp-arrow { margin-left:4px; color:var(--blue); }
.kp-table tbody td { padding:11px 14px; border-bottom:1px solid var(--border-soft);
  font-size:11.5px; color:var(--ink2); vertical-align:middle; }
.kp-table tbody tr:last-child td { border-bottom:0; }
.kp-table tbody tr { cursor:pointer; }
.kp-table tbody tr:hover { background:#f7f9fc; }
.kp-table tbody tr.flag { background:#fffcf7; }
.kp-table tbody tr.flag:hover { background:#fff8ec; }
.kp-table tbody tr.sel { background:var(--blue-soft); }
.kp-table tbody tr.sel:hover { background:#e4edfa; }
.kp-table .c-id { font-family:var(--mono); font-weight:500; color:var(--blue); }
.kp-table .c-co { font-size:12px; font-weight:700; color:var(--ink); }
.kp-table .c-mid { text-align:center; }
.kp-table .c-mut { color:var(--muted); }
.kp-table .c-act { text-align:right; white-space:nowrap; }
.kp-table__open { font-size:11.5px; font-weight:700; color:var(--blue); background:none;
  border:0; cursor:pointer; padding:0; }
.kp-table__open:hover { text-decoration:underline; }
.kp-check { width:13px; height:13px; accent-color:var(--blue); cursor:pointer; }
.kp-empty-row { padding:34px 14px; text-align:center; font-size:12px; color:var(--muted); }
.kp-foot { padding:10px 14px; border-top:1px solid #e8edf4; display:flex; align-items:center; gap:8px; }
.kp-foot__text { font-size:11.5px; color:var(--muted); }
.kp-foot__spacer { flex:1; }
.kp-page { padding:4px 9px; border:1px solid #e0e6ef; border-radius:5px; background:var(--surface);
  color:var(--ink2); font-size:11px; font-weight:600; cursor:pointer; }
.kp-page:hover:not(:disabled) { background:#f7f9fc; }
.kp-page:disabled { color:#b0b9c8; cursor:default; }
.kp-page--on { background:var(--navy); border-color:var(--navy); color:#fff; font-weight:700; }
.kp-bulk { padding:10px 14px; border-top:1px solid #e8edf4; display:flex; align-items:center;
  gap:8px; background:#fbfcfe; }
.kp-bulk__text { font-size:11.5px; color:var(--ink2); font-weight:600; }

/* ---------- stats ---------- */
.kp-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-bottom:14px; }
.kp-stat { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:13px 15px; }
.kp-stat__label { font-size:10.5px; font-weight:700; letter-spacing:.06em; color:var(--muted2); margin-bottom:7px; }
.kp-stat__row { display:flex; align-items:baseline; gap:6px; }
.kp-stat__value { font-family:var(--mono); font-size:22px; font-weight:500; color:var(--navy); }
.kp-stat__value--ok { color:var(--ok-ink); }
.kp-stat__value--crit { color:var(--crit-ink); }
.kp-stat__note { font-size:11px; color:var(--muted); }

/* ---------- empty state ---------- */
.kp-empty { background:var(--surface); border:1px solid var(--border); border-radius:10px;
  padding:76px 40px; display:flex; flex-direction:column; align-items:center; text-align:center; }
.kp-empty__doc { width:72px; height:88px; border:2px dashed #c9d2e0; border-radius:6px;
  position:relative; margin-bottom:22px; }
.kp-empty__line { position:absolute; left:14px; height:3px; border-radius:2px; background:#e4e9f1; }
.kp-empty__title { font-size:16px; font-weight:800; color:var(--navy); letter-spacing:-.01em; }
.kp-empty__body { font-size:12.5px; color:var(--muted); line-height:1.65; margin-top:8px; max-width:400px; }

/* ---------- steps / new request ---------- */
.kp-steps { display:flex; align-items:center; gap:10px; margin-bottom:20px; max-width:560px; }
.kp-steps__item { display:flex; align-items:center; gap:7px; }
.kp-steps__num { width:20px; height:20px; border-radius:50%; font-size:10px; font-weight:800;
  display:flex; align-items:center; justify-content:center; background:#e4e9f1; color:var(--muted2); }
.kp-steps__num--on { background:var(--blue); color:#fff; }
.kp-steps__label { font-size:11.5px; font-weight:600; color:var(--muted2); }
.kp-steps__label--on { font-weight:700; color:var(--navy); }
.kp-steps__bar { flex:1; height:1px; background:var(--border); }
.kp-needs { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; max-width:820px; }
.kp-need { background:var(--surface); border:1px solid var(--border); border-radius:10px;
  padding:16px; position:relative; cursor:pointer; text-align:left; }
.kp-need:hover { border-color:#b6c3d6; }
.kp-need--on { border:2px solid var(--blue); box-shadow:0 2px 10px rgba(28,78,156,.1); }
.kp-need__tick { position:absolute; top:14px; right:14px; width:18px; height:18px; border-radius:50%;
  background:var(--blue); color:#fff; font-size:11px; font-weight:800;
  display:flex; align-items:center; justify-content:center; }
.kp-need__title { font-size:13.5px; font-weight:800; color:var(--navy); margin-bottom:6px; }
.kp-need__body { font-size:11.5px; color:var(--muted); line-height:1.6; }
.kp-need__docs { margin-top:12px; padding-top:11px; border-top:1px solid var(--border-soft);
  font-size:10.5px; color:var(--muted2); font-weight:600; }

/* ---------- upload ---------- */
.kp-slots { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; }
.kp-slot { background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:14px; }
.kp-slot--warn { border-color:#e5c98a; }
.kp-slot--crit { border-color:#f3cfc9; }
.kp-slot__head { display:flex; align-items:flex-start; gap:8px; margin-bottom:11px; }
.kp-slot__num { width:20px; height:20px; border-radius:5px; color:#fff; font-size:10px; font-weight:800;
  display:flex; align-items:center; justify-content:center; flex:none; background:var(--navy); }
.kp-slot__name { font-size:12.5px; font-weight:700; color:var(--navy); line-height:1.3; }
.kp-slot__req { font-size:10.5px; color:var(--muted2); margin-top:2px; }
.kp-file { border:1px solid #cfe6da; background:#f7fcf9; border-radius:8px; padding:11px; }
.kp-file--warn { border-color:#e5c98a; background:#fffaf2; }
.kp-file--crit { border-color:#f3cfc9; background:var(--crit-bg); }
.kp-file__row { display:flex; align-items:center; gap:8px; }
.kp-file__thumb { width:30px; height:38px; border:1px solid currentColor; border-radius:3px;
  background:#fff; flex:none; color:#cfe6da; display:flex; align-items:center; justify-content:center;
  font-size:7px; }
.kp-file__name { font-size:11px; font-weight:600; color:var(--ink); overflow:hidden;
  text-overflow:ellipsis; white-space:nowrap; }
.kp-file__meta { font-size:10px; color:var(--muted); margin-top:2px; }
.kp-file__foot { margin-top:9px; padding-top:9px; border-top:1px solid rgba(0,0,0,.06);
  display:flex; align-items:center; gap:6px; }
.kp-file__ok { font-size:10.5px; color:var(--ok-ink); font-weight:700; }
.kp-file__warn { font-size:10.5px; color:var(--warn-ink); font-weight:700; line-height:1.5; }
.kp-file__crit { font-size:10.5px; color:var(--crit-ink); font-weight:700; line-height:1.5; }
.kp-file__hint { font-size:10.5px; color:var(--muted); line-height:1.5; margin-top:3px; }
.kp-file__acts { display:flex; gap:6px; margin-top:8px; }
.kp-link { background:none; border:0; padding:0; cursor:pointer; font-size:10.5px;
  color:var(--blue); font-weight:700; }
.kp-link:hover { text-decoration:underline; }
.kp-drop { border:1.5px dashed #c9d2e0; background:#fafbfd; border-radius:8px; padding:18px 12px;
  display:flex; flex-direction:column; align-items:center; text-align:center; cursor:pointer; width:100%; }
.kp-drop:hover { border-color:var(--blue); background:#f6f9fe; }
.kp-drop__plus { width:26px; height:26px; border-radius:50%; border:1.5px solid #b6c3d6;
  display:flex; align-items:center; justify-content:center; color:var(--muted2);
  font-size:14px; font-weight:600; margin-bottom:8px; }
.kp-drop__title { font-size:11px; font-weight:700; color:var(--ink2); }
.kp-drop__hint { font-size:10.5px; color:var(--muted2); margin-top:3px; line-height:1.5; }

/* ---------- progress ---------- */
.kp-hero { background:var(--navy); border-radius:11px; padding:20px 22px; margin-bottom:14px;
  display:flex; align-items:center; gap:26px; flex-wrap:wrap; }
.kp-hero__label { font-size:10.5px; font-weight:700; letter-spacing:.08em; color:var(--gold); margin-bottom:8px; }
.kp-hero__big { font-family:var(--mono); font-size:32px; font-weight:500; color:#fff; letter-spacing:-.03em; }
.kp-hero__note { font-size:12px; color:rgba(255,255,255,.6); }
.kp-hero__track { width:420px; max-width:100%; height:6px; border-radius:3px;
  background:rgba(255,255,255,.16); margin-top:12px; overflow:hidden; }
.kp-hero__fill { height:6px; background:var(--gold); }
.kp-hero__rule { width:1px; height:66px; background:rgba(255,255,255,.16); }
.kp-hero__stats { display:flex; gap:28px; flex-wrap:wrap; }
.kp-hero__k { font-size:10.5px; color:rgba(255,255,255,.55); margin-bottom:5px; }
.kp-hero__v { font-family:var(--mono); font-size:19px; color:#fff; font-weight:500; }
.kp-hero__v--crit { color:#ff9a8a; }
.kp-spin { width:11px; height:11px; border:2px solid #dbe3ee; border-top-color:var(--blue);
  border-radius:50%; animation:kp-spin .8s linear infinite; display:inline-block; }
.kp-stage { display:grid; grid-template-columns:1.5fr 108px 108px 108px 122px 96px;
  padding:12px 14px; gap:10px; align-items:center; border-bottom:1px solid var(--border-soft); }
.kp-stage--head { padding:9px 14px; background:#f7f9fc; border-bottom:1px solid #e8edf4; }
.kp-stage--head > div { font-size:10px; font-weight:700; letter-spacing:.05em; color:var(--muted2); }
.kp-stage:last-child { border-bottom:0; }
.kp-stage__name { font-size:12px; font-weight:700; color:var(--ink); }
.kp-stage__name--off { font-weight:600; color:var(--muted2); }
.kp-stage__sub { font-size:10.5px; margin-top:2px; }
.kp-stage__ok { font-size:11px; color:var(--ok-ink); font-weight:700; }
.kp-stage__run { font-size:11px; color:var(--blue); font-weight:700; }
.kp-stage__wait { font-size:11px; color:#b0b9c8; font-weight:600; }
.kp-stage__fail { font-size:11px; color:var(--crit-ink); font-weight:700; }
.kp-stage__num { font-family:var(--mono); font-size:11.5px; color:var(--ink2); text-align:right; }

/* ---------- result checklist ---------- */
.kp-banner { background:var(--surface); border:1px solid #f3cfc9; border-radius:10px;
  padding:14px 16px; margin-bottom:14px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.kp-banner--ok { border-color:#cfe6da; }
.kp-banner__icon { width:30px; height:30px; border-radius:50%; background:var(--crit-bg);
  color:var(--crit-ink); font-size:15px; font-weight:800; display:flex; align-items:center;
  justify-content:center; flex:none; }
.kp-banner__icon--ok { background:var(--ok-bg); color:var(--ok-ink); font-size:14px; }
.kp-banner__title { font-size:12.5px; font-weight:800; color:var(--crit-ink); }
.kp-banner__title--ok { color:var(--ok-ink); }
.kp-banner__body { font-size:11.5px; color:#5a6478; line-height:1.55; margin-top:3px; }
.kp-banner__spacer { flex:1; }
.kp-crow { display:flex; align-items:center; gap:14px; padding:14px;
  border-bottom:1px solid var(--border-soft); cursor:pointer; background:none; border-left:0;
  border-right:0; border-top:0; width:100%; text-align:left; }
.kp-crow:last-child { border-bottom:0; }
.kp-crow:hover { background:#f7f9fc; }
.kp-crow--flag { background:#fffcf7; }
.kp-crow--flag:hover { background:#fff8ec; }
.kp-crow--off { background:#fbfcfe; cursor:default; }
.kp-crow--off:hover { background:#fbfcfe; }
.kp-crow__num { width:26px; height:26px; border-radius:6px; color:#fff; font-size:11px;
  font-weight:800; display:flex; align-items:center; justify-content:center; flex:none; }
.kp-crow__name { font-size:12.5px; font-weight:700; color:var(--ink); }
.kp-crow__name--off { font-weight:600; color:var(--muted2); }
.kp-crow__file { font-size:10.5px; color:var(--muted2); margin-top:2px; }
.kp-crow__stat { width:150px; flex:none; }
.kp-crow__statline { font-size:11px; color:var(--muted); }
.kp-crow__bar { height:4px; border-radius:2px; background:#eef1f6; margin-top:5px;
  overflow:hidden; display:flex; }
.kp-crow__desc { flex:1; font-size:11.5px; color:#5a6478; line-height:1.5; }
.kp-crow__end { flex:none; display:flex; align-items:center; gap:10px; }
.kp-crow__go { font-size:11.5px; color:var(--blue); font-weight:700; }

/* ---------- detail: doc tabs ---------- */
.kp-tabs { display:flex; gap:6px; margin-bottom:14px; padding:5px; background:var(--surface);
  border:1px solid var(--border); border-radius:9px; }
.kp-tab { flex:1; padding:8px 10px; border-radius:6px; border:0; background:none;
  cursor:pointer; text-align:left; }
.kp-tab:hover { background:#f7f9fc; }
.kp-tab--on { background:var(--navy); }
.kp-tab--on:hover { background:var(--navy); }
.kp-tab--off { cursor:default; }
.kp-tab--off:hover { background:none; }
.kp-tab__label { font-size:10px; font-weight:600; color:var(--muted2); margin-bottom:3px; }
.kp-tab--on .kp-tab__label { color:rgba(255,255,255,.72); }
.kp-tab__row { display:flex; align-items:center; gap:6px; }
.kp-tab__dot { width:6px; height:6px; border-radius:50%; }
.kp-tab__state { font-size:11.5px; font-weight:700; color:var(--ink2); }
.kp-tab--on .kp-tab__state { color:#fff; }
.kp-tab__state--off { font-weight:600; color:var(--muted2); }

/* ---------- detail: field panel + viewer ---------- */
.kp-split { display:flex; gap:16px; align-items:flex-start; }
.kp-panel { width:434px; flex:none; background:var(--surface); border:1px solid var(--border);
  border-radius:10px; overflow:hidden; }
.kp-panel__sec { padding:10px 14px 4px; font-size:10px; font-weight:700; letter-spacing:.08em;
  color:var(--muted2); border-top:1px solid var(--border-soft); }
.kp-field { padding:10px 14px; border-top:1px solid var(--border-soft); cursor:pointer;
  background:none; border-left:0; border-right:0; border-bottom:0; width:100%; text-align:left; }
.kp-field:hover { background:#fbfcfe; }
.kp-field--crit { background:#fff8f6; border-left:3px solid var(--crit); padding:11px 14px; }
.kp-field--crit:hover { background:#fff3ef; }
.kp-field--warn { background:#fffaf2; border-left:3px solid var(--warn); padding:11px 14px; }
.kp-field--warn:hover { background:#fff6e9; }
.kp-field--on { box-shadow:inset 0 0 0 2px var(--blue); }
.kp-field__top { display:flex; justify-content:space-between; gap:8px; }
.kp-field__label { font-size:11px; color:var(--muted); font-weight:500; }
.kp-field__conf { font-size:10px; font-weight:700; }
.kp-field__conf--ok { color:var(--ok); }
.kp-field__conf--warn { color:var(--warn); }
.kp-field__conf--crit { color:var(--crit-ink); }
.kp-field__value { font-size:12.5px; color:var(--ink); font-weight:600; margin-top:3px; line-height:1.45; }
.kp-field__value--mono { font-family:var(--mono); font-weight:500; }
.kp-field__note { font-size:10.5px; font-weight:700; margin-top:6px; }
.kp-field__note--crit { color:var(--crit-ink); }
.kp-field__note--warn { color:var(--warn-ink); }
.kp-cmp { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px; }
.kp-cmp__box { padding:7px 8px; border-radius:6px; }
.kp-cmp__box--doc { background:#fff; border:1px solid #f3cfc9; }
.kp-cmp__box--doc-warn { background:#fff; border:1px solid #f3e6cc; }
.kp-cmp__box--src { background:#f7fcf9; border:1px solid #cfe6da; }
.kp-cmp__box--neutral { background:#f7f9fc; border:1px solid #e4e9f1; }
.kp-cmp__k { font-size:9.5px; font-weight:700; margin-bottom:3px; }
.kp-cmp__k--doc { color:#8a6f6a; }
.kp-cmp__k--src { color:#5f7a6c; }
.kp-cmp__k--neutral { color:var(--muted); }
.kp-cmp__v { font-size:12px; font-weight:600; word-break:break-word; }
.kp-cmp__v--mono { font-family:var(--mono); font-weight:500; }
.kp-cmp__v--doc { color:var(--crit-ink); }
.kp-cmp__v--doc-warn { color:var(--warn-ink); }
.kp-cmp__v--src { color:var(--ok-ink); }
.kp-cmp__v--neutral { color:var(--ink2); }
.kp-input { display:flex; align-items:center; gap:8px; padding:7px 9px; border:1.5px solid var(--blue);
  border-radius:6px; background:#fff; margin-top:7px; }
.kp-input__txt { font-family:var(--mono); font-size:12.5px; color:var(--ink); }
.kp-input__gap { width:16px; height:18px; border-radius:3px; background:var(--warn-bg);
  border:1px solid #e5c98a; }
.kp-input__hint { font-size:10px; color:var(--muted2); font-weight:600; }
.kp-sig { display:flex; gap:8px; align-items:center; margin-top:8px; }
.kp-sig__box { flex:1; height:56px; border:1px dashed #d3dae5; border-radius:6px; background:#fff;
  display:flex; flex-direction:column; align-items:center; justify-content:center; }
.kp-sig__k { font-size:9.5px; color:var(--muted2); font-weight:600; }
.kp-sig__ph { font-size:8.5px; color:#b0b9c8; }
.kp-sig__pct { width:42px; text-align:center; }
.kp-sig__num { font-family:var(--mono); font-size:15px; font-weight:500; color:var(--crit-ink); }
.kp-sig__min { font-size:8.5px; color:var(--muted2); font-weight:600; }
.kp-marks { display:flex; gap:6px; margin-top:9px; }
.kp-mark { flex:1; padding:6px; border-radius:5px; background:var(--ok-bg); text-align:center; }
.kp-mark__k { font-size:9.5px; color:#5f7a6c; font-weight:700; }
.kp-mark__v { font-size:10px; color:var(--ok-ink); font-weight:700; margin-top:2px; }
.kp-tagwrap { padding:10px 14px; border-top:1px solid var(--border-soft); display:flex;
  flex-wrap:wrap; gap:6px; }
.kp-tag { padding:4px 8px; border-radius:5px; background:var(--ok-bg); color:var(--ok-ink);
  font-size:10.5px; font-weight:600; }

.kp-viewer { flex:1; min-width:0; background:var(--surface); border:1px solid var(--border);
  border-radius:10px; overflow:hidden; }
.kp-viewer__bar { padding:10px 14px; border-bottom:1px solid #e8edf4; display:flex;
  align-items:center; gap:10px; flex-wrap:wrap; }
.kp-viewer__name { font-size:12.5px; font-weight:700; color:var(--navy); }
.kp-viewer__pages { display:flex; gap:4px; }
.kp-pagebtn { padding:3px 7px; border-radius:4px; background:#f2f5f9; color:var(--muted);
  font-size:10px; font-weight:600; border:0; cursor:pointer; }
.kp-pagebtn:hover { background:#e8edf4; }
.kp-pagebtn--on { background:var(--navy); color:#fff; font-weight:700; }
.kp-pagebtn--on:hover { background:var(--navy); }
.kp-zoom { padding:4px 8px; border:1px solid #e0e6ef; border-radius:5px; font-size:11px;
  color:var(--ink2); font-weight:600; background:var(--surface); cursor:pointer; }
.kp-zoom:hover { background:#f7f9fc; }
.kp-zoom__val { font-size:11px; color:var(--ink2); font-weight:600; width:38px; text-align:center; }
.kp-hl { padding:4px 9px; border-radius:5px; background:var(--warn-bg); border:1px solid #e5c98a;
  font-size:11px; color:var(--warn-ink); font-weight:700; cursor:pointer; }
.kp-hl--off { background:var(--surface); border-color:#e0e6ef; color:var(--ink2); font-weight:600; }
.kp-viewer__stage { padding:22px; background:#e4e8f0; display:flex; justify-content:center; }
.kp-paper { width:100%; max-width:560px; background:#fff; box-shadow:0 2px 14px rgba(18,52,90,.14);
  padding:28px 32px; position:relative; }
.kp-paper__head { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; }
.kp-paper__logo { width:100px; height:23px; background:#eef1f6; border:1px dashed #c9d2e0;
  display:flex; align-items:center; justify-content:center; font-size:8px; color:#98a2b3; letter-spacing:.06em; }
.kp-paper__t1 { font-size:10.5px; font-weight:700; color:#2c3648; }
.kp-paper__t2 { font-size:8.5px; color:var(--muted2); }
.kp-paper__rule { height:1px; background:#e0e6ef; margin-bottom:15px; }
.kp-paper__sec { font-size:9px; font-weight:700; color:#5a6478; letter-spacing:.06em; margin-bottom:8px; }
.kp-paper__grid { display:grid; grid-template-columns:124px 1fr; row-gap:10px; column-gap:11px; margin-bottom:17px; }
.kp-paper__k { font-size:9px; color:var(--muted2); }
.kp-paper__v { font-size:9.5px; color:var(--ink); border-bottom:1px solid #eef1f6; padding-bottom:2px; }
.kp-paper__v--mono { font-family:var(--mono); }
.kp-paper__opts { display:flex; gap:16px; margin-bottom:17px; }
.kp-paper__opt { display:flex; align-items:center; gap:5px; }
.kp-paper__box { width:9px; height:9px; border:1px solid #98a2b3; }
.kp-paper__box--on { background:#2c3648; }
.kp-paper__optlabel { font-size:9px; color:#2c3648; }
.kp-paper__optlabel--off { color:var(--muted2); }
.kp-region { position:relative; }
.kp-region__hit { padding:2px 5px; font-size:9.5px; color:var(--ink); cursor:pointer;
  background:none; border:0; text-align:left; width:100%; font-family:var(--mono); }
.kp-region--crit .kp-region__hit { outline:2px solid var(--crit); background:rgba(224,92,74,.1); }
.kp-region--warn .kp-region__hit { outline:2px solid var(--warn); background:rgba(224,138,0,.1); }
.kp-region--plain .kp-region__hit { outline:2px dashed #c9d2e0; }
.kp-region__pin { position:absolute; top:-8px; left:-8px; width:16px; height:16px; border-radius:50%;
  color:#fff; font-size:8.5px; font-weight:800; display:flex; align-items:center; justify-content:center; }
.kp-region__pin--crit { background:var(--crit); }
.kp-region__pin--warn { background:var(--warn); }
.kp-gap { background:#f3d9a6; }
.kp-sigarea { display:flex; gap:12px; align-items:flex-start; }
.kp-sigarea__box { height:58px; outline:2px solid var(--crit); background:rgba(224,92,74,.06);
  border:1px dashed #c9d2e0; display:flex; align-items:center; justify-content:center;
  font-size:8.5px; color:#98a2b3; }
.kp-sigarea__cap { font-size:8.5px; color:var(--muted2); margin-top:4px; text-align:center; }
.kp-sigarea__stamp { width:58px; height:58px; border:1px dashed #c9d2e0; display:flex;
  align-items:center; justify-content:center; font-size:7.5px; color:#98a2b3;
  text-align:center; line-height:1.3; }

/* ---------- findings ---------- */
.kp-finds { display:flex; flex-direction:column; gap:12px; max-width:1080px; }
.kp-find { background:var(--surface); border:1px solid var(--border); border-radius:10px;
  overflow:hidden; border-left:3px solid var(--crit); }
.kp-find--warn { border-left-color:var(--warn); }
.kp-find--done { border-left-color:var(--ok); }
.kp-find__in { padding:13px 15px; display:flex; align-items:flex-start; gap:12px; }
.kp-find__num { width:22px; height:22px; border-radius:5px; color:#fff; font-size:11px;
  font-weight:800; display:flex; align-items:center; justify-content:center; flex:none;
  background:var(--crit); }
.kp-find__num--warn { background:var(--warn); }
.kp-find__num--done { background:var(--ok); }
.kp-find__title { font-size:13px; font-weight:800; color:var(--ink); }
.kp-find__title--done { font-weight:700; color:var(--ink2); text-decoration:line-through; }
.kp-find__where { font-size:11.5px; color:var(--muted); margin-top:4px; }
.kp-find__body { font-size:11.5px; color:#5a6478; line-height:1.55; margin-top:9px; }
.kp-find__cmp { display:grid; gap:10px; margin-top:11px; }
.kp-find__acts { display:flex; gap:7px; margin-top:12px; flex-wrap:wrap; }
.kp-find__head { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }

/* ---------- tracking ---------- */
.kp-flow { background:var(--surface); border:1px solid var(--border); border-radius:10px;
  padding:22px 24px; margin-bottom:14px; }
.kp-flow__row { display:flex; align-items:flex-start; }
.kp-flow__step { flex:1; display:flex; flex-direction:column; align-items:center; text-align:center; }
.kp-flow__num { width:30px; height:30px; border-radius:50%; font-size:12px; font-weight:800;
  display:flex; align-items:center; justify-content:center; background:#e4e9f1; color:var(--muted2); }
.kp-flow__num--done { background:var(--ok); color:#fff; font-size:13px; }
.kp-flow__num--on { background:var(--blue); color:#fff; box-shadow:0 0 0 4px rgba(28,78,156,.14); }
.kp-flow__name { font-size:12px; font-weight:600; color:var(--muted2); margin-top:9px; }
.kp-flow__name--done { font-weight:700; color:var(--ink); }
.kp-flow__name--on { font-weight:700; color:var(--navy); }
.kp-flow__note { font-size:11px; color:#b0b9c8; margin-top:3px; line-height:1.5; }
.kp-flow__note--done { color:var(--muted); }
.kp-flow__note--on { color:var(--blue); font-weight:600; }
.kp-flow__bar { flex:1; height:2px; background:#e4e9f1; margin-top:14px; }
.kp-flow__bar--done { background:var(--ok); }
.kp-cols { display:flex; gap:14px; align-items:flex-start; flex-wrap:wrap; }
.kp-filerow { padding:11px 14px; border-bottom:1px solid var(--border-soft); display:flex;
  align-items:center; gap:10px; }
.kp-filerow:last-child { border-bottom:0; }
.kp-filerow__dot { width:6px; height:6px; border-radius:50%; background:var(--ok); }
.kp-filerow__name { font-size:11.5px; color:var(--ink2); flex:1; }
.kp-filerow__size { font-size:11px; color:var(--muted2); }
.kp-kv { display:flex; justify-content:space-between; }
.kp-kv span:first-child { font-size:11.5px; color:var(--muted); }
.kp-kv span:last-child { font-family:var(--mono); font-size:12px; color:var(--ink); font-weight:500; }

/* ---------- audit ---------- */
.kp-time { background:var(--surface); border:1px solid var(--border); border-radius:10px;
  padding:22px 24px; max-width:920px; }
.kp-ev { display:flex; gap:14px; }
.kp-ev__rail { width:22px; flex:none; display:flex; flex-direction:column; align-items:center; }
.kp-ev__dot { width:11px; height:11px; border-radius:50%; }
.kp-ev__line { flex:1; width:2px; background:#e4e9f1; margin-top:3px; }
.kp-ev__main { flex:1; padding-bottom:22px; }
.kp-ev__main--last { padding-bottom:0; }
.kp-ev__head { display:flex; align-items:baseline; gap:9px; flex-wrap:wrap; }
.kp-ev__title { font-size:12.5px; font-weight:800; color:var(--navy); }
.kp-ev__time { font-family:var(--mono); font-size:11px; color:var(--muted2); }
.kp-ev__body { font-size:11.5px; color:#5a6478; line-height:1.6; margin-top:4px; }

/* ---------- mount point for your own component ---------- */
.kp-workspace { margin-top:14px; padding:14px; background:var(--surface);
  border:1px solid var(--border); border-radius:10px; }
.kp-workspace__label { font-size:10.5px; font-weight:700; letter-spacing:.06em;
  color:var(--muted2); margin-bottom:10px; }
#kyc-workspace-placeholder { min-height:320px; }
`;

/* ===================== DATA ===================== */

const NAV = [
  { key: 'queue', label: 'Daftar Permohonan', match: ['queue', 'empty'] },
  { key: 'new', label: 'Permohonan Baru', match: ['new', 'upload', 'progress'] },
  { key: 'result', label: 'Hasil Pemeriksaan', match: ['result', 'detail', 'findings'] },
  { key: 'tracking', label: 'Status Pengiriman', match: ['tracking'] },
  { key: 'audit', label: 'Riwayat', match: ['audit'] }
];

const NOTIFS = [
  { id: 'n1', tone: '#1f9d6b', unread: true, go: 'progress', label: 'Ekstraksi AI selesai', body: 'REQ-2026-004182 · PT Rizky Gemilang · 47 field terbaca dari 6 dokumen', time: '4 menit lalu' },
  { id: 'n2', tone: '#e05c4a', unread: true, go: 'findings', label: '4 temuan baru ditemukan', body: 'REQ-2026-004182 · 2 kritis, 2 peringatan. Perlu diperbaiki sebelum kirim.', time: '4 menit lalu' },
  { id: 'n3', tone: '#e08a00', unread: true, go: 'queue', label: 'Batas SLA mendekat', body: 'REQ-2026-004156 · PT Anugrah Perkasa · sisa 1 jam 12 menit', time: '1 jam lalu' },
  { id: 'n4', tone: '#c9d2e0', unread: false, go: 'tracking', label: 'Permohonan dikembalikan Ops', body: 'REQ-2026-004097 · PT Universal · Surat Kuasa kurang materai', time: 'Kemarin, 16:32' }
];

const SUMMARY = [
  { label: 'Draft', value: 2, filter: 'Draft' },
  { label: 'Diperiksa AI', value: 1, filter: 'Sedang diperiksa AI' },
  { label: 'Perlu perbaikan', value: 3, filter: 'Perlu perbaikan', tone: 'crit' },
  { label: 'Siap dikirim', value: 3, filter: 'Siap dikirim ke Ops', tone: 'ok' }
];

const ROWS = [
  { id: 'REQ-2026-004182', company: 'PT Rizky Gemilang', companyId: 'KPR-00184920', need: 'Perubahan/Penambahan Layanan', findings: 4, findingTone: 'crit', status: 'Perlu perbaikan', statusTone: 'crit', sla: '03:42', slaMin: 222, slaTight: true, uploaded: '04 Sep 09:14', uploadedAt: '2026-09-04T09:14', officer: 'Anisa R.', flagged: true, go: 'result' },
  { id: 'REQ-2026-004178', company: 'PT ABC', companyId: 'KPR-00179043', need: 'Pemeliharaan User — Reset Password', findings: 0, findingTone: 'ok', status: 'Siap dikirim ke Ops', statusTone: 'ok', sla: '07:05', slaMin: 425, uploaded: '04 Sep 08:40', uploadedAt: '2026-09-04T08:40', officer: 'Anisa R.', go: 'result' },
  { id: 'REQ-2026-004176', company: 'PT Universal', companyId: 'KPR-00166218', need: 'Perubahan/Penambahan Layanan', findings: null, findingTone: 'none', status: 'Sedang diperiksa AI', statusTone: 'info', sla: '05:18', slaMin: 318, uploaded: '04 Sep 10:02', uploadedAt: '2026-09-04T10:02', officer: 'Anisa R.', go: 'progress' },
  { id: 'REQ-2026-004156', company: 'PT Anugrah Perkasa', companyId: 'KPR-00152877', need: 'Penambahan Rekening Pihak Ketiga', findings: 2, findingTone: 'crit', status: 'Perlu perbaikan', statusTone: 'crit', sla: '01:12', slaMin: 72, slaTight: true, uploaded: '03 Sep 15:20', uploadedAt: '2026-09-03T15:20', officer: 'Bayu P.', flagged: true, go: 'result' },
  { id: 'REQ-2026-004151', company: 'PT Sinar Abadi Nusantara', companyId: 'KPR-00149502', need: 'Permohonan Hard Token', findings: 0, findingTone: 'ok', status: 'Siap dikirim ke Ops', statusTone: 'ok', sla: '09:30', slaMin: 570, uploaded: '03 Sep 14:05', uploadedAt: '2026-09-03T14:05', officer: 'Anisa R.', go: 'result' },
  { id: 'REQ-2026-004147', company: 'PT Karya Nusantara Jaya', companyId: 'KPR-00141338', need: 'Pemeliharaan User — Unlock Token', findings: 1, findingTone: 'warn', status: 'Perlu perbaikan', statusTone: 'crit', sla: '06:44', slaMin: 404, uploaded: '03 Sep 11:48', uploadedAt: '2026-09-03T11:48', officer: 'Bayu P.', go: 'result' },
  { id: 'REQ-2026-004140', company: 'PT Bahari Jaya Logistik', companyId: 'KPR-00138201', need: 'Perubahan/Penambahan Layanan', findings: 0, findingTone: 'ok', status: 'Siap dikirim ke Ops', statusTone: 'ok', sla: '11:02', slaMin: 662, uploaded: '03 Sep 09:31', uploadedAt: '2026-09-03T09:31', officer: 'Anisa R.', go: 'result' },
  { id: 'REQ-2026-004138', company: 'PT Mitra Sejati Pratama', companyId: '—', need: 'Registrasi Baru', findings: null, findingTone: 'none', status: 'Draft', statusTone: 'draft', sla: '—', slaMin: 99999, uploaded: '03 Sep 08:12', uploadedAt: '2026-09-03T08:12', officer: 'Anisa R.', go: 'upload' },
  { id: 'REQ-2026-004131', company: 'PT Cakra Buana Energi', companyId: 'KPR-00127760', need: 'Perubahan Token', findings: null, findingTone: 'none', status: 'Draft', statusTone: 'draft', sla: '—', slaMin: 99999, uploaded: '02 Sep 16:55', uploadedAt: '2026-09-02T16:55', officer: 'Bayu P.', go: 'upload' }
];

const QUEUE_FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'Draft', label: 'Draft' },
  { key: 'Sedang diperiksa AI', label: 'Sedang diperiksa AI' },
  { key: 'Perlu perbaikan', label: 'Perlu perbaikan' },
  { key: 'Siap dikirim ke Ops', label: 'Siap dikirim ke Ops' }
];

const QUEUE_COLS = [
  { key: 'id', label: 'No. Permohonan', sortable: true },
  { key: 'company', label: 'Nama Perusahaan', sortable: true },
  { key: 'companyId', label: 'Company ID' },
  { key: 'need', label: 'Jenis Kebutuhan' },
  { key: 'findings', label: 'Temuan', sortable: true, center: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'slaMin', label: 'Sisa SLA', sortable: true },
  { key: 'uploadedAt', label: 'Diunggah', sortable: true },
  { key: 'officer', label: 'Petugas', sortable: true }
];

const NEEDS = [
  { key: 'change', title: 'Perubahan / Penambahan Layanan', body: 'Tambah layanan, rekening perusahaan, rekening pihak ketiga, atau token pada Company ID yang sudah aktif.', docs: 'Dokumen wajib: Form Aplikasi · Form Bank · Surat Kuasa (jika pihak ke-3)' },
  { key: 'new', title: 'Registrasi Baru', body: 'Pendaftaran nasabah wholesale baru ke Kopra Cash Management, termasuk Company ID dan administrator.', docs: 'Dokumen wajib: Form Aplikasi · Form Bank' },
  { key: 'user', title: 'Pemeliharaan User', body: 'Reset password, reaktivasi User ID, deaktivasi token, atau unlock token untuk user yang sudah terdaftar.', docs: 'Dokumen wajib: Form Pemeliharaan User' },
  { key: 'token', title: 'Perubahan / Penggantian Token', body: 'Permohonan hard token baru atau penggantian token rusak, disertai nota eksepsi bila diperlukan.', docs: 'Dokumen wajib: Form Exception · Nota/Surat Eksepsi' }
];

const DOC_TABS = [
  { n: 1, label: '1 · Form Aplikasi', state: '3 temuan', dot: '#ff8a8a', active: true },
  { n: 2, label: '2 · Form Bank', state: 'Sesuai', dot: '#1f9d6b' },
  { n: 3, label: '3 · Pemeliharaan User', state: '1 peringatan', dot: '#e08a00' },
  { n: 4, label: '4 · Form Exception', state: 'Tidak diperlukan', dot: '#c9d2e0', off: true },
  { n: 5, label: '5 · Surat Kuasa', state: '1 kritis', dot: '#e05c4a' },
  { n: 6, label: '6 · Nota Eksepsi', state: 'Sesuai', dot: '#1f9d6b' }
];

const CHECKLIST = [
  { n: '1', tone: 'crit', name: 'Form Aplikasi', file: 'FormAplikasi_RizkyGemilang.pdf · 3 hal', ok: 11, bad: 3, badKind: 'temuan', okPct: 79, badPct: 21, badColor: '#e05c4a', desc: 'Company ID tidak cocok dengan Core Banking · tandatangan pejabat di bawah ambang · No Telepon tidak lengkap', pill: '2 kritis', pillTone: 'crit', go: 'detail', flag: true },
  { n: '✓', tone: 'ok', name: 'Form Bank', file: 'FormBank_04Sep2026.pdf · 1 hal', ok: 5, bad: 0, okPct: 100, badPct: 0, desc: 'Tanggal, Nama Perusahaan, Identitas Sales, Validasi dan bagian unit bisnis lengkap', pill: 'Sesuai', pillTone: 'ok' },
  { n: '3', tone: 'warn', name: 'Form Pemeliharaan User', file: 'Pemeliharaan_User_scan.jpg · 1 hal', ok: 4, bad: 1, badKind: 'peringatan', okPct: 80, badPct: 20, badColor: '#e08a00', desc: 'Alamat email user berbeda dengan profil Kopra — mohon konfirmasi ke nasabah', pill: '1 peringatan', pillTone: 'warn' },
  { n: '4', tone: 'off', name: 'Form Exception', file: 'Tidak ada berkas', desc: 'Hanya diperlukan bila jenis token adalah hard token. Jenis token pada permohonan ini: soft token.', pill: 'Tidak diperlukan', pillTone: 'draft', off: true },
  { n: '5', tone: 'crit', name: 'Surat Kuasa', file: 'SuratKuasa_PTUniversal.pdf · 2 hal', ok: 16, bad: 1, badKind: 'temuan', okPct: 94, badPct: 6, badColor: '#e05c4a', desc: 'No Rekening pihak ketiga terbaca, namun cabang pengelola rekening tidak sesuai data Core Banking', pill: '1 kritis', pillTone: 'crit', flag: true },
  { n: '✓', tone: 'ok', name: 'Nota / Surat Eksepsi', file: 'NotaEksepsi_004182.pdf · 1 hal', ok: 7, bad: 0, okPct: 100, badPct: 0, desc: 'Diunggah ulang setelah gagal ekstraksi · tandatangan Kepala Unit Bisnis terverifikasi', pill: 'Sesuai', pillTone: 'ok' }
];

const TONE_BG = { crit: '#e05c4a', warn: '#e08a00', ok: '#1f9d6b', off: '#e4e9f1' };

const STAGES = [
  { name: '1 · Form Aplikasi', upload: 'ok', classify: 'ok', ocr: 'ok', cross: 'ok', fields: '14/14' },
  { name: '2 · Form Bank', upload: 'ok', classify: 'ok', ocr: 'ok', cross: 'ok', fields: '5/5' },
  { name: '3 · Form Pemeliharaan User', sub: 'Kualitas pindai rendah — pembacaan lebih lambat', subTone: 'warn', upload: 'ok', classify: 'ok', ocr: 'run', cross: 'wait', fields: '3/5', tint: true },
  { name: '4 · Form Exception', sub: 'Tidak diperlukan untuk jenis kebutuhan ini', subTone: 'muted', off: true, upload: 'none', classify: 'none', ocr: 'none', cross: 'none', fields: '—' },
  { name: '5 · Surat Kuasa', upload: 'ok', classify: 'ok', ocr: 'run', cross: 'wait', fields: '10/17' },
  { name: '6 · Nota / Surat Eksepsi', sub: 'Ekstraksi gagal — berkas terenkripsi (password protected)', subTone: 'crit', upload: 'ok', classify: 'fail', ocr: 'none', cross: 'none', retry: true, tint: 'warn' }
];

const AUDIT = [
  { dot: '#1c4e9c', ring: '#dbe6f7', title: 'Permohonan dikirim ke Operation', time: '04 Sep 2026 · 10:07:14', body: 'Anisa Rahmawati (RM, KCU Surabaya Pemuda) · 5 dokumen, 48 field, 0 temuan terbuka' },
  { dot: '#1f9d6b', ring: '#dff0e7', title: 'Temuan terakhir diselesaikan', time: '04 Sep 2026 · 10:02:38', body: 'Anisa Rahmawati · Surat Kuasa diunggah ulang, cabang pengelola rekening kini sesuai Core Banking' },
  { dot: '#1f9d6b', ring: '#dff0e7', title: 'Perbaikan manual · No Telepon', time: '04 Sep 2026 · 09:52:05', body: 'Anisa Rahmawati · Form Aplikasi · karakter yang tidak terbaca dilengkapi manual' },
  { dot: '#1f9d6b', ring: '#dff0e7', title: 'Perbaikan manual · Company ID', time: '04 Sep 2026 · 09:44:51', body: 'Anisa Rahmawati · Form Aplikasi · nilai Core Banking dipakai menggantikan hasil OCR' },
  { dot: '#e05c4a', ring: '#fadfda', title: '4 temuan diterbitkan', time: '04 Sep 2026 · 09:19:02', body: 'Mesin validasi v4.2 · 2 kritis (Company ID, cabang pengelola rekening), 2 peringatan (No Telepon, email administrator)' },
  { dot: '#1f9d6b', ring: '#dff0e7', title: 'Ekstraksi AI selesai', time: '04 Sep 2026 · 09:18:47', body: 'Mesin OCR v4.2 · 47 field terbaca dari 6 dokumen · keyakinan rata-rata 93% · dicocokkan dengan Core Banking, DJP dan profil Kopra' },
  { dot: '#e08a00', ring: '#fbeacd', title: 'Ekstraksi Nota Eksepsi gagal, diunggah ulang', time: '04 Sep 2026 · 09:16:30', body: 'Berkas terenkripsi (password protected) · Anisa Rahmawati mengunggah versi tanpa proteksi' },
  { dot: '#1f9d6b', ring: '#dff0e7', title: '6 dokumen diunggah', time: '04 Sep 2026 · 09:14:22', body: 'Anisa Rahmawati · total 6,5 MB · Form Exception ditandai tidak diperlukan (jenis token: soft token)' },
  { dot: '#c9d2e0', ring: '#eef1f6', title: 'Permohonan dibuat', time: '04 Sep 2026 · 09:11:08', body: 'Anisa Rahmawati · jenis kebutuhan: Perubahan/Penambahan Layanan' }
];

const SENT_FILES = [
  { name: 'Form Aplikasi · 14 field sesuai', size: '1,8 MB' },
  { name: 'Form Bank · 5 field sesuai', size: '640 KB' },
  { name: 'Form Pemeliharaan User · 5 field sesuai', size: '210 KB' },
  { name: 'Surat Kuasa · 17 field sesuai', size: '2,4 MB' },
  { name: 'Nota / Surat Eksepsi · 7 field sesuai', size: '480 KB' }
];

const SENT_SUMMARY = [
  ['Field tervalidasi', '48/48'],
  ['Keyakinan OCR rata-rata', '96%'],
  ['Temuan diselesaikan', '4'],
  ['Perbaikan manual', '2'],
  ['Dokumen diunggah ulang', '2'],
  ['Waktu proses cabang', '53 mnt']
];

const FLOW = [
  { num: '✓', state: 'done', name: 'Cabang', note: 'Unggah & perbaikan\nselesai 10:07' },
  { num: '2', state: 'on', name: 'Ops Checker', note: 'Sedang diverifikasi\nestimasi 2 jam kerja' },
  { num: '3', state: 'off', name: 'Ops Approver', note: 'Belum dimulai' },
  { num: '4', state: 'off', name: 'Layanan Aktif', note: 'Belum dimulai' }
];

const PAGE_SIZE = 6;

/* ===================== COMPONENT ===================== */

export default function Dashboard() {
  const [screen, setScreen] = useState('queue');
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);

  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'slaMin', dir: 'asc' });
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  const [need, setNeed] = useState('change');
  const [findFilter, setFindFilter] = useState('all');
  const [activeField, setActiveField] = useState('companyId');
  const [docPage, setDocPage] = useState(1);
  const [highlight, setHighlight] = useState(true);
  const [phone, setPhone] = useState('');

  const go = (next) => { setScreen(next); setNotifOpen(false); };
  const unread = notifRead ? 0 : NOTIFS.filter((n) => n.unread).length;
  const showCase = screen !== 'new' && screen !== 'empty';

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = ROWS.filter((r) => {
      const byFilter = filter === 'all' || r.status === filter;
      const byQuery = !q || r.company.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) || r.companyId.toLowerCase().includes(q);
      return byFilter && byQuery;
    });
    const dir = sort.dir === 'asc' ? 1 : -1;
    return [...out].sort((a, b) => {
      const av = a[sort.key] ?? '';
      const bv = b[sort.key] ?? '';
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [filter, query, sort]);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const allVisibleSelected = visible.length > 0 && visible.every((r) => selected.includes(r.id));

  const countFor = (key) => (key === 'all' ? ROWS.length : ROWS.filter((r) => r.status === key).length);
  const toggleSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));
  const toggleRow = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleAllVisible = () =>
    setSelected((s) =>
      allVisibleSelected
        ? s.filter((id) => !visible.some((r) => r.id === id))
        : Array.from(new Set([...s, ...visible.map((r) => r.id)]))
    );

  const fieldClass = (base, key) =>
    `${base}${activeField === key ? ' kp-field--on' : ''}`;

  return (
    <div className="kp">
      <style>{styles}</style>

      {/* ---------------- TOP BAR ---------------- */}
      <header className="kp-top">
        <div className="kp-top__brand">
          <div className="kp-top__mark">K</div>
          <div className="kp-top__title">Kopra Cash Management</div>
          <div className="kp-top__rule" />
          <div className="kp-top__sub">Pemeriksaan Dokumen AI</div>
        </div>
        <div className="kp-top__spacer" />
        <div className="kp-top__right">
          <button
            type="button"
            className="kp-bell"
            aria-label="Notifikasi"
            aria-expanded={notifOpen}
            onClick={() => setNotifOpen((v) => !v)}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            {unread > 0 && <span className="kp-bell__badge">{unread}</span>}
          </button>
          <div className="kp-top__rule" />
          <div className="kp-who">
            <div className="kp-who__name">Anisa Rahmawati</div>
            <div className="kp-who__role">KCU Surabaya Pemuda · RM</div>
          </div>
          <div className="kp-avatar">AR</div>
        </div>

        {notifOpen && (
          <div className="kp-notif">
            <div className="kp-notif__head">
              <div className="kp-notif__title">Notifikasi</div>
              <div className="kp-top__spacer" />
              <button type="button" className="kp-notif__mark" onClick={() => setNotifRead(true)}>
                Tandai terbaca
              </button>
            </div>
            {NOTIFS.map((n) => {
              const isUnread = n.unread && !notifRead;
              return (
                <button
                  key={n.id}
                  type="button"
                  className={`kp-notif__item${isUnread ? ' kp-notif__item--unread' : ''}`}
                  onClick={() => go(n.go)}
                >
                  <span className="kp-notif__dot" style={{ background: n.tone }} />
                  <span>
                    <span className={`kp-notif__label${isUnread ? '' : ' kp-notif__label--read'}`} style={{ display: 'block' }}>
                      {n.label}
                    </span>
                    <span className="kp-notif__body" style={{ display: 'block' }}>{n.body}</span>
                    <span className="kp-notif__time" style={{ display: 'block' }}>{n.time}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      <div className="kp-body">
        {/* ---------------- SIDEBAR ---------------- */}
        <aside className="kp-side">
          <div className="kp-side__label">MENU</div>
          <nav className="kp-side__nav">
            {NAV.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`kp-side__item${item.match.includes(screen) ? ' kp-side__item--on' : ''}`}
                onClick={() => go(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {showCase && (
            <>
              <div className="kp-sla">
                <div className="kp-sla__label">SISA SLA</div>
                <div className="kp-sla__value">03:42</div>
                <div className="kp-sla__note">jam menuju batas kirim<br />REQ-2026-004182</div>
                <div className="kp-sla__track"><div className="kp-sla__fill" style={{ width: '54%' }} /></div>
              </div>

              <div className="kp-sum">
                <div className="kp-sum__label">RINGKASAN HARI INI</div>
                <div className="kp-sum__rows">
                  {SUMMARY.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      className={`kp-sum__row${s.tone ? ` kp-sum__row--${s.tone}` : ''}`}
                      onClick={() => { setFilter(s.filter); setPage(1); go('queue'); }}
                    >
                      <span>{s.label}</span>
                      <span>{s.value}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </aside>

        {/* ---------------- MAIN ---------------- */}
        <main className="kp-main">

          {/* ========== 1. QUEUE ========== */}
          {screen === 'queue' && (
            <>
              <div className="kp-head">
                <div>
                  <div className="kp-head__crumb">KCU Surabaya Pemuda · Cabang</div>
                  <h1>Daftar Permohonan</h1>
                  <div className="kp-head__meta">{ROWS.length} permohonan aktif · 4 temuan terbuka menunggu perbaikan</div>
                </div>
                <div className="kp-head__spacer" />
                <div className="kp-head__actions">
                  <button type="button" className="kp-btn kp-btn--ghost" onClick={() => go('empty')}>
                    Lihat kondisi kosong
                  </button>
                  <button type="button" className="kp-btn" onClick={() => go('new')}>+ Permohonan Baru</button>
                </div>
              </div>

              <div className="kp-stats">
                <div className="kp-stat">
                  <div className="kp-stat__label">DOKUMEN DIPERIKSA</div>
                  <div className="kp-stat__row"><span className="kp-stat__value">42</span><span className="kp-stat__note">hari ini</span></div>
                </div>
                <div className="kp-stat">
                  <div className="kp-stat__label">FIELD TERVALIDASI</div>
                  <div className="kp-stat__row"><span className="kp-stat__value kp-stat__value--ok">318/337</span><span className="kp-stat__note">sesuai</span></div>
                </div>
                <div className="kp-stat">
                  <div className="kp-stat__label">TEMUAN TERBUKA</div>
                  <div className="kp-stat__row"><span className="kp-stat__value kp-stat__value--crit">7</span><span className="kp-stat__note">3 kritis · 4 peringatan</span></div>
                </div>
                <div className="kp-stat">
                  <div className="kp-stat__label">KEYAKINAN OCR</div>
                  <div className="kp-stat__row"><span className="kp-stat__value">94%</span><span className="kp-stat__note">rata-rata</span></div>
                </div>
              </div>

              <div className="kp-card">
                <div className="kp-card__head">
                  {QUEUE_FILTERS.map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      className={`kp-chip${filter === f.key ? ' kp-chip--on' : ''}`}
                      onClick={() => { setFilter(f.key); setPage(1); }}
                    >
                      {f.label} {countFor(f.key)}
                    </button>
                  ))}
                  <div className="kp-card__spacer" />
                  <input
                    className="kp-search"
                    type="search"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                    placeholder="Cari perusahaan / no. permohonan"
                  />
                </div>

                <table className="kp-table">
                  <thead>
                    <tr>
                      <th style={{ width: 34 }}>
                        <input
                          className="kp-check"
                          type="checkbox"
                          checked={allVisibleSelected}
                          onChange={toggleAllVisible}
                          aria-label="Pilih semua"
                        />
                      </th>
                      {QUEUE_COLS.map((c) => (
                        <th
                          key={c.key}
                          className={[c.center ? 'c-mid' : '', c.sortable ? 'srt' : ''].join(' ').trim() || undefined}
                          onClick={c.sortable ? () => toggleSort(c.key) : undefined}
                        >
                          {c.label.toUpperCase()}
                          {sort.key === c.key && <span className="kp-arrow">{sort.dir === 'asc' ? '↑' : '↓'}</span>}
                        </th>
                      ))}
                      <th style={{ width: 74 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {visible.length === 0 ? (
                      <tr>
                        <td colSpan={QUEUE_COLS.length + 2} className="kp-empty-row">
                          Tidak ada permohonan yang cocok dengan filter atau pencarian Anda.
                        </td>
                      </tr>
                    ) : (
                      visible.map((r) => (
                        <tr
                          key={r.id}
                          className={[selected.includes(r.id) ? 'sel' : '', r.flagged ? 'flag' : ''].join(' ').trim() || undefined}
                          onClick={() => go(r.go)}
                        >
                          <td onClick={(e) => e.stopPropagation()}>
                            <input
                              className="kp-check"
                              type="checkbox"
                              checked={selected.includes(r.id)}
                              onChange={() => toggleRow(r.id)}
                              aria-label={`Pilih ${r.id}`}
                            />
                          </td>
                          <td className="c-id">{r.id}</td>
                          <td className="c-co">{r.company}</td>
                          <td className="kp-mono">{r.companyId}</td>
                          <td>{r.need}</td>
                          <td className="c-mid">
                            <span className={`kp-count kp-count--${r.findingTone}`}>
                              {r.findings === null ? '—' : r.findings}
                            </span>
                          </td>
                          <td>
                            <span className={`kp-pill kp-pill--${r.statusTone}`}>
                              {r.statusTone === 'info' && <span className="kp-pill__dot kp-pill__dot--live" />}
                              {r.status}
                            </span>
                          </td>
                          <td className="kp-mono" style={{ color: r.slaTight ? '#b3382a' : undefined, fontSize: 11.5 }}>
                            {r.sla}
                          </td>
                          <td className="c-mut">{r.uploaded}</td>
                          <td className="c-mut">{r.officer}</td>
                          <td className="c-act">
                            <button type="button" className="kp-table__open" onClick={(e) => { e.stopPropagation(); go(r.go); }}>
                              Periksa →
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {selected.length > 0 && (
                  <div className="kp-bulk">
                    <span className="kp-bulk__text">{selected.length} permohonan dipilih</span>
                    <div className="kp-card__spacer" />
                    <button type="button" className="kp-btn kp-btn--ghost">Unduh berkas</button>
                    <button type="button" className="kp-btn" onClick={() => go('tracking')}>Kirim ke Operation</button>
                    <button type="button" className="kp-btn kp-btn--ghost" onClick={() => setSelected([])}>Bersihkan</button>
                  </div>
                )}

                <div className="kp-foot">
                  <span className="kp-foot__text">Menampilkan {visible.length} dari {rows.length} permohonan</span>
                  <div className="kp-foot__spacer" />
                  <button type="button" className="kp-page" disabled={current === 1} onClick={() => setPage(current - 1)}>←</button>
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`kp-page${p === current ? ' kp-page--on' : ''}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <button type="button" className="kp-page" disabled={current === pageCount} onClick={() => setPage(current + 1)}>→</button>
                </div>
              </div>

              <div className="kp-workspace">
                <div className="kp-workspace__label">RUANG KERJA PEMERIKSAAN DOKUMEN</div>
                <div id="kyc-workspace-placeholder"></div>
              </div>
            </>
          )}

          {/* ========== 2. EMPTY ========== */}
          {screen === 'empty' && (
            <>
              <div className="kp-head">
                <div>
                  <h1>Daftar Permohonan</h1>
                  <div className="kp-head__meta">Belum ada permohonan</div>
                </div>
                <div className="kp-head__spacer" />
                <button type="button" className="kp-btn kp-btn--ghost" onClick={() => go('queue')}>
                  Kembali ke daftar terisi
                </button>
              </div>
              <div className="kp-empty">
                <div className="kp-empty__doc">
                  <div className="kp-empty__line" style={{ top: 16, right: 14, left: 14 }} />
                  <div className="kp-empty__line" style={{ top: 28, right: 22, left: 14 }} />
                  <div className="kp-empty__line" style={{ top: 40, right: 18, left: 14 }} />
                </div>
                <div className="kp-empty__title">Belum ada permohonan</div>
                <div className="kp-empty__body">
                  Buat permohonan baru, unggah dokumen nasabah, dan AI akan membaca serta memvalidasi
                  datanya sebelum dikirim ke Operation.
                </div>
                <button type="button" className="kp-btn" style={{ marginTop: 20, padding: '9px 18px', fontSize: 12.5 }} onClick={() => go('new')}>
                  + Permohonan Baru
                </button>
              </div>
            </>
          )}

          {/* ========== 3. NEW REQUEST ========== */}
          {screen === 'new' && (
            <>
              <div style={{ marginBottom: 18 }}>
                <button type="button" className="kp-back" onClick={() => go('queue')}>← Daftar Permohonan</button>
                <h1>Permohonan Baru</h1>
                <div className="kp-head__meta" style={{ lineHeight: 1.6, maxWidth: 620 }}>
                  Pilih jenis kebutuhan nasabah. Data perusahaan, rekening, dan token tidak perlu diisi
                  manual — semuanya diambil dari dokumen yang Anda unggah pada langkah berikutnya.
                </div>
              </div>

              <div className="kp-steps">
                <div className="kp-steps__item">
                  <div className="kp-steps__num kp-steps__num--on">1</div>
                  <div className="kp-steps__label kp-steps__label--on">Jenis Kebutuhan</div>
                </div>
                <div className="kp-steps__bar" />
                <div className="kp-steps__item">
                  <div className="kp-steps__num">2</div>
                  <div className="kp-steps__label">Unggah Dokumen</div>
                </div>
                <div className="kp-steps__bar" />
                <div className="kp-steps__item">
                  <div className="kp-steps__num">3</div>
                  <div className="kp-steps__label">Hasil Pemeriksaan</div>
                </div>
              </div>

              <div className="kp-needs">
                {NEEDS.map((n) => (
                  <button
                    key={n.key}
                    type="button"
                    className={`kp-need${need === n.key ? ' kp-need--on' : ''}`}
                    onClick={() => setNeed(n.key)}
                  >
                    {need === n.key && <div className="kp-need__tick">✓</div>}
                    <div className="kp-need__title">{n.title}</div>
                    <div className="kp-need__body">{n.body}</div>
                    <div className="kp-need__docs">{n.docs}</div>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22, maxWidth: 820 }}>
                <div style={{ fontSize: 11.5, color: '#8a95a8' }}>
                  Nomor permohonan dibuat otomatis setelah dokumen diunggah.
                </div>
                <div className="kp-head__spacer" />
                <button type="button" className="kp-btn kp-btn--ghost" onClick={() => go('queue')}>Batal</button>
                <button type="button" className="kp-btn" onClick={() => go('App.jsx')}>Lanjut ke Unggah Dokumen →</button>
              </div>
            </>
          )}

          {/* ========== 4. UPLOAD ========== */}
          {screen === 'upload' && (
            <>
              <div className="kp-head">
                <div>
                  <button type="button" className="kp-back" onClick={() => go('new')}>← Jenis Kebutuhan</button>
                  <h1>Unggah Dokumen</h1>
                  <div className="kp-head__meta">Perubahan/Penambahan Layanan · 4 dari 6 dokumen terunggah</div>
                </div>
                <div className="kp-head__spacer" />
                <button type="button" className="kp-btn" onClick={() => go('progress')}>Mulai Pemeriksaan AI</button>
              </div>

              <div className="kp-slots">
                {/* slot 1 */}
                <div className="kp-slot">
                  <div className="kp-slot__head">
                    <div className="kp-slot__num">1</div>
                    <div>
                      <div className="kp-slot__name">Form Aplikasi</div>
                      <div className="kp-slot__req">Wajib · 14 data validasi</div>
                    </div>
                  </div>
                  <div className="kp-file">
                    <div className="kp-file__row">
                      <div className="kp-file__thumb" />
                      <div style={{ minWidth: 0 }}>
                        <div className="kp-file__name">FormAplikasi_RizkyGemilang.pdf</div>
                        <div className="kp-file__meta">3 hal · 1,8 MB</div>
                      </div>
                    </div>
                    <div className="kp-file__foot">
                      <div className="kp-file__ok">✓ Terunggah · kualitas pindai baik</div>
                      <div className="kp-card__spacer" />
                      <button type="button" className="kp-link">Ganti</button>
                    </div>
                  </div>
                </div>

                {/* slot 2 */}
                <div className="kp-slot">
                  <div className="kp-slot__head">
                    <div className="kp-slot__num">2</div>
                    <div>
                      <div className="kp-slot__name">Form Bank</div>
                      <div className="kp-slot__req">Wajib · 5 data validasi</div>
                    </div>
                  </div>
                  <div className="kp-file">
                    <div className="kp-file__row">
                      <div className="kp-file__thumb" />
                      <div style={{ minWidth: 0 }}>
                        <div className="kp-file__name">FormBank_04Sep2026.pdf</div>
                        <div className="kp-file__meta">1 hal · 640 KB</div>
                      </div>
                    </div>
                    <div className="kp-file__foot">
                      <div className="kp-file__ok">✓ Terunggah · kualitas pindai baik</div>
                      <div className="kp-card__spacer" />
                      <button type="button" className="kp-link">Ganti</button>
                    </div>
                  </div>
                </div>

                {/* slot 3 — blur */}
                <div className="kp-slot kp-slot--warn">
                  <div className="kp-slot__head">
                    <div className="kp-slot__num" style={{ background: '#e08a00' }}>3</div>
                    <div>
                      <div className="kp-slot__name">Form Pemeliharaan User</div>
                      <div className="kp-slot__req">Opsional · 5 data validasi</div>
                    </div>
                  </div>
                  <div className="kp-file kp-file--warn">
                    <div className="kp-file__row">
                      <div className="kp-file__thumb" style={{ color: '#e5c98a' }}>blur</div>
                      <div style={{ minWidth: 0 }}>
                        <div className="kp-file__name">Pemeliharaan_User_scan.jpg</div>
                        <div className="kp-file__meta">1 hal · 210 KB · 96 dpi</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 9, paddingTop: 9, borderTop: '1px solid #f3e6cc' }}>
                      <div className="kp-file__warn">Dokumen sulit dibaca</div>
                      <div className="kp-file__hint">
                        Resolusi rendah dan gambar kabur. AI dapat memproses, tetapi tingkat keyakinan akan rendah.
                      </div>
                      <div className="kp-file__acts">
                        <button type="button" className="kp-btn kp-btn--sm">Unggah ulang</button>
                        <button type="button" className="kp-btn kp-btn--ghost kp-btn--sm">Proses saja</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* slot 4 — wrong type */}
                <div className="kp-slot kp-slot--crit">
                  <div className="kp-slot__head">
                    <div className="kp-slot__num" style={{ background: '#e05c4a' }}>4</div>
                    <div>
                      <div className="kp-slot__name">Form Exception</div>
                      <div className="kp-slot__req">Jika jenis token hard · 7 data validasi</div>
                    </div>
                  </div>
                  <div className="kp-file kp-file--crit">
                    <div className="kp-file__row">
                      <div className="kp-file__thumb" style={{ color: '#f3cfc9' }} />
                      <div style={{ minWidth: 0 }}>
                        <div className="kp-file__name">Scan_20260904_002.pdf</div>
                        <div className="kp-file__meta">2 hal · 1,1 MB</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 9, paddingTop: 9, borderTop: '1px solid #f7ddd8' }}>
                      <div className="kp-file__crit">Jenis dokumen tidak sesuai</div>
                      <div className="kp-file__hint">
                        AI mengenali dokumen ini sebagai <b>Surat Kuasa</b>, bukan Form Exception.
                      </div>
                      <div className="kp-file__acts">
                        <button type="button" className="kp-btn kp-btn--sm">Pindahkan ke slot 5</button>
                        <button type="button" className="kp-btn kp-btn--ghost kp-btn--sm">Hapus</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* slot 5 */}
                <div className="kp-slot">
                  <div className="kp-slot__head">
                    <div className="kp-slot__num">5</div>
                    <div>
                      <div className="kp-slot__name">Surat Kuasa</div>
                      <div className="kp-slot__req">Wajib · penambahan rekening pihak ke-3 · 17 data validasi</div>
                    </div>
                  </div>
                  <div className="kp-file">
                    <div className="kp-file__row">
                      <div className="kp-file__thumb" />
                      <div style={{ minWidth: 0 }}>
                        <div className="kp-file__name">SuratKuasa_PTUniversal.pdf</div>
                        <div className="kp-file__meta">2 hal · 2,4 MB</div>
                      </div>
                    </div>
                    <div className="kp-file__foot">
                      <div className="kp-file__ok">✓ Terunggah · materai terdeteksi</div>
                      <div className="kp-card__spacer" />
                      <button type="button" className="kp-link">Ganti</button>
                    </div>
                  </div>
                </div>

                {/* slot 6 — dropzone */}
                <div className="kp-slot">
                  <div className="kp-slot__head">
                    <div className="kp-slot__num" style={{ background: '#c9d2e0' }}>6</div>
                    <div>
                      <div className="kp-slot__name">Nota / Surat Eksepsi</div>
                      <div className="kp-slot__req">Opsional · 7 data validasi</div>
                    </div>
                  </div>
                  <button type="button" className="kp-drop">
                    <div className="kp-drop__plus">+</div>
                    <div className="kp-drop__title">Tarik berkas ke sini</div>
                    <div className="kp-drop__hint">PDF, JPG, PNG · maks 10 MB<br />atau pilih dari komputer</div>
                    <div className="kp-chip" style={{ marginTop: 9, fontSize: 10 }}>Tandai: Tidak diperlukan</div>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ========== 5. PROGRESS ========== */}
          {screen === 'progress' && (
            <>
              <div style={{ marginBottom: 18 }}>
                <div className="kp-head__crumb">REQ-2026-004182 · PT Rizky Gemilang</div>
                <h1>Pemeriksaan AI Sedang Berjalan</h1>
                <div className="kp-head__meta">
                  Anda dapat menutup halaman ini — Anda akan diberi tahu saat pemeriksaan selesai.
                </div>
              </div>

              <div className="kp-hero">
                <div>
                  <div className="kp-hero__label">PROGRES KESELURUHAN</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <div className="kp-hero__big">68%</div>
                    <div className="kp-hero__note">4 dari 6 dokumen</div>
                  </div>
                  <div className="kp-hero__track"><div className="kp-hero__fill" style={{ width: '68%' }} /></div>
                </div>
                <div className="kp-hero__rule" />
                <div className="kp-hero__stats">
                  <div><div className="kp-hero__k">Field terbaca</div><div className="kp-hero__v">32</div></div>
                  <div><div className="kp-hero__k">Keyakinan rata-rata</div><div className="kp-hero__v">93%</div></div>
                  <div><div className="kp-hero__k">Temuan sementara</div><div className="kp-hero__v kp-hero__v--crit">3</div></div>
                  <div><div className="kp-hero__k">Estimasi selesai</div><div className="kp-hero__v">~40s</div></div>
                </div>
              </div>

              <div className="kp-card">
                <div className="kp-stage kp-stage--head">
                  <div>DOKUMEN</div><div>UNGGAH</div><div>KLASIFIKASI</div><div>OCR</div>
                  <div>VALIDASI SILANG</div><div style={{ textAlign: 'right' }}>FIELD</div>
                </div>
                {STAGES.map((s) => {
                  const cell = (v) => {
                    if (v === 'ok') return <div className="kp-stage__ok">✓ Selesai</div>;
                    if (v === 'run') return (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className="kp-spin" /><span className="kp-stage__run">Berjalan</span>
                      </div>
                    );
                    if (v === 'wait') return <div className="kp-stage__wait">Menunggu</div>;
                    if (v === 'fail') return <div className="kp-stage__fail">Gagal</div>;
                    return <div className="kp-stage__wait">—</div>;
                  };
                  const tint = s.tint === true ? '#fbfcfe' : s.tint === 'warn' ? '#fffdf9' : undefined;
                  return (
                    <div className="kp-stage" key={s.name} style={{ background: tint }}>
                      <div>
                        <div className={`kp-stage__name${s.off ? ' kp-stage__name--off' : ''}`}>{s.name}</div>
                        {s.sub && (
                          <div
                            className="kp-stage__sub"
                            style={{
                              color: s.subTone === 'crit' ? '#b3382a' : s.subTone === 'warn' ? '#8a6200' : '#8a95a8',
                              fontWeight: s.subTone === 'muted' ? 400 : 600
                            }}
                          >
                            {s.sub}
                          </div>
                        )}
                      </div>
                      {cell(s.upload)}
                      {cell(s.classify)}
                      {cell(s.ocr)}
                      {cell(s.cross)}
                      {s.retry ? (
                        <div style={{ textAlign: 'right' }}>
                          <button type="button" className="kp-btn kp-btn--sm">Coba lagi</button>
                        </div>
                      ) : (
                        <div className="kp-stage__num">{s.fields}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 11.5, color: '#8a95a8' }}>
                  Dimulai 09:14:22 · mesin OCR v4.2 · seluruh langkah tercatat di Riwayat
                </div>
                <div className="kp-head__spacer" />
                <button type="button" className="kp-btn" onClick={() => go('result')}>Lihat Hasil Sementara →</button>
              </div>
            </>
          )}

          {/* ========== 6. RESULT CHECKLIST ========== */}
          {screen === 'result' && (
            <>
              <div className="kp-head">
                <div>
                  <div className="kp-head__crumb">
                    REQ-2026-004182 · Perubahan/Penambahan Layanan · Diunggah 04 Sep 2026, 09:14
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h1>PT Rizky Gemilang</h1>
                    <span className="kp-pill kp-pill--crit">PERLU PERBAIKAN</span>
                  </div>
                </div>
                <div className="kp-head__spacer" />
                <div className="kp-head__actions">
                  <button type="button" className="kp-btn kp-btn--ghost" onClick={() => go('audit')}>Riwayat</button>
                  <button type="button" className="kp-btn" onClick={() => go('findings')}>Selesaikan 4 Temuan</button>
                </div>
              </div>

              <div className="kp-banner">
                <div className="kp-banner__icon">!</div>
                <div>
                  <div className="kp-banner__title">Belum dapat dikirim ke Operation</div>
                  <div className="kp-banner__body">
                    Seluruh temuan — 2 kritis dan 2 peringatan — harus diselesaikan terlebih dahulu.
                    Setelah semua bersih, tombol kirim akan aktif secara otomatis.
                  </div>
                </div>
                <div className="kp-banner__spacer" />
                <button type="button" className="kp-btn" disabled>Kirim ke Operation</button>
              </div>

              <div className="kp-stats">
                <div className="kp-stat">
                  <div className="kp-stat__label">DOKUMEN LENGKAP</div>
                  <div className="kp-stat__row"><span className="kp-stat__value">4/5</span><span className="kp-stat__note">wajib terpenuhi</span></div>
                </div>
                <div className="kp-stat">
                  <div className="kp-stat__label">FIELD TERVALIDASI</div>
                  <div className="kp-stat__row"><span className="kp-stat__value kp-stat__value--ok">37/41</span><span className="kp-stat__note">sesuai</span></div>
                </div>
                <div className="kp-stat">
                  <div className="kp-stat__label">TEMUAN</div>
                  <div className="kp-stat__row"><span className="kp-stat__value kp-stat__value--crit">4</span><span className="kp-stat__note">2 kritis · 2 peringatan</span></div>
                </div>
                <div className="kp-stat">
                  <div className="kp-stat__label">KEYAKINAN OCR</div>
                  <div className="kp-stat__row"><span className="kp-stat__value">93%</span><span className="kp-stat__note">rata-rata</span></div>
                </div>
              </div>

              <div className="kp-card">
                <div className="kp-card__head"><div className="kp-card__title">Checklist Dokumen Validasi</div></div>
                {CHECKLIST.map((d, i) => (
                  <button
                    key={`${d.name}-${i}`}
                    type="button"
                    className={`kp-crow${d.flag ? ' kp-crow--flag' : ''}${d.off ? ' kp-crow--off' : ''}`}
                    onClick={d.go ? () => go(d.go) : undefined}
                  >
                    <span className="kp-crow__num" style={{ background: TONE_BG[d.tone], color: d.off ? '#8a95a8' : '#fff' }}>
                      {d.n}
                    </span>
                    <span style={{ width: 230, flex: 'none' }}>
                      <span className={`kp-crow__name${d.off ? ' kp-crow__name--off' : ''}`} style={{ display: 'block' }}>
                        {d.name}
                      </span>
                      <span className="kp-crow__file" style={{ display: 'block' }}>{d.file}</span>
                    </span>
                    <span className="kp-crow__stat">
                      {d.off ? (
                        <span className="kp-crow__statline" style={{ color: '#b0b9c8' }}>—</span>
                      ) : (
                        <>
                          <span className="kp-crow__statline" style={{ display: 'block' }}>
                            {d.ok} sesuai · {d.bad === 0 ? '0 temuan' : (
                              <b style={{ color: d.badColor === '#e08a00' ? '#8a6200' : '#b3382a' }}>
                                {d.bad} {d.badKind}
                              </b>
                            )}
                          </span>
                          <span className="kp-crow__bar">
                            <span style={{ width: `${d.okPct}%`, height: 4, background: '#1f9d6b' }} />
                            {d.badPct > 0 && <span style={{ width: `${d.badPct}%`, height: 4, background: d.badColor }} />}
                          </span>
                        </>
                      )}
                    </span>
                    <span className="kp-crow__desc" style={{ color: d.off ? '#8a95a8' : undefined }}>{d.desc}</span>
                    <span className="kp-crow__end">
                      <span className={`kp-pill kp-pill--${d.pillTone}`}>{d.pill}</span>
                      {!d.off && <span className="kp-crow__go">Periksa →</span>}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ========== 7. DOCUMENT DETAIL ========== */}
          {screen === 'detail' && (
            <>
              <div className="kp-head">
                <div style={{ minWidth: 0 }}>
                  <button type="button" className="kp-back" onClick={() => go('result')}>
                    ← Hasil Pemeriksaan · REQ-2026-004182
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h1>Form Aplikasi</h1>
                    <span className="kp-pill kp-pill--crit">3 TEMUAN</span>
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 7, fontSize: 11.5, color: '#67718a', flexWrap: 'wrap' }}>
                    <span>PT Rizky Gemilang</span>
                    <span style={{ color: '#c9d2e0' }}>|</span>
                    <span>Company ID <b className="kp-mono" style={{ color: '#2c3648' }}>KPR-00184920</b></span>
                    <span style={{ color: '#c9d2e0' }}>|</span>
                    <span>14 data validasi</span>
                  </div>
                </div>
                <div className="kp-head__spacer" />
                <div className="kp-head__actions">
                  <button type="button" className="kp-btn kp-btn--ghost">Unggah Ulang</button>
                  <button type="button" className="kp-btn" onClick={() => go('findings')}>Simpan Perbaikan</button>
                </div>
              </div>

              <div className="kp-tabs">
                {DOC_TABS.map((t) => (
                  <button
                    key={t.n}
                    type="button"
                    className={`kp-tab${t.active ? ' kp-tab--on' : ''}${t.off ? ' kp-tab--off' : ''}`}
                    disabled={t.off}
                  >
                    <div className="kp-tab__label">{t.label}</div>
                    <div className="kp-tab__row">
                      <span className="kp-tab__dot" style={{ background: t.dot }} />
                      <span className={`kp-tab__state${t.off ? ' kp-tab__state--off' : ''}`}>{t.state}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="kp-split">
                {/* ---- field panel ---- */}
                <div className="kp-panel">
                  <div className="kp-card__head">
                    <div className="kp-card__title">Data Validasi · 14 field</div>
                    <div className="kp-card__spacer" />
                    <button type="button" className={`kp-chip${findFilter === 'all' ? ' kp-chip--on' : ''}`} style={{ padding: '3px 7px', fontSize: 10 }} onClick={() => setFindFilter('all')}>Semua</button>
                    <button type="button" className={`kp-chip${findFilter === 'find' ? ' kp-chip--on' : ''}`} style={{ padding: '3px 7px', fontSize: 10 }} onClick={() => setFindFilter('find')}>Temuan 3</button>
                  </div>

                  <div className="kp-panel__sec" style={{ borderTop: 0 }}>IDENTITAS PERUSAHAAN</div>

                  {findFilter === 'all' && (
                    <button type="button" className={fieldClass('kp-field', 'need')} onClick={() => setActiveField('need')}>
                      <div className="kp-field__top">
                        <span className="kp-field__label">Jenis Kebutuhan</span>
                        <span className="kp-field__conf kp-field__conf--ok">99%</span>
                      </div>
                      <div className="kp-field__value">Perubahan/Penambahan Layanan</div>
                    </button>
                  )}

                  <button type="button" className={fieldClass('kp-field kp-field--crit', 'companyId')} onClick={() => setActiveField('companyId')}>
                    <div className="kp-field__top">
                      <span className="kp-field__label" style={{ fontWeight: 600 }}>Company ID</span>
                      <span className="kp-field__conf kp-field__conf--warn">OCR 74%</span>
                    </div>
                    <div className="kp-cmp">
                      <div className="kp-cmp__box kp-cmp__box--doc">
                        <div className="kp-cmp__k kp-cmp__k--doc">DIBACA DARI DOKUMEN</div>
                        <div className="kp-cmp__v kp-cmp__v--mono kp-cmp__v--doc">KPR-0018492<b>O</b></div>
                      </div>
                      <div className="kp-cmp__box kp-cmp__box--src">
                        <div className="kp-cmp__k kp-cmp__k--src">CORE BANKING</div>
                        <div className="kp-cmp__v kp-cmp__v--mono kp-cmp__v--src">KPR-0018492<b>0</b></div>
                      </div>
                    </div>
                    <div className="kp-field__note kp-field__note--crit">
                      KRITIS · Karakter ke-11 terbaca O, seharusnya 0
                    </div>
                    <div className="kp-file__acts">
                      <span className="kp-btn kp-btn--sm">Pakai nilai Core Banking</span>
                      <span className="kp-btn kp-btn--ghost kp-btn--sm">Ketik manual</span>
                    </div>
                  </button>

                  {findFilter === 'all' && (
                    <>
                      <button type="button" className={fieldClass('kp-field', 'company')} onClick={() => setActiveField('company')}>
                        <div className="kp-field__top">
                          <span className="kp-field__label">Nama Perusahaan</span>
                          <span className="kp-field__conf kp-field__conf--ok">98%</span>
                        </div>
                        <div className="kp-field__value">PT Rizky Gemilang</div>
                      </button>
                      <button type="button" className={fieldClass('kp-field', 'address')} onClick={() => setActiveField('address')}>
                        <div className="kp-field__top">
                          <span className="kp-field__label">Alamat Perusahaan</span>
                          <span className="kp-field__conf kp-field__conf--ok">95%</span>
                        </div>
                        <div className="kp-field__value">Jl. Gajah Mada No. 118, Jakarta Pusat 10130</div>
                      </button>
                      <button type="button" className={fieldClass('kp-field', 'npwp')} onClick={() => setActiveField('npwp')}>
                        <div className="kp-field__top">
                          <span className="kp-field__label">NPWP</span>
                          <span className="kp-field__conf kp-field__conf--ok">97%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 3, flexWrap: 'wrap' }}>
                          <span className="kp-field__value kp-field__value--mono" style={{ margin: 0 }}>01.234.567.8-091.000</span>
                          <span className="kp-tag" style={{ fontSize: 9.5, fontWeight: 700 }}>DJP TERVALIDASI</span>
                        </div>
                      </button>
                      <button type="button" className={fieldClass('kp-field', 'officer')} onClick={() => setActiveField('officer')}>
                        <div className="kp-field__top">
                          <span className="kp-field__label">Nama Pejabat yang Berwenang</span>
                          <span className="kp-field__conf kp-field__conf--ok">96%</span>
                        </div>
                        <div className="kp-field__value">Bambang Suryanto</div>
                      </button>
                    </>
                  )}

                  <button type="button" className={fieldClass('kp-field kp-field--warn', 'phone')} onClick={() => setActiveField('phone')}>
                    <div className="kp-field__top">
                      <span className="kp-field__label" style={{ fontWeight: 600 }}>No Telepon</span>
                      <span className="kp-field__conf kp-field__conf--warn">OCR 81%</span>
                    </div>
                    <div className="kp-input">
                      <span className="kp-input__txt">021-5790 4</span>
                      {phone ? (
                        <span className="kp-input__txt" style={{ color: '#137a51' }}>{phone}</span>
                      ) : (
                        <span className="kp-input__gap" />
                      )}
                      <span className="kp-input__txt">8</span>
                      <span className="kp-card__spacer" />
                      <span className="kp-input__hint">{phone ? 'terisi' : 'ketik untuk melengkapi'}</span>
                    </div>
                    <div className="kp-field__note kp-field__note--warn">PERINGATAN · 1 karakter tidak terbaca</div>
                  </button>

                  <button type="button" className={fieldClass('kp-field kp-field--warn', 'admin')} onClick={() => setActiveField('admin')}>
                    <div className="kp-field__top">
                      <span className="kp-field__label" style={{ fontWeight: 600 }}>Registrasi Administrator</span>
                      <span className="kp-field__conf kp-field__conf--warn">OCR 88%</span>
                    </div>
                    <div className="kp-field__value">rizky.admin01 · 0812-1188-9042</div>
                    <div className="kp-cmp">
                      <div className="kp-cmp__box kp-cmp__box--doc-warn">
                        <div className="kp-cmp__k kp-cmp__k--doc">DIBACA DARI DOKUMEN</div>
                        <div className="kp-cmp__v kp-cmp__v--doc-warn" style={{ fontSize: 11 }}>admin@rizkygemilang.co.id</div>
                      </div>
                      <div className="kp-cmp__box kp-cmp__box--src">
                        <div className="kp-cmp__k kp-cmp__k--src">PROFIL KOPRA</div>
                        <div className="kp-cmp__v kp-cmp__v--src" style={{ fontSize: 11 }}>admin.kopra@rizkygemilang.co.id</div>
                      </div>
                    </div>
                    <div className="kp-field__note kp-field__note--warn">
                      PERINGATAN · Konfirmasi ke nasabah sebelum melanjutkan
                    </div>
                  </button>

                  {findFilter === 'all' && (
                    <>
                      <div className="kp-panel__sec">LAYANAN &amp; REKENING</div>
                      <div className="kp-tagwrap">
                        {['Jenis Layanan 94%', 'Rek. Perusahaan 93%', 'Rek. Pihak Ketiga 91%', 'Jumlah & Serial Token 92%', 'Kebutuhan Token 95%'].map((t) => (
                          <span className="kp-tag" key={t}>{t}</span>
                        ))}
                        <button type="button" className="kp-link" style={{ padding: '4px 2px' }}>Tampilkan nilai ⌄</button>
                      </div>
                    </>
                  )}

                  <button type="button" className={fieldClass('kp-field kp-field--crit', 'sig')} onClick={() => setActiveField('sig')}>
                    <div className="kp-field__top">
                      <span className="kp-field__label" style={{ fontWeight: 600 }}>Tandatangan Pejabat Berwenang</span>
                      <span className="kp-field__conf kp-field__conf--crit">Cocok 62%</span>
                    </div>
                    <div className="kp-sig">
                      <span className="kp-sig__box">
                        <span className="kp-sig__k">TTD DOKUMEN</span>
                        <span className="kp-sig__ph">placeholder</span>
                      </span>
                      <span className="kp-sig__pct">
                        <span className="kp-sig__num" style={{ display: 'block' }}>62%</span>
                        <span className="kp-sig__min">min 75%</span>
                      </span>
                      <span className="kp-sig__box">
                        <span className="kp-sig__k">SPESIMEN BANK</span>
                        <span className="kp-sig__ph">placeholder</span>
                      </span>
                    </div>
                    <div className="kp-marks">
                      <span className="kp-mark">
                        <span className="kp-mark__k" style={{ display: 'block' }}>STEMPEL</span>
                        <span className="kp-mark__v">✓ Terdeteksi</span>
                      </span>
                      <span className="kp-mark">
                        <span className="kp-mark__k" style={{ display: 'block' }}>MATERAI</span>
                        <span className="kp-mark__v">✓ Terdeteksi</span>
                      </span>
                    </div>
                    <div className="kp-field__note kp-field__note--crit">KRITIS · Kemiripan di bawah ambang batas</div>
                    <div className="kp-file__acts">
                      <span className="kp-btn kp-btn--sm">Unggah ulang halaman TTD</span>
                      <span className="kp-btn kp-btn--ghost kp-btn--sm">Ajukan eksepsi</span>
                    </div>
                  </button>
                </div>

                {/* ---- document viewer ---- */}
                <div className="kp-viewer">
                  <div className="kp-viewer__bar">
                    <div className="kp-viewer__name">FormAplikasi_RizkyGemilang.pdf</div>
                    <div className="kp-viewer__pages">
                      {[1, 2, 3].map((p) => (
                        <button
                          key={p}
                          type="button"
                          className={`kp-pagebtn${docPage === p ? ' kp-pagebtn--on' : ''}`}
                          onClick={() => setDocPage(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <div className="kp-card__spacer" />
                    <button type="button" className="kp-zoom">−</button>
                    <span className="kp-zoom__val">92%</span>
                    <button type="button" className="kp-zoom">+</button>
                    <button
                      type="button"
                      className={`kp-hl${highlight ? '' : ' kp-hl--off'}`}
                      onClick={() => setHighlight((v) => !v)}
                    >
                      Sorot temuan
                    </button>
                  </div>

                  <div className="kp-viewer__stage">
                    <div className="kp-paper">
                      <div className="kp-paper__head">
                        <div className="kp-paper__logo">LOGO</div>
                        <div style={{ textAlign: 'right' }}>
                          <div className="kp-paper__t1">FORMULIR APLIKASI</div>
                          <div className="kp-paper__t2">Kopra Cash Management</div>
                        </div>
                      </div>
                      <div className="kp-paper__rule" />

                      <div className="kp-paper__sec">A. JENIS KEBUTUHAN</div>
                      <div className="kp-paper__opts">
                        <div className="kp-paper__opt">
                          <span className="kp-paper__box kp-paper__box--on" />
                          <span className="kp-paper__optlabel">Perubahan/Penambahan Layanan</span>
                        </div>
                        <div className="kp-paper__opt">
                          <span className="kp-paper__box" />
                          <span className="kp-paper__optlabel kp-paper__optlabel--off">Registrasi Baru</span>
                        </div>
                      </div>

                      <div className="kp-paper__sec">B. DATA PERUSAHAAN</div>
                      <div className="kp-paper__grid">
                        <div className="kp-paper__k">Company ID</div>
                        <div className={`kp-region ${highlight ? 'kp-region--crit' : 'kp-region--plain'}`}>
                          <button type="button" className="kp-region__hit" onClick={() => setActiveField('companyId')}>
                            KPR-0018492O
                          </button>
                          {highlight && <span className="kp-region__pin kp-region__pin--crit">1</span>}
                        </div>

                        <div className="kp-paper__k">Nama Perusahaan</div>
                        <div className="kp-paper__v">PT Rizky Gemilang</div>
                        <div className="kp-paper__k">Alamat Perusahaan</div>
                        <div className="kp-paper__v">Jl. Gajah Mada No. 118, Jakarta Pusat 10130</div>
                        <div className="kp-paper__k">NPWP</div>
                        <div className="kp-paper__v kp-paper__v--mono">01.234.567.8-091.000</div>
                        <div className="kp-paper__k">Pejabat Berwenang</div>
                        <div className="kp-paper__v">Bambang Suryanto</div>

                        <div className="kp-paper__k">No Telepon</div>
                        <div className={`kp-region ${highlight ? 'kp-region--warn' : 'kp-region--plain'}`}>
                          <button type="button" className="kp-region__hit" onClick={() => setActiveField('phone')}>
                            021-5790 4<span className="kp-gap">▨</span>8
                          </button>
                          {highlight && <span className="kp-region__pin kp-region__pin--warn">3</span>}
                        </div>
                      </div>

                      <div className="kp-paper__sec">C. REGISTRASI ADMINISTRATOR</div>
                      <div className={`kp-region ${highlight ? 'kp-region--warn' : 'kp-region--plain'}`} style={{ marginBottom: 17 }}>
                        <button
                          type="button"
                          className="kp-region__hit"
                          style={{ padding: '7px 9px', fontFamily: 'inherit' }}
                          onClick={() => setActiveField('admin')}
                        >
                          <span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
                            <span style={{ fontSize: 9 }}>User: rizky.admin01</span>
                            <span style={{ fontSize: 9 }}>Telp: 0812-1188-9042</span>
                            <span style={{ fontSize: 9, gridColumn: 'span 2' }}>Email: admin@rizkygemilang.co.id</span>
                          </span>
                        </button>
                        {highlight && <span className="kp-region__pin kp-region__pin--warn">4</span>}
                      </div>

                      <div className="kp-paper__sec">D. LAYANAN &amp; REKENING</div>
                      <div className="kp-paper__grid">
                        <div className="kp-paper__k">Jenis Layanan</div>
                        <div className="kp-paper__v">Mass Transfer, Payroll, Bulk Inquiry</div>
                        <div className="kp-paper__k">Rek. Perusahaan</div>
                        <div className="kp-paper__v kp-paper__v--mono">1220004455667 · Add</div>
                        <div className="kp-paper__k">Rek. Pihak Ketiga</div>
                        <div className="kp-paper__v kp-paper__v--mono">1370009988771 · PT Universal · Add</div>
                        <div className="kp-paper__k">Token</div>
                        <div className="kp-paper__v kp-paper__v--mono">2 · Add · SN-88421905, SN-88421906</div>
                      </div>

                      <div className="kp-paper__sec">E. TANDATANGAN PEJABAT BERWENANG</div>
                      <div className="kp-sigarea">
                        <div className="kp-region" style={{ width: 180 }}>
                          <button
                            type="button"
                            className="kp-sigarea__box"
                            style={{ width: '100%', cursor: 'pointer', outlineColor: highlight ? '#e05c4a' : '#c9d2e0' }}
                            onClick={() => setActiveField('sig')}
                          >
                            area tandatangan
                          </button>
                          {highlight && <span className="kp-region__pin kp-region__pin--crit">2</span>}
                          <div className="kp-sigarea__cap">Bambang Suryanto</div>
                        </div>
                        <div className="kp-sigarea__stamp">STEMPEL<br />terdeteksi</div>
                        <div className="kp-sigarea__stamp" style={{ width: 48 }}>MATERAI<br />terdeteksi</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========== 8. FINDINGS ========== */}
          {screen === 'findings' && (
            <>
              <div className="kp-head">
                <div>
                  <button type="button" className="kp-back" onClick={() => go('result')}>
                    ← Hasil Pemeriksaan · REQ-2026-004182
                  </button>
                  <h1>Temuan &amp; Perbaikan</h1>
                  <div className="kp-head__meta">
                    4 temuan pada 3 dokumen · semuanya harus selesai sebelum dikirim ke Operation
                  </div>
                </div>
                <div className="kp-head__spacer" />
                <div className="kp-head__actions">
                  <button type="button" className="kp-btn kp-btn--ghost">Simpan sebagai draft</button>
                  <button type="button" className="kp-btn" onClick={() => go('tracking')}>Selesai &amp; Kirim ke Operation</button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <button type="button" className={`kp-chip${findFilter === 'all' ? ' kp-chip--on' : ''}`} onClick={() => setFindFilter('all')}>Semua 4</button>
                <button type="button" className={`kp-chip${findFilter === 'crit' ? ' kp-chip--on' : ' kp-chip--crit'}`} onClick={() => setFindFilter('crit')}>Kritis 2</button>
                <button type="button" className={`kp-chip${findFilter === 'warn' ? ' kp-chip--on' : ' kp-chip--warn'}`} onClick={() => setFindFilter('warn')}>Peringatan 2</button>
                <div className="kp-head__spacer" />
                <span className="kp-chip kp-chip--ok">1 dari 4 selesai</span>
              </div>

              <div className="kp-finds">
                {(findFilter === 'all' || findFilter === 'crit') && (
                  <>
                    <div className="kp-find">
                      <div className="kp-find__in">
                        <div className="kp-find__num">1</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="kp-find__head">
                            <div className="kp-find__title">Company ID tidak cocok dengan Core Banking</div>
                            <span className="kp-pill kp-pill--crit">KRITIS</span>
                          </div>
                          <div className="kp-find__where">
                            Form Aplikasi · hal. 1 · field “Company ID” · keyakinan OCR 74%
                          </div>
                          <div className="kp-find__cmp" style={{ gridTemplateColumns: 'repeat(3,minmax(0,1fr))' }}>
                            <div className="kp-cmp__box kp-cmp__box--doc" style={{ padding: '9px 10px', borderRadius: 7 }}>
                              <div className="kp-cmp__k kp-cmp__k--doc">DIBACA DARI DOKUMEN</div>
                              <div className="kp-cmp__v kp-cmp__v--mono kp-cmp__v--doc" style={{ fontSize: 13 }}>KPR-0018492<b>O</b></div>
                            </div>
                            <div className="kp-cmp__box kp-cmp__box--src" style={{ padding: '9px 10px', borderRadius: 7 }}>
                              <div className="kp-cmp__k kp-cmp__k--src">CORE BANKING</div>
                              <div className="kp-cmp__v kp-cmp__v--mono kp-cmp__v--src" style={{ fontSize: 13 }}>KPR-0018492<b>0</b></div>
                            </div>
                            <div className="kp-cmp__box kp-cmp__box--neutral" style={{ padding: '9px 10px', borderRadius: 7 }}>
                              <div className="kp-cmp__k kp-cmp__k--neutral">PROFIL KOPRA</div>
                              <div className="kp-cmp__v kp-cmp__v--mono kp-cmp__v--neutral" style={{ fontSize: 13 }}>KPR-0018492<b>0</b></div>
                            </div>
                          </div>
                          <div className="kp-find__acts">
                            <button type="button" className="kp-btn kp-btn--md">Pakai nilai Core Banking</button>
                            <button type="button" className="kp-btn kp-btn--ghost kp-btn--md">Ketik manual</button>
                            <button type="button" className="kp-btn kp-btn--ghost kp-btn--md" onClick={() => { setActiveField('companyId'); go('detail'); }}>
                              Lihat di dokumen
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="kp-find">
                      <div className="kp-find__in">
                        <div className="kp-find__num">2</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="kp-find__head">
                            <div className="kp-find__title">Cabang pengelola rekening pihak ketiga tidak sesuai</div>
                            <span className="kp-pill kp-pill--crit">KRITIS</span>
                          </div>
                          <div className="kp-find__where">
                            Surat Kuasa · hal. 1 · field “No Rekening dan Cabang Pengelola” · keyakinan OCR 89%
                          </div>
                          <div className="kp-find__cmp" style={{ gridTemplateColumns: 'repeat(2,minmax(0,1fr))' }}>
                            <div className="kp-cmp__box kp-cmp__box--doc" style={{ padding: '9px 10px', borderRadius: 7 }}>
                              <div className="kp-cmp__k kp-cmp__k--doc">DIBACA DARI DOKUMEN</div>
                              <div className="kp-cmp__v kp-cmp__v--doc">1370009988771 · KCP Surabaya Darmo</div>
                            </div>
                            <div className="kp-cmp__box kp-cmp__box--src" style={{ padding: '9px 10px', borderRadius: 7 }}>
                              <div className="kp-cmp__k kp-cmp__k--src">CORE BANKING</div>
                              <div className="kp-cmp__v kp-cmp__v--src">1370009988771 · KCU Surabaya Pemuda</div>
                            </div>
                          </div>
                          <div className="kp-find__body">
                            Nomor rekening cocok, namun cabang pengelola berbeda. Surat kuasa perlu dikoreksi
                            oleh nasabah atau dilampiri keterangan pemindahan rekening.
                          </div>
                          <div className="kp-find__acts">
                            <button type="button" className="kp-btn kp-btn--md">Unggah ulang Surat Kuasa</button>
                            <button type="button" className="kp-btn kp-btn--ghost kp-btn--md">Pakai nilai Core Banking</button>
                            <button type="button" className="kp-btn kp-btn--ghost kp-btn--md">Lihat di dokumen</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {(findFilter === 'all' || findFilter === 'warn') && (
                  <div className="kp-find kp-find--warn">
                    <div className="kp-find__in">
                      <div className="kp-find__num kp-find__num--warn">3</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="kp-find__head">
                          <div className="kp-find__title">No Telepon tidak lengkap terbaca</div>
                          <span className="kp-pill kp-pill--warn">PERINGATAN</span>
                        </div>
                        <div className="kp-find__where">
                          Form Aplikasi · hal. 1 · field “No Telepon” · keyakinan OCR 81%
                        </div>
                        <div className="kp-input" style={{ maxWidth: 340, padding: '9px 11px', borderRadius: 7 }}>
                          <span className="kp-input__txt" style={{ fontSize: 13 }}>021-5790 4</span>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 1))}
                            maxLength={1}
                            aria-label="Karakter yang tidak terbaca"
                            style={{
                              width: 22, height: 22, textAlign: 'center', border: '1px solid #e5c98a',
                              borderRadius: 3, background: '#fff3d6', fontFamily: 'inherit',
                              fontSize: 13, color: '#1a2333'
                            }}
                          />
                          <span className="kp-input__txt" style={{ fontSize: 13 }}>8</span>
                          <span className="kp-card__spacer" />
                          <span className="kp-input__hint">{phone ? 'siap disimpan' : 'ketik 1 karakter'}</span>
                        </div>
                        <div className="kp-find__acts">
                          <button type="button" className="kp-btn kp-btn--md" disabled={!phone}>Simpan nilai</button>
                          <button type="button" className="kp-btn kp-btn--ghost kp-btn--md" onClick={() => { setActiveField('phone'); go('detail'); }}>
                            Lihat di dokumen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {findFilter === 'all' && (
                  <>
                    <div className="kp-find kp-find--done">
                      <div className="kp-find__in" style={{ alignItems: 'center' }}>
                        <div className="kp-find__num kp-find__num--done">✓</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="kp-find__head">
                            <div className="kp-find__title kp-find__title--done">
                              Alamat email administrator berbeda dengan profil Kopra
                            </div>
                            <span className="kp-pill kp-pill--ok">SELESAI</span>
                          </div>
                          <div className="kp-find__where">
                            Form Pemeliharaan User · diperbaiki manual oleh Anisa Rahmawati · 09:41 ·
                            nilai lama admin@rizkygemilang.co.id
                          </div>
                        </div>
                        <button type="button" className="kp-link" style={{ fontSize: 11.5 }}>Batalkan</button>
                      </div>
                    </div>

                    <div className="kp-card" style={{ padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 11.5, color: '#67718a', lineHeight: 1.55, flex: 1, minWidth: 260 }}>
                        Tandatangan pejabat berwenang pada Form Aplikasi tercatat cocok 62% — di bawah
                        ambang 75%. Temuan ini tergabung pada nomor 1 dan akan ikut diverifikasi ulang
                        setelah halaman tandatangan diunggah kembali.
                      </div>
                      <button type="button" className="kp-btn kp-btn--ghost kp-btn--md" onClick={() => { setActiveField('sig'); go('detail'); }}>
                        Buka Form Aplikasi
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* ========== 9. TRACKING ========== */}
          {screen === 'tracking' && (
            <>
              <div style={{ marginBottom: 18 }}>
                <button type="button" className="kp-back" onClick={() => go('queue')}>← Daftar Permohonan</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <h1>Status Pengiriman</h1>
                  <span className="kp-pill kp-pill--info">MENUNGGU OPS CHECKER</span>
                </div>
                <div className="kp-head__meta">
                  REQ-2026-004182 · PT Rizky Gemilang · dikirim 04 Sep 2026, 10:07 oleh Anisa Rahmawati
                </div>
              </div>

              <div className="kp-banner kp-banner--ok">
                <div className="kp-banner__icon kp-banner__icon--ok">✓</div>
                <div>
                  <div className="kp-banner__title kp-banner__title--ok">
                    Permohonan berhasil dikirim ke Operation
                  </div>
                  <div className="kp-banner__body">
                    Seluruh 4 temuan telah diselesaikan dan 41 data validasi dinyatakan sesuai oleh
                    pemeriksaan AI. Berkas beserta jejak audit ikut terkirim.
                  </div>
                </div>
              </div>

              <div className="kp-flow">
                <div className="kp-flow__row">
                  {FLOW.map((f, i) => (
                    <React.Fragment key={f.name}>
                      <div className="kp-flow__step">
                        <div className={`kp-flow__num${f.state === 'done' ? ' kp-flow__num--done' : ''}${f.state === 'on' ? ' kp-flow__num--on' : ''}`}>
                          {f.num}
                        </div>
                        <div className={`kp-flow__name${f.state === 'done' ? ' kp-flow__name--done' : ''}${f.state === 'on' ? ' kp-flow__name--on' : ''}`}>
                          {f.name}
                        </div>
                        <div className={`kp-flow__note${f.state === 'done' ? ' kp-flow__note--done' : ''}${f.state === 'on' ? ' kp-flow__note--on' : ''}`} style={{ whiteSpace: 'pre-line' }}>
                          {f.note}
                        </div>
                      </div>
                      {i < FLOW.length - 1 && (
                        <div className={`kp-flow__bar${f.state === 'done' ? ' kp-flow__bar--done' : ''}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="kp-cols">
                <div className="kp-card" style={{ flex: 1, minWidth: 320 }}>
                  <div className="kp-card__head"><div className="kp-card__title">Berkas Terkirim</div></div>
                  {SENT_FILES.map((f) => (
                    <div className="kp-filerow" key={f.name}>
                      <span className="kp-filerow__dot" />
                      <span className="kp-filerow__name">{f.name}</span>
                      <span className="kp-filerow__size">{f.size}</span>
                    </div>
                  ))}
                </div>

                <div className="kp-card" style={{ width: 330, flex: 'none', padding: 14 }}>
                  <div className="kp-card__title" style={{ marginBottom: 11 }}>Ringkasan Pemeriksaan AI</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {SENT_SUMMARY.map(([k, v]) => (
                      <div className="kp-kv" key={k}><span>{k}</span><span>{v}</span></div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="kp-btn kp-btn--ghost"
                    style={{ marginTop: 14, width: '100%', fontWeight: 700, color: '#1c4e9c' }}
                    onClick={() => go('audit')}
                  >
                    Lihat Riwayat Lengkap
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ========== 10. AUDIT TRAIL ========== */}
          {screen === 'audit' && (
            <>
              <div style={{ marginBottom: 18 }}>
                <button type="button" className="kp-back" onClick={() => go('result')}>
                  ← Hasil Pemeriksaan · REQ-2026-004182
                </button>
                <h1>Riwayat Permohonan</h1>
                <div className="kp-head__meta">
                  PT Rizky Gemilang · seluruh langkah tercatat otomatis dan tidak dapat diubah
                </div>
              </div>

              <div className="kp-time">
                {AUDIT.map((e, i) => (
                  <div className="kp-ev" key={e.time}>
                    <div className="kp-ev__rail">
                      <div className="kp-ev__dot" style={{ background: e.dot, border: `3px solid ${e.ring}` }} />
                      {i < AUDIT.length - 1 && <div className="kp-ev__line" />}
                    </div>
                    <div className={`kp-ev__main${i === AUDIT.length - 1 ? ' kp-ev__main--last' : ''}`}>
                      <div className="kp-ev__head">
                        <div className="kp-ev__title">{e.title}</div>
                        <div className="kp-ev__time">{e.time}</div>
                      </div>
                      <div className="kp-ev__body">{e.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
