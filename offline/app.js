// Update connection status
function updateConnectionStatus() {
    const statusElement = document.getElementById('connection-status');
    if (navigator.onLine) {
        statusElement.textContent = 'Online';
        statusElement.style.color = '#27ae60';
    } else {
        statusElement.textContent = 'Offline';
        statusElement.style.color = '#e74c3c';
        // Redirect to offline page if offline
        window.location.href = '../offline/offline.html';
    }
}

// Initial check
updateConnectionStatus();

// Listen for connection changes
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);