const PRICE = 24;
let quantity = 1;
let cart = 0;

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const mug = document.getElementById("mug");
const colorName = document.getElementById("colorName");
const qtyEl = document.getElementById("qty");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cartCount");
const cartMsg = document.getElementById("cartMsg");

// Mobile menu
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") menu.classList.remove("open");
});

// Color picker changes the mug
document.querySelectorAll(".swatch").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".swatch.active").classList.remove("active");
    btn.classList.add("active");
    document.documentElement.style.setProperty("--mug", btn.dataset.color);
    colorName.textContent = btn.dataset.name;
  });
});

// Quantity and total
function updateTotal() {
  qtyEl.textContent = quantity;
  totalEl.textContent = quantity * PRICE;
}
document.getElementById("plus").addEventListener("click", () => {
  if (quantity < 10) quantity++;
  updateTotal();
});
document.getElementById("minus").addEventListener("click", () => {
  if (quantity > 1) quantity--;
  updateTotal();
});

// Add to cart
document.getElementById("addBtn").addEventListener("click", () => {
  cart += quantity;
  cartCount.textContent = cart;
  cartMsg.textContent = `Added ${quantity} ${colorName.textContent} mug(s) to your cart.`;
});

// Contact form validation
const form = document.getElementById("form");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll("input, textarea")];
  let valid = true;

  fields.forEach((f) => {
    const ok = f.value.trim() !== "" && (f.type !== "email" || /^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });

  if (valid) {
    formMsg.className = "msg";
    formMsg.textContent = "Message sent. We will reply within one business day.";
    form.reset();
  } else {
    formMsg.className = "msg error";
    formMsg.textContent = "Please fill in every field with a valid email address.";
  }
});
