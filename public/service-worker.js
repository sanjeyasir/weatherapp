const CACHE_NAME = 'snake-game-cache-v1';
const FILES_TO_CACHE = [
  '/',                // your app root or the path for the Snake game page (adjust if you use routes)
  '/snakegame',
  '/static/js/main.js', // adjust to your actual JS bundle(s)
  '/static/css/main.css', // adjust CSS path if any
  // Add other assets your game page needs, e.g., images/fonts
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
