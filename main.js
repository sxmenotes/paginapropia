/* ============================================================
   SAMUEL VALENZUELA — main.js
   Orquestación de Interacciones & GSAP 3 Motion
   ============================================================ */
'use strict';

// 1. GSAP Plugin Registration
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroMotion();
  initScrollReveals();
  initCounters();
  initCotizador();
  initMobileNavigation();
  initContactForm();
  initCopyEmail();
});

/* ============================================================
   2. HERO MOTION (GSAP Master Timeline)
   ============================================================ */
function initHeroMotion() {
  if (typeof gsap === 'undefined') return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    delay: 0.05
  });

  // Eyebrow entrance
  const eyebrow = document.getElementById('hero-eyebrow');
  if (eyebrow) {
    tl.from(eyebrow, {
      opacity: 0,
      y: -10,
      duration: 0.4
    });
  }

  // Hero Title split-word reveal
  const words = document.querySelectorAll('.hero-title .split-word');
  if (words.length > 0) {
    tl.from(words, {
      yPercent: 80,
      opacity: 0,
      stagger: 0.035,
      duration: 0.5,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    }, '-=0.25');
  }

  // Accent dot pop
  const dot = document.querySelector('.accent-dot');
  if (dot) {
    tl.from(dot, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(2)',
      clearProps: 'transform,opacity'
    }, '-=0.35');
  }

  // Hero Description
  const desc = document.getElementById('hero-desc');
  if (desc) {
    tl.from(desc, {
      opacity: 0,
      y: 12,
      duration: 0.45,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    }, '-=0.35');
  }

  // Hero Actions (Buttons)
  const actions = document.getElementById('hero-actions');
  if (actions) {
    tl.from(actions.children, {
      opacity: 0,
      y: 12,
      stagger: 0.06,
      duration: 0.45,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    }, '-=0.3');
  }

  // Hero Proof Cards Grid
  const proofCards = document.querySelectorAll('.proof-card');
  if (proofCards.length) {
    tl.from(proofCards, {
      opacity: 0,
      y: 16,
      stagger: 0.08,
      duration: 0.45,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    }, '-=0.25');
  }

  // Scroll Indicator
  const scrollInd = document.getElementById('hero-scroll');
  if (scrollInd) {
    tl.from(scrollInd, {
      opacity: 0,
      y: 8,
      duration: 0.4,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    }, '-=0.3');
  }
}

/* ============================================================
   4. SCROLL REVEALS (GSAP ScrollTrigger)
   ============================================================ */
function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal-elem');
  if (!elements.length) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  // Staggered reveals by section
  const sections = document.querySelectorAll('.section-block, .brands-section');
  sections.forEach(sec => {
    const secElements = sec.querySelectorAll('.reveal-elem');
    if (!secElements.length) return;

    ScrollTrigger.create({
      trigger: sec,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.fromTo(secElements,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity' }
        );
      }
    });
  });
}

/* ============================================================
   5. ANIMATED NUMERIC COUNTERS
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.metric-val[data-count]');
  if (!counters.length) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    counters.forEach(c => c.textContent = c.getAttribute('data-count'));
    return;
  }

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'), 10) || 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            counter.textContent = Math.round(obj.val);
          }
        });
      });
    }
  });
}

/* ============================================================
   6. COTIZADOR INTERACTIVO POR SECTOR
   ============================================================ */
function initCotizador() {
  const sectorChips = document.querySelectorAll('.sector-chip');
  const sectorInput = document.getElementById('contact-sector-input');
  const whatsappBtn = document.getElementById('whatsapp-cotizar-btn');
  const messageArea = document.getElementById('contact-message');

  let currentSector = 'Gastronomía & Eventos';

  function updateCotizador() {
    // 1. Synchronize hidden form input
    if (sectorInput) {
      sectorInput.value = currentSector;
    }

    // 2. Update WhatsApp link with pre-filled message
    if (whatsappBtn) {
      const waText = encodeURIComponent(
        `¡Hola Samuel! Estuve revisando tu portfolio y me interesa conversar sobre un proyecto para el sector de ${currentSector}.\n\n` +
        `¿Podemos coordinar para revisar alcance y plazos?`
      );
      whatsappBtn.href = `https://wa.me/5491178281814?text=${waText}`;
    }

    // 3. Update placeholder suggestion in message textarea
    if (messageArea && !messageArea.value) {
      messageArea.placeholder = `Describe brevemente tus requerimientos para el sector de ${currentSector} (objetivos, funcionalidades, plazos deseados)…`;
    }
  }

  // Sector chips click
  sectorChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sectorChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-checked', 'true');
      currentSector = chip.getAttribute('data-sector') || chip.textContent.trim();
      updateCotizador();
    });
  });

  // Initial call
  updateCotizador();
}

/* ============================================================
   7. MOBILE NAVIGATION DRAWER
   ============================================================ */
function initMobileNavigation() {
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('menu-close-btn');
  const navMobile = document.getElementById('nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');

  if (!menuBtn || !navMobile) return;

  function openMenu() {
    navMobile.classList.add('open');
    navMobile.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMobile.classList.remove('open');
    navMobile.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ============================================================
   8. CONTACT FORM HANDLING
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      showToast('Por favor completa todos los campos requeridos');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando mensaje…</span>';
    }

    // Simulate clean dispatch
    setTimeout(() => {
      if (successMsg) {
        successMsg.classList.add('show');
      }
      form.reset();
      initCotizador(); // restore sector selection defaults

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span id="submit-text">Enviar mensaje</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        `;
      }

      showToast('✓ Mensaje enviado correctamente');

      setTimeout(() => {
        if (successMsg) successMsg.classList.remove('show');
      }, 7000);
    }, 700);
  });
}

/* ============================================================
   9. COPY EMAIL TO CLIPBOARD & TOAST
   ============================================================ */
function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = 'samuel.valenzueladiaz2@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copiado: ' + email);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    } else {
      showToast('Email: ' + email);
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');
  toast.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    toast.classList.remove('show');
    toast.setAttribute('aria-hidden', 'true');
  }, 3200);
}
