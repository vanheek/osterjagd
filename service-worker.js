self.addEventListener('install', e => {
  e.waitUntil(caches.open('osterjagd-cache').then(cache =>
    cache.addAll(['./', './index.html', './style.css', './scripts/game.js', './manifest.json'])
  ));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});