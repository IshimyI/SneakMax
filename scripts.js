const buttonBurger = document.querySelector(".burger");
const menuBurger = document.querySelector(".burger-menu");

buttonBurger.addEventListener("click", () => {
  buttonBurger.classList.toggle("active");
  menuBurger.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

const buttonOpenProducts = document.querySelector(".products-button");
const products1fr = document.querySelectorAll(".products-item-2");
const products2fr = document.querySelectorAll(".products-item-3");
const products3fr = document.querySelectorAll(".products-item-4");
const products4fr = document.querySelectorAll(".products-item-5");

buttonOpenProducts.addEventListener("click", () => {
  products1fr.forEach((product) => {
    product.classList.remove("products-item-2");
  });
  products2fr.forEach((product) => {
    product.classList.remove("products-item-3");
  });
  products3fr.forEach((product) => {
    product.classList.remove("products-item-4");
  });
  products4fr.forEach((product) => {
    product.classList.remove("products-item-5");
  });

  buttonOpenProducts.classList.add("products-button-open");
});

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

const ctaForm = document.querySelector("#cta-form");
ctaForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(ctaForm);
  const data = Object.fromEntries(formData.entries());
  alert(JSON.stringify(data));
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

// dialog-product

const productView = document.querySelectorAll(".product-open");
const dialogProduct = document.querySelector("#dialog-product");

productView.forEach((el) => {
  el.addEventListener("click", () => {
    toggleProductDialog();
  });
});

// Закрытие диалога при клике вне его области
dialogProduct.addEventListener("click", (event) => {
  if (event.target === dialogProduct) {
    toggleProductDialog();
  }
});

const smallImgs = document.querySelectorAll(".small-img");
const bigImgs = document.querySelectorAll(".big-img");

smallImgs.forEach((smallImg, index) => {
  smallImg.addEventListener("mouseover", () => {
    bigImgs.forEach((bigImg) => bigImg.classList.remove("big-img-z"));
    bigImgs[index].classList.add("big-img-z");
  });

  smallImg.addEventListener("mouseout", () => {
    bigImgs.forEach((bigImg) => bigImg.classList.remove("big-img-z"));
    bigImgs[0].classList.add("big-img-z"); // Возврат к первой картинке
  });
});

// dialog-basket

const basketItemsToggle = document.getElementById("basket-items-toggle");
function updateBasketItemsToggle() {
  if (document.querySelector(".basket-sum-subtitle").textContent > 0) {
    basketItemsToggle.classList.add("basket-items-disable");
  } else {
    basketItemsToggle.classList.remove("basket-items-disable");
  }
}

const basketView = document.querySelectorAll(".basket-open");
const dialogBasket = document.querySelector("#dialog-basket");

function toggleDialog(dialog) {
  dialog.open ? dialog.close() : dialog.showModal();
}

document.querySelectorAll(".dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      toggleDialog(dialog);
    }
  });
});

productView.forEach((el) => {
  el.addEventListener("click", () => toggleDialog(dialogProduct));
});

dialogProduct.addEventListener("click", (event) => {
  if (event.target === dialogProduct) toggleDialog(dialogProduct);
});

basketView.forEach((el) => {
  el.addEventListener("click", () => toggleDialog(dialogBasket));
});

dialogBasket.addEventListener("click", (event) => {
  if (event.target === dialogBasket) toggleDialog(dialogBasket);
});

basketView.forEach((el) => {
  el.addEventListener("click", () => {
    toggleDialog();
  });
});

// Закрытие диалога при клике вне его области
dialogBasket.addEventListener("click", (event) => {
  if (event.target === dialogBasket) {
    toggleDialog();
  }
});

const basketItems = []; // Массив для хранения товаров в корзине

// Функция добавления товара в корзину
function addToBasket(name, image, price) {
  const item = {
    id: Date.now(), // Уникальный id для каждого товара, основанный на текущем времени
    name,
    image,
    price,
  };

  basketItems.push(item); // Добавляем товар в корзину
  renderBasketItems(); // Перерисовываем корзину
  updateBasketSum(); // Обновляем сумму после добавления товара
  updateBasketItemsToggle();
}

// Функция отображения всех товаров в корзине
function renderBasketItems() {
  const basketItemsContainer = document.getElementById("basket-items");
  basketItemsContainer.innerHTML = ""; // Очистка контейнера перед рендером

  // Создаем HTML для каждого товара в корзине
  basketItems.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("basket-item");

    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="basket-item-image">
      <div class="basket-item-info">
        <p class="basket-item-name">${item.name}</p>
        <p class="basket-item-price">${item.price} ₽</p>
      </div>
      <button class="basket-item-delete" data-id="${item.id}" data-index="${index}">
       <img src="Images/trash.svg" alt="Удалить" />
      </button>
    `;

    // Добавляем товар в корзину
    basketItemsContainer.appendChild(itemElement);
  });

  // Привязываем обработчики событий для кнопок "Удалить"
  attachDeleteEventListeners(); // Привязываем события удаления
}

// Функция прикрепления обработчиков событий кнопок "Удалить"
function attachDeleteEventListeners() {
  // Находим все кнопки удаления и добавляем обработчик события
  document.querySelectorAll(".basket-item-delete").forEach((button) => {
    button.addEventListener("click", function (event) {
      // Используем event.currentTarget для получения данных с самой кнопки
      const itemId = parseInt(event.currentTarget.getAttribute("data-id"), 10); // Получаем id товара
      const itemIndex = parseInt(
        event.currentTarget.getAttribute("data-index"),
        10
      ); // Получаем индекс товара

      // Проверяем, что id корректный
      if (!isNaN(itemId) && !isNaN(itemIndex)) {
        removeFromBasket(itemIndex); // Удаляем товар по индексу
      } else {
        console.error("Ошибка: Некорректный itemId или itemIndex");
      }
    });
  });
}

// Функция удаления товара из корзины
function removeFromBasket(itemIndex) {
  console.log("Удаляем товар с индексом:", itemIndex);

  // Удаляем товар из массива по индексу
  basketItems.splice(itemIndex, 1); // Удаляем товар из массива
  renderBasketItems(); // Перерисовываем корзину
  updateBasketSum(); // Обновляем сумму после удаления товара
  updateBasketItemsToggle();
  if (basketItems.length === 0) {
    basketItemsToggle.classList.add("basket-items-disable");
  }
}
// Функция обновления общей суммы корзины
function updateBasketSum() {
  const totalSum = basketItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  // Суммируем цены всех товаров
  document.querySelector(".basket-sum-subtitle").textContent = `${totalSum} ₽`; // Обновляем текст суммы
}
const productsBase = [
  {
    id: 1,
    className: ".add-to-cart-1",
    name: "Женские кроссовки Puma Force 1 Shadow",
    price: 10901,
    discontPrice: 12901,
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
    rating: 4,
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
    rating: 4,
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
    rating: 4,
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
    rating: 4,
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
    rating: 4,
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
    rating: 4,
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
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
      "Images/foot.jpg",
      "Images/foot 2-new.jpeg",
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

const productsGrid = document.querySelector(".products-grid");

productsBase.forEach((product) => {
  const elements = document.querySelectorAll(product.className);
  elements.forEach((el) => {
    el.addEventListener("click", () => {
      addToBasket(product.name, product.images[0], product.price); // Добавление товара в корзину с правильным изображением
    });
  });
});

productsBase.forEach((product) => {
  const productElement = document.createElement("div");
  productElement.classList.add("products-item");

  productElement.innerHTML = `
    <div class="products-item-img-btns">
      <img
        class="products-item-img"
        src="${product.images[0]}"
        alt="Картинка ботинка"
      />
      <div class="products-item-btns">
        <button class="products-item-btn product-open">
          <img
            class="svg svg-eye"
            src="Images/Eye.svg"
            alt="Посмотреть товары"
          />
        </button>
        <button class="products-item-btn">
          <img
            class="svg svg-vector ${product.className.replace(".", "")}"
            src="Images/Vector.svg"
            alt="Добавить в корзину"
          />
        </button>
      </div>
    </div>
    <p class="products-item-info">${product.name} — ${product.price} ₽</p>
  `;

  // Обработчик клика на кнопку просмотра
  productElement
    .querySelector(".product-open")
    .addEventListener("click", () => {
      createDialogContent(product); // Передаем объект product
      toggleDialog(dialogProduct); // Открываем диалог
    });

  productsGrid.appendChild(productElement);
});

function createDialogContent(product) {
  const container = document.querySelector(".dialog-products-2sides");

  // Формируем HTML-структуру
  const htmlContent = `
    <div class="dialog-product-left">
      <div class="big-imgs">
        ${product.images
          .map(
            (img, index) =>
              `<img class="big-img big-img-${
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
      <button class="add-to-cart">Заказать</button>
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
  `;

  // Вставляем HTML в контейнер
  container.innerHTML = htmlContent;
}

// Вызов функции
createDialogContent(product);

// quiz-quiz

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

// Функция проверки состояния чекбоксов
function areCheckboxesChecked(checkboxes) {
  return Array.from(checkboxes).some((checkbox) => checkbox.checked);
}

// Проверка текстового поля
function isTextInputFilled(input) {
  return input.value.trim().length > 0;
}

function toggleButtonState(button, isEnabled) {
  button.disabled = !isEnabled;
}

// Для первой страницы
inputPage1.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    toggleButtonState(QuizNext1, areCheckboxesChecked(inputPage1));
  });
});

// Для второй страницы
inputPage2.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    toggleButtonState(QuizNext2, areCheckboxesChecked(inputPage2));
  });
});

// Для третьей страницы
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
});
