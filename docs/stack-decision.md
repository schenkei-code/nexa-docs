# Stack decision: Nextra 3 vs Mintlify

Date: 2026-04-18
Owner: Dominik Schenkel
Repo: `nexa-docs`

## Context

`nexa-docs` is the developer documentation site for the Nexa API family
(NexaAds, NexaCreate, NexaLytics, shared infra). Must support MDX, global
search, Mermaid, code-block search-highlighting, dark mode, branded sidebar
navigation by product, automated changelog from git, and import of existing
docs from other Nexa repos.

Two candidates were evaluated: **Nextra 3** and **Mintlify**.

## Comparison

| Criterion                         | Nextra 3                                        | Mintlify                                     |
| --------------------------------- | ----------------------------------------------- | -------------------------------------------- |
| License / cost                    | MIT, self-hosted, zero platform fee             | SaaS, per-editor seat + enterprise tiers     |
| Stack match                       | Next.js / React / Vercel (same as every Nexa product) | Proprietary, hosted                           |
| Content format                    | MDX + React components                          | MDX-like dialect, but framework-owned          |
| Brand theming                     | Full control via `theme.config.tsx` + CSS vars — we can inject `nexa-brand-system` tokens 1:1 | Theme knobs + custom CSS, but component surface locked |
| Search                            | Built-in, with codeblock highlighting           | Built-in (AI search on higher tiers)         |
| Changelog from git                | Trivial via build script                        | Needs custom CMS integration                 |
| MCP / docs importer from other repos | Plain file copy or symlink                    | Import via Mintlify CLI, but hosted only     |
| Self-host on Vercel               | Yes, same project pipeline                      | No, SaaS only                                |
| Vendor lock-in                    | None (pure Next.js app)                         | High (content in their format, hosted runtime) |
| Editor experience                 | Any editor, git-based                           | Web editor, git sync optional                |
| Onboarding new contributors       | Clone repo                                      | Invite into paid workspace                   |

## Decision

**Nextra 3.**

- The entire Nexa stack (NexaAds, NexaCreate, NexaLytics, NexaFlow, …) is Next.js
  on Vercel. Running docs on the exact same deploy pipeline means zero new
  infra decisions, one dashboard, one auth model.
- `nexa-brand-system/tokens/design-tokens.json` can be imported as CSS
  variables directly into Nextra — we keep brand parity with every other
  surface without reverse-engineering a Mintlify theme.
- No per-seat cost. Docs get contributed to by every agent and contractor who
  already has repo access.
- MDX + React components let us embed live playgrounds for the MCP server
  later without fighting a hosted framework.
- Git-based changelog, editable on any laptop, no Mintlify CLI required.

Mintlify is the right call for teams that want zero-ops SaaS and have budget
for per-seat editors. For the Nexa stack, where we already operate Next.js
at scale, it would be redundant vendor surface.

## Consequences

- We own the build pipeline. A Nextra major bump becomes our problem (manageable).
- Search is built-in but not AI-powered out of the box. Later upgrade path:
  bolt on Inkeep or a custom RAG over the MDX content — this is explicitly
  easier on Nextra than on a hosted doc vendor.
- Design consistency with the rest of Nexa is now trivial: any brand-token
  change propagates to docs the same way it does to the apps.
