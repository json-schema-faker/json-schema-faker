const CACHE = 'jsf-v0.6.0';

const PRECACHE = [
  '/',
  '/main.js',
  '/styles.css',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.6/ace.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.6/mode-json.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.6/mode-yaml.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.6/theme-nord_dark.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.6/theme-github_dark.min.js',
  'https://cdn.jsdelivr.net/npm/@faker-js/faker@8.4.1/dist/browserfaker.min.js',
  'https://cdn.jsdelivr.net/npm/json-schema-faker@0.5.9/dist/bundle.min.js',
  'https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      // Cache successful GET responses for CDN assets
      if (response.ok && event.request.method === 'GET') {
        const url = event.request.url;
        if (url.includes('cdnjs') || url.includes('jsdelivr') || url.includes('tailwindcss') || url.includes('fonts.g')) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
      }
      return response;
    }))
  );
});
