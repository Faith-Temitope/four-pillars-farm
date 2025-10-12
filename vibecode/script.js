/* script.js — refactored, performant, accessible */
document.addEventListener("DOMContentLoaded", () => {
  // ----- Cache DOM elements -----
  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");
  const backToTop = document.getElementById("backToTop");
  const statsSection = document.querySelector(".stats");
  const counters = document.querySelectorAll(".counter");
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("projectModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const closeModalBtn = document.querySelector(".close-modal");
  const testimonialDiv = document.querySelector(".testimonial");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const testimonialForm = document.getElementById("testimonial-form");

  // ----- State -----
  let countersStarted = false;
  let testimonials = [
    {
      name: "Michael Chen",
      role: "Health Enthusiast",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "I've been buying organic products for years, but FourPillars stands out. Knowing exactly where my food comes from and how it’s grown gives me peace of mind.",
    },
    {
      name: "Sara James",
      role: "Nutritionist",
      photo: "https://randomuser.me/api/portraits/women/47.jpg",
      quote: "FourPillars’ produce is always fresh and of great quality. My clients love the taste difference!",
    },
    {
      name: "John Carter",
      role: "Restaurant Owner",
      photo: "https://randomuser.me/api/portraits/men/20.jpg",
      quote: "Their reliable delivery and product quality keep my business running smoothly every week.",
    },
  ];

  // Restore testimonials from localStorage (optional)
  try {
    const stored = JSON.parse(localStorage.getItem("fp_testimonials") || "null");
    if (Array.isArray(stored)) testimonials = stored.concat(testimonials);
  } catch (e) {
    // ignore parse errors
  }
  let testimonialIndex = 0;

  // ----- Scroll handling (single listener) -----
  function onScroll() {
    const y = window.scrollY;
    const heroHeight = hero ? hero.offsetHeight : 600;

    header.classList.toggle("scrolled", y > heroHeight - 500);
    backToTop.classList.toggle("show", y > 300);
  }
  window.addEventListener("scroll", throttle(onScroll, 80));
  onScroll(); // initial check

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ----- Counter animation using requestAnimationFrame -----
  function animateCounter(el, target, duration = 1400) {
    const startTime = performance.now();
    const start = 0;
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  // IntersectionObserver to start counters when visible
  if (statsSection && counters.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            counters.forEach((c) => {
              const t = parseInt(c.getAttribute("data-target"), 10) || 0;
              animateCounter(c, t);
            });
            countersStarted = true;
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(statsSection);
  }

  // ----- Testimonials UI -----
  function renderTestimonial(i, withTransition = true) {
    const t = testimonials[i];
    testimonialDiv.classList.remove("fade-in");
    // small delay for transition effect
    setTimeout(() => {
      // build accessible DOM rather than raw innerHTML for text nodes
      testimonialDiv.innerHTML = "";
      const img = document.createElement("img");
      img.src = t.photo;
      img.alt = t.name;
      const textWrap = document.createElement("div");
      textWrap.className = "text";
      const h3 = document.createElement("h3");
      h3.textContent = t.name;
      const role = document.createElement("p");
      role.className = "role";
      role.textContent = t.role;
      const quote = document.createElement("p");
      quote.className = "quote";
      quote.textContent = `"${t.quote}"`;
      textWrap.append(h3, role, quote);
      testimonialDiv.append(img, textWrap);
      if (withTransition) testimonialDiv.classList.add("fade-in");
    }, withTransition ? 120 : 0);
  }

  renderTestimonial(testimonialIndex);

  prevBtn.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(testimonialIndex);
  });
  nextBtn.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial(testimonialIndex);
  });

  testimonialForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value.trim();
    const photo = document.getElementById("photo").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !role || !photo || !message) {
      alert("Please fill all testimonial fields.");
      return;
    }

    const newT = { name, role, photo, quote: message };
    testimonials.unshift(newT); // show newest first
    // persist lightly
    try {
      localStorage.setItem("fp_testimonials", JSON.stringify(testimonials.slice(0, 10)));
    } catch (e) { /* ignore storage errors */ }

    testimonialForm.reset();
    testimonialIndex = 0;
    renderTestimonial(testimonialIndex);
    alert("Thanks — testimonial added!");
  });

  // ----- Projects modal (accessible) -----
  const projectData = {
    1: {
      title: "Easy Harvesting",
      image:
        "./assets/images/young-farmer-holding-basket-with-vegetables-from-his-farm.jpg",
      desc:
        "Our easy harvesting techniques help farmers maximize yield with minimal effort. Experience smart agriculture with optimized tools and strategies.",
    },
    2: {
      title: "Agriculture Farming",
      image: "./assets/images/countryside-workers-out-field.jpg",
      desc:
        "We specialize in sustainable agriculture, focusing on organic methods that nurture both crops and soil for long-term productivity.",
    },
    3: {
      title: "Ecological Farming",
      image:
        "./assets/images/farm-worker-happy-see-non-gmo-vegetable-plantation-crop-yields-organically-growing-fresh-healthy-way-without-using-herbicides-eco-friendly-bio-agricultural-greenhouse-farm.jpg",
      desc:
        "Our ecological farming projects integrate natural cycles and biodiversity, creating a self-sustaining farming ecosystem.",
    },
    4: {
      title: "Organic Solutions",
      image:
        "./assets/images/front-view-male-researcher-biotechnology-laboratory-with-petri-dish.jpg",
      desc:
        "From composting to natural pest control, we deliver innovative organic solutions that make farming cleaner and more efficient.",
    },
  };

  // focus trap helpers
  let lastFocused = null;
  function openModal(project) {
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;
    modal.classList.add("active");
    modal.querySelector(".modal-content").classList.add("scale-in");
    modal.setAttribute("aria-hidden", "false");
    lastFocused = document.activeElement;
    closeModalBtn.focus();
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("active");
    modal.querySelector(".modal-content").classList.remove("scale-in");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.project;
      const pd = projectData[id];
      if (!pd) return;
      openModal(pd);
    });
    // keyboard support
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });

  // ----- Utility: throttle -----
  function throttle(fn, wait) {
    let last = 0;
    let timer = null;
    return function (...args) {
      const now = Date.now();
      const remaining = wait - (now - last);
      if (remaining <= 0) {
        if (timer) { clearTimeout(timer); timer = null; }
        last = now;
        fn.apply(this, args);
      } else if (!timer) {
        timer = setTimeout(() => {
          last = Date.now();
          timer = null;
          fn.apply(this, args);
        }, remaining);
      }
    };
  }
});
