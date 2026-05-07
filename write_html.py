#!/usr/bin/env python3
"""Writes the full SPM Dubai index.html"""

HTML = """\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SPM Dubai — Debt Recovery Excellence</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />

  <style>
    /* === TOKENS === */
    :root {
      --gold:         #C9A84C;
      --gold-light:   #E8C96A;
      --gold-dim:     rgba(201,168,76,0.18);
      --dark:         #080B12;
      --dark-surface: #0F1520;
      --dark-card:    #111827;
      --dark-card-2:  #131C2C;
      --dark-border:  rgba(255,255,255,0.07);
      --gold-border:  rgba(201,168,76,0.20);
      --text-white:   #F0F4FF;
      --text-mid:     #C5CEDF;
      --text-muted:   #7D8BA8;
      --text-faint:   #3F4A60;
      --card-w:       500px;
      --card-h:       590px;
      --commit-h:     380px;
      --commit-fold:  88px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Roboto', sans-serif; background: var(--dark); color: var(--text-white); overflow-x: hidden; }
    img  { display: block; max-width: 100%; }
    a    { color: inherit; text-decoration: none; }
    button { font-family: inherit; }

    /* === NAVBAR === */
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      height: 72px; display: flex; align-items: center; justify-content: space-between;
      padding: 0 52px;
      background: rgba(8,11,18,0.82);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: background 0.3s, border-color 0.3s;
    }
    .navbar.is-scrolled {
      background: rgba(8,11,18,0.97);
      border-bottom-color: var(--gold-border);
    }
    .nav-logo { display: flex; align-items: center; gap: 14px; text-decoration: none; flex-shrink: 0; }
    .nav-logo__mark { display: flex; align-items: baseline; }
    .nl-sp { font-family: 'Arial Black', Impact, sans-serif; font-size: 30px; font-weight: 900; line-height: 1; color: var(--text-white); letter-spacing: -0.02em; }
    .nl-m  { font-family: 'Arial Black', Impact, sans-serif; font-size: 30px; font-weight: 900; line-height: 1; color: var(--gold); letter-spacing: -0.02em; }
    .nav-logo__sep  { width: 1px; height: 30px; background: rgba(255,255,255,0.20); flex-shrink: 0; }
    .nav-logo__name { font-family: 'Roboto', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase; color: var(--text-mid); line-height: 1; }
    .nav-logo__sub  { font-family: 'Roboto', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-top: 3px; }
    .nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
    .nav-links a { font-family: 'Roboto', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); transition: color 0.2s; position: relative; }
    .nav-links a::after { content:''; position:absolute; bottom:-4px; left:0; right:0; height:1px; background:var(--gold); transform:scaleX(0); transform-origin:left; transition:transform 0.25s; }
    .nav-links a:hover { color: var(--text-white); }
    .nav-links a:hover::after { transform: scaleX(1); }
    .nav-cta { font-family:'Roboto',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; background:var(--gold); color:var(--dark); border:none; padding:11px 24px; cursor:pointer; transition:background 0.2s; flex-shrink:0; }
    .nav-cta:hover { background: var(--gold-light); }
    @media (max-width: 880px) { .nav-links, .nav-cta { display: none; } .navbar { padding: 0 24px; } }

    /* === HERO === */
    .hero {
      position: relative; min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; padding-top: 72px;
    }
    .hero__bg {
      position: absolute; inset: 0;
      background:
        linear-gradient(to bottom, rgba(8,11,18,0.35) 0%, rgba(8,11,18,0.55) 40%, rgba(8,11,18,0.92) 80%, rgba(8,11,18,1) 100%),
        url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80') center 40% / cover no-repeat;
    }
    .hero__tint {
      position: absolute; inset: 0; pointer-events: none;
      background:
        radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.06) 0%, transparent 55%),
        radial-gradient(ellipse at 20% 75%, rgba(27,53,104,0.14) 0%, transparent 50%);
    }
    .hero__content { position: relative; z-index: 2; text-align: center; padding: 0 24px; max-width: 860px; }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: 'Roboto', sans-serif; font-size: 10px; font-weight: 700;
      letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); margin-bottom: 22px;
    }
    .eyebrow::before, .eyebrow::after { content:''; display:block; width:28px; height:1px; background:var(--gold); opacity:0.5; }
    .hero__headline {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(44px, 6.5vw, 88px); font-weight: 800;
      line-height: 1.05; letter-spacing: -0.025em; color: var(--text-white); margin-bottom: 8px;
    }
    .hero__headline em { font-style: normal; color: var(--gold); }
    .hero__tagline {
      font-family: 'Roboto', sans-serif; font-size: 12px; font-weight: 400;
      letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 28px;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .hero__sub {
      font-family: 'Roboto', sans-serif; font-size: 17px; font-weight: 300;
      line-height: 1.75; color: var(--text-mid); max-width: 580px; margin: 0 auto 44px;
    }
    .hero__ctas { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
    .btn-gold { font-family:'Roboto',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--dark); background:var(--gold); border:none; padding:16px 40px; cursor:pointer; transition:background 0.22s, transform 0.18s; display:inline-block; }
    .btn-gold:hover { background:var(--gold-light); transform:translateY(-2px); }
    .btn-ghost { font-family:'Roboto',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-white); background:transparent; border:1px solid rgba(255,255,255,0.18); padding:16px 40px; cursor:pointer; transition:border-color 0.22s, transform 0.18s; display:inline-block; }
    .btn-ghost:hover { border-color:var(--gold); transform:translateY(-2px); }
    .hero__stats { position: absolute; bottom: 0; left: 0; right: 0; z-index: 3; display: flex; justify-content: center; background: rgba(12,17,28,0.90); backdrop-filter: blur(16px); border-top: 1px solid var(--gold-border); }
    .hero__stat { flex:1; max-width:230px; padding:22px 20px; text-align:center; border-right:1px solid rgba(255,255,255,0.06); }
    .hero__stat:last-child { border-right: none; }
    .hero__stat-val   { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; color:var(--gold); line-height:1; margin-bottom:5px; }
    .hero__stat-label { font-family:'Roboto',sans-serif; font-size:10px; font-weight:400; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-muted); }

    /* === SECTION BASE === */
    .section { padding: 110px 0 120px; position: relative; overflow: hidden; }
    .section--alt { background: var(--dark-surface); }
    .container { max-width: 1260px; margin: 0 auto; padding: 0 48px; }
    .section-header { text-align: center; margin-bottom: 68px; }
    .section-title { font-family:'Playfair Display',serif; font-size:48px; font-weight:700; line-height:1.1; color:var(--text-white); margin-bottom:14px; }
    .section-sub   { font-family:'Roboto',sans-serif; font-size:16px; font-weight:300; line-height:1.70; color:var(--text-muted); max-width:520px; margin:0 auto; }
    .gold-rule { width:48px; height:2px; background:linear-gradient(to right,var(--gold),transparent); margin:0 auto 20px; }
    .section-divider { width:100%; height:1px; background:linear-gradient(to right,transparent,var(--gold-border),transparent); }

    /* === DUBAI COMMITMENT === */
    .commitment-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
    @media (max-width: 960px) { .commitment-grid { grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 580px) { .commitment-grid { grid-template-columns: 1fr; } }

    .commit-wrap {
      height: var(--commit-h);
      overflow: hidden;
      clip-path: inset(0 0 calc(100% - var(--commit-fold)) 0);
      transition: clip-path 0.72s cubic-bezier(0.22,0.61,0.36,1), box-shadow 0.4s;
      position: relative;
      cursor: pointer;
      outline: none;
    }
    .commit-wrap:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
    .commit-wrap.is-open {
      clip-path: inset(0 0 0% 0);
      box-shadow: 0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px var(--gold-border);
      z-index: 2;
    }
    @keyframes commitEnter {
      0%   { clip-path: inset(0 0 100% 0); opacity: 0; }
      12%  { opacity: 1; }
      60%  { clip-path: inset(0 0 calc(100% - var(--commit-fold)) 0); }
      100% { clip-path: inset(0 0 calc(100% - var(--commit-fold)) 0); opacity: 1; }
    }
    .commit-wrap.entering { animation: commitEnter 0.85s cubic-bezier(0.22,0.61,0.36,1) forwards; }

    .commit-card { width:100%; height:100%; background:var(--dark-card-2); border:1px solid var(--dark-border); display:flex; flex-direction:column; position:relative; overflow:hidden; }
    .commit-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(to right,var(--gold),transparent); transform:scaleX(0); transform-origin:left; transition:transform 0.5s 0.3s ease; }
    .commit-wrap.is-open .commit-card::after { transform: scaleX(1); }

    .commit-header { height:var(--commit-fold); flex-shrink:0; display:flex; align-items:center; gap:16px; padding:0 28px; background:var(--dark-card-2); border-bottom:1px solid var(--dark-border); transition:background 0.3s, border-color 0.3s; position:relative; z-index:1; }
    .commit-wrap.is-open .commit-header { background:rgba(201,168,76,0.055); border-bottom-color:var(--gold-border); }
    .commit-icon { width:40px; height:40px; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:rgba(201,168,76,0.10); border:1px solid var(--gold-border); }
    .commit-icon svg { color: var(--gold); }
    .commit-title { font-family:'Roboto',sans-serif; font-size:15px; font-weight:600; color:var(--text-white); line-height:1.25; flex:1; }
    .commit-chevron { width:24px; height:24px; display:flex; align-items:center; justify-content:center; color:var(--gold); transition:transform 0.5s; flex-shrink:0; }
    .commit-wrap.is-open .commit-chevron { transform: rotate(180deg); }

    .commit-body { flex:1; padding:28px 28px 24px; display:flex; flex-direction:column; gap:18px; }
    .commit-desc { font-family:'Roboto',sans-serif; font-size:14px; font-weight:400; line-height:1.70; color:var(--text-mid); }
    .commit-points { display:flex; flex-direction:column; gap:9px; list-style:none; }
    .commit-points li { display:flex; align-items:flex-start; gap:10px; font-family:'Roboto',sans-serif; font-size:13px; font-weight:400; color:var(--text-muted); line-height:1.5; }
    .commit-points li::before { content:''; width:5px; height:5px; background:var(--gold); border-radius:50%; flex-shrink:0; margin-top:6px; }
    .commit-badge { margin-top:auto; display:inline-flex; align-items:center; gap:8px; font-family:'Roboto',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); border:1px solid var(--gold-border); padding:7px 14px; align-self:flex-start; }
    .commit-hint { text-align:center; margin-top:28px; font-family:'Roboto',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.10em; color:var(--text-faint); display:flex; align-items:center; justify-content:center; gap:6px; }

    /* === CAROUSEL === */
    .carousel-outer { position:relative; z-index:2; }
    .carousel-viewport { position:relative; width:100%; overflow:hidden; padding:48px 0 56px; outline:none; }
    .carousel-viewport:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; }
    .carousel-progress { position:absolute; top:0; left:0; height:2px; background:var(--gold); width:0%; z-index:5; transition:width linear; }
    .carousel-track { display:flex; align-items:center; justify-content:center; gap:28px; }

    .card-wrap { flex:0 0 var(--card-w); width:var(--card-w); height:var(--card-h); transition:transform 0.60s cubic-bezier(0.4,0,0.2,1), opacity 0.60s cubic-bezier(0.4,0,0.2,1), filter 0.60s cubic-bezier(0.4,0,0.2,1); cursor:pointer; }
    .card-wrap.is-prev, .card-wrap.is-next { opacity:0.55; transform:scale(0.91); filter:blur(1.5px) brightness(0.70); }
    .card-wrap.is-active { opacity:1; transform:scale(1); filter:none; z-index:3; }
    .card-wrap.is-hidden { opacity:0; transform:scale(0.80); pointer-events:none; position:absolute; visibility:hidden; }

    .card { width:100%; height:100%; background:var(--dark-card); border:1px solid var(--dark-border); padding:36px 32px 28px; display:flex; flex-direction:column; position:relative; overflow:hidden; }
    .card::before { content:''; position:absolute; top:0; right:0; width:100px; height:100px; background:linear-gradient(225deg,rgba(201,168,76,0.08) 0%,transparent 60%); pointer-events:none; }
    .card-wrap.is-active .card { border-left: 2px solid var(--gold); }

    .card__logo-row { height:54px; display:flex; align-items:center; margin-bottom:18px; }
    .card__logo-placeholder { height:40px; width:110px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); display:flex; align-items:center; justify-content:center; }
    .card__logo-placeholder span { font-family:'Roboto',sans-serif; font-size:8px; font-weight:600; letter-spacing:0.10em; text-transform:uppercase; color:var(--text-faint); }
    .card__company    { font-family:'Roboto',sans-serif; font-size:20px; font-weight:600; color:var(--text-white); margin-bottom:4px; line-height:1.25; }
    .card__location   { font-family:'Roboto',sans-serif; font-size:13px; font-weight:400; color:var(--text-muted); margin-bottom:20px; display:flex; align-items:center; gap:5px; }
    .card__label      { font-family:'Roboto',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
    .card__challenge-text { font-family:'Roboto',sans-serif; font-size:13px; font-weight:400; color:#8A98B4; line-height:1.65; margin-bottom:18px; }
    .card__divider { width:100%; height:1px; background:linear-gradient(to right,var(--gold),transparent); opacity:0.28; margin-bottom:16px; }
    .card__results { display:flex; flex-direction:column; gap:5px; margin-bottom:18px; }
    .card__result-item { font-family:'Roboto',sans-serif; font-size:17px; font-weight:700; color:var(--gold); line-height:1.2; }
    .card__result-item span { font-size:12px; font-weight:400; color:var(--text-muted); margin-left:7px; }
    .card__quote { font-family:'Roboto',sans-serif; font-size:15px; font-weight:400; font-style:italic; color:var(--text-mid); line-height:1.65; flex:1; border-left:2px solid rgba(201,168,76,0.28); padding-left:14px; margin-bottom:10px; }
    .card__attribution { font-family:'Roboto',sans-serif; font-size:13px; font-weight:400; color:var(--text-muted); margin-bottom:16px; }
    .card__cta { font-family:'Roboto',sans-serif; font-size:13px; font-weight:600; color:var(--gold); text-decoration:none; letter-spacing:0.06em; display:inline-flex; align-items:center; gap:6px; transition:gap 0.2s; margin-top:auto; }
    .card__cta:hover { gap:10px; }

    .carousel-controls { display:flex; align-items:center; justify-content:center; gap:28px; position:relative; z-index:4; }
    .carousel-btn { width:120px; height:48px; background:rgba(19,28,44,0.9); border:1px solid rgba(201,168,76,0.22); color:var(--text-white); font-family:'Roboto',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background 0.22s, border-color 0.22s, transform 0.18s; }
    .carousel-btn:hover { background:rgba(201,168,76,0.10); border-color:var(--gold); transform:translateY(-1px); }
    .carousel-btn:active { transform:translateY(0); }
    .carousel-dots { display:flex; align-items:center; gap:8px; }
    .carousel-dot { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,0.15); border:none; cursor:pointer; padding:0; transition:background 0.3s, width 0.3s, border-radius 0.3s; }
    .carousel-dot.is-active { background:var(--gold); width:24px; border-radius:4px; }

    /* Responsive */
    @media (max-width: 1100px) { :root { --card-w: 430px; } .container { padding: 0 32px; } }
    @media (max-width: 800px)  { :root { --card-w: 88vw; --card-h: auto; } .card-wrap.is-prev,.card-wrap.is-next { display:none; } .card { min-height:560px; } .carousel-btn { width:96px; font-size:11px; } .section { padding:72px 0 80px; } }
    @media (max-width: 580px)  { :root { --card-w: 93vw; } .section-title { font-size:28px; } }
  </style>
</head>
<body>

<!-- NAVBAR -->
<nav class="navbar" id="navbar" aria-label="Main navigation">
  <a href="#" class="nav-logo" aria-label="S.P. Madrid Dubai Office">
    <div class="nav-logo__mark">
      <span class="nl-sp">SP</span><span class="nl-m">M</span>
    </div>
    <div class="nav-logo__sep" aria-hidden="true"></div>
    <div>
      <div class="nav-logo__name">S.P. Madrid</div>
      <div class="nav-logo__sub">Dubai Office</div>
    </div>
  </a>
  <ul class="nav-links" role="list">
    <li><a href="#commitment">Commitment</a></li>
    <li><a href="#stories">Case Studies</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button class="nav-cta" aria-label="Request consultation">Consult Us</button>
</nav>


<!-- HERO -->
<section class="hero" aria-label="SPM Dubai Hero">
  <div class="hero__bg"  aria-hidden="true"></div>
  <div class="hero__tint" aria-hidden="true"></div>

  <div class="hero__content">
    <div class="eyebrow">Dubai, UAE</div>
    <h1 class="hero__headline">Debt Recovery.<br><em>Redefined.</em></h1>
    <p class="hero__tagline">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
      Dubai International Financial Centre
    </p>
    <p class="hero__sub">
      SPM Dubai delivers compliant, client-first receivables management that restores cash flow while protecting your brand reputation — across the Gulf and beyond.
    </p>
    <div class="hero__ctas">
      <a href="#stories"    class="btn-gold">View Case Studies</a>
      <a href="#commitment" class="btn-ghost">Our Commitment</a>
    </div>
  </div>

  <div class="hero__stats" aria-label="Key performance figures">
    <div class="hero__stat"><div class="hero__stat-val">AED 2.1B+</div><div class="hero__stat-label">Recovered — Dubai</div></div>
    <div class="hero__stat"><div class="hero__stat-val">94%</div><div class="hero__stat-label">Avg. Recovery Rate</div></div>
    <div class="hero__stat"><div class="hero__stat-val">0</div><div class="hero__stat-label">Regulatory Violations</div></div>
    <div class="hero__stat"><div class="hero__stat-val">18+</div><div class="hero__stat-label">Years in the Gulf</div></div>
  </div>
</section>


<!-- THE DUBAI COMMITMENT -->
<section class="section section--alt" id="commitment" aria-label="The Dubai Commitment">
  <div class="container">
    <header class="section-header">
      <div class="eyebrow">Our Principles</div>
      <div class="gold-rule"></div>
      <h2 class="section-title">The Dubai Commitment</h2>
      <p class="section-sub">Six non-negotiable pillars that define how SPM protects your receivables — and your reputation.</p>
    </header>
    <div class="commitment-grid" id="commitGrid" role="list"></div>
    <p class="commit-hint" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      Click any card to unfold
    </p>
  </div>
</section>

<div class="section-divider" aria-hidden="true"></div>


<!-- CLIENT SUCCESS STORIES -->
<section class="section" id="stories" aria-label="Client Success Stories">
  <div style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 12% 50%,rgba(201,168,76,0.04) 0%,transparent 50%),radial-gradient(ellipse at 88% 20%,rgba(201,168,76,0.03) 0%,transparent 40%);" aria-hidden="true"></div>

  <header class="section-header">
    <div class="eyebrow">Proven Results</div>
    <div class="gold-rule"></div>
    <h2 class="section-title">Client Success Stories</h2>
    <p class="section-sub">Real outcomes for real businesses — each recovery handled with integrity, compliance, and measurable impact.</p>
  </header>

  <div class="carousel-outer">
    <div class="carousel-viewport" id="carousel" tabindex="0" role="region" aria-label="Client case studies carousel" aria-live="polite">
      <div class="carousel-progress" id="carouselProgress" aria-hidden="true"></div>
      <div class="carousel-track"    id="carouselTrack"></div>
    </div>
    <div class="carousel-controls" role="group" aria-label="Carousel navigation">
      <button class="carousel-btn" id="btnPrev" aria-label="Previous">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
        Prev
      </button>
      <div class="carousel-dots" id="carouselDots" role="tablist" aria-label="Slide indicators"></div>
      <button class="carousel-btn" id="btnNext" aria-label="Next">
        Next
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
</section>


<script>
(function() {
  'use strict';

  /* Navbar scroll */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  }, { passive: true });


  /* =====================================================
     THE DUBAI COMMITMENT
  ===================================================== */
  var iconShield = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
  var iconClock  = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
  var iconUsers  = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
  var iconGlobe  = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
  var iconDesktop= '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
  var iconCheck  = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  var COMMITS = [
    { icon: iconShield, title: 'DIFC Regulatory Compliance',   badge: 'DIFC Licensed',      desc: 'Every engagement is structured within the full framework of DIFC, CBUAE, and UAE Central Bank guidelines — zero-tolerance for shortcuts.',             points: ['Licensed under DIFC Authority', 'Full CBUAE reporting trails', 'Quarterly independent compliance audits'] },
    { icon: iconClock,  title: 'Sharia-Compliant Recovery',    badge: 'Sharia Certified',   desc: 'Our Islamic finance desk ensures all murabaha, ijara, and sukuk-linked exposures are resolved without violating Sharia principles.',                    points: ['Certified Sharia supervisory board', 'Prohibition of riba-based structures', 'Documented halal resolution records'] },
    { icon: iconUsers,  title: 'Client-First Protection',      badge: '0 Client Complaints',desc: 'Your customer relationship is treated as a long-term asset. We recover funds while safeguarding goodwill and brand reputation.',                         points: ['Empathy-first agent training', 'No harassment — all calls monitored', 'NPS tracking throughout every case'] },
    { icon: iconGlobe,  title: 'Multi-Jurisdictional Reach',   badge: '14+ Countries',      desc: 'Cross-border enforcement across 14+ countries through a vetted network of legal partners, coordinated from our DIFC hub.',                              points: ['Active in GCC, Levant, SEA, EU', 'Dual-language legal correspondence', 'Reciprocal enforcement treaties leveraged'] },
    { icon: iconDesktop,title: 'Digital-First Operations',     badge: 'ISO 27001',          desc: 'Real-time dashboards, AI-assisted propensity scoring, and automated escalation workflows replace legacy paper-based processes.',                       points: ['Live portfolio dashboard (24/7)', 'ML-powered debtor scoring', 'ISO 27001 data security certified'] },
    { icon: iconCheck,  title: 'Zero-Tolerance Integrity',     badge: 'Ethics Certified',   desc: 'Strict code of conduct with no incentive structures rewarding aggression. All communications are recorded and externally auditable.',                    points: ['100% recorded agent interactions', 'External ethics board oversight', 'Annual UN Global Compact endorsement'] },
  ];

  var commitGrid   = document.getElementById('commitGrid');
  var chevronSVG   = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  var checkSmSVG   = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  COMMITS.forEach(function(c, i) {
    var wrap = document.createElement('div');
    wrap.className = 'commit-wrap';
    wrap.setAttribute('role', 'listitem');
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('aria-expanded', 'false');
    wrap.setAttribute('aria-label', c.title);
    wrap.dataset.stagger = i * 80;
    wrap.innerHTML =
      '<div class="commit-card">'
      + '<div class="commit-header">'
        + '<div class="commit-icon" aria-hidden="true">' + c.icon + '</div>'
        + '<div class="commit-title">' + c.title + '</div>'
        + '<div class="commit-chevron" aria-hidden="true">' + chevronSVG + '</div>'
      + '</div>'
      + '<div class="commit-body">'
        + '<p class="commit-desc">' + c.desc + '</p>'
        + '<ul class="commit-points">'
          + c.points.map(function(p) { return '<li>' + p + '</li>'; }).join('')
        + '</ul>'
        + '<div class="commit-badge">' + checkSmSVG + ' ' + c.badge + '</div>'
      + '</div>'
      + '</div>';

    function toggle() {
      var open = wrap.classList.contains('is-open');
      wrap.classList.toggle('is-open', !open);
      wrap.setAttribute('aria-expanded', String(!open));
    }
    wrap.addEventListener('click', toggle);
    wrap.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    commitGrid.appendChild(wrap);
  });

  /* Scroll-triggered entrance */
  var commitObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var w = entry.target;
      var delay = parseInt(w.dataset.stagger || '0', 10);
      setTimeout(function() {
        w.classList.add('entering');
        w.addEventListener('animationend', function() { w.classList.remove('entering'); }, { once: true });
      }, delay);
      commitObs.unobserve(w);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.commit-wrap').forEach(function(w) { commitObs.observe(w); });


  /* =====================================================
     CAROUSEL
  ===================================================== */
  var CASES = [
    {
      company: 'Regional Telecom Provider', location: 'Dubai, UAE',
      challenge: 'AED 180M post-paid portfolio — 68% of accounts exceeded 180 days overdue with growing churn risk.',
      results: [
        { value: '91% Recovery',            sub: 'in 8 months' },
        { value: '0 Regulatory Complaints', sub: 'full TDRA compliance' },
        { value: '+AED 22M',                sub: 'additional revenue unlocked' }
      ],
      quote: 'SPM Dubai recovered our outstanding balances while our customers actually thanked us for how the process was handled.',
      attribution: '— Head of Revenue Assurance',
    },
    {
      company: 'Major Retail & BNPL Platform', location: 'Dubai, UAE',
      challenge: 'AED 95M deferred-payment portfolio with 55% of accounts over 90 days — no structured escalation path.',
      results: [
        { value: '87% Cash Recovery', sub: 'in 6 months' },
        { value: '42% Restructured',  sub: 'payment plans retained' },
        { value: 'AED 12M',           sub: 'bad-debt write-off avoided' }
      ],
      quote: 'Their team turned a write-off scenario into a genuine customer retention win. Numbers exceeded every internal benchmark.',
      attribution: '— CFO, Retail & Finance Group',
    },
    {
      company: 'UAE Healthcare Network', location: 'Abu Dhabi & Dubai, UAE',
      challenge: 'AED 60M in aging patient invoices across 7 facilities, stalled by strict privacy constraints.',
      results: [
        { value: '83% Net Recovery', sub: 'across all facilities' },
        { value: '100% Compliant',   sub: 'zero data incidents' },
        { value: '+28 NPS Points',   sub: 'patient satisfaction increase' }
      ],
      quote: 'We needed a partner that understood healthcare sensitivity — SPM delivered compliant recovery without a single patient complaint.',
      attribution: '— Group Revenue Cycle Director',
    },
    {
      company: 'Gulf Islamic Finance House', location: 'DIFC, Dubai',
      challenge: 'AED 320M Sharia-compliant murabaha portfolio with 40% Stage-3 exposure approaching provisioning deadlines.',
      results: [
        { value: '78% Portfolio Resolved', sub: 'in 12 months' },
        { value: 'AED 85M',               sub: 'provision reversal achieved' },
        { value: '0 Sharia Violations',    sub: 'certified audit trail' }
      ],
      quote: 'Meeting CBUAE requirements and Sharia standards simultaneously seemed impossible. SPM Dubai made it routine.',
      attribution: '— Chief Risk Officer',
    },
    {
      company: 'Jebel Ali Logistics Group', location: 'JAFZA, Dubai',
      challenge: 'USD 28M cross-border receivables across 14 jurisdictions — multi-currency disputes stalled for 18+ months.',
      results: [
        { value: '89% Cross-Border Recovery', sub: 'multi-jurisdiction' },
        { value: '14 Countries',              sub: 'simultaneous enforcement' },
        { value: '4.5 Months',                sub: 'avg. dispute resolution' }
      ],
      quote: 'Cross-border recovery of this complexity typically takes years. SPM resolved it in under five months.',
      attribution: '— VP Finance, Logistics Group',
    },
  ];

  var activeIndex = 0;
  var autoTimer   = null;
  var isHovered   = false;
  var touchStartX = 0;
  var touchDiff   = 0;
  var INTERVAL    = 5000;

  var viewport    = document.getElementById('carousel');
  var track       = document.getElementById('carouselTrack');
  var dotsEl      = document.getElementById('carouselDots');
  var btnPrev     = document.getElementById('btnPrev');
  var btnNext     = document.getElementById('btnNext');
  var progressBar = document.getElementById('carouselProgress');
  var pinSVG      = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
  var arrowSVG    = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  function buildCard(c) {
    var wrap = document.createElement('div');
    wrap.className = 'card-wrap is-hidden';
    wrap.setAttribute('role', 'tabpanel');
    wrap.setAttribute('aria-label', c.company);
    var res = c.results.map(function(r) {
      return '<div class="card__result-item">' + r.value + '<span>' + r.sub + '</span></div>';
    }).join('');
    wrap.innerHTML =
      '<article class="card">'
      + '<div class="card__logo-row"><div class="card__logo-placeholder"><span>Confidential</span></div></div>'
      + '<h3 class="card__company">' + c.company + '</h3>'
      + '<p class="card__location">' + pinSVG + ' ' + c.location + '</p>'
      + '<p class="card__label">Challenge</p>'
      + '<p class="card__challenge-text">' + c.challenge + '</p>'
      + '<div class="card__divider" aria-hidden="true"></div>'
      + '<p class="card__label">Results</p>'
      + '<div class="card__results">' + res + '</div>'
      + '<blockquote class="card__quote">&ldquo;' + c.quote + '&rdquo;</blockquote>'
      + '<p class="card__attribution">' + c.attribution + '</p>'
      + '<a href="#contact" class="card__cta">Read Full Story ' + arrowSVG + '</a>'
      + '</article>';
    return wrap;
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    CASES.forEach(function(_, i) {
      var d = document.createElement('button');
      d.className = 'carousel-dot' + (i === activeIndex ? ' is-active' : '');
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-selected', String(i === activeIndex));
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', function() { goTo(i); resetAuto(); });
      dotsEl.appendChild(d);
    });
  }

  function init() {
    CASES.forEach(function(c, i) {
      var w = buildCard(c);
      w.dataset.index = i;
      track.appendChild(w);
    });
    buildDots();
    renderPositions();
    startAuto();
  }

  function renderPositions() {
    var cards = track.querySelectorAll('.card-wrap');
    var total = CASES.length;
    cards.forEach(function(card, i) {
      card.classList.remove('is-active','is-prev','is-next','is-hidden');
      var diff = ((i - activeIndex) % total + total) % total;
      if      (diff === 0)       { card.classList.add('is-active'); card.setAttribute('aria-hidden','false'); }
      else if (diff === 1)       { card.classList.add('is-next');   card.setAttribute('aria-hidden','true'); }
      else if (diff === total-1) { card.classList.add('is-prev');   card.setAttribute('aria-hidden','true'); }
      else                       { card.classList.add('is-hidden'); card.setAttribute('aria-hidden','true'); }
    });
    dotsEl.querySelectorAll('.carousel-dot').forEach(function(d, i) {
      d.classList.toggle('is-active', i === activeIndex);
      d.setAttribute('aria-selected', String(i === activeIndex));
    });
  }

  function goTo(idx) {
    activeIndex = ((idx % CASES.length) + CASES.length) % CASES.length;
    renderPositions();
    resetProgress();
  }
  function next() { goTo(activeIndex + 1); }
  function prev() { goTo(activeIndex - 1); }

  btnNext.addEventListener('click', function() { next(); resetAuto(); });
  btnPrev.addEventListener('click', function() { prev(); resetAuto(); });
  track.addEventListener('click', function(e) {
    var w = e.target.closest('.card-wrap');
    if (w && parseInt(w.dataset.index, 10) !== activeIndex) { goTo(parseInt(w.dataset.index, 10)); resetAuto(); }
  });

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(function() { if (!isHovered) next(); }, INTERVAL);
    startProgress();
  }
  function resetAuto() { clearInterval(autoTimer); resetProgress(); startAuto(); }

  function startProgress() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        progressBar.style.transition = 'width ' + INTERVAL + 'ms linear';
        progressBar.style.width = '100%';
      });
    });
  }
  function resetProgress() { progressBar.style.transition = 'none'; progressBar.style.width = '0%'; }

  viewport.addEventListener('mouseenter', function() {
    isHovered = true;
    var w = getComputedStyle(progressBar).width;
    progressBar.style.transition = 'none'; progressBar.style.width = w;
  });
  viewport.addEventListener('mouseleave', function() { isHovered = false; resetAuto(); });

  viewport.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); resetAuto(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); resetAuto(); }
    if (e.key === 'Home')       { e.preventDefault(); goTo(0); resetAuto(); }
    if (e.key === 'End')        { e.preventDefault(); goTo(CASES.length - 1); resetAuto(); }
  });

  viewport.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchmove',  function(e) { touchDiff = e.touches[0].clientX - touchStartX; }, { passive: true });
  viewport.addEventListener('touchend', function() {
    if (Math.abs(touchDiff) > 50) { touchDiff < 0 ? next() : prev(); resetAuto(); }
    touchDiff = 0;
  });

  document.addEventListener('visibilitychange', function() {
    if (document.hidden) { clearInterval(autoTimer); resetProgress(); } else { resetAuto(); }
  });

  init();
}());
</script>
</body>
</html>
"""

with open('/Users/angel.e.factor/spm_dubai_v2/index.html', 'w', encoding='utf-8') as f:
    f.write(HTML)

print(f"Written {len(HTML)} bytes, {HTML.count(chr(10))} lines")
