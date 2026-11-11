// ==========================================
// 1. MOBILE NAVIGATION MENU
// ==========================================

const menuButton = document.getElementById("menuButton");
const navList = document.getElementById("navList");

menuButton.addEventListener("click", function () {
    const isOpen = navList.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav-list a").forEach(function (link) {
    link.addEventListener("click", function () {
        navList.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});


// ==========================================
// 2. SCROLL REVEAL ANIMATION
// ==========================================

const revealObserver = new IntersectionObserver(
    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(function (element) {
    revealObserver.observe(element);
});


// ==========================================
// 3. AUTOMATIC FOOTER YEAR
// ==========================================

document.getElementById("year").textContent = new Date().getFullYear();


// ==========================================
// 4. CONTACT FORM - BACKEND CONNECTION
// ==========================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {

    // Prevent page refresh
    event.preventDefault();

    const feedback = document.getElementById("formFeedback");

    // Collect information from the form
    const contactData = {
        name: document.getElementById("visitorName").value.trim(),

        email: document.getElementById("visitorEmail").value.trim(),

        message: document.getElementById("visitorMessage").value.trim()
    };

    feedback.textContent = "Sending your message...";

    try {

        // Send information to Express backend
        const response = await fetch("https://shanmuganathan-portfolio-production.up.railway.app/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(contactData)

        });

        // Read backend response
        const result = await response.json();

        // Check whether request was successful
        if (!response.ok) {
            throw new Error(result.message || "Something went wrong.");
        }

        // Display success message
        feedback.textContent = result.message;

        // Clear form after successful submission
        contactForm.reset();

    }

    catch (error) {

        // Display error message
        feedback.textContent = "Error: " + error.message;

        console.error("Contact form error:", error);

    }
});