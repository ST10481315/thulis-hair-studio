
document.addEventListener("DOMContentLoaded", function () {

    // Highlight the current page
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("header nav a").forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });

    // Prevent selecting a past date
    const dateInput = document.getElementById("date");

    if (dateInput) {
        const today = new Date();
        const localToday = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateInput.min = localToday;
    }

    // Search and filter services
    const serviceSearch = document.getElementById("serviceSearch");

    if (serviceSearch) {
        const cards = document.querySelectorAll(".service-card");
        const searchMessage = document.getElementById("searchMessage");

        serviceSearch.addEventListener("input", function () {
            const term = serviceSearch.value.trim().toLowerCase();
            let visibleCount = 0;

            cards.forEach(function (card) {
                const matches = card.textContent.toLowerCase().includes(term);
                card.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }
            });

            if (searchMessage) {
                searchMessage.textContent = visibleCount === 0
                    ? "No services found. Please try another search."
                    : visibleCount + " service(s) found.";
            }
        });
    }

    // Enquiry form validation
    const enquiryForm = document.getElementById("enquiryForm");
    console.log("Enquiry form found:", enquiryForm);

    if (enquiryForm) {
        const message = document.getElementById("formMessage");
        const phoneInput = document.getElementById("phone");

        enquiryForm.addEventListener("submit", function (event) {
            console.log("Submit button clicked!");
            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                message.textContent =
                    "Please complete all required fields correctly.";
                return;
            }

            const phone = phoneInput.value.replace(/\s+/g, "");
            const phonePattern = /^(0\d{9}|\+27\d{9})$/;

            if (!phonePattern.test(phone)) {
                phoneInput.setCustomValidity(
                    "Enter a valid South African phone number."
                );
                phoneInput.reportValidity();
                phoneInput.setCustomValidity("");
                return;
            }

            message.textContent =
                "Your details passed validation. Your enquiry has not been sent because a booking service is not connected yet.";
        });

        enquiryForm.addEventListener("reset", function () {
            message.textContent = "";
        });
    }
// AJAX demonstration
const ajaxButton = document.getElementById("ajaxButton");
const ajaxMessage = document.getElementById("ajaxMessage");

if (ajaxButton && ajaxMessage) {
    ajaxButton.addEventListener("click", function () {
        ajaxMessage.textContent = "Loading...";

        fetch("https://jsonplaceholder.typicode.com/posts/1")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Request failed");
                }
                return response.json();
            })
            .then(data => {
                ajaxMessage.textContent =
                    "AJAX successful! Data received: " + data.title;
            })
            .catch(error => {
                ajaxMessage.textContent =
                    "Unable to load information. Please try again.";
            });
    });
}
});
