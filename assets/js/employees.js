document.addEventListener("DOMContentLoaded", function () {
    // Save employee button
    const saveEmployeeBtn = document.getElementById("saveEmployeeBtn");
    if (saveEmployeeBtn) {
        saveEmployeeBtn.addEventListener("click", function () {
            const form = document.getElementById("addEmployeeForm");

            if (form.checkValidity()) {
                // Collect form data
                const employeeData = {
                    firstName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    email: document.getElementById("email").value,
                    phone: document.getElementById("phone").value,
                    department: document.getElementById("department").value,
                    position: document.getElementById("position").value,
                    joinDate: document.getElementById("joinDate").value,
                    status: document.getElementById("status").value,
                    skills: document
                        .getElementById("skills")
                        .value.split(",")
                        .map((skill) => skill.trim()),
                    notes: document.getElementById("notes").value,
                };

                // In a real app, this would send the data to a server
                console.log("Employee data:", employeeData);

                // For demo: just close the modal and show a message
                const modal = bootstrap.Modal.getInstance(
                    document.getElementById("addEmployeeModal")
                );
                modal.hide();

                alert("Employee saved successfully!");

                // Optionally, reload the page or update the employees table
                // location.reload();
            } else {
                form.reportValidity();
            }
        });
    }

    // Filter button functionality
    const filterButton = document.getElementById("filterButton");
    if (filterButton) {
        filterButton.addEventListener("click", function () {
            const department = document
                .getElementById("departmentFilter")
                .value.toLowerCase();
            const status = document
                .getElementById("statusFilter")
                .value.toLowerCase();
            const search = document
                .getElementById("employeeSearch")
                .value.toLowerCase();

            // Filter the rows based on criteria
            const rows = document.querySelectorAll("#employeesTable tbody tr");

            rows.forEach((row) => {
                let visible = true;

                // Check department
                if (department) {
                    const departmentCell = row
                        .querySelector("td:nth-child(3)")
                        .textContent.toLowerCase();
                    if (!departmentCell.includes(department)) {
                        visible = false;
                    }
                }

                // Check status
                if (status && visible) {
                    const statusCell = row
                        .querySelector("td:nth-child(5) .badge")
                        .textContent.toLowerCase();
                    if (!statusCell.includes(status)) {
                        visible = false;
                    }
                }

                // Check search term
                if (search && visible) {
                    const rowText = row.textContent.toLowerCase();
                    if (!rowText.includes(search)) {
                        visible = false;
                    }
                }

                // Show or hide the row
                row.style.display = visible ? "" : "none";
            });
        });
    }

    // View employee details
    const viewButtons = document.querySelectorAll(
        '[data-bs-target="#viewEmployeeModal"]'
    );
    viewButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const employeeId = this.getAttribute("data-employee-id");

            // In a real app, you would fetch the employee details from a server
            // For demo, we'll just set the employee ID
            document.getElementById("viewEmployeeId").textContent = employeeId;

            // The rest would be populated with real data in a complete app
            // This is just for demo purposes
            const row = this.closest("tr");
            if (row) {
                const nameEmail = row.querySelector("td:nth-child(2)");
                const name = nameEmail.querySelector("div > div").textContent;
                const email = nameEmail.querySelector("small").textContent;
                const department =
                    row.querySelector("td:nth-child(3)").textContent;
                const position =
                    row.querySelector("td:nth-child(4)").textContent;
                const status = row.querySelector(
                    "td:nth-child(5) .badge"
                ).textContent;

                document.getElementById("viewEmployeeName").textContent = name;
                document.getElementById("viewEmployeePosition").textContent =
                    position;
                document.getElementById("viewEmployeeDepartment").textContent =
                    department;
                document.getElementById("viewEmployeeEmail").textContent =
                    email;

                // Set the badge class
                const statusBadge =
                    document.getElementById("viewEmployeeStatus");
                statusBadge.textContent = status;

                if (status.toLowerCase() === "active") {
                    statusBadge.className = "badge bg-success";
                } else if (status.toLowerCase() === "on leave") {
                    statusBadge.className = "badge bg-warning";
                } else if (status.toLowerCase() === "inactive") {
                    statusBadge.className = "badge bg-danger";
                }
            }
        });
    });

    // Delete employee functionality (demo only)
    const deleteButtons = document.querySelectorAll(
        "#employeesTable .btn-outline-danger"
    );
    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            const nameElement = row.querySelector("td:nth-child(2) div > div");
            const name = nameElement
                ? nameElement.textContent
                : "this employee";

            if (confirm(`Are you sure you want to delete ${name}?`)) {
                // In a real app, you would send a delete request to the server
                // For demo, we'll just remove the row
                row.remove();

                // Update the total employees count
                const totalEmployeesElement = document.querySelector(
                    ".card.bg-primary .card-text"
                );
                if (totalEmployeesElement) {
                    const currentCount = parseInt(
                        totalEmployeesElement.textContent
                    );
                    totalEmployeesElement.textContent = currentCount - 1;
                }

                // Show a success message
                alert(`${name} has been deleted.`);
            }
        });
    });
});
