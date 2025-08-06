// ===== ADVANCED ANITA PA APPLICATION =====

class AnitaApp {
    constructor() {
        this.SPECIAL_DATE = new Date('2024-01-01'); // Change this to your special date!
        this.musicEnabled = false;
        this.particlesEnabled = true;
        this.messagesShown = 0;
        this.currentPhotoIndex = 0;
        
        this.loveMessages = [
            "Every moment with you feels like a beautiful dream come true 💕",
            "Your smile is the sunshine that brightens my darkest days ☀️",
            "I fall in love with you more and more each passing day 💖",
            "You are my today, my tomorrow, and my forever ❤️",
            "In your eyes, I found my home and my heart found its peace 🏠",
            "Your laugh is my favorite sound in the entire world 😊",
            "With you, every day is Valentine's Day 🌹",
            "You make my heart skip beats and my soul dance with joy 💃",
            "I love how we can be silly together and still feel so connected 🤪",
            "You are the missing piece that made my life complete 🧩",
            "Every love song reminds me of you and our beautiful story 🎵",
            "Your hugs feel like coming home after a long journey 🤗",
            "I choose you, in every lifetime, in every universe 🌌",
            "You turn ordinary moments into extraordinary memories ✨",
            "My love for you grows stronger with each sunrise 🌅",
            "You are the poetry my heart has been trying to write 📝",
            "In a world full of chaos, you are my peace 🕊️",
            "Your love is the magic that makes everything possible ✨",
            "Every heartbeat whispers your name 💓",
            "You are my favorite notification, my sweetest distraction 📱"
        ];

        this.photos = [
            { 
                src: 'Anita/ph1.jpg', 
                alt: 'Our beautiful sunset moment',
                caption: 'Remember this magical evening? 🌅'
            },
            { 
                src: 'Anita/ph2.jpg', 
                alt: 'Your adorable silly face',
                caption: 'This face always makes me smile! 😄'
            },
            { 
                src: 'Anita/ph3.jpg', 
                alt: 'Our mountain adventure',
                caption: 'Adventure buddies for life! 🏔️'
            }
        ];

        this.init();
    }

    init() {
        this.bindElements();
        this.setupEventListeners();
        this.initializeParticleSystem();
        this.populateGallery();
        this.updateCounters();
        this.startAnimations();
        
        // Show welcome message after a delay
        setTimeout(() => this.showNewMessage(), 1500);
    }

    bindElements() {
        // Heart elements
        this.heart = document.getElementById('heart');
        this.heartWrapper = document.getElementById('heartWrapper');
        this.heartPulse = document.querySelector('.heart-pulse');

        // Message elements
        this.messageDisplay = document.getElementById('message-display');
        this.messageText = document.querySelector('.message-text');
        this.newMessageBtn = document.getElementById('new-message-btn');

        // Gallery elements
        this.galleryMainImage = document.getElementById('gallery-main-image');
        this.galleryThumbnails = document.getElementById('gallery-thumbnails');
        this.prevImageBtn = document.getElementById('prevImage');
        this.nextImageBtn = document.getElementById('nextImage');

        // Counter elements
        this.daysCount = document.getElementById('daysCount');
        this.messagesCount = document.getElementById('messagesCount');
        this.photosCount = document.getElementById('photosCount');

        // Control elements
        this.musicToggle = document.getElementById('musicToggle');
        this.particlesToggle = document.getElementById('particlesToggle');
        this.backgroundMusic = document.getElementById('backgroundMusic');
        this.themeOptions = document.querySelectorAll('.theme-option');

        // Particle canvas
        this.particleCanvas = document.getElementById('particleCanvas');
        this.particleCtx = this.particleCanvas.getContext('2d');
    }

    setupEventListeners() {
        // Heart interactions
        this.heartWrapper.addEventListener('click', () => this.heartClick());

        // Message button
        this.newMessageBtn.addEventListener('click', () => this.showNewMessage());

        // Gallery navigation
        this.prevImageBtn?.addEventListener('click', () => this.previousImage());
        this.nextImageBtn?.addEventListener('click', () => this.nextImage());

        // Music control
        this.musicToggle.addEventListener('click', () => this.toggleMusic());

        // Particles control
        this.particlesToggle?.addEventListener('click', () => this.toggleParticles());

        // Theme switching
        this.themeOptions.forEach(option => {
            option.addEventListener('click', () => this.switchTheme(option.dataset.theme));
        });

        // Window resize for particle canvas
        window.addEventListener('resize', () => this.resizeParticleCanvas());

        // Button ripple effects
        document.querySelectorAll('.modern-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    // ===== HEART INTERACTIONS =====

    heartClick() {
        // Heart beat animation
        this.heart.classList.add('beat');
        setTimeout(() => this.heart.classList.remove('beat'), 600);

        // Pulse effect
        this.heartPulse.classList.add('active');
        setTimeout(() => this.heartPulse.classList.remove('active'), 1000);

        // Enhanced confetti
        this.createEnhancedConfetti();

        // Sound effect
        this.playHeartSound();

        // Particle burst
        if (this.particlesEnabled) {
            this.createParticleBurst();
        }
    }

    // ===== MESSAGE SYSTEM =====

    showNewMessage() {
        const randomIndex = Math.floor(Math.random() * this.loveMessages.length);
        const message = this.loveMessages[randomIndex];
        
        // Update counter
        this.messagesShown++;
        this.updateMessageCounter();

        // Clear current message
        this.messageText.innerHTML = '';
        
        // Typewriter effect
        this.typeWriter(this.messageText, message, 0);
        
        // Sparkle effect
        setTimeout(() => this.createSparkles(this.messageDisplay), 500);

        // Button feedback
        this.newMessageBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.newMessageBtn.style.transform = 'scale(1)';
        }, 150);
    }

    typeWriter(element, text, index) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => this.typeWriter(element, text, index + 1), 30);
        }
    }

    // ===== GALLERY SYSTEM =====

    populateGallery() {
        if (this.photos.length === 0) return;

        this.galleryThumbnails.innerHTML = '';

        this.photos.forEach((photo, index) => {
            const thumb = document.createElement('img');
            thumb.src = photo.src;
            thumb.alt = photo.alt;
            thumb.classList.add('gallery-thumb');
            
            if (index === 0) {
                thumb.classList.add('active');
            }

            thumb.addEventListener('click', () => this.selectImage(index));
            this.galleryThumbnails.appendChild(thumb);
        });

        // Set initial image
        this.selectImage(0);
    }

    selectImage(index) {
        this.currentPhotoIndex = index;
        const photo = this.photos[index];

        // Fade out current image
        this.galleryMainImage.style.opacity = '0';
        
        setTimeout(() => {
            this.galleryMainImage.src = photo.src;
            this.galleryMainImage.alt = photo.alt;
            this.galleryMainImage.style.opacity = '1';
        }, 200);

        // Update active thumbnail
        document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Show caption
        this.showPhotoCaption(photo.caption);
    }

    previousImage() {
        const newIndex = this.currentPhotoIndex > 0 ? 
            this.currentPhotoIndex - 1 : 
            this.photos.length - 1;
        this.selectImage(newIndex);
    }

    nextImage() {
        const newIndex = this.currentPhotoIndex < this.photos.length - 1 ? 
            this.currentPhotoIndex + 1 : 
            0;
        this.selectImage(newIndex);
    }

    showPhotoCaption(caption) {
        // Remove existing caption
        const existingCaption = document.querySelector('.photo-caption');
        if (existingCaption) {
            existingCaption.remove();
        }

        // Create new caption
        const captionDiv = document.createElement('div');
        captionDiv.className = 'photo-caption';
        captionDiv.textContent = caption;
        captionDiv.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 0.9rem;
            opacity: 0;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        `;

        const imageFrame = document.querySelector('.image-frame');
        imageFrame.appendChild(captionDiv);

        // Animate in
        setTimeout(() => {
            captionDiv.style.opacity = '1';
            captionDiv.style.transform = 'translateX(-50%) translateY(-10px)';
        }, 100);

        // Animate out
        setTimeout(() => {
            captionDiv.style.opacity = '0';
            captionDiv.style.transform = 'translateX(-50%) translateY(0px)';
            setTimeout(() => captionDiv.remove(), 300);
        }, 3000);
    }

    // ===== COUNTERS =====

    updateCounters() {
        this.updateDaysCounter();
        this.updateMessageCounter();
        this.updatePhotosCounter();
    }

    updateDaysCounter() {
        const now = new Date();
        const diffTime = Math.abs(now - this.SPECIAL_DATE);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        this.animateNumber(this.daysCount, parseInt(this.daysCount.textContent) || 0, diffDays);
    }

    updateMessageCounter() {
        this.animateNumber(this.messagesCount, parseInt(this.messagesCount.textContent) || 0, this.messagesShown);
    }

    updatePhotosCounter() {
        this.animateNumber(this.photosCount, parseInt(this.photosCount.textContent) || 0, this.photos.length);
    }

    animateNumber(element, start, end) {
        const duration = 1000;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }

    // ===== THEME SYSTEM =====

    switchTheme(theme) {
        // Remove all theme classes
        document.body.classList.remove('theme-pink', 'theme-blue', 'theme-green', 'theme-purple');
        
        // Add new theme class (except for default pink)
        if (theme !== 'pink') {
            document.body.classList.add(`theme-${theme}`);
        }

        // Update active theme option
        this.themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });

        // Theme change effect
        this.createThemeChangeEffect();
    }

    createThemeChangeEffect() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, transparent 0%, rgba(255,255,255,0.8) 100%);
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => overlay.style.opacity = '1', 10);
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 200);
    }

    // ===== MUSIC SYSTEM =====

    toggleMusic() {
        const statusElement = this.musicToggle.querySelector('.control-status');
        
        if (this.musicEnabled) {
            this.backgroundMusic.pause();
            this.musicToggle.classList.remove('active');
            statusElement.textContent = 'Off';
            this.musicEnabled = false;
        } else {
            this.backgroundMusic.play().catch(e => console.log('Music play failed:', e));
            this.musicToggle.classList.add('active');
            statusElement.textContent = 'On';
            this.musicEnabled = true;
        }
    }

    toggleParticles() {
        const statusElement = this.particlesToggle.querySelector('.control-status');
        
        this.particlesEnabled = !this.particlesEnabled;
        this.particlesToggle.classList.toggle('active', this.particlesEnabled);
        statusElement.textContent = this.particlesEnabled ? 'On' : 'Off';
    }

    // ===== PARTICLE SYSTEM =====

    initializeParticleSystem() {
        this.resizeParticleCanvas();
        this.particles = [];
        this.animateParticles();
    }

    resizeParticleCanvas() {
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;
    }

    createParticleBurst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                size: Math.random() * 4 + 2,
                color: `hsl(${Math.random() * 60 + 300}, 70%, 60%)`
            });
        }
    }

    animateParticles() {
        this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
        
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.vy += 0.1; // gravity
            
            if (particle.life > 0) {
                this.particleCtx.save();
                this.particleCtx.globalAlpha = particle.life;
                this.particleCtx.fillStyle = particle.color;
                this.particleCtx.beginPath();
                this.particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.particleCtx.fill();
                this.particleCtx.restore();
                return true;
            }
            return false;
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    // ===== EFFECTS =====

    createEnhancedConfetti() {
        const colors = ['#ff69b4', '#e04b7b', '#ffd1dc', '#ff1493', '#db7093', '#ffb6c1'];
        const shapes = ['circle', 'square', 'heart'];
        const container = document.querySelector('.app-container');
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            confetti.classList.add('confetti', shape);
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: ${shape === 'circle' ? '50%' : '0'};
                pointer-events: none;
                z-index: 1000;
                animation: confetti-fall ${Math.random() * 2 + 2}s linear forwards;
            `;
            
            if (shape === 'heart') {
                confetti.innerHTML = '💖';
                confetti.style.fontSize = '12px';
                confetti.style.background = 'none';
            }
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }
    }

    createSparkles(element) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                font-size: 16px;
                pointer-events: none;
                animation: sparkle 1.5s ease-out forwards;
                left: ${Math.random() * element.offsetWidth}px;
                top: ${Math.random() * element.offsetHeight}px;
                z-index: 100;
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    createRipple(event) {
        const button = event.currentTarget;
        const ripple = button.querySelector('.btn-ripple');
        
        if (ripple) {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'scale(0)';
            
            ripple.offsetHeight; // Trigger reflow
            ripple.style.transform = 'scale(4)';
        }
    }

    // ===== SOUND EFFECTS =====

    playHeartSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.log('Sound not supported');
        }
    }

    // ===== ANIMATIONS =====

    startAnimations() {
        // Stagger card animations
        const cards = document.querySelectorAll('.floating-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Update counters periodically
        setInterval(() => this.updateDaysCounter(), 3600000); // Every hour
    }
}

// ===== CSS ANIMATIONS =====

const additionalStyles = `
    @keyframes sparkle {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
    
    @keyframes confetti-fall {
        0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    
    .confetti {
        position: fixed !important;
        z-index: 1000 !important;
        pointer-events: none !important;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== INITIALIZE APPLICATION =====

document.addEventListener('DOMContentLoaded', () => {
    new AnitaApp();
});