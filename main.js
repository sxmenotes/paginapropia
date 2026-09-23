/* ============================================================
   SAMUEL VALENZUELA — main.js
   GSAP 3 Motion · Optimizado para 120 Hz / GPU compositing
   ============================================================ */
'use strict';

// ── GSAP Plugin Registration ──────────────────────────────────
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.fps(120);
  gsap.ticker.lagSmoothing(500, 33);
}

// ── Reduced-motion guard ──────────────────────────────────────
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── DOMContentLoaded orchestration ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (!prefersReduced && typeof gsap !== 'undefined') {
    initNavbar();
    initHeroMotion();
    initScrollReveals();
    initParallaxImages();
    initCardTilt();
    initScrollWheelAnim();
    initServiceCards();
    initRoadmapTimeline();
    initCounters();
    initBrandsReveal();
  } else {
    document.querySelectorAll('.reveal-elem').forEach(el => el.classList.add('revealed'));
  }

  initCotizador();
  initMobileNavigation();
  initContactForm();
  initCopyEmail();
  initPricingTabs();
  initPromoModal();
});

/* ============================================================
   1. NAVBAR — morphing scroll-aware
   ============================================================ */
function initNavbar() {
  const header = document.getElementById('site-header');
  if (!header) return;

  gsap.from(header, {
    y: -80, opacity: 0, duration: 0.9,
    ease: 'power3.out', delay: 0.1,
    clearProps: 'transform,opacity'
  });

  ScrollTrigger.create({
    start: 'top -60', end: 99999,
    toggleClass: { targets: header, className: 'scrolled' }
  });

  document.querySelectorAll('[data-nav-link]').forEach(link => {
    link.addEventListener('mouseenter', () => gsap.to(link, { y: -2, duration: 0.2, ease: 'power2.out' }));
    link.addEventListener('mouseleave', () => gsap.to(link, { y: 0, duration: 0.25, ease: 'power2.out' }));
  });
}

/* ============================================================
   2. HERO MOTION — cinematic master timeline
   ============================================================ */
function initHeroMotion() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

  const eyebrow = document.getElementById('hero-eyebrow');
  if (eyebrow) {
    tl.from(eyebrow, { opacity: 0, y: -16, duration: 0.6, clearProps: 'transform,opacity' });
  }

  const words = document.querySelectorAll('.hero-title .split-word');
  if (words.length) {
    tl.from(words, {
      yPercent: 110, opacity: 0, rotateX: -25,
      stagger: { each: 0.04, ease: 'power1.inOut' },
      duration: 0.65, ease: 'power4.out', clearProps: 'transform,opacity'
    }, '-=0.3');
  }

  const dot = document.querySelector('.accent-dot');
  if (dot) {
    tl.from(dot, {
      scale: 0, opacity: 0, duration: 0.5,
      ease: 'elastic.out(1, 0.5)', clearProps: 'transform,opacity'
    }, '-=0.4');
  }

  const desc = document.getElementById('hero-desc');
  if (desc) {
    tl.from(desc, { opacity: 0, y: 18, duration: 0.55, ease: 'power2.out', clearProps: 'transform,opacity' }, '-=0.4');
  }

  const actions = document.getElementById('hero-actions');
  if (actions) {
    tl.from(actions.children, {
      opacity: 0, stagger: 0.08,
      duration: 0.5, ease: 'power2.out', clearProps: 'opacity'
    }, '-=0.35');
  }

  const proofCards = document.querySelectorAll('.proof-card');
  if (proofCards.length) {
    tl.from(proofCards, {
      opacity: 0, y: 24, scale: 0.96,
      stagger: { each: 0.09, from: 'start' },
      duration: 0.55, ease: 'power3.out', clearProps: 'transform,opacity'
    }, '-=0.3');

    // Persistent subtle float per card
    proofCards.forEach((card, i) => {
      gsap.to(card, {
        y: -6, duration: 2.2 + i * 0.3,
        ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.4
      });
    });
  }

  const scrollInd = document.getElementById('hero-scroll');
  if (scrollInd) {
    tl.from(scrollInd, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out', clearProps: 'transform,opacity' }, '-=0.3');
  }
}

/* ============================================================
   3. SCROLL WHEEL — continuous bounce animation
   ============================================================ */
function initScrollWheelAnim() {
  const wheel = document.querySelector('.scroll-wheel');
  if (!wheel) return;
  gsap.to(wheel, {
    y: 10, opacity: 0,
    duration: 1.1, ease: 'power2.inOut',
    repeat: -1, yoyo: false, repeatDelay: 0.2
  });
}

/* ============================================================
   4. SCROLL REVEALS — staggered per section
   ============================================================ */
function initScrollReveals() {
  document.querySelectorAll('.section-block, .brands-section').forEach(sec => {
    const elems = sec.querySelectorAll('.reveal-elem');
    if (!elems.length) return;

    gsap.set(elems, { willChange: 'transform, opacity' });

    ScrollTrigger.create({
      trigger: sec, start: 'top 85%', once: true,
      onEnter: () => {
        gsap.fromTo(elems,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            stagger: { each: 0.1, ease: 'power1.inOut' },
            duration: 0.75, ease: 'power3.out',
            clearProps: 'willChange,transform,opacity'
          }
        );
      }
    });
  });
}

/* ============================================================
   5. PARALLAX — case study images on scroll
   ============================================================ */
function initParallaxImages() {
  // Animación de movimiento eliminada por petición del usuario
  /*
  document.querySelectorAll('.case-card-img').forEach(img => {
    gsap.set(img, { willChange: 'transform' });
    gsap.to(img, {
      yPercent: -12, ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.case-card'),
        start: 'top bottom', end: 'bottom top', scrub: 1.5
      }
    });
  });
  */

  document.querySelectorAll('.brand-logo-item').forEach((item, i) => {
    gsap.to(item, {
      y: i % 2 === 0 ? -8 : 8, ease: 'none',
      scrollTrigger: {
        trigger: '.brands-section',
        start: 'top bottom', end: 'bottom top', scrub: 2
      }
    });
  });
}

/* ============================================================
   6. CARD 3D TILT — mouse-tracking perspective
   ============================================================ */
function initCardTilt() {
  const tiltables = document.querySelectorAll(
    '.service-bento-card, .proof-card, .pricing-card, .roadmap-step'
  );

  tiltables.forEach(card => {
    let bounds;

    const update = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const dx = (e.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
      const dy = (e.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
      gsap.to(card, {
        rotateX: -dy * 6, rotateY: dx * 6,
        transformPerspective: 800,
        duration: 0.4, ease: 'power2.out', overwrite: 'auto'
      });
    };

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      gsap.set(card, { willChange: 'transform' });
      gsap.to(card, { scale: 1.025, duration: 0.35, ease: 'power2.out' });
      card.addEventListener('mousemove', update);
    });

    card.addEventListener('mouseleave', () => {
      card.removeEventListener('mousemove', update);
      gsap.to(card, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.55, ease: 'elastic.out(1, 0.5)',
        clearProps: 'willChange', overwrite: 'auto'
      });
    });
  });
}

/* ============================================================
   7. MAGNETIC BUTTONS (Desactivado para mantener botones estáticos)
   ============================================================ */
function initMagneticButtons() {
  // Animación de movimiento de botones desactivada a petición
}

/* ============================================================
   8. SERVICE CARDS — number flash on scroll
   ============================================================ */
function initServiceCards() {
  const nums = document.querySelectorAll('.sbc-num');
  if (!nums.length) return;

  ScrollTrigger.create({
    trigger: '#services', start: 'top 75%', once: true,
    onEnter: () => {
      gsap.from(nums, {
        opacity: 0, scale: 2, color: 'var(--accent-blue)',
        duration: 0.7, stagger: 0.15, ease: 'power4.out',
        clearProps: 'transform,opacity,color'
      });
    }
  });
}

/* ============================================================
   9. ROADMAP — step-by-step scroll reveal
   ============================================================ */
function initRoadmapTimeline() {
  document.querySelectorAll('.roadmap-step').forEach(step => {
    const badge   = step.querySelector('.step-badge');
    const content = step.querySelector('.step-content');

    ScrollTrigger.create({
      trigger: step, start: 'top 82%', once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        if (badge) {
          tl.from(badge, { opacity: 0, scale: 0.5, rotate: -15, duration: 0.5, ease: 'back.out(1.7)' });
        }
        if (content) {
          tl.from(content, { opacity: 0, x: 20, duration: 0.5, ease: 'power2.out', clearProps: 'transform,opacity' }, '-=0.25');
        }
      }
    });
  });
}

/* ============================================================
   10. ANIMATED COUNTERS
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.metric-val[data-count]');
  if (!counters.length) return;

  if (typeof ScrollTrigger === 'undefined') {
    counters.forEach(c => c.textContent = c.getAttribute('data-count'));
    return;
  }

  ScrollTrigger.create({
    trigger: '#about', start: 'top 78%', once: true,
    onEnter: () => {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'), 10) || 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2.2, ease: 'power3.out',
          onUpdate: () => { counter.textContent = Math.round(obj.val); }
        });
        gsap.fromTo(counter,
          { color: 'var(--accent-blue)' },
          { color: '', duration: 1, delay: 2.2, ease: 'power2.out', clearProps: 'color' }
        );
      });
    }
  });
}

/* ============================================================
   11. BRANDS — stagger from center + hover glow
   ============================================================ */
function initBrandsReveal() {
  const logos = document.querySelectorAll('.brand-logo-item');
  if (!logos.length) return;

  ScrollTrigger.create({
    trigger: '.brands-logos-grid', start: 'top 85%', once: true,
    onEnter: () => {
      gsap.from(logos, {
        opacity: 0, y: 20, scale: 0.85,
        stagger: { each: 0.1, from: 'center' },
        duration: 0.6, ease: 'back.out(1.5)',
        clearProps: 'transform,opacity'
      });
    }
  });

  logos.forEach(logo => {
    logo.addEventListener('mouseenter', () => gsap.to(logo, { scale: 1.12, duration: 0.3, ease: 'power2.out' }));
    logo.addEventListener('mouseleave', () => gsap.to(logo, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }));
  });
}

/* ============================================================
   12. COTIZADOR INTERACTIVO
   ============================================================ */
let updateCotizadorGlobal = null;

function initCotizador() {
  const sectorChips = document.querySelectorAll('.sector-chip');
  const sectorInput = document.getElementById('contact-sector-input');
  const whatsappBtn = document.getElementById('whatsapp-cotizar-btn');
  const messageArea = document.getElementById('contact-message');

  let currentSector = 'Gastronomía & Eventos';

  function updateCotizador() {
    if (sectorInput) sectorInput.value = currentSector;
    if (whatsappBtn) {
      const couponInput = document.getElementById('contact-coupon');
      const hasCoupon = couponInput && couponInput.value.trim();
      let waMessage = `¡Hola Samuel! Estuve revisando tu portfolio y me interesa conversar sobre un proyecto para el sector de ${currentSector}.`;

      if (hasCoupon) {
        waMessage += `\n\n🎟️ Cupón aplicado: ${couponInput.value.trim()} (10% de descuento en el total - Lanzamiento Web hasta el 10 de octubre).`;
      }

      waMessage += `\n\n¿Podemos coordinar para revisar alcance y plazos?`;
      whatsappBtn.href = `https://wa.me/5491178281814?text=${encodeURIComponent(waMessage)}`;
    }
    if (messageArea && !messageArea.value) {
      messageArea.placeholder = `Describe brevemente tus requerimientos para el sector de ${currentSector} (objetivos, funcionalidades, plazos deseados)…`;
    }
  }

  updateCotizadorGlobal = updateCotizador;

  sectorChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sectorChips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-checked', 'false'); });
      chip.classList.add('active');
      chip.setAttribute('aria-checked', 'true');
      currentSector = chip.getAttribute('data-sector') || chip.textContent.trim();
      updateCotizador();
    });
  });

  updateCotizador();
}

/* ============================================================
   13. MOBILE NAVIGATION DRAWER
   ============================================================ */
function initMobileNavigation() {
  const menuBtn   = document.getElementById('menu-btn');
  const closeBtn  = document.getElementById('menu-close-btn');
  const navMobile = document.getElementById('nav-mobile');
  const links     = document.querySelectorAll('.nav-mobile-link');

  if (!menuBtn || !navMobile) return;

  const useGSAP = !prefersReduced && typeof gsap !== 'undefined';

  function openMenu() {
    navMobile.classList.add('open');
    navMobile.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    if (useGSAP) {
      const items = navMobile.querySelectorAll('.nav-mobile-link, .mobile-cal-btn, .mobile-wa-btn');
      gsap.fromTo(items,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: 'power3.out', delay: 0.15 }
      );
    }
  }

  function closeMenu() {
    navMobile.classList.remove('open');
    navMobile.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));
}

/* ============================================================
   14. CONTACT FORM — Redirección a WhatsApp (+54 11 7828 1814)
   ============================================================ */
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const submitBtn  = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#contact-name');
    const email   = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      showToast('Por favor completa todos los campos requeridos');

      if (!prefersReduced && typeof gsap !== 'undefined') {
        gsap.fromTo(form,
          { x: -6 },
          { x: 6, duration: 0.06, ease: 'none', yoyo: true, repeat: 5,
            onComplete: () => gsap.set(form, { clearProps: 'x' }) }
        );
      }
      return;
    }

    const sectorVal = (document.getElementById('contact-sector-input')?.value || 'General').trim();
    const couponInput = document.getElementById('contact-coupon');
    const couponVal = couponInput ? couponInput.value.trim() : '';

    let waMessage = `¡Hola Samuel! Vengo desde tu web para cotizar un proyecto.\n\n` +
      `📌 *Sector:* ${sectorVal}\n` +
      `👤 *Nombre / Empresa:* ${name.value.trim()}\n` +
      `✉️ *Email:* ${email.value.trim()}\n`;

    if (couponVal) {
      waMessage += `🏷️ *Cupón aplicado:* ${couponVal} (10% de descuento en el presupuesto - Lanzamiento Web hasta el 10/10/2026)\n`;
    }

    waMessage += `\n📝 *Mensaje / Requerimiento:*\n${message.value.trim()}`;

    // Destinatario: +541178281814 (formato internacional WhatsApp Argentina: 5491178281814)
    const waUrl = `https://wa.me/5491178281814?text=${encodeURIComponent(waMessage)}`;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Abriendo WhatsApp…</span>';
    }

    if (successMsg) {
      successMsg.classList.add('show');
      if (!prefersReduced && typeof gsap !== 'undefined') {
        gsap.from(successMsg, { opacity: 0, scale: 0.9, y: 10, duration: 0.5, ease: 'back.out(1.5)' });
      }
    }

    showToast('✓ Conectando con WhatsApp (+54 11 7828 1814)...');

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      form.reset();
      initCotizador();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span id="submit-text">Enviar a WhatsApp</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        `;
      }

      setTimeout(() => { if (successMsg) successMsg.classList.remove('show'); }, 7000);
    }, 600);
  });
}

/* ============================================================
   15. COPY EMAIL + TOAST (GSAP-powered)
   ============================================================ */
function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = 'samuel.valenzueladiaz2@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => showToast('✓ Email copiado: ' + email))
        .catch(() => showToast('Email: ' + email));
    } else {
      showToast('Email: ' + email);
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.setAttribute('aria-hidden', 'false');

  if (!prefersReduced && typeof gsap !== 'undefined') {
    gsap.killTweensOf(toast);
    gsap.fromTo(toast,
      { opacity: 0, y: 16, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.35, ease: 'back.out(1.4)',
        onComplete: () => {
          gsap.to(toast, {
            opacity: 0, y: -10, scale: 0.95,
            duration: 0.35, ease: 'power2.in', delay: 2.8,
            onComplete: () => { toast.setAttribute('aria-hidden', 'true'); }
          });
        }
      }
    );
  } else {
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); toast.setAttribute('aria-hidden', 'true'); }, 3200);
  }
}

/* ============================================================
   16. PRICING TABS  (GSAP-powered)
   ============================================================ */
function initPricingTabs() {
  const track = document.querySelector('.pricing-tabs-track');
  if (!track) return;
  if (typeof gsap === 'undefined') return;

  const pill = track.querySelector('.pricing-tab-pill');
  const tabs = track.querySelectorAll('.pricing-tab');
  let busy = false;

  function movePillToTab(tab, instant) {
    if (!pill) return;
    const tr = track.getBoundingClientRect();
    const tb = tab.getBoundingClientRect();
    const targetLeft  = tb.left - tr.left;
    const targetWidth = tb.width;

    if (instant) {
      gsap.set(pill, { left: targetLeft, width: targetWidth });
    } else {
      gsap.to(pill, { left: targetLeft, width: targetWidth, duration: 0.45, ease: 'power3.inOut' });
    }
  }

  const firstActive = track.querySelector('.pricing-tab.active') || tabs[0];
  movePillToTab(firstActive, true);

  function switchPanel(targetId) {
    if (busy) return;
    const outgoing = document.querySelector('.pricing-panel:not([hidden])');
    const incoming  = document.getElementById('panel-' + targetId);
    if (!incoming || outgoing === incoming) return;

    busy = true;
    const tl = gsap.timeline({ onComplete: () => { busy = false; } });

    if (outgoing) {
      tl.to(outgoing, {
        opacity: 0, y: -10, duration: 0.22, ease: 'power2.in',
        onComplete: () => { outgoing.setAttribute('hidden', ''); gsap.set(outgoing, { clearProps: 'all' }); }
      });
    }

    tl.call(() => { gsap.set(incoming, { opacity: 0, y: 12 }); incoming.removeAttribute('hidden'); });
    tl.to(incoming, { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (busy || tab.classList.contains('active')) return;
      const targetId = tab.dataset.tab;
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      movePillToTab(tab, false);
      switchPanel(targetId);
    });
  });

  window.addEventListener('resize', () => {
    const activeTab = track.querySelector('.pricing-tab.active');
    if (activeTab) movePillToTab(activeTab, true);
  });
}

/* ============================================================
   17. PROMO MODAL & CUPÓN (LANZAMIENTO WEB 2026)
   ============================================================ */
function initPromoModal() {
  const modal = document.getElementById('promo-modal');
  const closeBtn = document.getElementById('promo-close-btn');
  const skipBtn = document.getElementById('promo-skip-btn');
  const redeemBtn = document.getElementById('promo-redeem-btn');
  const copyBtn = document.getElementById('promo-copy-btn');
  const floatingTrigger = document.getElementById('promo-floating-trigger');
  const couponBadge = document.getElementById('form-coupon-badge');
  const couponInput = document.getElementById('contact-coupon');
  const removeCouponBtn = document.getElementById('fcb-remove-btn');

  if (!modal) return;

  const COUPON_CODE = 'WEB2026';

  function applyCoupon(silent = false) {
    if (couponInput) couponInput.value = COUPON_CODE;
    if (couponBadge) {
      couponBadge.style.display = 'flex';
      couponBadge.removeAttribute('hidden');
    }

    try {
      sessionStorage.setItem('promo_redeemed', 'true');
    } catch (_) {}

    if (typeof updateCotizadorGlobal === 'function') {
      updateCotizadorGlobal();
    }

    if (floatingTrigger) {
      floatingTrigger.classList.remove('visible');
    }

    if (!silent) {
      showToast('✓ Cupón WEB2026 aplicado: 10% de descuento en tu presupuesto');
    }
  }

  function removeCoupon() {
    if (couponInput) couponInput.value = '';
    if (couponBadge) {
      couponBadge.style.display = 'none';
      couponBadge.setAttribute('hidden', '');
    }

    try {
      sessionStorage.removeItem('promo_redeemed');
    } catch (_) {}

    if (typeof updateCotizadorGlobal === 'function') {
      updateCotizadorGlobal();
    }

    if (floatingTrigger) {
      floatingTrigger.classList.add('visible');
    }

    showToast('Cupón promocional removido');
  }

  function openPromoModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (floatingTrigger) {
      floatingTrigger.classList.remove('visible');
    }

    if (!prefersReduced && typeof gsap !== 'undefined') {
      const card = modal.querySelector('.promo-modal-card');
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.9, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)', clearProps: 'transform,opacity' }
        );
      }
    }
  }

  function closePromoModal(userDismissed = true) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (userDismissed) {
      try {
        sessionStorage.setItem('promo_dismissed', 'true');
      } catch (_) {}
    }

    let isRedeemed = false;
    try {
      isRedeemed = sessionStorage.getItem('promo_redeemed') === 'true';
    } catch (_) {}

    if (!isRedeemed && floatingTrigger) {
      floatingTrigger.classList.add('visible');
    }
  }

  // Comprobar estado al cargar
  let alreadyRedeemed = false;
  let alreadyDismissed = false;
  try {
    alreadyRedeemed = sessionStorage.getItem('promo_redeemed') === 'true';
    alreadyDismissed = sessionStorage.getItem('promo_dismissed') === 'true';
  } catch (_) {}

  if (alreadyRedeemed) {
    applyCoupon(true);
  } else if (!alreadyDismissed) {
    // Abrir suavemente tras 2.5s
    setTimeout(() => {
      let nowRedeemed = false;
      try {
        nowRedeemed = sessionStorage.getItem('promo_redeemed') === 'true';
      } catch (_) {}
      if (!modal.classList.contains('open') && !nowRedeemed) {
        openPromoModal();
      }
    }, 2500);
  } else if (floatingTrigger) {
    floatingTrigger.classList.add('visible');
  }

  // Acción de Canjear
  if (redeemBtn) {
    redeemBtn.addEventListener('click', () => {
      applyCoupon(false);
      closePromoModal(false);

      const cotizadorSec = document.getElementById('cotizador');
      const formCard = document.querySelector('.clean-form-panel');

      if (cotizadorSec) {
        cotizadorSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (formCard) {
        setTimeout(() => {
          formCard.classList.add('form-coupon-highlight');
          setTimeout(() => formCard.classList.remove('form-coupon-highlight'), 1300);
        }, 550);
      }
    });
  }

  // Acción de Copiar
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const copyTextSpan = copyBtn.querySelector('.copy-btn-text');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(COUPON_CODE).then(() => {
          if (copyTextSpan) copyTextSpan.textContent = '¡Copiado!';
          showToast('✓ Cupón WEB2026 copiado al portapapeles');
          setTimeout(() => {
            if (copyTextSpan) copyTextSpan.textContent = 'Copiar';
          }, 2000);
        }).catch(() => {
          showToast(`Cupón: ${COUPON_CODE}`);
        });
      } else {
        showToast(`Cupón: ${COUPON_CODE}`);
      }
    });
  }

  // Cierre por botones, fondo o tecla Esc
  if (closeBtn) closeBtn.addEventListener('click', () => closePromoModal(true));
  if (skipBtn) skipBtn.addEventListener('click', () => closePromoModal(true));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePromoModal(true);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closePromoModal(true);
    }
  });

  // Reabrir con gatillador flotante
  if (floatingTrigger) {
    floatingTrigger.addEventListener('click', openPromoModal);
  }

  // Quitar cupón del formulario
  if (removeCouponBtn) {
    removeCouponBtn.addEventListener('click', removeCoupon);
  }
}

