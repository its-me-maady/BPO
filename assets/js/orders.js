document.addEventListener("DOMContentLoaded", function () {
    // Sample inventory items (in a real app, this would come from a database)
    const inventoryItems = [
        { id: "item1", name: "Product A", price: 250.0 },
        { id: "item2", name: "Service B", price: 750.0 },
        { id: "item3", name: "Product C", price: 125.5 },
        { id: "item4", name: "Service D", price: 499.99 },
        { id: "item5", name: "Product E", price: 50.0 },
    ];

    // Handle add item button click
    const addItemBtn = document.getElementById("addItemBtn");
    if (addItemBtn) {
        addItemBtn.addEventListener("click", function () {
            const orderItemsContainer = document.getElementById("orderItems");
            const itemTemplate = orderItemsContainer
                .querySelector(".order-item")
                .cloneNode(true);

            // Reset values
            const selects = itemTemplate.querySelectorAll("select");
            selects.forEach((select) => (select.selectedIndex = 0));

            const inputs = itemTemplate.querySelectorAll("input");
            inputs.forEach((input) => {
                if (
                    input.type === "number" &&
                    input.classList.contains("item-qty")
                ) {
                    input.value = 1;
                } else {
                    input.value = "";
                }
            });

            // Add event listener to remove button
            const removeBtn = itemTemplate.querySelector(".remove-item");
            removeBtn.addEventListener("click", function () {
                this.closest(".order-item").remove();
                updateTotal();
            });

            // Add event listeners to update price when item is selected
            const itemSelect = itemTemplate.querySelector(".item-select");
            itemSelect.addEventListener("change", function () {
                const selectedItem = inventoryItems.find(
                    (item) => item.id === this.value
                );
                if (selectedItem) {
                    const priceInput =
                        this.closest(".order-item").querySelector(
                            ".item-price"
                        );
                    priceInput.value = selectedItem.price.toFixed(2);
                    updateTotal();
                }
            });

            // Add event listeners to quantity inputs
            const qtyInput = itemTemplate.querySelector(".item-qty");
            qtyInput.addEventListener("change", updateTotal);

            orderItemsContainer.appendChild(itemTemplate);
        });
    }

    // Add event listeners to existing remove buttons
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Make sure we always have at least one item row
            const orderItems = document.querySelectorAll(".order-item");
            if (orderItems.length > 1) {
                this.closest(".order-item").remove();
                updateTotal();
            } else {
                // Reset values instead of removing
                const row = this.closest(".order-item");
                const selects = row.querySelectorAll("select");
                selects.forEach((select) => (select.selectedIndex = 0));

                const inputs = row.querySelectorAll("input");
                inputs.forEach((input) => {
                    if (
                        input.type === "number" &&
                        input.classList.contains("item-qty")
                    ) {
                        input.value = 1;
                    } else {
                        input.value = "";
                    }
                });
                updateTotal();
            }
        });
    });

    // Add event listeners to existing item selects
    const itemSelects = document.querySelectorAll(".item-select");
    itemSelects.forEach((select) => {
        select.addEventListener("change", function () {
            const selectedItem = inventoryItems.find(
                (item) => item.id === this.value
            );
            if (selectedItem) {
                const priceInput =
                    this.closest(".order-item").querySelector(".item-price");
                priceInput.value = selectedItem.price.toFixed(2);
                updateTotal();
            }
        });
    });

    // Add event listeners to existing quantity inputs
    const qtyInputs = document.querySelectorAll(".item-qty");
    qtyInputs.forEach((input) => {
        input.addEventListener("change", updateTotal);
    });

    // Function to update order total
    function updateTotal() {
        let total = 0;
        const orderItems = document.querySelectorAll(".order-item");

        orderItems.forEach((item) => {
            const qty = parseInt(item.querySelector(".item-qty").value) || 0;
            const price =
                parseFloat(item.querySelector(".item-price").value) || 0;
            total += qty * price;
        });

        // If we had a total element to update
        const totalElement = document.getElementById("orderTotal");
        if (totalElement) {
            totalElement.textContent = "$" + total.toFixed(2);
        }
    }

    // Save order button
    const saveOrderBtn = document.getElementById("saveOrderBtn");
    if (saveOrderBtn) {
        saveOrderBtn.addEventListener("click", function () {
            // In a real app, this would send the data to a server
            const form = document.getElementById("addOrderForm");

            if (form.checkValidity()) {
                // Collect form data
                const orderData = {
                    clientName: document.getElementById("clientName").value,
                    orderDate: document.getElementById("orderDate").value,
                    status: document.getElementById("status").value,
                    assignedTo: document.getElementById("assignedTo").value,
                    notes: document.getElementById("notes").value,
                    items: [],
                };

                // Collect items
                const orderItems = document.querySelectorAll(".order-item");
                orderItems.forEach((item) => {
                    const itemSelect = item.querySelector(".item-select");
                    const itemQty = item.querySelector(".item-qty");
                    const itemPrice = item.querySelector(".item-price");

                    if (itemSelect.value) {
                        const selectedItem = inventoryItems.find(
                            (inv) => inv.id === itemSelect.value
                        );
                        orderData.items.push({
                            id: itemSelect.value,
                            name: selectedItem ? selectedItem.name : "",
                            qty: parseInt(itemQty.value) || 1,
                            price: parseFloat(itemPrice.value) || 0,
                        });
                    }
                });

                // In a real app, this would send the data to a server
                console.log("Order data:", orderData);

                // For demo: just close the modal and show a message
                const modal = bootstrap.Modal.getInstance(
                    document.getElementById("addOrderModal")
                );
                modal.hide();

                alert("Order saved successfully!");

                // Optionally, reload the page or update the orders table
                // location.reload();
            } else {
                form.reportValidity();
            }
        });
    }

    // Filter button
    const filterButton = document.getElementById("filterButton");
    if (filterButton) {
        filterButton.addEventListener("click", function () {
            const status = document.getElementById("statusFilter").value;
            const date = document.getElementById("dateFilter").value;
            const search = document
                .getElementById("orderSearch")
                .value.toLowerCase();

            // Filter the rows based on criteria
            const rows = document.querySelectorAll("#ordersTable tbody tr");

            rows.forEach((row) => {
                let visible = true;

                // Check status
                if (status) {
                    const statusCell = row.querySelector(
                        "td:nth-child(3) .badge"
                    );
                    if (
                        !statusCell.textContent
                            .toLowerCase()
                            .includes(status.toLowerCase())
                    ) {
                        visible = false;
                    }
                }

                // Check date (simplified for demo)
                if (date && visible) {
                    // This is just a simple demo filter based on the options
                    // In a real app, you would compare actual dates
                    const dateCell =
                        row.querySelector("td:nth-child(4)").textContent;

                    if (date === "today" && !dateCell.includes("Aug 29")) {
                        visible = false;
                    } else if (date === "week" && !dateCell.includes("Aug")) {
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

    // View order details
    const viewButtons = document.querySelectorAll(
        '[data-bs-target="#viewOrderModal"]'
    );
    viewButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const orderId = this.getAttribute("data-order-id");

            // In a real app, you would fetch the order details from a server
            // For demo, we'll use static data
            document.getElementById("viewOrderId").textContent = "#" + orderId;

            // The rest would be populated with real data in a complete app
        });
    });
});
