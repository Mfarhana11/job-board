document.addEventListener("DOMContentLoaded", function () {
    const jobListContainer = document.getElementById("job-list");
    
    if (!jobListContainer) {
        console.error("❌ job-list element not found!");
        return;
    }

    displayAppliedJobs(); // Initial load

    function displayAppliedJobs() {
        jobListContainer.innerHTML = ""; // Clear previous entries

        let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

        if (appliedJobs.length === 0) {
            jobListContainer.innerHTML = "<p>No jobs applied yet.</p>";
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
            jobListContainer.appendChild(jobItem);
        });

        attachRemoveListeners(); // Attach remove event listeners
    }

    function attachRemoveListeners() {
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
                let indexToRemove = parseInt(this.getAttribute("data-index"));

                appliedJobs.splice(indexToRemove, 1);
                localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));

                displayAppliedJobs(); // Refresh UI after deletion
            });
        });
    }

    console.log("Applied Jobs Data:", JSON.parse(localStorage.getItem("appliedJobs")) || []);
});

