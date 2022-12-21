console.log("Hello, this message is sent by a service worker");

// This code executes in its own worker or thread
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

const urlsToCache = ["./", "dummy.css", "dummy.html", "dummy.json"]
     
self.addEventListener("install", (event) => {
    console.log("Service worker installed",self);
        event.waitUntil(
            caches.open("Learn-PWA")
            .then(cache => {
                console.log('in caches')
               return cache.addAll(urlsToCache);
            })
         );

//    event.waitUntil(async () => {
//     console.log('in caches')
//       const cache = await caches.open("Learn-PWA");
//       return await cache.addAll(urlsToCache);
//    });
});