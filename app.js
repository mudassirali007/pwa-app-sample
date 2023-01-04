window.addEventListener("DOMContentLoaded", async event => {
  checkRegistration();
  
  document.querySelector("#register").addEventListener("click", register);
  document.querySelector("#unregister").addEventListener("click", unregister);

  document.querySelector("#single").addEventListener("click", cacheSingleFile);
  document.querySelector("#multiple").addEventListener("click", cacheMultipleFiles);
  document.querySelector("#delete").addEventListener("click", deleteCache);
  document.querySelector("#fetch").addEventListener("click", fetchCall);
  
});

// Check a service worker registration status
async function checkRegistration() {
  if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        showResult("Service worker was registered on page load")
      } else {
        showResult("No service worker is currently registered")
      }
  } else {
      showResult("Service workers API not available");
  }
}

// Registers a service worker
async function register() {
  if ('serviceWorker' in navigator) {
    try {
      // Change the service worker URL to see what happens when the SW doesn't exist
      const registration = await navigator.serviceWorker.register("sw.js");
      showResult(registration ? "Service worker registered" : "Service worker couldn't be registered");
       
    } catch (error) {
      showResult("Error while registering: " + error.message);
    }    
  } else {
      showResult("Service workers API not available");
  }
}; 

// Unregister a currently registered service worker
async function unregister()  {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const result = await registration.unregister();
        showResult(result ? "Service worker unregistered" : "Service worker couldn't be unregistered");
      } else {
        showResult("There is no service worker to unregister");
      }
       
    } catch (error) {
      showResult("Error while unregistering: " + error.message);
    }    
  } else {
      showResult("Service workers API not available");
  }
};

function showResult(text) {
  document.querySelector("output").innerHTML = text;
}


//Cache

// Add one URL to the cache
async function cacheSingleFile() {
  const cacheName = document.querySelector("#cacheName").value;
  if ('caches' in window) {
    try {
      const cache = await caches.open(cacheName);
      await cache.add("dummy.json")
      showResult("dummy.json was cached on " + cacheName);

    } catch (error) {
      showResult("Error while caching a single file");
    }    
  } else {
      showResult("Cache Storage not available");
  }
}; 

// Add multuple URL to the cache
async function cacheMultipleFiles() {
  const cacheName = document.querySelector("#cacheName").value;
  if ('caches' in window) {
    try {
      const cache = await caches.open(cacheName);
      const urlsToCache = ["./", "dummy.css", "dummy.html", "dummy.json"]
      await cache.addAll(urlsToCache);
      showResult(urlsToCache.length + " files were cached on " + cacheName);
      
    } catch (error) {
      showResult("Error while caching multiple files. " + error.message);
    }    
  } else {
      showResult("Cache Storage not available");
  }
}; 

async function deleteCache() {
   const cacheName = document.querySelector("#cacheName").value;
   if ('caches' in window) {
     await caches.delete(cacheName);
     showResult(cacheName + " cache was deleted");
   } else {
     showResult("Cache Storage not available");
   }
}


async function fetchCall() {
  fetch('https://dummyjson.com/products/1')
.then(res => res.json())
.then(json => console.log(json))
}