// ShishuDose BD - Production Service Worker
// Grounded in WHO IMCI, DGDA & ICDDR,B Offline Protocols
const CACHE_NAME = 'shishudose-cache-v3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
  '/screenshot-narrow.png',
  '/screenshot-wide.png'
];

// Install Event - Precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ShishuDose SW] Precaching core assets for offline usage');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up previous caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ShishuDose SW] Purging old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Offline First Strategy with Network Fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const fallback = await caches.match('/index.html');
          return fallback || new Response('Offline - ShishuDose BD', { headers: { 'Content-Type': 'text/html' } });
        })
    );
    return;
  }

  // Static assets (CSS, JS, Fonts, Images)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return networkResponse;
      });
    })
  );
});

// Background Sync capability
self.addEventListener('sync', (event) => {
  console.log('[ShishuDose SW] Background sync event:', event.tag);
});

// Periodic Background Sync capability
self.addEventListener('periodicsync', (event) => {
  console.log('[ShishuDose SW] Periodic sync event:', event.tag);
});

// Push notification capability
self.addEventListener('push', (event) => {
  const text = event.data ? event.data.text() : 'ShishuDose BD Protocol Update';
  event.waitUntil(
    self.registration.showNotification('ShishuDose BD', {
      body: text,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png'
    })
  );
});

// Listen for skip waiting messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
