window.addEventListener("DOMContentLoaded", async event => {
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
  
  document.querySelector("#register").addEventListener("click", register);
  document.querySelector("#unregister").addEventListener("click", unregister);
  
});

async function register(event) {
  if ('serviceWorker' in navigator) {
    try {
      // Change the service worker URL to see what happens when the SW doesn't exist
      const registration = await navigator.serviceWorker.register("sw.js");
      showResult("Service worker registered");
       
    } catch (error) {
      showResult("Service worker not registered. " + error.message);
    }    
  } else {
      showResult("Service workers API not available");
  }
}; 

async function unregister(event)  {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const result = registration.unregister();
        showResult(result ? "Service worker unregistered" : "Service worker couldn't be unregistered");
      } else {
        showResult("There is no service worker to unregister");
      }
       
    } catch (error) {
      showResult("Service worker not unregistered. " + error.message);
    }    
  } else {
      showResult("Service workers API not available");
  }
};

function showResult(text) {
  document.querySelector("output").innerHTML = text;
}