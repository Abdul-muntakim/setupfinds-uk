const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '×' : 'Menu';
});

const search = document.querySelector('.exact-search input');
search?.addEventListener('keydown', event => {
  if (event.key !== 'Enter') return;
  const query = search.value.trim().toLowerCase();
  if (!query) return;
  const routes = [
    [['mouse', 'mice', 'g502', 'razer'], 'gaming-mice.html'],
    [['keyboard', 'keychron', 'apex'], 'keyboards.html'],
    [['headset', 'headphone', 'audio', 'pulse'], 'headsets.html'],
    [['ps5', 'playstation', 'controller'], 'ps5-accessories.html'],
    [['desk', 'monitor', 'cable', 'setup'], 'desk-setup.html']
  ];
  const match = routes.find(([terms]) => terms.some(term => query.includes(term)));
  window.location.href = match ? match[1] : 'shop.html';
});

// Give every catalogue card a distinct, category-appropriate visual.
const catalogueImages = {
  'keyboards.html': 'keyboard',
  'gaming-mice.html': 'mouse',
  'headsets.html': 'headset',
  'ps5-accessories.html': 'ps5',
  'desk-setup.html': 'desk'
};
const currentFile = location.pathname.split('/').pop() || 'index.html';
const catalogueType = catalogueImages[currentFile];
if (catalogueType) {
  document.querySelectorAll('.product-card .product-icon').forEach((visual, index) => {
    visual.style.setProperty('background-image', `url("assets/product-cards/${catalogueType}-${index % 4}.webp")`, 'important');
    visual.setAttribute('role', 'img');
    visual.setAttribute('aria-label', `Illustrative ${catalogueType} product image`);
  });
}

// Product guides use matching illustrative photography and a fuller, useful summary.
const productGroups = {
  keyboard: ['logitech-g515-lightspeed-tkl.html','hyperx-alloy-origins-core.html','steelseries-apex-pro-tkl.html','keychron-c3-pro.html'],
  mouse: ['steelseries-rival-3-wireless-gen-2.html','logitech-g502-lightspeed.html','logitech-g305-lightspeed.html','razer-deathadder-v3-hyperspeed.html'],
  headset: ['hyperx-cloud-iii.html','steelseries-arctis-nova-5.html','sony-inzone-h5.html','logitech-g-pro-x-2-lightspeed.html','steelseries-arctis-nova-5p.html'],
  ps5: ['wd-black-sn850x-heatsink.html','oivo-dualsense-charging-station.html','ugreen-hdmi-2-1-cable.html'],
  desk: ['invision-monitor-arm.html','large-extended-desk-mat.html','quntis-monitor-light-bar.html','under-desk-cable-management-tray.html']
};
for (const [type, files] of Object.entries(productGroups)) {
  const index = files.indexOf(currentFile);
  if (index < 0) continue;
  const visual = document.querySelector('.product-detail-visual');
  if (visual) visual.style.setProperty('background-image', `url("assets/product-cards/${type}-${index % 4}.webp")`, 'important');
}

const productPage = document.querySelector('.product-page');
const verdict = productPage?.querySelector('.verdict');
if (productPage && verdict && !productPage.querySelector('.product-overview')) {
  const title = productPage.querySelector('h1')?.textContent?.trim();
  const lead = productPage.querySelector('.product-detail-copy .lead')?.textContent?.trim();
  const positives = [...productPage.querySelectorAll('.pros-cons section:first-child li')].slice(0, 2).map(item => item.textContent.replace('✓','').trim());
  const checks = [...productPage.querySelectorAll('.pros-cons section:last-child li')].slice(0, 2).map(item => item.textContent.replace('!','').trim());
  const overview = document.createElement('section');
  overview.className = 'product-overview';
  overview.innerHTML = `<h2>${title}: what you should know</h2><p>${lead} The main reasons to shortlist it are ${positives.join(' and ').toLowerCase()}.</p><p>Before choosing it, ${checks.join(' and ').toLowerCase()}. Always confirm the exact model, compatibility and included accessories on the Amazon listing before ordering.</p>`;
  verdict.insertAdjacentElement('afterend', overview);
}
