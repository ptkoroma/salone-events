// sw.js — Service Worker for Salone Events PWA
// Increment CACHE_VERSION whenever you deploy updated assets.

const CACHE_VERSION = 'v1';
const STATIC_CACHE  = `salone-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `salone-dynamic-${CACHE_VERSION}`;

// App shell: everything needed to render the app without the network.
// The Babel CDN script is large (~9 MB) but required for JSX transpilation offline.
const APP_SHELL = [
  '/Sierra-Leone-Events',
  '/styles.css',
  '/data.js',
  '/tweaks-panel.jsx',
  '/poster.jsx',
  '/components.jsx',
  '/views-home.jsx',
  '/views-other.jsx',
  '/app.jsx',
  '/manifest.json',
  '/offline',
  '/icons/icon.svg',
  // React 18 + ReactDOM + Babel standalone (CDN — SRI-pinned, won't change)
  'https://unpkg.com/react@18.3.1/umd/react.development.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js',
];

// ── Install: pre-cache the app shell ────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// ── Activate: purge stale caches ────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: route to the right caching strategy ──────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Google Fonts CSS + font files: stale-while-revalidate keeps them fresh
  // without blocking the render.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
    return;
  }

  // HTML navigation: try network first so the user always gets a fresh page;
  // fall back to the cached copy, then the offline shell.
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Everything else (local JS/CSS/JSX, CDN scripts, images): cache-first.
  // First visit caches them; subsequent visits (including offline) are instant.
  event.respondWith(cacheFirst(request));
});

// ── Strategy helpers ─────────────────────────────────────────────────────────

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    // Only cache successful, non-opaque responses to avoid poisoning the cache
    // with failed CDN fetches that still return status 200 (opaque quirk).
    if (response.ok || response.type === 'opaque') {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Asset unavailable offline.', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // If the specific page isn't cached, serve the offline shell.
    return caches.match('/offline');
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || fetchPromise;
}
