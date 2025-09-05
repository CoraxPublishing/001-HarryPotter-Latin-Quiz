// Register the service worker and show a tiny "Install app" button on Android
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.createElement("button");
  btn.textContent = "Install app";
  btn.style.cssText = `
    position:fixed; right:12px; bottom:12px; z-index:99999;
    background:#0a84ff; color:#fff; border:0; border-radius:10px;
    padding:10px 14px; font-family:Georgia,serif; font-size:14px; cursor:pointer;
    box-shadow:0 6px 16px rgba(0,0,0,.25);
  `;
  btn.addEventListener("click", async () => {
    btn.remove();
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });
  document.body.appendChild(btn);
});

// (iPhone/iPad users add manually: Share → Add to Home Screen)
