// Fixed Header on Scroll
window.addEventListener("scroll", () => {
  const section1 = document.querySelector(".section1");
  const fixedHeader = document.querySelector(".fixedHeader");

  if (section1 && fixedHeader && window.scrollY > section1.offsetHeight - 100) {
    fixedHeader.classList.add("show");
  } else if (fixedHeader) {
    fixedHeader.classList.remove("show");
  }
});

// intro-btn hover animation - IMPROVED
const introIcon = document.querySelector("#intro-icon");
const introBtn = document.querySelector(".intro-btn");

if (introBtn && introIcon) {
  introBtn.addEventListener("mouseenter", () => {
    introIcon.style.transform = "translateX(5px)";
    introIcon.style.transition = "transform 0.3s ease";
  });

  introBtn.addEventListener("mouseleave", () => {
    introIcon.style.transform = "translateX(0)";
  });
}

// Switching tabs - FIXED
const valueBtn = document.querySelector("#value");
const storyBtn = document.querySelector("#story");
const missionBtn = document.querySelector("#mission");

const valueSection = document.querySelector(".values");
const storySection = document.querySelector("#journey");
const missionSection = document.querySelector(".mission");

const btns = document.querySelectorAll(".bit");

// Set initial state
if (valueBtn) valueBtn.classList.add("active");

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active from all
    btns.forEach((button) => button.classList.remove("active"));
    
    // Add active to clicked
    this.classList.add("active");

    // Hide all sections
    if (valueSection) valueSection.style.display = "none";
    if (storySection) storySection.style.display = "none";
    if (missionSection) missionSection.style.display = "none";

    // Show selected section with fade in
    if (this.id === "value" && valueSection) {
      valueSection.style.display = "block";
      valueSection.style.animation = "fadeIn 0.6s ease"; // Slowed down animation
    } else if (this.id === "story" && storySection) {
      storySection.style.display = "block";
      storySection.style.animation = "fadeIn 0.6s ease"; // Slowed down animation
    } else if (this.id === "mission" && missionSection) {
      missionSection.style.display = "block";
      missionSection.style.animation = "fadeIn 0.6s ease"; // Slowed down animation
    }
  });
});

// Counter Animation - IMPROVED SPEED
let numbers = document.querySelectorAll(".counter");
let speed = 100; // Slowed down speed

function startCounters() {
  numbers.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.textContent;
      const inc = target / speed;

      if (count < target) {
        counter.textContent = Math.ceil(count + inc);
        setTimeout(updateCount, 60); // Smooth 60ms intervals
      } else {
        counter.textContent = target;
      }
    };
    updateCount();
  });
}

// Trigger counter on scroll
let started = false;
window.addEventListener("scroll", () => {
  const section = document.querySelector(".section3");
  if (section) {
    const position = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight && !started) {
      started = true;
      startCounters();
    }
  }
});

// Testimonials - IMPROVED ANIMATION
const testimonials = [
  {
    name: "Bonnie Tolbert",
    text: "Working with this company transformed the way I shop for produce. Their commitment to quality and freshness is unmatched, and I love their focus on sustainability. Thank you for making such a difference!",
    stars: 5,
  },
  {
    name: "James Albert",
    text: "Our restaurant depends on high-quality ingredients, and FourPillars has been a blessing. They bring the joy of fresh, organic food right to us. Their service is exceptional, and the flavor speaks for itself!",
    stars: 4,
  },
  {
    name: "Sarah Mitchell",
    text: "I signed up for the subscription feature, and I'm thrilled with the convenience and consistency. FourPillars delivers fresh, organic food right to my doorstep every week without fail!",
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
  if (!textElement || !authorElement || !ratingElement) return;
  
  const person = testimonials[currentIndex];

  // Add fade out
  if (card) {
    card.style.opacity = "0";
    card.style.transform = "translateX(-20px)";
  }

  setTimeout(() => {
    textElement.textContent = person.text;
    authorElement.textContent = person.name;

    ratingElement.innerHTML = "";
    for (let i = 0; i < person.stars; i++) {
      ratingElement.innerHTML += '<i class="fa-solid fa-star"></i>';
    }

    // Fade in
    if (card) {
      card.style.opacity = "1";
      card.style.transform = "translateX(0)";
    }
  }, 600); // Slowed down transition time
}

function nextTestimonial() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial();
}

if (nextButton) {
  nextButton.addEventListener("click", nextTestimonial);
}

// Auto-rotate testimonials every 8 seconds
setInterval(nextTestimonial, 8000);

// Show first testimonial
showTestimonial();

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}