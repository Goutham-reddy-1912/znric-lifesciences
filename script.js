

/* ═══════ SCROLL REVEAL ═══════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -20% 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════ COUNTER ANIMATION ═══════ */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + (target === 12 ? '' : '+');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target);
      animateCounter(e.target, target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ═══════ PERFORMANCE BARS ═══════ */
const perfObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.perf-fill').forEach(bar => {
        setTimeout(() => { bar.style.transform = `scaleX(${bar.dataset.width})`; }, 200);
      });
      perfObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const perfEl = document.getElementById('perfBars');
if (perfEl) perfObserver.observe(perfEl);

/* ═══════ TABS ═══════ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
  });
});

/* ═══════ CONSUMABLES NAV ═══════ */
document.querySelectorAll('.cons-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.cons;
    document.querySelectorAll('.cons-nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cons-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('cons-' + id).classList.add('active');
  });
});

/* ═══════ MOBILE NAV ═══════ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileNav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

/* ═══════ FORM SUBMIT ═══════ */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '✓ Request Sent — We\'ll be in touch!';
    btn.style.background = '#22c55e';
  }, 1200);
}



 
//  Nav drop down 
document.addEventListener("DOMContentLoaded", function () {

    const dropdown = document.querySelector(".dropdown > a");

    dropdown.addEventListener("click", function(e) {

        if (window.innerWidth <= 992) {
            e.preventDefault();

            this.nextElementSibling.classList.toggle("active");
        }

    });

});