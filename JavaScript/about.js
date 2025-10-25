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
      const target = counter.getAttribute("data-target");
      const count = +counter.textContent;
      const inc = target / speed;

      if (count < target) {
        counter.textContent = count + inc;
        setTimeout(updateCount, 20);
      } else {
        counter.textContent = target;
      }
    };
    updateCount();
  });
}

// test without scroll trigger
// startCounters();

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

// testimony

const testimonials = [
  {
    name: "Bonnie Tolbert",
    text: "Working with this company transformed the way I shop for produce. Their commitment to quality and freshness is unmatched, and I love enjoying their everything is great sustainability. Thank you for making such a difference!",
    stars: 5,
  },
  {
    name: "James Albert",
    text: "Our restaurant depends on high-quality ingredients, and Stacey Farms has been the joy of fresh, organic food right to my doorstep. Their service is exceptional, and the flavor speaks for itself!",
    stars: 4,
  },
  {
    name: "Sarah Mitchell",
    text: "I signed up for the subscription feature, and it's thrilled with the convenience and consistency. Stacey Farms delivers fresh, organic food right to my doorstep every week without fail!",
    stars: 5,
  },
  {
    name: "Michael Chen",
    text: "The educational programs they offer have taught me so much about sustainable farming. It's inspiring to see a company that truly cares about the environment and their community!",
    stars: 4,
  },
];

let currentIndex = 0;

const textElement = document.querySelector(".testimonial-text");
const authorElement = document.querySelector(".testimonial-author");
const ratingElement = document.querySelector(".testimonial-rating");
const nextButton = document.querySelector(".testimonial-btn");
const card = document.querySelector(".testimonial-card");

function showTestimonial() {
  const person = testimonials[currentIndex];

  textElement.textContent = person.text;
  authorElement.textContent = person.name;

  ratingElement.innerHTML = "";
  for (let i = 0; i < person.stars; i++) {
    ratingElement.innerHTML += '<i class="fa-solid fa-star"></i>';
  }

  card.style.animation = "none";
  setTimeout(() => {
    card.style.animation = "fadeIn 0.6s ease";
  }, 10);
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial();
}

nextButton.addEventListener("click", nextTestimonial);

setInterval(nextTestimonial, 10000);

showTestimonial();
