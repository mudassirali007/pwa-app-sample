window.addEventListener("")

document.querySelector("#register").addEventListener("click", async event => {
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
});

document.querySelector("#unregister").addEventListener("click", async event => {
  if ('serviceWorker' in navigator) {
    try {
      // Change the service worker URL to see what happens when the SW doesn't exist
      const result = await navigator.serviceWorker.unregister("sw.js");
      showResult(result ? "Service worker unregistered" : "Service worker couldn't be unregistered");
       
    } catch (error) {
      showResult("Service worker not unregistered. " + error.message);
    }    
  } else {
      showResult("Service workers API not available");
  }
});

function showResult(text) {
  document.querySelector("output").innerHTML = text;
}