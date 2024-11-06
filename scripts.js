const buttonBurger = document.querySelector(".burger");
const menuBurger = document.querySelector(".burger-menu");

buttonBurger.addEventListener("click", () => {
  buttonBurger.classList.toggle("active");
  menuBurger.classList.toggle("active");
});
