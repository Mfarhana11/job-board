document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        if (email.trim() === "" || password.trim() === "") {
            alert("Please fill all fields.");
            return;
        }

        localStorage.setItem("user", JSON.stringify({ email, password }));
        alert("Signup successful! Please log in.");
        window.location.href = "login.html";
    });
});
