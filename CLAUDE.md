# Hundewissen mit Kopf — Blog

## Projekt

Deutschsprachiger Hundeblog auf **Astro 5** + **Tailwind CSS 4** + **Cloudflare Pages**.
Live unter: https://hundewissen-mit-kopf.de

## Tech-Stack

- **Framework:** Astro 5.17 (Static Site Generator)
- **Styling:** Tailwind CSS 4.1 + `@tailwindcss/typography`
- **Hosting:** Cloudflare Pages (auto-deploy bei `git push` auf `main`)
- **Domain:** Bei Hetzner registriert, Nameserver zeigen auf Cloudflare
- **Suche:** Pagefind (statisch, client-side, DSGVO-konform)
- **Sitemap:** `@astrojs/sitemap` → `/sitemap-index.xml`

## Befehle

```bash
npm run dev       # Lokale Vorschau (localhost:4321)
npm run build     # Produktions-Build → dist/ + Pagefind-Index
npm run preview   # Gebautete Seite lokal ansehen
```

## Projektstruktur

```
src/
├── layouts/BaseLayout.astro     # Head, SEO, OG-Tags, Schema.org, Header/Footer
├── components/                   # 19 Komponenten (Header, Footer, BlogCard, FAQ, AuthorBox, SearchModal, RelatedArticles, ReadingProgress, ScrollToTop...)
├── pages/
│   ├── index.astro              # Startseite
│   ├── [category]/[id].astro    # Artikel-Template (dynamische Route)
│   ├── [category]/index.astro   # Kategorie-Übersicht
│   ├── 404.astro                # Fehlerseite
│   ├── impressum.astro          # Rechtliche Seiten
│   ├── datenschutzerklaerung.astro
│   ├── haftungsausschluss.astro
│   ├── ueber-mich.astro
│   └── kontakt.astro
├── content/blog/*.md            # Blogartikel (Markdown + YAML-Frontmatter)
└── styles/global.css            # Farb-Tokens, Eyecatcher-Klassen, Custom-Styles
public/
├── images/                      # Bilder (WebP, werden 1:1 kopiert)
├── robots.txt
└── favicon.svg
```

## Content-Schema (Frontmatter)

```yaml
title: "Titel (max 60 Zeichen)"          # Pflicht
description: "Meta-Description"            # Pflicht
category: "Hundeernährung"                 # Display-Name
categorySlug: "hundeernaehrung"            # URL-Slug
tags: ["Tag1", "Tag2"]                     # Optional, default []
date: "2026-02-14"                         # Pflicht
updated: "2026-02-14"                      # Optional
image: "/images/bild.webp"                 # Optional
imageAlt: "Alt-Text"                       # Optional
featured: false                            # Optional
draft: false                               # Optional
faqs:                                      # Optional → FAQ-Accordion
  - question: "Frage?"
    answer: "Antwort"
sources:                                   # Optional → Quellenverzeichnis
  - name: "Quelle"
    url: "https://..."
```

## Kategorien

| Display-Name | Slug | URL |
|---|---|---|
| Hundeernährung | hundeernaehrung | /hundeernaehrung/ |
| Hundegesundheit | hundegesundheit | /hundegesundheit/ |
| Erziehung & Verhalten | erziehung-verhalten | /erziehung-verhalten/ |
| Hundeausstattung | hundeausstattung | /hundeausstattung/ |
| Hunderassen | hunderassen | /hunderassen/ |
| Hundepflege | hundepflege | /hundepflege/ |

## Farbschema

- **Primary:** `#E8913A` (Orange) → `var(--color-primary)`
- **Primary Dark:** `#C67520` → `var(--color-primary-dark)`
- **Secondary:** `#FFF8F0` (Creme)
- **Petrol:** `#2C5F6E` → `var(--color-petrol)`
- **Beige:** `#F5E6D3` → `var(--color-beige)`
- **Danger:** `#e17055` → `var(--color-danger)`

## Eyecatcher-Klassen (in Markdown-Artikeln)

Alle Custom-HTML-Blöcke in `.md`-Dateien brauchen `class="not-prose ..."`:

- `tldr-box` — Zusammenfassungs-Box (orange Gradient)
- `info-box info-box-warning` — Warnung (orange)
- `info-box info-box-danger` — Kritisch (rot)
- `info-box info-box-tip` — Tipp (beige)
- `info-box info-box-info` — Info (petrol)
- `info-box info-box-fact` — Fakt/Definition (gelb)
- `info-box info-box-success` — Erfolg (grün)
- `card-grid` + `card-grid-item` — Karten-Grid
- `comparison-grid` + `comparison-pro`/`comparison-contra` — Pro/Contra
- `steps-grid` + `step-item` — Prozess-Schritte
- `stat-grid` + `stat-item` — Statistik-Counter
- `checklist` + `checklist-item` — Checkliste
- `recipe-box` — Rezept-Box
- `definition-box` — Definitions-Box

## Suche (Pagefind)

- **Bibliothek:** Pagefind (statisch, client-side, DSGVO-konform — keine externen Anfragen)
- **Build:** Automatisch als Post-Build-Schritt (`astro build && npx pagefind --site dist`)
- **UI:** Modal-Overlay (`SearchModal.astro`), geöffnet via Header-Button oder `Cmd+K` / `Ctrl+K`
- **Indexierung:** Nur `<article data-pagefind-body>` in `[id].astro` wird indexiert
- **Z-Index:** `z-[70]` (über Header z-50 und Mobile-Menu z-60)
- **Sprache:** Deutsche UI-Texte (Placeholder, Fehlermeldungen)
- **Hinweis:** Suche funktioniert nur nach `npm run build`, nicht in `npm run dev`

## Verwandte Artikel

- **Komponente:** `src/components/RelatedArticles.astro`
- **Position:** Im Artikel-Template nach Quellen-Section, vor AuthorBox
- **Algorithmus:** Shared Tags (+2 Punkte pro Tag, case-insensitive) + gleiche Kategorie (+1 Punkt)
- **Anzeige:** Maximal 3 Artikel, Fallback auf neueste Beiträge wenn < 2 Treffer
- **Wiederverwendung:** Nutzt bestehende `BlogCard.astro`-Komponente

## Animationen & Micro-Interactions

### Hero-Animationen
- **Komponente:** `src/components/Hero.astro` (HTML + inline `<script>`)
- **CSS:** `src/styles/global.css` (Keyframes: `rotateWordOut`, `rotateWordIn`, `cursorBlink`)
- **Typewriter-Effekt:** Tagline "Hunde · Wissen · Verstand" wird Buchstabe für Buchstabe getippt (70ms/Zeichen, 300ms Pause bei `·`), blinkender Cursor verschwindet nach Abschluss
- **Keyword-Rotation:** Headline-Wort rotiert alle 3.5s: Halbwahrheiten → Mythen → Panikmache → Fehlinformationen (Slide-up/Slide-in Animation)
- **Timing:** fadeInUp (0ms) → Typewriter (~700ms) → Cursor verschwindet (~2.5s) → Keyword-Rotation startet (~3.5s)

### Scroll-Fade-In-Animationen
- **CSS-Klasse:** `.scroll-fade-in` + `.stagger-1` bis `.stagger-5` für gestaffelte Delays
- **Observer:** Globaler `IntersectionObserver` in `BaseLayout.astro` (threshold 0.15, rootMargin -40px)
- **Angewendet auf:** LatestPosts, Philosophy, Comparison, Stats, Categories, FunFacts, CallToAction — Header + Kinder-Elemente

### Animierter Zahlen-Counter
- **Komponente:** `src/components/Stats.astro`
- **Technik:** `IntersectionObserver` (threshold 0.5) triggert `requestAnimationFrame`-Counter
- **Dauer:** 1500ms mit ease-out cubic Easing
- **Daten:** `data-target` (Zielwert) + `data-suffix` (+, %, leer)

### Kategorie-Karten Flip-Effekt
- **Komponente:** `src/components/CategoryCard.astro`
- **CSS:** `.card-flip-container` (perspective 1000px) → `.card-flip-inner` (rotateY 180° bei Hover)
- **Vorderseite:** Emoji + Titel + Tags (weiß)
- **Rückseite:** Emoji + Titel + Beschreibung + "Entdecken"-Button (orange Gradient)
- **Höhe:** 280px fix, um Layout-Shift zu vermeiden

### Smooth FAQ-Accordion
- **Komponente:** `src/components/FAQ.astro`
- **Technik:** CSS Grid `grid-template-rows: 0fr → 1fr` Transition (300ms ease-out)
- **Statt:** Nativem `<details>`-Element → Custom `<button>` + `.faq-answer.is-open`
- **Chevron:** Smooth 300ms `rotate(180deg)` Transition
- **Accessibility:** `aria-expanded`, `aria-hidden` werden per JS getoggelt

### Globale Accessibility-Regeln
- `prefers-reduced-motion: reduce` deaktiviert alle Animationen (Scroll-Fade, Flip, Hero, FAQ)
- `aria-live="polite"` auf rotierendem Keyword-Span
- Ohne JS: Statischer Text sichtbar, FAQs initial geschlossen (Progressive Enhancement)

## SEO & Schema.org

- **Author:** `Person` (Michael Törner) — in `[id].astro`
- **Publisher:** `Organization` (Hundewissen mit Kopf)
- **Schemas:** Article, BreadcrumbList, FAQPage (automatisch generiert)
- **Author Byline:** Oben im Artikel-Header (Name + Datum + Lesezeit)
- **AuthorBox:** Unten am Artikelende (Bio + Link zu /ueber-mich/)
- **robots.txt:** Alle Bots erlaubt
- **Sitemap:** Automatisch via `@astrojs/sitemap`

## Neuen Artikel veröffentlichen

1. `.md`-Datei in `src/content/blog/` anlegen (Dateiname = URL-Slug)
2. Frontmatter mit allen Pflichtfeldern ausfüllen
3. Bilder als WebP in `public/images/` legen
4. `npm run build` zum Testen
5. `git add . && git commit -m "Neuer Artikel: Titel" && git push`
6. Cloudflare baut automatisch in 1-2 Minuten

## Betreiber

Michael Törner, Wartburgstraße 1, 49124 Georgsmarienhütte
