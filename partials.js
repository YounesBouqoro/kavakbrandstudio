/* ============================================
   KAVAK BRAND STUDIO — partials.js
   Injects shared Nav, Footer, Cursor & Overlay
   ============================================ */

(function () {
  /* ---- resolve root path ---- */
  const root = './';

  /* ---- NAV ---- */
  const NAV_HTML = `
<nav class="nav" id="mainNav">
  <div class="nav__inner">
    <a href="${root}index.html" class="nav__logo" aria-label="KAVAK Brand Studio – Startseite"><img src="${root}assets/images/kavak-logo.png" class="kavak-logo--nav" alt="KAVAK Brand Studio"></a>
    <ul class="nav__links">
      <li><a href="${root}studio.html">Studio</a></li>
      <li><a href="${root}brands.html">Brands</a></li>
      <li><a href="${root}service.html">Expertise</a></li>
      <li><a href="${root}dates.html">Dates</a></li>
      <li><a href="${root}kontakt.html">Kontakt</a></li>
    </ul>
    <button class="nav__hamburger" aria-label="Menü öffnen" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<ul class="nav__mobile">
  <li><a href="${root}studio.html">Studio</a></li>
  <li><a href="${root}brands.html">Brands</a></li>
  <li><a href="${root}service.html">Expertise</a></li>
  <li><a href="${root}dates.html">Dates</a></li>
  <li><a href="${root}kontakt.html">Kontakt</a></li>
</ul>`;

  /* ---- FOOTER ---- */
  const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <a href="${root}index.html" class="footer__logo" aria-label="KAVAK Brand Studio – Startseite"><span class="kavak-wordmark kavak-wordmark--footer" aria-hidden="true">KAVAK</span></a>
        <p class="footer__tagline">360° Vertrieb & Markenstrategie für Fashion Brands und Retail-Partner in Deutschland.</p>
      </div>
      <div>
        <p class="footer__col-title">Navigation</p>
        <ul class="footer__links">
          <li><a href="${root}index.html">Startseite</a></li>
          <li><a href="${root}brands.html">Brands</a></li>
          <li><a href="${root}service.html">Expertise</a></li>
          <li><a href="${root}dates.html">Dates</a></li>
          <li><a href="${root}kontakt.html">Kontakt</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-title">Kontakt</p>
        <ul class="footer__links">
          <li><a href="mailto:ozan@kavakbrandstudio.com">ozan@kavakbrandstudio.com</a></li>
          <li><a href="tel:+4917660997699">+49 176 60997699</a></li>
          <li style="color:var(--gray-400);font-size:0.85rem;margin-top:0.5rem"><a href="https://www.google.com/maps/search/?api=1&query=Plockstra%C3%9Fe+8%2C+40219+D%C3%BCsseldorf" target="_blank" rel="noopener noreferrer">Plockstraße 8, 40219 Düsseldorf </a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-title">Rechtliches</p>
        <ul class="footer__links">
          <li><a href="${root}impressum.html">Impressum</a></li>
          <li><a href="${root}datenschutz.html">Datenschutz</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span class="footer__copy">© 2026 KAVAK Brand Studio · Ozan Kavak</span>
      <div class="footer__legal">
        <a href="${root}impressum.html">Impressum</a>
        <a href="${root}datenschutz.html">Datenschutz</a>
      </div>
    </div>
  </div>
</footer>`;

  /* ---- CURSOR & OVERLAY ---- */
  const EXTRAS_HTML = `
<div class="cursor" aria-hidden="true"></div>
<div class="cursor-ring" aria-hidden="true"></div>
<div class="page-transition" aria-hidden="true"></div>`;

  /* ---- INJECT ---- */
  const navTarget = document.getElementById('nav-placeholder');
  if (navTarget) navTarget.outerHTML = NAV_HTML;

  const footerTarget = document.getElementById('footer-placeholder');
  if (footerTarget) footerTarget.outerHTML = FOOTER_HTML;

  document.body.insertAdjacentHTML('beforeend', EXTRAS_HTML);
})();
