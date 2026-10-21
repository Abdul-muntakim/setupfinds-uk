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
