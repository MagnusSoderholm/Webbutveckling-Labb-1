// Ladda kundvagn från localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Spara kundvagn till localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Uppdatera antal produkter i varukorgen
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

// Visa kundvagnsinnehåll
function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');

  if (!cartItemsContainer || !cartTotalContainer) return;

  cartItemsContainer.innerHTML = ""; // Rensa listan först

  // Gruppera produkter baserat på namn för att räkna antal
  let productMap = {};
  cart.forEach(product => {
    if (productMap[product.name]) {
      productMap[product.name].quantity++;
    } else {
      productMap[product.name] = { ...product, quantity: 1 };
    }
  });

  let total = 0;

  Object.values(productMap).forEach((product) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('d-flex', 'align-items-center', 'border', 'p-2', 'mb-2', 'rounded');

    itemElement.innerHTML = `
      <img src="${product.image}" class="cart-img me-3" alt="${product.name}">
      <div class="flex-grow-1">
        <h5 class="m-0">${product.name}</h5>
        <p class="m-0">${product.price} SEK</p>
        <div class="quantity-controls">
          <button class="btn btn-sm btn-outline-secondary change-quantity" data-name="${product.name}" data-change="-1">➖</button>
          <span class="mx-2">${product.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary change-quantity" data-name="${product.name}" data-change="1">➕</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(itemElement);
    total += product.price * product.quantity;
  });

  cartTotalContainer.textContent = total;
}

// Ändra antal produkter i kundvagnen
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('change-quantity')) {
    const productName = event.target.getAttribute('data-name');
    const change = parseInt(event.target.getAttribute('data-change'));

    // Hitta produkten i kundvagnen
    const productIndex = cart.findIndex(product => product.name === productName);

    if (productIndex !== -1) {
      if (change === 1) {
        // Lägg till en till av produkten
        cart.push(cart[productIndex]);
      } else {
        // Ta bort en enhet
        cart.splice(productIndex, 1);
      }
    }

    saveCart();
    displayCart();
    updateCartCount();
  }
});

// Kör funktioner vid sidladdning
document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  updateCartCount();
});
