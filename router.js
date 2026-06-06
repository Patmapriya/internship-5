export function router() {
  const path = location.hash.slice(1) || "/";

  const routes = {
    "/": homePage,
    "/cart": cartPage
  };

  routes[path]();
}

// Pages
import { getProducts } from "./api.js";
import { store } from "./store.js";

async function homePage() {
  const app = document.getElementById("app");
  const products = await getProducts();

  app.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}" />
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
      <button data-id="${p.id}">Add to Cart</button>
    </div>
  `).join("");

  app.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = e.target.dataset.id;
      store.addToCart(id);
    }
  });
}

function cartPage() {
  const app = document.getElementById("app");

  app.innerHTML = store.cart.map(item => `
    <div>
      <h3>${item.title}</h3>
      <p>$${item.price}</p>
    </div>
  `).join("");
}