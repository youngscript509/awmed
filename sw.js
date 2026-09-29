const V='awmed-v5',CORE=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
if(u.hostname.includes('firestore.googleapis.com')||u.hostname.includes('googleapis.com')&&!u.hostname.includes('fonts'))return;
e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res&&res.status===200){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit||caches.match('./index.html'));return hit||net}))});
