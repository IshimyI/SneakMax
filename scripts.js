// #region burger-menu

const buttonBurger = document.querySelector(".burger");
const menuBurger = document.querySelector(".burger-menu");

buttonBurger.addEventListener("click", () => {
  buttonBurger.classList.toggle("active");
  menuBurger.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

// #endregion

// #region quiz

const inputPage1 = document.querySelectorAll(
  '.page-type input[type="checkbox"]'
);
const inputPage2 = document.querySelectorAll(
  '.page-size input[type="checkbox"]'
);
const inputPage3 = document.querySelector('.page-label input[type="text"]');

const QuizQuestion1 = document.querySelector(".page-type");
const QuizQuestion2 = document.querySelector(".page-size");
const QuizQuestion3 = document.querySelector(".page-label");
const QuizRes = document.querySelector(".quiz-container-result");
const QuizTitle = document.querySelector(".quiz-container-questions");

const QuizPageForm = document.querySelector(".quiz-page-grid");
const QuizPage2Form = document.querySelector(".quiz-page-grid-2page");
const QuizPage3Form = document.querySelector(".quiz-page-label");

const quizHiddenImg = document.querySelector(".hidden-img-1");

let selectedPage1 = [];
let selectedPage2 = [];
let textInputValue = "";

QuizPageForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

QuizPage2Form.addEventListener("submit", (event) => {
  event.preventDefault();
});

QuizPage3Form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const QuizNext1 = document.querySelector(".quiz-next-button-btn-1");
const QuizNext2 = document.querySelector(".quiz-next-button-btn-2");
const QuizNext3 = document.querySelector(".quiz-next-button-btn-3");

function areCheckboxesChecked(checkboxes) {
  return Array.from(checkboxes).some((checkbox) => checkbox.checked);
}

function isTextInputFilled(input) {
  return input.value.trim().length > 0;
}

function toggleButtonState(button, isEnabled) {
  button.disabled = !isEnabled;
}

inputPage1.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    toggleButtonState(QuizNext1, areCheckboxesChecked(inputPage1));
  });
});

inputPage2.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    toggleButtonState(QuizNext2, areCheckboxesChecked(inputPage2));
  });
});

inputPage3.addEventListener("input", () => {
  toggleButtonState(QuizNext3, isTextInputFilled(inputPage3));
});

QuizNext1.addEventListener("click", (event) => {
  event.preventDefault();
  if (!areCheckboxesChecked(inputPage1)) {
    alert("Пожалуйста, выберите хотя бы один вариант ответа.");
    return;
  }
  QuizQuestion1.classList.add("quiz-page-hidden");
  QuizQuestion2.classList.remove("quiz-page-hidden");
  QuizTitle.scrollIntoView({ behavior: "smooth" });

  selectedPage1 = Array.from(inputPage1)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.nextElementSibling.textContent.trim()); // Текст рядом с чекбоксом
});

QuizNext2.addEventListener("click", (event) => {
  event.preventDefault();
  if (!areCheckboxesChecked(inputPage2)) {
    alert("Пожалуйста, выберите хотя бы один вариант ответа.");
    return;
  }
  QuizQuestion2.classList.add("quiz-page-hidden");
  QuizQuestion3.classList.remove("quiz-page-hidden");
  QuizTitle.scrollIntoView({ behavior: "smooth" });

  selectedPage2 = Array.from(inputPage2)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.nextElementSibling.textContent.trim());
});

QuizNext3.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isTextInputFilled(inputPage3)) {
    alert("Пожалуйста, заполните текстовое поле.");
    return;
  }
  QuizQuestion3.classList.add("quiz-page-hidden");
  QuizTitle.classList.add("quiz-page-hidden");
  QuizRes.classList.remove("quiz-page-hidden");
  QuizTitle.scrollIntoView({ behavior: "smooth" });

  textInputValue = inputPage3.value.trim();
});

const pageForm = document.querySelector("#page-form");

pageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  quizHiddenImg.classList.remove("hidden-img-1");
  quizHiddenImg.classList.add("img-send");
  const formData = new FormData(pageForm);
  const data = Object.fromEntries(formData.entries());
  alert(`
    Тип кроссовок: ${selectedPage1.join(", ")}
    Тип кроссовок: ${selectedPage2.join(", ")}
    Ваши пожелания: ${textInputValue}
    Имя: ${data["page-name"]}
    Почта: ${data["page-email"]}
    `);
});

// #endregion

// #region faq

const buttonFaq1 = document.querySelector(".faq-button-1");
const buttonFaq2 = document.querySelector(".faq-button-2");

const answer1 = document.querySelector(".faq-answer-1");
const answer2 = document.querySelector(".faq-answer-2");

buttonFaq1.addEventListener("click", () => {
  answer1.classList.toggle("faq-answer-open");
  buttonFaq1.classList.toggle("faq-button-open");
});

buttonFaq2.addEventListener("click", () => {
  answer2.classList.toggle("faq-answer-open");
  buttonFaq2.classList.toggle("faq-button-open");
});

// #endregion

// #region cta

const ctaForm = document.querySelector("#cta-form");

ctaForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(ctaForm);
  const data = Object.fromEntries(formData.entries());
  alert(`Имя: ${data["cta-name"]}\nТелефон: ${data["cta-phone"]}`);
});

document.addEventListener("DOMContentLoaded", function () {
  var eventCalllback = function (e) {
    var el = e.target,
      clearVal = el.dataset.phoneClear,
      pattern = el.dataset.phonePattern,
      matrix_def = "+_(___) ___-__-__",
      matrix = pattern ? pattern : matrix_def,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = e.target.value.replace(/\D/g, "");
    if (clearVal !== "false" && e.type === "blur") {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        e.target.value = "";
        return;
      }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
  };
  var phone_inputs = document.querySelectorAll("[data-phone-pattern]");
  for (let elem of phone_inputs) {
    for (let ev of ["input", "blur", "focus"]) {
      elem.addEventListener(ev, eventCalllback);
    }
  }
});

// #endregion

// #region products
const basket = [];

const products = [
  {
    id: 1,
    className: ".add-to-cart-1",
    name: "Женские кроссовки Puma Force 1 Shadow",
    price: 9999,
    discontPrice: 11999,
    images: [
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
    ],
    sex: "Женские",
    size: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
    count: 133,
    rating: 5,
    description:
      "Женские кроссовки Puma Force 1 Shadow, с красивой подошвой возрождения и состав в отличие от обычных женских кроссовок на рынке. Подходит для любого возрождения, включая длинные формы и строгие тенденции. Это простой и удобный вариант для любого возрождения.",
    colors: "Разноцветный",
    material: ["Кожа", "текстиль", "резина"],
    country: "Вьетнам",
  },
  {
    id: 2,
    className: ".add-to-cart-2",
    name: "Кроссовки Nike Air Force 1 '07 QS",
    price: 20899,
    discontPrice: 22899,
    images: [
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
    ],
    sex: "Мужские",
    size: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
    count: 244,
    rating: 5,
    description:
      "Кроссовки Nike Air Force 1 '07 QS, с красивой подошвой возрождения и состав в отличие от обычных женских кроссовок на рынке. Подходит для любого возрождения, включая длинные формы и строгие тенденции. Это простой и удобный вариант для любого возрождения.",
    colors: "Черный",
    material: ["Кожа", "текстиль", "резина"],
    country: "Китай",
  },
  {
    id: 3,
    className: ".add-to-cart-3",
    name: "Кроссовки Puma RS-X³ Puzzle",
    price: 14999,
    discontPrice: 16999,
    images: [
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
    ],
    sex: "Унисекс",
    size: ["36", "38", "40", "42", "44"],
    count: 150,
    rating: 4,
    description:
      "Кроссовки Puma RS-X³ Puzzle с уникальным дизайном и технологией амортизации RS Foam. Комфорт и стиль для городских приключений.",
    colors: "Синий",
    material: ["Текстиль", "резина", "полиуретан"],
    country: "Вьетнам",
  },
  {
    id: 4,
    className: ".add-to-cart-4",
    name: "Кроссовки Reebok Zig Kinetica",
    price: 16999,
    discontPrice: 18999,
    images: [
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
    ],
    sex: "Женские",
    size: ["36", "37", "38", "39"],
    count: 80,
    rating: 4,
    description:
      "Reebok Zig Kinetica — инновационные кроссовки с системой амортизации Zig Energy Shell для легкости и динамичного движения.",
    colors: "Розовый",
    material: ["Текстиль", "резина"],
    country: "Камбоджа",
  },
  {
    id: 5,
    className: ".add-to-cart-5",
    name: "Кроссовки New Balance 574 Core",
    price: 13999,
    discontPrice: 15999,
    images: [
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
    ],
    sex: "Унисекс",
    size: ["35", "36", "37", "38", "40", "42"],
    count: 210,
    rating: 4,
    description:
      "Классика в каждой детали. New Balance 574 Core сочетают комфорт и долговечность, идеальны для активного образа жизни.",
    colors: "Серый",
    material: ["Замша", "текстиль", "резина"],
    country: "США",
  },
  {
    id: 6,
    className: ".add-to-cart-6",
    name: "Кроссовки Asics Gel-Kayano 28",
    price: 17999,
    discontPrice: 19999,
    images: [
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
    ],
    sex: "Мужские",
    size: ["39", "40", "41", "43"],
    count: 100,
    rating: 5,
    description:
      "Asics Gel-Kayano 28 с усовершенствованной амортизацией и поддержкой стопы. Подходят для долгих тренировок и пробежек.",
    colors: "Красный",
    material: ["Синтетика", "резина"],
    country: "Япония",
  },
  {
    id: 7,
    className: ".add-to-cart-7",
    name: "Кроссовки Saucony Shadow 5000",
    price: 12999,
    discontPrice: 14999,
    images: [
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
    ],
    sex: "Унисекс",
    size: ["37", "38", "39", "40", "42"],
    count: 70,
    rating: 5,
    description:
      "Эстетика ретро-дизайна и современные технологии. Saucony Shadow 5000 подойдут для стильного городского образа.",
    colors: "Зеленый",
    material: ["Замша", "текстиль", "резина"],
    country: "Индонезия",
  },
  {
    id: 8,
    className: ".add-to-cart-8",
    name: "Кроссовки Vans Old Skool",
    price: 10999,
    discontPrice: 12999,
    images: [
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
    ],
    sex: "Унисекс",
    size: ["35", "36", "37", "38"],
    count: 300,
    rating: 5,
    description:
      "Икона уличного стиля. Vans Old Skool с прочной подошвой и культовым дизайном для повседневного использования.",
    colors: "Черно-белый",
    material: ["Хлопок", "резина"],
    country: "Китай",
  },
  {
    id: 9,
    className: ".add-to-cart-1",
    name: "Кроссовки Adidas Ultraboost 22",
    price: 18999,
    discontPrice: 20999,
    images: [
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
    ],
    sex: "Мужские",
    size: ["39", "40", "41", "42", "43", "44"],
    count: 120,
    rating: 5,
    description:
      "Универсальные и стильные кроссовки Adidas Ultraboost 22 с улучшенной амортизацией и дышащим материалом. Идеальны для повседневного использования и занятий спортом.",
    colors: "Белый",
    material: ["Текстиль", "резина"],
    country: "Индонезия",
  },
  {
    id: 10,
    className: ".add-to-cart-2",
    name: "Кроссовки Nike Air Max 270",
    price: 19999,
    discontPrice: 21999,
    images: [
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
    ],
    sex: "Женские",
    size: ["39", "40", "41", "42", "43", "44"],
    count: 120,
    rating: 4,
    description:
      "Кроссовки Nike Air Max 270 с улучшенной амортизацией и дышащим материалом. Идеальны для повседневного использования и занятий спортом.",
    colors: "Черный",
    material: ["Текстиль", "резина"],
    country: "Китай",
  },
];

// #endregion

// #region products-filters

const prices = [];
products.forEach((product) => {
  prices.push(product.price);
});

let sizes = [];
products.forEach((product) => {
  product.size.forEach((size) => {
    sizes.push(size);
  });
});
sizes = [...new Set(sizes)];

const initialFilters = {
  minPrice: Math.min(...prices),
  maxPrice: Math.max(...prices),
  genderMale: true,
  genderFemale: true,
  size: [...sizes],
};

const currentFilters = { ...initialFilters };

window.onload = function () {
  slideOne();
  slideTwo();
};

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

sliderOne.min = Math.min(...prices);
sliderOne.max = Math.max(...prices);
sliderOne.value = currentFilters.minPrice;

sliderTwo.min = Math.min(...prices);
sliderTwo.max = Math.max(...prices);
sliderTwo.value = currentFilters.maxPrice;

sliderMaxValue = Math.max(...prices);

function slideOne() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
  }
  displayValOne.textContent = sliderOne.value;
  fillColor();
}
function slideTwo() {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderTwo.value = parseInt(sliderOne.value) + minGap;
  }
  displayValTwo.textContent = sliderTwo.value;
  fillColor();
}

function fillColor() {
  let percent1 =
    ((sliderOne.value - sliderOne.min) / (sliderMaxValue - sliderOne.min)) *
    100;
  let percent2 =
    ((sliderTwo.value - sliderTwo.min) / (sliderMaxValue - sliderTwo.min)) *
    100;

  sliderTrack.style.background = `linear-gradient(
    to right, 
    #dadae5 ${percent1}%, 
    #444B58 ${percent1}%, 
    #444B58 ${percent2}%, 
    #dadae5 ${percent2}%
  )`;
}

const filterGender = document.querySelectorAll(
  ".products-filters-gender-wrapper input"
);
const filterSize = document.querySelectorAll(
  ".products-filters-size-grid button"
);

filterSize.forEach((size) => {
  size.addEventListener("click", () => {
    size.classList.toggle("active");
  });
});

const filtersApply = document.querySelector(".products-filters-button-apply");
filtersApply.addEventListener("click", () => {
  currentFilters.minPrice = sliderOne.value;
  currentFilters.maxPrice = sliderTwo.value;
  currentFilters.genderMale = filterGender[0].checked;
  currentFilters.genderFemale = filterGender[1].checked;

  const selectedSizes = [];

  filterSize.forEach((size) => {
    if (size.classList.contains("active")) {
      selectedSizes.push(size.dataset.size);
    }
  });
  console.log(currentFilters);

  currentFilters.size = selectedSizes.filter((item) => item);
  filterProducts();
  productsBtn();
});

const filtersReset = document.querySelector(".products-filters-button-reset");
filtersReset.addEventListener("click", () => {
  currentFilters.minPrice = initialFilters.minPrice;
  currentFilters.maxPrice = initialFilters.maxPrice;
  currentFilters.genderMale = initialFilters.genderMale;
  currentFilters.genderFemale = initialFilters.genderFemale;
  currentFilters.size = initialFilters.size;

  sliderOne.value = initialFilters.minPrice;
  sliderTwo.value = initialFilters.maxPrice;
  filterGender[0].checked = initialFilters.genderMale;
  filterGender[1].checked = initialFilters.genderFemale;
  fillColor();
  slideOne();
  slideTwo();
  filterSize.forEach((size) => {
    size.classList.remove("active");
    filterProducts();
  });
  productsBtn();
});

// #endregion

// #region products-section

const productsGrid = document.querySelector(".products-grid");
let countForProducts = 0;

function filterProducts() {
  countForProducts = 0;
  productsGrid.innerHTML = "";

  const filteredProducts = products.filter((product) => {
    const isMale =
      currentFilters.genderMale && product.sex.trim() === "Мужские";
    const isFemale =
      currentFilters.genderFemale && product.sex.trim() === "Женские";
    const isUnisex = product.sex.trim() === "Унисекс";

    const hasSize =
      currentFilters.size.length > 0
        ? currentFilters.size.some((size) => product.size.includes(size))
        : true;

    return (
      product.price >= currentFilters.minPrice &&
      product.price <= currentFilters.maxPrice &&
      (isMale || isFemale || isUnisex) &&
      hasSize
    );
  });

  console.log(filteredProducts);

  filteredProducts.forEach((product, index) => {
    countForProducts++;
    const productElement = document.createElement("div");
    productElement.classList.add("products-item");

    if (index === 1) {
      productElement.classList.add("products-item-2");
    }
    if (index === 2 || index === 3) {
      productElement.classList.add("products-item-3");
    }
    if (index === 3 || index === 4 || index === 5) {
      productElement.classList.add("products-item-4");
    }
    if (index > 5) {
      productElement.classList.add("products-item-5");
    }

    productElement.innerHTML = `
    <div class="products-item-img-btns">
      <img
        class="products-item-img"
        src="${product.images[0]}"
        alt="Картинка ботинка"
      />
      <div class="products-item-btns">
        <button class="products-item-btn product-open" data-id="${product.id}">
          <img
            class="svg svg-eye"
            src="Images/Eye.svg"
            alt="Посмотреть товары"
          />
        </button>
        <button class="${product.className.replace(
          ".",
          ""
        )} products-item-btn add-to-cart-btn" data-id="${product.id}">
          <img
            class="svg svg-vector"
            src="Images/Vector.svg"
            alt="Добавить в корзину"
          />
        </button>
      </div>
    </div>
    <p class="products-item-info">${product.name}</p>
    <p class="products-item-price">${product.price} р</p>
    
  `;
    productsGrid.appendChild(productElement);
  });
  productsBtn();
  attachProductHandlers();
}
filterProducts();

// #endregion

// #region products-btn

function productsBtn() {
  const buttonOpenProducts = document.querySelector(".products-button");

  if (buttonOpenProducts.classList.contains("products-button-open")) {
    buttonOpenProducts.classList.remove("products-button-open");
  }

  const productHidden2 = document.querySelector(".products-item-2");
  const productHidden3 = document.querySelectorAll(".products-item-3");
  const productHidden4 = document.querySelectorAll(".products-item-4");
  const productHidden5 = document.querySelectorAll(".products-item-5");

  buttonOpenProducts.addEventListener("click", () => {
    productHidden2.classList.remove("products-item-2");
    productHidden3.forEach((product) => {
      product.classList.remove("products-item-3");
    });
    productHidden4.forEach((product) => {
      product.classList.remove("products-item-4");
    });
    productHidden5.forEach((product) => {
      product.classList.remove("products-item-5");
    });

    buttonOpenProducts.classList.add("products-button-open");
  });
  updateStyle();
}

function updateStyle() {
  const buttonOpenProducts = document.querySelector(".products-button");

  if (window.innerWidth > 1280 && countForProducts < 7) {
    buttonOpenProducts.classList.add("products-button-open");
  } else {
    buttonOpenProducts.classList.remove("products-button-open");
  }

  if (window.innerWidth > 1024 && countForProducts < 5) {
    buttonOpenProducts.classList.add("products-button-open");
  } else {
    buttonOpenProducts.classList.remove("products-button-open");
  }

  if (window.innerWidth > 768 && countForProducts < 3) {
    buttonOpenProducts.classList.add("products-button-open");
  } else {
    buttonOpenProducts.classList.remove("products-button-open");
  }

  if (window.innerWidth > 480 && countForProducts < 2) {
    buttonOpenProducts.classList.add("products-button-open");
  } else {
    buttonOpenProducts.classList.remove("products-button-open");
  }
}

updateStyle();

window.addEventListener("resize", updateStyle());

// #endregion

// #region dialog-product

const dialogProduct = document.getElementById("dialog-product");

function toggleDialogProduct() {
  if (dialogProduct.open) {
    dialogProduct.close();
  } else {
    dialogProduct.showModal();
  }
}

// Закрытие диалога при клике вне его области
dialogProduct.addEventListener("click", (event) => {
  if (event.target === dialogProduct) {
    toggleDialogProduct();
  }
});

function attachProductHandlers() {
  const productBtns = document.querySelectorAll(".product-open");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  productBtns.forEach((el) => {
    el.addEventListener("click", toggleDialogProduct);
    el.addEventListener("click", () => {
      const id = parseInt(el.dataset.id, 10);
      const product = products.find((item) => item.id === id);
      if (!product) return;
      console.log("Открыть диалог с продуктом:", product);
      updateDialogProductContent(product);
    });
  });

  addToCartButtons.forEach((el) => {
    el.addEventListener("click", () => {
      const id = parseInt(el.dataset.id, 10);
      const product = products.find((item) => item.id === id);
      if (product) {
        basket.push({ ...product, uniqueId: Date.now() });
        console.log("Добавлен в корзину:", product);
        renderBasketItems();
      }
    });
  });
}

function updateDialogProductContent(product) {
  dialogProduct.innerHTML = `
     <div class="dialog-products-2sides">
        <div class="dialog-product-left">
      <div class="big-imgs">
        ${product.images
          .map((img, index) =>
            index === 0
              ? `<img class="big-img big-img-z big-img-${
                  index + 1
                }" src="${img}" alt="Главное фото ${index + 1}" />`
              : `<img class="big-img big-img-${
                  index + 1
                }" src="${img}" alt="Главное фото ${index + 1}" />`
          )
          .join("")}
      </div>
      <div class="small-imgs">
        ${product.images
          .map(
            (img, index) =>
              `<div class="small-img-wrapper">
                <img class="small-img small-img-${
                  index + 1
                }" src="${img}" alt="Доп фото ${index + 1}" />
              </div>`
          )
          .join("")}
      </div>
    </div>
    <div class="dialog-product-right">
      <div class="dialog-product-header">
        <div class="number">
          <span>Артикул:</span>
          <span>${product.id}</span>
        </div>
        <div class="quonity">
          <span>В наличии:</span>
          <span>${product.count} шт</span>
        </div>
      </div>
      <div class="dialog-product-title">
        <p>${product.name}</p>
      </div>
      <div class="rating">
        ${Array.from({ length: 5 })
          .map(
            (_, i) =>
              `<span class="rating-star">${
                i < product.rating ? "★" : "☆"
              }</span>`
          )
          .join("")}
      </div>
      <div class="size-btns">
        ${product.size
          .map((size) => `<button class="size-btn">${size}</button>`)
          .join("")}
      </div>
      <div class="prices">
        <div class="price-sale">${product.price} ₽</div>
        <div class="price-no-sale">${product.discontPrice} ₽</div>
      </div>
      <button class="add-to-cart add-to-cart-dialog-btn add-to-cart-btn">Добавить в корзину</button>
      <div class="pluses-delivery">
        <div class="plus-delivery">
          ✔︎ <span>Бесплатная доставка до двери</span>
        </div>
        <div class="plus-delivery">
          ✔︎ <span>Оплата заказа при получении</span>
        </div>
        <div class="plus-delivery">
          ✔︎ <span>Обмен в течении двух недель</span>
        </div>
      </div>
    </div>
  </div>
  <div class="dialog-products-2sides">
    <div class="dialog-product-left">
      <div class="description">
        <p class="description-title">Описание</p>
        <p class="description-main">${product.description}</p>
      </div>
    </div>
    <div class="dialog-product-right">
      <div class="characteristic">
        <p class="characteristic-title">Характеристики</p>
        <div class="characteristic-main">
          <div class="characteristic-item">
            <p>Пол: ${product.sex}</p>
            <p>Цвета: ${product.colors}</p>
            <p>Состав: ${product.material.join(", ")}</p>
            <p>Страна: ${product.country}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  const addingToCartFromDaialog = document.querySelector(
    ".add-to-cart-dialog-btn"
  );
  addingToCartFromDaialog.addEventListener("click", () => {
    basket.push({ ...product, uniqueId: Date.now() }); // Добавляем товар в basket
    console.log("Товар добавлен:", product);
    renderBasketItems();
  });
  const smallImgs = document.querySelectorAll(".small-img");
  const bigImgs = document.querySelectorAll(".big-img");

  smallImgs.forEach((img, index) => {
    if (index !== 0) {
      img.addEventListener("mouseover", () => {
        bigImgs[index].classList.add("big-img-z");
        bigImgs[0].classList.remove("big-img-z");
      });
    }
  });

  smallImgs.forEach((img, index) => {
    if (index !== 0) {
      img.addEventListener("mouseout", () => {
        bigImgs[index].classList.remove("big-img-z");
        bigImgs[0].classList.add("big-img-z");
      });
    }
  });
  dialogProduct.showModal();
}

dialogProduct.close();

// #endregion

// #region dialog-basket

const dialogBasket = document.getElementById("dialog-basket");
const btnBasket = document.querySelectorAll(".basket-open");

const addToBasket = document.querySelectorAll(
  products.map((item) => `.${item.className.replace(".", "")}`).join(", ")
);

const numberOfItems = document.querySelector(".basket-items-toggle");

function updateNumberOfItems() {
  numberOfItems.textContent = basket.length;
  if (basket.length === 0) {
    numberOfItems.classList.add("basket-items-disable");
  } else {
    numberOfItems.classList.remove("basket-items-disable");
  }
}

function toggleDialogBasket() {
  if (dialogBasket.open) {
    dialogBasket.close();
  } else {
    dialogBasket.showModal();
  }
}

function renderBasketItems() {
  const basketContainer = document.getElementById("basket-items");
  const dialogOrderCompositionItems = document.getElementById(
    "dialog-order-composition-items"
  );

  basketContainer.innerHTML = ""; // Очищаем контейнер перед рендерингом
  dialogOrderCompositionItems.innerHTML = "";

  // Проходимся по массиву basket и добавляем элементы в разметку
  basket.forEach((item) => {
    const basketItem = document.createElement("div");
    const dialogOrderCompositionItem = document.createElement("div");

    basketItem.className = "basket-item";
    basketItem.innerHTML = `
        <div class="basket-item-image">
          <img src="${item.images[0]}" alt="${item.name}" />
        </div>
        <div class="basket-item-info">
          <p class="basket-item-name">${item.name}</p>
          <p class="basket-item-price">${item.price} ₽</p>
        </div>
        <button class="basket-item-remove" data-id="${item.id}">
          <img src="Images/trash.svg" alt="Удалить" />
        </button>
      `;

    dialogOrderCompositionItem.className = "dialog-order-composition-item";
    dialogOrderCompositionItem.innerHTML = `
          <div class="basket-item-image">
            <img src="${item.images[0]}" alt="${item.name}" />
          </div>
          <div class="basket-item-info">
            <p class="basket-item-name">${item.name}</p>
            <p class="basket-item-price">${item.price} ₽</p>
          </div>
          <button class="basket-item-remove remove-from-dialog-order" data-id="${item.id}">
            Удалить
          </button>
        `;

    // Добавляем обработчик для кнопки удаления
    basketItem
      .querySelector(".basket-item-remove")
      .addEventListener("click", () => {
        removeFromBasket(item.id);
      });
    dialogOrderCompositionItem
      .querySelector(".basket-item-remove")
      .addEventListener("click", () => {
        removeFromBasket(item.id);
      });

    dialogOrderCompositionItems.appendChild(dialogOrderCompositionItem);
    basketContainer.appendChild(basketItem);
    updateNumberOfItems();
  });

  updateTotalSum();
}

// Функция удаления товара из корзины
function removeFromBasket(id) {
  const index = basket.findIndex((item) => item.id === id);
  if (index !== -1) {
    basket.splice(index, 1); // Удаляем товар из массива basket
    renderBasketItems(); // Обновляем отображение корзины
  }
}

// Функция для подсчета итоговой суммы
const basketButton = document.getElementById("basket-button");
const dialogOrderPrice = document.querySelector(
  ".dialog-order-composition-price-number"
);
const dialogOrderNumber = document.querySelector(
  ".dialog-order-composition-count-number"
);

function updateTotalSum() {
  const totalSum = basket.reduce((sum, item) => sum + item.price, 0);
  if (totalSum === 0) {
    basketButton.classList.add("hidden-basket-button");
    numberOfItems.classList.add("basket-items-disable");
    document.querySelector(
      ".basket-sum-subtitle"
    ).textContent = `${totalSum} ₽`;
  } else {
    basketButton.classList.remove("hidden-basket-button");
    document.querySelector(
      ".basket-sum-subtitle"
    ).textContent = `${totalSum} ₽`;
    dialogOrderPrice.textContent = `${totalSum} ₽`;
    dialogOrderNumber.textContent = `${basket.length} шт`;
  }
}

// Открытие диалога при нажатии на кнопку
btnBasket.forEach((el) => {
  el.addEventListener("click", toggleDialogBasket);
});

// Закрытие диалога при клике вне его области
dialogBasket.addEventListener("click", (event) => {
  if (event.target === dialogBasket) {
    toggleDialogBasket();
  }
});

dialogBasket.close();

// #endregion

// #region dialog-order

const dialogOrder = document.getElementById("dialog-order");

basketButton.addEventListener("click", () => {
  dialogBasket.close();
  dialogOrder.showModal();
});

function toggleDialogOrder() {
  if (dialogOrder.open) {
    dialogOrder.close();
  } else {
    dialogOrder.showModal();
  }
}

dialogOrder.addEventListener("click", (event) => {
  if (event.target === dialogOrder) {
    toggleDialogOrder();
  }
});

const randomNumbers = document.querySelectorAll(".random-number");

randomNumbers[0].innerHTML = Math.floor(Math.random() * 10000);
randomNumbers[1].innerHTML = Math.floor(Math.random() * 100);

const dialogOrderForm = document.querySelector("#dialog-order-form");

dialogOrderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(dialogOrderForm);
  const data = Object.fromEntries(formData.entries());

  const basketItems = [];
  basket.forEach((item) => {
    basketItems.push(item.name);
  });
  alert(
    `
    Количество товаров в заказе: ${dialogOrderNumber.textContent}
    Сумма заказа: ${dialogOrderPrice.textContent}
    Имя: ${data["dialog-order-name"]}
    Телефон: ${data["dialog-order-phone"]}
    E-mail: ${data["dialog-order-email"]}
    Заказанные товары:
${basketItems.map((item) => "    " + item).join(",\n")}
    `
  );
});

const dialogOrderCompositionButton = document.querySelector(
  ".dialog-order-composition-btn"
);
const dialogOrderCompositionWrapper = document.querySelector(
  ".dialog-order-composition-wrapper"
);

dialogOrderCompositionButton.addEventListener("click", () => {
  dialogOrderCompositionWrapper.classList.toggle(
    "dialog-order-composition-wrapper-hide"
  );
  dialogOrderCompositionButton.classList.toggle(
    "dialog-order-composition-btn-active"
  );
});
// #endregion

// TODO Скрывать кнопку показать еще если товаров после фильтра слишком мало
