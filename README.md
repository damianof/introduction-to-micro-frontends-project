# introduction-to-micro-frontends-project

### Companion code for the book:

<img src="readme-images/cover-en-hero.png" width="150px" /> 

[An Opinionated Introduction to Micro-frontends](
https://leanpub.com/introduction-to-micro-frontends "An Opinionated Introduction to Micro-frontends")

---

## Architecture

This project demonstrates a **custom micro-frontends approach without import maps**. Each micro-frontend is an independently built and served JavaScript module that the container-app loads dynamically at runtime via `<script type="module">` injection. A shared `postbox` library handles cross-module pub/sub communication.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a full technical breakdown.

### Project dependency graph

<img src="readme-images/graph.png" alt="NX project dependency graph" />

---

## Getting started

### Install dependencies

Install from the **root** (NX monorepo — one install covers all projects):

```bash
npm install
```

Then install each project's own dependencies:

```bash
cd postbox && npm install
cd ../root-styles && npm install
cd ../container-app && npm install
cd ../microfrontend1 && npm install
cd ../microfrontend2 && npm install
cd ../microfrontend3 && npm install
cd ../mock-api && npm install
```

### Build postbox first

`postbox` is a local `file:` dependency — it must be built before any other package:

```bash
cd postbox && npm run build
```

---

## Development

From the root directory:

```bash
npm run serve
```

**NX** runs all `watch-and-run` scripts in parallel, first building any stale dependencies in the correct order. Each package's `watch-and-run` concurrently runs a Vite build watcher and a Vite dev server. The container-app auto-reloads any micro-frontend whose output changes.

| URL | What's there |
|---|---|
| http://localhost:4173 | Container app (open this in your browser) |
| http://localhost:5001 | microfrontend1 standalone |
| http://localhost:5002 | microfrontend2 standalone |
| http://localhost:5003 | microfrontend3 standalone |
| http://localhost:5004 | root-styles CSS |
| http://localhost:3031 | Mock API |

---

## Building

```bash
# Build all projects (respects dependency order, uses cache)
npm run build

# Build only projects affected by your changes
npm run affected:build

# Build a single project
npx nx run microfrontend1:build
```

---

## NX task graph

```bash
npm run graph
```

Opens the interactive NX project graph in your browser. Unchanged projects are restored from the **local build cache** — no redundant rebuilds.

---

## Tech stack

- **NX** — monorepo task orchestration and build caching
- **Vite** — build tool for all projects
- **TypeScript** — used across all projects
- **Tailwind CSS v4** — shared styles via `root-styles`
- **postbox** — custom pub/sub library (local package)
- **concurrently** — parallel watch + serve within each micro-frontend

