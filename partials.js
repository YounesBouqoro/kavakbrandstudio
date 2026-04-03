/* ============================================
   KAVAK BRAND STUDIO — partials.js
   Injects shared Nav, Footer, Cursor & Overlay
   ============================================ */

(function () {
  /* ---- resolve root path ---- */
  const depth = (window.location.pathname.match(/\//g) || []).length;
  const root = depth <= 1 ? './' : '../';

  /* ---- NAV ---- */
  const NAV_HTML = `
<nav class="nav" id="mainNav">
  <div class="nav__inner">
    <a href="${root}index.html" class="nav__logo">KAVAK <span>Brand Studio</span></a>
    <ul class="nav__links">
      <li><a href="${root}index.html#showroom">Showroom</a></li>
      <li><a href="${root}pages/brands.html">Brands</a></li>
      <li><a href="${root}pages/service.html">Service</a></li>
      <li><a href="${root}pages/dates.html">Dates</a></li>
      <li><a href="${root}pages/kontakt.html">Kontakt</a></li>
    </ul>
    <button class="nav__hamburger" aria-label="Menü öffnen" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<ul class="nav__mobile">
  <li><a href="${root}index.html#showroom">Showroom</a></li>
  <li><a href="${root}pages/brands.html">Brands</a></li>
  <li><a href="${root}pages/service.html">Service</a></li>
  <li><a href="${root}pages/dates.html">Dates</a></li>
  <li><a href="${root}pages/kontakt.html">Kontakt</a></li>
</ul>`;

  /* ---- FOOTER ---- */
  const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="footer__logo">KAVAK <em>Brand Studio</em></div>
        <p class="footer__tagline">360° Vertrieb & Markenstrategie für Fashion Brands und Retail-Partner in Deutschland.</p>
      </div>
      <div>
        <p class="footer__col-title">Navigation</p>
        <ul class="footer__links">
          <li><a href="${root}index.html">Startseite</a></li>
          <li><a href="${root}pages/brands.html">Brands</a></li>
          <li><a href="${root}pages/service.html">Service</a></li>
          <li><a href="${root}pages/dates.html">Dates</a></li>
          <li><a href="${root}pages/kontakt.html">Kontakt</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-title">Kontakt</p>
        <ul class="footer__links">
          <li><a href="mailto:info@kavak-brandstudio.de">info@kavak-brandstudio.de</a></li>
          <li><a href="tel:+49000000000">+49 (0) 000 000 000</a></li>
          <li style="color:var(--gray-400);font-size:0.85rem;margin-top:0.5rem">Düsseldorf, NRW</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__col-title">Rechtliches</p>
        <ul class="footer__links">
          <li><a href="${root}pages/impressum.html">Impressum</a></li>
          <li><a href="${root}pages/datenschutz.html">Datenschutz</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span class="footer__copy">© 2025 KAVAK Brand Studio · Ozan Kavak</span>
      <div class="footer__legal">
        <a href="${root}pages/impressum.html">Impressum</a>
        <a href="${root}pages/datenschutz.html">Datenschutz</a>
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
