const form = document.getElementById("registrationForm");
const eventSelect = document.getElementById("event");
const success = document.getElementById("success");
const regId = document.getElementById("regId");

document.querySelectorAll(".select-event").forEach(btn => {
  btn.addEventListener("click", () => {
    eventSelect.value = btn.dataset.event;
    document.getElementById("register").scrollIntoView({behavior:"smooth"});
    eventSelect.focus();
  });
});

eventSelect.addEventListener("change", () => {
  const members = document.getElementById("memberFields");
  const event = eventSelect.value;
  const placeholder = event === "Tech Quiz" ? "Member 2 (optional)" : "Member 2 full name";
  members.querySelectorAll("input").forEach((input, i) => {
    input.placeholder = i === 0 ? "Member 1 full name" : placeholder;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const prefix = {
    "UI Showdown":"UI",
    "Code Sprint":"CS",
    "Bug Hunt":"BH",
    "Tech Quiz":"TQ",
    "Checkmate":"CM"
  }[data.get("event")] || "BF";

  const key = "bytefest_" + prefix + "_counter";
  const next = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, next);
  const id = `BF26-${prefix}-${String(next).padStart(3,"0")}`;
  regId.textContent = id;

  const saved = JSON.parse(localStorage.getItem("bytefest_registrations") || "[]");
  saved.push({...Object.fromEntries(data.entries()), registrationId:id, createdAt:new Date().toISOString()});
  localStorage.setItem("bytefest_registrations", JSON.stringify(saved));

  form.classList.add("hidden");
  success.classList.remove("hidden");
  success.scrollIntoView({behavior:"smooth"});
});

document.getElementById("newRegistration").addEventListener("click", () => {
  form.reset();
  success.classList.add("hidden");
  form.classList.remove("hidden");
  document.getElementById("register").scrollIntoView({behavior:"smooth"});
});
