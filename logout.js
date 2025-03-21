document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-btn");
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        if (logoutBtn) logoutBtn.style.display = "none"; // Hide button if not logged in
    } else {
        if (logoutBtn) {
            logoutBtn.style.display = "block"; // Show button if logged in
            logoutBtn.addEventListener("click", function () {
                localStorage.removeItem("loggedInUser");
                alert("You have logged out successfully.");
                window.location.href = "login.html";
            });
        }
    }
});
