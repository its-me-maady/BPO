document.addEventListener("DOMContentLoaded", function () {
    // Dark mode toggle is now handled by theme.js

    // Display logged in user's name
    const usernameElement = document.getElementById("username");
    if (usernameElement) {
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (currentUser) {
            usernameElement.textContent = currentUser.username;
        }
    }

    // Simple data visualization (for a real app, this would use data from a backend)
    const setupCharts = () => {
        // This is a placeholder for potential chart functionality
        // In a real implementation, you might use Chart.js or similar libraries
        console.log("Charts functionality would be initialized here");
    };

    // Call chart setup if we're on the dashboard page
    if (window.location.pathname.includes("/dashboard/")) {
        setupCharts();
    }

    // Handle notifications (simulated)
    const showNotification = (message) => {
        // In a real app, this would show a toast notification
        console.log("Notification:", message);
    };

    // Simulate a notification after 5 seconds (just for demo purposes)
    setTimeout(() => {
        showNotification("You have 3 new orders waiting for processing");
    }, 5000);
});
