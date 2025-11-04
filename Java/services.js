let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const fixedHeader = document.querySelector(".fixedHeader");
  const heroHeader = document.querySelector(".heroHeader");

  // Get scroll direction
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    // Scrolling DOWN
    if (hero && currentScrollY > hero.offsetHeight - 200) {
      // Hide transparent header, show fixed one
      heroHeader.style.opacity = "0";
      heroHeader.style.pointerEvents = "none";
      fixedHeader.classList.add("show");
    }
  } else {
    // Scrolling UP
    if (currentScrollY < hero.offsetHeight - 100) {
      // Show transparent header again
      heroHeader.style.opacity = "1";
      heroHeader.style.pointerEvents = "all";
      fixedHeader.classList.remove("show");
    }
  }

  // Update last scroll position
  lastScrollY = currentScrollY;
});
