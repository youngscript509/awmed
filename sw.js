const V='awmed-v7',CORE=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='SKIP')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.protocol!=='http:'&&u.protocol!=='https:')return;
if(/googleapis\.com|firebaseio\.com|identitytoolkit|securetoken/.test(u.hostname)&&!/fonts/.test(u.hostname))return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put('./index.html',cp))}return res}).catch(()=>caches.match('./index.html').then(x=>x||caches.match('./'))));return}
e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.status===200||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit||Response.error());if(hit)e.waitUntil(net.catch(()=>{}));return hit||net}))});
