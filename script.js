/* ============================================
   MERIDIAN — Scroll-driven Scene Navigation
   v2: Enhanced with loading, cursor, 3D effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initCustomCursor();
  initProgressBar();
  initSceneObserver();
  initParallax();
  initCardTilt();
  initSmoothScroll();
  initProductRotation();
  initScrollProgress3D();
  initChapterNav();
});

/* ============================================
   Loading Screen
   ============================================ */

function initLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  const loadingBar = document.querySelector('.loading-bar');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    loadingBar.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger hero animations after loading
        setTimeout(() => {
          document.querySelector('.scene-hero')?.classList.add('loaded');
        }, 300);
      }, 500);
    }
  }, 100);
  
  // Prevent scroll during loading
  document.body.style.overflow = 'hidden';
}

/* ============================================
   Custom Cursor
   ============================================ */

function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorGlow = document.querySelector('.cursor-glow');
  
  if (!cursorDot || !cursorGlow) return;
  
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let glowX = 0, glowY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor animation
  function animateCursor() {
    // Dot follows quickly
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    
    // Glow follows slowly
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Hover states
  const interactiveElements = document.querySelectorAll('a, button, .collection-card, .product-image');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
  });
  
  // Hide on mobile
  if ('ontouchstart' in window) {
    cursorDot.style.display = 'none';
    cursorGlow.style.display = 'none';
  }
}

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
      if (el.classList.contains('dragging')) return;
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
   Product Image 3D Rotation (Drag to rotate)
   ============================================ */

function initProductRotation() {
  const productImages = document.querySelectorAll('.product-image');
  
  productImages.forEach(img => {
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;
    
    img.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      img.classList.add('dragging', 'rotating');
      img.style.transition = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      currentRotation = deltaX * 0.5;
      img.style.transform = `rotateY(${currentRotation}deg)`;
    });
    
    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      img.classList.remove('dragging', 'rotating');
      img.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      img.style.transform = 'rotateY(0deg)';
    });
  });
}

/* ============================================
   Chapter Navigation
   ============================================ */

function initChapterNav() {
  const dots = document.querySelectorAll('.chapter-dot');
  const scenes = document.querySelectorAll('.scene');
  
  // Click to navigate
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetId = dot.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Update active state on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sceneId = entry.target.id;
        dots.forEach(dot => {
          if (dot.dataset.target === sceneId) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);
  
  scenes.forEach(scene => observer.observe(scene));
}

/* ============================================
   Scroll Progress 3D Transforms
   ============================================ */

function initScrollProgress3D() {
  const heroWatches = document.querySelectorAll('.hero-watch');
  const heroSection = document.querySelector('.scene-hero');
  
  if (!heroSection) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const progress = Math.min(scrollY / heroHeight, 1);
    
    // Hero watches float up and fade as you scroll past hero
    heroWatches.forEach((watch, index) => {
      const direction = index === 0 ? -1 : 1;
      const translateY = -progress * 100;
      const scale = 1 - (progress * 0.3);
      const opacity = 1 - progress;
      const rotate = (index === 0 ? -5 : 5) + (progress * direction * 30);
      
      watch.style.opacity = opacity;
      if (!watch.matches(':hover')) {
        watch.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
      }
    });
  });
}
