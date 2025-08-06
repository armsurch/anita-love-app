document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const SPECIAL_DATE = new Date('2024-01-01'); // Change this to your special date!
    let musicEnabled = false;
    let particlesEnabled = true;

    // --- Elements ---
    const heart = document.getElementById('heart');
    const heartWrapper = document.getElementById('heartWrapper');
    const messageDisplay = document.getElementById('message-display');
    const newMessageBtn = document.getElementById('new-message-btn');
    const galleryMainImage = document.getElementById('gallery-main-image');
    const galleryThumbnails = document.getElementById('gallery-thumbnails');
    const daysCount = document.getElementById('daysCount');
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const themeButtons = document.querySelectorAll('.theme-button');

    // --- Enhanced Love Messages ---
    const loveMessages = [
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
        "My love for you grows stronger with each sunrise 🌅"
    ];

    // --- Enhanced Photo Gallery ---
    const photos = [
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

    // --- Heart Animation with Enhanced Effects ---
    heartWrapper.addEventListener('click', () => {
        heart.classList.add('beat');
        createEnhancedConfetti();
        playHeartSound();
        
        setTimeout(() => {
            heart.classList.remove('beat');
        }, 600);
    });

    // --- Enhanced Message Generator ---
    function showNewMessage() {
        const randomIndex = Math.floor(Math.random() * loveMessages.length);
        const message = loveMessages[randomIndex];
        
        // Typewriter effect
        messageDisplay.innerHTML = '';
        typeWriter(messageDisplay, message, 0);
        
        // Add sparkle effect
        createSparkles(messageDisplay);
    }

    // --- Typewriter Effect ---
    function typeWriter(element, text, index) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => typeWriter(element, text, index + 1), 50);
        }
    }

    // --- Enhanced Photo Gallery ---
    function populateGallery() {
        if (photos.length === 0) return;

        galleryThumbnails.innerHTML = '';

        photos.forEach((photo, index) => {
            const thumb = document.createElement('img');
            thumb.src = photo.src;
            thumb.alt = photo.alt;
            thumb.classList.add('gallery-thumb');
            
            if (index === 0) {
                thumb.classList.add('ring-4');
            }

            thumb.addEventListener('click', () => {
                // Update main image with fade effect
                galleryMainImage.style.opacity = '0';
                
                setTimeout(() => {
                    galleryMainImage.src = photo.src;
                    galleryMainImage.alt = photo.alt;
                    galleryMainImage.style.opacity = '1';
                }, 200);

                // Update active thumbnail
                document.querySelectorAll('.gallery-thumb').forEach(img => 
                    img.classList.remove('ring-4'));
                thumb.classList.add('ring-4');

                // Show caption
                showPhotoCaption(photo.caption);
            });

            galleryThumbnails.appendChild(thumb);
        });

        // Set initial image
        galleryMainImage.src = photos[0].src;
        galleryMainImage.alt = photos[0].alt;
    }

    // --- Photo Caption Display ---
    function showPhotoCaption(caption) {
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
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.querySelector('.gallery-main').style.position = 'relative';
        document.querySelector('.gallery-main').appendChild(captionDiv);

        // Fade in caption
        setTimeout(() => {
            captionDiv.style.opacity = '1';
        }, 100);

        // Fade out after 3 seconds
        setTimeout(() => {
            captionDiv.style.opacity = '0';
            setTimeout(() => captionDiv.remove(), 300);
        }, 3000);
    }

    // --- Days Counter ---
    function updateDaysCounter() {
        const now = new Date();
        const diffTime = Math.abs(now - SPECIAL_DATE);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Animate the number change
        animateNumber(daysCount, parseInt(daysCount.textContent) || 0, diffDays);
    }

    // --- Number Animation ---
    function animateNumber(element, start, end) {
        const duration = 1000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // --- Enhanced Confetti ---
    function createEnhancedConfetti() {
        const colors = ['#ff69b4', '#e04b7b', '#ffd1dc', '#ff1493', '#db7093', '#ffb6c1'];
        const shapes = ['circle', 'square', 'heart'];
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            confetti.classList.add('confetti', shape);
            confetti.style.cssText = `
                position: absolute;
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
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }
    }

    // --- Sparkle Effect ---
    function createSparkles(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                font-size: 12px;
                pointer-events: none;
                animation: sparkle 1s ease-out forwards;
                left: ${Math.random() * element.offsetWidth}px;
                top: ${Math.random() * element.offsetHeight}px;
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // --- Music Control ---
    musicToggle.addEventListener('click', () => {
        if (musicEnabled) {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵 Music';
            musicToggle.classList.remove('playing');
            musicEnabled = false;
        } else {
            backgroundMusic.play().catch(e => console.log('Music play failed:', e));
            musicToggle.textContent = '🎵 Playing';
            musicToggle.classList.add('playing');
            musicEnabled = true;
        }
    });

    // --- Theme Switching ---
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            document.body.classList.remove('theme-pink', 'theme-blue', 'theme-green', 'theme-purple');
            
            const theme = button.getAttribute('data-theme');
            if (theme !== 'pink') {
                document.body.classList.add(`theme-${theme}`);
            }
            
            // Theme change effect
            createThemeChangeEffect();
        });
    });

    // --- Theme Change Effect ---
    function createThemeChangeEffect() {
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
        
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 200);
    }

    // --- Sound Effects ---
    function playHeartSound() {
        // Create a simple heart sound using Web Audio API
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

    // --- Add CSS animations ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
            100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
        
        .gallery-thumb {
            width: clamp(60px, 12vw, 80px);
            height: clamp(60px, 12vw, 80px);
            object-fit: cover;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 3px solid transparent;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .gallery-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        
        .main-image {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // --- Event Listeners ---
    newMessageBtn.addEventListener('click', showNewMessage);

    // --- Initialize Everything ---
    populateGallery();
    updateDaysCounter();
    
    // Update counter every hour
    setInterval(updateDaysCounter, 3600000);
    
    // Show welcome message
    setTimeout(() => {
        showNewMessage();
    }, 1000);
});