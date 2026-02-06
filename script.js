/* ============================================
   MERIDIAN — Scroll-driven Scene Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initSceneObserver();
  initParallax();
  initCardTilt();
  initSmoothScroll();
});

/* ============================================
   Progress Bar
   ============================================ */

function initProgressBar() {
  const progressBar = document.querySelector('.progress-bar');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.height = `${scrollPercent}%`;
  });
}

/* ============================================
   Scene Observer (Intersection Observer)
   ============================================ */

function initSceneObserver() {
  const scenes = document.querySelectorAll('.scene');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -20% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);
  
  scenes.forEach(scene => observer.observe(scene));
}

/* ============================================
   Parallax Effects
   ============================================ */

function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  const heroWatches = document.querySelectorAll('.hero-watch');
  
  // Mouse-based parallax for product images
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    parallaxElements.forEach(el => {
      const intensity = parseFloat(el.dataset.parallax) || 0.1;
      const x = mouseX * intensity * 50;
      const y = mouseY * intensity * 50;
      const rotateX = mouseY * intensity * 10;
      const rotateY = -mouseX * intensity * 10;
      
      el.style.transform = `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Hero watches subtle movement
    heroWatches.forEach((watch, index) => {
      const intensity = index === 0 ? 0.03 : 0.05;
      const baseRotate = index === 0 ? -5 : 5;
      const x = mouseX * intensity * 30;
      const y = mouseY * intensity * 30;
      
      watch.style.transform = `translate(${x}px, ${y}px) rotate(${baseRotate + mouseX * 2}deg)`;
    });
  });
  
  // Scroll-based parallax for background elements
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    document.querySelectorAll('.float-circle').forEach((circle, index) => {
      const speed = index === 0 ? 0.1 : 0.05;
      const y = scrollY * speed;
      circle.style.transform = `translateY(${y}px) rotate(${scrollY * 0.02}deg)`;
    });
  });
}

/* ============================================
   Card Tilt Effect
   ============================================ */

function initCardTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/* ============================================
   Smooth Scroll for Nav Links
   ============================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ============================================
   Cursor Glow Effect (Optional Enhancement)
   ============================================ */

function initCursorGlow() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  cursor.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(201, 169, 98, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// Uncomment to enable cursor glow:
// initCursorGlow();
