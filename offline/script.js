document.addEventListener("DOMContentLoaded", () => {
  const retryBtn = document.getElementById("retryBtn");

  retryBtn.addEventListener("click", () => {
    if (navigator.onLine) {
      window.location.href = "/";
    } else {
      alert("Masih offline. Periksa koneksi internet Anda.");
    }
  });

  // Redirect otomatis jika koneksi kembali
  window.addEventListener("online", () => {
    window.location.href = "/";
  });

  window.addEventListener("load", () => {
    if (!navigator.onLine) {
      window.location.href = "/offline/";
    }
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("SW registered:", reg.scope))
        .catch((err) => console.error("SW registration failed:", err));
    });
  }
});
