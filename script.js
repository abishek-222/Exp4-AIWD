const sessionCosts = {
    workshop: 45,
    seminar: 30,
    networking: 25
};

const messageCard = document.getElementById("statusMessage");
const registrationForm = document.getElementById("registrationForm");
const guestsInput = document.getElementById("guests");
const sessionSelect = document.getElementById("sessionType");
const accessibilitySelect = document.getElementById("accessibilitySelect");
const summaryList = document.getElementById("summaryList");
const submissionMessage = document.getElementById("submissionMessage");
const themeButtons = document.querySelectorAll(".theme-button");
const infoCards = document.getElementsByClassName("info-card");
const paragraphs = document.getElementsByTagName("p");

function applyTheme(theme) {
    const body = document.querySelector("body");
    if (theme === "forest") {
        body.style.backgroundImage = "linear-gradient(120deg, #031320, #0a1b3b)";
    } else if (theme === "dusk") {
        body.style.backgroundImage = "linear-gradient(120deg, #1b2b46, #45203a)";
    } else if (theme === "midnight") {
        body.style.backgroundImage = "linear-gradient(120deg, #06091a, #1b1e3b)";
    }
    Array.from(infoCards).forEach((card) => {
        card.style.borderColor = "#f97316";
    });
    Array.from(paragraphs).forEach((paragraph) => {
        paragraph.style.opacity = "0.85";
    });
}

function calculateTotals() {
    const guestCount = Math.max(1, parseInt(guestsInput.value, 10) || 1);
    const sessionType = sessionSelect.value;
    const accessibility = accessibilitySelect.value;
    const costPerGuest = sessionCosts[sessionType] || 0;
    const totalCost = guestCount * costPerGuest;
    summaryList.innerHTML = `
        <li>Guests: ${guestCount}</li>
        <li>Session style: ${sessionSelect.options[sessionSelect.selectedIndex].text}</li>
        <li>Accessibility flow: ${accessibility}</li>
        <li>Per-guest fee: $${costPerGuest}</li>
        <li>Projected total: $${totalCost}</li>
    `;
    submissionMessage.textContent = "";
}

function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    if (!email.includes("@") || !email.includes(".")) {
        submissionMessage.textContent = "Please provide a valid email to continue.";
        submissionMessage.style.color = "#f43f5e";
        return;
    }
    submissionMessage.style.color = "#86efac";
    submissionMessage.textContent = `Thanks ${name || "participant"}, we received your Aurora crew request!`;
}

window.addEventListener("load", () => {
    const now = new Date();
    messageCard.textContent = `Ready for your next immersive experiment. ${now.toLocaleDateString()}`;
    calculateTotals();
});

themeButtons.forEach((button) => {
    button.onclick = () => {
        const themeName = button.getAttribute("data-theme");
        applyTheme(themeName);
    };
});

guestsInput.onkeyup = calculateTotals;
sessionSelect.onchange = calculateTotals;
accessibilitySelect.onchange = calculateTotals;
registrationForm.onsubmit = handleSubmit;