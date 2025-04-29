/**
 * Theme switching functionality for BPO Management System
 */

document.addEventListener("DOMContentLoaded", function () {
    // Theme handling
    const initTheme = () => {
        // Check stored theme preference or use dark by default
        const storedTheme = localStorage.getItem("theme") || "dark";

        // Apply the theme
        applyTheme(storedTheme);

        // Set the correct radio button in settings if on settings page
        if (document.querySelector('input[name="themeMode"]')) {
            const themeRadio = document.querySelector(
                `input[name="themeMode"][value="${storedTheme}"]`
            );
            if (themeRadio) {
                themeRadio.checked = true;
            }
        }

        // Set the toggle on dashboard if on dashboard page
        const darkModeToggle = document.getElementById("darkModeToggle");
        if (darkModeToggle) {
            darkModeToggle.checked = storedTheme === "dark";

            // Add event listener to the toggle
            darkModeToggle.addEventListener("change", function () {
                const newTheme = this.checked ? "dark" : "light";
                applyTheme(newTheme);
                localStorage.setItem("theme", newTheme);
            });
        }
    };

    // Apply theme to body
    const applyTheme = (theme) => {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    };

    // Settings page theme controls
    const setupSettingsControls = () => {
        const themeRadios = document.querySelectorAll(
            'input[name="themeMode"]'
        );
        const applyThemeBtn = document.querySelector(
            "#appearance button.btn-primary"
        );

        if (themeRadios.length > 0 && applyThemeBtn) {
            applyThemeBtn.addEventListener("click", function () {
                const selectedTheme = document.querySelector(
                    'input[name="themeMode"]:checked'
                ).value;

                // Apply the theme
                applyTheme(selectedTheme);

                // Save to localStorage
                localStorage.setItem("theme", selectedTheme);

                // Show confirmation
                showThemeConfirmation();
            });
        }
    };

    // Show confirmation message
    const showThemeConfirmation = () => {
        // Create confirmation element
        const confirmElement = document.createElement("div");
        confirmElement.className = "alert alert-success mt-3";
        confirmElement.textContent = "Theme settings saved successfully!";

        // Add to the appearance tab
        const appearanceTab = document.getElementById("appearance");
        if (appearanceTab) {
            appearanceTab
                .querySelector(".card-body")
                .appendChild(confirmElement);

            // Remove after 3 seconds
            setTimeout(() => {
                confirmElement.remove();
            }, 3000);
        }
    };

    // Initialize theme
    initTheme();

    // Setup settings controls if on settings page
    if (window.location.pathname.includes("/settings/")) {
        setupSettingsControls();
    }
});
