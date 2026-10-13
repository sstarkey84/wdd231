const params = new URLSearchParams(window.location.search);
const fullName = params.get("fullname");
const email = params.get("email");
const species = params.get("species");

if (species) {
    localStorage.setItem("huntingInterest", species);
}

const results = document.querySelector("#form-results");

results.innerHTML = `
    <p><strong>Full Name:</strong> ${fullName || "Not provided"}</p>
    <p><strong>Email Address:</strong> ${email || "Not provided"}</p>
    <p><strong>Hunting Interest:</strong> ${species || "Not provided"}</p>
`;

