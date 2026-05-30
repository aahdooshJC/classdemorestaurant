/* ============================================================
   MAISON LUMIÈRE — script.js
   ============================================================
   Functions:
     initNavScroll()     — transparent → solid nav on scroll
     initHamburger()     — mobile menu toggle
     initFadeIn()        — Intersection Observer scroll animations
     initCarousel()      — testimonials auto-rotating carousel
     initForm()          — reservation form validation + success
     initCopyrightYear() — dynamic footer year
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initHamburger();
  initFadeIn();
  initCarousel();
  initForm();
  initCopyrightYear();
});


/* ============================================================
   NAV SCROLL — adds .site-header--scrolled after 80px
   ============================================================ */
function initNavScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('site-header--scrolled', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Run once in case page loads mid-scroll
  onScroll();
}


/* ============================================================
   HAMBURGER — mobile nav open/close
   ============================================================ */
function initHamburger() {
  const btn   = document.getElementById('hamburger-btn');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  function closeMenu() {
    links.classList.remove('nav__links--open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('nav__links--open');
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    // Prevent background scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close when a nav link is clicked
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('nav__links--open')) {
      closeMenu();
      btn.focus();
    }
  });

  // Close if viewport resizes to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
  });
}


/* ============================================================
   FADE-IN — Intersection Observer on .fade-in elements
   ============================================================ */
function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  // Graceful degradation for older browsers
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


/* ============================================================
   CAROUSEL — auto-rotating testimonials
   ============================================================ */
function initCarousel() {
  const track  = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.carousel__slide'));
  const dots   = Array.from(document.querySelectorAll('.carousel__dot'));
  const total  = slides.length;
  if (total === 0) return;

  let current = 0;
  let timer   = null;

  function goTo(index) {
    // Deactivate current
    slides[current].hidden = true;
    if (dots[current]) {
      dots[current].classList.remove('carousel__dot--active');
      dots[current].setAttribute('aria-selected', 'false');
    }

    // Normalise index (wrap around)
    current = ((index % total) + total) % total;

    // Activate new
    slides[current].hidden = false;
    if (dots[current]) {
      dots[current].classList.add('carousel__dot--active');
      dots[current].setAttribute('aria-selected', 'true');
    }
  }

  function startAutoplay() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAutoplay() {
    clearInterval(timer);
    timer = null;
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Initialise: show first, hide rest
  slides.forEach((slide, i) => { slide.hidden = i !== 0; });

  // Prev / Next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });
  }

  // Dot buttons
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetAutoplay(); });
  });

  // Keyboard navigation within carousel
  const carousel = document.getElementById('testimonials-carousel');
  if (carousel) {
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAutoplay(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); resetAutoplay(); }
    });

    // Pause autoplay when user is interacting
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', e => {
      // Only restart if focus truly left the carousel
      if (!carousel.contains(e.relatedTarget)) {
        startAutoplay();
      }
    });
  }

  startAutoplay();
}


/* ============================================================
   FORM — validation + success message
   ============================================================ */
function initForm() {
  const form    = document.getElementById('reservation-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;

  // Set minimum date to today
  const dateInput = document.getElementById('guest-date');
  if (dateInput) {
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  }

  /* -- Helpers -- */

  function getEl(id) {
    return document.getElementById(id);
  }

  function showError(inputId, errorId, message) {
    const input = getEl(inputId);
    const err   = getEl(errorId);
    if (input) input.classList.add('form__input--error');
    if (err)   err.textContent = message;
  }

  function clearError(inputId, errorId) {
    const input = getEl(inputId);
    const err   = getEl(errorId);
    if (input) input.classList.remove('form__input--error');
    if (err)   err.textContent = '';
  }

  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str);
  }

  // Prevent XSS when inserting user values into innerHTML
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#39;');
  }

  // Format YYYY-MM-DD → "Friday, 15 August 2025"
  // Use 'T00:00:00' to force local time and prevent UTC off-by-one
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', {
      weekday: 'long',
      day:     'numeric',
      month:   'long',
      year:    'numeric'
    });
  }

  // Format "19:30" → "7:30 PM"
  function formatTime(timeStr) {
    const [hStr, mStr] = timeStr.split(':');
    const h = parseInt(hStr, 10);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
    return `${displayH}:${mStr} ${period}`;
  }

  /* -- Clear errors on input (live feedback) -- */
  const fieldPairs = [
    ['guest-name',   'name-error'],
    ['guest-email',  'email-error'],
    ['guest-phone',  'phone-error'],
    ['guest-guests', 'guests-error'],
    ['guest-date',   'date-error'],
    ['guest-time',   'time-error'],
  ];

  fieldPairs.forEach(([inputId, errorId]) => {
    const el = getEl(inputId);
    if (el) {
      el.addEventListener('input', () => clearError(inputId, errorId));
      el.addEventListener('change', () => clearError(inputId, errorId));
    }
  });

  /* -- Submit handler -- */
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Clear all errors first
    fieldPairs.forEach(([inputId, errorId]) => clearError(inputId, errorId));

    // Collect values
    const name   = (getEl('guest-name')?.value   || '').trim();
    const email  = (getEl('guest-email')?.value  || '').trim();
    const phone  = (getEl('guest-phone')?.value  || '').trim();
    const guests = (getEl('guest-guests')?.value || '').trim();
    const date   = (getEl('guest-date')?.value   || '').trim();
    const time   = (getEl('guest-time')?.value   || '').trim();

    let hasError  = false;
    let firstErrorEl = null;

    function markError(inputId, errorId, message) {
      showError(inputId, errorId, message);
      if (!firstErrorEl) firstErrorEl = getEl(inputId);
      hasError = true;
    }

    // Validate each required field
    if (!name) {
      markError('guest-name', 'name-error', 'Please enter your full name.');
    }

    if (!email) {
      markError('guest-email', 'email-error', 'Please enter your email address.');
    } else if (!isValidEmail(email)) {
      markError('guest-email', 'email-error', 'Please enter a valid email address.');
    }

    if (!phone) {
      markError('guest-phone', 'phone-error', 'Please enter your phone number.');
    }

    if (!guests) {
      markError('guest-guests', 'guests-error', 'Please select the number of guests.');
    }

    if (!date) {
      markError('guest-date', 'date-error', 'Please select a preferred date.');
    }

    if (!time) {
      markError('guest-time', 'time-error', 'Please select a preferred time.');
    }

    // Stop and focus first error
    if (hasError) {
      if (firstErrorEl) firstErrorEl.focus();
      return;
    }

    /* -- Success -- */
    const displayDate  = formatDate(date);
    const displayTime  = formatTime(time);
    const guestLabel   = guests === '1' ? '1 guest' : `${escapeHtml(guests)} guests`;

    form.hidden = true;

    success.innerHTML = `
      <p style="font-size:1.5rem; font-family:'Cormorant Garamond',serif; margin-bottom:1rem; color:#f5f0e8;">
        Merci, <strong>${escapeHtml(name)}</strong>!
      </p>
      <p>
        Your reservation request for <strong>${guestLabel}</strong>
        on <strong>${escapeHtml(displayDate)}</strong>
        at <strong>${escapeHtml(displayTime)}</strong> has been received.
      </p>
      <p style="margin-top:0.75rem;">
        We will confirm your booking at <strong>${escapeHtml(email)}</strong> within 24 hours.
      </p>
      <p style="margin-top:1.25rem; font-size:0.8rem; color:#c8c0b0; letter-spacing:0.06em;">
        Nous nous réjouissons de vous accueillir.
      </p>
    `;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Auto-reset after 10 seconds
    setTimeout(() => {
      form.reset();
      form.hidden = false;
      success.hidden = true;
      success.innerHTML = '';
    }, 10000);
  });
}


/* ============================================================
   COPYRIGHT YEAR — keeps footer current
   ============================================================ */
function initCopyrightYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
}
