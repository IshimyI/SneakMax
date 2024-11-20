const buttonBurger = document.querySelector(".burger");
const menuBurger = document.querySelector(".burger-menu");

buttonBurger.addEventListener("click", () => {
  buttonBurger.classList.toggle("active");
  menuBurger.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

const buttonOpenProducts = document.querySelector(".products-button");
const products = document.querySelectorAll(".products-item-2");

buttonOpenProducts.addEventListener("click", () => {
  products.forEach((product) => {
    product.classList.remove("products-item-2");
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
