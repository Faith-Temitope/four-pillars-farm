window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const fixedHeader = document.querySelector(".fixedHeader");

  if (window.scrollY > hero.offsetHeight - 500) {
    fixedHeader.classList.add("show");
  } else {
    fixedHeader.classList.remove("show");
  }
});
