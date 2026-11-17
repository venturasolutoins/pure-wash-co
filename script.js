const CONTACT_EMAIL = ""; // Add the confirmed business email before public launch.

document.getElementById("year").textContent = new Date().getFullYear();

const serviceSelect = document.getElementById("service-select");
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

document.getElementById("enquiry-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = `Pure Wash Co enquiry: ${data.get("service")}`;
  const message = [
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Postcode: ${data.get("postcode")}`,
    `Service: ${data.get("service")}`,
    "",
    `Vehicle and details: ${data.get("details")}`
  ].join("\n");
  const status = document.getElementById("form-status");

  if (CONTACT_EMAIL) {
    window.location.href = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    status.textContent = "Your email app should open with the enquiry ready to send.";
    return;
  }

  try {
    await navigator.clipboard.writeText(`${subject}\n\n${message}`);
    status.textContent = "Enquiry details copied. Add the business email to activate sending before launch.";
  } catch {
    status.textContent = "Add the business email to activate sending before launch.";
  }
});
