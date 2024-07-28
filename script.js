document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP Animations
    gsap.from('.logo', { duration: 1, y: -50, opacity: 0, ease: 'bounce' });
    gsap.from('.navigation a', { duration: 1, y: -30, opacity: 0, stagger: 0.2 });
    gsap.from('.content', { duration: 1, opacity: 0, delay: 0.5 });

    // Smooth Scrolling
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animations
    gsap.from('.home .content', { duration: 1, opacity: 0, y: 50, ease: 'power2.out' });
    gsap.from('.skills .skill', { duration: 1, opacity: 0, y: 50, stagger: 0.2, ease: 'power2.out' });
    gsap.from('.contact .content', { duration: 1, opacity: 0, y: 50, ease: 'power2.out' });

  

    // Night Mode Toggle
    const nightModeToggle = document.getElementById('nightModeToggle');
    const isNightMode = localStorage.getItem('nightMode') === 'true';

    if (isNightMode) {
        document.body.classList.add('night-mode');
    }

    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        localStorage.setItem('nightMode', document.body.classList.contains('night-mode'));
    });

    // Typing Effect
    const typingElement = document.getElementById('typing-effect');
    const text = typingElement.getAttribute('data-text');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // Adjust typing speed here (in ms)
        }
    }

    typingElement.textContent = ""; // Clear the initial content
    typeWriter();

    // Canvas Animation
    const canvas = document.getElementById('demo-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    let particles = [];

    // Initialize particles
    function initParticles() {
        particles = [];
        for (let x = 0; x < width; x += width / 20) {
            for (let y = 0; y < height; y += height / 20) {
                particles.push({
                    x: x + Math.random() * width / 20,
                    y: y + Math.random() * height / 20,
                    originX: x,
                    originY: y,
                    closest: []
                });
            }
        }

        // Find closest particles
        particles.forEach(p => {
            p.closest = particles
                .filter(other => other !== p)
                .sort((a, b) => getDistance(p, a) - getDistance(p, b))
                .slice(0, 5);
        });

        // Create circles
        particles.forEach(p => {
            p.circle = new Circle(p, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
        });
    }

    // Circle class
    function Circle(pos, radius, color) {
        this.pos = pos;
        this.radius = radius;
        this.color = color;
        this.active = 0;

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(255,255,255,${this.active})`;
            ctx.fill();
        };
    }

    function getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            if (getDistance({ x: width / 2, y: height / 2 }, p) < 4000) {
                p.active = 0.3;
                p.circle.active = 0.6;
            } else if (getDistance({ x: width / 2, y: height / 2 }, p) < 20000) {
                p.active = 0.1;
                p.circle.active = 0.3;
            } else {
                p.active = 0;
                p.circle.active = 0;
            }

            p.circle.draw();
            p.closest.forEach(closest => {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(closest.x, closest.y);
                ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
                ctx.stroke();
            });
        });
        requestAnimationFrame(animate);
    }

    // Initialize and animate
    initParticles();
    animate();

    // Adjust canvas on resize
    window.addEventListener('resize', () => {
        canvas.width = width = window.innerWidth;
        canvas.height = height = window.innerHeight;
        initParticles();
    });
});
