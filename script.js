document.addEventListener("DOMContentLoaded", function () {
    const applyButtons = document.querySelectorAll(".apply-btn");

    applyButtons.forEach(button => {
        button.addEventListener("click", function () {
            const jobCard = this.closest(".job-card");
            const jobTitle = jobCard.querySelector("h3")?.innerText.trim();
            const company = jobCard.querySelector(".company-name")?.innerText.trim();
            const location = jobCard.querySelector(".job-location")?.innerText.trim();

            if (!jobTitle || !company || !location) {
                console.error("Job details missing!");
                return;
            }
            openApplicationForm(jobTitle, company, location);
        });
    });
});

function openApplicationForm(jobTitle, company, location) {
    const formHTML = `
        <div class="popup-overlay">
            <div class="popup">
                <h2>Apply for ${jobTitle}</h2>
                <p><b>Company:</b> ${company}</p>
                <p><b>Location:</b> ${location}</p>
                
                <label>Name:</label>
                <input type="text" id="applicant-name" required>
                
                <label>Email:</label>
                <input type="email" id="applicant-email" required>

                <button onclick="submitApplication('${jobTitle}', '${company}', '${location}')">Submit</button>
                <button class="close-btn" onclick="closePopup()">Cancel</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", formHTML);
}

function closePopup() {
    const popup = document.querySelector(".popup-overlay");
    if (popup) popup.remove();
}

function submitApplication(jobTitle, company, location) {
    const name = document.getElementById("applicant-name")?.value.trim();
    const email = document.getElementById("applicant-email")?.value.trim();

    if (!name || !email) {
        alert("Please fill in all fields.");
        return;
    }

    // Store applied job in localStorage
    let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    const alreadyApplied = appliedJobs.some(job => 
        job.title.toLowerCase() === jobTitle.toLowerCase() && 
        job.company.toLowerCase() === company.toLowerCase()
    );

    if (!alreadyApplied) {
        appliedJobs.push({ title: jobTitle, company: company, location: location });
        localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
        alert(`Application submitted for ${jobTitle} at ${company}!`);
    } else {
        alert("You have already applied for this job!");
    }

    closePopup();
}
