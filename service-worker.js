
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('osterjagd-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/scripts/game.js',
        '/manifest.json'
      ]);
    })
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
