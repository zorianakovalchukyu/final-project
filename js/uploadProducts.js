let http = new XMLHttpRequest();
http.open("get", "/js/products.json", true);
http.send();

let pizzaSubcategories = document.querySelectorAll(".subcategory");
const productsOutput = document.querySelector(".products");
let products;

http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    products = JSON.parse(this.responseText);
    displayProducts(products);
  }
};

pizzaSubcategories.forEach((btn) => {
  btn.addEventListener("click", () => {
    productsOutput.innerHTML = "";
    const clicked = btn.getAttribute("data-type");
    if (clicked === "all") {
      displayProducts(products);
    } else {
      const filteredProducts = products.filter((product) =>
        product.category.split(", ").includes(clicked)
      );
      displayProducts(filteredProducts);
    }
  });
});
function displayProduct(productItem) {
  let product = document.createElement("div");
  product.classList.add("product");
  product.innerHTML = `
              <img src="${productItem.image}" alt="${productItem.title}" class="product__img" />
              <p class="product__title">${productItem.title}</p>
              <p class="product__ingredients">${productItem.ingredients}</p>
              <div class="product__control">
                <div class="product__control__info">
                  <div class="product__price__wrapper">
                    <div class="product__price">${productItem.price}</div>
                    <p class="product__price_currency">грн</p>
                    <p class="product_weight">/${productItem.weight} г</p>
                  </div>
                  <p class="product__bonus">+${productItem.bonus} грн бонусів</p>
                </div>
                <div class="product__control__action">
                  <div class="product__amount__control">
                    <div class="product__amount__decrement">-</div>
                    <div class="product__amount">1</div>
                    <div class="product__amount__increment">+</div>
                  </div>
                  <div class="product__btn__order button">
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
  productsOutput.appendChild(product);
}
function displayProducts(arrProducts) {
  arrProducts.forEach(displayProduct);
}
