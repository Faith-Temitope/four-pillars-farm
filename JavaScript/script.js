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

// Counter animation triggered on scroll
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function startCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const speed = 100;

    const updateCount = () => {
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Use Intersection Observer to trigger when visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterStarted) {
        startCounters();
        counterStarted = true;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// Testimonials functionality
const testimonials = [
  {
    name: "Michael Chen",
    role: "Health Enthusiast",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "I've been buying organic products for years, but FourPillars stands out. Knowing exactly where my food comes from and how it's grown gives me peace of mind."
  },
  {
    name: "Sara James",
    role: "Nutritionist",
    photo: "https://randomuser.me/api/portraits/women/47.jpg",
    quote: "FourPillars' produce is always fresh and of great quality. My clients love the taste difference!"
  },
  {
    name: "John Carter",
    role: "Restaurant Owner",
    photo: "https://randomuser.me/api/portraits/men/20.jpg",
    quote: "Their reliable delivery and product quality keep my business running smoothly every week."
  }
];

let index = 0;
const testimonialDiv = document.querySelector('.testimonial');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function showTestimonial(i) {
  const t = testimonials[i];
  testimonialDiv.innerHTML = `
    <img src="${t.photo}" alt="${t.name}">
    <div class="text">
      <h3>${t.name}</h3>
      <p class="role">${t.role}</p>
      <p class="quote">"${t.quote}"</p>
    </div>
  `;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    index = (index - 1 + testimonials.length) % testimonials.length;
    showTestimonial(index);
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  });
}

// Add new testimonial dynamically
const testimonialForm = document.getElementById('testimonial-form');
if (testimonialForm) {
  testimonialForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const photo = document.getElementById('photo').value;
    const message = document.getElementById('message').value;

    testimonials.push({ name, role, photo, quote: message });
    alert('Testimonial added successfully!');
    e.target.reset();
  });
}

// ==== PROJECTS MODAL ====
const projectData = {
  1: {
    title: "Easy Harvesting",
    image: "./assets/images/young-farmer-holding-basket-with-vegetables-from-his-farm.jpg",
    desc: "Our easy harvesting techniques help farmers maximize yield with minimal effort. Experience smart agriculture with optimized tools and strategies."
  },
  2: {
    title: "Agriculture Farming",
    image: "./assets/images/countryside-workers-out-field.jpg",
    desc: "We specialize in sustainable agriculture, focusing on organic methods that nurture both crops and soil for long-term productivity."
  },
  3: {
    title: "Ecological Farming",
    image: "./assets/images/farm-worker-happy-see-non-gmo-vegetable-plantation-crop-yields-organically-growing-fresh-healthy-way-without-using-herbicides-eco-friendly-bio-agricultural-greenhouse-farm.jpg",
    desc: "Our ecological farming projects integrate natural cycles and biodiversity, creating a self-sustaining farming ecosystem."
  },
  4: {
    title: "Organic Solutions",
    image: "./assets/images/front-view-male-researcher-biotechnology-laboratory-with-petri-dish.jpg",
    desc: "From composting to natural pest control, we deliver innovative organic solutions that make farming cleaner and more efficient."
  }
};

const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.querySelector(".close-modal");

if (modal && closeModal) {
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.project;
      const project = projectData[id];
      modalImage.src = project.image;
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;
      modal.classList.add("active");
    });
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
  });
}

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