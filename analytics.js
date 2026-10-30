(() => {
  const measurementId = 'G-5DW52Y5KW8';
  const storageKey = 'setupfinds-analytics-consent';

  function loadAnalytics() {
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, { anonymize_ip: true, send_page_view: true });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  function saveChoice(choice) {
    localStorage.setItem(storageKey, choice);
    document.querySelector('.cookie-consent')?.remove();
    if (choice === 'accepted') loadAnalytics();
  }

  function showConsent() {
    const banner = document.createElement('aside');
    banner.className = 'cookie-consent';
    banner.setAttribute('aria-label', 'Analytics cookie choices');
    banner.innerHTML = `<div><strong>Optional analytics</strong><p>With your permission, we measure guide visits and affiliate clicks. <a href="privacy.html">Privacy details</a></p></div><div class="cookie-actions"><button type="button" data-cookie-choice="rejected">Reject analytics</button><button type="button" class="accept" data-cookie-choice="accepted">Accept analytics</button></div>`;
    document.body.appendChild(banner);
    banner.addEventListener('click', event => {
      const choice = event.target.closest('[data-cookie-choice]')?.dataset.cookieChoice;
      if (choice) saveChoice(choice);
    });
  }

  const consent = localStorage.getItem(storageKey);
  if (consent === 'accepted') loadAnalytics();
  else if (consent !== 'rejected') showConsent();

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href*="link.amazon"], a[href*="amzn.to"]');
    if (!link || !window.gtag) return;
    window.gtag('event', 'affiliate_click', {
      affiliate_network: 'Amazon', link_url: link.href,
      link_text: link.textContent.trim(), page_path: window.location.pathname
    });
  });
})();
