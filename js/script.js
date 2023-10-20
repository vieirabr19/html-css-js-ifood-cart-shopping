document.addEventListener("DOMContentLoaded", () => {
  const addToCartItem = document.querySelectorAll(".add-to-cart");
  const cardTitle = document.querySelectorAll(".card__title");
  const cardPrice = document.querySelectorAll(".card__price .price");
  const cartIcon = document.querySelector(".cart-icon");
  const cartCount = document.querySelector(".cart-icon span");
  const sidebar = document.querySelector(".sidebar");
  const sidebarClose = document.querySelector(".sidebar__close");
  const sidebarTotal = document.querySelector(".sidebar__total");
  const sidebarItems = document.querySelector(".sidebar__items");
  const totalCartHeader = document.querySelector(".total__cart");

  let cartItems = [];
  let totalAmount = 0;

  addToCartItem.forEach((button, index) => {
    button.addEventListener("click", () => {
      const item = {
        quantity: 1,
        name: cardTitle[index].textContent,
        price: parseFloat(cardPrice[index].textContent.slice(1)),
      };

      const existingitem = cartItems.find(
        (cartItem) => cartItem.name === item.name
      );
      existingitem ? existingitem.quantity++ : cartItems.push(item);

      totalAmount += item.price;

      updateCartUI();

      console.log(cartItems);
      console.log(totalAmount);
    });
  });

  function updateCartUI() {
    updateItemsCount();
    updateTotalAmount();
    updateCartItems();
  }

  // update total count header
  function updateItemsCount() {
    cartCount.textContent = cartItems.length;
    totalCartHeader.textContent = cartItems.length;
  }

  // update total amount
  function updateTotalAmount() {
    sidebarTotal.textContent = `$${totalAmount.toFixed(2)}`;
  }

  // update cart items
  function updateCartItems() {
    sidebarItems.innerHTML = "";
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("sidebar__item");
      cartItem.innerHTML = `
        <span>(${item.quantity}x) ${item.name}</span>
        <span class="sidebar__item--price">
          $${(item.quantity * item.price).toFixed(2)}
          <button class="btn__remove">
            <i class="fa-solid fa-times" data-index="${index}"></i>
          </button>
        </span>
      `;

      sidebarItems.append(cartItem);
    });

    const btnRemove = document.querySelectorAll(".btn__remove");
    btnRemove.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        removeCartItems(index);
      });
    });
  }

  // Remove cart items
  function removeCartItems(index) {
    const removeCart = cartItems.splice(index, 1)[0];
    totalAmount -= removeCart.quantity * removeCart.price;
    updateCartUI();
  }

  // open shoppingCart
  cartIcon.addEventListener("click", () => {
    sidebar.classList.add("open");
  });

  // close shoppingCart
  sidebarClose.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});
