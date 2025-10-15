# Age of Pixels — Website README
_Last updated: 2025-10-13 21:30 _

This README summarizes how to maintain and extend the Age of Pixels website. It focuses on language handling (EN/CS), product pages, videos, and small SEO/performance/accessibility tips.

---

## 1) Project structure
```
/index.html          # Landing page (hero, My Collection tiles, Videos, About)
/1.html              # Product page template example (DOS / Win 3.x Games); use as a model for 2–12
/videos.html         # Video thumbnails (fetched into index via script.js)
/privacy.html        # Privacy & Cookies

/style.css           # Global theme, layout, components, lightbox, product grid
/script.js           # YouTube modal, image lightbox, alphabet nav, header shadow
/i18n.js             # Client-side i18n (EN/CS), detection + switching
/.htaccess           # UTF-8 enforcement, (Apache) headers
/favicon.svg
/site-assets/*       # Static images (hero, flags, badges)
/images/*            # Product images (used on 1.html and future pages 2–12)
```

---

## 2) Language (i18n) rules — **very important**
- The site is **bilingual (EN/CS)** with client-side switching via `i18n.js` and attribute `data-i18n` on elements.
- **Autodetection**: uses `navigator.languages` (prefers `cs*` → Czech; otherwise EN). Users can also force with URL: `?lang=cs|en`.
- **Remember:** The 12 tiles under **My Collection** on the homepage are **always English** — _do not translate_. They **do not** use `data-i18n`.  
  > This is an explicit project rule.
- To translate a text: add `data-i18n="key"` to the element and define the key in both locales in `i18n.js` inside the `MESSAGES` object.
- To set the language manually from code: `window.__setLang('cs')` or `window.__setLang('en')`.

**Where i18n is already applied:**
- Navbar items, hero subtitle, section headings.
- `1.html` product blocks (EF2000, ATF, Lost in Time, Overlord) including captions, headings, bullets.

---

## 3) Adding new product pages (2.html … 12.html)
- **Copy `1.html`** as a starting point and rename to `2.html` (etc.).
- Keep the **2×2 grid** pattern per product (`figure` ×2 + `article` ×2). See `1.html` for the layout.
- Ensure the page includes the standard header (brand + language switch + main-nav) and the footer (Netscape badge, Privacy link).
- **Alphabet navigator** + **auto-sort** are handled by `script.js` when it finds `.container.narrow` and `h2.detail-title`. For new pages, mirror the same structure so features continue to work.
- **Back to top** floating button is auto-injected on pages that have the A–Z bar.

**Minimal block anatomy example:**
```html
<h2 class="detail-title">Your Game Title (PC) — Big Box</h2>
<div class="detail-grid">
  <figure class="detail-card">
    <div class="img-holder">
      <img class="zoomable" src="images/your_image_1.jpg" data-full="images/your_image_1.jpg" alt="Front cover — ...">
    </div>
    <figcaption>Front cover — …</figcaption>
  </figure>

  <figure class="detail-card">
    <div class="img-holder">
      <img class="zoomable" src="images/your_image_2.jpg" data-full="images/your_image_2.jpg" alt="Box contents — ...">
    </div>
    <figcaption>Box contents — …</figcaption>
  </figure>

  <article class="detail-card">
    <h3>About the Game</h3>
    <p>Short paragraph …</p>
    <h4>Highlights</h4>
    <ul>
      <li>Point 1</li>
      <li>Point 2</li>
      <li>Point 3</li>
      <li>Point 4</li>
    </ul>
  </article>

  <article class="detail-card">
    <h3>System Requirements</h3>
    <ul class="req-list">
      <li>Platform: IBM PC compatible</li>
      <li>OS: …</li>
      <li>CPU: …</li>
      <li>RAM: …</li>
      <li>Graphics: …</li>
      <li>Sound: …</li>
      <li>Media: …</li>
      <li>Input: …</li>
    </ul>
    <h3>Trivia</h3>
    <ul class="req-list">
      <li>Fact 1 …</li>
      <li>Fact 2 …</li>
      <li>Fact 3 …</li>
    </ul>
  </article>
</div>
```

**i18n on product pages:**
- Pokud chceš konkrétní texty přepínat EN/CS, přidej `data-i18n="…"` a doplň klíče do `i18n.js`.  
- Pokud zůstane text pouze v angličtině, nepřidávej `data-i18n` (bude statický).

**Obrázky:**
- Umisťuj je do `/images/`. Pro lepší UX nech `class="zoomable"` a volitelně `data-full="…"`. Lightbox si je načte automaticky (`script.js`).  
- Doporučený poměr: **4:3**. CSS už počítá s `aspect-ratio: 4 / 3` a `object-fit: contain`.

---

## 4) Videos
- Video thumbnail grid je ve `videos.html`. Načítá se do `#videos-mount` přes `fetch()` v `script.js`.
- Vložené `<img>` mají `loading="lazy"`, `decoding="async"`, `referrerpolicy="no-referrer"` a rozměry `320×180` (stabilita layoutu).
- Kliknutí otevře modal s YouTube embedem přes **youtube-nocookie.com** (žádné marketing cookies před interakcí).

---

## 5) SEO & performance
- **index.html** má `meta description` + `link rel="canonical"`.
- `<link rel="preconnect">` na `img.youtube.com` a `www.youtube-nocookie.com` pro rychlejší načtení miniatur a přehrávače.
- Obrázky (mimo videí) je vhodné v budoucnu postupně doplnit o `width`/`height` pro menší **CLS**.
- Pokud někdy přidáš větší JS/CSS, zvaž `defer`/`async` a minifikaci.

---

## 6) Accessibility
- Aktivní jazykové tlačítko má `aria-pressed="true"` (dělá `i18n.js` při přepínání jazyka).
- Doporučeno: pro hlavní navigaci přidávat `aria-current="page"` (nebo aspoň na produktových stránkách zvýraznit aktivní sekci).

---

## 7) Privacy
- `privacy.html` je jednoduché, srozumitelné. Odkaz zpět na úvod (Back to Home) má `data-i18n`.

---

## 8) Server / .htaccess
Aby se předešlo problémům s diakritikou (`â€™`, `â€”` apod.), je v **.htaccess** vynuceno **UTF-8**:
```
AddDefaultCharset UTF-8
Header set Content-Type "text/html; charset=UTF-8"
```

---

## 9) Deployment checklist
- [ ] Nahrát `index.html`, `style.css`, `script.js`, `i18n.js`, `privacy.html`, `videos.html`.
- [ ] Zkontrolovat `/images/` cesty (case-sensitive na Linux hostingu).
- [ ] Ověřit přepínač jazyka (EN/CS, localStorage, ?lang=…).
- [ ] Na titulce: 12 dlaždic **v angličtině** (statické popisky).
- [ ] Otestovat modal s videem a image lightbox.
- [ ] Rychlý průchod Lighthouse (CLS, kontrast, title/description).

---

## 10) Change log convention (doporučeno)
V každém souboru je hlavičkový komentář „Modified: …“. Při dalších úpravách přepiš čas a stručnou poznámku o změně. Pro větší změny si veď `CHANGES.md` (volitelné).

---

## 11) Known conventions & decisions (shrnutí)
- **My Collection tile labels**: _angličtina napevno_ (bez i18n), platí pro všechny jazykové mutace.
- **Videos**: načítání z fragmentu, modal YouTube **nocookie**.
- **i18n**: preferuj `data-i18n` pro text, který se má překládat (v EN/CS), neměň texty dlaždic My Collection.
- **Layout**: produktové stránky v 2×2 gridu (figure, figure, article, article), lightbox a A–Z navigace se přidají automaticky.


---

## 12) Product page extras (reserve + share row)

Each product grid (on 1.html) has **an extra bottom row** with two cells:
- **#5 Reserve** — empty, dark card for future use (keeps the layout neat).
- **#6 Share** — centered row of share buttons.

**Current buttons (left → right):**
Facebook, X (Twitter), Email, WhatsApp, Copy link, Telegram, Reddit, LinkedIn, Messenger, **native share (last)**.

**Sizes:** ~26×20 px buttons, SVG 16 px, compact spacing; aligned **center** inside the cell.

How to add to other pages: copy the `<article class="detail-card share-card">…</article>` block (plus the preceding `reserve-card`) to the end of any `.detail-grid`. JavaScript in `script.js` auto-wires share URLs to the nearest product title.

---

## 13) Placeholder pages 2–12

Pages **2.html … 12.html** are prepared as *Coming soon* stubs. Each page:
- Keeps the standard header/footer and hero.
- Uses the **exact English category label** as title (same wording as on the homepage tiles).
- Shows a centered card with bilingual text: **Coming soon / Již brzy** (`data-i18n="coming.soon"`).

When you start adding content, mirror the structure from `1.html` (A–Z nav optional).

---

## 14) .htaccess safety note

If you touch server headers again, **scope** the HTML charset like this to avoid breaking CSS/JS MIME types:
```
AddDefaultCharset UTF-8
<FilesMatch "\.(html|htm)$">
  Header set Content-Type "text/html; charset=UTF-8"
</FilesMatch>
```
