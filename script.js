/**
 * Romantic Birthday Surprise Website Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initParticles();
    initTypewriter();
    initInteractions();
    initMouseGlow();
    initAudio();
    initLightbox();
    revealOnScroll();
    
    // Confetti burst on entrance
    setTimeout(() => {
        triggerCelebration();
    }, 1000);

    // Open My Heart Click
    document.getElementById('open-heart-btn').addEventListener('click', (e) => {
        triggerCelebration();
    });
});

// 1. Countdown Timer
function initCountdown() {
    // Set target date to midnight of June 11, 2026 (based on current time in metadata)
    const targetDate = new Date('June 11, 2026 00:00:00').getTime();
    
    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.querySelector('#countdown h2').innerText = "It's Your Special Day! ❤️";
            document.querySelector('.countdown-timer').style.display = 'none';
            triggerCelebration();
        }
    }, 1000);
}

function triggerCelebration() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF3030', '#ec9bb9', '#f969a2', '#D4AF37', '#ffffff']
    });
}

// 2. Particle System (Canvas)
function initParticles() {
    const canvas = document.getElementById('canvas-particles');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 15 + 5;
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.type = Math.random() > 0.5 ? 'heart' : 'petal';
            this.color = this.type === 'heart' ? '#FF3030' : '#FADBD8'; // Vibrant Red for hearts
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.02 - 0.01;
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            if (this.y < -50) this.reset();
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            if (this.type === 'heart') {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, this.size/3, 0, this.size);
                ctx.bezierCurveTo(this.size, this.size/3, this.size/2, -this.size/2, 0, 0);
                ctx.fill();
            } else {
                // Draw petal
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size/2, this.size, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    // Spawn larger DOM hearts occasionally
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart-particle');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 6000);
    }, 2000);
}

// 3. Typewriter Effect
function initTypewriter() {
    const text = `My Dearest,

Words often fail to express how much you mean to me, but today, I want to try. Since the moment you entered my life, everything has felt more vibrant, more meaningful, and infinitely more beautiful.

Your laughter is my favorite song, and your happiness is my greatest mission. Thank you for being my partner, my best friend, and my home. May your year be as incredible as the love you give to the world.

Happy Birthday, My Love.`;

    const container = document.getElementById('typewriter-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            if (text.charAt(index) === '\n') {
                container.innerHTML += '<br>';
            } else {
                container.innerHTML += text.charAt(index);
            }
            index++;
            setTimeout(type, 50);
        }
    }

    // Start typing when section is in view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && index === 0) {
            type();
        }
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('letter-sec'));
}

// 4. Mouse Glow
function initMouseGlow() {
    const glow = document.getElementById('mouse-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.display = 'block';
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// 5. Interactions
function initInteractions() {
    // Reason Cards Flip
    const cards = document.querySelectorAll('.reason-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Gift Box
    const gift = document.getElementById('gift-container');
    gift.addEventListener('click', () => {
        gift.classList.add('open');
        document.getElementById('click-box-text').innerText = "Surprise revealed! ❤️";
        triggerCelebration();
    });
}

// 6. Audio Handling
function initAudio() {
    const btn = document.getElementById('audio-toggle');
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Placeholder romantic track
    audio.loop = true;
    let playing = false;

    btn.addEventListener('click', () => {
        if (playing) {
            audio.pause();
            btn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.play().catch(e => console.log("Autoplay blocked, user interaction needed."));
            btn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        playing = !playing;
    });

    // Optional: Auto-trigger on first interaction
    document.addEventListener('click', () => {
        if (!playing) {
            // audio.play(); // Uncomment if you want auto-play after first click
        }
    }, { once: true });
}

// 7. Lightbox
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    // Create element
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: zoom-out;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        box-shadow: 0 0 50px rgba(0,0,0,0.5);
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    
    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });
    });
    
    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

// 8. Scroll Reveal
function revealOnScroll() {
    const elements = document.querySelectorAll('.animate-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
}
