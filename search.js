(() => {
  const input = document.querySelector('#site-search');
  const form = document.querySelector('#search-form');
  const status = document.querySelector('#search-status');
  const list = document.querySelector('#search-results');
  let entries;
  let requestId = 0;
  let timer;
  const aliases = { mice: 'mouse', keyboards: 'keyboard', headsets: 'headset', headphones: 'headset', headphone: 'headset', playstation: 'ps5', cables: 'cable' };
  const normalize = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const terms = text => normalize(text).split(' ').filter(Boolean).map(word => aliases[word] || word);
  const normalized = text => terms(text).join(' ');

  async function render(query) {
    const id = ++requestId;
    list.replaceChildren();
    const words = terms(query).slice(0, 20);
    if (!words.length) {
      status.textContent = 'Search by product name, feature or category. Try “G502”, “wireless mouse” or “PS5”.';
      return;
    }
    status.textContent = 'Searching…';
    try {
      if (!entries) {
        const response = await fetch('search-index.json');
        if (!response.ok) throw new Error('Index unavailable');
        entries = await response.json();
      }
      if (id !== requestId) return;
      const matches = entries.map(entry => {
        const title = normalized(entry.title);
        const description = normalized(entry.description);
        const text = normalized(entry.text);
        if (!words.every(word => text.includes(word) || title.includes(word) || description.includes(word))) return null;
        return { ...entry, score: words.reduce((score, word) => score + (title.includes(word) ? 10 : 0) + (description.includes(word) ? 3 : 0), 0) + (title.includes(words.join(' ')) ? 20 : 0) };
      }).filter(Boolean).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
      status.textContent = matches.length ? `${matches.length} result${matches.length === 1 ? '' : 's'} for “${query}”` : `No results for “${query}”. Try a shorter name or another feature.`;
      for (const entry of matches) {
        const item = document.createElement('li');
        const heading = document.createElement('h2');
        const link = document.createElement('a');
        link.href = entry.url;
        link.textContent = entry.title;
        heading.append(link);
        const description = document.createElement('p');
        description.textContent = entry.description;
        item.append(heading, description);
        list.append(item);
      }
    } catch {
      if (id === requestId) status.textContent = 'Search could not load. Please try again, or browse the categories above.';
    }
  }

  function updateUrl(query, replace = false) {
    const url = new URL(location.href);
    query ? url.searchParams.set('q', query) : url.searchParams.delete('q');
    history[replace ? 'replaceState' : 'pushState'](null, '', url);
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    clearTimeout(timer);
    updateUrl(input.value.trim());
    render(input.value.trim());
  });
  input.addEventListener('input', () => {
    clearTimeout(timer);
    ++requestId;
    timer = setTimeout(() => { updateUrl(input.value.trim(), true); render(input.value.trim()); }, 150);
  });
  function restore() {
    clearTimeout(timer);
    input.value = new URLSearchParams(location.search).get('q') || '';
    render(input.value.trim());
  }
  window.addEventListener('popstate', restore);
  restore();
})();
