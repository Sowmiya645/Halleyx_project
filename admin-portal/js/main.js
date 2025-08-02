document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  handleCartDisplay();
  setupAddToCartButtons();
});

function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`${name} added to cart.`);
    });
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");

  if (cartCount) cartCount.textContent = total;
}

function handleCartDisplay() {
  const cartContainer = document.getElementById("cart-container");
  const totalEl = document.getElementById("total");

  if (!cartContainer || !totalEl) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "0";
    return;
  }

  let html = "<table><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr>";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    html += `<tr>
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>${item.quantity}</td>
      <td>₹${subtotal}</td>
    </tr>`;
  });

  html += "</table>";
  cartContainer.innerHTML = html;
  totalEl.textContent = total.toFixed(2);
}
