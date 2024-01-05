// 讀取並顯示訂單
function loadAndDisplayOrders() {
    fetch('js/order.json')  // 替換成您的 JSON 檔案路徑
        .then(response => response.json())
        .then(orders => {
            const ordersContainer = document.getElementById('ordersContainer'); // 訂單容器的 ID
            localStorage.setItem('orders', JSON.stringify(orders)); // save to local Storage
            ordersContainer.innerHTML = ''; // 清空現有內容

            orders.forEach(order => {
                const orderRow = document.createElement('tr');
                orderRow.innerHTML = `
                    <td>${order.time}</td>
                    <td>${order.items}</td>
                    <td>$${order.price}</td>
                    <td><span class="status ${order.status.toLowerCase().replace(/\s*/g,"")}">${order.status}</span></td>
                `;
                orderRow.addEventListener('click', function() {
                    showOrderDetails(order);
                });
                ordersContainer.appendChild(orderRow);
            });
        });
}

// 顯示訂單詳情
function showOrderDetails(order) {
    const modal = document.getElementById('orderDetailsModal');
    const content = document.getElementById('orderDetailsContent');
    const deliveryInfo = order.deliveryInfo;
    const statusButton = document.getElementById('changeStatusButton');

    content.innerHTML = `
        <strong>Time:</strong> ${order.time}<br>
        <strong>Items:</strong> ${order.items}<br>
        <strong>Price:</strong> $${order.price}<br>
        <strong>Status:</strong> ${order.status}<br>
        <strong>Customer Name:</strong> ${deliveryInfo.customerName}<br>
        <strong>Address:</strong> ${deliveryInfo.address}<br>
        <strong>Phone:</strong> ${deliveryInfo.phone}<br>
        <strong>Delivery Person:</strong> ${deliveryInfo.deliveryPerson}<br>
        <strong>Delivery Phone:</strong> ${deliveryInfo.deliveryPhone}
    `;

    if (order.status === 'Pending') {
        statusButton.style.display = 'block';
        statusButton.onclick = function() {
            changeOrderStatus(order.id, 'In Progress');
        };
    } else {
        statusButton.style.display = 'none';
    }

    modal.style.display = "block";


}

// close modal
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('orderDetailsModal').style.display = 'none';
});

function changeOrderStatus(orderId, newStatus) {
    // 從 localStorage 獲取訂單數據
    let orders = JSON.parse(localStorage.getItem('orders'));

    // 查找並更新相應的訂單狀態
    let order = orders.find(order => order.id === orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        displayOrders(orders); // 重新顯示更新後的訂單
    }
}

function displayOrders(orders) {
    const ordersContainer = document.getElementById('ordersContainer'); // 假設您有一個容器元素來顯示訂單
    ordersContainer.innerHTML = ''; // 清空先前的內容

    orders.forEach(order => {
        const orderRow = document.createElement('tr');
        orderRow.innerHTML = `
            <td>${order.time}</td>
            <td>${order.items}</td>
            <td>$${order.price}</td>
            <td>
                <span class="status ${order.status.toLowerCase().replace(/\s*/g,"")}"}">${order.status}</span>
            </td>
        `;
        orderRow.addEventListener('click', function() {
            showOrderDetails(order);
        });
        ordersContainer.appendChild(orderRow);
    });
}

window.onload = function () {
    // 在頁面加載時調用
    loadAndDisplayOrders();
};
