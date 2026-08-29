(() => {
    // 颜色配置
    const COLORS = ['#ff69b4', '#0267f4'];

    const body = document.body;
    let particles = [];
    let lastMoveTime = 0;

    // 鼠标移动事件（限制生成频率）
    body.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMoveTime > 50) {
            createParticle(e.clientX, e.clientY);
            lastMoveTime = now;
        }
    });

    // 移动端触摸事件（可选）
    body.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const now = Date.now();
            if (now - lastMoveTime > 50) {
                createParticle(touch.clientX, touch.clientY);
                lastMoveTime = now;
            }
        }
    }, { passive: true });

    // 创建单个粒子
    function createParticle(x, y) {
        const particle = document.createElement('div');
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        // 初始位置设为 0，实际位置通过 transform 控制
        particle.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            width: 12px;
            height: 12px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 2.0;
            will-change: transform, opacity;
        `;
        document.body.appendChild(particle);

        particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 20 + Math.random() * 10
        });

        // 限制粒子总数不超过30
        if (particles.length > 30) {
            const old = particles.shift();
            old.element.remove();
        }
    }

    // 动画循环
    function animateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;

            if (p.life <= 0) {
                p.element.remove();
                particles.splice(i, 1);
            } else {
                p.element.style.opacity = p.life / 30;
                p.element.style.transform = `translate(${p.x}px, ${p.y}px) scale(${p.life / 30})`;
            }
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
})();