import { RegistrationManager, attemptLogin } from "./login.mjs";
document.addEventListener("DOMContentLoaded", function () {
  let categoriesData; // Змінна для зберігання завантажених даних
  const productsContainer = document.querySelector(".products");
  const basket = document.querySelector(".menu_body");
  const basketOutput = document.querySelector(".basket__products");
  const btnBasketOpen = document.querySelector(".header__link__basket");
  const btnBasketClose = document.querySelector(".basket__close");
  fetch("/js/product.json")
    .then((response) => response.json())
    .then((data) => {
      categoriesData = data; // Зберегти дані у змінній для подальшого використання
      initializeApp(); // Викликати функцію для ініціалізації додатку
    })
    .catch((error) => {
      console.error("Помилка при завантаженні JSON:", error);
    });
  function initializeApp() {
    const categoriesBtns = document.querySelectorAll(".header__menu__item");
    const productsContainer = document.querySelector(".products");

    function displayProducts(categoryName) {
      const selectedCategory = categoriesData.categories[categoryName];
      productsContainer.innerHTML = "";

      if (selectedCategory) {
        selectedCategory.forEach((product) => {
          let productDiv = createProduct(product);
          productsContainer.appendChild(productDiv);
        });
      }
    }
    function filterProducts(category) {
      displayProducts(category);
    }
    function createProduct(product) {
      let productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
                  <img src="${product.image}" alt="${
        product.title
      }" class="product__img" />
                  <p class="product__title">${product.title}</p>
                  <p class="product__ingredients">${product.ingredients.join(
                    ", "
                  )}</p>
                  <div class="product__control">
                    <div class="product__control__info">
                      <div class="product__price__wrapper">
                        <div class="product__price" data-initial-price = ${
                          product.price
                        } >${product.price}</div>
                        <p class="product__price_currency">грн</p>
                        <p class="product_weight">/${product.weight} г</p>
                      </div>
                      <p class="product__bonus">+${
                        product.bonus
                      } грн бонусів</p>
                    </div>
                    <div class="product__control__action">
                      <div class="product__amount__control">
                        <div class="product__amount__decrement">-</div>
                        <div class="product__amount">1</div>
                        <div class="product__amount__increment">+</div>
                      </div>
                      <div class="product__btn__order button" data-product-id ="${
                        product.id
                      }">
                        <p class="btn__order_text btn__text">Замовити</p>
                        <img
                          src="icons/basket-shop.svg"
                          alt=""
                          class="btn__basket__img"
                        />
                      </div>
                    </div>
                  </div>
              `;
      return productDiv;
    }
    categoriesBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        filterProducts(btn.textContent);
      });
    });
    displayProducts("Піца");
  }

  function addToCart(productId) {
    const registrationManager = new RegistrationManager();
    const userId = registrationManager.isUserLoggedIn()
      ? registrationManager.getCurrentUserId()
      : null;

    const existingCart = findCartItemById(productId);
    let quantity = 0;
    if (existingCart) {
      quantity = updateCartItem(existingCart, productId);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      quantity = transferQuantity(productId);
      createAndAppendCartItem(productId);
    }

    if (userId) {
      registrationManager.saveCartItem({ userId, productId, quantity });
      console.log(
        "Saved Cart Data:",
        registrationManager.getSavedCartData(userId)
      );
    }

    calculateTotalPriceOrder();
    calculateAccruedBonuses();
  }

  function findCartItemQuantity(productId) {
    const existingCart = findCartItemById(productId);
    if (existingCart) {
      return existingCart.querySelector(".product__amount").textContent;
    } else {
      const basketProduct = document.querySelector(
        `.basket__product[data-product-id="${productId}"]`
      );
      return basketProduct
        ? basketProduct.querySelector(".product__amount").textContent
        : null;
    }
  }

  function updateCartItemQuantity(productId, quantity) {
    updateCartItem(findCartItemById(productId), productId);
    console.log("Updated Quantity:", quantity);
  }

  // Other helper functions...

  function updateQuantityByIdInLocalStorage(userId, productId, quantity) {
    // Step 1: Retrieve the cart data from local storage
    const cartData = loadCartDataFromLocalStorage();

    // Step 2: Find the product in the cart data based on userId and productId
    const productInCart = cartData.find(
      (item) => item.userId === userId && item.id === productId
    );

    // Step 3: Access the quantity property of the found product
    if (productInCart) {
      productInCart.quantity = quantity;

      // Step 4: Save the updated cart data back to local storage
      saveCartDataToLocalStorage(cartData);
    }
  }

  function loadCartDataFromLocalStorage() {
    const savedCartData = localStorage.getItem("cartData");
    return savedCartData ? JSON.parse(savedCartData) : [];
  }

  function saveCartDataToLocalStorage(cartData) {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

  function updateCartItem(cartItem, id) {
    const quantityElement = cartItem.querySelector(".product__amount");
    const productDefaultPrice = cartItem.querySelector(
      ".product__default__price__value"
    );
    let currentQuantity = +quantityElement.textContent + +transferQuantity(id);

    quantityElement.textContent = currentQuantity;
    cartItem.querySelector(".product__total__price__value").textContent =
      productDefaultPrice.textContent * currentQuantity;
    return currentQuantity;
  }

  function createAndAppendCartItem(id) {
    const cartProductElement = createCartProduct(id);

    if (cartProductElement) {
      const quantity = transferQuantity(id);
      const totalProductPrice = calculatePriceProduct(id);

      cartProductElement.querySelector(".product__amount").textContent =
        quantity;
      cartProductElement.querySelector(
        ".product__total__price__value"
      ).textContent = totalProductPrice;

      basketOutput.appendChild(cartProductElement);
    }
  }
  function createCartProduct(id) {
    let cartProduct = findProductById(id);

    // Check if the product is found before proceeding
    if (cartProduct) {
      let cartProductDiv = document.createElement("div");
      cartProductDiv.className = "basket__product";
      cartProductDiv.innerHTML = `
                  <div class="basket__product__img">
                    <img src="${cartProduct.image}" alt="" class="product__img" />
                  </div>
                  <div class="product__info">
                    <div class="product__title__wrap">
                      <p class="product__title">${cartProduct.title}</p>
                      <img src="icons/delete.svg" alt="" data-product-id=${cartProduct.id} class="product__delete" />
                    </div>
                    <div class="product__controls">
                      <div class="product__default__price">
                        <p class="product__default__price__value">${cartProduct.price}</p>
                        <p class="product__default__price__currency">грн</p>
                      </div>
                      <div class="product__control__action">
                        <div class="product__amount__control">
                          <div class="product__amount__decrement">-</div>
                          <div class="product__amount">0</div>
                          <div class="product__amount__increment">+</div>
                        </div>
                      </div>
                      <div class="product__total__price">
                        <p class="product__total__price__value product__price">0</p>
                        <p class="product__total__price__currency">грн</p>
                      </div>
                    </div>
                  </div>
                `;
      return cartProductDiv;
    } else {
      console.error(`Product with id ${id} not found.`);
      return null;
    }
  }
  function calculatePriceProduct(id) {
    const productButtons = productsContainer.querySelectorAll(
      ".product__btn__order"
    );

    for (const productButton of productButtons) {
      const productId = productButton.getAttribute("data-product-id");

      // Use strict equality for comparison
      console.log(+productId === +id);

      if (+productId === +id) {
        // Use strict equality to retrieve the correct product price
        return productButton
          .closest(".product")
          .querySelector(".product__price").textContent;
      }
    }
  }
  function findCartItemById(id) {
    const cartItems = basketOutput.querySelectorAll(".basket__product");

    for (const cartItem of cartItems) {
      const deleteButton = cartItem.querySelector(".product__delete");
      const productId = +deleteButton.getAttribute("data-product-id");

      // Use strict equality for comparison
      if (productId === +id) {
        return cartItem;
      }
    }

    return null;
  }
  function transferQuantity(id) {
    const productBtns = productsContainer.querySelectorAll(
      ".product__btn__order"
    );

    for (let productBtn of productBtns) {
      const productId = productBtn.getAttribute("data-product-id");

      // Use strict equality for comparison
      if (+productId === id) {
        // Adjust the query to get the quantity of the specific product
        const quantityElement = productBtn
          .closest(".product")
          .querySelector(".product__amount");
        return quantityElement.textContent;
      }
    }

    return null; // Return an appropriate value if the product is not found
  }

  productsContainer.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("product__amount__decrement")) {
      handleQuantityChange(target, -1);
    } else if (target.classList.contains("product__amount__increment")) {
      handleQuantityChange(target, 1);
    } else if (target.classList.contains("product__btn__order")) {
      const productId = target.getAttribute("data-product-id");
      addToCart(+productId);
    }
  });
  btnBasketOpen.addEventListener("click", function () {
    basket.style.display = "block";
  });

  // Event listener for closing the basket
  btnBasketClose.addEventListener("click", function () {
    basket.style.display = "none";
  });
  basketOutput.addEventListener("click", function (event) {
    const target = event.target;

    // Check if the clicked element is a "product__delete" button
    if (target.classList.contains("product__delete")) {
      const productId = target.getAttribute("data-product-id");
      deleteProductFromCart(productId);
    } else if (target.classList.contains("product__amount__increment")) {
      handleBasketQuantityChange(target, 1);
    } else if (target.classList.contains("product__amount__decrement")) {
      handleBasketQuantityChange(target, -1);
    }

    calculateTotalPriceOrder();
    calculateAccruedBonuses();
  });

  function handleQuantityChange(target, change) {
    const product = target.closest(".product");
    const countInput = product.querySelector(".product__amount");
    const productPrice = product.querySelector(".product__price");
    let amount = +countInput.textContent + change;

    if (amount > 0) {
      countInput.textContent = amount;
      const initialPrice = +productPrice.dataset.initialPrice;
      const newPrice = initialPrice * amount;
      productPrice.textContent = newPrice;
    }
  }
  function handleBasketQuantityChange(target, change) {
    const product = target.closest(".basket__product");
    const productId = +product
      .querySelector(".product__delete")
      .getAttribute("data-product-id");
    const countInput = product.querySelector(".product__amount");
    const productDefaultPrice = product.querySelector(
      ".product__default__price__value"
    );
    const productTotalPrice = product.querySelector(
      ".product__total__price__value"
    );

    const registrationManager = new RegistrationManager();
    const userId = registrationManager.getCurrentUserId();
    let cartData = registrationManager.getSavedCartData(userId) || [];
    let amount = +countInput.textContent + change;

    if (amount > 0) {
      const productIndex = cartData.findIndex(
        (item) => +item.productId === +productId
      );
      if (productIndex !== -1) {
        // Update the quantity based on the change (increment or decrement)
        cartData[productIndex].quantity = amount;
        localStorage.setItem(`cartData_${userId}`, JSON.stringify(cartData));
      }
      countInput.textContent = amount;
      const defaultPrice = productDefaultPrice.textContent;
      const newPrice = defaultPrice * amount;
      productTotalPrice.textContent = newPrice;
    }
  }

  function calculateTotalPriceOrder() {
    const products = document.querySelectorAll(".basket__product");
    let totalPriceOutput = document.querySelector(".basket__sum__amount");

    const totalPrice = Array.from(products).reduce((total, product) => {
      const priceProduct = +product.querySelector(
        ".product__total__price__value"
      ).textContent;
      return total + priceProduct;
    }, 0);

    totalPriceOutput.textContent = totalPrice;
  }

  function calculateAccruedBonuses() {
    const products = document.querySelectorAll(".basket__product");
    const accreudBonusesOutput = document.querySelector(
      ".basket__bonus__amount"
    );

    const accreudBonuses = Array.from(products).reduce(
      (totalBonuses, product) => {
        const productId = +product
          .querySelector(".product__delete")
          .getAttribute("data-product-id");
        const originalProduct = findProductById(productId);

        if (originalProduct) {
          const bonusValue = +originalProduct.bonus;
          const quantity =
            +product.querySelector(".product__amount").textContent;
          return totalBonuses + bonusValue * quantity;
        }

        return totalBonuses;
      },
      0
    );

    accreudBonusesOutput.textContent = accreudBonuses;
  }
  function deleteProductFromCart(id) {
    const productToDelete = document.querySelector(`[data-product-id="${id}"]`);
    if (productToDelete) {
      productToDelete.closest(".basket__product").remove();
    }
    const registrationManager = new RegistrationManager();
    const userId = registrationManager.getCurrentUserId();
    const cartData = registrationManager.getSavedCartData(userId) || [];
    const productIndex = cartData.findIndex((item) => +item.productId === +id);
    console.log(cartData);
    console.log(cartData.findIndex((item) => item.productId === id));

    if (productIndex !== -1) {
      // Remove the product from the cart data
      cartData.splice(productIndex, 1);

      // Save the updated cart data back to local storage
      localStorage.setItem(`cartData_${userId}`, JSON.stringify(cartData));
    }
  }
  function findProductById(productId) {
    if (!categoriesData) {
      console.error("Categories data not available.");
      return null;
    }

    for (const categoryName in categoriesData.categories) {
      const categoryProducts = categoriesData.categories[categoryName];

      const foundProduct = categoryProducts.find(
        (product) => product.id === productId
      );

      if (foundProduct) {
        return foundProduct;
      }
    }

    console.error(`Product with id ${productId} not found.`);
    return null;
  }
});
