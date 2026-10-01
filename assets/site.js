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

