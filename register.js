const API_URL = "https://byte-fest-backend.onrender.com/api/registrations";

const form = document.getElementById("regForm");
const successBox = document.getElementById("success");
const registrationId = document.getElementById("rid");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    const payload = {
        event: data.event,
        participant: {
            name: data.leaderName,
            email: data.email,
            phone: data.phone,
            department: data.department,
            year: data.year
        },
        members: [
            data.member1 || "",
            data.member2 || ""
        ].filter(Boolean)
    };

    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Submitting...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }

        registrationId.textContent = result.registrationId;

        form.classList.add("hidden");
        successBox.classList.remove("hidden");

    } catch (error) {
        console.error(error);
        alert("Registration failed. Please try again.");
        button.disabled = false;
        button.textContent = "Submit Registration";
    }
});