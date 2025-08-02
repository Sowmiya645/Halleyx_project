document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const registerMessage = document.getElementById("registerMessage"); // ⬅️ Target div

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        window.location.href = "login.html";
      } else {
        registerMessage.innerHTML = `<span class="text-danger">${result.message || "Registration failed."}</span>`;
      }
    } catch (err) {
      console.error("Fetch error:", err);
      registerMessage.innerHTML = `<span class="text-danger">Server error. Please try again.</span>`;
    }
  });
});
