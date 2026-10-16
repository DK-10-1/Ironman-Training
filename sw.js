const V='t70-v3',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET'||new URL(q.url).origin!=self.location.origin)return;
if(q.mode=='navigate'){e.respondWith(fetch(q).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put('index.html',c));return x}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.open(V).then(c=>c.match(q).then(r=>{const n=fetch(q).then(x=>{c.put(q,x.clone());return x}).catch(()=>r);return r||n})))});
