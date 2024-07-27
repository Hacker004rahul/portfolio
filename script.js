document.addEventListener('DOMContentLoaded', () => {
    // Night Mode Initialization
    const nightModeToggle = document.getElementById('nightModeToggle');
    const isNightMode = localStorage.getItem('nightMode') === 'true';

    if (isNightMode) {
        document.body.classList.add('night-mode');
    }

    nightModeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            nightModeToggle.textContent = '🌙'; // Switch back to light mode icon
        } else {
            document.body.setAttribute('data-theme', 'dark');
            nightModeToggle.textContent = '🌕'; // Switch to dark mode icon
        }
        document.body.classList.toggle('night-mode');
        localStorage.setItem('nightMode', document.body.classList.contains('night-mode'));
    });
});


    // Create Scene for 3D Model
    const scene = new THREE.Scene();
document.addEventListener("DOMContentLoaded", function() {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
})();
