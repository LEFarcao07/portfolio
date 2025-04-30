const CACHE_NAME = 'portfolio-cache-v1';
const OFFLINE_URL = '/offline/index.html';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/script.js',
  '/offline/index.html',
  '/offline/script.js',
  'https://cdn.tailwindcss.com' // CDN Tailwind
];

// Cache resources saat install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktifkan dan bersihkan cache lama jika ada
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch handler - jika offline, arahkan ke offline page
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
