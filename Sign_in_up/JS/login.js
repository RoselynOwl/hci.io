function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // user data and logic
    const users = [
        { fullname:"Eric Lee",username: "customer", password: "password1", type: "customer" },
        { fullname:"Japan restaurant",username: "restaurant", password: "password1", type: "restaurant" },
        { fullname:"Chan Tai Man",username: "delivery", password: "password1", type: "delivery" }
    ];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // save localStorage 
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);
        if (user.type === "customer") {
            // Redirect to customer page (e.g., index1.html)
            window.location.href = "../index_customer.html";
        } else if (user.type === "restaurant") {
            // Redirect to restaurant page (e.g., index2.html)
            window.location.href = "../index.html";
        } else if (user.type === "delivery") {
            // Redirect to delivery personnel page (e.g., index3.html)
            window.location.href = "../index_delivery.html";
        }
    } else {
        alert("Invalid username or password");
    }
}
