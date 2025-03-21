document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    // Signup Functionality
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if email already exists
            if (users.some(user => user.email === email)) {
                alert("Email is already registered! Please log in.");
                return;
            }

            // Save user data
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup successful! Please log in.");
            window.location.href = "login.html";
        });
    }

    // Login Functionality
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to main page
            } else {
                alert("Invalid email or password!");
            }
        });
    }
});
