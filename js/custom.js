document.addEventListener('DOMContentLoaded', () => {
            const body = document.body;
            let particles = [];
            let particleId = 0;
            let lastMouseTime = 0;
            
            // 鼠标移动事件（限制生成频率）
            body.addEventListener('mousemove', (e) => {
                const now = Date.now();
                if (now - lastMouseTime > 50) { // 间隔50ms生成一个粒子
                    createParticle(e.clientX, e.clientY);
                    lastMouseTime = now;
                }
            });
            
            // 创建单个粒子
            function createParticle(x, y) {
                particleId++;
                const particle = document.createElement('div');
                particle.id = 'particle-' + particleId;
                // 粒子样式（内联）
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: ${Math.random() > 0.5 ? '#ff69b4' : '#0267f4'};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${x - 3}px;
                    top: ${y - 3}px;
                    opacity: 0.8;
                    transition: transform 0.1s ease;
                `;
                document.body.appendChild(particle);
                
                // 记录粒子状态
                particles.push({
                    id: particleId,
                    element: particle,
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 4, // 水平速度
                    vy: (Math.random() - 0.5) * 4, // 垂直速度
                    life: 20 + Math.random() * 10  // 生命周期（帧数）
                });
                
                // 限制粒子总数不超过30
                if (particles.length > 30) {
                    const old = particles.shift();
                    if (old && document.getElementById(old.id)) {
                        old.element.remove();
                    }
                }
            }
            
            // 动画循环：更新粒子位置、透明度、大小
            function animateParticles() {
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life--;
                    
                    if (p.life <= 0 || !document.getElementById(p.id)) {
                        // 粒子消亡，移除DOM
                        if (p.element && p.element.parentNode) {
                            p.element.remove();
                        }
                        particles.splice(i, 1);
                    } else {
                        // 更新粒子样式（透明度渐变 + 大小缩放）
                        p.element.style.opacity = p.life / 30;
                        p.element.style.transform = `translate(${p.x}px, ${p.y}px) scale(${p.life/30})`;
                    }
                }
                requestAnimationFrame(animateParticles);
            }
            
            animateParticles(); // 启动动画循环
        });