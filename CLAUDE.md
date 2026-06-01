# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

Open `Sierra-Leone-Events.html` directly in a browser — no build step, no server required.

```bash
open "Sierra-Leone-Events.html"
# or on any system with a local server:
npx serve .
```

There is no package.json, no bundler, and no test suite. All dependencies (React 18, ReactDOM, Babel standalone) are loaded from CDN in the HTML file.

## Architecture

This is a **zero-build, in-browser React app**. Babel transpiles the `.jsx` files at runtime in the browser.

### Module system: `window` globals

There is no ES module system. Each `.jsx` file attaches its exports to `window` at the bottom (e.g. `Object.assign(window, { DetailView, ... })`). The HTML file controls load order — a file can only use names defined by files listed above it in the `<script>` tags.

**Load order** (`Sierra-Leone-Events.html`):
1. `data.js` — seed data + helpers → `window.SLE`
2. `tweaks-panel.jsx` — design tweaks system → `window.useTweaks`, `window.TweaksPanel`, `window.Tweak*`
3. `poster.jsx` — `EventPoster` component → `window.EventPoster`
4. `components.jsx` — icons (`window.Ic`), shared cards (`EventCard`, `EventRow`, `EventMag`), `Nav`, `Footer`
5. `views-home.jsx` — `HomeView`, `EventList` → route `"home"`
6. `views-other.jsx` — `DetailView`, `AddEventView`, `CalendarView`, `SavedView`
7. `app.jsx` — root `App` component, mounts via `ReactDOM.createRoot`

### Routing

Client-side routing is a plain `{ name, ...params }` object in React state, persisted to `localStorage` as `sle.route`. `app.jsx:54` defines `go(name, params)`. Routes: `home`, `detail` (needs `id`), `add`, `calendar`, `saved`.

### Data

`data.js` wraps everything in an IIFE and attaches to `window.SLE`:
- `SLE.EVENTS` — array of event objects; `AddEventView` pushes new events here at runtime (not persisted across reload)
- `SLE.CATEGORIES` — `{ music, culture, charity, business, learn }` with `hue` values for CSS color generation
- `SLE.parseDate`, `SLE.fmtPrice`, `SLE.fmtDateLong`, `SLE.fmtTime` — shared formatting helpers

### Theming and Tweaks

`app.jsx` defines `TWEAK_DEFAULTS` wrapped in `/*EDITMODE-BEGIN*/` … `/*EDITMODE-END*/` markers. The `useTweaks` hook reads these defaults and writes changes back via `postMessage({ type: '__edit_mode_set_keys', edits })` to a parent frame (used when hosted inside Claude's artifact viewer or a similar design tool). Tweaks drive CSS custom properties applied inline on the root `div.app-bg`:

- `--accent`, `--accent-ink`, `--accent-2` — color palette
- `--r-card` — card border radius
- `--font-display`, `--font-body` — font family strings

Dark/light mode is toggled via `document.documentElement.setAttribute("data-theme", ...)`.

### Persistence

`localStorage` keys:
- `sle.route` — current route
- `sle.saved` — JSON array of saved event IDs
- `sle.rsvped` — JSON array of RSVPed event IDs

### Poster art

`poster.jsx` generates deterministic placeholder artwork (no external images) using a FNV-1a hash of the event ID to seed gradients, arc positions, and rotation. The category's `hue` value drives the color scheme.

## Key patterns

- **Adding a new route**: add a `{route.name === "foo" && <FooView />}` branch in `app.jsx`, export the component from `views-other.jsx` via `Object.assign(window, ...)`, and add it before `app.jsx` in the HTML load order if needed.
- **Adding event fields**: extend the object shape in `data.js` seed data and the `empty` state in `AddEventView` (`views-other.jsx:104`).
- **Styling**: `styles.css` uses CSS custom properties throughout. Component styles are almost entirely inline (no CSS modules). `tweaks-panel.jsx` injects its own `<style>` tag when the panel is open.
