// Update cart product
function updateCart(button) {
    var productCard = button.closest('.detail-card'); 
    var productName = productCard.querySelector(".detail-name h4").textContent;
    var productPrice = productCard.querySelector(".price").textContent;
    var priceValue = parseFloat(productPrice.replace("$", ""));
    var productImage = productCard.querySelector(".detail-img").src;
    var subtotalElements = document.querySelectorAll('.subtotal');
    var cartTable = document.getElementById("cart-table");
    var newRow = document.createElement("tr");

    newRow.innerHTML = `
    <td>
        <div class="cart-info">
            <img src="${productImage}" alt="${productName}">
            <div>
                <p>${productName}</p>
                <small class="product-price" data-price="${priceValue}">
                    Price: ${productPrice}
                </small>
                <a href="" class="remove-link" onclick="removeProductRow(this)">Remove</a>
            </div>
        </div>
    </td>
    <td>
        <input type="number" value="1" min="1" onchange="updateTotalPrice(this)">
    </td>
    <td>$<label class="total-price subtotal">${priceValue}</label></td>
`;


    // Add newRow to cartTable
    cartTable.appendChild(newRow);
}

// Remove product row from cart list
function removeProductRow(link) {
    var row = link.closest('tr');
    row.parentNode.removeChild(row);
}

function updateTotalPrice(input) {
    var row = input.closest('tr');
    var price = parseFloat(row.querySelector('.product-price').getAttribute('data-price'));
    var quantity = parseInt(input.value);
    var subtotal = price * quantity;
    var subtotalElement = row.querySelector('.total-price');
    subtotalElement.textContent = '$' + subtotal.toFixed(2);

    updateGrandTotal();
}

function updateGrandTotal() {
    var subtotalElements = document.querySelectorAll('.subtotal');

    var total = 0;

    for (var i = 0; i < subtotalElements.length; i++) {
        var subtotalValue = parseFloat(subtotalElements[i].textContent.replace('$', ''));
        total += subtotalValue;
    }

    var totalElement = document.getElementById('total');
    totalElement.textContent = '$' + total.toFixed(2);
}
