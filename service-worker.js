
self.addEventListener('install', e => {
  e.waitUntil(caches.open('osterjagd-v1').then(cache =>
    cache.addAll(['./', './index.html', './scripts/game.js', './style.css', './manifest.json'])
  ));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
