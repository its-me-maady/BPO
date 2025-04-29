document.addEventListener("DOMContentLoaded", function () {
    // Handle category change in the Add Item form
    const itemCategory = document.getElementById("itemCategory");
    const stockFieldContainer = document.getElementById("stockFieldContainer");

    if (itemCategory && stockFieldContainer) {
        itemCategory.addEventListener("change", function () {
            // Hide stock field for services
            if (this.value === "services") {
                stockFieldContainer.style.display = "none";
            } else {
                stockFieldContainer.style.display = "block";
            }
        });
    }

    // Save item button functionality
    const saveItemBtn = document.getElementById("saveItemBtn");
    if (saveItemBtn) {
        saveItemBtn.addEventListener("click", function () {
            const form = document.getElementById("addItemForm");

            if (form.checkValidity()) {
                // Collect form data
                const itemData = {
                    name: document.getElementById("itemName").value,
                    category: document.getElementById("itemCategory").value,
                    stock:
                        document.getElementById("itemCategory").value ===
                        "services"
                            ? "N/A"
                            : document.getElementById("itemStock").value,
                    price: parseFloat(
                        document.getElementById("itemPrice").value
                    ),
                    description:
                        document.getElementById("itemDescription").value,
                    reorderLevel: parseInt(
                        document.getElementById("reorderLevel").value
                    ),
                };

                // In a real app, this would send the data to a server
                console.log("Item data:", itemData);

                // For demo: just close the modal and show a message
                const modal = bootstrap.Modal.getInstance(
                    document.getElementById("addItemModal")
                );
                modal.hide();

                alert("Item saved successfully!");

                // Optionally, reload the page or update the inventory table
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
            const category = document
                .getElementById("categoryFilter")
                .value.toLowerCase();
            const stockStatus = document
                .getElementById("stockFilter")
                .value.toLowerCase();
            const search = document
                .getElementById("inventorySearch")
                .value.toLowerCase();

            // Filter the rows based on criteria
            const rows = document.querySelectorAll("#inventoryTable tbody tr");

            rows.forEach((row) => {
                let visible = true;

                // Check category
                if (category) {
                    const categoryCell = row
                        .querySelector("td:nth-child(3)")
                        .textContent.toLowerCase();
                    if (categoryCell !== category) {
                        visible = false;
                    }
                }

                // Check stock status
                if (stockStatus && visible) {
                    const statusCell = row
                        .querySelector("td:nth-child(6) .badge")
                        .textContent.toLowerCase();

                    if (
                        stockStatus === "instock" &&
                        statusCell !== "in stock"
                    ) {
                        visible = false;
                    } else if (
                        stockStatus === "lowstock" &&
                        statusCell !== "low stock"
                    ) {
                        visible = false;
                    } else if (
                        stockStatus === "outofstock" &&
                        statusCell !== "out of stock"
                    ) {
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

    // View item details
    const viewButtons = document.querySelectorAll(
        '[data-bs-target="#viewItemModal"]'
    );
    viewButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const itemId = this.getAttribute("data-item-id");

            // In a real app, you would fetch the item details from a server
            // For demo, we'll just set the item ID
            document.getElementById("viewItemId").textContent = itemId;

            // The rest would be populated with real data in a complete app
            // This is just for demo purposes
            const row = this.closest("tr");
            if (row) {
                const name = row.querySelector("td:nth-child(2)").textContent;
                const category =
                    row.querySelector("td:nth-child(3)").textContent;
                const stock = row.querySelector("td:nth-child(4)").textContent;
                const price = row.querySelector("td:nth-child(5)").textContent;
                const status = row.querySelector(
                    "td:nth-child(6) .badge"
                ).textContent;

                document.getElementById("viewItemName").textContent = name;
                document.getElementById("viewItemCategory").textContent =
                    category;
                document.getElementById("viewItemStock").textContent = stock;
                document.getElementById("viewItemPrice").textContent = price;
                document.getElementById("viewItemStatus").textContent = status;

                // Set the badge class
                const statusBadge = document.getElementById("viewItemStatus");
                if (status.toLowerCase().includes("in stock")) {
                    statusBadge.className = "badge bg-success";
                } else if (status.toLowerCase().includes("low stock")) {
                    statusBadge.className = "badge bg-warning";
                } else if (status.toLowerCase().includes("out of stock")) {
                    statusBadge.className = "badge bg-danger";
                } else if (status.toLowerCase().includes("service")) {
                    statusBadge.className = "badge bg-info";
                }
            }
        });
    });

    // Delete item functionality (demo only)
    const deleteButtons = document.querySelectorAll(
        "#inventoryTable .btn-outline-danger"
    );
    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const row = this.closest("tr");
            const itemName = row.querySelector("td:nth-child(2)").textContent;

            if (confirm(`Are you sure you want to delete ${itemName}?`)) {
                // In a real app, you would send a delete request to the server
                // For demo, we'll just remove the row
                row.remove();

                // Update the total items count
                const totalItemsElement = document.querySelector(
                    ".card.bg-primary .card-text"
                );
                if (totalItemsElement) {
                    const currentCount = parseInt(
                        totalItemsElement.textContent
                    );
                    totalItemsElement.textContent = currentCount - 1;
                }

                // Show a success message
                alert(`${itemName} has been deleted.`);
            }
        });
    });
});
