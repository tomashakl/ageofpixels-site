/* 
 * Age of Pixels — script.js
 * Purpose: YouTube modal (nocookie), image lightbox, alphabet nav, minor UI polish.
 * How to extend: Attach new UI behaviors here. Keep functions idempotent; most run on DOMContentLoaded.
 * Modified: 2025-10-13 21:06
 */
// Načtení gridu s videi z videos.html
document.addEventListener('DOMContentLoaded', async () => {
  const mount = document.getElementById('videos-mount');
  if (mount) {
    try {
      const res = await fetch('videos.html', { cache: 'no-cache' });
      mount.innerHTML = await res.text();
      attachVideoHandlers();
    } catch (e) {
      mount.innerHTML = '<p style="opacity:.7">Could not load videos.</p>';
    }
  }
});

function attachVideoHandlers(){
  const modal  = document.getElementById('video-modal');
  const iframe = document.getElementById('video-frame');
  const close  = document.getElementById('modal-close');

  document.querySelectorAll('[data-yt]').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      const id = card.getAttribute('data-yt');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    });
  });

  function hide(){
    iframe.src = '';
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }
  close.addEventListener('click', hide);
  modal.addEventListener('click', e => { if (e.target === modal) hide(); });
}


/* Fallback: event delegation in case videos are present or added later by other means */
document.addEventListener('click', function(e){
  const a = e.target.closest('[data-yt]');
  if(!a) return;
  e.preventDefault();
  const id = a.getAttribute('data-yt');
  const modal  = document.getElementById('video-modal');
  const iframe = document.getElementById('video-frame');
  if(!modal || !iframe) return;
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}, {passive:false});


/* === Image Lightbox (auto-injected) === */
function initImageLightbox(){
  // Create modal once
  let modal = document.getElementById('img-lightbox');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'img-lightbox';
    modal.className = 'img-lightbox';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML = '<button class="img-close" aria-label="Close">×</button><img id="img-lightbox-photo" alt="Zoomed image">';
    document.body.appendChild(modal);
  }
  const photo = modal.querySelector('#img-lightbox-photo');
  const closeBtn = modal.querySelector('.img-close');

  // Mark images inside .img-holder as zoomable
  document.querySelectorAll('.img-holder img').forEach(img => {
    if(!img.classList.contains('zoomable')) img.classList.add('zoomable');
    if(!img.hasAttribute('data-full')) img.setAttribute('data-full', img.currentSrc || img.src);
    if(!img.hasAttribute('title')) img.setAttribute('title','Click to zoom');
  });

  // Open
  document.addEventListener('click', (e)=>{
    const img = e.target.closest('img.zoomable');
    if(!img) return;
    const full = img.getAttribute('data-full') || img.currentSrc || img.src;
    photo.src = full;
    photo.classList.remove('zoomed');
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  });

  // Close
  function close(){
    photo.src = '';
    photo.classList.remove('zoomed');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }
  modal.addEventListener('click', (e)=>{ if(e.target === modal) close(); });
  if(closeBtn) closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });

  // Toggle zoom
  photo.addEventListener('click', ()=>{ photo.classList.toggle('zoomed'); });
}
document.addEventListener('DOMContentLoaded', initImageLightbox);



/* === Build Alphabet Navigator === */
function buildAlphaNav(){
  const mount = document.getElementById('alpha-mount');
  if(!mount) return;

  // Remove existing anchors to avoid stale positions
  document.querySelectorAll('div[id^="letter-"]').forEach(el => el.remove());

  // Collect product headings in DOM order
  const heads = Array.from(document.querySelectorAll('h2.detail-title'));
  const lettersPresent = new Set();
  const firstAnchorFor = {};

  heads.forEach(h => {
    const text = (h.textContent || '').trim();
    if(!text) return;
    let first = text[0].toUpperCase();
    if(!first.match(/[A-Z]/)) first = '#';
    const key = first;
    if(!lettersPresent.has(key)){
      // Create anchor inside the product wrapper if present
      const anchorId = 'letter-' + (key === '#' ? 'hash' : key);
      const a = document.createElement('div');
      a.id = anchorId;
      const sec = h.closest('section.product');
      if(sec){ sec.insertBefore(a, h); } else { h.parentNode.insertBefore(a, h); }
      firstAnchorFor[key] = '#' + anchorId;
      lettersPresent.add(key);
    }else{
      lettersPresent.add(key);
    }
  });

  const alphabet = ['#','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const frag = document.createDocumentFragment();
  alphabet.forEach(ch => {
    const has = lettersPresent.has(ch);
    if(has){
      const a = document.createElement('a');
      a.href = firstAnchorFor[ch] || '#';
      a.className = 'letter' + (ch === '#' ? ' hash' : '') + ' active';
      a.textContent = ch;
      frag.appendChild(a);
    }else{
      const span = document.createElement('span');
      span.className = 'letter' + (ch === '#' ? ' hash' : '') + ' disabled';
      span.textContent = ch;
      frag.appendChild(span);
    }
  });
  mount.innerHTML = '';
  mount.appendChild(frag);
}

document.addEventListener('DOMContentLoaded', function(){ sortProductsAlpha(); buildAlphaNav(); });


/* === Auto-sort product blocks alphabetically by title === */
function sortProductsAlpha(){
  const container = document.querySelector('.container.narrow');
  if(!container) return;
  const items = Array.from(container.querySelectorAll('section.product, h2.detail-title'));
  // If wrappers are present use them; otherwise build from h2 + following grid
  let products = [];
  if(items.length){
    const wrapped = Array.from(container.querySelectorAll('section.product'));
    if(wrapped.length){
      products = wrapped.map(sec => ({
        node: sec,
        title: (sec.getAttribute('data-title') || (sec.querySelector('h2.detail-title')?.textContent || '')).trim()
      }));
    }else{
      // Build from h2 + grid
      const heads = Array.from(container.querySelectorAll('h2.detail-title'));
      heads.forEach(h => {
        const grid = h.nextElementSibling && h.nextElementSibling.classList.contains('detail-grid') ? h.nextElementSibling : null;
        if(!grid) return;
        const frag = document.createElement('section');
        frag.className = 'product';
        let title = (h.textContent || '').trim();
        frag.setAttribute('data-title', title);
        // move any preceding letter anchor inside the new section so it travels with the product
        const prev = h.previousElementSibling;
        const isLetterAnchor = prev && /^letter-/.test(prev.id || '');
        h.replaceWith(frag);
        if(isLetterAnchor){ frag.appendChild(prev); }
        frag.appendChild(h);
        frag.appendChild(grid);
        products.push({node: frag, title});
      });
    }
  }
  // Sort (ignore accents, case; use localeCompare base)
  products.sort((a,b)=> a.title.localeCompare(b.title, undefined, {sensitivity:'base'}));
  products.forEach(p => container.insertBefore(p.node, container.querySelector('.back-home') || null));
}


/* === Floating 'Back to Top' button — product pages only (A–Z present) === */
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const alpha = document.getElementById('alpha-mount');
    if(!alpha) return; // only on product pages

    let btn = document.getElementById('back-to-alpha');
    if(!btn){
      btn = document.createElement('button');
      btn.id = 'back-to-alpha';
      btn.type = 'button';
      btn.setAttribute('aria-label','Back to Top');
      btn.textContent = '↑';
      document.body.appendChild(btn);
    }

    // Click -> scroll exactly to main title (.hero)
    btn.addEventListener('click', () => {
      const hero = document.querySelector('.hero');
      if (hero) {
        const y = hero.getBoundingClientRect().top + window.scrollY - 10; // slight nudge
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Show/hide on scroll
    const update = () => {
      btn.style.display = (window.scrollY > 420) ? 'flex' : 'none';
    };
    update();
    window.addEventListener('scroll', update, {passive:true});

    // Also show right after an A–Z click
    alpha.addEventListener('click', (e) => {
      if(e.target && e.target.tagName === 'A'){ btn.style.display = 'flex'; }
    });
  });
})();


/* Header scroll shadow — toggles .is-scrolled on sticky header
 * Modified: 2025-10-13 21:06
 */
document.addEventListener('scroll', () => {
  const h = document.querySelector('.site-header');
  if(!h) return;
  const scrolled = window.scrollY > 10;
  h.classList.toggle('is-scrolled', scrolled);
}, {passive:true});


/* === Per-product share buttons === */
function slugify(s){ return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

document.addEventListener('click', function(e){
  const btn = e.target.closest('.share-btn[data-share]');
  if(!btn) return;
  e.preventDefault();
  // Determine product section: closest h2.detail-title
  let secTitle = btn.closest('.detail-grid');
  if(secTitle){
    secTitle = secTitle.previousElementSibling;
  }
  if(!secTitle || !secTitle.classList.contains('detail-title')){
    // fallback: search upwards
    secTitle = btn.closest('section.product')?.querySelector('h2.detail-title') || document.querySelector('h2.detail-title');
  }
  const title = secTitle ? (secTitle.textContent||'').trim() : document.title;
  let anchorId = secTitle?.id;
  if(!anchorId && secTitle){
    anchorId = slugify(title);
    secTitle.id = anchorId;
  }
  const url = location.origin + location.pathname + '#' + (anchorId || '');

  const type = btn.getAttribute('data-share');
  const text = title + ' — Age of Pixels';

  if(type === 'copy'){
    const toCopy = url;
    try{ navigator.clipboard && navigator.clipboard.writeText(toCopy); }catch(e){}
    // brief visual feedback: flash button
    btn.classList.add('copied'); setTimeout(()=>btn.classList.remove('copied'), 500);
    return;
  }
  if(type === 'native' && navigator.share){
    navigator.share({ title, text, url }).catch(()=>{});
    return;
  }
  let shareUrl = '#';
  if(type === 'facebook'){
    shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
  }else if(type === 'x'){
    shareUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
  }else if(type === 'email'){
    shareUrl = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(url);
  }else if(type === 'whatsapp'){
    shareUrl = 'https://wa.me/?text=' + encodeURIComponent(text + ' ' + url);
  }else if(type === 'telegram'){
    shareUrl = 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text);
  }else if(type === 'reddit'){
    shareUrl = 'https://www.reddit.com/submit?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(text);
  }else if(type === 'linkedin'){
    shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
  }else if(type === 'messenger'){
    shareUrl = 'https://www.facebook.com/dialog/send?link=' + encodeURIComponent(url) + '&app_id=761886551187304&redirect_uri=' + encodeURIComponent(url);
  }
  window.open(shareUrl, '_blank', 'noopener');
}, {passive:false});
