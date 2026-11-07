// Offline-Speicher für den Flip 7 Punkteblock.
// Bei Änderungen an der App die Versionsnummer erhöhen, dann holen sich alle Geräte die neue Version.
const CACHE = 'flip7-v2';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('flip7-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Schriften: einmal laden, danach aus dem Speicher
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.open(CACHE).then(async c => {
        const hit = await c.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok || res.type === 'opaque') c.put(req, res.clone());
          return res;
        } catch (e) {
          return Response.error();
        }
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // App-Dateien: sofort aus dem Speicher, im Hintergrund aktualisieren
  event.respondWith(
    caches.open(CACHE).then(async c => {
      const key = req.mode === 'navigate' ? './index.html' : req;
      const hit = await c.match(key, { ignoreSearch: req.mode === 'navigate' });
      const net = fetch(req)
        .then(res => { if (res.ok) c.put(key, res.clone()); return res; })
        .catch(() => null);
      if (hit) { event.waitUntil(net); return hit; }
      const res = await net;
      return res || (await c.match('./index.html')) || Response.error();
    })
  );
});
