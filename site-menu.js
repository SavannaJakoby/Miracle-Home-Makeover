// Native <details>/<summary> supports tap, click, and keyboard without JavaScript.
// Keep the submenu within narrow phone screens and dismiss it on outside click/Escape.
(function () {
  const menus = document.querySelectorAll('nav .service-menu');
  function keepVisible(menu) {
    const panel = menu.querySelector('.dropdown-content');
    if (!panel || !menu.open) return;
    panel.style.setProperty('--service-menu-shift', '0px');
    const bounds = panel.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const edge = 12;
    let shift = 0;
    if (bounds.left < edge) shift = edge - bounds.left;
    if (bounds.right + shift > viewportWidth - edge) {
      shift -= bounds.right + shift - (viewportWidth - edge);
    }
    panel.style.setProperty('--service-menu-shift', shift + 'px');
  }
  menus.forEach(function (menu) {
    menu.addEventListener('toggle', function () {
      if (menu.open) keepVisible(menu);
    });
  });
  window.addEventListener('resize', function () {
    menus.forEach(keepVisible);
  });
  document.addEventListener('click', function (event) {
    menus.forEach(function (menu) {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    menus.forEach(function (menu) {
      if (!menu.open) return;
      menu.open = false;
      const summary = menu.querySelector('summary');
      if (summary) summary.focus();
    });
  });
})();
