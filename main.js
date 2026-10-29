/* ============================================
   KAVAK BRAND STUDIO — main.js
   ============================================ */

(function () {
  'use strict';

  /* ----------------------------------------
     1. PAGE TRANSITION
     ---------------------------------------- */
  const overlay = document.querySelector('.page-transition');

  function transitionOut(href) {
    if (!overlay) { window.location.href = href; return; }
    overlay.classList.add('entering');
    overlay.addEventListener('animationend', () => {
      window.location.href = href;
    }, { once: true });
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') ||
        href.startsWith('tel') || link.target === '_blank') return;
    const isExternal = link.hostname && link.hostname !== window.location.hostname;
    if (isExternal) return;
    e.preventDefault();
    transitionOut(href);
  });

  window.addEventListener('pageshow', () => {
    if (!overlay) return;
    overlay.classList.remove('entering', 'leaving');
    overlay.classList.add('leaving');
    overlay.addEventListener('animationend', () => {
      overlay.classList.remove('leaving');
    }, { once: true });
  });

  /* ----------------------------------------
     2. NAVIGATION — scroll state & hamburger
     ---------------------------------------- */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded','false');
        hamburger.setAttribute('aria-label','Menü öffnen');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded','false');
      hamburger?.setAttribute('aria-label','Menü öffnen');
      document.body.style.overflow = '';
      hamburger?.focus();
    }
  });

  /* Active nav link */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const linkPath = a.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) a.classList.add('active');
  });

  /* ----------------------------------------
     3. SCROLL REVEAL — IntersectionObserver
     ---------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ----------------------------------------
     4. CUSTOM CURSOR (Desktop)
     ---------------------------------------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.querySelector('.cursor');
    const ring   = document.querySelector('.cursor-ring');

    if (cursor && ring) {
      let mx = -100, my = -100;
      let rx = -100, ry = -100;

      document.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
      });

      // Lagging ring via RAF
      function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animateRing);
      }
      animateRing();

      // Hover state on interactive elements
      const interactiveSelector = 'a, button, .brand-card, .service-item, .gallery-item, input, textarea';
      document.querySelectorAll(interactiveSelector).forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hover');
          ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover');
          ring.classList.remove('hover');
        });
      });
    }
  }

  /* ----------------------------------------
     5. STAT COUNTER ANIMATION
     ---------------------------------------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = prefix + current + suffix;
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = prefix + target + suffix;
        }
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ----------------------------------------
     6. TICKER — duplicate items for seamless loop
     ---------------------------------------- */
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    const clone = tickerTrack.cloneNode(true);
    tickerTrack.parentElement.appendChild(clone);
  }

  /* ----------------------------------------
     7. CONTACT FORM
     ---------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const status = document.getElementById('contactFormStatus');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!contactForm.reportValidity()) return;
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true; btn.textContent = 'Wird gesendet …';
      if (status) { status.textContent = ''; status.className = 'contact-feedback'; }
      try {
        const response = await fetch('/api/contact', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(Object.fromEntries(new FormData(contactForm)))});
        const result = await response.json().catch(()=>({}));
        if (!response.ok || !result.success) throw new Error(result.error || 'Versand nicht möglich.');
        if (status) { status.textContent = 'Vielen Dank! Ihre Anfrage wurde übermittelt.'; status.className = 'contact-feedback is-success'; }
        contactForm.reset();
      } catch (err) {
        if (status) {status.replaceChildren(); status.className = 'contact-feedback is-error'; status.append(document.createTextNode('Der automatische Versand ist zurzeit nicht verfügbar. Bitte senden Sie Ihre Anfrage direkt per E-Mail an ')); const link = document.createElement('a'); link.href = 'mailto:ozan@kavakbrandstudio.com'; link.textContent = 'ozan@kavakbrandstudio.com'; status.append(link, document.createTextNode('. Ihre Formulareingaben wurden nicht übermittelt.'));}
      } finally {btn.disabled = false;btn.textContent = original;}
    });
  }

  /* ----------------------------------------
     8. 360° SERVICE — scroll-animated pie wheel
     ---------------------------------------- */
  const wheel = document.getElementById('serviceWheel');
  if (wheel) {
    const slices   = wheel.querySelectorAll('.pie-slice');
    const panels   = document.querySelectorAll('.service-panel');
    let active = 0;

    function setActive(index) {
      slices.forEach((s, i) => s.classList.toggle('active', i === index));
      panels.forEach((p, i) => {
        p.classList.toggle('active', i === index);
        p.style.opacity   = i === index ? '1' : '0';
        p.style.transform = i === index ? 'translateY(0)' : 'translateY(12px)';
      });
      active = index;
      // Rotate wheel so active slice points up
      const deg = -(index * 60);
      wheel.style.transform = `rotate(${deg}deg)`;
      slices.forEach(s => { s.style.transform = `rotate(${-deg}deg)`; });
    }

    slices.forEach((s, i) => s.addEventListener('click', () => setActive(i)));
    setActive(0);

    // Scroll-drive on service section
    const serviceSection = document.getElementById('service');
    if (serviceSection) {
      window.addEventListener('scroll', () => {
        const rect = serviceSection.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1,
          -rect.top / (rect.height - window.innerHeight)
        ));
        const newIndex = Math.min(slices.length - 1, Math.floor(progress * slices.length));
        if (newIndex !== active) setActive(newIndex);
      }, { passive: true });
    }
  }

  /* ----------------------------------------
     9. HERO TEXT — stagger on load
     ---------------------------------------- */
  document.querySelectorAll('.hero-stagger').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.15}s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.15}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });

})();
