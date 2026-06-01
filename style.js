/* ========================================
   Visual Elino - Main JavaScript
======================================== */

document.addEventListener('DOMContentLoaded', function() {

  // ---- Loading Screen ----
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => loadingScreen.classList.add('hidden'), 800);
  }

  // ---- Navbar Scroll ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Mobile Menu ----
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileBtn.classList.remove('active');
        mobileNav.classList.remove('open');
      }
    });
  }

  // ---- Dark Mode ----
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // ---- Back to Top ----
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- Scroll Animations ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ---- Animated Counters ----
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('fa-IR') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ---- Search Filter ----
  window.initSearch = function(inputSelector, itemSelector, searchAttr) {
    const input = document.querySelector(inputSelector);
    if (!input) return;
    input.addEventListener('input', () => {
      const val = input.value.toLowerCase().trim();
      document.querySelectorAll(itemSelector).forEach(item => {
        const text = item.getAttribute(searchAttr) || item.textContent;
        item.style.display = text.toLowerCase().includes(val) ? '' : 'none';
      });
    });
  };

  // ---- Category Filter ----
  window.initFilter = function(tagSelector, itemSelector, filterAttr) {
    const tags = document.querySelectorAll(tagSelector);
    if (!tags.length) return;
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        const filter = tag.getAttribute('data-filter');
        document.querySelectorAll(itemSelector).forEach(item => {
          const cats = item.getAttribute(filterAttr) || '';
          item.style.display = (filter === 'all' || cats.includes(filter)) ? '' : 'none';
        });
      });
    });
  };

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Lazy Loading Images ----
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length > 0) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imgObserver.observe(img));
  }

  // ---- Contact Form ----
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = '✓ پیام شما ارسال شد!';
      btn.style.background = '#22C55E';
      setTimeout(() => {
        btn.textContent = 'ارسال پیام';
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ---- Newsletter Form ----
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = '✓ عضو شدید!';
      setTimeout(() => { btn.textContent = 'عضویت'; form.reset(); }, 2500);
    });
  });

});
