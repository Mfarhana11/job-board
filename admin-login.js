document.addEventListener("DOMContentLoaded", function () {
    const adminForm = document.getElementById("admin-login-form");

    adminForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const email = document.getElementById("admin-email").value;
        const password = document.getElementById("admin-password").value;

        // ✅ Set Admin Credentials
        const adminCredentials = {
            email: "admin@example.com",
            password: "admin123"
        };

        if (email === adminCredentials.email && password === adminCredentials.password) {
            localStorage.setItem("isAdminLoggedIn", "true");
            alert("Admin login successful!");
            window.location.href = "admin-panel.html"; // Redirect to admin panel
        } else {
            alert("Invalid admin credentials!");
        }
    });
});
