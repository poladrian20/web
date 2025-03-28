document.addEventListener('DOMContentLoaded', () => {
    const shopTableBody = document.getElementById('shop-table-body');
    const shopTable = document.getElementById('shop-table');
    const shopListView = document.getElementById('shop-list-view');
    const pendingBtn = document.getElementById('pending-btn');
    const approvedBtn = document.getElementById('approved-btn');
    const totalBtn = document.getElementById('total-btn');
    const addShopBtn = document.getElementById('add-shop-btn');
    const viewShopsBtn = document.getElementById('view-shops-btn');
    const addShopModal = document.getElementById('add-shop-modal');
    const closeAddModalBtn = document.getElementById('close-modal-btn');
    const addShopForm = document.getElementById('add-shop-form');
    const editShopModal = document.getElementById('edit-shop-modal');
    const closeEditModalBtn = document.getElementById('close-edit-modal-btn');
    const editShopForm = document.getElementById('edit-shop-form');
    const currentViewName = document.getElementById('current-view-name');

    // Sample shop data
    let shops = [
        { id: 1, name: "Kainan ni mangpeping", description: "Delicious meals delivered fast!", address: "28JG+M7J, De Venecia Hi-way Extension, Dagupan, 2400 Pangasinan", phone: "+1-555-987-6543", email: "mangpeping@email.com", hours: "Daily: 8 AM - 9 PM", status: "approved" },
        { id: 2, name: "Ciudad Elmina Restaurant", description: "Delicious meals delivered fast!", address: "28MV+PJQ, Road, Dagupan, Pangasinan", phone: "+1-555-123-4567", email: "ciudadelmina@email.com", hours: "Daily: 11 AM - 11 PM", status: "approved" },
        { id: 3, name: "Matutina-Gerry's Seafood House", description: "Delicious meals delivered fast!", address: "De Venecia Road, Dagupan City, Pangasinan", phone: "+1-555-789-1234", email: "matutina@email.com", hours: "Daily: 8 AM - 7:30 PM", status: "approved" }
    ];

    // Function to render table
    function renderTable(filter = 'all') {
        shopTable.classList.add('active');
        shopListView.classList.remove('active');
        shopTableBody.innerHTML = '';
        const filteredShops = filter === 'pending' ? shops.filter(shop => shop.status === 'pending') :
                             filter === 'approved' ? shops.filter(shop => shop.status === 'approved') :
                             shops;

        filteredShops.forEach((shop, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${shop.name}</td>
                <td>${shop.description}</td>
                <td>${shop.address}</td>
                <td>${shop.phone}</td>
                <td>${shop.email}</td>
                <td>${shop.hours}</td>
                <td><span class="status ${shop.status}">${shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}</span></td>
                <td>${shop.status === 'pending' ? `
                    <button class="approve-btn" onclick="approveShop(${index}, '${filter}')">Approve</button>
                    <button class="delete-btn" onclick="deleteShop(${index}, '${filter}')">Delete</button>
                ` : `<button class="delete-btn" onclick="deleteShop(${index}, '${filter}')">Delete</button>`}</td>
            `;
            shopTableBody.appendChild(row);
        });
    }

    // Function to render list view
    function renderListView() {
        shopTable.classList.remove('active');
        shopListView.classList.add('active');
        shopListView.innerHTML = '';
        shops.forEach((shop, index) => {
            const card = document.createElement('div');
            card.classList.add('shop-card');
            card.innerHTML = `
                <h3>${shop.name}</h3>
                <p><strong>Description:</strong> ${shop.description}</p>
                <p><strong>Address:</strong> ${shop.address}</p>
                <p><strong>Phone:</strong> ${shop.phone}</p>
                <p><strong>Email:</strong> ${shop.email}</p>
                <p><strong>Hours:</strong> ${shop.hours}</p>
                <p><strong>Status:</strong> <span class="status ${shop.status}">${shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}</span></p>
                <button class="edit-btn" onclick="openEditModal(${index})">Edit</button>
            `;
            shopListView.appendChild(card);
        });
    }

    // Initial render: Show "Total Shops" with active button and label
    renderTable('all'); // Render all shops
    setActiveButton(totalBtn, 'Total Shops'); // Set "Total Shops" button as active and update label

    // Filter button handlers
    pendingBtn.addEventListener('click', () => {
        renderTable('pending');
        setActiveButton(pendingBtn, 'Pending Shops');
    });

    approvedBtn.addEventListener('click', () => {
        renderTable('approved');
        setActiveButton(approvedBtn, 'Approved');
    });

    totalBtn.addEventListener('click', () => {
        renderTable('all');
        setActiveButton(totalBtn, 'Total Shops');
    });

    // View Shops button handler
    viewShopsBtn.addEventListener('click', () => {
        renderListView();
        setActiveButton(viewShopsBtn, 'View Shops');
    });

    // Set active button style and update current view label
    function setActiveButton(activeBtn, viewName) {
        [pendingBtn, approvedBtn, totalBtn, viewShopsBtn].forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
        currentViewName.textContent = viewName; // Update the label with the current tab name
    }

    // Approve shop
    window.approveShop = function(index, currentFilter) {
        shops[index].status = 'approved';
        if (shopTable.classList.contains('active')) {
            renderTable(currentFilter === 'pending' ? 'approved' : currentFilter);
            const activeBtn = document.querySelector('.filter-btn.active');
            const viewName = activeBtn.id === 'pending-btn' ? 'Approved' :
                             activeBtn.id === 'approved-btn' ? 'Approved' :
                             'Total Shops';
            currentViewName.textContent = viewName;
        } else {
            renderListView();
            currentViewName.textContent = 'View Shops';
        }
        alert('Shop approved!');
    };

    // Delete shop
    window.deleteShop = function(index, currentFilter) {
        shops.splice(index, 1);
        if (shopTable.classList.contains('active')) {
            renderTable(currentFilter);
            const activeBtn = document.querySelector('.filter-btn.active');
            const viewName = activeBtn.id === 'pending-btn' ? 'Pending Shops' :
                             activeBtn.id === 'approved-btn' ? 'Approved' :
                             'Total Shops';
            currentViewName.textContent = viewName;
        } else {
            renderListView();
            currentViewName.textContent = 'View Shops';
        }
        alert('Shop deleted!');
    };

    // Open Edit Modal
    window.openEditModal = function(index) {
        const shop = shops[index];
        document.getElementById('edit-shop-index').value = index;
        document.getElementById('edit-shop-name').value = shop.name;
        document.getElementById('edit-description').value = shop.description;
        document.getElementById('edit-address').value = shop.address;
        document.getElementById('edit-phone').value = shop.phone;
        document.getElementById('edit-email').value = shop.email;
        document.getElementById('edit-hours').value = shop.hours;
        editShopModal.style.display = 'block';
    };

    // Edit Shop Form Submission
    editShopForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const index = parseInt(document.getElementById('edit-shop-index').value);
        shops[index] = {
            ...shops[index],
            name: document.getElementById('edit-shop-name').value,
            description: document.getElementById('edit-description').value,
            address: document.getElementById('edit-address').value,
            phone: document.getElementById('edit-phone').value,
            email: document.getElementById('edit-email').value,
            hours: document.getElementById('edit-hours').value
        };
        if (shopTable.classList.contains('active')) {
            renderTable(document.querySelector('.filter-btn.active').id.split('-')[0] || 'all');
            const activeBtn = document.querySelector('.filter-btn.active');
            const viewName = activeBtn.id === 'pending-btn' ? 'Pending Shops' :
                             activeBtn.id === 'approved-btn' ? 'Approved' :
                             'Total Shops';
            currentViewName.textContent = viewName;
        } else {
            renderListView();
            currentViewName.textContent = 'View Shops';
        }
        editShopModal.style.display = 'none';
        editShopForm.reset();
        alert('Shop details updated successfully!');
    });

    // Close Edit Modal
    closeEditModalBtn.addEventListener('click', () => {
        editShopModal.style.display = 'none';
        editShopForm.reset();
    });

    // Add Shop Modal handlers
    addShopBtn.addEventListener('click', () => {
        addShopModal.style.display = 'block';
    });

    closeAddModalBtn.addEventListener('click', () => {
        addShopModal.style.display = 'none';
        addShopForm.reset();
    });

    addShopForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newShop = {
            id: shops.length + 1,
            name: "John’s Kitchen",
            description: "Delicious meals delivered fast!",
            address: "456 Food St, Springfield",
            phone: "+1-555-987-6543",
            email: "johnskitchen@hungryme.com",
            hours: "Mon-Sat: 10 AM - 10 PM",
            status: "pending"
        };
        shops.push(newShop);
        if (shopTable.classList.contains('active')) {
            renderTable(document.querySelector('.filter-btn.active').id.split('-')[0] || 'all');
            const activeBtn = document.querySelector('.filter-btn.active');
            const viewName = activeBtn.id === 'pending-btn' ? 'Pending Shops' :
                             activeBtn.id === 'approved-btn' ? 'Approved' :
                             'Total Shops';
            currentViewName.textContent = viewName;
        } else {
            renderListView();
            currentViewName.textContent = 'View Shops';
        }
        addShopModal.style.display = 'none';
        addShopForm.reset();
        alert('Shop owner added successfully!');
    });

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === addShopModal) {
            addShopModal.style.display = 'none';
            addShopForm.reset();
        }
        if (e.target === editShopModal) {
            editShopModal.style.display = 'none';
            editShopForm.reset();
        }
    });

    // Profile dropdown toggle
    const profileIcon = document.getElementById('profile-icon');
    const profileDropdown = document.getElementById('profile-dropdown');
    profileIcon.addEventListener('click', () => {
        profileDropdown.style.display = profileDropdown.style.display === 'flex' ? 'none' : 'flex';
    });
});
        // Profile dropdown toggle
        document.getElementById('profile-icon').addEventListener('click', function() {
            const dropdown = document.getElementById('profile-dropdown');
            dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
        });

        // Notification dropdown toggle
        document.getElementById('notification-bell').addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = document.getElementById('notification-dropdown');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            const profileDropdown = document.getElementById('profile-dropdown');
            const notificationDropdown = document.getElementById('notification-dropdown');
            const profileIcon = document.getElementById('profile-icon');
            const notificationBell = document.getElementById('notification-bell');

            if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.style.display = 'none';
            }
            if (!notificationBell.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.style.display = 'none';
            }
        });
        document.addEventListener('DOMContentLoaded', () => {
            // Function to populate time dropdowns
            function populateTimeDropdowns(startSelectId, endSelectId) {
                const startSelect = document.getElementById(startSelectId);
                const endSelect = document.getElementById(endSelectId);
                const times = [
                    '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM',
                    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
                    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
                    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
                ];
        
                times.forEach(time => {
                    const optionStart = document.createElement('option');
                    optionStart.value = time;
                    optionStart.textContent = time;
                    startSelect.appendChild(optionStart);
        
                    const optionEnd = document.createElement('option');
                    optionEnd.value = time;
                    optionEnd.textContent = time;
                    endSelect.appendChild(optionEnd);
                });
            }
        
            // Populate time dropdowns for both modals
            populateTimeDropdowns('new-start-time', 'new-end-time');
            populateTimeDropdowns('edit-start-time', 'edit-end-time');
        
            // Handle Add Shop Form Submission
            const addShopForm = document.getElementById('add-shop-form');
            addShopForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const days = document.getElementById('new-days').value;
                const startTime = document.getElementById('new-start-time').value;
                const endTime = document.getElementById('new-end-time').value;
                const businessHours = `${days}: ${startTime} - ${endTime}`;
                
                // Here you would typically send this data to your backend
                console.log('New Shop Business Hours:', businessHours);
                
                // Add your logic to update the table or send to server
                addShopForm.reset();
                document.getElementById('add-shop-modal').style.display = 'none';
            });
        
            // Handle Edit Shop Form Submission
            const editShopForm = document.getElementById('edit-shop-form');
            editShopForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const days = document.getElementById('edit-days').value;
                const startTime = document.getElementById('edit-start-time').value;
                const endTime = document.getElementById('edit-end-time').value;
                const businessHours = `${days}: ${startTime} - ${endTime}`;
                
                // Here you would update the existing shop data
                console.log('Edited Shop Business Hours:', businessHours);
                
                editShopForm.reset();
                document.getElementById('edit-shop-modal').style.display = 'none';
            });
        
            // Modal handling (assuming this exists in your original JS)
            document.getElementById('add-shop-btn').addEventListener('click', () => {
                document.getElementById('add-shop-modal').style.display = 'block';
            });
        
            document.getElementById('close-modal-btn').addEventListener('click', () => {
                document.getElementById('add-shop-modal').style.display = 'none';
            });
        
            document.getElementById('close-edit-modal-btn').addEventListener('click', () => {
                document.getElementById('edit-shop-modal').style.display = 'none';
            });
        });