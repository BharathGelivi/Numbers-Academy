const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
function closeMenu() { menu?.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false'); }
menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu?.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
menu?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  const params = new URLSearchParams(window.location.search);
  for (const name of ['course', 'mode']) {
    const select = enquiryForm.elements.namedItem(name);
    if ([...select.options].some(option => option.value === params.get(name))) select.value = params.get(name);
  }
}
enquiryForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;
  const fields = new FormData(enquiryForm);
  const message = `Hello The Numbers Academy!\nName: ${fields.get('name')}\nCourse: ${fields.get('course')}\nClass preference: ${fields.get('mode')}\nMessage: ${fields.get('message') || 'Please share batch timings, fees and the next steps.'}`;
  window.location.href = `https://wa.me/${enquiryForm.dataset.phone}?text=${encodeURIComponent(message)}`;
});

const callbackForm = document.querySelector('#callback-form');
if (callbackForm) {
  const params = new URLSearchParams(window.location.search);
  let attribution = {};
  try { attribution = JSON.parse(sessionStorage.getItem('academy-source') || '{}') || {}; } catch { /* Form works with storage disabled. */ }
  if (params.has('utm_source')) {
    attribution = {source:params.get('utm_source'),medium:params.get('utm_medium') || 'shared-link',campaign:params.get('utm_campaign') || 'intro-and-training'};
    try { sessionStorage.setItem('academy-source',JSON.stringify(attribution)); } catch { /* No storage is needed to submit. */ }
  }
  for (const name of ['source','medium','campaign']) {
    if (typeof attribution[name] === 'string') callbackForm.elements.namedItem(name).value = attribution[name].slice(0,100);
  }
  callbackForm.elements.namedItem('landing-page').value = window.location.pathname.slice(0,200);
  const requestedMode = params.get('mode');
  const mode = callbackForm.elements.namedItem('mode');
  if ([...mode.options].some(option => option.value === requestedMode)) mode.value = requestedMode;
  callbackForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!callbackForm.reportValidity()) return;
    const button = callbackForm.querySelector('button[type=submit]');
    const status = document.querySelector('#callback-status');
    const data = new URLSearchParams(new FormData(callbackForm));
    if (data.get('bot-field')) return;
    button.disabled = true; status.textContent = 'Sending your request…';
    try {
      const response = await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data.toString()});
      if (!response.ok) throw new Error('Request not saved');
      window.location.href = '/enquiry-received.html';
    } catch {
      status.textContent = 'Your request could not be saved. Please try again or use the Call / WhatsApp buttons. Your details remain in the form.';
    } finally { button.disabled = false; }
  });
}

