// intro-btn simple hover event listner. This simply move the icon to the right whever the btn is hover on
const introIcon = document.querySelector("#intro-icon");
const introBtn = document.querySelector(".intro-btn");

console.log(introBtn, introIcon);
introBtn.addEventListener("mouseenter", () => {
  introIcon.style.marginLeft = "5px";
  console.log("working");
});

introBtn.addEventListener("mouseleave", () => {
  introIcon.style.marginLeft = "0px";
  console.log("working");
});
// ending on intro-btn
