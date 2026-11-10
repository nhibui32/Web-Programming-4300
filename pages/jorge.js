(function () {
    const toggleInput = document.getElementById('dark-mode-toggle');

    function applyDarkMode(enabled) {
        document.body.classList.toggle('dark-mode', enabled);
        toggleInput.checked = enabled;
    }

    applyDarkMode(localStorage.getItem('darkMode') === 'true');

    toggleInput.addEventListener('change', function () {
        applyDarkMode(toggleInput.checked);
        localStorage.setItem('darkMode', toggleInput.checked);
    });
})();

(function () {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    }

    function createParticles() {
        const count = Math.floor((canvas.width * canvas.height) / 13000);
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.4 + 0.6,
            vx: (Math.random() - 0.5) * 0.08,
            vy: (Math.random() - 0.5) * 0.08,
            phase: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.01 + 0.003
        }));
    }

    function step(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            const twinkle = (Math.sin(time * p.twinkleSpeed + p.phase) + 1) / 2;
            const alpha = 0.2 + twinkle * 0.45;
            const glowRadius = p.radius * (1 + twinkle * 1.1);

            ctx.save();
            ctx.shadowBlur = 5 + twinkle * 6;
            ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fill();
            ctx.restore();
        }

        requestAnimationFrame(step);
    }

    function init() {
        resizeCanvas();
        createParticles();
    }

    window.addEventListener('resize', init);
    window.addEventListener('load', init);

    init();
    requestAnimationFrame(step);
})();
