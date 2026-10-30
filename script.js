const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const menu = document.querySelector('.menu');
const nav = document.querySelector('#site-nav');
function closeMenu() {
  nav?.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Open menu');
  if (menu) menu.innerHTML = 'Menu <span aria-hidden="true">+</span>';
}
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.innerHTML = open ? 'Close <span aria-hidden="true">−</span>' : 'Menu <span aria-hidden="true">+</span>';
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) { closeMenu(); menu.focus(); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

// A useful choice, using existing build guides rather than made-up budget totals.
const tabs = [...document.querySelectorAll('.setup-tabs [role="tab"]')];
function selectTab(tab, focus = false) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
  });
});

const filter = document.querySelector('#gear-filter');
filter?.addEventListener('input', () => {
  const query = filter.value.trim().toLowerCase();
  let count = 0;
  document.querySelectorAll('.products').forEach(grid => {
    let visible = 0;
    grid.querySelectorAll('.product-card').forEach(card => {
      const matches = card.textContent.toLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visible++;
    });
    count += visible;
    grid.closest('.section').hidden = visible === 0;
  });
  document.querySelector('#gear-filter-status').textContent = query
    ? (count ? `${count} matching products` : 'No matching products. Try another name or browse the category links above.') : '';
});

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

// Mark the current destination for keyboard and screen-reader navigation.
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-header nav a, .category-rail a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
});
