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

const adminUsername = 'admin';
const adminPassword = 'password123'; 

// Admin login function
function adminLogin() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === adminUsername && password === adminPassword) {
        alert('Login successful!');
        // Redirect to the Admin Dashboard page 
        window.location.href = 'admin-dashboard.html';
    } else {
        alert('Invalid username or password');
    }
}

// Check if the admin is logged in when loading the admin dashboard page
window.onload = function() {
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'admin-login.html';
    }
};

function logout() {
    
    localStorage.removeItem('isAdminLoggedIn');
    alert('Logged out successfully!');
    window.location.href = 'admin-login.html';
}

function viewApplications() {
    alert('Viewing applications...');
}
