# nexa-docs

Developer documentation site for the Nexa API family — **NexaAds**,
**NexaCreate**, **NexaLytics**, **NexaVoize** — plus shared SDKs, examples,
webhooks, and a git-driven changelog.

Deployed at **docs.nexa.one** (API at **api.nexa.one**).

## Stack

**Nextra 3** (Next.js 15, MDX, nextra-theme-docs). Dark-mode only, Outfit +
Geist Mono typography, violet → blue → cyan brand gradient, glassmorphism.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build (also regenerates the changelog from git):

```bash
npm run build
npm start
```

## Structure

```
pages/
  index.mdx                  # landing — hero, endpoint grid, code samples
  quickstart.mdx             # 5-minute getting-started
  auth.mdx                   # tokens, scopes, nexa-auth
  webhooks.mdx               # events, signatures, retries
  sdks/                      # JS/TS, Python, Go
  examples/                  # copy-paste recipes
  api-ref/
    overview.mdx             # shared auth, rate-limits, versioning, errors
    nexaads/                 # MCP server + Meta/Google tool catalogue + REST
    nexacreate/              # generative image + video (placeholders)
    nexalytics/              # creator lookup + media-kit + analytics
    nexavoize/               # TTS + voice assistants
  changelog.mdx              # auto-generated from git
  api/
    sitemap.xml.ts           # dynamic sitemap
public/
  llms.txt                   # agent-readable overview
  robots.txt                 # crawler policy (agents welcome)
  manifest.webmanifest       # PWA-style manifest
  favicon.svg                # gradient N logo
  openapi-*.yaml             # OpenAPI 3.1 stubs for each product
styles/
  brand.css                  # Nexa brand tokens + hero/glass utilities
theme.config.tsx             # Nextra theme — logo, footer, nav
scripts/
  gen-changelog.mjs          # git → pages/changelog.mdx
```

## Agent-ready

- `/llms.txt` — structured summary for LLM crawlers
- `/robots.txt` — explicitly allow ClaudeBot, GPTBot, PerplexityBot
- `/sitemap.xml` — dynamic sitemap
- `/openapi-*.yaml` — machine-readable specs per product

## Brand tokens

`styles/brand.css` holds the Nexa design tokens — deep-violet canvas, violet
→ blue → cyan gradient, Outfit display + Geist Mono code, and glass-card
utilities (`.nexa-hero`, `.nexa-glass`, `.nexa-endpoint`, …).

## Changelog

Generated from git commits on every `npm run build`. Uses conventional
commit prefixes (`feat:`, `fix:`, `docs:` …) for grouping.

```bash
npm run changelog
```

## Adding a new endpoint page

1. Drop an MDX file under the right product folder.
2. Add its slug to the sibling `_meta.ts`.
3. Commit. The search index rebuilds on the next build.

## License

MIT.
