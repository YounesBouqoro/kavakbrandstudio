/* KAVAK Brand Studio — confirmed portfolio data.
   Publish a brand only after Ozan has confirmed its name, description and official URL.
   Example:
   { name: "Brand", category: "Contemporary Fashion", description: "Kurzbeschreibung", url: "https://brand.example", image: "" }
*/
const KAVAK_BRANDS = [];
(function () {
  const grid = document.getElementById('brandPortfolio');
  const pending = document.getElementById('brandsPending');
  if (!grid) return;
  const safeURL = (value) => { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; } };
  const brands = KAVAK_BRANDS.filter(b => b && b.name && b.description && safeURL(b.url));
  if (!brands.length) return;
  pending.hidden = true;
  grid.replaceChildren();
  brands.forEach((brand, i) => {
    const article = document.createElement('article'); article.className = 'brands-entry';
    const visual = document.createElement('div'); visual.className = 'brands-entry__visual';
    if (brand.image) {
      const imageURL = safeURL(brand.image) || (/^(?!\/|\.\.\/)[\w./-]+$/.test(brand.image) ? brand.image : null);
      if (imageURL) { const img = document.createElement('img'); img.src = imageURL; img.alt = ''; img.loading = 'lazy'; visual.append(img); }
    }
    const wordmark = document.createElement('span'); wordmark.className = 'brands-entry__wordmark'; wordmark.textContent = brand.name; visual.append(wordmark);
    const detail = document.createElement('div'); detail.className = 'brands-entry__details';
    const category = document.createElement('p'); category.className = 'editorial-kicker'; category.textContent = brand.category || 'Fashion Brand';
    const heading = document.createElement('h3'); heading.textContent = brand.name;
    const desc = document.createElement('p'); desc.textContent = brand.description;
    const link = document.createElement('a'); link.className = 'editorial-text-link'; link.href = safeURL(brand.url); link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Zur Markenwebsite ↗'; link.setAttribute('aria-label', 'Website von ' + brand.name + ' in neuem Tab öffnen');
    detail.append(category,heading,desc,link);article.append(visual,detail);grid.append(article);
  });
})();