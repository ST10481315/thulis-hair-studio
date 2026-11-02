

document.addEventListener("DOMContentLoaded", function () {

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("header nav a").forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });

    const dateInput = document.getElementById("date");

    if (dateInput) {
        const today = new Date();
        const localToday = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateInput.min = localToday;
    }

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

                if (matches) visibleCount++;
            });

            if (searchMessage) {
                searchMessage.textContent = visibleCount === 0
                    ? "No services found. Please try another search."
                    : visibleCount + " service(s) found.";
            }
        });
    }

    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {
        const message = document.getElementById("formMessage");
        const phoneInput = document.getElementById("phone");

        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();

                if (message) {
                    message.textContent =
                        "Please complete all required fields correctly.";
                }
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

            if (message) {
                message.textContent =
                    "Thank you for choosing Thuli's Hair Studio! " +
                    "We appreciate your interest in our services. " +
                    "Your details have been checked successfully. " +
                    "We look forward to making you look and feel beautiful. " +
                    "For appointment confirmation, please contact us directly. " +
                    "With love, Thuli's Hair Studio.";
            }
        });

        enquiryForm.addEventListener("reset", function () {
            if (message) {
                message.textContent = "";
            }
        });
    }

    const ajaxButton = document.getElementById("ajaxButton");
    const ajaxMessage = document.getElementById("ajaxMessage");

    if (ajaxButton && ajaxMessage) {
        ajaxButton.addEventListener("click", function () {

            ajaxMessage.textContent = "Loading salon information...";

            fetch("services.json")
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Could not load services.json");
                    }

                    return response.json();
                })
                .then(function (data) {

                    ajaxMessage.innerHTML = `
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                        <h4>Our Services:</h4>
                        <ul>
                            ${data.services.map(function (service) {
                                return `<li>${service}</li>`;
                            }).join("")}
                        </ul>
                        <p>${data.message}</p>
                        <p>Thank you for visiting Thuli's Hair Studio!
                        We look forward to making you look and feel beautiful.</p>
                    `;

                })
                .catch(function (error) {
                    console.error("AJAX Error:", error);

                    ajaxMessage.textContent =
                        "Sorry, we could not load the salon information. Please try again.";
                });
        });
    }

});
