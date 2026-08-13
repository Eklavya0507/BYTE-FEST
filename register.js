const API_URL = "https://byte-fest-backend.onrender.com/api/registrations";

const form = document.getElementById("regForm");
const eventSelect = document.getElementById("event");
const successBox = document.getElementById("success");
const registrationId = document.getElementById("rid");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    // Don't send the agreement checkbox as participant data
    delete data.agree;

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const participant = {
        name: data.leaderName,
        email: data.email,
        phone: data.phone,
        department: data.department,
        year: data.year
    };

    // Convert the existing frontend member fields
    const members = [];

    if (data.member1) {
        members.push({
            name: data.member1
        });
    }

    if (data.member2) {
        members.push({
            name: data.member2
        });
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event: data.event,
                participant,
                members
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }

        registrationId.textContent = result.registrationId;

        form.classList.add("hidden");
        successBox.classList.remove("hidden");

        console.log("Registration successful:", result);

    } catch (error) {

        console.error(error);

        alert(
            "Registration failed.\n\n" +
            error.message
        );

        submitButton.disabled = false;
        submitButton.textContent = "Submit Registration";
    }
});