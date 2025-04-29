document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Sample user credentials (in a real app, this would be handled securely on a server)
    const validCredentials = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "user", password: "user123", role: "user" },
    ];

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Basic authentication
            const user = validCredentials.find(
                (user) =>
                    user.username === username && user.password === password
            );

            if (user) {
                // Store user info in session storage
                sessionStorage.setItem(
                    "currentUser",
                    JSON.stringify({
                        username: user.username,
                        role: user.role,
                        isLoggedIn: true,
                    })
                );

                // Redirect to dashboard - fixed path to avoid duplication
                window.location.href = "/pages/dashboard/index.html";
            } else {
                alert("Invalid username or password");
            }
        });
    }

    // Check if user is already logged in
    const checkAuthStatus = () => {
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        // If on login page but already logged in, redirect to dashboard
        if (
            currentUser &&
            currentUser.isLoggedIn &&
            (window.location.pathname === "/" ||
                window.location.pathname === "/index.html")
        ) {
            window.location.href = "/pages/dashboard/index.html";
        }

        // If trying to access protected pages without login, redirect to login
        if (
            (!currentUser || !currentUser.isLoggedIn) &&
            !window.location.pathname.includes("index.html")
        ) {
            window.location.href = "/index.html";
        }
    };

    // Logout function
    window.logout = () => {
        sessionStorage.removeItem("currentUser");
        window.location.href = "/index.html";
    };

    // Check auth status on page load
    checkAuthStatus();
});
