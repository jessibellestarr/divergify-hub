self.addEventListener('install', e=>{
  e.waitUntil(caches.open('divergify-v1').then(c=>c.addAll(['/','/index.html','/css/styles.css','/js/app.js','/js/confetti.js','/manifest.json'])));
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(res=> res || fetch(e.request))
  );
});
