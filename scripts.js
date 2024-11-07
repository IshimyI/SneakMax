const buttonBurger = document.querySelector(".burger");
const menuBurger = document.querySelector(".burger-menu");

buttonBurger.addEventListener("click", () => {
  buttonBurger.classList.toggle("active");
  menuBurger.classList.toggle("active");
});

const buttonOpenProducts = document.querySelector(".products-button");
const products = document.querySelectorAll(".products-item-2");

buttonOpenProducts.addEventListener("click", () => {
  products.forEach((product) => {
    product.classList.remove("products-item-2");
  });
  buttonOpenProducts.classList.add("products-button-open");
});
