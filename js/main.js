document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.querySelectorAll(".add-to-cart");
  const cartItemCount = document.querySelector(".cart-icon span");
  const cartItemList = document.querySelector(".sidebar__items");
  const cartTotal = document.querySelector(".sidebar__total");
  const cartIcon = document.querySelector(".cart-icon");
  const siderbar = document.querySelector(".sidebar");
  const close = document.querySelector(".sidebar__close");

  let cartItems = [];
  let totalAmount = 0;

  addToCartButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      const item = {
        quantity: 1,
        name: document.querySelectorAll(".card .card__title")[index]
          .textContent,
        price: parseFloat(
          document.querySelectorAll(".card .price")[index].textContent.slice(1)
        ),
      };

      const exixtingItem = cartItems.find(
        (cartItem) => cartItem.name === item.name
      );

      exixtingItem ? exixtingItem.quantity++ : cartItems.push(item);

      totalAmount += item.price;

      updateCartUI();

      console.log(cartItems);
    });
  });

  function updateCartUI() {
    updateCartItemCount(cartItems.length);
    updateCartItemList();
    updateCartTotal();
  }

  function updateCartItemCount(count) {
    cartItemCount.textContent = count;
  }

  function updateCartItemList() {
    cartItemList.innerHTML = "";
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("sidebar__item");
      cartItem.innerHTML = `
        <span>(${item.quantity}x) ${item.name}</span>
        <span class="sidebar__item--price">
          ${(item.quantity * item.price).toFixed(2)}
          <button class="btn__remove" data-index="${index}">
            <i class="fa-solid fa-times" data-index="${index}"></i>
          </button>
        </span>
      `;

      cartItemList.append(cartItem);
    });

    const btnRemove = document.querySelectorAll(".btn__remove");
    btnRemove.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        removeItemFromCart(index);
      });
    });
  }

  function removeItemFromCart(index) {
    const removeItem = cartItems.splice(index, 1)[0];
    totalAmount -= removeItem.price * removeItem.quantity;
    updateCartUI();
  }

  function updateCartTotal() {
    cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
  }

  cartIcon.addEventListener("click", () => {
    siderbar.classList.toggle("open");
  });

  close.addEventListener("click", () => {
    siderbar.classList.toggle("open");
  });
});
