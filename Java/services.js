
// Fixed Header on Scroll
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const fixedHeader = document.querySelector(".fixedHeader");

  if (hero && window.scrollY > hero.offsetHeight - 500) {
    fixedHeader.classList.add("show");
  } else {
    fixedHeader.classList.remove("show");
  }
});






window.onscroll = function() {
  const btn = document.getElementById("scrollTopBtn");
  btn.style.display = document.documentElement.scrollTop > 300 ? "block" : "none";
};
document.getElementById("scrollTopBtn").onclick = function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
