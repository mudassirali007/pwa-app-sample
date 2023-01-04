console.log("Hello, this message is sent by a service worker");

// This code executes in its own worker or thread
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

const urlsToCache = ["./", "dummy.css", "dummy.html", "dummy.json", "favicon.ico"]
     
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

self.addEventListener("fetch", event => {
    console.log(`URL requested: ${event.request.url}`);
    const urlOrRequest = event.request.url
    // Cache-specific search
    caches.open("Learn-PWA").then(cache => {
        cache.match(urlOrRequest).then(cachedResponse  => {
          console.log(cachedResponse  ? cachedResponse  : `${urlOrRequest} not in the cache`);
        })
      });

      event.respondWith(
        caches.match(event.request).then(async cachedResponse => {
            const networkFetch = await fetch(event.request).then(response => {
              // update the cache with a clone of the network response
              caches.open("Learn-PWA").then(cache => {
                  cache.put(event.request, response.clone());
              });
            });
            // prioritize cached response over network
            console.log(`Respond With: ${cachedResponse} and ${networkFetch}`)
            return cachedResponse || networkFetch;
        }
      )
     )

});