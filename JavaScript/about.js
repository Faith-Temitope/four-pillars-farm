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

    this.classList.add("active");

    valueSection.style.display = "none";
    storySection.style.display = "none";
    missionSection.style.display = "none";

    if (this.id === "value") {
      valueSection.style.display = "block";
    } else if (this.id === "story") {
      storySection.style.display = "block";
    } else if (this.id === "mission") {
      missionSection.style.display = "block";
    }
  });
});

// const counters = document.querySelectorAll("#counter");
// let started = false;

// function startCounters() {
//   counters.forEach((counter) => {
//     const target = +counter.dataset.target;
//     const speed = 100; // higher = slower

//     const update = () => {
//       const value = +counter.innerText;
//       const step = target / speed;

//       if (value < target) {
//         counter.innerText = Math.ceil(value + step);
//         setTimeout(update, 30);
//       } else {
//         counter.innerText = target;
//       }
//     };

//     update();
//   });
// }

// window.addEventListener("scroll", () => {
//   const section = document.querySelector(".section3");
//   const position = section.getBoundingClientRect().top;
//   const screen = window.innerHeight;

//   if (position < screen && !started) {
//     started = true;
//     startCounters();
//   }
// });

let numbers = document.querySelectorAll(".counter");
let speed = 200;

function startCounters() {
  numbers.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerHTML;
      const inc = target / speed;

      if (count < target) {
        counter.innerHTML = Math.ceil(count + inc);
        setTimeout(updateCount, 50);
      } else {
        counter.innerHTML = target;
      }
    };
    updateCount();
  });
}

// test without scroll trigger
startCounters();

let started = false;
window.addEventListener("scroll", () => {
  const section = document.querySelector(".section3");
  const position = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight && !started) {
    started = true;
    startCounters();
  }
});
