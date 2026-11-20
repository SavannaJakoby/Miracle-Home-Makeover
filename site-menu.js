// <details>/<summary> is usable with touch and keyboard even without JavaScript.
document.addEventListener('click', function (event) {
  const menu = document.querySelector('nav .service-menu');
  if (menu && menu.open && !menu.contains(event.target)) menu.open = false;
});
document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape') return;
  const menu = document.querySelector('nav .service-menu');
  if (menu && menu.open) {
    menu.open = false;
    menu.querySelector('summary')?.focus();
  }
});
