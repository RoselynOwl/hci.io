document.addEventListener("DOMContentLoaded", function() {


    // check login
    const isLoggedIn = localStorage.getItem("loggedIn");

    if (isLoggedIn === "true") {
        // already login
        const loginBtn = document.querySelector(".sign a[href='sign_in_up/login.html']");
        const signUpBtn = document.querySelector(".sign a[href='sign_in_up/signUpSelection.html']");
        loginBtn.style.display = "none";
        signUpBtn.style.display = "none";

        // diaplay user and logout btn
        const userContainer = document.getElementById("userContainer");
        const loggedInUser = document.getElementById("loggedInUser");
        const logoutBtn = document.getElementById("logoutBtn");

        // get user name
        const username = localStorage.getItem("username");

        if (username) {
            loggedInUser.textContent = "Welcome, " + username;
            userContainer.style.display = "block";
        }
    }
        // get logout btn
    const logoutBtn = document.getElementById("logoutBtn");

    // listen logout btn click event
    logoutBtn.addEventListener("click", function() {
        // remove localStorage login status and username
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");

        // reload to index.html
        window.location.href = "../index.html";
    });

});
