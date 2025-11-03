window.onscroll = function() {
  const btn = document.getElementById("scrollTopBtn");
  btn.style.display = document.documentElement.scrollTop > 300 ? "block" : "none";
};
document.getElementById("scrollTopBtn").onclick = function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
