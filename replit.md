# Sharin Khander — Portfolio

An editorial product-work archive for hiring managers and product leaders to explore Sharin Khander's projects.

## Run & Operate

- `pnpm --filter @workspace/sharin-portfolio run typecheck` — check the portfolio
- `pnpm run typecheck` — check the full workspace
- The web artifact uses the managed `artifacts/sharin-portfolio: web` workflow.

## Stack

- React + Vite + TypeScript, Tailwind CSS, Wouter
- Static, data-driven portfolio; no database or API is required for its current public pages

## Where things live

- `artifacts/sharin-portfolio/src/lib/projects.ts` — project records, optional cover media, and case-study content
- `artifacts/sharin-portfolio/src/components/project-content.tsx` — reusable project and media modules
- `artifacts/sharin-portfolio/src/pages/` — work, project detail, about, and contact pages
- `artifacts/sharin-portfolio/src/index.css` — visual theme and responsive presentation

## Architecture decisions

- Project detail sections render only when verified content has been entered; do not present empty prompts as finished case studies.
- Keep original work screenshots and evidence distinct from illustrative placeholder canvases.

## Product

Visitors can browse and filter the selected work, open reusable project pages, and read short About and Contact pages.

## User preferences

- Favor a quiet, editorial product archive over a generic PM résumé or SaaS landing page.
- Keep on-page copy short, punchy, and scannable; remove repeated labels and explanations.
- Use the supplied reference image's warm cream, dusty rose, muted olive, oxblood, and near-black palette.
- Never fabricate project screenshots, research, decisions, outcomes, metrics, or contact links.
- Keep work central; give project imagery room once real assets are supplied.

## Gotchas

- Elevated Experience uses user-supplied PDP and Browse screenshots, a PDP recording, and supplied outcomes. Attribute Enrichment uses supplied product examples, a customer-facing Vintage Bridal screenshot, and supplied outcomes; do not label that screenshot as the internal Curation Tool. Shopping Agent uses a user-supplied kickoff deck and brief for its narrative, with generated illustrative imagery in a labeled guided simulation; it has no verified outcome metrics or real listing imagery. Its 6M+ figure describes the broader catalog, not in-stock inventory; in-agent checkout was a later phase, not MVP. Similar Designers replaces Checkout and uses a user-supplied confidential strategy deck and brief; its product imagery and recommendation walkthrough are labeled illustrations, while the 80% observation is source-supplied. The co-browse module was the MVP; visual/style/personalized recommendations were later directions, not verified deliveries. Do not publish raw deck slides or invent experiment results. Visual Search and Curation still lack verified media and results. The site has no public contact channel.
- The sixth "Future project" is an unpublished archive slot, not a live case study.

## Pointers

- See the `react-vite` and `pnpm-workspace` skills for web-app and workspace conventions.
