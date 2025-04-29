const CACHE_NAME = 'my-offline-app-v1';
const OFFLINE_URL = '../offline/offline.html';
const urlsToCache = [
  '../offline/',
  '../offline/index.html',
  '../offline/offline.html',
  '../offline/styles.css',
  '../offline/app.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
        })
    );
  });
  
  self.addEventListener('fetch', event => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
      return;
    }
  
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          return fetch(event.request).catch(() => {
            // If fetch fails (offline), return offline page
            return caches.match(OFFLINE_URL);
          });
        })
    );
  });
  
  self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });