import './styles.css'

type Route = 'home' | 'tickets' | 'promoters' | 'affiliates' | 'finance'
type ContractStatus = 'Bemutatva' | 'Egyeztetés' | 'Szerződött'

interface Promoter {
  id: number
  name: string
  sold: number
  issued: number
  collected: number
}

interface Affiliate {
  id: number
  school: string
  contact: string
  relation: string
  status: ContractStatus
  commission: number
}

const app = document.querySelector<HTMLElement>('#app')!

let route: Route = 'home'
let previousRoute: Route = 'home'
let promoterFilter: 'Mind' | 'Elszámolt' | 'Nyitott' = 'Mind'
let financeDetailsOpen = false
let touchStartX = 0

const promoters: Promoter[] = [
  { id: 1, name: 'Nagy Petra', sold: 74, issued: 90, collected: 430000 },
  { id: 2, name: 'Kiss Marcell', sold: 61, issued: 80, collected: 340000 },
  { id: 3, name: 'Tóth Anna', sold: 53, issued: 70, collected: 333900 },
  { id: 4, name: 'Farkas Máté', sold: 48, issued: 80, collected: 260000 },
]

const affiliates: Affiliate[] = [
  { id: 1, school: 'Kölcsey Ferenc Gimnázium', contact: 'Márk', relation: 'évfolyamtárs ismerőse', status: 'Szerződött', commission: 60000 },
  { id: 2, school: 'Szent László Gimnázium', contact: 'Anna', relation: 'baráti ajánlás', status: 'Egyeztetés', commission: 40000 },
  { id: 3, school: 'Veres Pálné Gimnázium', contact: 'Bence', relation: 'másik iskola szervezője', status: 'Bemutatva', commission: 0 },
]

const routeOrder: Route[] = ['home', 'tickets', 'promoters', 'affiliates', 'finance']
const soldTickets = () => promoters.reduce((sum, item) => sum + item.sold, 0)
const issuedTickets = () => promoters.reduce((sum, item) => sum + item.issued, 0)
const collectedRevenue = () => promoters.reduce((sum, item) => sum + item.collected, 0)
const formatMoney = (value: number) => `${value.toLocaleString('hu-HU')} Ft`

function shell() {
  app.innerHTML = `
    <section class="demo-shell">
      <aside class="demo-copy" aria-label="Demó leírása">
        <p class="eyebrow">INTERAKTÍV MOBILKONCEPCIÓ</p>
        <h1>Iskolai<br />affiliate app</h1>
        <p class="intro">A fő szervező innen követi a jegyeket, a promótereit, a beszedett pénzt és a más iskolák sikeres szerződései után járó jutalékot.</p>
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
              <button data-route="home"><i class="nav-icon home-icon"></i><span>KEZDŐ</span></button>
              <button data-route="tickets"><i class="nav-icon ticket-icon"></i><span>JEGYEK</span></button>
              <button data-route="promoters"><i class="nav-icon people-icon"></i><span>PROMÓTEREK</span></button>
              <button data-route="finance"><i class="nav-icon reward-icon"></i><span>PÉNZEK</span></button>
            </nav>
            <div class="home-indicator" aria-hidden="true"></div>
          </div>
        </div>
        <div class="flow-dots" aria-label="Képernyők">
          ${routeOrder.map((item) => `<button data-route="${item}" aria-label="${item}"></button>`).join('')}
        </div>
      </div>
    </section>
  `
  render(false)
}

function render(animate = true, direction: 'forward' | 'back' = 'forward') {
  const view = document.querySelector<HTMLElement>('#view')!
  const inject = () => {
    view.innerHTML = screenTemplate()
    bindForms()
  }
  if (animate) {
    view.className = `view changing ${direction}`
    window.setTimeout(() => {
      inject()
      view.className = `view entering ${direction}`
      window.setTimeout(() => { view.className = 'view' }, 360)
    }, 160)
  } else {
    inject()
  }
  updateChrome()
}

function screenTemplate() {
  if (route === 'home') return homeScreen()
  if (route === 'tickets') return ticketsScreen()
  if (route === 'promoters') return promotersScreen()
  if (route === 'affiliates') return affiliatesScreen()
  return financeScreen()
}

function pageHeader(kicker: string, title: string, subtitle = '', back = false, crm = false) {
  return `
    <header class="page-header ${back ? 'with-back' : ''}">
      ${back ? '<button class="back-button" data-action="back" aria-label="Vissza">‹</button>' : ''}
      <div><div class="header-line"><p class="kicker">${kicker}</p>${crm ? '<span class="crm-badge"><i></i>CRM ONLINE</span>' : ''}</div><h2>${title}</h2>${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}</div>
    </header>
  `
}

function homeScreen() {
  return `
    <div class="content home-screen">
      ${pageHeader('BÉKÁSMEGYERI GIMNÁZIUM', 'SZIA, BÁLINT', 'Főszervezői áttekintés', false, true)}
      <article class="hero-stat">
        <span>ELADOTT JEGY</span>
        <strong>${soldTickets()} <small>/ 320</small></strong>
        <div class="progress"><i style="width:${Math.round(soldTickets() / 320 * 100)}%"></i></div>
        <p>${formatMoney(collectedRevenue())} beszedve</p>
      </article>
      <div class="stats-grid">
        <article><span>PROMÓTER</span><strong>${promoters.length} fő</strong><small>aktív csapat</small></article>
        <article><span>JUTALÉK</span><strong>${formatMoney(affiliates.reduce((sum, item) => sum + item.commission, 0))}</strong><small>más iskolákból</small></article>
      </div>
      <p class="section-label">GYORS MŰVELETEK</p>
      <div class="quick-actions">
        <button data-route="tickets"><b>Jegyelszámolás</b><span>${issuedTickets() - soldTickets()} kiadott jegy még nyitott</span><i>›</i></button>
        <button data-route="promoters"><b>Promóterek kezelése</b><span>Eladás és pénzbeszedés személyenként</span><i>›</i></button>
        <button data-route="affiliates"><b>Másik iskola ajánlása</b><span>Jutalék sikeres szerződés után</span><i>›</i></button>
      </div>
    </div>
  `
}

function ticketsScreen() {
  const gross = soldTickets() * 6300
  return `
    <div class="content tickets-screen">
      ${pageHeader('JEGYEK ÉS BESZEDÉS', 'JEGYELSZÁMOLÁS', 'Promóterenkénti értékesítés és pénzügyi állapot.', false, true)}
      <article class="ticket-total">
        <div><span>ELADVA</span><strong>${soldTickets()} db</strong></div>
        <div><span>FORGALOM</span><strong>${formatMoney(gross)}</strong></div>
        <div class="progress wide"><i style="width:${Math.round(soldTickets() / issuedTickets() * 100)}%"></i></div>
        <small>${soldTickets()} eladva · ${issuedTickets() - soldTickets()} jegy a promótereknél</small>
      </article>
      <div class="money-row"><span><small>BESZEDVE</small><b>${formatMoney(collectedRevenue())}</b></span><span><small>MÉG BESZEDENDŐ</small><b>${formatMoney(gross - collectedRevenue())}</b></span></div>
      <p class="section-label">PROMÓTERI TELJESÍTMÉNY</p>
      <div class="compact-list">
        ${promoters.map((item) => `<button data-route="promoters"><span><b>${item.name}</b><small>${item.sold}/${item.issued} jegy</small></span><strong>${formatMoney(item.collected)}</strong></button>`).join('')}
      </div>
      <button class="primary full-width crm-action" data-action="sync">NAPI ZÁRÁS KÜLDÉSE A CRM-BE</button>
    </div>
  `
}

function promotersScreen() {
  const visible = promoters.filter((item) => promoterFilter === 'Mind' || (promoterFilter === 'Elszámolt' ? item.collected >= item.sold * 6300 : item.collected < item.sold * 6300))
  return `
    <div class="content promoters-screen">
      ${pageHeader('CSAPAT', 'PROMÓTEREK', `${promoters.length} aktív promóter · ${soldTickets()} eladott jegy`, false, true)}
      <div class="filter-row">
        ${(['Mind', 'Nyitott', 'Elszámolt'] as const).map((filter) => `<button class="chip ${promoterFilter === filter ? 'active' : ''}" data-filter="${filter}">${filter.toUpperCase()}</button>`).join('')}
      </div>
      <div class="promoter-list">
        ${visible.map((item) => {
          const percent = Math.round(item.sold / item.issued * 100)
          return `<article class="promoter-card"><div class="avatar">${item.name.split(' ').map((part) => part[0]).join('')}</div><div class="promoter-main"><div><b>${item.name}</b><span>${percent}%</span></div><small>${item.sold} eladott · ${item.issued - item.sold} nála · ${formatMoney(item.collected)}</small><div class="mini-progress"><i style="width:${percent}%"></i></div></div><button data-action="promoter-more" data-id="${item.id}" aria-label="${item.name} részletei">•••</button></article>`
        }).join('') || '<p class="empty-state">Nincs ilyen promóter.</p>'}
      </div>
      <button class="primary full-width add-button" data-action="add-promoter">+ PROMÓTER HOZZÁADÁSA</button>
    </div>
  `
}

function affiliatesScreen() {
  return `
    <div class="content affiliates-screen">
      ${pageHeader('PARTNERAJÁNLÁS', 'MÁS ISKOLÁK', 'Ajánlj egy ottani összekötőt. Jutalék akkor jár, ha az iskola sikeresen szerződik velünk.', true, true)}
      <article class="affiliate-explainer"><b>SIKERES SZERZŐDÉS = JUTALÉK</b><p>Te adod az első bemutatást, a céges csapat viszi tovább az egyeztetést. Az állapot és a várható jutalék itt követhető.</p></article>
      <div class="affiliate-list">
        ${affiliates.map((item) => `<article><span><b>${item.school}</b><small>${item.contact} · ${item.relation}</small></span><div><em class="status status-${slug(item.status)}">${item.status.toUpperCase()}</em><strong>${item.commission ? formatMoney(item.commission) : '—'}</strong></div></article>`).join('')}
      </div>
      <button class="primary full-width add-button" data-action="add-affiliate">+ ÚJ ISKOLA AJÁNLÁSA</button>
    </div>
  `
}

function financeScreen() {
  const affiliateCommission = affiliates.reduce((sum, item) => sum + item.commission, 0)
  const organizerReward = Math.round(collectedRevenue() * .04)
  const total = affiliateCommission + organizerReward
  return `
    <div class="content finance-screen">
      ${pageHeader('ELSZÁMOLÁS', 'PÉNZEK ÉS JUTALÉK', 'Jegybevétel, szervezői jutalom és partnerajánlások.', false, true)}
      <article class="reward-total"><span>VÁRHATÓ KIFIZETÉS</span><strong>${formatMoney(total)}</strong><small>A szervezői és affiliate tételek alapján</small></article>
      <p class="section-label">TÉTELEK</p>
      <div class="reward-list">
        <div><span><b>Szervezői jutalom</b><small>${soldTickets()} jegy után</small></span><strong>${formatMoney(organizerReward)}</strong></div>
        <button data-route="affiliates"><span><b>Más iskolák jutaléka</b><small>1 szerződött · 1 egyeztetés</small></span><strong>${formatMoney(affiliateCommission)}</strong></button>
      </div>
      <article class="condition-card"><span>KIFIZETÉS FELTÉTELE</span><p>Jegyelszámolás lezárva és a partneriskola szerződése CRM-ben visszaigazolva.</p></article>
      <button class="secondary full-width details-toggle" data-action="finance-details">KIFIZETÉSI ADATOK ${financeDetailsOpen ? '−' : '+'}</button>
      ${financeDetailsOpen ? '<div class="payout-details"><div><span>Következő elszámolás</span><b>szept. 10.</b></div><div><span>Kifizetési mód</span><b>banki átutalás</b></div><div><span>CRM állapot</span><b>szinkronizálva</b></div></div>' : ''}
    </div>
  `
}

function slug(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function go(next: Route, direction?: 'forward' | 'back') {
  if (next === route) return
  previousRoute = route
  const inferred = routeOrder.indexOf(next) >= routeOrder.indexOf(route) ? 'forward' : 'back'
  route = next
  render(true, direction ?? inferred)
}

function updateChrome() {
  document.querySelectorAll<HTMLElement>('[data-route]').forEach((button) => {
    const target = button.dataset.route as Route
    const navRoute = route === 'affiliates' ? 'finance' : route
    button.classList.toggle('active', target === navRoute)
  })
}

function announce(message: string) {
  const island = document.querySelector<HTMLElement>('#dynamic-island')!
  const label = document.querySelector<HTMLElement>('#island-message')!
  label.textContent = message
  island.classList.add('expanded')
  window.setTimeout(() => island.classList.remove('expanded'), 1750)
}

function openSheet(content: string) {
  const layer = document.querySelector<HTMLElement>('#overlay-layer')!
  layer.innerHTML = `<button class="scrim" data-action="close-sheet" aria-label="Bezárás"></button><section class="bottom-sheet" role="dialog" aria-modal="true"><div class="sheet-handle"></div>${content}</section>`
  requestAnimationFrame(() => layer.classList.add('open'))
}

function closeSheet() {
  const layer = document.querySelector<HTMLElement>('#overlay-layer')!
  layer.classList.remove('open')
  window.setTimeout(() => { layer.innerHTML = '' }, 260)
}

function addPromoterSheet() {
  openSheet(`<p class="kicker">ÚJ PROMÓTER</p><h3>Csapattag hozzáadása</h3><form id="promoter-form"><label>NÉV<input name="name" required placeholder="Promóter neve" /></label><label>KIADOTT JEGY<input name="issued" required type="number" value="40" min="1" /></label><button class="primary full-width" type="submit">HOZZÁADÁS ÉS CRM-SZINKRON</button></form>`)
  bindForms()
}

function addAffiliateSheet() {
  openSheet(`<p class="kicker">ÚJ ISKOLA AJÁNLÁSA</p><h3>Első bemutatás rögzítése</h3><form id="affiliate-form"><label>ISKOLA<input name="school" required placeholder="Iskola neve" /></label><label>OTTANI ÖSSZEKÖTŐ<input name="contact" required placeholder="Név" /></label><label>KAPCSOLAT<input name="relation" required placeholder="pl. évfolyamtárs ismerőse" /></label><button class="primary full-width" type="submit">AJÁNLÁS KÜLDÉSE</button></form>`)
  bindForms()
}

function promoterDetails(id: number) {
  const item = promoters.find((promoter) => promoter.id === id)
  if (!item) return
  openSheet(`<p class="kicker">PROMÓTERI ELSZÁMOLÁS</p><h3>${item.name}</h3><div class="sheet-stats"><div><span>Eladott jegy</span><b>${item.sold} db</b></div><div><span>Nála lévő jegy</span><b>${item.issued - item.sold} db</b></div><div><span>Beszedett pénz</span><b>${formatMoney(item.collected)}</b></div></div><button class="primary full-width" data-action="settle" data-id="${id}">ELSZÁMOLÁS RÖGZÍTÉSE</button>`)
}

function bindForms() {
  document.querySelector<HTMLFormElement>('#promoter-form')?.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)
    promoters.push({ id: Date.now(), name: String(data.get('name')), issued: Number(data.get('issued')), sold: 0, collected: 0 })
    closeSheet()
    window.setTimeout(() => { render(false); announce('Promóter CRM-be mentve') }, 280)
  })
  document.querySelector<HTMLFormElement>('#affiliate-form')?.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)
    affiliates.unshift({ id: Date.now(), school: String(data.get('school')), contact: String(data.get('contact')), relation: String(data.get('relation')), status: 'Bemutatva', commission: 0 })
    closeSheet()
    window.setTimeout(() => { render(false); announce('Ajánlás CRM-be küldve') }, 280)
  })
}

app.addEventListener('click', async (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('button, [data-route]')
  if (!target) return
  const targetRoute = target.dataset.route as Route | undefined
  if (targetRoute) { go(targetRoute); return }
  const action = target.dataset.action
  if (action === 'restart') { promoterFilter = 'Mind'; financeDetailsOpen = false; go('home', 'back'); announce('Demó újraindítva') }
  if (action === 'back') go(previousRoute, 'back')
  if (action === 'sync') announce('Napi zárás CRM-be küldve')
  if (action === 'add-promoter') addPromoterSheet()
  if (action === 'add-affiliate') addAffiliateSheet()
  if (action === 'promoter-more') promoterDetails(Number(target.dataset.id))
  if (action === 'settle') { closeSheet(); window.setTimeout(() => announce('Elszámolás CRM-be mentve'), 280) }
  if (action === 'close-sheet') closeSheet()
  if (action === 'finance-details') { financeDetailsOpen = !financeDetailsOpen; render(false) }
  const filter = target.dataset.filter as typeof promoterFilter | undefined
  if (filter) { promoterFilter = filter; render(false) }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeSheet()
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  const index = routeOrder.indexOf(route)
  const delta = event.key === 'ArrowRight' ? 1 : -1
  go(routeOrder[Math.max(0, Math.min(routeOrder.length - 1, index + delta))], delta > 0 ? 'forward' : 'back')
})

app.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX }, { passive: true })
app.addEventListener('touchend', (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX
  if (Math.abs(delta) < 70) return
  const index = routeOrder.indexOf(route)
  const nextIndex = delta < 0 ? index + 1 : index - 1
  if (nextIndex >= 0 && nextIndex < routeOrder.length) go(routeOrder[nextIndex], delta < 0 ? 'forward' : 'back')
}, { passive: true })

shell()
