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

// Функция для переключения состояния диалога
function toggleProductDialog() {
  if (dialogProduct.open) {
    dialogProduct.close();
  } else {
    dialogProduct.showModal();
  }
}

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

const smallImgOne = document.querySelector(".small-img-1");
const smallImgTwo = document.querySelector(".small-img-2");
const smallImgThree = document.querySelector(".small-img-3");
const smallImgFour = document.querySelector(".small-img-4");
const smallImgFive = document.querySelector(".small-img-5");
const smallImgSix = document.querySelector(".small-img-6");

const bigImgOne = document.querySelector(".big-img-1");
const bigImgTwo = document.querySelector(".big-img-2");
const bigImgThree = document.querySelector(".big-img-3");
const bigImgFour = document.querySelector(".big-img-4");
const bigImgFive = document.querySelector(".big-img-5");
const bigImgSix = document.querySelector(".big-img-6");

smallImgTwo.addEventListener("mouseover", () => {
  bigImgOne.classList.remove("big-img-z");
  bigImgTwo.classList.add("big-img-z");
});

smallImgTwo.addEventListener("mouseout", () => {
  bigImgOne.classList.add("big-img-z");
  bigImgTwo.classList.remove("big-img-z");
});

smallImgThree.addEventListener("mouseover", () => {
  bigImgOne.classList.remove("big-img-z");
  bigImgThree.classList.add("big-img-z");
});

smallImgThree.addEventListener("mouseout", () => {
  bigImgOne.classList.add("big-img-z");
  bigImgThree.classList.remove("big-img-z");
});
smallImgFour.addEventListener("mouseover", () => {
  bigImgOne.classList.remove("big-img-z");
  bigImgFour.classList.add("big-img-z");
});

smallImgFour.addEventListener("mouseout", () => {
  bigImgOne.classList.add("big-img-z");
  bigImgFour.classList.remove("big-img-z");
});
smallImgFive.addEventListener("mouseover", () => {
  bigImgOne.classList.remove("big-img-z");
  bigImgFive.classList.add("big-img-z");
});

smallImgFive.addEventListener("mouseout", () => {
  bigImgOne.classList.add("big-img-z");
  bigImgFive.classList.remove("big-img-z");
});
smallImgSix.addEventListener("mouseover", () => {
  bigImgOne.classList.remove("big-img-z");
  bigImgSix.classList.add("big-img-z");
});

smallImgSix.addEventListener("mouseout", () => {
  bigImgOne.classList.add("big-img-z");
  bigImgSix.classList.remove("big-img-z");
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

// Функция для переключения состояния диалога
function toggleBasketDialog() {
  if (dialogBasket.open) {
    dialogBasket.close();
  } else {
    dialogBasket.showModal();
  }
}

basketView.forEach((el) => {
  el.addEventListener("click", () => {
    toggleBasketDialog();
  });
});

// Закрытие диалога при клике вне его области
dialogBasket.addEventListener("click", (event) => {
  if (event.target === dialogBasket) {
    toggleBasketDialog();
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
    className: ".add-to-cart-1",
    name: "Женские кроссовки Puma Force 1 Shadow",
    image: "Images/foot 2-new.jpeg",
    price: 11111,
  },
  {
    className: ".add-to-cart-2",
    name: "Кроссовки Nike Air Force 1 '07 QS",
    image: "Images/foot.jpg",
    price: 222222,
  },
  {
    className: ".add-to-cart-3",
    name: "Женские кроссовки Puma Force 1 Shadow",
    image: "Images/foot 2-new.jpeg",
    price: 333333,
  },
  {
    className: ".add-to-cart-4",
    name: "Кроссовки Nike Air Force 1 '07 QS",
    image: "Images/foot.jpg",
    price: 44444,
  },
  {
    className: ".add-to-cart-5",
    name: "Женские кроссовки Puma Force 1 Shadow",
    image: "Images/foot 2-new.jpeg",
    price: 5555,
  },
  {
    className: ".add-to-cart-6",
    name: "Кроссовки Nike Air Force 1 '07 QS",
    image: "Images/foot.jpg",
    price: 666,
  },
];

productsBase.forEach((product) => {
  const elements = document.querySelectorAll(product.className);
  elements.forEach((el) => {
    el.addEventListener("click", () => {
      addToBasket(product.name, product.image, product.price);
    });
  });
});

// quiz-quiz

const inputPage1 = document.querySelectorAll(
  '.page-type input[type="checkbox"]'
);
const inputPage2 = document.querySelsectorAll(
  '.page-size input[type="checkbox"]'
);
const inputPage3 = document.querySelector('.page-label input[type="text"]');

const QuizQuestion1 = document.querySelector(".page-type");
const QuizQuestion2 = document.querySelector(".page-size");
const QuizQuestion3 = document.querySelector(".page-label");
const QuizRes = document.querySelector(".quiz-container-result");
const QuizTitle = document.querySelector(".quiz-container-questions");

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
checkboxesPage1.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    toggleButtonState(QuizNext1, areCheckboxesChecked(checkboxesPage1));
  });
});

// Для второй страницы
checkboxesPage2.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    toggleButtonState(QuizNext2, areCheckboxesChecked(checkboxesPage2));
  });
});

// Для третьей страницы
textInputPage3.addEventListener("input", () => {
  toggleButtonState(QuizNext3, isTextInputFilled(textInputPage3));
});

QuizNext1.addEventListener("click", () => {
  if (!areCheckboxesChecked(checkboxesPage1)) {
    event.preventDefault();
    alert("Пожалуйста, выберите хотя бы один вариант ответа.");
    return;
  }
  QuizQuestion1.classList.add("quiz-page-hidden");
  QuizQuestion2.classList.remove("quiz-page-hidden");
  QuizTitle.scrollIntoView({ behavior: "smooth" });
});

QuizNext2.addEventListener("click", () => {
  if (!areCheckboxesChecked(checkboxesPage2)) {
    event.preventDefault();
    alert("Пожалуйста, выберите хотя бы один вариант ответа.");
    return;
  }
  QuizQuestion2.classList.add("quiz-page-hidden");
  QuizQuestion3.classList.remove("quiz-page-hidden");
  QuizTitle.scrollIntoView({ behavior: "smooth" });
});

QuizNext3.addEventListener("click", () => {
  if (!isTextInputFilled(textInputPage3)) {
    event.preventDefault();
    alert("Пожалуйста, заполните текстовое поле.");
    return;
  }
  QuizQuestion3.classList.add("quiz-page-hidden");
  QuizTitle.classList.add("quiz-page-hidden");
  QuizRes.classList.remove("quiz-page-hidden");
  QuizTitle.scrollIntoView({ behavior: "smooth" });
});
