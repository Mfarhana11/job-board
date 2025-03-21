document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {
        alert("Access Denied! Admin login required.");
        window.location.href = "admin-login.html";
        return;
    }

    const jobList = document.getElementById("job-list");
    let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    if (appliedJobs.length === 0) {
        jobList.innerHTML = "<p>No job applications found.</p>";
        return;
    }

    appliedJobs.forEach((job, index) => {
        const jobItem = document.createElement("div");
        jobItem.classList.add("job-item");
        jobItem.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
            <hr>
        `;
        jobList.appendChild(jobItem);
    });

    // Remove job application
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            let indexToRemove = parseInt(this.getAttribute("data-index"));
            appliedJobs.splice(indexToRemove, 1);
            localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
            location.reload();
        });
    });

    // Logout
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("isAdminLoggedIn");
        alert("Logged out successfully.");
        window.location.href = "admin-login.html";
    });
});
