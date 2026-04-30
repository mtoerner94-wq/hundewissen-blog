# Hundewissen mit Kopf

Deutschsprachiger Hundeblog unter [hundewissen-mit-kopf.de](https://hundewissen-mit-kopf.de). Das Projekt ist als statische Astro-Site aufgebaut und bündelt faktenbasierte Ratgeber zu Hundeernährung, Erziehung, Pflege, Ausstattung, Hunderassen und Reisen.

Ziel der Seite: verständliche Artikel mit Quellenangaben, klarer Struktur, schneller Ladezeit und sauberer technischer SEO-Basis.

## Tech-Stack

- Astro 5
- Tailwind CSS 4
- Astro Content Collections für Markdown-Artikel
- Astro Image Optimization für WebP-Bilder aus `src/assets/images/`
- Pagefind für statische, clientseitige Suche
- `@astrojs/sitemap` für XML-Sitemaps
- Cloudflare Pages als Hosting- und Deployment-Ziel
- Cloudflare Pages Function für Markdown-Content-Negotiation

## Lokale Entwicklung

```bash
npm ci
npm run dev
```

Die lokale Vorschau läuft standardmäßig unter `http://localhost:4321`.

Wichtige Skripte:

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Astro-Dev-Server starten |
| `npm run build` | Produktions-Build in `dist/` erzeugen und Pagefind-Index bauen |
| `npm run preview` | Gebaute Seite lokal prüfen |
| `npm run astro -- --help` | Astro-CLI-Hilfe anzeigen |

Hinweis: Die Suche funktioniert erst nach `npm run build`, weil Pagefind den fertigen `dist/`-Ordner indexiert.

## Projektstruktur

```text
.
├── astro.config.mjs
├── functions/
│   └── _middleware.ts
├── public/
│   ├── _headers
│   ├── _redirects
│   ├── _routes.json
│   ├── favicon.*
│   ├── fonts/
│   └── robots.txt
└── src/
    ├── assets/images/
    ├── components/
    ├── content/blog/
    ├── content.config.ts
    ├── layouts/BaseLayout.astro
    ├── pages/
    └── styles/global.css
```

## Content-Modell

Blogartikel liegen als Markdown-Dateien in `src/content/blog/`. Der Dateiname ist zugleich die Artikel-ID und wird in der URL verwendet:

```text
src/content/blog/duerfen-hunde-bananen-essen.md
→ /hundeernaehrung/duerfen-hunde-bananen-essen/
```

Frontmatter-Beispiel:

```yaml
title: "Dürfen Hunde Bananen essen? Menge, Vorteile & Risiken"
description: "Kurzer Meta-Description-Text für Suchergebnis und Social Preview."
category: "Hundeernährung"
categorySlug: "hundeernaehrung"
tags: ["Ernährung", "Obst", "Snack"]
date: "2026-02-14"
updated: "2026-02-20"
image: "../../assets/images/duerfen-hunde-bananen-essen.webp"
imageAlt: "Hund schaut auf eine Banane"
featured: false
draft: false
faqs:
  - question: "Dürfen Hunde jeden Tag Banane essen?"
    answer: "Nein, Banane sollte nur gelegentlich in kleinen Mengen gefüttert werden."
sources:
  - name: "Beispielquelle"
    url: "https://example.com/"
```

Pflichtfelder sind `title`, `description`, `category`, `categorySlug` und `date`. Bilder gehören nach `src/assets/images/` und werden über relative Pfade aus dem Artikel referenziert.

## Kategorien

| Kategorie | Slug | URL |
| --- | --- | --- |
| Hundeernährung | `hundeernaehrung` | `/hundeernaehrung/` |
| Erziehung & Verhalten | `erziehung-verhalten` | `/erziehung-verhalten/` |
| Hundeausstattung | `hundeausstattung` | `/hundeausstattung/` |
| Hunderassen | `hunderassen` | `/hunderassen/` |
| Hundepflege | `hundepflege` | `/hundepflege/` |
| Reisen | `reisen` | `/reisen/` |

URLs, Slugs und Dateinamen bleiben ASCII. Fließtext, Überschriften und Metadaten nutzen echte Umlaute.

## Artikel-Features

- Inhaltsverzeichnis aus Artikelüberschriften
- Lesezeit-Berechnung
- FAQ-Accordion mit optionalem `FAQPage`-Schema
- Quellenverzeichnis
- verwandte Artikel nach Kategorie und Tags
- Author-Box
- Lesefortschritt und Scroll-to-top
- optionale Clippy-Hinweise über `clippy`
- KI-Hinweis-Komponente

Für eigene HTML-Blöcke in Markdown wird `class="not-prose ..."` verwendet, damit Tailwind Typography die Layout-Blöcke nicht unerwünscht überschreibt.

## SEO, Suche und Maschinenlesbarkeit

Die technische SEO-Basis sitzt vor allem in `src/layouts/BaseLayout.astro` und den dynamischen Seiten unter `src/pages/[category]/`.

Vorhanden sind:

- Canonical URLs
- Open Graph und Twitter Card Tags
- `Article`, `BreadcrumbList`, `FAQPage` und `CollectionPage` Schema.org-Daten
- paginierte Kategorieseiten mit `prev`/`next`
- `noindex, follow` auf Folgeseiten der Kategorie-Paginierung
- XML-Sitemap über `@astrojs/sitemap`
- `robots.txt`
- `llms.txt` und `llms-full.txt`
- Markdown-Versionen der Startseite und Artikel
- Pagefind-Suche über `SearchModal.astro`

Die Cloudflare Pages Function in `functions/_middleware.ts` liefert für normale Seiten eine vorgerenderte Markdown-Variante aus, wenn Clients `Accept: text/markdown` anfragen.

## Deployment

Deployment läuft über Cloudflare Pages. Der produktive Build-Befehl ist:

```bash
npm run build
```

Build-Output:

```text
dist/
```

Ein Push auf `main` triggert den Cloudflare-Pages-Build. Die Domain `hundewissen-mit-kopf.de` zeigt auf Cloudflare.

## Neuen Artikel veröffentlichen

1. Neue Markdown-Datei in `src/content/blog/` anlegen.
2. Frontmatter vollständig ausfüllen.
3. Bild als WebP in `src/assets/images/` ablegen.
4. Bildpfad im Artikel relativ setzen.
5. Bei Bedarf `faqs`, `sources`, `tags` und `clippy` ergänzen.
6. `npm run build` ausführen.
7. Änderungen committen und auf `main` pushen.

## Wichtige Stolperstellen

- Pagefind sucht nur im gebauten Output, nicht im Dev-Server ohne vorherigen Build.
- Bilder nicht nach `public/images/` legen, wenn Astro sie optimieren soll.
- Neue Kategorien müssen im Kategorie-Routing und in den betroffenen UI-Komponenten ergänzt werden.
- Externe Links werden per Rehype automatisch mit `target="_blank"` und `nofollow noopener noreferrer` versehen.
- Artikel mit `draft: true` werden nicht veröffentlicht.

## Status

Privates Blog-Projekt von Michael Törner. Keine Open-Source-Lizenz im Repository hinterlegt.
