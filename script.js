
/* ═══════ HERO CANVAS: animated dot grid ═══════ */
(function() {
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, dots = [], mouse = { x: -999, y: -999 };
  const SPACING = 38, RADIUS = 1.6;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(W / SPACING) + 1;
    const rows = Math.ceil(H / SPACING) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({ bx: c * SPACING, by: r * SPACING, x: c * SPACING, y: r * SPACING, phase: Math.random() * Math.PI * 2 });
      }
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      const dx = d.bx - mouse.x, dy = d.by - mouse.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      const repel = Math.max(0, 1 - dist / 140);
      d.x = d.bx + dx * repel * 0.4;
      d.y = d.by + dy * repel * 0.4;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.0008 + d.phase);
      const alpha = 0.18 + pulse * 0.3;
      ctx.beginPath();
      ctx.arc(d.x, d.y, RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,200,${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  canvas.parentElement.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => { mouse.x = mouse.y = -999; });

  resize();
  requestAnimationFrame(draw);
})();

/* ═══════ HERO CHART BARS ═══════ */
(function() {
  const heights = [55, 40, 70, 85, 65, 90, 75, 60, 80, 50, 70, 88, 45, 92, 68, 78];
  const container = document.getElementById('heroChart');
  heights.forEach((h, i) => {
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = h + '%';
    bar.style.animationDelay = (i * 0.05) + 's';
    container.appendChild(bar);
  });
})();

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

