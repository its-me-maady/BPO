document.addEventListener("DOMContentLoaded", function () {
    // Get user data from session storage
    const userElement = document.getElementById("username");
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (currentUser && userElement) {
        userElement.textContent = currentUser.username;

        // Set profile data based on user role
        setProfileData(currentUser.role);
    }

    // Handle Edit Profile button
    const editProfileBtn = document.getElementById("editProfileBtn");
    const saveProfileBtn = document.getElementById("saveProfileBtn");
    const cancelEditBtn = document.getElementById("cancelEditBtn");

    if (editProfileBtn) {
        editProfileBtn.addEventListener("click", function () {
            // Enable form fields
            toggleFormFields(true);

            // Show save/cancel buttons
            saveProfileBtn.style.display = "block";
            cancelEditBtn.style.display = "block";
            editProfileBtn.style.display = "none";
        });
    }

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener("click", function () {
            // Save profile logic would go here
            // For demo purposes, we'll just disable the form

            // Update profile info with form values
            updateProfileInfo();

            // Disable form fields
            toggleFormFields(false);

            // Hide save/cancel buttons
            saveProfileBtn.style.display = "none";
            cancelEditBtn.style.display = "none";
            editProfileBtn.style.display = "block";

            // Show success message
            alert("Profile updated successfully!");
        });
    }

    if (cancelEditBtn) {
        cancelEditBtn.addEventListener("click", function () {
            // Reset form to original values
            resetFormValues();

            // Disable form fields
            toggleFormFields(false);

            // Hide save/cancel buttons
            saveProfileBtn.style.display = "none";
            cancelEditBtn.style.display = "none";
            editProfileBtn.style.display = "block";
        });
    }

    // Handle Change Password button
    const changePasswordBtn = document.getElementById("changePasswordBtn");
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener("click", function () {
            const currentPassword =
                document.getElementById("currentPassword").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword =
                document.getElementById("confirmPassword").value;

            // Simple validation
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert("Please fill in all password fields");
                return;
            }

            if (newPassword !== confirmPassword) {
                alert("New password and confirmation do not match");
                return;
            }

            // In a real app, this would verify the current password and update to the new one

            // For demo purposes, show success and clear form
            alert("Password changed successfully!");
            document.getElementById("securityForm").reset();
        });
    }

    // Handle Save Notification Preferences button
    const saveNotificationsBtn = document.getElementById(
        "saveNotificationsBtn"
    );
    if (saveNotificationsBtn) {
        saveNotificationsBtn.addEventListener("click", function () {
            // In a real app, this would save the notification preferences
            // For demo purposes, show a success message
            alert("Notification preferences saved!");
        });
    }

    // Helper function to toggle form fields
    function toggleFormFields(enable) {
        const formFields = document.querySelectorAll(
            "#profileForm input, #profileForm textarea"
        );

        formFields.forEach((field) => {
            field.disabled = !enable;
        });
    }

    // Helper function to update profile info
    function updateProfileInfo() {
        // Update profile display with form values
        document.getElementById("profileName").textContent =
            document.getElementById("firstName").value +
            " " +
            document.getElementById("lastName").value;

        document.getElementById("profilePosition").textContent =
            document.getElementById("position").value;

        document.getElementById("profileEmail").textContent =
            document.getElementById("email").value;

        document.getElementById("profilePhone").textContent =
            document.getElementById("phone").value;
    }

    // Helper function to reset form values
    function resetFormValues() {
        // In a real app, this would reset to values from the database
        // For this demo, we'll just use the initial values
        document.getElementById("firstName").value = "John";
        document.getElementById("lastName").value = "Doe";
        document.getElementById("email").value = "john.doe@example.com";
        document.getElementById("phone").value = "(555) 123-4567";
        document.getElementById("department").value = "Operations";
        document.getElementById("position").value = "Manager";
        document.getElementById("bio").value =
            "Experienced operations manager with 5+ years in the BPO industry. Specializing in process optimization and team leadership.";
    }

    // Helper function to set profile data based on user role
    function setProfileData(role) {
        if (role === "admin") {
            document.getElementById("firstName").value = "Admin";
            document.getElementById("lastName").value = "User";
            document.getElementById("email").value = "admin@example.com";
            document.getElementById("position").value = "System Administrator";

            document.getElementById("profileName").textContent = "Admin User";
            document.getElementById("profilePosition").textContent =
                "System Administrator";
            document.getElementById("profileEmail").textContent =
                "admin@example.com";
        } else {
            // Default user data is already set in the HTML
        }
    }
});
