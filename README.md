# KAVAK Brand Studio — GitHub Pages Site

Statische Website für KAVAK Brand Studio, Düsseldorf.  
Gehostet über **GitHub Pages** — kein Build-Prozess, keine Dependencies.

---

## 📁 Projektstruktur

```
kavak-site/
├── index.html              ← Startseite
├── README.md
│
├── pages/
│   ├── brands.html         ← Brand Portfolio
│   ├── service.html        ← 360° Leistungen
│   ├── dates.html          ← Ordertage & Messen
│   ├── kontakt.html        ← Kontaktformular
│   ├── impressum.html      ← Impressum (noindex)
│   └── datenschutz.html    ← Datenschutz (noindex)
│
└── assets/
    ├── css/
    │   └── style.css       ← Gesamtes Design-System
    ├── js/
    │   ├── partials.js     ← Nav, Footer, Cursor (shared)
    │   └── main.js         ← Animationen, Interaktionen
    ├── fonts/              ← (optional: self-hosted fonts)
    └── images/             ← Showroom-Fotos hier ablegen
```

---

## 🚀 GitHub Pages einrichten

### 1. Repository erstellen
```bash
# Neues Repo auf GitHub anlegen (z.B. "kavak-site")
# Dann lokal:
cd kavak-site
git init
git add .
git commit -m "Initial: KAVAK Brand Studio website"
git branch -M main
git remote add origin https://github.com/DEIN-USERNAME/kavak-site.git
git push -u origin main
```

### 2. GitHub Pages aktivieren
1. Repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / Ordner: `/ (root)`
4. Speichern → URL wird angezeigt (z.B. `https://dein-username.github.io/kavak-site/`)

### 3. Custom Domain (optional)
1. DNS: CNAME-Eintrag `www` → `dein-username.github.io`
2. GitHub Pages Settings → Custom domain eintragen
3. HTTPS erzwingen ✓

---

## ✏️ Inhalte anpassen

### Kontaktdaten
Suche in allen Dateien nach:
- `info@kavak-brandstudio.de` → echte E-Mail eintragen
- `+49 (0) 000 000 000` → echte Telefonnummer
- `[Straße und Hausnummer]` → echte Adresse (Impressum)

### Brand-Namen
In `pages/brands.html` und `index.html`:
- `Brand 02` bis `Brand 08` durch echte Brand-Namen ersetzen
- Logos als `<img>` in `.brand-card` einbauen

### Termine
In `pages/dates.html` das `events`-Array anpassen:
```js
const events = [
  { date: 'Jan 2026', name: 'Mein Event', location: 'Berlin', type: 'messe' },
  // ...
];
```
Typen: `messe` | `ordertag` | `showroom`

### Showroom-Fotos
Bilder in `assets/images/` ablegen:
- `showroom-1.jpg` bis `showroom-4.jpg`

### Kontaktformular
Das Formular in `kontakt.html` benötigt ein Backend oder einen Service:
- **Formspree** (einfachste Lösung): `<form action="https://formspree.io/f/XXXXX">`
- **Netlify Forms** (falls zu Netlify gewechselt wird)
- Eigenes Backend (z.B. PHP auf IONOS)

---

## 🎨 Design-System

Das gesamte Design-System steckt in `assets/css/style.css`:

| Variable | Wert |
|----------|------|
| `--black` | `#0a0a0a` |
| `--white` | `#f5f3f0` |
| `--font-serif` | Cormorant Garamond |
| `--font-sans` | DM Sans |

### Klassen-Übersicht
- `.t-display` / `.t-headline` / `.t-subheadline` / `.t-body` → Typografie
- `.btn` / `.btn--filled` / `.btn--white` → Buttons
- `.reveal` + `.reveal-delay-1/2/3/4` → Scroll-Animationen
- `.section-pad` / `.section-pad-sm` → Abstände
- `.bg-white` / `.bg-black` / `.bg-gray` → Hintergründe
- `.container` → Zentrierter Inhaltsbereich
- `.grid-12` → 12-Spalten-Grid

---

## 🔧 Weiterentwicklung

- **Lightbox für Showroom**: `assets/js/main.js` erweitern
- **Mehrsprachigkeit (DE/EN)**: HTML `lang`-Attribut wechseln, Texte duplizieren
- **Blog/News**: Neue Seite `pages/news.html` anlegen, Link in `partials.js` ergänzen
- **Google Analytics**: Script-Tag in alle HTML-Dateien vor `</body>` einfügen

---

Erstellt für KAVAK Brand Studio · Ozan Kavak · Düsseldorf
