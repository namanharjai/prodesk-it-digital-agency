const root = document.documentElement;
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const openIcon = document.getElementById('menu-icon-open');
const closeIcon = document.getElementById('menu-icon-close');
const themeButtons = document.querySelectorAll('#theme-toggle-desktop, #theme-toggle-mobile');
const themeLabels = document.querySelectorAll('.theme-label');
const mobileLinks = document.querySelectorAll('#mobile-menu a');
const year = document.getElementById('year');

const setYear = () => {
  if (year) year.textContent = new Date().getFullYear();
};

const updateThemeLabels = () => {
  const isDark = root.classList.contains('dark');
  themeLabels.forEach((label) => {
    label.textContent = isDark ? 'Light mode' : 'Dark mode';
  });
};

const saveTheme = () => {
  const isDark = root.classList.contains('dark');
  localStorage.setItem('prodesk-theme', isDark ? 'dark' : 'light');
  updateThemeLabels();
};

const toggleTheme = () => {
  root.classList.toggle('dark');
  saveTheme();
};

const closeMenu = () => {
  if (!mobileMenu) return;
  mobileMenu.classList.add('hidden');
  menuButton?.setAttribute('aria-expanded', 'false');
  openIcon?.classList.remove('hidden');
  closeIcon?.classList.add('hidden');
};

const toggleMenu = () => {
  if (!mobileMenu || !menuButton) return;
  const isOpen = !mobileMenu.classList.contains('hidden');
  if (isOpen) {
    closeMenu();
    return;
  }

  mobileMenu.classList.remove('hidden');
  menuButton.setAttribute('aria-expanded', 'true');
  openIcon?.classList.add('hidden');
  closeIcon?.classList.remove('hidden');
};

setYear();
updateThemeLabels();

themeButtons.forEach((button) => {
  button?.addEventListener('click', toggleTheme);
});

menuButton?.addEventListener('click', toggleMenu);

mobileLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
