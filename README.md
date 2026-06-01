# Hantavirus Tracker

Independent public-source tracker for the 2026 MV Hondius Andes virus outbreak.

The site keeps a source-linked outbreak dataset, case timeline, ship-route context,
response tracker, and plain-language hantavirus reference pages. It is designed for
readers who need a compact view of public updates from WHO, ECDC, CDC, UKHSA, and
other official public-health sources.

Live site: https://hantavirustracker.fyi

## What this project tracks

- Latest public case counts for the MV Hondius Andes virus outbreak.
- Confirmed, probable, suspected, and inconclusive case status where public sources
  provide those classifications.
- Deaths, monitoring period, and response status.
- Timeline of official updates.
- Machine-readable outbreak data and update history.
- Reference pages for symptoms, transmission, incubation, prevention, testing,
  treatment, and case definitions.

This project does not provide medical advice and does not publish private
identifying information about individual cases.

## Data and methodology

The primary dataset lives in `data/outbreak.json`. Runtime helpers are in
`lib/outbreak.ts`.

The public site also exposes:

- `/data/outbreak.json`
- `/data/outbreak.csv`
- `/data/country-responses.csv`
- `/data/updates.json`
- `/feed.xml`

Source priority:

1. WHO briefings and Disease Outbreak News.
2. ECDC outbreak updates.
3. CDC clinical and transmission guidance.
4. National public-health authorities.
5. Reputable news or wire reports only for corroborating already-public details.

See `/methodology`, `/editorial-policy`, and `/corrections` on the live site for
the full update and correction policy.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Leaflet / React Leaflet for maps
- Tailwind CSS

## Local development

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Checks

```sh
pnpm lint
pnpm build
```

## Contributing

Issues and pull requests are welcome, especially for:

- Correcting source links.
- Updating official public-health source references.
- Improving data validation.
- Improving accessibility or mobile layout.
- Clarifying medical-reference pages without changing source meaning.

Please include source URLs for any proposed data change. For medical or outbreak
figures, prefer official public-health sources over secondary summaries.

## License

MIT. See `LICENSE`.
