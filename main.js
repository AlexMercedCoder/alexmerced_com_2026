/* ============================================
   ALEX MERCED DOT COM — Main JS
   ============================================ */

// --- Dark Mode ---
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateToggleIcon(theme);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon(next);
  });
}

function updateToggleIcon(theme) {
  const toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// --- Mobile Nav ---
function initMobileNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');
  if (!hamburger || !links) return;

  const setOpen = (open) => {
    hamburger.classList.toggle('active', open);
    links.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  };
  hamburger.addEventListener('click', () => {
    setOpen(!links.classList.contains('open'));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && links.classList.contains('open')) {
      setOpen(false);
      hamburger.focus();
    }
  });
  document.addEventListener('click', event => {
    if (links.classList.contains('open') && !hamburger.contains(event.target) && !links.contains(event.target)) setOpen(false);
  });
  window.matchMedia('(min-width: 769px)').addEventListener('change', event => {
    if (event.matches) setOpen(false);
  });
}

// --- Scroll Reveal ---
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.documentElement.classList.add('reveal-ready');
  elements.forEach(el => observer.observe(el));
}

// --- Active Nav Link ---
function initActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (href !== '/' && path.includes(href))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else if (href === '/' && (path === '/' || path === '/index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// --- Dynamic Year ---
function initYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollReveal();
  initActiveNav();
  initYear();
});
