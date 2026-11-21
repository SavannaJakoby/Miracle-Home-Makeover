/* Explicit, stable tap/click menu. Use pointerdown to dismiss on iPhone, 
   where document click may not fire on non-interactive areas. */
(function () {
  var menu = document.querySelector('nav .service-menu');
  if (!menu) return;
  var toggle = menu.querySelector('.service-menu-toggle');
  var panel = menu.querySelector('.dropdown-content');
  if (!toggle || !panel) return;

  function isOpen() {
    return menu.classList.contains('is-open');
  }
  function keepOnScreen() {
    panel.style.setProperty('--service-menu-shift', '0px');
    var rect = panel.getBoundingClientRect();
    var viewport = document.documentElement.clientWidth;
    var edge = 12;
    var shift = 0;
    if (rect.left < edge) shift = edge - rect.left;
    if (rect.right + shift > viewport - edge) {
      shift -= rect.right + shift - (viewport - edge);
    }
    panel.style.setProperty('--service-menu-shift', shift + 'px');
  }
  function setOpen(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    if (open) keepOnScreen();
  }

  toggle.addEventListener('click', function (event) {
    event.preventDefault();
    setOpen(!isOpen());
  });

  function dismissOutside(event) {
    if (isOpen() && !menu.contains(event.target)) setOpen(false);
  }
  if (window.PointerEvent) {
    document.addEventListener('pointerdown', dismissOutside, true);
  } else {
    document.addEventListener('touchstart', dismissOutside, true);
    document.addEventListener('mousedown', dismissOutside, true);
  }
  document.addEventListener('focusin', dismissOutside);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (isOpen()) keepOnScreen();
  });
  setOpen(false);
})();
