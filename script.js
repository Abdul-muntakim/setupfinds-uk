const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '×' : 'Menu';
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
