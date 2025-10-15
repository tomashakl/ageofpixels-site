/*
 * Age of Pixels — i18n.js
 * Purpose: (My Collection tile labels: fixed EN by user request.) Client-side bilingual strings (EN/CS) + language detection and switching.
 * Notes: Uses data-i18n attributes in HTML. Call __setLang('cs'|'en') to force language.
 * Modified: 2025-10-13 21:06
 */

(function(){
  const LANGS = ['en','cs'];

  const MESSAGES = {
  "en": {
    "site.title": "Age of Pixels",
    "site.subtitle": "Retro computing & big box games. Genuine MIDI hardware captures (MT-32, SC-55), sound cards, Amiga & hi-fi.",
    "nav.collection": "My Collection",
    "nav.videos": "Videos",
    "nav.about": "About",
    "nav.links": "Links",
    "home.collection": "My Collection",
    "home.videos": "Videos",
    "home.videosSub": "Click a thumbnail to play.",
    "home.about": "About",
    "about.p1": "I am an enthusiast of the 80s/90s PC era, Amiga, and MIDI modules. After years of keeping things in storage, I now restore, record, and share them so they don\u2019t get lost in drawers.",
    "about.p2": "On YouTube, you\u2019ll find authentic sound recordings from Roland MT-32, SC-55, and other cards/modules. On eBay/Aukro I regularly offer big box games, hardware, and hi-fi pieces from my collection.",
    "about.p3": "My goal is to keep this era alive and accessible. Thanks for subscribing and following!",
    "cards.dos": "DOS / Win 3.x Games",
    "cards.w95": "Windows 95/98 Games",
    "cards.dvd": "DVD Case Games",
    "cards.isa": "Sound Cards ISA",
    "cards.pci": "Sound Cards PCI",
    "cards.modules": "Sound Modules",
    "cards.vlb": "Graphics Cards VLB",
    "cards.isagpu": "Graphics Cards ISA",
    "cards.pcigpu": "Graphics Cards PCI",
    "cards.amiga.hw": "Amiga Hardware",
    "cards.amiga.games": "Amiga Games",
    "cards.amiga.sw": "Amiga Software",
    "pages.dos.title": "DOS / Win 3.x Games",
    "pages.w95.title": "Windows 95/98 Games",
    "ui.comingSoon": "Coming Soon",
    "ui.backHome": "\u2190 Back to Home",
    "privacy.title": "Privacy & Cookies",
    "privacy.collect": "We do not collect personal data, run ads, or use tracking cookies. We do not embed third-party analytics.",
    "privacy.videos": "Videos are loaded on demand via a click and use the youtube-nocookie.com embed to avoid setting marketing cookies before interaction.",
    "privacy.contact": "Contact",
    "privacy.btn": "Privacy & Cookies",
    "prod.about": "About the Game",
    "prod.high": "Highlights",
    "prod.req": "System Requirements",
    "prod.trivia": "Trivia",
    "ef2000.title": "EF2000 (PC) \u2014 Big Box",
    "ef2000.fig1": "Front cover \u2014 DID / Ocean, TFX Military branding",
    "ef2000.fig2": "Box contents \u2014 manual, addendum, CD and big box",
    "ef2000.p": "EF2000 is a landmark modern jet combat simulator by Digital Image Design. Fly the Eurofighter prototype in dynamic campaigns over Scandinavia with advanced avionics and immersive graphics.",
    "ef2000.l1": "Dynamic campaign engine with evolving frontline and missions.",
    "ef2000.l2": "High\u2011fidelity avionics, 3D cockpit, and realistic flight model.",
    "ef2000.l3": "Multiplayer over network/modem; support for head\u2011tracking style padlock views.",
    "ef2000.l4": "Striking metal\u2011panel big box presentation with rivet motif.",
    "ef2000.t1": "Developed by Digital Image Design (DID), creators of TFX.",
    "ef2000.t2": "Praised for its dynamic weather and atmospheric effects.",
    "ef2000.t3": "Spawned the Super EF2000 update for Windows/Glide later on.",
    "atf.title": "Jane\u2019s Advanced Tactical Fighters (PC) \u2014 Big Box",
    "atf.fig1": "Front cover \u2014 Jane\u2019s Combat Simulations",
    "atf.fig2": "Box contents \u2014 spiral-bound manual, reference card, CD",
    "atf.p": "Jane\u2019s Advanced Tactical Fighters (ATF) is a modern air-combat simulator and the direct sequel to U.S. Navy Fighters. It features cutting-edge aircraft and globe-spanning campaigns with mission editor support.",
    "atf.l1": "Fly stealth and experimental fighters (e.g., F-117A, F-22, B-2A, X-31, X-29, ASTOVL, Rafale C).",
    "atf.l2": "80 missions across 3 campaigns (Egypt, France, Far East) plus multiplayer scenarios.",
    "atf.l3": "Pro Mission Creator tool for building your own missions.",
    "atf.l4": "Realistic damage effects, dynamic weather, and network/modem multiplayer.",
    "atf.t1": "Released in 1996 under the Jane\u2019s Combat Simulations label (EA/Origin).",
    "atf.t2": "Ships with a spiral-bound First Edition manual and reference card.",
    "atf.t3": "Well regarded for its aircraft database and technical detail.",
    "lit.title": "Lost in Time (PC) \u2014 Sierra Originals (Parts 1 & 2)",
    "lit.fig1": "Box contents \u2014 jewel case, catalogue 1995\u20131996, and inserts",
    "lit.fig2": "Front cover \u2014 Sierra Originals re-release (Parts 1 & 2)",
    "lit.p": "Lost in Time is a two-part point-and-click adventure developed by Coktel Vision and published by Sierra. Combining live-action video sequences with pre-rendered backgrounds, it follows Doralice on a time\u2011travel journey to the 18th century.",
    "lit.l1": "Two complete episodes included: Parts I & II.",
    "lit.l2": "FMV sequences and digitized actors for cinematic storytelling.",
    "lit.l3": "Puzzles involving time paradoxes and historical exploration.",
    "lit.l4": "Sierra Originals edition with standardized packaging.",
    "lit.t1": "Originally released in 1993 by Coktel Vision; Sierra edition from mid\u201190s.",
    "lit.t2": "Among early adventure games with FMV segments.",
    "lit.t3": "Part of the Sierra Originals budget line.",
    "ovr.title": "Overlord (PC) \u2014 Big Box",
    "ovr.fig1": "Front cover \u2014 limited edition sticker visible",
    "ovr.fig2": "Box contents \u2014 manuals, disks, and extras",
    "ovr.p": "Overlord is a WWII squadron\u2011level combat flight sim by Rowan / Virgin set around the Normandy campaign. You manage pilots and missions and then take the cockpit for sorties over occupied France.",
    "ovr.l1": "Campaign tied to the D\u2011Day timeframe with dynamic mission generation.",
    "ovr.l2": "Squadron management: pilot experience, fatigue and aircraft availability.",
    "ovr.l3": "Multiple Allied fighter types and ground\u2011attack tasks.",
    "ovr.l4": "Quick combat & training modes for immediate action.",
    "ovr.t1": "Limited edition big box included a large Battle of Normandy map and a spiral\u2011bound manual.",
    "ovr.t2": "Released in 1994, coinciding with the 50th anniversary of D\u2011Day.",
    "ovr.t3": "Developed by Rowan, known for other historical flight sims like Dawn Patrol and later Flying Corps."
  },
  "cs": {
    "site.title": "Age of Pixels",
    "site.subtitle": "Retro po\u010d\u00edta\u010de a big box hry. Autentick\u00e9 nahr\u00e1vky z MIDI hardwaru (MT-32, SC-55), zvukov\u00e9 karty, Amiga a hi-fi.",
    "nav.collection": "Moje sb\u00edrka",
    "nav.videos": "Videa",
    "nav.about": "O projektu",
    "nav.links": "Odkazy",
    "home.collection": "Moje sb\u00edrka",
    "home.videos": "Videa",
    "home.videosSub": "K p\u0159ehr\u00e1n\u00ed klikn\u011bte na n\u00e1hled.",
    "home.about": "O projektu",
    "about.p1": "Jsem nad\u0161enec do PC \u00e9ry 80./90. let, Amigy a MIDI modul\u016f. Po letech ve sk\u0159\u00edn\u00edch v\u011bci obnovuji, nahr\u00e1v\u00e1m a sd\u00edl\u00edm, aby nezapadly prachem.",
    "about.p2": "Na YouTube najdete autentick\u00e9 zvukov\u00e9 nahr\u00e1vky z Roland MT\u201132, SC\u201155 a dal\u0161\u00edch karet/modul\u016f. Na eBay/Aukro pravideln\u011b nab\u00edz\u00edm big box hry, hardware a hi\u2011fi kousky ze sv\u00e9 sb\u00edrky.",
    "about.p3": "M\u00fdm c\u00edlem je udr\u017eet tuhle \u00e9ru \u017eivou a dostupnou. D\u00edky za odb\u011br a sledov\u00e1n\u00ed!",
    "cards.dos": "DOS / Windows 3.x hry",
    "cards.w95": "Windows 95/98 hry",
    "cards.dvd": "Hry v DVD krabi\u010dk\u00e1ch",
    "cards.isa": "Zvukov\u00e9 karty ISA",
    "cards.pci": "Zvukov\u00e9 karty PCI",
    "cards.modules": "Zvukov\u00e9 moduly",
    "cards.vlb": "Grafick\u00e9 karty VLB",
    "cards.isagpu": "Grafick\u00e9 karty ISA",
    "cards.pcigpu": "Grafick\u00e9 karty PCI",
    "cards.amiga.hw": "Amiga hardware",
    "cards.amiga.games": "Amiga hry",
    "cards.amiga.sw": "Amiga software",
    "pages.dos.title": "DOS / Windows 3.x hry",
    "pages.w95.title": "Windows 95/98 hry",
    "ui.comingSoon": "Ji\u017e brzy",
    "ui.backHome": "\u2190 Zp\u011bt na \u00favod",
    "privacy.title": "Soukrom\u00ed a cookies",
    "privacy.collect": "Nezpracov\u00e1v\u00e1me osobn\u00ed \u00fadaje, nezobrazujeme reklamu a nepou\u017e\u00edv\u00e1me sledovac\u00ed cookies. Nevyu\u017e\u00edv\u00e1me analytiku t\u0159et\u00edch stran.",
    "privacy.videos": "Videa se na\u010d\u00edtaj\u00ed a\u017e po kliknut\u00ed a pou\u017e\u00edvaj\u00ed youtube-nocookie.com, aby se p\u0159ed interakc\u00ed nenastavovaly marketingov\u00e9 cookies.",
    "privacy.contact": "Kontakt",
    "privacy.btn": "Soukrom\u00ed a cookies",
    "prod.about": "O h\u0159e",
    "prod.high": "Hlavn\u00ed vlastnosti",
    "prod.req": "Syst\u00e9mov\u00e9 po\u017eadavky",
    "prod.trivia": "Zaj\u00edmavosti",
    "ef2000.title": "EF2000 (PC) \u2014 Big Box",
    "ef2000.fig1": "P\u0159edn\u00ed obal \u2014 DID / Ocean, zna\u010dka TFX Military",
    "ef2000.fig2": "Obsah krabice \u2014 manu\u00e1l, addendum, CD a velk\u00e1 krabice",
    "ef2000.p": "EF2000 je z\u00e1sadn\u00ed modern\u00ed leteck\u00fd simul\u00e1tor od Digital Image Design. Letejte s prototypem Eurofighteru v dynamick\u00fdch kampan\u00edch nad Skandin\u00e1vi\u00ed s pokro\u010davou avionikou a p\u016fsobivou grafikou.",
    "ef2000.l1": "Dynamick\u00e1 kampa\u0148 s vyv\u00edjej\u00edc\u00ed se frontou a misemi.",
    "ef2000.l2": "V\u011brn\u00e1 avionika, 3D kokpit a realistick\u00fd letov\u00fd model.",
    "ef2000.l3": "Multiplayer p\u0159es s\u00ed\u0165/modem; podpora \u201epadlock\u201c pohled\u016f.",
    "ef2000.l4": "V\u00fdrazn\u00e1 \u201ekovov\u00e1\u201c big box krabice s n\u00fdtovan\u00fdm motivem.",
    "ef2000.t1": "Vyvinuto studiem Digital Image Design (DID), autory TFX.",
    "ef2000.t2": "Chv\u00e1leno za dynamick\u00e9 po\u010das\u00ed a atmosf\u00e9rick\u00e9 efekty.",
    "ef2000.t3": "Pozd\u011bji vy\u0161el update Super EF2000 pro Windows/Glide.",
    "atf.title": "Jane\u2019s Advanced Tactical Fighters (PC) \u2014 Big Box",
    "atf.fig1": "P\u0159edn\u00ed obal \u2014 Jane\u2019s Combat Simulations",
    "atf.fig2": "Obsah krabice \u2014 krou\u017ekov\u00fd manu\u00e1l, referen\u010dn\u00ed karta, CD",
    "atf.p": "Jane\u2019s Advanced Tactical Fighters (ATF) je modern\u00ed leteck\u00fd simul\u00e1tor a p\u0159\u00edm\u00e9 pokra\u010dov\u00e1n\u00ed U.S. Navy Fighters. Nab\u00edz\u00ed \u0161pi\u010dkov\u00e1 letadla a kampan\u011b po cel\u00e9m sv\u011bt\u011b s podporou editoru mis\u00ed.",
    "atf.l1": "Letejte se stealth i experiment\u00e1ln\u00edmi stroji (nap\u0159. F\u2011117A, F\u201122, B\u20112A, X\u201131, X\u201129, ASTOVL, Rafale C).",
    "atf.l2": "80 mis\u00ed ve 3 kampan\u00edch (Egypt, Francie, D\u00e1ln\u00fd v\u00fdchod) + multiplayer sc\u00e9n\u00e1\u0159e.",
    "atf.l3": "N\u00e1stroj Pro Mission Creator pro tvorbu vlastn\u00edch mis\u00ed.",
    "atf.l4": "Realistick\u00e9 po\u0161kozen\u00ed, dynamick\u00e9 po\u010das\u00ed a multiplayer p\u0159es s\u00ed\u0165/modem.",
    "atf.t1": "Vyd\u00e1no v roce 1996 pod zna\u010dkou Jane\u2019s Combat Simulations (EA/Origin).",
    "atf.t2": "Obsahuje krou\u017ekov\u00fd manu\u00e1l \u201eFirst Edition\u201c a referen\u010dn\u00ed kartu.",
    "atf.t3": "Cen\u011bno pro datab\u00e1zi letadel a technick\u00e9 detaily.",
    "lit.title": "Lost in Time (PC) \u2014 Sierra Originals (Parts 1 & 2)",
    "lit.fig1": "Obsah krabice \u2014 jewel case, katalog 1995\u20131996 a p\u0159\u00edbalov\u00e9 let\u00e1ky",
    "lit.fig2": "P\u0159edn\u00ed obal \u2014 reedice Sierra Originals (Parts 1 & 2)",
    "lit.p": "Lost in Time je dvoud\u00edln\u00e9 point\u2011and\u2011click adventurn\u00ed dobrodru\u017estv\u00ed od Coktel Vision vydan\u00e9 spole\u010dnost\u00ed Sierra. Kombinuje hran\u00e9 FMV sekvence s p\u0159edrenderovan\u00fdmi pozad\u00edmi a sleduje Doralice na cest\u011b do 18. stolet\u00ed.",
    "lit.l1": "Obsahuje dva kompletn\u00ed d\u00edly: Parts I & II.",
    "lit.l2": "FMV sekvence a digitalizovan\u00ed herci pro filmov\u00e9 vypr\u00e1v\u011bn\u00ed.",
    "lit.l3": "H\u00e1danky s \u010dasov\u00fdmi paradoxy a historick\u00fdm pr\u016fzkumem.",
    "lit.l4": "Edice Sierra Originals se standardizovan\u00fdm balen\u00edm.",
    "lit.t1": "P\u016fvodn\u011b vyd\u00e1no v roce 1993 (Coktel Vision); edice Sierra z poloviny 90. let.",
    "lit.t2": "Pat\u0159\u00ed mezi ran\u00e9 adventury s FMV segmenty.",
    "lit.t3": "Sou\u010d\u00e1st rozpo\u010dtov\u00e9 \u0159ady Sierra Originals.",
    "ovr.title": "Overlord (PC) \u2014 Big Box",
    "ovr.fig1": "P\u0159edn\u00ed obal \u2014 viditeln\u00e1 samolepka \u201elimited edition\u201c",
    "ovr.fig2": "Obsah krabice \u2014 manu\u00e1ly, diskety a dopl\u0148ky",
    "ovr.p": "Overlord je WWII eskadr\u00f3nov\u00fd leteck\u00fd simul\u00e1tor od Rowan / Virgin zasazen\u00fd do kampan\u011b u Normandie. Spravujete piloty a mise a n\u00e1sledn\u011b used\u00e1te do kokpitu k n\u00e1let\u016fm nad okupovanou Franci\u00ed.",
    "ovr.l1": "Kampa\u0148 sv\u00e1zan\u00e1 s obdob\u00edm D\u2011Day s dynamick\u00fdm generov\u00e1n\u00edm mis\u00ed.",
    "ovr.l2": "Spr\u00e1va perut\u011b: zku\u0161enosti pilot\u016f, \u00fanava a dostupnost letadel.",
    "ovr.l3": "V\u00edce typ\u016f spojeneck\u00fdch st\u00edha\u010dek a bitevn\u00edch \u00fakol\u016f.",
    "ovr.l4": "Rychl\u00fd boj a tr\u00e9ninkov\u00e9 re\u017eimy pro okam\u017eitou akci.",
    "ovr.t1": "Limitovan\u00e1 big box edice obsahovala velkou mapu \u201eBattle of Normandy\u201c a krou\u017ekov\u00fd manu\u00e1l.",
    "ovr.t2": "Vyd\u00e1n\u00ed 1994, u p\u0159\u00edle\u017eitosti 50. v\u00fdro\u010d\u00ed D\u2011Day.",
    "ovr.t3": "Vyvinulo studio Rowan, zn\u00e1m\u00e9 i d\u00edky Dawn Patrol a pozd\u011bj\u0161\u00edmu Flying Corps."
  }
};

  function detectLang(){
    const url = new URL(window.location.href);
    const q = (url.searchParams.get('lang') || '').toLowerCase();
    if (LANGS.includes(q)) return q;

    const stored = localStorage.getItem('lang');
    if (LANGS.includes(stored)) return stored;

    const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || 'en']).map(x => String(x).toLowerCase());
    if (langs.some(l => l.startsWith('cs'))) return 'cs';
    return 'en';
  }

  function setLang(lang, pushUrl=true){
    const dict = MESSAGES[lang] || MESSAGES.en;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    localStorage.setItem('lang', lang);
    // Accessibility: mark active language in toggle
    document.querySelectorAll('[data-setlang]').forEach(btn => {
      const active = btn.getAttribute('data-setlang') === lang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (pushUrl){
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.toString());
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const current = detectLang();
    setLang(current, false);
    document.querySelectorAll('[data-setlang]').forEach(btn => {
      const active = btn.getAttribute('data-setlang') === current;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    document.querySelectorAll('[data-setlang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-setlang');
        setLang(lang, true);
      });
    });
  });

  window.__setLang = setLang;
})();
