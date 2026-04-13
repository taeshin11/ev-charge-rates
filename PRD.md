# EVChargeRates — PRD
## Project 23: EV Charging Prices and Speeds Dashboard

---

## Overview

EVChargeRates is a free, SEO-first reference tool that helps EV drivers compare charging network prices, speeds, connector types, and station availability across the United States. It aggregates public DOE/AFDC station data with manually-researched static pricing JSON to produce comprehensive network, state, and vehicle pages optimized for organic search.

**Primary Value Proposition:** The definitive free guide to EV charging costs — know exactly what you'll pay before you plug in, on any network, in any state, for your specific vehicle.

---

## Target Users

- Current EV owners planning road trips or daily charging routines
- Prospective EV buyers researching total ownership cost
- Fleets evaluating EV adoption and charging costs
- Researchers, journalists, and auto industry analysts

---

## Core Features

1. **Network Price Pages** — Per-network pricing by tier, connector type, and state
2. **State Pages** — Charging station density, pricing averages, network coverage by state
3. **Vehicle Pages** — Per-vehicle charging speed (kW acceptance), estimated cost per full charge
4. **Compare Tool** — Side-by-side network comparison
5. **Cost Calculator** — "How much does a full charge cost for my car on X network?"
6. **Station Map** — AFDC data embedded map (iframe or Mapbox free tier)
7. **Speed Chart** — Charging speed by vehicle and connector type
8. **Price Trend Tracker** — Static-updated pricing history for major networks

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG for most pages, fast static |
| Styling | Tailwind CSS v3 | Mobile-first |
| Charts | Chart.js + react-chartjs-2 | Free, lightweight |
| Language | TypeScript | Type safety |
| Hosting | Vercel (free tier) | Free SSG |
| Maps | AFDC Station Locator iframe embed | Fully free, DOE-maintained |
| i18n | next-i18next | 8-language support |

---

## Data Sources (All Free)

| Source | Data | Access |
|---|---|---|
| AFDC / DOE Alternative Fuels Station API | Station locations, connector types, access type | `https://developer.nrel.gov/api/alt-fuel-stations/v1.json` (free key via nrel.gov) |
| Static JSON (repo) | Tesla Supercharger pricing | Manually sourced from tesla.com/support/supercharging |
| Static JSON (repo) | ChargePoint pricing | Manually sourced from chargepoint.com |
| Static JSON (repo) | EVgo pricing | Manually sourced from evgo.com |
| Static JSON (repo) | Electrify America pricing | Manually sourced from electrifyamerica.com |
| Static JSON (repo) | Blink, Shell Recharge, etc. | Manually sourced from respective sites |
| Static JSON (repo) | Vehicle charging specs (kW, battery kWh) | DoE fueleconomy.gov public data |
| EIA electricity prices | State average electricity cost (for home charging) | `https://www.eia.gov/electricity/data/browser/` (public CSV) |

**All pricing JSON maintained in `data/networks/` and updated manually on major pricing changes.**

---

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://ev-charge-rates.vercel.app
NEXT_PUBLIC_NREL_API_KEY=your_free_nrel_key
GOOGLE_SHEETS_WEBHOOK_URL=your_apps_script_url
```

---

## Static Data Schemas

### `data/networks/tesla.json` (example)
```json
{
  "id": "tesla",
  "name": "Tesla Supercharger",
  "logo": "/images/networks/tesla.svg",
  "website": "https://www.tesla.com/supercharging",
  "connector_types": ["CCS", "NACS"],
  "membership_required": false,
  "pricing": {
    "per_kwh": { "default": 0.25, "idle_fee_per_min": 0.50 },
    "notes": "Prices vary by location; idle fees apply after session ends if lot >50% full",
    "last_updated": "2025-03-01"
  },
  "max_power_kw": 250,
  "network_size_us": 2200
}
```

### `data/vehicles/[make-model].json` (example)
```json
{
  "slug": "tesla-model-3-long-range",
  "make": "Tesla",
  "model": "Model 3 Long Range",
  "year": 2024,
  "battery_kwh": 82,
  "usable_kwh": 78,
  "max_ac_kw": 11.5,
  "max_dc_kw": 250,
  "connector": "NACS",
  "epa_range_mi": 358,
  "efficiency_kwh_per_100mi": 23
}
```

---

## Page Structure

### `/` — Home Dashboard
- Hero: "Find the cheapest EV charging near you" + state selector
- Network overview cards: logo, avg price/kWh, station count, max speed
- "Cost of a full charge" comparison table (top 5 networks × top 10 vehicles)
- State map: color-coded by avg charging price
- CTA: "Compare networks" → `/compare/[a]-vs-[b]`
- FAQ accordion: common EV charging questions
- Schema.org: `WebSite`, `FAQPage`, `Dataset`

### `/networks/[slug]`
- e.g., `/networks/tesla-supercharger`
- Network profile: logo, overview, pricing breakdown
- Pricing table: per-kWh rates by state (where variable), idle fees, membership benefits
- Connector types supported
- Station count by state (bar chart)
- Compatible vehicles list
- "How to use [Network]" step-by-step (static content)
- Schema.org: `Organization`, `LocalBusiness`, `PriceSpecification`
- Static SSG, rebuilt on data update

### `/states/[state]`
- e.g., `/states/california`
- State-level stats: station count, network breakdown pie chart, avg price
- List of networks present in state with station counts
- State average home electricity rate (for comparison)
- Top charging corridors (static content)
- Schema.org: `Place`, `Dataset`

### `/vehicles/[make-model]`
- e.g., `/vehicles/tesla-model-3-long-range`
- Vehicle profile: specs, connector type, max charging speed
- "Cost to fully charge on each network" table
- Time to charge from 20% to 80% on each network (minutes)
- Charging cost per mile (vs home charging at state avg electricity rate)
- Compatible networks
- Schema.org: `Product`, `Vehicle`

### `/compare/[a]-vs-[b]`
- e.g., `/compare/tesla-supercharger-vs-electrify-america`
- Side-by-side network comparison: price, speed, connector, station count
- "Winner" badge per category
- SEO title: "Tesla Supercharger vs Electrify America: Price & Speed Comparison (2025)"
- Schema.org: `ItemList`

### `/calculator`
- Inputs: vehicle selector, network selector, state (for price variable networks), battery % start/end
- Output: estimated cost ($), estimated time (minutes), cost per mile
- "Compare all networks for my car" quick comparison table
- URL params encode vehicle + network for shareable results
- Schema.org: `WebApplication`

### `/blog/[slug]` — SEO content
- Seed articles: "Cheapest EV charging networks 2025", "Tesla Supercharger vs Electrify America", "Best EV for road trips"
- Schema.org: `Article`

### `/sitemap.xml`, `/robots.txt`

---

## UI/UX Design

### Color Palette (Soft Pastel)
```
Background:     #F0FBF7  (soft mint/green — EV/eco vibe)
Surface:        #FFFFFF
Surface-alt:    #F0F8FF  (light sky blue for alternates)
Primary:        #2E9E72  (eco green)
Accent-blue:    #4A90D9  (electric blue)
Accent-yellow:  #F5C842  (energy/speed)
Text-primary:   #1A2E25
Text-muted:     #6B7280
Border:         #D1FAE5
```

### Layout
- Mobile-first, sticky header with network logo strip scrolling
- Homepage: hero + cards grid (2-col mobile, 4-col desktop)
- Network/vehicle pages: stats at top, table in middle, related content below
- Footer: visitor counter, disclaimer, links

### Key Components
- `NetworkCard` — logo, price/kWh, max kW, station count, link
- `ChargingCostTable` — vehicle × network cost matrix
- `SpeedComparison` — horizontal bar chart of charging speeds (kW)
- `StateMap` — color-coded SVG US map by avg price
- `CostCalculator` — interactive, live output
- `ConnectorBadge` — CCS / NACS / CHAdeMO / J1772 color badges
- `PricePerKwhBadge` — color-coded (green = cheap, red = expensive)
- `AdSlot` — Adsterra placeholders

### Adsterra Ad Placeholders
```html
<!-- Social Bar -->
<div id="adsterra-social-bar" data-ad="social-bar" class="adsterra-social-bar"></div>

<!-- Native Banner (between network overview and table) -->
<div id="adsterra-native" data-ad="native-banner" class="my-8 adsterra-native"></div>

<!-- Display Banner -->
<div id="adsterra-banner" data-ad="display-banner" class="adsterra-banner"></div>
```

---

## i18n (Internationalization)

**Languages:** en (default), ko, ja, zh, es, fr, de, pt

- `next-i18next` with locale routing
- URL: `/` (en), `/ko/`, `/ja/`, `/zh/`, `/es/`, `/fr/`, `/de/`, `/pt/`
- Network/vehicle slugs remain in English
- `hreflang` on all pages
- Translation files: `public/locales/[lang]/common.json`, `networks.json`, `calculator.json`, `seo.json`

---

## Google Sheets Webhook

**Events logged:**
- Network page view (network slug, state, referrer)
- Vehicle page view (vehicle slug)
- Calculator used (vehicle, network, result cost)
- Compare tool used (network pair)
- State page view

```typescript
// lib/webhook.ts
export async function logEvent(event: {
  type: string;
  data: Record<string, unknown>;
}) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...event, ts: new Date().toISOString(), project: 'ev-charge-rates' }),
    });
  } catch { /* non-blocking */ }
}
```

---

## Visitor Counter

- Vercel KV (free tier) for counter storage
- `POST /api/visitors` on every page load (client-side, non-blocking)
- Footer: `Visitors today: 61  |  Total: 9,204` — small muted text

---

## SEO Requirements

- Title template: "EV Charging Prices at [Network] — Rates, Speed & Locations (2025)"
- Description template: "Compare [Network] charging prices: $X/kWh, up to YkW. See costs for your vehicle, station locations by state, and how it compares to competitors."
- `next-sitemap` with all network, state, vehicle, compare pages
- JSON-LD: `Organization`, `Product`, `FAQPage`, `WebApplication` per page type
- Canonical + `hreflang` x8
- OG images: dynamic via `@vercel/og` with network logo + price
- Internal links: network → compatible vehicles → compare → calculator

---

## Milestones & Git Commits

### Milestone 1 — Scaffold + Static Data
- Init Next.js 14, Tailwind, TypeScript
- Create all static JSON files for networks, vehicles, states
- Fetch initial AFDC station counts via API
- Create harness files
- **Git:** `git commit -m "feat: scaffold, static JSON data for networks and vehicles"`
- **GitHub:** `gh repo create taeshin11/ev-charge-rates --public --source=. --push`

### Milestone 2 — Core Pages
- Home page
- `/networks/[slug]` pages
- `/states/[state]` pages
- All schema.org, next-seo
- **Git:** `git commit -m "feat: home, network pages, state pages"`
- **Push:** `git push`

### Milestone 3 — Vehicle Pages + Compare
- `/vehicles/[make-model]` pages
- `/compare/[a]-vs-[b]` pages
- Chart.js components
- **Git:** `git commit -m "feat: vehicle pages, compare tool, charts"`
- **Push:** `git push`

### Milestone 4 — Calculator + Blog
- `/calculator` interactive tool
- `/blog` with 5 seed articles
- **Git:** `git commit -m "feat: calculator, blog articles"`
- **Push:** `git push`

### Milestone 5 — i18n + SEO
- All 8 locale files
- Sitemap, robots.txt, OG images
- **Git:** `git commit -m "feat: i18n 8 langs, sitemap, OG images"`
- **Push:** `git push`

### Milestone 6 — Ads + Webhook + Counter
- Adsterra placeholders
- Webhook integration
- Visitor counter
- **Git:** `git commit -m "feat: ads, webhook, visitor counter"`
- **Push:** `git push`

### Milestone 7 — Deploy
- `npx vercel --prod`
- QA, Lighthouse
- **Git:** `git commit -m "chore: production deploy, QA"`
- **Push:** `git push`

---

## File Structure

```
ev-charge-rates/
├── PRD.md
├── init.sh
├── feature_list.json
├── claude-progress.txt
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── next-sitemap.config.js
├── .env.local
├── .env.example
├── research_history/
├── data/
│   ├── networks/         # tesla.json, chargepoint.json, evgo.json, etc.
│   ├── vehicles/         # per-vehicle JSON
│   ├── states/           # state station counts + electricity rates
│   └── index.json        # master list of all slugs
├── content/blog/         # MDX articles
├── public/
│   ├── locales/{en,ko,ja,zh,es,fr,de,pt}/
│   ├── images/networks/  # network logos
│   └── robots.txt
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── networks/[slug]/page.tsx
    │   ├── states/[state]/page.tsx
    │   ├── vehicles/[make-model]/page.tsx
    │   ├── compare/[pair]/page.tsx
    │   ├── calculator/page.tsx
    │   ├── blog/[slug]/page.tsx
    │   └── api/visitors/route.ts
    ├── components/
    │   ├── layout/ Navbar.tsx Footer.tsx AdSlot.tsx
    │   ├── networks/ NetworkCard.tsx PriceTable.tsx
    │   ├── vehicles/ VehicleCard.tsx ChargingCostTable.tsx
    │   ├── calculator/ CostCalculator.tsx
    │   ├── compare/ ComparePanel.tsx
    │   └── charts/ SpeedChart.tsx StateMap.tsx
    ├── lib/
    │   ├── calc.ts
    │   ├── webhook.ts
    │   ├── visitors.ts
    │   └── seo.ts
    └── types/index.ts
```

---

## Harness Spec

### `feature_list.json`
```json
{
  "project": "ev-charge-rates",
  "version": "1.0.0",
  "features": [
    { "id": "static-data-json", "status": "pending", "milestone": 1 },
    { "id": "network-pages", "status": "pending", "milestone": 2 },
    { "id": "state-pages", "status": "pending", "milestone": 2 },
    { "id": "vehicle-pages", "status": "pending", "milestone": 3 },
    { "id": "compare-tool", "status": "pending", "milestone": 3 },
    { "id": "calculator", "status": "pending", "milestone": 4 },
    { "id": "blog-articles", "status": "pending", "milestone": 4 },
    { "id": "i18n-8langs", "status": "pending", "milestone": 5 },
    { "id": "seo-sitemap", "status": "pending", "milestone": 5 },
    { "id": "ads-adsterra", "status": "pending", "milestone": 6 },
    { "id": "webhook-sheets", "status": "pending", "milestone": 6 },
    { "id": "visitor-counter", "status": "pending", "milestone": 6 },
    { "id": "vercel-deploy", "status": "pending", "milestone": 7 }
  ]
}
```

### `claude-progress.txt`
```
CURRENT_MILESTONE=1
LAST_COMMIT=none
LAST_PUSH=none
NEXT_ACTION=Run init.sh to scaffold project
BLOCKER=none
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -e
echo "=== EVChargeRates Init ==="
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npm install next-i18next next-seo next-sitemap chart.js react-chartjs-2 @vercel/kv
npm install -D @types/node
mkdir -p data/{networks,vehicles,states} content/blog research_history \
  public/locales/{en,ko,ja,zh,es,fr,de,pt} public/images/networks \
  src/components/{layout,networks,vehicles,calculator,compare,charts} src/lib src/types
cp .env.example .env.local
echo "Init complete. Update .env.local with your NREL API key."
git add -A && git commit -m "feat: project scaffold and dependencies"
gh repo create taeshin11/ev-charge-rates --public --source=. --push
echo "GitHub repo created and pushed."
```
