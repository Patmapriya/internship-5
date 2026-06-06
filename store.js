export const store = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],

  addToCart(id) {
    this.cart.push({ id });
    localStorage.setItem("cart", JSON.stringify(this.cart));
    alert("Added to cart");
  }
};