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

// switching btns

const valueBtn = document.querySelector("#value");
const storyBtn = document.querySelector("#story");
const missionBtn = document.querySelector("#mission");

const valueSection = document.querySelector(".values");
const storySection = document.querySelector("#journey");
const missionSection = document.querySelector(".mission");

const btns = document.querySelectorAll(".bit");
valueBtn.classList.add("active");
btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    btns.forEach((button) => button.classList.remove("active"));

    // Step 2: Add 'active' class to the clicked button
    this.classList.add("active");

    // Step 3: Hide ALL content sections first
    valueSection.style.display = "none";
    storySection.style.display = "none";
    missionSection.style.display = "none";

    // Step 4: Show the appropriate section based on which button was clicked
    if (this.id === "value") {
      valueSection.style.display = "block";
    } else if (this.id === "story") {
      storySection.style.display = "block";
    } else if (this.id === "mission") {
      missionSection.style.display = "block";
    }
  });
});
