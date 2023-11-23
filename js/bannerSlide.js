const banner = {
  slide: document.querySelector(".banner"),
  controls: {
    identifiers: document.querySelectorAll(".banner__controls__identifier"),
    backBtn: document.querySelector(".banner__back"),
    forwardBtn: document.querySelector(".banner__forward"),
  },
  slides: [],
  currentSlideIndex: 0,
  slideTimeout: null,
};

function fetchData() {
  fetch("/js/banner-slides.json")
    .then((response) => response.json())
    .then((data) => {
      createSlides(data);
      initializeEventListeners();
      startSlideShow();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function initializeEventListeners() {
  banner.controls.backBtn.addEventListener("click", () => changeSlide(-1));
  banner.controls.forwardBtn.addEventListener("click", () => changeSlide(1));

  banner.controls.identifiers.forEach((btn, i) => {
    btn.addEventListener("click", () => changeSlideToIndex(i));
  });
}

function startSlideShow() {
  banner.slideTimeout = setTimeout(() => {
    changeSlide(1);
    startSlideShow();
  }, 5000);
}

function changeSlide(offset) {
  clearTimeout(banner.slideTimeout);
  banner.currentSlideIndex = (banner.currentSlideIndex + offset + banner.slides.length) % banner.slides.length;
  banner.slide.innerHTML = banner.slides[banner.currentSlideIndex].innerHTML;
  startSlideShow();
}


function changeSlideToIndex(index) {
  clearTimeout(banner.slideTimeout);
  banner.currentSlideIndex = index;
  banner.slide.innerHTML = banner.slides[index].innerHTML;
  startSlideShow();
}

function createSlides(arr) {
  for (let i = 0; i < arr.length; i++) {
    const bannerOutput = document.createElement("div");
    bannerOutput.classList.add("banner__slide");
    bannerOutput.innerHTML = `
              <div class="banner__slide__img">
                  <img
                      src="${arr[i].image}"
                      alt=""
                      class="slide__img"
                  />
              </div>
              <div class="banner__content">
                  <p class="banner__title">${arr[i].title}</p>
                  <p class="banner__description">${arr[i].description}</p>
                  <div class="banner__btn__order button">
                      <p class="btn__order_text btn__text">Замовити</p>
                      <img src="icons/arrow.svg" alt="" class="btn__order_arrow" />
                  </div>
              </div>
      `;
      banner.slides.push(bannerOutput);
  }
  updateIdentifiers(arr.length);
}

function updateIdentifiers(count) {
  const identifiersContainer = document.querySelector(".banner__controls__identifiers");
  identifiersContainer.innerHTML = "";

  for (let j = 0; j < count; j++) {
    const identifier = document.createElement("div");
    identifier.classList.add("banner__controls__identifier");
    identifiersContainer.appendChild(identifier);
  }
}
window.onload = function () {
  fetchData();
  initializeEventListeners();
  startSlideShow();
};