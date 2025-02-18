
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

function addToCart(product) {
  cart.push(product);
  saveCart();
  updateCartCount();
}


document.addEventListener('DOMContentLoaded', () => {
  // Uppdatera kundvagnsikonen vid sidladdning
  updateCartCount();


  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const product = products[index];
      addToCart(product);
      alert(`${product.name} har lagts till i kundvagnen.`);
    });
  });
});
