(() => {
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');
  const yearEl = document.getElementById('year');
  const statsSection = document.querySelector('.stats');

  // Scroll Navbar
  const throttle = (fn, delay) => {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last > delay) {
        last = now;
        fn(...args);
      }
    };
  };
  window.addEventListener(
    'scroll',
    throttle(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, 100)
  );

  // Mobile Menu
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = mobileMenu.classList.contains('active')
      ? 'fa-solid fa-times'
      : 'fa-solid fa-bars';
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
  }

  // Navigation Pages
  function showPage(pageName) {
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(`${pageName}Page`).classList.add('active');

    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelectorAll(`[data-page="${pageName}"]`).forEach(l => l.classList.add('active'));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      showPage(page);
      closeMobileMenu();
    });
  });

  // Stats Counter
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  }

  let statsAnimated = false;
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        document.querySelectorAll('.stat-number').forEach((stat, i) => {
          const target = +stat.getAttribute('data-target');
          setTimeout(() => animateCounter(stat, target), i * 100);
        });
        statsAnimated = true;
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) statsObserver.observe(statsSection);

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Restaurant Owner',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      text: 'The quality of produce from AgriMarket is exceptional. My customers always comment on how fresh and flavorful everything tastes.',
    },
    {
      name: 'Michael Chen',
      role: 'Health Enthusiast',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      text: 'AgriMarket stands out for its freshness and transparency. Knowing where my food comes from gives me peace of mind.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Home Chef',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      text: 'The variety and freshness are amazing. I love supporting sustainable farming while feeding my family well.',
    },
  ];

  let currentTestimonial = 0;
  const updateTestimonial = i => {
    const t = testimonials[i];
    document.querySelector('.testimonial-avatar').src = t.image;
    document.getElementById('testimonialName').textContent = t.name;
    document.getElementById('testimonialRole').textContent = t.role;
    document.getElementById('testimonialText').textContent = t.text;

    document.querySelectorAll('.dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === i);
    });
  };

  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentTestimonial = +dot.dataset.index;
      updateTestimonial(currentTestimonial);
    });
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Newsletter
  document.querySelector('.newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`Thank you for subscribing, ${email}!`);
    e.target.reset();
  });

  // Year
  yearEl.textContent = new Date().getFullYear();

  // Init
  updateTestimonial(0);
})();
