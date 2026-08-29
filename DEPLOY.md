# WariSeva — Deployment Guide

WariSeva is a static React + Vite single-page app (no backend services required at
runtime — all data is in-browser). It can be deployed almost anywhere that can host
static files. A tiny Node/Express server (`server.js`) is included so it can also run
on any Node hosting platform.

## 1. Live Preview (this workspace)

The app is already built and served in this environment:

```bash
npm install
npm run build
npm start          # serves the `dist/` folder on http://0.0.0.0:8080
```

The preview is proxied by the platform, so it is immediately viewable in the browser.

## 2. Deploy to any Node host (Render, Railway, Fly.io, Cloud Run, etc.)

These platforms all follow the same recipe:

| Setting      | Value                      |
| ------------ | -------------------------- |
| Build command | `npm install && npm run build` |
| Start command | `npm start`               |
| Port          | `8080` (or set `PORT`)    |

`server.js` binds to `0.0.0.0` and honors the `PORT` environment variable.

## 3. Deploy to Vercel / Netlify (static)

These platforms detect Vite automatically:

- **Build command:** `npm run build`
- **Output directory:** `dist`

The app is a client-side SPA, so configure the SPA rewrite (all routes → `/index.html`).

## 4. Deploy to GitHub Pages

The `vite.config.ts` reads a `BASE_PATH` env var, so the build works under a
sub-path like `https://<user>.github.io/Wari-setu/`.

**Note:** the sandbox's GitHub token cannot push `.github/workflows` files or toggle
Pages, so this step must be done with the repo owner's account. Two ways:

### Option A — deploy from Actions (recommended)

1. Repo **Settings → Pages → Source → GitHub Actions**.
2. Add a file `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          BASE_PATH: /${{ github.event.repository.name }}/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

3. Push to `main`. The site will be published at
   `https://<user>.github.io/Wari-setu/`.

### Option B — push the built `dist/` manually

```bash
npm run build
BASE_PATH=/Wari-setu/ npm run build   # rebuild with the sub-path base
git add dist -f
git commit -m "Deploy build to Pages"
git subtree push --prefix dist origin gh-pages
```

Then set **Settings → Pages → Source → `gh-pages` branch**.

## Environment variables

None are required to run the app. `GEMINI_API_KEY` / `APP_URL` are optional
(AI Studio hooks) and are not used by the current build.
