const btnDecrementCount = document.querySelectorAll(
  ".product__amount__decrement"
);
console.log(btnDecrementCount);
let countInput = document.querySelectorAll(".product__amount");
const btnIncrement = document.querySelectorAll(".product__amount__increment");
let productPrices = document.querySelectorAll(".product__price");
let initialPrices = Array.from(productPrices).map(
  (price) => +price.textContent
);
let amount;
let newPrice;
btnIncrement.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    amount = +countInput[i].textContent;
    amount += 1;
    newPrice = initialPrices[i] * amount;
    countInput[i].textContent = amount;
    productPrices[i].textContent = newPrice;
  });
});

btnDecrementCount.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    amount = +countInput[i].textContent;
    if (amount > 1) {
      amount -= 1;
      newPrice = initialPrices[i] * amount;
      countInput[i].textContent = amount;
      productPrices[i].textContent = newPrice;
    }
  });
});

const btnBasketOpen = document.querySelector(".header__link__basket");
const btnBasketClose = document.querySelector(".basket__close");
let basketOutput = document.querySelector(".menu_body");
btnBasketOpen.onclick = function () {
  basketOutput.style.cssText = "display:block";
};
btnBasketClose.onclick = function () {
  basketOutput.style.cssText = "display:none";
};

//let productCounter = document.querySelector(".product__counter");
const productsContainer = document.querySelector(".products");
const basketProducts = [];
productsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("product__btn__order")) {
    // Access the index of the clicked button
    const buttonIndex = Array.from(this.children).indexOf(
      event.target.closest(".product")
    );
    if (!basketProducts.includes(buttonIndex)) {
      basketProducts.push(buttonIndex);
      addProductToBasket(buttonIndex);
    }
  }
});

function addProductToBasket(i) {
  let basketProducts = document.querySelector(".basket__products");
  let basketProduct = document.createElement("div");
  basketProduct.classList.add("basket__product");
  basketProduct.innerHTML = `
        <div class="basket__product__img">
          <img src="${products[i].image}" alt="" class="product__img" />
        </div>
        <div class="product__info">
          <div class="product__title__wrap">
            <p class="product__title">${products[i].title}</p>
            <img src="icons/delete.svg" alt="" class="product__delete" />
          </div>
          <div class="product__controls">
            <div class="product__default__price">
              <p class="product__default__price__value">${products[i].price}</p>
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
  basketProducts.append(basketProduct);
}
