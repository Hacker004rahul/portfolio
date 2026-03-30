document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // GSAP SETUP
  // =========================
  if (typeof gsap !== "undefined") {

    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Navbar animation
    gsap.from('.logo', { y: -50, opacity: 0, duration: 1 });
    gsap.from('.navigation a', { y: -30, opacity: 0, stagger: 0.1 });

    // Content animation
    gsap.from('.content', { y: 50, opacity: 0, duration: 1 });

    // Scroll animations (works for both pages)
    gsap.utils.toArray('.section, section').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        duration: 1
      });
    });

    // 🔥 FIXED PROJECT ANIMATION (MAIN FIX)
    gsap.utils.toArray('.project-box, .project').forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        opacity: 0,
        y: 40,
        duration: 0.6
      });
    });
  }

  // =========================
  // SMOOTH SCROLL
  // =========================
  document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');

      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // =========================
  // NIGHT MODE
  // =========================
  const toggle = document.getElementById('nightModeToggle');

  if (toggle) {
    const savedMode = localStorage.getItem('nightMode');

    if (savedMode === 'true') {
      document.body.classList.add('night-mode');
    }

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('night-mode');
      localStorage.setItem('nightMode', document.body.classList.contains('night-mode'));
    });
  }

  // =========================
  // MOBILE MENU (FIXED FOR .toggle)
  // =========================
  const menuBtn = document.querySelector('.menu-toggle, .toggle');
  const nav = document.querySelector('.navigation');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // =========================
  // TYPING EFFECT
  // =========================
  const typingEl = document.getElementById('typing-effect');

  if (typingEl) {
    const text = typingEl.getAttribute('data-text') || "";
    let index = 0;

    function typeWriter() {
      if (index < text.length) {
        typingEl.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 80);
      }
    }

    typingEl.textContent = "";
    typeWriter();
  }

  // =========================
  // CANVAS BACKGROUND (SAFE)
  // =========================
  const canvas = document.getElementById('demo-canvas');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
      }
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "rgba(255,255,255,0.1)";
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawLines();
      requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }

});
