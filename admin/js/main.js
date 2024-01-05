
// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
    list.forEach((item) => {
        item.classList.remove("hovered");
    });
    this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("click", activeLink));


// get all page by container
const container = document.querySelector(".container");

container.addEventListener("click", function (event) {
    const toggle = event.target.closest(".toggle");
    if (toggle) {
        //  toggle click event navigation bar
        const navigation = document.querySelector(".navigation");
        const main = document.querySelector(".main");
        navigation.classList.toggle("active");
        main.classList.toggle("active");
    }
});

// get all pages
const pages = document.querySelectorAll(".page");

// get navigation href a
const navigationLinks = document.querySelectorAll(".navigation a");

// display home page（Dashboard page）
pages.forEach(page => (page.style.display = "none"));
document.getElementById("dashboardPage").style.display = "block";
document.getElementById("navDashboard").classList.add("hovered");


// switch page event listener
navigationLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetPageId = this.getAttribute("data-target");
        // hidden all page
        pages.forEach(page => (page.style.display = "none"));
        // display target page
        document.getElementById(targetPageId).style.display = "block";
    });
});


document.getElementById("viewAllButton").addEventListener("click", function(event) {
    // stop button default action
    event.preventDefault();
    // get data-target
    var targetPage = this.getAttribute("data-target");
    // get target link
    var targetLink = document.querySelector('a[data-target="' + targetPage + '"]');
    // if existing, click it
    if (targetLink) {
        targetLink.click();
    }
});


let menuItems = [];
let menuDataLoaded = false;

// create menu
if (!menuDataLoaded) {
    fetch('js/menu.json')
    .then(response => response.json())
    .then(data => {
        // 在这里处理菜单项数据
        menuItems = data;
        generateMenuItems(menuItems);
        menuDataLoaded = true;
    })
}

 function generateMenuItems(menuItems) {
  const menuContainer = document.querySelector(".menu-card");
  //clear current
  menuContainer.innerHTML = "";
  menuItems.forEach((menuItem) => {

    const menuCard = document.createElement("div");
    menuCard.classList.add("menu-item-card");
    menuCard.setAttribute("data-item-id", menuItem.id);

    const menuImage = document.createElement("img");
    menuImage.classList.add("menu-item-image");
    menuImage.src = menuItem.image;
    menuImage.alt = menuItem.name;

    const menuName = document.createElement("div");
    menuName.classList.add("menu-item-name");
    menuName.textContent = menuItem.name;

    const menuDescription = document.createElement("div");
    menuDescription.classList.add("menu-item-description");
    menuDescription.textContent = menuItem.description;

    const menuPrice = document.createElement("div");
    menuPrice.classList.add("menu-item-price");
    menuPrice.textContent = "$" + menuItem.price;

    const menuOptions = document.createElement("div");
    menuOptions.classList.add("menu-item-options");

    const editIcon = document.createElement("span");
    editIcon.classList.add("edit-icon");
    editIcon.textContent = "✏️";
    editIcon.addEventListener("click", () => openEditModal(menuItem.id));

    const deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.textContent = "🗑️";
    deleteIcon.addEventListener("click", () => deleteMenuItem(menuItem.id));

    menuOptions.appendChild(editIcon);
    menuOptions.appendChild(deleteIcon);

    menuCard.appendChild(menuImage);
    menuCard.appendChild(menuName);
    menuCard.appendChild(menuDescription);
    menuCard.appendChild(menuPrice);
    menuCard.appendChild(menuOptions);

    menuContainer.appendChild(menuCard);
  });
}
  

// edit menu
let currentItemToEdit = null;

document.getElementById("editForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("editName").value;
    const description = document.getElementById("editDescription").value;
    const price = document.getElementById("editPrice").value;

    const imageFile = document.getElementById("editImage").files[0];
    const menuItem = menuItems.find(item => item.id === currentItemToEdit);
    if (menuItem) {
        menuItem.name = name;
        menuItem.description = description;
        menuItem.price = price;
        if (imageFile) {
            convertToBase64(imageFile, function(base64String) {
                menuItem.image = base64String;
                saveMenuItemsToJson();  // Save changes
                closeModal();  // Close the modal
                localStorage.setItem("shouldRedirectToMenuPage", "true");
                window.location.reload();
            })
        }
        
    saveMenuItemsToJson();  // Save changes
    closeModal();  // Close the modal
    localStorage.setItem("shouldRedirectToMenuPage", "true");
    window.location.reload();
    }
});


// Function to save menu items to local storage
function saveMenuItemsToJson() {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
}
  
function loadMenuItemsFromJson() {
    const storedMenuItems = localStorage.getItem("menuItems");
    if (storedMenuItems) {
        menuItems = JSON.parse(storedMenuItems);
        generateMenuItems(menuItems);
    }
}
  
function convertToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);  // Base64 字符串
    };
    reader.readAsDataURL(file);
}

// Menu edit function

function openEditModal(itemId) {
    const menuItem = menuItems.find(item => item.id === itemId);
    if (menuItem) {
        document.getElementById("editName").value = menuItem.name;
        document.getElementById("editDescription").value = menuItem.description;
        document.getElementById("editPrice").value = menuItem.price;
        document.getElementById("editImage").src = menuItem.image; // 顯示當前圖片
        currentItemToEdit = itemId;  // Set global variable for current item
        document.getElementById("editModal").style.display = "block";  // Show the modal
    }
}

// Function to close the edit modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function closeAddModal() {
    document.getElementById("addNewItemModal").style.display = "none";
}

document.getElementById("addNewItemButton").addEventListener("click", function() {
    document.getElementById("newItemName").value = "";
    document.getElementById("newItemDescription").value = "";
    document.getElementById("newItemPrice").value = "";
    document.getElementById("newItemImage").value = "";
    document.getElementById("addNewItemModal").style.display = "block";
});


document.getElementById("addNewItemForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newItemName = document.getElementById("newItemName").value;
    const newItemDescription = document.getElementById("newItemDescription").value;
    const newItemPrice = document.getElementById("newItemPrice").value;
    const newImageFile = document.getElementById("newItemImage").files[0];

    const newMenuItem = {
        id: Date.now(), // genarate id by time
        name: newItemName,
        description: newItemDescription,
        price: newItemPrice,
        image: '' // 預設圖片
    };

    // 處理圖片
    if (newImageFile) {
        convertToBase64(newImageFile, function(base64String) {
            newMenuItem.image = base64String;
            addMenuItem(newMenuItem);
        });
    } else {
        addMenuItem(newMenuItem);
    }
});

function addMenuItem(menuItem) {
    menuItems.push(menuItem);
    generateMenuItems(menuItems);
    saveMenuItemsToJson();
    closeModal(); // 關閉模態框
}


function deleteMenuItem(itemId) {
    // 篩選掉具有特定 ID 的菜單項目
    menuItems = menuItems.filter(item => item.id !== itemId);
    // 重新生成菜單項目來更新顯示
    generateMenuItems(menuItems);
    // 更新 localStorage 中的數據
    saveMenuItemsToJson();
}

window.onload = function () {
    loadMenuItemsFromJson();
    const shouldRedirect = localStorage.getItem("shouldRedirectToMenuPage");
    if (shouldRedirect === "true") {
        // 跳转到menuPage
        pages.forEach((page) => (page.style.display = "none"));
        document.getElementById("menuPage").style.display = "block";
        document.getElementById("navDashboard").classList.remove("hovered");
        document.getElementById("navMenu").classList.add("hovered");
        
        // 清除标志
        localStorage.removeItem("shouldRedirectToMenuPage");
    }
};
