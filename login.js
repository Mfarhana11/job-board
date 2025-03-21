document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
            alert("Invalid credentials!");
            return;
        }

        localStorage.setItem("isLoggedIn", "true");
        alert("Login successful!");
        window.location.href = "index.html"; // Redirect to home
    });
});
