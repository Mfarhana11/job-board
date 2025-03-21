document.addEventListener("DOMContentLoaded", function () {
    const adminEmail = localStorage.getItem("adminEmail");
    if (!adminEmail) {
        alert("Unauthorized access! Redirecting to login...");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("admin-email").innerText = adminEmail;

    // Fetch all job applications from localStorage
    const applicationsContainer = document.getElementById("applications-container");
    let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    if (appliedJobs.length === 0) {
        applicationsContainer.innerHTML = "<p>No applications yet.</p>";
    } else {
        appliedJobs.forEach((job, index) => {
            const jobDiv = document.createElement("div");
            jobDiv.classList.add("job-card");
            jobDiv.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            applicationsContainer.appendChild(jobDiv);
        });

        // Add delete event to each button
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                let indexToRemove = parseInt(this.getAttribute("data-index"));

                // Remove job from array
                appliedJobs.splice(indexToRemove, 1);
                localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));

                // Refresh applications list
                location.reload();
            });
        });
    }

    // Logout functionality
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("adminEmail");
        window.location.href = "login.html";
    });
});
