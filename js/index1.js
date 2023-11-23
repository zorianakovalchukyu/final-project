document.addEventListener("DOMContentLoaded", function () {
  const categories = {
    Піца: [
      {
        id: 1,
        image: "icons/products/pizza/kon-birra.webp",
        title: "Кон Бірра",
        ingredients: [
          "Салямі мілано",
          "сир Моцарела",
          "неаполітанський соус",
          "орегано",
        ],
        price: 272,
        weight: 420,
        bonus: 8,
        subcategory: "meat, spicy",
        isNew: "false",
      },
      {
        id: 2,
        image: "icons/products/pizza/tonno.webp",
        title: "Тонно",
        ingredients: [
          "Салямі мілано",
          "сир Моцарела",
          "неаполітанський соус",
          "орегано",
        ],
        price: 256,
        weight: 430,
        bonus: 8,
        subcategory: "vegetables, seafood",
        isNew: "false",
      },
      {
        id: 3,
        image: "icons/products/pizza/kvatro-formadzhi.webp",
        title: "Кватро Формаджі",
        ingredients: [
          "Салямі мілано",
          "сир Моцарела",
          "неаполітанський соус",
          "орегано",
        ],
        price: 298,
        weight: 420,
        bonus: 9,
        subcategory: "vegetables",
        isNew: "false",
      },
    ],
    Салати: [
      {
        id: 4,
        image: "icons/products/pizza/kon-birra.webp",
        title: "Салат з хамоном",
        ingredients: [
          "Мікс салату",
          "хамон",
          "неаполітанський соус",
          "орегано",
        ],
        price: 272,
        weight: 420,
        bonus: 8,
        subcategory: "meat, spicy",
        isNew: "false",
      },
      {
        id: 5,
        image: "icons/products/pizza/tonno.webp",
        title: "Салат з креветкою",
        ingredients: [
          "Салямі мілано",
          "сир Моцарела",
          "неаполітанський соус",
          "орегано",
        ],
        price: 256,
        weight: 430,
        bonus: 8,
        subcategory: "vegetables, seafood",
        isNew: "false",
      },
      {
        id: 6,
        image: "icons/products/pizza/kvatro-formadzhi.webp",
        title: "Салат аля Капрезе",
        ingredients: [
          "Салямі мілано",
          "сир Моцарела",
          "неаполітанський соус",
          "орегано",
        ],
        price: 298,
        weight: 420,
        bonus: 9,
        subcategory: "vegetables",
        isNew: "false",
      },
    ],
    Десерти: [
      {
        id: 7,
        image: "icons/products/pizza/salyami.webp",
        title: "Снікерс",
        ingredients: [
          "Салямі мілано",
          "сир Моцарела",
          "неаполітанський соус",
          "орегано",
        ],

        price: "246",
        weight: "420",
        bonus: "7",
        category: "meat",
        isNew: "false",
      },
      {
        id: 8,
        image: "icons/products/pizza/margaryta.webp",
        title: "Горішки зі згущеним молоком",
        ingredients: [
          "Салямі мілано",
          "сир Моцарела",
          "неаполітанський соус",
          "орегано",
        ],
        price: "172",
        weight: "380",
        bonus: "5",
        category: "vegetables",
        isNew: "false",
      },
    ],
    Напої: [
      {
        id: 9,
        image: "icons/products/pizza/mamaitaliano.webp",
        title: "Dr Pepper",
        ingredients: [
          "Сир моцарела",
          "ніжний крем-сир",
          "сир Дор блю",
          "хамон",
          "свіжа рукола",
          "сир пармезан",
          "вершковий соус",
        ],
        price: "303",
        weight: "450",
        bonus: "9",
        category: "vegetables",
        isNew: "false",
      },
      {
        id: 10,
        image: "icons/products/pizza/gavajska.webp",
        title: "Dr Pepper Вишня",
        ingredients: [
          "Печена курка",
          "ананаси",
          "кукурудза",
          "неаполітанський соус",
          "сир моцарела",
        ],
        price: "241",
        weight: "460",
        bonus: "7",
        category: "meat",
        isNew: "false",
      },
      {
        id: 11,
        image: "icons/products/pizza/diavola.webp",
        title: "Сік Cido 1л апельсин",
        ingredients: [
          "Салямі чарізо",
          "салямі мілано",
          "перець чилі",
          "свіжий і сухий",
          "цибуля маринована",
          "сир моцарела",
          "пікантний соус",
          "неаполвтанський соус",
        ],
        price: "262",
        weight: "460",
        bonus: "8",
        category: "meat, spicy",
        isNew: "false",
      },
      {
        id: 12,
        image: "icons/products/pizza/diavola.webp",
        title: "Сік Cido 1л яблуко",
        ingredients: [
          "Салямі чарізо",
          "салямі мілано",
          "перець чилі",
          "свіжий і сухий",
          "цибуля маринована",
          "сир моцарела",
          "пікантний соус",
          "неаполвтанський соус",
        ],
        price: "262",
        weight: "460",
        bonus: "8",
        category: "meat, spicy",
        isNew: "false",
      },
    ],
  };
  const categoriesBtns = document.querySelectorAll(".header__menu__item");
  const productsContainer = document.querySelector(".products");
  function displayProducts(categoryName) {
    const selectedCategory = categories[categoryName];
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
          <p class="product__ingredients">${product.ingredients.join(", ")}</p>
          <div class="product__control">
            <div class="product__control__info">
              <div class="product__price__wrapper">
                <div class="product__price" data-initial-price = ${
                  product.price
                } >${product.price}</div>
                <p class="product__price_currency">грн</p>
                <p class="product_weight">/${product.weight} г</p>
              </div>
              <p class="product__bonus">+${product.bonus} грн бонусів</p>
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

  function addToCart() {}

  const btnBasketOpen = document.querySelector(".header__link__basket");
  const btnBasketClose = document.querySelector(".basket__close");
  let basketOutput = document.querySelector(".basket__products");
  let basket = document.querySelector(".menu_body");
  btnBasketOpen.onclick = function () {
    basket.style.cssText = "display:block";
  };
  btnBasketClose.onclick = function () {
    basket.style.cssText = "display:none";
  };

  const productOrderBtns = document.querySelectorAll(".product__btn__order");
  function findProductById(productId) {
    for (const categoryName in categories) {
      const categoryProducts = categories[categoryName];

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

  function addToCart(id) {
    let existingCart = findCartItemById(id);
    // Check if cartProductElement is not null before appending
    if (existingCart) {
      let quantityElement = existingCart.querySelector(".product__amount");
      let productDefaultPrice = document.querySelector(
        ".product__default__price__value"
      );
      let currentQuantity =
        +quantityElement.textContent + +transferQuantity(id);
      quantityElement.textContent = currentQuantity;
      existingCart.querySelector(".product__total__price__value").textContent =
        productDefaultPrice.textContent * quantityElement.textContent;
    } else {
      let cartProductElement = createCartProduct(id);
      console.log(createCartProduct(id));
      basketOutput.appendChild(cartProductElement);
      cartProductElement.querySelector(".product__amount").textContent =
        transferQuantity(id);
      cartProductElement.querySelector(
        ".product__total__price__value"
      ).textContent = calculatePriceProduct(id);
    }
  }
  function calculatePriceProduct(id) {
    const products = productsContainer.querySelectorAll(".product__btn__order");
    for (let product of products) {
      console.log(+product.getAttribute("data-product-id" === id));
      if (product.getAttribute("data-product-id") == id) {
        return productsContainer.querySelector(".product__price").textContent;
      }
    }
  }

  function findCartItemById(id) {
    const cartItems = basketOutput.querySelectorAll(".basket__product");
    for (const cartItem of cartItems) {
      const button = cartItem.querySelector(".product__delete");
      if (+button.getAttribute("data-product-id") === +id) {
        return cartItem;
      }
    }
    return null;
  }
  function transferQuantity(id) {
    const products = productsContainer.querySelectorAll(".product__btn__order");
    for (let product of products) {
      console.log(+product.getAttribute("data-product-id" === id));
      if (product.getAttribute("data-product-id") == id) {
        return productsContainer.querySelector(".product__amount").textContent;
      }
    }
  }
  productsContainer.addEventListener("click", function (event) {
    const target = event.target;

    // Check if the clicked element is a "Замовити" button
    if (target.classList.contains("product__btn__order")) {
      const productId = target.getAttribute("data-product-id");

      addToCart(+productId);
      calculateTotalPriceOrder();
      calculateAccruedBonuses();
    }
  });

  function isProductInBasket(id) {
    const btnsProduct = document.querySelectorAll(".product__delete");
    for (let i = 0; i < btnsProduct.length; i++) {
      const productId = btnsProduct[i].getAttribute("data-product-id");
      if (productId === id) {
        return true;
      }
    }
    return false;
  }

  function deleteProductFromCart(id) {
    const btns = document.querySelectorAll(".product__delete");
    btns.forEach((btn) => {
      if (btn.getAttribute("data-product-id") === id) {
        btn.parentNode.parentNode.parentNode.remove();
      }
    });
  }

  basketOutput.addEventListener("click", function (event) {
    const target = event.target;

    // Check if the clicked element is a "product__delete" button
    if (target.classList.contains("product__delete")) {
      const productId = target.getAttribute("data-product-id");
      deleteProductFromCart(productId);
    }
    calculateTotalPriceOrder();
    calculateAccruedBonuses();
  });

  basketOutput.addEventListener("click", function (event) {
    const target = event.target;
    // Check if the clicked element is a "Замовити" button
    if (target.classList.contains("product__amount__increment")) {
      const product = target.closest(".basket__product");
      const countInput = product.querySelector(".product__amount");
      const productDefaultPrice = product.querySelector(
        ".product__default__price__value"
      );
      const productTotalPrice = product.querySelector(
        ".product__total__price__value"
      );
      let amount = +countInput.textContent;
      amount += 1;
      countInput.textContent = amount;
      const defaultPrice = productDefaultPrice.textContent;
      const newPrice = defaultPrice * amount;
      productTotalPrice.textContent = newPrice;
      calculateTotalPriceOrder();
      calculateAccruedBonuses();
    }
  });
  basketOutput.addEventListener("click", function (event) {
    const target = event.target;
    // Check if the clicked element is a "Замовити" button
    if (target.classList.contains("product__amount__decrement")) {
      const product = target.closest(".basket__product");
      const countInput = product.querySelector(".product__amount");
      const productDefaultPrice = product.querySelector(
        ".product__default__price__value"
      );
      const productTotalPrice = product.querySelector(
        ".product__total__price__value"
      );
      let amount = +countInput.textContent;
      if (amount > 1) {
        amount -= 1;
        countInput.textContent = amount;
      }
      const defaultPrice = productDefaultPrice.textContent;
      const newPrice = defaultPrice * amount;
      productTotalPrice.textContent = newPrice;
      calculateTotalPriceOrder();
      calculateAccruedBonuses();
    }
  });

  productsContainer.addEventListener("click", function (event) {
    const target = event.target;

    // Check if the clicked element is a "Замовити" button
    if (target.classList.contains("product__amount__decrement")) {
      const product = target.closest(".product");
      const countInput = product.querySelector(".product__amount");
      const productPrice = product.querySelector(".product__price");
      let amount = +countInput.textContent;
      if (amount > 1) {
        amount -= 1;
        countInput.textContent = amount;
      }
      const initialPrice = +productPrice.dataset.initialPrice;
      const newPrice = initialPrice * amount;
      productPrice.textContent = newPrice;
    }
  });
  productsContainer.addEventListener("click", function (event) {
    const target = event.target;
    // Check if the clicked element is a "Замовити" button
    if (target.classList.contains("product__amount__increment")) {
      const product = target.closest(".product");
      const countInput = product.querySelector(".product__amount");
      const productPrice = product.querySelector(".product__price");
      let amount = +countInput.textContent;
      amount += 1;
      countInput.textContent = amount;
      const initialPrice = +productPrice.dataset.initialPrice;
      console.log(+productPrice.dataset.initialPrice);
      const newPrice = initialPrice * amount;
      productPrice.textContent = newPrice;
    }
  });
  function calculateTotalPriceOrder() {
    const products = document.querySelectorAll(".basket__product");
    let totalPriceOutput = document.querySelector(".basket__sum__amount");
    let totalPrice = 0;
    for (let product of products) {
      let priceProduct = product.querySelector(
        ".product__total__price__value"
      ).textContent;
      console.log(priceProduct);
      totalPrice += +priceProduct;
    }
    console.log(totalPrice);
    totalPriceOutput.textContent = totalPrice;
  }

  function calculateTotalPriceOrder() {
    const products = document.querySelectorAll(".basket__product");
    let totalPriceOutput = document.querySelector(".basket__sum__amount");
    let totalPrice = 0;
    for (let product of products) {
      let priceProduct = product.querySelector(
        ".product__total__price__value"
      ).textContent;
      console.log(priceProduct);
      totalPrice += +priceProduct;
    }
    console.log(totalPrice);
    totalPriceOutput.textContent = totalPrice;
  }
  function calculateAccruedBonuses() {
    const products = document.querySelectorAll(".basket__product");
    let accreudBonuses = 0;
    const accreudBonusesOutput = document.querySelector(
      ".basket__bonus__amount"
    );

    products.forEach((product) => {
      let productId = +product
        .querySelector(".product__delete")
        .getAttribute("data-product-id");
      let originalProduct = findProductById(productId);
      if (originalProduct) {
        let bonusValue = +originalProduct.bonus;
        let quantity = +product.querySelector(".product__amount").textContent;
        accreudBonuses += bonusValue * quantity;
      }
    });
    accreudBonusesOutput.textContent = accreudBonuses;
  }
});
