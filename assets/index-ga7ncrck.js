(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const z of l.addedNodes)z.tagName==="LINK"&&z.rel==="modulepreload"&&s(z)}).observe(document,{childList:!0,subtree:!0});function a(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=a(i);fetch(i.href,l)}})();const h=document.querySelector("#app");let o="home",L="home",m="Mind",v=!1,T=0;const c=[{id:1,name:"Nagy Petra",className:"12.D",sold:16,issued:20,collected:100800},{id:2,name:"Kiss Marcell",className:"12.B",sold:14,issued:20,collected:75600},{id:3,name:"Tóth Anna",className:"12.A",sold:11,issued:18,collected:56700}],k=[{id:1,school:"Kölcsey Ferenc Gimnázium",contact:"Varga Márk · 12.B",relation:"a saját kódoddal szerződött",code:"BALINT-12D",status:"Szerződött",commission:25e3},{id:2,school:"Szent László Gimnázium",contact:"Kovács Anna · 12.A",relation:"az ajánlói linkedről érkezett",code:"BALINT-12D",status:"Egyeztetés",commission:25e3},{id:3,school:"Veres Pálné Gimnázium",contact:"Szabó Bence · 12.D",relation:"a saját kódoddal regisztrált",code:"BALINT-12D",status:"Bemutatva",commission:25e3}],d=["home","tickets","promoters","affiliates","finance"],r=()=>c.reduce((t,e)=>t+e.sold,0),y=()=>c.reduce((t,e)=>t+e.issued,0),S=()=>c.reduce((t,e)=>t+e.collected,0),n=t=>`${t.toLocaleString("hu-HU")} Ft`;function A(){h.innerHTML=`
    <section class="demo-shell">
      <aside class="demo-copy" aria-label="Demó leírása">
        <p class="eyebrow">INTERAKTÍV MOBILKONCEPCIÓ</p>
        <h1>Iskolai<br />affiliate app</h1>
        <p class="intro">A fő szervező innen követi az osztályok jegyeit, a promótereit, a beszedett pénzt és a saját kódjával érkező sikeres szerződések után járó jutalékot.</p>
        <div class="demo-guide">
          <span class="guide-line"></span>
          <div><b>01</b><p>Nézd meg a jegyelszámolást</p></div>
          <div><b>02</b><p>Kezeld a promótercsapatot</p></div>
          <div><b>03</b><p>Ajánlj másik iskolai összekötőt</p></div>
        </div>
        <div class="desktop-actions">
          <button data-action="restart">DEMÓ ÚJRAINDÍTÁSA</button>
          <span>← → billentyűkkel is léptethető</span>
        </div>
      </aside>

      <div class="phone-stage">
        <div class="iphone" aria-label="Iskolai partner app demó">
          <div class="screen" id="phone-screen">
            <div class="status-bar" aria-hidden="true"><span>9:41</span><span class="status-icons"><i></i><i></i><i></i></span></div>
            <div class="dynamic-island" id="dynamic-island"><span id="island-message"></span></div>
            <div class="view" id="view" aria-live="polite"></div>
            <div class="overlay-layer" id="overlay-layer"></div>
            <nav class="bottom-nav" aria-label="Fő navigáció">
              <button data-route="home"><i class="nav-icon home-icon"></i><span>MENU</span></button>
              <button data-route="tickets"><i class="nav-icon ticket-icon"></i><span>JEGYEK</span></button>
              <button data-route="promoters"><i class="nav-icon people-icon"></i><span>PROMÓTEREK</span></button>
              <button data-route="finance"><i class="nav-icon reward-icon"></i><span>PÉNZEK</span></button>
            </nav>
            <div class="home-indicator" aria-hidden="true"></div>
          </div>
        </div>
        <div class="flow-dots" aria-label="Képernyők">
          ${d.map(t=>`<button data-route="${t}" aria-label="${t}"></button>`).join("")}
        </div>
      </div>
    </section>
  `,p(!1)}function p(t=!0,e="forward"){const a=document.querySelector("#view"),s=()=>{a.innerHTML=N(),E()};t?(a.className=`view changing ${e}`,window.setTimeout(()=>{s(),a.className=`view entering ${e}`,window.setTimeout(()=>{a.className="view"},360)},160)):s(),K()}function N(){return o==="home"?w():o==="tickets"?O():o==="promoters"?I():o==="affiliates"?j():M()}function g(t,e,a="",s=!1,i=!1){return`
    <header class="page-header ${s?"with-back":""}">
      ${s?'<button class="back-button" data-action="back" aria-label="Vissza">‹</button>':""}
      <div><div class="header-line"><p class="kicker">${t}</p>${i?'<span class="crm-badge"><i></i>ONLINE</span>':""}</div><h2>${e}</h2>${a?`<p class="subtitle">${a}</p>`:""}</div>
    </header>
  `}function w(){return`
    <div class="content home-screen">
      ${g("VÁROSMAJORI GIMNÁZIUM · 12.B","SZIA, BÁLINT","Főszervezői áttekintés",!1,!0)}
      <article class="hero-stat">
        <span>ELADOTT JEGY</span>
        <strong>${r()} <small>/ 90</small></strong>
        <div class="progress"><i style="width:${Math.round(r()/90*100)}%"></i></div>
        <p>${n(S())} beszedve</p>
      </article>
      <div class="stats-grid">
        <article><span>PROMÓTER</span><strong>${c.length} fő</strong><small>aktív csapat</small></article>
        <article><span>JÓVÁÍRT JUTALÉK</span><strong>${n(k.filter(t=>t.status==="Szerződött").reduce((t,e)=>t+e.commission,0))}</strong><small>1 sikeres szerződés</small></article>
      </div>
      <p class="section-label">GYORS MŰVELETEK</p>
      <div class="quick-actions">
        <button data-route="tickets"><b>Jegyelszámolás</b><span>${y()-r()} kiadott jegy még nyitott</span><i>›</i></button>
        <button data-route="promoters"><b>Promóterek kezelése</b><span>Eladás és pénzbeszedés személyenként</span><i>›</i></button>
        <button data-route="affiliates"><b>Másik iskola ajánlása</b><span>Saját link vagy kód · 25 000 Ft/szerződés</span><i>›</i></button>
      </div>
    </div>
  `}function O(){const t=r()*6300;return`
    <div class="content tickets-screen">
      ${g("JEGYEK ÉS BESZEDÉS","JEGYELSZÁMOLÁS","Promóterenkénti értékesítés és pénzügyi állapot.",!1,!0)}
      <article class="ticket-total">
        <div><span>ELADVA</span><strong>${r()} db</strong></div>
        <div><span>FORGALOM</span><strong>${n(t)}</strong></div>
        <div class="progress wide"><i style="width:${Math.round(r()/y()*100)}%"></i></div>
        <small>${r()} eladva · ${y()-r()} jegy a promótereknél</small>
      </article>
      <div class="money-row"><span><small>BESZEDVE</small><b>${n(S())}</b></span><span><small>MÉG BESZEDENDŐ</small><b>${n(t-S())}</b></span></div>
      <p class="section-label">PROMÓTERI TELJESÍTMÉNY</p>
      <div class="compact-list">
        ${c.map(e=>`<button data-route="promoters"><span><b>${e.name} · ${e.className}</b><small>${e.sold}/${e.issued} jegy</small></span><strong>${n(e.collected)}</strong></button>`).join("")}
      </div>
      <button class="primary full-width crm-action" data-action="sync">NAPI ZÁRÁS KÜLDÉSE</button>
    </div>
  `}function I(){const t=c.filter(e=>m==="Mind"||(m==="Elszámolt"?e.collected>=e.sold*6300:e.collected<e.sold*6300));return`
    <div class="content promoters-screen">
      ${g("CSAPAT","PROMÓTEREK",`${c.length} aktív promóter · ${r()} eladott jegy`,!1,!0)}
      <div class="filter-row">
        ${["Mind","Nyitott","Elszámolt"].map(e=>`<button class="chip ${m===e?"active":""}" data-filter="${e}">${e.toUpperCase()}</button>`).join("")}
      </div>
      <div class="promoter-list">
        ${t.map(e=>{const a=Math.round(e.sold/e.issued*100);return`<article class="promoter-card"><div class="avatar">${e.name.split(" ").map(s=>s[0]).join("")}</div><div class="promoter-main"><div><b>${e.name} · ${e.className}</b><span>${a}%</span></div><small>${e.sold} eladott · ${e.issued-e.sold} nála · ${n(e.collected)}</small><div class="mini-progress"><i style="width:${a}%"></i></div></div><button data-action="promoter-more" data-id="${e.id}" aria-label="${e.name} részletei">•••</button></article>`}).join("")||'<p class="empty-state">Nincs ilyen promóter.</p>'}
      </div>
      <button class="primary full-width add-button" data-action="add-promoter">+ PROMÓTER HOZZÁADÁSA</button>
    </div>
  `}function j(){return`
    <div class="content affiliates-screen">
      ${g("PARTNERAJÁNLÁS","MÁS ISKOLÁK","Oszd meg a saját linkedet vagy kódodat egy másik iskola leendő főszervezőjével.",!0,!0)}
      <article class="referral-code"><span>SAJÁT AJÁNLÓI KÓD</span><div><strong>BALINT-12D</strong><button data-action="copy-code">MÁSOLÁS</button></div><small>Ha ezzel a kóddal vagy linkkel szerződnek, 25 000 Ft jutalék jár.</small></article>
      <article class="affiliate-explainer"><b>A SZERZŐDÉS UTÁN JÁR A JUTALÉK</b><p>A regisztráció és az egyeztetés még csak várható tétel. A 25 000 Ft akkor kerül jóváírásra, amikor a másik főszervező szerződése sikeres.</p></article>
      <div class="affiliate-list">
        ${k.map(t=>`<article><span><b>${t.school}</b><small>${t.contact}<br />${t.relation}</small></span><div><em class="status status-${D(t.status)}">${t.status.toUpperCase()}</em><strong>${t.status==="Szerződött"?n(t.commission):`várható ${n(t.commission)}`}</strong></div></article>`).join("")}
      </div>
      <button class="primary full-width add-button" data-action="add-affiliate">+ ÚJ ISKOLA AJÁNLÁSA</button>
    </div>
  `}function M(){const t=k.filter(s=>s.status==="Szerződött").reduce((s,i)=>s+i.commission,0),e=12e3,a=t+e;return`
    <div class="content finance-screen">
      ${g("ELSZÁMOLÁS","PÉNZEK ÉS JUTALÉK","Jegybevétel, szervezői jutalom és partnerajánlások.",!1,!0)}
      <article class="reward-total"><span>VÁRHATÓ KIFIZETÉS</span><strong>${n(a)}</strong><small>A szervezői és affiliate tételek alapján</small></article>
      <p class="section-label">TÉTELEK</p>
      <div class="reward-list">
        <div><span><b>Főszervezői jutalom</b><small>${r()} eladott jegy után</small></span><strong>${n(e)}</strong></div>
        <button data-route="affiliates"><span><b>Partnerajánlási jutalék</b><small>1 szerződött · kód: BALINT-12D</small></span><strong>${n(t)}</strong></button>
      </div>
      <article class="condition-card"><span>KIFIZETÉS FELTÉTELE</span><p>Jegyelszámolás lezárva és a partneriskola szerződése visszaigazolva.</p></article>
      <button class="secondary full-width details-toggle" data-action="finance-details">KIFIZETÉSI ADATOK ${v?"−":"+"}</button>
      ${v?'<div class="payout-details"><div><span>Következő elszámolás</span><b>szept. 10.</b></div><div><span>Kifizetési mód</span><b>banki átutalás</b></div><div><span>CRM állapot</span><b>szinkronizálva</b></div></div>':""}
    </div>
  `}function D(t){return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}function f(t,e){if(t===o)return;L=o;const a=d.indexOf(t)>=d.indexOf(o)?"forward":"back";o=t,p(!0,e??a)}function K(){document.querySelectorAll("[data-route]").forEach(t=>{const e=t.dataset.route,a=o==="affiliates"?"finance":o;t.classList.toggle("active",e===a)})}function u(t){const e=document.querySelector("#dynamic-island"),a=document.querySelector("#island-message");a.textContent=t,e.classList.add("expanded"),window.setTimeout(()=>e.classList.remove("expanded"),1750)}function $(t){const e=document.querySelector("#overlay-layer");e.innerHTML=`<button class="scrim" data-action="close-sheet" aria-label="Bezárás"></button><section class="bottom-sheet" role="dialog" aria-modal="true"><div class="sheet-handle"></div>${t}</section>`,requestAnimationFrame(()=>e.classList.add("open"))}function b(){const t=document.querySelector("#overlay-layer");t.classList.remove("open"),window.setTimeout(()=>{t.innerHTML=""},260)}function R(){$('<p class="kicker">ÚJ PROMÓTER</p><h3>Csapattag hozzáadása</h3><form id="promoter-form"><label>NÉV<input name="name" required placeholder="Promóter neve" /></label><label>OSZTÁLY<input name="className" required placeholder="pl. 12.D" /></label><label>KIADOTT JEGY<input name="issued" required type="number" value="10" min="1" max="30" /></label><button class="primary full-width" type="submit">HOZZÁADÁS ÉS SZINKRON</button></form>'),E()}function P(){$('<p class="kicker">ÚJ ISKOLA AJÁNLÁSA</p><h3>Ajánlói link küldése</h3><p class="sheet-copy">A leendő főszervező a BALINT-12D kóddal regisztrál. Sikeres szerződés után 25 000 Ft jár.</p><form id="affiliate-form"><label>ISKOLA<input name="school" required placeholder="Iskola neve" /></label><label>OTTANI ÖSSZEKÖTŐ ÉS OSZTÁLY<input name="contact" required placeholder="pl. Kiss Dániel · 12.B" /></label><label>KAPCSOLAT<input name="relation" required placeholder="pl. évfolyamtárs ismerőse" /></label><button class="primary full-width" type="submit">AJÁNLÓI LINK KÜLDÉSE</button></form>'),E()}function Z(t){const e=c.find(a=>a.id===t);e&&$(`<p class="kicker">PROMÓTERI ELSZÁMOLÁS</p><h3>${e.name} · ${e.className}</h3><div class="sheet-stats"><div><span>Eladott jegy</span><b>${e.sold} db</b></div><div><span>Nála lévő jegy</span><b>${e.issued-e.sold} db</b></div><div><span>Beszedett pénz</span><b>${n(e.collected)}</b></div></div><button class="primary full-width" data-action="settle" data-id="${t}">ELSZÁMOLÁS RÖGZÍTÉSE</button>`)}function E(){document.querySelector("#promoter-form")?.addEventListener("submit",t=>{t.preventDefault();const e=new FormData(t.currentTarget);c.push({id:Date.now(),name:String(e.get("name")),className:String(e.get("className")),issued:Number(e.get("issued")),sold:0,collected:0}),b(),window.setTimeout(()=>{p(!1),u("Promóter mentve")},280)}),document.querySelector("#affiliate-form")?.addEventListener("submit",t=>{t.preventDefault();const e=new FormData(t.currentTarget);k.unshift({id:Date.now(),school:String(e.get("school")),contact:String(e.get("contact")),relation:String(e.get("relation")),code:"BALINT-12D",status:"Bemutatva",commission:25e3}),b(),window.setTimeout(()=>{p(!1),u("Ajánlás elküldve")},280)})}h.addEventListener("click",async t=>{const e=t.target.closest("button, [data-route]");if(!e)return;const a=e.dataset.route;if(a){f(a);return}const s=e.dataset.action;if(s==="restart"&&(m="Mind",v=!1,f("home","back"),u("Demó újraindítva")),s==="back"&&f(L,"back"),s==="sync"&&u("Napi zárás sikeresen elküldve"),s==="copy-code")try{await navigator.clipboard.writeText("BALINT-12D"),u("Ajánlói kód másolva")}catch{u("Kód: BALINT-12D")}s==="add-promoter"&&R(),s==="add-affiliate"&&P(),s==="promoter-more"&&Z(Number(e.dataset.id)),s==="settle"&&(b(),window.setTimeout(()=>u("Elszámolás sikeresen mentve"),280)),s==="close-sheet"&&b(),s==="finance-details"&&(v=!v,p(!1));const i=e.dataset.filter;i&&(m=i,p(!1))});document.addEventListener("keydown",t=>{if(t.key==="Escape"&&b(),t.key!=="ArrowLeft"&&t.key!=="ArrowRight")return;const e=d.indexOf(o),a=t.key==="ArrowRight"?1:-1;f(d[Math.max(0,Math.min(d.length-1,e+a))],a>0?"forward":"back")});h.addEventListener("touchstart",t=>{T=t.changedTouches[0].clientX},{passive:!0});h.addEventListener("touchend",t=>{const e=t.changedTouches[0].clientX-T;if(Math.abs(e)<70)return;const a=d.indexOf(o),s=e<0?a+1:a-1;s>=0&&s<d.length&&f(d[s],e<0?"forward":"back")},{passive:!0});A();
